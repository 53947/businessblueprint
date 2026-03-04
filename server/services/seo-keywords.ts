/**
 * SEO Keywords Service — AI-powered keyword research and gap analysis.
 * Used by / optimize Keyword Intelligence module.
 */

import { unifiedAI } from './ai-provider';
import { aiSettingsService } from './ai-settings';

interface KeywordSuggestion {
  keyword: string;
  estimatedVolume: number;
  difficulty: number; // 1-100
  relevance: string; // high, medium, low
  type: string; // short-tail, long-tail, local, question
}

interface KeywordGapResult {
  opportunities: KeywordSuggestion[];
  competitorStrengths: string[];
  recommendations: string[];
}

/**
 * Use AI to generate keyword suggestions based on seed keywords and industry.
 */
export async function researchKeywords(
  seed: string[],
  industry: string,
  location?: string
): Promise<KeywordSuggestion[]> {
  const settings = await aiSettingsService.getSettings();
  const provider = settings.defaultProvider || 'openai';

  const prompt = `You are an SEO keyword research expert. Given the following seed keywords and business information, generate 15-20 keyword suggestions.

Seed Keywords: ${seed.join(', ')}
Industry: ${industry}
${location ? `Location: ${location}` : ''}

For each keyword, provide:
- keyword: the search term
- estimatedVolume: monthly search volume estimate (realistic numbers)
- difficulty: SEO difficulty score 1-100 (higher = harder to rank)
- relevance: "high", "medium", or "low" relevance to the business
- type: "short-tail", "long-tail", "local", or "question"

Include a mix of:
- Short-tail competitive keywords
- Long-tail opportunities with lower difficulty
- Local variations (if location provided)
- Question-based keywords ("how to...", "what is...", "best...")

Return ONLY a JSON array of objects. No markdown, no explanation.`;

  try {
    const result = await unifiedAI.getCompletion(provider, {
      messages: [
        { role: 'system', content: 'You are an SEO keyword research expert. Return only valid JSON arrays.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      maxTokens: 2000,
      responseFormat: 'json',
    });

    const cleaned = result.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error: any) {
    console.error('[SEO Keywords] Research failed:', error.message);
    return [];
  }
}

/**
 * AI-based keyword gap analysis comparing a domain against competitors.
 */
export async function analyzeKeywordGap(
  domain: string,
  competitors: string[],
  industry: string,
  currentKeywords: string[]
): Promise<KeywordGapResult> {
  const settings = await aiSettingsService.getSettings();
  const provider = settings.defaultProvider || 'openai';

  const prompt = `You are an SEO expert performing a keyword gap analysis.

Business Domain: ${domain}
Industry: ${industry}
Currently Tracking: ${currentKeywords.join(', ') || 'None'}
Competitors: ${competitors.join(', ')}

Analyze the competitive landscape and identify:
1. Keyword opportunities the business is likely missing
2. Competitor strengths (what competitors are likely ranking for)
3. Strategic recommendations

Return JSON with this structure:
{
  "opportunities": [{"keyword": "", "estimatedVolume": 0, "difficulty": 0, "relevance": "high", "type": "long-tail"}],
  "competitorStrengths": ["..."],
  "recommendations": ["..."]
}

Return ONLY valid JSON. No markdown.`;

  try {
    const result = await unifiedAI.getCompletion(provider, {
      messages: [
        { role: 'system', content: 'You are an SEO competitive analysis expert. Return only valid JSON.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      maxTokens: 2000,
      responseFormat: 'json',
    });

    const cleaned = result.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch (error: any) {
    console.error('[SEO Keywords] Gap analysis failed:', error.message);
    return { opportunities: [], competitorStrengths: [], recommendations: [] };
  }
}
