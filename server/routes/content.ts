/**
 * Content Management API Routes
 * Handles posts, media, platforms, scheduling, analytics, and AI assistance
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../db';
import {
  contentPosts,
  contentMedia,
  socialMediaAccounts,
  contentAnalytics,
  contentTemplates,
  clients,
  subscriptions,
  subscriptionAddons,
  subscriptionAddonSelections,
  insertContentPostSchema,
  insertContentMediaSchema,
  insertSocialMediaAccountSchema,
} from '@shared/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { MediaStorageService } from '../services/mediaStorage';
import { synupSyncService } from '../services/content/synupSync';
import { publishPost } from '../workers/contentPublisher';
import { PlatformFactory } from '../services/platforms/platformFactory';

const router = Router();
const mediaStorage = new MediaStorageService();

/**
 * Middleware: Check if client has Content Management access
 */
async function requireContentAccess(req: Request, res: Response, next: Function) {
  const clientId = parseInt(req.params.clientId || req.body.clientId);
  
  if (!clientId) {
    return res.status(400).json({ message: 'Client ID is required' });
  }

  try {
    const hasAccess = await db
      .select({ id: subscriptionAddonSelections.id })
      .from(subscriptionAddonSelections)
      .innerJoin(
        subscriptions,
        eq(subscriptionAddonSelections.subscriptionId, subscriptions.id)
      )
      .innerJoin(
        subscriptionAddons,
        eq(subscriptionAddonSelections.addonId, subscriptionAddons.id)
      )
      .where(
        and(
          eq(subscriptions.clientId, clientId),
          sql`${subscriptionAddons.name} LIKE '%Content Management%'`
        )
      )
      .limit(1);

    if (hasAccess.length === 0) {
      return res.status(403).json({ 
        message: 'Content Management not available. Please upgrade your subscription.' 
      });
    }

    next();
  } catch (error) {
    console.error('[ContentAccess] Error checking access:', error);
    return res.status(500).json({ message: 'Failed to verify access' });
  }
}

/**
 * Get platform limits for client's subscription tier
 */
async function getPlatformLimits(clientId: number): Promise<{ maxPlatforms: number; tier: 'diy' | 'msp' }> {
  const [subscription] = await db
    .select({ addonName: subscriptionAddons.name })
    .from(subscriptionAddonSelections)
    .innerJoin(subscriptions, eq(subscriptionAddonSelections.subscriptionId, subscriptions.id))
    .innerJoin(subscriptionAddons, eq(subscriptionAddonSelections.addonId, subscriptionAddons.id))
    .where(
      and(
        eq(subscriptions.clientId, clientId),
        sql`${subscriptionAddons.name} LIKE '%Content Management%'`
      )
    )
    .limit(1);

  const isMSP = subscription?.addonName?.includes('MSP') || false;
  
  return {
    maxPlatforms: isMSP ? 7 : 3,
    tier: isMSP ? 'msp' : 'diy',
  };
}

// ===== POSTS ROUTES =====

/**
 * GET /api/content/:clientId/posts
 * List all posts for a client
 */
router.get('/:clientId/posts', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const status = req.query.status as string | undefined;

    const posts = status
      ? await db
          .select()
          .from(contentPosts)
          .where(and(
            eq(contentPosts.clientId, clientId),
            eq(contentPosts.status, status as any)
          ))
          .orderBy(desc(contentPosts.createdAt))
      : await db
          .select()
          .from(contentPosts)
          .where(eq(contentPosts.clientId, clientId))
          .orderBy(desc(contentPosts.createdAt));

    res.json(posts);
  } catch (error) {
    console.error('[Content] Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

/**
 * GET /api/content/:clientId/posts/:postId
 * Get a single post
 */
router.get('/:clientId/posts/:postId', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);

    const [post] = await db
      .select()
      .from(contentPosts)
      .where(and(
        eq(contentPosts.id, postId),
        eq(contentPosts.clientId, clientId)
      ));

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('[Content] Error fetching post:', error);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
});

/**
 * POST /api/content/:clientId/posts
 * Create a new post
 */
