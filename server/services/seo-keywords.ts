/**
 * SEO Keywords Service — AI-powered keyword research and gap analysis.
 * Used by / optimize Keyword Intelligence module.
 */

import { unifiedAI, type AIProvider } from './ai-provider';
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
  const settings = await aiSettingsService.getAllSettings();
  const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

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
  const settings = await aiSettingsService.getAllSettings();
  const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

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

/**
 * Generate long-tail keyword variations from a seed keyword.
 */
export async function generateLongTailKeywords(
  keyword: string,
  industry: string,
  location?: string
): Promise<{ keyword: string; estimatedVolume: number; difficulty: number; type: string }[]> {
  const settings = await aiSettingsService.getAllSettings();
  const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

  const prompt = `You are an SEO expert specializing in long-tail keyword research.

Given this seed keyword: "${keyword}"
Industry: ${industry}
${location ? `Location: ${location}` : ''}

Generate 10-15 long-tail variations of this keyword. Long-tail keywords are longer, more specific phrases that are easier to rank for.

Include variations such as:
- Question-based ("how to...", "what is the best...")
- Location-specific (if location provided)
- Intent-specific ("buy", "near me", "reviews", "cost")
- Comparison ("vs", "alternative to")
- Modifier-based ("best", "top", "affordable", "professional")

For each keyword, provide:
- keyword: the long-tail search term
- estimatedVolume: realistic monthly search volume (long-tail = lower volume, typically 10-500)
- difficulty: SEO difficulty score 1-100 (long-tail = generally lower difficulty)
- type: "question", "local", "comparison", "transactional", "informational", or "modifier"

Return ONLY a JSON array. No markdown, no explanation.`;

  try {
    const result = await unifiedAI.getCompletion(provider, {
      messages: [
        { role: 'system', content: 'You are an SEO long-tail keyword expert. Return only valid JSON arrays.' },
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
    console.error('[SEO Keywords] Long-tail generation failed:', error.message);
    return [];
  }
}

/**
 * Classify search intent for a list of keywords.
 */
export async function classifySearchIntent(
  keywords: string[]
): Promise<{ keyword: string; intent: string; confidence: number }[]> {
  const settings = await aiSettingsService.getAllSettings();
  const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

  const prompt = `You are an SEO expert. Classify the search intent for each of these keywords.

Keywords:
${keywords.map((k, i) => `${i + 1}. ${k}`).join('\n')}

For each keyword, determine the search intent:
- "informational" — user wants to learn something
- "transactional" — user wants to buy or take action
- "navigational" — user is looking for a specific website or page
- "commercial" — user is researching before a purchase decision

For each keyword provide:
- keyword: the original keyword
- intent: one of "informational", "transactional", "navigational", "commercial"
- confidence: confidence score 0.0 to 1.0

Return ONLY a JSON array. No markdown, no explanation.`;

  try {
    const result = await unifiedAI.getCompletion(provider, {
      messages: [
        { role: 'system', content: 'You are an SEO search intent classification expert. Return only valid JSON arrays.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      maxTokens: 1500,
      responseFormat: 'json',
    });

    const cleaned = result.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error: any) {
    console.error('[SEO Keywords] Intent classification failed:', error.message);
    return [];
  }
}
