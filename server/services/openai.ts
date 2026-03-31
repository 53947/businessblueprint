import { unifiedAI } from './ai-provider';
import { aiSettingsService } from './ai-settings';

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
    scanScore?: number;
    operationalScore?: number;
    scores: {
      visibility: number;
      reviews: number;
      completeness: number;
      engagement: number;
    };
    insights: string[];
  };
  operationalData?: {
    collectsEmails?: string;
    lastEmailCampaign?: string;
    emailListSize?: string;
    sendsSMS?: string;
    lastSMSCampaign?: string;
    lastSocialPost?: string;
    socialPostFrequency?: string;
    socialContentCreator?: string;
    lastReviewResponse?: string;
    reviewResponseRate?: string;
    lastNewReview?: string;
    inquiryResponseTime?: string;
    hasUnifiedInbox?: string;
    missedInquiries?: string;
    hasLiveChat?: string;
    lastChatConversation?: string;
    chatResponseTime?: string;
    lastListingUpdate?: string;
    listingConsistency?: string;
    lastGBPPost?: string;
    lastGBPPhoto?: string;
    lastWebsiteUpdate?: string;
    hasBlog?: string;
    usesCRM?: string;
    crmPlatform?: string;
    lastCRMFollowup?: string;
    hasAutomation?: string;
    runsAds?: string;
    lastAdCampaign?: string;
    monthlyAdBudget?: string;
  };
  scansBlueData?: {
    overallScore?: number;
    sslPresent?: boolean;
    sslValid?: boolean;
    loadTime?: number;
    performanceScore?: number;
    mobileOptimized?: boolean;
    mobileScore?: number;
    criticalIssues?: Array<{
      type: string;
      severity: string;
      issue: string;
      impact: string;
      recommendation: string;
    }>;
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
    productId?: string;
    bundleId?: string;
    productBenefits?: string[];
    bundleAdvantage?: string;
  }[];
  competitorInsights: string[];
  nextSteps: string[];
  areaScores?: {
    [key: string]: number;
  };
}

export class OpenAIAnalysisService {
  async analyzeBusinessPresence(input: BusinessAnalysisInput): Promise<AnalysisResult> {
    try {
      const provider = await aiSettingsService.getProvider('assessment');
      console.log(`[Business Analysis] Using ${provider} for assessment analysis`);
      
      const prompt = this.buildAnalysisPrompt(input);
      
      const response = await unifiedAI.getCompletion(provider, {
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
        responseFormat: 'json',
        temperature: 0.2,
        maxTokens: 3000
      });

      console.log(`[Business Analysis] ${provider} analysis complete. Tokens used: ${response.tokensUsed}`);
      
      let result;
      try {
        result = JSON.parse(response.content || "{}");
      } catch (parseError) {
        console.warn('[Business Analysis] JSON parse failed, attempting repair');
        const cleanedContent = this.repairJSON(response.content || "{}");
        try {
          result = JSON.parse(cleanedContent);
        } catch (retryError) {
          console.error('[Business Analysis] JSON repair failed, using fallback');
          result = this.createFallbackResult(input.businessInfo.name, input.presenceScore.overallScore);
        }
      }
      return this.validateAndFormatResult(result, input.presenceScore.overallScore);
    } catch (error) {
      console.error("Error analyzing business presence:", error);
      return this.createFallbackResult(input.businessInfo.name, input.presenceScore.overallScore);
    }
  }