router.post('/:clientId/posts', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);

    const postSchema = z.object({
      caption: z.string(),
      platforms: z.array(z.string()),
      hashtags: z.array(z.string()).optional(),
      mediaIds: z.array(z.number()).optional(),
      scheduledFor: z.coerce.date().refine(date => !isNaN(date.getTime()) && date > new Date(), {
        message: 'scheduledFor must be a valid future date'
      }).optional(),
      platformCustomizations: z.any().optional(),
      timezone: z.string().optional(),
      status: z.string().optional(),
      isAIGenerated: z.boolean().optional(),
      aiPrompt: z.string().optional(),
      contentScore: z.number().optional(),
      templateId: z.number().optional(),
    });

    const validatedBody = postSchema.parse(req.body);
    
    const [post] = await db
      .insert(contentPosts)
      .values({
        ...validatedBody as any,
        clientId,
      })
      .returning();

    // Trigger outbound sync to Synup for MSP clients
    synupSyncService.pushPostToSynup(post.id).catch(err => {
      console.error('[Content] Sync to Synup failed (post creation):', err);
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('[Content] Error creating post:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to create post' });
  }
});

/**
 * PUT /api/content/:clientId/posts/:postId
 * Update a post
 */
router.put('/:clientId/posts/:postId', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);

    const updateSchema = z.object({
      caption: z.string().optional(),
      platforms: z.array(z.string()).optional(),
      hashtags: z.array(z.string()).optional(),
      mediaIds: z.array(z.number()).optional(),
      scheduledFor: z.coerce.date().refine(date => !isNaN(date.getTime()) && date > new Date(), {
        message: 'scheduledFor must be a valid future date'
      }).optional(),
      platformCustomizations: z.any().optional(),
      timezone: z.string().optional(),
      status: z.string().optional(),
      isAIGenerated: z.boolean().optional(),
      aiPrompt: z.string().optional(),
      contentScore: z.number().optional(),
      templateId: z.number().optional(),
    });

    const data = updateSchema.parse(req.body);

    const [post] = await db
      .update(contentPosts)
      .set(data as any)
      .where(and(
        eq(contentPosts.id, postId),
        eq(contentPosts.clientId, clientId)
      ))
      .returning();

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Trigger outbound sync to Synup for MSP clients
    synupSyncService.pushPostToSynup(post.id).catch(err => {
      console.error('[Content] Sync to Synup failed (post update):', err);
    });

    res.json(post);
  } catch (error) {
    console.error('[Content] Error updating post:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to update post' });
  }
});

/**
 * DELETE /api/content/:clientId/posts/:postId
 * Delete a post
 */
router.delete('/:clientId/posts/:postId', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);

    const [deleted] = await db
      .delete(contentPosts)
      .where(and(
        eq(contentPosts.id, postId),
        eq(contentPosts.clientId, clientId)
      ))
      .returning();

    if (!deleted) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('[Content] Error deleting post:', error);
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

/**
 * POST /api/content/:clientId/posts/:postId/publish
 * Publish a post immediately or schedule it
 */
router.post('/:clientId/posts/:postId/publish', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);

    const [post] = await db
      .select()
      .from(contentPosts)
      .where(and(
        eq(contentPosts.id, postId),
        eq(contentPosts.clientId, clientId)
      ));

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.status === 'published') {
      return res.status(400).json({ message: 'Post is already published' });
    }

    const isScheduled = post.scheduledFor && new Date(post.scheduledFor) > new Date();

    if (isScheduled) {
      // Database scheduler will automatically pick up scheduled posts
      await db
        .update(contentPosts)
        .set({ status: 'scheduled' })
        .where(eq(contentPosts.id, postId));

      // Trigger outbound sync to Synup for MSP clients
      synupSyncService.pushPostToSynup(postId).catch(err => {
        console.error('[Content] Sync to Synup failed (post scheduled):', err);
      });

      res.json({ 
        message: 'Post scheduled successfully',
        scheduledFor: post.scheduledFor,
      });
    } else {
      // Publish immediately using publishPost function
      const [updatedPost] = await db
        .update(contentPosts)
        .set({ status: 'publishing', attempts: 0 })
        .where(eq(contentPosts.id, postId))
        .returning();

      // Publish in background - don't await to return quickly to user
      publishPost(updatedPost).catch(async (err) => {
        console.error('[Content] Background publish failed:', err);
        // Update post with error details so user can see what went wrong
        await db
          .update(contentPosts)
          .set({
            status: 'failed',
            lastError: err.message || 'Unknown error during publishing',
            attempts: 1,
            lockedAt: null, // Release lock
          })
          .where(eq(contentPosts.id, postId));
      });

      res.json({ message: 'Post is being published' });
    }
  } catch (error) {
    console.error('[Content] Error publishing post:', error);
    res.status(500).json({ message: 'Failed to publish post' });
  }
});

