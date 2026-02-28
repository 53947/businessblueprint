import { Router, Request, Response } from "express";
import { db } from "../db";
import { socialMediaAccounts } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

/**
 * Google Business Profile OAuth Integration
 * Handles OAuth2 flow for connecting Google Business Profile accounts
 * for social posting via /post and listing management via /list
 */

const router = Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_STATE_SECRET = process.env.GOOGLE_CLIENT_SECRET || "google-fallback-secret";

// Google Business Profile API scopes
const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/business.manage",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

// Allowed redirect paths
const ALLOWED_RETURN_PATHS = [
  "/post",
  "/portal/dashboard",
  "/list-app",
  "/review-app",
];

/**
 * Sign state data with HMAC for integrity verification
 */
function signState(data: object): string {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64");
  const signature = crypto
    .createHmac("sha256", GOOGLE_STATE_SECRET)
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

/**
 * Verify and decode signed state
 */
function verifyState(state: string): { valid: boolean; data?: any } {
  try {
    const [payload, signature] = state.split(".");
    if (!payload || !signature) return { valid: false };

    const expectedSignature = crypto
      .createHmac("sha256", GOOGLE_STATE_SECRET)
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
  return `${protocol}://${host}/api/google/oauth/callback`;
}

/**
 * GET /oauth/start - Start Google OAuth Flow
 * Query params:
 *   - clientId: The client ID to associate with the connection
 *   - returnUrl: Where to redirect after completion (optional)
 */
router.get("/oauth/start", (req: Request, res: Response) => {
  try {
    const clientId = req.query.clientId as string;
    const returnUrl = req.query.returnUrl as string;

    if (!clientId || isNaN(parseInt(clientId))) {
      return res.status(400).json({ error: "Valid clientId is required" });
    }

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      return res.status(500).json({ error: "Google OAuth not configured" });
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
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", GOOGLE_CLIENT_ID);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", GOOGLE_SCOPES.join(" "));
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("access_type", "offline");
    authUrl.searchParams.set("prompt", "consent");

    console.log(`Starting Google OAuth for client ${clientId}`);
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error("Google OAuth start error:", error);
    res.status(500).json({ error: "Failed to start OAuth flow" });
  }
});

/**
 * GET /oauth/callback - Google OAuth Callback
 */
router.get("/oauth/callback", async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const stateParam = req.query.state as string;
    const error = req.query.error as string;

    if (error) {
      console.error("Google OAuth denied:", error);
      return res.redirect("/post?oauth=error&reason=denied");
    }

    if (!code || !stateParam) {
      return res.status(400).json({ error: "Missing authorization code or state" });
    }

    const stateResult = verifyState(stateParam);
    if (!stateResult.valid || !stateResult.data) {
      return res.status(403).json({ error: "Invalid state - possible CSRF attack" });
    }

    // Check state age (10 minute max)
    const stateAge = Date.now() - (stateResult.data.timestamp || 0);
    if (stateAge > 10 * 60 * 1000) {
      return res.status(400).json({ error: "OAuth session expired. Please try again." });
    }

    const clientId: number = stateResult.data.clientId;
    const returnUrl: string = isValidReturnPath(stateResult.data.returnUrl)
      ? stateResult.data.returnUrl
      : "/post";

    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID!,
        client_secret: GOOGLE_CLIENT_SECRET!,
        redirect_uri: getRedirectUri(req),
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("Google token exchange failed:", tokenData);
      return res.redirect(`${returnUrl}?oauth=error&reason=token_exchange`);
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;
    const expiresIn = tokenData.expires_in; // seconds

    // Get user profile info
    const profileResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const profile = await profileResponse.json();

    // Get Google Business Profile accounts
    const accountsResponse = await fetch(
      "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    const accountsData = await accountsResponse.json();

    if (accountsData.error) {
      console.error("Failed to get Google Business accounts:", accountsData.error);
      // Still save the connection even without Business Profile access
    }

    const accounts = accountsData.accounts || [];

    if (accounts.length > 0) {
      // Store each Business Profile account
      for (const account of accounts) {
        const accountId = account.name?.split("/").pop() || account.name;
        const accountName = account.accountName || profile.name || "Google Business";

        // Get locations for this account
        let locationName = accountName;
        try {
          const locationsResponse = await fetch(
            `https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations`,
            { headers: { Authorization: `Bearer ${accessToken}` } },
          );
          const locationsData = await locationsResponse.json();
          if (locationsData.locations && locationsData.locations.length > 0) {
            locationName = locationsData.locations[0].title || accountName;
          }
        } catch {
          // Locations API may not be available
        }

        // Check if account already connected
        const [existing] = await db
          .select()
          .from(socialMediaAccounts)
          .where(
            and(
              eq(socialMediaAccounts.clientId, clientId),
              eq(socialMediaAccounts.platform, "google_business"),
              eq(socialMediaAccounts.platformAccountId, accountId),
            ),
          );

        const tokenExpiry = expiresIn
          ? new Date(Date.now() + expiresIn * 1000)
          : null;

        if (existing) {
          await db
            .update(socialMediaAccounts)
            .set({
              accessToken,
              refreshToken: refreshToken || existing.refreshToken,
              tokenExpiresAt: tokenExpiry,
              platformAccountName: locationName,
              isActive: true,
              lastSyncedAt: new Date(),
              updatedAt: new Date(),
              metadata: {
                accountName: account.accountName,
                accountType: account.type,
                verificationState: account.verificationState,
                profileEmail: profile.email,
              },
            })
            .where(eq(socialMediaAccounts.id, existing.id));
        } else {
          await db.insert(socialMediaAccounts).values({
            clientId,
            platform: "google_business",
            platformAccountId: accountId,
            platformAccountName: locationName,
            platformAccountHandle: profile.email,
            platformAccountAvatar: profile.picture || null,
            accessToken,
            refreshToken: refreshToken || null,
            tokenExpiresAt: tokenExpiry,
            accountType: account.type || "PERSONAL",
            permissions: GOOGLE_SCOPES,
            isActive: true,
            lastSyncedAt: new Date(),
            metadata: {
              accountName: account.accountName,
              accountType: account.type,
              verificationState: account.verificationState,
              profileEmail: profile.email,
            },
          });
        }

        console.log(`Connected Google Business: ${locationName}`);
      }
    } else {
      // No Business Profile found — store basic Google account for future use
      const [existing] = await db
        .select()
        .from(socialMediaAccounts)
        .where(
          and(
            eq(socialMediaAccounts.clientId, clientId),
            eq(socialMediaAccounts.platform, "google_business"),
            eq(socialMediaAccounts.platformAccountId, profile.id || profile.email),
          ),
        );

      if (!existing) {
        await db.insert(socialMediaAccounts).values({
          clientId,
          platform: "google_business",
          platformAccountId: profile.id || profile.email,
          platformAccountName: profile.name || "Google Account",
          platformAccountHandle: profile.email,
          platformAccountAvatar: profile.picture || null,
          accessToken,
          refreshToken: refreshToken || null,
          tokenExpiresAt: expiresIn ? new Date(Date.now() + expiresIn * 1000) : null,
          accountType: "PERSONAL",
          permissions: GOOGLE_SCOPES,
          isActive: true,
          lastSyncedAt: new Date(),
          metadata: { profileEmail: profile.email, noBusinessProfile: true },
        });
      }
    }

    const redirectWithStatus = returnUrl.includes("?")
      ? `${returnUrl}&oauth=success&platform=google_business`
      : `${returnUrl}?oauth=success&platform=google_business`;

    res.redirect(redirectWithStatus);
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    res.redirect("/post?oauth=error");
  }
});

export default router;
