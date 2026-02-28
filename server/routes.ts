import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { storage } from "./storage";
import { randomBytes } from "crypto";
import contentRoutes from "./routes/content";
import metaRoutes from "./routes/meta";
import { tasksRouter } from "./routes/tasks";
import brandColorsRoutes from "./routes/brand-colors";
import { registerBillingAdminRoutes } from "./routes/billing-admin";
import { registerEmailAdminRoutes } from "./routes/email-admin";
import { registerPaymentRoutes } from "./routes/payments";
import { crmRouter } from "./routes/crm";
import { publicApiRouter } from "./routes/api";
import { listingDistributionRouter } from "./routes/listing-distribution";
import { chatRouter } from "./routes/chat";
import {
  insertAssessmentSchema,
  subscriptionPlans,
  subscriptionAddons,
  subscriptions,
  insertSubscriptionSchema,
  insertSendContactSchema,
  insertSendListSchema,
  livechatSessions,
  insertLivechatSessionSchema,
  inboxConversations,
  inboxMessages2,
  brandAssets,
  crmContacts,
  crmDeals,
  crmTasks,
  crmTimeline,
  supportTickets,
  ticketComments,
  prescriptions,
  clients,
  insertSupportTicketSchema,
  insertTicketCommentSchema,
  updateSupportTicketSchema,
  updatePrescriptionSchema,
  scansBluePurchases,
  scansBlueResults,
  businessListings,
  listingSyncLogs,
  listingMetricsSnapshots,
  updateBusinessListingSchema,
  insertBusinessListingSchema,
  subscriptionAddonSelections,
} from "@shared/schema";
import { GoogleBusinessService } from "./services/googleBusiness";
import { OpenAIAnalysisService } from "./services/openai";
import { ResendEmailService } from "./services/resend-email";
import { inboxEmailService } from "./services/inbox-email";
import { aiCoachService } from "./services/aiCoach";
import { PricingEngine } from "./services/pricing";
import { NMIService } from "./services/nmi";
import { productRecommendationService } from "./services/productRecommendations";
import { reviewAI } from "./services/reviewAI";
import { jwtService } from "./services/jwt";
import { presenceScannerService } from "./services/presenceScanner";
import { listingSyncService } from "./services/listingSync";
import { reviewSyncService } from "./services/reviewSync";
import { scansBlueService } from "./services/scansblue";
import { sendAssessmentConfirmationEmail, sendAdminNotification } from "./services/assessment-emails";
import { dashboardAccess } from "@shared/schema";
import { eq, desc, and, or, lte, sql, count, avg } from "drizzle-orm";
import { db } from "./db";
import { z } from "zod";
import { requireAuth, type AuthenticatedRequest } from "./middleware/auth";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { requireClientPortalAccess } from "./middleware/clientPortalAuth";

// Listing platform display name mappings
const platformDisplayNames: Record<string, string> = {
  google_business: "Google Business",
  yelp: "Yelp",
  facebook: "Facebook",
  bing_places: "Bing Places",
  apple_maps: "Apple Maps",
  manual: "Manual",
};

function platformDisplayName(code: string): string {
  return platformDisplayNames[code] || code;
}

