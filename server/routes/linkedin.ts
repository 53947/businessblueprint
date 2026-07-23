/**
 * LinkedIn OAuth Integration for / post
 * Handles OAuth2 flow for connecting LinkedIn accounts for social posting
 */

import { Router, Request, Response } from "express";
import { db } from "../db";
import { socialMediaAccounts } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

const router = Router();

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_STATE_SECRET = process.env.LINKEDIN_CLIENT_SECRET || "linkedin-fallback-secret";

const LINKEDIN_SCOPES = [
  "openid",
  "profile",
  "email",
  "w_member_social",
];

const ALLOWED_RETURN_PATHS = ["/post", "/portal/dashboard", "/amplify/dashboard"];

function signState(data: object): string {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64");
  const signature = crypto
    .createHmac("sha256", LINKEDIN_STATE_SECRET)
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

function verifyState(state: string): { valid: boolean; data?: any } {
  try {
    const [payload, signature] = state.split(".");
    if (!payload || !signature) return { valid: false };
    const expectedSignature = crypto
      .createHmac("sha256", LINKEDIN_STATE_SECRET)
      .update(payload)
      .digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return { valid: false };
    }
    const data = JSON.parse(Buffer.from(payload, "base64").toString());
    return { valid: true, data };
  } catch {
    return { valid: false };
  }
}

function isValidReturnPath(path: string): boolean {
  if (!path) return false;
  return path.startsWith("/") && ALLOWED_RETURN_PATHS.some(allowed =>
    path === allowed || path.startsWith(allowed + "?") || path.startsWith(allowed + "/")
  );
}

function getRedirectUri(req: Request): string {
  const protocol = req.protocol;
  const host = req.get("host");
  return `${protocol}://${host}/api/linkedin/oauth/callback`;
}

/**
 * GET /oauth/start — Start LinkedIn OAuth Flow
 */
router.get("/oauth/start", (req: Request, res: Response) => {
  try {
    const clientId = req.query.clientId as string;
    const returnUrl = req.query.returnUrl as string;

    if (!clientId || isNaN(parseInt(clientId))) {
      return res.status(400).json({ error: "Valid clientId is required" });
    }

    if (!LINKEDIN_CLIENT_ID || !LINKEDIN_CLIENT_SECRET) {
      return res.status(500).json({ error: "LinkedIn OAuth not configured" });
    }

    const safeReturnUrl = isValidReturnPath(returnUrl) ? returnUrl : "/post";

    const stateData = {
      clientId: parseInt(clientId),
      returnUrl: safeReturnUrl,
      nonce: crypto.randomBytes(16).toString("hex"),
      timestamp: Date.now(),
    };
    const state = signState(stateData);

    const redirectUri = getRedirectUri(req);
    const authUrl = new URL("https://www.linkedin.com/oauth/v2/authorization");
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("client_id", LINKEDIN_CLIENT_ID);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", LINKEDIN_SCOPES.join(" "));
    authUrl.searchParams.set("state", state);

    console.log(`[LinkedIn] Starting OAuth for client ${clientId}`);
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error("[LinkedIn] OAuth start error:", error);
    res.status(500).json({ error: "Failed to start OAuth flow" });
  }
});

/**
 * GET /oauth/callback — LinkedIn OAuth Callback
 */
router.get("/oauth/callback", async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const stateParam = req.query.state as string;
    const error = req.query.error as string;

    if (error) {
      console.error("[LinkedIn] OAuth denied:", error);
      return res.redirect("/post?oauth=error&reason=denied&platform=linkedin");
    }

    if (!code || !stateParam) {
      return res.status(400).json({ error: "Missing authorization code or state" });
    }

    const stateResult = verifyState(stateParam);
    if (!stateResult.valid || !stateResult.data) {
      return res.status(403).json({ error: "Invalid state — possible CSRF attack" });
    }

    const stateAge = Date.now() - (stateResult.data.timestamp || 0);
    if (stateAge > 10 * 60 * 1000) {
      return res.status(400).json({ error: "OAuth session expired. Please try again." });
    }

    const clientId: number = stateResult.data.clientId;
    const returnUrl: string = isValidReturnPath(stateResult.data.returnUrl)
      ? stateResult.data.returnUrl
      : "/post";

    // Exchange code for tokens
    const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: LINKEDIN_CLIENT_ID!,
        client_secret: LINKEDIN_CLIENT_SECRET!,
        redirect_uri: getRedirectUri(req),
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("[LinkedIn] Token exchange failed:", tokenData);
      return res.redirect(`${returnUrl}?oauth=error&platform=linkedin`);
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;
    const expiresIn = tokenData.expires_in;

    // Get user profile
    const profileResponse = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const profile = await profileResponse.json();

    const linkedinId = profile.sub || profile.id;
    const profileName = profile.name || `${profile.given_name || ""} ${profile.family_name || ""}`.trim();
    const profileEmail = profile.email;
    const profilePicture = profile.picture;

    // Check if account already connected
    const [existing] = await db
      .select()
      .from(socialMediaAccounts)
      .where(
        and(
          eq(socialMediaAccounts.clientId, clientId),
          eq(socialMediaAccounts.platform, "linkedin"),
          eq(socialMediaAccounts.platformAccountId, linkedinId),
        ),
      );

    const tokenExpiry = expiresIn ? new Date(Date.now() + expiresIn * 1000) : null;

    if (existing) {
      await db
        .update(socialMediaAccounts)
        .set({
          accessToken,
          refreshToken: refreshToken || existing.refreshToken,
          tokenExpiresAt: tokenExpiry,
          platformAccountName: profileName,
          isActive: true,
          lastSyncedAt: new Date(),
          updatedAt: new Date(),
          metadata: { email: profileEmail, picture: profilePicture },
        })
        .where(eq(socialMediaAccounts.id, existing.id));
    } else {
      await db.insert(socialMediaAccounts).values({
        clientId,
        platform: "linkedin",
        platformAccountId: linkedinId,
        platformAccountName: profileName,
        platformAccountHandle: profileEmail,
        platformAccountAvatar: profilePicture || null,
        accessToken,
        refreshToken: refreshToken || null,
        tokenExpiresAt: tokenExpiry,
        accountType: "personal",
        permissions: LINKEDIN_SCOPES,
        isActive: true,
        lastSyncedAt: new Date(),
        metadata: { email: profileEmail, picture: profilePicture },
      });
    }

    console.log(`[LinkedIn] Connected: ${profileName} (${profileEmail})`);

    const redirectWithStatus = returnUrl.includes("?")
      ? `${returnUrl}&oauth=success&platform=linkedin`
      : `${returnUrl}?oauth=success&platform=linkedin`;

    res.redirect(redirectWithStatus);
  } catch (error) {
    console.error("[LinkedIn] OAuth callback error:", error);
    res.redirect("/post?oauth=error&platform=linkedin");
  }
});

export default router;
