import { Router, Request, Response } from "express";
import { db } from "../db";
import { 
  chatWidgetSettings, 
  chatAgents,
  chatAnalyticsEvents,
  livechatSessions,
  inboxConversations,
  inboxMessages2,
  crmContacts,
  clients,
  insertChatWidgetSettingsSchema,
  updateChatWidgetSettingsSchema,
  insertChatAgentSchema,
  insertChatAnalyticsEventSchema,
  insertLivechatSessionSchema,
} from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { z } from "zod";
import { nanoid } from "nanoid";

const router = Router();

// ============================================================================
// WIDGET API (Public - called by embedded widget on customer websites)
// Security: Widget endpoints are public but return only non-sensitive data.
// Multi-tenant isolation is enforced via clientId in all queries.
// For production, consider adding domain whitelist validation per client.
// ============================================================================

// Middleware to set CORS headers for widget endpoints
const widgetCors = (req: Request, res: Response, next: () => void) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
};

// Get widget settings by client ID (for widget initialization)
router.get("/widget/settings/:clientId", widgetCors, async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    if (isNaN(clientId) || clientId <= 0) {
      return res.status(400).json({ error: "Invalid client ID" });
    }

    // Verify client exists
    const [client] = await db
      .select({ id: clients.id })
      .from(clients)
      .where(eq(clients.id, clientId))
      .limit(1);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Get widget settings
    const [settings] = await db
      .select()
      .from(chatWidgetSettings)
      .where(eq(chatWidgetSettings.clientId, clientId))
      .limit(1);

    if (!settings) {
      // Return default settings if none configured
      return res.json({
        clientId,
        companyName: "Support",
        welcomeMessage: "Hi! How can we help you today?",
        primaryColor: "#0000FF",
        position: "bottom-right",
        requireEmail: false,
        requireName: false,
        customFields: [],
        enableSound: true,
        gdprEnabled: false,
        fileUploadsEnabled: true,
        maxFileSize: 5242880,
        rateLimit: 10,
      });
    }

    // Return sanitized settings (exclude internal fields)
    res.json({
      clientId: settings.clientId,
      companyName: settings.companyName,
      welcomeMessage: settings.welcomeMessage,
      primaryColor: settings.primaryColor,
      position: settings.position,
      requireEmail: settings.requireEmail,
      requireName: settings.requireName,
      customFields: settings.customFields,
      enableSound: settings.enableSound,
      offlineMessage: settings.offlineMessage,
      gdprEnabled: settings.gdprEnabled,
      gdprText: settings.gdprText,
      gdprPrivacyUrl: settings.gdprPrivacyUrl,
      autoOpenDelay: settings.autoOpenDelay,
      proactiveMessage: settings.proactiveMessage,
      proactiveDelay: settings.proactiveDelay,
      fileUploadsEnabled: settings.fileUploadsEnabled,
      maxFileSize: settings.maxFileSize,
      rateLimit: settings.rateLimit,
    });
  } catch (error) {
    console.error("Error fetching widget settings:", error);
    res.status(500).json({ error: "Failed to fetch widget settings" });
  }
});

// Create/resume chat session
const createSessionSchema = z.object({
  clientId: z.number(),
  sessionId: z.string().optional(),
  visitorName: z.string().optional(),
  visitorEmail: z.string().email().optional(),
  customFields: z.record(z.any()).optional(),
  pageUrl: z.string().optional(),
  pageTitle: z.string().optional(),
  referrer: z.string().optional(),
  userAgent: z.string().optional(),
});

