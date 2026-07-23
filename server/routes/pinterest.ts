/**
 * Pinterest OAuth Integration for /amplify
 * Handles OAuth2 flow for connecting Pinterest Ads accounts
 */

import { Router, Request, Response } from "express";
import { db } from "../db";
import { adAccountConnections, socialMediaAccounts } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

const router = Router();

const PINTEREST_CLIENT_ID = process.env.PINTEREST_CLIENT_ID;
const PINTEREST_CLIENT_SECRET = process.env.PINTEREST_CLIENT_SECRET;
const PINTEREST_STATE_SECRET = process.env.PINTEREST_CLIENT_SECRET || "pinterest-fallback-secret";

const PINTEREST_SCOPES = [
  "ads:read",
  "ads:write",
  "boards:read",
  "pins:read",
  "pins:write",
  "user_accounts:read",
];

const ALLOWED_RETURN_PATHS = ["/amplify/dashboard", "/post", "/portal/dashboard"];

function signState(data: object): string {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64");
  const signature = crypto.createHmac("sha256", PINTEREST_STATE_SECRET).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

function verifyState(state: string): { valid: boolean; data?: any } {
  try {
    const [payload, signature] = state.split(".");
    if (!payload || !signature) return { valid: false };
    const expected = crypto.createHmac("sha256", PINTEREST_STATE_SECRET).update(payload).digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return { valid: false };
    return { valid: true, data: JSON.parse(Buffer.from(payload, "base64").toString()) };
  } catch {
    return { valid: false };
  }
}

function isValidReturnPath(path: string): boolean {
  if (!path) return false;
  return path.startsWith("/") && ALLOWED_RETURN_PATHS.some(a => path === a || path.startsWith(a + "?") || path.startsWith(a + "/"));
}

function getRedirectUri(req: Request): string {
  return `${req.protocol}://${req.get("host")}/api/pinterest/oauth/callback`;
}

/**
 * GET /oauth/start — Start Pinterest OAuth Flow
 */
router.get("/oauth/start", (req: Request, res: Response) => {
  try {
    const clientId = req.query.clientId as string;
    const returnUrl = req.query.returnUrl as string;

    if (!clientId || isNaN(parseInt(clientId))) {
      return res.status(400).json({ error: "Valid clientId is required" });
    }

    if (!PINTEREST_CLIENT_ID || !PINTEREST_CLIENT_SECRET) {
      return res.status(500).json({ error: "Pinterest OAuth not configured. Set PINTEREST_CLIENT_ID and PINTEREST_CLIENT_SECRET." });
    }

    const safeReturnUrl = isValidReturnPath(returnUrl) ? returnUrl : "/amplify/dashboard";
    const state = signState({
      clientId: parseInt(clientId),
      returnUrl: safeReturnUrl,
      nonce: crypto.randomBytes(16).toString("hex"),
      timestamp: Date.now(),
    });

    const redirectUri = getRedirectUri(req);
    const authUrl = new URL("https://api.pinterest.com/oauth/");
    authUrl.searchParams.set("client_id", PINTEREST_CLIENT_ID);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", PINTEREST_SCOPES.join(","));
    authUrl.searchParams.set("state", state);

    console.log(`[Pinterest] Starting OAuth for client ${clientId}`);
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error("[Pinterest] OAuth start error:", error);
    res.status(500).json({ error: "Failed to start OAuth flow" });
  }
});

/**
 * GET /oauth/callback — Pinterest OAuth Callback
 */
router.get("/oauth/callback", async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const stateParam = req.query.state as string;
    const error = req.query.error as string;

    if (error || !code) {
      return res.redirect("/amplify/dashboard?oauth=error&platform=pinterest");
    }

    const stateResult = verifyState(stateParam);
    if (!stateResult.valid || !stateResult.data) {
      return res.status(403).json({ error: "Invalid state" });
    }

    const stateAge = Date.now() - (stateResult.data.timestamp || 0);
    if (stateAge > 10 * 60 * 1000) {
      return res.status(400).json({ error: "OAuth session expired" });
    }

    const clientId: number = stateResult.data.clientId;
    const returnUrl: string = isValidReturnPath(stateResult.data.returnUrl) ? stateResult.data.returnUrl : "/amplify/dashboard";

    // Exchange code for tokens
    const basicAuth = Buffer.from(`${PINTEREST_CLIENT_ID}:${PINTEREST_CLIENT_SECRET}`).toString("base64");
    const tokenResponse = await fetch("https://api.pinterest.com/v5/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: getRedirectUri(req),
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("[Pinterest] Token exchange failed:", tokenData);
      return res.redirect(`${returnUrl}?oauth=error&platform=pinterest`);
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;
    const expiresIn = tokenData.expires_in;

    // Get user account info
    const userResponse = await fetch("https://api.pinterest.com/v5/user_account", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userData = await userResponse.json();

    const accountName = userData.username || userData.business_name || "Pinterest Ads";
    const pinterestId = userData.id || userData.username;

    // Store in socialMediaAccounts for content publishing
    const [existingSocial] = await db
      .select()
      .from(socialMediaAccounts)
      .where(
        and(
          eq(socialMediaAccounts.clientId, clientId),
          eq(socialMediaAccounts.platform, "pinterest"),
          eq(socialMediaAccounts.platformAccountId, String(pinterestId)),
        ),
      );

    const tokenExpiry = expiresIn ? new Date(Date.now() + expiresIn * 1000) : null;

    if (existingSocial) {
      await db
        .update(socialMediaAccounts)
        .set({
          accessToken,
          refreshToken: refreshToken || existingSocial.refreshToken,
          tokenExpiresAt: tokenExpiry,
          platformAccountName: accountName,
          isActive: true,
          lastSyncedAt: new Date(),
          updatedAt: new Date(),
          metadata: { profileImage: userData.profile_image },
        })
        .where(eq(socialMediaAccounts.id, existingSocial.id));
    } else {
      await db.insert(socialMediaAccounts).values({
        clientId,
        platform: "pinterest",
        platformAccountId: String(pinterestId),
        platformAccountName: accountName,
        platformAccountHandle: userData.username || null,
        platformAccountAvatar: userData.profile_image || null,
        accessToken,
        refreshToken: refreshToken || null,
        tokenExpiresAt: tokenExpiry,
        accountType: userData.account_type === "BUSINESS" ? "business" : "personal",
        permissions: PINTEREST_SCOPES,
        isActive: true,
        lastSyncedAt: new Date(),
        metadata: { profileImage: userData.profile_image },
      });
    }

    // Also store in adAccountConnections for ads management
    // Get ad accounts
    const adAccountsResponse = await fetch("https://api.pinterest.com/v5/ad_accounts", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const adAccountsData = await adAccountsResponse.json();
    const adAccount = adAccountsData.items?.[0];

    if (adAccount) {
      await db.insert(adAccountConnections).values({
        platform: "pinterest",
        accountName: adAccount.name || accountName,
        accountId: adAccount.id,
        status: "active",
        accessToken,
        refreshToken,
        tokenExpiresAt: new Date(Date.now() + (expiresIn || 2592000) * 1000),
      });
    }

    console.log(`[Pinterest] Connected: ${accountName}`);
    res.redirect(`${returnUrl}?oauth=success&platform=pinterest`);
  } catch (error) {
    console.error("[Pinterest] OAuth callback error:", error);
    res.redirect("/amplify/dashboard?oauth=error&platform=pinterest");
  }
});

export default router;
