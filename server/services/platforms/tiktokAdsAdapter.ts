/**
 * TikTok Ads Platform Adapter
 * Uses TikTok Ads API v1.3
 * Note: OAuth and content adapter already exist — this handles ad campaigns
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

export class TikTokAdsAdapter extends BasePlatformAdapter {
  private readonly BASE_URL = 'https://business-api.tiktok.com/open_api/v1.3';

  constructor(credentials: PlatformCredentials) {
    super('tiktok', credentials);
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    // Content publishing is handled by the existing TikTok content adapter
    return {
      success: false,
      error: 'Use the TikTok content adapter for organic posting. This adapter is for TikTok Ads only.',
    };
  }

  /**
   * Create a TikTok Ads campaign
   */
  async createCampaign(advertiserId: string, campaign: {
    name: string;
    objective: 'REACH' | 'TRAFFIC' | 'VIDEO_VIEWS' | 'LEAD_GENERATION' | 'COMMUNITY_INTERACTION' | 'APP_PROMOTION' | 'CONVERSIONS' | 'CATALOG_SALES';
    budgetMode: 'BUDGET_MODE_TOTAL' | 'BUDGET_MODE_DAY' | 'BUDGET_MODE_INFINITE';
    budget?: number;
  }): Promise<{ success: boolean; campaignId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/campaign/create/`, {
        method: 'POST',
        headers: {
          'Access-Token': this.credentials.accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          advertiser_id: advertiserId,
          campaign_name: campaign.name,
          objective_type: campaign.objective,
          budget_mode: campaign.budgetMode,
          budget: campaign.budget,
          operation_status: 'DISABLE', // Start paused
        }),
      });

      const data = await response.json();

      if (data.code === 0 && data.data?.campaign_id) {
        return { success: true, campaignId: data.data.campaign_id };
      }

      return { success: false, error: data.message || 'Failed to create campaign' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a TikTok ad group with targeting
   */
  async createAdGroup(advertiserId: string, adGroup: {
    campaignId: string;
    name: string;
    budget: number;
    budgetMode: 'BUDGET_MODE_TOTAL' | 'BUDGET_MODE_DAY';
    scheduleStartTime: string;
    scheduleEndTime?: string;
    placementType?: 'PLACEMENT_TYPE_AUTOMATIC' | 'PLACEMENT_TYPE_NORMAL';
    bidPrice?: number;
    optimizationGoal?: 'CLICK' | 'CONVERT' | 'SHOW' | 'REACH' | 'VIDEO_VIEW' | 'LEAD_GENERATION';
    targeting: {
      locations?: string[];
      ageGroups?: string[];
      genders?: ('GENDER_MALE' | 'GENDER_FEMALE')[];
      languages?: string[];
      interests?: string[];
      behaviors?: string[];
      operatingSystems?: ('ANDROID' | 'IOS')[];
    };
  }): Promise<{ success: boolean; adGroupId?: string; error?: string }> {
    try {
      const targetingObj: any = {};
      if (adGroup.targeting.locations?.length) targetingObj.location_ids = adGroup.targeting.locations;
      if (adGroup.targeting.ageGroups?.length) targetingObj.age_groups = adGroup.targeting.ageGroups;
      if (adGroup.targeting.genders?.length) targetingObj.gender = adGroup.targeting.genders;
      if (adGroup.targeting.languages?.length) targetingObj.languages = adGroup.targeting.languages;
      if (adGroup.targeting.interests?.length) targetingObj.interest_category_ids = adGroup.targeting.interests;
      if (adGroup.targeting.behaviors?.length) targetingObj.action_category_ids = adGroup.targeting.behaviors;
      if (adGroup.targeting.operatingSystems?.length) targetingObj.operating_systems = adGroup.targeting.operatingSystems;

      const response = await fetch(`${this.BASE_URL}/adgroup/create/`, {
        method: 'POST',
        headers: {
          'Access-Token': this.credentials.accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          advertiser_id: advertiserId,
          campaign_id: adGroup.campaignId,
          adgroup_name: adGroup.name,
          budget: adGroup.budget,
          budget_mode: adGroup.budgetMode,
          schedule_start_time: adGroup.scheduleStartTime,
          schedule_end_time: adGroup.scheduleEndTime,
          placement_type: adGroup.placementType || 'PLACEMENT_TYPE_AUTOMATIC',
          bid_price: adGroup.bidPrice,
          optimization_goal: adGroup.optimizationGoal || 'CLICK',
          billing_event: 'CPC',
          targeting: targetingObj,
          operation_status: 'DISABLE',
        }),
      });

      const data = await response.json();

      if (data.code === 0 && data.data?.adgroup_id) {
        return { success: true, adGroupId: data.data.adgroup_id };
      }

      return { success: false, error: data.message || 'Failed to create ad group' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a TikTok ad creative
   */
  async createAd(advertiserId: string, ad: {
    adGroupId: string;
    name: string;
    adText: string;
    videoId?: string;
    imageIds?: string[];
    callToAction?: string;
    destinationUrl?: string;
    displayName?: string;
    profileImageUrl?: string;
  }): Promise<{ success: boolean; adId?: string; error?: string }> {
    try {
      const adBody: any = {
        advertiser_id: advertiserId,
        adgroup_id: ad.adGroupId,
        ad_name: ad.name,
        ad_text: ad.adText,
        call_to_action: ad.callToAction || 'LEARN_MORE',
        landing_page_url: ad.destinationUrl,
        display_name: ad.displayName,
        profile_image_url: ad.profileImageUrl,
        operation_status: 'DISABLE',
      };

      if (ad.videoId) {
        adBody.video_id = ad.videoId;
        adBody.ad_format = 'SINGLE_VIDEO';
      } else if (ad.imageIds?.length) {
        adBody.image_ids = ad.imageIds;
        adBody.ad_format = 'SINGLE_IMAGE';
      }

      const response = await fetch(`${this.BASE_URL}/ad/create/`, {
        method: 'POST',
        headers: {
          'Access-Token': this.credentials.accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adBody),
      });

      const data = await response.json();

      if (data.code === 0 && data.data?.ad_id) {
        return { success: true, adId: data.data.ad_id };
      }

      return { success: false, error: data.message || 'Failed to create ad' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Upload a video for use in TikTok ads
   */
  async uploadVideo(advertiserId: string, videoUrl: string, fileName: string): Promise<{ success: boolean; videoId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/file/video/ad/upload/`, {
        method: 'POST',
        headers: {
          'Access-Token': this.credentials.accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          advertiser_id: advertiserId,
          upload_type: 'UPLOAD_BY_URL',
          video_url: videoUrl,
          file_name: fileName,
        }),
      });

      const data = await response.json();

      if (data.code === 0 && data.data?.video_id) {
        return { success: true, videoId: data.data.video_id };
      }

      return { success: false, error: data.message || 'Failed to upload video' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get campaign analytics
   */
  async getCampaignAnalytics(advertiserId: string, campaignId: string, dateRange?: { startDate: string; endDate: string }): Promise<{
    impressions: number;
    clicks: number;
    spend: number;
    ctr: number;
    cpc: number;
    conversions: number;
    videoViews: number;
    reach: number;
  }> {
    try {
      const endDate = dateRange?.endDate || new Date().toISOString().split('T')[0];
      const startDate = dateRange?.startDate || (() => {
        const d = new Date();
        d.setDate(d.getDate() - 30);
        return d.toISOString().split('T')[0];
      })();

      const response = await fetch(`${this.BASE_URL}/report/integrated/get/`, {
        method: 'POST',
        headers: {
          'Access-Token': this.credentials.accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          advertiser_id: advertiserId,
          report_type: 'BASIC',
          data_level: 'AUCTION_CAMPAIGN',
          dimensions: ['campaign_id'],
          metrics: ['spend', 'impressions', 'clicks', 'ctr', 'cpc', 'conversion', 'video_play_actions', 'reach'],
          start_date: startDate,
          end_date: endDate,
          filters: [{ field_name: 'campaign_id', filter_type: 'IN', filter_value: JSON.stringify([campaignId]) }],
          page_size: 1,
        }),
      });

      const data = await response.json();
      const row = data.data?.list?.[0]?.metrics;

      return {
        impressions: parseInt(row?.impressions || '0'),
        clicks: parseInt(row?.clicks || '0'),
        spend: parseFloat(row?.spend || '0'),
        ctr: parseFloat(row?.ctr || '0'),
        cpc: parseFloat(row?.cpc || '0'),
        conversions: parseInt(row?.conversion || '0'),
        videoViews: parseInt(row?.video_play_actions || '0'),
        reach: parseInt(row?.reach || '0'),
      };
    } catch {
      return { impressions: 0, clicks: 0, spend: 0, ctr: 0, cpc: 0, conversions: 0, videoViews: 0, reach: 0 };
    }
  }

  async getAnalytics(postId: string): Promise<PlatformAnalytics> {
    return { impressions: 0, engagement: 0, clicks: 0 };
  }

  async validateCredentials(): Promise<boolean> {
    try {
      const response = await fetch(`${this.BASE_URL}/oauth2/advertiser/get/`, {
        method: 'GET',
        headers: { 'Access-Token': this.credentials.accessToken },
      });
      const data = await response.json();
      return data.code === 0;
    } catch {
      return false;
    }
  }

  async refreshToken(): Promise<void> {
    if (!this.credentials.refreshToken) return;

    try {
      const response = await fetch(`${this.BASE_URL}/oauth2/refresh_token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          app_id: process.env.TIKTOK_CLIENT_KEY || '',
          secret: process.env.TIKTOK_CLIENT_SECRET || '',
          refresh_token: this.credentials.refreshToken,
        }),
      });

      const data = await response.json();
      if (data.code === 0 && data.data?.access_token) {
        this.credentials.accessToken = data.data.access_token;
        if (data.data.refresh_token) {
          this.credentials.refreshToken = data.data.refresh_token;
        }
      }
    } catch (error) {
      console.error('[TikTok] Token refresh failed:', error);
    }
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 100,
      maxMediaCount: 1,
      supportsVideo: true,
      supportsMultipleImages: true,
      supportsScheduling: true,
      supportsHashtags: true,
      supportsLinks: true,
    };
  }
}
