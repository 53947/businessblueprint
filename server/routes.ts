import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
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
  insertSynupLocationSchema,
  insertSynupListingSchema,
  insertSynupReviewSchema,
  insertReviewNotificationPreferencesSchema,
  brandAssets // Import brandAssets schema
} from "@shared/schema";
import { GoogleBusinessService } from "./services/googleBusiness";
import { OpenAIAnalysisService } from "./services/openai";
import { EmailService } from "./services/email";
import { inboxEmailService } from "./services/inbox-email";
import { aiCoachService } from "./services/aiCoach";
import { PricingEngine } from "./services/pricing";
import { NMIService } from "./services/nmi";
import { productRecommendationService } from "./services/productRecommendations";
import { SynupService } from "./services/synup";
import { ReviewMonitoringService } from "./services/reviewMonitoring";
import { reviewAI } from "./services/reviewAI";
import { jwtService } from "./services/jwt";
import { dashboardAccess } from "@shared/schema";
import { eq, desc, and } from "drizzle-orm";
import { db } from "./db";
import { z } from "zod";
import { requireAuth, type AuthenticatedRequest } from "./middleware/auth";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
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
  const emailService = new EmailService();
  const synupService = new SynupService();

  // Create new assessment
  app.post("/api/assessments", async (req, res) => {
    try {
      const validatedData = insertAssessmentSchema.parse(req.body);

      // Create assessment with pending status
      const assessment = await storage.createAssessment(validatedData);

      // Start background analysis
      processAssessmentAsync(assessment.id, googleService, aiService, emailService, storage);

      res.json({ 
        success: true, 
        assessmentId: assessment.id,
        message: "Assessment started. You'll receive results via email within 2-3 minutes."
      });
    } catch (error) {
      console.error("Error creating assessment:", error as Error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid assessment data provided" 
      });
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

      const recommendations = await storage.getRecommendationsByAssessmentId(id);

      res.json({
        assessment,
        recommendations
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

      if (!["diy", "msp", "combination", "none"].includes(pathway)) {
        return res.status(400).json({ message: "Invalid pathway selection" });
      }

      await storage.updateAssessment(id, { selectedPathway: pathway });

      res.json({ success: true, message: "Pathway updated successfully" });
    } catch (error) {
      console.error("Error updating pathway:", error);
      res.status(500).json({ message: "Failed to update pathway" });
    }
  });

  // Get assessments by email
  app.get("/api/assessments", async (req, res) => {
    try {
      const { email } = req.query;

      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: "Email parameter is required" });
      }

      const assessments = await storage.getAssessmentsByEmail(email);
      res.json(assessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });

  // Get client dashboard data
  app.get("/api/clients/:id/dashboard", async (req, res) => {
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

      // Calculate basic metrics
      const dashboardData = {
        client,
        digitalScore: 75, // Could be calculated from various factors
        lastUpdated: client.updatedAt,
        listings: {
          total: client.enabledFeatures ? client.enabledFeatures.split(',').length : 0,
          verified: client.enabledFeatures ? client.enabledFeatures.split(',').length - 1 : 0,
          pending: 1,
          citations: 12, // Placeholder for citations count
          platforms: ["Google Business", "Yelp", "Facebook", "Apple Maps"]
        },
        reviews: {
          average: 4.3,
          total: 156,
          recent: 12,
          response_rate: 85
        },
        campaigns: {
          active: campaigns.filter((c: any) => c.status === 'active').length,
          pending: campaigns.filter((c: any) => c.status === 'draft').length,
          total: campaigns.length,
          performance: {
            reach: 2340,
            clicks: 89,
            conversions: 12
          },
          latest: latestCampaign ? {
            name: latestCampaign.name || 'Recent Campaign',
            status: latestCampaign.status || 'active',
            unsubscribes: 3, // Placeholder - will be from analytics
            clickThroughs: 47, // Placeholder
            purchases: 8, // Placeholder
            sent: 250 // Placeholder - will be from campaign analytics
          } : null
        },
        socialMedia: {
          isSetup: false, // Placeholder - check if profiles connected
          newLikes: 24,
          newComments: 8,
          newMessages: 5,
          connectedProfiles: 0
        },
        livechat: {
          isSetup: false, // Placeholder - check if widget installed
          participationRating: 4.8,
          inQueue: 2,
          totalChats: 145,
          avgResponseTime: '2.3 min'
        },
        messages: {
          unread: messages.filter((m: any) => !m.isRead).length,
          total: messages.length,
          recent: messages.slice(0, 5)
        }
      };

      res.json({ success: true, data: dashboardData });
    } catch (error) {
      console.error("Error fetching client dashboard:", error);
      res.status(500).json({ 
        message: "Failed to fetch dashboard data",
        error: (error as Error).message
      });
    }
  });

  // Client data endpoints for Campaign Pro
  app.get("/api/clients/:id", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      const client = await storage.getClient(clientId);

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      res.json(client);
    } catch (error) {
      console.error("Error fetching client:", error);
      res.status(500).json({ message: "Failed to fetch client" });
    }
  });

  // Get client campaign data (client info + inbox messages + campaign history)
  app.get("/api/clients/:id/campaign-data", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);

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
          activeCampaigns: campaigns.filter(c => c.status === 'active').length,
          totalMessages: messages.length,
          unreadMessages: messages.filter(m => !m.isRead).length
        }
      };

      res.json(campaignData);
    } catch (error) {
      console.error("Error fetching campaign data:", error);
      res.status(500).json({ message: "Failed to fetch campaign data" });
    }
  });

  // Get client messages for inbox
  app.get("/api/clients/:id/messages", async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      const limit = parseInt(req.query.limit as string) || 50;

      const messages = await storage.getClientMessages(clientId, limit);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

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
      const { jwtService } = await import('./services/jwt');

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
        redirectUrl: `/portal?token=${token}`
      });
    } catch (error) {
      console.error("Error accessing dashboard:", error);
      if (error instanceof Error && error.message.includes('Invalid token')) {
        res.status(401).json({ message: "Invalid or expired token" });
      } else {
        res.status(500).json({ message: "Failed to access dashboard" });
      }
    }
  });

  // JWT public key endpoint for external verification
  app.get("/api/auth/jwks", async (req, res) => {
    try {
      const { jwtService } = await import('./services/jwt');
      const jwk = jwtService.getJWK();

      res.json({
        keys: [jwk]
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
      const { jwtService } = await import('./services/jwt');

      const client = await storage.getClient(clientId);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      const token = await jwtService.createDashboardToken(clientId);

      if (token) {
        res.json({ 
          token,
          dashboardUrl: `/api/dashboard/${token}`,
          expiresIn: '24h'
        });
      } else {
        res.status(500).json({ message: "Failed to create dashboard token" });
      }
    } catch (error) {
      console.error("Error creating dashboard token:", error);
      res.status(500).json({ message: "Failed to create dashboard token" });
    }
  });

  // Client Portal Login - Email-only authentication
  app.post("/api/clients/login", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email address is required"
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address"
        });
      }

      // Find client by email (case-insensitive, trimmed)
      const client = await storage.getClientByEmail(email.toLowerCase().trim());

      if (!client) {
        return res.status(404).json({
          success: false,
          message: "No account found with this email address. Please check your email or contact support."
        });
      }

      // Update login tracking
      await storage.updateClient(client.id, {
        lastLoginTime: new Date(),
        loginCount: (client.loginCount || 0) + 1
      });

      // Generate JWT token with email
      const token = await jwtService.createDashboardToken(client.id, client.email);

      res.json({
        success: true,
        client: {
          id: client.id,
          companyName: client.companyName,
          email: client.email,
          isEmailVerified: client.isEmailVerified || false
        },
        token,
        message: "Login successful"
      });
    } catch (error) {
      console.error("Client login error:", error);
      res.status(500).json({
        success: false,
        message: "Login failed. Please try again."
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
        activeCampaigns: campaigns.filter(c => c.status === 'active').length,
        recentMessages: messages,
        lastUpdated: latestAssessment?.createdAt || new Date().toISOString()
      };

      res.json(dashboardData);
    } catch (error) {
      console.error("Client dashboard error:", error);
      res.status(500).json({ error: "Failed to load dashboard data" });
    }
  });

  app.get("/api/client/listings/:clientId", async (req, res) => {
    try {
      const clientId = parseInt(req.params.clientId);
      const client = await storage.getClient(clientId);

      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      // Real data will come from Synup APIs
      const listings = {
        total: 45,
        verified: 38,
        pending: 7,
        platforms: [
          { name: "Google Business", status: "verified", url: "#" },
          { name: "Yelp", status: "verified", url: "#" },
          { name: "Facebook", status: "pending", url: "#" },
          { name: "Apple Maps", status: "verified", url: "#" }
        ]
      };

      res.json(listings);
    } catch (error) {
      console.error("Client listings error:", error);
      res.status(500).json({ error: "Failed to load listings data" });
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
      const plans = await db.select().from(subscriptionPlans)
        .where(eq(subscriptionPlans.isActive, true));

      res.json({ 
        success: true, 
        plans: plans.map(plan => ({
          ...plan,
          features: Array.isArray(plan.features) ? plan.features : [],
          popular: plan.tierLevel === 'professional',
          recommended: plan.pathway === 'msp' && plan.tierLevel === 'basic'
        }))
      });
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch subscription plans" 
      });
    }
  });

  // Get available subscription addons
  app.get("/api/subscription-addons", async (req, res) => {
    try {
      const addons = await db.select().from(subscriptionAddons)
        .where(eq(subscriptionAddons.isActive, true));

      // Map icons for frontend based on category
      const categoryIconMap: Record<string, string> = {
        'seo': 'Globe',
        'social': 'Users',
        'ppc': 'Zap',
        'content': 'Sparkles',
        'email': 'Users',
        'reputation': 'Star',
        'analytics': 'Sparkles',
        'website': 'Globe',
        'ai-coach': 'Brain',
        'coaching': 'Ship'
      };

      const addonsWithIcons = addons.map(addon => ({
        ...addon,
        icon: categoryIconMap[addon.category as string] || 'Sparkles',
        billingType: addon.billingCycle === 'one_time' ? 'one_time' : 'monthly'
      }));

      res.json({ 
        success: true, 
        addons: addonsWithIcons 
      });
    } catch (error) {
      console.error("Error fetching subscription addons:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch subscription addons" 
      });
    }
  });

  // Marketplace orders - Process payment for à la carte items
  app.post("/api/marketplace/orders", async (req, res) => {
    try {
      // Validate request body
      const orderSchema = z.object({
        items: z.array(z.object({
          id: z.string(),
          name: z.string(),
          price: z.number(),
          quantity: z.number(),
          type: z.enum(['app', 'addon'])
        })),
        paymentToken: z.string().min(16, "Valid payment token required"),
        customerInfo: z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Valid email required"),
          phone: z.string().optional(),
          address: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          zip: z.string().optional()
        }),
        totals: z.object({
          subtotal: z.number(),
          tax: z.number(),
          total: z.number()
        })
      });

      const validation = orderSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid order data",
          errors: validation.error.errors
        });
      }

      const { items, paymentToken, customerInfo, totals } = validation.data;

      // SECURITY: Recalculate totals server-side
      const calculatedSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const calculatedTax = calculatedSubtotal * 0.08; // 8% tax
      const calculatedTotal = calculatedSubtotal + calculatedTax;

      // Verify client-provided totals match server calculations (within 1 cent for rounding)
      if (Math.abs(calculatedTotal - totals.total) > 0.01) {
        return res.status(400).json({ 
          success: false, 
          message: "Order total mismatch. Please refresh and try again." 
        });
      }

      // Create recurring subscription with NMI for the monthly total
      const nmiRequest = {
        planId: 'marketplace-order-' + Date.now(), // Unique identifier
        customerData: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone || '',
          address: customerInfo.address || '',
          city: customerInfo.city || '',
          state: customerInfo.state || '',
          zip: customerInfo.zip || ''
        },
        paymentToken,
        planAmount: calculatedTotal.toFixed(2),
        billingCycle: 'monthly' as const
      };

      const nmiResult = await NMIService.createSubscription(nmiRequest);

      if (nmiResult.response !== '1') {
        return res.status(400).json({ 
          success: false, 
          message: nmiResult.responsetext || 'Payment processing failed' 
        });
      }

      // Log successful order (could save to database if needed)
      console.log('✅ Marketplace order successful:', {
        subscriptionId: nmiResult.subscription_id,
        customerEmail: customerInfo.email,
        items: items.length,
        total: calculatedTotal
      });

      res.json({ 
        success: true, 
        message: "Order processed successfully",
        subscriptionId: nmiResult.subscription_id,
        items: items.map(item => item.name)
      });
    } catch (error) {
      console.error("Error processing marketplace order:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to process order. Please try again." 
      });
    }
  });

  // Calculate pricing for selected plan and addons
  app.post("/api/pricing/calculate", async (req, res) => {
    try {
      const { planId, addons: selectedAddons = [], billingCycle = 'monthly' } = req.body;

      if (!planId) {
        return res.status(400).json({ 
          success: false, 
          message: "Plan ID is required" 
        });
      }

      // Get plan details
      const plan = await db.select().from(subscriptionPlans)
        .where(eq(subscriptionPlans.planId, planId))
        .limit(1);

      if (plan.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: "Plan not found" 
        });
      }

      // Get addon details
      const addons = await db.select().from(subscriptionAddons)
        .where(eq(subscriptionAddons.isActive, true));

      // Calculate pricing using PricingEngine
      const pricing = PricingEngine.calculateSubscriptionPrice(
        plan[0],
        addons,
        selectedAddons,
        billingCycle
      );

      res.json({ 
        success: true, 
        pricing 
      });
    } catch (error) {
      console.error("Error calculating pricing:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to calculate pricing" 
      });
    }
  });

  // Calculate bundle pricing from assessment recommendations  
  app.post("/api/pricing/calculate-bundle", async (req, res) => {
    try {
      const { assessmentId, pathway, productIds = [], billingCycle = 'monthly' } = req.body;

      if (!assessmentId || !pathway) {
        return res.status(400).json({ 
          success: false, 
          message: "Assessment ID and pathway are required" 
        });
      }

      // Get the appropriate plan based on pathway
      const planIdMap: Record<string, string> = {
        'diy': 'diy-platform',
        'msp': 'msp-starter',
        'combination': 'msp-starter'
      };

      const planStringId = planIdMap[pathway];
      const [plan] = await db.select().from(subscriptionPlans)
        .where(eq(subscriptionPlans.planId, planStringId))
        .limit(1);

      if (!plan) {
        return res.status(404).json({ 
          success: false, 
          message: "Plan not found for pathway" 
        });
      }

      // Get selected products with pricing
      const { products: productsTable } = await import("@shared/schema");
      const { inArray } = await import("drizzle-orm");

      let selectedProducts: any[] = [];
      let productsTotal = 0;

      if (productIds.length > 0) {
        selectedProducts = await db.select().from(productsTable)
          .where(inArray(productsTable.id, productIds));

        // Calculate total based on pathway
        productsTotal = selectedProducts.reduce((sum, product) => {
          const price = pathway === 'diy' 
            ? parseFloat(product.diyPrice || '0') 
            : parseFloat(product.mspPrice || '0');
          return sum + price;
        }, 0);
      }

      // Calculate pricing based on billing cycle
      const basePriceMonthly = parseFloat(plan.basePrice);
      const productsMonthly = productsTotal;

      // Multiply by billing cycle months
      const cycleMonths = billingCycle === 'quarterly' ? 3 : billingCycle === 'annual' ? 12 : 1;
      const subtotal = (basePriceMonthly + productsMonthly) * cycleMonths;

      // Apply discount for longer billing cycles
      let discount = 0;
      if (billingCycle === 'quarterly') {
        discount = subtotal * 0.05; // 5% discount
      } else if (billingCycle === 'annual') {
        discount = subtotal * 0.15; // 15% discount
      }

      const total = subtotal - discount;

      // Transform to frontend-expected format
      const pricing = {
        planName: plan.name,
        planPrice: basePriceMonthly * cycleMonths,
        selectedAddons: selectedProducts.map(product => {
          const monthlyPrice = pathway === 'diy' 
            ? parseFloat(product.diyPrice || '0') 
            : parseFloat(product.mspPrice || '0');
          return {
            name: product.name,
            price: monthlyPrice * cycleMonths
          };
        }),
        subtotal,
        discount,
        total,
        billingCycle,
        savings: discount
      };

      res.json({ 
        success: true, 
        pricing
      });
    } catch (error) {
      console.error("Error calculating bundle pricing:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to calculate bundle pricing" 
      });
    }
  });

  // Create subscription from assessment
  app.post("/api/subscriptions/create-from-assessment", async (req, res) => {
    try {
      const { assessmentId, pathway, productIds = [], billingCycle = 'monthly' } = req.body;

      if (!assessmentId || !pathway) {
        return res.status(400).json({ 
          success: false, 
          message: "Assessment ID and pathway are required" 
        });
      }

      // Get assessment details
      const assessment = await storage.getAssessment(assessmentId);
      if (!assessment) {
        return res.status(404).json({ 
          success: false, 
          message: "Assessment not found" 
        });
      }

      // Map pathway to plan ID
      const planIdMap: Record<string, string> = {
        'diy': 'diy-platform',
        'msp': 'msp-starter',
        'combination': 'msp-starter'
      };

      const planStringId = planIdMap[pathway];
      const [plan] = await db.select().from(subscriptionPlans)
        .where(eq(subscriptionPlans.planId, planStringId))
        .limit(1);

      if (!plan) {
        return res.status(404).json({ 
          success: false, 
          message: "Plan not found" 
        });
      }

      // Get selected products for pricing
      const { products: productsTable } = await import("@shared/schema");
      const { inArray } = await import("drizzle-orm");

      let selectedProducts: any[] = [];
      let productsTotal = 0;

      if (productIds.length > 0) {
        selectedProducts = await db.select().from(productsTable)
          .where(inArray(productsTable.id, productIds));

        productsTotal = selectedProducts.reduce((sum, product) => {
          const price = pathway === 'diy' 
            ? parseFloat(product.diyPrice || '0') 
            : parseFloat(product.mspPrice || '0');
          return sum + price;
        }, 0);
      }

      // Calculate pricing based on billing cycle
      const basePriceMonthly = parseFloat(plan.basePrice);
      const productsMonthly = productsTotal;

      // Multiply by billing cycle months
      const cycleMonths = billingCycle === 'quarterly' ? 3 : billingCycle === 'annual' ? 12 : 1;
      const subtotal = (basePriceMonthly + productsMonthly) * cycleMonths;

      // Apply discount for longer billing cycles
      let discount = 0;
      if (billingCycle === 'quarterly') {
        discount = subtotal * 0.05;
      } else if (billingCycle === 'annual') {
        discount = subtotal * 0.15;
      }

      const total = subtotal - discount;

      // Prepare subscription data with all required fields
      const subscriptionData = {
        assessmentId,
        planId: plan.id,
        status: 'pending_payment' as const,
        baseAmount: (basePriceMonthly * cycleMonths).toString(),
        addonAmount: (productsMonthly * cycleMonths).toString(),
        totalAmount: total.toString(),
        billingCycle,
      };

      // Create the subscription
      const subscription = await db.insert(subscriptions)
        .values(subscriptionData)
        .returning();

      res.json({ 
        success: true, 
        subscription: subscription[0],
        message: "Subscription created successfully" 
      });
    } catch (error) {
      console.error("Error creating subscription from assessment:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create subscription" 
      });
    }
  });

  // Check trial status for a subscription
  app.get("/api/subscriptions/:id/trial-status", async (req, res) => {
    try {
      const { id } = req.params;

      const [subscription] = await db.select()
        .from(subscriptions)
        .where(eq(subscriptions.id, parseInt(id)));

      if (!subscription) {
        return res.status(404).json({ 
          success: false, 
          message: "Subscription not found" 
        });
      }

      const now = new Date();
      const isTrialActive = subscription.isTrialActive && 
        subscription.trialPeriodEnd && 
        now < subscription.trialPeriodEnd;

      res.json({
        success: true,
        trialStatus: {
          isTrialActive,
          trialPeriodEnd: subscription.trialPeriodEnd,
          daysRemaining: isTrialActive && subscription.trialPeriodEnd ? 
            Math.ceil((subscription.trialPeriodEnd.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)) : 0
        }
      });
    } catch (error) {
      console.error("Error checking trial status:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to check trial status" 
      });
    }
  });

  // Create new subscription
  app.post("/api/subscriptions", async (req, res) => {
    try {
      // Validate request body with Zod schema
      const subscriptionSchema = z.object({
        planId: z.string().min(1, "Plan ID is required"),
        addons: z.array(z.object({
          addonId: z.string(),
          quantity: z.number().optional()
        })).default([]),
        billingCycle: z.enum(['monthly', 'quarterly', 'annual']),
        paymentToken: z.string().min(16, "Valid payment token required"),
        customerInfo: z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Valid email required"),
          phone: z.string().optional(),
          address: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          zip: z.string().optional()
        })
      });

      const validation = subscriptionSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid subscription data",
          errors: validation.error.errors
        });
      }

      const { 
        planId, 
        addons: selectedAddons, 
        billingCycle, 
        paymentToken, 
        customerInfo 
      } = validation.data;

      // Get plan details
      const plan = await db.select().from(subscriptionPlans)
        .where(eq(subscriptionPlans.planId, planId))
        .limit(1);

      if (plan.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: "Plan not found" 
        });
      }

      // Get addon details for subscription creation
      const addons = await db.select().from(subscriptionAddons)
        .where(eq(subscriptionAddons.isActive, true));

      // SECURITY: Recalculate pricing server-side - never trust client amounts
      const pricing = PricingEngine.calculateSubscriptionPrice(
        plan[0],
        addons,
        selectedAddons,
        billingCycle
      );

      // Handle setup fee separately if present (including setup fee tax)
      let setupTransactionResult = null;
      if (pricing.setupFee > 0) {
        setupTransactionResult = await NMIService.processTransaction(
          paymentToken,
          pricing.oneTimeTotal.toFixed(2), // setupFee + setupFeeTax
          `${plan[0].name} Setup Fee`
        );

        if (setupTransactionResult.response !== '1') {
          return res.status(400).json({ 
            success: false, 
            message: setupTransactionResult.responsetext || 'Setup fee payment failed' 
          });
        }
      }

      // Check if AI Coach addon is selected for trial eligibility
      const hasAiCoachAddon = selectedAddons.some(addon => 
        addons.find(a => a.addonId === addon.addonId)?.category === 'ai-coach'
      );

      // 7-day trial for AI Coach addons
      const isTrialEligible = hasAiCoachAddon;
      const trialPeriodEnd = isTrialEligible ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null;

      // Create NMI subscription for recurring charges only (no setup fee components)
      const recurringAmount = pricing.recurringTotal.toFixed(2); // recurringSubtotal + recurringTax
      const nmiRequest = {
        planId: plan[0].planId,
        customerData: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone || '',
          address: customerInfo.address || '',
          city: customerInfo.city || '',
          state: customerInfo.state || '',
          zip: customerInfo.zip || ''
        },
        paymentToken,
        planAmount: recurringAmount,
        billingCycle,
        startDate: trialPeriodEnd ? trialPeriodEnd.toISOString().split('T')[0] : undefined // Start billing after trial
      };

      const nmiResult = await NMIService.createSubscription(nmiRequest);

      if (nmiResult.response !== '1') {
        return res.status(400).json({ 
          success: false, 
          message: nmiResult.responsetext || 'Subscription creation failed' 
        });
      }

      // Create local subscription record with proper separated amounts
      const subscriptionData = {
        nmiSubscriptionId: nmiResult.subscription_id,
        planId: plan[0].id,
        status: isTrialEligible ? 'trial' : 'active',
        baseAmount: pricing.basePrice.toFixed(2),
        addonAmount: pricing.totalAddons.toFixed(2),
        totalAmount: pricing.recurringTotal.toFixed(2), // Only recurring charges in subscription record
        billingCycle,
        paymentMethod: {
          type: 'card',
          maskedNumber: '****1234',
          lastFour: '1234'
        },
        currentPeriodStart: new Date(),
        currentPeriodEnd: calculateNextBillingDate(billingCycle),
        nextPaymentDate: isTrialEligible ? trialPeriodEnd : calculateNextBillingDate(billingCycle),
        trialPeriodEnd: trialPeriodEnd,
        isTrialActive: isTrialEligible
      };

      const [newSubscription] = await db.insert(subscriptions)
        .values(subscriptionData)
        .returning();

      res.json({ 
        success: true, 
        subscription: newSubscription,
        nmiSubscriptionId: nmiResult.subscription_id,
        message: "Subscription created successfully" 
      });

    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create subscription" 
      });
    }
  });

  // Get product recommendations for an assessment
  app.get("/api/assessments/:id/product-recommendations", async (req, res) => {
    try {
      const assessmentId = parseInt(req.params.id);
      const recs = await productRecommendationService.getRecommendations(assessmentId);

      // Flatten the nested product structure for frontend
      const recommendations = recs.map(rec => ({
        productId: rec.product.id,
        productName: rec.product.name,
        reason: rec.reason,
        priority: rec.priority,
        diyPrice: rec.product.diyPrice,
        mspPrice: rec.product.mspPrice,
        category: rec.product.category,
        currentScore: rec.currentScore,
        projectedScore: rec.projectedScore,
        scoreImprovement: rec.scoreImprovement
      }));

      res.json({ 
        success: true, 
        recommendations 
      });
    } catch (error) {
      console.error("Error fetching product recommendations:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch product recommendations" 
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

      const allProducts = await db.select().from(products).where(and(...conditions));

      // Filter by delivery method if specified
      const filteredProducts = deliveryMethod 
        ? allProducts.filter(p => p.deliveryMethod?.includes(deliveryMethod))
        : allProducts;

      res.json({ 
        success: true, 
        products: filteredProducts 
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch products" 
      });
    }
  });

  // Get single product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const { products } = await import("@shared/schema");
      const { eq } = await import("drizzle-orm");

      const [product] = await db.select().from(products).where(eq(products.id, productId));

      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: "Product not found" 
        });
      }

      res.json({ 
        success: true, 
        product 
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch product" 
      });
    }
  });

  // ============================================================================
  // SYNUP - Business Listings & Reputation Management API Routes
  // All routes protected with JWT authentication
  // ============================================================================

  // Create or sync location from Synup
  app.post("/api/synup/locations", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;

      // Validate request body
      if (!req.body.synupLocationId) {
        return res.status(400).json({
          success: false,
          message: "synupLocationId is required"
        });
      }

      const { synupLocationId } = req.body;

      // Check if location already exists in database (prevent cross-tenant access)
      const existingLocation = await storage.getSynupLocationBySynupId(synupLocationId);

      if (existingLocation) {
        if (existingLocation.clientId !== clientId) {
          return res.status(403).json({
            success: false,
            message: "Access denied: This location is already associated with another account"
          });
        }
        // Location already exists for this client, return it
        return res.json({
          success: true,
          location: existingLocation,
          message: "Location already synced"
        });
      }

      // Fetch location data from Synup API
      const synupLocation = await synupService.getLocation(synupLocationId);

      if (!synupLocation) {
        return res.status(404).json({
          success: false,
          message: "Location not found in Synup"
        });
      }

      // SECURITY: White-label mode with shared API key requires strict verification to prevent
      // cross-tenant abuse. Current implementation uses multi-layered safeguards:
      // 
      // 1. Cross-tenant prevention: Blocks duplicate Synup location assignments across clients
      // 2. Business name verification (STRICT MODE): Enforces name matching before location sync
      //    - Requires client.companyName to be set (400 error if missing)
      //    - Verifies Synup location name contains client company name or vice versa
      //    - Returns 403 Forbidden if names don't match
      // 
      // Production recommendations for enhanced security:
      // - Use per-client Synup API keys to eliminate shared-key limitations
      // - Implement admin pre-approval workflow for new location assignments
      // - Add address/contact verification for additional ownership proof
      const client = await storage.getClient(clientId);

      // Enforce business name verification (strict mode)
      if (!client || !client.companyName) {
        console.error(`❌ Cannot verify location ownership: Client ${clientId} has no company name set`);
        return res.status(400).json({
          success: false,
          message: "Your account must have a company name set before syncing locations. Please update your profile."
        });
      }

      const nameMatch = synupLocation.name.toLowerCase().includes(client.companyName.toLowerCase()) ||
                       client.companyName.toLowerCase().includes(synupLocation.name.toLowerCase());

      if (!nameMatch) {
        console.error(`❌ Security: Location name mismatch - Client "${client.companyName}" attempted to sync location "${synupLocation.name}"`);
        return res.status(403).json({
          success: false,
          message: "Location business name does not match your account. If this is your business, please contact support."
        });
      }

      console.log(`✅ Business name verified: "${client.companyName}" matches "${synupLocation.name}"`);

      // Create location in our database with validated data
      const locationData = insertSynupLocationSchema.parse({
        clientId,
        synupLocationId: synupLocation.id,
        name: synupLocation.name,
        address: synupLocation.address,
        city: synupLocation.city,
        state: synupLocation.state,
        country: synupLocation.country,
        postalCode: synupLocation.postalCode,
        phone: synupLocation.phone,
        website: synupLocation.website || null,
        email: synupLocation.email || null,
        category: synupLocation.category || null,
        status: 'active'
      });

      const location = await storage.createSynupLocation(locationData);

      // Trigger listings sync
      await synupService.syncLocationListings(synupLocationId);

      res.json({ 
        success: true, 
        location,
        message: "Location synced successfully. Listings sync initiated." 
      });
    } catch (error) {
      console.error("Error creating Synup location:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors
        });
      }
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to create location" 
      });
    }
  });

  // Get all locations for authenticated client
  app.get("/api/synup/locations", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const locations = await storage.getSynupLocationsByClient(clientId);

      res.json({ 
        success: true, 
        locations 
      });
    } catch (error) {
      console.error("Error fetching Synup locations:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch locations" 
      });
    }
  });

  // Update location information
  app.put("/api/synup/locations/:locationId", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const locationId = parseInt(req.params.locationId);

      if (isNaN(locationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid location ID"
        });
      }

      // Verify location belongs to authenticated client
      const location = await storage.getSynupLocation(locationId);
      if (!location || location.clientId !== req.clientId!) {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied" 
        });
      }

      // Update location
      const updateData = {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        phone: req.body.phone,
        website: req.body.website,
      };

      const updatedLocation = await storage.updateSynupLocation(locationId, updateData);

      res.json({ 
        success: true, 
        location: updatedLocation,
        message: "Location updated successfully"
      });
    } catch (error) {
      console.error("Error updating location:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update location" 
      });
    }
  });

  // Get listings for a specific location
  app.get("/api/synup/locations/:locationId/listings", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const locationId = parseInt(req.params.locationId);

      // Verify location belongs to authenticated client
      const location = await storage.getSynupLocation(locationId);
      if (!location || location.clientId !== req.clientId!) {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied" 
        });
      }

      const listings = await storage.getSynupListingsByLocation(locationId);

      res.json({ 
        success: true, 
        listings 
      });
    } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch listings" 
      });
    }
  });

  // Sync listings for a location
  app.post("/api/synup/locations/:locationId/sync-listings", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const locationId = parseInt(req.params.locationId);

      if (isNaN(locationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid location ID"
        });
      }

      // Verify location belongs to authenticated client (CRITICAL SECURITY CHECK)
      const location = await storage.getSynupLocation(locationId);
      if (!location) {
        return res.status(404).json({ 
          success: false, 
          message: "Location not found" 
        });
      }

      if (location.clientId !== req.clientId!) {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied: This location does not belong to your account" 
        });
      }

      // Fetch listings from Synup
      const synupListings = await synupService.getLocationListings(location.synupLocationId);

      // Update or create listings in database with validation
      const updatedListings = [];
      for (const listing of synupListings) {
        const listingData = insertSynupListingSchema.parse({
          locationId,
          synupListingId: listing.id,
          platform: listing.platform,
          status: listing.status,
          url: listing.url || null,
          lastSynced: new Date(),
          syncStatus: 'success',
          visibility: listing.visibility !== false
        });

        // Check if listing exists
        const existingListings = await storage.getSynupListingsByLocation(locationId);
        const existing = existingListings.find(l => l.synupListingId === listing.id);

        if (existing) {
          const updated = await storage.updateSynupListing(existing.id, listingData);
          updatedListings.push(updated);
        } else {
          const created = await storage.createSynupListing(listingData);
          updatedListings.push(created);
        }
      }

      res.json({ 
        success: true, 
        listings: updatedListings,
        message: `Synced ${updatedListings.length} listings successfully` 
      });
    } catch (error) {
      console.error("Error syncing listings:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors
        });
      }
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to sync listings" 
      });
    }
  });

  // Get reviews for a location
  app.get("/api/synup/locations/:locationId/reviews", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const locationId = parseInt(req.params.locationId);

      // Verify location belongs to authenticated client
      const location = await storage.getSynupLocation(locationId);
      if (!location || location.clientId !== req.clientId!) {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied" 
        });
      }

      const reviews = await storage.getSynupReviewsByLocation(locationId);

      res.json({ 
        success: true, 
        reviews 
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch reviews" 
      });
    }
  });

  // Sync reviews for a location
  app.post("/api/synup/locations/:locationId/sync-reviews", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const locationId = parseInt(req.params.locationId);

      if (isNaN(locationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid location ID"
        });
      }

      // Verify location belongs to authenticated client (CRITICAL SECURITY CHECK)
      const location = await storage.getSynupLocation(locationId);
      if (!location) {
        return res.status(404).json({ 
          success: false, 
          message: "Location not found" 
        });
      }

      if (location.clientId !== req.clientId!) {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied: This location does not belong to your account" 
        });
      }

      // Fetch reviews from Synup
      const synupReviews = await synupService.getLocationReviews(location.synupLocationId);

      // Update or create reviews in database with validation
      const updatedReviews = [];
      for (const review of synupReviews) {
        const reviewData = insertSynupReviewSchema.parse({
          locationId,
          synupReviewId: review.id,
          platform: review.platform,
          rating: review.rating,
          reviewText: review.reviewText || null,
          reviewerName: review.reviewerName || null,
          reviewerAvatar: null, // Not provided by Synup API
          reviewDate: new Date(review.reviewDate),
          response: review.response || null,
          responseDate: review.responseDate ? new Date(review.responseDate) : null,
          sentiment: review.sentiment || null,
          status: review.response ? 'responded' : 'new'
        });

        // Check if review exists
        const existingReviews = await storage.getSynupReviewsByLocation(locationId);
        const existing = existingReviews.find(r => r.synupReviewId === review.id);

        if (existing) {
          const updated = await storage.updateSynupReview(existing.id, reviewData);
          updatedReviews.push(updated);
        } else {
          const created = await storage.createSynupReview(reviewData);
          updatedReviews.push(created);

          // Trigger review monitoring alert for new reviews
          const io = (global as any).io;
          const reviewMonitoring = new ReviewMonitoringService(io);
          reviewMonitoring.processNewReview(created).catch(err => 
            console.error('Error processing review alert:', err)
          );
        }
      }

      res.json({ 
        success: true, 
        reviews: updatedReviews,
        message: `Synced ${updatedReviews.length} reviews successfully` 
      });
    } catch (error) {
      console.error("Error syncing reviews:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors
        });
      }
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to sync reviews" 
      });
    }
  });

  // Respond to a review with AI-generated response
  app.post("/api/synup/reviews/:reviewId/respond", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const reviewId = parseInt(req.params.reviewId);

      if (isNaN(reviewId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid review ID"
        });
      }

      // Validate request body
      const { response, useAI } = req.body;

      if (!useAI && !response) {
        return res.status(400).json({
          success: false,
          message: "Either response text or useAI flag is required"
        });
      }

      // Get review and verify access (CRITICAL SECURITY CHECK)
      const review = await storage.getSynupReview(reviewId);

      if (!review) {
        return res.status(404).json({ 
          success: false, 
          message: "Review not found" 
        });
      }

      const location = await storage.getSynupLocation(review.locationId);
      if (!location) {
        return res.status(404).json({ 
          success: false, 
          message: "Location not found" 
        });
      }

      if (location.clientId !== req.clientId!) {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied: This review does not belong to your account" 
        });
      }

      let finalResponse = response;
      let isAIGenerated = useAI || false;

      // Generate AI response if requested
      if (useAI && !response) {
        // Get location details for context
        const location = await storage.getSynupLocation(review.locationId);
        const client = location ? await storage.getClient(location.clientId) : null;

        // Generate AI-powered response
        try {
          if (!review.reviewText) {
            return res.status(400).json({
              success: false,
              message: "Review text is required to generate AI response"
            });
          }

          finalResponse = await reviewAI.generateReviewResponse({
            reviewText: review.reviewText,
            rating: review.rating,
            platform: review.platform,
            businessName: client?.companyName || location?.name || 'our business',
            businessCategory: location?.category || undefined,
            reviewerName: review.reviewerName || undefined
          }, {
            tone: review.rating >= 4 ? 'enthusiastic' : review.rating <= 2 ? 'empathetic' : 'professional',
            maxLength: 200,
            includeCallToAction: true
          });

          console.log(`✅ AI-generated response for review ${reviewId}: ${finalResponse.substring(0, 50)}...`);
        } catch (error) {
          console.error(`Error generating AI response for review ${reviewId}:`, error);
          return res.status(500).json({
            success: false,
            message: "Failed to generate AI response. Please try again or provide a manual response."
          });
        }
      }

      // Submit response to Synup (with or without AI)
      await synupService.respondToReview(review.synupReviewId!, finalResponse || '', isAIGenerated);

      // Update in database
      const updatedReview = await storage.updateSynupReview(reviewId, {
        response: finalResponse,
        responseDate: new Date(),
        status: 'responded',
        isAIGenerated
      });

      res.json({ 
        success: true, 
        review: updatedReview,
        message: "Response submitted successfully" 
      });
    } catch (error) {
      console.error("Error responding to review:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors
        });
      }
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to respond to review" 
      });
    }
  });

  // Get review analytics for a location
  app.get("/api/synup/locations/:locationId/analytics", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const locationId = parseInt(req.params.locationId);

      if (isNaN(locationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid location ID"
        });
      }

      // Verify location belongs to authenticated client
      const location = await storage.getSynupLocation(locationId);
      if (!location || location.clientId !== req.clientId!) {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied" 
        });
      }

      // Get all reviews for this location
      const reviews = await storage.getSynupReviewsByLocation(locationId);

      // Calculate analytics
      const totalReviews = reviews.length;
      const averageRating = reviews.length > 0 
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
        : 0;

      // Sentiment breakdown
      const positiveCount = reviews.filter(r => r.sentiment === 'positive' || r.rating >= 4).length;
      const negativeCount = reviews.filter(r => r.sentiment === 'negative' || r.rating <= 2).length;
      const neutralCount = reviews.filter(r => r.sentiment === 'neutral' || (r.rating === 3)).length;

      // Platform breakdown
      const platformBreakdown: Record<string, number> = {};
      reviews.forEach(r => {
        platformBreakdown[r.platform] = (platformBreakdown[r.platform] || 0) + 1;
      });

      // Response metrics
      const respondedCount = reviews.filter(r => r.status === 'responded').length;
      const responseRate = totalReviews > 0 ? (respondedCount / totalReviews) * 100 : 0;
      const aiResponseCount = reviews.filter(r => r.isAIGenerated).length;

      // Recent reviews (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentReviews = reviews.filter(r => new Date(r.reviewDate) >= thirtyDaysAgo);

      res.json({
        success: true,
        analytics: {
          totalReviews,
          averageRating: Math.round(averageRating * 10) / 10,
          sentiment: {
            positive: positiveCount,
            negative: negativeCount,
            neutral: neutralCount
          },
          platformBreakdown,
          responseMetrics: {
            totalResponded: respondedCount,
            responseRate: Math.round(responseRate * 10) / 10,
            aiGeneratedResponses: aiResponseCount
          },
          recentActivity: {
            last30Days: recentReviews.length,
            averageRatingLast30Days: recentReviews.length > 0 
              ? Math.round((recentReviews.reduce((sum, r) => sum + r.rating, 0) / recentReviews.length) * 10) / 10
              : 0
          }
        }
      });
    } catch (error) {
      console.error("Error fetching review analytics:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch review analytics" 
      });
    }
  });

  // Get review trends over time
  app.get("/api/synup/locations/:locationId/review-trends", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const locationId = parseInt(req.params.locationId);
      const { period = '30' } = req.query; // days

      if (isNaN(locationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid location ID"
        });
      }

      // Verify location belongs to authenticated client
      const location = await storage.getSynupLocation(locationId);
      if (!location || location.clientId !== req.clientId!) {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied" 
        });
      }

      const reviews = await storage.getSynupReviewsByLocation(locationId);
      const days = parseInt(period as string);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Filter reviews within period
      const periodReviews = reviews.filter(r => new Date(r.reviewDate) >= startDate);

      // Group by date
      const trends: Record<string, { count: number; averageRating: number; ratings: number[] }> = {};

      periodReviews.forEach(review => {
        const date = new Date(review.reviewDate).toISOString().split('T')[0];
        if (!trends[date]) {
          trends[date] = { count: 0, averageRating: 0, ratings: [] };
        }
        trends[date].count++;
        trends[date].ratings.push(review.rating);
      });

      // Calculate averages
      Object.keys(trends).forEach(date => {
        const ratings = trends[date].ratings;
        trends[date].averageRating = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
      });

      res.json({
        success: true,
        trends: Object.entries(trends).map(([date, data]) => ({
          date,
          count: data.count,
          averageRating: Math.round(data.averageRating * 10) / 10
        })).sort((a, b) => a.date.localeCompare(b.date))
      });
    } catch (error) {
      console.error("Error fetching review trends:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch review trends" 
      });
    }
  });

  // Get review notification preferences
  app.get("/api/review-notifications/preferences", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;

      let preferences = await storage.getReviewNotificationPreferences(clientId);

      // Create default preferences if none exist
      if (!preferences) {
        preferences = await storage.createReviewNotificationPreferences({
          clientId,
          enableEmailAlerts: true,
          enableWebSocketAlerts: true,
          notifyOnNegativeReviews: true,
          minimumRatingThreshold: 2,
        });
      }

      res.json({
        success: true,
        preferences
      });
    } catch (error) {
      console.error("Error fetching review notification preferences:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch notification preferences" 
      });
    }
  });

  // Update review notification preferences
  app.put("/api/review-notifications/preferences", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const validatedData = insertReviewNotificationPreferencesSchema.partial().parse(req.body);

      // Get or create preferences
      let preferences = await storage.getReviewNotificationPreferences(clientId);
      if (!preferences) {
        preferences = await storage.createReviewNotificationPreferences({
          clientId,
          ...validatedData,
        });
      } else {
        preferences = await storage.updateReviewNotificationPreferences(clientId, validatedData);
      }

      res.json({
        success: true,
        preferences,
        message: "Notification preferences updated successfully"
      });
    } catch (error) {
      console.error("Error updating review notification preferences:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Failed to update notification preferences" 
      });
    }
  });

  // ============================================================================
  // /SEND - Email + SMS Marketing Platform API Routes
  // All routes protected with JWT authentication
  // ============================================================================

  // Create contact
  app.post("/api/send/contacts", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const validatedData = insertSendContactSchema.parse(req.body);

      // GDPR/CAN-SPAM Compliance Validation
      if (!validatedData.email && !validatedData.phone) {
        return res.status(400).json({ 
          success: false,
          message: "At least one contact method (email or phone) is required" 
        });
      }

      // Ensure email consent is provided if email is present
      if (validatedData.email && !validatedData.emailConsent) {
        return res.status(400).json({ 
          success: false,
          message: "Email consent is required when providing an email address (GDPR/CAN-SPAM compliance)" 
        });
      }

      // Ensure SMS consent is provided if phone is present
      if (validatedData.phone && !validatedData.smsConsent) {
        return res.status(400).json({ 
          success: false,
          message: "SMS consent is required when providing a phone number (TCPA compliance)" 
        });
      }

      // Force clientId to match authenticated user (prevent cross-client data leakage)
      const contactData = {
        ...validatedData,
        clientId,
        emailConsentDate: validatedData.emailConsent ? new Date() : null,
        smsConsentDate: validatedData.smsConsent ? new Date() : null
      };

      const contact = await storage.createSendContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to create contact" 
      });
    }
  });

  // Get all contacts for authenticated client (with pagination)
  app.get("/api/send/contacts", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const limit = Math.min(parseInt(req.query.limit as string) || 100, 1000); // Max 1000
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
          hasMore: offset + limit < contacts.length
        }
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contacts" 
      });
    }
  });

  // Get single contact (with client ownership validation)
  app.get("/api/send/contacts/:id", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid contact ID" 
        });
      }

      const contact = await storage.getSendContact(id);

      if (!contact) {
        return res.status(404).json({ 
          success: false,
          message: "Contact not found" 
        });
      }

      // Verify client ownership
      if (contact.clientId !== clientId) {
        return res.status(403).json({ 
          success: false,
          message: "Access denied: Contact belongs to another client" 
        });
      }

      res.json({ success: true, contact });
    } catch (error) {
      console.error("Error fetching contact:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contact" 
      });
    }
  });

  // Update contact (with client ownership validation)
  app.patch("/api/send/contacts/:id", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid contact ID" 
        });
      }

      // Verify contact exists and belongs to client
      const existingContact = await storage.getSendContact(id);
      if (!existingContact) {
        return res.status(404).json({ 
          success: false,
          message: "Contact not found" 
        });
      }

      if (existingContact.clientId !== clientId) {
        return res.status(403).json({ 
          success: false,
          message: "Access denied: Contact belongs to another client" 
        });
      }

      const updateData = insertSendContactSchema.partial().parse(req.body);

      // Prevent clientId tampering
      if ('clientId' in updateData) {
        delete (updateData as any).clientId;
      }

      const contact = await storage.updateSendContact(id, updateData);
      res.json({ success: true, contact });
    } catch (error) {
      console.error("Error updating contact:", error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to update contact" 
      });
    }
  });

  // Delete contact (with client ownership validation)
  app.delete("/api/send/contacts/:id", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid contact ID" 
        });
      }

      // Verify contact exists and belongs to client
      const existingContact = await storage.getSendContact(id);
      if (!existingContact) {
        return res.status(404).json({ 
          success: false,
          message: "Contact not found" 
        });
      }

      if (existingContact.clientId !== clientId) {
        return res.status(403).json({ 
          success: false,
          message: "Access denied: Contact belongs to another client" 
        });
      }

      await storage.deleteSendContact(id);
      res.json({ success: true, message: "Contact deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete contact" 
      });
    }
  });

  // Create list
  app.post("/api/send/lists", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const validatedData = insertSendListSchema.parse(req.body);

      // Force clientId to match authenticated user
      const listData = {
        ...validatedData,
        clientId
      };

      const list = await storage.createSendList(listData);
      res.json({ success: true, list });
    } catch (error) {
      console.error("Error creating list:", error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to create list" 
      });
    }
  });

  // Get all lists for authenticated client (with pagination)
  app.get("/api/send/lists", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const limit = Math.min(parseInt(req.query.limit as string) || 100, 1000); // Max 1000
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
          hasMore: offset + limit < lists.length
        }
      });
    } catch (error) {
      console.error("Error fetching lists:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch lists" 
      });
    }
  });

  // Get single list (with client ownership validation)
  app.get("/api/send/lists/:id", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid list ID" 
        });
      }

      const list = await storage.getSendList(id);

      if (!list) {
        return res.status(404).json({ 
          success: false,
          message: "List not found" 
        });
      }

      // Verify client ownership
      if (list.clientId !== clientId) {
        return res.status(403).json({ 
          success: false,
          message: "Access denied: List belongs to another client" 
        });
      }

      res.json({ success: true, list });
    } catch (error) {
      console.error("Error fetching list:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch list" 
      });
    }
  });

  // Update list (with client ownership validation)
  app.patch("/api/send/lists/:id", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid list ID" 
        });
      }

      // Verify list exists and belongs to client
      const existingList = await storage.getSendList(id);
      if (!existingList) {
        return res.status(404).json({ 
          success: false,
          message: "List not found" 
        });
      }

      if (existingList.clientId !== clientId) {
        return res.status(403).json({ 
          success: false,
          message: "Access denied: List belongs to another client" 
        });
      }

      const updateData = insertSendListSchema.partial().parse(req.body);

      // Prevent clientId tampering
      if ('clientId' in updateData) {
        delete (updateData as any).clientId;
      }

      const list = await storage.updateSendList(id, updateData);
      res.json({ success: true, list });
    } catch (error) {
      console.error("Error updating list:", error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to update list" 
      });
    }
  });

  // Delete list (with client ownership validation)
  app.delete("/api/send/lists/:id", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid list ID" 
        });
      }

      // Verify list exists and belongs to client
      const existingList = await storage.getSendList(id);
      if (!existingList) {
        return res.status(404).json({ 
          success: false,
          message: "List not found" 
        });
      }

      if (existingList.clientId !== clientId) {
        return res.status(403).json({ 
          success: false,
          message: "Access denied: List belongs to another client" 
        });
      }

      await storage.deleteSendList(id);
      res.json({ success: true, message: "List deleted successfully" });
    } catch (error) {
      console.error("Error deleting list:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete list" 
      });
    }
  });

  // Add contact to list (with ownership validation)
  app.post("/api/send/lists/:listId/contacts/:contactId", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const listId = parseInt(req.params.listId);
      const contactId = parseInt(req.params.contactId);

      if (isNaN(listId) || isNaN(contactId)) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid list or contact ID" 
        });
      }

      // Verify list and contact both exist and belong to client
      const [list, contact] = await Promise.all([
        storage.getSendList(listId),
        storage.getSendContact(contactId)
      ]);

      if (!list) {
        return res.status(404).json({ 
          success: false,
          message: "List not found" 
        });
      }

      if (!contact) {
        return res.status(404).json({ 
          success: false,
          message: "Contact not found" 
        });
      }

      // Verify both belong to the same client
      if (list.clientId !== clientId || contact.clientId !== clientId) {
        return res.status(403).json({ 
          success: false,
          message: "Access denied: Resources belong to another client" 
        });
      }

      await storage.addContactToList(listId, contactId);
      res.json({ success: true, message: "Contact added to list successfully" });
    } catch (error) {
      console.error("Error adding contact to list:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to add contact to list" 
      });
    }
  });

  // Remove contact from list (with ownership validation)
  app.delete("/api/send/lists/:listId/contacts/:contactId", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const listId = parseInt(req.params.listId);
      const contactId = parseInt(req.params.contactId);

      if (isNaN(listId) || isNaN(contactId)) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid list or contact ID" 
        });
      }

      // Verify list belongs to client
      const list = await storage.getSendList(listId);
      if (!list) {
        return res.status(404).json({ 
          success: false,
          message: "List not found" 
        });
      }

      if (list.clientId !== clientId) {
        return res.status(403).json({ 
          success: false,
          message: "Access denied: List belongs to another client" 
        });
      }

      await storage.removeContactFromList(listId, contactId);
      res.json({ success: true, message: "Contact removed from list successfully" });
    } catch (error) {
      console.error("Error removing contact from list:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to remove contact from list" 
      });
    }
  });

  // Get all contacts in a list (with ownership validation and pagination)
  app.get("/api/send/lists/:listId/contacts", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const listId = parseInt(req.params.listId);
      const limit = Math.min(parseInt(req.query.limit as string) || 100, 1000); // Max 1000
      const offset = parseInt(req.query.offset as string) || 0;

      if (isNaN(listId)) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid list ID" 
        });
      }

      // Verify list belongs to client
      const list = await storage.getSendList(listId);
      if (!list) {
        return res.status(404).json({ 
          success: false,
          message: "List not found" 
        });
      }

      if (list.clientId !== clientId) {
        return res.status(403).json({ 
          success: false,
          message: "Access denied: List belongs to another client" 
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
          hasMore: offset + limit < contacts.length
        }
      });
    } catch (error) {
      console.error("Error fetching list contacts:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch list contacts" 
      });
    }
  });

  // ============================================================================
  // Brand Studio API Routes - Asset Management
  // ============================================================================

  // Configure multer for file uploads (store in memory)
  const multer = await import("multer");
  const upload = multer.default({ storage: multer.default.memoryStorage() });

  // Serve brand assets (favicon, logo, etc.)
  app.get("/assets/:filename", async (req, res) => {
    try {
      const { filename } = req.params;
      
      console.log(`Requesting asset: ${filename}`);

      // Query for the asset by filename
      const [asset] = await db
        .select()
        .from(brandAssets)
        .where(eq(brandAssets.fileName, filename))
        .limit(1);

      if (!asset) {
        console.log(`Asset not found: ${filename}`);
        // Log all available assets for debugging
        const allAssets = await db.select({ fileName: brandAssets.fileName }).from(brandAssets);
        console.log('Available assets:', allAssets.map(a => a.fileName).join(', '));
        return res.status(404).send("Asset not found");
      }
      
      console.log(`Serving asset: ${filename}, type: ${asset.mimeType}`);

      // Set appropriate content type
      const contentType = asset.mimeType || 'application/octet-stream';
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

      res.send(asset.data);
    } catch (error) {
      console.error("Error serving brand asset:", error);
      res.status(500).json({ error: "Failed to serve asset" });
    }
  });

  // Upload brand asset
  app.post("/api/brand-assets", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }

      const { name, type } = req.body;

      if (!name || !type) {
        return res.status(400).json({
          success: false,
          message: "Name and type are required"
        });
      }

      // Convert file to base64
      const base64Data = req.file.buffer.toString('base64');

      const assetData = {
        name,
        type,
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        data: base64Data
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
          createdAt: asset.createdAt
        }
      });
    } catch (error) {
      console.error("Error uploading brand asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload asset"
      });
    }
  });

  // Get all brand assets (optionally filter by type)
  app.get("/api/brand-assets", async (req, res) => {
    try {
      const { type } = req.query;

      const assets = type && typeof type === 'string'
        ? await storage.getBrandAssetsByType(type)
        : await storage.getAllBrandAssets();

      res.json({
        success: true,
        assets: assets.map(asset => ({
          id: asset.id,
          name: asset.name,
          type: asset.type,
          fileName: asset.fileName,
          size: asset.size,
          createdAt: asset.createdAt
        }))
      });
    } catch (error) {
      console.error("Error fetching brand assets:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch assets"
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
          message: "Invalid asset ID"
        });
      }

      const asset = await storage.getBrandAsset(id);

      if (!asset) {
        return res.status(404).json({
          success: false,
          message: "Asset not found"
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
          createdAt: asset.createdAt
        }
      });
    } catch (error) {
      console.error("Error fetching brand asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch asset"
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
          message: "Invalid asset ID"
        });
      }

      if (!fileName) {
        return res.status(400).json({
          success: false,
          message: "New filename is required"
        });
      }

      const asset = await storage.getBrandAsset(id);
      if (!asset) {
        return res.status(404).json({
          success: false,
          message: "Asset not found"
        });
      }

      await storage.updateBrandAsset(id, { fileName });

      res.json({
        success: true,
        message: "Asset renamed successfully"
      });
    } catch (error) {
      console.error("Error renaming brand asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to rename asset"
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
          message: "Invalid asset ID"
        });
      }

      await storage.deleteBrandAsset(id);

      res.json({
        success: true,
        message: "Asset deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting brand asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete asset"
      });
    }
  });

  // Serve brand assets by filename (for favicons)
  app.get("/assets/:filename", async (req, res) => {
    try {
      const { filename } = req.params;

      // Get all assets and find by filename
      const allAssets = await storage.getAllBrandAssets();
      const asset = allAssets.find(a => a.fileName === filename);

      if (!asset) {
        return res.status(404).json({
          success: false,
          message: "Asset not found"
        });
      }

      // Convert base64 to buffer
      const buffer = Buffer.from(asset.data, 'base64');

      // Set appropriate headers
      res.setHeader('Content-Type', asset.mimeType);
      res.setHeader('Content-Length', buffer.length);
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

      res.send(buffer);
    } catch (error) {
      console.error("Error serving asset:", error);
      res.status(500).json({
        success: false,
        message: "Failed to serve asset"
      });
    }
  });

  // Register inbox routes
  await registerInboxRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to calculate next billing date