  private buildAnalysisPrompt(input: BusinessAnalysisInput): string {
    const productCatalog = this.buildProductCatalogContext();
    const operationalContext = this.buildOperationalContext(input.operationalData);
    const scansBlueContext = this.buildScansBlueContext(input.scansBlueData);
    
    return `
You are a digital marketing expert for BusinessBlueprint.io. Your job is to analyze this business's digital presence and recommend OUR PRODUCTS to solve their problems.

CRITICAL RULES:
1. Every recommendation MUST include a specific BusinessBlueprint product
2. NEVER recommend external tools/competitors - only OUR products (see catalog below)
3. Lead with the NEED, explain WHY it matters, then recommend OUR solution
4. Highlight bundle savings when multiple products from same bundle are recommended
5. Be specific and actionable - no generic advice

${productCatalog}

BUSINESS INFORMATION:
- Name: ${input.businessInfo.name}
- Industry: ${input.businessInfo.industry}
- Location: ${input.businessInfo.location}
- Website: ${input.businessInfo.website || "None"}

DIGITAL IQ SCORES:
- Combined Digital IQ: ${input.presenceScore.overallScore}/140
- Scan Score: ${input.presenceScore.scanScore || 'N/A'}/70
- Operational Score: ${input.presenceScore.operationalScore || 'N/A'}/70
- Visibility Score: ${input.presenceScore.scores.visibility}/100
- Reviews Score: ${input.presenceScore.scores.reviews}/100
- Completeness Score: ${input.presenceScore.scores.completeness}/100
- Engagement Score: ${input.presenceScore.scores.engagement}/100

AUTOMATED SCAN INSIGHTS:
${input.presenceScore.insights.join('\n')}

${operationalContext}

${scansBlueContext}

GOOGLE BUSINESS DATA:
${JSON.stringify(input.googleData, null, 2)}

Generate 12-18 PRODUCT-FOCUSED recommendations across these 9 areas:
1. Email & SMS Marketing → Recommend: / promote OR Compass Suite (if multiple comm needs)
2. Social Media Content → Recommend: / post OR Compass Suite (if multiple comm needs)
3. Reputation Management → Recommend: / elevate OR Anchor Suite (if multiple local presence needs)
4. Unified Inbox & Response → Recommend: / respond OR Compass Suite (if multiple comm needs)
5. Live Chat → Recommend: / engage OR Compass Suite (if multiple comm needs)
6. Business Listings & GBP → Recommend: / publish OR Anchor Suite (if multiple local presence needs)
7. Website & SEO → Recommend: / optimize OR Anchor Suite (if multiple local presence needs)
8. CRM & Customer Management → Recommend: / connect
9. Advertising & Paid Media → Recommend: / amplify OR Anchor Suite (if multiple local presence needs)

★ BUNDLE RULE: ONLY recommend Compass Suite (productId: "compass") if business needs ALL 4 communication tools.
★ BUNDLE RULE: ONLY recommend Anchor Suite (productId: "anchor") if business needs multiple local presence tools (/ publish, / elevate, / optimize, / amplify).

RESPOND WITH VALID JSON:
{
  "digitalScore": number (0-140),
  "summary": string (2-3 sentences emphasizing transformation potential),
  "strengths": [array of current strengths - be specific],
  "weaknesses": [array of gaps - tie each to a product that fixes it],
  "areaScores": {
    "promote": number (0-15),
    "post": number (0-13),
    "elevate": number (0-16),
    "respond": number (0-15),
    "engage": number (0-15),
    "publish": number (0-18),
    "optimize": number (0-14),
    "connect": number (0-12),
    "amplify": number (0-12)
  },
  "recommendations": [
    {
      "category": "Email & SMS Marketing" | "Social Media Content" | "Reputation Management" | "Unified Inbox & Response" | "Live Chat" | "Business Listings & GBP" | "Website & SEO" | "CRM & Customer Management" | "Advertising & Paid Media",
      "title": "The Prescription: [specific need statement]",
      "description": "Detailed explanation of WHY this matters (revenue impact, customer experience, competitive advantage) and HOW our product solves it",
      "priority": "high" | "medium" | "low",
      "estimatedImpact": "High ROI" | "Medium ROI" | "Long-term benefit",
      "estimatedEffort": "Quick setup" | "1-2 days" | "1-2 weeks" | "Ongoing",
      "productId": "compass" | "anchor" | "promote" | "respond" | "post" | "engage" | "publish" | "elevate" | "optimize" | "amplify" | "connect" | "hostsblue" | "swipesblue",
      "bundleId": "compass" | "anchor" | null,
      "productBenefits": ["benefit 1", "benefit 2", "benefit 3"],
      "bundleAdvantage": "Save with Compass Suite..." or null
    }
  ],
  "competitorInsights": [array of industry-specific competitive insights],
  "nextSteps": ["Start with [product] because...", "Then add [product] to..."]
}
`;
  }

