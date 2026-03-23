/**
 * /amplify - Paid Advertising Management API Routes
 * Multi-platform ad management: Meta, Google, Microsoft, Reddit
 * All routes protected with isAuthenticated middleware
 */

import { Router } from "express";
import { db } from "../db";
import { isAuthenticated } from "../replitAuth";
import {
  adAccountConnections,
  amplifyCampaigns,
  amplifyAudiences,
  amplifyBudgetAllocations,
  redditAdComments,
} from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";

const router = Router();

// Helper to extract user ID from session/user
function getUserId(req: any): string | null {
  return (
    req.session?.userId ||
    req.user?.claims?.sub ||
    null
  );
}

// =============================================
// OVERVIEW / DASHBOARD
// =============================================

/** GET /api/amplify/overview — dashboard summary */
router.get("/api/amplify/overview", isAuthenticated, async (req, res) => {
  try {
    const userId = getUserId(req);

    // Connected accounts count
    const accountsResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(adAccountConnections)
      .where(eq(adAccountConnections.status, "active"));

    // Active campaigns count
    const activeCampaignsResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(amplifyCampaigns)
      .where(eq(amplifyCampaigns.status, "active"));

    // Total spend this month
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const spendResult = await db
      .select({ total: sql<string>`coalesce(sum(spend_to_date::numeric), 0)::text` })
      .from(amplifyCampaigns)
      .where(
        and(
          eq(amplifyCampaigns.status, "active"),
          sql`${amplifyCampaigns.createdAt} >= ${monthStart}`
        )
      );

    // Top performing campaign (by ROAS)
    const topCampaign = await db
      .select()
      .from(amplifyCampaigns)
      .where(eq(amplifyCampaigns.status, "active"))
      .orderBy(desc(amplifyCampaigns.roas))
      .limit(1);

    res.json({
      success: true,
      data: {
        connectedAccounts: accountsResult[0]?.count || 0,
        activeCampaigns: activeCampaignsResult[0]?.count || 0,
        totalSpendThisMonth: spendResult[0]?.total || "0",
        topPerformingCampaign: topCampaign[0] || null,
      },
    });
  } catch (error: any) {
    console.error("[Amplify] Overview error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch overview" });
  }
});

// =============================================
// AD ACCOUNTS
// =============================================

/** GET /api/amplify/accounts — list connected ad accounts */
router.get("/api/amplify/accounts", isAuthenticated, async (req, res) => {
  try {
    const accounts = await db
      .select()
      .from(adAccountConnections)
      .where(eq(adAccountConnections.status, "active"))
      .orderBy(desc(adAccountConnections.createdAt));

    res.json({ success: true, accounts });
  } catch (error: any) {
    console.error("[Amplify] List accounts error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch accounts" });
  }
});

/** POST /api/amplify/accounts/connect — initiate OAuth for a platform (stub) */
router.post("/api/amplify/accounts/connect", isAuthenticated, async (req, res) => {
  try {
    const { platform } = req.body;

    if (!platform) {
      return res.status(400).json({ success: false, message: "Platform is required" });
    }

    const platformLower = platform.toLowerCase();

    // OAuth URL stubs per platform
    const oauthUrls: Record<string, string> = {
      meta: "https://www.facebook.com/v18.0/dialog/oauth?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=ads_management,ads_read",
      google: "https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=https://www.googleapis.com/auth/adwords",
      microsoft: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=https://ads.microsoft.com/ads.manage",
      reddit: "https://www.reddit.com/api/v1/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=adsread,adsconversions",
    };

    const oauthUrl = oauthUrls[platformLower];
    if (!oauthUrl) {
      return res.status(400).json({
        success: false,
        message: `Unsupported platform: ${platform}. Supported: meta, google, microsoft, reddit`,
      });
    }

    console.log(`[Amplify] OAuth flow initiated for platform: ${platformLower} (stub — actual OAuth not yet implemented)`);

    res.json({
      success: true,
      oauthUrl,
      message: `OAuth stub for ${platformLower}. In production, redirect the user to this URL to connect their ad account.`,
    });
  } catch (error: any) {
    console.error("[Amplify] Connect account error:", error);
    res.status(500).json({ success: false, message: "Failed to initiate connection" });
  }
});

