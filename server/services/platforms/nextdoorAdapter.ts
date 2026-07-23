/**
 * Nextdoor Ads Platform Adapter
 * Uses Nextdoor Ads API v2
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

export class NextdoorAdapter extends BasePlatformAdapter {
  private readonly BASE_URL = 'https://api.nextdoor.com/v2';

  constructor(credentials: PlatformCredentials) {
    super('nextdoor', credentials);
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    try {
      // Nextdoor business posting
      const postData: any = {
        body: post.text || '',
        link: post.link,
      };

      if (post.mediaUrls && post.mediaUrls.length > 0) {
        postData.media = post.mediaUrls.map(url => ({ url, type: 'photo' }));
      }

      const response = await fetch(`${this.BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (data.id) {
        return {
          success: true,
          platformPostId: data.id,
          publishedAt: new Date(),
        };
      }

      return { success: false, error: data.message || 'Failed to post to Nextdoor' };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to publish to Nextdoor' };
    }
  }

  /**
   * Create a Nextdoor ad campaign
   */
  async createCampaign(advertiserId: string, campaign: {
    name: string;
    objective: 'AWARENESS' | 'TRAFFIC' | 'CONVERSIONS';
    dailyBudget: number;
    startDate: string;
    endDate?: string;
  }): Promise<{ success: boolean; campaignId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/advertiser/${advertiserId}/campaigns`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: campaign.name,
          objective: campaign.objective,
          daily_budget: campaign.dailyBudget,
          start_date: campaign.startDate,
          end_date: campaign.endDate,
          status: 'PAUSED',
        }),
      });

      const data = await response.json();

      if (data.id) {
        return { success: true, campaignId: data.id };
      }

      return { success: false, error: data.message || 'Failed to create campaign' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a Nextdoor ad group with targeting
   */
  async createAdGroup(advertiserId: string, adGroup: {
    campaignId: string;
    name: string;
    bid: number;
    targeting: {
      neighborhoods?: string[];
      radius?: number;
      zipCodes?: string[];
      ageRanges?: string[];
      interests?: string[];
    };
  }): Promise<{ success: boolean; adGroupId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/advertiser/${advertiserId}/ad_groups`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaign_id: adGroup.campaignId,
          name: adGroup.name,
          bid_amount: adGroup.bid,
          targeting: {
            neighborhoods: adGroup.targeting.neighborhoods,
            radius_miles: adGroup.targeting.radius,
            zip_codes: adGroup.targeting.zipCodes,
            age_ranges: adGroup.targeting.ageRanges,
            interests: adGroup.targeting.interests,
          },
          status: 'PAUSED',
        }),
      });

      const data = await response.json();

      if (data.id) {
        return { success: true, adGroupId: data.id };
      }

      return { success: false, error: data.message || 'Failed to create ad group' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a Nextdoor ad creative
   */
  async createAd(advertiserId: string, ad: {
    adGroupId: string;
    name: string;
    headline: string;
    body: string;
    imageUrl?: string;
    callToAction: string;
    destinationUrl: string;
  }): Promise<{ success: boolean; adId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/advertiser/${advertiserId}/ads`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ad_group_id: ad.adGroupId,
          name: ad.name,
          headline: ad.headline,
          body: ad.body,
          image_url: ad.imageUrl,
          call_to_action: ad.callToAction,
          destination_url: ad.destinationUrl,
          status: 'PAUSED',
        }),
      });

      const data = await response.json();

      if (data.id) {
        return { success: true, adId: data.id };
      }

      return { success: false, error: data.message || 'Failed to create ad' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async getAnalytics(postId: string): Promise<PlatformAnalytics> {
    try {
      const response = await fetch(`${this.BASE_URL}/posts/${postId}/analytics`, {
        headers: { 'Authorization': `Bearer ${this.credentials.accessToken}` },
      });

      const data = await response.json();

      return {
        impressions: data.impressions || 0,
        engagement: data.engagements || 0,
        clicks: data.clicks || 0,
        likes: data.reactions || 0,
        comments: data.comments || 0,
        shares: data.shares || 0,
      };
    } catch {
      return { impressions: 0, engagement: 0, clicks: 0 };
    }
  }

  /**
   * Get campaign performance metrics
   */
  async getCampaignAnalytics(advertiserId: string, campaignId: string): Promise<{
    impressions: number;
    clicks: number;
    spend: number;
    ctr: number;
    conversions: number;
  }> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/advertiser/${advertiserId}/campaigns/${campaignId}/analytics`,
        { headers: { 'Authorization': `Bearer ${this.credentials.accessToken}` } },
      );

      const data = await response.json();

      return {
        impressions: data.impressions || 0,
        clicks: data.clicks || 0,
        spend: data.spend || 0,
        ctr: data.ctr || 0,
        conversions: data.conversions || 0,
      };
    } catch {
      return { impressions: 0, clicks: 0, spend: 0, ctr: 0, conversions: 0 };
    }
  }

  async validateCredentials(): Promise<boolean> {
    try {
      const response = await fetch(`${this.BASE_URL}/me`, {
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
      const response = await fetch('https://auth.nextdoor.com/v2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.NEXTDOOR_CLIENT_ID || '',
          client_secret: process.env.NEXTDOOR_CLIENT_SECRET || '',
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
      console.error('[Nextdoor] Token refresh failed:', error);
    }
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 1000,
      maxMediaCount: 4,
      supportsVideo: true,
      supportsMultipleImages: true,
      supportsScheduling: true,
      supportsHashtags: false,
      supportsLinks: true,
    };
  }
}