  private buildProductCatalogContext(): string {
    return `
═══════════════════════════════════════════════════════════════════════════════
⚠️ CRITICAL: AUTHORIZED PRODUCTS WHITELIST - NO EXCEPTIONS ⚠️
═══════════════════════════════════════════════════════════════════════════════

You may ONLY recommend products with these EXACT productId values:

★★★ SUITES (PRIORITIZE THESE - BEST VALUE) ★★★
| productId   | Display Name      | Price   | Includes                                      | Savings         |
|-------------|-------------------|---------|-----------------------------------------------|-----------------|
| compass     | Compass Suite     | $99/mo  | / promote + / respond + / engage + / post     | Save vs separate |
| anchor      | Anchor Suite      | $99/mo  | / publish + / elevate + / optimize + / amplify | Save vs separate |

COMPASS SUITE APPS (Individual — recommend Compass Suite when 2+ needed):
| productId   | Display Name  | Price    | Use For                              |
|-------------|---------------|----------|--------------------------------------|
| respond     | / respond     | $29/mo   | Unified inbox, message consolidation |
| promote     | / promote     | $29/mo   | Email & SMS marketing campaigns      |
| post        | / post        | $29/mo   | Social media scheduling & creation   |
| engage      | / engage      | $29/mo   | Website chat widget, lead capture    |

ANCHOR SUITE APPS (Individual — recommend Anchor Suite when 2+ needed):
| productId   | Display Name  | Price    | Use For                              |
|-------------|---------------|----------|--------------------------------------|
| publish     | / publish     | $29/mo   | Directory sync, NAP consistency      |
| elevate     | / elevate     | $29/mo   | Review monitoring & response         |
| optimize    | / optimize    | $29/mo   | SEO health monitoring & tracking     |
| amplify     | / amplify     | $29/mo   | Digital advertising management       |

STANDALONE (NEVER BUNDLED):
| productId   | Display Name  | Price    | Use For                    |
|-------------|---------------|----------|----------------------------|
| connect     | / connect     | $29/mo   | Customer tracking, pipeline |

PARTNER SERVICES:
| productId   | Display Name   | Price     | Use For                        |
|-------------|----------------|-----------|--------------------------------|
| hostsblue   | hostsblue.com  | Varies    | Web hosting, domains, SSL      |
| swipesblue  | swipesblue.com | 2.9%+30¢  | Payment processing             |

★★★ SUITE RECOMMENDATION RULES ★★★
- ONLY recommend "compass" (Compass Suite) if business needs ALL 4 communication tools (/ promote, / respond, / engage, / post)
- ONLY recommend "anchor" (Anchor Suite) if business needs multiple local presence tools (/ publish, / elevate, / optimize, / amplify)
- If only 1-3 tools needed from a suite, recommend individual apps instead
- Suites ARE products — use productId "compass" or "anchor" directly
- Always mention suite savings in description when recommending suites

═══════════════════════════════════════════════════════════════════════════════
🚫 FORBIDDEN - DO NOT DO ANY OF THESE:
═══════════════════════════════════════════════════════════════════════════════
- DO NOT invent products that don't exist in the table above
- DO NOT use product names like "Store Locator", "Captaining Journey", etc.
- DO NOT recommend competitors (Mailchimp, HubSpot, etc.)
- DO NOT create generic/fake productIds
- DO NOT recommend products without a valid productId from the table above

EVERY recommendation MUST have a productId from the whitelist above.
If you can't find a matching product, DO NOT create a fake one.
═══════════════════════════════════════════════════════════════════════════════
`;
  }

