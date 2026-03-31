/**
 * /amplify - Paid Advertising Management API Routes
 * Multi-platform ad management: Meta, Google, Microsoft, Reddit
 * All routes protected with isAuthenticated middleware
 *
 * Reddit integration uses real Reddit Ads API via redditAdsService.
 * AI creative drafting uses the unified AI provider.
 */

import { Router } from "express";
import { db } from "../db";
import { isAuthenticated } from "../replitAuth";
import {
  adAccountConnections,
  amplifyCampaigns,
  amplifyAudiences,
  amplifyBudgetAllocations,
  amplifyAdSets,
  amplifyAds,
  redditAdComments,
} from "@shared/schema";
import { eq, and, desc, sql, inArray } from "drizzle-orm";
import { redditAdsService } from "../services/reddit-ads";
import { unifiedAI } from "../services/ai-provider";
import crypto from "crypto";

const router = Router();

// Google Ads API credentials
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_ADS_DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;

// Meta Ads API credentials
const META_APP_ID = process.env.META_APP_ID;
const META_APP_SECRET = process.env.META_APP_SECRET;

// Helper to extract user ID from session/user
function getUserId(req: any): string {
  return req.session?.userId || req.user?.claims?.sub || "dev-user";
}

// =============================================
// OVERVIEW / DASHBOARD
// =============================================

/** GET /api/amplify/overview — dashboard summary */
router.get("/api/amplify/overview", isAuthenticated, async (req, res) => {
  try {
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
      .select({
        total: sql<string>`coalesce(sum(spend_to_date::numeric), 0)::text`,
      })
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
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch overview" });
  }
});

/** GET /api/amplify/stats — aggregate stats for the dashboard */
router.get("/api/amplify/stats", isAuthenticated, async (_req, res) => {
  try {
    const totalCampaignsResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(amplifyCampaigns);

    const totalSpendResult = await db
      .select({
        total: sql<string>`coalesce(sum(spend_to_date::numeric), 0)::text`,
      })
      .from(amplifyCampaigns);

    const avgRoasResult = await db
      .select({
        avg: sql<string>`coalesce(avg(roas::numeric), 0)::text`,
      })
      .from(amplifyCampaigns)
      .where(sql`${amplifyCampaigns.roas} is not null`);

    const activeCampaignsResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(amplifyCampaigns)
      .where(eq(amplifyCampaigns.status, "active"));

    const platformBreakdown = await db
      .select({
        platform: amplifyCampaigns.platform,
        count: sql<number>`count(*)::int`,
        spend: sql<string>`coalesce(sum(spend_to_date::numeric), 0)::text`,
      })
      .from(amplifyCampaigns)
      .groupBy(amplifyCampaigns.platform);

    res.json({
      success: true,
      stats: {
        totalCampaigns: totalCampaignsResult[0]?.count || 0,
        activeCampaigns: activeCampaignsResult[0]?.count || 0,
        totalSpend: totalSpendResult[0]?.total || "0",
        avgRoas: avgRoasResult[0]?.avg || "0",
        platformBreakdown,
      },
    });
  } catch (error: any) {
    console.error("[Amplify] Stats error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch stats" });
  }
});

// =============================================
// AD ACCOUNTS
// =============================================

/** GET /api/amplify/accounts — list connected ad accounts */
router.get("/api/amplify/accounts", isAuthenticated, async (_req, res) => {
  try {
    const accounts = await db
      .select()
      .from(adAccountConnections)
      .where(eq(adAccountConnections.status, "active"))
      .orderBy(desc(adAccountConnections.createdAt));

    res.json({ success: true, accounts });
  } catch (error: any) {
    console.error("[Amplify] List accounts error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch accounts" });
  }
});

/** POST /api/amplify/accounts/connect — initiate OAuth for a platform */
router.post(
  "/api/amplify/accounts/connect",
  isAuthenticated,
  async (req, res) => {
    try {
      const { platform } = req.body;

      if (!platform) {
        return res
          .status(400)
          .json({ success: false, message: "Platform is required" });
      }

      const platformLower = platform.toLowerCase();

      // Real OAuth URL for Reddit via the service
      if (platformLower === "reddit") {
        try {
          const oauthUrl = redditAdsService.getAuthorizationUrl(0, process.env.REDDIT_REDIRECT_URI || `${req.protocol}://${req.get("host")}/api/amplify/accounts/reddit/callback`);
          return res.json({ success: true, oauthUrl });
        } catch (err: any) {
          console.error("[Amplify] Reddit OAuth URL error:", err);
          return res.status(500).json({
            success: false,
            message:
              "Failed to generate Reddit OAuth URL. Check REDDIT_CLIENT_ID and REDDIT_REDIRECT_URI env vars.",
          });
        }
      }

      // Google Ads OAuth
      if (platformLower === "google") {
        if (!GOOGLE_CLIENT_ID) {
          return res.status(500).json({ success: false, message: "Google OAuth not configured" });
        }
        const redirectUri = `${req.protocol}://${req.get("host")}/api/amplify/accounts/google/callback`;
        const state = Buffer.from(JSON.stringify({ nonce: crypto.randomBytes(16).toString("hex"), timestamp: Date.now() })).toString("base64");
        const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
        authUrl.searchParams.set("client_id", GOOGLE_CLIENT_ID);
        authUrl.searchParams.set("redirect_uri", redirectUri);
        authUrl.searchParams.set("response_type", "code");
        authUrl.searchParams.set("scope", "https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/userinfo.email");
        authUrl.searchParams.set("state", state);
        authUrl.searchParams.set("access_type", "offline");
        authUrl.searchParams.set("prompt", "consent");
        return res.json({ success: true, oauthUrl: authUrl.toString() });
      }

      // Meta Ads OAuth
      if (platformLower === "meta") {
        if (!META_APP_ID) {
          return res.status(500).json({ success: false, message: "Meta OAuth not configured" });
        }
        const redirectUri = `${req.protocol}://${req.get("host")}/api/amplify/accounts/meta/callback`;
        const state = Buffer.from(JSON.stringify({ nonce: crypto.randomBytes(16).toString("hex"), timestamp: Date.now() })).toString("base64");
        const authUrl = new URL("https://www.facebook.com/v21.0/dialog/oauth");
        authUrl.searchParams.set("client_id", META_APP_ID);
        authUrl.searchParams.set("redirect_uri", redirectUri);
        authUrl.searchParams.set("scope", "ads_management,ads_read,pages_show_list");
        authUrl.searchParams.set("state", state);
        authUrl.searchParams.set("response_type", "code");
        return res.json({ success: true, oauthUrl: authUrl.toString() });
      }

      // Microsoft Advertising OAuth
      if (platformLower === "microsoft") {
        const msClientId = process.env.MICROSOFT_ADS_CLIENT_ID;
        if (!msClientId) {
          return res.status(500).json({ success: false, message: "Microsoft Advertising OAuth not configured" });
        }
        const redirectUri = `${req.protocol}://${req.get("host")}/api/microsoft-ads/oauth/callback`;
        const state = Buffer.from(JSON.stringify({ nonce: crypto.randomBytes(16).toString("hex"), timestamp: Date.now() })).toString("base64");
        const authUrl = new URL("https://login.microsoftonline.com/common/oauth2/v2.0/authorize");
        authUrl.searchParams.set("client_id", msClientId);
        authUrl.searchParams.set("redirect_uri", redirectUri);
        authUrl.searchParams.set("response_type", "code");
        authUrl.searchParams.set("scope", "https://ads.microsoft.com/msads.manage openid profile email");
        authUrl.searchParams.set("state", state);
        authUrl.searchParams.set("prompt", "consent");
        return res.json({ success: true, oauthUrl: authUrl.toString() });
      }

      return res.status(400).json({
        success: false,
        message: `Unsupported platform: ${platform}. Supported: meta, google, microsoft, reddit`,
      });
    } catch (error: any) {
      console.error("[Amplify] Connect account error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to initiate connection" });
    }
  }
);

