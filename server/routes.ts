import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAssessmentSchema } from "@shared/schema";
import { GoogleBusinessService } from "./services/googleBusiness";
import { OpenAIAnalysisService } from "./services/openai";
import { EmailService } from "./services/email";

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
