/**
 * Snapchat Ads Platform Adapter
 * Uses Snapchat Marketing API v1
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

export class SnapchatAdapter extends BasePlatformAdapter {
  private readonly BASE_URL = 'https://adsapi.snapchat.com/v1';

  constructor(credentials: PlatformCredentials) {
    super('snapchat', credentials);
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    try {
      // Snapchat ads require a creative + ad setup
      // This creates an organic story post if the account supports it
      // For ads, use the / amplify flow instead

      return {
        success: false,
        error: 'Snapchat publishing requires ad campaign setup through / amplify. Organic posting is not available via API.',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to publish to Snapchat',
      };
    }
  }

  /**
   * Create a Snapchat ad creative
   */
  async createCreative(adAccountId: string, creative: {
    name: string;
    type: 'SNAP_AD' | 'STORY' | 'LENS' | 'FILTER';
    headline: string;
    brandName: string;
    mediaUrl?: string;
    callToAction?: string;
    websiteUrl?: string;
  }): Promise<{ success: boolean; creativeId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.BASE_URL}/adaccounts/${adAccountId}/creatives`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creatives: [{
            ad_account_id: adAccountId,
            name: creative.name,
            type: creative.type,
            headline: creative.headline,
            brand_name: creative.brandName,
            top_snap_media_id: creative.mediaUrl,
            call_to_action: creative.callToAction || 'VIEW_WEBSITE',
            shareable: true,
          }],
        }),
      });

      const data = await response.json();
      const creativeResult = data.creatives?.[0]?.creative;

      if (creativeResult?.id) {
        return { success: true, creativeId: creativeResult.id };
      }

      return { success: false, error: data.request_status || 'Failed to create creative' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async getAnalytics(postId: string): Promise<PlatformAnalytics> {
    return {
      impressions: 0,
      engagement: 0,
      clicks: 0,
      likes: 0,
      shares: 0,
    };
  }

  async refreshToken(): Promise<void> {
    if (!this.credentials.refreshToken) return;

    try {
      const response = await fetch('https://accounts.snapchat.com/login/oauth2/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.SNAP_CLIENT_ID || '',
          client_secret: process.env.SNAP_CLIENT_SECRET || '',
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
      console.error('[Snapchat] Token refresh failed:', error);
    }
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 34, // Snap ad headline limit
      maxMediaCount: 1,
      supportsVideo: true,
      supportsMultipleImages: false,
      supportsScheduling: true,
      supportsHashtags: false,
      supportsLinks: true,
    };
  }
}