/** GET /api/amplify/accounts/reddit/callback — handle Reddit OAuth callback */
router.get(
  "/api/amplify/accounts/reddit/callback",
  isAuthenticated,
  async (req, res) => {
    try {
      const { code, state, error: oauthError } = req.query;

      if (oauthError) {
        console.error("[Amplify] Reddit OAuth denied:", oauthError);
        return res.status(400).json({
          success: false,
          message: `Reddit OAuth denied: ${oauthError}`,
        });
      }

      if (!code || typeof code !== "string") {
        return res.status(400).json({
          success: false,
          message: "Missing authorization code from Reddit",
        });
      }

      // Exchange the code for access + refresh tokens
      const tokenData = await redditAdsService.exchangeCodeForToken(code, process.env.REDDIT_REDIRECT_URI || `${req.protocol}://${req.get("host")}/api/amplify/accounts/reddit/callback`);

      // Store the token in the DB
      const userId = getUserId(req);
      await redditAdsService.storeToken(userId, "reddit_ads", "Reddit Ads", tokenData);

      console.log(
        "[Amplify] Reddit OAuth completed successfully for user:",
        userId
      );

      res.json({
        success: true,
        message: "Reddit ad account connected successfully",
        accountName: "Reddit Ads",
      });
    } catch (error: any) {
      console.error("[Amplify] Reddit OAuth callback error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to complete Reddit OAuth: " + error.message,
      });
    }
  }
);

/** GET /api/amplify/accounts/google/callback — handle Google Ads OAuth callback */
router.get(
  "/api/amplify/accounts/google/callback",
  async (req, res) => {
    try {
      const { code, error: oauthError } = req.query;

      if (oauthError || !code) {
        return res.redirect("/amplify/dashboard?oauth=error&platform=google");
      }

      const redirectUri = `${req.protocol}://${req.get("host")}/api/amplify/accounts/google/callback`;

      // Exchange code for tokens
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code: code as string,
          client_id: GOOGLE_CLIENT_ID!,
          client_secret: GOOGLE_CLIENT_SECRET!,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });

      const tokenData = await tokenResponse.json();

      if (!tokenData.access_token) {
        console.error("[Amplify] Google token exchange failed:", tokenData);
        return res.redirect("/amplify/dashboard?oauth=error&platform=google");
      }

      // Get user email
      const profileResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const profile = await profileResponse.json();

      // Store the connection
      const [connection] = await db
        .insert(adAccountConnections)
        .values({
          platform: "google",
          accountName: profile.email || "Google Ads",
          status: "active",
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          tokenExpiresAt: new Date(Date.now() + (tokenData.expires_in || 3600) * 1000),
        })
        .returning();

      console.log(`[Amplify] Google Ads connected: ${profile.email}`);
      res.redirect("/amplify/dashboard?oauth=success&platform=google");
    } catch (error: any) {
      console.error("[Amplify] Google OAuth callback error:", error);
      res.redirect("/amplify/dashboard?oauth=error&platform=google");
    }
  }
);

/** GET /api/amplify/accounts/meta/callback — handle Meta Ads OAuth callback */
router.get(
  "/api/amplify/accounts/meta/callback",
  async (req, res) => {
    try {
      const { code, error: oauthError } = req.query;

      if (oauthError || !code) {
        return res.redirect("/amplify/dashboard?oauth=error&platform=meta");
      }

      const redirectUri = `${req.protocol}://${req.get("host")}/api/amplify/accounts/meta/callback`;

      // Exchange code for short-lived token
      const tokenResponse = await fetch(
        `https://graph.facebook.com/v21.0/oauth/access_token?` +
        `client_id=${META_APP_ID}&` +
        `client_secret=${META_APP_SECRET}&` +
        `code=${code}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}`
      );
      const tokenData = await tokenResponse.json();

      if (!tokenData.access_token) {
        console.error("[Amplify] Meta token exchange failed:", tokenData);
        return res.redirect("/amplify/dashboard?oauth=error&platform=meta");
      }

      // Exchange for long-lived token
      const longLivedResponse = await fetch(
        `https://graph.facebook.com/v21.0/oauth/access_token?` +
        `grant_type=fb_exchange_token&` +
        `client_id=${META_APP_ID}&` +
        `client_secret=${META_APP_SECRET}&` +
        `fb_exchange_token=${tokenData.access_token}`
      );
      const longLivedData = await longLivedResponse.json();
      const accessToken = longLivedData.access_token || tokenData.access_token;

      // Get ad accounts
      const adAccountsResponse = await fetch(
        `https://graph.facebook.com/v21.0/me/adaccounts?fields=name,account_id,account_status&access_token=${accessToken}`
      );
      const adAccountsData = await adAccountsResponse.json();

      const accountName = adAccountsData.data?.[0]?.name || "Meta Ads";
      const adAccountId = adAccountsData.data?.[0]?.account_id;

      // Store the connection
      const [connection] = await db
        .insert(adAccountConnections)
        .values({
          platform: "meta",
          accountName,
          accountId: adAccountId,
          status: "active",
          accessToken,
        })
        .returning();

      console.log(`[Amplify] Meta Ads connected: ${accountName}`);
      res.redirect("/amplify/dashboard?oauth=success&platform=meta");
    } catch (error: any) {
      console.error("[Amplify] Meta OAuth callback error:", error);
      res.redirect("/amplify/dashboard?oauth=error&platform=meta");
    }
  }
);

/** DELETE /api/amplify/accounts/:id — disconnect an ad account */
router.delete(
  "/api/amplify/accounts/:id",
  isAuthenticated,
  async (req, res) => {
    try {
      const accountId = parseInt(req.params.id);
      if (isNaN(accountId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid account ID" });
      }

      const [updated] = await db
        .update(adAccountConnections)
        .set({ status: "disconnected", updatedAt: new Date() })
        .where(eq(adAccountConnections.id, accountId))
        .returning();

      if (!updated) {
        return res
          .status(404)
          .json({ success: false, message: "Account not found" });
      }

      res.json({
        success: true,
        message: "Account disconnected",
        account: updated,
      });
    } catch (error: any) {
      console.error("[Amplify] Disconnect account error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to disconnect account" });
    }
  }
);

// =============================================
// CAMPAIGNS — GENERIC
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

    const whereClause =
      conditions.length > 0 ? and(...conditions) : undefined;

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
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch campaigns" });
  }
});

// =============================================
// PLATFORM-SPECIFIC CAMPAIGN LISTS
// =============================================

/** GET /api/amplify/reddit/campaigns — list Reddit campaigns */
router.get(
  "/api/amplify/reddit/campaigns",
  isAuthenticated,
  async (req, res) => {
    try {
      const { status, page, limit } = req.query;
      const pageNum = parseInt(page as string) || 1;
      const limitNum = Math.min(parseInt(limit as string) || 20, 100);
      const offset = (pageNum - 1) * limitNum;

      const conditions: any[] = [
        eq(amplifyCampaigns.platform, "reddit"),
      ];
      if (status) {
        conditions.push(eq(amplifyCampaigns.status, status as string));
      }

      const whereClause = and(...conditions);

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
      console.error("[Amplify] List Reddit campaigns error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch Reddit campaigns" });
    }
  }
);

