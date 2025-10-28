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
      const state = req.query.state as string; // Contains clientId

      if (!code) {
        return res.status(400).json({ error: "No authorization code provided" });
      }

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
        throw new Error("Failed to get access token");
      }

      // Get long-lived Page access token
      const pageTokenResponse = await fetch(
        `https://graph.facebook.com/v21.0/me/accounts?access_token=${tokenData.access_token}`
      );

      const pageData = await pageTokenResponse.json();

      // Store page access tokens in database
      const clientId = parseInt(state); // state contains clientId
      
      if (pageData.data && pageData.data.length > 0) {
        for (const page of pageData.data) {
          // Check if connection already exists
          const existing = await db.select()
            .from(inboxChannelConnections)
            .where(
              and(
                eq(inboxChannelConnections.clientId, clientId),
                eq(inboxChannelConnections.channelType, "facebook"),
                eq(inboxChannelConnections.channelIdentifier, page.id)
              )
            );

          const credentials = {
            pageAccessToken: page.access_token,
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
              channelType: "facebook",
              channelIdentifier: page.id,
              channelName: page.name,
              credentials,
              status: "active",
              lastSyncedAt: new Date(),
            });
          }
        }
      }

      // Redirect back to inbox settings
      res.redirect("/inbox?tab=settings&oauth=success");

    } catch (error) {
      console.error("OAuth callback error:", error);
      res.redirect("/inbox?tab=settings&oauth=error");
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
