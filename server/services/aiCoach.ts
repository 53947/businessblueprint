import OpenAI from "openai";

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
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getPersonalizedGuidance(context: CoachingContext): Promise<CoachingResponse> {
    const prompt = this.buildCoachingPrompt(context);
    
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert digital marketing coach specializing in helping small businesses improve their online presence. You provide encouraging, actionable, and personalized guidance based on their current situation and experience level.

Key principles:
- Be supportive and motivational
- Break down complex tasks into simple steps
- Consider their time constraints and experience
- Focus on high-impact, low-cost strategies for DIY users
- Provide specific, actionable advice
- Celebrate their progress and acknowledge challenges`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error("No response from AI coach");

      return this.parseCoachingResponse(content);
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
- Current digital score: ${userContext.businessInfo.digitalScore}/100
- Time available: ${userContext.userProgress.timeAvailable}

Provide detailed step-by-step instructions, practical tips, common mistakes to avoid, and how to measure success.
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a digital marketing tutor. Break down complex tasks into simple, actionable steps that anyone can follow."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 800
      });

      const content = response.choices[0]?.message?.content || "";
      return this.parseStepByStepResponse(content);
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
- Digital score: ${context.businessInfo.digitalScore}/100
- Industry: ${context.businessInfo.industry}

Provide an encouraging progress analysis with specific achievements and next priorities.
`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an encouraging business coach. Focus on celebrating achievements and providing clear direction for continued growth."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 600
      });

      const content = response.choices[0]?.message?.content || "";
      return this.parseProgressResponse(content);
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
- Current Digital Score: ${context.businessInfo.digitalScore}/100

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
      nextMilestone: "Achieve a 70+ digital score"
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
}

export const aiCoachService = new AICoachService();