import nodemailer from 'nodemailer';

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

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // Use TLS (STARTTLS) on port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
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
        from: process.env.FROM_EMAIL,
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
        from: process.env.FROM_EMAIL,
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
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `Your Digital Presence Assessment Results - Score: ${data.digitalScore}`,
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
        from: process.env.FROM_EMAIL,
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

  async sendEnrollmentConfirmation(email: string, data: {
    businessName: string;
    pathway: string;
    planName: string;
    monthlyPrice: number;
    nextBillingDate: Date;
    features: string[];
  }): Promise<boolean> {
    try {
      const htmlContent = this.generateEnrollmentConfirmationHTML(data);
      
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `Welcome to ${data.planName} - Your Digital Growth Journey Begins!`,
        html: htmlContent,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending enrollment confirmation email:', error);
      return false;
    }
  }

  async sendPathwayReminderEmail(email: string, data: {
    businessName: string;
    digitalScore: number;
    assessmentId: number;
  }): Promise<boolean> {
    try {
      const htmlContent = this.generatePathwayReminderHTML(data);
      
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `Still deciding? Your Digital Growth Plan is ready, ${data.businessName}`,
        html: htmlContent,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
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
    try {
      const htmlContent = this.generateCheckoutAbandonmentHTML(data);
      
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `Complete your enrollment - ${data.planName} is waiting for you!`,
        html: htmlContent,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending checkout abandonment email:', error);
      return false;
    }
  }

  async sendThankYouIntroduction(email: string, data: {
    businessName: string;
    assessmentId: number;
  }): Promise<boolean> {
    try {
      const htmlContent = this.generateThankYouIntroductionHTML(data);
      
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: `Welcome to Business Blueprint - Your Digital Growth Partner`,
        html: htmlContent,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending thank you introduction email:', error);
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
        .score-circle { display: inline-block; width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; margin: 20px 0; }
        .content { background: white; padding: 30px; border: 1px solid #e0e0e0; }
        .score-value { font-size: 48px; font-weight: bold; color: #fff; }
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
                <div class="score-value">${data.digitalScore}</div>
                <div style="font-size: 14px;">out of 140</div>
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
                
                <a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/dashboard/${data.assessmentId}" class="cta-button secondary-button">
                    Review My Assessment
                </a>
            </div>
            
            <p style="margin-top: 30px;">Have questions? Just reply to this email - we're here to help!</p>
        </div>
        
        <div class="footer">
            <p>Ready to transform your digital presence?</p>
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
        .plan-box { background: #f8f9fa; border: 2px solid ${pathwayColor}; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .cta-button { display: inline-block; background: ${pathwayColor}; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .benefit-list { list-style: none; padding: 0; margin: 20px 0; }
        .benefit-list li { padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
        .benefit-list li:before { content: "✓ "; color: ${pathwayColor}; font-weight: bold; margin-right: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⏰ You're Almost There!</h1>
            <p style="font-size: 18px; margin-top: 10px;">${data.businessName}</p>
        </div>
        
        <div class="content">
            <p>Hi,</p>
            
            <p>We noticed you started enrolling in <strong>${data.planName}</strong> but didn't complete the process. No worries - we saved your spot!</p>
            
            <div class="plan-box">
                <h2 style="color: ${pathwayColor}; margin-top: 0;">${data.planName}</h2>
                <p style="font-size: 32px; font-weight: bold; margin: 10px 0;">
                    $${data.monthlyPrice.toFixed(2)}<span style="font-size: 16px; font-weight: normal;">/month</span>
                </p>
            </div>
            
            <h3>Why complete your enrollment today:</h3>
            <ul class="benefit-list">
                <li>Start seeing results within the first week</li>
                <li>Get expert guidance from day one</li>
                <li>Lock in your current pricing</li>
                <li>Cancel anytime - no long-term commitment</li>
            </ul>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/assessment-checkout?id=${data.assessmentId}" class="cta-button">
                    Complete My Enrollment
                </a>
            </div>
            
            <p style="margin-top: 30px; text-align: center; color: #666;">
                Need help or have questions? Just reply to this email.
            </p>
        </div>
        
        <div class="footer">
            <p>Your digital growth journey is just one click away!</p>
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
        .header { background: linear-gradient(135deg, #FF6B35, #0057FF); color: white; padding: 40px; text-align: center; }
        .content { padding: 40px; }
        .solution-box { background: #f8f9fa; border-left: 4px solid #FF6B35; padding: 20px; margin: 15px 0; border-radius: 4px; }
        .solution-box h3 { color: #FF6B35; margin-top: 0; }
        .cta-button { display: inline-block; background: #FF6B35; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .highlight { background: #FFF4E6; border: 1px solid #FFB84D; padding: 15px; border-radius: 4px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>👋 Thank You, ${data.businessName}!</h1>
            <p style="font-size: 18px; margin-top: 10px;">We're excited to be your digital growth partner</p>
        </div>
        
        <div class="content">
            <p>Hi there,</p>
            
            <p>Thank you for completing your Digital Presence Assessment with Business Blueprint! We're thrilled to help you strengthen your online presence and grow your business.</p>
            
            <p><strong>Who We Are:</strong> Business Blueprint is your all-in-one digital growth platform, designed specifically for local businesses like yours. We combine powerful AI-driven insights with hands-on marketing tools to help you get found, get customers, and get business.</p>
            
            <div class="highlight">
                <p style="margin: 0;"><strong>💡 Beyond Your Prescription:</strong> While your personalized assessment provides targeted recommendations, we offer a complete suite of solutions that work together to grow your business:</p>
            </div>
            
            <h3>Our Complete Solution Suite:</h3>
            
            <div class="solution-box">
                <h3>🗺️ Local SEO Management</h3>
                <p>Manage your business listings across 200+ directories including Google, Yelp, Facebook, and Apple Maps. Keep your NAP (Name, Address, Phone) consistent everywhere your customers search.</p>
            </div>
            
            <div class="solution-box">
                <h3>⭐ Reputation Management</h3>
                <p>Monitor and respond to reviews across all platforms from one dashboard. Our AI-powered response generator helps you craft perfect replies that build trust and turn negative experiences into opportunities.</p>
            </div>
            
            <div class="solution-box">
                <h3>📱 Social Media Management</h3>
                <p>Schedule posts, engage with followers, and grow your social presence across Facebook, Instagram, LinkedIn, and X (Twitter). One platform, all your social channels.</p>
            </div>
            
            <div class="solution-box">
                <h3>📧 Email & SMS Marketing (/send)</h3>
                <p>Build relationships with powerful email campaigns and text message marketing. Create beautiful emails, segment your audience, and track results - all GDPR and CAN-SPAM compliant.</p>
            </div>
            
            <div class="solution-box">
                <h3>💬 Unified Inbox & Live Chat</h3>
                <p>Never miss a customer message again. Manage emails, social messages, SMS, and live chat conversations from one powerful inbox. Add our live chat widget to your website to capture leads 24/7.</p>
            </div>
            
            <div class="solution-box">
                <h3>🤖 AI Business Coach</h3>
                <p>Your personal marketing advisor available anytime. Get step-by-step guidance, learn new strategies, and receive personalized recommendations based on your business goals and progress.</p>
            </div>
            
            <div class="solution-box">
                <h3>📊 Content Calendar & Publishing</h3>
                <p>Plan your entire content strategy with our visual calendar. Schedule posts across all platforms, collaborate with your team, and maintain a consistent brand voice.</p>
            </div>
            
            <h3>Two Pathways to Success:</h3>
            
            <p><strong>DIY Platform ($49/month):</strong> Perfect if you want hands-on control. Access all our tools, get AI guidance, and manage everything yourself at your own pace.</p>
            
            <p><strong>Managed Services (Starting at $299/month):</strong> Let our experts handle it all. We'll implement your strategy, manage your campaigns, respond to reviews, and provide monthly reporting while you focus on running your business.</p>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/dashboard/${data.assessmentId}" class="cta-button">
                    View Your Full Assessment
                </a>
            </div>
            
            <p><strong>What's Next?</strong></p>
            <ul>
                <li>Review your personalized assessment results (sent in a separate email)</li>
                <li>Explore our complete solution suite at businessblueprint.io</li>
                <li>Choose the pathway that fits your business best</li>
                <li>Schedule a free consultation to discuss your specific needs</li>
            </ul>
            
            <p style="margin-top: 30px;">Have questions? Just reply to this email - we're here to help you succeed!</p>
            
            <p>Warmly,<br>
            <strong>The Business Blueprint Team</strong><br>
            Your Partners in Digital Growth</p>
        </div>
        
        <div class="footer">
            <p>Business Blueprint - Helping Local Businesses Succeed Online</p>
            <p>Get Found • Get Customers • Get Business</p>
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
