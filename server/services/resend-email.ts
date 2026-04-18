import { Resend } from 'resend';
import { getProductIconSvg } from './email-icons';

async function getResendCredentials(): Promise<{ apiKey: string; fromEmail: string } | null> {
  // Check ONBOARDING_RESEND_API_KEY env var FIRST (works on Railway, Replit, and all deployments)
  const envApiKey = process.env.ONBOARDING_RESEND_API_KEY;
  if (envApiKey) {
    console.log('[Email] Using ONBOARDING_RESEND_API_KEY from environment');
    return { apiKey: envApiKey, fromEmail: process.env.FROM_EMAIL || 'noreply@businessblueprint.io' };
  }

  // Secondary fallback: Replit connector (only works on Replit deployments)
  try {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    if (!hostname) {
      console.error('[Email] FAILED — no ONBOARDING_RESEND_API_KEY env var and no Replit connector configured');
      return null;
    }

    const xReplitToken = process.env.REPL_IDENTITY
      ? 'repl ' + process.env.REPL_IDENTITY
      : process.env.WEB_REPL_RENEWAL
      ? 'depl ' + process.env.WEB_REPL_RENEWAL
      : null;

    if (!xReplitToken) {
      console.error('[Email] FAILED — no ONBOARDING_RESEND_API_KEY env var and no Replit connector configured');
      return null;
    }

    const connectionSettings = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
      { headers: { 'Accept': 'application/json', 'X_REPLIT_TOKEN': xReplitToken } }
    ).then(res => res.json()).then(data => data.items?.[0]);

    if (connectionSettings?.settings?.api_key) {
      console.log('[Email] Using Replit connector');
      return {
        apiKey: connectionSettings.settings.api_key,
        fromEmail: connectionSettings.settings.from_email || 'noreply@businessblueprint.io'
      };
    }

    console.error('[Email] FAILED — no ONBOARDING_RESEND_API_KEY env var and no Replit connector configured');
    return null;
  } catch (error) {
    console.error('[Email] FAILED — no ONBOARDING_RESEND_API_KEY env var and no Replit connector configured');
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
  // SiteInspector Fast Check results (optional)
  fastCheck?: {
    overallScore: number;
    performanceScore: number;
    mobileScore: number;
    sslPresent: boolean;
    sslValid: boolean;
    criticalIssues?: Array<{ issue: string; severity: string }>;
  };
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
    console.log(`[ResendEmailService] sendAssessmentReport called for ${email}`);
    try {
      const resendClient = await getResendClient();
      if (!resendClient) {
        console.error('[ResendEmailService] sendAssessmentReport FAILED - Resend client not available');
        return false;
      }
      console.log(`[ResendEmailService] Generating Digital IQ Report HTML...`);
      const htmlContent = this.generateReportHTML(data);
      console.log(`[ResendEmailService] Sending Digital IQ Report to ${email}...`);
      const result = await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: email,
        subject: `Your Digital IQ Results: Here's Your Growth Blueprint`,
        html: htmlContent,
      });
      console.log(`[ResendEmailService] Digital IQ Report SENT to ${email}, Resend ID: ${(result as any).data?.id || 'unknown'}`);
      return true;
    } catch (error) {
      console.error('[ResendEmailService] Error sending assessment report:', error);
      return false;
    }
  }

  async sendRawEmail(to: string, subject: string, html: string): Promise<boolean> {
    try {
      const resendClient = await getResendClient();
      if (!resendClient) {
        console.warn('[ResendEmailService] sendRawEmail skipped — Resend not configured');
        return false;
      }
      await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to,
        subject,
        html,
      });
      return true;
    } catch (error) {
      console.error('Error sending raw email:', error);
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
    console.log(`[ResendEmailService] sendThankYouIntroduction called for ${email}`);
    try {
      const resendClient = await getResendClient();
      if (!resendClient) {
        console.error('[ResendEmailService] sendThankYouIntroduction FAILED - Resend client not available');
        return false;
      }
      console.log(`[ResendEmailService] Generating Coach Blue HTML...`);
      const htmlContent = this.generateThankYouIntroductionHTML(data);
      console.log(`[ResendEmailService] Sending Coach Blue email to ${email}...`);
      const result = await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: email,
        subject: `Meet Coach Blue 🤖 - Your AI Guide to Digital Success`,
        html: htmlContent,
      });
      console.log(`[ResendEmailService] Coach Blue email SENT to ${email}, Resend ID: ${(result as any).data?.id || 'unknown'}`);
      return true;
    } catch (error) {
      console.error('[ResendEmailService] Error sending Coach Blue email:', error);
      return false;
    }
  }

  async sendScansBlueFullReport(email: string, data: {
    businessName: string;
    websiteUrl: string;
    assessmentId: number;
    reportData: any;
  }): Promise<boolean> {
    console.log(`[ResendEmailService] sendScansBlueFullReport called for ${email}`);
    try {
      const resendClient = await getResendClient();
      if (!resendClient) {
        console.error('[ResendEmailService] sendScansBlueFullReport FAILED - Resend client not available');
        return false;
      }
      console.log(`[ResendEmailService] Generating Full Report HTML...`);
      const htmlContent = this.generateScansBlueFullReportHTML(data);
      console.log(`[ResendEmailService] Sending Full Report email to ${email}...`);
      const result = await resendClient.client.emails.send({
        from: resendClient.fromEmail,
        to: email,
        subject: `Your ScansBlue Full Report is Ready - ${data.businessName}`,
        html: htmlContent,
      });
      console.log(`[ResendEmailService] Full Report email SENT to ${email}, Resend ID: ${(result as any).data?.id || 'unknown'}`);
      return true;
    } catch (error) {
      console.error('[ResendEmailService] Error sending Full Report email:', error);
      return false;
    }
  }

  private generateScansBlueFullReportHTML(data: {
    businessName: string;
    websiteUrl: string;
    assessmentId: number;
    reportData: any;
  }): string {
    const baseUrl = process.env.FRONTEND_URL || 'https://businessblueprint.io';
    const dashboardUrl = `${baseUrl}/dashboard/${data.assessmentId}`;
    
    const report = data.reportData || {};
    const overallScore = report.overallScore || 65;
    const securityScore = report.securityScore || 70;
    const performanceScore = report.performanceScore || 60;
    const seoScore = report.seoScore || 55;
    const mobileScore = report.mobileScore || 75;
    
    const getScoreColor = (score: number): string => {
      if (score >= 80) return '#10B981';
      if (score >= 60) return '#F59E0B';
      return '#EF4444';
    };
    
    const issues = report.issues || [];
    const recommendations = report.recommendations || [];
    
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ScansBlue Full Report - ${data.businessName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Archivo', Arial, sans-serif; line-height: 1.6; color: #09080E; background-color: #f5f5f5; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: #EEFBFF;">
    <!-- Header -->
    <div style="background: linear-gradient(315deg, #EEFBFF 0%, #8085A1 50%, #09080E 100%); padding: 30px 20px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">ScansBlue</h1>
      <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Full Website Analysis Report</p>
    </div>
    
    <!-- Main Content -->
    <div style="padding: 30px 25px; background: white;">
      <p style="font-size: 16px; margin-bottom: 20px;">
        Great news, <strong>${data.businessName}</strong>! Your comprehensive website analysis is complete.
      </p>
      
      <div style="text-align: center; padding: 20px; background: #f9fafb; border-radius: 12px; margin-bottom: 25px;">
        <p style="margin: 0 0 5px; color: #6B7280; font-size: 14px;">Website Analyzed</p>
        <p style="margin: 0; font-size: 16px; font-weight: 600; color: #09080E; word-break: break-all;">${data.websiteUrl}</p>
      </div>
      
      <!-- Overall Score -->
      <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #09080E08, #09080E15); border-radius: 12px; margin-bottom: 25px; border: 2px solid #09080E20;">
        <p style="margin: 0 0 10px; color: #6B7280; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Overall Score</p>
        <div style="font-size: 64px; font-weight: 700; color: ${getScoreColor(overallScore)}; line-height: 1;">${overallScore}</div>
        <p style="margin: 5px 0 0; color: #6B7280; font-size: 14px;">out of 100</p>
      </div>
      
      <!-- Category Scores -->
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 15px; color: #09080E;">Category Breakdown</h2>
      <div style="display: grid; gap: 10px; margin-bottom: 25px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; background: #f9fafb; border-radius: 8px;">
          <span style="font-weight: 600;">🔒 Security</span>
          <span style="font-size: 18px; font-weight: 700; color: ${getScoreColor(securityScore)};">${securityScore}/100</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; background: #f9fafb; border-radius: 8px;">
          <span style="font-weight: 600;">⚡ Performance</span>
          <span style="font-size: 18px; font-weight: 700; color: ${getScoreColor(performanceScore)};">${performanceScore}/100</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; background: #f9fafb; border-radius: 8px;">
          <span style="font-weight: 600;">🔍 SEO</span>
          <span style="font-size: 18px; font-weight: 700; color: ${getScoreColor(seoScore)};">${seoScore}/100</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; background: #f9fafb; border-radius: 8px;">
          <span style="font-weight: 600;">📱 Mobile</span>
          <span style="font-size: 18px; font-weight: 700; color: ${getScoreColor(mobileScore)};">${mobileScore}/100</span>
        </div>
      </div>
      
      ${issues.length > 0 ? `
      <!-- Critical Issues -->
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 15px; color: #09080E;">⚠️ Issues Found</h2>
      <div style="margin-bottom: 25px;">
        ${issues.slice(0, 5).map((issue: any) => `
        <div style="padding: 12px 15px; background: #FEF2F2; border-left: 4px solid #EF4444; border-radius: 0 8px 8px 0; margin-bottom: 10px;">
          <p style="margin: 0; font-weight: 600; color: #B91C1C;">${issue.title || issue}</p>
          ${issue.description ? `<p style="margin: 5px 0 0; font-size: 14px; color: #6B7280;">${issue.description}</p>` : ''}
        </div>
        `).join('')}
      </div>
      ` : ''}
      
      ${recommendations.length > 0 ? `
      <!-- Recommendations -->
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 15px; color: #09080E;">💡 Top Recommendations</h2>
      <div style="margin-bottom: 25px;">
        ${recommendations.slice(0, 5).map((rec: any, index: number) => `
        <div style="padding: 12px 15px; background: #F0FDF4; border-left: 4px solid #10B981; border-radius: 0 8px 8px 0; margin-bottom: 10px;">
          <p style="margin: 0; font-weight: 600; color: #047857;">${index + 1}. ${rec.title || rec}</p>
          ${rec.impact ? `<p style="margin: 5px 0 0; font-size: 14px; color: #6B7280;">Impact: ${rec.impact}</p>` : ''}
        </div>
        `).join('')}
      </div>
      ` : ''}
      
      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${dashboardUrl}" style="display: inline-block; background: #09080E; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
          View Full Dashboard
        </a>
      </div>
      
      <p style="color: #6B7280; font-size: 14px; text-align: center;">
        Need help implementing these recommendations? Our team is here to help.
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background: #f2f4f6; padding: 25px; text-align: center;">
      <p style="margin: 0 0 10px; color: #6B7280; font-size: 14px;">
        Powered by <strong>BusinessBlueprint.io</strong>
      </p>
      <p style="margin: 0; color: #9CA3AF; font-size: 12px;">
        © ${new Date().getFullYear()} TriadBlue • All rights reserved
      </p>
    </div>
  </div>
</body>
</html>
`;
  }

  private generateReportHTML(data: EmailReportData): string {
    const highPriorityRecs = data.recommendations.filter(r => r.priority === 'high').slice(0, 3);
    const baseUrl = process.env.FRONTEND_URL || 'https://businessblueprint.io';
    
    const getProductIcon = (productId: string | undefined): string => getProductIconSvg(productId, 48);
    
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>Your Digital IQ Assessment Results</title>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Archivo+Semi+Expanded:wght@600;700&display=swap" rel="stylesheet">
  <style>
    body { 
      font-family: 'Archivo', sans-serif;
      line-height: 1.6;
      color: #09080E;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #EEFBFF;
    }
    .email-outline {
      border: 2px solid #F97316;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background: #f2f4f6;
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent);
      background-size: 50px 50px;
      background-color: #f2f4f6;
      color: #09080E;
      padding: 40px 30px;
      text-align: center;
      border-bottom: 4px solid #F97316;
    }
    .header h1 {
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-weight: 700;
      font-size: 32px;
      margin: 0 0 10px 0;
      color: #09080E;
    }
    .header .score {
      font-size: 48px;
      font-weight: 700;
      color: #F97316;
      margin: 20px 0 10px 0;
    }
    .header .score-label {
      font-size: 16px;
      color: #09080E;
      opacity: 0.9;
    }
    .content {
      background: #EEFBFF;
      padding: 40px 30px;
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent);
      background-size: 50px 50px;
      background-color: #EEFBFF;
    }
    .content p {
      font-size: 16px;
      color: #09080E;
      margin: 16px 0;
    }
    .content h2 {
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-weight: 700;
      font-size: 24px;
      color: #09080E;
      margin: 30px 0 15px 0;
    }
    .content h3 {
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-weight: 600;
      font-size: 18px;
      color: #09080E;
      margin: 20px 0 10px 0;
    }
    .summary-box {
      background: #ffffff;
      border-left: 4px solid #F97316;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
    }
    .recommendation {
      background: #ffffff;
      border: 2px solid #09080E;
      border-radius: 8px;
      padding: 25px;
      margin: 25px 0;
    }
    .recommendation-header {
      margin-bottom: 15px;
    }
    .recommendation-header svg {
      width: 48px;
      height: 48px;
      vertical-align: middle;
      margin-right: 15px;
    }
    .recommendation-header h3 {
      display: inline;
      vertical-align: middle;
      margin: 0;
      color: #09080E;
      font-size: 20px;
    }
    .product-name {
      color: #F97316;
      font-weight: 700;
      font-size: 18px;
    }
    .recommendation ul {
      margin: 15px 0;
      padding-left: 20px;
    }
    .recommendation li {
      margin: 8px 0;
      color: #09080E;
    }
    .bundle-callout {
      background: #ffffff;
      border: 2px solid #09080E;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .bundle-item {
      margin: 15px 0;
    }
    .bundle-item img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      margin-right: 12px;
    }
    .bundle-item p {
      display: inline;
      margin: 0;
      font-size: 15px;
      vertical-align: middle;
    }
    .bundle-callout strong {
      color: #09080E;
    }
    .cta-button {
      display: inline-block;
      background: transparent;
      color: #F97316;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 700;
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-size: 16px;
      margin: 20px 10px 20px 0;
      border: 2px solid #F97316;
    }
    .cta-button.secondary {
      background: transparent;
      color: #09080E;
      border: 2px solid #09080E;
    }
    .footer {
      background: #f2f4f6;
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent);
      background-size: 50px 50px;
      background-color: #f2f4f6;
      color: #09080E;
      padding: 30px;
      text-align: center;
      border-top: 4px solid #F97316;
    }
    .footer p {
      font-size: 14px;
      color: #09080E;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-outline">
      <!-- HEADER -->
      <div class="header">
        <h1>Your Digital IQ Assessment Results</h1>
        <div class="score">${data.digitalScore}<span style="font-size: 24px; opacity: 0.8;">/140</span></div>
        <div class="score-label">Digital IQ Score</div>
      </div>
      
      <!-- CONTENT -->
      <div class="content">
        <p><strong>Hi ${data.businessName},</strong></p>
        
        <p>Thank you for completing your Digital IQ Assessment! We've analyzed your complete digital presence across 9 critical areas, and your personalized growth prescription is ready.</p>
        
        <!-- EXECUTIVE SUMMARY -->
        <div class="summary-box">
          <h3 style="margin-top: 0; color: #09080E;">What This Score Means</h3>
          <p>${data.summary}</p>
          <p><strong>The opportunity:</strong> Businesses that implement foundational digital tools typically see 20-40% revenue growth within the first year.</p>
        </div>
        
        <h2>Your Priority Recommendations</h2>
        <p>Based on your assessment, here are the specific tools that will have the biggest impact on your business:</p>
        
        ${highPriorityRecs.map(rec => `
        <!-- RECOMMENDATION: ${rec.title} -->
        <div class="recommendation">
          <div class="recommendation-header">
            ${getProductIcon(rec.productId)}
            <h3>${rec.title}</h3>
          </div>
          
          <p><strong>You need:</strong> ${rec.description}</p>
          
          <p><strong>Why it matters:</strong> ${rec.estimatedImpact}</p>
          
          ${rec.productId ? `<p><strong>Our recommendation: <span class="product-name">${rec.productId.charAt(0).toUpperCase() + rec.productId.slice(1)}</span></strong></p>` : ''}
          
          ${rec.productBenefits && rec.productBenefits.length > 0 ? `
          <ul>
            ${rec.productBenefits.map((benefit: string) => `<li><strong>${benefit.split(':')[0]}:</strong>${benefit.includes(':') ? benefit.split(':').slice(1).join(':') : ''}</li>`).join('')}
          </ul>` : ''}
          
          <p><strong>Expected impact:</strong> ${rec.estimatedEffort}</p>
        </div>
        `).join('')}
        
        <!-- BUNDLE ADVANTAGE -->
        <div class="bundle-callout">
          <div style="margin-bottom: 20px;">
            <strong style="font-size: 18px; color: #09080E;">💡 Smart Move: Save with Bundles</strong>
          </div>
          
          <div class="bundle-item">
            <p><strong style="color: #F97316;">/ compass suite ($99/mo):</strong> Includes / promote (email campaigns), / post (social media), / respond (unified inbox), and / engage (live chat widget) — all four communication tools in one integrated platform.</p>
          </div>

          <div class="bundle-item" style="margin-top: 20px;">
            <p><strong style="color: #97ACCA;">/ anchor suite ($99/mo):</strong> Includes / elevate (reputation & reviews), / publish (business listings), / optimize (SEO health), and / amplify (advertising) — complete local SEO and visibility.</p>
          </div>
        </div>
        
        <h2>Next Steps</h2>
        <p>You've got the diagnosis—now it's time to take action. Here's what to do:</p>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${baseUrl}/portal/prescriptions" class="cta-button">
            View Your Complete Prescription
          </a>
          <br>
          <a href="${baseUrl}/tour" class="cta-button secondary">
            Take the Free Platform Tour
          </a>
        </div>
        
        <p style="margin-top: 40px;">Your complete prescription includes detailed implementation steps, product comparisons, and a prioritized action plan. Plus, you'll receive a welcome from Coach Blue—our AI mentor who offers a free guided tour of the platform (ongoing mentorship available as optional $99/mo upgrade).</p>
        
        <p><strong>Questions?</strong> Just reply to this email—we're here to help!</p>
        
        <!-- SCANSBLUE FULL REPORT UPSELL -->
        <div style="background: #ffffff; border: 2px solid #09080E; border-radius: 8px; padding: 25px; margin: 25px 0;">
          <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
            <img src="${baseUrl}/scansblue-icon.png" alt="ScansBlue" style="width: 48px; height: 48px;" />
            <h3 style="margin: 0; color: #09080E; font-family: 'Archivo Semi Expanded', sans-serif;">Want a Complete Website Audit?</h3>
          </div>
          
          <p style="margin: 0 0 15px 0;">Your Digital IQ Assessment included a quick scan of your website. For a <strong>comprehensive technical analysis</strong> with actionable insights:</p>
          
          <ul style="margin: 15px 0; padding-left: 20px;">
            <li><strong>Performance Analysis:</strong> Page speed, loading times, Core Web Vitals, optimization opportunities</li>
            <li><strong>SEO Deep Dive:</strong> Meta tags, structured data, indexability, mobile SEO, local SEO factors</li>
            <li><strong>Security Audit:</strong> SSL configuration, vulnerabilities, security headers, best practices</li>
            <li><strong>Mobile Optimization:</strong> Responsive design, mobile usability, touch targets, viewport</li>
            <li><strong>Code Quality:</strong> HTML validation, accessibility (WCAG) compliance, best practices</li>
            <li><strong>Competitive Analysis:</strong> How your site compares to industry standards</li>
          </ul>
          
          <p style="font-size: 18px; color: #09080E; margin: 20px 0;">
            <strong>Get your complete ScansBlue Report for just $10</strong>
          </p>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="${baseUrl}/scansblue/purchase?assessment=${data.assessmentId}" style="display: inline-block; background: #09080E; color: #EEFBFF; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-family: 'Archivo Semi Expanded', sans-serif; font-size: 16px; border: 2px solid #09080E;">
              Get Full Website Audit - $10
            </a>
          </div>
          
          <p style="font-size: 14px; color: #09080E; opacity: 0.8; text-align: center; margin-top: 15px;">
            <em>Report delivered within 5 minutes of payment • Detailed PDF included</em>
          </p>
        </div>
      </div>
      
      <!-- FOOTER -->
      <div class="footer">
        <p><strong>BusinessBlueprint.io</strong></p>
        <p>Your AI-Powered Partner in Digital Growth</p>
        <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
          This assessment was powered by our Business IQ Scanner using advanced AI analysis and real-time digital presence monitoring.
        </p>
        <p style="font-size: 12px; opacity: 0.8;">© 2026 BusinessBlueprint.io</p>
      </div>
    </div>
  </div>
</body>
</html>`;
  }

  private generateVerificationEmailHTML(companyName: string, verificationCode: string): string {
    return `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>Verify Your Email</title>
<style>
  :root { color-scheme: light only; }
  body { font-family: 'Archivo Semi Expanded', Archivo, sans-serif; line-height: 1.6; color: #09080E; max-width: 600px; margin: 0 auto; background: #EEFBFF; }
  .email-container { max-width: 600px; margin: 0 auto; background: #EEFBFF; }
  .email-outline { border: 2px solid #F97316; border-radius: 8px; overflow: hidden; }
  .header {
    background: #f2f4f6;
    background-image:
      linear-gradient(0deg, transparent 24%, rgba(0,0,255,0.08) 25%, rgba(0,0,255,0.08) 26%, transparent 27%, transparent 74%, rgba(0,0,255,0.08) 75%, rgba(0,0,255,0.08) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(0,0,255,0.08) 25%, rgba(0,0,255,0.08) 26%, transparent 27%, transparent 74%, rgba(0,0,255,0.08) 75%, rgba(0,0,255,0.08) 76%, transparent 77%, transparent);
    background-size: 50px 50px;
    color: #09080E; padding: 40px 30px; text-align: center; border-bottom: 4px solid #F97316;
  }
  .content { padding: 40px; background: #EEFBFF;
    background-image:
      linear-gradient(0deg, transparent 24%, rgba(0,0,255,0.04) 25%, rgba(0,0,255,0.04) 26%, transparent 27%, transparent 74%, rgba(0,0,255,0.04) 75%, rgba(0,0,255,0.04) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(0,0,255,0.04) 25%, rgba(0,0,255,0.04) 26%, transparent 27%, transparent 74%, rgba(0,0,255,0.04) 75%, rgba(0,0,255,0.04) 76%, transparent 77%, transparent);
    background-size: 50px 50px; }
  .code-box { background: #FFFFFF; border: 2px dashed #F97316; padding: 30px; text-align: center; border-radius: 8px; margin: 30px 0; }
  .code { font-size: 36px; font-weight: bold; color: #F97316; letter-spacing: 8px; font-family: 'Archivo Semi Expanded', monospace; }
  .footer {
    background: #f2f4f6;
    background-image:
      linear-gradient(0deg, transparent 24%, rgba(0,0,255,0.08) 25%, rgba(0,0,255,0.08) 26%, transparent 27%, transparent 74%, rgba(0,0,255,0.08) 75%, rgba(0,0,255,0.08) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(0,0,255,0.08) 25%, rgba(0,0,255,0.08) 26%, transparent 27%, transparent 74%, rgba(0,0,255,0.08) 75%, rgba(0,0,255,0.08) 76%, transparent 77%, transparent);
    background-size: 50px 50px; padding: 20px; text-align: center; color: #09080E; font-size: 14px; border-top: 4px solid #F97316; }
  .warning { background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0; border-radius: 4px; }
</style>
</head>
<body>
<div class="email-container"><div class="email-outline">
  <div class="header">
    <h1 style="font-family: 'Archivo Semi Expanded', sans-serif; margin: 0 0 8px;">Verify Your Email</h1>
    <p style="margin: 0; font-size: 16px;">${companyName}</p>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>Please use the verification code below to confirm your email address and activate your account:</p>
    <div class="code-box"><div class="code">${verificationCode}</div></div>
    <p>Enter this code on the verification page to complete your email confirmation.</p>
    <div class="warning"><p style="margin: 0;"><strong>Security Note:</strong> This code expires in 15 minutes. Never share this code with anyone.</p></div>
    <p>If you didn't request this verification, you can safely ignore this email.</p>
  </div>
  <div class="footer">
    <p>Need help? Contact our support team.</p>
    <p><small>&copy; 2026 businessblueprint.io</small></p>
  </div>
</div></div>
</body></html>`;
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

  private generateThankYouIntroductionHTML(data: { businessName: string; assessmentId: number }): string {
    const baseUrl = process.env.FRONTEND_URL || 'https://businessblueprint.io';
    const coachBlueIcon = `${baseUrl}/4-AI_Business_Coach_-_Coach_Blue.png`;
    const tourUrl = `${baseUrl}/tour?assessmentId=${data.assessmentId}`;
    const prescriptionUrl = `${baseUrl}/portal/prescriptions`;
    
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>Meet Coach Blue</title>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Archivo+Semi+Expanded:wght@600;700&display=swap" rel="stylesheet">
  <style>
    body { 
      font-family: 'Archivo', sans-serif;
      line-height: 1.6;
      color: #09080E;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #EEFBFF;
    }
    .email-outline {
      border: 2px solid #F97316;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background: #f2f4f6;
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent);
      background-size: 50px 50px;
      background-color: #f2f4f6;
      color: #09080E;
      padding: 40px 30px;
      text-align: center;
      border-bottom: 4px solid #F97316;
    }
    .content {
      background: #EEFBFF;
      padding: 40px 30px;
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent);
      background-size: 50px 50px;
      background-color: #EEFBFF;
    }
    .footer {
      background: #f2f4f6;
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.08) 25%, rgba(0, 0, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.08) 75%, rgba(0, 0, 255, 0.08) 76%, transparent 77%, transparent);
      background-size: 50px 50px;
      background-color: #f2f4f6;
      color: #09080E;
      padding: 30px;
      text-align: center;
      border-top: 4px solid #F97316;
    }
    .cta-button {
      display: inline-block;
      background: #F97316;
      color: #EEFBFF;
      padding: 16px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 700;
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-size: 16px;
      margin: 20px 10px 20px 0;
      border: 2px solid #F97316;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-outline">
      <!-- HEADER -->
      <div class="header">
        <img src="${coachBlueIcon}" alt="Coach Blue" style="width: 80px; height: 80px; margin-bottom: 15px;" />
        <h1 style="font-family: 'Archivo Semi Expanded', sans-serif; font-size: 28px; color: #09080E; margin: 0;">
          Meet Coach Blue 🤖
        </h1>
        <p style="font-size: 18px; color: #09080E; margin-top: 10px;">Your AI Guide to Digital Success</p>
      </div>
      
      <!-- CONTENT -->
      <div class="content">
        <p><strong>Hi ${data.businessName},</strong></p>
        
        <p>Congratulations on completing your Digital IQ Assessment! 🎉</p>
        
        <p>I'm <strong>Coach Blue</strong>, your AI business mentor here at BusinessBlueprint. Think of me as your personal guide to digital growth—available 24/7 to help you navigate the world of digital marketing and implement your prescription recommendations.</p>
        
        <h2 style="font-family: 'Archivo Semi Expanded', sans-serif; color: #09080E; margin-top: 30px;">Your Free Platform Tour</h2>
        
        <p>Before we dive in, let me give you a <strong>FREE guided tour</strong> of BusinessBlueprint. I'll walk you through:</p>
        
        <ul style="margin: 20px 0; padding-left: 20px;">
          <li><strong>Your Prescription:</strong> How to read and prioritize your recommendations</li>
          <li><strong>The 6-Step Journey:</strong> Scan → Blueprint → / connect → / anchor suite → / compass suite → Coach Blue</li>
          <li><strong>Our Tools:</strong> A complete overview of all our apps and what they do</li>
          <li><strong>Getting Started:</strong> Which tools to implement first for maximum impact</li>
        </ul>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${tourUrl}" class="cta-button">
            Start Your Free Tour
          </a>
        </div>
        
        <p style="font-size: 14px; color: #09080E; opacity: 0.8; text-align: center;">
          <em>The tour is completely free and you can replay it as many times as you want!</em>
        </p>
        
        <div style="border-top: 2px solid #09080E; border-bottom: 2px solid #09080E; padding: 20px; margin: 40px 0; background: #ffffff;">
          <h3 style="font-family: 'Archivo Semi Expanded', sans-serif; color: #09080E; margin-top: 0;">Want Me as Your Personal Mentor?</h3>
          
          <p>The platform tour is just the beginning. If you want <strong>ongoing, personalized guidance</strong> as you grow your business, I'm available as a premium subscription.</p>
          
          <p><strong>With Coach Blue ($99/mo standalone, $59/mo with one suite, free with both suites), I'll help you:</strong></p>
          <ul>
            <li>Implement your prescription step-by-step</li>
            <li>Troubleshoot technical issues</li>
            <li>Answer questions about any of our tools</li>
            <li>Provide strategic advice tailored to your business</li>
            <li>Keep you motivated and on track</li>
          </ul>
          
          <p style="margin-bottom: 0;">Think of it like having a business consultant available 24/7—but for a fraction of the cost.</p>
        </div>
        
        <h2 style="font-family: 'Archivo Semi Expanded', sans-serif; color: #09080E;">What's Next?</h2>
        
        <p>Here's what I recommend:</p>
        
        <ol style="margin: 20px 0; padding-left: 20px;">
          <li><strong>Take the free tour</strong> (10-15 minutes) to get oriented</li>
          <li><strong>Review your prescription</strong> to see what we recommend</li>
          <li><strong>Pick one tool to start with</strong> (I can help you choose!)</li>
          <li><strong>Implement and see results</strong></li>
        </ol>
        
        <p>Ready to get started? I'm here whenever you need me!</p>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${tourUrl}" class="cta-button">
            Begin Free Tour
          </a>
          <br>
          <a href="${prescriptionUrl}" class="cta-button" style="background: #09080E; border: 2px solid #09080E;">
            View My Prescription
          </a>
        </div>
        
        <p style="margin-top: 40px;"><strong>Questions?</strong> Just reply to this email—I'm here to help!</p>
        
        <p>To your digital success,<br>
        <strong>Coach Blue 🤖</strong><br>
        <em>Your AI Business Mentor</em></p>
      </div>
      
      <!-- FOOTER -->
      <div class="footer">
        <p><strong>BusinessBlueprint.io</strong></p>
        <p>Your AI-Powered Partner in Digital Growth</p>
        <p style="margin-top: 20px; font-size: 12px; opacity: 0.7;">© 2026 BusinessBlueprint.io</p>
      </div>
    </div>
  </div>
</body>
</html>`;
  }
}
