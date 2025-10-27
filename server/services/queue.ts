import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';

// Redis connection (Upstash or local Redis)
const redisUrl = process.env.UPSTASH_REDIS_URL || process.env.REDIS_URL;
let redisAvailable = false;
let redisConnection: IORedis | null = null;

// Only try to connect if Redis URL is configured
if (redisUrl) {
  redisConnection = new IORedis(redisUrl, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy(times) {
      // Stop retrying after 3 attempts (within first 10 seconds)
      if (times > 3) {
        console.warn('[Queue] Redis connection failed after 3 attempts. Running without scheduling support.');
        redisAvailable = false;
        return null; // Stop retrying
      }
      return Math.min(times * 1000, 3000);
    },
    lazyConnect: true, // Don't connect immediately
  });

  // Try to connect
  redisConnection.connect().then(() => {
    redisAvailable = true;
    console.log('✅ Redis connected - Scheduling enabled');
  }).catch((err) => {
    console.warn('⚠️ Redis not available - Scheduling disabled:', err.message);
    redisAvailable = false;
  });
} else {
  console.warn('⚠️ UPSTASH_REDIS_URL not configured - Scheduling disabled');
}

// Content Publishing Queue (only if Redis available)
export const contentPublishQueue = redisConnection ? new Queue('content-publish', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: {
      count: 1000,
      age: 24 * 3600,
    },
    removeOnFail: {
      count: 5000,
    },
  },
}) : null as any;

// Synup Sync Queue (only if Redis available)
export const synupSyncQueue = redisConnection ? new Queue('synup-sync', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  },
}) : null as any;

export { redisConnection, redisAvailable };

// Job Types
export interface PublishPostJob {
  postId: number;
  clientId: number;
  platforms: string[];
}

export interface SynupSyncJob {
  direction: 'outbound' | 'inbound';
  entityType: 'post';
  entityId: number;
  action: 'upsert' | 'delete' | 'status_update';
}

// Helper functions to add jobs
export async function schedulePostPublish(postId: number, clientId: number, platforms: string[], scheduledFor: Date) {
  if (!redisAvailable || !contentPublishQueue) {
    throw new Error('Scheduling not available - Redis not configured');
  }

  const delay = scheduledFor.getTime() - Date.now();
  
  return await contentPublishQueue.add(
    'publish-post',
    {
      postId,
      clientId,
      platforms,
    },
    {
      delay: Math.max(0, delay),
      jobId: `post-${postId}`,
    }
  );
}

export async function scheduleSynupSync(job: SynupSyncJob) {
  if (!redisAvailable || !synupSyncQueue) {
    console.warn('[Queue] Synup sync not available - Redis not configured');
    return null;
  }
  return await synupSyncQueue.add('sync', job);
}

// Cancel a scheduled post
export async function cancelScheduledPost(postId: number) {
  if (!redisAvailable || !contentPublishQueue) {
    return;
  }
  const job = await contentPublishQueue.getJob(`post-${postId}`);
  if (job) {
    await job.remove();
  }
}

// Get job status
export async function getPostJobStatus(postId: number) {
  if (!redisAvailable || !contentPublishQueue) {
    return null;
  }
  const job = await contentPublishQueue.getJob(`post-${postId}`);
  if (!job) {
    return null;
  }
  
  const state = await job.getState();
  return {
    id: job.id,
    state,
    progress: job.progress,
    attemptsMade: job.attemptsMade,
    failedReason: job.failedReason,
    finishedOn: job.finishedOn,
    processedOn: job.processedOn,
  };
}
