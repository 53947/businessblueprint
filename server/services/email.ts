// Email service using Resend integration for transactional emails
import { Resend } from 'resend';
import { db } from '../db';
import { emailLogs } from '@shared/schema';

interface EmailReportData {
  businessName: string;
  digitalScore: number;
  summary: string;
  recommendations: any[];
  assessmentId: number;
}

interface ReviewAlertData {
  businessName: string;
  platform: string;
  rating: number;
  reviewText: string;
  reviewerName?: string;
  reviewDate: Date;
  locationName?: string;
}

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

async function getResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail: fromEmail || 'noreply@businessblueprint.io'
  };
}

interface EmailLogData {
  recipientEmail: string;
  recipientName?: string;
  clientId?: number;
  assessmentId?: number;
  emailType: string;
  subject: string;
  htmlBody: string;
  sentByAdminId?: number;
}

async function logEmailSend(data: EmailLogData, status: 'sent' | 'failed', errorMessage?: string, resendApiId?: string): Promise<number | null> {
  try {
    const [log] = await db.insert(emailLogs).values({
      recipientEmail: data.recipientEmail,
      recipientName: data.recipientName || null,
      clientId: data.clientId || null,
      assessmentId: data.assessmentId || null,
      emailType: data.emailType,
      subject: data.subject,
      htmlBody: data.htmlBody,
      status,
      errorMessage: errorMessage || null,
      resendApiId: resendApiId || null,
      sentAt: status === 'sent' ? new Date() : null,
      sentByAdminId: data.sentByAdminId || null,
    }).returning();
    return log.id;
  } catch (err) {
    console.error('[EmailService] Failed to log email:', err);
    return null;
  }
}

export class EmailService {
  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendVerificationEmail(email: string, companyName: string, verificationCode: string): Promise<boolean> {
    const subject = `Verify Your Email - ${verificationCode}`;
    const htmlContent = this.generateVerificationEmailHTML(companyName, verificationCode);
    
    try {
      const { client, fromEmail } = await getResendClient();
      
      const result = await client.emails.send({
        from: fromEmail,
        to: email,
        subject,
        html: htmlContent,
      });
      
      await logEmailSend({
        recipientEmail: email,
        recipientName: companyName,
        emailType: 'verification',
        subject,
        htmlBody: htmlContent,
      }, 'sent', undefined, result.data?.id);
      
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      await logEmailSend({
        recipientEmail: email,
        recipientName: companyName,
        emailType: 'verification',
        subject,
        htmlBody: htmlContent,
      }, 'failed', errorMsg);
      
      console.error('Error sending verification email:', error);
      return false;
    }
  }

  async sendEmailChangeNotification(oldEmail: string, newEmail: string, companyName: string): Promise<boolean> {
    const subject = `Email Address Changed - Action May Be Required`;
    const htmlContent = this.generateEmailChangeNotificationHTML(companyName, newEmail);
    
    try {
      const { client, fromEmail } = await getResendClient();
      
      const result = await client.emails.send({
        from: fromEmail,
        to: oldEmail,
        subject,
        html: htmlContent,
      });
      
      await logEmailSend({
        recipientEmail: oldEmail,
        recipientName: companyName,
        emailType: 'email_change',
        subject,
        htmlBody: htmlContent,
      }, 'sent', undefined, result.data?.id);
      
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      await logEmailSend({
        recipientEmail: oldEmail,
        recipientName: companyName,
        emailType: 'email_change',
        subject,
        htmlBody: htmlContent,
      }, 'failed', errorMsg);
      
      console.error('Error sending email change notification:', error);
      return false;
    }
  }