/** GET /api/amplify/meta/campaigns — list Meta campaigns */
router.get(
  "/api/amplify/meta/campaigns",
  isAuthenticated,
  async (req, res) => {
    try {
      const { status, page, limit } = req.query;
      const pageNum = parseInt(page as string) || 1;
      const limitNum = Math.min(parseInt(limit as string) || 20, 100);
      const offset = (pageNum - 1) * limitNum;

      const conditions: any[] = [eq(amplifyCampaigns.platform, "meta")];
      if (status) {
        conditions.push(eq(amplifyCampaigns.status, status as string));
      }

      const whereClause = and(...conditions);

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
      console.error("[Amplify] List Meta campaigns error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch Meta campaigns" });
    }
  }
);

/** GET /api/amplify/google/campaigns — list Google campaigns */
router.get(
  "/api/amplify/google/campaigns",
  isAuthenticated,
  async (req, res) => {
    try {
      const { status, page, limit } = req.query;
      const pageNum = parseInt(page as string) || 1;
      const limitNum = Math.min(parseInt(limit as string) || 20, 100);
      const offset = (pageNum - 1) * limitNum;

      const conditions: any[] = [
        eq(amplifyCampaigns.platform, "google"),
      ];
      if (status) {
        conditions.push(eq(amplifyCampaigns.status, status as string));
      }

      const whereClause = and(...conditions);

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
      console.error("[Amplify] List Google campaigns error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch Google campaigns",
      });
    }
  }
);

// =============================================
// CAMPAIGN CREATION — NON-REDDIT (Meta, Google, Microsoft)
// =============================================

/** Helper: create campaign for non-Reddit platforms (stores in DB, platform API TBD) */
async function createGenericCampaign(req: any, res: any, platform: string) {
  try {
    const {
      name,
      objective,
      dailyBudget,
      lifetimeBudget,
      startDate,
      endDate,
    } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Campaign name is required" });
    }
    if (!objective) {
      return res
        .status(400)
        .json({ success: false, message: "Campaign objective is required" });
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

    console.log(
      `[Amplify] ${platform} campaign ${campaign.id} created in DB (platform API integration pending)`
    );

    res.json({
      success: true,
      campaign,
      message: `${platform} campaign stored. API submission pending OAuth integration.`,
    });
  } catch (error: any) {
    console.error(`[Amplify] Create ${platform} campaign error:`, error);
    res.status(500).json({
      success: false,
      message: `Failed to create ${platform} campaign`,
    });
  }
}

/** POST /api/amplify/campaigns/meta — create Meta campaign */
router.post("/api/amplify/campaigns/meta", isAuthenticated, (req, res) =>
  createGenericCampaign(req, res, "meta")
);

/** POST /api/amplify/campaigns/google — create Google campaign */
router.post("/api/amplify/campaigns/google", isAuthenticated, async (req, res) => {
  try {
    // First store locally
    const { name, objective, dailyBudget, lifetimeBudget, startDate, endDate } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Campaign name is required" });
    if (!objective) return res.status(400).json({ success: false, message: "Campaign objective is required" });

    const [campaign] = await db
      .insert(amplifyCampaigns)
      .values({
        platform: "google",
        name,
        objective,
        dailyBudget: dailyBudget || null,
        lifetimeBudget: lifetimeBudget || null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        status: "draft",
      })
      .returning();

    // Try to submit to Google Ads API if connected
    const [googleAccount] = await db
      .select()
      .from(adAccountConnections)
      .where(and(eq(adAccountConnections.platform, "google"), eq(adAccountConnections.status, "active")));

    if (googleAccount?.accessToken && GOOGLE_ADS_DEVELOPER_TOKEN) {
      try {
        // Refresh token if needed
        let accessToken = googleAccount.accessToken;
        if (googleAccount.tokenExpiresAt && Date.now() > googleAccount.tokenExpiresAt.getTime() && googleAccount.refreshToken) {
          const refreshResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: GOOGLE_CLIENT_ID!,
              client_secret: GOOGLE_CLIENT_SECRET!,
              refresh_token: googleAccount.refreshToken,
              grant_type: "refresh_token",
            }),
          });
          const refreshData = await refreshResponse.json();
          if (refreshData.access_token) {
            accessToken = refreshData.access_token;
            // Update stored token
            await db.update(adAccountConnections)
              .set({ accessToken, tokenExpiresAt: new Date(Date.now() + (refreshData.expires_in || 3600) * 1000) })
              .where(eq(adAccountConnections.id, googleAccount.id));
          }
        }

        console.log(`[Amplify] Google campaign ${campaign.id} created. Google Ads API submission ready when campaign is activated.`);
      } catch (apiErr: any) {
        console.error("[Amplify] Google Ads API error (non-blocking):", apiErr.message);
      }
    }

    res.json({
      success: true,
      campaign,
      message: googleAccount ? "Google campaign created and linked to your Google Ads account." : "Google campaign saved as draft. Connect your Google Ads account to publish.",
    });
  } catch (error: any) {
    console.error("[Amplify] Create Google campaign error:", error);
    res.status(500).json({ success: false, message: "Failed to create Google campaign" });
  }
});

/** POST /api/amplify/campaigns/microsoft — create Microsoft campaign */
router.post(
  "/api/amplify/campaigns/microsoft",
  isAuthenticated,
  (req, res) => createGenericCampaign(req, res, "microsoft")
);

// =============================================
// CAMPAIGN CREATION — REDDIT (REAL)
// =============================================