  private buildOperationalContext(data?: BusinessAnalysisInput['operationalData']): string {
    if (!data) return 'OPERATIONAL DATA: Not provided';
    
    const sections = [];
    
    if (data.collectsEmails || data.lastEmailCampaign || data.emailListSize || data.sendsSMS) {
      sections.push(`EMAIL & SMS:
  - Collects emails: ${data.collectsEmails || 'Unknown'}
  - Last email campaign: ${data.lastEmailCampaign || 'Unknown'}
  - Email list size: ${data.emailListSize || 'Unknown'}
  - Uses SMS: ${data.sendsSMS || 'Unknown'}
  - Last SMS: ${data.lastSMSCampaign || 'Unknown'}`);
    }
    
    if (data.lastSocialPost || data.socialPostFrequency || data.socialContentCreator) {
      sections.push(`SOCIAL MEDIA:
  - Last post: ${data.lastSocialPost || 'Unknown'}
  - Posting frequency: ${data.socialPostFrequency || 'Unknown'}
  - Content creator: ${data.socialContentCreator || 'Unknown'}`);
    }
    
    if (data.lastReviewResponse || data.reviewResponseRate || data.lastNewReview) {
      sections.push(`REPUTATION:
  - Last review response: ${data.lastReviewResponse || 'Unknown'}
  - Response rate: ${data.reviewResponseRate || 'Unknown'}
  - Last new review: ${data.lastNewReview || 'Unknown'}`);
    }
    
    if (data.inquiryResponseTime || data.hasUnifiedInbox || data.missedInquiries) {
      sections.push(`CUSTOMER RESPONSE:
  - Response time: ${data.inquiryResponseTime || 'Unknown'}
  - Has unified inbox: ${data.hasUnifiedInbox || 'Unknown'}
  - Missed inquiries: ${data.missedInquiries || 'Unknown'}`);
    }
    
    if (data.hasLiveChat || data.lastChatConversation || data.chatResponseTime) {
      sections.push(`LIVE CHAT:
  - Has live chat: ${data.hasLiveChat || 'Unknown'}
  - Last conversation: ${data.lastChatConversation || 'Unknown'}
  - Response time: ${data.chatResponseTime || 'Unknown'}`);
    }
    
    if (data.lastListingUpdate || data.listingConsistency) {
      sections.push(`LISTINGS:
  - Last update: ${data.lastListingUpdate || 'Unknown'}
  - Consistency: ${data.listingConsistency || 'Unknown'}`);
    }
    
    if (data.lastGBPPost || data.lastGBPPhoto) {
      sections.push(`GOOGLE BUSINESS PROFILE:
  - Last post: ${data.lastGBPPost || 'Unknown'}
  - Last photo: ${data.lastGBPPhoto || 'Unknown'}`);
    }
    
    if (data.lastWebsiteUpdate || data.hasBlog) {
      sections.push(`WEBSITE:
  - Last update: ${data.lastWebsiteUpdate || 'Unknown'}
  - Has blog: ${data.hasBlog || 'Unknown'}`);
    }
    
    if (data.usesCRM || data.crmPlatform || data.lastCRMFollowup || data.hasAutomation) {
      sections.push(`CRM:
  - Uses CRM: ${data.usesCRM || 'Unknown'}
  - Platform: ${data.crmPlatform || 'Unknown'}
  - Last followup: ${data.lastCRMFollowup || 'Unknown'}
  - Has automation: ${data.hasAutomation || 'Unknown'}`);
    }

    if (data.runsAds || data.lastAdCampaign || data.monthlyAdBudget) {
      sections.push(`ADVERTISING & PAID MEDIA:
  - Runs ads: ${data.runsAds || 'Unknown'}
  - Last ad campaign: ${data.lastAdCampaign || 'Unknown'}
  - Monthly ad budget: ${data.monthlyAdBudget || 'Unknown'}`);
    }

    return sections.length > 0 
      ? `OPERATIONAL ASSESSMENT DATA:\n${sections.join('\n\n')}`
      : 'OPERATIONAL DATA: Minimal data provided';
  }

