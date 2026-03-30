/**
 * TikTok OAuth Integration for / post
 * Handles OAuth2 flow for connecting TikTok accounts for content publishing
 */

import { Router, Request, Response } from "express";
import { db } from "../db";
import { socialMediaAccounts } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

const router = Router();

const TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
const TIKTOK_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
const TIKTOK_STATE_SECRET = process.env.TIKTOK_CLIENT_SECRET || "tiktok-fallback-secret";

const TIKTOK_SCOPES = ["user.info.basic", "video.publish", "video.upload"];

const ALLOWED_RETURN_PATHS = ["/post", "/portal/dashboard"];

function signState(data: object): string {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64");
  const signature = crypto.createHmac("sha256", TIKTOK_STATE_SECRET).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

function verifyState(state: string): { valid: boolean; data?: any } {
  try {
    const [payload, signature] = state.split(".");
    if (!payload || !signature) return { valid: false };
    const expected = crypto.createHmac("sha256", TIKTOK_STATE_SECRET).update(payload).digest("hex");
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
  return `${req.protocol}://${req.get("host")}/api/tiktok/oauth/callback`;
}

/**
 * GET /oauth/start — Start TikTok OAuth Flow
 */
router.get("/oauth/start", (req: Request, res: Response) => {
  try {
    const clientId = req.query.clientId as string;
    const returnUrl = req.query.returnUrl as string;

    if (!clientId || isNaN(parseInt(clientId))) {
      return res.status(400).json({ error: "Valid clientId is required" });
    }

    if (!TIKTOK_CLIENT_KEY || !TIKTOK_CLIENT_SECRET) {
      return res.status(500).json({ error: "TikTok OAuth not configured. Set TIKTOK_CLIENT_KEY and TIKTOK_CLIENT_SECRET." });
    }

    const safeReturnUrl = isValidReturnPath(returnUrl) ? returnUrl : "/post";
    const state = signState({
      clientId: parseInt(clientId),
      returnUrl: safeReturnUrl,
      nonce: crypto.randomBytes(16).toString("hex"),
      timestamp: Date.now(),
    });

    const redirectUri = getRedirectUri(req);
    const authUrl = new URL("https://www.tiktok.com/v2/auth/authorize/");
    authUrl.searchParams.set("client_key", TIKTOK_CLIENT_KEY);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", TIKTOK_SCOPES.join(","));
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("state", state);

    console.log(`[TikTok] Starting OAuth for client ${clientId}`);
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error("[TikTok] OAuth start error:", error);
    res.status(500).json({ error: "Failed to start OAuth flow" });
  }
});

/**
 * GET /oauth/callback — TikTok OAuth Callback
 */
router.get("/oauth/callback", async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const stateParam = req.query.state as string;
    const error = req.query.error as string;

    if (error || !code) {
      return res.redirect("/post?oauth=error&platform=tiktok");
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
    const returnUrl: string = isValidReturnPath(stateResult.data.returnUrl) ? stateResult.data.returnUrl : "/post";

    // Exchange code for tokens
    const tokenResponse = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_key: TIKTOK_CLIENT_KEY!,
        client_secret: TIKTOK_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: getRedirectUri(req),
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("[TikTok] Token exchange failed:", tokenData);
      return res.redirect(`${returnUrl}?oauth=error&platform=tiktok`);
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;
    const expiresIn = tokenData.expires_in;
    const openId = tokenData.open_id;

    // Get user info
    const userResponse = await fetch("https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,avatar_url", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userData = await userResponse.json();
    const userInfo = userData.data?.user || {};
    const displayName = userInfo.display_name || "TikTok User";
    const avatarUrl = userInfo.avatar_url;

    // Store connection
    const [existing] = await db
      .select()
      .from(socialMediaAccounts)
      .where(
        and(
          eq(socialMediaAccounts.clientId, clientId),
          eq(socialMediaAccounts.platform, "tiktok"),
          eq(socialMediaAccounts.platformAccountId, openId),
        ),
      );

    const tokenExpiry = expiresIn ? new Date(Date.now() + expiresIn * 1000) : null;

    if (existing) {
      await db.update(socialMediaAccounts)
        .set({
          accessToken,
          refreshToken: refreshToken || existing.refreshToken,
          tokenExpiresAt: tokenExpiry,
          platformAccountName: displayName,
          isActive: true,
          lastSyncedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(socialMediaAccounts.id, existing.id));
    } else {
      await db.insert(socialMediaAccounts).values({
        clientId,
        platform: "tiktok",
        platformAccountId: openId,
        platformAccountName: displayName,
        platformAccountAvatar: avatarUrl || null,
        accessToken,
        refreshToken: refreshToken || null,
        tokenExpiresAt: tokenExpiry,
        accountType: "personal",
        permissions: TIKTOK_SCOPES,
        isActive: true,
        lastSyncedAt: new Date(),
      });
    }

    console.log(`[TikTok] Connected: ${displayName}`);
    res.redirect(`${returnUrl}?oauth=success&platform=tiktok`);
  } catch (error) {
    console.error("[TikTok] OAuth callback error:", error);
    res.redirect("/post?oauth=error&platform=tiktok");
  }
});

export default router;
