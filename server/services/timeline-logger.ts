import { db } from '../db';
import { crmTimeline } from '@shared/schema';

interface TimelineEvent {
  clientId: number;
  contactId: number;
  eventType: string;
  eventSubtype?: string;
  title: string;
  description?: string;
  sourceApp: string; // promote, post, elevate, respond, engage, publish, optimize, connect, amplify
  sourceEntityType?: string; // email, review, message, post, listing, campaign, etc.
  sourceEntityId?: string;
  metadata?: Record<string, any>;
  actorType?: 'user' | 'system' | 'automation';
}

export async function logContactActivity(event: TimelineEvent): Promise<void> {
  try {
    await db.insert(crmTimeline).values({
      clientId: event.clientId,
      contactId: event.contactId,
      eventType: event.eventType,
      eventSubtype: event.eventSubtype || null,
      title: event.title,
      description: event.description || null,
      sourceApp: event.sourceApp,
      sourceEntityType: event.sourceEntityType || null,
      sourceEntityId: event.sourceEntityId || null,
      metadata: event.metadata || null,
      actorType: event.actorType || 'system',
      occurredAt: new Date(),
    });
  } catch (error) {
    console.error(`[Timeline] Failed to log activity for contact ${event.contactId}:`, error);
    // Never throw — timeline logging should never break the calling feature
  }
}