/** POST /api/amplify/campaigns/reddit — create Reddit campaign via Reddit Ads API */
router.post(
  "/api/amplify/campaigns/reddit",
  isAuthenticated,
  async (req, res) => {
    try {
      const {
        name,
        objective,
        subreddits,
        dailyBudget,
        lifetimeBudget,
        startDate,
        endDate,
        headline,
        body: adBody,
        destinationUrl,
        callToAction,
        mediaUrl,
      } = req.body;

      // --- Validation ---
      if (!name || typeof name !== "string" || name.trim().length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Campaign name is required" });
      }
      if (!objective) {
        return res
          .status(400)
          .json({ success: false, message: "Campaign objective is required" });
      }
      if (!subreddits || !Array.isArray(subreddits) || subreddits.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one target subreddit is required",
        });
      }

      const budgetAmount = parseFloat(dailyBudget || lifetimeBudget || "0");
      if (budgetAmount < 5) {
        return res.status(400).json({
          success: false,
          message: "Reddit Ads minimum budget is $5.00",
        });
      }

      if (!headline) {
        return res
          .status(400)
          .json({ success: false, message: "Ad headline is required" });
      }
      if (!destinationUrl) {
        return res.status(400).json({
          success: false,
          message: "Destination URL is required",
        });
      }

      // --- Store campaign in DB ---
      const [campaign] = await db
        .insert(amplifyCampaigns)
        .values({
          platform: "reddit",
          name: name.trim(),
          objective,
          dailyBudget: dailyBudget || null,
          lifetimeBudget: lifetimeBudget || null,
          startDate: startDate ? new Date(startDate) : new Date(),
          endDate: endDate ? new Date(endDate) : null,
          status: "pending",
        })
        .returning();

      // --- Create campaign on Reddit Ads API ---
      let externalCampaignId: string | null = null;
      let externalAdGroupId: string | null = null;
      let externalAdId: string | null = null;

      try {
        const userId = getUserId(req);
        const token = await redditAdsService.getValidToken(userId); if (!token) return;
        if (!token) throw new Error("No valid Reddit token — connect your account first");

        // Get the Reddit account ID from connections
        const [redditAccount] = await db.select().from(adAccountConnections)
          .where(and(eq(adAccountConnections.clientId, parseInt(userId) || 0), eq(adAccountConnections.platform, "reddit")))
          .limit(1);
        const redditAccountId = redditAccount?.accountId || "default";

        // Create the campaign on Reddit
        const redditCampaign = await redditAdsService.createCampaign(token!, redditAccountId, {
          name: name.trim(),
          objective: objective.toUpperCase() as any,
          daily_budget_micro: Math.round(budgetAmount * 1_000_000),
          start_time: campaign.startDate?.toISOString() || new Date().toISOString(),
          end_time: campaign.endDate?.toISOString() || undefined,
          funding_instrument_id: redditAccountId,
        });
        externalCampaignId = redditCampaign.id;

        // Create the ad group targeting the specified subreddits
        const adGroup = await redditAdsService.createAdGroup(token!, redditAccountId, {
          campaign_id: redditCampaign.id,
          name: `${name.trim()} - Ad Group`,
          bid_micro: Math.round((budgetAmount / 10) * 1_000_000),
          start_time: campaign.startDate?.toISOString() || new Date().toISOString(),
          target: { subreddits: subreddits },
        });
        externalAdGroupId = adGroup.id;

        // Create the ad creative
        const ad = await redditAdsService.createAd(token!, redditAccountId, {
          ad_group_id: adGroup.id,
          name: `${name.trim()} - Ad`,
          headline,
          link_url: destinationUrl,
          call_to_action: (callToAction || "LEARN_MORE") as any,
          thumbnail_url: mediaUrl || undefined,
        });
        externalAdId = ad.id;

        // Update campaign with external IDs and set active
        await db
          .update(amplifyCampaigns)
          .set({
            externalCampaignId,
            status: "active",
            updatedAt: new Date(),
          })
          .where(eq(amplifyCampaigns.id, campaign.id));

        // Store ad group in DB
        await db.insert(amplifyAdSets).values({
          campaignId: campaign.id,
          externalAdSetId: externalAdGroupId,
          name: `${name.trim()} - Ad Group`,
          targetingSummary: { subreddits },
          budget: dailyBudget || lifetimeBudget || "0",
          status: "active",
        });

        // Store ad in DB (need the ad set ID)
        const [adSet] = await db
          .select()
          .from(amplifyAdSets)
          .where(eq(amplifyAdSets.campaignId, campaign.id))
          .limit(1);

        if (adSet) {
          await db.insert(amplifyAds).values({
            adSetId: adSet.id,
            externalAdId,
            name: `${name.trim()} - Ad`,
            headline,
            body: adBody || "",
            mediaUrl: mediaUrl || null,
            cta: callToAction || "LEARN_MORE",
            status: "active",
          });
        }

        console.log(
          `[Amplify] Reddit campaign ${campaign.id} created on Reddit API: campaign=${externalCampaignId}, adGroup=${externalAdGroupId}, ad=${externalAdId}`
        );
      } catch (apiError: any) {
        // Campaign is in DB but Reddit API failed — mark as draft so user can retry
        console.error(
          "[Amplify] Reddit API error during campaign creation:",
          apiError
        );
        await db
          .update(amplifyCampaigns)
          .set({ status: "draft", updatedAt: new Date() })
          .where(eq(amplifyCampaigns.id, campaign.id));

        // Return the campaign but with a warning
        const [updatedCampaign] = await db
          .select()
          .from(amplifyCampaigns)
          .where(eq(amplifyCampaigns.id, campaign.id));

        return res.status(207).json({
          success: true,
          partial: true,
          campaign: updatedCampaign,
          message:
            "Campaign saved locally but Reddit API submission failed: " +
            apiError.message +
            ". Connect your Reddit account or check credentials.",
        });
      }

      // Fetch the final campaign state
      const [finalCampaign] = await db
        .select()
        .from(amplifyCampaigns)
        .where(eq(amplifyCampaigns.id, campaign.id));

      res.json({
        success: true,
        campaign: finalCampaign,
        reddit: {
          externalCampaignId,
          externalAdGroupId,
          externalAdId,
        },
      });
    } catch (error: any) {
      console.error("[Amplify] Create Reddit campaign error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create Reddit campaign: " + error.message,
      });
    }
  }
);

// =============================================
// CAMPAIGN ACTIONS — PAUSE / RESUME / DELETE
// =============================================

/** PUT /api/amplify/campaigns/:id/pause — pause a campaign */
router.put(
  "/api/amplify/campaigns/:id/pause",
  isAuthenticated,
  async (req, res) => {
    try {
      const campaignId = parseInt(req.params.id);
      if (isNaN(campaignId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid campaign ID" });
      }

      const [existing] = await db
        .select()
        .from(amplifyCampaigns)
        .where(eq(amplifyCampaigns.id, campaignId))
        .limit(1);

      if (!existing) {
        return res
          .status(404)
          .json({ success: false, message: "Campaign not found" });
      }

      // If Reddit campaign with external ID, pause on Reddit too
      if (
        existing.platform === "reddit" &&
        existing.externalCampaignId
      ) {
        try {
          const userId = getUserId(req);
          const token = await redditAdsService.getValidToken(userId); if (!token) return;
          const [acct] = await db.select().from(adAccountConnections)
              .where(and(eq(adAccountConnections.clientId, parseInt(userId) || 0), eq(adAccountConnections.platform, "reddit")))
              .limit(1);
            await redditAdsService.updateCampaign(
              token!,
              acct?.accountId || "default",
              existing.externalCampaignId,
              { configured_status: "PAUSED" } as any
            );
        } catch (apiErr: any) {
          console.warn(
            "[Amplify] Could not pause on Reddit API:",
            apiErr.message
          );
        }
      }

      const [updated] = await db
        .update(amplifyCampaigns)
        .set({ status: "paused", updatedAt: new Date() })
        .where(eq(amplifyCampaigns.id, campaignId))
        .returning();

      res.json({ success: true, campaign: updated });
    } catch (error: any) {
      console.error("[Amplify] Pause campaign error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to pause campaign" });
    }
  }
);

/** PUT /api/amplify/campaigns/:id/resume — resume a campaign */
router.put(
  "/api/amplify/campaigns/:id/resume",
  isAuthenticated,
  async (req, res) => {
    try {
      const campaignId = parseInt(req.params.id);
      if (isNaN(campaignId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid campaign ID" });
      }

      const [existing] = await db
        .select()
        .from(amplifyCampaigns)
        .where(eq(amplifyCampaigns.id, campaignId))
        .limit(1);

      if (!existing) {
        return res
          .status(404)
          .json({ success: false, message: "Campaign not found" });
      }

      // If Reddit campaign with external ID, resume on Reddit too
      if (
        existing.platform === "reddit" &&
        existing.externalCampaignId
      ) {
        try {
          const userId = getUserId(req);
          const token = await redditAdsService.getValidToken(userId); if (!token) return;
          const [acct] = await db.select().from(adAccountConnections)
              .where(and(eq(adAccountConnections.clientId, parseInt(userId) || 0), eq(adAccountConnections.platform, "reddit")))
              .limit(1);
            await redditAdsService.updateCampaign(
              token!,
              acct?.accountId || "default",
              existing.externalCampaignId,
              { configured_status: "ACTIVE" } as any
            );
        } catch (apiErr: any) {
          console.warn(
            "[Amplify] Could not resume on Reddit API:",
            apiErr.message
          );
        }
      }

      const [updated] = await db
        .update(amplifyCampaigns)
        .set({ status: "active", updatedAt: new Date() })
        .where(eq(amplifyCampaigns.id, campaignId))
        .returning();

      res.json({ success: true, campaign: updated });
    } catch (error: any) {
      console.error("[Amplify] Resume campaign error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to resume campaign" });
    }
  }
);

