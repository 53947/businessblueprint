/**
 * /SEND - Email + SMS Marketing Platform API Routes
 * All routes protected with JWT authentication
 */

import type { Express } from "express";
import { storage } from "../storage";
import { db } from "../db";
import {
  insertSendContactSchema,
  insertSendListSchema,
  sendContacts,
  sendCampaigns,
  sendTemplates,
  sendLists,
  sendListContacts,
  sendCampaignSends,
} from "@shared/schema";
import { eq, desc, sql, and, inArray } from "drizzle-orm";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth";
import { Resend } from "resend";
import { telnyxService } from "../services/telnyx";
import { logContactActivity } from "../services/timeline-logger";

export function registerSendRoutes(app: Express) {
  // Create contact
  app.post(
    "/api/send/contacts",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const validatedData = insertSendContactSchema.parse(req.body);

        // GDPR/CAN-SPAM Compliance Validation
        if (!validatedData.email && !validatedData.phone) {
          return res.status(400).json({
            success: false,
            message: "At least one contact method (email or phone) is required",
          });
        }

        // Ensure email consent is provided if email is present
        if (validatedData.email && !validatedData.emailConsent) {
          return res.status(400).json({
            success: false,
            message:
              "Email consent is required when providing an email address (GDPR/CAN-SPAM compliance)",
          });
        }

        // Ensure SMS consent is provided if phone is present
        if (validatedData.phone && !validatedData.smsConsent) {
          return res.status(400).json({
            success: false,
            message:
              "SMS consent is required when providing a phone number (TCPA compliance)",
          });
        }

        // Force clientId to match authenticated user (prevent cross-client data leakage)
        const contactData = {
          ...validatedData,
          clientId,
          emailConsentDate: validatedData.emailConsent ? new Date() : null,
          smsConsentDate: validatedData.smsConsent ? new Date() : null,
        };

        const contact = await storage.createSendContact(contactData);
        res.json({ success: true, contact });
      } catch (error) {
        console.error("Error creating contact:", error);
        res.status(400).json({
          success: false,
          message:
            error instanceof Error ? error.message : "Failed to create contact",
        });
      }
    },
  );

  // Get all contacts for authenticated client (with pagination)
  app.get(
    "/api/send/contacts",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const limit = Math.min(
          parseInt(req.query.limit as string) || 100,
          1000,
        );
        const offset = parseInt(req.query.offset as string) || 0;

        const contacts = await storage.getSendContactsByClient(clientId);

        // Apply pagination
        const paginatedContacts = contacts.slice(offset, offset + limit);

        res.json({
          success: true,
          contacts: paginatedContacts,
          pagination: {
            total: contacts.length,
            limit,
            offset,
            hasMore: offset + limit < contacts.length,
          },
        });
      } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch contacts",
        });
      }
    },
  );

  // Get single contact (with client ownership validation)
  app.get(
    "/api/send/contacts/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid contact ID",
          });
        }

        const contact = await storage.getSendContact(id);

        if (!contact) {
          return res.status(404).json({
            success: false,
            message: "Contact not found",
          });
        }

        // Verify client ownership
        if (contact.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: Contact belongs to another client",
          });
        }

        res.json({ success: true, contact });
      } catch (error) {
        console.error("Error fetching contact:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch contact",
        });
      }
    },
  );

  // Update contact (with client ownership validation)
  app.patch(
    "/api/send/contacts/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid contact ID",
          });
        }

        // Verify contact exists and belongs to client
        const existingContact = await storage.getSendContact(id);
        if (!existingContact) {
          return res.status(404).json({
            success: false,
            message: "Contact not found",
          });
        }

        if (existingContact.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: Contact belongs to another client",
          });
        }

        const updateData = insertSendContactSchema.partial().parse(req.body);

        // Prevent clientId tampering
        if ("clientId" in updateData) {
          delete (updateData as any).clientId;
        }

        const contact = await storage.updateSendContact(id, updateData);
        res.json({ success: true, contact });
      } catch (error) {
        console.error("Error updating contact:", error);
        res.status(400).json({
          success: false,
          message:
            error instanceof Error ? error.message : "Failed to update contact",
        });
      }
    },
  );

  // Delete contact (with client ownership validation)
  app.delete(
    "/api/send/contacts/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid contact ID",
          });
        }

        // Verify contact exists and belongs to client
        const existingContact = await storage.getSendContact(id);
        if (!existingContact) {
          return res.status(404).json({
            success: false,
            message: "Contact not found",
          });
        }

        if (existingContact.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: Contact belongs to another client",
          });
        }

        await storage.deleteSendContact(id);
        res.json({ success: true, message: "Contact deleted successfully" });
      } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({
          success: false,
          message: "Failed to delete contact",
        });
      }
    },
  );

  // Create list
  app.post(
    "/api/send/lists",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const validatedData = insertSendListSchema.parse(req.body);

        // Force clientId to match authenticated user
        const listData = {
          ...validatedData,
          clientId,
        };

        const list = await storage.createSendList(listData);
        res.json({ success: true, list });
      } catch (error) {
        console.error("Error creating list:", error);
        res.status(400).json({
          success: false,
          message:
            error instanceof Error ? error.message : "Failed to create list",
        });
      }
    },
  );

  // Get all lists for authenticated client (with pagination)
  app.get(
    "/api/send/lists",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const limit = Math.min(
          parseInt(req.query.limit as string) || 100,
          1000,
        );
        const offset = parseInt(req.query.offset as string) || 0;

        const lists = await storage.getSendListsByClient(clientId);

        // Apply pagination
        const paginatedLists = lists.slice(offset, offset + limit);

        res.json({
          success: true,
          lists: paginatedLists,
          pagination: {
            total: lists.length,
            limit,
            offset,
            hasMore: offset + limit < lists.length,
          },
        });
      } catch (error) {
        console.error("Error fetching lists:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch lists",
        });
      }
    },
  );

  // Get single list (with client ownership validation)
  app.get(
    "/api/send/lists/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid list ID",
          });
        }

        const list = await storage.getSendList(id);

        if (!list) {
          return res.status(404).json({
            success: false,
            message: "List not found",
          });
        }

        // Verify client ownership
        if (list.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: List belongs to another client",
          });
        }

        res.json({ success: true, list });
      } catch (error) {
        console.error("Error fetching list:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch list",
        });
      }
    },
  );

  // Update list (with client ownership validation)
  app.patch(
    "/api/send/lists/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid list ID",
          });
        }

        // Verify list exists and belongs to client
        const existingList = await storage.getSendList(id);
        if (!existingList) {
          return res.status(404).json({
            success: false,
            message: "List not found",
          });
        }

        if (existingList.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: List belongs to another client",
          });
        }

        const updateData = insertSendListSchema.partial().parse(req.body);

        // Prevent clientId tampering
        if ("clientId" in updateData) {
          delete (updateData as any).clientId;
        }

        const list = await storage.updateSendList(id, updateData);
        res.json({ success: true, list });
      } catch (error) {
        console.error("Error updating list:", error);
        res.status(400).json({
          success: false,
          message:
            error instanceof Error ? error.message : "Failed to update list",
        });
      }
    },
  );

  // Delete list (with client ownership validation)
  app.delete(
    "/api/send/lists/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid list ID",
          });
        }

        // Verify list exists and belongs to client
        const existingList = await storage.getSendList(id);
        if (!existingList) {
          return res.status(404).json({
            success: false,
            message: "List not found",
          });
        }

        if (existingList.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: List belongs to another client",
          });
        }

        await storage.deleteSendList(id);
        res.json({ success: true, message: "List deleted successfully" });
      } catch (error) {
        console.error("Error deleting list:", error);
        res.status(500).json({
          success: false,
          message: "Failed to delete list",
        });
      }
    },
  );

  // Add contact to list (with ownership validation)
  app.post(
    "/api/send/lists/:listId/contacts/:contactId",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const listId = parseInt(req.params.listId);
        const contactId = parseInt(req.params.contactId);

        if (isNaN(listId) || isNaN(contactId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid list or contact ID",
          });
        }

        // Verify list and contact both exist and belong to client
        const [list, contact] = await Promise.all([
          storage.getSendList(listId),
          storage.getSendContact(contactId),
        ]);

        if (!list) {
          return res.status(404).json({
            success: false,
            message: "List not found",
          });
        }

        if (!contact) {
          return res.status(404).json({
            success: false,
            message: "Contact not found",
          });
        }

        // Verify both belong to the same client
        if (list.clientId !== clientId || contact.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: Resources belong to another client",
          });
        }

        await storage.addContactToList(listId, contactId);
        res.json({
          success: true,
          message: "Contact added to list successfully",
        });
      } catch (error) {
        console.error("Error adding contact to list:", error);
        res.status(500).json({
          success: false,
          message: "Failed to add contact to list",
        });
      }
    },
  );

  // Remove contact from list (with ownership validation)
  app.delete(
    "/api/send/lists/:listId/contacts/:contactId",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const listId = parseInt(req.params.listId);
        const contactId = parseInt(req.params.contactId);

        if (isNaN(listId) || isNaN(contactId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid list or contact ID",
          });
        }

        // Verify list belongs to client
        const list = await storage.getSendList(listId);
        if (!list) {
          return res.status(404).json({
            success: false,
            message: "List not found",
          });
        }

        if (list.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: List belongs to another client",
          });
        }

        await storage.removeContactFromList(listId, contactId);
        res.json({
          success: true,
          message: "Contact removed from list successfully",
        });
      } catch (error) {
        console.error("Error removing contact from list:", error);
        res.status(500).json({
          success: false,
          message: "Failed to remove contact from list",
        });
      }
    },
  );

  // Get all contacts in a list (with ownership validation and pagination)
  app.get(
    "/api/send/lists/:listId/contacts",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const listId = parseInt(req.params.listId);
        const limit = Math.min(
          parseInt(req.query.limit as string) || 100,
          1000,
        );
        const offset = parseInt(req.query.offset as string) || 0;

        if (isNaN(listId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid list ID",
          });
        }

        // Verify list belongs to client
        const list = await storage.getSendList(listId);
        if (!list) {
          return res.status(404).json({
            success: false,
            message: "List not found",
          });
        }

        if (list.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: List belongs to another client",
          });
        }

        const contacts = await storage.getListContacts(listId);

        // Apply pagination
        const paginatedContacts = contacts.slice(offset, offset + limit);

        res.json({
          success: true,
          contacts: paginatedContacts,
          pagination: {
            total: contacts.length,
            limit,
            offset,
            hasMore: offset + limit < contacts.length,
          },
        });
      } catch (error) {
        console.error("Error fetching list contacts:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch list contacts",
        });
      }
    },
  );

  // Get send dashboard metrics for authenticated client
  app.get(
    "/api/send/metrics",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;

        // Count total contacts
        const [contactCount] = await db
          .select({ count: sql<number>`count(*)::int` })
          .from(sendContacts)
          .where(eq(sendContacts.clientId, clientId));

        // Aggregate campaign stats
        const [campaignStats] = await db
          .select({
            emailsSent: sql<number>`coalesce(sum(${sendCampaigns.emailsSent}), 0)::int`,
            emailsOpened: sql<number>`coalesce(sum(${sendCampaigns.emailsOpened}), 0)::int`,
            emailsClicked: sql<number>`coalesce(sum(${sendCampaigns.emailsClicked}), 0)::int`,
            emailsBounced: sql<number>`coalesce(sum(${sendCampaigns.emailsBounced}), 0)::int`,
            smsSent: sql<number>`coalesce(sum(${sendCampaigns.smsSent}), 0)::int`,
            smsDelivered: sql<number>`coalesce(sum(${sendCampaigns.smsDelivered}), 0)::int`,
          })
          .from(sendCampaigns)
          .where(eq(sendCampaigns.clientId, clientId));

        const totalContacts = contactCount?.count ?? 0;
        const emailsSent = campaignStats?.emailsSent ?? 0;
        const emailsOpened = campaignStats?.emailsOpened ?? 0;
        const emailsClicked = campaignStats?.emailsClicked ?? 0;
        const emailsBounced = campaignStats?.emailsBounced ?? 0;
        const smsSent = campaignStats?.smsSent ?? 0;
        const smsDelivered = campaignStats?.smsDelivered ?? 0;

        const emailsDelivered = emailsSent - emailsBounced;
        const avgOpenRate =
          emailsDelivered > 0 ? (emailsOpened / emailsDelivered) * 100 : 0;
        const avgClickRate =
          emailsOpened > 0 ? (emailsClicked / emailsOpened) * 100 : 0;
        const avgDeliverability =
          emailsSent > 0 ? (emailsDelivered / emailsSent) * 100 : 0;

        res.json({
          totalContacts,
          contactsGrowth: 0,
          emailsSent,
          emailsDelivered,
          emailsOpened,
          emailsClicked,
          smsSent,
          smsDelivered,
          avgOpenRate: Math.round(avgOpenRate * 10) / 10,
          avgClickRate: Math.round(avgClickRate * 10) / 10,
          avgDeliverability: Math.round(avgDeliverability * 10) / 10,
        });
      } catch (error) {
        console.error("Error fetching send metrics:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch send metrics",
        });
      }
    },
  );

  // Get recent campaigns for authenticated client
  app.get(
    "/api/send/campaigns/recent",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const limit = Math.min(
          parseInt(req.query.limit as string) || 10,
          50,
        );

        const campaigns = await db
          .select()
          .from(sendCampaigns)
          .where(eq(sendCampaigns.clientId, clientId))
          .orderBy(desc(sendCampaigns.createdAt))
          .limit(limit);

        const activityItems = campaigns.map((c) => ({
          id: c.id,
          type: "campaign" as const,
          name: c.name,
          status: c.status ?? "draft",
          time: c.createdAt?.toISOString() ?? new Date().toISOString(),
          recipients: c.totalRecipients ?? 0,
        }));

        res.json(activityItems);
      } catch (error) {
        console.error("Error fetching recent campaigns:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch recent campaigns",
        });
      }
    },
  );

  // Get all campaigns for authenticated client (with pagination)
  app.get(
    "/api/send/campaigns",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const limit = Math.min(
          parseInt(req.query.limit as string) || 50,
          200,
        );
        const offset = parseInt(req.query.offset as string) || 0;
        const status = req.query.status as string | undefined;

        let query = db
          .select()
          .from(sendCampaigns)
          .where(
            status
              ? and(
                  eq(sendCampaigns.clientId, clientId),
                  eq(sendCampaigns.status, status),
                )
              : eq(sendCampaigns.clientId, clientId),
          )
          .orderBy(desc(sendCampaigns.createdAt))
          .limit(limit)
          .offset(offset);

        const campaigns = await query;

        // Get total count
        const [countResult] = await db
          .select({ count: sql<number>`count(*)::int` })
          .from(sendCampaigns)
          .where(
            status
              ? and(
                  eq(sendCampaigns.clientId, clientId),
                  eq(sendCampaigns.status, status),
                )
              : eq(sendCampaigns.clientId, clientId),
          );

        res.json({
          success: true,
          campaigns,
          pagination: {
            total: countResult?.count ?? 0,
            limit,
            offset,
            hasMore: offset + limit < (countResult?.count ?? 0),
          },
        });
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch campaigns",
        });
      }
    },
  );

  // Create a new campaign
  app.post(
    "/api/send/campaigns",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const {
          name,
          description,
          campaignType,
          emailSubject,
          emailHtml,
          emailText,
          smsBody,
        } = req.body;

        if (!name || !campaignType) {
          return res.status(400).json({
            success: false,
            message: "Campaign name and type are required",
          });
        }

        if (!["email", "sms", "both"].includes(campaignType)) {
          return res.status(400).json({
            success: false,
            message: "Campaign type must be email, sms, or both",
          });
        }

        const [campaign] = await db
          .insert(sendCampaigns)
          .values({
            clientId,
            name,
            description: description || null,
            campaignType,
            status: "draft",
            emailSubject: emailSubject || null,
            emailHtml: emailHtml || null,
            emailText: emailText || null,
            smsBody: smsBody || null,
          })
          .returning();

        res.json({ success: true, campaign });
      } catch (error) {
        console.error("Error creating campaign:", error);
        res.status(500).json({
          success: false,
          message: "Failed to create campaign",
        });
      }
    },
  );

  // Get single campaign (with client ownership validation)
  app.get(
    "/api/send/campaigns/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid campaign ID",
          });
        }

        const [campaign] = await db
          .select()
          .from(sendCampaigns)
          .where(
            and(
              eq(sendCampaigns.id, id),
              eq(sendCampaigns.clientId, clientId),
            ),
          );

        if (!campaign) {
          return res.status(404).json({
            success: false,
            message: "Campaign not found",
          });
        }

        res.json({ success: true, campaign });
      } catch (error) {
        console.error("Error fetching campaign:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch campaign",
        });
      }
    },
  );

  // Update campaign (with client ownership validation)
  app.patch(
    "/api/send/campaigns/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid campaign ID",
          });
        }

        // Verify campaign exists and belongs to client
        const [existing] = await db
          .select()
          .from(sendCampaigns)
          .where(
            and(
              eq(sendCampaigns.id, id),
              eq(sendCampaigns.clientId, clientId),
            ),
          );

        if (!existing) {
          return res.status(404).json({
            success: false,
            message: "Campaign not found",
          });
        }

        // Only allow editing draft campaigns
        if (existing.status !== "draft") {
          return res.status(400).json({
            success: false,
            message: "Only draft campaigns can be edited",
          });
        }

        const updateData = { ...req.body, updatedAt: new Date() };
        // Prevent clientId and id tampering
        delete updateData.clientId;
        delete updateData.id;

        const [campaign] = await db
          .update(sendCampaigns)
          .set(updateData)
          .where(eq(sendCampaigns.id, id))
          .returning();

        res.json({ success: true, campaign });
      } catch (error) {
        console.error("Error updating campaign:", error);
        res.status(500).json({
          success: false,
          message: "Failed to update campaign",
        });
      }
    },
  );

  // Delete campaign (with client ownership validation, draft only)
  app.delete(
    "/api/send/campaigns/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid campaign ID",
          });
        }

        // Verify campaign exists and belongs to client
        const [existing] = await db
          .select()
          .from(sendCampaigns)
          .where(
            and(
              eq(sendCampaigns.id, id),
              eq(sendCampaigns.clientId, clientId),
            ),
          );

        if (!existing) {
          return res.status(404).json({
            success: false,
            message: "Campaign not found",
          });
        }

        // Only allow deleting draft campaigns
        if (existing.status !== "draft") {
          return res.status(400).json({
            success: false,
            message: "Only draft campaigns can be deleted",
          });
        }

        await db.delete(sendCampaigns).where(eq(sendCampaigns.id, id));

        res.json({
          success: true,
          message: "Campaign deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting campaign:", error);
        res.status(500).json({
          success: false,
          message: "Failed to delete campaign",
        });
      }
    },
  );

  // ============================================================================
  // TEMPLATE CRUD
  // ============================================================================

  // List all templates for authenticated client
  app.get(
    "/api/send/templates",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const type = req.query.type as string | undefined;

        let query = db
          .select()
          .from(sendTemplates)
          .where(eq(sendTemplates.clientId, clientId))
          .orderBy(desc(sendTemplates.updatedAt));

        const templates = await (type
          ? db
              .select()
              .from(sendTemplates)
              .where(
                and(
                  eq(sendTemplates.clientId, clientId),
                  eq(sendTemplates.templateType, type),
                ),
              )
              .orderBy(desc(sendTemplates.updatedAt))
          : query);

        res.json({ success: true, templates });
      } catch (error) {
        console.error("Error fetching templates:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch templates",
        });
      }
    },
  );

  // Create a new template
  app.post(
    "/api/send/templates",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const { name, description, templateType, emailSubject, emailHtml, emailText, smsBody, category } = req.body;

        if (!name || !templateType) {
          return res.status(400).json({
            success: false,
            message: "Template name and type are required",
          });
        }

        if (!["email", "sms"].includes(templateType)) {
          return res.status(400).json({
            success: false,
            message: "Template type must be email or sms",
          });
        }

        const [template] = await db
          .insert(sendTemplates)
          .values({
            clientId,
            name,
            description: description || null,
            templateType,
            emailSubject: emailSubject || null,
            emailHtml: emailHtml || null,
            emailText: emailText || null,
            smsBody: smsBody || null,
            category: category || null,
          })
          .returning();

        res.json({ success: true, template });
      } catch (error) {
        console.error("Error creating template:", error);
        res.status(500).json({
          success: false,
          message: "Failed to create template",
        });
      }
    },
  );

  // Get single template
  app.get(
    "/api/send/templates/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
          return res.status(400).json({ success: false, message: "Invalid template ID" });
        }

        const [template] = await db
          .select()
          .from(sendTemplates)
          .where(
            and(eq(sendTemplates.id, id), eq(sendTemplates.clientId, clientId)),
          );

        if (!template) {
          return res.status(404).json({ success: false, message: "Template not found" });
        }

        res.json({ success: true, template });
      } catch (error) {
        console.error("Error fetching template:", error);
        res.status(500).json({ success: false, message: "Failed to fetch template" });
      }
    },
  );

  // Update template
  app.patch(
    "/api/send/templates/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
          return res.status(400).json({ success: false, message: "Invalid template ID" });
        }

        const [existing] = await db
          .select()
          .from(sendTemplates)
          .where(
            and(eq(sendTemplates.id, id), eq(sendTemplates.clientId, clientId)),
          );

        if (!existing) {
          return res.status(404).json({ success: false, message: "Template not found" });
        }

        const updateData = { ...req.body, updatedAt: new Date() };
        delete updateData.clientId;
        delete updateData.id;

        const [template] = await db
          .update(sendTemplates)
          .set(updateData)
          .where(eq(sendTemplates.id, id))
          .returning();

        res.json({ success: true, template });
      } catch (error) {
        console.error("Error updating template:", error);
        res.status(500).json({ success: false, message: "Failed to update template" });
      }
    },
  );

  // Delete template
  app.delete(
    "/api/send/templates/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
          return res.status(400).json({ success: false, message: "Invalid template ID" });
        }

        const [existing] = await db
          .select()
          .from(sendTemplates)
          .where(
            and(eq(sendTemplates.id, id), eq(sendTemplates.clientId, clientId)),
          );

        if (!existing) {
          return res.status(404).json({ success: false, message: "Template not found" });
        }

        if (existing.isSystem) {
          return res.status(400).json({
            success: false,
            message: "System templates cannot be deleted",
          });
        }

        await db.delete(sendTemplates).where(eq(sendTemplates.id, id));

        res.json({ success: true, message: "Template deleted successfully" });
      } catch (error) {
        console.error("Error deleting template:", error);
        res.status(500).json({ success: false, message: "Failed to delete template" });
      }
    },
  );

  // =============================================
  // CAMPAIGN SEND EXECUTION
  // =============================================

  /** POST /api/send/campaigns/:id/send — Queue a campaign for sending */
  app.post(
    "/api/send/campaigns/:id/send",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const campaignId = parseInt(req.params.id);
        if (isNaN(campaignId)) {
          return res.status(400).json({ success: false, message: "Invalid campaign ID" });
        }

        // Get the campaign
        const [campaign] = await db
          .select()
          .from(sendCampaigns)
          .where(and(eq(sendCampaigns.id, campaignId), eq(sendCampaigns.clientId, clientId)));

        if (!campaign) {
          return res.status(404).json({ success: false, message: "Campaign not found" });
        }

        if (campaign.status !== "draft" && campaign.status !== "scheduled") {
          return res.status(400).json({
            success: false,
            message: `Campaign cannot be sent — current status is "${campaign.status}"`,
          });
        }

        // Determine recipient list
        const { listId } = req.body;

        let recipientContacts: { id: number; email: string | null; phone: string | null }[];

        if (listId) {
          // Get contacts from the specified list
          const listContactRows = await db
            .select({ contactId: sendListContacts.contactId })
            .from(sendListContacts)
            .where(eq(sendListContacts.listId, parseInt(listId)));

          const contactIds = listContactRows.map((r) => r.contactId).filter((id): id is number => id !== null);
          if (contactIds.length === 0) {
            return res.status(400).json({ success: false, message: "No contacts in the selected list" });
          }

          recipientContacts = await db
            .select({ id: sendContacts.id, email: sendContacts.email, phone: sendContacts.phone })
            .from(sendContacts)
            .where(and(eq(sendContacts.clientId, clientId), inArray(sendContacts.id, contactIds)));
        } else {
          // Send to all contacts with appropriate consent
          recipientContacts = await db
            .select({ id: sendContacts.id, email: sendContacts.email, phone: sendContacts.phone })
            .from(sendContacts)
            .where(eq(sendContacts.clientId, clientId));
        }

        if (recipientContacts.length === 0) {
          return res.status(400).json({ success: false, message: "No eligible recipients found" });
        }

        // Get full contact details for template substitution
        const fullContacts = await db
          .select()
          .from(sendContacts)
          .where(and(
            eq(sendContacts.clientId, clientId),
            inArray(sendContacts.id, recipientContacts.map((c) => c.id)),
          ));

        // Template variable substitution helper
        const substituteVars = (template: string, contact: typeof fullContacts[0]) => {
          return template
            .replace(/\{\{firstName\}\}/g, contact.firstName || "")
            .replace(/\{\{lastName\}\}/g, contact.lastName || "")
            .replace(/\{\{email\}\}/g, contact.email || "")
            .replace(/\{\{company\}\}/g, "")
            .replace(/\{\{unsubscribeUrl\}\}/g, `${process.env.BASE_URL || "https://businessblueprint.io"}/unsubscribe?id=${contact.id}`);
        };

        // Update campaign status immediately
        await db
          .update(sendCampaigns)
          .set({
            status: "sending",
            totalRecipients: fullContacts.length,
            updatedAt: new Date(),
          })
          .where(eq(sendCampaigns.id, campaignId));

        // Respond immediately — actual sending happens async
        res.json({
          success: true,
          message: `Campaign sending to ${fullContacts.length} recipients`,
          totalRecipients: fullContacts.length,
        });

        // ── ASYNC DISPATCH (after response) ──────────────────────
        // Fire-and-forget: send emails via Resend, SMS via Telnyx
        (async () => {
          let emailsSent = 0;
          let smsSent = 0;
          let emailsFailed = 0;
          let smsFailed = 0;

          // Email dispatch via Resend
          if (campaign.campaignType === "email" || campaign.campaignType === "both") {
            const resendApiKey = process.env.PROMOTE_RESEND_API_KEY;
            const fromEmail = process.env.FROM_EMAIL || "noreply@businessblueprint.io";

            if (resendApiKey) {
              const resend = new Resend(resendApiKey);

              for (const contact of fullContacts) {
                if (!contact.email || !contact.emailConsent) continue;

                try {
                  // Queue tracking record
                  const [sendRecord] = await db.insert(sendCampaignSends).values({
                    campaignId,
                    contactId: contact.id,
                    sendType: "email",
                    status: "queued",
                  }).returning();

                  const subject = campaign.emailSubject
                    ? substituteVars(campaign.emailSubject, contact)
                    : campaign.name;
                  const html = campaign.emailHtml
                    ? substituteVars(campaign.emailHtml, contact)
                    : `<p>${substituteVars(campaign.emailText || campaign.name, contact)}</p>`;

                  await resend.emails.send({
                    from: fromEmail,
                    to: contact.email,
                    subject,
                    html,
                  });

                  // Mark as sent
                  await db.update(sendCampaignSends)
                    .set({ status: "sent" })
                    .where(eq(sendCampaignSends.id, sendRecord.id));
                  emailsSent++;

                  // Log to / connect timeline
                  logContactActivity({
                    clientId,
                    contactId: contact.id,
                    eventType: 'campaign_sent',
                    title: `Email sent: "${subject}"`,
                    description: `Campaign "${campaign.name}" delivered`,
                    sourceApp: 'promote',
                    sourceEntityType: 'email',
                    sourceEntityId: String(campaignId),
                    metadata: { campaignId, campaignName: campaign.name, subject },
                  });
                } catch (err) {
                  console.error(`[Campaign ${campaignId}] Email failed for ${contact.email}:`, err);
                  emailsFailed++;
                }

                // Rate limit: ~10/sec
                if (emailsSent % 10 === 0) {
                  await new Promise((r) => setTimeout(r, 1000));
                }
              }
            } else {
              console.warn(`[Campaign ${campaignId}] PROMOTE_RESEND_API_KEY not configured — emails not sent`);
            }
          }

          // SMS dispatch via Telnyx
          if (campaign.campaignType === "sms" || campaign.campaignType === "both") {
            const fromPhone = process.env.TELNYX_FROM_NUMBER;

            if (process.env.TELNYX_API_KEY && fromPhone) {
              for (const contact of fullContacts) {
                if (!contact.phone || !contact.smsConsent) continue;

                try {
                  const [sendRecord] = await db.insert(sendCampaignSends).values({
                    campaignId,
                    contactId: contact.id,
                    sendType: "sms",
                    status: "queued",
                  }).returning();

                  const smsText = campaign.smsBody
                    ? substituteVars(campaign.smsBody, contact)
                    : campaign.name;

                  await telnyxService.sendSms({
                    to: contact.phone,
                    from: fromPhone,
                    text: smsText,
                  });

                  await db.update(sendCampaignSends)
                    .set({ status: "sent" })
                    .where(eq(sendCampaignSends.id, sendRecord.id));
                  smsSent++;
                } catch (err) {
                  console.error(`[Campaign ${campaignId}] SMS failed for ${contact.phone}:`, err);
                  smsFailed++;
                }
              }
            } else {
              console.warn(`[Campaign ${campaignId}] TELNYX not configured — SMS not sent`);
            }
          }

          // Update campaign with final stats
          await db
            .update(sendCampaigns)
            .set({
              status: "sent",
              emailsSent,
              smsSent,
              emailSentAt: emailsSent > 0 ? new Date() : null,
              smsSentAt: smsSent > 0 ? new Date() : null,
              updatedAt: new Date(),
            })
            .where(eq(sendCampaigns.id, campaignId));

          console.log(`[Campaign ${campaignId}] Complete: ${emailsSent} emails, ${smsSent} SMS sent. Failures: ${emailsFailed} email, ${smsFailed} SMS`);
        })().catch((err) => {
          console.error(`[Campaign ${campaignId}] Async dispatch failed:`, err);
        });
      } catch (error) {
        console.error("Error sending campaign:", error);
        res.status(500).json({ success: false, message: "Failed to send campaign" });
      }
    },
  );

  /** POST /api/send/campaigns/:id/schedule — Schedule a campaign for future sending */
  app.post(
    "/api/send/campaigns/:id/schedule",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const campaignId = parseInt(req.params.id);
        const { emailScheduledFor, smsScheduledFor, listId } = req.body;

        if (isNaN(campaignId)) {
          return res.status(400).json({ success: false, message: "Invalid campaign ID" });
        }

        if (!emailScheduledFor && !smsScheduledFor) {
          return res.status(400).json({ success: false, message: "At least one schedule time is required" });
        }

        const [campaign] = await db
          .select()
          .from(sendCampaigns)
          .where(and(eq(sendCampaigns.id, campaignId), eq(sendCampaigns.clientId, clientId)));

        if (!campaign) {
          return res.status(404).json({ success: false, message: "Campaign not found" });
        }

        await db
          .update(sendCampaigns)
          .set({
            status: "scheduled",
            emailScheduledFor: emailScheduledFor ? new Date(emailScheduledFor) : null,
            smsScheduledFor: smsScheduledFor ? new Date(smsScheduledFor) : null,
            segmentRules: listId ? { listId: parseInt(listId) } : campaign.segmentRules,
            updatedAt: new Date(),
          })
          .where(eq(sendCampaigns.id, campaignId));

        res.json({
          success: true,
          message: "Campaign scheduled successfully",
          emailScheduledFor,
          smsScheduledFor,
        });
      } catch (error) {
        console.error("Error scheduling campaign:", error);
        res.status(500).json({ success: false, message: "Failed to schedule campaign" });
      }
    },
  );

  // =============================================
  // LIST MANAGEMENT
  // =============================================

  /** GET /api/send/lists — Get all lists for authenticated client */
  app.get(
    "/api/send/lists",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const lists = await db
          .select()
          .from(sendLists)
          .where(eq(sendLists.clientId, clientId))
          .orderBy(desc(sendLists.createdAt));
        res.json({ success: true, lists });
      } catch (error) {
        console.error("Error fetching lists:", error);
        res.status(500).json({ success: false, message: "Failed to fetch lists" });
      }
    },
  );

  /** POST /api/send/lists — Create a new list */
  app.post(
    "/api/send/lists",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const { name, description, listType } = req.body;

        if (!name) {
          return res.status(400).json({ success: false, message: "List name is required" });
        }

        const [list] = await db
          .insert(sendLists)
          .values({
            clientId,
            name,
            description: description || null,
            listType: listType || "static",
          })
          .returning();

        res.json({ success: true, list });
      } catch (error) {
        console.error("Error creating list:", error);
        res.status(500).json({ success: false, message: "Failed to create list" });
      }
    },
  );

  /** POST /api/send/lists/:id/contacts — Add contacts to a list */
  app.post(
    "/api/send/lists/:id/contacts",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const listId = parseInt(req.params.id);
        const { contactIds } = req.body;

        if (isNaN(listId) || !Array.isArray(contactIds) || contactIds.length === 0) {
          return res.status(400).json({ success: false, message: "Valid list ID and contact IDs required" });
        }

        // Verify list belongs to client
        const [list] = await db
          .select()
          .from(sendLists)
          .where(and(eq(sendLists.id, listId), eq(sendLists.clientId, clientId)));

        if (!list) {
          return res.status(404).json({ success: false, message: "List not found" });
        }

        let added = 0;
        for (const contactId of contactIds) {
          try {
            await db.insert(sendListContacts).values({ listId, contactId });
            added++;
          } catch { /* skip duplicates */ }
        }

        // Update contact count
        const [countResult] = await db
          .select({ count: sql<number>`count(*)::int` })
          .from(sendListContacts)
          .where(eq(sendListContacts.listId, listId));

        await db
          .update(sendLists)
          .set({ totalContacts: countResult?.count ?? 0, updatedAt: new Date() })
          .where(eq(sendLists.id, listId));

        res.json({ success: true, added, totalContacts: countResult?.count ?? 0 });
      } catch (error) {
        console.error("Error adding contacts to list:", error);
        res.status(500).json({ success: false, message: "Failed to add contacts" });
      }
    },
  );

  /** DELETE /api/send/lists/:id — Delete a list */
  app.delete(
    "/api/send/lists/:id",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const listId = parseInt(req.params.id);

        if (isNaN(listId)) {
          return res.status(400).json({ success: false, message: "Invalid list ID" });
        }

        const [list] = await db
          .select()
          .from(sendLists)
          .where(and(eq(sendLists.id, listId), eq(sendLists.clientId, clientId)));

        if (!list) {
          return res.status(404).json({ success: false, message: "List not found" });
        }

        // Remove list contacts first, then the list
        await db.delete(sendListContacts).where(eq(sendListContacts.listId, listId));
        await db.delete(sendLists).where(eq(sendLists.id, listId));

        res.json({ success: true, message: "List deleted successfully" });
      } catch (error) {
        console.error("Error deleting list:", error);
        res.status(500).json({ success: false, message: "Failed to delete list" });
      }
    },
  );

  // =============================================
  // CONTACT IMPORT
  // =============================================

  /** POST /api/send/contacts/import — Bulk import contacts from CSV data */
  app.post(
    "/api/send/contacts/import",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const { contacts, listId } = req.body;

        if (!Array.isArray(contacts) || contacts.length === 0) {
          return res.status(400).json({ success: false, message: "Contacts array is required" });
        }

        let imported = 0;
        let skipped = 0;
        const importedIds: number[] = [];

        for (const contact of contacts) {
          try {
            if (!contact.email && !contact.phone) {
              skipped++;
              continue;
            }
            const [created] = await db
              .insert(sendContacts)
              .values({
                clientId,
                email: contact.email || null,
                phone: contact.phone || null,
                firstName: contact.firstName || null,
                lastName: contact.lastName || null,
                emailConsent: !!contact.email,
                smsConsent: !!contact.phone,
                emailConsentDate: contact.email ? new Date() : null,
                smsConsentDate: contact.phone ? new Date() : null,
                source: "import",
              })
              .returning();
            importedIds.push(created.id);
            imported++;
          } catch {
            skipped++;
          }
        }

        // If listId specified, add imported contacts to that list
        if (listId && importedIds.length > 0) {
          for (const contactId of importedIds) {
            try {
              await db.insert(sendListContacts).values({ listId: parseInt(listId), contactId });
            } catch { /* skip duplicates */ }
          }
        }

        res.json({ success: true, imported, skipped, total: contacts.length });
      } catch (error) {
        console.error("Error importing contacts:", error);
        res.status(500).json({ success: false, message: "Failed to import contacts" });
      }
    },
  );
}