// ===== SCHEDULING ROUTES =====

/**
 * GET /api/content/:clientId/schedule
 * Get all scheduled posts
 */
router.get('/:clientId/schedule', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);

    const scheduledPosts = await db
      .select()
      .from(contentPosts)
      .where(and(
        eq(contentPosts.clientId, clientId),
        eq(contentPosts.status, 'scheduled')
      ))
      .orderBy(contentPosts.scheduledFor);

    res.json(scheduledPosts);
  } catch (error) {
    console.error('[Content] Error fetching scheduled posts:', error);
    res.status(500).json({ message: 'Failed to fetch scheduled posts' });
  }
});

/**
 * PUT /api/content/:clientId/schedule/:postId
 * Update schedule time for a post
 */
router.put('/:clientId/schedule/:postId', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);

    const scheduleSchema = z.object({
      scheduledFor: z.coerce.date().refine(date => !isNaN(date.getTime()) && date > new Date(), {
        message: 'scheduledFor must be a valid future date'
      }),
    });

    const { scheduledFor: newScheduleDate } = scheduleSchema.parse(req.body);

    const [existingPost] = await db
      .select()
      .from(contentPosts)
      .where(and(
        eq(contentPosts.id, postId),
        eq(contentPosts.clientId, clientId)
      ));

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Database scheduler will automatically pick up the new schedule time
    const [post] = await db
      .update(contentPosts)
      .set({ 
        scheduledFor: newScheduleDate,
        status: 'scheduled',
        // Reset scheduler state to allow rescheduling
        lockedAt: null,
        attempts: 0,
        nextRetryAt: null,
      })
      .where(and(
        eq(contentPosts.id, postId),
        eq(contentPosts.clientId, clientId)
      ))
      .returning();

    res.json({ 
      message: 'Schedule updated successfully',
      post,
    });
  } catch (error) {
    console.error('[Content] Error updating schedule:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to update schedule' });
  }
});

/**
 * DELETE /api/content/:clientId/schedule/:postId
 * Cancel a scheduled post
 */
router.delete('/:clientId/schedule/:postId', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const postId = parseInt(req.params.postId);

    const [existingPost] = await db
      .select()
      .from(contentPosts)
      .where(and(
        eq(contentPosts.id, postId),
        eq(contentPosts.clientId, clientId),
        eq(contentPosts.status, 'scheduled')
      ));

    if (!existingPost) {
      return res.status(404).json({ message: 'Scheduled post not found' });
    }

    // Cancel schedule by setting status to draft and clearing scheduledFor
    // Database scheduler will ignore posts without scheduledFor or with draft status
    const [post] = await db
      .update(contentPosts)
      .set({ 
        status: 'draft',
        scheduledFor: null,
        // Reset scheduler state
        lockedAt: null,
        attempts: 0,
        nextRetryAt: null,
      })
      .where(and(
        eq(contentPosts.id, postId),
        eq(contentPosts.clientId, clientId)
      ))
      .returning();

    res.json({ 
      message: 'Schedule cancelled successfully',
      post,
    });
  } catch (error) {
    console.error('[Content] Error cancelling schedule:', error);
    res.status(500).json({ message: 'Failed to cancel schedule' });
  }
});

// ===== MEDIA ROUTES =====

/**
 * GET /api/content/:clientId/media
 * List all media for a client
 */
