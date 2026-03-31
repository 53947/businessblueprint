import { unifiedAI } from './ai-provider';
import { aiSettingsService } from './ai-settings';
import { scansBlueService } from './scansblue';
import { db } from "../db";
import { aiCoachConversations, aiCoachMessages, setupTasks, setupNotes } from "@shared/schema";
import { eq, desc, sql } from "drizzle-orm";
import { CONTROLLED_RESPONSES } from "@shared/knowledge-base";

interface CoachingContext {
  businessInfo: {
    name: string;
    industry: string;
    location: string;
    digitalScore: number;
    currentStage: string;
  };
  userProgress: {
    completedSteps: string[];
    currentGoals: string[];
    timeAvailable: string;
    experience: "beginner" | "intermediate" | "advanced";
  };
  platformData: {
    hasWebsite: boolean;
    googleListingStatus: string;
    socialMediaPresence: string[];
    reviewCount: number;
  };
}

interface CoachingResponse {
  message: string;
  actionItems: {
    task: string;
    priority: "high" | "medium" | "low";
    estimatedTime: string;
    difficulty: "easy" | "medium" | "hard";
    resources: string[];
  }[];
  encouragement: string;
  nextMilestone: string;
}

export class AICoachService {
  private getProductKnowledgeContext(): string {
    return `
BUSINESSBLUEPRINT PRODUCT CATALOG — recommend these when relevant:

ANCHOR SUITE ($99/mo — local presence bundle):
- / publish: Business listing management across 50+ directories — ensures your NAP (name, address, phone) is consistent everywhere
- / elevate: Review monitoring, automated review requests, response management — your online reputation
- / optimize: SEO health monitoring, keyword rankings, technical site audits — climb higher in search results
- / amplify: Advertising across Google, Meta (Facebook/Instagram), Reddit — data-driven paid campaigns

COMPASS SUITE ($99/mo — communications bundle):
- / promote: Email campaigns, newsletters, automated sequences — targeted, measurable outreach
- / engage: Live chat widget for your website — capture leads and answer questions in real time
- / respond: Unified inbox for email, SMS, social, chat — never miss a message
- / post: Social media scheduling and management across all platforms — stay consistently visible

STANDALONE:
- / connect: CRM — contacts, deals, pipelines, task management. FREE Starter (100 contacts, 1 user) or $29/mo Performance (unlimited). The foundation all other apps connect to.

COACH BLUE (that's you):
- $99/mo standalone, $59/mo with one suite, FREE with both suites active

ECOSYSTEM PARTNERS:
- hostsblue.com: Cloud hosting, domains, website builder, email, SSL
- swipesblue.com: Payment processing (all billing goes through swipesblue)
- scansblue.com: Website technical audits, speed/mobile/SEO analysis
- BUILDERBLUE2.COM: AI-powered website coding platform

SETUP CADENCE (always follow this order when guiding setup):
1. / connect → 2. / publish → 3. / elevate → 4. / respond → 5. / engage → 6. / post → 7. / promote → 8. / amplify

When giving advice, recommend specific apps that solve the user's problem. Reference their Directions for Use when appropriate. Never make up features that don't exist.
`;
  }

