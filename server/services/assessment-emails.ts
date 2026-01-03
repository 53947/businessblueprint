import { Resend } from 'resend';
import { db } from '../db';
import { emailLogs } from '@shared/schema';

async function getResendCredentials(): Promise<{ apiKey: string; fromEmail: string } | null> {
  try {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    
    if (!hostname) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        return { apiKey, fromEmail: process.env.FROM_EMAIL || 'noreply@businessblueprint.io' };
      }
      console.warn('[Assessment Email] No Resend connector or RESEND_API_KEY configured');
      return null;
    }
    
    const xReplitToken = process.env.REPL_IDENTITY 
      ? 'repl ' + process.env.REPL_IDENTITY 
      : process.env.WEB_REPL_RENEWAL 
      ? 'depl ' + process.env.WEB_REPL_RENEWAL 
      : null;

    if (!xReplitToken) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        return { apiKey, fromEmail: process.env.FROM_EMAIL || 'noreply@businessblueprint.io' };
      }
      console.warn('[Assessment Email] No Replit token found for connector');
      return null;
    }

    const connectionSettings = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
      {
        headers: {
          'Accept': 'application/json',
          'X_REPLIT_TOKEN': xReplitToken
        }
      }
    ).then(res => res.json()).then(data => data.items?.[0]);

    if (!connectionSettings || !connectionSettings.settings?.api_key) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        console.log('[Assessment Email] Using RESEND_API_KEY from environment');
        return { apiKey, fromEmail: process.env.FROM_EMAIL || 'noreply@businessblueprint.io' };
      }
      console.warn('[Assessment Email] Resend connector not configured');
      return null;
    }
    
    console.log('[Assessment Email] Using Resend connector credentials');
    return {
      apiKey: connectionSettings.settings.api_key,
      fromEmail: connectionSettings.settings.from_email || 'noreply@businessblueprint.io'
    };
  } catch (error) {
    console.error('[Assessment Email] Error fetching Resend credentials:', error);
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      return { apiKey, fromEmail: process.env.FROM_EMAIL || 'noreply@businessblueprint.io' };
    }
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

function generateAssessmentConfirmationHTML(assessment: AssessmentData): string {
  const displayName = assessment.businessName || assessment.email.split('@')[0];
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Assessment Received</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; background: #f9fafb; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
    .checkmark { font-size: 48px; }
    .timeline { background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0; }
    .timeline-item { display: flex; align-items: flex-start; margin: 15px 0; }
    .timeline-icon { background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-weight: bold; font-size: 14px; }
    .timeline-text { flex: 1; }
    .timeline-text strong { display: block; margin-bottom: 4px; }
    .info-box { background: #f0f9ff; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 0 6px 6px 0; }
    .note { color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="checkmark">✓</div>
      <h1 style="margin: 10px 0; font-size: 28px;">Assessment Received!</h1>
      <p style="margin: 0; opacity: 0.9;">We're analyzing your business right now</p>
    </div>
    
    <div class="content">
      <p>Hi ${displayName},</p>
      
      <p>Thank you for completing your BusinessBlueprint.io assessment! We've received your information and our AI is already getting to work.</p>
      
      <div class="timeline">
        <h3 style="margin-top: 0; margin-bottom: 15px;">What happens next:</h3>
        
        <div class="timeline-item">
          <div class="timeline-icon">1</div>
          <div class="timeline-text">
            <strong>AI Analysis (2-3 minutes)</strong>
            Our AI is analyzing your business using Google Business Intelligence and industry best practices
          </div>
        </div>
        
        <div class="timeline-item">
          <div class="timeline-icon">2</div>
          <div class="timeline-text">
            <strong>Prescription Generation</strong>
            You'll receive a customized growth prescription with specific action items tailored to your business
          </div>
        </div>
        
        <div class="timeline-item">
          <div class="timeline-icon">3</div>
          <div class="timeline-text">
            <strong>Review & Delivery (within 24 hours)</strong>
            Our team reviews the AI prescription to ensure quality, then delivers it to your portal
          </div>
        </div>
      </div>
      
      <div class="info-box">
        <p style="margin: 0;"><strong>Assessment ID:</strong> ${assessment.id}</p>
        <p style="margin: 5px 0 0 0;"><strong>Business:</strong> ${assessment.businessName || 'N/A'}</p>
        <p style="margin: 5px 0 0 0;"><strong>Industry:</strong> ${assessment.industry || 'N/A'}</p>
      </div>
      
      <div style="text-align: center;">
        <a href="https://businessblueprint.io/portal/assessments" class="button">
          Check Status in Portal
        </a>
      </div>
      
      <p class="note">
        <strong>Note:</strong> You'll receive another email when your prescription is ready. In the meantime, you can check the status anytime in your client portal.
      </p>
    </div>
    
    <div class="footer">
      <p style="margin: 0 0 10px 0;"><strong>BusinessBlueprint.io</strong></p>
      <p style="margin: 0;">Your Partner in Local Business Growth</p>
      <p style="margin: 10px 0 0 0; font-size: 12px;">Questions? Reply to this email or contact us at support@businessblueprint.io</p>
    </div>
  </div>
</body>
</html>`;
}

export async function sendAssessmentConfirmationEmail(assessment: AssessmentData): Promise<{ success: boolean; error?: string }> {
  const subject = `✓ Assessment Received - BusinessBlueprint.io`;
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
    
    const result = await resendClient.client.emails.send({
      from: resendClient.fromEmail,
      to: assessment.email,
      subject: subject,
      html: htmlBody,
    });
    
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
