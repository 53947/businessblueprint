import { Router, Request, Response } from "express";
import { db } from "../db";
import { inboxChannelConnections, inboxConversations, inboxMessages2 } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

/**
 * Meta (Facebook/Instagram/WhatsApp) Integration for /inbox
 * Handles webhooks for receiving DMs and comments from Meta platforms
 */

const router = Router();

// Environment variables for Meta App
const META_APP_ID = process.env.META_APP_ID;
const META_APP_SECRET = process.env.META_APP_SECRET;
const META_WEBHOOK_VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || "businessblueprint_meta_verify_2025";

interface MetaWebhookEntry {
  id: string;
  time: number;
  messaging?: MetaMessagingEvent[];
  changes?: MetaChange[];
}

interface MetaMessagingEvent {
  sender: { id: string };
  recipient: { id: string };
  timestamp: number;
  message?: {
    mid: string;
    text?: string;
    attachments?: any[];
    quick_reply?: any;
  };
  postback?: any;
  delivery?: any;
  read?: any;
}

interface MetaChange {
  field: string;
  value: any;
}

// Platform types for OAuth
type MetaPlatform = "facebook" | "instagram";
const VALID_PLATFORMS: MetaPlatform[] = ["facebook", "instagram"];

// Allowed redirect paths (whitelist to prevent open redirect)
const ALLOWED_RETURN_PATHS = [
  "/portal/inbox",
  "/portal/dashboard",
  "/content",
  "/inbox",
];

// Scopes required for each platform
const PLATFORM_SCOPES: Record<MetaPlatform, string[]> = {
  facebook: [
    "pages_show_list",
    "pages_read_engagement", 
    "pages_manage_posts",
    "pages_messaging",
    "pages_manage_metadata",
  ],
  instagram: [
    "pages_show_list",
    "instagram_basic",
    "instagram_content_publish",
    "instagram_manage_messages",
    "pages_read_engagement",
  ],
};

/**
 * Sign state data with HMAC for integrity verification
 */
function signState(data: object): string {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64");
  const signature = crypto
    .createHmac("sha256", META_APP_SECRET || "fallback-secret")
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
    if (!payload || !signature) {
      return { valid: false };
    }
    
    const expectedSignature = crypto
      .createHmac("sha256", META_APP_SECRET || "fallback-secret")
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

/**
 * Validate return URL is safe (whitelist check)
 */
function isValidReturnPath(path: string): boolean {
  if (!path) return false;
  // Must start with / and be in whitelist
  return path.startsWith("/") && ALLOWED_RETURN_PATHS.some(allowed => 
    path === allowed || path.startsWith(allowed + "?") || path.startsWith(allowed + "/")
  );
}

/**
 * GET /oauth/start - Start OAuth Flow
 * Redirects user to Facebook login to authorize the app
 * Query params:
 *   - clientId: The client ID to associate with the connection
 *   - platform: "facebook" or "instagram" (defaults to facebook)
 *   - returnUrl: Where to redirect after completion (optional, must be whitelisted path)
 */
router.get("/oauth/start", (req: Request, res: Response) => {
  try {
    const clientId = req.query.clientId as string;
    const platformParam = req.query.platform as string;
    const returnUrl = req.query.returnUrl as string;

    if (!clientId || isNaN(parseInt(clientId))) {
      return res.status(400).json({ error: "Valid clientId is required" });
    }

    if (!META_APP_ID || !META_APP_SECRET) {
      return res.status(500).json({ error: "Meta App not configured" });
    }

    // Validate platform is in allowed list
    const platform: MetaPlatform = VALID_PLATFORMS.includes(platformParam as MetaPlatform) 
      ? (platformParam as MetaPlatform) 
      : "facebook";

    // Validate return URL is safe (default if invalid/missing)
    const safeReturnUrl = isValidReturnPath(returnUrl) ? returnUrl : "/portal/inbox";

    // Build and sign state parameter for CSRF protection
    const stateData = {
      clientId: parseInt(clientId),
      platform,
      returnUrl: safeReturnUrl,
      nonce: crypto.randomBytes(16).toString("hex"),
      timestamp: Date.now(),
    };
    const state = signState(stateData);

    // Get scopes for the platform
    const scopes = PLATFORM_SCOPES[platform];

    // Build Facebook OAuth URL
    const redirectUri = getRedirectUri(req);
    const authUrl = new URL("https://www.facebook.com/v21.0/dialog/oauth");
    authUrl.searchParams.set("client_id", META_APP_ID);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", scopes.join(","));
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("response_type", "code");

    console.log(`✅ Starting ${platform} OAuth for client ${clientId}`);
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error("OAuth start error:", error);
    res.status(500).json({ error: "Failed to start OAuth flow" });
  }
});

/**
 * GET /webhooks/meta - Webhook Verification
 * Facebook sends this to verify the webhook endpoint
 */
router.get("/webhooks/meta", (req: Request, res: Response) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === META_WEBHOOK_VERIFY_TOKEN) {
      console.log("✅ Meta webhook verified");
      res.status(200).send(challenge);
    } else {
      console.error("❌ Meta webhook verification failed");
      res.sendStatus(403);
    }
  });