function platformInternalName(display: string): string {
  const entry = Object.entries(platformDisplayNames).find(([, v]) => v === display);
  return entry ? entry[0] : display.toLowerCase().replace(/\s+/g, "_");
}

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  // Serve favicon.ico from attached_assets
  app.get("/favicon.ico", (req, res) => {
    res.sendFile(
      path.resolve(
        process.cwd(),
        "attached_assets/Blueprint_Favicon_1762489845363.ico",
      ),
    );
  });

  // Serve / chat widget script (for embedding on customer websites)
  app.get("/chat/widget.js", (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(process.cwd(), "client/public/chat-widget.js"));
  });

  app.get("/api/auth/user", async (req: any, res) => {
    try {
      // Return null if not authenticated instead of 401
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.json({ user: null });
      }

      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  const googleService = new GoogleBusinessService();
  const aiService = new OpenAIAnalysisService();
  const emailService = new ResendEmailService();

  // Temporary setup endpoint to create demo accounts (for Meta review)
  app.post("/api/setup/demo-accounts", async (req, res) => {
    try {
      const demoAccounts = [
        {
          companyName: "Demo Restaurant",
          email: "demo@businessblueprint.io",
          accountStatus: "active" as const,
        },
        {
          companyName: "Test Business",
          email: "test@businessblueprint.io",
          accountStatus: "active" as const,
        },
        {
          companyName: "Social Media Agency",
          email: "agency@businessblueprint.io",
          accountStatus: "active" as const,
        },
      ];

      const results = [];
      for (const account of demoAccounts) {
        const existing = await storage.getClientByEmail(account.email);
        if (existing) {
          results.push({
            email: account.email,
            status: "already exists",
            id: existing.id,
          });
        } else {
          const created = await storage.createClient(account);
          results.push({
            email: account.email,
            status: "created",
            id: created.id,
          });
        }
      }

      res.json({ success: true, accounts: results });
    } catch (error) {
      console.error("Demo account setup error:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to create demo accounts" });
    }
  });

  // Create new assessment
  app.post("/api/assessments", async (req, res) => {
    try {
      const validatedData = insertAssessmentSchema.parse(req.body);

      // Create assessment with pending status
      const assessment = await storage.createAssessment(validatedData);

      // Create or find client account for this email
      let client = await storage.getClientByEmail(validatedData.email);
      if (!client) {
        // Build full formatted address from assessment fields
        const fullAddress = [
          validatedData.attention ? `Attn: ${validatedData.attention}` : null,
          validatedData.address,
          validatedData.address2,
          validatedData.unit ? `Unit ${validatedData.unit}` : null,
          `${validatedData.city}, ${validatedData.state} ${validatedData.zipCode}`,
          validatedData.country || 'United States'
        ].filter(Boolean).join('\n');
        
        client = await storage.createClient({
          companyName: validatedData.businessName,
          email: validatedData.email,
          phone: validatedData.phone,
          website: validatedData.website || undefined,
          address: fullAddress,
          accountStatus: "active" as const,
        });
        console.log(
          `[Assessment] Created client account for ${validatedData.email}, ID: ${client.id}`,
        );
      }

      // Link assessment to client
      await storage.linkAssessmentToClient(client.id, assessment.id);
      console.log(
        `[Assessment] Linked assessment ${assessment.id} to client ${client.id}`,
      );

      // Auto-create CRM contact for /relationships
      try {
        // Check if CRM contact already exists for this email
        const existingCrmContact = await db
          .select()
          .from(crmContacts)
          .where(eq(crmContacts.email, validatedData.email))
          .limit(1);

        let crmContactId: number | null = null;

        if (existingCrmContact.length === 0) {
          // Parse name if provided (some assessments have full name field)
          const [crmContact] = await db
            .insert(crmContacts)
            .values({
              clientId: client.id,
              firstName:
                validatedData.businessName?.split(" ")[0] || "Business",
              lastName: "Owner",
              email: validatedData.email,
              phone: validatedData.phone || null,
              lifecycleStage: "lead",
              leadSource: "assessment",
              customFields: {
                businessName: validatedData.businessName,
                industry: validatedData.industry,
                website: validatedData.website || null,
                address: validatedData.address,
                address2: validatedData.address2 || null,
                unit: validatedData.unit || null,
                attention: validatedData.attention || null,
                city: validatedData.city,
                state: validatedData.state,
                zipCode: validatedData.zipCode,
                country: validatedData.country || 'United States',
                assessmentId: assessment.id,
              },
            })
            .returning();

          crmContactId = crmContact.id;
          console.log(
            `[Assessment] Created CRM contact ${crmContactId} for ${validatedData.email}`,
          );

          // Add timeline event
          await db.insert(crmTimeline).values({
            clientId: client.id,
            contactId: crmContactId,
            eventType: "assessment_started",
            title: `Digital IQ Assessment started for ${validatedData.businessName}`,
            description: `Assessment ID: ${assessment.id}`,
            occurredAt: new Date(),
            sourceApp: "relationships",
            actorType: "system",
          });
        } else {
          crmContactId = existingCrmContact[0].id;
          console.log(
            `[Assessment] CRM contact already exists: ${crmContactId}`,
          );

          // Update existing contact with assessment link (guard against null customFields)
          const existingCustomFields = existingCrmContact[0].customFields || {};
          await db
            .update(crmContacts)
            .set({
              customFields: {
                ...(typeof existingCustomFields === "object"
                  ? existingCustomFields
                  : {}),
                businessName: validatedData.businessName,
                industry: validatedData.industry,
                website: validatedData.website || null,
                assessmentId: assessment.id,
              },
              updatedAt: new Date(),
            })
            .where(eq(crmContacts.id, crmContactId));
        }
      } catch (crmError) {
        console.error("[Assessment] Failed to create CRM contact:", crmError);
        // Don't fail the assessment if CRM creation fails
      }

      // Send assessment confirmation email immediately
      try {
        const emailResult = await sendAssessmentConfirmationEmail({
          id: assessment.id,
          email: validatedData.email,
          businessName: validatedData.businessName,
          industry: validatedData.industry,
        });
        if (emailResult.success) {
          console.log(`[Assessment] Confirmation email sent to ${validatedData.email}`);
        } else {
          console.warn(`[Assessment] Confirmation email failed: ${emailResult.error}`);
        }
        // Also notify admin of new submission
        sendAdminNotification({
          id: assessment.id,
          email: validatedData.email,
          businessName: validatedData.businessName,
          industry: validatedData.industry,
        }).catch(err => console.error('[Assessment] Admin notification failed:', err));
      } catch (emailError) {
        console.error("[Assessment] Failed to send confirmation email:", emailError);
        // Don't fail the assessment if email fails
      }

      // Start background analysis (fire-and-forget with error logging)
      processAssessmentAsync(
        assessment.id,
        googleService,
        aiService,
        emailService,
        storage,
      ).catch(err => {
        console.error(`[Assessment] Background processing FAILED for ID ${assessment.id}:`, err);
      });

      res.json({
        success: true,
        assessmentId: assessment.id,
        clientId: client.id,
        message:
          "Assessment started. You'll receive results via email within 2-3 minutes.",
      });
    } catch (error) {
      console.error("Error creating assessment:", error as Error);
      res.status(400).json({
        success: false,
        message: "Invalid assessment data provided",
      });
    }
  });

  // Get assessments by email (public - requires email parameter)
  app.get("/api/assessments", async (req, res) => {
    try {
      const { email } = req.query;

      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Email parameter is required" });
      }

      const assessments = await storage.getAssessmentsByEmail(email);
      res.json(assessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });

  // Public lookup endpoint for finding assessment results
  app.get("/api/assessments/lookup", async (req, res) => {
    try {
      const { email } = req.query;

      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Email parameter is required" });
      }

      const assessments = await storage.getAssessmentsByEmail(email);

      if (!assessments || assessments.length === 0) {
        return res.status(404).json({
          message: "No assessments found for this email address.",
          assessments: [],
        });
      }

      // Return simplified assessment data for the lookup page
      const simplifiedAssessments = assessments.map((a) => ({
        id: a.id,
        businessName: a.businessName,
        status: a.status,
        digitalScore: a.digitalScore,
        createdAt: a.createdAt,
      }));

      res.json({
        success: true,
        assessments: simplifiedAssessments,
      });
    } catch (error) {
      console.error("Error looking up assessments:", error);
      res.status(500).json({ message: "Failed to look up assessments" });
    }
  });

  // Get all assessments (admin only - protected by Replit Auth)
  app.get("/api/admin/assessments", isAuthenticated, async (req, res) => {
    try {
      const assessments = await storage.getAllAssessments();
      res.json(assessments);
    } catch (error) {
      console.error("Error fetching all assessments:", error);
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });

  // Get assessment by ID
  app.get("/api/assessments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const assessment = await storage.getAssessment(id);

      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }

      const recommendations =
        await storage.getRecommendationsByAssessmentId(id);

      res.json({
        assessment,
        recommendations,
      });
    } catch (error) {
      console.error("Error fetching assessment:", error);
      res.status(500).json({ message: "Failed to fetch assessment" });
    }
  });

  // Update pathway selection
  app.patch("/api/assessments/:id/pathway", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { pathway } = req.body;

      if (!["diy", "none"].includes(pathway)) {
        return res.status(400).json({
          message: "Invalid pathway selection - only DIY is supported",
        });
      }

      await storage.updateAssessment(id, { selectedPathway: pathway });

      res.json({ success: true, message: "Pathway updated successfully" });
    } catch (error) {
      console.error("Error updating pathway:", error);
      res.status(500).json({ message: "Failed to update pathway" });
    }
  });

  // Send pathway reminder email (can be triggered manually or scheduled)
  app.post("/api/assessments/:id/send-pathway-reminder", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const assessment = await storage.getAssessment(id);

      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }

      // Only send if pathway hasn't been selected
      if (assessment.selectedPathway && assessment.selectedPathway !== "none") {
        return res.status(400).json({ message: "Pathway already selected" });
      }

      const emailSent = await emailService.sendPathwayReminderEmail(
        assessment.email,
        {
          businessName: assessment.businessName,
          digitalScore: assessment.digitalScore || 0,
          assessmentId: id,
        },
      );

      if (emailSent) {
        res.json({ success: true, message: "Pathway reminder sent" });
      } else {
        res.status(500).json({ message: "Failed to send reminder email" });
      }
    } catch (error) {
      console.error("Error sending pathway reminder:", error);
      res.status(500).json({ message: "Failed to send pathway reminder" });
    }
  });

  // Send checkout abandonment email
  app.post("/api/assessments/:id/send-checkout-reminder", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const assessment = await storage.getAssessment(id);

      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }

      if (
        !assessment.selectedPathway ||
        assessment.selectedPathway === "none"
      ) {
        return res.status(400).json({ message: "No pathway selected yet" });
      }

      // Check if subscription exists
      const existingSubscriptions = await db
        .select()
        .from(subscriptions as any)
        .where(eq((subscriptions as any).assessmentId, id));

      if (existingSubscriptions.length > 0) {
        return res.status(400).json({ message: "Subscription already exists" });
      }

      const pathwayNames: Record<string, string> = {
        diy: "DIY Platform",
      };

      const monthlyPrices: Record<string, number> = {
        diy: 49,
      };

      const emailSent = await emailService.sendCheckoutAbandonmentEmail(
        assessment.email,
        {
          businessName: assessment.businessName,
          pathway: assessment.selectedPathway,
          planName: pathwayNames[assessment.selectedPathway],
          monthlyPrice: monthlyPrices[assessment.selectedPathway],
          assessmentId: id,
        },
      );

      if (emailSent) {
        res.json({ success: true, message: "Checkout reminder sent" });
      } else {
        res.status(500).json({ message: "Failed to send reminder email" });
      }
    } catch (error) {
      console.error("Error sending checkout reminder:", error);
      res.status(500).json({ message: "Failed to send checkout reminder" });
    }
  });

  // Get client dashboard data
  app.get(
    "/api/clients/:id/dashboard",
    requireClientPortalAccess,
    async (req: any, res) => {
      try {
        const clientId = parseInt(req.params.id);

        if (isNaN(clientId)) {
          return res.status(400).json({ message: "Invalid client ID" });
        }

        // Get client basic info
        const client = await storage.getClient(clientId);
        if (!client) {
          return res.status(404).json({ message: "Client not found" });
        }

        // Get recent campaigns
        const campaigns = await storage.getCampaignsByClient(clientId);

        // Get recent inbox messages
        const messages = await storage.getMessagesByClient(clientId);

        // Get latest campaign for /send card
        const latestCampaign = campaigns.length > 0 ? campaigns[0] : null;

        // Get CRM stats
        let crmStats = { contactsCount: 0, activeDeals: 0, tasksDue: 0 };
        try {
          // Count contacts for this client
          const contacts = await db
            .select()
            .from(crmContacts)
            .where(eq(crmContacts.clientId, clientId));
          crmStats.contactsCount = contacts.length;

          // Count active deals
          const activeDeals = await db
            .select()
            .from(crmDeals)
            .where(
              and(eq(crmDeals.clientId, clientId), eq(crmDeals.status, "open")),
            );
          crmStats.activeDeals = activeDeals.length;

          // Count tasks due today or overdue
          const today = new Date();
          today.setHours(23, 59, 59, 999);
          const tasks = await db
            .select()
            .from(crmTasks)
            .where(
              and(
                eq(crmTasks.clientId, clientId),
                or(
                  eq(crmTasks.status, "pending"),
                  eq(crmTasks.status, "in_progress"),
                ),
              ),
            );
          crmStats.tasksDue = tasks.filter(
            (t) => t.dueDate && new Date(t.dueDate) <= today,
          ).length;
        } catch (err) {
          console.error("[Dashboard] Error fetching CRM stats:", err);
        }

        // Calculate basic metrics
        const dashboardData = {
          client,
          digitalScore: 75, // Could be calculated from various factors
          lastUpdated: client.updatedAt,
          listings: {
            total: client.enabledFeatures
              ? client.enabledFeatures.split(",").length
              : 0,
            verified: client.enabledFeatures
              ? client.enabledFeatures.split(",").length - 1
              : 0,
            pending: 1,
            citations: 12, // Placeholder for citations count
            platforms: ["Google Business", "Yelp", "Facebook", "Apple Maps"],
          },
          reviews: {
            average: 4.3,
            total: 156,
            recent: 12,
            response_rate: 85,
          },
          campaigns: {
            active: campaigns.filter((c: any) => c.status === "active").length,
            pending: campaigns.filter((c: any) => c.status === "draft").length,
            total: campaigns.length,
            performance: {
              reach: 2340,
              clicks: 89,
              conversions: 12,
            },
            latest: latestCampaign
              ? {
                  name: latestCampaign.name || "Recent Campaign",
                  status: latestCampaign.status || "active",
                  unsubscribes: 3, // Placeholder - will be from analytics
                  clickThroughs: 47, // Placeholder
                  purchases: 8, // Placeholder
                  sent: 250, // Placeholder - will be from campaign analytics
                }
              : null,
          },
          socialMedia: {
            isSetup: false, // Placeholder - check if profiles connected
            newLikes: 24,
            newComments: 8,
            newMessages: 5,
            connectedProfiles: 0,
          },
          livechat: {
            isSetup: false, // Placeholder - check if widget installed
            participationRating: 4.8,
            inQueue: 2,
            totalChats: 145,
            avgResponseTime: "2.3 min",
          },
          messages: {
            unread: messages.filter((m: any) => !m.isRead).length,
            total: messages.length,
            recent: messages.slice(0, 5),
          },
          crm: {
            contactsCount: crmStats.contactsCount,
            activeDeals: crmStats.activeDeals,
            tasksDue: crmStats.tasksDue,
          },
        };

        res.json({ success: true, data: dashboardData });
      } catch (error) {
        console.error("Error fetching client dashboard:", error);
        res.status(500).json({
          message: "Failed to fetch dashboard data",
          error: (error as Error).message,
        });
      }
    },
  );

  // Get all clients (admin only - protected by Replit Auth)
  app.get("/api/admin/clients", isAuthenticated, async (req, res) => {
    try {
      const clientList = await storage.getAllClients();
      res.json(clientList);
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });

  // ========================================
  // ADMIN - Support Tickets
  // ========================================

  // Get all support tickets (admin only)
  app.get("/api/admin/tickets", isAuthenticated, async (req, res) => {
    try {
      const tickets = await storage.getAllTickets();
      res.json(tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      res.status(500).json({ message: "Failed to fetch tickets" });
    }
  });

  // Create support ticket
  app.post("/api/admin/tickets", isAuthenticated, async (req, res) => {
    try {
      // Validate using drizzle-zod schema
      const validationResult = insertSupportTicketSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: validationResult.error.flatten().fieldErrors 
        });
      }

      const { clientId, subject, description, category, priority } = validationResult.data;

      const newTicket = await storage.createTicket({
        clientId,
        subject,
        description,
        category: category ?? undefined,
        priority: priority ?? undefined,
      });

      res.json(newTicket);
    } catch (error) {
      console.error("Error creating ticket:", error);
      res.status(500).json({ message: "Failed to create ticket" });
    }
  });

  // Update support ticket
  app.patch("/api/admin/tickets/:id", isAuthenticated, async (req, res) => {
    try {
      const ticketId = parseInt(req.params.id);

      if (isNaN(ticketId)) {
        return res.status(400).json({ message: "Invalid ticket ID" });
      }

      // Validate using shared schema from @shared/schema.ts
      const validationResult = updateSupportTicketSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: validationResult.error.flatten().fieldErrors 
        });
      }

      const { status, priority, resolution } = validationResult.data;
      const updatedTicket = await storage.updateTicket(ticketId, { status, priority, resolution });
      res.json(updatedTicket);
    } catch (error) {
      console.error("Error updating ticket:", error);
      res.status(500).json({ message: "Failed to update ticket" });
    }
  });

  // Add comment to ticket
  app.post("/api/admin/tickets/:id/comments", isAuthenticated, async (req, res) => {
    try {
      const ticketId = parseInt(req.params.id);

      if (isNaN(ticketId)) {
        return res.status(400).json({ message: "Invalid ticket ID" });
      }

      // Validate using drizzle-zod schema
      const commentData = { ...req.body, ticketId };
      const validationResult = insertTicketCommentSchema.safeParse(commentData);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: validationResult.error.flatten().fieldErrors 
        });
      }

      const { content, isInternal } = validationResult.data;

      const newComment = await storage.addTicketComment(ticketId, {
        content,
        isInternal: isInternal ?? undefined,
        authorType: "admin",
      });

      res.json(newComment);
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ message: "Failed to add comment" });
    }
  });

  // ========================================
  // ADMIN - Prescriptions
  // ========================================

  // Get all prescriptions (admin only)
  app.get("/api/admin/prescriptions", isAuthenticated, async (req, res) => {
    try {
      const prescriptionList = await storage.getAllPrescriptions();
      res.json(prescriptionList);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      res.status(500).json({ message: "Failed to fetch prescriptions" });
    }
  });

  // Update prescription status
  app.patch("/api/admin/prescriptions/:id", isAuthenticated, async (req, res) => {
    try {
      const prescriptionId = parseInt(req.params.id);

      if (isNaN(prescriptionId)) {
        return res.status(400).json({ message: "Invalid prescription ID" });
      }

      // Validate using shared schema from @shared/schema.ts
      const validationResult = updatePrescriptionSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: validationResult.error.flatten().fieldErrors 
        });
      }

      const { status, reviewNotes, implementationProgress } = validationResult.data;
      const updatedPrescription = await storage.updatePrescription(prescriptionId, {
        status,
        reviewNotes,
        implementationProgress,
      });

      res.json(updatedPrescription);
    } catch (error) {
      console.error("Error updating prescription:", error);
      res.status(500).json({ message: "Failed to update prescription" });
    }
  });

  // ========================================
  // ADMIN - AI Settings
  // ========================================

  // Get all AI settings
  app.get("/api/admin/ai-settings", isAuthenticated, async (req, res) => {
    try {
      const { aiSettingsService } = await import('./services/ai-settings');
      const settings = await aiSettingsService.getAllSettings();
      
      const providers = ['claude', 'openai', 'deepseek'];
      const features = [
        { id: 'assessment', name: 'Business Assessment', description: 'AI analysis for Digital IQ assessments' },
        { id: 'prescription', name: 'Prescriptions', description: 'AI-generated business recommendations' },
        { id: 'coach_blue', name: 'Coach Blue', description: 'AI coaching conversations (premium quality)' },
      ];

      res.json({
        settings,
        providers,
        features,
        costEstimates: {
          claude: { per1kTokens: 0.015, quality: 'Premium' },
          openai: { per1kTokens: 0.030, quality: 'Premium' },
          deepseek: { per1kTokens: 0.0014, quality: 'Good' },
        },
      });
    } catch (error) {
      console.error("Error fetching AI settings:", error);
      res.status(500).json({ message: "Failed to fetch AI settings" });
    }
  });

  // Update AI provider for a feature
  app.patch("/api/admin/ai-settings/:feature", isAuthenticated, async (req, res) => {
    try {
      const feature = req.params.feature as 'assessment' | 'prescription' | 'coach_blue';
      const { provider } = req.body;

      if (!['assessment', 'prescription', 'coach_blue'].includes(feature)) {
        return res.status(400).json({ message: "Invalid feature" });
      }

      if (!['claude', 'openai', 'deepseek'].includes(provider)) {
        return res.status(400).json({ message: "Invalid provider" });
      }

      const { aiSettingsService } = await import('./services/ai-settings');
      await aiSettingsService.updateProvider(feature, provider);

      res.json({ success: true, feature, provider });
    } catch (error) {
      console.error("Error updating AI settings:", error);
      res.status(500).json({ message: "Failed to update AI settings" });
    }
  });

  // Test AI provider connectivity (direct test, no fallback)
  app.post("/api/admin/ai-settings/test", isAuthenticated, async (req, res) => {
    try {
      const { provider } = req.body;

      if (!['claude', 'openai', 'deepseek'].includes(provider)) {
        return res.status(400).json({ message: "Invalid provider" });
      }

      const { unifiedAI } = await import('./services/ai-provider');
      const result = await unifiedAI.testProvider(provider);

      if (result.success) {
        res.json({
          success: true,
          provider,
          message: result.message,
          tokensUsed: result.tokensUsed,
        });
      } else {
        res.status(500).json({
          success: false,
          provider,
          error: result.message,
        });
      }
    } catch (error: any) {
      console.error(`Error testing ${req.body.provider}:`, error);
      res.status(500).json({
        success: false,
        provider: req.body.provider,
        error: error.message || 'Failed to connect to provider',
      });
    }
  });

  // ========================================
  // PORTAL - Prescriptions (Public + Client Access)
  // ========================================

  // Get prescription by access token (for email links - no auth required)
  app.get("/api/portal/prescriptions/token/:token", async (req, res) => {
    try {
      const { token } = req.params;

      if (!token || token.length !== 64) {
        return res.status(400).json({ message: "Invalid prescription token" });
      }

      // Find prescription by access token
      const [prescription] = await db
        .select()
        .from(prescriptions)
        .where(eq(prescriptions.accessToken, token))
        .limit(1);

      if (!prescription) {
        return res.status(404).json({ message: "Prescription not found" });
      }

      // Get associated assessment data for Digital IQ score
      const assessment = prescription.assessmentId 
        ? await storage.getAssessment(prescription.assessmentId)
        : null;

      // Get recommendations from recommendations table
      const recommendations = prescription.assessmentId
        ? await storage.getRecommendationsByAssessmentId(prescription.assessmentId)
        : [];

      // Mark as viewed if not already
      if (!prescription.viewedAt) {
        await db
          .update(prescriptions)
          .set({ viewedAt: new Date(), updatedAt: new Date() })
          .where(eq(prescriptions.id, prescription.id));
      }

      res.json({
        prescription: {
          id: prescription.id,
          title: prescription.title,
          summary: prescription.summary,
          status: prescription.status,
          implementationProgress: prescription.implementationProgress,
          deliveredAt: prescription.deliveredAt,
          createdAt: prescription.createdAt,
        },
        assessment: assessment ? {
          id: assessment.id,
          businessName: assessment.businessName,
          digitalScore: assessment.digitalScore,
          industry: assessment.industry,
          createdAt: assessment.createdAt,
        } : null,
        recommendations,
      });
    } catch (error) {
      console.error("Error fetching prescription by token:", error);
      res.status(500).json({ message: "Failed to fetch prescription" });
    }
  });

  // Get all prescriptions for current client (requires client auth)
  app.get("/api/portal/prescriptions", requireClientPortalAccess, async (req: any, res) => {
    try {
      const clientEmail = req.clientEmail;

      // Find client by email
      const [client] = await db
        .select()
        .from(clients)
        .where(eq(clients.email, clientEmail))
        .limit(1);

      if (!client) {
        return res.json({ prescriptions: [] });
      }

      // Get prescriptions by client ID or by assessments matching client email
      const clientPrescriptions = await db
        .select({
          prescription: prescriptions,
        })
        .from(prescriptions)
        .where(eq(prescriptions.clientId, client.id))
        .orderBy(desc(prescriptions.createdAt));

      // Also get prescriptions from assessments with matching email (for prescriptions created before account)
      const { assessments: assessmentsTable } = await import('@shared/schema');
      const assessmentPrescriptions = await db
        .select({
          prescription: prescriptions,
          assessment: assessmentsTable,
        })
        .from(prescriptions)
        .innerJoin(assessmentsTable, eq(prescriptions.assessmentId, assessmentsTable.id))
        .where(eq(assessmentsTable.email, clientEmail))
        .orderBy(desc(prescriptions.createdAt));

      // Combine and deduplicate
      const allPrescriptions = [
        ...clientPrescriptions.map(p => p.prescription),
        ...assessmentPrescriptions.map(p => p.prescription),
      ];
      
      const uniquePrescriptions = allPrescriptions.filter((p, index, self) => 
        index === self.findIndex(t => t.id === p.id)
      );

      res.json({ prescriptions: uniquePrescriptions });
    } catch (error) {
      console.error("Error fetching client prescriptions:", error);
      res.status(500).json({ message: "Failed to fetch prescriptions" });
    }
  });

  // Get single prescription with full details (requires client auth)
  app.get("/api/portal/prescriptions/:id", requireClientPortalAccess, async (req: any, res) => {
    try {
      const prescriptionId = parseInt(req.params.id);
      const clientEmail = req.clientEmail;

      if (isNaN(prescriptionId)) {
        return res.status(400).json({ message: "Invalid prescription ID" });
      }

      // Find prescription
      const [prescription] = await db
        .select()
        .from(prescriptions)
        .where(eq(prescriptions.id, prescriptionId))
        .limit(1);

      if (!prescription) {
        return res.status(404).json({ message: "Prescription not found" });
      }

      // Verify client has access (either owns it or assessment email matches)
      let hasAccess = false;

      // Check if client owns the prescription
      const [client] = await db
        .select()
        .from(clients)
        .where(eq(clients.email, clientEmail))
        .limit(1);

      if (client && prescription.clientId === client.id) {
        hasAccess = true;
      }

      // Check if assessment email matches
      if (!hasAccess && prescription.assessmentId) {
        const assessment = await storage.getAssessment(prescription.assessmentId);
        if (assessment && assessment.email === clientEmail) {
          hasAccess = true;
        }
      }

      if (!hasAccess) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Get associated assessment data
      const assessment = prescription.assessmentId 
        ? await storage.getAssessment(prescription.assessmentId)
        : null;

      // Get recommendations
      const recommendations = prescription.assessmentId
        ? await storage.getRecommendationsByAssessmentId(prescription.assessmentId)
        : [];

      // Mark as viewed
      if (!prescription.viewedAt) {
        await db
          .update(prescriptions)
          .set({ viewedAt: new Date(), updatedAt: new Date() })
          .where(eq(prescriptions.id, prescription.id));
      }

      res.json({
        prescription,
        assessment: assessment ? {
          id: assessment.id,
          businessName: assessment.businessName,
          digitalScore: assessment.digitalScore,
          industry: assessment.industry,
          analysisResults: assessment.analysisResults,
          createdAt: assessment.createdAt,
        } : null,
        recommendations,
      });
    } catch (error) {
      console.error("Error fetching prescription:", error);
      res.status(500).json({ message: "Failed to fetch prescription" });
    }
  });

  // Update implementation progress (client can track their progress)
  app.patch("/api/portal/prescriptions/:id/progress", requireClientPortalAccess, async (req: any, res) => {
    try {
      const prescriptionId = parseInt(req.params.id);
      const { implementationProgress } = req.body;
      const clientEmail = req.clientEmail;

      if (isNaN(prescriptionId)) {
        return res.status(400).json({ message: "Invalid prescription ID" });
      }

      if (typeof implementationProgress !== 'number' || implementationProgress < 0 || implementationProgress > 100) {
        return res.status(400).json({ message: "Progress must be a number between 0 and 100" });
      }

      // Find prescription and verify access
      const [prescription] = await db
        .select()
        .from(prescriptions)
        .where(eq(prescriptions.id, prescriptionId))
        .limit(1);

      if (!prescription) {
        return res.status(404).json({ message: "Prescription not found" });
      }

      // Verify client has access
      let hasAccess = false;
      const [client] = await db.select().from(clients).where(eq(clients.email, clientEmail)).limit(1);
      
      if (client && prescription.clientId === client.id) {
        hasAccess = true;
      }

      if (!hasAccess && prescription.assessmentId) {
        const assessment = await storage.getAssessment(prescription.assessmentId);
        if (assessment && assessment.email === clientEmail) {
          hasAccess = true;
        }
      }

      if (!hasAccess) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Update progress
      const [updated] = await db
        .update(prescriptions)
        .set({ 
          implementationProgress, 
          status: implementationProgress === 100 ? 'completed' : 'in_progress',
          updatedAt: new Date() 
        })
        .where(eq(prescriptions.id, prescriptionId))
        .returning();

      res.json(updated);
    } catch (error) {
      console.error("Error updating prescription progress:", error);
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // Verify Magic Link Token and Issue JWT (must be before /api/clients/:id)
  app.get("/api/clients/verify-magic-link", async (req, res) => {
    try {
      const { token } = req.query;

      if (!token || typeof token !== "string") {
        return res.status(400).json({
          success: false,
          message: "Invalid verification link",
        });
      }

      // Get token from database
      const magicToken = await storage.getMagicLinkToken(token);

      if (!magicToken) {
        return res.status(404).json({
          success: false,
          message: "Invalid or expired login link. Please request a new one.",
        });
      }

      // Check if token has been used (allow demo accounts to reuse tokens)
      const isDemoEmail = [
        "demo@businessblueprint.io",
        "test@businessblueprint.io",
        "agency@businessblueprint.io",
      ].includes(magicToken.email.toLowerCase());
      
      if (magicToken.used && !isDemoEmail) {
        return res.status(400).json({
          success: false,
          message:
            "This login link has already been used. Please request a new one.",
        });
      }

      // Check if token has expired
      if (new Date() > new Date(magicToken.expiresAt)) {
        return res.status(400).json({
          success: false,
          message: "This login link has expired. Please request a new one.",
        });
      }

      // Find client by email
      const client = await storage.getClientByEmail(magicToken.email);

      console.log(
        "[Magic Link Verify] Found client:",
        client
          ? { id: client.id, email: client.email, idType: typeof client.id }
          : "null",
      );

      if (!client) {
        return res.status(404).json({
          success: false,
          message: "Account not found",
        });
      }

      // Validate client ID is a valid number
      console.log("[Magic Link Verify] Validating client.id:", {
        id: client.id,
        type: typeof client.id,
        isNaN: isNaN(client.id as any),
        isNumber: typeof client.id === "number",
        fullClient: JSON.stringify(client),
      });

      if (!client.id || typeof client.id !== "number" || isNaN(client.id)) {
        console.error("[Magic Link Verify] Invalid client ID detected:", {
          id: client.id,
          type: typeof client.id,
          isNaN: isNaN(client.id as any),
        });
        return res.status(500).json({
          success: false,
          message: "Account configuration error",
        });
      }

      console.log(
        "[Magic Link Verify] Client ID validation passed:",
        client.id,
      );

      // NOTE: Token is marked as used AFTER successful JWT generation (see below)
      // This prevents tokens from being consumed when downstream operations fail

      // Update login tracking
      console.log(
        "[Magic Link Verify] Updating client login tracking for ID:",
        client.id,
      );
      await storage.updateClient(client.id, {
        lastLoginTime: new Date(),
        loginCount: (client.loginCount || 0) + 1,
      });
      console.log("[Magic Link Verify] Login tracking updated");

      // Auto-create or link CRM contact for /relationships
      try {
        const existingCrmContact = await db
          .select()
          .from(crmContacts)
          .where(eq(crmContacts.email, client.email))
          .limit(1);

        if (existingCrmContact.length === 0) {
          const [crmContact] = await db
            .insert(crmContacts)
            .values({
              clientId: client.id,
              firstName: client.companyName?.split(" ")[0] || "Portal",
              lastName: "User",
              email: client.email,
              phone: client.phone || null,
              lifecycleStage: "lead",
              leadSource: "portal_signup",
            })
            .returning();

          console.log(
            `[Magic Link Verify] Created CRM contact ${crmContact.id} for portal user ${client.email}`,
          );

          await db.insert(crmTimeline).values({
            clientId: client.id,
            contactId: crmContact.id,
            eventType: "portal_login",
            title: `First portal login by ${client.companyName || client.email}`,
            occurredAt: new Date(),
            sourceApp: "relationships",
            actorType: "system",
          });
        } else {
          // Update existing contact to link to this client if not already linked
          if (!existingCrmContact[0].clientId) {
            await db
              .update(crmContacts)
              .set({ clientId: client.id, updatedAt: new Date() })
              .where(eq(crmContacts.id, existingCrmContact[0].id));
            console.log(
              `[Magic Link Verify] Linked existing CRM contact ${existingCrmContact[0].id} to client ${client.id}`,
            );
          }
        }
      } catch (crmError) {
        console.error(
          "[Magic Link Verify] Failed to create/link CRM contact:",
          crmError,
        );
        // Don't fail login if CRM sync fails
      }

      // Generate JWT token
      console.log(
        "[Magic Link Verify] Creating dashboard token for client ID:",
        client.id,
      );
      const jwtToken = await jwtService.createDashboardToken(
        client.id,
        client.email,
      );
      console.log("[Magic Link Verify] JWT token created successfully");

      // Set session for portal access
      (req.session as any).clientId = client.id;
      (req.session as any).email = client.email;
      (req.session as any).isAdmin = client.isAdmin || false;
      console.log("[Magic Link Verify] Session set for client ID:", client.id, "isAdmin:", client.isAdmin);

      // Mark token as used ONLY after everything succeeded
      // This prevents tokens from being consumed when downstream operations fail
      await storage.markTokenAsUsed(token);
      console.log("[Magic Link Verify] Token marked as used after successful verification");

      res.json({
        success: true,
        client: {
          id: client.id,
          companyName: client.companyName,
          email: client.email,
          isEmailVerified: client.isEmailVerified || false,
        },
        token: jwtToken,
        message: "Login successful",
      });
    } catch (error: any) {
      console.error("Magic link verification error:", error);
      console.error("Error stack:", error?.stack);
      console.error("Error message:", error?.message);
      res.status(500).json({
        success: false,
        message: "Verification failed. Please try again.",
        error: error?.message,
        code: error?.code,
      });
    }
  });

  // Client data endpoints for Campaign Pro
  app.get(
    "/api/clients/:id",
    requireClientPortalAccess,
    async (req: any, res) => {
      try {
        const clientId = parseInt(req.params.id);

        // Validate that we have a valid number
        if (isNaN(clientId) || !isFinite(clientId)) {
          console.error(
            "[GET /api/clients/:id] Invalid client ID:",
            req.params.id,
          );
          return res.status(400).json({ message: "Invalid client ID format" });
        }

        const client = await storage.getClient(clientId);

        if (!client) {
          return res.status(404).json({ message: "Client not found" });
        }

        res.json(client);
      } catch (error) {
        console.error("Error fetching client:", error);
        res.status(500).json({ message: "Failed to fetch client" });
      }
    },
  );

  // Get client campaign data (client info + inbox messages + campaign history)
  app.get(
    "/api/clients/:id/campaign-data",
    requireClientPortalAccess,
    async (req: any, res) => {
      try {
        const clientId = parseInt(req.params.id);

        // Validate that we have a valid number
        if (isNaN(clientId) || !isFinite(clientId)) {
          console.error(
            "[GET /api/clients/:id/campaign-data] Invalid client ID:",
            req.params.id,
          );
          return res.status(400).json({ message: "Invalid client ID format" });
        }

        // Get client data directly from storage
        const client = await storage.getClient(clientId);
        if (!client) {
          return res.status(404).json({ message: "Client not found" });
        }

        // Get campaigns and messages
        const campaigns = await storage.getCampaignsByClient(clientId);
        const messages = await storage.getMessagesByClient(clientId);

        const campaignData = {
          client,
          campaigns,
          messages,
          stats: {
            totalCampaigns: campaigns.length,
            activeCampaigns: campaigns.filter((c) => c.status === "active")
              .length,
            totalMessages: messages.length,
            unreadMessages: messages.filter((m) => !m.isRead).length,
          },
        };

        res.json(campaignData);
      } catch (error) {
        console.error("Error fetching campaign data:", error);
        res.status(500).json({ message: "Failed to fetch campaign data" });
      }
    },
  );

  // Get client messages for inbox
  app.get(
    "/api/clients/:id/messages",
    requireClientPortalAccess,
    async (req: any, res) => {
      try {
        const clientId = parseInt(req.params.id);
        const limit = parseInt(req.query.limit as string) || 50;

        const messages = await storage.getClientMessages(clientId, limit);
        res.json(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Failed to fetch messages" });
      }
    },
  );

  // Mark message as read
  app.patch("/api/messages/:id/read", async (req, res) => {
    try {
      const messageId = parseInt(req.params.id);
      await storage.markMessageRead(messageId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });

  // Create new campaign
  app.post("/api/clients/:id/campaigns", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      const campaignData = { ...req.body, clientId };

      const campaign = await storage.createCampaign(campaignData);
      res.json(campaign);
    } catch (error) {
      console.error("Error creating campaign:", error);
      res.status(500).json({ message: "Failed to create campaign" });
    }
  });

  // Dashboard access endpoint with JWT verification
  app.get("/api/dashboard/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const { jwtService } = await import("./services/jwt");

      // Verify JWT token
      const payload = jwtService.verifyToken(token);

      // Check if token is still active in database
      const isActive = await jwtService.isTokenActive(token);
      if (!isActive) {
        return res.status(401).json({ message: "Token has been revoked" });
      }

      // Get dashboard URL from database
      const [dashboardRecord] = await db
        .select()
        .from(dashboardAccess)
        .where(eq(dashboardAccess.accessToken, token));

      if (!dashboardRecord) {
        return res.status(404).json({ message: "Dashboard access not found" });
      }

      res.json({
        message: "Dashboard access verified",
        clientId: payload.clientId,
        permissions: payload.permissions,
        redirectUrl: `/portal?token=${token}`,
      });
    } catch (error) {
      console.error("Error accessing dashboard:", error);
      if (error instanceof Error && error.message.includes("Invalid token")) {
        res.status(401).json({ message: "Invalid or expired token" });
      } else {
        res.status(500).json({ message: "Failed to access dashboard" });
      }
    }
  });

  // JWT public key endpoint for external verification
  app.get("/api/auth/jwks", async (req, res) => {
    try {
      const { jwtService } = await import("./services/jwt");
      const jwk = jwtService.getJWK();

      res.json({
        keys: [jwk],
      });
    } catch (error) {
      console.error("Error getting JWK:", error);
      res.status(500).json({ message: "Failed to get public key" });
    }
  });

  // Create dashboard token endpoint
  app.post("/api/clients/:id/dashboard-token", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      const { jwtService } = await import("./services/jwt");

      const client = await storage.getClient(clientId);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      const token = await jwtService.createDashboardToken(clientId);

      if (token) {
        res.json({
          token,
          dashboardUrl: `/api/dashboard/${token}`,
          expiresIn: "24h",
        });
      } else {
        res.status(500).json({ message: "Failed to create dashboard token" });
      }
    } catch (error) {
      console.error("Error creating dashboard token:", error);
      res.status(500).json({ message: "Failed to create dashboard token" });
    }
  });

  // Client Portal Login - Magic Link authentication
  app.post("/api/clients/login", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email address is required",
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address",
        });
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Auto-create demo accounts on first login attempt
      const demoAccounts: Record<string, string> = {
        "demo@businessblueprint.io": "Demo Restaurant",
        "test@businessblueprint.io": "Test Business",
        "agency@businessblueprint.io": "Social Media Agency",
      };

      // Find client by email (case-insensitive, trimmed)
      let client = await storage.getClientByEmail(normalizedEmail);

      // Auto-create demo account if it doesn't exist
      if (!client && demoAccounts[normalizedEmail]) {
        client = await storage.createClient({
          companyName: demoAccounts[normalizedEmail],
          email: normalizedEmail,
          accountStatus: "active" as const,
        });
        console.log(
          `[Login] Auto-created demo account: ${normalizedEmail} (ID: ${client.id})`,
        );
      }

      if (!client) {
        return res.status(404).json({
          success: false,
          message:
            "No account found with this email address. Please check your email or contact support.",
        });
      }

      // Generate secure random token
      const token = randomBytes(32).toString("hex");

      // Token expires in 24 hours for demo accounts, 15 minutes for others
      const expiresAt = new Date();
      const isDemoAccount = [
        "demo@businessblueprint.io",
        "test@businessblueprint.io",
        "agency@businessblueprint.io",
      ].includes(normalizedEmail);
      expiresAt.setMinutes(
        expiresAt.getMinutes() + (isDemoAccount ? 1440 : 15),
      ); // 24 hours or 15 minutes

      // Store token in database
      await storage.createMagicLinkToken({
        email: normalizedEmail,
        token,
        expiresAt,
      });

      // Generate magic link URL - always use request origin in development
      let frontendUrl: string;
      if (process.env.NODE_ENV === "development") {
        // In development, use the request origin so links work correctly
        const protocol = req.get("x-forwarded-proto") || (req.secure ? "https" : "http");
        const host = req.get("host") || "localhost:5000";
        frontendUrl = `${protocol}://${host}`;
      } else {
        // In production, use FRONTEND_URL or fall back to request origin
        frontendUrl = process.env.FRONTEND_URL || `https://${req.get("host")}`;
      }
      const magicLink = `${frontendUrl}/portal/verify?token=${token}`;

      // Send magic link email asynchronously (fire and forget to avoid blocking)
      const magicLinkEmailService = new ResendEmailService();
      magicLinkEmailService
        .sendMagicLinkEmail(normalizedEmail, magicLink, client.companyName)
        .then((sent: boolean) => {
          if (sent) {
            console.log(`✅ Magic link email sent to ${normalizedEmail}`);
          } else {
            console.warn(
              `⚠️ Failed to send email to ${normalizedEmail}. Magic link: ${magicLink}`,
            );
          }
        })
        .catch((err: Error) => {
          console.error(
            `❌ Error sending magic link email to ${normalizedEmail}:`,
            err.message,
          );
        });

      // For demo accounts, return the magic link directly (Meta App Review)
      // isDemoAccount already defined above

      // Immediately respond to user
      res.json({
        success: true,
        message: isDemoAccount
          ? "Demo account detected - use the link below to login instantly."
          : "Check your email! We've sent you a secure login link.",
        ...(isDemoAccount && {
          demoLink: magicLink,
          note: "This link is provided for Meta App Review testing purposes.",
        }),
        ...(process.env.NODE_ENV === "development" && {
          devToken: token,
          devLink: magicLink,
        }),
      });
    } catch (error) {
      console.error("Client login error:", error);
      res.status(500).json({
        success: false,
        message: "Login failed. Please try again.",
      });
    }
  });

  // Client Portal endpoints
  app.get("/api/client/dashboard/:clientId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const client = await storage.getClient(clientId);

      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      const assessments = await storage.getClientAssessments(clientId);
      const campaigns = await storage.getClientCampaigns(clientId);
      const messages = await storage.getClientMessages(clientId, 10);

      const latestAssessment = assessments[0];
      const digitalScore = latestAssessment?.digitalScore || 0;

      const dashboardData = {
        client,
        digitalScore,
        assessments: assessments.length,
        campaigns: campaigns.length,
        activeCampaigns: campaigns.filter((c) => c.status === "active").length,
        recentMessages: messages,
        lastUpdated: latestAssessment?.createdAt || new Date().toISOString(),
      };

      res.json(dashboardData);
    } catch (error) {
      console.error("Client dashboard error:", error);
      res.status(500).json({ error: "Failed to load dashboard data" });
    }
  });

  app.get("/api/client/list/:clientId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const client = await storage.getClient(clientId);

      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      const rows = await db
        .select()
        .from(businessListings)
        .where(eq(businessListings.clientId, clientId));

      const total = rows.length;
      const verified = rows.filter((r) => r.status === "active").length;
      const pending = rows.filter((r) => r.status === "pending").length;
      const platforms = rows.map((r) => ({
        name: platformDisplayName(r.platform),
        status: r.status === "active" ? "verified" : r.status,
        url: r.url || "#",
      }));

      res.json({ total, verified, pending, platforms });
    } catch (error) {
      console.error("Client list error:", error);
      res.status(500).json({ error: "Failed to load list data" });
    }
  });

  // Get all business listings for a client
  app.get(
    "/api/clients/:id/list",
    requireClientPortalAccess,
    async (req: any, res) => {
      try {
        const clientId = parseInt(req.params.id);

        if (isNaN(clientId)) {
          return res.status(400).json({ error: "Invalid client ID" });
        }

        const client = await storage.getClient(clientId);
        if (!client) {
          return res.status(404).json({ error: "Client not found" });
        }

        const rows = await db
          .select()
          .from(businessListings)
          .where(eq(businessListings.clientId, clientId))
          .orderBy(desc(businessListings.updatedAt));

        const listings = rows.map((r) => ({
          id: r.id,
          platform: platformDisplayName(r.platform),
          status: r.status,
          name: r.name,
          address: r.address,
          phone: r.phone,
          website: r.website,
          hours: r.hours,
          lastUpdated: r.updatedAt?.toISOString() || r.createdAt?.toISOString(),
          url: r.url,
          rating: r.rating ? parseFloat(r.rating) : null,
        }));

        res.json(listings);
      } catch (error) {
        console.error("Error fetching client listings:", error);
        res.status(500).json({ error: "Failed to fetch list" });
      }
    },
  );

  // Get listing metrics for a client
  app.get(
    "/api/clients/:id/list/metrics",
    requireClientPortalAccess,
    async (req: any, res) => {
      try {
        const clientId = parseInt(req.params.id);

        if (isNaN(clientId)) {
          return res.status(400).json({ error: "Invalid client ID" });
        }

        const client = await storage.getClient(clientId);
        if (!client) {
          return res.status(404).json({ error: "Client not found" });
        }

        // Count listings by status
        const rows = await db
          .select()
          .from(businessListings)
          .where(eq(businessListings.clientId, clientId));

        const totalListings = rows.length;
        const activeListings = rows.filter((r) => r.status === "active").length;
        const pendingListings = rows.filter((r) => r.status === "pending").length;
        const errorListings = rows.filter((r) => r.status === "error").length;

        // Average rating from listings that have a rating
        const ratingsWithValues = rows
          .filter((r) => r.rating !== null)
          .map((r) => parseFloat(r.rating!));
        const avgRating =
          ratingsWithValues.length > 0
            ? parseFloat(
                (ratingsWithValues.reduce((a, b) => a + b, 0) / ratingsWithValues.length).toFixed(1),
              )
            : 0;

        // Aggregate views/clicks from metrics snapshots (last 30 days)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const metricsRows = await db
          .select()
          .from(listingMetricsSnapshots)
          .where(
            and(
              eq(listingMetricsSnapshots.clientId, clientId),
              lte(sql`${listingMetricsSnapshots.periodStart}`, new Date()),
            ),
          );

        const recentMetrics = metricsRows.filter(
          (m) => m.periodStart >= thirtyDaysAgo,
        );
        const totalViews = recentMetrics.reduce((sum, m) => sum + (m.views || 0), 0);
        const totalClicks = recentMetrics.reduce((sum, m) => sum + (m.clicks || 0), 0);

        res.json({
          totalListings,
          activeListings,
          pendingListings,
          errorListings,
          totalViews,
          totalClicks,
          avgRating,
        });
      } catch (error) {
        console.error("Error fetching listing metrics:", error);
        res.status(500).json({ error: "Failed to fetch listing metrics" });
      }
    },
  );

  // Get all reviews for a client
  app.get(
    "/api/clients/:id/reviews",
    requireClientPortalAccess,
    async (req: any, res) => {
      try {
        const clientId = parseInt(req.params.id);

        if (isNaN(clientId)) {
          return res.status(400).json({ error: "Invalid client ID" });
        }

        const client = await storage.getClient(clientId);
        if (!client) {
          return res.status(404).json({ error: "Client not found" });
        }

        const reviews = await reviewSyncService.getClientReviews(clientId);

        res.json(
          reviews.map((r) => ({
            id: r.id,
            platform: r.platform.charAt(0).toUpperCase() + r.platform.slice(1),
            rating: r.rating,
            reviewText: r.reviewText || "",
            reviewerName: r.reviewerName,
            reviewDate: r.reviewDate.toISOString(),
            response: r.response || undefined,
            responseDate: r.responseDate?.toISOString() || undefined,
            sentiment: r.sentiment || "neutral",
          })),
        );
      } catch (error) {
        console.error("Error fetching client reviews:", error);
        res.status(500).json({ error: "Failed to fetch reviews" });
      }
    },
  );

  // Get review analytics for a client
  app.get(
    "/api/clients/:id/reviews/analytics",
    requireClientPortalAccess,
    async (req: any, res) => {
      try {
        const clientId = parseInt(req.params.id);

        if (isNaN(clientId)) {
          return res.status(400).json({ error: "Invalid client ID" });
        }

        const client = await storage.getClient(clientId);
        if (!client) {
          return res.status(404).json({ error: "Client not found" });
        }

        const analytics = await reviewSyncService.getClientReviewAnalytics(clientId);

        res.json(analytics);
      } catch (error) {
        console.error("Error fetching review analytics:", error);
        res.status(500).json({ error: "Failed to fetch review analytics" });
      }
    },
  );

  // Respond to a review
  app.post("/api/clients/:id/reviews/:reviewId/respond", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      const reviewId = parseInt(req.params.reviewId);
      const { response, useAI } = req.body;

      if (isNaN(clientId) || isNaN(reviewId)) {
        return res
          .status(400)
          .json({ error: "Invalid client ID or review ID" });
      }

      const client = await storage.getClient(clientId);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      let reviewResponse = response;
      let isAI = false;

      // If AI response requested, generate using ReviewAI service
      if (useAI && !response) {
        try {
          const { reviewAIService } = await import("./services/reviewAI");
          reviewResponse = await reviewAIService.generateResponse(
            client.companyName || "our business",
            response || "Thank you for your review.",
          );
          isAI = true;
        } catch {
          reviewResponse =
            "Thank you for your feedback! We truly appreciate your business and are committed to providing excellent service.";
          isAI = true;
        }
      }

      // Save response to database
      await reviewSyncService.respondToReview(reviewId, reviewResponse, isAI);

      res.json({
        success: true,
        response: reviewResponse,
        postedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error responding to review:", error);
      res.status(500).json({ error: "Failed to post review response" });
    }
  });

  // Sync reviews from Google + Yelp
  app.post(
    "/api/clients/:id/reviews/sync",
    requireClientPortalAccess,
    async (req: any, res) => {
      try {
        const clientId = parseInt(req.params.id);
        if (isNaN(clientId)) {
          return res.status(400).json({ error: "Invalid client ID" });
        }

        const client = await storage.getClient(clientId);
        if (!client) {
          return res.status(404).json({ error: "Client not found" });
        }

        const businessName = client.companyName || "";
        if (!businessName) {
          return res.status(400).json({ error: "Client has no business name set" });
        }

        const result = await reviewSyncService.syncClientReviews(
          clientId,
          businessName,
          client.address || undefined,
          client.phone || undefined,
        );

        res.json({
          success: true,
          ...result,
        });
      } catch (error) {
        console.error("Error syncing reviews:", error);
        res.status(500).json({ error: "Failed to sync reviews" });
      }
    },
  );

  // Create a manual business listing
  app.post("/api/clients/:id/list", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);

      if (isNaN(clientId)) {
        return res.status(400).json({ error: "Invalid client ID" });
      }

      const client = await storage.getClient(clientId);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      const { platform, name, address, phone, website, hours, url } = req.body;

      if (!platform || !name) {
        return res.status(400).json({ error: "Platform and name are required" });
      }

      const [listing] = await db
        .insert(businessListings)
        .values({
          clientId,
          platform: platformInternalName(platform),
          name,
          address: address || null,
          phone: phone || null,
          website: website || null,
          hours: hours || null,
          url: url || null,
          source: "manual",
          status: "pending",
        })
        .returning();

      res.json({
        success: true,
        listing: {
          id: listing.id,
          platform: platformDisplayName(listing.platform),
          status: listing.status,
          name: listing.name,
          address: listing.address,
          phone: listing.phone,
          website: listing.website,
          hours: listing.hours,
          lastUpdated: listing.createdAt?.toISOString(),
          url: listing.url,
        },
      });
    } catch (error) {
      console.error("Error creating listing:", error);
      res.status(500).json({ error: "Failed to create listing" });
    }
  });

  // Sync/discover business listings from Google Places + Yelp
  app.post("/api/clients/:id/list/sync", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);

      if (isNaN(clientId)) {
        return res.status(400).json({ error: "Invalid client ID" });
      }

      const client = await storage.getClient(clientId);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      const businessName = client.companyName || client.name;
      if (!businessName) {
        return res.status(400).json({ error: "Client has no business name set" });
      }

      // Log sync start
      const [syncLog] = await db
        .insert(listingSyncLogs)
        .values({
          clientId,
          syncType: "discovery",
          status: "started",
          platformsScanned: ["google_business", "yelp"],
        })
        .returning();

      // Run sync
      const result = await listingSyncService.syncClientListings(
        clientId,
        businessName,
        client.address || undefined,
        client.phone || undefined,
      );

      // Also sync reviews alongside listings
      try {
        await reviewSyncService.syncClientReviews(
          clientId,
          businessName,
          client.address || undefined,
          client.phone || undefined,
        );
      } catch (reviewErr) {
        console.error("Review sync error (non-blocking):", reviewErr);
      }

      // Update sync log
      await db
        .update(listingSyncLogs)
        .set({
          status: result.errors.length > 0 && result.found === 0 ? "failed" : "completed",
          listingsFound: result.found,
          listingsCreated: result.created,
          listingsUpdated: result.updated,
          errors: result.errors.length > 0 ? result.errors : null,
          completedAt: new Date(),
        })
        .where(eq(listingSyncLogs.id, syncLog.id));

      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("Error syncing listings:", error);
      res.status(500).json({ error: "Failed to sync listings" });
    }
  });

  // Update a business listing
  app.patch("/api/clients/:id/list/:listingId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      const listingId = parseInt(req.params.listingId);

      if (isNaN(clientId) || isNaN(listingId)) {
        return res
          .status(400)
          .json({ error: "Invalid client ID or listing ID" });
      }

      const client = await storage.getClient(clientId);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      // Verify listing belongs to this client
      const [existing] = await db
        .select()
        .from(businessListings)
        .where(
          and(
            eq(businessListings.id, listingId),
            eq(businessListings.clientId, clientId),
          ),
        )
        .limit(1);

      if (!existing) {
        return res.status(404).json({ error: "Listing not found" });
      }

      const parsed = updateBusinessListingSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid update data", details: parsed.error.issues });
      }

      const updates: Record<string, any> = { ...parsed.data, updatedAt: new Date() };

      await db
        .update(businessListings)
        .set(updates)
        .where(eq(businessListings.id, listingId));

      res.json({
        success: true,
        message: "Listing updated successfully",
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating listing:", error);
      res.status(500).json({ error: "Failed to update listing" });
    }
  });

  // AI Coach endpoints
  app.post("/api/ai-coach/guidance", async (req, res) => {
    try {
      const guidance = await aiCoachService.getPersonalizedGuidance(req.body);
      res.json(guidance);
    } catch (error) {
      console.error("Error getting AI guidance:", error);
      res.status(500).json({ message: "Failed to get AI guidance" });
    }
  });

  app.post("/api/ai-coach/help", async (req, res) => {
    try {
      const { task, userContext } = req.body;
      const help = await aiCoachService.getStepByStepHelp(task, userContext);
      res.json(help);
    } catch (error) {
      console.error("Error getting step-by-step help:", error);
      res.status(500).json({ message: "Failed to get help" });
    }
  });

  app.post("/api/ai-coach/progress", async (req, res) => {
    try {
      const analysis = await aiCoachService.analyzeProgress(req.body);
      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing progress:", error);
      res.status(500).json({ message: "Failed to analyze progress" });
    }
  });

  // Subscription Management endpoints

  // Get available subscription plans
  app.get("/api/subscription-plans", async (req, res) => {
    try {
      const plans = await db
        .select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.isActive, true));

      res.json({
        success: true,
        plans: plans.map((plan) => ({
          ...plan,
          features: Array.isArray(plan.features) ? plan.features : [],
          popular: plan.tierLevel === "professional",
          recommended: plan.pathway === "diy" && plan.tierLevel === "basic",
        })),
      });
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch subscription plans",
      });
    }
  });

  // Get available subscription addons
  app.get("/api/subscription-addons", async (req, res) => {
    try {
      const addons = await db
        .select()
        .from(subscriptionAddons)
        .where(eq(subscriptionAddons.isActive, true));

      // Map icons for frontend based on category
      const categoryIconMap: Record<string, string> = {
        seo: "Globe",
        social: "Users",
        ppc: "Zap",
        content: "Sparkles",
        email: "Users",
        reputation: "Star",
        analytics: "Sparkles",
        website: "Globe",
        "ai-coach": "Brain",
        coaching: "Ship",
      };

      const addonsWithIcons = addons.map((addon) => ({
        ...addon,
        icon: categoryIconMap[addon.category as string] || "Sparkles",
        billingType: addon.billingCycle === "one_time" ? "one_time" : "monthly",
      }));

      res.json({
        success: true,
        addons: addonsWithIcons,
      });
    } catch (error) {
      console.error("Error fetching subscription addons:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch subscription addons",
      });
    }
  });

  // Marketplace orders - Process payment for à la carte items
  app.post("/api/marketplace/orders", async (req, res) => {
    try {
      // Validate request body
      const orderSchema = z.object({
        items: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            price: z.number(),
            quantity: z.number(),
            type: z.enum(["app", "addon"]),
          }),
        ),
        paymentToken: z.string().min(16, "Valid payment token required"),
        customerInfo: z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Valid email required"),
          phone: z.string().optional(),
          address: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          zip: z.string().optional(),
        }),
        totals: z.object({
          subtotal: z.number(),
          tax: z.number(),
          total: z.number(),
        }),
      });

      const validation = orderSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid order data",
          errors: validation.error.errors,
        });
      }

      const { items, paymentToken, customerInfo, totals } = validation.data;

      // SECURITY: Recalculate totals server-side
      const calculatedSubtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const calculatedTax = calculatedSubtotal * 0.08; // 8% tax
      const calculatedTotal = calculatedSubtotal + calculatedTax;

      // Verify client-provided totals match server calculations (within 1 cent for rounding)
      if (Math.abs(calculatedTotal - totals.total) > 0.01) {
        return res.status(400).json({
          success: false,
          message: "Order total mismatch. Please refresh and try again.",
        });
      }

      // Create recurring subscription with NMI for the monthly total
      const nmiRequest = {
        planId: "marketplace-order-" + Date.now(), // Unique identifier
        customerData: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone || "",
          address: customerInfo.address || "",
          city: customerInfo.city || "",
          state: customerInfo.state || "",
          zip: customerInfo.zip || "",
        },
        paymentToken,
        planAmount: calculatedTotal.toFixed(2),
        billingCycle: "monthly" as const,
      };

      const nmiResult = await NMIService.createSubscription(nmiRequest);

      if (nmiResult.response !== "1") {
        return res.status(400).json({
          success: false,
          message: nmiResult.responsetext || "Payment processing failed",
        });
      }

      // Provision client account for marketplace purchase
      let client = await storage.getClientByEmail(customerInfo.email);
      if (!client) {
        client = await storage.createClient({
          companyName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          phone: customerInfo.phone || null,
          accountStatus: "active",
        });
      }

      // Map purchased app items to feature codes
      const featureCodeMap: Record<string, string> = {
        respond: "RS", livechat: "LC", send: "SE", post: "PO",
        list: "LI", review: "RE", "ai-coach": "AC",
      };
      const purchasedCodes = items
        .filter((item) => item.type === "app")
        .map((item) => featureCodeMap[item.id])
        .filter(Boolean);

      // Merge with any existing enabled features
      const existingCodes = (client.enabledFeatures || "").split(",").filter(Boolean);
      const allCodes = [...new Set([...existingCodes, ...purchasedCodes])];
      await storage.updateClient(client.id, { enabledFeatures: allCodes.join(",") });

      console.log("Marketplace order successful:", {
        subscriptionId: nmiResult.subscription_id,
        clientId: client.id,
        customerEmail: customerInfo.email,
        items: items.length,
        total: calculatedTotal,
      });

      res.json({
        success: true,
        message: "Order processed successfully",
        subscriptionId: nmiResult.subscription_id,
        clientId: client.id,
        items: items.map((item) => item.name),
      });
    } catch (error) {
      console.error("Error processing marketplace order:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process order. Please try again.",
      });
    }
  });

  // Calculate pricing for selected plan and addons
  app.post("/api/pricing/calculate", async (req, res) => {
    try {
      const {
        planId,
        addons: selectedAddons = [],
        billingCycle = "monthly",
      } = req.body;

      if (!planId) {
        return res.status(400).json({
          success: false,
          message: "Plan ID is required",
        });
      }

      // Get plan details
      const plan = await db
        .select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.planId, planId))
        .limit(1);

      if (plan.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Plan not found",
        });
      }

      // Get addon details
      const addons = await db
        .select()
        .from(subscriptionAddons)
        .where(eq(subscriptionAddons.isActive, true));

      // Calculate pricing using PricingEngine
      const pricing = PricingEngine.calculateSubscriptionPrice(
        plan[0],
        addons,
        selectedAddons,
        billingCycle,
      );

      res.json({
        success: true,
        pricing,
      });
    } catch (error) {
      console.error("Error calculating pricing:", error);
      res.status(500).json({
        success: false,
        message: "Failed to calculate pricing",
      });
    }
  });

  // Calculate bundle pricing from assessment recommendations
  app.post("/api/pricing/calculate-bundle", async (req, res) => {
    try {
      const {
        assessmentId,
        pathway,
        productIds = [],
        billingCycle = "monthly",
      } = req.body;

      if (!assessmentId || !pathway) {
        return res.status(400).json({
          success: false,
          message: "Assessment ID and pathway are required",
        });
      }

      // Get the appropriate plan based on pathway (DIY only)
      const planIdMap: Record<string, string> = {
        diy: "diy-platform",
      };

      const planStringId = planIdMap[pathway];
      const [plan] = await db
        .select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.planId, planStringId))
        .limit(1);

      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Plan not found for pathway",
        });
      }

      // Get selected products with pricing
      const { products: productsTable } = await import("@shared/schema");
      const { inArray } = await import("drizzle-orm");

      let selectedProducts: any[] = [];
      let productsTotal = 0;

      if (productIds.length > 0) {
        selectedProducts = await db
          .select()
          .from(productsTable)
          .where(inArray(productsTable.id, productIds));

        // Calculate total (DIY pricing only)
        productsTotal = selectedProducts.reduce((sum, product) => {
          const price = parseFloat(product.diyPrice || "0");
          return sum + price;
        }, 0);
      }

      // Calculate pricing based on billing cycle
      const basePriceMonthly = parseFloat(plan.basePrice);
      const productsMonthly = productsTotal;

      // Multiply by billing cycle months
      const cycleMonths =
        billingCycle === "quarterly" ? 3 : billingCycle === "annual" ? 12 : 1;
      const subtotal = (basePriceMonthly + productsMonthly) * cycleMonths;

      // Apply discount for longer billing cycles
      let discount = 0;
      if (billingCycle === "quarterly") {
        discount = subtotal * 0.05; // 5% discount
      } else if (billingCycle === "annual") {
        discount = subtotal * 0.15; // 15% discount
      }

      const total = subtotal - discount;

      // Transform to frontend-expected format
      const pricing = {
        planName: plan.name,
        planPrice: basePriceMonthly * cycleMonths,
        selectedAddons: selectedProducts.map((product) => {
          const monthlyPrice = parseFloat(product.diyPrice || "0");
          return {
            name: product.name,
            price: monthlyPrice * cycleMonths,
          };
        }),
        subtotal,
        discount,
        total,
        billingCycle,
        savings: discount,
      };

      res.json({
        success: true,
        pricing,
      });
    } catch (error) {
      console.error("Error calculating bundle pricing:", error);
      res.status(500).json({
        success: false,
        message: "Failed to calculate bundle pricing",
      });
    }
  });

  // Create subscription from assessment
  app.post("/api/subscriptions/create-from-assessment", async (req, res) => {
    try {
      const {
        assessmentId,
        pathway,
        productIds = [],
        billingCycle = "monthly",
      } = req.body;

      if (!assessmentId || !pathway) {
        return res.status(400).json({
          success: false,
          message: "Assessment ID and pathway are required",
        });
      }

      // Get assessment details
      const assessment = await storage.getAssessment(assessmentId);
      if (!assessment) {
        return res.status(404).json({
          success: false,
          message: "Assessment not found",
        });
      }

      // Map pathway to plan ID (DIY only)
      const planIdMap: Record<string, string> = {
        diy: "diy-platform",
      };

      const planStringId = planIdMap[pathway];
      const [plan] = await db
        .select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.planId, planStringId))
        .limit(1);

      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Plan not found",
        });
      }

      // Get selected products for pricing
      const { products: productsTable } = await import("@shared/schema");
      const { inArray } = await import("drizzle-orm");

      let selectedProducts: any[] = [];
      let productsTotal = 0;

      if (productIds.length > 0) {
        selectedProducts = await db
          .select()
          .from(productsTable)
          .where(inArray(productsTable.id, productIds));

        productsTotal = selectedProducts.reduce((sum, product) => {
          const price = parseFloat(product.diyPrice || "0");
          return sum + price;
        }, 0);
      }

      // Calculate pricing based on billing cycle
      const basePriceMonthly = parseFloat(plan.basePrice);
      const productsMonthly = productsTotal;

      // Multiply by billing cycle months
      const cycleMonths =
        billingCycle === "quarterly" ? 3 : billingCycle === "annual" ? 12 : 1;
      const subtotal = (basePriceMonthly + productsMonthly) * cycleMonths;

      // Apply discount for longer billing cycles
      let discount = 0;
      if (billingCycle === "quarterly") {
        discount = subtotal * 0.05;
      } else if (billingCycle === "annual") {
        discount = subtotal * 0.15;
      }

      const total = subtotal - discount;

      // Prepare subscription data with all required fields
      const subscriptionData = {
        assessmentId,
        planId: plan.id,
        status: "pending_payment" as const,
        baseAmount: (basePriceMonthly * cycleMonths).toString(),
        addonAmount: (productsMonthly * cycleMonths).toString(),
        totalAmount: total.toString(),
        billingCycle,
      };

      // Create the subscription
      const subscription = await db
        .insert(subscriptions)
        .values(subscriptionData)
        .returning();

      // Send enrollment confirmation email (assessment already fetched above)
      if (assessment) {
        const pathwayName = "DIY Platform";
        const planName = `${plan.name} (${pathwayName})`;

        // Get selected product names for features list
        const featuresPromises = selectedProducts.map(async (prod) => {
          const product = selectedProducts.find((p) => p.id === prod.id);
          return product?.name || "";
        });
        const productNames = await Promise.all(featuresPromises);

        // Build features list
        const baseFeatures = Array.isArray(plan.features) ? plan.features : [];
        const allFeatures = [...baseFeatures, ...productNames.filter(Boolean)];

        await emailService.sendEnrollmentConfirmation(assessment.email, {
          businessName: assessment.businessName,
          pathway,
          planName,
          monthlyPrice: parseFloat(total.toFixed(2)),
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          features: allFeatures,
        });
      }

      res.json({
        success: true,
        subscription: subscription[0],
        message: "Subscription created successfully",
      });
    } catch (error) {
      console.error("Error creating subscription from assessment:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create subscription",
      });
    }
  });

  // Check trial status for a subscription
  app.get("/api/subscriptions/:id/trial-status", async (req, res) => {
    try {
      const { id } = req.params;

      const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.id, parseInt(id)));

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: "Subscription not found",
        });
      }

      const now = new Date();
      const isTrialActive =
        subscription.isTrialActive &&
        subscription.trialPeriodEnd &&
        now < subscription.trialPeriodEnd;

      res.json({
        success: true,
        trialStatus: {
          isTrialActive,
          trialPeriodEnd: subscription.trialPeriodEnd,
          daysRemaining:
            isTrialActive && subscription.trialPeriodEnd
              ? Math.ceil(
                  (subscription.trialPeriodEnd.getTime() - now.getTime()) /
                    (24 * 60 * 60 * 1000),
                )
              : 0,
        },
      });
    } catch (error) {
      console.error("Error checking trial status:", error);
      res.status(500).json({
        success: false,
        message: "Failed to check trial status",
      });
    }
  });

  // Create new subscription
  app.post("/api/subscriptions", async (req, res) => {
    try {
      // Validate request body with Zod schema
      const subscriptionSchema = z.object({
        planId: z.string().min(1, "Plan ID is required"),
        addons: z
          .array(
            z.object({
              addonId: z.string(),
              quantity: z.number().optional(),
            }),
          )
          .default([]),
        billingCycle: z.enum(["monthly", "quarterly", "annual"]),
        paymentToken: z.string().min(16, "Valid payment token required"),
        customerInfo: z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Valid email required"),
          phone: z.string().optional(),
          address: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          zip: z.string().optional(),
        }),
      });

      const validation = subscriptionSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid subscription data",
          errors: validation.error.errors,
        });
      }

      const {
        planId,
        addons: selectedAddons,
        billingCycle,
        paymentToken,
        customerInfo,
      } = validation.data;

      // Get plan details
      const plan = await db
        .select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.planId, planId))
        .limit(1);

      if (plan.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Plan not found",
        });
      }

      // Get addon details for subscription creation
      const addons = await db
        .select()
        .from(subscriptionAddons)
        .where(eq(subscriptionAddons.isActive, true));

      // SECURITY: Recalculate pricing server-side - never trust client amounts
      const pricing = PricingEngine.calculateSubscriptionPrice(
        plan[0],
        addons,
        selectedAddons,
        billingCycle,
      );

      // Handle setup fee separately if present (including setup fee tax)
      let setupTransactionResult = null;
      if (pricing.setupFee > 0) {
        setupTransactionResult = await NMIService.processTransaction(
          paymentToken,
          pricing.oneTimeTotal.toFixed(2), // setupFee + setupFeeTax
          `${plan[0].name} Setup Fee`,
        );

        if (setupTransactionResult.response !== "1") {
          return res.status(400).json({
            success: false,
            message:
              setupTransactionResult.responsetext || "Setup fee payment failed",
          });
        }
      }

      // Check if AI Coach addon is selected for trial eligibility
      const hasAiCoachAddon = selectedAddons.some(
        (addon) =>
          addons.find((a) => a.addonId === addon.addonId)?.category ===
          "ai-coach",
      );

      // 7-day trial for AI Coach addons
      const isTrialEligible = hasAiCoachAddon;
      const trialPeriodEnd = isTrialEligible
        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        : null;

      // Create NMI subscription for recurring charges only (no setup fee components)
      const recurringAmount = pricing.recurringTotal.toFixed(2); // recurringSubtotal + recurringTax
      const nmiRequest = {
        planId: plan[0].planId,
        customerData: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone || "",
          address: customerInfo.address || "",
          city: customerInfo.city || "",
          state: customerInfo.state || "",
          zip: customerInfo.zip || "",
        },
        paymentToken,
        planAmount: recurringAmount,
        billingCycle,
        startDate: trialPeriodEnd
          ? trialPeriodEnd.toISOString().split("T")[0]
          : undefined, // Start billing after trial
      };

      const nmiResult = await NMIService.createSubscription(nmiRequest);

      if (nmiResult.response !== "1") {
        return res.status(400).json({
          success: false,
          message: nmiResult.responsetext || "Subscription creation failed",
        });
      }

      // Provision client account: find existing or create new
      let client = await storage.getClientByEmail(customerInfo.email);
      if (!client) {
        client = await storage.createClient({
          companyName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          phone: customerInfo.phone || null,
          address: [customerInfo.address, customerInfo.city, customerInfo.state, customerInfo.zip]
            .filter(Boolean)
            .join(", ") || null,
          accountStatus: "active",
        });
      }

      // All plans include all core apps; map plan features to enabledFeatures codes
      const coreFeatures = "RS,LC,SE,PO,LI,RE"; // respond, livechat, send, post, list, review
      const hasAiCoach = selectedAddons.some(
        (addon) => addons.find((a) => a.addonId === addon.addonId)?.category === "coaching",
      );
      const enabledFeatures = hasAiCoach ? `${coreFeatures},AC` : coreFeatures;

      await storage.updateClient(client.id, { enabledFeatures });

      // Create local subscription record with proper separated amounts
      const subscriptionData = {
        nmiSubscriptionId: nmiResult.subscription_id,
        clientId: client.id,
        planId: plan[0].id,
        status: isTrialEligible ? "trial" : "active",
        baseAmount: pricing.basePrice.toFixed(2),
        addonAmount: pricing.totalAddons.toFixed(2),
        totalAmount: pricing.recurringTotal.toFixed(2), // Only recurring charges in subscription record
        billingCycle,
        paymentMethod: {
          type: "card",
          maskedNumber: "****1234",
          lastFour: "1234",
        },
        currentPeriodStart: new Date(),
        currentPeriodEnd: calculateNextBillingDate(billingCycle),
        nextPaymentDate: isTrialEligible
          ? trialPeriodEnd
          : calculateNextBillingDate(billingCycle),
        trialPeriodEnd: trialPeriodEnd,
        isTrialActive: isTrialEligible,
      };

      const [newSubscription] = await db
        .insert(subscriptions)
        .values(subscriptionData)
        .returning();

      // Save addon selections
      for (const addon of selectedAddons) {
        const addonRecord = addons.find((a) => a.addonId === addon.addonId);
        if (addonRecord) {
          await db.insert(subscriptionAddonSelections).values({
            subscriptionId: newSubscription.id,
            addonId: addonRecord.id,
          });
        }
      }

      res.json({
        success: true,
        subscription: newSubscription,
        nmiSubscriptionId: nmiResult.subscription_id,
        clientId: client.id,
        message: "Subscription created successfully",
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create subscription",
      });
    }
  });

  // Get product recommendations for an assessment
  app.get("/api/assessments/:id/product-recommendations", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.id);
      const recs =
        await productRecommendationService.getRecommendations(assessmentId);

      // Flatten the nested product structure for frontend
      const recommendations = recs.map((rec) => ({
        productId: rec.product.productId, // Use string product ID from catalog
        productName: rec.product.name,
        reason: rec.reason,
        priority: rec.priority,
        diyPrice: rec.product.diyPrice,
        category: rec.product.category,
        currentScore: rec.currentScore,
        projectedScore: rec.projectedScore,
        scoreImprovement: rec.scoreImprovement,
      }));

      res.json({
        success: true,
        recommendations,
      });
    } catch (error) {
      console.error("Error fetching product recommendations:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch product recommendations",
      });
    }
  });

  // Get all products (filtered by delivery method)
  app.get("/api/products", async (req, res) => {
    try {
      const deliveryMethod = req.query.deliveryMethod as string | undefined;
      const category = req.query.category as string | undefined;

      const { products } = await import("@shared/schema");
      const { eq, and } = await import("drizzle-orm");

      // Build where conditions
      const conditions = [eq(products.isActive, true)];
      if (category) {
        conditions.push(eq(products.category, category));
      }

      const allProducts = await db
        .select()
        .from(products)
        .where(and(...conditions));

      // Filter by delivery method if specified
      const filteredProducts = deliveryMethod
        ? allProducts.filter((p) => p.deliveryMethod?.includes(deliveryMethod))
        : allProducts;

      res.json({
        success: true,
        products: filteredProducts,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
      });
    }
  });

  // Get single product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const { products } = await import("@shared/schema");
      const { eq } = await import("drizzle-orm");

      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, productId));

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.json({
        success: true,
        product,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch product",
      });
    }
  });

  // ============================================================================
  // /SEND - Email + SMS Marketing Platform API Routes
  // All routes protected with JWT authentication
  // ============================================================================

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
        ); // Max 1000
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
        ); // Max 1000
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
        ); // Max 1000
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

  // ============================================================================
  // Brand Studio API Routes - Asset Management
  // ============================================================================

  // Configure multer for file uploads (store in memory)
  const multer = await import("multer");
  const upload = multer.default({ storage: multer.default.memoryStorage() });

  // Upload brand asset
  app.post("/api/brand-assets", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const { name, type } = req.body;

      if (!name || !type) {
        return res.status(400).json({
          success: false,
          message: "Name and type are required",
        });
      }

      // Convert file to base64
      const base64Data = req.file.buffer.toString("base64");

      const assetData = {
        name,
        type,
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        data: base64Data,
      };

      const asset = await storage.createBrandAsset(assetData);

      res.json({
        success: true,
        asset: {
          id: asset.id,
          name: asset.name,
          type: asset.type,
          fileName: asset.fileName,
          size: asset.size,
          createdAt: asset.createdAt,
        },
      });
    } catch (error) {
      console.error("Error uploading brand asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload asset",
      });
    }
  });

  // Get all brand assets (optionally filter by type)
  app.get("/api/brand-assets", async (req, res) => {
    try {
      const { type } = req.query;

      const assets =
        type && typeof type === "string"
          ? await storage.getBrandAssetsByType(type)
          : await storage.getAllBrandAssets();

      res.json({
        success: true,
        assets: assets.map((asset) => ({
          id: asset.id,
          name: asset.name,
          type: asset.type,
          fileName: asset.fileName,
          size: asset.size,
          createdAt: asset.createdAt,
        })),
      });
    } catch (error) {
      console.error("Error fetching brand assets:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch assets",
      });
    }
  });

  // Get single brand asset with data
  app.get("/api/brand-assets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid asset ID",
        });
      }

      const asset = await storage.getBrandAsset(id);

      if (!asset) {
        return res.status(404).json({
          success: false,
          message: "Asset not found",
        });
      }

      // Return full asset with base64 data
      res.json({
        success: true,
        asset: {
          id: asset.id,
          name: asset.name,
          type: asset.type,
          fileName: asset.fileName,
          mimeType: asset.mimeType,
          size: asset.size,
          data: asset.data,
          createdAt: asset.createdAt,
        },
      });
    } catch (error) {
      console.error("Error fetching brand asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch asset",
      });
    }
  });

  // Rename brand asset
  app.patch("/api/brand-assets/:id/rename", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { fileName } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid asset ID",
        });
      }

      if (!fileName) {
        return res.status(400).json({
          success: false,
          message: "New filename is required",
        });
      }

      const asset = await storage.getBrandAsset(id);
      if (!asset) {
        return res.status(404).json({
          success: false,
          message: "Asset not found",
        });
      }

      await storage.updateBrandAsset(id, { fileName });

      res.json({
        success: true,
        message: "Asset renamed successfully",
      });
    } catch (error) {
      console.error("Error renaming brand asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to rename asset",
      });
    }
  });

  // Delete brand asset
  app.delete("/api/brand-assets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid asset ID",
        });
      }

      await storage.deleteBrandAsset(id);

      res.json({
        success: true,
        message: "Asset deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting brand asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete asset",
      });
    }
  });

  // Serve brand assets by filename (for favicons) - use /brand-assets/ to avoid conflict
  app.get("/brand-assets/:filename", async (req, res) => {
    try {
      const { filename } = req.params;

      // Get all assets and find by filename
      const allAssets = await storage.getAllBrandAssets();
      const asset = allAssets.find((a) => a.fileName === filename);

      if (!asset) {
        return res.status(404).json({
          success: false,
          message: "Asset not found",
        });
      }

      // Convert base64 to buffer
      const buffer = Buffer.from(asset.data, "base64");

      // Set appropriate headers
      res.setHeader("Content-Type", asset.mimeType);
      res.setHeader("Content-Length", buffer.length);
      res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache for 1 year

      res.send(buffer);
    } catch (error) {
      console.error("Error serving asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to serve asset",
      });
    }
  });

  // Register respond routes
  await registerInboxRoutes(app);

  // Post Management Routes
  app.use('/api/post', contentRoutes);

  // Meta (Facebook/Instagram/WhatsApp) Integration Routes
  app.use("/api/meta", metaRoutes);

  // Task Management Routes (protected by authentication)
  app.use("/api/tasks", isAuthenticated, tasksRouter);

  // Brand Colors Routes
  app.use("/api/brand-colors", brandColorsRoutes);

  // Billing & Account Management Routes
  registerBillingAdminRoutes(app);
  registerEmailAdminRoutes(app);

  // Payment Routes
  registerPaymentRoutes(app);

  // CRM (/relationships) Routes
  app.use("/api/crm", crmRouter);

  // / chat Routes (Live Chat SaaS)
  app.use("/api/chat", chatRouter);

  // Public API v1 Routes (external integrations)
  app.use("/api/v1", publicApiRouter);

  app.use("/api/v1", publicApiRouter);

  // Payment Processing Routes
  registerPaymentRoutes(app);

  // Listing Distribution Routes (push to 100+ directories)
  app.use("/api", listingDistributionRouter);

  // Test Email Endpoint (Admin only - for reviewing email templates)
  app.post("/api/admin/test-emails", async (req, res) => {
    try {
      const { email, assessmentId } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: "Email address is required" });
      }
      
      // Get a real assessment for realistic data, or use defaults
      let testData = {
        businessName: "Demo Business",
        digitalScore: 65,
        assessmentId: assessmentId || 1,
        summary: "Your business shows strong potential but has room for improvement in digital presence.",
        recommendations: [
          { category: "Email & SMS Marketing", title: "Start email campaigns", description: "Begin collecting emails and sending regular newsletters", priority: "high", productId: "send" },
          { category: "Social Media Content", title: "Increase posting frequency", description: "Post 3-5 times per week on social media", priority: "high", productId: "content" },
          { category: "Reputation Management", title: "Respond to reviews", description: "Reply to all customer reviews within 24 hours", priority: "medium", productId: "reputation" },
        ]
      };
      
      if (assessmentId) {
        const assessment = await storage.getAssessment(Number(assessmentId));
        if (assessment) {
          testData = {
            businessName: assessment.businessName,
            digitalScore: assessment.digitalScore || 65,
            assessmentId: assessment.id,
            summary: (assessment.analysisResults as any)?.summary || testData.summary,
            recommendations: (assessment.analysisResults as any)?.recommendations || testData.recommendations,
          };
        }
      }
      
      console.log(`[Test Email] Sending test emails to ${email}...`);
      
      // Send Assessment Report email
      const reportSent = await emailService.sendAssessmentReport(email, testData);
      console.log(`[Test Email] Assessment Report: ${reportSent ? 'SENT' : 'FAILED'}`);
      
      // Send Coach Blue Introduction email
      const coachSent = await emailService.sendThankYouIntroduction(email, {
        businessName: testData.businessName,
        assessmentId: testData.assessmentId,
      });
      console.log(`[Test Email] Coach Blue Intro: ${coachSent ? 'SENT' : 'FAILED'}`);
      
      res.json({
        success: true,
        results: {
          assessmentReport: reportSent,
          coachBlueIntro: coachSent,
        },
        message: `Test emails sent to ${email}`,
      });
    } catch (error) {
      console.error("[Test Email] Error:", error);
      res.status(500).json({ error: "Failed to send test emails" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to calculate next billing date
function calculateNextBillingDate(billingCycle: string): Date {
  const now = new Date();
  switch (billingCycle) {
    case "quarterly":
      return new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days
    case "annual":
      return new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // 365 days
    default: // monthly
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
  }
}

// Background processing function
async function processAssessmentAsync(
  assessmentId: number,
  googleService: GoogleBusinessService,
  aiService: OpenAIAnalysisService,
  emailService: ResendEmailService,
  storage: any,
) {
  console.log(`[Assessment Pipeline] ▶️ STARTING background processing for assessment ID: ${assessmentId}`);
  const startTime = Date.now();
  
  // Helper function to log with timing
  const logStep = (step: string, message: string) => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`[Assessment Pipeline] [${elapsed}s] ${step}: ${message}`);
  };
  
  try {
    // Update status to analyzing
    logStep("Step 1", "Updating status to 'analyzing'...");
    await storage.updateAssessment(assessmentId, { status: "analyzing" });

    const assessment = await storage.getAssessment(assessmentId);
    if (!assessment) throw new Error("Assessment not found");
    
    logStep("Step 1", `✅ Assessment loaded: ${assessment.businessName} (${assessment.email})`);

    // Run ScansBlue Fast Check in parallel (non-blocking, max 10 seconds)
    // This populates the fast_check results for the prescription page
    if (assessment.website) {
      logStep("Step 1.5", `🔍 Starting ScansBlue Fast Check for ${assessment.website}...`);
      
      // Fire-and-forget with 10 second timeout - don't block the pipeline
      (async () => {
        try {
          const fastCheckResult = await scansBlueService.runFastCheck(assessment.website);
          
          if (fastCheckResult && fastCheckResult.success) {
            const r = fastCheckResult.results;
            // Store Fast Check results in database using individual columns
            await db.insert(scansBlueResults).values({
              assessmentId: assessmentId,
              url: assessment.website,
              type: 'fast_check',
              status: 'completed',
              overallScore: r.summary?.overallScore || 0,
              sslPresent: r.ssl?.present || false,
              sslValid: r.ssl?.valid || false,
              sslIssuer: r.ssl?.issuer || null,
              sslExpiresIn: r.ssl?.expiresIn || null,
              loadTime: String(r.performance?.loadTime || 0),
              performanceScore: r.performance?.score || 0,
              mobileOptimized: r.mobile?.optimized || false,
              mobileScore: r.mobile?.score || 0,
              criticalIssues: r.criticalIssues ? JSON.stringify(r.criticalIssues) : null,
              requestedAt: new Date(),
              completedAt: new Date()
            });
            console.log(`[ScansBlue] Fast Check completed and saved for assessment ${assessmentId}`);
          }
        } catch (error) {
          // Don't fail assessment if Fast Check fails
          console.error('[ScansBlue] Fast Check error (non-blocking):', error);
        }
      })();
    }

    // Run comprehensive presence scan
    logStep("Step 2", `🔍 Starting presence scan for ${assessment.businessName}...`);
    const presenceScan = await presenceScannerService.scanBusiness({
      businessName: assessment.businessName,
      website: assessment.website || undefined,
      phone: assessment.phone,
      address: assessment.address,
    });
    logStep("Step 2", `✅ Presence scan complete`);

    // Calculate operational score from self-reported questions (0-70 points)
    const operationalScore = presenceScannerService.calculateOperationalScore({
      collectsEmails: assessment.collectsEmails,
      lastEmailCampaign: assessment.lastEmailCampaign,
      emailListSize: assessment.emailListSize,
      sendsSMS: assessment.sendsSMS,
      lastSMSCampaign: assessment.lastSMSCampaign,
      lastSocialPost: assessment.lastSocialPost,
      socialPostFrequency: assessment.socialPostFrequency,
      socialContentCreator: assessment.socialContentCreator,
      lastReviewResponse: assessment.lastReviewResponse,
      reviewResponseRate: assessment.reviewResponseRate,
      lastNewReview: assessment.lastNewReview,
      inquiryResponseTime: assessment.inquiryResponseTime,
      hasUnifiedInbox: assessment.hasUnifiedInbox,
      missedInquiries: assessment.missedInquiries,
      hasLiveChat: assessment.hasLiveChat,
      lastChatConversation: assessment.lastChatConversation,
      chatResponseTime: assessment.chatResponseTime,
      lastListingUpdate: assessment.lastListingUpdate,
      listingConsistency: assessment.listingConsistency,
      lastGBPPost: assessment.lastGBPPost,
      lastGBPPhoto: assessment.lastGBPPhoto,
      lastWebsiteUpdate: assessment.lastWebsiteUpdate,
      hasBlog: assessment.hasBlog,
      usesCRM: assessment.usesCRM,
      crmPlatform: assessment.crmPlatform,
      lastCRMFollowup: assessment.lastCRMFollowup,
      hasAutomation: assessment.hasAutomation,
    });

    // Calculate combined Digital IQ score (scan 0-70 + operational 0-70 = 0-140)
    const scanScore = presenceScan.overall.digitalIQScore; // Returns 0-70
    const combinedDigitalIQ = presenceScannerService.calculateCombinedDigitalIQ(scanScore, operationalScore);
    console.log(`📊 Final Digital IQ: Scan=${scanScore}/70 + Operational=${operationalScore}/70 = ${combinedDigitalIQ}/140`);

    // Update presenceScan with proper score breakdown for storage
    // This ensures downstream consumers get the correct 0-140 total
    const enhancedPresenceScan = {
      ...presenceScan,
      overall: {
        ...presenceScan.overall,
        digitalIQScore: combinedDigitalIQ, // Combined 0-140 score for backward compatibility
        scanScore: scanScore, // Scan-only 0-70
        operationalScore: operationalScore, // Operational-only 0-70
      }
    };

    // Get Google Business data (still used for detailed GBP info)
    const googleData = await googleService.searchBusiness(
      assessment.businessName,
      assessment.address,
    );

    // Calculate presence score using our independent scanner + operational data
    const presenceScore = {
      overallScore: combinedDigitalIQ, // Use combined score (scan + operational)
      scanScore: scanScore, // Scan-only score (0-70)
      operationalScore: operationalScore, // Operational-only score (0-70)
      scores: {
        visibility: Math.round(
          enhancedPresenceScan.directories.score * 0.7 +
            enhancedPresenceScan.website.score * 0.3,
        ),
        reviews: enhancedPresenceScan.reviews.score,
        completeness: enhancedPresenceScan.overall.completeness,
        engagement: enhancedPresenceScan.socialMedia.score,
      },
      insights: enhancedPresenceScan.recommendations,
    };

    // Generate product recommendations based on scores
    logStep("Step 4", "Generating product recommendations...");
    const productRecommendations =
      await productRecommendationService.generateRecommendations(assessmentId, {
        visibility: presenceScore.scores.visibility,
        reviews: presenceScore.scores.reviews,
        completeness: presenceScore.scores.completeness,
        engagement: presenceScore.scores.engagement,
        overall: presenceScore.overallScore,
      });
    logStep("Step 4", `✅ Generated ${productRecommendations.length} product recommendations`);

    // Save product recommendations to database
    await productRecommendationService.saveRecommendations(
      assessmentId,
      productRecommendations,
    );

    // Get AI analysis (enhanced with our scan data) - with fallback on failure
    logStep("Step 5", "🤖 Starting AI analysis (this may take 30-60 seconds)...");
    let analysisResult: any = null;
    let aiAnalysisFailed = false;
    
    try {
      analysisResult = await aiService.analyzeBusinessPresence({
        businessInfo: {
          name: assessment.businessName,
          industry: assessment.industry,
          location: assessment.location,
          website: assessment.website || undefined,
        },
        googleData,
        presenceScore,
      });
      logStep("Step 5", `✅ AI analysis complete - summary length: ${analysisResult.summary?.length || 0} chars`);
    } catch (aiError) {
      aiAnalysisFailed = true;
      logStep("Step 5", `⚠️ AI analysis failed - using fallback data. Error: ${aiError}`);
      console.error("[Assessment Pipeline] AI analysis error (using fallback):", aiError);
      
      // Create fallback analysis from scan data - normalize productIds to lowercase
      analysisResult = {
        summary: `Based on our automated scan of ${assessment.businessName}, we identified ${productRecommendations.length} opportunities to improve your digital presence. Your Digital IQ Score is ${combinedDigitalIQ}/140.`,
        recommendations: productRecommendations.map((rec: any) => ({
          category: rec.category || "digital_presence",
          title: rec.title || rec.productName || "Recommendation",
          description: rec.description || rec.reason || "Improve your digital presence",
          priority: rec.priority || "medium",
          estimatedImpact: rec.impact || "moderate",
          estimatedEffort: "medium",
          productId: rec.productId?.toLowerCase?.() || rec.productId, // Normalize to lowercase
          bundleId: rec.bundleId?.toLowerCase?.() || rec.bundleId,
        })),
        strengths: [],
        weaknesses: enhancedPresenceScan.recommendations || [], // Keep as string array
      };
    }

    // Combine AI analysis with our independent scan data
    // Deduplicate recommendations by productId or title to avoid DB constraint violations
    // Guard against undefined recommendations from malformed AI response
    const aiRecs = Array.isArray(analysisResult?.recommendations) ? analysisResult.recommendations : [];
    const scanRecs = Array.isArray(enhancedPresenceScan?.recommendations) ? enhancedPresenceScan.recommendations : [];
    
    const allRecs = [
      ...aiRecs,
      ...scanRecs.map((rec: string) => ({
        category: "digital_presence",
        title: rec,
        description: rec,
        priority: "medium" as const,
        estimatedImpact: "moderate",
        estimatedEffort: "low",
      })),
    ];
    
    const seenProductIds = new Set<string>();
    const seenTitles = new Set<string>();
    const dedupedRecommendations = allRecs.filter((rec: any) => {
      // Dedupe by productId if present - normalize to lowercase for consistent matching
      if (rec.productId) {
        const normalizedId = rec.productId.toLowerCase();
        if (seenProductIds.has(normalizedId)) return false;
        seenProductIds.add(normalizedId);
        // Also normalize the productId on the object for downstream consistency
        rec.productId = normalizedId;
      }
      // Also normalize bundleId
      if (rec.bundleId) {
        rec.bundleId = rec.bundleId.toLowerCase();
      }
      // Also dedupe by title to avoid duplicate scan recommendations
      const titleKey = rec.title?.toLowerCase();
      if (titleKey) {
        if (seenTitles.has(titleKey)) return false;
        seenTitles.add(titleKey);
      }
      return true;
    });
    
    const enhancedAnalysis = {
      ...analysisResult,
      aiAnalysisFailed, // Flag to indicate if we used fallback
      digitalScore: combinedDigitalIQ, // Use combined score (scan + operational)
      scanScore: scanScore, // Scan-only score (0-70)
      operationalScore: operationalScore, // Operational-only score (0-70)
      presenceScan: enhancedPresenceScan, // Include complete scan results with proper scores
      scanDate: enhancedPresenceScan.overall.lastScanned,
      recommendations: dedupedRecommendations,
    };

    // Update assessment with results
    await storage.updateAssessment(assessmentId, {
      googleBusinessData: googleData,
      analysisResults: enhancedAnalysis,
      digitalScore: combinedDigitalIQ, // Use combined score (scan + operational)
      status: "completed",
    });

    // Save recommendations with product IDs
    for (const rec of enhancedAnalysis.recommendations) {
      await storage.createRecommendation({
        assessmentId,
        category: rec.category,
        title: rec.title,
        description: rec.description,
        priority: rec.priority,
        estimatedImpact: rec.estimatedImpact || "moderate",
        estimatedEffort: rec.estimatedEffort || "low",
        productId: (rec as any).productId || null, // String product ID from catalog (inbox, send, etc.)
        bundleId: (rec as any).bundleId || null, // String bundle ID if applicable (commverse, localblue)
      });
    }

    // Create prescription in prescriptions table
    const highPriorityCount = enhancedAnalysis.recommendations.filter(
      (r: any) => r.priority === 'high'
    ).length;
    
    const prescriptionSummary = `
Based on your Digital IQ Score of ${combinedDigitalIQ}/140 (Scan: ${scanScore}/70, Operations: ${operationalScore}/70), we've identified ${enhancedAnalysis.recommendations.length} key opportunities to improve your online presence.

${enhancedAnalysis.summary}

Focus on the ${highPriorityCount} high-priority recommendations first for maximum impact.
`.trim();

    try {
      const accessToken = randomBytes(32).toString('hex');
      const client = await storage.getClientByEmail(assessment.email);
      
      if (!client) {
        console.error(`[Assessment] Cannot create prescription - client not found for ${assessment.email}`);
      } else {
        const [prescription] = await db.insert(prescriptions).values({
          clientId: client.id,
          assessmentId: assessmentId,
          title: `Digital Growth Prescription for ${assessment.businessName}`,
          summary: prescriptionSummary,
          accessToken: accessToken,
          status: 'delivered',
          implementationProgress: 0,
          deliveredAt: new Date(),
        }).returning();

        console.log(`[Assessment] Created prescription ID ${prescription.id} with token ${accessToken.substring(0, 8)}... for assessment ${assessmentId}`);
      }
    } catch (prescriptionError) {
      console.error("[Assessment] Error creating prescription:", prescriptionError);
    }

    // Send email report with enhanced data (including Fast Check results if available)
    logStep("Step 7", `📧 Sending Digital IQ Report email to ${assessment.email}...`);
    try {
      // Retrieve Fast Check results if they exist
      let fastCheckData: any = undefined;
      try {
        const fastCheckResult = await db.query.scansBlueResults?.findFirst({
          where: (results, { eq, and }) => and(
            eq(results.assessmentId, assessmentId),
            eq(results.type, 'fast_check'),
            eq(results.status, 'completed')
          )
        });
        
        if (fastCheckResult) {
          fastCheckData = {
            overallScore: fastCheckResult.overallScore || 0,
            performanceScore: fastCheckResult.performanceScore || 0,
            mobileScore: fastCheckResult.mobileScore || 0,
            sslPresent: fastCheckResult.sslPresent || false,
            sslValid: fastCheckResult.sslValid || false,
            criticalIssues: fastCheckResult.criticalIssues 
              ? JSON.parse(fastCheckResult.criticalIssues) 
              : undefined,
          };
          logStep("Step 7", `✅ Fast Check data found for email (score: ${fastCheckData.overallScore})`);
        }
      } catch (fastCheckError) {
        logStep("Step 7", `⚠️ Could not retrieve Fast Check data: ${fastCheckError}`);
      }
      
      const emailSent = await emailService.sendAssessmentReport(
        assessment.email,
        {
          businessName: assessment.businessName,
          digitalScore: presenceScan.overall.digitalIQScore,
          summary: `Your Digital IQ Score: ${presenceScan.overall.digitalIQScore}/140. ${enhancedAnalysis.summary}`,
          recommendations: enhancedAnalysis.recommendations,
          assessmentId,
          fastCheck: fastCheckData,
        },
      );

      await storage.updateAssessment(assessmentId, { emailSent });
      logStep("Step 7", `✅ Digital IQ Report email ${emailSent ? 'SENT' : 'FAILED'}`);
    } catch (emailError) {
      logStep("Step 7", `❌ Digital IQ Report email ERROR: ${emailError}`);
    }

    // Send thank you and introduction email
    logStep("Step 8", `📧 Sending Coach Blue email to ${assessment.email}...`);
    try {
      const coachSent = await emailService.sendThankYouIntroduction(assessment.email, {
        businessName: assessment.businessName,
        assessmentId,
      });
      logStep("Step 8", `✅ Coach Blue email ${coachSent ? 'SENT' : 'FAILED'}`);
    } catch (coachEmailError) {
      logStep("Step 8", `❌ Coach Blue email ERROR: ${coachEmailError}`);
    }
    
    logStep("COMPLETE", `✅ Assessment ${assessmentId} fully processed!`);
  } catch (error) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.error(`[Assessment Pipeline] [${elapsed}s] ❌ FATAL ERROR processing assessment ${assessmentId}:`, error);
    
    // Even if the main pipeline fails, try to send a fallback email so the customer isn't left waiting
    let reportSent = false;
    let coachSent = false;
    
    try {
      const assessment = await storage.getAssessment(assessmentId);
      if (assessment && assessment.email) {
        console.log(`[Assessment Pipeline] Attempting fallback emails to ${assessment.email}...`);
        
        // Try to send a simplified report - sendAssessmentReport returns boolean, won't throw
        try {
          reportSent = await emailService.sendAssessmentReport(
            assessment.email,
            {
              businessName: assessment.businessName,
              digitalScore: assessment.digitalScore || 50,
              summary: `We've completed your Digital IQ Assessment for ${assessment.businessName}. Due to high demand, some advanced analysis features are still processing. You'll receive a follow-up with additional insights shortly.`,
              recommendations: [
                { category: 'Email Marketing', title: 'Build Your Email List', description: 'Start collecting customer emails to build relationships.', priority: 'high', productId: 'send' },
                { category: 'Reputation', title: 'Monitor Reviews', description: 'Respond to customer reviews to build trust.', priority: 'medium', productId: 'reputation' },
                { category: 'Content', title: 'Create Regular Content', description: 'Post consistently on social media.', priority: 'medium', productId: 'content' },
              ],
              assessmentId,
            },
          );
          console.log(`[Assessment Pipeline] Fallback report email: ${reportSent ? 'SENT' : 'FAILED'}`);
        } catch (reportError) {
          console.error(`[Assessment Pipeline] Fallback report email threw:`, reportError);
        }
        
        // Always try to send Coach Blue email, regardless of report email result
        try {
          coachSent = await emailService.sendThankYouIntroduction(assessment.email, {
            businessName: assessment.businessName,
            assessmentId,
          });
          console.log(`[Assessment Pipeline] Fallback Coach Blue email: ${coachSent ? 'SENT' : 'FAILED'}`);
        } catch (coachError) {
          console.error(`[Assessment Pipeline] Fallback Coach Blue email threw:`, coachError);
        }
        
        // Update status based on what we sent
        if (reportSent || coachSent) {
          await storage.updateAssessment(assessmentId, { 
            emailSent: reportSent, 
            status: "partial" 
          });
        } else {
          await storage.updateAssessment(assessmentId, { status: "failed" });
        }
      } else {
        await storage.updateAssessment(assessmentId, { status: "failed" });
      }
    } catch (fallbackError) {
      console.error(`[Assessment Pipeline] Fallback process failed:`, fallbackError);
      try {
        await storage.updateAssessment(assessmentId, { status: "failed" });
      } catch (updateError) {
        console.error(`[Assessment Pipeline] Could not update status to failed:`, updateError);
      }
    }
  }
}

