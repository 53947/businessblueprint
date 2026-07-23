/**
 * Snapchat OAuth Integration for / amplify
 * Handles OAuth2 flow for connecting Snapchat Ads accounts
 */

import { Router, Request, Response } from "express";
import { db } from "../db";
import { adAccountConnections } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

const router = Router();

const SNAP_CLIENT_ID = process.env.SNAP_CLIENT_ID;
const SNAP_CLIENT_SECRET = process.env.SNAP_CLIENT_SECRET;
const SNAP_STATE_SECRET = process.env.SNAP_CLIENT_SECRET || "snap-fallback-secret";

const SNAP_SCOPES = ["snapchat-marketing-api"];

const ALLOWED_RETURN_PATHS = ["/amplify/dashboard", "/portal/dashboard"];

function signState(data: object): string {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64");
  const signature = crypto.createHmac("sha256", SNAP_STATE_SECRET).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

function verifyState(state: string): { valid: boolean; data?: any } {
  try {
    const [payload, signature] = state.split(".");
    if (!payload || !signature) return { valid: false };
    const expected = crypto.createHmac("sha256", SNAP_STATE_SECRET).update(payload).digest("hex");
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
  return `${req.protocol}://${req.get("host")}/api/snapchat/oauth/callback`;
}

/**
 * GET /oauth/start — Start Snapchat OAuth Flow
 */
router.get("/oauth/start", (req: Request, res: Response) => {
  try {
    const clientId = req.query.clientId as string;
    const returnUrl = req.query.returnUrl as string;

    if (!clientId || isNaN(parseInt(clientId))) {
      return res.status(400).json({ error: "Valid clientId is required" });
    }

    if (!SNAP_CLIENT_ID || !SNAP_CLIENT_SECRET) {
      return res.status(500).json({ error: "Snapchat OAuth not configured. Set SNAP_CLIENT_ID and SNAP_CLIENT_SECRET." });
    }

    const safeReturnUrl = isValidReturnPath(returnUrl) ? returnUrl : "/amplify/dashboard";
    const state = signState({
      clientId: parseInt(clientId),
      returnUrl: safeReturnUrl,
      nonce: crypto.randomBytes(16).toString("hex"),
      timestamp: Date.now(),
    });

    const redirectUri = getRedirectUri(req);
    const authUrl = new URL("https://accounts.snapchat.com/login/oauth2/authorize");
    authUrl.searchParams.set("client_id", SNAP_CLIENT_ID);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", SNAP_SCOPES.join(" "));
    authUrl.searchParams.set("state", state);

    console.log(`[Snapchat] Starting OAuth for client ${clientId}`);
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error("[Snapchat] OAuth start error:", error);
    res.status(500).json({ error: "Failed to start OAuth flow" });
  }
});

/**
 * GET /oauth/callback — Snapchat OAuth Callback
 */
router.get("/oauth/callback", async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const stateParam = req.query.state as string;
    const error = req.query.error as string;

    if (error || !code) {
      return res.redirect("/amplify/dashboard?oauth=error&platform=snapchat");
    }

    const stateResult = verifyState(stateParam);
    if (!stateResult.valid || !stateResult.data) {
      return res.status(403).json({ error: "Invalid state" });
    }

    const stateAge = Date.now() - (stateResult.data.timestamp || 0);
    if (stateAge > 10 * 60 * 1000) {
      return res.status(400).json({ error: "OAuth session expired" });
    }

    const returnUrl: string = isValidReturnPath(stateResult.data.returnUrl) ? stateResult.data.returnUrl : "/amplify/dashboard";

    // Exchange code for tokens
    const tokenResponse = await fetch("https://accounts.snapchat.com/login/oauth2/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: SNAP_CLIENT_ID!,
        client_secret: SNAP_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: getRedirectUri(req),
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("[Snapchat] Token exchange failed:", tokenData);
      return res.redirect(`${returnUrl}?oauth=error&platform=snapchat`);
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;
    const expiresIn = tokenData.expires_in;

    // Get authenticated user's ad accounts
    const meResponse = await fetch("https://adsapi.snapchat.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const meData = await meResponse.json();
    const accountName = meData.me?.display_name || meData.me?.email || "Snapchat Ads";

    // Get organizations
    const orgsResponse = await fetch("https://adsapi.snapchat.com/v1/me/organizations", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const orgsData = await orgsResponse.json();
    const orgId = orgsData.organizations?.[0]?.organization?.id;

    // Store the connection
    await db.insert(adAccountConnections).values({
      platform: "snapchat",
      accountName,
      status: "active",
      accessToken,
      refreshToken,
      tokenExpiresAt: new Date(Date.now() + (expiresIn || 1800) * 1000),
    });

    console.log(`[Snapchat] Ads connected: ${accountName}`);
    res.redirect(`${returnUrl}?oauth=success&platform=snapchat`);
  } catch (error) {
    console.error("[Snapchat] OAuth callback error:", error);
    res.redirect("/amplify/dashboard?oauth=error&platform=snapchat");
  }
});

export default router;
