import { db } from '../db';
import { contentPosts } from '../../shared/schema';
import { eq, and, lte, isNull, or } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

// Configuration
const POLL_INTERVAL_MS = 10000; // Check for due posts every 10 seconds
const MAX_ATTEMPTS = 3;
const RETRY_DELAYS = [60000, 300000, 900000]; // 1min, 5min, 15min
const LOCK_TIMEOUT_MS = 300000; // 5 minutes - consider job abandoned if locked longer

let schedulerInterval: NodeJS.Timeout | null = null;
let isRunning = false;

// Start the scheduler
export function startScheduler() {
  if (isRunning) {
    console.log('[Scheduler] Already running');
    return;
  }

  console.log('[Scheduler] Starting database-backed post scheduler');
  isRunning = true;

  // Run immediately, then on interval
  processScheduledPosts().catch(err => {
    console.error('[Scheduler] Initial processing error:', err);
  });

  schedulerInterval = setInterval(() => {
    processScheduledPosts().catch(err => {
      console.error('[Scheduler] Processing error:', err);
    });
  }, POLL_INTERVAL_MS);

  console.log('✅ Post scheduler started');
}

// Stop the scheduler
export function stopScheduler() {
  if (!isRunning) {
    return;
  }

  console.log('[Scheduler] Stopping scheduler');
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
  }
  isRunning = false;
}

// Main scheduler loop - claims and processes due posts
async function processScheduledPosts() {
  try {
    // Find posts that are due for publishing
    // 1. Status = 'scheduled'
    // 2. scheduledFor <= NOW
    // 3. Not locked OR lock expired (locked_at + 5min < NOW)
    // 4. Retry: nextRetryAt <= NOW OR nextRetryAt IS NULL
    const duePosts = await db
      .select()
      .from(contentPosts)
      .where(
        and(
          eq(contentPosts.status, 'scheduled'),
          lte(contentPosts.scheduledFor, sql`NOW()`),
          or(
            isNull(contentPosts.lockedAt),
            lte(contentPosts.lockedAt, sql`NOW() - INTERVAL '5 minutes'`)
          ),
          or(
            isNull(contentPosts.nextRetryAt),
            lte(contentPosts.nextRetryAt, sql`NOW()`)
          )
        )
      )
      .limit(10); // Process up to 10 posts per cycle

    if (duePosts.length === 0) {
      return;
    }

    console.log(`[Scheduler] Found ${duePosts.length} posts due for publishing`);

    // Process each post
    for (const post of duePosts) {
      await processPost(post.id);
    }
  } catch (error) {
    console.error('[Scheduler] Error in processScheduledPosts:', error);
  }
}

// Atomically claim and process a single post
async function processPost(postId: number) {
  try {
    // Atomically claim the post using UPDATE ... RETURNING
    const claimed = await db
      .update(contentPosts)
      .set({
        lockedAt: sql`NOW()`,
        status: 'publishing',
      })
      .where(
        and(
          eq(contentPosts.id, postId),
          eq(contentPosts.status, 'scheduled'),
          or(
            isNull(contentPosts.lockedAt),
            lte(contentPosts.lockedAt, sql`NOW() - INTERVAL '5 minutes'`)
          )
        )
      )
      .returning();

    // Check if we successfully claimed it
    if (claimed.length === 0) {
      // Another worker claimed it or post was already processed
      return;
    }

    const post = claimed[0];
    console.log(`[Scheduler] Processing post ${post.id} for client ${post.clientId}`);

    // Import publishing logic dynamically to avoid circular dependencies
    const { publishPost } = await import('../workers/contentPublisher');

    try {
      // Publish the post
      await publishPost(post);

      // Mark as successfully published
      await db
        .update(contentPosts)
        .set({
          status: 'published',
          publishedAt: sql`NOW()`,
          lockedAt: null,
          lastError: null,
          updatedAt: sql`NOW()`,
        })
        .where(eq(contentPosts.id, postId));

      console.log(`[Scheduler] ✅ Successfully published post ${postId}`);
    } catch (publishError: any) {
      // Publishing failed - record error and schedule retry
      const attempts = (post.attempts || 0) + 1;
      const maxReached = attempts >= MAX_ATTEMPTS;

      const nextRetryAt = maxReached
        ? null
        : new Date(Date.now() + (RETRY_DELAYS[Math.min(attempts - 1, RETRY_DELAYS.length - 1)] || 900000));

      await db
        .update(contentPosts)
        .set({
          status: maxReached ? 'failed' : 'scheduled',
          attempts,
          nextRetryAt: maxReached ? null : nextRetryAt,
          lastError: publishError.message || 'Unknown error',
          lockedAt: null,
          updatedAt: sql`NOW()`,
        })
        .where(eq(contentPosts.id, postId));

      if (maxReached) {
        console.error(`[Scheduler] ❌ Post ${postId} failed after ${attempts} attempts:`, publishError.message);
      } else {
        console.warn(`[Scheduler] ⚠️  Post ${postId} failed (attempt ${attempts}/${MAX_ATTEMPTS}), retrying at ${nextRetryAt?.toISOString()}`);
      }
    }
  } catch (error: any) {
    console.error(`[Scheduler] Error processing post ${postId}:`, error);
    // Release lock if we had an error
    try {
      await db
        .update(contentPosts)
        .set({
          status: 'scheduled',
          lockedAt: null,
          lastError: error.message || 'Scheduler error',
          updatedAt: sql`NOW()`,
        })
        .where(eq(contentPosts.id, postId));
    } catch (releaseError) {
      console.error(`[Scheduler] Failed to release lock for post ${postId}:`, releaseError);
    }
  }
}

// Get scheduler status
export function getSchedulerStatus() {
  return {
    isRunning,
    pollInterval: POLL_INTERVAL_MS,
    maxAttempts: MAX_ATTEMPTS,
    retryDelays: RETRY_DELAYS,
  };
}