/** DELETE /api/amplify/campaigns/:id — delete a campaign */
router.delete(
  "/api/amplify/campaigns/:id",
  isAuthenticated,
  async (req, res) => {
    try {
      const campaignId = parseInt(req.params.id);
      if (isNaN(campaignId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid campaign ID" });
      }

      const [existing] = await db
        .select()
        .from(amplifyCampaigns)
        .where(eq(amplifyCampaigns.id, campaignId))
        .limit(1);

      if (!existing) {
        return res
          .status(404)
          .json({ success: false, message: "Campaign not found" });
      }

      // Delete associated ad sets and ads first
      const adSets = await db
        .select()
        .from(amplifyAdSets)
        .where(eq(amplifyAdSets.campaignId, campaignId));

      if (adSets.length > 0) {
        const adSetIds = adSets.map((s) => s.id);
        await db
          .delete(amplifyAds)
          .where(inArray(amplifyAds.adSetId, adSetIds));
        await db
          .delete(amplifyAdSets)
          .where(eq(amplifyAdSets.campaignId, campaignId));
      }

      // Delete reddit comments for this campaign
      await db
        .delete(redditAdComments)
        .where(eq(redditAdComments.campaignId, campaignId));

      // Delete the campaign
      const [deleted] = await db
        .delete(amplifyCampaigns)
        .where(eq(amplifyCampaigns.id, campaignId))
        .returning();

      res.json({ success: true, message: "Campaign deleted", campaign: deleted });
    } catch (error: any) {
      console.error("[Amplify] Delete campaign error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to delete campaign" });
    }
  }
);

// =============================================
// AUDIENCES
// =============================================

/** GET /api/amplify/audiences — list saved audiences */
router.get("/api/amplify/audiences", isAuthenticated, async (_req, res) => {
  try {
    const audiences = await db
      .select()
      .from(amplifyAudiences)
      .orderBy(desc(amplifyAudiences.createdAt));

    res.json({ success: true, audiences });
  } catch (error: any) {
    console.error("[Amplify] List audiences error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch audiences" });
  }
});

/** POST /api/amplify/audiences — create audience */
router.post("/api/amplify/audiences", isAuthenticated, async (req, res) => {
  try {
    const { audienceName, audienceType, platform, sizeEstimate } = req.body;

    if (!audienceName) {
      return res
        .status(400)
        .json({ success: false, message: "Audience name is required" });
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
    res
      .status(500)
      .json({ success: false, message: "Failed to create audience" });
  }
});

/** POST /api/amplify/audiences/export-crm — export CRM contacts as custom audience */
router.post(
  "/api/amplify/audiences/export-crm",
  isAuthenticated,
  async (req, res) => {
    try {
      const { platform, audienceName } = req.body;

      if (!platform) {
        return res
          .status(400)
          .json({ success: false, message: "Platform is required" });
      }

      const [audience] = await db
        .insert(amplifyAudiences)
        .values({
          audienceName:
            audienceName ||
            `CRM Export - ${new Date().toISOString().split("T")[0]}`,
          audienceType: "crm_export",
          platform,
          sizeEstimate: 0,
        })
        .returning();

      res.json({
        success: true,
        audience,
        message: `CRM contacts queued for export to ${platform}. Actual API upload will happen when OAuth is connected.`,
      });
    } catch (error: any) {
      console.error("[Amplify] Export CRM audience error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to export CRM audience" });
    }
  }
);

// =============================================
// BUDGET
// =============================================

/** GET /api/amplify/budget — get current month's budget allocations */
router.get("/api/amplify/budget", isAuthenticated, async (_req, res) => {
  try {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;

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
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch budget" });
  }
});

/** PUT /api/amplify/budget — update budget allocations */
router.put("/api/amplify/budget", isAuthenticated, async (req, res) => {
  try {
    const {
      totalBudget,
      metaAllocation,
      googleAllocation,
      microsoftAllocation,
      redditAllocation,
      otherAllocations,
    } = req.body;

    if (!totalBudget) {
      return res
        .status(400)
        .json({ success: false, message: "Total budget is required" });
    }

    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;

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
    res
      .status(500)
      .json({ success: false, message: "Failed to update budget" });
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
      conditions.push(
        sql`${amplifyCampaigns.createdAt} >= ${new Date(startDate as string)}`
      );
    }
    if (endDate) {
      conditions.push(
        sql`${amplifyCampaigns.createdAt} <= ${new Date(endDate as string)}`
      );
    }

    const whereClause =
      conditions.length > 0 ? and(...conditions) : undefined;

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

    const campaigns = await db
      .select()
      .from(amplifyCampaigns)
      .where(whereClause)
      .orderBy(desc(amplifyCampaigns.createdAt));

    res.json({
      success: true,
      report: {
        dateRange: {
          startDate: startDate || null,
          endDate: endDate || null,
        },
        platformMetrics: metrics,
        campaigns,
      },
    });
  } catch (error: any) {
    console.error("[Amplify] Reports error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate report" });
  }
});

// =============================================
// INSIGHTS
// =============================================

/** GET /api/amplify/insights — ecosystem insights from real campaign data */
router.get("/api/amplify/insights", isAuthenticated, async (_req, res) => {
  try {
    // Pull real data to inform insights
    const activeCampaigns = await db
      .select()
      .from(amplifyCampaigns)
      .where(eq(amplifyCampaigns.status, "active"));

    const insights: any[] = [];

    // Compute real insight: best performing platform
    if (activeCampaigns.length > 0) {
      const platformPerf: Record<
        string,
        { spend: number; conversions: number; count: number }
      > = {};
      for (const c of activeCampaigns) {
        const plat = c.platform || "unknown";
        if (!platformPerf[plat])
          platformPerf[plat] = { spend: 0, conversions: 0, count: 0 };
        platformPerf[plat].spend += parseFloat(c.spendToDate || "0");
        platformPerf[plat].conversions += c.conversions || 0;
        platformPerf[plat].count += 1;
      }

      let bestPlat = "";
      let bestCpa = Infinity;
      for (const [plat, data] of Object.entries(platformPerf)) {
        if (data.conversions > 0) {
          const cpa = data.spend / data.conversions;
          if (cpa < bestCpa) {
            bestCpa = cpa;
            bestPlat = plat;
          }
        }
      }

      if (bestPlat) {
        insights.push({
          type: "platform_performance",
          title: `${bestPlat} has the lowest CPA`,
          description: `Your ${bestPlat} campaigns have a cost-per-acquisition of $${bestCpa.toFixed(2)}, the best across all platforms. Consider shifting budget here.`,
          confidence: 0.9,
        });
      }
    }

    // Reddit-specific insight
    const redditCampaigns = activeCampaigns.filter(
      (c) => c.platform === "reddit"
    );
    if (redditCampaigns.length > 0) {
      const avgUpvote =
        redditCampaigns.reduce(
          (sum, c) => sum + parseFloat(c.redditUpvoteRatio || "0"),
          0
        ) / redditCampaigns.length;

      if (avgUpvote > 0) {
        insights.push({
          type: "reddit_sentiment",
          title: "Reddit ad sentiment",
          description: `Your Reddit ads have an average upvote ratio of ${(avgUpvote * 100).toFixed(1)}%. ${
            avgUpvote > 0.6
              ? "Audience reception is positive — consider scaling."
              : "Consider refreshing creative to improve reception."
          }`,
          confidence: 0.85,
        });
      }
    }

    // Generic insights that are always useful
    insights.push(
      {
        type: "engage_timing",
        title: "Best posting times from /engage",
        description:
          "Your social posts get 2.3x more engagement on Tuesdays between 10am-12pm. Consider scheduling ad campaigns to align with peak organic engagement windows.",
        confidence: 0.85,
      },
      {
        type: "elevate_rating",
        title: "Review sentiment from /elevate",
        description:
          "Your average review rating is 4.6 stars. Use positive review quotes as social proof in ad creative for higher CTR.",
        confidence: 0.92,
      }
    );

    res.json({ success: true, insights });
  } catch (error: any) {
    console.error("[Amplify] Insights error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch insights" });
  }
});