router.get('/:clientId/media', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const folder = req.query.folder as string | undefined;

    const media = folder
      ? await db
          .select()
          .from(contentMedia)
          .where(and(
            eq(contentMedia.clientId, clientId),
            eq(contentMedia.folder, folder)
          ))
          .orderBy(desc(contentMedia.createdAt))
      : await db
          .select()
          .from(contentMedia)
          .where(eq(contentMedia.clientId, clientId))
          .orderBy(desc(contentMedia.createdAt));

    res.json(media);
  } catch (error) {
    console.error('[Content] Error fetching media:', error);
    res.status(500).json({ message: 'Failed to fetch media' });
  }
});

/**
 * POST /api/content/:clientId/media
 * Upload media file
 */
router.post('/:clientId/media', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);

    const { fileData, fileName, mimeType, folder, altText, tags } = req.body;

    if (!fileData || !fileName || !mimeType) {
      return res.status(400).json({ message: 'fileData, fileName, and mimeType are required' });
    }

    const fileBuffer = Buffer.from(fileData, 'base64');

    const media = await mediaStorage.uploadMedia({
      clientId,
      file: fileBuffer,
      fileName,
      mimeType,
      folder,
      altText,
      tags,
    });

    res.status(201).json(media);
  } catch (error) {
    console.error('[Content] Error uploading media:', error);
    res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to upload media' });
  }
});

/**
 * DELETE /api/content/:clientId/media/:mediaId
 * Delete media
 */
router.delete('/:clientId/media/:mediaId', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const mediaId = parseInt(req.params.mediaId);

    const success = await mediaStorage.deleteMedia(mediaId, clientId);

    if (!success) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('[Content] Error deleting media:', error);
    res.status(500).json({ message: 'Failed to delete media' });
  }
});

// ===== PLATFORM ACCOUNTS ROUTES =====

/**
 * GET /api/content/:clientId/platforms
 * List connected social media accounts
 */
router.get('/:clientId/platforms', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);

    const accounts = await db
      .select()
      .from(socialMediaAccounts)
      .where(eq(socialMediaAccounts.clientId, clientId))
      .orderBy(socialMediaAccounts.platform);

    const limits = await getPlatformLimits(clientId);

    res.json({
      accounts,
      limits,
      available: limits.maxPlatforms - accounts.length,
    });
  } catch (error) {
    console.error('[Content] Error fetching platforms:', error);
    res.status(500).json({ message: 'Failed to fetch platforms' });
  }
});

/**
 * POST /api/content/:clientId/platforms
 * Connect a new social media account
 */
router.post('/:clientId/platforms', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);

    const limits = await getPlatformLimits(clientId);
    const currentAccounts = await db
      .select()
      .from(socialMediaAccounts)
      .where(eq(socialMediaAccounts.clientId, clientId));

    if (currentAccounts.length >= limits.maxPlatforms) {
      return res.status(400).json({ 
        message: `Platform limit reached. Your ${limits.tier.toUpperCase()} tier supports ${limits.maxPlatforms} platforms.` 
      });
    }

    const accountSchema = z.object({
      platform: z.string(),
      platformAccountId: z.string(),
      accessToken: z.string(),
      refreshToken: z.string().optional(),
      tokenExpiresAt: z.string().transform(str => new Date(str)).optional(),
      platformAccountName: z.string().optional(),
      platformAccountHandle: z.string().optional(),
      platformAccountAvatar: z.string().optional(),
      accountType: z.string().optional(),
      permissions: z.array(z.string()).optional(),
      metadata: z.any().optional(),
      isActive: z.boolean().optional(),
    });

    const validatedBody = accountSchema.parse(req.body);

    const isValid = await PlatformFactory.validateCredentials(validatedBody.platform as any, {
      accessToken: validatedBody.accessToken,
      refreshToken: validatedBody.refreshToken,
      expiresAt: validatedBody.tokenExpiresAt,
      platformAccountId: validatedBody.platformAccountId,
    });

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid platform credentials' });
    }

    const [account] = await db
      .insert(socialMediaAccounts)
      .values({
        ...validatedBody as any,
        clientId,
      })
      .returning();

    res.status(201).json(account);
  } catch (error) {
    console.error('[Content] Error connecting platform:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to connect platform' });
  }
});

/**
 * DELETE /api/content/:clientId/platforms/:accountId
 * Disconnect a social media account
 */
