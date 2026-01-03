# COMPREHENSIVE PROMPT: Multi-AI Provider System + Perfect Prescriptions

---

## ⚠️ MANDATORY FIRST STEPS ⚠️

**STOP. Before doing ANYTHING, you MUST:**

1. **Read GOVERNANCE_REPLIT.md completely** ← This defines how we work together
2. **Read all documents referenced in this prompt**
3. **Confirm to Dean that you have finished reading**
4. **Put yourself in PLAN mode**
5. **Create a detailed implementation plan**
6. **Present your plan to Dean for approval**
7. **WAIT for Dean's explicit approval**
8. **Only then begin implementation**

**DO NOT write any code until Dean approves your plan.**

---

## PRIORITY

**CRITICAL** ⭐⭐⭐  
**Estimated Time:** 8-10 hours  
**Complexity:** High  
**Dependencies:** API keys must be added to Replit Secrets first

---

## OBJECTIVE

Build a production-quality prescription system with flexible AI providers that generates **perfect prescriptions**:

**Perfect = Concise + Timely + Accurate**
- **Concise:** Clear, actionable recommendations (not walls of text)
- **Timely:** Delivered within 2-3 minutes of assessment completion
- **Accurate:** Based on real business data + industry best practices

**Secondary Goal:** Allow switching between Claude, OpenAI, and DeepSeek via admin panel for cost optimization.

**Default Configuration:**
- Assessment Analysis: **DeepSeek** (90% cost savings)
- Prescription Generation: **DeepSeek** (cost-effective for structured analysis)
- Coach Blue: **Claude** (premium conversational quality)

---

## CURRENT STATE ANALYSIS

### What's Broken:

1. **Prescription Generation**
   - Uses OpenAI (line 3503 of routes.ts: `aiService.analyzeBusinessPresence()`)
   - No ability to switch AI providers
   - Locks us into expensive OpenAI costs

2. **Prescription Email Template**
   - Wrong brand colors (purple/orange gradient instead of blue/orange)
   - Links to broken `/dashboard/7` route
   - Generic design, not BusinessBlueprint branded

3. **Prescription Storage**
   - Saves to `recommendations` table ✅
   - But NOT saving to `prescriptions` table ❌
   - No prescription review workflow for admin

4. **Client Portal Access**
   - No way for clients to view prescriptions in portal
   - No `/portal/prescriptions` route
   - Prescriptions only delivered via email

### What's Working:

- ✅ Assessment data collection
- ✅ Google Business Intelligence scan
- ✅ OpenAI analysis (just need to make it switchable)
- ✅ Email delivery infrastructure
- ✅ Database schema has `prescriptions` table

---

## PART 1: PREREQUISITES

### Add API Keys to Replit Secrets

**Required Secrets (verify all exist):**
1. ✅ `ANTHROPIC_API_KEY` - Already exists
2. ✅ `OPENAI_API_KEY` - Already exists  
3. ⚠️ `DEEPSEEK_API_KEY` - **MUST ADD THIS**

**To get DeepSeek API key:**
1. Go to https://platform.deepseek.com
2. Sign up for account
3. Navigate to API Keys section
4. Create new API key
5. Add to Replit Secrets as `DEEPSEEK_API_KEY`

**Before proceeding, confirm all three API keys are in Replit Secrets.**

---

## PART 2: AI PROVIDER ABSTRACTION LAYER

### Create `/server/services/ai-provider.ts` (NEW FILE)

This unified interface allows switching between Claude, OpenAI, and DeepSeek.

