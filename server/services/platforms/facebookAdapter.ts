/**
 * Facebook & Instagram Platform Adapter
 * Uses Meta Graph API for both Facebook Pages and Instagram Business accounts
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

interface FacebookPagePost {
  message?: string;
  link?: string;
  attached_media?: Array<{ media_fbid: string }>;
  published?: boolean;
  scheduled_publish_time?: number;
}

interface InstagramMediaObject {
  image_url?: string;
  video_url?: string;
  caption?: string;
  media_type?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
}

export class FacebookAdapter extends BasePlatformAdapter {
  private readonly API_VERSION = 'v18.0';
  private readonly BASE_URL = `https://graph.facebook.com/${this.API_VERSION}`;

  constructor(credentials: PlatformCredentials) {
    super('facebook', credentials);
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    try {
      const pageId = this.credentials.platformAccountId;
      if (!pageId) {
        return { success: false, error: 'Facebook Page ID not configured' };
      }

      const postData: FacebookPagePost = {
        message: post.text,
        link: post.link,
        published: !post.scheduledTime,
      };

      if (post.scheduledTime) {
        postData.scheduled_publish_time = Math.floor(post.scheduledTime.getTime() / 1000);
      }

      if (post.mediaUrls && post.mediaUrls.length > 0) {
        const mediaIds = await this.uploadMedia(post.mediaUrls);
        postData.attached_media = mediaIds.map(id => ({ media_fbid: id }));
      }

      const url = `${this.BASE_URL}/${pageId}/feed`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...postData,
          access_token: this.credentials.accessToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error?.message || 'Failed to publish to Facebook',
        };
      }

      return {
        success: true,
        platformPostId: data.id,
        platformUrl: `https://facebook.com/${data.id}`,
        publishedAt: post.scheduledTime || new Date(),
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
      const url = `${this.BASE_URL}/${platformPostId}?fields=insights.metric(post_impressions,post_engaged_users,post_clicks,post_reactions_like_total)&access_token=${this.credentials.accessToken}`;
      const response = await fetch(url);
      const data = await response.json();

      const insights = data.insights?.data || [];
      const metricsMap = new Map(insights.map((i: any) => [i.name, i.values[0]?.value || 0]));

      return {
        impressions: (metricsMap.get('post_impressions') as number) || 0,
        engagement: (metricsMap.get('post_engaged_users') as number) || 0,
        clicks: (metricsMap.get('post_clicks') as number) || 0,
        likes: (metricsMap.get('post_reactions_like_total') as number) || 0,
      };
    } catch (error) {
      console.error('[FacebookAdapter] Failed to fetch analytics:', error);
      return {};
    }
  }

  async validateCredentials(): Promise<boolean> {
    try {
      const url = `${this.BASE_URL}/me?access_token=${this.credentials.accessToken}`;
      const response = await fetch(url);
      return response.ok;
    } catch {
      return false;
    }
  }

  async refreshAccessToken(): Promise<PlatformCredentials> {
    throw new Error('Facebook uses long-lived tokens. Implement OAuth flow for refresh.');
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 63206,
      maxMediaCount: 10,
      supportsVideo: true,
      supportsMultipleImages: true,
      supportsScheduling: true,
      supportsHashtags: true,
      supportsLinks: true,
    };
  }

  async deletePost(platformPostId: string): Promise<boolean> {
    try {
      const url = `${this.BASE_URL}/${platformPostId}?access_token=${this.credentials.accessToken}`;
      const response = await fetch(url, { method: 'DELETE' });
      return response.ok;
    } catch {
      return false;
    }
  }

  private async uploadMedia(mediaUrls: string[]): Promise<string[]> {
    const pageId = this.credentials.platformAccountId!;
    const mediaIds: string[] = [];
    const uploadErrors: string[] = [];

    for (const mediaUrl of mediaUrls) {
      try {
        const isVideo = this.isVideoUrl(mediaUrl);
        const endpoint = isVideo ? 'videos' : 'photos';
        const url = `${this.BASE_URL}/${pageId}/${endpoint}`;
        
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            [isVideo ? 'file_url' : 'url']: mediaUrl,
            published: false,
            access_token: this.credentials.accessToken,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          const errorMsg = `Failed to upload ${endpoint}: ${data.error?.message || JSON.stringify(data)}`;
          console.error(`[FacebookAdapter] ${errorMsg}`);
          uploadErrors.push(errorMsg);
          continue;
        }
        
        if (data.id) {
          mediaIds.push(data.id);
        }
      } catch (error) {
        const errorMsg = `Upload exception: ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.error('[FacebookAdapter]', errorMsg);
        uploadErrors.push(errorMsg);
      }
    }

    if (uploadErrors.length > 0 && mediaIds.length === 0) {
      throw new Error(`All media uploads failed: ${uploadErrors.join('; ')}`);
    }

    if (uploadErrors.length > 0) {
      console.warn(`[FacebookAdapter] Some media uploads failed (${uploadErrors.length}/${mediaUrls.length}): ${uploadErrors.join('; ')}`);
    }

    return mediaIds;
  }

  private isVideoUrl(url: string): boolean {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.webm'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.includes(ext)) || lowerUrl.includes('video');
  }
}

export class InstagramAdapter extends BasePlatformAdapter {
  private readonly API_VERSION = 'v18.0';
  private readonly BASE_URL = `https://graph.facebook.com/${this.API_VERSION}`;

  constructor(credentials: PlatformCredentials) {
    super('instagram', credentials);
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    try {
      const igAccountId = this.credentials.platformAccountId;
      if (!igAccountId) {
        return { success: false, error: 'Instagram Business Account ID not configured' };
      }

      const mediaObject: InstagramMediaObject = {
        caption: [post.text, ...(post.hashtags || [])].filter(Boolean).join(' '),
      };

      if (post.mediaUrls && post.mediaUrls.length > 0) {
        if (post.mediaUrls.length === 1) {
          const isVideo = post.mediaUrls[0].includes('.mp4') || post.mediaUrls[0].includes('video');
          mediaObject.media_type = isVideo ? 'VIDEO' : 'IMAGE';
          if (isVideo) {
            mediaObject.video_url = post.mediaUrls[0];
          } else {
            mediaObject.image_url = post.mediaUrls[0];
          }
        } else {
          mediaObject.media_type = 'CAROUSEL_ALBUM';
        }
      }

      const containerUrl = `${this.BASE_URL}/${igAccountId}/media`;
      const containerResponse = await fetch(containerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...mediaObject,
          access_token: this.credentials.accessToken,
        }),
      });

      const containerData = await containerResponse.json();

      if (!containerResponse.ok) {
        return {
          success: false,
          error: containerData.error?.message || 'Failed to create Instagram media container',
        };
      }

      const publishUrl = `${this.BASE_URL}/${igAccountId}/media_publish`;
      const publishResponse = await fetch(publishUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creation_id: containerData.id,
          access_token: this.credentials.accessToken,
        }),
      });

      const publishData = await publishResponse.json();

      if (!publishResponse.ok) {
        return {
          success: false,
          error: publishData.error?.message || 'Failed to publish to Instagram',
        };
      }

      return {
        success: true,
        platformPostId: publishData.id,
        platformUrl: `https://instagram.com/p/${publishData.id}`,
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
      const url = `${this.BASE_URL}/${platformPostId}/insights?metric=impressions,engagement,reach,saved,likes,comments&access_token=${this.credentials.accessToken}`;
      const response = await fetch(url);
      const data = await response.json();

      const metrics = data.data || [];
      const metricsMap = new Map(metrics.map((m: any) => [m.name, m.values[0]?.value || 0]));

      return {
        impressions: (metricsMap.get('impressions') as number) || 0,
        engagement: (metricsMap.get('engagement') as number) || 0,
        likes: (metricsMap.get('likes') as number) || 0,
        comments: (metricsMap.get('comments') as number) || 0,
        saves: (metricsMap.get('saved') as number) || 0,
      };
    } catch (error) {
      console.error('[InstagramAdapter] Failed to fetch analytics:', error);
      return {};
    }
  }

  async validateCredentials(): Promise<boolean> {
    try {
      const url = `${this.BASE_URL}/${this.credentials.platformAccountId}?fields=id&access_token=${this.credentials.accessToken}`;
      const response = await fetch(url);
      return response.ok;
    } catch {
      return false;
    }
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 2200,
      maxMediaCount: 10,
      supportsVideo: true,
      supportsMultipleImages: true,
      supportsScheduling: false,
      supportsHashtags: true,
      supportsLinks: false,
    };
  }

  async deletePost(platformPostId: string): Promise<boolean> {
    try {
      const url = `${this.BASE_URL}/${platformPostId}?access_token=${this.credentials.accessToken}`;
      const response = await fetch(url, { method: 'DELETE' });
      return response.ok;
    } catch {
      return false;
    }
  }
}