/**
 * POST /webhooks/meta - Receive Webhook Events
 * Meta sends messages, comments, and other events here
 */
router.post("/webhooks/meta", async (req: Request, res: Response) => {
    try {
      // Verify the request signature
      const signature = req.headers["x-hub-signature-256"] as string;
      if (!verifyWebhookSignature(req.body, signature)) {
        console.error("❌ Invalid webhook signature");
        return res.sendStatus(403);
      }

      const body = req.body;

      // Respond quickly to Facebook (must be within 20 seconds)
      res.status(200).send("EVENT_RECEIVED");

      // Process webhook events asynchronously
      if (body.object === "page" || body.object === "instagram") {
        for (const entry of body.entry as MetaWebhookEntry[]) {
          await processWebhookEntry(entry, body.object);
        }
      }

    } catch (error) {
      console.error("Error processing Meta webhook:", error);
      // Still send 200 to prevent Facebook from retrying
      res.status(200).send("EVENT_RECEIVED");
    }
  });

/**
 * GET /oauth/callback - OAuth Callback
 * Handles OAuth redirect from Facebook after user authorizes
 */
router.get("/oauth/callback", async (req: Request, res: Response) => {
    try {
      const code = req.query.code as string;
      const stateParam = req.query.state as string;

      if (!code) {
        return res.status(400).json({ error: "No authorization code provided" });
      }

      if (!stateParam) {
        return res.status(400).json({ error: "Invalid state parameter" });
      }

      // Verify and parse the signed state parameter
      const stateResult = verifyState(stateParam);
      
      if (!stateResult.valid || !stateResult.data) {
        console.error("❌ Invalid or tampered state parameter");
        return res.status(403).json({ error: "Invalid state - possible CSRF attack" });
      }

      // Check state age (reject if older than 10 minutes)
      const stateAge = Date.now() - (stateResult.data.timestamp || 0);
      if (stateAge > 10 * 60 * 1000) {
        console.error("❌ State parameter expired");
        return res.status(400).json({ error: "OAuth session expired. Please try again." });
      }

      const clientId: number = stateResult.data.clientId;
      const platform: MetaPlatform = VALID_PLATFORMS.includes(stateResult.data.platform) 
        ? stateResult.data.platform 
        : "facebook";
      const returnUrl: string = isValidReturnPath(stateResult.data.returnUrl) 
        ? stateResult.data.returnUrl 
        : "/portal/inbox";

      // Exchange code for access token
      const tokenResponse = await fetch(
        `https://graph.facebook.com/v21.0/oauth/access_token?` +
        `client_id=${META_APP_ID}&` +
        `client_secret=${META_APP_SECRET}&` +
        `code=${code}&` +
        `redirect_uri=${encodeURIComponent(getRedirectUri(req))}`
      );

      const tokenData = await tokenResponse.json();

      if (!tokenData.access_token) {
        console.error("Token exchange failed:", tokenData);
        throw new Error("Failed to get access token");
      }

      // Exchange for long-lived token (60 days instead of 1 hour)
      const longLivedResponse = await fetch(
        `https://graph.facebook.com/v21.0/oauth/access_token?` +
        `grant_type=fb_exchange_token&` +
        `client_id=${META_APP_ID}&` +
        `client_secret=${META_APP_SECRET}&` +
        `fb_exchange_token=${tokenData.access_token}`
      );

      const longLivedData = await longLivedResponse.json();
      const userAccessToken = longLivedData.access_token || tokenData.access_token;

      // Get Pages the user manages
      const pageTokenResponse = await fetch(
        `https://graph.facebook.com/v21.0/me/accounts?access_token=${userAccessToken}`
      );

      const pageData = await pageTokenResponse.json();

      if (pageData.error) {
        console.error("Failed to get pages:", pageData.error);
        throw new Error(pageData.error.message || "Failed to get pages");
      }

      // Store page access tokens in database
      if (pageData.data && pageData.data.length > 0) {
        for (const page of pageData.data) {
          // Check if connection already exists
          const existing = await db.select()
            .from(inboxChannelConnections)
            .where(
              and(
                eq(inboxChannelConnections.clientId, clientId),
                eq(inboxChannelConnections.channelType, platform),
                eq(inboxChannelConnections.channelIdentifier, page.id)
              )
            );

          const credentials = {
            pageAccessToken: page.access_token,
            userAccessToken,
            pageId: page.id,
            pageName: page.name,
            category: page.category,
          };

          if (existing.length > 0) {
            // Update existing
            await db.update(inboxChannelConnections)
              .set({
                credentials,
                channelName: page.name,
                status: "active",
                lastSyncedAt: new Date(),
                updatedAt: new Date(),
              })
              .where(eq(inboxChannelConnections.id, existing[0].id));
          } else {
            // Create new
            await db.insert(inboxChannelConnections).values({
              clientId,
              channelType: platform,
              channelIdentifier: page.id,
              channelName: page.name,
              credentials,
              status: "active",
              lastSyncedAt: new Date(),
            });
          }

          console.log(`✅ Connected ${platform} page: ${page.name}`);
        }
      }

      // Redirect back with success
      const redirectWithStatus = returnUrl.includes("?") 
        ? `${returnUrl}&oauth=success&platform=${platform}`
        : `${returnUrl}?oauth=success&platform=${platform}`;
      
      res.redirect(redirectWithStatus);

    } catch (error) {
      console.error("OAuth callback error:", error);
      res.redirect("/portal/inbox?oauth=error");
    }
  });