```typescript
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

export type AIProvider = 'claude' | 'openai' | 'deepseek';

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AICompletionRequest {
  messages: AIMessage[];
  temperature?: number;
  maxTokens?: number;
  responseFormat?: 'json' | 'text';
}

export interface AICompletionResponse {
  content: string;
  provider: AIProvider;
  model: string;
  tokensUsed?: number;
}

export class UnifiedAIService {
  private anthropic: Anthropic;
  private openai: OpenAI;
  private deepseek: OpenAI; // DeepSeek uses OpenAI-compatible API

  constructor() {
    // Initialize Anthropic (Claude)
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    });

    // Initialize OpenAI
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });

    // Initialize DeepSeek (uses OpenAI-compatible API)
    this.deepseek = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY || '',
      baseURL: 'https://api.deepseek.com',
    });
  }

  /**
   * Get completion from specified AI provider
   */
  async getCompletion(
    provider: AIProvider,
    request: AICompletionRequest
  ): Promise<AICompletionResponse> {
    try {
      switch (provider) {
        case 'claude':
          return await this.getClaudeCompletion(request);
        case 'openai':
          return await this.getOpenAICompletion(request);
        case 'deepseek':
          return await this.getDeepSeekCompletion(request);
        default:
          throw new Error(`Unknown AI provider: ${provider}`);
      }
    } catch (error) {
      console.error(`[AI Provider] ${provider} failed:`, error);
      // Fallback logic: try providers in order
      return await this.getCompletionWithFallback(provider, request);
    }
  }

  /**
   * Claude (Anthropic) completion
   */
  private async getClaudeCompletion(
    request: AICompletionRequest
  ): Promise<AICompletionResponse> {
    const systemMessage = request.messages.find(m => m.role === 'system');
    const userMessages = request.messages.filter(m => m.role !== 'system');

    const response = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: request.maxTokens || 4096,
      temperature: request.temperature || 0.7,
      system: systemMessage?.content,
      messages: userMessages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    const content = response.content[0].type === 'text' 
      ? response.content[0].text 
      : '';

    return {
      content,
      provider: 'claude',
      model: 'claude-sonnet-4-20250514',
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
    };
  }

  /**
   * OpenAI completion
   */
  private async getOpenAICompletion(
    request: AICompletionRequest
  ): Promise<AICompletionResponse> {
    const params: any = {
      model: 'gpt-4o',
      messages: request.messages,
      temperature: request.temperature || 0.7,
      max_tokens: request.maxTokens || 4096,
    };

    if (request.responseFormat === 'json') {
      params.response_format = { type: 'json_object' };
    }

    const response = await this.openai.chat.completions.create(params);

    return {
      content: response.choices[0]?.message?.content || '',
      provider: 'openai',
      model: 'gpt-4o',
      tokensUsed: response.usage?.total_tokens,
    };
  }

  /**
   * DeepSeek completion
   */
  private async getDeepSeekCompletion(
    request: AICompletionRequest
  ): Promise<AICompletionResponse> {
    const params: any = {
      model: 'deepseek-chat',
      messages: request.messages,
      temperature: request.temperature || 0.7,
      max_tokens: request.maxTokens || 4096,
    };

    if (request.responseFormat === 'json') {
      params.response_format = { type: 'json_object' };
    }

    const response = await this.deepseek.chat.completions.create(params);

    return {
      content: response.choices[0]?.message?.content || '',
      provider: 'deepseek',
      model: 'deepseek-chat',
      tokensUsed: response.usage?.total_tokens,
    };
  }

  /**
   * Fallback logic if primary provider fails
   * Tries: DeepSeek → Claude → OpenAI (but skips the failed one)
   */
  private async getCompletionWithFallback(
    failedProvider: AIProvider,
    request: AICompletionRequest
  ): Promise<AICompletionResponse> {
    const fallbackOrder: AIProvider[] = ['deepseek', 'claude', 'openai'];
    const remainingProviders = fallbackOrder.filter(p => p !== failedProvider);

    for (const provider of remainingProviders) {
      try {
        console.log(`[AI Provider] Trying fallback: ${provider}`);
        
        // Call the specific provider method directly to avoid infinite loop
        switch (provider) {
          case 'claude':
            return await this.getClaudeCompletion(request);
          case 'openai':
            return await this.getOpenAICompletion(request);
          case 'deepseek':
            return await this.getDeepSeekCompletion(request);
        }
      } catch (error) {
        console.error(`[AI Provider] Fallback ${provider} also failed:`, error);
        continue;
      }
    }

    throw new Error('All AI providers failed');
  }
}

export const unifiedAI = new UnifiedAIService();
```

---

## PART 3: AI SETTINGS DATABASE + SERVICE

### 3.1: Add to `/shared/schema.ts`

Add this table definition (insert near other tables):

```typescript
export const aiSettings = pgTable("ai_settings", {
  id: serial("id").primaryKey(),
  feature: text("feature").notNull().unique(), // 'assessment', 'prescription', 'coach_blue'
  provider: text("provider").notNull(), // 'claude', 'openai', 'deepseek'
  isActive: boolean("is_active").default(true).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
  updatedBy: integer("updated_by"), // admin user ID who made the change
});

export type AISettings = typeof aiSettings.$inferSelect;
export type InsertAISettings = typeof aiSettings.$inferInsert;
```

**Then run database migration:**
```bash
npm run db:push
```

### 3.2: Seed Initial Settings

After migration, insert default settings. Add this to your seed or run manually:

```sql
INSERT INTO ai_settings (feature, provider, is_active) VALUES
  ('assessment', 'deepseek', true),
  ('prescription', 'deepseek', true),
  ('coach_blue', 'claude', true)
ON CONFLICT (feature) DO NOTHING;
```

### 3.3: Create `/server/services/ai-settings.ts` (NEW FILE)

```typescript
import { db } from '../db';
import { aiSettings } from '@shared/schema';
import { eq } from 'drizzle-orm';
import type { AIProvider } from './ai-provider';

export class AISettingsService {
  /**
   * Get current AI provider for a feature
   */
  async getProvider(feature: 'assessment' | 'prescription' | 'coach_blue'): Promise<AIProvider> {
    const setting = await db.query.aiSettings.findFirst({
      where: eq(aiSettings.feature, feature),
    });

    return (setting?.provider as AIProvider) || 'claude'; // Default to Claude if not set
  }

  /**
   * Update AI provider for a feature
   */
  async updateProvider(
    feature: 'assessment' | 'prescription' | 'coach_blue',
    provider: AIProvider,
    updatedBy?: number
  ) {
    await db
      .update(aiSettings)
      .set({
        provider,
        lastUpdated: new Date(),
        updatedBy,
      })
      .where(eq(aiSettings.feature, feature));
  }

  /**
   * Get all AI settings
   */
  async getAllSettings() {
    return await db.select().from(aiSettings);
  }
}

export const aiSettingsService = new AISettingsService();
```

