import { Resend } from 'resend';
import { db } from '../db';
import { emailLogs } from '@shared/schema';

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

interface AssessmentData {
  id: number;
  email: string;
  businessName?: string | null;
  industry?: string | null;
}

export function generateAssessmentConfirmationHTML(assessment: AssessmentData): string {
  const displayName = assessment.businessName || assessment.email.split('@')[0];
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>Assessment Received</title>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Archivo+Semi+Expanded:wght@600;700&display=swap" rel="stylesheet">
  <style>
    body { 
      font-family: 'Archivo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
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
      color: #09080E;
      padding: 40px 30px;
      text-align: center;
      border-bottom: 4px solid #F97316;
    }
    .logo {
      max-width: 300px;
      height: auto;
      margin-bottom: 20px;
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
      color: #09080E;
      text-align: center; 
      padding: 30px 20px; 
      font-size: 14px; 
      border-top: 4px solid #F97316;
    }
    .button { 
      display: inline-block; 
      background: transparent;
      color: #F97316; 
      border: 2px solid #F97316;
      padding: 14px 32px; 
      text-decoration: none; 
      border-radius: 8px; 
      margin: 20px 0; 
      font-weight: 700;
      font-family: 'Archivo Semi Expanded', 'Archivo', sans-serif;
      transition: all 0.3s ease;
    }
    .button:hover {
      background: #F97316;
      color: white;
    }
    .success-section {
      text-align: center;
      padding: 30px 0;
    }
    .checkmark {
      font-size: 72px;
      color: #4E7C63;
      line-height: 1;
      display: block;
      margin-bottom: 20px;
    }
    .timeline { 
      background: #f8fafc; 
      padding: 30px; 
      border-radius: 12px; 
      margin: 30px 0; 
      border-left: 4px solid #F97316;
    }
    .timeline-item { 
      display: flex; 
      align-items: flex-start; 
      margin: 24px 0; 
    }
    .timeline-icon { 
      background: transparent;
      color: #09080E; 
      border: 3px solid #09080E;
      min-width: 40px; 
      height: 40px; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      margin-right: 20px; 
      flex-shrink: 0; 
      font-weight: 700;
      font-family: 'Archivo Semi Expanded', 'Archivo', sans-serif;
      font-size: 18px;
    }
    .email-notice {
      background: #EEFBFF;
      border: 2px solid #F97316;
      border-radius: 12px;
      padding: 25px;
      margin: 30px 0;
    }
    .assessment-id {
      color: #09080E;
      font-weight: 700;
      font-size: 16px;
    }
    h1 {
      margin: 0;
      font-family: 'Archivo Semi Expanded', 'Archivo', sans-serif;
      font-weight: 700;
      font-size: 36px;
      color: #09080E;
    }
    h2 {
      font-family: 'Archivo Semi Expanded', 'Archivo', sans-serif;
      font-weight: 700;
      color: #09080E;
      font-size: 24px;
      margin: 0 0 10px 0;
    }
    h3 {
      color: #09080E;
      margin: 0 0 8px 0;
      font-family: 'Archivo Semi Expanded', 'Archivo', sans-serif;
      font-weight: 700;
      font-size: 18px;
    }
    h4 {
      color: #09080E;
      margin: 0 0 12px 0;
      font-family: 'Archivo Semi Expanded', 'Archivo', sans-serif;
      font-weight: 600;
      font-size: 16px;
    }
    .subtitle {
      color: #666;
      font-size: 18px;
      font-weight: 400;
      margin-top: 10px;
    }
    strong {
      color: #09080E;
      font-weight: 700;
    }
    p {
      font-weight: 400;
      margin: 16px 0;
    }
    .timeline-item p {
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-outline">
      <div class="header">
        <img src="https://cdn.triadblue.com/brands/businessblueprint/logo-lockup.png" alt="businessblueprint.io" class="logo" />
      </div>
      
      <div class="content">
      <div class="success-section">
        <span class="checkmark">✓</span>
        <h1>Assessment Received!</h1>
        <p class="subtitle">We're analyzing your business right now</p>
        <p class="assessment-id">Assessment ID: ${assessment.id}</p>
      </div>

      <p>Hi ${displayName},</p>
      
      <p><strong>Thank you for completing your businessblueprint.io assessment!</strong> We've received your information and our AI is already getting to work.</p>
      
      <div class="timeline">
        <h2>What Happens Next</h2>
        <p style="color: #666; margin-bottom: 24px;">Your personalized business growth prescription will be ready soon</p>
        
        <div class="timeline-item">
          <div class="timeline-icon">1</div>
          <div>
            <h3>AI Analysis (2-3 minutes)</h3>
            <p>Our AI is scanning your online presence across directories, reviews, social media, and your website to identify growth opportunities.</p>
          </div>
        </div>
        
        <div class="timeline-item">
          <div class="timeline-icon">2</div>
          <div>
            <h3>Prescription Generation</h3>
            <p>A customized growth prescription with specific, actionable recommendations tailored to your business will be created.</p>
          </div>
        </div>
        
        <div class="timeline-item">
          <div class="timeline-icon">3</div>
          <div>
            <h3>Your Prescription is Ready</h3>
            <p>Your personalized Digital IQ prescription with specific, prioritized recommendations is delivered to your portal and email.</p>
          </div>
        </div>
      </div>
      
      <div style="margin: 24px 0;">
        <p><strong>Assessment Details:</strong></p>
        <p style="margin-left: 20px;">
          <strong>Business:</strong> ${assessment.businessName || 'N/A'}<br>
          <strong>Industry:</strong> ${assessment.industry || 'N/A'}<br>
          <strong>Email:</strong> ${assessment.email}
        </p>
      </div>
      
      <div class="email-notice">
        <h4>📧 Check Your Email</h4>
        <p style="margin: 0;">Your prescription is being prepared now. Create your free account to access your personalized Directions for Use — step-by-step setup tasks with suggested timelines built from your prescription.</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://businessblueprint.io/auth/signup"
           style="display: inline-block; background: transparent; color: #F97316; border: 2px solid #F97316; padding: 14px 32px; text-decoration: none; border-radius: 8px; margin: 10px 0; font-weight: 700; font-family: 'Archivo Semi Expanded', 'Archivo', sans-serif;">
          Create Your Free Account →
        </a>
        <br/>
        <a href="https://businessblueprint.io/find-results"
           style="display: inline-block; background: transparent; color: #F97316; border: 2px solid #F97316; padding: 14px 32px; text-decoration: none; border-radius: 8px; margin: 10px 0; font-weight: 700; font-family: 'Archivo Semi Expanded', 'Archivo', sans-serif;">
          View Your Results
        </a>
      </div>
      </div>
      
      <div class="footer">
        <p><strong>businessblueprint.io</strong></p>
        <p>Your Partner in Local Business Growth</p>
        <p style="margin-top: 20px; font-size: 12px; opacity: 0.7;">© 2026 businessblueprint.io</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function sendAssessmentConfirmationEmail(assessment: AssessmentData): Promise<{ success: boolean; error?: string }> {
  const subject = `Assessment Received - We're Analyzing Your Business`;
  const htmlBody = generateAssessmentConfirmationHTML(assessment);
  
  try {
    const resendClient = await getResendClient();
    
    if (!resendClient) {
      console.error('[Assessment Email] Resend not configured');
      await db.insert(emailLogs).values({
        recipientEmail: assessment.email,
        recipientName: assessment.businessName || null,
        assessmentId: assessment.id,
        emailType: 'assessment_confirmation',
        subject: subject,
        htmlBody: htmlBody,
        status: 'failed',
        errorMessage: 'Resend email service not configured',
        sentAt: new Date(),
      });
      return { success: false, error: 'Email service not configured' };
    }
    
    console.log('[Assessment Email] Sending from:', resendClient.fromEmail, 'to:', assessment.email);
    const result = await resendClient.client.emails.send({
      from: resendClient.fromEmail,
      to: assessment.email,
      subject: subject,
      html: htmlBody,
    });

    if (result.error) {
      console.error('[Assessment Email] Resend API ERROR:', JSON.stringify(result.error));
      return { success: false, error: JSON.stringify(result.error) };
    }

    await db.insert(emailLogs).values({
      recipientEmail: assessment.email,
      recipientName: assessment.businessName || null,
      assessmentId: assessment.id,
      emailType: 'assessment_confirmation',
      subject: subject,
      htmlBody: htmlBody,
      status: 'sent',
      resendApiId: result.data?.id || null,
      sentAt: new Date(),
    });

    console.log(`[Assessment Email] Confirmation sent to ${assessment.email}, Resend ID: ${result.data?.id}`);
    return { success: true };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Assessment Email] Failed to send confirmation:', errorMessage);
    
    try {
      await db.insert(emailLogs).values({
        recipientEmail: assessment.email,
        recipientName: assessment.businessName || null,
        assessmentId: assessment.id,
        emailType: 'assessment_confirmation',
        subject: subject,
        htmlBody: htmlBody,
        status: 'failed',
        errorMessage: errorMessage,
        sentAt: new Date(),
      });
    } catch (logError) {
      console.error('[Assessment Email] Failed to log email error:', logError);
    }
    
    return { success: false, error: errorMessage };
  }
}

export async function sendAdminNotification(assessment: AssessmentData): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@businessblueprint.io';
  
  try {
    const resendClient = await getResendClient();
    if (!resendClient) {
      console.warn('[Assessment Email] Cannot send admin notification - Resend not configured');
      return;
    }
    
    await resendClient.client.emails.send({
      from: resendClient.fromEmail,
      to: adminEmail,
      subject: `New Assessment Submission - ${assessment.businessName || assessment.email}`,
      html: `
        <h2>New Assessment Submitted</h2>
        <p><strong>Assessment ID:</strong> ${assessment.id}</p>
        <p><strong>Email:</strong> ${assessment.email}</p>
        <p><strong>Business:</strong> ${assessment.businessName || 'N/A'}</p>
        <p><strong>Industry:</strong> ${assessment.industry || 'N/A'}</p>
        <p><a href="https://businessblueprint.io/admin">View in Admin Panel</a></p>
      `,
    });
    
    console.log(`[Assessment Email] Admin notification sent to ${adminEmail}`);
  } catch (error) {
    console.error('[Assessment Email] Failed to send admin notification:', error);
  }
}
