/**
 * SEO Content Service — AI content brief generation and quality analysis.
 * Used by / optimize Content Optimizer module.
 */

import { unifiedAI } from './ai-provider';
import { aiSettingsService } from './ai-settings';

interface ContentBrief {
  title: string;
  targetKeyword: string;
  outline: { heading: string; type: string; notes: string }[];
  suggestions: string[];
  wordCountTarget: number;
  relatedKeywords: string[];
  searchIntent: string;
}

interface ContentQualityAnalysis {
  score: number; // 0-100
  readabilityScore: number;
  keywordDensity: number;
  issues: string[];
  suggestions: string[];
  wordCount: number;
}

/**
 * Generate an AI-powered content brief for a target keyword.
 */
export async function generateContentBrief(
  keyword: string,
  industry?: string,
  currentPageContent?: string
): Promise<ContentBrief> {
  const settings = await aiSettingsService.getSettings();
  const provider = settings.defaultProvider || 'openai';

  const prompt = `You are an SEO content strategist. Create a detailed content brief for a page targeting the keyword "${keyword}".

${industry ? `Industry: ${industry}` : ''}
${currentPageContent ? `\nExisting page content (first 500 chars): ${currentPageContent.substring(0, 500)}` : ''}

Generate a content brief with:
1. An SEO-optimized title (include the keyword)
2. A detailed outline with H2 and H3 headings
3. Writing suggestions for each section
4. Target word count recommendation
5. Related keywords to include naturally
6. Search intent classification (informational, transactional, navigational, commercial)

Return JSON with this structure:
{
  "title": "",
  "targetKeyword": "${keyword}",
  "outline": [{"heading": "", "type": "h2|h3", "notes": "what to cover"}],
  "suggestions": ["writing tip 1", "writing tip 2"],
  "wordCountTarget": 1500,
  "relatedKeywords": ["related1", "related2"],
  "searchIntent": "informational"
}

Return ONLY valid JSON. No markdown.`;

  try {
    const result = await unifiedAI.getCompletion(provider, {
      messages: [
        { role: 'system', content: 'You are an SEO content strategist. Return only valid JSON.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      maxTokens: 2000,
      responseFormat: 'json',
    });

    const cleaned = result.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch (error: any) {
    console.error('[SEO Content] Brief generation failed:', error.message);
    return {
      title: `Guide to ${keyword}`,
      targetKeyword: keyword,
      outline: [{ heading: keyword, type: 'h2', notes: 'Main topic coverage' }],
      suggestions: ['Include the target keyword in the first paragraph'],
      wordCountTarget: 1500,
      relatedKeywords: [],
      searchIntent: 'informational',
    };
  }
}

/**
 * Analyze content quality for SEO optimization.
 */
export async function analyzeContentQuality(
  content: string,
  targetKeyword: string
): Promise<ContentQualityAnalysis> {
  const words = content.trim().split(/\s+/);
  const wordCount = words.length;

  // Calculate keyword density
  const keywordLower = targetKeyword.toLowerCase();
  const contentLower = content.toLowerCase();
  const keywordCount = (contentLower.match(new RegExp(keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  const keywordDensity = wordCount > 0 ? Math.round((keywordCount / wordCount) * 1000) / 10 : 0;

  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 70; // Base score

  // Word count checks
  if (wordCount < 300) {
    issues.push('Content is too thin (under 300 words)');
    score -= 20;
  } else if (wordCount < 600) {
    suggestions.push('Consider expanding content to 1000+ words for better rankings');
    score -= 5;
  } else if (wordCount > 1000) {
    score += 10;
  }

  // Keyword density checks
  if (keywordDensity === 0) {
    issues.push('Target keyword not found in content');
    score -= 15;
  } else if (keywordDensity < 0.5) {
    suggestions.push('Keyword density is low - consider adding the keyword more naturally');
    score -= 5;
  } else if (keywordDensity > 3) {
    issues.push('Keyword density is too high (keyword stuffing risk)');
    score -= 10;
  } else {
    score += 5;
  }

  // Readability (simple estimate based on avg sentence length)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = sentences.length > 0 ? wordCount / sentences.length : 0;
  let readabilityScore = 70;
  if (avgSentenceLength > 25) {
    suggestions.push('Sentences are too long on average - break them up for readability');
    readabilityScore -= 15;
  } else if (avgSentenceLength < 10) {
    readabilityScore += 10;
  } else {
    readabilityScore += 5;
  }

  // Check for heading structure
  if (!content.includes('#') && !/<h[1-6]/i.test(content)) {
    suggestions.push('Add headings (H2, H3) to improve content structure');
    score -= 5;
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    readabilityScore: Math.max(0, Math.min(100, readabilityScore)),
    keywordDensity,
    issues,
    suggestions,
    wordCount,
  };
}