/** DELETE /api/amplify/accounts/:id — disconnect an ad account */
router.delete("/api/amplify/accounts/:id", isAuthenticated, async (req, res) => {
  try {
    const accountId = parseInt(req.params.id);
    if (isNaN(accountId)) {
      return res.status(400).json({ success: false, message: "Invalid account ID" });
    }

    const [updated] = await db
      .update(adAccountConnections)
      .set({ status: "disconnected", updatedAt: new Date() })
      .where(eq(adAccountConnections.id, accountId))
      .returning();

    if (!updated) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    res.json({ success: true, message: "Account disconnected", account: updated });
  } catch (error: any) {
    console.error("[Amplify] Disconnect account error:", error);
    res.status(500).json({ success: false, message: "Failed to disconnect account" });
  }
});

// =============================================
// CAMPAIGNS
// =============================================

/** GET /api/amplify/campaigns — list all campaigns */
router.get("/api/amplify/campaigns", isAuthenticated, async (req, res) => {
  try {
    const { platform, status, page, limit } = req.query;
    const pageNum = parseInt(page as string) || 1;
    const limitNum = Math.min(parseInt(limit as string) || 20, 100);
    const offset = (pageNum - 1) * limitNum;

    const conditions: any[] = [];
    if (platform) {
      conditions.push(eq(amplifyCampaigns.platform, platform as string));
    }
    if (status) {
      conditions.push(eq(amplifyCampaigns.status, status as string));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const campaigns = await db
      .select()
      .from(amplifyCampaigns)
      .where(whereClause)
      .orderBy(desc(amplifyCampaigns.createdAt))
      .limit(limitNum)
      .offset(offset);

    const totalResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(amplifyCampaigns)
      .where(whereClause);

    res.json({
      success: true,
      campaigns,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalResult[0]?.count || 0,
        totalPages: Math.ceil((totalResult[0]?.count || 0) / limitNum),
      },
    });
  } catch (error: any) {
    console.error("[Amplify] List campaigns error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch campaigns" });
  }
});

/** Helper: create campaign for a given platform */
async function createCampaign(req: any, res: any, platform: string) {
  try {
    const { name, objective, dailyBudget, lifetimeBudget, startDate, endDate, targetingOptions } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Campaign name is required" });
    }
    if (!objective) {
      return res.status(400).json({ success: false, message: "Campaign objective is required" });
    }

    const [campaign] = await db
      .insert(amplifyCampaigns)
      .values({
        platform,
        name,
        objective,
        dailyBudget: dailyBudget || null,
        lifetimeBudget: lifetimeBudget || null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        status: "draft",
      })
      .returning();

    console.log(`[Amplify] Campaign created for ${platform} (stub — actual ${platform} API call would happen here):`, campaign.id);

    res.json({
      success: true,
      campaign,
      message: `${platform} campaign created locally. Actual ${platform} API submission will be implemented with OAuth integration.`,
    });
  } catch (error: any) {
    console.error(`[Amplify] Create ${platform} campaign error:`, error);
    res.status(500).json({ success: false, message: `Failed to create ${platform} campaign` });
  }
}

/** POST /api/amplify/campaigns/meta — create Meta campaign (stub) */
router.post("/api/amplify/campaigns/meta", isAuthenticated, (req, res) => createCampaign(req, res, "meta"));

/** POST /api/amplify/campaigns/google — create Google campaign (stub) */
router.post("/api/amplify/campaigns/google", isAuthenticated, (req, res) => createCampaign(req, res, "google"));

/** POST /api/amplify/campaigns/microsoft — create Microsoft campaign (stub) */
router.post("/api/amplify/campaigns/microsoft", isAuthenticated, (req, res) => createCampaign(req, res, "microsoft"));

