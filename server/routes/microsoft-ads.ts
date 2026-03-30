/**
 * Microsoft Advertising (Bing Ads) OAuth Integration for / amplify
 * Uses Microsoft identity platform OAuth2 + Bing Ads API v13
 */

import { Router, Request, Response } from "express";
import { db } from "../db";
import { adAccountConnections } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

const router = Router();

const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_ADS_CLIENT_ID;
const MICROSOFT_CLIENT_SECRET = process.env.MICROSOFT_ADS_CLIENT_SECRET;
const MICROSOFT_STATE_SECRET = process.env.MICROSOFT_ADS_CLIENT_SECRET || "msads-fallback-secret";

const MICROSOFT_SCOPES = ["https://ads.microsoft.com/msads.manage", "openid", "profile", "email"];

const ALLOWED_RETURN_PATHS = ["/amplify/dashboard", "/portal/dashboard"];

function signState(data: object): string {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64");
  const signature = crypto.createHmac("sha256", MICROSOFT_STATE_SECRET).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

function verifyState(state: string): { valid: boolean; data?: any } {
  try {
    const [payload, signature] = state.split(".");
    if (!payload || !signature) return { valid: false };
    const expected = crypto.createHmac("sha256", MICROSOFT_STATE_SECRET).update(payload).digest("hex");
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
  return `${req.protocol}://${req.get("host")}/api/microsoft-ads/oauth/callback`;
}

/**
 * GET /oauth/start — Start Microsoft Advertising OAuth Flow
 */
router.get("/oauth/start", (req: Request, res: Response) => {
  try {
    const clientId = req.query.clientId as string;
    const returnUrl = req.query.returnUrl as string;

    if (!clientId || isNaN(parseInt(clientId))) {
      return res.status(400).json({ error: "Valid clientId is required" });
    }

    if (!MICROSOFT_CLIENT_ID || !MICROSOFT_CLIENT_SECRET) {
      return res.status(500).json({ error: "Microsoft Advertising OAuth not configured. Set MICROSOFT_ADS_CLIENT_ID and MICROSOFT_ADS_CLIENT_SECRET." });
    }

    const safeReturnUrl = isValidReturnPath(returnUrl) ? returnUrl : "/amplify/dashboard";
    const state = signState({
      clientId: parseInt(clientId),
      returnUrl: safeReturnUrl,
      nonce: crypto.randomBytes(16).toString("hex"),
      timestamp: Date.now(),
    });

    const redirectUri = getRedirectUri(req);
    const authUrl = new URL("https://login.microsoftonline.com/common/oauth2/v2.0/authorize");
    authUrl.searchParams.set("client_id", MICROSOFT_CLIENT_ID);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", MICROSOFT_SCOPES.join(" "));
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("prompt", "consent");

    console.log(`[Microsoft Ads] Starting OAuth for client ${clientId}`);
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error("[Microsoft Ads] OAuth start error:", error);
    res.status(500).json({ error: "Failed to start OAuth flow" });
  }
});

/**
 * GET /oauth/callback — Microsoft Advertising OAuth Callback
 */
router.get("/oauth/callback", async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const stateParam = req.query.state as string;
    const error = req.query.error as string;

    if (error || !code) {
      return res.redirect("/amplify/dashboard?oauth=error&platform=microsoft");
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
    const tokenResponse = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: MICROSOFT_CLIENT_ID!,
        client_secret: MICROSOFT_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: getRedirectUri(req),
        scope: MICROSOFT_SCOPES.join(" "),
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error("[Microsoft Ads] Token exchange failed:", tokenData);
      return res.redirect(`${returnUrl}?oauth=error&platform=microsoft`);
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;
    const expiresIn = tokenData.expires_in;

    // Get user info
    const profileResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const profile = await profileResponse.json();
    const accountName = profile.displayName || profile.mail || "Microsoft Advertising";

    // Get Bing Ads accounts using the developer token
    const developerToken = process.env.MICROSOFT_ADS_DEVELOPER_TOKEN || "BBD37VB98"; // Universal sandbox token as fallback
    let customerInfo: any = null;

    try {
      // Call Bing Ads Customer Management API to get accounts
      const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
  <s:Header>
    <AuthenticationToken xmlns="https://bingads.microsoft.com/Customer/v13">${accessToken}</AuthenticationToken>
    <DeveloperToken xmlns="https://bingads.microsoft.com/Customer/v13">${developerToken}</DeveloperToken>
  </s:Header>
  <s:Body>
    <GetUserRequest xmlns="https://bingads.microsoft.com/Customer/v13">
      <UserId xmlns:i="http://www.w3.org/2001/XMLSchema-instance" i:nil="true"/>
    </GetUserRequest>
  </s:Body>
</s:Envelope>`;

      const bingResponse = await fetch("https://clientcenter.api.bingads.microsoft.com/Api/CustomerManagement/v13/CustomerManagementService.svc", {
        method: "POST",
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          "SOAPAction": "GetUser",
        },
        body: soapBody,
      });
      const bingData = await bingResponse.text();
      console.log("[Microsoft Ads] Got Bing Ads user info");
    } catch (bingErr) {
      console.error("[Microsoft Ads] Bing Ads API call failed (non-blocking):", bingErr);
    }

    // Store the connection
    await db.insert(adAccountConnections).values({
      platform: "microsoft",
      accountName,
      status: "active",
      credentials: {
        accessToken,
        refreshToken,
        expiresAt: Date.now() + (expiresIn || 3600) * 1000,
        email: profile.mail || profile.userPrincipalName,
        developerToken,
      },
    });

    console.log(`[Microsoft Ads] Connected: ${accountName}`);
    res.redirect(`${returnUrl}?oauth=success&platform=microsoft`);
  } catch (error: any) {
    console.error("[Microsoft Ads] OAuth callback error:", error);
    res.redirect("/amplify/dashboard?oauth=error&platform=microsoft");
  }
});

export default router;
