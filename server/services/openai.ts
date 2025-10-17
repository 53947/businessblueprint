import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_SECRET_KEY || ""
});

interface BusinessAnalysisInput {
  businessInfo: {
    name: string;
    industry: string;
    location: string;
    website?: string;
  };
  googleData: any;
  presenceScore: {
    overallScore: number;
    scores: {
      visibility: number;
      reviews: number;
      completeness: number;
      engagement: number;
    };
    insights: string[];
  };
}

interface AnalysisResult {
  digitalScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: {
    category: string;
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    estimatedImpact: string;
    estimatedEffort: string;
    diyInstructions?: string;
    mspBenefits?: string;
  }[];
  competitorInsights: string[];
  nextSteps: string[];
}

export class OpenAIAnalysisService {
  async analyzeBusinessPresence(input: BusinessAnalysisInput): Promise<AnalysisResult> {
    try {
      const prompt = this.buildAnalysisPrompt(input);
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a digital marketing expert specializing in local business online presence analysis. Provide detailed, actionable insights based on Google Business Profile data and general digital marketing best practices. Always respond with valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 2000
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      return this.validateAndFormatResult(result, input.presenceScore.overallScore);
    } catch (error) {
      console.error("Error analyzing business presence:", error);
      throw new Error("Failed to analyze business presence");
    }
  }

  private buildAnalysisPrompt(input: BusinessAnalysisInput): string {
    return `
Analyze the digital presence of this business and provide comprehensive recommendations:

Business Information:
- Name: ${input.businessInfo.name}
- Industry: ${input.businessInfo.industry}
- Location: ${input.businessInfo.location}
- Website: ${input.businessInfo.website || "None"}

Google Business Profile Analysis:
- Overall Score: ${input.presenceScore.overallScore}/100
- Visibility Score: ${input.presenceScore.scores.visibility}/100
- Reviews Score: ${input.presenceScore.scores.reviews}/100
- Completeness Score: ${input.presenceScore.scores.completeness}/100
- Engagement Score: ${input.presenceScore.scores.engagement}/100

Current Insights:
${input.presenceScore.insights.join('\n')}

Google Business Data:
${JSON.stringify(input.googleData, null, 2)}

Please provide a comprehensive analysis in JSON format with the following structure:
{
  "digitalScore": number (0-100),
  "grade": string (A+, A, B+, B, C+, C, D+, D, F),
  "summary": string (2-3 sentences overview),
  "strengths": [array of current strengths],
  "weaknesses": [array of areas needing improvement],
  "recommendations": [
    {
      "category": string (seo, reviews, website, social, content, etc.),
      "title": string,
      "description": string (detailed explanation),
      "priority": "high" | "medium" | "low",
      "estimatedImpact": string (High ROI, Medium ROI, Long-term benefit),
      "estimatedEffort": string (1-2 hours, 1-2 days, 1-2 weeks, Ongoing),
      "diyInstructions": string (brief DIY guidance),
      "mspBenefits": string (why managed service is better for this)
    }
  ],
  "competitorInsights": [array of industry-specific insights],
  "nextSteps": [array of immediate action items]
}

Focus on actionable recommendations that clearly differentiate between DIY approaches and managed service benefits. Consider the business size, industry, and current digital maturity level.
`;
  }

  private validateAndFormatResult(result: any, baseScore: number): AnalysisResult {
    // Ensure all required fields exist with fallbacks
    return {
      digitalScore: result.digitalScore || baseScore,
      summary: result.summary || "Your business has potential for digital growth.",
      strengths: Array.isArray(result.strengths) ? result.strengths : [],
      weaknesses: Array.isArray(result.weaknesses) ? result.weaknesses : [],
      recommendations: Array.isArray(result.recommendations) 
        ? result.recommendations.map(this.validateRecommendation)
        : [],
      competitorInsights: Array.isArray(result.competitorInsights) ? result.competitorInsights : [],
      nextSteps: Array.isArray(result.nextSteps) ? result.nextSteps : []
    };
  }

  private validateRecommendation(rec: any): any {
    return {
      category: rec.category || "general",
      title: rec.title || "Improve Digital Presence",
      description: rec.description || "Work on improving your online visibility",
      priority: ["high", "medium", "low"].includes(rec.priority) ? rec.priority : "medium",
      estimatedImpact: rec.estimatedImpact || "Medium ROI",
      estimatedEffort: rec.estimatedEffort || "1-2 weeks",
      diyInstructions: rec.diyInstructions || "Follow best practices guides",
      mspBenefits: rec.mspBenefits || "Professional implementation with ongoing support"
    };
  }
}
