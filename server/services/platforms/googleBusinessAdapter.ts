/**
 * Google Business Profile Platform Adapter
 * Uses Google My Business API v4.9
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

interface LocalPostRequest {
  languageCode: string;
  summary: string;
  callToAction?: {
    actionType: 'LEARN_MORE' | 'BOOK' | 'ORDER' | 'SHOP' | 'SIGN_UP' | 'CALL';
    url?: string;
  };
  media?: Array<{
    mediaFormat: 'PHOTO' | 'VIDEO';
    sourceUrl: string;
  }>;
  topicType: 'STANDARD' | 'EVENT' | 'OFFER';
}

export class GoogleBusinessAdapter extends BasePlatformAdapter {
  private readonly BASE_URL = 'https://mybusiness.googleapis.com/v4';

  constructor(credentials: PlatformCredentials) {
    super('google_business', credentials);
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    try {
      const locationId = this.credentials.platformAccountId;
      if (!locationId) {
        return { success: false, error: 'Google Business Location ID not configured' };
      }

      const localPost: LocalPostRequest = {
        languageCode: 'en',
        summary: (post.text || '').substring(0, 1500),
        topicType: 'STANDARD',
      };

      if (post.link) {
        localPost.callToAction = {
          actionType: 'LEARN_MORE',
          url: post.link,
        };
      }

      if (post.mediaUrls && post.mediaUrls.length > 0) {
        localPost.media = post.mediaUrls.slice(0, 10).map(url => ({
          mediaFormat: url.includes('.mp4') || url.includes('video') ? 'VIDEO' : 'PHOTO',
          sourceUrl: url,
        }));
      }

      const url = `${this.BASE_URL}/${locationId}/localPosts`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localPost),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error?.message || 'Failed to publish to Google Business Profile',
        };
      }

      return {
        success: true,
        platformPostId: data.name,
        platformUrl: `https://business.google.com/posts/l/${locationId}`,
        publishedAt: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getAnalytics(platformPostId: string): Promise<PlatformAnalytics> {
    try {
      const url = `${this.BASE_URL}/${platformPostId}/insights`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
        },
      });

      const data = await response.json();

      return {
        impressions: data.searchesViewedOnMaps || 0,
        clicks: data.actionsPerformed?.WEBSITE || 0,
      };
    } catch (error) {
      console.error('[GoogleBusinessAdapter] Failed to fetch analytics:', error);
      return {};
    }
  }

  async validateCredentials(): Promise<boolean> {
    try {
      const url = `${this.BASE_URL}/accounts`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async refreshAccessToken(): Promise<PlatformCredentials> {
    if (!this.credentials.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const url = 'https://oauth2.googleapis.com/token';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.credentials.refreshToken,
          client_id: process.env.GOOGLE_CLIENT_ID || '',
          client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_description || 'Failed to refresh token');
      }

      return {
        accessToken: data.access_token,
        refreshToken: this.credentials.refreshToken,
        expiresAt: new Date(Date.now() + data.expires_in * 1000),
      };
    } catch (error) {
      throw error;
    }
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 1500,
      maxMediaCount: 10,
      supportsVideo: true,
      supportsMultipleImages: true,
      supportsScheduling: false,
      supportsHashtags: false,
      supportsLinks: true,
    };
  }

  async deletePost(platformPostId: string): Promise<boolean> {
    try {
      const url = `${this.BASE_URL}/${platformPostId}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
