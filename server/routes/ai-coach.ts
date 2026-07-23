/**
 * AI Coach Routes
 *
 * Conversation history and chat endpoints for Coach Blue.
 */

import { Router } from "express";
import { aiCoachService } from "../services/aiCoach";
import { requireClientPortalAccess } from "../middleware/clientPortalAuth";

export const aiCoachRouter = Router();

// Get all conversations for the authenticated client
aiCoachRouter.get(
  "/api/ai-coach/conversations",
  requireClientPortalAccess,
  async (req: any, res) => {
    try {
      const clientId = req.clientId;
      const conversations = await aiCoachService.getConversations(clientId);
      res.json({ conversations });
    } catch (error) {
      console.error("Error fetching AI Coach conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  },
);

// Create a new conversation
aiCoachRouter.post(
  "/api/ai-coach/conversations",
  requireClientPortalAccess,
  async (req: any, res) => {
    try {
      const clientId = req.clientId;
      const conversation = await aiCoachService.createConversation(clientId);
      res.json({ conversation });
    } catch (error) {
      console.error("Error creating AI Coach conversation:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  },
);

// Get messages for a conversation
aiCoachRouter.get(
  "/api/ai-coach/conversations/:id/messages",
  requireClientPortalAccess,
  async (req: any, res) => {
    try {
      const conversationId = parseInt(req.params.id);
      if (isNaN(conversationId)) {
        return res.status(400).json({ error: "Invalid conversation ID" });
      }
      const messages = await aiCoachService.getMessages(conversationId);
      res.json({ messages });
    } catch (error) {
      console.error("Error fetching AI Coach messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  },
);

// Send a message and get AI response
aiCoachRouter.post(
  "/api/ai-coach/conversations/:id/chat",
  requireClientPortalAccess,
  async (req: any, res) => {
    try {
      const clientId = req.clientId;
      const conversationId = parseInt(req.params.id);
      if (isNaN(conversationId)) {
        return res.status(400).json({ error: "Invalid conversation ID" });
      }

      const { message, context } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await aiCoachService.chat(
        clientId,
        conversationId,
        message,
        context,
      );

      res.json(response);
    } catch (error) {
      console.error("Error in AI Coach chat:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  },
);

// Create a task/note from Coach Blue advice
aiCoachRouter.post(
  "/api/ai-coach/create-task",
  requireClientPortalAccess,
  async (req: any, res) => {
    try {
      const clientId = req.clientId;
      const { type, appId, title, description, stepId } = req.body;

      if (!type || !appId || !title) {
        return res.status(400).json({ error: "type, appId, and title are required" });
      }

      await aiCoachService.createTaskFromAdvice(clientId, {
        type,
        appId,
        title,
        description,
        stepId,
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Error creating task from Coach Blue:", error);
      res.status(500).json({ error: "Failed to create task" });
    }
  },
);
