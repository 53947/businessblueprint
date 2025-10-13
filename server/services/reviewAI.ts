/**
 * AI-Powered Review Response Service
 * 
 * Generates professional, personalized responses to customer reviews
 * using OpenAI GPT-4o. Adapts tone and content based on:
 * - Review sentiment (positive/negative/neutral)
 * - Review rating (1-5 stars)
 * - Business context and brand voice
 * - Platform-specific guidelines
 */

import OpenAI from 'openai';

interface ReviewContext {
  reviewText: string;
  rating: number;
  platform: string;
  businessName: string;
  businessCategory?: string;
  reviewerName?: string;
}

interface AIResponseOptions {
  tone?: 'professional' | 'friendly' | 'empathetic' | 'enthusiastic';
  maxLength?: number;
  includeCallToAction?: boolean;
  language?: string;
}

export class ReviewAIService {
  private openai: OpenAI;
  private model = 'gpt-4o';

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }

    this.openai = new OpenAI({ apiKey });
  }

  /**
   * Generate AI-powered response to a review
   */
  async generateReviewResponse(
    context: ReviewContext,
    options: AIResponseOptions = {}
  ): Promise<string> {
    const {
      tone = this.determineTone(context.rating),
      maxLength = 200,
      includeCallToAction = true,
      language = 'en'
    } = options;

    const sentiment = this.analyzeSentiment(context.rating);
    const prompt = this.buildPrompt(context, sentiment, tone, includeCallToAction, maxLength);

    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(language)
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: Math.ceil(maxLength * 1.5), // Buffer for token/word ratio
        presence_penalty: 0.3,
        frequency_penalty: 0.3
      });

      const response = completion.choices[0]?.message?.content?.trim() || '';
      
      if (!response) {
        throw new Error('No response generated from AI');
      }

      return response;
    } catch (error) {
      console.error('Error generating AI review response:', error);
      
      // Fallback to template-based response
      return this.getFallbackResponse(context, sentiment);
    }
  }

  /**
   * Generate bulk responses for multiple reviews
   */
  async generateBulkResponses(
    reviews: ReviewContext[],
    options: AIResponseOptions = {}
  ): Promise<Map<string, string>> {
    const responses = new Map<string, string>();

    // Process in parallel batches of 5 to respect rate limits
    const batchSize = 5;
    for (let i = 0; i < reviews.length; i += batchSize) {
      const batch = reviews.slice(i, i + batchSize);
      const batchPromises = batch.map(async (review, index) => {
        try {
          const response = await this.generateReviewResponse(review, options);
          return { key: `${i + index}`, response };
        } catch (error) {
          console.error(`Error processing review ${i + index}:`, error);
          return { key: `${i + index}`, response: this.getFallbackResponse(review, this.analyzeSentiment(review.rating)) };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      batchResults.forEach(({ key, response }) => {
        responses.set(key, response);
      });
    }

    return responses;
  }

  /**
   * Determine appropriate tone based on rating
   */
  private determineTone(rating: number): 'professional' | 'friendly' | 'empathetic' | 'enthusiastic' {
    if (rating >= 4) return 'enthusiastic';
    if (rating === 3) return 'professional';
    return 'empathetic';
  }

  /**
   * Analyze sentiment from rating
   */
  private analyzeSentiment(rating: number): 'positive' | 'negative' | 'neutral' {
    if (rating >= 4) return 'positive';
    if (rating <= 2) return 'negative';
    return 'neutral';
  }

  /**
   * Build AI prompt for review response
   */
  private buildPrompt(
    context: ReviewContext,
    sentiment: string,
    tone: string,
    includeCallToAction: boolean,
    maxLength: number
  ): string {
    const { reviewText, rating, platform, businessName, businessCategory, reviewerName } = context;
    
    return `Generate a ${tone} response to this ${sentiment} ${rating}-star customer review on ${platform}.

**Business Details:**
- Name: ${businessName}
${businessCategory ? `- Category: ${businessCategory}` : ''}

**Review:**
Rating: ${rating}/5 stars
${reviewerName ? `Reviewer: ${reviewerName}` : ''}
Review Text: "${reviewText}"

**Response Guidelines:**
- Tone: ${tone}
- Max length: ${maxLength} words
- ${sentiment === 'positive' ? 'Express genuine gratitude and reinforce positive experience' : ''}
- ${sentiment === 'negative' ? 'Acknowledge concerns, apologize sincerely, and offer solution' : ''}
- ${sentiment === 'neutral' ? 'Thank them for feedback and invite further engagement' : ''}
- ${includeCallToAction ? 'Include subtle call-to-action (e.g., invite to return, contact for resolution)' : 'Do not include call-to-action'}
- Be authentic and personalized (avoid generic templates)
- Use natural, conversational language
- ${reviewerName ? `Address ${reviewerName} by name` : 'Use friendly greeting'}
- Reflect the business's professional image

Generate only the response text, no additional commentary.`;
  }

  /**
   * System prompt for AI model
   */
  private getSystemPrompt(language: string): string {
    return `You are an expert customer service representative and reputation management specialist. You craft professional, empathetic, and authentic responses to customer reviews that:

1. Build customer relationships and trust
2. Address concerns professionally and constructively
3. Reinforce positive experiences with genuine appreciation
4. Maintain the business's brand voice and values
5. Encourage future engagement and loyalty

Key Principles:
- Always be authentic and personalized
- Show genuine care for customer feedback
- Use specific details from the review (don't be generic)
- Balance professionalism with warmth
- For negative reviews: acknowledge, apologize, offer solution
- For positive reviews: express gratitude, highlight specifics
- Keep responses concise but meaningful

Language: ${language === 'en' ? 'English' : language}

Your responses should feel human-written, not AI-generated.`;
  }

  /**
   * Fallback response templates when AI fails
   */
  private getFallbackResponse(context: ReviewContext, sentiment: string): string {
    const { reviewerName, businessName, rating } = context;
    const greeting = reviewerName ? `Hi ${reviewerName}` : 'Hello';

    if (sentiment === 'positive') {
      return `${greeting}, thank you so much for your wonderful ${rating}-star review! We're thrilled to hear about your positive experience with ${businessName}. Your feedback means the world to us, and we can't wait to serve you again soon!`;
    }

    if (sentiment === 'negative') {
      return `${greeting}, thank you for sharing your feedback. We sincerely apologize that your experience with ${businessName} didn't meet expectations. We take your concerns seriously and would love the opportunity to make things right. Please reach out to us directly so we can address this properly.`;
    }

    // Neutral
    return `${greeting}, thank you for taking the time to share your feedback about ${businessName}. We appreciate all input from our customers as it helps us improve. We'd love to hear more about your experience - please feel free to reach out to us directly.`;
  }

  /**
   * Validate review context before processing
   */
  validateContext(context: ReviewContext): { valid: boolean; error?: string } {
    if (!context.reviewText || context.reviewText.trim().length === 0) {
      return { valid: false, error: 'Review text is required' };
    }

    if (context.rating < 1 || context.rating > 5) {
      return { valid: false, error: 'Rating must be between 1 and 5' };
    }

    if (!context.businessName || context.businessName.trim().length === 0) {
      return { valid: false, error: 'Business name is required' };
    }

    return { valid: true };
  }
}

// Export singleton instance
export const reviewAI = new ReviewAIService();