router.post("/widget/sessions", widgetCors, async (req: Request, res: Response) => {
  try {
    const data = createSessionSchema.parse(req.body);
    
    // Verify client exists for multi-tenant security
    const [client] = await db
      .select({ id: clients.id })
      .from(clients)
      .where(eq(clients.id, data.clientId))
      .limit(1);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    
    const sessionId = data.sessionId || `sess_${nanoid(16)}`;
    
    // Check for existing session
    const [existingSession] = await db
      .select()
      .from(livechatSessions)
      .where(eq(livechatSessions.sessionId, sessionId))
      .limit(1);

    if (existingSession) {
      // Resume existing session
      return res.json({
        sessionId: existingSession.sessionId,
        conversationId: existingSession.conversationId,
        visitorName: existingSession.visitorName,
        isExisting: true,
      });
    }

    // Create conversation first
    const [conversation] = await db
      .insert(inboxConversations)
      .values({
        clientId: data.clientId,
        contactName: data.visitorName || "Website Visitor",
        contactIdentifier: data.visitorEmail || sessionId,
        primaryChannelType: "livechat",
        status: "open",
        lastMessageAt: new Date(),
      })
      .returning();

    // Create new session
    const [session] = await db
      .insert(livechatSessions)
      .values({
        clientId: data.clientId,
        conversationId: conversation.id,
        sessionId,
        visitorId: `vis_${nanoid(12)}`,
        visitorName: data.visitorName,
        visitorEmail: data.visitorEmail,
        pageUrl: data.pageUrl,
        pageTitle: data.pageTitle,
        referrer: data.referrer,
        userAgent: data.userAgent,
        ipAddress: req.ip || req.socket.remoteAddress,
        status: "active",
      })
      .returning();

    // Sync to CRM if email provided
    if (data.visitorEmail) {
      try {
        // Check if contact exists
        const [existingContact] = await db
          .select()
          .from(crmContacts)
          .where(and(
            eq(crmContacts.clientId, data.clientId),
            eq(crmContacts.email, data.visitorEmail)
          ))
          .limit(1);

        if (!existingContact) {
          // Create CRM contact
          await db.insert(crmContacts).values({
            clientId: data.clientId,
            email: data.visitorEmail,
            firstName: data.visitorName?.split(" ")[0] || "",
            lastName: data.visitorName?.split(" ").slice(1).join(" ") || "",
            lifecycleStage: "lead",
            status: "active",
          });
        }
      } catch (crmError) {
        console.error("CRM sync error:", crmError);
        // Don't fail the session creation
      }
    }

    // Track analytics event
    await db.insert(chatAnalyticsEvents).values({
      clientId: data.clientId,
      eventType: "conversation_started",
      eventData: {
        pageUrl: data.pageUrl,
        referrer: data.referrer,
      },
    });

    res.json({
      sessionId: session.sessionId,
      conversationId: conversation.id,
      visitorName: session.visitorName,
      isExisting: false,
    });
  } catch (error) {
    console.error("Error creating session:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid request data", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create session" });
  }
});

// Send message from visitor
const sendMessageSchema = z.object({
  sessionId: z.string(),
  content: z.string().min(1).max(5000),
  messageType: z.enum(["text", "file", "image"]).default("text"),
  fileUrl: z.string().optional(),
  fileName: z.string().optional(),
});

router.post("/widget/messages", widgetCors, async (req: Request, res: Response) => {
  try {
    const data = sendMessageSchema.parse(req.body);

    // Get session
    const [session] = await db
      .select()
      .from(livechatSessions)
      .where(eq(livechatSessions.sessionId, data.sessionId))
      .limit(1);

    if (!session || !session.conversationId) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Create message
    const [message] = await db
      .insert(inboxMessages2)
      .values({
        conversationId: session.conversationId,
        channelType: "livechat",
        messageType: data.messageType === "text" ? "incoming" : "incoming",
        direction: "inbound",
        content: data.content,
        contentType: data.messageType === "text" ? "text" : "file",
        fromIdentifier: session.visitorEmail || session.sessionId,
        fromName: session.visitorName || "Visitor",
        toIdentifier: `client_${session.clientId}`,
        toName: "Support",
        hasAttachments: !!data.fileUrl,
        attachments: data.fileUrl ? [{ url: data.fileUrl, name: data.fileName }] : [],
      })
      .returning();

    // Update conversation last message
    await db
      .update(inboxConversations)
      .set({
        lastMessageAt: new Date(),
        lastMessagePreview: data.content.substring(0, 100),
        unreadCount: sql`${inboxConversations.unreadCount} + 1`,
      })
      .where(eq(inboxConversations.id, session.conversationId));

    // Track analytics
    await db.insert(chatAnalyticsEvents).values({
      clientId: session.clientId,
      eventType: "message_sent",
      eventData: { direction: "inbound" },
    });

    res.json({
      messageId: message.id,
      timestamp: message.createdAt,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid message data", details: error.errors });
    }
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Get message history for session
router.get("/widget/messages/:sessionId", widgetCors, async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    // Get session
    const [session] = await db
      .select()
      .from(livechatSessions)
      .where(eq(livechatSessions.sessionId, sessionId))
      .limit(1);

    if (!session || !session.conversationId) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Get messages
    const messages = await db
      .select()
      .from(inboxMessages2)
      .where(eq(inboxMessages2.conversationId, session.conversationId))
      .orderBy(inboxMessages2.createdAt);

    res.json({
      messages: messages.map(m => ({
        id: m.id,
        content: m.content,
        direction: m.direction,
        fromName: m.fromName,
        messageType: m.messageType,
        attachments: m.attachments,
        createdAt: m.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Track widget analytics event
const trackEventSchema = z.object({
  clientId: z.number(),
  eventType: z.string(),
  eventData: z.record(z.any()).optional(),
});

router.post("/widget/analytics", widgetCors, async (req: Request, res: Response) => {
  try {
    const data = trackEventSchema.parse(req.body);

    await db.insert(chatAnalyticsEvents).values({
      clientId: data.clientId,
      eventType: data.eventType,
      eventData: data.eventData || {},
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error tracking event:", error);
    res.status(500).json({ error: "Failed to track event" });
  }
});

// ============================================================================
// DASHBOARD API (Authenticated - for customers managing their chats)
// ============================================================================

// Get all conversations for a client
router.get("/dashboard/conversations/:clientId", async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const status = req.query.status as string || "open";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const conversations = await db
      .select({
        id: inboxConversations.id,
        contactName: inboxConversations.contactName,
        contactIdentifier: inboxConversations.contactIdentifier,
        status: inboxConversations.status,
        lastMessageAt: inboxConversations.lastMessageAt,
        lastMessagePreview: inboxConversations.lastMessagePreview,
        unreadCount: inboxConversations.unreadCount,
        createdAt: inboxConversations.createdAt,
      })
      .from(inboxConversations)
      .where(and(
        eq(inboxConversations.clientId, clientId),
        eq(inboxConversations.primaryChannelType, "livechat"),
        status !== "all" ? eq(inboxConversations.status, status) : undefined
      ))
      .orderBy(desc(inboxConversations.lastMessageAt))
      .limit(limit)
      .offset((page - 1) * limit);

    res.json({ conversations, page, limit });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});

// Get single conversation with messages
router.get("/dashboard/conversations/:clientId/:conversationId", async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const conversationId = parseInt(req.params.conversationId);

    const [conversation] = await db
      .select()
      .from(inboxConversations)
      .where(and(
        eq(inboxConversations.id, conversationId),
        eq(inboxConversations.clientId, clientId)
      ))
      .limit(1);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Get session info
    const [session] = await db
      .select()
      .from(livechatSessions)
      .where(eq(livechatSessions.conversationId, conversationId))
      .limit(1);

    // Get messages
    const messages = await db
      .select()
      .from(inboxMessages2)
      .where(eq(inboxMessages2.conversationId, conversationId))
      .orderBy(inboxMessages2.createdAt);

    // Mark as read
    await db
      .update(inboxConversations)
      .set({ unreadCount: 0 })
      .where(eq(inboxConversations.id, conversationId));

    res.json({
      conversation,
      session,
      messages: messages.map(m => ({
        id: m.id,
        content: m.content,
        direction: m.direction,
        fromName: m.fromName,
        messageType: m.messageType,
        attachments: m.attachments,
        createdAt: m.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ error: "Failed to fetch conversation" });
  }
});

// Send message from agent
const agentMessageSchema = z.object({
  conversationId: z.number(),
  content: z.string().min(1).max(5000),
  agentId: z.number().optional(),
  agentName: z.string().optional(),
});

router.post("/dashboard/messages/:clientId", async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const data = agentMessageSchema.parse(req.body);

    // Verify conversation belongs to client
    const [conversation] = await db
      .select()
      .from(inboxConversations)
      .where(and(
        eq(inboxConversations.id, data.conversationId),
        eq(inboxConversations.clientId, clientId)
      ))
      .limit(1);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Get session info for reply addressing
    const [session] = await db
      .select()
      .from(livechatSessions)
      .where(eq(livechatSessions.conversationId, data.conversationId))
      .limit(1);

    // Create message
    const [message] = await db
      .insert(inboxMessages2)
      .values({
        conversationId: data.conversationId,
        channelType: "livechat",
        messageType: "outgoing",
        direction: "outbound",
        content: data.content,
        contentType: "text",
        fromIdentifier: `client_${clientId}`,
        fromName: data.agentName || "Support Agent",
        toIdentifier: session?.visitorEmail || session?.sessionId || "visitor",
        toName: session?.visitorName || "Visitor",
        sentById: data.agentId,
      })
      .returning();

    // Update conversation
    await db
      .update(inboxConversations)
      .set({
        lastMessageAt: new Date(),
        lastMessagePreview: data.content.substring(0, 100),
      })
      .where(eq(inboxConversations.id, data.conversationId));

    res.json({
      messageId: message.id,
      timestamp: message.createdAt,
    });
  } catch (error) {
    console.error("Error sending agent message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Close conversation
router.put("/dashboard/conversations/:clientId/:conversationId/close", async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const conversationId = parseInt(req.params.conversationId);

    await db
      .update(inboxConversations)
      .set({ status: "resolved" })
      .where(and(
        eq(inboxConversations.id, conversationId),
        eq(inboxConversations.clientId, clientId)
      ));

    // Also end the session
    await db
      .update(livechatSessions)
      .set({ 
        status: "ended",
        endedAt: new Date(),
      })
      .where(eq(livechatSessions.conversationId, conversationId));

    res.json({ success: true });
  } catch (error) {
    console.error("Error closing conversation:", error);
    res.status(500).json({ error: "Failed to close conversation" });
  }
});

// ============================================================================
// SETTINGS API
// ============================================================================

// Get widget settings for client
router.get("/settings/:clientId", async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);

    const [settings] = await db
      .select()
      .from(chatWidgetSettings)
      .where(eq(chatWidgetSettings.clientId, clientId))
      .limit(1);

    if (!settings) {
      // Return defaults
      return res.json({
        clientId,
        companyName: "Support",
        welcomeMessage: "Hi! How can we help you today?",
        primaryColor: "#0000FF",
        position: "bottom-right",
        requireEmail: false,
        requireName: false,
        customFields: [],
        enableSound: true,
        offlineMessage: "We're offline. Leave a message and we'll get back to you!",
        gdprEnabled: false,
        fileUploadsEnabled: true,
        maxFileSize: 5242880,
        rateLimit: 10,
        crmSyncEnabled: true,
      });
    }

    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

// Update widget settings
router.put("/settings/:clientId", async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const updates = updateChatWidgetSettingsSchema.parse(req.body);

    // Check if settings exist
    const [existing] = await db
      .select()
      .from(chatWidgetSettings)
      .where(eq(chatWidgetSettings.clientId, clientId))
      .limit(1);

    if (existing) {
      // Update
      const [updated] = await db
        .update(chatWidgetSettings)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(chatWidgetSettings.clientId, clientId))
        .returning();
      
      return res.json(updated);
    } else {
      // Create
      const [created] = await db
        .insert(chatWidgetSettings)
        .values({ clientId, ...updates })
        .returning();
      
      return res.json(created);
    }
  } catch (error) {
    console.error("Error updating settings:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid settings data", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update settings" });
  }
});

// Get embed code
router.get("/embed/:clientId", async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const baseUrl = process.env.BASE_URL || "https://businessblueprint.io";

    const embedCode = `<!-- / chat Widget by BusinessBlueprint -->
<script>
  window.bbChatConfig = {
    clientId: ${clientId}
  };
</script>
<script src="${baseUrl}/chat/widget.js" async></script>`;

    res.json({ embedCode, clientId });
  } catch (error) {
    console.error("Error generating embed code:", error);
    res.status(500).json({ error: "Failed to generate embed code" });
  }
});

// ============================================================================
// ANALYTICS API
// ============================================================================

router.get("/analytics/:clientId", async (req: Request, res: Response) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const period = req.query.period as string || "week";

    // Calculate date range
    const now = new Date();
    let startDate: Date;
    switch (period) {
      case "day":
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default: // week
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get conversation counts
    const conversationCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(inboxConversations)
      .where(and(
        eq(inboxConversations.clientId, clientId),
        eq(inboxConversations.primaryChannelType, "livechat"),
        sql`${inboxConversations.createdAt} >= ${startDate}`
      ));

    // Get message counts
    const messageCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(chatAnalyticsEvents)
      .where(and(
        eq(chatAnalyticsEvents.clientId, clientId),
        eq(chatAnalyticsEvents.eventType, "message_sent"),
        sql`${chatAnalyticsEvents.createdAt} >= ${startDate}`
      ));

    // Get widget opens
    const widgetOpens = await db
      .select({ count: sql<number>`count(*)` })
      .from(chatAnalyticsEvents)
      .where(and(
        eq(chatAnalyticsEvents.clientId, clientId),
        eq(chatAnalyticsEvents.eventType, "widget_opened"),
        sql`${chatAnalyticsEvents.createdAt} >= ${startDate}`
      ));

    res.json({
      period,
      totalConversations: conversationCount[0]?.count || 0,
      totalMessages: messageCount[0]?.count || 0,
      widgetOpens: widgetOpens[0]?.count || 0,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

export const chatRouter = router;
