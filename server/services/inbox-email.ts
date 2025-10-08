import nodemailer from 'nodemailer';
import { db } from '../db';
import { inboxMessages2, inboxConversations, inboxChannelConnections } from '@shared/schema';
import { eq, and } from 'drizzle-orm';

export class InboxEmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    // Allow explicit override, otherwise auto-detect based on port
    const isSecure = process.env.SMTP_SECURE 
      ? process.env.SMTP_SECURE === 'true' 
      : smtpPort === 465;
      
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: smtpPort,
      secure: isSecure,
      auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
      },
    });
  }

  /**
   * Send an email message from the inbox
   * @throws Error with details about the failure
   */
  async sendMessage(conversationId: number, content: string, fromName: string): Promise<void> {
    // Get conversation details
    const [conversation] = await db.select()
      .from(inboxConversations)
      .where(eq(inboxConversations.id, conversationId))
      .limit(1);

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    if (conversation.primaryChannelType !== 'email') {
      throw new Error('Conversation is not an email thread');
    }

    // Get email channel connection for this client
    const [channelConnection] = await db.select()
      .from(inboxChannelConnections)
      .where(and(
        eq(inboxChannelConnections.clientId, conversation.clientId),
        eq(inboxChannelConnections.channelType, 'email'),
        eq(inboxChannelConnections.status, 'active')
      ))
      .limit(1);

    const fromEmail = channelConnection?.channelIdentifier || process.env.FROM_EMAIL || 'inbox@businessblueprint.io';
    const toEmail = conversation.contactIdentifier;

    const mailOptions = {
      from: `${fromName} <${fromEmail}>`,
      to: toEmail,
      subject: conversation.subject || 'Message from Business Blueprint',
      html: this.formatEmailContent(content, fromName),
      text: content,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', info.messageId, 'to:', toEmail);
    } catch (error: any) {
      // Log detailed error for ops team
      console.error('❌ SMTP send failed:', {
        error: error.message,
        code: error.code,
        command: error.command,
        to: toEmail,
        from: fromEmail
      });
      
      // Categorize error for better client feedback
      if (error.code === 'EAUTH' || error.responseCode === 535) {
        throw new Error('SMTP authentication failed - check credentials');
      } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
        throw new Error('SMTP connection failed - check server settings');
      } else if (error.responseCode >= 500) {
        throw new Error('SMTP server error - try again later');
      } else {
        throw new Error(`Email delivery failed: ${error.message}`);
      }
    }
  }

  /**
   * Format email content with branding
   */
  private formatEmailContent(content: string, fromName: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #FF6B35, #8B5CF6); color: white; padding: 20px; text-align: center; }
        .content { background: white; padding: 30px; }
        .message { white-space: pre-wrap; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Business Blueprint</h2>
    </div>
    <div class="content">
        <p><strong>From: ${fromName}</strong></p>
        <div class="message">${content}</div>
    </div>
    <div class="footer">
        <p>This message was sent from Business Blueprint Inbox</p>
    </div>
</body>
</html>
    `.trim();
  }

  /**
   * Parse incoming email webhook (for future IMAP/webhook integration)
   * This would be called by a webhook handler when emails are received
   */
  async handleIncomingEmail(data: {
    from: string;
    to: string;
    subject: string;
    content: string;
    messageId: string;
    clientId: number;
  }): Promise<number | null> {
    try {
      // Check if conversation exists for this email
      let conversation = await db.select()
        .from(inboxConversations)
        .where(and(
          eq(inboxConversations.clientId, data.clientId),
          eq(inboxConversations.contactIdentifier, data.from),
          eq(inboxConversations.primaryChannelType, 'email')
        ))
        .limit(1);

      let conversationId: number;

      if (conversation.length === 0) {
        // Create new conversation
        const [newConv] = await db.insert(inboxConversations).values({
          clientId: data.clientId,
          contactName: this.extractNameFromEmail(data.from),
          contactIdentifier: data.from,
          primaryChannelType: 'email',
          subject: data.subject,
          status: 'open',
          priority: 'normal',
        }).returning();
        
        conversationId = newConv.id;
      } else {
        conversationId = conversation[0].id;
        
        // Update conversation subject and timestamp
        await db.update(inboxConversations)
          .set({ 
            subject: data.subject,
            updatedAt: new Date() 
          })
          .where(eq(inboxConversations.id, conversationId));
      }

      // Insert message
      const [message] = await db.insert(inboxMessages2).values({
        conversationId,
        channelType: 'email',
        messageType: 'incoming',
        direction: 'inbound',
        content: data.content,
        fromIdentifier: data.from,
        fromName: this.extractNameFromEmail(data.from),
        toIdentifier: data.to,
        status: 'delivered',
        externalMessageId: data.messageId,
      }).returning();

      return message.id;
    } catch (error) {
      console.error('Error handling incoming email:', error);
      return null;
    }
  }

  /**
   * Extract name from email address
   */
  private extractNameFromEmail(email: string): string {
    // Try to extract name from "Name <email@domain.com>" format
    const match = email.match(/^(.+?)\s*<(.+)>$/);
    if (match) {
      return match[1].trim();
    }
    
    // If no name, use email username
    const username = email.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  }
}

export const inboxEmailService = new InboxEmailService();