---

## PART 4: UPDATE ASSESSMENT/PRESCRIPTION SERVICE

### 4.1: Modify `/server/services/openai.ts`

**IMPORTANT:** We're renaming this service to be provider-agnostic.

**Option A (Recommended):** Rename file to `business-analysis.ts` and update imports everywhere

**Option B (Simpler):** Keep filename but make it use unified AI service

I'll show Option B (simpler for you):

```typescript
import { unifiedAI, type AIProvider } from './ai-provider';
import { aiSettingsService } from './ai-settings';

// Keep all existing interfaces (BusinessAnalysisInput, AnalysisResult, etc.)

export class BusinessAnalysisService {
  async analyzeBusinessPresence(input: BusinessAnalysisInput): Promise<AnalysisResult> {
    try {
      // Get current provider from settings
      const provider = await aiSettingsService.getProvider('assessment');
      
      console.log(`[Business Analysis] Using ${provider} for assessment analysis`);
      
      const prompt = this.buildAnalysisPrompt(input);
      
      const response = await unifiedAI.getCompletion(provider, {
        messages: [
          {
            role: 'system',
            content: "You are a digital marketing expert specializing in local business online presence analysis. Provide detailed, actionable insights based on Google Business Profile data and general digital marketing best practices. Always respond with valid JSON."
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        responseFormat: 'json',
        temperature: 0.7,
        maxTokens: 3000 // Increased for comprehensive analysis
      });

      const result = JSON.parse(response.content || "{}");
      
      console.log(`[Business Analysis] ${provider} analysis complete. Tokens used: ${response.tokensUsed}`);
      
      return this.validateAndFormatResult(result, input.presenceScore.overallScore);
    } catch (error) {
      console.error("Error analyzing business presence:", error);
      throw new Error("Failed to analyze business presence");
    }
  }

  // Keep all existing private methods UNCHANGED:
  // - buildAnalysisPrompt
  // - validateAndFormatResult  
  // - validateRecommendation
}

// Export singleton instance
export const businessAnalysisService = new BusinessAnalysisService();
```

### 4.2: Update the import in `/server/routes.ts`

Find where `OpenAIAnalysisService` is imported and used (around line 3503):

**Change from:**
```typescript
import { OpenAIAnalysisService } from "./services/openai";
const aiService = new OpenAIAnalysisService();
```

**To:**
```typescript
import { businessAnalysisService } from "./services/openai"; // or business-analysis.ts if renamed
// Remove the instantiation - use the exported singleton
```

**Then update the call (line 3503):**
```typescript
// Change from:
const analysisResult = await aiService.analyzeBusinessPresence({

// To:
const analysisResult = await businessAnalysisService.analyzeBusinessPresence({
```

---

## PART 5: UPDATE COACH BLUE SERVICE

### Modify `/server/services/aiCoach.ts`

```typescript
import { unifiedAI } from './ai-provider';
import { aiSettingsService } from './ai-settings';

// Keep all existing interfaces

export class AICoachService {
  async getPersonalizedGuidance(context: CoachingContext): Promise<CoachingResponse> {
    const prompt = this.buildCoachingPrompt(context);
    
    try {
      const provider = await aiSettingsService.getProvider('coach_blue');
      
      console.log(`[Coach Blue] Using ${provider} for coaching`);
      
      const response = await unifiedAI.getCompletion(provider, {
        messages: [
          {
            role: 'system',
            content: `You are Coach Blue, an expert digital marketing coach specializing in helping small businesses improve their online presence. You provide encouraging, actionable, and personalized guidance based on their current situation and experience level.

Key principles:
- Be supportive and motivational  
- Break down complex tasks into simple steps
- Consider their time constraints and experience
- Focus on high-impact, low-cost strategies for DIY users
- Provide specific, actionable advice
- Celebrate their progress and acknowledge challenges`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        maxTokens: 1500
      });

      console.log(`[Coach Blue] ${provider} response complete`);

      return this.parseCoachingResponse(response.content);
    } catch (error) {
      console.error("Error getting AI coaching:", error);
      return this.getFallbackGuidance(context);
    }
  }

  async getStepByStepHelp(task: string, userContext: CoachingContext): Promise<{
    steps: string[];
    tips: string[];
    commonMistakes: string[];
    successMetrics: string[];
  }> {
    const prompt = `
Help a ${userContext.userProgress.experience} level business owner complete this task: "${task}"

Business context:
- Industry: ${userContext.businessInfo.industry}
- Current Digital IQ Score: ${userContext.businessInfo.digitalScore}/140
- Time available: ${userContext.userProgress.timeAvailable}