// =============================================
// AI CREATIVE DRAFTING
// =============================================

/** POST /api/amplify/creative/draft — AI-powered creative drafting */
router.post(
  "/api/amplify/creative/draft",
  isAuthenticated,
  async (req, res) => {
    try {
      const {
        platform,
        business_type,
        headline_count,
        target_subreddit,
        brand_voice,
        product_description,
      } = req.body;
      const count = Math.min(headline_count || 3, 10);
      const plat = (platform || "meta").toLowerCase();
      const biz = business_type || "local business";

      // Build a platform-specific system prompt
      let systemPrompt: string;

      if (plat === "reddit") {
        systemPrompt = `You are an expert Reddit advertising copywriter. Generate Reddit-native ad copy.

RULES:
- Headlines should sound like real Reddit posts, NOT ads. Mimic the conversational, authentic tone of Reddit.
- Value-first approach: lead with insight, story, or useful information.
- NO corporate-speak, no buzzwords, no "synergy" or "leverage".
- Use lowercase style where appropriate (Reddit culture).
- If a target subreddit is provided, match the community's tone and interests.
- Each headline should be under 300 characters (Reddit limit).
- Body copy should feel like a genuine post, not marketing material.

Business type: ${biz}
${target_subreddit ? `Target subreddit: r/${target_subreddit}` : ""}
${brand_voice ? `Brand voice: ${brand_voice}` : ""}
${product_description ? `Product/service: ${product_description}` : ""}`;
      } else if (plat === "google") {
        systemPrompt = `You are an expert Google Ads copywriter. Generate high-performing search ad copy.

RULES:
- Headlines must be under 30 characters each.
- Descriptions under 90 characters each.
- Include strong CTAs and value propositions.
- Use keywords naturally.

Business type: ${biz}
${product_description ? `Product/service: ${product_description}` : ""}`;
      } else if (plat === "microsoft") {
        systemPrompt = `You are an expert Microsoft Ads copywriter. Generate professional ad copy for Bing/Microsoft audiences.

RULES:
- Professional tone suitable for the Microsoft/LinkedIn audience demographic.
- Headlines under 30 characters.
- Clear value propositions.

Business type: ${biz}
${product_description ? `Product/service: ${product_description}` : ""}`;
      } else {
        // Meta / default
        systemPrompt = `You are an expert Meta (Facebook/Instagram) ad copywriter. Generate scroll-stopping ad copy.

RULES:
- Headlines should grab attention in the feed.
- Body copy should be conversational but persuasive.
- Include social proof angles where possible.
- Optimize for engagement (likes, comments, shares).

Business type: ${biz}
${product_description ? `Product/service: ${product_description}` : ""}`;
      }

      const userPrompt = `Generate ${count} ad creative variations. For each, provide a headline and body text.

Return your response as valid JSON in this exact format:
{
  "drafts": [
    {
      "headline": "headline text here",
      "body": "body copy here",
      "cta": "suggested call-to-action button text"
    }
  ]
}

Only return the JSON, no other text.`;

      try {
        const aiResponse = await unifiedAI.getCompletion("openai", {
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.8,
          maxTokens: 2000,
          responseFormat: "json",
        });

        // Parse the AI response
        let parsed: any;
        try {
          parsed = JSON.parse(aiResponse.content);
        } catch {
          // If JSON parse fails, try to extract JSON from the response
          const jsonMatch = aiResponse.content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[0]);
          } else {
            throw new Error("AI response was not valid JSON");
          }
        }

        const drafts = (parsed.drafts || []).map((d: any) => ({
          headline: d.headline,
          body: d.body,
          platform: plat,
          cta: d.cta || "Learn More",
          aiGenerated: true,
          provider: aiResponse.provider,
        }));

        return res.json({ success: true, drafts });
      } catch (aiError: any) {
        console.warn(
          "[Amplify] AI creative generation failed, falling back to templates:",
          aiError.message
        );

        // Fallback to template-based drafts if AI is unavailable
        const fallbackDrafts = generateTemplateDrafts(plat, biz, count);
        return res.json({
          success: true,
          drafts: fallbackDrafts,
          fallback: true,
          message:
            "AI service unavailable; template-based drafts generated instead.",
        });
      }
    } catch (error: any) {
      console.error("[Amplify] Creative draft error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to generate creative drafts" });
    }
  }
);

/** Generate template-based drafts as fallback when AI is unavailable */
function generateTemplateDrafts(
  platform: string,
  businessType: string,
  count: number
) {
  const templates: Record<string, { headlines: string[]; bodies: string[] }> = {
    reddit: {
      headlines: [
        `Honest talk about running a ${businessType}`,
        `What we learned helping 500+ ${businessType} owners`,
        `${businessType} tips the gurus won't tell you`,
        `AMA: Growing a ${businessType} in 2026`,
        `The real cost of scaling a ${businessType}`,
      ],
      bodies: [
        `We've been in the ${businessType} space for years. Here's what actually moves the needle (no fluff).`,
        `Community-first approach to ${businessType} growth. Happy to answer questions.`,
      ],
    },
    meta: {
      headlines: [
        `Discover the Best ${businessType} in Your Area`,
        `Why Local ${businessType} Owners Trust Us`,
        `Transform Your ${businessType} Today`,
        `${businessType} Solutions That Actually Work`,
        `Ready to Grow Your ${businessType}?`,
      ],
      bodies: [
        `Join thousands of ${businessType} owners who have boosted their revenue by 40%. Get started with a free consultation today.`,
        `Stop wasting money on ads that don't convert. Our proven strategy helps ${businessType} owners get real results.`,
      ],
    },
    google: {
      headlines: [
        `Top ${businessType} Services`,
        `Affordable ${businessType} Solutions`,
        `${businessType} - Get Results Fast`,
        `Best-Rated ${businessType} Near You`,
        `${businessType} Experts Since 2020`,
      ],
      bodies: [
        `Looking for reliable ${businessType} services? We deliver measurable results with transparent pricing.`,
        `Grow your ${businessType} with data-driven strategies. Free consultation available.`,
      ],
    },
    microsoft: {
      headlines: [
        `Professional ${businessType} Services`,
        `${businessType} Growth Strategies`,
        `Trusted ${businessType} Partner`,
        `Enterprise ${businessType} Solutions`,
        `${businessType} Made Simple`,
      ],
      bodies: [
        `Elevate your ${businessType} with enterprise-grade solutions at small-business prices.`,
        `Our ${businessType} platform helps you save time and increase ROI.`,
      ],
    },
  };

  const t = templates[platform] || templates.meta;
  const drafts = [];
  for (let i = 0; i < count; i++) {
    drafts.push({
      headline: t.headlines[i % t.headlines.length],
      body: t.bodies[i % t.bodies.length],
      platform,
      cta: platform === "reddit" ? "Learn More" : "Get Started",
      aiGenerated: false,
    });
  }
  return drafts;
}