  private async buildSystemPrompt(clientId: number, currentContext?: string): Promise<string> {
    const productKnowledge = this.getProductKnowledgeContext();

    // Import setup task state
    let taskContext = "";
    try {
      const tasks = await db
        .select()
        .from(setupTasks)
        .where(eq(setupTasks.clientId, clientId))
        .orderBy(setupTasks.cadenceOrder);

      if (tasks.length > 0) {
        const completed = tasks.filter(t => t.status === "completed").length;
        const total = tasks.length;
        const currentTask = tasks.find(t => t.status !== "completed" && t.status !== "skipped" && !t.substepId);

        taskContext = `\n\nUSER'S SETUP PROGRESS:
- Overall: ${completed}/${total} steps completed (${Math.round((completed / total) * 100)}%)
- Current step: ${currentTask ? `"${currentTask.title}" in / ${currentTask.appId}` : "All complete"}
- Phase: ${completed === total ? "engagement" : "setup"}`;
      }
    } catch (e) {
      // Setup tasks may not exist yet — that's fine
    }

    // Import relevant knowledge base content based on context
    let appKnowledge = "";
    if (currentContext) {
      try {
        const contextLower = currentContext.toLowerCase();
        const appIds = ["connect", "publish", "elevate"];

        for (const appId of appIds) {
          if (contextLower.includes(appId)) {
            const module = await import(`../../shared/knowledge-base/apps/${appId}`);
            const knowledge = module[`${appId}Knowledge`];
            if (knowledge) {
              appKnowledge += `\n\nKNOWLEDGE BASE — / ${appId}:
- Purpose: ${knowledge.purpose}
- Why it matters: ${knowledge.whyItMatters}
- Common mistakes: ${knowledge.commonMistakes.join("; ")}
- Coach Blue guidance (on first open): ${knowledge.coachBlueGuidance.onFirstOpen}
- Coach Blue guidance (on stall): ${knowledge.coachBlueGuidance.onStall}`;
            }
          }
        }
      } catch (e) {
        // Knowledge base for this app may not exist yet
      }
    }

    return `You are Coach Blue, the AI business coach for businessblueprint.io. You help small business owners — primarily Gen X and SMB owners — improve their digital presence with direct, practical, jargon-free guidance.

PERSONALITY:
- Direct and honest — no fluff, no corporate speak
- Encouraging but not patronizing — these are experienced business owners, not students
- Specific — always tell them exactly what to do, not vague advice
- Grounded — only recommend things the platform actually offers
- Patient — they may not be tech-savvy, explain without condescending

RULES:
- NEVER make up features, capabilities, or pricing that don't exist in the product catalog
- ALWAYS reference their Directions for Use when they ask what to do next
- When recommending an app, explain WHY it solves their specific problem
- Keep responses focused and actionable — under 200 words when possible
- If you don't know something, say so. Offer to help with what you do know.

${productKnowledge}${taskContext}${appKnowledge}`;
  }

