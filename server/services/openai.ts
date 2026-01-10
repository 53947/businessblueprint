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
1. Email & SMS Marketing → Recommend: Send OR CommVerse Bundle (if multiple comm needs)
2. Social Media Content → Recommend: Content OR CommVerse Bundle (if multiple comm needs)
3. Reputation Management → Recommend: Reputation OR LocalBlue Bundle (if also needs Listings)
4. Customer Response & Timing → Recommend: Inbox OR CommVerse Bundle (if multiple comm needs)
5. Live Chat → Recommend: LiveChat OR CommVerse Bundle (if multiple comm needs)
6. Business Listings → Recommend: Listings OR LocalBlue Bundle (if also needs Reputation)
7. Google Business Profile → Recommend: LocalBlue Bundle
8. Website & SEO → Recommend: hostsblue (HostsBlue.com)
9. CRM Systems → Recommend: Relationships

★ BUNDLE RULE: ONLY recommend CommVerse Bundle (productId: "commverse") if business needs ALL 4 communication tools.
★ BUNDLE RULE: ONLY recommend LocalBlue Bundle (productId: "localblue") if business needs BOTH Listings AND Reputation.

RESPOND WITH VALID JSON:
{
  "digitalScore": number (0-140),
  "summary": string (2-3 sentences emphasizing transformation potential),
  "strengths": [array of current strengths - be specific],
  "weaknesses": [array of gaps - tie each to a product that fixes it],
  "areaScores": {
    "emailSms": number (0-15),
    "socialMedia": number (0-13),
    "reputation": number (0-16),
    "customerResponse": number (0-15),
    "liveChat": number (0-15),
    "listings": number (0-18),
    "gbp": number (0-16),
    "websiteSeo": number (0-20),
    "crm": number (0-12)
  },
  "recommendations": [
    {
      "category": "Email & SMS Marketing" | "Social Media Content" | "Reputation Management" | "Customer Response & Timing" | "Live Chat" | "Business Listings" | "Google Business Profile" | "Website & SEO" | "CRM Systems",
      "title": "The Prescription: [specific need statement]",
      "description": "Detailed explanation of WHY this matters (revenue impact, customer experience, competitive advantage) and HOW our product solves it",
      "priority": "high" | "medium" | "low",
      "estimatedImpact": "High ROI" | "Medium ROI" | "Long-term benefit",
      "estimatedEffort": "Quick setup" | "1-2 days" | "1-2 weeks" | "Ongoing",
      "productId": "commverse" | "localblue" | "send" | "inbox" | "content" | "livechat" | "listings" | "reputation" | "relationships" | "hostsBlue" | "swipesBlue",
      "bundleId": "commverse" | "localblue" | null,
      "productBenefits": ["benefit 1", "benefit 2", "benefit 3"],
      "bundleAdvantage": "Save with CommVerse bundle..." or null
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

★★★ BUNDLES (PRIORITIZE THESE - BEST VALUE) ★★★
| productId   | Display Name      | Price   | Includes                              | Savings        |
|-------------|-------------------|---------|---------------------------------------|----------------|
| commverse   | CommVerse Bundle  | $99/mo  | Inbox + Send + Content + LiveChat     | Save $37/month |
| localblue   | LocalBlue Bundle  | $59/mo  | Listings + Reputation                 | Save $19/month |

COMMUNICATION TOOLS (Individual apps - recommend CommVerse Bundle instead when 2+ needed):
| productId   | Display Name | Price    | Use For                              |
|-------------|--------------|----------|--------------------------------------|
| inbox       | Inbox        | $34/mo   | Unified inbox, message consolidation |
| send        | Send         | $34/mo   | Email & SMS marketing                |
| content     | Content      | $34/mo   | Social media scheduling & creation   |
| livechat    | LiveChat     | $34/mo   | Website chat widget, lead capture    |

LOCAL PRESENCE TOOLS (Individual apps - recommend LocalBlue Bundle instead when both needed):
| productId   | Display Name | Price    | Use For                              |
|-------------|--------------|----------|--------------------------------------|
| listings    | Listings     | $39/mo   | Directory sync, NAP consistency      |
| reputation  | Reputation   | $39/mo   | Review monitoring & response         |

BUSINESS OPERATIONS:
| productId      | Display Name      | Price    | Use For                    |
|----------------|-------------------|----------|----------------------------|
| relationships  | Relationships CRM | $29/mo   | Customer tracking, pipeline |

PARTNER SERVICES:
| productId     | Display Name   | Price     | Use For                        |
|---------------|----------------|-----------|--------------------------------|
| hostsblue     | HostsBlue.com  | Varies    | Web hosting, domains, SSL      |
| swipesblue    | SwipesBlue.com | 2.9%+30¢  | Payment processing             |

★★★ BUNDLE RECOMMENDATION RULES ★★★
- ONLY recommend "commverse" (CommVerse Bundle) if business needs ALL 4 communication tools (Inbox, Send, Content, LiveChat)
- ONLY recommend "localblue" (LocalBlue Bundle) if business needs BOTH Listings AND Reputation
- If only 1-3 communication tools needed, recommend individual apps instead
- Bundles ARE products - use productId "commverse" or "localblue" directly
- Always mention bundle savings in description when recommending bundles

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
3. Then recommend LiveChat to capture leads from improved site`;
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
          description: 'Use Send to collect emails and SMS subscribers for direct marketing.',
          priority: 'high',
          productId: 'send',
          bundleId: 'commverse'
        },
        {
          category: 'Reputation Management',
          title: 'Improve Online Reviews',
          description: 'Use Reputation to monitor and respond to customer reviews.',
          priority: 'high',
          productId: 'reputation',
          bundleId: 'localblue'
        },
        {
          category: 'Business Listings',
          title: 'Sync Business Information',
          description: 'Use Listings to ensure consistent NAP across directories.',
          priority: 'medium',
          productId: 'listings',
          bundleId: 'localblue'
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
          productId: 'send',
          productBenefits: ['Automated campaigns', 'Customer retention', 'Revenue growth']
        },
        {
          category: 'Social Media Content',
          title: 'Consistent Content Creation',
          description: 'Post regularly on social media to stay top of mind with your audience.',
          priority: 'medium',
          estimatedImpact: 'Medium ROI',
          estimatedEffort: '2-4 weeks',
          productId: 'content',
          productBenefits: ['Brand awareness', 'Engagement', 'Lead generation']
        },
        {
          category: 'Reputation Management',
          title: 'Monitor and Respond to Reviews',
          description: 'Build trust by responding to customer reviews promptly.',
          priority: 'medium',
          estimatedImpact: 'High trust-building',
          estimatedEffort: '1 week',
          productId: 'reputation',
          bundleId: 'localblue',
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
      'inbox', 'send', 'content', 'livechat', 'commverse',
      'listings', 'reputation', 'localblue',
      'relationships',
      'hostsblue', 'swipesblue'  // Lowercase for consistent matching
    ];
    const VALID_BUNDLE_IDS = ['commverse', 'localblue'];
    const VALID_CATEGORIES = [
      'Email & SMS Marketing',
      'Social Media Content', 
      'Reputation Management',
      'Customer Response & Timing',
      'Live Chat',
      'Business Listings',
      'Google Business Profile',
      'Website & SEO',
      'CRM Systems'
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
