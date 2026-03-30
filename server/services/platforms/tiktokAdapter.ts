/**
 * TikTok Platform Adapter
 * Uses TikTok Content Posting API v2
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

export class TikTokAdapter extends BasePlatformAdapter {
  private readonly BASE_URL = 'https://open.tiktokapis.com/v2';

  constructor(credentials: PlatformCredentials) {
    super('tiktok', credentials);
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    try {
      // TikTok requires video content — text-only posts are not supported
      if (!post.mediaUrls || post.mediaUrls.length === 0) {
        return {
          success: false,
          error: 'TikTok requires video or photo content. Text-only posts are not supported.',
        };
      }

      const mediaUrl = post.mediaUrls[0];
      const caption = [post.text || '', ...(post.hashtags || [])].join(' ').trim();

      // Step 1: Initialize upload
      const initResponse = await fetch(`${this.BASE_URL}/post/publish/video/init/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_info: {
            title: caption.substring(0, 150),
            privacy_level: 'PUBLIC_TO_EVERYONE',
            disable_comment: false,
            auto_add_music: true,
          },
          source_info: {
            source: 'PULL_FROM_URL',
            video_url: mediaUrl,
          },
        }),
      });

      const initData = await initResponse.json();

      if (initData.error?.code) {
        return {
          success: false,
          error: initData.error.message || `TikTok API error: ${initData.error.code}`,
        };
      }

      const publishId = initData.data?.publish_id;

      return {
        success: true,
        platformPostId: publishId,
        publishedAt: new Date(),
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to publish to TikTok',
      };
    }
  }

  async getAnalytics(postId: string): Promise<PlatformAnalytics> {
    // TikTok analytics require additional scopes — return empty for now
    return {
      impressions: 0,
      engagement: 0,
      likes: 0,
      comments: 0,
      shares: 0,
    };
  }

  async refreshToken(): Promise<void> {
    if (!this.credentials.refreshToken) return;

    try {
      const response = await fetch(`${this.BASE_URL}/oauth/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_key: process.env.TIKTOK_CLIENT_KEY || '',
          client_secret: process.env.TIKTOK_CLIENT_SECRET || '',
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
      console.error('[TikTok] Token refresh failed:', error);
    }
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 2200,
      maxMediaCount: 1,
      supportsVideo: true,
      supportsMultipleImages: false,
      supportsScheduling: false,
      supportsHashtags: true,
      supportsLinks: false,
      requiresApproval: true,
    };
  }
}