/** POST /api/amplify/campaigns/reddit — create Reddit campaign (stub) */
router.post("/api/amplify/campaigns/reddit", isAuthenticated, (req, res) => createCampaign(req, res, "reddit"));

/** PUT /api/amplify/campaigns/:id/pause — pause a campaign */
router.put("/api/amplify/campaigns/:id/pause", isAuthenticated, async (req, res) => {
  try {
    const campaignId = parseInt(req.params.id);
    if (isNaN(campaignId)) {
      return res.status(400).json({ success: false, message: "Invalid campaign ID" });
    }

    const [updated] = await db
      .update(amplifyCampaigns)
      .set({ status: "paused", updatedAt: new Date() })
      .where(eq(amplifyCampaigns.id, campaignId))
      .returning();

    if (!updated) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    console.log(`[Amplify] Campaign ${campaignId} paused (stub — actual platform API call would happen here)`);
    res.json({ success: true, campaign: updated });
  } catch (error: any) {
    console.error("[Amplify] Pause campaign error:", error);
    res.status(500).json({ success: false, message: "Failed to pause campaign" });
  }
});

/** PUT /api/amplify/campaigns/:id/resume — resume a campaign */
router.put("/api/amplify/campaigns/:id/resume", isAuthenticated, async (req, res) => {
  try {
    const campaignId = parseInt(req.params.id);
    if (isNaN(campaignId)) {
      return res.status(400).json({ success: false, message: "Invalid campaign ID" });
    }

    const [updated] = await db
      .update(amplifyCampaigns)
      .set({ status: "active", updatedAt: new Date() })
      .where(eq(amplifyCampaigns.id, campaignId))
      .returning();

    if (!updated) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    console.log(`[Amplify] Campaign ${campaignId} resumed (stub — actual platform API call would happen here)`);
    res.json({ success: true, campaign: updated });
  } catch (error: any) {
    console.error("[Amplify] Resume campaign error:", error);
    res.status(500).json({ success: false, message: "Failed to resume campaign" });
  }
});

/** DELETE /api/amplify/campaigns/:id — delete a campaign */
router.delete("/api/amplify/campaigns/:id", isAuthenticated, async (req, res) => {
  try {
    const campaignId = parseInt(req.params.id);
    if (isNaN(campaignId)) {
      return res.status(400).json({ success: false, message: "Invalid campaign ID" });
    }

    const [deleted] = await db
      .delete(amplifyCampaigns)
      .where(eq(amplifyCampaigns.id, campaignId))
      .returning();

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    console.log(`[Amplify] Campaign ${campaignId} deleted (stub — actual platform API call would happen here)`);
    res.json({ success: true, message: "Campaign deleted" });
  } catch (error: any) {
    console.error("[Amplify] Delete campaign error:", error);
    res.status(500).json({ success: false, message: "Failed to delete campaign" });
  }
});

// =============================================
// AUDIENCES
// =============================================

/** GET /api/amplify/audiences — list saved audiences */
router.get("/api/amplify/audiences", isAuthenticated, async (req, res) => {
  try {
    const audiences = await db
      .select()
      .from(amplifyAudiences)
      .orderBy(desc(amplifyAudiences.createdAt));

    res.json({ success: true, audiences });
  } catch (error: any) {
    console.error("[Amplify] List audiences error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch audiences" });
  }
});

/** POST /api/amplify/audiences — create audience */
router.post("/api/amplify/audiences", isAuthenticated, async (req, res) => {
  try {
    const { audienceName, audienceType, platform, sizeEstimate } = req.body;

    if (!audienceName) {
      return res.status(400).json({ success: false, message: "Audience name is required" });
    }

    const [audience] = await db
      .insert(amplifyAudiences)
      .values({
        audienceName,
        audienceType: audienceType || "custom",
        platform: platform || null,
        sizeEstimate: sizeEstimate || null,
      })
      .returning();

    res.json({ success: true, audience });
  } catch (error: any) {
    console.error("[Amplify] Create audience error:", error);
    res.status(500).json({ success: false, message: "Failed to create audience" });
  }
});

