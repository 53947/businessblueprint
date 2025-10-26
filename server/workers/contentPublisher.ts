import { Worker, Job } from 'bullmq';
import { redisConnection, PublishPostJob, SynupSyncJob } from '../services/queue';
import { db } from '../db';
import { contentPosts, externalSync } from '@shared/schema';
import { eq } from 'drizzle-orm';

// Import platform adapters (will be created in next task)
// import * as facebookAdapter from '../services/platforms/facebook';
// import * as instagramAdapter from '../services/platforms/instagram';
// import * as linkedinAdapter from '../services/platforms/linkedin';
// import * as xAdapter from '../services/platforms/x';
// import * as googleBusinessAdapter from '../services/platforms/googleBusiness';

// Content Publishing Worker
export const contentPublishWorker = new Worker<PublishPostJob>(
  'content-publish',
  async (job: Job<PublishPostJob>) => {
    const { postId, clientId, platforms } = job.data;
    
    console.log(`[ContentPublisher] Processing post ${postId} for client ${clientId}`);
    
    try {
      // Get post from database
      const [post] = await db
        .select()
        .from(contentPosts)
        .where(eq(contentPosts.id, postId));
      
      if (!post) {
        throw new Error(`Post ${postId} not found`);
      }
      
      // Update post status to 'publishing'
      await db
        .update(contentPosts)
        .set({ status: 'publishing' })
        .where(eq(contentPosts.id, postId));
      
      const publishResults: Record<string, any> = {};
      const publishErrors: Record<string, any> = {};
      
      // Publish to each platform
      for (const platform of platforms) {
        try {
          job.updateProgress({
            platform,
            status: 'publishing',
          });
          
          // TODO: Implement actual platform publishing
          // For now, just simulate success
          console.log(`[ContentPublisher] Publishing to ${platform} - Post ${postId}`);
          
          // Placeholder: Replace with actual platform adapters
          publishResults[platform] = {
            postId: `${platform}_${Date.now()}`,
            url: `https://${platform}.com/post/${postId}`,
            status: 'published',
            publishedAt: new Date().toISOString(),
          };
          
          /*
          // Real implementation (uncomment when adapters are ready):
          switch (platform) {
            case 'facebook':
              publishResults[platform] = await facebookAdapter.publishPost(post, clientId);
              break;
            case 'instagram':
              publishResults[platform] = await instagramAdapter.publishPost(post, clientId);
              break;
            case 'linkedin':
              publishResults[platform] = await linkedinAdapter.publishPost(post, clientId);
              break;
            case 'x':
              publishResults[platform] = await xAdapter.publishPost(post, clientId);
              break;
            case 'google_business':
              publishResults[platform] = await googleBusinessAdapter.publishPost(post, clientId);
              break;
            default:
              throw new Error(`Unsupported platform: ${platform}`);
          }
          */
          
        } catch (error: any) {
          console.error(`[ContentPublisher] Failed to publish to ${platform}:`, error);
          publishErrors[platform] = {
            error: error.message,
            code: error.code,
            timestamp: new Date().toISOString(),
          };
        }
      }
      
      // Update post with results
      const hasErrors = Object.keys(publishErrors).length > 0;
      const allFailed = Object.keys(publishResults).length === 0;
      
      await db
        .update(contentPosts)
        .set({
          status: allFailed ? 'failed' : 'published',
          publishedAt: allFailed ? null : new Date(),
          publishResults,
          publishErrors: hasErrors ? publishErrors : null,
        })
        .where(eq(contentPosts.id, postId));
      
      console.log(`[ContentPublisher] Post ${postId} publishing complete. Results:`, {
        published: Object.keys(publishResults),
        failed: Object.keys(publishErrors),
      });
      
      // Trigger Synup sync if applicable (MSP clients)
      // This will be implemented in Task 7
      
      return {
        postId,
        success: !allFailed,
        publishedTo: Object.keys(publishResults),
        failedOn: Object.keys(publishErrors),
      };
      
    } catch (error: any) {
      console.error(`[ContentPublisher] Fatal error processing post ${postId}:`, error);
      
      // Update post status to failed
      await db
        .update(contentPosts)
        .set({
          status: 'failed',
          publishErrors: {
            error: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
          },
        })
        .where(eq(contentPosts.id, postId));
      
      throw error; // Re-throw to mark job as failed
    }
  },
  {
    connection: redisConnection,
    concurrency: 5, // Process up to 5 posts simultaneously
  }
);

// Synup Sync Worker
export const synupSyncWorker = new Worker<SynupSyncJob>(
  'synup-sync',
  async (job: Job<SynupSyncJob>) => {
    const { direction, entityType, entityId, action } = job.data;
    
    console.log(`[SynupSync] Processing ${direction} sync for ${entityType} ${entityId} (${action})`);
    
    try {
      // TODO: Implement in Task 7
      // For now, just log
      console.log('[SynupSync] Sync logic will be implemented in Task 7');
      
      return {
        success: true,
        direction,
        entityType,
        entityId,
        action,
      };
      
    } catch (error: any) {
      console.error('[SynupSync] Sync failed:', error);
      throw error;
    }
  },
  {
    connection: redisConnection,
    concurrency: 3,
  }
);

// Worker event handlers
contentPublishWorker.on('completed', (job) => {
  console.log(`[ContentPublisher] Job ${job.id} completed successfully`);
});

contentPublishWorker.on('failed', (job, err) => {
  console.error(`[ContentPublisher] Job ${job?.id} failed:`, err.message);
});

synupSyncWorker.on('completed', (job) => {
  console.log(`[SynupSync] Job ${job.id} completed successfully`);
});

synupSyncWorker.on('failed', (job, err) => {
  console.error(`[SynupSync] Job ${job?.id} failed:`, err.message);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('[Workers] Shutting down gracefully...');
  await contentPublishWorker.close();
  await synupSyncWorker.close();
  process.exit(0);
});

console.log('[Workers] Content Publisher and Synup Sync workers started');
