/**
 * X (Twitter) Platform Adapter
 * Uses X API v2
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

interface TweetRequest {
  text: string;
  media?: {
    media_ids: string[];
  };
  reply_settings?: 'everyone' | 'mentionedUsers' | 'following';
}

export class XAdapter extends BasePlatformAdapter {
  private readonly BASE_URL = 'https://api.twitter.com/2';

  constructor(credentials: PlatformCredentials) {
    super('x', credentials);
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    try {
      let tweetText = post.text || '';
      
      if (post.hashtags && post.hashtags.length > 0) {
        tweetText += ' ' + post.hashtags.join(' ');
      }

      if (post.link && !tweetText.includes(post.link)) {
        tweetText += ' ' + post.link;
      }

      const tweetRequest: TweetRequest = {
        text: tweetText.trim().substring(0, 280),
      };

      if (post.mediaUrls && post.mediaUrls.length > 0) {
        const mediaIds = await this.uploadMedia(post.mediaUrls);
        if (mediaIds.length > 0) {
          tweetRequest.media = {
            media_ids: mediaIds,
          };
        }
      }

      const url = `${this.BASE_URL}/tweets`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tweetRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.detail || data.title || 'Failed to publish to X',
        };
      }

      return {
        success: true,
        platformPostId: data.data.id,
        platformUrl: `https://twitter.com/i/web/status/${data.data.id}`,
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
      const url = `${this.BASE_URL}/tweets/${platformPostId}?tweet.fields=public_metrics`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
        },
      });

      const data = await response.json();
      const metrics = data.data?.public_metrics || {};

      return {
        impressions: metrics.impression_count || 0,
        likes: metrics.like_count || 0,
        comments: metrics.reply_count || 0,
        shares: metrics.retweet_count || 0,
        engagement: (metrics.like_count || 0) + (metrics.reply_count || 0) + (metrics.retweet_count || 0),
      };
    } catch (error) {
      console.error('[XAdapter] Failed to fetch analytics:', error);
      return {};
    }
  }

  async validateCredentials(): Promise<boolean> {
    try {
      const url = `${this.BASE_URL}/users/me`;
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

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 280,
      maxMediaCount: 4,
      supportsVideo: true,
      supportsMultipleImages: true,
      supportsScheduling: false,
      supportsHashtags: true,
      supportsLinks: true,
    };
  }

  async deletePost(platformPostId: string): Promise<boolean> {
    try {
      const url = `${this.BASE_URL}/tweets/${platformPostId}`;
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

  private async uploadMedia(mediaUrls: string[]): Promise<string[]> {
    const UPLOAD_URL = 'https://upload.twitter.com/1.1/media/upload.json';
    const mediaIds: string[] = [];

    for (const mediaUrl of mediaUrls.slice(0, 4)) {
      try {
        const mediaResponse = await fetch(mediaUrl);
        const mediaBuffer = await mediaResponse.arrayBuffer();
        const mediaBase64 = Buffer.from(mediaBuffer).toString('base64');

        const formData = new URLSearchParams();
        formData.append('media_data', mediaBase64);

        const uploadResponse = await fetch(UPLOAD_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.credentials.accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (uploadData.media_id_string) {
          mediaIds.push(uploadData.media_id_string);
        }
      } catch (error) {
        console.error('[XAdapter] Failed to upload media:', error);
      }
    }

    return mediaIds;
  }
}
