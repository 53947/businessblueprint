/**
 * Spotify Ads Platform Adapter
 * Uses Spotify Ads API v1
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

export class SpotifyAdapter extends BasePlatformAdapter {
  private readonly ADS_URL = 'https://ads-api.spotify.com/v1';

  constructor(credentials: PlatformCredentials) {
    super('spotify', credentials);
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    return {
      success: false,
      error: 'Spotify does not support organic content posting. Use Spotify Ads through /amplify for audio and display ads.',
    };
  }

  /**
   * Create a Spotify ad campaign
   */
  async createCampaign(adAccountId: string, campaign: {
    name: string;
    objective: 'AWARENESS' | 'REACH' | 'IMPRESSIONS';
    totalBudget: number;
    startDate: string;
    endDate: string;
  }): Promise<{ success: boolean; campaignId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.ADS_URL}/ad_accounts/${adAccountId}/campaigns`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: campaign.name,
          objective: campaign.objective,
          total_budget: campaign.totalBudget,
          start_date: campaign.startDate,
          end_date: campaign.endDate,
          status: 'PAUSED',
        }),
      });

      const data = await response.json();

      if (data.id) {
        return { success: true, campaignId: data.id };
      }

      return { success: false, error: data.error?.message || 'Failed to create campaign' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create an ad set with audience targeting
   */
  async createAdSet(adAccountId: string, adSet: {
    campaignId: string;
    name: string;
    budget: number;
    targeting: {
      ageMin?: number;
      ageMax?: number;
      genders?: string[];
      genres?: string[];
      locations?: string[];
      platforms?: ('MOBILE' | 'DESKTOP')[];
      listeningContexts?: ('MUSIC' | 'PODCASTS')[];
    };
  }): Promise<{ success: boolean; adSetId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.ADS_URL}/ad_accounts/${adAccountId}/ad_sets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaign_id: adSet.campaignId,
          name: adSet.name,
          budget: adSet.budget,
          targeting: {
            age_min: adSet.targeting.ageMin || 18,
            age_max: adSet.targeting.ageMax || 65,
            genders: adSet.targeting.genders,
            genre_ids: adSet.targeting.genres,
            geo_locations: adSet.targeting.locations,
            platforms: adSet.targeting.platforms,
            listening_contexts: adSet.targeting.listeningContexts,
          },
          status: 'PAUSED',
        }),
      });

      const data = await response.json();

      if (data.id) {
        return { success: true, adSetId: data.id };
      }

      return { success: false, error: data.error?.message || 'Failed to create ad set' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a Spotify ad creative (audio or display)
   */
  async createCreative(adAccountId: string, creative: {
    adSetId: string;
    name: string;
    format: 'AUDIO' | 'VIDEO' | 'DISPLAY' | 'PODCAST';
    headline?: string;
    description?: string;
    audioUrl?: string;
    imageUrl?: string;
    companionImageUrl?: string;
    clickThroughUrl?: string;
    callToAction?: string;
  }): Promise<{ success: boolean; creativeId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.ADS_URL}/ad_accounts/${adAccountId}/ads`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ad_set_id: creative.adSetId,
          name: creative.name,
          format: creative.format,
          headline: creative.headline,
          description: creative.description,
          audio_url: creative.audioUrl,
          image_url: creative.imageUrl,
          companion_image_url: creative.companionImageUrl,
          click_through_url: creative.clickThroughUrl,
          call_to_action: creative.callToAction || 'LEARN_MORE',
          status: 'PAUSED',
        }),
      });

      const data = await response.json();

      if (data.id) {
        return { success: true, creativeId: data.id };
      }

      return { success: false, error: data.error?.message || 'Failed to create ad creative' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get campaign performance metrics
   */
  async getCampaignAnalytics(adAccountId: string, campaignId: string): Promise<{
    impressions: number;
    listens: number;
    completionRate: number;
    clicks: number;
    spend: number;
    reach: number;
    frequency: number;
  }> {
    try {
      const response = await fetch(
        `${this.ADS_URL}/ad_accounts/${adAccountId}/campaigns/${campaignId}/analytics`,
        { headers: { 'Authorization': `Bearer ${this.credentials.accessToken}` } },
      );

      const data = await response.json();

      return {
        impressions: data.impressions || 0,
        listens: data.listens || 0,
        completionRate: data.completion_rate || 0,
        clicks: data.clicks || 0,
        spend: data.spend || 0,
        reach: data.reach || 0,
        frequency: data.frequency || 0,
      };
    } catch {
      return { impressions: 0, listens: 0, completionRate: 0, clicks: 0, spend: 0, reach: 0, frequency: 0 };
    }
  }

  async getAnalytics(postId: string): Promise<PlatformAnalytics> {
    return { impressions: 0, engagement: 0, clicks: 0 };
  }

  async validateCredentials(): Promise<boolean> {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
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
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64');

      const response = await fetch('https://accounts.spotify.com/api/token', {
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
      console.error('[Spotify] Token refresh failed:', error);
    }
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 150,
      maxMediaCount: 1,
      supportsVideo: true,
      supportsMultipleImages: false,
      supportsScheduling: true,
      supportsHashtags: false,
      supportsLinks: true,
      requiresApproval: true,
    };
  }
}
