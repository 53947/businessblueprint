import { Resend } from 'resend';

// Replit Resend Connector Integration
// WARNING: Never cache this client - access tokens may expire
let connectionSettings: any;

async function getResendCredentials(): Promise<{ apiKey: string; fromEmail: string } | null> {
  try {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    
    // If no connector hostname, fall back to env var
    if (!hostname) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        return { apiKey, fromEmail: process.env.FROM_EMAIL || 'noreply@businessblueprint.io' };
      }
      console.warn('[Email Service] No Resend connector or RESEND_API_KEY configured');
      return null;
    }
    
    const xReplitToken = process.env.REPL_IDENTITY 
      ? 'repl ' + process.env.REPL_IDENTITY 
      : process.env.WEB_REPL_RENEWAL 
      ? 'depl ' + process.env.WEB_REPL_RENEWAL 
      : null;

    if (!xReplitToken) {
      // Fall back to env var
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        return { apiKey, fromEmail: process.env.FROM_EMAIL || 'noreply@businessblueprint.io' };
      }
      console.warn('[Email Service] No Replit token found for connector');
      return null;
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

    if (!connectionSettings || !connectionSettings.settings?.api_key) {
      // Fall back to env var
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        console.log('[Email Service] Using RESEND_API_KEY from environment');
        return { apiKey, fromEmail: process.env.FROM_EMAIL || 'noreply@businessblueprint.io' };
      }
      console.warn('[Email Service] Resend connector not configured');
      return null;
    }
    
    console.log('[Email Service] Using Resend connector credentials');
    return {
      apiKey: connectionSettings.settings.api_key,
      fromEmail: connectionSettings.settings.from_email || 'noreply@businessblueprint.io'
    };
  } catch (error) {
    console.error('[Email Service] Error fetching Resend credentials:', error);
    // Fall back to env var
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      return { apiKey, fromEmail: process.env.FROM_EMAIL || 'noreply@businessblueprint.io' };
    }
    return null;
  }
}

// Get a fresh Resend client (never cached per connector requirements)
async function getResendClient(): Promise<{ client: Resend; fromEmail: string } | null> {
  const credentials = await getResendCredentials();
  if (!credentials) {
    return null;
  }
  return {
    client: new Resend(credentials.apiKey),
    fromEmail: credentials.fromEmail
  };
}

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

