/**
 * YouTube Ads Platform Adapter
 * Uses Google Ads API for YouTube campaign management
 *
 * Note: No separate OAuth needed — uses existing Google credentials
 * (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_ADS_DEVELOPER_TOKEN)
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

export class YouTubeAdapter extends BasePlatformAdapter {
  private readonly GOOGLE_ADS_URL = 'https://googleads.googleapis.com/v16';
  private readonly YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3';
  private readonly developerToken: string;

  constructor(credentials: PlatformCredentials) {
    super('youtube', credentials);
    this.developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '';
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    // YouTube organic uploads require the YouTube Data API
    // For ad campaigns, use createCampaign instead
    return {
      success: false,
      error: 'YouTube video publishing requires the YouTube Data API upload flow. Use /amplify for YouTube ad campaigns.',
    };
  }

  /**
   * Create a YouTube video ad campaign via Google Ads
   */
  async createCampaign(customerId: string, campaign: {
    name: string;
    type: 'VIDEO_RESPONSIVE_AD' | 'IN_STREAM' | 'BUMPER' | 'DISCOVERY' | 'SHORTS';
    dailyBudget: number;
    biddingStrategy: 'TARGET_CPV' | 'TARGET_CPA' | 'MAXIMIZE_CONVERSIONS' | 'TARGET_CPM';
    startDate?: string;
    endDate?: string;
  }): Promise<{ success: boolean; campaignId?: string; error?: string }> {
    try {
      // Create campaign budget
      const budgetResponse = await fetch(
        `${this.GOOGLE_ADS_URL}/customers/${customerId}/campaignBudgets:mutate`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.credentials.accessToken}`,
            'developer-token': this.developerToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operations: [{
              create: {
                name: `${campaign.name} Budget`,
                amountMicros: Math.round(campaign.dailyBudget * 1000000).toString(),
                deliveryMethod: 'STANDARD',
              },
            }],
          }),
        },
      );

      const budgetData = await budgetResponse.json();
      const budgetResourceName = budgetData.results?.[0]?.resourceName;

      if (!budgetResourceName) {
        return { success: false, error: 'Failed to create campaign budget' };
      }

      // Create the campaign
      const biddingConfig: any = {};
      switch (campaign.biddingStrategy) {
        case 'TARGET_CPV':
          biddingConfig.targetCpv = {};
          break;
        case 'TARGET_CPA':
          biddingConfig.targetCpa = {};
          break;
        case 'MAXIMIZE_CONVERSIONS':
          biddingConfig.maximizeConversions = {};
          break;
        case 'TARGET_CPM':
          biddingConfig.targetCpm = {};
          break;
      }

      const campaignResponse = await fetch(
        `${this.GOOGLE_ADS_URL}/customers/${customerId}/campaigns:mutate`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.credentials.accessToken}`,
            'developer-token': this.developerToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operations: [{
              create: {
                name: campaign.name,
                advertisingChannelType: 'VIDEO',
                status: 'PAUSED',
                campaignBudget: budgetResourceName,
                ...biddingConfig,
                startDate: campaign.startDate?.replace(/-/g, '') || undefined,
                endDate: campaign.endDate?.replace(/-/g, '') || undefined,
              },
            }],
          }),
        },
      );

      const campaignData = await campaignResponse.json();
      const campaignResourceName = campaignData.results?.[0]?.resourceName;

      if (campaignResourceName) {
        const campaignId = campaignResourceName.split('/').pop();
        return { success: true, campaignId };
      }

      return { success: false, error: campaignData.error?.message || 'Failed to create campaign' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create an ad group for YouTube ads
   */
  async createAdGroup(customerId: string, adGroup: {
    campaignId: string;
    name: string;
    cpcBidMicros?: string;
    cpvBidMicros?: string;
    targeting?: {
      keywords?: string[];
      topics?: string[];
      placements?: string[];
      audiences?: string[];
      ageRanges?: string[];
      genders?: string[];
    };
  }): Promise<{ success: boolean; adGroupId?: string; error?: string }> {
    try {
      const response = await fetch(
        `${this.GOOGLE_ADS_URL}/customers/${customerId}/adGroups:mutate`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.credentials.accessToken}`,
            'developer-token': this.developerToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operations: [{
              create: {
                name: adGroup.name,
                campaign: `customers/${customerId}/campaigns/${adGroup.campaignId}`,
                status: 'PAUSED',
                type: 'VIDEO_TRUE_VIEW_IN_STREAM',
                cpcBidMicros: adGroup.cpcBidMicros,
                cpvBidMicros: adGroup.cpvBidMicros || '50000', // Default $0.05 CPV
              },
            }],
          }),
        },
      );

      const data = await response.json();
      const resourceName = data.results?.[0]?.resourceName;

      if (resourceName) {
        return { success: true, adGroupId: resourceName.split('/').pop() };
      }

      return { success: false, error: data.error?.message || 'Failed to create ad group' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a YouTube video ad
   */
  async createVideoAd(customerId: string, ad: {
    adGroupId: string;
    youtubeVideoId: string;
    headline?: string;
    description1?: string;
    description2?: string;
    displayUrl?: string;
    finalUrl: string;
    callToAction?: string;
    companionBannerImageId?: string;
  }): Promise<{ success: boolean; adId?: string; error?: string }> {
    try {
      const response = await fetch(
        `${this.GOOGLE_ADS_URL}/customers/${customerId}/adGroupAds:mutate`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.credentials.accessToken}`,
            'developer-token': this.developerToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operations: [{
              create: {
                adGroup: `customers/${customerId}/adGroups/${ad.adGroupId}`,
                status: 'PAUSED',
                ad: {
                  videoAd: {
                    video: { youtubeVideoId: ad.youtubeVideoId },
                    inStream: {
                      actionButton: {
                        label: ad.callToAction || 'Learn More',
                      },
                      actionHeadline: ad.headline,
                      companionBanner: ad.companionBannerImageId ? {
                        asset: `customers/${customerId}/assets/${ad.companionBannerImageId}`,
                      } : undefined,
                    },
                  },
                  finalUrls: [ad.finalUrl],
                  displayUrl: ad.displayUrl,
                  name: ad.headline || `YouTube Ad - ${ad.youtubeVideoId}`,
                },
              },
            }],
          }),
        },
      );

      const data = await response.json();
      const resourceName = data.results?.[0]?.resourceName;

      if (resourceName) {
        return { success: true, adId: resourceName.split('/').pop() };
      }

      return { success: false, error: data.error?.message || 'Failed to create video ad' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get YouTube campaign performance via Google Ads reporting
   */
  async getCampaignAnalytics(customerId: string, campaignId: string): Promise<{
    impressions: number;
    views: number;
    viewRate: number;
    clicks: number;
    ctr: number;
    spend: number;
    cpv: number;
    conversions: number;
  }> {
    try {
      const query = `
        SELECT
          campaign.id,
          metrics.impressions,
          metrics.video_views,
          metrics.video_view_rate,
          metrics.clicks,
          metrics.ctr,
          metrics.cost_micros,
          metrics.average_cpv,
          metrics.conversions
        FROM campaign
        WHERE campaign.id = ${campaignId}
        AND segments.date DURING LAST_30_DAYS
      `;

      const response = await fetch(
        `${this.GOOGLE_ADS_URL}/customers/${customerId}/googleAds:searchStream`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.credentials.accessToken}`,
            'developer-token': this.developerToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        },
      );

      const data = await response.json();
      const row = data?.[0]?.results?.[0]?.metrics;

      return {
        impressions: parseInt(row?.impressions || '0'),
        views: parseInt(row?.videoViews || '0'),
        viewRate: parseFloat(row?.videoViewRate || '0'),
        clicks: parseInt(row?.clicks || '0'),
        ctr: parseFloat(row?.ctr || '0'),
        spend: parseInt(row?.costMicros || '0') / 1000000,
        cpv: parseInt(row?.averageCpv || '0') / 1000000,
        conversions: parseFloat(row?.conversions || '0'),
      };
    } catch {
      return { impressions: 0, views: 0, viewRate: 0, clicks: 0, ctr: 0, spend: 0, cpv: 0, conversions: 0 };
    }
  }

  /**
   * Get YouTube channel analytics (organic content)
   */
  async getVideoAnalytics(videoId: string): Promise<PlatformAnalytics> {
    try {
      const response = await fetch(
        `${this.YOUTUBE_URL}/videos?part=statistics&id=${videoId}`,
        { headers: { 'Authorization': `Bearer ${this.credentials.accessToken}` } },
      );

      const data = await response.json();
      const stats = data.items?.[0]?.statistics;

      return {
        impressions: parseInt(stats?.viewCount || '0'),
        likes: parseInt(stats?.likeCount || '0'),
        comments: parseInt(stats?.commentCount || '0'),
        engagement: (parseInt(stats?.likeCount || '0')) + (parseInt(stats?.commentCount || '0')),
      };
    } catch {
      return { impressions: 0, engagement: 0, clicks: 0 };
    }
  }

  async getAnalytics(postId: string): Promise<PlatformAnalytics> {
    return this.getVideoAnalytics(postId);
  }

  async validateCredentials(): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.GOOGLE_ADS_URL}/customers:listAccessibleCustomers`,
        {
          headers: {
            'Authorization': `Bearer ${this.credentials.accessToken}`,
            'developer-token': this.developerToken,
          },
        },
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  async refreshToken(): Promise<void> {
    if (!this.credentials.refreshToken) return;

    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID || '',
          client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
          grant_type: 'refresh_token',
          refresh_token: this.credentials.refreshToken,
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        this.credentials.accessToken = data.access_token;
      }
    } catch (error) {
      console.error('[YouTube/Google] Token refresh failed:', error);
    }
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 5000,
      maxMediaCount: 1,
      supportsVideo: true,
      supportsMultipleImages: false,
      supportsScheduling: true,
      supportsHashtags: true,
      supportsLinks: true,
    };
  }
}
