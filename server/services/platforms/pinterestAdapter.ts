/**
 * Pinterest Ads Platform Adapter
 * Uses Pinterest API v5
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

export class PinterestAdapter extends BasePlatformAdapter {
  private readonly BASE_URL = 'https://api.pinterest.com/v5';

  constructor(credentials: PlatformCredentials) {
    super('pinterest', credentials);
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    try {
      // Create a Pin
      const pinData: any = {
        title: post.text?.substring(0, 100) || '',
        description: post.text || '',
        link: post.link,
      };

      if (post.mediaUrls && post.mediaUrls.length > 0) {
        pinData.media_source = {
          source_type: 'image_url',
          url: post.mediaUrls[0],
        };
      }

      const response = await fetch(`${this.BASE_URL}/pins`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pinData),
      });

      const data = await response.json();

      if (data.id) {
        return {
          success: true,
          platformPostId: data.id,
          platformUrl: `https://www.pinterest.com/pin/${data.id}/`,
          publishedAt: new Date(),
        };
      }

      return { success: false, error: data.message || 'Failed to create Pin' };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to publish to Pinterest' };
    }
  }

  /**
   * Create a Pinterest ad campaign
   */
  async createCampaign(adAccountId: string, campaign: {
    name: string;
    objective: 'AWARENESS' | 'CONSIDERATION' | 'VIDEO_VIEW' | 'WEB_CONVERSION' | 'CATALOG_SALES' | 'SHOPPING';
    dailySpendCap: number;
    status?: 'ACTIVE' | 'PAUSED';
    startTime?: number;
    endTime?: number;
  }): Promise<{ success: boolean; campaignId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/ad_accounts/${adAccountId}/campaigns`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{
          ad_account_id: adAccountId,
          name: campaign.name,
          objective_type: campaign.objective,
          daily_spend_cap: Math.round(campaign.dailySpendCap * 1000000), // Pinterest uses microcurrency
          status: campaign.status || 'PAUSED',
          start_time: campaign.startTime,
          end_time: campaign.endTime,
        }]),
      });

      const data = await response.json();
      const result = data.items?.[0];

      if (result?.data?.id) {
        return { success: true, campaignId: result.data.id };
      }

      return { success: false, error: result?.exceptions?.[0]?.message || 'Failed to create campaign' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a Pinterest ad group
   */
  async createAdGroup(adAccountId: string, adGroup: {
    campaignId: string;
    name: string;
    budgetInMicroCurrency: number;
    bidInMicroCurrency: number;
    targeting?: {
      geos?: string[];
      interests?: string[];
      ages?: string[];
      genders?: string[];
    };
  }): Promise<{ success: boolean; adGroupId?: string; error?: string }> {
    try {
      const targetingSpec: any = {};
      if (adGroup.targeting?.geos) targetingSpec.GEO = adGroup.targeting.geos;
      if (adGroup.targeting?.interests) targetingSpec.INTEREST = adGroup.targeting.interests;
      if (adGroup.targeting?.ages) targetingSpec.AGE_BUCKET = adGroup.targeting.ages;
      if (adGroup.targeting?.genders) targetingSpec.GENDER = adGroup.targeting.genders;

      const response = await fetch(`${this.BASE_URL}/ad_accounts/${adAccountId}/ad_groups`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{
          ad_account_id: adAccountId,
          campaign_id: adGroup.campaignId,
          name: adGroup.name,
          budget_in_micro_currency: adGroup.budgetInMicroCurrency,
          bid_in_micro_currency: adGroup.bidInMicroCurrency,
          targeting_spec: targetingSpec,
          status: 'PAUSED',
          budget_type: 'DAILY',
          bid_strategy_type: 'AUTOMATIC_BID',
        }]),
      });

      const data = await response.json();
      const result = data.items?.[0];

      if (result?.data?.id) {
        return { success: true, adGroupId: result.data.id };
      }

      return { success: false, error: result?.exceptions?.[0]?.message || 'Failed to create ad group' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a promoted Pin (ad)
   */
  async createAd(adAccountId: string, ad: {
    adGroupId: string;
    pinId: string;
    name: string;
    destinationUrl?: string;
  }): Promise<{ success: boolean; adId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/ad_accounts/${adAccountId}/ads`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{
          ad_account_id: adAccountId,
          ad_group_id: ad.adGroupId,
          creative_type: 'REGULAR',
          pin_id: ad.pinId,
          name: ad.name,
          destination_url: ad.destinationUrl,
          status: 'PAUSED',
        }]),
      });

      const data = await response.json();
      const result = data.items?.[0];

      if (result?.data?.id) {
        return { success: true, adId: result.data.id };
      }

      return { success: false, error: result?.exceptions?.[0]?.message || 'Failed to create ad' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async getAnalytics(postId: string): Promise<PlatformAnalytics> {
    try {
      const response = await fetch(`${this.BASE_URL}/pins/${postId}/analytics?start_date=${this.getDateDaysAgo(30)}&end_date=${this.getToday()}&metric_types=IMPRESSION,SAVE,PIN_CLICK,OUTBOUND_CLICK`, {
        headers: { 'Authorization': `Bearer ${this.credentials.accessToken}` },
      });

      const data = await response.json();

      return {
        impressions: data.all?.lifetime_metrics?.IMPRESSION || 0,
        engagement: data.all?.lifetime_metrics?.SAVE || 0,
        clicks: data.all?.lifetime_metrics?.PIN_CLICK || 0,
        saves: data.all?.lifetime_metrics?.SAVE || 0,
      };
    } catch {
      return { impressions: 0, engagement: 0, clicks: 0, saves: 0 };
    }
  }

  /**
   * Get campaign analytics
   */
  async getCampaignAnalytics(adAccountId: string, campaignId: string): Promise<{
    impressions: number;
    clicks: number;
    spend: number;
    ctr: number;
    cpc: number;
  }> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/ad_accounts/${adAccountId}/campaigns/analytics?start_date=${this.getDateDaysAgo(30)}&end_date=${this.getToday()}&campaign_ids=${campaignId}&columns=IMPRESSION,CLICKTHROUGH_1,SPEND_IN_MICRO_DOLLAR,CTR_1,ECPC_IN_MICRO_DOLLAR&granularity=TOTAL`,
        { headers: { 'Authorization': `Bearer ${this.credentials.accessToken}` } },
      );

      const data = await response.json();
      const metrics = data?.[0];

      return {
        impressions: metrics?.IMPRESSION || 0,
        clicks: metrics?.CLICKTHROUGH_1 || 0,
        spend: (metrics?.SPEND_IN_MICRO_DOLLAR || 0) / 1000000,
        ctr: metrics?.CTR_1 || 0,
        cpc: (metrics?.ECPC_IN_MICRO_DOLLAR || 0) / 1000000,
      };
    } catch {
      return { impressions: 0, clicks: 0, spend: 0, ctr: 0, cpc: 0 };
    }
  }

  async validateCredentials(): Promise<boolean> {
    try {
      const response = await fetch(`${this.BASE_URL}/user_account`, {
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
      const basicAuth = Buffer.from(
        `${process.env.PINTEREST_CLIENT_ID}:${process.env.PINTEREST_CLIENT_SECRET}`
      ).toString('base64');

      const response = await fetch('https://api.pinterest.com/v5/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`,
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.credentials.refreshToken,
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
      console.error('[Pinterest] Token refresh failed:', error);
    }
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 500,
      maxMediaCount: 5,
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
