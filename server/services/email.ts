import nodemailer from 'nodemailer';

interface EmailReportData {
  businessName: string;
  digitalScore: number;
  grade: string;
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

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
      },
    });
  }

  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendVerificationEmail(email: string, companyName: string, verificationCode: string): Promise<boolean> {
    try {
      const htmlContent = this.generateVerificationEmailHTML(companyName, verificationCode);
      
      const mailOptions = {
        from: process.env.FROM_EMAIL || 'le847@icloud.com',
        to: email,
        subject: `Verify Your Email - ${verificationCode}`,
        html: htmlContent,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending verification email:', error);
      return false;
    }
  }

  async sendEmailChangeNotification(oldEmail: string, newEmail: string, companyName: string): Promise<boolean> {
    try {
      const htmlContent = this.generateEmailChangeNotificationHTML(companyName, newEmail);
      
      const mailOptions = {
        from: process.env.FROM_EMAIL || 'le847@icloud.com',
        to: oldEmail,
        subject: `Email Address Changed - Action May Be Required`,
        html: htmlContent,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending email change notification:', error);
      return false;
    }
  }

  async sendAssessmentReport(email: string, data: EmailReportData): Promise<boolean> {
    try {
      const htmlContent = this.generateReportHTML(data);
      
      const mailOptions = {
        from: process.env.FROM_EMAIL || 'le847@icloud.com',
        to: email,
        subject: `Your Digital Presence Assessment Results - Grade: ${data.grade}`,
        html: htmlContent,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendReviewAlert(email: string, data: ReviewAlertData): Promise<boolean> {
    try {
      const htmlContent = this.generateReviewAlertHTML(data);
      const sentiment = data.rating <= 2 ? 'Negative' : data.rating >= 4 ? 'Positive' : 'Neutral';
      const urgency = data.rating <= 2 ? '⚠️ URGENT' : '';
      
      const mailOptions = {
        from: process.env.FROM_EMAIL || 'le847@icloud.com',
        to: email,
        subject: `${urgency} New ${sentiment} Review on ${data.platform} - ${data.rating} ${data.rating === 1 ? 'Star' : 'Stars'}`,
        html: htmlContent,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending review alert email:', error);
      return false;
    }
  }

  private generateReportHTML(data: EmailReportData): string {
    const highPriorityRecs = data.recommendations.filter(r => r.priority === 'high').slice(0, 3);
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Digital Presence Assessment Results</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #FF6B35, #8B5CF6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .score-circle { display: inline-block; width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; margin: 20px 0; }
        .content { background: white; padding: 30px; border: 1px solid #e0e0e0; }
        .grade { font-size: 48px; font-weight: bold; color: #FF6B35; }
        .section { margin: 30px 0; }
        .recommendation { background: #f8f9fa; padding: 20px; margin: 15px 0; border-left: 4px solid #FF6B35; border-radius: 4px; }
        .cta-button { display: inline-block; background: #FF6B35; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 5px; }
        .secondary-button { background: #8B5CF6; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Digital Presence Assessment Results</h1>
        <h2>${data.businessName}</h2>
        <div class="score-circle">
            <div>
                <div class="grade">${data.grade}</div>
                <div>${data.digitalScore}/100</div>
            </div>
        </div>
    </div>
    
    <div class="content">
        <div class="section">
            <h2>Executive Summary</h2>
            <p>${data.summary}</p>
        </div>
        
        <div class="section">
            <h2>Priority Recommendations</h2>
            ${highPriorityRecs.map(rec => `
                <div class="recommendation">
                    <h3>${rec.title}</h3>
                    <p>${rec.description}</p>
                    <p><strong>Estimated Impact:</strong> ${rec.estimatedImpact}</p>
                    <p><strong>Estimated Effort:</strong> ${rec.estimatedEffort}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="section" style="text-align: center;">
            <h2>Choose Your Path Forward</h2>
            <p>Ready to improve your digital presence? We offer two paths to success:</p>
            
            <a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/dashboard/${data.assessmentId}?path=diy" class="cta-button">
                🛠️ DIY Path - $49/month
            </a>
            
            <a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/dashboard/${data.assessmentId}?path=msp" class="cta-button secondary-button">
                🎯 Managed Services - $299/month
            </a>
            
            <p style="margin-top: 20px;">
                <a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/dashboard/${data.assessmentId}">View Full Report</a>
            </p>
        </div>
    </div>
    
    <div class="footer">
        <p>This assessment was powered by Google Business Intelligence and AI analysis.</p>
        <p>Questions? Reply to this email or visit our support center.</p>
        <p><small>© 2024 businessblueprint.io</small></p>
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

  private generateReviewAlertHTML(data: ReviewAlertData): string {
    const ratingColor = data.rating <= 2 ? '#DC2626' : data.rating >= 4 ? '#16A34A' : '#F59E0B';
    const sentiment = data.rating <= 2 ? 'Negative' : data.rating >= 4 ? 'Positive' : 'Neutral';
    const stars = '⭐'.repeat(data.rating);
    
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
        .header { background: ${ratingColor}; color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .review-box { background: #f8f9fa; padding: 20px; border-left: 4px solid ${ratingColor}; border-radius: 4px; margin: 20px 0; }
        .rating { font-size: 32px; margin: 10px 0; }
        .meta { color: #666; font-size: 14px; margin: 10px 0; }
        .cta-button { display: inline-block; background: ${ratingColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔔 New ${sentiment} Review</h1>
            <div class="rating">${stars}</div>
            <h2>${data.businessName}</h2>
        </div>
        
        <div class="content">
            <div class="meta">
                <strong>Platform:</strong> ${data.platform}<br>
                ${data.reviewerName ? `<strong>Reviewer:</strong> ${data.reviewerName}<br>` : ''}
                ${data.locationName ? `<strong>Location:</strong> ${data.locationName}<br>` : ''}
                <strong>Date:</strong> ${new Date(data.reviewDate).toLocaleDateString()}
            </div>
            
            <div class="review-box">
                <p><strong>Review:</strong></p>
                <p>${data.reviewText || 'No text provided'}</p>
            </div>
            
            ${data.rating <= 2 ? `
            <div style="background: #FEF3C7; border: 1px solid #F59E0B; padding: 15px; border-radius: 4px; margin: 20px 0;">
                <p style="margin: 0;"><strong>⚠️ Action Required:</strong> This negative review requires immediate attention. Consider responding promptly to address the customer's concerns.</p>
            </div>
            ` : ''}
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/dashboard" class="cta-button">
                    Respond to Review
                </a>
                <p style="margin-top: 15px; color: #666; font-size: 14px;">
                    Tip: Use our AI-powered response generator to craft the perfect reply.
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p>You're receiving this because you have review alerts enabled.</p>
            <p>Manage your notification preferences in your dashboard settings.</p>
            <p><small>© 2024 businessblueprint.io</small></p>
        </div>
    </div>
</body>
</html>`;
  }
}