/** POST /api/amplify/audiences/export-crm — export CRM contacts as custom audience (stub) */
router.post("/api/amplify/audiences/export-crm", isAuthenticated, async (req, res) => {
  try {
    const { platform, audienceName } = req.body;

    if (!platform) {
      return res.status(400).json({ success: false, message: "Platform is required" });
    }

    console.log(`[Amplify] CRM audience export initiated for ${platform} (stub — actual CRM contact export would happen here)`);

    // Create a placeholder audience record
    const [audience] = await db
      .insert(amplifyAudiences)
      .values({
        audienceName: audienceName || `CRM Export - ${new Date().toISOString().split("T")[0]}`,
        audienceType: "crm_export",
        platform,
        sizeEstimate: 0, // Would be populated after actual export
      })
      .returning();

    res.json({
      success: true,
      audience,
      message: `CRM contacts queued for export to ${platform}. Actual API upload will happen when OAuth is connected.`,
    });
  } catch (error: any) {
    console.error("[Amplify] Export CRM audience error:", error);
    res.status(500).json({ success: false, message: "Failed to export CRM audience" });
  }
});

// =============================================
// BUDGET
// =============================================

/** GET /api/amplify/budget — get current month's budget allocations */
router.get("/api/amplify/budget", isAuthenticated, async (req, res) => {
  try {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const budgets = await db
      .select()
      .from(amplifyBudgetAllocations)
      .where(eq(amplifyBudgetAllocations.month, currentMonth));

    res.json({
      success: true,
      month: currentMonth,
      budget: budgets[0] || null,
    });
  } catch (error: any) {
    console.error("[Amplify] Get budget error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch budget" });
  }
});

/** PUT /api/amplify/budget — update budget allocations */
router.put("/api/amplify/budget", isAuthenticated, async (req, res) => {
  try {
    const { totalBudget, metaAllocation, googleAllocation, microsoftAllocation, redditAllocation, otherAllocations } = req.body;

    if (!totalBudget) {
      return res.status(400).json({ success: false, message: "Total budget is required" });
    }

    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    // Upsert: check if budget exists for this month
    const existing = await db
      .select()
      .from(amplifyBudgetAllocations)
      .where(eq(amplifyBudgetAllocations.month, currentMonth))
      .limit(1);

    let budget;
    if (existing.length > 0) {
      [budget] = await db
        .update(amplifyBudgetAllocations)
        .set({
          totalBudget,
          metaAllocation: metaAllocation || "0",
          googleAllocation: googleAllocation || "0",
          microsoftAllocation: microsoftAllocation || "0",
          redditAllocation: redditAllocation || "0",
          otherAllocations: otherAllocations || null,
          updatedAt: new Date(),
        })
        .where(eq(amplifyBudgetAllocations.id, existing[0].id))
        .returning();
    } else {
      [budget] = await db
        .insert(amplifyBudgetAllocations)
        .values({
          month: currentMonth,
          totalBudget,
          metaAllocation: metaAllocation || "0",
          googleAllocation: googleAllocation || "0",
          microsoftAllocation: microsoftAllocation || "0",
          redditAllocation: redditAllocation || "0",
          otherAllocations: otherAllocations || null,
        })
        .returning();
    }

    res.json({ success: true, budget });
  } catch (error: any) {
    console.error("[Amplify] Update budget error:", error);
    res.status(500).json({ success: false, message: "Failed to update budget" });
  }
});

// =============================================
// REPORTS
// =============================================

