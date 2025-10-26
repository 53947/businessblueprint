import { Worker, Job } from 'bullmq';
import { redisConnection, PublishPostJob, SynupSyncJob } from '../services/queue';
import { db } from '../db';
import { contentPosts, externalSync, socialMediaAccounts } from '@shared/schema';
import { eq, and } from 'drizzle-orm';
import { PlatformFactory, SupportedPlatform } from '../services/platforms/platformFactory';

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
          
          console.log(`[ContentPublisher] Publishing to ${platform} - Post ${postId}`);
          
          // Get platform account credentials
          const [account] = await db
            .select()
            .from(socialMediaAccounts)
            .where(
              and(
                eq(socialMediaAccounts.clientId, clientId),
                eq(socialMediaAccounts.platform, platform),
                eq(socialMediaAccounts.status, 'active')
              )
            );
          
          if (!account) {
            throw new Error(`No active ${platform} account found for client ${clientId}`);
          }
          
          // Check if credentials need refresh
          let credentials = {
            accessToken: account.accessToken,
            refreshToken: account.refreshToken || undefined,
            expiresAt: account.tokenExpiresAt || undefined,
            accountId: String(account.id),
            platformAccountId: account.platformAccountId || undefined,
          };
          
          const needsRefresh = account.tokenExpiresAt && new Date() > account.tokenExpiresAt;
          const canRefresh = account.refreshToken && ['linkedin', 'x', 'google_business'].includes(platform);
          
          if (needsRefresh && canRefresh) {
            console.log(`[ContentPublisher] Access token expired for ${platform}, refreshing...`);
            
            try {
              const tempAdapter = PlatformFactory.createAdapter(platform as SupportedPlatform, credentials);
              const refreshedCreds = await tempAdapter.refreshAccessToken();
              
              await db
                .update(socialMediaAccounts)
                .set({
                  accessToken: refreshedCreds.accessToken,
                  refreshToken: refreshedCreds.refreshToken || account.refreshToken,
                  tokenExpiresAt: refreshedCreds.expiresAt || null,
                })
                .where(eq(socialMediaAccounts.id, account.id));
              
              credentials = {
                ...credentials,
                accessToken: refreshedCreds.accessToken,
                refreshToken: refreshedCreds.refreshToken || credentials.refreshToken,
                expiresAt: refreshedCreds.expiresAt,
              };
              
              console.log(`[ContentPublisher] Token refreshed for ${platform}`);
            } catch (refreshError: any) {
              console.error(`[ContentPublisher] Failed to refresh token for ${platform}:`, refreshError);
              throw new Error(`Token expired and refresh failed: ${refreshError.message}`);
            }
          } else if (needsRefresh && !canRefresh) {
            console.warn(`[ContentPublisher] ${platform} token appears expired but uses long-lived tokens. Attempting publish anyway.`);
          }
          
          // Create platform adapter
          const adapter = PlatformFactory.createAdapter(platform as SupportedPlatform, credentials);
          
          // Check platform capabilities
          const capabilities = adapter.getCapabilities();
          
          const hasVideo = post.mediaUrls?.some(url => url.includes('.mp4') || url.includes('video')) || false;
          if (hasVideo && !capabilities.supportsVideo) {
            throw new Error(`${platform} does not support video posts`);
          }
          
          const mediaCount = post.mediaUrls?.length || 0;
          if (mediaCount > capabilities.maxMediaCount) {
            throw new Error(`${platform} supports maximum ${capabilities.maxMediaCount} media items, but ${mediaCount} were provided`);
          }
          
          let scheduledTime = post.scheduledFor || undefined;
          if (post.scheduledFor && !capabilities.supportsScheduling) {
            console.warn(`[ContentPublisher] ${platform} does not support scheduling. Publishing immediately instead.`);
            scheduledTime = undefined;
          }
          
          // Publish the post
          const result = await adapter.publish({
            text: post.content,
            mediaUrls: post.mediaUrls || undefined,
            scheduledTime,
            hashtags: post.aiHashtags || undefined,
          });
          
          if (result.success) {
            publishResults[platform] = {
              platformPostId: result.platformPostId,
              url: result.platformUrl,
              publishedAt: result.publishedAt?.toISOString() || new Date().toISOString(),
            };
          } else {
            throw new Error(result.error || 'Unknown error');
          }
          
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