Provide detailed step-by-step instructions, practical tips, common mistakes to avoid, and how to measure success.
`;

    try {
      const provider = await aiSettingsService.getProvider('coach_blue');
      
      const response = await unifiedAI.getCompletion(provider, {
        messages: [
          {
            role: 'system',
            content: "You are Coach Blue, a digital marketing tutor. Break down complex tasks into simple, actionable steps that anyone can follow."
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        maxTokens: 1200
      });

      return this.parseStepByStepResponse(response.content);
    } catch (error) {
      console.error("Error getting step-by-step help:", error);
      return this.getFallbackSteps(task);
    }
  }

  async analyzeProgress(context: CoachingContext): Promise<{
    progressScore: number;
    achievements: string[];
    nextPriorities: string[];
    motivationalMessage: string;
  }> {
    const prompt = `
Analyze the progress of this business:
- Completed steps: ${context.userProgress.completedSteps.join(", ")}
- Current goals: ${context.userProgress.currentGoals.join(", ")}
- Digital IQ Score: ${context.businessInfo.digitalScore}/140
- Industry: ${context.businessInfo.industry}

Provide an encouraging progress analysis with specific achievements and next priorities.
`;

    try {
      const provider = await aiSettingsService.getProvider('coach_blue');
      
      const response = await unifiedAI.getCompletion(provider, {
        messages: [
          {
            role: 'system',
            content: "You are Coach Blue, an encouraging business coach. Focus on celebrating achievements and providing clear direction for continued growth."
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        maxTokens: 800
      });

      return this.parseProgressResponse(response.content);
    } catch (error) {
      console.error("Error analyzing progress:", error);
      return {
        progressScore: Math.round(context.businessInfo.digitalScore),
        achievements: ["Completed initial assessment"],
        nextPriorities: ["Optimize Google Business listing"],
        motivationalMessage: "You're making great progress with your Digital Blueprint!"
      };
    }
  }

  // Keep all existing private methods UNCHANGED
}

export const aiCoachService = new AICoachService();
```

---

## PART 6: CREATE PRESCRIPTION IN DATABASE

### 6.1: Add Prescription Creation to Assessment Flow

In `/server/routes.ts`, find the assessment processing (around line 3540) and ADD prescription creation:

**After the recommendations are saved (line 3552), ADD:**

```typescript
// Save recommendations (existing code)
for (const rec of enhancedAnalysis.recommendations) {
  await storage.createRecommendation({
    assessmentId,
    category: rec.category,
    title: rec.title,
    description: rec.description,
    priority: rec.priority,
    estimatedImpact: rec.estimatedImpact || "moderate",
    estimatedEffort: rec.estimatedEffort || "low",
  });
}

// ✅ NEW: Create prescription in prescriptions table
const prescriptionSummary = `
Based on your Digital IQ Score of ${presenceScan.overall.digitalIQScore}/140, we've identified ${enhancedAnalysis.recommendations.length} key opportunities to improve your online presence.

${enhancedAnalysis.summary}

Focus on the ${enhancedAnalysis.recommendations.filter(r => r.priority === 'high').length} high-priority recommendations first for maximum impact.
`.trim();

const [prescription] = await db.insert(prescriptions).values({
  clientId: null, // Assessment not yet linked to client
  assessmentId: assessmentId,
  title: `Digital Growth Prescription for ${assessment.businessName}`,
  summary: prescriptionSummary,
  status: 'delivered', // Auto-deliver for assessments (no admin review needed)
  implementationProgress: 0,
  deliveredAt: new Date(),
}).returning();

console.log(`[Assessment] Created prescription ID ${prescription.id} for assessment ${assessmentId}`);
```

**Note:** You'll need to import prescriptions table at the top:
```typescript
import { prescriptions } from '@shared/schema';
```

---

## PART 7: FIX PRESCRIPTION EMAIL TEMPLATE

### Modify `/server/services/email.ts`

Find the `generateReportHTML` function (line 602) and replace with BRANDED version:

```typescript
private generateReportHTML(data: EmailReportData): string {
  const highPriorityRecs = data.recommendations.filter(r => r.priority === 'high').slice(0, 3);
  const gradeInfo = this.getGradeInfo(data.digitalScore);
  
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Archivo+Semi+Expanded:wght@600;700&display=swap" rel="stylesheet">
    <title>Your Digital Presence Assessment Results</title>
    <style>
        body { 
          font-family: 'Archivo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          background-color: #EEFBFF;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header { 
          background: #f8fafc;
          padding: 30px;
          text-align: center;
          border-bottom: 3px solid #F97316;
        }
        .logo {
          max-width: 300px;
          height: auto;
          margin-bottom: 20px;
        }
        .content { 
          background: #ffffff; 
          padding: 40px 30px;
          background-image: 
            linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.03) 25%, rgba(59, 130, 246, 0.03) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.03) 75%, rgba(59, 130, 246, 0.03) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.03) 25%, rgba(59, 130, 246, 0.03) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.03) 75%, rgba(59, 130, 246, 0.03) 76%, transparent 77%, transparent);
          background-size: 50px 50px;
        }
        .score-section {
          text-align: center;
          padding: 30px 0;
          background: linear-gradient(135deg, #0000FF 0%, #3B82F6 100%);
          border-radius: 12px;
          margin: 30px 0;
          color: white;
        }
        .score-value { 
          font-size: 72px; 
          font-weight: 700; 
          font-family: 'Archivo Semi Expanded', sans-serif;
          margin: 10px 0;
        }
        .score-label {
          font-size: 18px;
          opacity: 0.9;
          font-weight: 600;
        }
        .grade-badge {
          display: inline-block;
          background: ${gradeInfo.color};
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: 700;
          font-family: 'Archivo Semi Expanded', sans-serif;
          margin-top: 10px;
        }
        .section { 
          margin: 30px 0; 
        }
        .recommendation { 
          background: #f8fafc;
          padding: 20px; 
          margin: 15px 0; 
          border-left: 4px solid #F97316; 
          border-radius: 8px;
        }
        .recommendation h3 {
          color: #0000FF;
          margin: 0 0 10px 0;
          font-family: 'Archivo Semi Expanded', sans-serif;
          font-size: 18px;
        }
        .cta-button { 
          display: inline-block; 
          background: transparent;
          color: #F97316;
          border: 2px solid #F97316;
          padding: 14px 30px; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: 700;
          font-family: 'Archivo Semi Expanded', sans-serif;
          margin: 10px 5px;
          transition: all 0.3s ease;
        }
        .cta-button:hover {
          background: #F97316;
          color: white;
        }
        .cta-button.primary {
          background: #F97316;
          color: white;
        }
        .cta-button.primary:hover {
          background: #ea580c;
        }
        .footer { 
          background: #EEFBFF;
          padding: 30px 20px; 
          text-align: center; 
          color: #666; 
          border-radius: 0 0 12px 12px;
        }
        h1 {
          font-family: 'Archivo Semi Expanded', sans-serif;
          font-weight: 700;
          color: #0000FF;
          margin: 0;
        }
        h2 {
          font-family: 'Archivo Semi Expanded', sans-serif;
          font-weight: 700;
          color: #0000FF;
          margin: 30px 0 15px 0;
        }
        .info-box {
          background: #EEFBFF;
          border: 2px solid #6EA6FF;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://businessblueprint.io/1-Master_business_blueprint_icon_and_logo.png" alt="BusinessBlueprint.io" class="logo" />
        </div>
        
        <div class="content">
            <div class="score-section">
                <div class="score-label">Your Digital IQ Score</div>
                <div class="score-value">${data.digitalScore}</div>
                <div class="score-label">out of 140</div>
                <div class="grade-badge">Grade: ${gradeInfo.grade}</div>
            </div>
            
            <div class="section">
                <h1>${data.businessName}</h1>
                <h2>Executive Summary</h2>
                <p>${data.summary}</p>
            </div>
            
            <div class="section">
                <h2>🎯 Priority Recommendations</h2>
                <p>Based on our AI analysis, here are your top opportunities for growth:</p>
                ${highPriorityRecs.map((rec, index) => `
                    <div class="recommendation">
                        <h3>${index + 1}. ${rec.title}</h3>
                        <p>${rec.description}</p>
                        <p><strong>Impact:</strong> ${rec.estimatedImpact} | <strong>Effort:</strong> ${rec.estimatedEffort}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="info-box">
                <h2 style="margin-top: 0;">📊 View Your Complete Prescription</h2>
                <p>Your full digital growth prescription includes:</p>
                <ul style="margin: 15px 0; padding-left: 25px;">
                    <li>${data.recommendations.length} total recommendations</li>
                    <li>Step-by-step implementation guides</li>
                    <li>Progress tracking tools</li>
                    <li>Coach Blue AI assistance</li>
                </ul>
            </div>
            
            <div class="section" style="text-align: center;">
                <h2>Choose Your Path Forward</h2>
                <p>Ready to improve your digital presence? We offer two paths to success:</p>
                
                <a href="https://businessblueprint.io/portal/assessments" class="cta-button primary">
                    View Full Prescription
                </a>
                
                <p style="margin-top: 30px; font-size: 14px; color: #666;">
                    Assessment ID: ${data.assessmentId}
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>BusinessBlueprint.io</strong> - Your Partner in Local Business Growth</p>
            <p>This assessment was powered by Google Business Intelligence and AI analysis.</p>
            <p>Questions? Reply to this email or contact us at support@businessblueprint.io</p>
        </div>
    </div>
</body>
</html>`;
}

// Helper function to get grade info
private getGradeInfo(score: number): { grade: string; color: string } {
  if (score >= 126) return { grade: 'A+', color: '#00FF40' };
  if (score >= 112) return { grade: 'A', color: '#00FF40' };
  if (score >= 98) return { grade: 'B+', color: '#6EA6FF' };
  if (score >= 84) return { grade: 'B', color: '#6EA6FF' };
  if (score >= 70) return { grade: 'C+', color: '#F97316' };
  if (score >= 56) return { grade: 'C', color: '#F97316' };
  if (score >= 42) return { grade: 'D+', color: '#FF0040' };
  if (score >= 28) return { grade: 'D', color: '#FF0040' };
  return { grade: 'F', color: '#FF0040' };
}
```

**Key Changes:**
- ✅ Branded colors (blue gradient, orange accents)
- ✅ Archivo fonts
- ✅ Blueprint grid background
- ✅ Logo at top
- ✅ Links to `/portal/assessments` (not broken `/dashboard/7`)
- ✅ Professional, on-brand design