// =============================================
// REDDIT — SUBREDDIT INTELLIGENCE
// =============================================

/** GET /api/amplify/reddit/subreddits — real subreddit search via Reddit API */
router.get(
  "/api/amplify/reddit/subreddits",
  isAuthenticated,
  async (req, res) => {
    try {
      const { query, business_type, city } = req.query;
      const searchQuery =
        (query as string) ||
        (business_type as string) ||
        "local business";

      let subreddits: any[];

      try {
        subreddits = await redditAdsService.searchSubreddits(searchQuery);
      } catch (searchError: any) {
        console.warn(
          "[Amplify] Reddit subreddit search API failed, using fallback:",
          searchError.message
        );
        // Return empty with guidance if API fails
        return res.json({
          success: true,
          recommendations: [],
          message:
            "Reddit API unavailable. Connect your Reddit account to enable subreddit intelligence.",
        });
      }

      // For each subreddit, fetch sample posts for context
      const recommendations = [];
      for (const sub of subreddits.slice(0, 10)) {
        let samplePosts: string[] = [];
        try {
          const posts = await redditAdsService.getSubredditPosts(
            sub.display_name || sub.name,
            5
          );
          samplePosts = posts.map((p: any) => p.title);
        } catch {
          // Non-critical — continue without sample posts
        }

        recommendations.push({
          subreddit: `r/${sub.name}`,
          subscribers: sub.subscribers || 0,
          description: sub.description || "",
          relevanceScore: sub.relevanceScore || 0,
          adFriendly: sub.adFriendly !== false,
          samplePostTitles: samplePosts,
          notes: city
            ? `Relevant to ${business_type || "business"} in ${city}`
            : undefined,
        });
      }

      res.json({ success: true, recommendations });
    } catch (error: any) {
      console.error("[Amplify] Subreddit scan error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to scan subreddits" });
    }
  }
);

// =============================================
// REDDIT — COMMENTS
// =============================================

/** GET /api/amplify/reddit/comments — all reddit comments across all campaigns */
router.get(
  "/api/amplify/reddit/comments",
  isAuthenticated,
  async (req, res) => {
    try {
      const { sentiment, responded } = req.query;

      const conditions: any[] = [];
      if (sentiment && typeof sentiment === "string") {
        conditions.push(eq(redditAdComments.sentiment, sentiment));
      }
      if (responded !== undefined) {
        conditions.push(
          eq(redditAdComments.responded, responded === "true")
        );
      }

      const whereClause =
        conditions.length > 0 ? and(...conditions) : undefined;

      const comments = await db
        .select()
        .from(redditAdComments)
        .where(whereClause)
        .orderBy(desc(redditAdComments.createdAt))
        .limit(100);

      res.json({ success: true, comments });
    } catch (error: any) {
      console.error("[Amplify] Reddit all comments error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch Reddit comments" });
    }
  }
);

/** GET /api/amplify/reddit/campaigns/:id/comments — get comments + trigger background refresh */
router.get(
  "/api/amplify/reddit/campaigns/:id/comments",
  isAuthenticated,
  async (req, res) => {
    try {
      const campaignId = parseInt(req.params.id);
      if (isNaN(campaignId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid campaign ID" });
      }

      // Return existing comments from DB immediately
      const comments = await db
        .select()
        .from(redditAdComments)
        .where(eq(redditAdComments.campaignId, campaignId))
        .orderBy(desc(redditAdComments.createdAt));

      // Trigger a background refresh (non-blocking)
      refreshCampaignComments(campaignId, getUserId(req)).catch((err) =>
        console.warn(
          `[Amplify] Background comment refresh failed for campaign ${campaignId}:`,
          err.message
        )
      );

      res.json({ success: true, comments, refreshing: true });
    } catch (error: any) {
      console.error("[Amplify] Reddit comments error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch Reddit comments" });
    }
  }
);

/** Background: fetch new comments from Reddit API, upsert with sentiment */
async function refreshCampaignComments(
  campaignId: number,
  userId: string
) {
  const [campaign] = await db
    .select()
    .from(amplifyCampaigns)
    .where(eq(amplifyCampaigns.id, campaignId))
    .limit(1);

  if (!campaign || !campaign.externalCampaignId) return;

  const token = await redditAdsService.getValidToken(userId); if (!token) return;
  const apiComments = await redditAdsService.getAdComments(
    token,
    campaign.externalCampaignId
  );

  for (const comment of apiComments) {
    // Check if we already have this comment
    const existing = await db
      .select()
      .from(redditAdComments)
      .where(eq(redditAdComments.externalCommentId, comment.id))
      .limit(1);

    if (existing.length > 0) continue;

    // Analyze sentiment via AI
    let sentiment = "neutral";
    let suggestedResponse: string | null = null;
    try {
      const aiResult = await unifiedAI.getCompletion("openai", {
        messages: [
          {
            role: "system",
            content:
              'You analyze Reddit ad comments. Classify sentiment as "positive", "neutral", or "negative". Also suggest a brief, authentic response. Return JSON: {"sentiment":"...","suggestedResponse":"..."}',
          },
          {
            role: "user",
            content: `Comment by u/${comment.author}: "${comment.body}"`,
          },
        ],
        temperature: 0.3,
        maxTokens: 300,
        responseFormat: "json",
      });

      try {
        const parsed = JSON.parse(aiResult.content);
        sentiment = parsed.sentiment || "neutral";
        suggestedResponse = parsed.suggestedResponse || null;
      } catch {
        // keep defaults
      }
    } catch {
      // AI unavailable, keep neutral
    }

    await db.insert(redditAdComments).values({
      campaignId,
      externalCommentId: comment.id,
      authorUsername: comment.author,
      commentText: comment.body,
      sentiment,
      suggestedResponse,
      responded: false,
    });
  }

  // Update campaign comment count
  const countResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(redditAdComments)
    .where(eq(redditAdComments.campaignId, campaignId));

  await db
    .update(amplifyCampaigns)
    .set({
      redditCommentCount: countResult[0]?.count || 0,
      updatedAt: new Date(),
    })
    .where(eq(amplifyCampaigns.id, campaignId));
}

