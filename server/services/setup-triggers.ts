/**
 * Setup Trigger Service
 *
 * Fires asynchronous actions when setup task events occur.
 * NEVER blocks the user's request — all triggers fire in background.
 */

import { db } from '../db';
import {
  setupTasks,
  setupTaskEvents,
  clients,
  emailLogs,
  aiCoachConversations,
  aiCoachMessages,
} from '@shared/schema';
import { eq, and, sql, ne, desc } from 'drizzle-orm';
import { SETUP_CADENCE } from '@shared/knowledge-base';
import { Resend } from 'resend';

export class SetupTriggerService {

  /**
   * Fire triggers for a task status change.
   * Called ASYNCHRONOUSLY from the PATCH /api/setup-tasks/:id endpoint.
   * Must never throw — all errors are caught and logged.
   */
  async onTaskStatusChange(
    clientId: number,
    taskId: number,
    newStatus: string,
    task: { appId: string; stepId: string; substepId: string | null; title: string }
  ): Promise<void> {
    try {
      if (newStatus === "completed" && !task.substepId) {
        // Parent step completed — this is a meaningful milestone
        await this.onStepCompleted(clientId, task);
      }

      // Check if all steps for this app are now complete
      await this.checkAppCompletion(clientId, task.appId);

      // Check if ALL tasks across all apps are complete
      await this.checkJourneyCompletion(clientId);

    } catch (error) {
      console.error('[SetupTriggers] Error processing trigger:', error);
      // Never re-throw — triggers must not break the user flow
    }
  }

  /**
   * Fires when a parent setup step is completed (not a substep).
   */
  private async onStepCompleted(
    clientId: number,
    task: { appId: string; stepId: string; title: string }
  ): Promise<void> {
    // 1. Log the event
    await db.insert(setupTaskEvents).values({
      clientId,
      taskId: null,
      eventType: "completed",
      metadata: { appId: task.appId, stepId: task.stepId, title: task.title },
    });

    // 2. Try to load knowledge base for Coach Blue action
    try {
      const appModule = await import(`../../shared/knowledge-base/apps/${task.appId}`);
      const knowledge = appModule[`${task.appId}Knowledge`];

      if (knowledge) {
        const step = knowledge.setupSteps.find((s: any) => s.id === task.stepId);

        if (step?.triggerOnComplete) {
          // Queue completion email (if within daily cap)
          if (step.triggerOnComplete.email) {
            await this.queueStepCompletionEmail(clientId, task, step.triggerOnComplete.email);
          }

          // Queue Coach Blue remark
          if (step.triggerOnComplete.coachBlueAction) {
            await this.queueCoachBlueMessage(clientId, step.triggerOnComplete.coachBlueAction);
          }
        }
      }
    } catch (e) {
      // Knowledge file may not exist for this app yet — that's fine
      console.log(`[SetupTriggers] No knowledge file for ${task.appId} — skipping step triggers`);
    }

    // 3. Fire in-app notification
    await this.fireNotification(clientId, "step_completed", {
      title: "Step Complete",
      message: `You've completed "${task.title}" — nice work.`,
    });
  }

