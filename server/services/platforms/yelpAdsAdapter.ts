/**
 * Yelp Ads Platform Adapter
 * Uses Yelp Fusion API + Yelp Ads API
 * Note: Uses YELP_API_KEY (already configured in the project)
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

export class YelpAdsAdapter extends BasePlatformAdapter {
  private readonly BASE_URL = 'https://api.yelp.com/v3';
  private readonly ADS_URL = 'https://api.yelp.com/v3/ads';
  private readonly apiKey: string;

  constructor(credentials: PlatformCredentials) {
    super('yelp', credentials);
    this.apiKey = process.env.YELP_API_KEY || credentials.accessToken;
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    // Yelp does not support organic posting via API
    return {
      success: false,
      error: 'Yelp does not support organic posting. Use Yelp Ads through /amplify to promote your business.',
    };
  }

  /**
   * Create a Yelp Ad program for a business
   */
  async createAdProgram(businessId: string, program: {
    dailyBudget: number;
    adText?: string;
    photoUrl?: string;
  }): Promise<{ success: boolean; programId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.ADS_URL}/programs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business_id: businessId,
          daily_budget: program.dailyBudget,
          ad_text: program.adText,
          photo_url: program.photoUrl,
          status: 'PAUSED',
        }),
      });

      const data = await response.json();

      if (data.id) {
        return { success: true, programId: data.id };
      }

      return { success: false, error: data.error?.description || 'Failed to create ad program' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Update a Yelp Ad program budget or status
   */
  async updateAdProgram(programId: string, updates: {
    dailyBudget?: number;
    status?: 'ACTIVE' | 'PAUSED';
    adText?: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.ADS_URL}/programs/${programId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          daily_budget: updates.dailyBudget,
          status: updates.status,
          ad_text: updates.adText,
        }),
      });

      const data = await response.json();
      return { success: response.ok, error: data.error?.description };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get Yelp Ad program performance
   */
  async getAdProgramAnalytics(programId: string): Promise<{
    impressions: number;
    clicks: number;
    spend: number;
    ctr: number;
    leads: number;
  }> {
    try {
      const response = await fetch(`${this.ADS_URL}/programs/${programId}/analytics`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
      });

      const data = await response.json();

      return {
        impressions: data.impressions || 0,
        clicks: data.clicks || 0,
        spend: data.spend || 0,
        ctr: data.ctr || 0,
        leads: data.leads || 0,
      };
    } catch {
      return { impressions: 0, clicks: 0, spend: 0, ctr: 0, leads: 0 };
    }
  }

  /**
   * Search for the business on Yelp to get the business ID
   */
  async searchBusiness(name: string, location: string): Promise<{ businessId?: string; name?: string; error?: string }> {
    try {
      const params = new URLSearchParams({ term: name, location, limit: '1' });
      const response = await fetch(`${this.BASE_URL}/businesses/search?${params}`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
      });

      const data = await response.json();
      const business = data.businesses?.[0];

      if (business) {
        return { businessId: business.id, name: business.name };
      }

      return { error: 'Business not found on Yelp' };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async getAnalytics(postId: string): Promise<PlatformAnalytics> {
    // Yelp doesn't have post-level analytics — use ad program analytics instead
    return { impressions: 0, engagement: 0, clicks: 0 };
  }

  async validateCredentials(): Promise<boolean> {
    try {
      const response = await fetch(`${this.BASE_URL}/businesses/search?term=test&location=NYC&limit=1`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async refreshToken(): Promise<void> {
    // Yelp uses API keys, no token refresh needed
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 500,
      maxMediaCount: 1,
      supportsVideo: false,
      supportsMultipleImages: false,
      supportsScheduling: false,
      supportsHashtags: false,
      supportsLinks: false,
      requiresApproval: true,
    };
  }
}