  async sendAssessmentReport(email: string, data: EmailReportData): Promise<boolean> {
    const subject = `Your Digital Presence Assessment Results - Score: ${data.digitalScore}`;
    const htmlContent = this.generateReportHTML(data);
    
    try {
      const { client, fromEmail } = await getResendClient();
      
      const result = await client.emails.send({
        from: fromEmail,
        to: email,
        subject,
        html: htmlContent,
      });
      
      await logEmailSend({
        recipientEmail: email,
        recipientName: data.businessName,
        assessmentId: data.assessmentId,
        emailType: 'assessment_report',
        subject,
        htmlBody: htmlContent,
      }, 'sent', undefined, result.data?.id);
      
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      await logEmailSend({
        recipientEmail: email,
        recipientName: data.businessName,
        assessmentId: data.assessmentId,
        emailType: 'assessment_report',
        subject,
        htmlBody: htmlContent,
      }, 'failed', errorMsg);
      
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendReviewAlert(email: string, data: ReviewAlertData): Promise<boolean> {
    const htmlContent = this.generateReviewAlertHTML(data);
    const sentiment = data.rating <= 2 ? 'Negative' : data.rating >= 4 ? 'Positive' : 'Neutral';
    const urgency = data.rating <= 2 ? '⚠️ URGENT' : '';
    const subject = `${urgency} New ${sentiment} Review on ${data.platform} - ${data.rating} ${data.rating === 1 ? 'Star' : 'Stars'}`;
    
    try {
      const { client, fromEmail } = await getResendClient();
      
      const result = await client.emails.send({
        from: fromEmail,
        to: email,
        subject,
        html: htmlContent,
      });
      
      await logEmailSend({
        recipientEmail: email,
        recipientName: data.businessName,
        emailType: 'review_alert',
        subject,
        htmlBody: htmlContent,
      }, 'sent', undefined, result.data?.id);
      
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      await logEmailSend({
        recipientEmail: email,
        recipientName: data.businessName,
        emailType: 'review_alert',
        subject,
        htmlBody: htmlContent,
      }, 'failed', errorMsg);
      
      console.error('Error sending review alert email:', error);
      return false;
    }
  }

  async sendEnrollmentConfirmation(email: string, data: {
    businessName: string;
    pathway: string;
    planName: string;
    monthlyPrice: number;
    nextBillingDate: Date;
    features: string[];
  }): Promise<boolean> {
    const subject = `Welcome to ${data.planName} - Your Digital Growth Journey Begins!`;
    const htmlContent = this.generateEnrollmentConfirmationHTML(data);
    
    try {
      const { client, fromEmail } = await getResendClient();
      
      const result = await client.emails.send({
        from: fromEmail,
        to: email,
        subject,
        html: htmlContent,
      });
      
      await logEmailSend({
        recipientEmail: email,
        recipientName: data.businessName,
        emailType: 'enrollment_confirmation',
        subject,
        htmlBody: htmlContent,
      }, 'sent', undefined, result.data?.id);
      
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      await logEmailSend({
        recipientEmail: email,
        recipientName: data.businessName,
        emailType: 'enrollment_confirmation',
        subject,
        htmlBody: htmlContent,
      }, 'failed', errorMsg);
      
      console.error('Error sending enrollment confirmation email:', error);
      return false;
    }
  }

  async sendPathwayReminderEmail(email: string, data: {
    businessName: string;
    digitalScore: number;
    assessmentId: number;
  }): Promise<boolean> {
    const subject = `Still deciding? Your Digital Growth Plan is ready, ${data.businessName}`;
    const htmlContent = this.generatePathwayReminderHTML(data);
    
    try {
      const { client, fromEmail } = await getResendClient();
      
      const result = await client.emails.send({
        from: fromEmail,
        to: email,
        subject,
        html: htmlContent,
      });
      
      await logEmailSend({
        recipientEmail: email,
        recipientName: data.businessName,
        assessmentId: data.assessmentId,
        emailType: 'pathway_reminder',
        subject,
        htmlBody: htmlContent,
      }, 'sent', undefined, result.data?.id);
      
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      await logEmailSend({
        recipientEmail: email,
        recipientName: data.businessName,
        assessmentId: data.assessmentId,
        emailType: 'pathway_reminder',
        subject,
        htmlBody: htmlContent,
      }, 'failed', errorMsg);
      
      console.error('Error sending pathway reminder email:', error);
      return false;
    }
  }

  async sendCheckoutAbandonmentEmail(email: string, data: {
    businessName: string;
    pathway: string;
    planName: string;
    monthlyPrice: number;
    assessmentId: number;
  }): Promise<boolean> {
    const subject = `Complete your enrollment - ${data.planName} is waiting for you!`;
    const htmlContent = this.generateCheckoutAbandonmentHTML(data);
    
    try {
      const { client, fromEmail } = await getResendClient();
      
      const result = await client.emails.send({
        from: fromEmail,
        to: email,
        subject,
        html: htmlContent,
      });
      
      await logEmailSend({
        recipientEmail: email,
        recipientName: data.businessName,
        assessmentId: data.assessmentId,
        emailType: 'checkout_abandonment',
        subject,
        htmlBody: htmlContent,
      }, 'sent', undefined, result.data?.id);
      
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      await logEmailSend({
        recipientEmail: email,
        recipientName: data.businessName,
        assessmentId: data.assessmentId,
        emailType: 'checkout_abandonment',
        subject,
        htmlBody: htmlContent,
      }, 'failed', errorMsg);
      
      console.error('Error sending checkout abandonment email:', error);
      return false;
    }
  }

  async sendMagicLinkEmail(email: string, magicLink: string, companyName?: string): Promise<boolean> {
    const subject = 'Your Secure Login Link - Business Blueprint';
    const htmlContent = this.generateMagicLinkHTML(magicLink, companyName);
    
    try {
      const { client, fromEmail } = await getResendClient();
      
      const result = await client.emails.send({
        from: fromEmail,
        to: email,
        subject,
        html: htmlContent,
      });
      
      await logEmailSend({
        recipientEmail: email,
        recipientName: companyName,
        emailType: 'magic_link',
        subject,
        htmlBody: htmlContent,
      }, 'sent', undefined, result.data?.id);
      
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      await logEmailSend({
        recipientEmail: email,
        recipientName: companyName,
        emailType: 'magic_link',
        subject,
        htmlBody: htmlContent,
      }, 'failed', errorMsg);
      
      console.error('Error sending magic link email:', error);
      return false;
    }
  }

  async sendThankYouIntroduction(email: string, data: {
    businessName: string;
    assessmentId: number;
  }): Promise<boolean> {
    const subject = `Welcome to BusinessBlueprint – Begin Your Free Guided Tour`;
    const htmlContent = this.generateThankYouIntroductionHTML(data);
    
    try {
      const { client, fromEmail } = await getResendClient();
      
      const result = await client.emails.send({
        from: fromEmail,
        to: email,
        subject,
        html: htmlContent,
      });
      
      await logEmailSend({
        recipientEmail: email,
        recipientName: data.businessName,
        assessmentId: data.assessmentId,
        emailType: 'coach_blue_intro',
        subject,
        htmlBody: htmlContent,
      }, 'sent', undefined, result.data?.id);
      
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      await logEmailSend({
        recipientEmail: email,
        recipientName: data.businessName,
        assessmentId: data.assessmentId,
        emailType: 'coach_blue_intro',
        subject,
        htmlBody: htmlContent,
      }, 'failed', errorMsg);
      
      console.error('Error sending thank you introduction email:', error);
      return false;
    }
  }

  async sendWelcomeEmail(email: string, data: {
    businessName: string;
    assessmentId: number;
    digitalScore?: number;
  }): Promise<boolean> {
    const subject = `Welcome to Business Blueprint, ${data.businessName}!`;
    const htmlContent = this.generateWelcomeEmailHTML(data);
    
    try {
      const { client, fromEmail } = await getResendClient();
      
      const result = await client.emails.send({
        from: fromEmail,
        to: email,
        subject,
        html: htmlContent,
      });
      
      await logEmailSend({
        recipientEmail: email,
        recipientName: data.businessName,
        assessmentId: data.assessmentId,
        emailType: 'welcome',
        subject,
        htmlBody: htmlContent,
      }, 'sent', undefined, result.data?.id);
      
      console.log(`[Email] Welcome email sent to ${email}`);
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      await logEmailSend({
        recipientEmail: email,
        recipientName: data.businessName,
        assessmentId: data.assessmentId,
        emailType: 'welcome',
        subject,
        htmlBody: htmlContent,
      }, 'failed', errorMsg);
      
      console.error('Error sending welcome email:', error);
      return false;
    }
  }

  private generateWelcomeEmailHTML(data: {
    businessName: string;
    assessmentId: number;
    digitalScore?: number;
  }): string {
    const portalUrl = `${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/portal/prescriptions`;
    const scoreSection = data.digitalScore ? `
            <div style="background: rgba(255,255,255,0.2); display: inline-block; padding: 15px 30px; border-radius: 25px; margin: 15px 0; border: 2px solid rgba(255,255,255,0.3);">
                <div style="font-family: 'Archivo Semi Expanded', 'Archivo', Arial, sans-serif; font-size: 36px; font-weight: bold;">${data.digitalScore}</div>
                <div style="font-size: 14px;">Your Digital IQ Score</div>
            </div>` : '';
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Business Blueprint</title>
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Archivo+Semi+Expanded:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Archivo', Arial, sans-serif; line-height: 1.6; color: #09080E; max-width: 600px; margin: 0 auto; background: #EEFBFF; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border: 2px solid #09080E; }
        .header { 
            background: #0000FF; 
            background-image: 
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 20px 20px;
            color: white; 
            padding: 40px; 
            text-align: center; 
        }
        .content { 
            padding: 40px;
            background: #EEFBFF;
            background-image: 
                linear-gradient(rgba(0,0,255,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,255,0.02) 1px, transparent 1px);
            background-size: 20px 20px;
        }
        .cta-button { display: inline-block; background: #F97316; color: white; padding: 18px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0; box-shadow: 0 4px 15px rgba(249,115,22,0.3); }
        .footer { background: #09080E; padding: 20px; text-align: center; color: #94a3b8; font-size: 14px; }
        .footer a { color: #F97316; text-decoration: none; }
        .feature-list { list-style: none; padding: 0; margin: 25px 0; background: white; border-radius: 8px; }
        .feature-list li { padding: 12px 15px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; color: #09080E; }
        .feature-list li:last-child { border-bottom: none; }
        .feature-icon { margin-right: 15px; font-size: 20px; }
        .next-steps { background: white; border-left: 4px solid #0000FF; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="font-family: 'Archivo Semi Expanded', 'Archivo', Arial, sans-serif; margin: 0 0 10px 0;">Welcome to Business Blueprint!</h1>
            <p style="font-size: 20px; margin-top: 10px;">${data.businessName}</p>
            ${scoreSection}
        </div>
        
        <div class="content">
            <p>Congratulations on taking the first step toward transforming your digital presence!</p>
            
            <p>Your personalized Digital Growth Plan is ready. Here's what you can do next:</p>
            
            <ul class="feature-list">
                <li><span class="feature-icon">📊</span> View your complete Digital IQ Assessment results</li>
                <li><span class="feature-icon">🎯</span> See personalized recommendations for your business</li>
                <li><span class="feature-icon">🤖</span> Chat with Coach Blue, your AI business advisor</li>
                <li><span class="feature-icon">📈</span> Explore growth pathways tailored to your needs</li>
            </ul>
            
            <div class="next-steps">
                <h3 style="font-family: 'Archivo Semi Expanded', 'Archivo', Arial, sans-serif; color: #0000FF; margin-top: 0;">Your Next Steps:</h3>
                <ol style="margin: 10px 0; padding-left: 20px; color: #09080E;">
                    <li>Access your personalized prescription</li>
                    <li>Review your Digital IQ breakdown</li>
                    <li>Explore your recommended growth pathway</li>
                    <li>Start implementing your action plan</li>
                </ol>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${portalUrl}" class="cta-button">
                    View My Prescription
                </a>
            </div>
            
            <p style="font-size: 14px; color: #09080E; text-align: center;">
                Bookmark this link to easily return to your portal anytime.
            </p>
        </div>
        
        <div class="footer">
            <p>Questions? Reply to this email or visit our support center.</p>
            <p>We're here to help you succeed!</p>
            <p><small>© 2025 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }

  private generateReportHTML(data: EmailReportData): string {
    const highPriorityRecs = data.recommendations.filter(r => r.priority === 'high').slice(0, 3);
    const baseUrl = process.env.FRONTEND_URL || 'https://businessblueprint.io';
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Digital IQ Assessment Results - BusinessBlueprint</title>
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Archivo+Semi+Expanded:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Archivo', Arial, sans-serif; line-height: 1.6; color: #09080E; max-width: 600px; margin: 0 auto; background: #EEFBFF; }
        .container { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin: 20px; border: 2px solid #09080E; }
        .header { 
            background: #0000FF; 
            background-image: 
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 20px 20px;
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
        }
        .logo { font-family: 'Archivo Semi Expanded', 'Archivo', Arial, sans-serif; font-size: 28px; font-weight: 700; margin-bottom: 15px; }
        .logo span { color: #F97316; }
        .score-container { display: inline-block; background: rgba(255,255,255,0.15); border-radius: 16px; padding: 25px 40px; margin: 20px 0; border: 2px solid rgba(255,255,255,0.3); }
        .score-value { font-family: 'Archivo Semi Expanded', 'Archivo', Arial, sans-serif; font-size: 56px; font-weight: 700; color: #fff; line-height: 1; }
        .score-label { font-size: 14px; color: rgba(255,255,255,0.9); margin-top: 5px; }
        .content { 
            padding: 35px 30px; 
            background: #EEFBFF;
            background-image: 
                linear-gradient(rgba(0,0,255,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,255,0.02) 1px, transparent 1px);
            background-size: 20px 20px;
        }
        .section { margin: 30px 0; }
        .section h2 { font-family: 'Archivo Semi Expanded', 'Archivo', Arial, sans-serif; color: #0000FF; font-size: 20px; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid #F97316; padding-bottom: 8px; display: inline-block; }
        .recommendation { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #F97316; border-radius: 0 8px 8px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .recommendation h3 { font-family: 'Archivo Semi Expanded', 'Archivo', Arial, sans-serif; color: #0000FF; margin: 0 0 10px 0; font-size: 16px; }
        .recommendation p { margin: 5px 0; color: #09080E; font-size: 14px; }
        .cta-section { text-align: center; background: white; padding: 30px; margin: 25px 0; border-radius: 12px; border: 2px solid #0000FF; }
        .cta-button { display: inline-block; background: #F97316; color: white; padding: 16px 35px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 8px; box-shadow: 0 4px 15px rgba(249,115,22,0.3); }
        .secondary-button { background: #0000FF; box-shadow: 0 4px 15px rgba(0,0,255,0.3); }
        .footer { background: #09080E; padding: 25px 30px; text-align: center; color: #94a3b8; }
        .footer a { color: #F97316; text-decoration: none; }
        .footer-logo { font-family: 'Archivo Semi Expanded', 'Archivo', Arial, sans-serif; color: white; font-weight: 600; font-size: 18px; margin-bottom: 10px; }
        .footer-logo span { color: #F97316; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Business<span>Blueprint</span></div>
            <h1 style="font-family: 'Archivo Semi Expanded', 'Archivo', Arial, sans-serif; margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">Digital IQ Assessment Results</h1>
            <h2 style="margin: 0; font-weight: 400; opacity: 0.9; font-size: 18px;">${data.businessName}</h2>
            <div class="score-container">
                <div class="score-value">${data.digitalScore}</div>
                <div class="score-label">Digital IQ Score (out of 140)</div>
            </div>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>Executive Summary</h2>
                <p style="color: #09080E;">${data.summary}</p>
            </div>
            
            <div class="section">
                <h2>Priority Recommendations</h2>
                ${highPriorityRecs.map(rec => `
                    <div class="recommendation">
                        <h3>${rec.title}</h3>
                        <p>${rec.description}</p>
                        ${rec.productId ? `<p style="color: #F97316; font-weight: 600; margin-top: 10px;">Recommended Solution: ${rec.productId.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</p>` : ''}
                        ${rec.productBenefits && rec.productBenefits.length > 0 ? `
                        <ul style="margin: 10px 0; padding-left: 20px; font-size: 13px; color: #09080E;">
                            ${rec.productBenefits.slice(0, 2).map((benefit: string) => `<li>${benefit}</li>`).join('')}
                        </ul>` : ''}
                        <p><strong style="color: #0000FF;">Impact:</strong> ${rec.estimatedImpact} | <strong style="color: #0000FF;">Effort:</strong> ${rec.estimatedEffort}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="section" style="background: white; padding: 25px; border-radius: 12px; border: 2px solid #0000FF; margin-top: 20px;">
                <h2 style="text-align: center; border-bottom: none; display: block;">Your Recommended Products</h2>
                <div style="display: grid; gap: 15px; margin-top: 15px;">
                    <div style="display: flex; align-items: center; padding: 15px; background: #EEFBFF; border-radius: 8px; border-left: 4px solid #0000FF;">
                        <div>
                            <h4 style="margin: 0 0 5px 0; color: #0000FF; font-family: 'Archivo Semi Expanded', Arial, sans-serif;">CommVerse Bundle</h4>
                            <p style="margin: 0; font-size: 14px; color: #09080E;">Complete communication suite: /send, /inbox, /content, /livechat</p>
                            <p style="margin: 5px 0 0 0; font-size: 14px; font-weight: 600; color: #F97316;">$99/month - Save $37</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; padding: 15px; background: #EEFBFF; border-radius: 8px; border-left: 4px solid #F97316;">
                        <div>
                            <h4 style="margin: 0 0 5px 0; color: #0000FF; font-family: 'Archivo Semi Expanded', Arial, sans-serif;">LocalBlue Bundle</h4>
                            <p style="margin: 0; font-size: 14px; color: #09080E;">Local SEO control: /localblue, /listings, /reputation</p>
                            <p style="margin: 5px 0 0 0; font-size: 14px; font-weight: 600; color: #F97316;">$59/month - Save $19</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="cta-section">
                <h2 style="font-family: 'Archivo Semi Expanded', 'Archivo', Arial, sans-serif; color: #0000FF; margin-top: 0;">View Your Complete Prescription</h2>
                <p style="color: #09080E; margin-bottom: 20px;">Access your personalized growth plan and recommendations:</p>
                
                <a href="${baseUrl}/portal/prescriptions" class="cta-button">
                    View My Prescription
                </a>
                
                <a href="${baseUrl}/ai-coach" class="cta-button secondary-button">
                    Talk to Coach Blue
                </a>
                
                <p style="margin-top: 20px; font-size: 14px;">
                    <a href="${baseUrl}/portal/dashboard" style="color: #0000FF; text-decoration: underline;">Access Client Portal</a>
                </p>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-logo">Business<span>Blueprint</span></div>
            <p>Powered by AI-driven business intelligence</p>
            <p>Questions? <a href="mailto:support@businessblueprint.io">Contact our support team</a></p>
            <p style="font-size: 12px; margin-top: 15px;">&copy; 2025 BusinessBlueprint.io - All rights reserved</p>
        </div>
    </div>
</body>
</html>`;
  }

  private generateVerificationEmailHTML(companyName: string, verificationCode: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #8B5CF6, #0057FF); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .code-box { background: #f8f9fa; border: 2px dashed #8B5CF6; padding: 30px; text-align: center; border-radius: 8px; margin: 30px 0; }
        .code { font-size: 36px; font-weight: bold; color: #8B5CF6; letter-spacing: 8px; font-family: 'Courier New', monospace; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .warning { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 Verify Your Email</h1>
            <p>${companyName}</p>
        </div>
        
        <div class="content">
            <p>Hello,</p>
            <p>Please use the verification code below to confirm your email address and activate your account:</p>
            
            <div class="code-box">
                <div class="code">${verificationCode}</div>
            </div>
            
            <p>Enter this code on the verification page to complete your email confirmation.</p>
            
            <div class="warning">
                <p style="margin: 0;"><strong>Security Note:</strong> This code expires in 15 minutes. Never share this code with anyone.</p>
            </div>
            
            <p>If you didn't request this verification, you can safely ignore this email.</p>
        </div>
        
        <div class="footer">
            <p>Need help? Contact our support team.</p>
            <p><small>© 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }

  private generateEmailChangeNotificationHTML(companyName: string, newEmail: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Address Changed</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #F59E0B, #DC2626); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .alert-box { background: #FEF2F2; border: 2px solid #DC2626; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .cta-button { display: inline-block; background: #DC2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚠️ Email Address Changed</h1>
            <p>${companyName}</p>
        </div>
        
        <div class="content">
            <p>This is an important security notification.</p>
            
            <div class="alert-box">
                <p style="margin: 0;"><strong>Your account email has been changed to:</strong></p>
                <p style="font-size: 18px; margin: 10px 0; font-weight: bold;">${newEmail}</p>
            </div>
            
            <p>If you made this change, you can safely ignore this email. Your account is secure.</p>
            
            <p><strong>Did not make this change?</strong></p>
            <p>If you did not authorize this email change, please take immediate action:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/contact" class="cta-button">
                    Contact Support Immediately
                </a>
            </div>
            
            <p style="font-size: 14px; color: #666;">
                This notification was sent to your previous email address as a security measure.
            </p>
        </div>
        
        <div class="footer">
            <p>For security questions, contact our support team immediately.</p>
            <p><small>© 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }

  private generateEnrollmentConfirmationHTML(data: {
    businessName: string;
    pathway: string;
    planName: string;
    monthlyPrice: number;
    nextBillingDate: Date;
    features: string[];
  }): string {
    const pathwayColor = data.pathway === 'msp' ? '#8B5CF6' : '#FF6B35';
    const pathwayName = data.pathway === 'msp' ? 'Managed Services' : 'DIY Platform';
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Business Blueprint</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, ${pathwayColor}, #0057FF); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .plan-box { background: #f8f9fa; border: 2px solid ${pathwayColor}; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .feature-list { list-style: none; padding: 0; margin: 20px 0; }
        .feature-list li { padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
        .feature-list li:before { content: "✓ "; color: ${pathwayColor}; font-weight: bold; margin-right: 10px; }
        .cta-button { display: inline-block; background: ${pathwayColor}; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .next-steps { background: #E0F2FE; border-left: 4px solid #0284C7; padding: 15px; margin: 20px 0; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Welcome to Business Blueprint!</h1>
            <p style="font-size: 18px; margin-top: 10px;">${data.businessName}</p>
        </div>
        
        <div class="content">
            <p>Congratulations! You've taken the first step toward transforming your digital presence.</p>
            
            <div class="plan-box">
                <h2 style="color: ${pathwayColor}; margin-top: 0;">${data.planName}</h2>
                <p style="font-size: 14px; color: #666; margin-bottom: 15px;">${pathwayName} Pathway</p>
                <p style="font-size: 32px; font-weight: bold; color: #333; margin: 10px 0;">
                    $${data.monthlyPrice.toFixed(2)}<span style="font-size: 16px; font-weight: normal;">/month</span>
                </p>
                <p style="font-size: 14px; color: #666;">Next billing date: ${data.nextBillingDate.toLocaleDateString()}</p>
            </div>
            
            <h3>What's Included:</h3>
            <ul class="feature-list">
                ${data.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <div class="next-steps">
                <h4 style="color: #0284C7; margin-top: 0;">🚀 Next Steps:</h4>
                <ol style="margin: 10px 0; padding-left: 20px;">
                    <li>Check your email for login credentials</li>
                    <li>Access your client portal dashboard</li>
                    <li>Complete your business profile setup</li>
                    ${data.pathway === 'msp' ? '<li>Your dedicated account manager will contact you within 24 hours</li>' : '<li>Start using the platform tools immediately</li>'}
                </ol>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/client-login" class="cta-button">
                    Access Your Dashboard
                </a>
            </div>
            
            <div style="background: #FEF3C7; border: 1px solid #F59E0B; padding: 15px; border-radius: 4px; margin: 20px 0;">
                <p style="margin: 0;"><strong>📞 Need Help?</strong> Our support team is here for you:</p>
                <p style="margin: 5px 0 0 0;">Email: support@businessblueprint.io | Live Chat available in your dashboard</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Thank you for choosing Business Blueprint!</p>
            <p>We're excited to help you grow your digital presence.</p>
            <p><small>© 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }

  private generatePathwayReminderHTML(data: {
    businessName: string;
    digitalScore: number;
    assessmentId: number;
  }): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Digital Growth Plan is Ready</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #FF6B35, #8B5CF6); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .score-badge { background: rgba(255,255,255,0.2); display: inline-block; padding: 10px 20px; border-radius: 20px; font-size: 24px; font-weight: bold; margin: 10px 0; }
        .cta-button { display: inline-block; background: #FF6B35; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 10px; }
        .secondary-button { background: #8B5CF6; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .highlight-box { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Your Digital Growth Plan is Ready!</h1>
            <p style="font-size: 18px; margin-top: 10px;">${data.businessName}</p>
            <div class="score-badge">Digital IQ Score: ${data.digitalScore}</div>
        </div>
        
        <div class="content">
            <p>Hi there,</p>
            
            <p>We noticed you completed your Digital Presence Assessment but haven't selected a pathway yet. Your personalized growth plan is ready and waiting!</p>
            
            <div class="highlight-box">
                <p style="margin: 0;"><strong>🎯 Quick Reminder:</strong> Businesses that implement their Digital Growth Plan within 30 days see 3x faster results than those who wait.</p>
            </div>
            
            <h3>Choose Your Path:</h3>
            
            <p><strong>Option 1: DIY Platform</strong> - $49/month<br>
            Perfect if you want hands-on control and prefer to manage everything yourself.</p>
            
            <p><strong>Option 2: Managed Services</strong> - Starting at $299/month<br>
            Let our experts handle everything while you focus on running your business.</p>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/assessment-checkout?id=${data.assessmentId}" class="cta-button">
                    Choose Your Pathway
                </a>
            </div>
        </div>
        
        <div class="footer">
            <p>Questions? Reply to this email or visit our support center.</p>
            <p><small>© 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }

  private generateCheckoutAbandonmentHTML(data: {
    businessName: string;
    pathway: string;
    planName: string;
    monthlyPrice: number;
    assessmentId: number;
  }): string {
    const pathwayColor = data.pathway === 'msp' ? '#8B5CF6' : '#FF6B35';
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete Your Enrollment</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, ${pathwayColor}, #0057FF); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .cta-button { display: inline-block; background: ${pathwayColor}; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Complete Your Enrollment</h1>
            <p>${data.businessName}</p>
        </div>
        
        <div class="content">
            <p>Hi there,</p>
            
            <p>We noticed you started the enrollment process for <strong>${data.planName}</strong> but didn't complete it. Your spot is still reserved!</p>
            
            <p>Complete your enrollment now to start improving your digital presence immediately.</p>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/assessment-checkout?id=${data.assessmentId}" class="cta-button">
                    Complete Your Enrollment
                </a>
            </div>
        </div>
        
        <div class="footer">
            <p>Questions? Reply to this email or visit our support center.</p>
            <p><small>© 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }

  private generateMagicLinkHTML(magicLink: string, companyName?: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Secure Login Link</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0057FF, #8B5CF6); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .cta-button { display: inline-block; background: #0057FF; color: white; padding: 18px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .warning { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .link-box { background: #f8f9fa; border: 1px solid #e0e0e0; padding: 15px; border-radius: 4px; word-break: break-all; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 Secure Login Link</h1>
            ${companyName ? `<p>${companyName}</p>` : ''}
        </div>
        
        <div class="content">
            <p>Hello,</p>
            
            <p>Click the button below to securely log into your Business Blueprint account:</p>
            
            <div style="text-align: center;">
                <a href="${magicLink}" class="cta-button">
                    Log In to Your Account
                </a>
            </div>
            
            <p style="font-size: 14px; color: #666;">Or copy and paste this link into your browser:</p>
            <div class="link-box">
                <code style="font-size: 12px;">${magicLink}</code>
            </div>
            
            <div class="warning">
                <p style="margin: 0;"><strong>Security Note:</strong> This link expires in 15 minutes and can only be used once. Never share this link with anyone.</p>
            </div>
            
            <p>If you didn't request this login link, you can safely ignore this email. Someone may have entered your email address by mistake.</p>
        </div>
        
        <div class="footer">
            <p>Need help? Contact our support team.</p>
            <p><small>© 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }

  private generateThankYouIntroductionHTML(data: {
    businessName: string;
    assessmentId: number;
  }): string {
    const baseUrl = process.env.FRONTEND_URL || 'https://businessblueprint.io';
    const coachBlueIcon = `${baseUrl}/assets/approved%20icons%20and%20logos/Additional%20Apps/4-AI_Business_Coach_-_Coach_Blue.png`;
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to BusinessBlueprint - Your Free Platform Tour Awaits</title>
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Archivo+Semi+Expanded:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Archivo', Arial, sans-serif; line-height: 1.6; color: #09080E; max-width: 600px; margin: 0 auto; background: #EEFBFF; padding: 0;">
    <div style="background: white; margin: 20px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border: 2px solid #09080E;">
        
        <!-- Header with gradient -->
        <div style="background: linear-gradient(315deg, #EEFBFF 0%, #6EA6FF 50%, #0000FF 100%); color: white; padding: 40px; text-align: center;">
            <div style="font-family: 'Archivo Semi Expanded', Arial, sans-serif; font-size: 22px; font-weight: 700; margin-bottom: 15px;">
                Business<span style="color: #F97316;">Blueprint</span>
            </div>
            <h1 style="font-family: 'Archivo Semi Expanded', Arial, sans-serif; margin: 15px 0 5px 0; font-size: 28px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">Welcome to BusinessBlueprint!</h1>
            <p style="margin: 0; font-size: 16px; opacity: 0.95;">Step 1 Complete: Digital IQ Assessment</p>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 40px; background: #EEFBFF;">
            <p style="font-size: 18px; margin-bottom: 20px;">Congratulations <strong>${data.businessName}</strong>!</p>
            
            <p style="margin-bottom: 25px;">You've completed <strong>Step 1</strong> of your digital transformation journey. Your personalized prescription is ready, and we've created a <strong>FREE guided tour</strong> to help you understand exactly how to use it.</p>
            
            <!-- Free Tour Highlight -->
            <div style="background: white; border-radius: 12px; padding: 25px; margin: 25px 0; border: 3px solid #0000FF; text-align: center;">
                <h2 style="font-family: 'Archivo Semi Expanded', Arial, sans-serif; color: #0000FF; margin: 0 0 15px 0; font-size: 22px;">Your FREE Platform Tour</h2>
                <p style="color: #09080E; margin: 0 0 15px 0; font-size: 16px;">A 5-step interactive walkthrough covering:</p>
                <div style="text-align: left; max-width: 350px; margin: 0 auto;">
                    <div style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;">✓ How to read your prescription</div>
                    <div style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;">✓ LocalBlue tools for local visibility</div>
                    <div style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;">✓ Coach Blue AI mentorship overview</div>
                    <div style="padding: 8px 0;">✓ CommVerse communication suite</div>
                </div>
                <p style="color: #666; font-size: 14px; margin: 20px 0 0 0;"><strong>100% Free</strong> • Unlimited Replays • No Credit Card Required</p>
            </div>
            
            <!-- 5-Step Journey -->
            <div style="background: white; border-radius: 12px; padding: 25px; margin: 25px 0; border-left: 4px solid #F97316;">
                <h2 style="font-family: 'Archivo Semi Expanded', Arial, sans-serif; color: #F97316; margin: 0 0 20px 0; font-size: 18px;">Your 5-Step Journey:</h2>
                <div style="margin-bottom: 12px;">
                    <span style="background: #22C55E; color: white; padding: 2px 8px; border-radius: 10px; font-size: 12px; font-weight: bold;">COMPLETE</span>
                    <strong style="margin-left: 8px;">Step 1:</strong> Digital IQ Assessment
                </div>
                <div style="margin-bottom: 12px; color: #666;">
                    <span style="background: #0000FF; color: white; padding: 2px 8px; border-radius: 10px; font-size: 12px; font-weight: bold;">NEXT</span>
                    <strong style="margin-left: 8px;">Step 2:</strong> Your Prescribed Blueprint
                </div>
                <div style="margin-bottom: 12px; color: #999;">
                    <strong style="margin-left: 40px;">Step 3:</strong> LocalBlue (Listings + Reputation)
                </div>
                <div style="margin-bottom: 12px; color: #999;">
                    <strong style="margin-left: 40px;">Step 4:</strong> Coach Blue AI Mentorship
                </div>
                <div style="color: #999;">
                    <strong style="margin-left: 40px;">Step 5:</strong> CommVerse Communication Suite
                </div>
            </div>
            
            <!-- Coach Blue Preview -->
            <div style="background: white; border-radius: 12px; padding: 25px; margin: 25px 0; border: 1px solid #E5E7EB;">
                <div style="text-align: center; margin-bottom: 15px;">
                    <img src="${coachBlueIcon}" alt="Coach Blue - AI Business Coach" style="width: 60px; height: 60px; border-radius: 12px;">
                </div>
                <h3 style="font-family: 'Archivo Semi Expanded', Arial, sans-serif; color: #0000FF; margin: 0 0 10px 0; font-size: 16px; text-align: center;">Meet Coach Blue</h3>
                <p style="color: #666; font-size: 14px; text-align: center; margin: 0;">Your 24/7 AI business mentor is introduced in Step 4 of the tour. The tour is free — ongoing mentorship is available for <strong style="color: #F97316;">$99/month</strong> if you choose to subscribe.</p>
            </div>
            
            <!-- CTA Buttons -->
            <div style="text-align: center; margin: 35px 0;">
                <a href="${baseUrl}/tour?assessmentId=${data.assessmentId}" style="display: inline-block; background: #F97316; color: white; padding: 18px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(249,115,22,0.3); margin: 10px;">
                    Begin Your Free Tour
                </a>
                <br>
                <a href="${baseUrl}/portal/prescriptions" style="display: inline-block; background: #0000FF; color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 15px rgba(0,0,255,0.2); margin: 10px;">
                    Skip to Prescription
                </a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #09080E; padding: 25px 30px; text-align: center; color: #94a3b8;">
            <div style="font-family: 'Archivo Semi Expanded', Arial, sans-serif; color: white; font-weight: 600; font-size: 16px; margin-bottom: 10px;">
                Business<span style="color: #F97316;">Blueprint</span>
            </div>
            <p style="margin: 10px 0; font-size: 14px;">Powered by AI-driven business intelligence</p>
            <p style="margin: 10px 0; font-size: 14px;">Questions? <a href="mailto:support@businessblueprint.io" style="color: #F97316; text-decoration: none;">Contact our support team</a></p>
            <p style="font-size: 12px; margin-top: 15px; color: #64748b;">&copy; 2025 BusinessBlueprint.io - All rights reserved</p>
        </div>
    </div>
</body>
</html>`;
  }

  private generateReviewAlertHTML(data: ReviewAlertData): string {
    const starColor = data.rating >= 4 ? '#22C55E' : data.rating <= 2 ? '#EF4444' : '#F59E0B';
    const stars = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Review Alert</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }
        .container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: ${starColor}; color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .stars { font-size: 32px; color: #FFD700; }
        .review-box { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${starColor}; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${data.rating <= 2 ? '⚠️' : data.rating >= 4 ? '🎉' : '📝'} New Review on ${data.platform}</h1>
            <div class="stars">${stars}</div>
        </div>
        
        <div class="content">
            <p><strong>Business:</strong> ${data.businessName}</p>
            ${data.locationName ? `<p><strong>Location:</strong> ${data.locationName}</p>` : ''}
            ${data.reviewerName ? `<p><strong>Reviewer:</strong> ${data.reviewerName}</p>` : ''}
            <p><strong>Date:</strong> ${data.reviewDate.toLocaleDateString()}</p>
            
            <div class="review-box">
                <p style="font-style: italic;">"${data.reviewText}"</p>
            </div>
            
            ${data.rating <= 2 ? `
            <div style="background: #FEF2F2; border: 1px solid #EF4444; padding: 15px; border-radius: 4px;">
                <p style="margin: 0;"><strong>⚠️ Action Recommended:</strong> This negative review needs your attention. Respond promptly to address the customer's concerns.</p>
            </div>
            ` : ''}
        </div>
        
        <div class="footer">
            <p>Manage all your reviews in your Business Blueprint dashboard.</p>
            <p><small>© 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }
}