  /**
   * Checks if all steps for a specific app are complete.
   */
  private async checkAppCompletion(clientId: number, appId: string): Promise<void> {
    const appTasks = await db
      .select()
      .from(setupTasks)
      .where(and(
        eq(setupTasks.clientId, clientId),
        eq(setupTasks.appId, appId),
      ));

    const parentTasks = appTasks.filter(t => !t.substepId);
    const completedParents = parentTasks.filter(t => t.status === "completed");

    if (parentTasks.length > 0 && completedParents.length === parentTasks.length) {
      // Check if we already logged this app completion
      const alreadyLogged = await db
        .select({ id: setupTaskEvents.id })
        .from(setupTaskEvents)
        .where(and(
          eq(setupTaskEvents.clientId, clientId),
          eq(setupTaskEvents.eventType, "app_complete"),
          sql`${setupTaskEvents.metadata}->>'appId' = ${appId}`,
        ))
        .limit(1);

      if (alreadyLogged.length > 0) return;

      // All parent steps for this app are complete
      await db.insert(setupTaskEvents).values({
        clientId,
        eventType: "app_complete",
        metadata: { appId },
      });

      // Find the milestone name from cadence
      const cadenceStep = SETUP_CADENCE.find(s => s.appId === appId);
      const milestone = cadenceStep?.milestone || `/ ${appId} setup`;

      // Send app completion email
      await this.queueAppCompletionEmail(clientId, appId, milestone);

      // Coach Blue celebration
      try {
        const appModule = await import(`../../shared/knowledge-base/apps/${appId}`);
        const knowledge = appModule[`${appId}Knowledge`];
        if (knowledge?.coachBlueGuidance?.onComplete) {
          await this.queueCoachBlueMessage(clientId, knowledge.coachBlueGuidance.onComplete);
        }
      } catch (e) {
        // Knowledge not available
      }

      // Fire in-app notification
      await this.fireNotification(clientId, "app_complete", {
        title: "Milestone Reached",
        message: `${milestone} — / ${appId} setup is complete.`,
      });
    }
  }

  /**
   * Checks if the entire setup journey is complete.
   */
  private async checkJourneyCompletion(clientId: number): Promise<void> {
    const allTasks = await db
      .select()
      .from(setupTasks)
      .where(eq(setupTasks.clientId, clientId));

    const parentTasks = allTasks.filter(t => !t.substepId);
    const completedParents = parentTasks.filter(t => t.status === "completed" || t.status === "skipped");

    if (parentTasks.length > 0 && completedParents.length === parentTasks.length) {
      // Check if already logged
      const alreadyLogged = await db
        .select({ id: setupTaskEvents.id })
        .from(setupTaskEvents)
        .where(and(
          eq(setupTaskEvents.clientId, clientId),
          eq(setupTaskEvents.eventType, "journey_complete"),
        ))
        .limit(1);

      if (alreadyLogged.length > 0) return;

      // Journey complete
      await db.update(clients)
        .set({ setupPhase: "complete", setupProgress: 100 })
        .where(eq(clients.id, clientId));

      await db.insert(setupTaskEvents).values({
        clientId,
        eventType: "journey_complete",
        metadata: { completedAt: new Date().toISOString() },
      });

      await this.queueJourneyCompletionEmail(clientId);

      await this.queueCoachBlueMessage(
        clientId,
        "Congratulations — your digital presence setup is complete. Every app is configured and working. From here, I'll keep an eye on your progress and let you know when there are opportunities to improve. Your Directions for Use will shift to ongoing optimization tips. You've done the hard part."
      );

      await this.fireNotification(clientId, "journey_complete", {
        title: "Journey Complete",
        message: "Your digital presence setup is fully complete.",
      });
    }
  }

  // =====================
  // EMAIL METHODS
  // =====================

  /**
   * Check daily email cap before sending.
   * Returns true if an email can be sent today.
   */
  private async canSendEmail(clientId: number): Promise<boolean> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayEmails = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(emailLogs)
      .where(and(
        eq(emailLogs.clientId, clientId),
        sql`${emailLogs.createdAt} >= ${today}`,
        sql`${emailLogs.emailType} LIKE 'setup_%'`,
      ));