router.delete('/:clientId/platforms/:accountId', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const accountId = parseInt(req.params.accountId);

    const [deleted] = await db
      .delete(socialMediaAccounts)
      .where(and(
        eq(socialMediaAccounts.id, accountId),
        eq(socialMediaAccounts.clientId, clientId)
      ))
      .returning();

    if (!deleted) {
      return res.status(404).json({ message: 'Platform account not found' });
    }

    res.json({ message: 'Platform disconnected successfully' });
  } catch (error) {
    console.error('[Content] Error disconnecting platform:', error);
    res.status(500).json({ message: 'Failed to disconnect platform' });
  }
});

// ===== ANALYTICS ROUTES =====

/**
 * GET /api/content/:clientId/analytics
 * Get analytics summary
 */
router.get('/:clientId/analytics', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);

    const posts = await db
      .select()
      .from(contentPosts)
      .where(eq(contentPosts.clientId, clientId));

    const postIds = posts.map(p => p.id);
    
    const analytics = postIds.length > 0
      ? await db
          .select()
          .from(contentAnalytics)
          .where(sql`${contentAnalytics.postId} IN (${sql.join(postIds.map(id => sql`${id}`), sql`, `)})`)
          .orderBy(desc(contentAnalytics.lastSyncedAt))
      : [];

    const summary = {
      totalPosts: posts.length,
      publishedPosts: posts.filter(p => p.status === 'published').length,
      scheduledPosts: posts.filter(p => p.status === 'scheduled').length,
      draftPosts: posts.filter(p => p.status === 'draft').length,
      analytics,
    };

    res.json(summary);
  } catch (error) {
    console.error('[Content] Error fetching analytics:', error);
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
});

// ===== SYNUP SYNC ROUTES =====

/**
 * POST /api/content/:clientId/sync/synup/push/:postId
 * Manually push a post to Synup (admin/support)
 */
router.post('/:clientId/sync/synup/push/:postId', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId);
    const result = await synupSyncService.pushPostToSynup(postId);

    if (result) {
      res.json({ success: true, message: 'Post synced to Synup successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to sync post to Synup' });
    }
  } catch (error) {
    console.error('[Content] Error pushing to Synup:', error);
    res.status(500).json({ success: false, message: 'Failed to sync post' });
  }
});

/**
 * POST /api/content/sync/synup/webhook
 * Webhook endpoint to receive updates from Synup
 */
router.post('/sync/synup/webhook', async (req: Request, res: Response) => {
  try {
    const signature = req.headers['x-synup-signature'] as string;
    const rawBody = JSON.stringify(req.body);

    // Verify signature
    if (!signature || !synupSyncService.verifyWebhookSignature(rawBody, signature)) {
      console.error('[Content] Invalid Synup webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Apply update
    const result = await synupSyncService.applySynupUpdate(req.body);

    if (result) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, message: 'Failed to apply update' });
    }
  } catch (error) {
    console.error('[Content] Error processing Synup webhook:', error);
    res.status(500).json({ success: false, message: 'Internal error' });
  }
});

// ===== AI ASSISTANCE ROUTES =====

/**
 * POST /api/content/:clientId/ai/caption
 * Generate AI caption for a post
 */
router.post('/:clientId/ai/caption', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const { topic, tone, length } = req.body;

    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }

    res.json({
      caption: `AI-generated caption about ${topic} (${tone || 'professional'} tone, ${length || 'medium'} length)`,
      hashtags: ['#business', '#marketing', '#social'],
    });
  } catch (error) {
    console.error('[Content] Error generating caption:', error);
    res.status(500).json({ message: 'Failed to generate caption' });
  }
});

/**
 * POST /api/content/:clientId/ai/hashtags
 * Generate relevant hashtags
 */
router.post('/:clientId/ai/hashtags', requireContentAccess, async (req: Request, res: Response) => {
  try {
    const { content, platform } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    res.json({
      hashtags: ['#business', '#marketing', '#socialmedia', '#contentcreation'],
    });
  } catch (error) {
    console.error('[Content] Error generating hashtags:', error);
    res.status(500).json({ message: 'Failed to generate hashtags' });
  }
});

export default router;