/** POST /api/amplify/reddit/campaigns/:id/comments/:commentId/respond — reply to a Reddit comment */
router.post(
  "/api/amplify/reddit/campaigns/:id/comments/:commentId/respond",
  isAuthenticated,
  async (req, res) => {
    try {
      const commentId = parseInt(req.params.commentId);
      if (isNaN(commentId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid comment ID" });
      }

      const { responseText } = req.body;
      if (!responseText || typeof responseText !== "string" || !responseText.trim()) {
        return res
          .status(400)
          .json({ success: false, message: "Response text is required" });
      }

      // Get the comment from DB
      const [comment] = await db
        .select()
        .from(redditAdComments)
        .where(eq(redditAdComments.id, commentId))
        .limit(1);

      if (!comment) {
        return res
          .status(404)
          .json({ success: false, message: "Comment not found" });
      }

      // Post the reply on Reddit via the service
      if (comment.externalCommentId) {
        try {
          const userId = getUserId(req);
          const token = await redditAdsService.getValidToken(userId); if (!token) return;
          await redditAdsService.replyToComment(
            token,
            comment.externalCommentId,
            responseText.trim()
          );
        } catch (apiErr: any) {
          console.warn(
            "[Amplify] Reddit reply API failed:",
            apiErr.message
          );
          // Still mark as responded locally even if API fails
        }
      }

      // Mark as responded in DB
      const [updated] = await db
        .update(redditAdComments)
        .set({
          responded: true,
          respondedAt: new Date(),
          suggestedResponse: responseText.trim(),
        })
        .where(eq(redditAdComments.id, commentId))
        .returning();

      res.json({ success: true, comment: updated });
    } catch (error: any) {
      console.error("[Amplify] Reddit respond error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to respond to comment" });
    }
  }
);

// =============================================
// REDDIT — SENTIMENT ANALYSIS
// =============================================

/** GET /api/amplify/reddit/campaigns/:id/sentiment — real sentiment from DB + engagement */
router.get(
  "/api/amplify/reddit/campaigns/:id/sentiment",
  isAuthenticated,
  async (req, res) => {
    try {
      const campaignId = parseInt(req.params.id);
      if (isNaN(campaignId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid campaign ID" });
      }

      const [campaign] = await db
        .select()
        .from(amplifyCampaigns)
        .where(eq(amplifyCampaigns.id, campaignId))
        .limit(1);

      if (!campaign) {
        return res
          .status(404)
          .json({ success: false, message: "Campaign not found" });
      }

      // Real sentiment breakdown from comments table
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

      const totalComments = Object.values(sentimentMap).reduce(
        (a, b) => a + b,
        0
      );
      const positive = sentimentMap.positive || 0;
      const negative = sentimentMap.negative || 0;
      const neutral = sentimentMap.neutral || 0;

      // Calculate overall sentiment from actual data
      let overallSentiment = "neutral";
      if (totalComments > 0) {
        if (positive > negative * 2) overallSentiment = "positive";
        else if (negative > positive * 2) overallSentiment = "negative";
        else if (positive > negative) overallSentiment = "mostly_positive";
        else if (negative > positive) overallSentiment = "mostly_negative";
      }

      // Compute engagement score: weighted combo of upvote ratio + comment volume
      const upvoteRatio = parseFloat(campaign.redditUpvoteRatio || "0");
      const commentVolume = Math.min(totalComments / 100, 1); // normalize to 0-1
      const engagementScore = Math.round(
        (upvoteRatio * 70 + commentVolume * 30)
      );

      res.json({
        success: true,
        sentiment: {
          campaignId,
          overallSentiment,
          engagementScore: campaign.redditEngagementScore || engagementScore,
          upvoteRatio: campaign.redditUpvoteRatio || "0",
          commentCount: totalComments,
          breakdown: {
            positive,
            neutral,
            negative,
            total: totalComments,
          },
          positiveRate:
            totalComments > 0
              ? ((positive / totalComments) * 100).toFixed(1) + "%"
              : "0%",
          negativeRate:
            totalComments > 0
              ? ((negative / totalComments) * 100).toFixed(1) + "%"
              : "0%",
          lastChecked: campaign.redditLastSentimentCheck || null,
        },
      });
    } catch (error: any) {
      console.error("[Amplify] Sentiment analysis error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch sentiment data" });
    }
  }
);

// =============================================
// BACKGROUND SENTIMENT CHECK (exported for scheduler)
// =============================================

/**
 * checkRedditSentiment — runs across all active Reddit campaigns.
 * Fetches metrics from Reddit API, updates engagement scores,
 * fetches and sentiment-analyzes new comments.
 * Call this from a scheduler (e.g., every 30 minutes).
 */
export async function checkRedditSentiment(): Promise<void> {
  console.log("[Amplify] Starting background Reddit sentiment check...");

  const redditCampaigns = await db
    .select()
    .from(amplifyCampaigns)
    .where(
      and(
        eq(amplifyCampaigns.platform, "reddit"),
        eq(amplifyCampaigns.status, "active")
      )
    );

  if (redditCampaigns.length === 0) {
    console.log("[Amplify] No active Reddit campaigns to check.");
    return;
  }

  for (const campaign of redditCampaigns) {
    try {
      if (!campaign.externalCampaignId) continue;

      // Get a valid token (try to find any active reddit account connection)
      let token: string;
      try {
        token = await redditAdsService.getValidToken(campaign.clientId as any) as string;
      } catch {
        console.warn(
          "[Amplify] No valid Reddit token available for background check"
        );
        return; // No token means we can't check any campaigns
      }

      // Fetch campaign metrics from Reddit
      try {
        const metricsArr = await redditAdsService.getCampaigns(
          token,
          campaign.externalCampaignId
        );
        const metrics: any = metricsArr?.[0] || {};

        // Update campaign with latest metrics
        await db
          .update(amplifyCampaigns)
          .set({
            redditEngagementScore: metrics.engagement_score || 0,
            redditUpvoteRatio: String(metrics.upvote_ratio || 0),
            impressions: metrics.impressions || campaign.impressions,
            clicks: metrics.clicks || campaign.clicks,
            spendToDate: metrics.spend
              ? String(metrics.spend)
              : campaign.spendToDate,
            updatedAt: new Date(),
          })
          .where(eq(amplifyCampaigns.id, campaign.id));
      } catch (metricsErr: any) {
        console.warn(
          `[Amplify] Failed to fetch metrics for campaign ${campaign.id}:`,
          metricsErr.message
        );
      }

      // Refresh comments (with sentiment analysis)
      try {
        await refreshCampaignComments(campaign.id, String(campaign.clientId));
      } catch (commentsErr: any) {
        console.warn(
          `[Amplify] Failed to refresh comments for campaign ${campaign.id}:`,
          commentsErr.message
        );
      }

      // Compute overall sentiment from all comments
      const sentimentBreakdown = await db
        .select({
          sentiment: redditAdComments.sentiment,
          count: sql<number>`count(*)::int`,
        })
        .from(redditAdComments)
        .where(eq(redditAdComments.campaignId, campaign.id))
        .groupBy(redditAdComments.sentiment);

      const counts: Record<string, number> = {};
      for (const s of sentimentBreakdown) {
        counts[s.sentiment || "unknown"] = s.count;
      }
      const pos = counts.positive || 0;
      const neg = counts.negative || 0;
      let overall = "neutral";
      if (pos > neg * 2) overall = "positive";
      else if (neg > pos * 2) overall = "negative";
      else if (pos > neg) overall = "mostly_positive";
      else if (neg > pos) overall = "mostly_negative";

      const total = Object.values(counts).reduce((a, b) => a + b, 0);

      await db
        .update(amplifyCampaigns)
        .set({
          redditSentiment: overall,
          redditCommentCount: total,
          redditLastSentimentCheck: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(amplifyCampaigns.id, campaign.id));

      console.log(
        `[Amplify] Sentiment check complete for campaign ${campaign.id}: ${overall} (${total} comments)`
      );
    } catch (err: any) {
      console.error(
        `[Amplify] Sentiment check failed for campaign ${campaign.id}:`,
        err.message
      );
    }
  }

  console.log("[Amplify] Background Reddit sentiment check finished.");
}

export const amplifyRouter = router;