  async getPersonalizedGuidance(context: CoachingContext): Promise<CoachingResponse> {
    const prompt = this.buildCoachingPrompt(context);
    const productKnowledge = this.getProductKnowledgeContext();
    
    try {
      const provider = await aiSettingsService.getProvider('coach_blue');
      console.log(`[Coach Blue] Using ${provider} for coaching`);
      
      const response = await unifiedAI.getCompletion(provider, {
        messages: [
          {
            role: "system",
            content: `You are Coach Blue, the AI business coach for businessblueprint.io. You help small business owners improve their digital presence with direct, practical, jargon-free guidance.

Key principles:
- Be supportive and motivational
- Break down complex tasks into simple steps
- Consider their time constraints and experience
- When recommending solutions, suggest specific businessblueprint.io apps that solve their problem
- Celebrate their progress and acknowledge challenges

${productKnowledge}`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        maxTokens: 1500
      });

      console.log(`[Coach Blue] ${provider} response complete`);

      if (!response.content) throw new Error("No response from AI coach");

      return this.parseCoachingResponse(response.content);
    } catch (error) {
      console.error("Error getting AI coaching:", error);
      return this.getFallbackGuidance(context);
    }
  }

  async getTechnicalWebsiteHelp(question: string, websiteUrl?: string): Promise<{
    answer: string;
    technicalDetails?: string;
    recommendedProducts: string[];
  }> {
    try {
      const provider = await aiSettingsService.getProvider('coach_blue');
      
      let technicalContext = '';
      if (websiteUrl) {
        const auditorResponse = await scansBlueService.chatWithAuditor(question, { url: websiteUrl });
        if (auditorResponse) {
          technicalContext = `\n\nTechnical Analysis from ScansBlue:\n${auditorResponse.response}`;
        }
      }
      
      const response = await unifiedAI.getCompletion(provider, {
        messages: [
          {
            role: "system",
            content: `You are Coach Blue helping with technical website questions. Provide helpful, non-technical explanations. When relevant, recommend businessblueprint.io apps:
- hostsblue.com for hosting, domains, SSL issues
- scansblue.com for detailed technical audits
- / engage for adding live chat to capture leads`
          },
          {
            role: "user",
            content: `Question: ${question}${technicalContext}`
          }
        ],
        temperature: 0.5,
        maxTokens: 1000
      });

      const products: string[] = [];
      const content = response.content || '';
      
      if (content.toLowerCase().includes('hostsblue') || content.toLowerCase().includes('hosting')) {
        products.push('hostsBlue');
      }
      if (content.toLowerCase().includes('scansblue') || content.toLowerCase().includes('audit')) {
        products.push('scansBlue');
      }
      if (content.toLowerCase().includes('engage') || content.toLowerCase().includes('chat')) {
        products.push('engage');
      }

      return {
        answer: content,
        technicalDetails: technicalContext || undefined,
        recommendedProducts: products
      };
    } catch (error) {
      console.error('[Coach Blue] Technical help error:', error);
      return {
        answer: 'I can help with website questions! For detailed technical analysis, I recommend running an audit at scansblue.com.',
        recommendedProducts: ['scansBlue']
      };
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
            role: "system",
            content: "You are Coach Blue, a digital marketing tutor. Break down complex tasks into simple, actionable steps that anyone can follow."
          },
          {
            role: "user",
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
            role: "system",
            content: "You are Coach Blue, an encouraging business coach. Focus on celebrating achievements and providing clear direction for continued growth."
          },
          {
            role: "user",
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

  private buildCoachingPrompt(context: CoachingContext): string {
    return `
Business Profile:
- Name: ${context.businessInfo.name}
- Industry: ${context.businessInfo.industry}
- Location: ${context.businessInfo.location}
- Current Digital IQ Score: ${context.businessInfo.digitalScore}/140

User Profile:
- Experience Level: ${context.userProgress.experience}
- Time Available: ${context.userProgress.timeAvailable}
- Completed Steps: ${context.userProgress.completedSteps.join(", ") || "None yet"}
- Current Goals: ${context.userProgress.currentGoals.join(", ")}

Current Platform Status:
- Website: ${context.platformData.hasWebsite ? "Has website" : "No website"}
- Google Listing: ${context.platformData.googleListingStatus}
- Social Media: ${context.platformData.socialMediaPresence.join(", ") || "None"}
- Reviews: ${context.platformData.reviewCount} reviews

Please provide personalized guidance including:
1. A supportive message acknowledging their current situation
2. 3-5 specific action items prioritized by impact and difficulty
3. Encouragement for their progress
4. Next major milestone to work toward

Format as JSON with actionItems array containing task, priority, estimatedTime, difficulty, and resources.
`;
  }

  private parseCoachingResponse(content: string): CoachingResponse {
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error("Error parsing coaching response:", error);
    }

    // Fallback parsing
    return {
      message: content.substring(0, 200) + "...",
      actionItems: [
        {
          task: "Optimize Google Business Profile",
          priority: "high",
          estimatedTime: "30 minutes",
          difficulty: "easy",
          resources: ["Google Business Profile guide"]
        }
      ],
      encouragement: "You're on the right track! Every step forward improves your online presence.",
      nextMilestone: "Achieve a 100+ Digital IQ Score"
    };
  }

  private parseStepByStepResponse(content: string): {
    steps: string[];
    tips: string[];
    commonMistakes: string[];
    successMetrics: string[];
  } {
    const sections = content.split(/\n\n+/);
    return {
      steps: this.extractListItems(content, /steps?:/i),
      tips: this.extractListItems(content, /tips?:/i),
      commonMistakes: this.extractListItems(content, /mistakes?:/i),
      successMetrics: this.extractListItems(content, /metrics?:/i)
    };
  }

  private parseProgressResponse(content: string): {
    progressScore: number;
    achievements: string[];
    nextPriorities: string[];
    motivationalMessage: string;
  } {
    return {
      progressScore: 75,
      achievements: this.extractListItems(content, /achievements?:/i),
      nextPriorities: this.extractListItems(content, /priorities?:/i),
      motivationalMessage: content.split('\n').find(line => 
        line.toLowerCase().includes('congratulations') || 
        line.toLowerCase().includes('great') ||
        line.toLowerCase().includes('progress')
      ) || "Keep up the excellent work!"
    };
  }

  private extractListItems(text: string, pattern: RegExp): string[] {
    const match = text.match(new RegExp(pattern.source + '[\\s\\S]*?(?=\\n\\n|$)', 'i'));
    if (!match) return [];
    
    return match[0]
      .split('\n')
      .filter(line => line.match(/^\s*[-*•]\s*/))
      .map(line => line.replace(/^\s*[-*•]\s*/, '').trim())
      .filter(item => item.length > 0);
  }

  private getFallbackGuidance(context: CoachingContext): CoachingResponse {
    return {
      message: `Great to see you working on ${context.businessInfo.name}'s digital presence! Let's focus on some high-impact improvements.`,
      actionItems: [
        {
          task: "Complete Google Business Profile optimization",
          priority: "high",
          estimatedTime: "45 minutes",
          difficulty: "easy",
          resources: ["Google Business Profile setup guide", "Photo optimization tips"]
        },
        {
          task: "Collect and respond to customer reviews",
          priority: "high",
          estimatedTime: "20 minutes daily",
          difficulty: "medium",
          resources: ["Review response templates", "Customer outreach strategies"]
        }
      ],
      encouragement: "You're taking important steps to grow your business online. Each improvement brings you closer to your goals!",
      nextMilestone: "Achieve consistent 4+ star rating with 20+ reviews"
    };
  }

  private getFallbackSteps(task: string): {
    steps: string[];
    tips: string[];
    commonMistakes: string[];
    successMetrics: string[];
  } {
    return {
      steps: [
        "Research best practices for this task",
        "Gather necessary information and materials",
        "Create a plan with specific goals",
        "Execute the plan step by step",
        "Monitor results and adjust as needed"
      ],
      tips: [
        "Start with small, manageable steps",
        "Set aside dedicated time for this task",
        "Ask for help when needed"
      ],
      commonMistakes: [
        "Trying to do everything at once",
        "Not tracking progress",
        "Giving up too early"
      ],
      successMetrics: [
        "Task completed within timeframe",
        "Measurable improvement in results",
        "Increased confidence in the process"
      ]
    };
  }
  // ---- Conversation History Persistence ----

  /**
   * Create a new conversation for a client
   */
  async createConversation(clientId: number, title?: string) {
    const [conversation] = await db
      .insert(aiCoachConversations)
      .values({ clientId, title: title || "New Conversation" })
      .returning();
    return conversation;
  }

  /**
   * Get all conversations for a client
   */
  async getConversations(clientId: number) {
    return db
      .select()
      .from(aiCoachConversations)
      .where(eq(aiCoachConversations.clientId, clientId))
      .orderBy(desc(aiCoachConversations.updatedAt));
  }

  /**
   * Get all messages in a conversation
   */
  async getMessages(conversationId: number) {
    return db
      .select()
      .from(aiCoachMessages)
      .where(eq(aiCoachMessages.conversationId, conversationId))
      .orderBy(aiCoachMessages.createdAt);
  }

  /**
   * Send a message in a conversation and get AI response
   */
  async chat(
    clientId: number,
    conversationId: number,
    userMessage: string,
    context?: CoachingContext,
  ) {
    // Save user message
    await db.insert(aiCoachMessages).values({
      conversationId,
      role: "user",
      content: userMessage,
      messageType: "guidance",
    });

    // Check controlled responses FIRST — critical matches take precedence
    const userMessageLower = userMessage.toLowerCase().trim();
    const criticalMatch = CONTROLLED_RESPONSES.find(cr =>
      cr.priority === "critical" && cr.trigger.some(t => userMessageLower.includes(t.toLowerCase()))
    );
    const standardMatch = CONTROLLED_RESPONSES.find(cr =>
      cr.priority === "standard" && cr.trigger.some(t => userMessageLower.includes(t.toLowerCase()))
    );
    const matchedResponse = criticalMatch || standardMatch;

    if (matchedResponse) {
      // Save the controlled response as the assistant message
      await db.insert(aiCoachMessages).values({
        conversationId,
        role: "assistant",
        content: matchedResponse.response,
        messageType: "controlled",
      });

      // Update conversation timestamp and title
      const history = await this.getMessages(conversationId);
      if (history.length <= 2) {
        const title = userMessage.length > 60 ? userMessage.substring(0, 57) + "..." : userMessage;
        await db
          .update(aiCoachConversations)
          .set({ title, updatedAt: new Date() })
          .where(eq(aiCoachConversations.id, conversationId));
      } else {
        await db
          .update(aiCoachConversations)
          .set({ updatedAt: new Date() })
          .where(eq(aiCoachConversations.id, conversationId));
      }

      return { role: "assistant" as const, content: matchedResponse.response, isControlled: true };
    }

    // Get conversation history for context
    const history = await this.getMessages(conversationId);
    const chatHistory = history.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    try {
      const provider = await aiSettingsService.getProvider("coach_blue");
      const systemPrompt = await this.buildSystemPrompt(clientId, userMessage);

      const response = await unifiedAI.getCompletion(provider, {
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...chatHistory,
        ],
        temperature: 0.7,
        maxTokens: 1500,
      });

      const aiMessage = response.content || "I'm having trouble responding right now. Please try again.";

      // Save AI response
      await db.insert(aiCoachMessages).values({
        conversationId,
        role: "assistant",
        content: aiMessage,
        messageType: "guidance",
      });

      // Update conversation title from first user message
      if (history.length <= 1) {
        const title = userMessage.length > 60 ? userMessage.substring(0, 57) + "..." : userMessage;
        await db
          .update(aiCoachConversations)
          .set({ title, updatedAt: new Date() })
          .where(eq(aiCoachConversations.id, conversationId));
      } else {
        await db
          .update(aiCoachConversations)
          .set({ updatedAt: new Date() })
          .where(eq(aiCoachConversations.id, conversationId));
      }

      return { role: "assistant" as const, content: aiMessage };
    } catch (error) {
      console.error("Error in AI Coach chat:", error);
      const fallback = "I'm having trouble connecting right now. Please try again in a moment.";
      await db.insert(aiCoachMessages).values({
        conversationId,
        role: "assistant",
        content: fallback,
        messageType: "guidance",
      });
      return { role: "assistant" as const, content: fallback };
    }
  }
  /**
   * Create a setup task or note from Coach Blue's advice.
   * Called when Coach Blue's response contains actionable items.
   */
  async createTaskFromAdvice(
    clientId: number,
    item: {
      type: "task" | "note";
      appId: string;
      title: string;
      description?: string;
      stepId?: string;
    }
  ): Promise<void> {
    if (item.type === "task") {
      // Find the highest cadence order for this client to append after
      const existing = await db
        .select({ maxOrder: sql<number>`MAX(${setupTasks.cadenceOrder})` })
        .from(setupTasks)
        .where(eq(setupTasks.clientId, clientId));

      const nextOrder = (existing[0]?.maxOrder || 0) + 1;

      await db.insert(setupTasks).values({
        clientId,
        appId: item.appId,
        stepId: item.stepId || `coach-blue-${Date.now()}`,
        title: item.title,
        description: item.description || null,
        source: "coach_blue",
        cadenceOrder: nextOrder,
        status: "pending",
        phase: "setup",
      });
    } else {
      await db.insert(setupNotes).values({
        clientId,
        appId: item.appId,
        stepId: item.stepId || null,
        content: item.title,
        isTodo: true,
        isCompleted: false,
      });
    }
  }
}

export const aiCoachService = new AICoachService();