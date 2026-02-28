/**
 * Analytics Sync Service
 *
 * Fetches post-level analytics from connected social platforms
 * (Facebook, Instagram, X, LinkedIn, Google Business) and upserts
 * the results into the content_analytics table.
 */

import { db } from "../db";
import { contentAnalytics, contentPosts, socialMediaAccounts, clients } from "@shared/schema";
import { eq, and, desc, isNotNull } from "drizzle-orm";
import { PlatformFactory } from "./platforms/platformFactory";
import type { PlatformAnalytics } from "./platforms/basePlatformAdapter";

interface AnalyticsSyncResult {
  synced: number;
  errors: { postId: number; platform: string; message: string }[];
}

class AnalyticsSyncService {
  /**
   * Sync analytics for all published posts belonging to a client
   */
  async syncClientAnalytics(clientId: number): Promise<AnalyticsSyncResult> {
    const result: AnalyticsSyncResult = { synced: 0, errors: [] };

    // Get all published posts for this client
    const posts = await db
      .select()
      .from(contentPosts)
      .where(
        and(
          eq(contentPosts.clientId, clientId),
          eq(contentPosts.status, "published"),
        ),
      )
      .orderBy(desc(contentPosts.publishedAt));

    // Load all connected social accounts for credential lookup
    const accounts = await db
      .select()
      .from(socialMediaAccounts)
      .where(
        and(
          eq(socialMediaAccounts.clientId, clientId),
          eq(socialMediaAccounts.isActive, true),
        ),
      );

    // Build credential map by platform
    const credentialMap = new Map<string, { accessToken: string; refreshToken?: string; platformAccountId: string }>();
    for (const account of accounts) {
      credentialMap.set(account.platform, {
        accessToken: account.accessToken || "",
        refreshToken: account.refreshToken || undefined,
        platformAccountId: account.platformAccountId,
      });
    }

    for (const post of posts) {
      // Parse publish results to find platform post IDs
      const publishResults = (post.publishResults as any) || {};

      for (const [platform, platformResult] of Object.entries(publishResults)) {
        const pr = platformResult as any;
        if (!pr?.postId) continue;

        try {
          // Get credentials from connected accounts
          const creds = credentialMap.get(platform);
          if (!creds?.accessToken) continue;

          // Get the platform adapter
          const adapter = PlatformFactory.createAdapter(platform as any, {
            accessToken: creds.accessToken,
            refreshToken: creds.refreshToken,
            platformAccountId: creds.platformAccountId,
          });
          if (!adapter) continue;

          // Fetch analytics from the platform
          const analytics: PlatformAnalytics = await adapter.getAnalytics(
            pr.postId,
          );

          // Calculate engagement rate
          const totalEngagement =
            (analytics.likes || 0) +
            (analytics.comments || 0) +
            (analytics.shares || 0) +
            (analytics.clicks || 0);
          const engagementRate =
            analytics.impressions && analytics.impressions > 0
              ? ((totalEngagement / analytics.impressions) * 100).toFixed(2)
              : "0.00";

          // Upsert into content_analytics
          const existing = await db
            .select()
            .from(contentAnalytics)
            .where(
              and(
                eq(contentAnalytics.postId, post.id),
                eq(contentAnalytics.platform, platform),
              ),
            )
            .limit(1);

          if (existing.length > 0) {
            await db
              .update(contentAnalytics)
              .set({
                impressions: analytics.impressions || 0,
                reach: analytics.engagement || 0,
                likes: analytics.likes || 0,
                comments: analytics.comments || 0,
                shares: analytics.shares || 0,
                clicks: analytics.clicks || 0,
                saves: analytics.saves || 0,
                engagementRate,
                lastSyncedAt: new Date(),
                updatedAt: new Date(),
              })
              .where(eq(contentAnalytics.id, existing[0].id));
          } else {
            await db.insert(contentAnalytics).values({
              postId: post.id,
              platform,
              platformPostId: pr.postId,
              platformPostUrl: pr.url || null,
              impressions: analytics.impressions || 0,
              reach: analytics.engagement || 0,
              likes: analytics.likes || 0,
              comments: analytics.comments || 0,
              shares: analytics.shares || 0,
              clicks: analytics.clicks || 0,
              saves: analytics.saves || 0,
              engagementRate,
            });
          }

          result.synced++;
        } catch (error: any) {
          result.errors.push({
            postId: post.id,
            platform,
            message: error.message,
          });
        }
      }
    }

    return result;
  }

