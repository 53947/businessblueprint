/**
 * LinkedIn Ads Platform Adapter
 * Uses LinkedIn Marketing API (REST v2)
 * Note: OAuth is already handled by server/routes/linkedin.ts
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

export class LinkedInAdsAdapter extends BasePlatformAdapter {
  private readonly BASE_URL = 'https://api.linkedin.com/rest';
  private readonly API_VERSION = '202401';

  constructor(credentials: PlatformCredentials) {
    super('linkedin', credentials);
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    try {
      // Create a LinkedIn post via UGC API
      const authorUrn = `urn:li:person:${this.credentials.platformAccountId}`;

      const postBody: any = {
        author: authorUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: post.text || '' },
            shareMediaCategory: post.mediaUrls?.length ? 'IMAGE' : 'NONE',
          },
        },
        visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
      };

      if (post.link) {
        postBody.specificContent['com.linkedin.ugc.ShareContent'].shareMediaCategory = 'ARTICLE';
        postBody.specificContent['com.linkedin.ugc.ShareContent'].media = [{
          status: 'READY',
          originalUrl: post.link,
        }];
      }

      const response = await fetch(`${this.BASE_URL}/ugcPosts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
          'LinkedIn-Version': this.API_VERSION,
        },
        body: JSON.stringify(postBody),
      });

      const data = await response.json();

      if (data.id) {
        return {
          success: true,
          platformPostId: data.id,
          platformUrl: `https://www.linkedin.com/feed/update/${data.id}`,
          publishedAt: new Date(),
        };
      }

      return { success: false, error: data.message || 'Failed to publish to LinkedIn' };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to publish to LinkedIn' };
    }
  }

  /**
   * Create a LinkedIn Ads campaign group (account-level container)
   */
  async createCampaignGroup(adAccountId: string, group: {
    name: string;
    totalBudget?: number;
    startDate: string;
    endDate?: string;
  }): Promise<{ success: boolean; campaignGroupId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/adCampaignGroups`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
          'LinkedIn-Version': this.API_VERSION,
        },
        body: JSON.stringify({
          account: `urn:li:sponsoredAccount:${adAccountId}`,
          name: group.name,
          status: 'DRAFT',
          totalBudget: group.totalBudget ? { amount: String(group.totalBudget), currencyCode: 'USD' } : undefined,
          runSchedule: {
            start: new Date(group.startDate).getTime(),
            end: group.endDate ? new Date(group.endDate).getTime() : undefined,
          },
        }),
      });

      const locationHeader = response.headers.get('x-restli-id') || response.headers.get('location');
      const data = await response.json().catch(() => ({}));

      if (response.ok || locationHeader) {
        return { success: true, campaignGroupId: locationHeader || data.id };
      }

      return { success: false, error: data.message || 'Failed to create campaign group' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a LinkedIn Ads campaign
   */
  async createCampaign(adAccountId: string, campaign: {
    campaignGroupId: string;
    name: string;
    objective: 'BRAND_AWARENESS' | 'WEBSITE_VISITS' | 'ENGAGEMENT' | 'VIDEO_VIEWS' | 'LEAD_GENERATION' | 'WEBSITE_CONVERSIONS' | 'JOB_APPLICANTS';
    type: 'SPONSORED_UPDATES' | 'TEXT_AD' | 'SPONSORED_INMAILS' | 'DYNAMIC';
    dailyBudget: number;
    bidAmount?: number;
    targeting: {
      locations?: string[];
      industries?: string[];
      jobTitles?: string[];
      companySize?: string[];
      seniorities?: string[];
      skills?: string[];
    };
  }): Promise<{ success: boolean; campaignId?: string; error?: string }> {
    try {
      const targetingCriteria: any = { include: { and: [] } };

      if (campaign.targeting.locations?.length) {
        targetingCriteria.include.and.push({
          or: { 'urn:li:adTargetingFacet:locations': campaign.targeting.locations.map(l => `urn:li:geo:${l}`) },
        });
      }
      if (campaign.targeting.industries?.length) {
        targetingCriteria.include.and.push({
          or: { 'urn:li:adTargetingFacet:industries': campaign.targeting.industries.map(i => `urn:li:industry:${i}`) },
        });
      }
      if (campaign.targeting.jobTitles?.length) {
        targetingCriteria.include.and.push({
          or: { 'urn:li:adTargetingFacet:titlesAll': campaign.targeting.jobTitles.map(j => `urn:li:title:${j}`) },
        });
      }
      if (campaign.targeting.seniorities?.length) {
        targetingCriteria.include.and.push({
          or: { 'urn:li:adTargetingFacet:seniorities': campaign.targeting.seniorities.map(s => `urn:li:seniority:${s}`) },
        });
      }

      const response = await fetch(`${this.BASE_URL}/adCampaigns`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
          'LinkedIn-Version': this.API_VERSION,
        },
        body: JSON.stringify({
          account: `urn:li:sponsoredAccount:${adAccountId}`,
          campaignGroup: `urn:li:sponsoredCampaignGroup:${campaign.campaignGroupId}`,
          name: campaign.name,
          objectiveType: campaign.objective,
          type: campaign.type,
          status: 'DRAFT',
          dailyBudget: { amount: String(campaign.dailyBudget), currencyCode: 'USD' },
          unitCost: campaign.bidAmount ? { amount: String(campaign.bidAmount), currencyCode: 'USD' } : undefined,
          targetingCriteria,
          costType: 'CPC',
        }),
      });

      const locationHeader = response.headers.get('x-restli-id');
      const data = await response.json().catch(() => ({}));

      if (response.ok || locationHeader) {
        return { success: true, campaignId: locationHeader || data.id };
      }

      return { success: false, error: data.message || 'Failed to create campaign' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a sponsored content ad creative
   */
  async createAdCreative(adAccountId: string, creative: {
    campaignId: string;
    text: string;
    headline?: string;
    description?: string;
    destinationUrl?: string;
    imageUrl?: string;
    callToAction?: 'APPLY' | 'DOWNLOAD' | 'VIEW_QUOTE' | 'LEARN_MORE' | 'SIGN_UP' | 'SUBSCRIBE' | 'REGISTER' | 'VISIT_WEBSITE';
  }): Promise<{ success: boolean; creativeId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/adCreatives`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
          'LinkedIn-Version': this.API_VERSION,
        },
        body: JSON.stringify({
          campaign: `urn:li:sponsoredCampaign:${creative.campaignId}`,
          status: 'DRAFT',
          type: 'SPONSORED_STATUS_UPDATE',
          variables: {
            data: {
              'com.linkedin.ads.SponsoredUpdateCreativeVariables': {
                activity: undefined,
                directSponsoredContent: true,
                share: {
                  commentary: creative.text,
                  shareContent: creative.destinationUrl ? {
                    shareMediaCategory: 'ARTICLE',
                    media: [{
                      status: 'READY',
                      originalUrl: creative.destinationUrl,
                      title: { text: creative.headline || '' },
                      description: { text: creative.description || '' },
                    }],
                  } : undefined,
                },
              },
            },
          },
          callToAction: creative.callToAction ? {
            labelType: creative.callToAction,
            target: creative.destinationUrl,
          } : undefined,
        }),
      });

      const locationHeader = response.headers.get('x-restli-id');
      const data = await response.json().catch(() => ({}));

      if (response.ok || locationHeader) {
        return { success: true, creativeId: locationHeader || data.id };
      }

      return { success: false, error: data.message || 'Failed to create ad creative' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get campaign analytics from LinkedIn Marketing API
   */
  async getCampaignAnalytics(campaignId: string, dateRange?: { startDate: string; endDate: string }): Promise<{
    impressions: number;
    clicks: number;
    spend: number;
    ctr: number;
    cpc: number;
    conversions: number;
    leads: number;
  }> {
    try {
      const start = dateRange?.startDate || this.getDateDaysAgo(30);
      const end = dateRange?.endDate || this.getToday();

      const params = new URLSearchParams({
        'q': 'analytics',
        'pivot': 'CAMPAIGN',
        'dateRange.start.day': new Date(start).getDate().toString(),
        'dateRange.start.month': (new Date(start).getMonth() + 1).toString(),
        'dateRange.start.year': new Date(start).getFullYear().toString(),
        'dateRange.end.day': new Date(end).getDate().toString(),
        'dateRange.end.month': (new Date(end).getMonth() + 1).toString(),
        'dateRange.end.year': new Date(end).getFullYear().toString(),
        'campaigns[0]': `urn:li:sponsoredCampaign:${campaignId}`,
        'fields': 'impressions,clicks,costInLocalCurrency,actionClicks,externalWebsiteConversions,leadGenerationMailContactInfoShares',
      });

      const response = await fetch(
        `${this.BASE_URL}/adAnalytics?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${this.credentials.accessToken}`,
            'X-Restli-Protocol-Version': '2.0.0',
            'LinkedIn-Version': this.API_VERSION,
          },
        },
      );

      const data = await response.json();
      const element = data.elements?.[0];

      const impressions = element?.impressions || 0;
      const clicks = element?.clicks || 0;
      const spend = parseFloat(element?.costInLocalCurrency || '0');

      return {
        impressions,
        clicks,
        spend,
        ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
        cpc: clicks > 0 ? spend / clicks : 0,
        conversions: element?.externalWebsiteConversions || 0,
        leads: element?.leadGenerationMailContactInfoShares || 0,
      };
    } catch {
      return { impressions: 0, clicks: 0, spend: 0, ctr: 0, cpc: 0, conversions: 0, leads: 0 };
    }
  }

  async getAnalytics(postId: string): Promise<PlatformAnalytics> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/socialActions/${encodeURIComponent(postId)}?fields=likes,comments,shares`,
        {
          headers: {
            'Authorization': `Bearer ${this.credentials.accessToken}`,
            'X-Restli-Protocol-Version': '2.0.0',
            'LinkedIn-Version': this.API_VERSION,
          },
        },
      );

      const data = await response.json();

      return {
        likes: data.likes?.count || 0,
        comments: data.comments?.count || 0,
        shares: data.shares?.count || 0,
        engagement: (data.likes?.count || 0) + (data.comments?.count || 0) + (data.shares?.count || 0),
      };
    } catch {
      return { impressions: 0, engagement: 0, clicks: 0 };
    }
  }

  async validateCredentials(): Promise<boolean> {
    try {
      const response = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: { 'Authorization': `Bearer ${this.credentials.accessToken}` },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async refreshToken(): Promise<void> {
    if (!this.credentials.refreshToken) return;

    try {
      const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.credentials.refreshToken,
          client_id: process.env.LINKEDIN_CLIENT_ID || '',
          client_secret: process.env.LINKEDIN_CLIENT_SECRET || '',
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        this.credentials.accessToken = data.access_token;
        if (data.refresh_token) {
          this.credentials.refreshToken = data.refresh_token;
        }
      }
    } catch (error) {
      console.error('[LinkedIn] Token refresh failed:', error);
    }
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 3000,
      maxMediaCount: 9,
      supportsVideo: true,
      supportsMultipleImages: true,
      supportsScheduling: true,
      supportsHashtags: true,
      supportsLinks: true,
    };
  }

  private getDateDaysAgo(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  }

  private getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
}