// ========================================
// UNIFIED RESPOND API ROUTES (Added to registerRoutes)
// ========================================

async function registerInboxRoutes(app: Express) {
  // Create livechat session (public - for customer-facing chat widget)
  // Also auto-creates CRM contact if email is provided (Performance tier feature)
  app.post("/api/respond/livechat/session", async (req, res) => {
    try {
      const validatedData = insertLivechatSessionSchema.parse(req.body);

      const [session] = await db
        .insert(livechatSessions)
        .values({
          ...validatedData,
          status: "active",
        })
        .returning();

      let crmContactId: number | null = null;

      // Auto-create CRM contact if email is provided
      if (validatedData.visitorEmail) {
        try {
          // Check if contact exists
          const existing = await db
            .select()
            .from(crmContacts)
            .where(eq(crmContacts.email, validatedData.visitorEmail))
            .limit(1);

          if (existing.length > 0) {
            crmContactId = existing[0].id;

            // Log livechat interaction as timeline event
            await db.insert(crmTimeline).values({
              contactId: existing[0].id,
              eventType: "livechat",
              title: "Started live chat session",
              description: `Visitor started a live chat session from ${validatedData.pageUrl || "unknown page"}`,
              metadata: {
                sessionId: session.sessionId,
                pageUrl: validatedData.pageUrl,
                pageTitle: validatedData.pageTitle,
              },
              sourceApp: "livechat",
              occurredAt: new Date(),
            });
          } else {
            // Create new contact from livechat visitor
            const nameParts = (validatedData.visitorName || "").split(" ");
            const firstName = nameParts[0] || "Visitor";
            const lastName = nameParts.slice(1).join(" ") || "";

            const [newContact] = await db
              .insert(crmContacts)
              .values({
                firstName,
                lastName,
                email: validatedData.visitorEmail,
                lifecycleStage: "lead",
                leadSource: "livechat",
                customFields: {
                  livechatSessionId: session.sessionId,
                  firstPageUrl: validatedData.pageUrl,
                  firstPageTitle: validatedData.pageTitle,
                },
              })
              .returning();

            crmContactId = newContact.id;

            // Log creation event
            await db.insert(crmTimeline).values({
              contactId: newContact.id,
              eventType: "contact_created",
              title: "Contact created from live chat",
              description: `New contact created when ${validatedData.visitorName} started a live chat session`,
              metadata: { sessionId: session.sessionId },
              sourceApp: "livechat",
              occurredAt: new Date(),
            });
          }
        } catch (crmError) {
          console.error("Error creating CRM contact from livechat:", crmError);
          // Don't fail the session creation, just log the error
        }
      }

      res.json({
        success: true,
        session: {
          id: session.id,
          sessionId: session.sessionId,
          conversationId: session.conversationId,
          status: session.status,
          crmContactId,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Invalid session data",
          details: error.errors,
        });
      }
      console.error("Error creating livechat session:", error);
      res.status(500).json({
        success: false,
        error: "Failed to create session",
      });
    }
  });

  // Get all conversations for respond (REQUIRES AUTHENTICATION)
  app.get(
    "/api/respond/conversations",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!; // Get from authenticated JWT token

        const conversations = await db
          .select()
          .from(inboxConversations)
          .where(eq(inboxConversations.clientId, clientId))
          .orderBy(desc(inboxConversations.updatedAt));

        // Get last message for each conversation
        const conversationsWithMessages = await Promise.all(
          conversations.map(async (conv) => {
            const lastMessage = await db
              .select()
              .from(inboxMessages2)
              .where(eq(inboxMessages2.conversationId, conv.id))
              .orderBy(desc(inboxMessages2.createdAt))
              .limit(1);

            return {
              id: conv.id,
              contactName: conv.contactName,
              contactIdentifier: conv.contactIdentifier,
              primaryChannelType: conv.primaryChannelType,
              subject: conv.subject,
              status: conv.status,
              priority: conv.priority,
              unreadCount: conv.unreadCount || 0,
              lastMessageAt: conv.updatedAt,
              lastMessagePreview: lastMessage[0]?.content || null,
            };
          }),
        );

        res.json(conversationsWithMessages);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        res.status(500).json({ error: "Failed to fetch conversations" });
      }
    },
  );

  // Get messages for a conversation (REQUIRES AUTHENTICATION)
  app.get(
    "/api/respond/conversations/:conversationId/messages",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const conversationId = parseInt(req.params.conversationId);

        // Verify the conversation belongs to the authenticated client
        const [conversation] = await db
          .select()
          .from(inboxConversations)
          .where(
            and(
              eq(inboxConversations.id, conversationId),
              eq(inboxConversations.clientId, clientId),
            ),
          )
          .limit(1);

        if (!conversation) {
          return res
            .status(404)
            .json({ error: "Conversation not found or access denied" });
        }

        const messages = await db
          .select()
          .from(inboxMessages2)
          .where(eq(inboxMessages2.conversationId, conversationId))
          .orderBy(inboxMessages2.createdAt);

        res.json(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
      }
    },
  );

  // Send a message (REQUIRES AUTHENTICATION)
  app.post(
    "/api/respond/send-message",
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const clientId = req.clientId!;
        const { conversationId, message } = req.body;

        if (!conversationId || !message) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        // Get conversation and verify it belongs to the authenticated client
        const [conversation] = await db
          .select()
          .from(inboxConversations)
          .where(
            and(
              eq(inboxConversations.id, conversationId),
              eq(inboxConversations.clientId, clientId),
            ),
          )
          .limit(1);

        if (!conversation) {
          return res
            .status(404)
            .json({ error: "Conversation not found or access denied" });
        }

        const agentName = "Agent"; // TODO: Get from client profile
        const agentEmail = "agent@businessblueprint.io"; // TODO: Get from client profile

        // Send via appropriate channel
        let deliveryStatus = "sent";
        let errorMessage: string | null = null;

        if (conversation.primaryChannelType === "email") {
          try {
            await inboxEmailService.sendMessage(
              conversationId,
              message,
              agentName,
            );
            deliveryStatus = "delivered";
          } catch (emailError: any) {
            errorMessage = emailError.message;
            console.error("Email send error:", errorMessage);
            return res.status(500).json({
              error: "Failed to send email",
              details: errorMessage,
            });
          }
        }

        const [newMessage] = await db
          .insert(inboxMessages2)
          .values({
            conversationId,
            channelType: conversation.primaryChannelType,
            messageType: "outgoing",
            direction: "outbound",
            content: message,
            fromIdentifier: agentEmail,
            fromName: agentName,
            toIdentifier: conversation.contactIdentifier,
            toName: conversation.contactName || undefined,
            status: deliveryStatus,
          })
          .returning();

        // Update conversation timestamp
        await db
          .update(inboxConversations)
          .set({ updatedAt: new Date() })
          .where(eq(inboxConversations.id, conversationId));

        res.json(newMessage);
      } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Failed to send message" });
      }
    },
  );

  // ============================================================================
  // SCANSBLUE INTEGRATION ROUTES
  // ============================================================================

  // Get ScansBlue results for an assessment
  app.get('/api/scansblue/results/:assessmentId', async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.assessmentId);
      
      if (isNaN(assessmentId)) {
        return res.status(400).json({ error: 'Invalid assessment ID' });
      }
      
      const results = await scansBlueService.getResults(assessmentId);
      
      if (!results) {
        return res.status(404).json({ error: 'No ScansBlue results found' });
      }
      
      res.json(results);
      
    } catch (error) {
      console.error('Error fetching ScansBlue results:', error);
      res.status(500).json({ error: 'Failed to fetch results' });
    }
  });

  // Request Full Report (user-initiated)
  app.post('/api/scansblue/request-report', async (req, res) => {
    try {
      const { url, assessmentId, email } = req.body;
      
      if (!url) {
        return res.status(400).json({ error: 'URL required' });
      }
      
      const result = await scansBlueService.requestFullReport(
        url,
        email,
        assessmentId
      );
      
      if (!result) {
        return res.status(500).json({ error: 'Failed to queue report' });
      }
      
      res.json(result);
      
    } catch (error) {
      console.error('Error requesting full report:', error);
      res.status(500).json({ error: 'Failed to request report' });
    }
  });

  // Webhook endpoint for ScansBlue Full Report completion
  app.post('/api/scansblue-webhook', async (req, res) => {
    try {
      const { reportId, status, url, summary, assessmentId, reportData } = req.body;
      
      console.log(`[Webhook] ScansBlue report ${reportId} status: ${status}`);
      
      if (status === 'completed' && assessmentId) {
        await scansBlueService.updateFullReportStatus(
          assessmentId,
          reportId,
          `https://scansblue.com/reports/${reportId}`,
          status
        );
        
        const parsedAssessmentId = parseInt(assessmentId);
        const assessment = await storage.getAssessment(parsedAssessmentId);
        
        if (assessment) {
          const purchase = await db.query.scansBluePurchases?.findFirst({
            where: (purchases: any, { eq }: any) => eq(purchases.assessmentId, parsedAssessmentId)
          });
          
          const customerEmail = purchase?.email || assessment.email;
          
          if (customerEmail) {
            console.log(`[Webhook] Sending full report email to ${customerEmail}`);
            const emailService = new ResendEmailService();
            await emailService.sendScansBlueFullReport(customerEmail, {
              businessName: assessment.businessName,
              websiteUrl: url || assessment.website || '',
              assessmentId: parsedAssessmentId,
              reportData: reportData || summary || {}
            });
            
            if (purchase) {
              await db.update(scansBluePurchases)
                .set({ reportDeliveredAt: new Date() })
                .where(eq(scansBluePurchases.id, purchase.id));
            }
          }
        }
      }
      
      res.json({ success: true, received: true });
      
    } catch (error) {
      console.error('[Webhook] Error processing ScansBlue webhook:', error);
      res.status(500).json({ success: false, error: 'Webhook processing failed' });
    }
  });

  // Coach Blue triggers Auditor (internal use for technical analysis)
  app.post('/api/coach-blue/technical-analysis', async (req, res) => {
    try {
      const { message, context } = req.body;
      
      const result = await scansBlueService.chatWithAuditor(message, context);
      
      if (!result) {
        return res.status(500).json({ error: 'Analysis failed' });
      }
      
      res.json(result);
      
    } catch (error) {
      console.error('Error in technical analysis:', error);
      res.status(500).json({ error: 'Analysis failed' });
    }
  });
}
