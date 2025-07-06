import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAssessmentSchema } from "@shared/schema";
import { GoogleBusinessService } from "./services/googleBusiness";
import { OpenAIAnalysisService } from "./services/openai";
import { EmailService } from "./services/email";
import { vendastaService } from "./services/vendasta";
import { aiCoachService } from "./services/aiCoach";

export async function registerRoutes(app: Express): Promise<Server> {
  const googleService = new GoogleBusinessService();
  const aiService = new OpenAIAnalysisService();
  const emailService = new EmailService();

  // Create new assessment
  app.post("/api/assessments", async (req, res) => {
    try {
      const validatedData = insertAssessmentSchema.parse(req.body);
      
      // Create assessment with pending status
      const assessment = await storage.createAssessment({
        ...validatedData,
        status: "pending"
      });

      // Start background analysis
      processAssessmentAsync(assessment.id, googleService, aiService, emailService, storage);

      res.json({ 
        success: true, 
        assessmentId: assessment.id,
        message: "Assessment started. You'll receive results via email within 2-3 minutes."
      });
    } catch (error) {
      console.error("Error creating assessment:", error);
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

      if (!["diy", "msp", "none"].includes(pathway)) {
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

  // Vendasta webhook endpoint
  app.post("/api/webhooks/vendasta", async (req, res) => {
    try {
      const signature = req.headers['x-vendasta-hmac'] as string;
      const payload = JSON.stringify(req.body);
      
      // Verify webhook signature
      if (!vendastaService.verifyWebhookSignature(payload, signature)) {
        return res.status(401).json({ message: "Invalid signature" });
      }

      // Process webhook
      const success = await vendastaService.handleWebhook(req.body);
      
      if (success) {
        res.json({ success: true, message: "Webhook processed successfully" });
      } else {
        res.status(500).json({ message: "Failed to process webhook" });
      }
    } catch (error) {
      console.error("Error processing Vendasta webhook:", error);
      res.status(500).json({ message: "Internal server error" });
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
      const campaignData = await vendastaService.getClientCampaignData(clientId);
      
      if (!campaignData) {
        return res.status(404).json({ message: "Client not found" });
      }
      
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

  // Sync client from Vendasta
  app.post("/api/clients/sync-vendasta", async (req, res) => {
    try {
      const { customerIdentifier } = req.body;
      
      if (!customerIdentifier) {
        return res.status(400).json({ message: "Customer identifier is required" });
      }

      // Fetch client data from Vendasta
      const vendastaClient = await vendastaService.fetchClientData(customerIdentifier);
      
      if (!vendastaClient) {
        return res.status(404).json({ message: "Client not found in Vendasta" });
      }

      // Sync to our database
      const clientId = await vendastaService.syncClientData(vendastaClient);
      
      if (clientId) {
        const client = await storage.getClient(clientId);
        res.json(client);
      } else {
        res.status(500).json({ message: "Failed to sync client data" });
      }
    } catch (error) {
      console.error("Error syncing Vendasta client:", error);
      res.status(500).json({ message: "Failed to sync client" });
    }
  });

  // Dashboard access endpoint
  app.get("/api/dashboard/:token", async (req, res) => {
    try {
      const { token } = req.params;
      
      // Here you would verify the token and redirect to the appropriate Vendasta dashboard
      // For now, we'll return a placeholder response
      res.json({ 
        message: "Dashboard access", 
        token,
        redirectUrl: `https://business-app.vendasta.com/dashboard?token=${token}`
      });
    } catch (error) {
      console.error("Error accessing dashboard:", error);
      res.status(500).json({ message: "Failed to access dashboard" });
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

  const httpServer = createServer(app);
  return httpServer;
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
      grade: analysisResult.grade,
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