  /**
   * Get aggregated analytics for a client across all platforms
   */
  async getClientAnalyticsSummary(clientId: number) {
    // Get all posts for client
    const posts = await db
      .select()
      .from(contentPosts)
      .where(eq(contentPosts.clientId, clientId));

    const postIds = posts.map((p) => p.id);
    if (postIds.length === 0) {
      return {
        totalPosts: 0,
        publishedPosts: 0,
        totalImpressions: 0,
        totalEngagement: 0,
        totalClicks: 0,
        avgEngagementRate: 0,
        platformBreakdown: {},
        topPosts: [],
      };
    }

    // Get all analytics records for these posts
    const allAnalytics = await db
      .select()
      .from(contentAnalytics)
      .where(
        eq(contentAnalytics.postId, postIds[0]), // Start with first
      );

    // For multiple posts, we need to query each
    const analyticsMap = new Map<number, any[]>();
    for (const postId of postIds) {
      const records = await db
        .select()
        .from(contentAnalytics)
        .where(eq(contentAnalytics.postId, postId));
      if (records.length > 0) {
        analyticsMap.set(postId, records);
      }
    }

    // Aggregate across all analytics records
    let totalImpressions = 0;
    let totalLikes = 0;
    let totalComments = 0;
    let totalShares = 0;
    let totalClicks = 0;
    const platformTotals: Record<
      string,
      { impressions: number; engagement: number; posts: number }
    > = {};

    const allRecords: any[] = [];
    for (const records of Array.from(analyticsMap.values())) {
      for (const r of records) {
        allRecords.push(r);
        totalImpressions += r.impressions || 0;
        totalLikes += r.likes || 0;
        totalComments += r.comments || 0;
        totalShares += r.shares || 0;
        totalClicks += r.clicks || 0;

        if (!platformTotals[r.platform]) {
          platformTotals[r.platform] = {
            impressions: 0,
            engagement: 0,
            posts: 0,
          };
        }
        platformTotals[r.platform].impressions += r.impressions || 0;
        platformTotals[r.platform].engagement +=
          (r.likes || 0) + (r.comments || 0) + (r.shares || 0);
        platformTotals[r.platform].posts++;
      }
    }

    const totalEngagement = totalLikes + totalComments + totalShares;
    const avgEngagementRate =
      totalImpressions > 0
        ? parseFloat(
            ((totalEngagement / totalImpressions) * 100).toFixed(2),
          )
        : 0;

    // Top posts by engagement
    const postEngagement = new Map<number, number>();
    for (const r of allRecords) {
      const current = postEngagement.get(r.postId) || 0;
      postEngagement.set(
        r.postId,
        current + (r.likes || 0) + (r.comments || 0) + (r.shares || 0),
      );
    }

    const topPostIds = Array.from(postEngagement.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id]) => id);

    const topPosts = posts
      .filter((p) => topPostIds.includes(p.id))
      .map((p) => ({
        id: p.id,
        caption: p.caption,
        platform: (p.platforms as string[]) || [],
        publishedAt: p.publishedAt,
        engagement: postEngagement.get(p.id) || 0,
      }));

    return {
      totalPosts: posts.length,
      publishedPosts: posts.filter((p) => p.status === "published").length,
      totalImpressions,
      totalEngagement,
      totalClicks,
      avgEngagementRate,
      platformBreakdown: platformTotals,
      topPosts,
    };
  }

  /**
   * Sync analytics for all clients with connected platforms
   * Designed to be called periodically (e.g., every 6 hours)
   */
  async syncAllClients(): Promise<{ total: number; synced: number; errors: number }> {
    const summary = { total: 0, synced: 0, errors: 0 };

    try {
      // Find all clients with active social media accounts
      const activeAccounts = await db
        .select({ clientId: socialMediaAccounts.clientId })
        .from(socialMediaAccounts)
        .where(eq(socialMediaAccounts.isActive, true))
        .groupBy(socialMediaAccounts.clientId);

      summary.total = activeAccounts.length;

      for (const { clientId } of activeAccounts) {
        if (!clientId) continue;

        try {
          const result = await this.syncClientAnalytics(clientId);
          summary.synced += result.synced;
          summary.errors += result.errors.length;
        } catch (error: any) {
          console.error(`Analytics sync failed for client ${clientId}:`, error.message);
          summary.errors++;
        }
      }

      console.log(
        `Analytics sync complete: ${summary.total} clients, ${summary.synced} posts synced, ${summary.errors} errors`,
      );
    } catch (error) {
      console.error("Analytics sync all failed:", error);
    }

    return summary;
  }

  /**
   * Start periodic analytics sync (every 6 hours)
   */
  private syncInterval: ReturnType<typeof setInterval> | null = null;

  startScheduledSync(intervalMs: number = 6 * 60 * 60 * 1000) {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }

    console.log(`Starting analytics sync scheduler (every ${intervalMs / 3600000}h)`);

    this.syncInterval = setInterval(async () => {
      try {
        await this.syncAllClients();
      } catch (error) {
        console.error("Scheduled analytics sync error:", error);
      }
    }, intervalMs);

    // Run initial sync after 30 seconds (let server fully start)
    setTimeout(() => this.syncAllClients().catch(console.error), 30_000);
  }

  stopScheduledSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }
}

export const analyticsSyncService = new AnalyticsSyncService();