    return (todayEmails[0]?.count || 0) < 1;
  }

  private async queueStepCompletionEmail(
    clientId: number,
    task: { appId: string; stepId: string; title: string },
    emailTrigger: { templateId: string; subject: string; delayMinutes: number }
  ): Promise<void> {
    if (!(await this.canSendEmail(clientId))) {
      console.log(`[SetupTriggers] Daily email cap reached for client ${clientId} — skipping step email`);
      return;
    }

    const client = await db.select().from(clients).where(eq(clients.id, clientId)).limit(1);
    if (!client[0]?.email) return;

    const nextStep = await this.getNextIncompleteStep(clientId);

    await this.sendSetupEmail(
      client[0].email,
      client[0].companyName || "there",
      clientId,
      emailTrigger.subject,
      "setup_step_complete",
      this.buildStepCompletionEmailHtml(
        client[0].companyName || "there",
        task.title,
        task.appId,
        nextStep
      )
    );
  }

  private async queueAppCompletionEmail(
    clientId: number,
    appId: string,
    milestone: string
  ): Promise<void> {
    if (!(await this.canSendEmail(clientId))) return;

    const client = await db.select().from(clients).where(eq(clients.id, clientId)).limit(1);
    if (!client[0]?.email) return;

    const currentCadence = SETUP_CADENCE.find(s => s.appId === appId);
    const nextAppInCadence = currentCadence
      ? SETUP_CADENCE.find(s => s.order === currentCadence.order + 1)
      : null;

    await this.sendSetupEmail(
      client[0].email,
      client[0].companyName || "there",
      clientId,
      `${milestone} — / ${appId} is fully set up`,
      "setup_app_complete",
      this.buildAppCompletionEmailHtml(
        client[0].companyName || "there",
        appId,
        milestone,
        nextAppInCadence
      )
    );
  }

  private async queueJourneyCompletionEmail(clientId: number): Promise<void> {
    const client = await db.select().from(clients).where(eq(clients.id, clientId)).limit(1);
    if (!client[0]?.email) return;

    await this.sendSetupEmail(
      client[0].email,
      client[0].companyName || "there",
      clientId,
      "Your digital presence setup is complete",
      "setup_journey_complete",
      this.buildJourneyCompletionEmailHtml(client[0].companyName || "there")
    );
  }

  /**
   * Send email using Resend (follows existing patterns in resend-email.ts / assessment-emails.ts)
   */
  private async sendSetupEmail(
    recipientEmail: string,
    recipientName: string,
    clientId: number,
    subject: string,
    emailType: string,
    htmlBody: string
  ): Promise<void> {
    try {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        console.error('[SetupTriggers] No RESEND_API_KEY — cannot send email');
        return;
      }

      const resend = new Resend(apiKey);
      const fromEmail = process.env.FROM_EMAIL || 'noreply@businessblueprint.io';

      const result = await resend.emails.send({
        from: `businessblueprint.io <${fromEmail}>`,
        to: recipientEmail,
        subject: subject,
        html: htmlBody,
      });

      // Log to email_logs table
      await db.insert(emailLogs).values({
        recipientEmail,
        recipientName,
        clientId,
        emailType,
        subject,
        htmlBody,
        status: "sent",
        sentAt: new Date(),
        resendApiId: (result as any)?.data?.id || null,
      });

      console.log(`[SetupTriggers] Email sent: ${emailType} to ${recipientEmail}`);
    } catch (error) {
      console.error('[SetupTriggers] Email send failed:', error);

      // Log failure
      await db.insert(emailLogs).values({
        recipientEmail,
        recipientName,
        clientId,
        emailType,
        subject,
        htmlBody,
        status: "failed",
        errorMessage: String(error),
      }).catch(() => {});
    }
  }

  // =====================
  // COACH BLUE MESSAGES
  // =====================

  /**
   * Queue a proactive Coach Blue message.
   * Inserts into the AI coach conversation so it appears in the widget.
   */
  async queueCoachBlueMessage(clientId: number, message: string): Promise<void> {
    try {
      // Find or create a conversation for this client
      let conversations = await db
        .select()
        .from(aiCoachConversations)
        .where(eq(aiCoachConversations.clientId, clientId))
        .orderBy(desc(aiCoachConversations.updatedAt))
        .limit(1);

      let conversationId: number;

      if (conversations.length === 0) {
        const [newConv] = await db.insert(aiCoachConversations).values({
          clientId,
          title: "Coach Blue",
        }).returning();
        conversationId = newConv.id;
      } else {
        conversationId = conversations[0].id;
      }

      // Insert the proactive message
      await db.insert(aiCoachMessages).values({
        conversationId,
        role: "assistant",
        content: message,
        messageType: "proactive",
      });

      // Update conversation timestamp
      await db.update(aiCoachConversations)
        .set({ updatedAt: new Date() })
        .where(eq(aiCoachConversations.id, conversationId));

      console.log(`[SetupTriggers] Coach Blue message queued for client ${clientId}`);
    } catch (error) {
      console.error('[SetupTriggers] Coach Blue message failed:', error);
    }
  }

  // =====================
  // IN-APP NOTIFICATIONS
  // =====================

  /**
   * Fire an in-app notification.
   * Stores as a setup_task_event — the frontend polls for recent notification events.
   */
  private async fireNotification(
    clientId: number,
    type: string,
    data: { title: string; message: string }
  ): Promise<void> {
    await db.insert(setupTaskEvents).values({
      clientId,
      eventType: `notification_${type}`,
      metadata: data,
    });
  }

  // =====================
  // HELPER METHODS
  // =====================

  private async getNextIncompleteStep(clientId: number): Promise<{ appId: string; title: string } | null> {
    const tasks = await db
      .select()
      .from(setupTasks)
      .where(and(
        eq(setupTasks.clientId, clientId),
        ne(setupTasks.status, "completed"),
        ne(setupTasks.status, "skipped"),
        sql`${setupTasks.substepId} IS NULL`,
      ))
      .orderBy(setupTasks.cadenceOrder)
      .limit(1);

    return tasks[0] ? { appId: tasks[0].appId, title: tasks[0].title } : null;
  }

  // =====================
  // EMAIL HTML TEMPLATES
  // =====================
  // Clean, professional HTML emails.
  // Tone: pharmaceutical, authoritative, helpful. No emoji. No marketing fluff.
  // Palette: white background, Triad Black (#09080E) text, app accent colors for headers.

  private buildStepCompletionEmailHtml(
    businessName: string,
    stepTitle: string,
    appId: string,
    nextStep: { appId: string; title: string } | null
  ): string {
    return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
        <tr><td style="padding:32px 40px;border-bottom:2px solid #09080E;">
          <h2 style="margin:0;font-size:14px;letter-spacing:2px;color:#09080E;text-transform:uppercase;">Directions for Use</h2>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="font-size:16px;color:#09080E;margin:0 0 20px;">
            ${businessName},
          </p>
          <p style="font-size:16px;color:#09080E;margin:0 0 20px;">
            Step completed: <strong>${stepTitle}</strong> in / ${appId}.
          </p>
          ${nextStep ? `
          <p style="font-size:16px;color:#09080E;margin:0 0 20px;">
            Next up: <strong>${nextStep.title}</strong> in / ${nextStep.appId}. Log in to continue.
          </p>
          ` : `
          <p style="font-size:16px;color:#09080E;margin:0 0 20px;">
            You're making solid progress. Log in to see what's next.
          </p>
          `}
          <a href="https://businessblueprint.io/portal/directions"
             style="display:inline-block;padding:12px 28px;background:#09080E;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">
            Open Directions for Use
          </a>
        </td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid #e5e7eb;">
          <p style="font-size:12px;color:#9ca3af;margin:0;">
            businessblueprint.io — TRIADBLUE Inc.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
  }

  private buildAppCompletionEmailHtml(
    businessName: string,
    appId: string,
    milestone: string,
    nextApp: { appId: string; milestone: string; why: string } | null | undefined
  ): string {
    return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
        <tr><td style="padding:32px 40px;border-bottom:2px solid #09080E;">
          <h2 style="margin:0;font-size:14px;letter-spacing:2px;color:#09080E;text-transform:uppercase;">Directions for Use — Milestone</h2>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="font-size:16px;color:#09080E;margin:0 0 20px;">
            ${businessName},
          </p>
          <p style="font-size:20px;color:#09080E;margin:0 0 8px;font-weight:700;">
            ${milestone}
          </p>
          <p style="font-size:16px;color:#09080E;margin:0 0 24px;">
            / ${appId} is fully configured. This part of your digital presence is working.
          </p>
          ${nextApp ? `
          <p style="font-size:16px;color:#09080E;margin:0 0 8px;font-weight:600;">
            Next: / ${nextApp.appId}
          </p>
          <p style="font-size:16px;color:#6b7280;margin:0 0 24px;">
            ${nextApp.why}
          </p>
          ` : ''}
          <a href="https://businessblueprint.io/portal/directions"
             style="display:inline-block;padding:12px 28px;background:#09080E;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">
            Continue Setup
          </a>
        </td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid #e5e7eb;">
          <p style="font-size:12px;color:#9ca3af;margin:0;">
            businessblueprint.io — TRIADBLUE Inc.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
  }

  private buildJourneyCompletionEmailHtml(businessName: string): string {
    return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
        <tr><td style="padding:32px 40px;border-bottom:2px solid #09080E;">
          <h2 style="margin:0;font-size:14px;letter-spacing:2px;color:#09080E;text-transform:uppercase;">Directions for Use — Complete</h2>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="font-size:16px;color:#09080E;margin:0 0 20px;">
            ${businessName},
          </p>
          <p style="font-size:20px;color:#09080E;margin:0 0 12px;font-weight:700;">
            Your digital presence setup is complete.
          </p>
          <p style="font-size:16px;color:#09080E;margin:0 0 20px;">
            Every app in your prescription has been configured. Your business is now visible, responsive, and actively managed online.
          </p>
          <p style="font-size:16px;color:#09080E;margin:0 0 24px;">
            From here, your Directions for Use will shift to ongoing optimization recommendations. We will also prompt you for a 90-day rescan to measure your progress.
          </p>
          <a href="https://businessblueprint.io/portal/directions"
             style="display:inline-block;padding:12px 28px;background:#09080E;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">
            View Your Progress
          </a>
        </td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid #e5e7eb;">
          <p style="font-size:12px;color:#9ca3af;margin:0;">
            businessblueprint.io — TRIADBLUE Inc.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
  }

  // =====================
  // STALL REMINDER EMAILS
  // =====================

  buildStallReminderEmailHtml(
    businessName: string,
    stallDays: number,
    currentStep: { appId: string; title: string },
    progressPercent: number
  ): string {
    const urgencyText = stallDays >= 14
      ? "Your setup has been paused for two weeks. Getting back on track now will make a meaningful difference."
      : stallDays >= 7
      ? "It's been a week since your last progress. Most steps take under 15 minutes."
      : "You were making good progress. Pick up where you left off — this step is straightforward.";

    return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
        <tr><td style="padding:32px 40px;border-bottom:2px solid #09080E;">
          <h2 style="margin:0;font-size:14px;letter-spacing:2px;color:#09080E;text-transform:uppercase;">Directions for Use — Reminder</h2>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="font-size:16px;color:#09080E;margin:0 0 20px;">
            ${businessName},
          </p>
          <p style="font-size:16px;color:#09080E;margin:0 0 20px;">
            ${urgencyText}
          </p>
          <p style="font-size:16px;color:#09080E;margin:0 0 8px;">
            <strong>Your current step:</strong> ${currentStep.title}
          </p>
          <p style="font-size:16px;color:#6b7280;margin:0 0 24px;">
            in / ${currentStep.appId} — overall progress: ${progressPercent}%
          </p>
          <a href="https://businessblueprint.io/portal/directions"
             style="display:inline-block;padding:12px 28px;background:#09080E;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">
            Resume Setup
          </a>
        </td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid #e5e7eb;">
          <p style="font-size:12px;color:#9ca3af;margin:0;">
            businessblueprint.io — TRIADBLUE Inc.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
  }
}

export const setupTriggerService = new SetupTriggerService();