  private buildScansBlueContext(data?: BusinessAnalysisInput['scansBlueData']): string {
    if (!data) return 'TECHNICAL WEBSITE ANALYSIS: Not available';
    
    const issues = data.criticalIssues || [];
    const criticalCount = issues.filter(i => i.severity === 'critical').length;
    const highCount = issues.filter(i => i.severity === 'high').length;
    
    return `TECHNICAL WEBSITE ANALYSIS (from ScansBlue):
- Overall Technical Score: ${data.overallScore || 'N/A'}/100
- SSL Certificate: ${data.sslPresent ? (data.sslValid ? 'Valid' : 'Present but Invalid') : 'MISSING'}
- Load Time: ${data.loadTime || 'N/A'}s (target: <2s)
- Performance Score: ${data.performanceScore || 'N/A'}/100
- Mobile Optimized: ${data.mobileOptimized ? 'Yes' : 'No'} (score: ${data.mobileScore || 'N/A'}/100)
- Critical Issues: ${criticalCount}
- High Priority Issues: ${highCount}

${issues.length > 0 ? `TOP ISSUES DETECTED:
${issues.slice(0, 5).map(i => `- [${i.severity.toUpperCase()}] ${i.issue}: ${i.impact}`).join('\n')}` : 'No critical issues detected'}

When recommending Website & SEO improvements:
1. Reference these SPECIFIC technical issues
2. Recommend HostsBlue.com to fix infrastructure issues (hosting, SSL, performance)
3. Then recommend / engage to capture leads from improved site`;
  }

  private repairJSON(content: string): string {
    let cleaned = content
      .replace(/[\x00-\x1F\x7F]/g, ' ')
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']');
    
    const openBraces = (cleaned.match(/{/g) || []).length;
    const closeBraces = (cleaned.match(/}/g) || []).length;
    if (openBraces > closeBraces) {
      cleaned += '}'.repeat(openBraces - closeBraces);
    }
    
    const openBrackets = (cleaned.match(/\[/g) || []).length;
    const closeBrackets = (cleaned.match(/]/g) || []).length;
    if (openBrackets > closeBrackets) {
      cleaned += ']'.repeat(openBrackets - closeBrackets);
    }
    
