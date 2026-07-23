/**
 * Stall Detector
 *
 * Runs on a 6-hour schedule. Checks for clients who have:
 * - Started setup (setupPhase = "in_progress")
 * - Not completed any task in 3+ days (first nudge)
 * - Not completed any task in 7+ days (second nudge)
 * - Not completed any task in 14+ days (third and final nudge)
 *
 * Each stall level triggers at most ONCE per client per stall period.
 * Tracked via setup_task_events to prevent duplicate sends.
 */

import { db } from '../db';
import { setupTasks, setupTaskEvents, clients, emailLogs } from '@shared/schema';
import { eq, and, sql, ne, desc } from 'drizzle-orm';
import { setupTriggerService } from './setup-triggers';
import { Resend } from 'resend';

const STALL_INTERVALS = [
  { days: 3, eventType: "stall_nudge_3d" },
  { days: 7, eventType: "stall_nudge_7d" },
  { days: 14, eventType: "stall_nudge_14d" },
];

let stallInterval: NodeJS.Timeout | null = null;

export function startStallDetector(): void {
  console.log('[StallDetector] Starting — runs every 6 hours');

  // Run immediately on startup, then every 6 hours
  checkForStalls().catch(err => console.error('[StallDetector] Error:', err));

  stallInterval = setInterval(() => {
    checkForStalls().catch(err => console.error('[StallDetector] Error:', err));
  }, 6 * 60 * 60 * 1000); // 6 hours
}

export function stopStallDetector(): void {
  if (stallInterval) {
    clearInterval(stallInterval);
    stallInterval = null;
    console.log('[StallDetector] Stopped');
  }
}

async function checkForStalls(): Promise<void> {
  console.log('[StallDetector] Checking for stalled users...');

  // Find all clients who are in_progress
  const activeClients = await db
    .select({ id: clients.id, email: clients.email, companyName: clients.companyName })
    .from(clients)
    .where(eq(clients.setupPhase, "in_progress"));

  for (const client of activeClients) {
    try {
      await checkClientStall(client.id, client.email, client.companyName || "there");
    } catch (err) {
      console.error(`[StallDetector] Error checking client ${client.id}:`, err);
    }
  }

  console.log(`[StallDetector] Checked ${activeClients.length} active clients`);
}

async function checkClientStall(
  clientId: number,
  email: string,
  businessName: string
): Promise<void> {
  // Find the most recent task completion for this client
  const lastCompletion = await db
    .select({ completedAt: setupTasks.completedAt })
    .from(setupTasks)
    .where(and(
      eq(setupTasks.clientId, clientId),
      eq(setupTasks.status, "completed"),
      sql`${setupTasks.completedAt} IS NOT NULL`,
    ))
    .orderBy(desc(setupTasks.completedAt))
    .limit(1);

  // If no completions, check when tasks were generated (created_at of first task)
  let lastActivityDate: Date;

  if (lastCompletion.length > 0 && lastCompletion[0].completedAt) {
    lastActivityDate = new Date(lastCompletion[0].completedAt);
  } else {
    const firstTask = await db
      .select({ createdAt: setupTasks.createdAt })
      .from(setupTasks)
      .where(eq(setupTasks.clientId, clientId))
      .orderBy(setupTasks.createdAt)
      .limit(1);

    if (firstTask.length === 0) return; // No tasks at all
    lastActivityDate = new Date(firstTask[0].createdAt!);
  }

  const daysSinceActivity = Math.floor(
    (Date.now() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Check each stall interval
  for (const interval of STALL_INTERVALS) {
    if (daysSinceActivity >= interval.days) {
      // Check if we already sent this nudge level
      const alreadySent = await db
        .select({ id: setupTaskEvents.id })
        .from(setupTaskEvents)
        .where(and(
          eq(setupTaskEvents.clientId, clientId),
          eq(setupTaskEvents.eventType, interval.eventType),
        ))
        .limit(1);

      if (alreadySent.length === 0) {
        // Haven't sent this level yet — send it
        await sendStallNudge(clientId, email, businessName, interval.days, interval.eventType);
      }
    }
  }
}

async function sendStallNudge(
  clientId: number,
  email: string,
  businessName: string,
  stallDays: number,
  eventType: string
): Promise<void> {
  // Find their current step
  const nextStep = await db
    .select({ appId: setupTasks.appId, title: setupTasks.title })
    .from(setupTasks)
    .where(and(
      eq(setupTasks.clientId, clientId),
      ne(setupTasks.status, "completed"),
      ne(setupTasks.status, "skipped"),
      sql`${setupTasks.substepId} IS NULL`,
    ))
    .orderBy(setupTasks.cadenceOrder)
    .limit(1);

  if (nextStep.length === 0) return; // All done, no stall

  // Get progress
  const allTasks = await db
    .select()
    .from(setupTasks)
    .where(and(eq(setupTasks.clientId, clientId), sql`${setupTasks.substepId} IS NULL`));

  const completedCount = allTasks.filter(t => t.status === "completed").length;
  const progressPercent = allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0;

  // Send stall reminder email
  const subject = "Your setup in businessblueprint.io — pick up where you left off";
  const html = setupTriggerService.buildStallReminderEmailHtml(
    businessName,
    stallDays,
    { appId: nextStep[0].appId, title: nextStep[0].title },
    progressPercent
  );

  try {
    const apiKey = process.env.ONBOARDING_RESEND_API_KEY;
    if (!apiKey) return;

    const resend = new Resend(apiKey);
    const fromEmail = process.env.FROM_EMAIL || 'noreply@businessblueprint.io';

    await resend.emails.send({
      from: `businessblueprint.io <${fromEmail}>`,
      to: email,
      subject,
      html,
    });

    // Log
    await db.insert(emailLogs).values({
      recipientEmail: email,
      recipientName: businessName,
      clientId,
      emailType: `setup_stall_${stallDays}d`,
      subject,
      htmlBody: html,
      status: "sent",
      sentAt: new Date(),
    });
  } catch (err) {
    console.error(`[StallDetector] Email failed for client ${clientId}:`, err);
  }

  // Coach Blue nudge (via chat widget)
  try {
    const appModule = await import(`../../shared/knowledge-base/apps/${nextStep[0].appId}`);
    const knowledge = appModule[`${nextStep[0].appId}Knowledge`];
    if (knowledge?.coachBlueGuidance?.onStall) {
      await setupTriggerService.queueCoachBlueMessage(clientId, knowledge.coachBlueGuidance.onStall);
    }
  } catch (e) {
    // Knowledge may not exist — use generic nudge
    await setupTriggerService.queueCoachBlueMessage(
      clientId,
      `I noticed you paused on "${nextStep[0].title}" in / ${nextStep[0].appId}. Most people finish this step in under 15 minutes. Want me to walk you through it?`
    );
  }

  // Record that we sent this nudge level
  await db.insert(setupTaskEvents).values({
    clientId,
    eventType,
    metadata: { stallDays, currentStep: nextStep[0].title },
  });

  console.log(`[StallDetector] Sent ${stallDays}-day nudge to client ${clientId}`);
}