function calculateNextBillingDate(billingCycle: string): Date {
  const now = new Date();
  switch (billingCycle) {
    case 'quarterly':
      return new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days
    case 'annual':
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
  emailService: EmailService,
  storage: any
) {
  try {
    // Update status to analyzing
    await storage.updateAssessment(assessmentId, { status: "analyzing" });

    const assessment = await storage.getAssessment(assessmentId);
    if (!assessment) throw new Error("Assessment not found");

    // Get Google Business data
    const googleData = await googleService.searchBusiness(
      assessment.businessName,
      assessment.address
    );

    // Calculate presence score
    const presenceScore = googleService.calculatePresenceScore(googleData);

    // Generate product recommendations based on scores
    const productRecommendations = await productRecommendationService.generateRecommendations(
      assessmentId,
      {
        visibility: presenceScore.scores.visibility,
        reviews: presenceScore.scores.reviews,
        completeness: presenceScore.scores.completeness,
        engagement: presenceScore.scores.engagement,
        overall: presenceScore.overallScore
      }
    );

    // Save product recommendations to database
    await productRecommendationService.saveRecommendations(assessmentId, productRecommendations);

    // Get AI analysis
    const analysisResult = await aiService.analyzeBusinessPresence({
      businessInfo: {
        name: assessment.businessName,
        industry: assessment.industry,
        location: assessment.location,
        website: assessment.website || undefined
      },
      googleData,
      presenceScore
    });

    // Update assessment with results
    await storage.updateAssessment(assessmentId, {
      googleBusinessData: googleData,
      analysisResults: analysisResult,
      digitalScore: analysisResult.digitalScore,
      status: "completed"
    });

    // Save recommendations
    for (const rec of analysisResult.recommendations) {
      await storage.createRecommendation({
        assessmentId,
        category: rec.category,
        title: rec.title,
        description: rec.description,
        priority: rec.priority,
        estimatedImpact: rec.estimatedImpact,
        estimatedEffort: rec.estimatedEffort
      });
    }

    // Send email report
    const emailSent = await emailService.sendAssessmentReport(assessment.email, {
      businessName: assessment.businessName,
      digitalScore: analysisResult.digitalScore,
      summary: analysisResult.summary,
      recommendations: analysisResult.recommendations,
      assessmentId
    });

    await storage.updateAssessment(assessmentId, { emailSent });

  } catch (error) {
    console.error("Error processing assessment:", error);
    await storage.updateAssessment(assessmentId, { status: "failed" });
  }
}

// ========================================
// UNIFIED INBOX API ROUTES (Added to registerRoutes)
// ========================================

async function registerInboxRoutes(app: Express) {
  // Create livechat session (public - for customer-facing chat widget)
  app.post("/api/inbox/livechat/session", async (req, res) => {
    try {
      const validatedData = insertLivechatSessionSchema.parse(req.body);

      const [session] = await db.insert(livechatSessions).values({
        ...validatedData,
        status: 'active',
      }).returning();

      res.json({ 
        success: true, 
        session: {
          id: session.id,
          sessionId: session.sessionId,
          conversationId: session.conversationId,
          status: session.status
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid session data",
          details: error.errors 
        });
      }
      console.error("Error creating livechat session:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to create session" 
      });
    }
  });

  // Get all conversations for inbox (REQUIRES AUTHENTICATION)
  app.get("/api/inbox/conversations", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!; // Get from authenticated JWT token

      const conversations = await db.select()
        .from(inboxConversations)
        .where(eq(inboxConversations.clientId, clientId))
        .orderBy(desc(inboxConversations.updatedAt));

      // Get last message for each conversation
      const conversationsWithMessages = await Promise.all(
        conversations.map(async (conv) => {
          const lastMessage = await db.select()
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
        })
      );

      res.json(conversationsWithMessages);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  // Get messages for a conversation (REQUIRES AUTHENTICATION)
  app.get("/api/inbox/conversations/:conversationId/messages", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const conversationId = parseInt(req.params.conversationId);

      // Verify the conversation belongs to the authenticated client
      const [conversation] = await db.select()
        .from(inboxConversations)
        .where(and(
          eq(inboxConversations.id, conversationId),
          eq(inboxConversations.clientId, clientId)
        ))
        .limit(1);

      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found or access denied" });
      }

      const messages = await db.select()
        .from(inboxMessages2)
        .where(eq(inboxMessages2.conversationId, conversationId))
        .orderBy(inboxMessages2.createdAt);

      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send a message (REQUIRES AUTHENTICATION)
  app.post("/api/inbox/send-message", requireAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const clientId = req.clientId!;
      const { conversationId, message } = req.body;

      if (!conversationId || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Get conversation and verify it belongs to the authenticated client
      const [conversation] = await db.select()
        .from(inboxConversations)
        .where(and(
          eq(inboxConversations.id, conversationId),
          eq(inboxConversations.clientId, clientId)
        ))
        .limit(1);

      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found or access denied" });
      }

      const agentName = 'Agent'; // TODO: Get from client profile
      const agentEmail = 'agent@businessblueprint.io'; // TODO: Get from client profile

      // Send via appropriate channel
      let deliveryStatus = 'sent';
      let errorMessage: string | null = null;

      if (conversation.primaryChannelType === 'email') {
        try {
          await inboxEmailService.sendMessage(conversationId, message, agentName);
          deliveryStatus = 'delivered';
        } catch (emailError: any) {
          errorMessage = emailError.message;
          console.error('Email send error:', errorMessage);
          return res.status(500).json({ 
            error: "Failed to send email",
            details: errorMessage
          });
        }
      }

      const [newMessage] = await db.insert(inboxMessages2).values({
        conversationId,
        channelType: conversation.primaryChannelType,
        messageType: 'outgoing',
        direction: 'outbound',
        content: message,
        fromIdentifier: agentEmail,
        fromName: agentName,
        toIdentifier: conversation.contactIdentifier,
        toName: conversation.contactName || undefined,
        status: deliveryStatus,
      }).returning();

      // Update conversation timestamp
      await db.update(inboxConversations)
        .set({ updatedAt: new Date() })
        .where(eq(inboxConversations.id, conversationId));

      res.json(newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // BIIF: Create Business Location (TODO: Add auth when client system is ready)
  app.post("/api/biif/create-location", async (req, res) => {
    try {
      console.log("📍 BIIF: Received location creation request:", req.body);

      const locationData = z.object({
        name: z.string(),
        address: z.string(),
        city: z.string(),
        state: z.string(),
        postalCode: z.string(),
        country: z.string().default("US"),
        phone: z.string(),
        website: z.string().optional(),
        email: z.string().optional(),
        category: z.string(),
        description: z.string().optional(),
      }).parse(req.body);

      console.log("📍 BIIF: Creating location in Synup...", locationData.name);

      // Create Synup service instance
      const biifSynupService = new SynupService();

      // Create location in Synup
      const synupLocation = await biifSynupService.createLocation(locationData);

      if (!synupLocation) {
        console.error("❌ BIIF: Synup API returned null - location creation failed");
        return res.status(500).json({ 
          success: false,
          error: "Unable to create location. Please verify your Synup API credentials are configured correctly." 
        });
      }

      console.log("✅ BIIF: Location created in Synup:", synupLocation.id);

      // Store in our database (using clientId = 1 for now, until client auth is implemented)
      const location = await storage.createSynupLocation({
        clientId: 1,
        synupLocationId: synupLocation.id,
        name: locationData.name,
        address: locationData.address,
        city: locationData.city,
        state: locationData.state,
        country: locationData.country,
        postalCode: locationData.postalCode,
        phone: locationData.phone,
        website: locationData.website || null,
        email: locationData.email || null,
        category: locationData.category,
      });

      console.log("✅ BIIF: Location stored in database:", location.id);

      res.json({ 
        success: true,
        location,
        message: "Location created and syncing to 200+ directories"
      });
    } catch (error: any) {
      console.error("❌ BIIF: Error creating location:", error);
      res.status(500).json({ 
        success: false,
        error: error.message || "Failed to create location" 
      });
    }
  });
}