/**
 * Verify webhook signature from Meta
 */
function verifyWebhookSignature(body: any, signature: string | undefined): boolean {
  if (!signature || !META_APP_SECRET) return false;

  const elements = signature.split("=");
  const signatureHash = elements[1];

  const expectedHash = crypto
    .createHmac("sha256", META_APP_SECRET)
    .update(JSON.stringify(body))
    .digest("hex");

  return signatureHash === expectedHash;
}

/**
 * Process a single webhook entry
 */
async function processWebhookEntry(entry: MetaWebhookEntry, objectType: string) {
  try {
    // Handle messaging events (Facebook Messenger, Instagram DMs)
    if (entry.messaging) {
      for (const event of entry.messaging) {
        await processMessagingEvent(event, objectType);
      }
    }

    // Handle changes (comments, posts, etc)
    if (entry.changes) {
      for (const change of entry.changes) {
        await processChange(change, entry.id, objectType);
      }
    }
  } catch (error) {
    console.error("Error processing webhook entry:", error);
  }
}

/**
 * Process a messaging event (DM)
 */
async function processMessagingEvent(event: MetaMessagingEvent, platform: string) {
  try {
    // Only process incoming messages
    if (!event.message) return;

    const senderId = event.sender.id;
    const recipientId = event.recipient.id; // This is the Page ID
    const messageText = event.message.text || "";
    const messageId = event.message.mid;

    // Find the channel connection for this page
    const channelType = platform === "instagram" ? "instagram" : "facebook";
    const [channel] = await db.select()
      .from(inboxChannelConnections)
      .where(
        and(
          eq(inboxChannelConnections.channelType, channelType),
          eq(inboxChannelConnections.channelIdentifier, recipientId)
        )
      );

    if (!channel || !channel.clientId) {
      console.log(`No channel found for ${channelType} page ${recipientId}`);
      return;
    }

    // Find or create conversation
    let [conversation] = await db.select()
      .from(inboxConversations)
      .where(
        and(
          eq(inboxConversations.clientId, channel.clientId),
          eq(inboxConversations.contactIdentifier, senderId),
          eq(inboxConversations.primaryChannelType, channelType)
        )
      );

    if (!conversation) {
      // Create new conversation
      [conversation] = await db.insert(inboxConversations).values({
        clientId: channel.clientId,
        contactName: `${channelType === "instagram" ? "IG" : "FB"} User ${senderId.slice(-6)}`,
        contactIdentifier: senderId,
        primaryChannelType: channelType,
        primaryChannelId: channel.id,
        status: "open",
        priority: "normal",
        lastMessageAt: new Date(),
        lastMessagePreview: messageText.substring(0, 100),
        unreadCount: 1,
      }).returning();
    } else {
      // Update conversation
      await db.update(inboxConversations)
        .set({
          lastMessageAt: new Date(),
          lastMessagePreview: messageText.substring(0, 100),
          unreadCount: (conversation.unreadCount || 0) + 1,
          updatedAt: new Date(),
        })
        .where(eq(inboxConversations.id, conversation.id));
    }

    // Create message
    await db.insert(inboxMessages2).values({
      conversationId: conversation.id,
      channelType,
      channelId: channel.id,
      messageType: "incoming",
      direction: "inbound",
      content: messageText,
      contentType: event.message.attachments ? "image" : "text",
      fromIdentifier: senderId,
      fromName: conversation.contactName,
      toIdentifier: recipientId,
      toName: channel.channelName || "",
      externalMessageId: messageId,
      hasAttachments: !!event.message.attachments,
      attachments: event.message.attachments,
      status: "delivered",
      deliveredAt: new Date(event.timestamp),
      metadata: { platform: channelType, event },
    });

    console.log(`✅ Processed ${channelType} message from ${senderId}`);

  } catch (error) {
    console.error("Error processing messaging event:", error);
  }
}