/** GET /api/amplify/reports — performance data with date range */
router.get("/api/amplify/reports", isAuthenticated, async (req, res) => {
  try {
    const { startDate, endDate, platform } = req.query;

    const conditions: any[] = [];
    if (platform) {
      conditions.push(eq(amplifyCampaigns.platform, platform as string));
    }
    if (startDate) {
      conditions.push(sql`${amplifyCampaigns.createdAt} >= ${new Date(startDate as string)}`);
    }
    if (endDate) {
      conditions.push(sql`${amplifyCampaigns.createdAt} <= ${new Date(endDate as string)}`);
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Aggregate performance metrics
    const metrics = await db
      .select({
        platform: amplifyCampaigns.platform,
        totalSpend: sql<string>`coalesce(sum(spend_to_date::numeric), 0)::text`,
        totalImpressions: sql<number>`coalesce(sum(${amplifyCampaigns.impressions}), 0)::int`,
        totalClicks: sql<number>`coalesce(sum(${amplifyCampaigns.clicks}), 0)::int`,
        totalConversions: sql<number>`coalesce(sum(${amplifyCampaigns.conversions}), 0)::int`,
        campaignCount: sql<number>`count(*)::int`,
        avgRoas: sql<string>`coalesce(avg(${amplifyCampaigns.roas}::numeric), 0)::text`,
      })
      .from(amplifyCampaigns)
      .where(whereClause)
      .groupBy(amplifyCampaigns.platform);

    // Campaign-level detail
    const campaigns = await db
      .select()
      .from(amplifyCampaigns)
      .where(whereClause)
      .orderBy(desc(amplifyCampaigns.createdAt));

    res.json({
      success: true,
      report: {
        dateRange: { startDate: startDate || null, endDate: endDate || null },
        platformMetrics: metrics,
        campaigns,
      },
    });
  } catch (error: any) {
    console.error("[Amplify] Reports error:", error);
    res.status(500).json({ success: false, message: "Failed to generate report" });
  }
});

// =============================================
// INSIGHTS
// =============================================

/** GET /api/amplify/insights — ecosystem insights (stub) */
router.get("/api/amplify/insights", isAuthenticated, async (_req, res) => {
  try {
    // Placeholder data showing cross-module insights
    res.json({
      success: true,
      insights: [
        {
          type: "engage_timing",
          title: "Best posting times from /engage",
          description: "Your social posts get 2.3x more engagement on Tuesdays between 10am-12pm. Consider scheduling ad campaigns to align with peak organic engagement windows.",
          confidence: 0.85,
        },
        {
          type: "elevate_rating",
          title: "Review sentiment from /elevate",
          description: "Your average review rating is 4.6 stars. Use positive review quotes as social proof in ad creative for higher CTR.",
          confidence: 0.92,
        },
        {
          type: "connect_audience",
          title: "CRM audience overlap",
          description: "34% of your CRM contacts match your Meta Lookalike audience. Consider a retargeting campaign for the remaining 66% who haven't converted.",
          confidence: 0.78,
        },
        {
          type: "optimize_seo",
          title: "SEO keyword alignment",
          description: "Your top 5 SEO keywords overlap with high-performing Google Ads keywords. Bid on branded terms to dominate both organic and paid results.",
          confidence: 0.88,
        },
      ],
    });
  } catch (error: any) {
    console.error("[Amplify] Insights error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch insights" });
  }
});

// =============================================
// CREATIVE DRAFTING
// =============================================

