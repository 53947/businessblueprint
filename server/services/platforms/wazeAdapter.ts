/**
 * Waze Ads Platform Adapter
 *
 * NOTE: Waze Ads are managed through Google Ads. Waze was acquired by Google
 * and all Waze advertising is handled via Google Ads campaigns with
 * Waze-specific placements and ad formats (Branded Pins, Promoted Search, Zero-Speed Takeover).
 *
 * This adapter is a thin wrapper around Google Ads API for Waze-specific campaign types.
 * It uses GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_ADS_DEVELOPER_TOKEN.
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

export class WazeAdapter extends BasePlatformAdapter {
  private readonly GOOGLE_ADS_URL = 'https://googleads.googleapis.com/v16';
  private readonly developerToken: string;

  constructor(credentials: PlatformCredentials) {
    super('waze', credentials);
    this.developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '';
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    return {
      success: false,
      error: 'Waze does not support organic content posting. Use Waze Ads through /amplify to create location-based ads.',
    };
  }

  /**
   * Create a Waze-targeted campaign via Google Ads
   * Waze ad formats: Branded Pins, Promoted Search, Zero-Speed Takeover
   */
  async createWazeCampaign(customerId: string, campaign: {
    name: string;
    adFormat: 'BRANDED_PIN' | 'PROMOTED_SEARCH' | 'ZERO_SPEED_TAKEOVER';
    dailyBudget: number;
    businessName: string;
    businessAddress: string;
    callToAction?: string;
    logoUrl?: string;
  }): Promise<{ success: boolean; campaignId?: string; error?: string }> {
    try {
      // Create campaign targeting Waze placements via Google Ads
      const response = await fetch(
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
                name: `[Waze] ${campaign.name}`,
                advertisingChannelType: 'DISPLAY',
                status: 'PAUSED',
                campaignBudget: {
                  amountMicros: Math.round(campaign.dailyBudget * 1000000).toString(),
                  deliveryMethod: 'STANDARD',
                },
                // Waze campaigns use local campaign type with drive-to-store objective
                localCampaignSetting: {
                  locationSourceType: 'GOOGLE_MY_BUSINESS',
                },
              },
            }],
          }),
        },
      );

      const data = await response.json();
      const resourceName = data.results?.[0]?.resourceName;

      if (resourceName) {
        const campaignId = resourceName.split('/').pop();
        return { success: true, campaignId };
      }

      return { success: false, error: data.error?.message || 'Failed to create Waze campaign' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a Branded Pin asset for Waze
   */
  async createBrandedPin(customerId: string, pin: {
    campaignId: string;
    businessName: string;
    description: string;
    logoUrl: string;
    offerText?: string;
    destinationUrl?: string;
  }): Promise<{ success: boolean; assetId?: string; error?: string }> {
    try {
      const response = await fetch(
        `${this.GOOGLE_ADS_URL}/customers/${customerId}/assets:mutate`,
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
                name: `Waze Pin - ${pin.businessName}`,
                type: 'IMAGE',
                imageAsset: {
                  data: pin.logoUrl,
                },
              },
            }],
          }),
        },
      );

      const data = await response.json();
      const resourceName = data.results?.[0]?.resourceName;

      if (resourceName) {
        return { success: true, assetId: resourceName.split('/').pop() };
      }

      return { success: false, error: data.error?.message || 'Failed to create branded pin' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get Waze campaign performance via Google Ads reporting
   */
  async getCampaignAnalytics(customerId: string, campaignId: string): Promise<{
    impressions: number;
    clicks: number;
    spend: number;
    navigations: number;
    calls: number;
  }> {
    try {
      const query = `
        SELECT
          campaign.id,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
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
      const row = data?.[0]?.results?.[0];

      return {
        impressions: parseInt(row?.metrics?.impressions || '0'),
        clicks: parseInt(row?.metrics?.clicks || '0'),
        spend: parseInt(row?.metrics?.costMicros || '0') / 1000000,
        navigations: parseInt(row?.metrics?.conversions || '0'),
        calls: 0,
      };
    } catch {
      return { impressions: 0, clicks: 0, spend: 0, navigations: 0, calls: 0 };
    }
  }

  async getAnalytics(postId: string): Promise<PlatformAnalytics> {
    return { impressions: 0, engagement: 0, clicks: 0 };
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
      console.error('[Waze/Google] Token refresh failed:', error);
    }
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 100,
      maxMediaCount: 1,
      supportsVideo: false,
      supportsMultipleImages: false,
      supportsScheduling: true,
      supportsHashtags: false,
      supportsLinks: true,
      requiresApproval: true,
    };
  }
}