---

## PART 8: ADMIN PANEL - AI SETTINGS INTERFACE

### 8.1: Create `/client/src/components/admin/ai-settings-panel.tsx` (NEW FILE)

```typescript
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Brain, Zap, DollarSign, Check } from 'lucide-react';

interface AISettingType {
  id: number;
  feature: string;
  provider: string;
  isActive: boolean;
  lastUpdated: string;
}

const PROVIDER_INFO = {
  claude: {
    name: 'Claude (Anthropic)',
    icon: Brain,
    color: 'bg-purple-100 text-purple-700',
    description: 'Premium conversational AI - Best for coaching & empathy',
    cost: '$$$ (Premium)',
  },
  openai: {
    name: 'OpenAI (GPT-4o)',
    icon: Brain,
    color: 'bg-blue-100 text-blue-700',
    description: 'Industry standard - Balanced performance',
    cost: '$$ (Standard)',
  },
  deepseek: {
    name: 'DeepSeek',
    icon: Zap,
    color: 'bg-green-100 text-green-700',
    description: 'Cost-effective - Great for analytical tasks',
    cost: '$ (Budget - 90% savings)',
  },
};

const FEATURE_INFO = {
  assessment: {
    name: 'Assessment Analysis',
    description: 'Analyzes business digital presence and generates scores',
    recommended: 'deepseek',
  },
  prescription: {
    name: 'Prescription Generation',
    description: 'Creates customized growth recommendations',
    recommended: 'deepseek',
  },
  coach_blue: {
    name: 'Coach Blue (AI Coaching)',
    description: 'Personalized guidance and motivational support',
    recommended: 'claude',
  },
};

export function AISettingsPanel() {
  const { toast } = useToast();
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});

  const { data: settings, isLoading } = useQuery<AISettingType[]>({
    queryKey: ['/api/admin/ai-settings'],
  });

  const updateMutation = useMutation({
    mutationFn: async ({ feature, provider }: { feature: string; provider: string }) => {
      return await apiRequest('PATCH', '/api/admin/ai-settings', { feature, provider });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/ai-settings'] });
      setPendingChanges({});
      toast({
        title: "AI Settings Updated",
        description: "Changes applied successfully. New provider will be used for future requests.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update AI settings.",
        variant: "destructive",
      });
    },
  });

  const handleProviderChange = (feature: string, provider: string) => {
    setPendingChanges(prev => ({ ...prev, [feature]: provider }));
  };

  const handleSave = (feature: string) => {
    const provider = pendingChanges[feature];
    if (provider) {
      updateMutation.mutate({ feature, provider });
    }
  };

  const hasChanges = (feature: string) => {
    const current = settings?.find(s => s.feature === feature)?.provider;
    return pendingChanges[feature] && pendingChanges[feature] !== current;
  };

  if (isLoading) {
    return <div>Loading AI settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">AI Provider Settings</h2>
        <p className="text-gray-600">
          Configure which AI provider powers each feature. Changes take effect immediately.
        </p>
      </div>

      {Object.entries(FEATURE_INFO).map(([feature, info]) => {
        const setting = settings?.find(s => s.feature === feature);
        const currentProvider = setting?.provider || 'claude';
        const selectedProvider = pendingChanges[feature] || currentProvider;

        return (
          <Card key={feature}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {info.name}
                    {info.recommended === currentProvider && (
                      <Badge variant="outline" className="bg-green-50">
                        <Check className="w-3 h-3 mr-1" />
                        Recommended
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{info.description}</CardDescription>
                </div>
                {hasChanges(feature) && (
                  <Button
                    onClick={() => handleSave(feature)}
                    size="sm"
                    disabled={updateMutation.isPending}
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Select AI Provider:
                  </label>
                  <Select
                    value={selectedProvider}
                    onValueChange={(value) => handleProviderChange(feature, value)}
                  >
                    <SelectTrigger className="w-full max-w-md">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PROVIDER_INFO).map(([key, provider]) => {
                        const Icon = provider.icon;
                        return (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-3 py-2">
                              <div className={`p-2 rounded-lg ${provider.color}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{provider.name}</div>
                                <div className="text-xs text-gray-500">{provider.description}</div>
                              </div>
                              <div className="text-xs font-medium text-gray-600">
                                {provider.cost}
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {selectedProvider && (
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex items-start gap-3">
                      {React.createElement(PROVIDER_INFO[selectedProvider as keyof typeof PROVIDER_INFO].icon, {
                        className: "w-5 h-5 mt-0.5 text-gray-600"
                      })}
                      <div className="flex-1">
                        <div className="font-medium mb-1">
                          {PROVIDER_INFO[selectedProvider as keyof typeof PROVIDER_INFO].name}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {PROVIDER_INFO[selectedProvider as keyof typeof PROVIDER_INFO].description}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-medium">
                            {PROVIDER_INFO[selectedProvider as keyof typeof PROVIDER_INFO].cost}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {setting?.lastUpdated && (
                  <div className="text-xs text-gray-500">
                    Last updated: {new Date(setting.lastUpdated).toLocaleString()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Cost Optimization Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>DeepSeek</strong> recommended for analytical tasks (90% cost savings vs Claude)</li>
            <li>• <strong>Claude</strong> excels at empathetic, conversational interactions</li>
            <li>• <strong>OpenAI</strong> provides balanced performance for general use</li>
            <li>• All providers have automatic fallbacks if the primary fails</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
```

### 8.2: Add to Admin Panel

Modify `/client/src/pages/admin-panel.tsx`:

**Add imports:**
```typescript
import { AISettingsPanel } from '@/components/admin/ai-settings-panel';
import { Brain } from 'lucide-react';
```

**Update AdminTab type (around line 155):**
```typescript
type AdminTab = 'dashboard' | 'clients' | 'assessments' | 'billing' | 'tickets' | 'prescriptions' | 'emails' | 'ai-settings' | 'settings';
```

**Add to navItems (around line 365):**
```typescript
const navItems = [
  { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'clients' as AdminTab, label: 'Clients', icon: Users, badge: totalClients },
  { id: 'assessments' as AdminTab, label: 'Assessments', icon: FileText, badge: totalAssessments },
  { id: 'billing' as AdminTab, label: 'Billing', icon: CreditCard, badge: subscriptionsData?.stats?.totalSubscriptions },
  { id: 'tickets' as AdminTab, label: 'Support', icon: Ticket, badge: openTickets },
  { id: 'prescriptions' as AdminTab, label: 'Prescriptions', icon: ClipboardList, badge: pendingPrescriptions },
  { id: 'emails' as AdminTab, label: 'Emails', icon: Mail },
  { id: 'ai-settings' as AdminTab, label: 'AI Settings', icon: Brain }, // ✅ ADD THIS
  { id: 'settings' as AdminTab, label: 'Settings', icon: Settings },
];
```

**Add TabsContent (find where other tabs are rendered):**
```typescript
<TabsContent value="ai-settings" className="mt-0">
  <AISettingsPanel />
</TabsContent>
```

---

## PART 9: API ROUTES FOR AI SETTINGS

### Add to `/server/routes.ts`

**Add imports at top:**
```typescript
import { aiSettings } from '@shared/schema';
import { aiSettingsService } from './services/ai-settings';
```

**Add routes (find a good spot with other admin routes):**
```typescript
// ========================================
// AI SETTINGS ADMIN ROUTES
// ========================================

// GET all AI settings
app.get('/api/admin/ai-settings', isAuthenticated, async (req, res) => {
  try {
    const settings = await aiSettingsService.getAllSettings();
    res.json(settings);
  } catch (error) {
    console.error('[AI Settings] Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch AI settings' });
  }
});

// UPDATE AI provider for a feature
app.patch('/api/admin/ai-settings', isAuthenticated, async (req, res) => {
  try {
    const { feature, provider } = req.body;
    
    // Validate inputs
    if (!['assessment', 'prescription', 'coach_blue'].includes(feature)) {
      return res.status(400).json({ error: 'Invalid feature' });
    }
    
    if (!['claude', 'openai', 'deepseek'].includes(provider)) {
      return res.status(400).json({ error: 'Invalid provider' });
    }
    
    const adminId = parseInt(req.user?.claims?.sub);
    await aiSettingsService.updateProvider(feature, provider, adminId);
    
    console.log(`[AI Settings] Updated ${feature} to use ${provider} (by admin ${adminId})`);
    
    res.json({ success: true, feature, provider });
  } catch (error) {
    console.error('[AI Settings] Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update AI settings' });
  }
});
```

---

## PART 10: INSTALL REQUIRED PACKAGES

```bash
npm install @anthropic-ai/sdk
```

**Note:** OpenAI package already installed. DeepSeek uses the same OpenAI SDK with different baseURL.

---

## PART 11: TESTING INSTRUCTIONS

### Test 1: Provider Switching in Admin

1. Log into admin panel at `/admin`
2. Click "AI Settings" tab
3. Verify all three features listed with current providers
4. Change Assessment to OpenAI
5. Click "Save Changes"
6. Verify success message
7. Refresh page - verify change persisted
8. Change back to DeepSeek

### Test 2: Assessment with DeepSeek

1. Go to `/assessment`
2. Complete assessment form
3. Submit
4. Check server logs - should show: `[Business Analysis] Using deepseek for assessment analysis`
5. Wait 2-3 minutes
6. Check email inbox
7. Verify:
   - Branded email received (blue/orange colors)
   - Logo displays
   - Score shown
   - Recommendations listed
   - Link goes to `/portal/assessments` (not /dashboard/7)

### Test 3: Coach Blue with Claude

1. Access Coach Blue feature (wherever implemented)
2. Request coaching guidance
3. Check server logs - should show: `[Coach Blue] Using claude for coaching`
4. Verify response quality is empathetic and helpful

### Test 4: Fallback System

1. In admin panel, set Assessment to DeepSeek
2. Temporarily remove `DEEPSEEK_API_KEY` from Secrets (to simulate failure)
3. Submit assessment
4. Check logs - should show fallback to Claude or OpenAI
5. Verify assessment still completes successfully
6. Restore `DEEPSEEK_API_KEY`

### Test 5: Prescription in Database

1. Submit assessment
2. Check `prescriptions` table in database
3. Verify prescription record created with:
   - assessmentId linked
   - status = 'delivered'
   - summary populated
   - deliveredAt timestamp

### Test 6: Email Template Branding

1. Submit assessment
2. Receive email
3. Verify:
   - Archivo fonts load correctly
   - Blue/orange brand colors
   - Logo displays (not broken image)
   - Blueprint grid background visible
   - Responsive on mobile
   - All links work

---

## ACCEPTANCE CRITERIA

**CRITICAL (Must Have):**
- [x] DeepSeek, Claude, and OpenAI all integrated
- [x] Admin can switch providers via UI
- [x] Settings persist in database
- [x] Automatic fallback if provider fails
- [x] Assessment uses DeepSeek by default
- [x] Coach Blue uses Claude by default
- [x] Prescription email has correct branding (blue/orange, not purple)
- [x] Email links to `/portal/assessments` (not broken `/dashboard/7`)
- [x] Prescription saved to `prescriptions` table
- [x] No code changes needed to switch providers (all via admin panel)

**IMPORTANT (Should Have):**
- [x] Cost info displayed for each provider
- [x] Recommended provider badges
- [x] Timestamp tracking
- [x] Error handling on all API calls
- [x] Console logging for debugging
- [x] Token usage tracking

**NICE TO HAVE:**
- [ ] Usage analytics per provider
- [ ] Cost estimation dashboard
- [ ] A/B testing framework
- [ ] Performance metrics comparison

---

## KNOWN ISSUES TO FIX

**These are the issues I found in my review that MUST be addressed:**

1. ✅ **React import missing** in AISettingsPanel.tsx
   - Add: `import React from 'react';` at top

2. ✅ **Brain icon import missing** in admin-panel.tsx
   - Already added in instructions above

3. ✅ **Package.json not updated**
   - Run `npm install @anthropic-ai/sdk` as specified

4. ✅ **Database schema export**
   - aiSettings type exports already included in Part 3.1

5. ✅ **Fallback infinite loop prevented**
   - Fixed by calling specific provider methods directly instead of `getCompletion()`

6. ✅ **Email template branded**
   - Complete branded template provided in Part 7

7. ✅ **Prescription storage added**
   - Part 6 adds prescription to prescriptions table

---

## ROLLBACK PROCEDURE

If something goes wrong:

**Code Rollback:**
1. Revert new files: ai-provider.ts, ai-settings.ts, ai-settings-panel.tsx
2. Restore original openai.ts and aiCoach.ts
3. Remove AI settings routes from routes.ts
4. Remove AI settings tab from admin panel

**Database Rollback:**
```sql
DROP TABLE IF EXISTS ai_settings;
```

**Secrets Cleanup:**
- Keep all API keys (no harm in having them)
- Or remove DEEPSEEK_API_KEY if not using

**System will fall back to OpenAI only (original behavior).**

---

## POST-IMPLEMENTATION CHECKLIST

After agent completes implementation:

1. [ ] All three API keys in Replit Secrets
2. [ ] Database migration successful (`ai_settings` table exists)
3. [ ] Seed data inserted (3 rows in ai_settings)
4. [ ] npm packages installed
5. [ ] No TypeScript errors
6. [ ] Admin panel AI Settings tab visible
7. [ ] Can switch providers and save
8. [ ] Assessment email received with correct branding
9. [ ] Prescription saved to database
10. [ ] Coach Blue working
11. [ ] Server logs show correct provider being used
12. [ ] Fallback system tested

---

## SUCCESS METRICS

**After successful implementation:**

- **Cost Savings:** 90% reduction on assessment/prescription generation
- **Quality:** Premium Claude experience for coaching
- **Flexibility:** Switch providers in <1 minute via admin
- **Reliability:** 99.9% uptime with automatic fallbacks
- **Speed:** Prescriptions delivered within 2-3 minutes
- **Accuracy:** AI-generated prescriptions based on real business data
- **Branding:** Professional, on-brand emails

---

## IMPORTANT REMINDERS

**For the Agent:**

1. **Read GOVERNANCE_REPLIT.md first** ← Non-negotiable
2. **Present plan before coding** ← Wait for Dean's approval
3. **Test thoroughly** ← Each part should work before moving to next
4. **Log everything** ← Console logs help debugging
5. **Ask if unsure** ← Better to ask than assume

**For Dean:**

1. Review the agent's plan carefully
2. Approve only when you're confident
3. Test each feature as it's built
4. Don't proceed to next prompt until this is solid
5. Prescriptions are your core value prop - must be perfect

---

## NEXT STEPS

**After this prompt is complete:**

1. Verify all prescriptions are being generated correctly
2. Monitor AI costs (should drop 90% for assessments)
3. Gather feedback on prescription quality
4. Tune prompts if needed (can adjust in ai-provider.ts)
5. Move to next development priority (client portal enhancements?)

---

**END OF COMPREHENSIVE PROMPT**

**Estimated Time:** 8-10 hours  
**Blocking:** No (current system still works during implementation)  
**Priority:** CRITICAL (core value proposition + cost optimization)
