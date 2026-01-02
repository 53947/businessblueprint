import type { Express } from 'express';
import { db } from '../db';
import { emailLogs, emailTemplates } from '@shared/schema';
import { insertEmailTemplateSchema, updateEmailTemplateSchema } from '@shared/schema';
import { eq, desc, and, sql, ilike, gte, lte, or } from 'drizzle-orm';
import { isAuthenticated } from '../replitAuth';
import { Resend } from 'resend';

let connectionSettings: any;

async function getResendCredentials() {
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

export function registerEmailAdminRoutes(app: Express) {
  console.log('[EMAIL ADMIN] Registering email admin routes');
  
  // ========================================
  // EMAIL LOGS ROUTES
  // ========================================
  
  // GET /api/admin/email-logs - Get all email logs with filtering
  app.get('/api/admin/email-logs', isAuthenticated, async (req: any, res: any) => {
    console.log('[EMAIL ADMIN] GET /api/admin/email-logs hit, user:', req.user?.claims?.sub);
    try {
      const { status, emailType, search, startDate, endDate, page = '1', limit = '50' } = req.query;
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const offset = (pageNum - 1) * limitNum;
      
      let conditions: any[] = [];
      
      if (status && status !== 'all') {
        conditions.push(eq(emailLogs.status, status));
      }
      
      if (emailType && emailType !== 'all') {
        conditions.push(eq(emailLogs.emailType, emailType));
      }
      
      if (search) {
        conditions.push(or(
          ilike(emailLogs.recipientEmail, `%${search}%`),
          ilike(emailLogs.recipientName, `%${search}%`),
          ilike(emailLogs.subject, `%${search}%`)
        ));
      }
      
      if (startDate) {
        conditions.push(gte(emailLogs.createdAt, new Date(startDate)));
      }
      
      if (endDate) {
        conditions.push(lte(emailLogs.createdAt, new Date(endDate)));
      }
      
      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
      
      const [logs, totalResult] = await Promise.all([
        db.select()
          .from(emailLogs)
          .where(whereClause)
          .orderBy(desc(emailLogs.createdAt))
          .limit(limitNum)
          .offset(offset),
        db.select({ count: sql<number>`count(*)` })
          .from(emailLogs)
          .where(whereClause)
      ]);
      
      const total = Number(totalResult[0]?.count || 0);
      
      // Get stats
      const statsResult = await db.select({
        status: emailLogs.status,
        count: sql<number>`count(*)`
      })
        .from(emailLogs)
        .groupBy(emailLogs.status);
      
      const stats = {
        total,
        sent: 0,
        failed: 0,
        pending: 0,
        bounced: 0,
        opened: 0,
        clicked: 0,
      };
      
      statsResult.forEach(s => {
        if (s.status && s.status in stats) {
          (stats as any)[s.status] = Number(s.count);
        }
      });
      
      res.json({
        logs,
        stats,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      });
    } catch (error) {
      console.error('Error fetching email logs:', error);
      res.status(500).json({ error: 'Failed to fetch email logs' });
    }
  });
  
  // GET /api/admin/email-logs/:id - Get single email log with full content
  app.get('/api/admin/email-logs/:id', isAuthenticated, async (req: any, res: any) => {
    try {
      const logId = parseInt(req.params.id);
      
      const log = await db.query.emailLogs.findFirst({
        where: eq(emailLogs.id, logId)
      });
      
      if (!log) {
        return res.status(404).json({ error: 'Email log not found' });
      }
      
      res.json(log);
    } catch (error) {
      console.error('Error fetching email log:', error);
      res.status(500).json({ error: 'Failed to fetch email log' });
    }
  });
  
  // GET /api/admin/emails/failed - Get failed emails queue
  app.get('/api/admin/emails/failed', isAuthenticated, async (req: any, res: any) => {
    try {
      const failedLogs = await db.select()
        .from(emailLogs)
        .where(eq(emailLogs.status, 'failed'))
        .orderBy(desc(emailLogs.createdAt))
        .limit(100);
      
      res.json(failedLogs);
    } catch (error) {
      console.error('Error fetching failed emails:', error);
      res.status(500).json({ error: 'Failed to fetch failed emails' });
    }
  });
  
  // POST /api/admin/emails/resend/:logId - Resend an email from log
  app.post('/api/admin/emails/resend/:logId', isAuthenticated, async (req: any, res: any) => {
    try {
      const logId = parseInt(req.params.logId);
      const { subject, htmlBody, recipientEmail } = req.body; // Optional overrides
      
      const originalLog = await db.query.emailLogs.findFirst({
        where: eq(emailLogs.id, logId)
      });
      
      if (!originalLog) {
        return res.status(404).json({ error: 'Email log not found' });
      }
      
      const { apiKey, fromEmail } = await getResendCredentials();
      const client = new Resend(apiKey);
      
      const emailSubject = subject || originalLog.subject;
      const emailHtml = htmlBody || originalLog.htmlBody;
      const emailTo = recipientEmail || originalLog.recipientEmail;
      
      const result = await client.emails.send({
        from: fromEmail || 'noreply@businessblueprint.io',
        to: emailTo,
        subject: emailSubject,
        html: emailHtml,
      });
      
      const adminIdRaw = parseInt(req.user?.claims?.sub);
      const adminId = isNaN(adminIdRaw) ? null : adminIdRaw;
      
      // Log the resend
      const [newLog] = await db.insert(emailLogs).values({
        recipientEmail: emailTo,
        recipientName: originalLog.recipientName,
        clientId: originalLog.clientId,
        assessmentId: originalLog.assessmentId,
        emailType: originalLog.emailType,
        subject: emailSubject,
        htmlBody: emailHtml,
        status: 'sent',
        resendApiId: result.data?.id,
        sentAt: new Date(),
        sentByAdminId: adminId,
      }).returning();
      
      // Update original log retry count if it was a failed email
      if (originalLog.status === 'failed') {
        await db.update(emailLogs)
          .set({
            retryCount: (originalLog.retryCount || 0) + 1,
            lastRetryAt: new Date(),
          })
          .where(eq(emailLogs.id, logId));
      }
      
      res.json({ success: true, log: newLog });
    } catch (error) {
      console.error('Error resending email:', error);
      res.status(500).json({ error: 'Failed to resend email', details: error instanceof Error ? error.message : String(error) });
    }
  });
  
  // POST /api/admin/emails/send-custom - Send a custom one-off email
  app.post('/api/admin/emails/send-custom', isAuthenticated, async (req: any, res: any) => {
    try {
      const { recipientEmail, recipientName, subject, htmlBody, emailType = 'custom' } = req.body;
      
      if (!recipientEmail || !subject || !htmlBody) {
        return res.status(400).json({ error: 'Missing required fields: recipientEmail, subject, htmlBody' });
      }
      
      const { apiKey, fromEmail } = await getResendCredentials();
      const client = new Resend(apiKey);
      
      const result = await client.emails.send({
        from: fromEmail || 'noreply@businessblueprint.io',
        to: recipientEmail,
        subject,
        html: htmlBody,
      });
      
      const adminIdRaw = parseInt(req.user?.claims?.sub);
      const adminId = isNaN(adminIdRaw) ? null : adminIdRaw;
      
      // Log the email
      const [log] = await db.insert(emailLogs).values({
        recipientEmail,
        recipientName: recipientName || null,
        emailType,
        subject,
        htmlBody,
        status: 'sent',
        resendApiId: result.data?.id,
        sentAt: new Date(),
        sentByAdminId: adminId,
      }).returning();
      
      res.json({ success: true, log });
    } catch (error) {
      console.error('Error sending custom email:', error);
      res.status(500).json({ error: 'Failed to send email', details: error instanceof Error ? error.message : String(error) });
    }
  });
  
  // POST /api/admin/emails/retry/:logId - Retry a failed email
  app.post('/api/admin/emails/retry/:logId', isAuthenticated, async (req: any, res: any) => {
    try {
      const logId = parseInt(req.params.logId);
      
      const originalLog = await db.query.emailLogs.findFirst({
        where: eq(emailLogs.id, logId)
      });
      
      if (!originalLog) {
        return res.status(404).json({ error: 'Email log not found' });
      }
      
      if (originalLog.status !== 'failed') {
        return res.status(400).json({ error: 'Can only retry failed emails' });
      }
      
      const { apiKey, fromEmail } = await getResendCredentials();
      const client = new Resend(apiKey);
      
      try {
        const result = await client.emails.send({
          from: fromEmail || 'noreply@businessblueprint.io',
          to: originalLog.recipientEmail,
          subject: originalLog.subject,
          html: originalLog.htmlBody,
        });
        
        // Update the original log
        await db.update(emailLogs)
          .set({
            status: 'sent',
            resendApiId: result.data?.id,
            sentAt: new Date(),
            errorMessage: null,
            retryCount: (originalLog.retryCount || 0) + 1,
            lastRetryAt: new Date(),
          })
          .where(eq(emailLogs.id, logId));
        
        res.json({ success: true, message: 'Email resent successfully' });
      } catch (sendError) {
        // Update retry count even on failure
        await db.update(emailLogs)
          .set({
            retryCount: (originalLog.retryCount || 0) + 1,
            lastRetryAt: new Date(),
            errorMessage: sendError instanceof Error ? sendError.message : String(sendError),
          })
          .where(eq(emailLogs.id, logId));
        
        throw sendError;
      }
    } catch (error) {
      console.error('Error retrying email:', error);
      res.status(500).json({ error: 'Failed to retry email', details: error instanceof Error ? error.message : String(error) });
    }
  });
  
  // ========================================
  // EMAIL TEMPLATES ROUTES
  // ========================================
  
  // GET /api/admin/email-templates - Get all email templates
  app.get('/api/admin/email-templates', isAuthenticated, async (req: any, res: any) => {
    console.log('[EMAIL ADMIN] GET /api/admin/email-templates hit, user:', req.user?.claims?.sub);
    try {
      const templates = await db.select()
        .from(emailTemplates)
        .orderBy(emailTemplates.name);
      
      res.json(templates);
    } catch (error) {
      console.error('Error fetching email templates:', error);
      res.status(500).json({ error: 'Failed to fetch email templates' });
    }
  });
  
  // GET /api/admin/email-templates/:id - Get single email template
  app.get('/api/admin/email-templates/:id', isAuthenticated, async (req: any, res: any) => {
    try {
      const templateId = parseInt(req.params.id);
      
      const template = await db.query.emailTemplates.findFirst({
        where: eq(emailTemplates.id, templateId)
      });
      
      if (!template) {
        return res.status(404).json({ error: 'Template not found' });
      }
      
      res.json(template);
    } catch (error) {
      console.error('Error fetching email template:', error);
      res.status(500).json({ error: 'Failed to fetch email template' });
    }
  });
  
  // POST /api/admin/email-templates - Create new email template
  app.post('/api/admin/email-templates', isAuthenticated, async (req: any, res: any) => {
    try {
      const validationResult = insertEmailTemplateSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: validationResult.error.flatten().fieldErrors 
        });
      }
      
      const adminIdRaw = parseInt(req.user?.claims?.sub);
      const adminId = isNaN(adminIdRaw) ? null : adminIdRaw;
      
      const [template] = await db.insert(emailTemplates).values({
        ...validationResult.data,
        createdById: adminId,
        lastEditedById: adminId,
      }).returning();
      
      res.json(template);
    } catch (error) {
      console.error('Error creating email template:', error);
      res.status(500).json({ error: 'Failed to create email template' });
    }
  });
  
  // PATCH /api/admin/email-templates/:id - Update email template
  app.patch('/api/admin/email-templates/:id', isAuthenticated, async (req: any, res: any) => {
    try {
      const templateId = parseInt(req.params.id);
      
      const validationResult = updateEmailTemplateSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: validationResult.error.flatten().fieldErrors 
        });
      }
      
      const adminIdRaw = parseInt(req.user?.claims?.sub);
      const adminId = isNaN(adminIdRaw) ? null : adminIdRaw;
      
      const [updated] = await db.update(emailTemplates)
        .set({
          ...validationResult.data,
          lastEditedById: adminId,
          updatedAt: new Date(),
        })
        .where(eq(emailTemplates.id, templateId))
        .returning();
      
      if (!updated) {
        return res.status(404).json({ error: 'Template not found' });
      }
      
      res.json(updated);
    } catch (error) {
      console.error('Error updating email template:', error);
      res.status(500).json({ error: 'Failed to update email template' });
    }
  });
  
  // DELETE /api/admin/email-templates/:id - Delete email template
  app.delete('/api/admin/email-templates/:id', isAuthenticated, async (req: any, res: any) => {
    try {
      const templateId = parseInt(req.params.id);
      
      // Check if it's a system template
      const template = await db.query.emailTemplates.findFirst({
        where: eq(emailTemplates.id, templateId)
      });
      
      if (!template) {
        return res.status(404).json({ error: 'Template not found' });
      }
      
      if (template.isSystem) {
        return res.status(400).json({ error: 'Cannot delete system templates' });
      }
      
      await db.delete(emailTemplates)
        .where(eq(emailTemplates.id, templateId));
      
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting email template:', error);
      res.status(500).json({ error: 'Failed to delete email template' });
    }
  });
  
  // POST /api/admin/email-templates/:id/send - Send email using a template
  app.post('/api/admin/email-templates/:id/send', isAuthenticated, async (req: any, res: any) => {
    try {
      const templateId = parseInt(req.params.id);
      const { recipientEmail, recipientName, variables = {} } = req.body;
      
      if (!recipientEmail) {
        return res.status(400).json({ error: 'Missing required field: recipientEmail' });
      }
      
      const template = await db.query.emailTemplates.findFirst({
        where: eq(emailTemplates.id, templateId)
      });
      
      if (!template) {
        return res.status(404).json({ error: 'Template not found' });
      }
      
      if (!template.isActive) {
        return res.status(400).json({ error: 'Template is not active' });
      }
      
      // Replace variables in subject and body
      let subject = template.subject;
      let htmlBody = template.htmlBody;
      
      Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`\\{${key}\\}`, 'g');
        subject = subject.replace(regex, String(value));
        htmlBody = htmlBody.replace(regex, String(value));
      });
      
      const { apiKey, fromEmail } = await getResendCredentials();
      const client = new Resend(apiKey);
      
      const result = await client.emails.send({
        from: fromEmail || 'noreply@businessblueprint.io',
        to: recipientEmail,
        subject,
        html: htmlBody,
      });
      
      const adminIdRaw = parseInt(req.user?.claims?.sub);
      const adminId = isNaN(adminIdRaw) ? null : adminIdRaw;
      
      // Log the email
      const [log] = await db.insert(emailLogs).values({
        recipientEmail,
        recipientName: recipientName || null,
        emailType: template.name,
        templateId: template.id,
        subject,
        htmlBody,
        status: 'sent',
        resendApiId: result.data?.id,
        sentAt: new Date(),
        sentByAdminId: adminId,
      }).returning();
      
      res.json({ success: true, log });
    } catch (error) {
      console.error('Error sending template email:', error);
      res.status(500).json({ error: 'Failed to send email', details: error instanceof Error ? error.message : String(error) });
    }
  });
}