/** POST /api/amplify/creative/draft — AI creative drafting (stub) */
router.post("/api/amplify/creative/draft", isAuthenticated, async (req, res) => {
  try {
    const { platform, business_type, headline_count } = req.body;
    const count = Math.min(headline_count || 3, 10);
    const plat = platform || "meta";
    const biz = business_type || "local business";

    console.log(`[Amplify] Creative draft requested for ${plat} / ${biz} (stub — actual AI generation would happen here)`);

    // Generate placeholder drafts based on platform
    const drafts = [];
    const platformTemplates: Record<string, { headlines: string[]; bodies: string[] }> = {
      meta: {
        headlines: [
          `Discover the Best ${biz} in Your Area`,
          `Why Local ${biz} Owners Trust Us`,
          `Transform Your ${biz} Today`,
          `${biz} Solutions That Actually Work`,
          `Ready to Grow Your ${biz}?`,
        ],
        bodies: [
          `Join thousands of ${biz} owners who have boosted their revenue by 40%. Get started with a free consultation today.`,
          `Stop wasting money on ads that don't convert. Our proven strategy helps ${biz} owners get real results.`,
        ],
      },
      google: {
        headlines: [
          `Top ${biz} Services`,
          `Affordable ${biz} Solutions`,
          `${biz} - Get Results Fast`,
          `Best-Rated ${biz} Near You`,
          `${biz} Experts Since 2020`,
        ],
        bodies: [
          `Looking for reliable ${biz} services? We deliver measurable results with transparent pricing. Call today.`,
          `Grow your ${biz} with data-driven strategies. Free consultation available.`,
        ],
      },
      reddit: {
        headlines: [
          `Honest talk about running a ${biz}`,
          `What we learned helping 500+ ${biz} owners`,
          `${biz} tips the gurus won't tell you`,
          `AMA: Growing a ${biz} in 2026`,
          `The real cost of scaling a ${biz}`,
        ],
        bodies: [
          `We've been in the ${biz} space for years. Here's what actually moves the needle (no fluff).`,
          `Community-first approach to ${biz} growth. Happy to answer questions.`,
        ],
      },
      microsoft: {
        headlines: [
          `Professional ${biz} Services`,
          `${biz} Growth Strategies`,
          `Trusted ${biz} Partner`,
          `Enterprise ${biz} Solutions`,
          `${biz} Made Simple`,
        ],
        bodies: [
          `Elevate your ${biz} with enterprise-grade solutions at small-business prices. Request a demo.`,
          `Our ${biz} platform helps you save time and increase ROI. Learn more today.`,
        ],
      },
    };

    const templates = platformTemplates[plat] || platformTemplates.meta;

    for (let i = 0; i < count; i++) {
      drafts.push({
        headline: templates.headlines[i % templates.headlines.length],
        body: templates.bodies[i % templates.bodies.length],
        platform: plat,
        cta: plat === "reddit" ? "Learn More" : "Get Started",
        estimatedCtr: `${(Math.random() * 3 + 1).toFixed(2)}%`,
      });
    }

    res.json({
      success: true,
      drafts,
      message: "Placeholder drafts generated. AI-powered creative generation will use your brand voice and performance data.",
    });
  } catch (error: any) {
    console.error("[Amplify] Creative draft error:", error);
    res.status(500).json({ success: false, message: "Failed to generate creative drafts" });
  }
});

// =============================================
// REDDIT-SPECIFIC FEATURES
// =============================================

/** GET /api/amplify/reddit/subreddits — subreddit intelligence scan (stub) */
router.get("/api/amplify/reddit/subreddits", isAuthenticated, async (req, res) => {
  try {
    const { business_type, city } = req.query;
    const biz = (business_type as string) || "local business";
    const loc = (city as string) || "your city";

    console.log(`[Amplify] Subreddit scan for ${biz} in ${loc} (stub — actual Reddit API scan would happen here)`);

    res.json({
      success: true,
      recommendations: [
        {
          subreddit: "r/smallbusiness",
          subscribers: 1200000,
          relevanceScore: 95,
          avgEngagement: "high",
          adFriendly: true,
          notes: `High-traffic community for ${biz} owners. Great for awareness campaigns.`,
        },
        {
          subreddit: "r/Entrepreneur",
          subscribers: 2800000,
          relevanceScore: 88,
          avgEngagement: "medium",
          adFriendly: true,
          notes: `Large audience interested in business growth. Good for lead generation.`,
        },
        {
          subreddit: `r/${loc.replace(/\s+/g, "")}`,
          subscribers: 45000,
          relevanceScore: 92,
          avgEngagement: "high",
          adFriendly: true,
          notes: `Local community subreddit. Excellent for geo-targeted ${biz} ads.`,
        },
        {
          subreddit: "r/marketing",
          subscribers: 950000,
          relevanceScore: 75,
          avgEngagement: "medium",
          adFriendly: true,
          notes: "Marketing-focused audience. Good for B2B offerings.",
        },
      ],
      message: "Placeholder subreddit data. Live scan will use Reddit API for real-time subscriber counts and engagement metrics.",
    });
  } catch (error: any) {
    console.error("[Amplify] Subreddit scan error:", error);
    res.status(500).json({ success: false, message: "Failed to scan subreddits" });
  }
});

