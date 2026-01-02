import { db } from '../db';
import { clients } from '@shared/schema';
import { eq } from 'drizzle-orm';

const DEMO_EMAILS = [
  'demo@businessblueprint.io',
  'test@businessblueprint.io',
  'agency@businessblueprint.io',
];

export function isDemoEmail(email: string): boolean {
  return DEMO_EMAILS.includes(email.toLowerCase());
}

export async function isDemoAccountById(clientId: number): Promise<boolean> {
  try {
    const client = await db.query.clients.findFirst({
      where: eq(clients.id, clientId),
      columns: { email: true }
    });
    
    if (!client?.email) return false;
    return isDemoEmail(client.email);
  } catch (error) {
    console.error('[isDemoAccountById] Error checking demo status:', error);
    return false;
  }
}

export async function getClientEmail(clientId: number): Promise<string | null> {
  try {
    const client = await db.query.clients.findFirst({
      where: eq(clients.id, clientId),
      columns: { email: true }
    });
    return client?.email || null;
  } catch (error) {
    console.error('[getClientEmail] Error fetching email:', error);
    return null;
  }
}
