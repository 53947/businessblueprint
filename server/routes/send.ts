/**
 * /SEND - Email + SMS Marketing Platform API Routes
 * All routes protected with JWT authentication
 */

import type { Express } from "express";
import { storage } from "../storage";
import { insertSendContactSchema, insertSendListSchema } from "@shared/schema";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth";

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
}