/**
 * Process a change event (comment, post, etc)
 */
async function processChange(change: MetaChange, pageId: string, platform: string) {
  try {
    // Handle comment events
    if (change.field === "feed" && change.value.item === "comment") {
      const comment = change.value;
      await processComment(comment, pageId, platform);
    }
  } catch (error) {
    console.error("Error processing change event:", error);
  }
}

/**
 * Process a comment on a post
 */
async function processComment(comment: any, pageId: string, platform: string) {
  try {
    const commentId = comment.comment_id;
    const postId = comment.post_id;
    const senderId = comment.from?.id;
    const senderName = comment.from?.name;
    const commentText = comment.message;

    if (!senderId || !commentText) return;

    // Find the channel connection
    const channelType = platform === "instagram" ? "instagram" : "facebook";
    const [channel] = await db.select()
      .from(inboxChannelConnections)
      .where(
        and(
          eq(inboxChannelConnections.channelType, channelType),
          eq(inboxChannelConnections.channelIdentifier, pageId)
        )
      );

    if (!channel || !channel.clientId) return;

    // Find or create conversation for this commenter
    let [conversation] = await db.select()
      .from(inboxConversations)
      .where(
        and(
          eq(inboxConversations.clientId, channel.clientId),
          eq(inboxConversations.contactIdentifier, senderId),
          eq(inboxConversations.primaryChannelType, channelType)
        )
      );

    if (!conversation) {
      [conversation] = await db.insert(inboxConversations).values({
        clientId: channel.clientId,
        contactName: senderName || `${channelType === "instagram" ? "IG" : "FB"} User`,
        contactIdentifier: senderId,
        primaryChannelType: channelType,
        primaryChannelId: channel.id,
        status: "open",
        priority: "normal",
        lastMessageAt: new Date(),
        lastMessagePreview: `Comment: ${commentText.substring(0, 100)}`,
        unreadCount: 1,
        tags: ["comment"],
      }).returning();
    }

    // Create message for the comment
    await db.insert(inboxMessages2).values({
      conversationId: conversation.id,
      channelType,
      channelId: channel.id,
      messageType: "incoming",
      direction: "inbound",
      content: commentText,
      contentType: "text",
      fromIdentifier: senderId,
      fromName: senderName || "",
      toIdentifier: pageId,
      toName: channel.channelName || "",
      externalMessageId: commentId,
      threadId: postId,
      hasAttachments: false,
      status: "delivered",
      metadata: { 
        platform: channelType, 
        messageSubtype: "comment",
        postId,
        commentId,
      },
    });

    console.log(`✅ Processed ${channelType} comment from ${senderName}`);

  } catch (error) {
    console.error("Error processing comment:", error);
  }
}

/**
 * Get OAuth redirect URI
 */
function getRedirectUri(req: Request): string {
  const protocol = req.protocol;
  const host = req.get("host");
  return `${protocol}://${host}/api/meta/oauth/callback`;
}

export default router;