/** GET /api/amplify/reddit/campaigns/:id/comments — get comments for a Reddit campaign */
router.get("/api/amplify/reddit/campaigns/:id/comments", isAuthenticated, async (req, res) => {
  try {
    const campaignId = parseInt(req.params.id);
    if (isNaN(campaignId)) {
      return res.status(400).json({ success: false, message: "Invalid campaign ID" });
    }

    const comments = await db
      .select()
      .from(redditAdComments)
      .where(eq(redditAdComments.campaignId, campaignId))
      .orderBy(desc(redditAdComments.createdAt));

    res.json({ success: true, comments });
  } catch (error: any) {
    console.error("[Amplify] Reddit comments error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch Reddit comments" });
  }
});

/** POST /api/amplify/reddit/campaigns/:id/comments/:commentId/respond — respond to a Reddit comment (stub) */
router.post("/api/amplify/reddit/campaigns/:id/comments/:commentId/respond", isAuthenticated, async (req, res) => {
  try {
    const commentId = parseInt(req.params.commentId);
    if (isNaN(commentId)) {
      return res.status(400).json({ success: false, message: "Invalid comment ID" });
    }

    const { responseText } = req.body;
    if (!responseText) {
      return res.status(400).json({ success: false, message: "Response text is required" });
    }

    const [updated] = await db
      .update(redditAdComments)
      .set({
        responded: true,
        respondedAt: new Date(),
        suggestedResponse: responseText,
      })
      .where(eq(redditAdComments.id, commentId))
      .returning();

    if (!updated) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    console.log(`[Amplify] Reddit comment ${commentId} response recorded (stub — actual Reddit API reply would happen here)`);

    res.json({
      success: true,
      comment: updated,
      message: "Response recorded locally. Actual Reddit API reply will be posted when OAuth is connected.",
    });
  } catch (error: any) {
    console.error("[Amplify] Reddit respond error:", error);
    res.status(500).json({ success: false, message: "Failed to respond to comment" });
  }
});

/** GET /api/amplify/reddit/campaigns/:id/sentiment — sentiment analysis for a Reddit campaign */
router.get("/api/amplify/reddit/campaigns/:id/sentiment", isAuthenticated, async (req, res) => {
  try {
    const campaignId = parseInt(req.params.id);
    if (isNaN(campaignId)) {
      return res.status(400).json({ success: false, message: "Invalid campaign ID" });
    }

    // Get campaign
    const [campaign] = await db
      .select()
      .from(amplifyCampaigns)
      .where(eq(amplifyCampaigns.id, campaignId))
      .limit(1);

    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }

    // Get comment sentiment breakdown
    const sentimentBreakdown = await db
      .select({
        sentiment: redditAdComments.sentiment,
        count: sql<number>`count(*)::int`,
      })
      .from(redditAdComments)
      .where(eq(redditAdComments.campaignId, campaignId))
      .groupBy(redditAdComments.sentiment);

    const sentimentMap: Record<string, number> = {};
    for (const s of sentimentBreakdown) {
      sentimentMap[s.sentiment || "unknown"] = s.count;
    }

    const totalComments = Object.values(sentimentMap).reduce((a, b) => a + b, 0);

    res.json({
      success: true,
      sentiment: {
        campaignId,
        overallSentiment: campaign.redditSentiment || "neutral",
        engagementScore: campaign.redditEngagementScore || 0,
        upvoteRatio: campaign.redditUpvoteRatio || "0",
        commentCount: campaign.redditCommentCount || 0,
        breakdown: {
          positive: sentimentMap.positive || 0,
          neutral: sentimentMap.neutral || 0,
          negative: sentimentMap.negative || 0,
          total: totalComments,
        },
        lastChecked: campaign.redditLastSentimentCheck || null,
      },
    });
  } catch (error: any) {
    console.error("[Amplify] Sentiment analysis error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch sentiment data" });
  }
});

export const amplifyRouter = router;