export class ResendEmailService {
  async sendVerificationEmail(email: string, companyName: string, verificationCode: string): Promise<boolean> {
    try {
      const resendClient = await getResendClient();
      if (!resendClient) {
        console.warn('[Email Service] Resend not configured');
        return false;
      }
      const htmlContent = this.generateVerificationEmailHTML(companyName, verificationCode);
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: email,
        subject: `Verify Your Email - ${verificationCode}`,
        html: htmlContent,
      });
      return true;
    } catch (error) {
      console.error('Error sending verification email:', error);
      return false;
    }
  }

  async sendEmailChangeNotification(oldEmail: string, newEmail: string, companyName: string): Promise<boolean> {
    try {
      const resendClient = await getResendClient();
      if (!resendClient) return false;
      const htmlContent = this.generateEmailChangeNotificationHTML(companyName, newEmail);
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: oldEmail,
        subject: `Email Address Changed - Action May Be Required`,
        html: htmlContent,
      });
      return true;
    } catch (error) {
      console.error('Error sending email change notification:', error);
      return false;
    }
  }

  async sendAssessmentReport(email: string, data: EmailReportData): Promise<boolean> {
    try {
      const resendClient = await getResendClient();
      if (!resendClient) return false;
      const htmlContent = this.generateReportHTML(data);
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: email,
        subject: `Your Digital Presence Assessment Results - Score: ${data.digitalScore}`,
        html: htmlContent,
      });
      return true;
    } catch (error) {
      console.error('Error sending assessment report:', error);
      return false;
    }
  }

  async sendReviewAlert(email: string, data: ReviewAlertData): Promise<boolean> {
    try {
      const resendClient = await getResendClient();
      if (!resendClient) return false;
      const htmlContent = this.generateReviewAlertHTML(data);
      const sentiment = data.rating <= 2 ? 'Negative' : data.rating >= 4 ? 'Positive' : 'Neutral';
      const urgency = data.rating <= 2 ? '⚠️ URGENT' : '';
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: email,
        subject: `${urgency} New ${sentiment} Review on ${data.platform} - ${data.rating} ${data.rating === 1 ? 'Star' : 'Stars'}`,
        html: htmlContent,
      });
      return true;
    } catch (error) {
      console.error('Error sending review alert:', error);
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
    try {
      const resendClient = await getResendClient();
      if (!resendClient) return false;
      const htmlContent = this.generateEnrollmentConfirmationHTML(data);
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: email,
        subject: `Welcome to ${data.planName} - Your Digital Growth Journey Begins!`,
        html: htmlContent,
      });
      return true;
    } catch (error) {
      console.error('Error sending enrollment confirmation:', error);
      return false;
    }
  }

  async sendPathwayReminderEmail(email: string, data: {
    businessName: string;
    digitalScore: number;
    assessmentId: number;
  }): Promise<boolean> {
    try {
      const resendClient = await getResendClient();
      if (!resendClient) return false;
      const htmlContent = this.generatePathwayReminderHTML(data);
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: email,
        subject: `Still deciding? Your Digital Growth Plan is ready, ${data.businessName}`,
        html: htmlContent,
      });
      return true;
    } catch (error) {
      console.error('Error sending pathway reminder:', error);
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
    try {
      const resendClient = await getResendClient();
      if (!resendClient) return false;
      const htmlContent = this.generateCheckoutAbandonmentHTML(data);
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: email,
        subject: `Complete your enrollment - ${data.planName} is waiting for you!`,
        html: htmlContent,
      });
      return true;
    } catch (error) {
      console.error('Error sending checkout abandonment email:', error);
      return false;
    }
  }

  async sendMagicLinkEmail(email: string, magicLink: string, companyName?: string): Promise<boolean> {
    try {
      const resendClient = await getResendClient();
      if (!resendClient) return false;
      const htmlContent = this.generateMagicLinkHTML(magicLink, companyName);
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: email,
        subject: 'Your Secure Login Link - Business Blueprint',
        html: htmlContent,
      });
      return true;
    } catch (error) {
      console.error('Error sending magic link email:', error);
      return false;
    }
  }

  async sendThankYouIntroduction(email: string, data: {
    businessName: string;
    assessmentId: number;
  }): Promise<boolean> {
    try {
      const resendClient = await getResendClient();
      if (!resendClient) return false;
      const htmlContent = this.generateThankYouIntroductionHTML(data);
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: email,
        subject: `Meet Coach Blue 🤖 - Your AI Guide to Digital Success`,
        html: htmlContent,
      });
      return true;
    } catch (error) {
      console.error('Error sending thank you introduction:', error);
      return false;
    }
  }

  private generateReportHTML(data: EmailReportData): string {
    const highPriorityRecs = data.recommendations.filter(r => r.priority === 'high').slice(0, 3);
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Your Digital Presence Assessment Results</title><style>body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }.header { background: linear-gradient(135deg, #FF6B35, #8B5CF6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }.score-circle { display: inline-block; width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; margin: 20px 0; }.content { background: white; padding: 30px; border: 1px solid #e0e0e0; }.score-value { font-size: 48px; font-weight: bold; color: #fff; }.section { margin: 30px 0; }.recommendation { background: #f8f9fa; padding: 20px; margin: 15px 0; border-left: 4px solid #FF6B35; border-radius: 4px; }.cta-button { display: inline-block; background: #FF6B35; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 5px; }.secondary-button { background: #8B5CF6; }.footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; border-radius: 0 0 8px 8px; }</style></head><body><div class="header"><h1>Digital Presence Assessment Results</h1><h2>${data.businessName}</h2><div class="score-circle"><div><div class="score-value">${data.digitalScore}</div><div style="font-size: 14px;">out of 140</div></div></div></div><div class="content"><div class="section"><h2>Executive Summary</h2><p>${data.summary}</p></div><div class="section"><h2>Priority Recommendations</h2>${highPriorityRecs.map(rec => `<div class="recommendation"><h3>${rec.title}</h3><p>${rec.description}</p><p><strong>Estimated Impact:</strong> ${rec.estimatedImpact}</p><p><strong>Estimated Effort:</strong> ${rec.estimatedEffort}</p></div>`).join('')}</div><div class="section" style="text-align: center;"><h2>Choose Your Path Forward</h2><p>Ready to improve your digital presence? We offer two paths to success:</p><a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/dashboard/${data.assessmentId}?path=diy" class="cta-button">🛠️ DIY Path - $49/month</a><a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/dashboard/${data.assessmentId}?path=msp" class="cta-button secondary-button">🎯 Managed Services - $299/month</a><p style="margin-top: 20px;"><a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/dashboard/${data.assessmentId}">View Full Report</a></p></div></div><div class="footer"><p>This assessment was powered by Google Business Intelligence and AI analysis.</p><p>Questions? Reply to this email or visit our support center.</p><p><small>© 2024 businessblueprint.io</small></p></div></body></html>`;
  }

  private generateVerificationEmailHTML(companyName: string, verificationCode: string): string {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Verify Your Email</title><style>body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: #f5f5f5; }.container { background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }.header { background: linear-gradient(135deg, #8B5CF6, #0057FF); color: white; padding: 40px; text-align: center; }.content { padding: 40px; }.code-box { background: #f8f9fa; border: 2px dashed #8B5CF6; padding: 30px; text-align: center; border-radius: 8px; margin: 30px 0; }.code { font-size: 36px; font-weight: bold; color: #8B5CF6; letter-spacing: 8px; font-family: 'Courier New', monospace; }.footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }.warning { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; border-radius: 4px; }</style></head><body><div class="container"><div class="header"><h1>📧 Verify Your Email</h1><p>${companyName}</p></div><div class="content"><p>Hello,</p><p>Please use the verification code below to confirm your email address and activate your account:</p><div class="code-box"><div class="code">${verificationCode}</div></div><p>Enter this code on the verification page to complete your email confirmation.</p><div class="warning"><p style="margin: 0;"><strong>Security Note:</strong> This code expires in 15 minutes. Never share this code with anyone.</p></div><p>If you didn't request this verification, you can safely ignore this email.</p></div><div class="footer"><p>Need help? Contact our support team.</p><p><small>© 2024 businessblueprint.io</small></p></div></div></body></html>`;
  }

  private generateEmailChangeNotificationHTML(companyName: string, newEmail: string): string {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Email Address Changed</title></head><body><p>Your account email has been changed to: ${newEmail}</p></body></html>`;
  }

  private generateEnrollmentConfirmationHTML(data: any): string {
    return `<!DOCTYPE html><html><body><p>Welcome to ${data.planName}!</p></body></html>`;
  }

  private generatePathwayReminderHTML(data: any): string {
    return `<!DOCTYPE html><html><body><p>Your Digital IQ Score: ${data.digitalScore}</p></body></html>`;
  }

  private generateCheckoutAbandonmentHTML(data: any): string {
    return `<!DOCTYPE html><html><body><p>Complete your enrollment for ${data.planName}</p></body></html>`;
  }

  private generateReviewAlertHTML(data: ReviewAlertData): string {
    return `<!DOCTYPE html><html><body><p>New ${data.rating}-star review on ${data.platform}: ${data.reviewText}</p></body></html>`;
  }

  private generateMagicLinkHTML(magicLink: string, companyName?: string): string {
    return `<!DOCTYPE html><html><body><p>Click the link to login: <a href="${magicLink}">${magicLink}</a></p></body></html>`;
  }

  private generateThankYouIntroductionHTML(data: any): string {
    return `<!DOCTYPE html><html><body><p>Thank you for completing your assessment, ${data.businessName}!</p></body></html>`;
  }
}
