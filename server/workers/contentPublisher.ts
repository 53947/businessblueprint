import { db } from '../db';
import { contentPosts, socialMediaAccounts } from '@shared/schema';
import { eq, and } from 'drizzle-orm';
import { PlatformFactory, SupportedPlatform } from '../services/platforms/platformFactory';

// Standalone publish function that can be called by scheduler
export async function publishPost(post: typeof contentPosts.$inferSelect) {
  const { id: postId, clientId, platforms } = post;
  
  if (!platforms || platforms.length === 0) {
    throw new Error('No platforms specified for publishing');
  }
  
  console.log(`[ContentPublisher] Publishing post ${postId} for client ${clientId}`);
  
  const publishResults: Record<string, any> = {};
  const publishErrors: Record<string, any> = {};
  
  // Publish to each platform
  for (const platform of platforms) {
    try {
      console.log(`[ContentPublisher] Publishing to ${platform} - Post ${postId}`);
      
      // Get platform account credentials
      const [account] = await db
        .select()
        .from(socialMediaAccounts)
        .where(
          and(
            eq(socialMediaAccounts.clientId, clientId),
            eq(socialMediaAccounts.platform, platform)
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
      
      // Get media URLs from media IDs
      let mediaUrls: string[] = [];
      if (post.mediaIds && post.mediaIds.length > 0) {
        const { contentMedia } = await import('@shared/schema');
        const media = await db
          .select()
          .from(contentMedia)
          .where(eq(contentMedia.id, post.mediaIds[0])); // TODO: Handle multiple media
        mediaUrls = media.map(m => m.storageUrl).filter(Boolean) as string[];
      }
      
      const hasVideo = mediaUrls.some(url => url.includes('.mp4') || url.includes('video'));
      if (hasVideo && !capabilities.supportsVideo) {
        throw new Error(`${platform} does not support video posts`);
      }
      
      const mediaCount = mediaUrls.length;
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
        text: post.caption,
        mediaUrls: mediaUrls.length > 0 ? mediaUrls : undefined,
        scheduledTime,
        hashtags: post.hashtags || undefined,
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
  
  // Check results
  const hasErrors = Object.keys(publishErrors).length > 0;
  const allFailed = Object.keys(publishResults).length === 0;
  
  if (allFailed) {
    throw new Error(`Publishing failed on all platforms: ${JSON.stringify(publishErrors)}`);
  }
  
  console.log(`[ContentPublisher] Post ${postId} publishing complete. Results:`, {
    published: Object.keys(publishResults),
    failed: Object.keys(publishErrors),
  });
  
  // Update post with results (let scheduler handle status)
  await db
    .update(contentPosts)
    .set({
      publishResults,
      publishErrors: hasErrors ? publishErrors : null,
    })
    .where(eq(contentPosts.id, postId));
  
  return {
    postId,
    success: !allFailed,
    publishedTo: Object.keys(publishResults),
    failedOn: Object.keys(publishErrors),
  };
}

console.log('[ContentPublisher] Database-backed publisher initialized');
