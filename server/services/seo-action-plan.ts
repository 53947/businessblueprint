/**
 * SEO Action Plan Service — AI-generated prioritized action items.
 * Used by / optimize AI SEO Action Plan module.
 */

import { unifiedAI, type AIProvider } from './ai-provider';
import { aiSettingsService } from './ai-settings';

interface ActionItem {
  title: string;
  description: string;
  category: string; // technical, content, keywords, on-page, local
  priority: 'critical' | 'high' | 'medium' | 'low';
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
}

interface ActionPlanInput {
  domain: string;
  industry?: string;
  overallScore?: number;
  technicalIssues: { type: string; severity: string; description: string }[];
  keywords: { keyword: string; currentRank?: number | null }[];
  pages: { url: string; score?: number | null; issues?: any }[];
  localEnabled?: boolean;
}

/**
 * Generate an AI-prioritized SEO action plan based on all available data.
 */
export async function generateActionPlan(input: ActionPlanInput): Promise<ActionItem[]> {
  const settings = await aiSettingsService.getAllSettings();
  const provider = ((settings.length > 0 ? settings[0].provider : null) || 'openai') as AIProvider;

  const prompt = `You are an SEO consultant creating a prioritized action plan for a business.

Domain: ${input.domain}
Industry: ${input.industry || 'General'}
Current SEO Score: ${input.overallScore ?? 'Not yet scored'}
Local SEO Enabled: ${input.localEnabled ? 'Yes' : 'No'}

Technical Issues Found:
${input.technicalIssues.length > 0
  ? input.technicalIssues.map(i => `- [${i.severity}] ${i.type}: ${i.description}`).join('\n')
  : '- No technical issues scanned yet'}

Tracked Keywords:
${input.keywords.length > 0
  ? input.keywords.slice(0, 10).map(k => `- "${k.keyword}" (Rank: ${k.currentRank ?? 'unranked'})`).join('\n')
  : '- No keywords tracked yet'}

Analyzed Pages:
${input.pages.length > 0
  ? input.pages.slice(0, 5).map(p => `- ${p.url} (Score: ${p.score ?? 'N/A'})`).join('\n')
  : '- No pages analyzed yet'}

Create 8-12 prioritized action items. Each should be specific and actionable.
Categories: technical, content, keywords, on-page, local
Priority: critical (do immediately), high (this week), medium (this month), low (when time allows)
Impact: high, medium, low — expected SEO improvement
Effort: high (hours of work), medium (30-60 min), low (under 30 min)

Return a JSON array of objects:
[{"title": "", "description": "", "category": "", "priority": "", "impact": "", "effort": ""}]

Return ONLY valid JSON array. No markdown.`;

  try {
    const result = await unifiedAI.getCompletion(provider, {
      messages: [
        { role: 'system', content: 'You are an SEO consultant. Return only valid JSON arrays.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      maxTokens: 2500,
      responseFormat: 'json',
    });

    const cleaned = result.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error: any) {
    console.error('[SEO Action Plan] Generation failed:', error.message);
    return [
      {
        title: 'Run initial SEO scan',
        description: 'Start by running a full technical SEO scan of your website to identify critical issues.',
        category: 'technical',
        priority: 'critical',
        impact: 'high',
        effort: 'low',
      },
      {
        title: 'Add target keywords',
        description: 'Add 5-10 primary keywords you want to rank for to begin tracking your positions.',
        category: 'keywords',
        priority: 'high',
        impact: 'medium',
        effort: 'low',
      },
    ];
  }
}
