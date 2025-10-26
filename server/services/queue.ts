import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';

// Redis connection (Upstash or local Redis)
const redisUrl = process.env.UPSTASH_REDIS_URL || process.env.REDIS_URL || 'redis://localhost:6379';

export const redisConnection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

// Content Publishing Queue
export const contentPublishQueue = new Queue('content-publish', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: {
      count: 1000, // Keep last 1000 completed jobs
      age: 24 * 3600, // Remove after 24 hours
    },
    removeOnFail: {
      count: 5000, // Keep last 5000 failed jobs for debugging
    },
  },
});

// Synup Sync Queue
export const synupSyncQueue = new Queue('synup-sync', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  },
});

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
  const delay = scheduledFor.getTime() - Date.now();
  
  return await contentPublishQueue.add(
    'publish-post',
    {
      postId,
      clientId,
      platforms,
    },
    {
      delay: Math.max(0, delay), // Don't allow negative delays
      jobId: `post-${postId}`, // Unique ID prevents duplicate scheduling
    }
  );
}

export async function scheduleSynupSync(job: SynupSyncJob) {
  return await synupSyncQueue.add('sync', job);
}

// Cancel a scheduled post
export async function cancelScheduledPost(postId: number) {
  const job = await contentPublishQueue.getJob(`post-${postId}`);
  if (job) {
    await job.remove();
  }
}

// Get job status
export async function getPostJobStatus(postId: number) {
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