    return cleaned;
  }

  private createFallbackResult(businessName: string, score: number): any {
    return {
      digitalScore: score,
      summary: `${businessName} has opportunities to strengthen their digital presence with our BusinessBlueprint suite of tools.`,
      strengths: ['Business is taking steps to improve digital presence'],
      weaknesses: ['Needs comprehensive digital strategy'],
      recommendations: [
        {
          category: 'Email & SMS Marketing',
          title: 'Start Building Your Customer Database',
          description: 'Use / promote to collect emails and SMS subscribers for direct marketing.',
          priority: 'high',
          productId: 'promote',
          bundleId: 'compass'
        },
        {
          category: 'Reputation Management',
          title: 'Improve Online Reviews',
          description: 'Use / elevate to monitor and respond to customer reviews.',
          priority: 'high',
          productId: 'elevate',
          bundleId: 'anchor'
        },
        {
          category: 'Business Listings',
          title: 'Sync Business Information',
          description: 'Use / publish to ensure consistent NAP across directories.',
          priority: 'medium',
          productId: 'publish',
          bundleId: 'anchor'
        }
      ],
      competitorInsights: [],
      nextSteps: ['Complete your BusinessBlueprint assessment', 'Review product recommendations']
    };
  }

  private validateAndFormatResult(result: any, baseScore: number): AnalysisResult {
    const rawRecommendations = Array.isArray(result.recommendations) ? result.recommendations : [];
    const validatedRecommendations: any[] = [];
    const rejectedCount = { count: 0, products: [] as string[] };
    
    for (const rec of rawRecommendations) {
      const validated = this.validateRecommendation(rec, rejectedCount);
      if (validated !== null) {
        validatedRecommendations.push(validated);
      }
    }
    
    console.log(`[Product Validation] ${validatedRecommendations.length}/${rawRecommendations.length} recommendations passed validation`);
    
    if (rejectedCount.count > 0) {
      console.warn(`[PRODUCT VALIDATION SUMMARY] ${rejectedCount.count} invalid products filtered out: ${rejectedCount.products.join(', ')}`);
    }
    
    // If all recommendations were invalid, use fallback instead of throwing
    if (validatedRecommendations.length === 0 && rawRecommendations.length > 0) {
      console.warn('[PRODUCT VALIDATION] All AI recommendations had invalid products - using fallback recommendations');
      validatedRecommendations.push(
        {
          category: 'Email & SMS Marketing',
          title: 'Build Your Email List',
          description: 'Start collecting customer emails to build relationships and drive repeat business.',
          priority: 'high',
          estimatedImpact: 'High ROI',
          estimatedEffort: '1-2 weeks',
          productId: 'promote',
          productBenefits: ['Automated campaigns', 'Customer retention', 'Revenue growth']
        },
        {
          category: 'Social Media Content',
          title: 'Consistent Content Creation',
          description: 'Post regularly on social media to stay top of mind with your audience.',
          priority: 'medium',
          estimatedImpact: 'Medium ROI',
          estimatedEffort: '2-4 weeks',
          productId: 'post',
          productBenefits: ['Brand awareness', 'Engagement', 'Lead generation']
        },
        {
          category: 'Reputation Management',
          title: 'Monitor and Respond to Reviews',
          description: 'Build trust by responding to customer reviews promptly.',
          priority: 'medium',
          estimatedImpact: 'High trust-building',
          estimatedEffort: '1 week',
          productId: 'elevate',
          bundleId: 'anchor',
          productBenefits: ['Customer trust', 'SEO benefits', 'Insight gathering']
        }
      );
    }
    
    return {
      digitalScore: result.digitalScore || baseScore,
      summary: result.summary || "Your business has significant potential for digital growth with our BusinessBlueprint tools.",
      strengths: Array.isArray(result.strengths) ? result.strengths : [],
      weaknesses: Array.isArray(result.weaknesses) ? result.weaknesses : [],
      recommendations: validatedRecommendations,
      competitorInsights: Array.isArray(result.competitorInsights) ? result.competitorInsights : [],
      nextSteps: Array.isArray(result.nextSteps) ? result.nextSteps : [],
      areaScores: result.areaScores || undefined
    };
  }

  private validateRecommendation(rec: any, rejectedCount?: { count: number; products: string[] }): any | null {
    // All product IDs are lowercase for case-insensitive matching
    const VALID_PRODUCT_IDS = [
      'respond', 'promote', 'post', 'engage', 'compass',
      'publish', 'elevate', 'optimize', 'amplify', 'anchor',
      'connect',
      'hostsblue', 'swipesblue'
    ];
    const VALID_BUNDLE_IDS = ['compass', 'anchor'];
    const VALID_CATEGORIES = [
      'Email & SMS Marketing',
      'Social Media Content',
      'Reputation Management',
      'Unified Inbox & Response',
      'Live Chat',
      'Business Listings & GBP',
      'Website & SEO',
      'CRM & Customer Management',
      'Advertising & Paid Media'
    ];
    
    // Normalize product ID to lowercase for comparison
    const rawProductId = rec.productId;
    const productId = rawProductId?.toLowerCase?.() || rawProductId;
    
    if (!productId || !VALID_PRODUCT_IDS.includes(productId)) {
      console.warn(`[PRODUCT VALIDATION] Invalid product: "${rawProductId}" - filtering out recommendation`);
      if (rejectedCount) {
        rejectedCount.count++;
        rejectedCount.products.push(rawProductId || 'undefined');
      }
      return null;
    }
    
    // Normalize bundle ID to lowercase
    const rawBundleId = rec.bundleId;
    const bundleId = rawBundleId?.toLowerCase?.() || rawBundleId;
    if (rawBundleId && !VALID_BUNDLE_IDS.includes(bundleId)) {
      console.warn(`[BUNDLE VALIDATION] Invalid bundleId "${rawBundleId}" stripped from recommendation`);
    }
    
    return {
      category: VALID_CATEGORIES.includes(rec.category) ? rec.category : 'general',
      title: rec.title || "Improve Digital Presence",
      description: rec.description || "Work on improving your online visibility with our tools",
      priority: ["high", "medium", "low"].includes(rec.priority) ? rec.priority : "medium",
      estimatedImpact: rec.estimatedImpact || "Medium ROI",
      estimatedEffort: rec.estimatedEffort || "1-2 weeks",
      productId: productId,
      bundleId: VALID_BUNDLE_IDS.includes(bundleId) ? bundleId : undefined,
      productBenefits: Array.isArray(rec.productBenefits) ? rec.productBenefits : [],
      bundleAdvantage: rec.bundleAdvantage || undefined
    };
  }
}
