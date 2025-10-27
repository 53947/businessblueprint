/**
 * Synup Two-Way Sync Service
 * 
 * Syncs social posts between Content Management platform and Synup
 * - Outbound: Push posts to Synup for support/execution
 * - Inbound: Receive status updates from Synup
 * 
 * Only enabled for MSP clients (who use Synup for listings/reviews)
 */

import { db } from '../../db';
import { 
  contentPosts, 
  externalSync, 
  syncLogs,
  synupLocations,
} from '@shared/schema';
import { eq, and } from 'drizzle-orm';
import crypto from 'crypto';

interface SynupPost {
  local_id: number;
  title: string;
  content: string;
  media_urls: string[];
  platforms: string[];
  status: string;
  scheduled_for?: string;
  published_at?: string;
  client_id: number;
}

interface SynupUpdatePayload {
  local_id: number;
  external_id?: string;
  status?: string;
  notes?: string;
  published_at?: string;
  error_message?: string;
}

export class SynupSyncService {
  private baseUrl: string;
  private apiKey: string;
  private systemName = 'synup';

  constructor() {
    this.baseUrl = process.env.SYNUP_BASE_URL || 'https://api.synup.com/api/v4';
    this.apiKey = process.env.SYNUP_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('[SynupSync] SYNUP_API_KEY not configured - sync disabled');
    }
  }

  /**
   * Initialize sync system
   */
  initialize(): void {
    if (!this.apiKey) return;
    console.log('[SynupSync] Initialized');
  }

  /**
   * Check if sync is enabled for a client
   */
  async isSyncEnabled(clientId: number): Promise<boolean> {
    // Check if client has MSP tier and Synup enabled
    // For now, check if client has any Synup locations
    try {
      const locations = await db
        .select()
        .from(synupLocations)
        .where(eq(synupLocations.clientId, clientId))
        .limit(1);

      return locations.length > 0;
    } catch (error) {
      console.error('[SynupSync] Error checking sync enabled:', error);
      return false;
    }
  }

  /**
   * Map internal post to Synup format
   */
  private mapPostToSynup(post: any): SynupPost {
    return {
      local_id: post.id,
      title: (post.caption || '').slice(0, 80),
      content: post.caption || '',
      media_urls: post.mediaUrls || [],
      platforms: post.platforms || [],
      status: this.mapStatusToSynup(post.status),
      scheduled_for: post.scheduledFor?.toISOString(),
      published_at: post.publishedAt?.toISOString(),
      client_id: post.clientId,
    };
  }

  /**
   * Map internal status to Synup status
   */
  private mapStatusToSynup(status: string): string {
    const statusMap: Record<string, string> = {
      'draft': 'DRAFT',
      'scheduled': 'QUEUED',
      'publishing': 'PUBLISHING',
      'published': 'PUBLISHED',
      'failed': 'FAILED',
    };
    return statusMap[status] || 'DRAFT';
  }

  /**
   * Map Synup status to internal status
   */
  private mapStatusFromSynup(synupStatus: string): string {
    const statusMap: Record<string, string> = {
      'DRAFT': 'draft',
      'QUEUED': 'scheduled',
      'PUBLISHING': 'publishing',
      'PUBLISHED': 'published',
      'FAILED': 'failed',
    };
    return statusMap[synupStatus] || 'draft';
  }

  /**
   * Calculate checksum for change detection
   */
  private calculateChecksum(post: any): string {
    const data = JSON.stringify({
      caption: post.caption,
      platforms: post.platforms,
      mediaUrls: post.mediaUrls,
      status: post.status,
      scheduledFor: post.scheduledFor?.toISOString(),
    });
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * Push a post to Synup (outbound sync)
   */
  async pushPostToSynup(postId: number): Promise<boolean> {
    if (!this.apiKey) {
      console.log('[SynupSync] Sync not configured, skipping push');
      return false;
    }

    try {
      // Get post
      const [post] = await db
        .select()
        .from(contentPosts)
        .where(eq(contentPosts.id, postId));

      if (!post) {
        console.error('[SynupSync] Post not found:', postId);
        return false;
      }

      // Check if sync enabled for client
      const enabled = await this.isSyncEnabled(post.clientId);
      if (!enabled) {
        console.log('[SynupSync] Sync not enabled for client:', post.clientId);
        return false;
      }

      // Check for existing sync record
      const [existingSync] = await db
        .select()
        .from(externalSync)
        .where(and(
          eq(externalSync.systemName, this.systemName),
          eq(externalSync.entityType, 'post'),
          eq(externalSync.entityId, postId)
        ));

      const newChecksum = this.calculateChecksum(post);

      // Skip if no changes
      if (existingSync && existingSync.checksum === newChecksum) {
        console.log('[SynupSync] No changes detected, skipping push');
        return true;
      }

      // Prepare payload
      const payload = this.mapPostToSynup(post);

      // Make API request
      const method = existingSync?.externalId ? 'PUT' : 'POST';
      const endpoint = existingSync?.externalId 
        ? `${this.baseUrl}/posts/${existingSync.externalId}`
        : `${this.baseUrl}/posts`;

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Synup API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const externalId = result.id || result.data?.id;

      // Update or create sync record
      if (existingSync) {
        await db
          .update(externalSync)
          .set({
            externalId: externalId || existingSync.externalId,
            lastPushedAt: new Date(),
            checksum: newChecksum,
            syncStatus: 'synced',
          })
          .where(eq(externalSync.id, existingSync.id));
      } else {
        await db
          .insert(externalSync)
          .values({
            systemName: this.systemName,
            entityType: 'post',
            entityId: postId,
            externalId: externalId,
            lastPushedAt: new Date(),
            checksum: newChecksum,
            syncStatus: 'synced',
          });
      }

      // Log success
      await db.insert(syncLogs).values({
        systemName: this.systemName,
        direction: 'outbound',
        entityType: 'post',
        entityId: postId,
        action: method === 'POST' ? 'create' : 'update',
        payload: payload as any,
        status: 'success',
      });

      console.log('[SynupSync] Successfully pushed post:', postId);
      return true;
    } catch (error) {
      console.error('[SynupSync] Failed to push post:', error);

      // Log failure
      await db.insert(syncLogs).values({
        systemName: this.systemName,
        direction: 'outbound',
        entityType: 'post',
        entityId: postId,
        action: 'create',
        payload: {} as any,
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      });

      return false;
    }
  }

  /**
   * Handle inbound update from Synup
   * Applies conflict resolution policy
   */
  async applySynupUpdate(payload: SynupUpdatePayload): Promise<boolean> {
    if (!this.apiKey) {
      console.log('[SynupSync] Sync not configured');
      return false;
    }

    try {
      const { local_id, external_id, status, notes, published_at, error_message } = payload;

      // Find post
      const [post] = await db
        .select()
        .from(contentPosts)
        .where(eq(contentPosts.id, local_id));

      if (!post) {
        console.error('[SynupSync] Post not found for update:', local_id);
        return false;
      }

      // Conflict resolution policy:
      // 1. Terminal states (published, failed) from Synup always win
      // 2. If local is already published/failed, don't override
      // 3. Accept status updates from Synup for queued/publishing posts

      const updates: any = {};
      let shouldUpdate = false;

      if (status) {
        const newStatus = this.mapStatusFromSynup(status);
        
        // Terminal state from Synup wins
        if (status === 'PUBLISHED' || status === 'FAILED') {
          updates.status = newStatus;
          shouldUpdate = true;

          if (status === 'PUBLISHED' && published_at) {
            updates.publishedAt = new Date(published_at);
          }
          
          if (status === 'FAILED' && error_message) {
            updates.lastError = error_message;
          }
        }
        // Accept status updates for non-terminal states if local isn't terminal
        else if (post.status !== 'published' && post.status !== 'failed') {
          updates.status = newStatus;
          shouldUpdate = true;
        }
      }

      // Update post if needed
      if (shouldUpdate) {
        await db
          .update(contentPosts)
          .set(updates)
          .where(eq(contentPosts.id, local_id));
      }

      // Update sync record
      await db
        .update(externalSync)
        .set({
          lastPulledAt: new Date(),
          syncStatus: 'synced',
          metadata: notes ? { notes } as any : undefined,
        })
        .where(and(
          eq(externalSync.systemName, this.systemName),
          eq(externalSync.entityId, local_id)
        ));

      // Log update
      await db.insert(syncLogs).values({
        systemName: this.systemName,
        direction: 'inbound',
        entityType: 'post',
        entityId: local_id,
        action: 'status_update',
        payload: payload as any,
        status: 'success',
      });

      console.log('[SynupSync] Successfully applied update:', local_id);
      return true;
    } catch (error) {
      console.error('[SynupSync] Failed to apply update:', error);

      // Log failure
      await db.insert(syncLogs).values({
        systemName: this.systemName,
        direction: 'inbound',
        entityType: 'post',
        entityId: payload.local_id || 0,
        action: 'status_update',
        payload: payload as any,
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      });

      return false;
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    const secret = process.env.SYNUP_WEBHOOK_SECRET || '';
    if (!secret) {
      console.warn('[SynupSync] SYNUP_WEBHOOK_SECRET not configured');
      return false;
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }
}

// Singleton instance
export const synupSyncService = new SynupSyncService();
