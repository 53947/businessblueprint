/**
 * LinkedIn Platform Adapter
 * Uses LinkedIn Share API v2
 */

import {
  BasePlatformAdapter,
  PlatformPost,
  PublishResult,
  PlatformAnalytics,
  PlatformCredentials,
  PlatformCapabilities,
} from './basePlatformAdapter';

interface LinkedInShareRequest {
  author: string;
  lifecycleState: 'PUBLISHED' | 'DRAFT';
  specificContent: {
    'com.linkedin.ugc.ShareContent': {
      shareCommentary: {
        text: string;
      };
      shareMediaCategory: 'NONE' | 'IMAGE' | 'VIDEO' | 'ARTICLE';
      media?: Array<{
        status: 'READY';
        description?: {
          text: string;
        };
        media: string;
        title?: {
          text: string;
        };
      }>;
    };
  };
  visibility: {
    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' | 'CONNECTIONS';
  };
}

export class LinkedInAdapter extends BasePlatformAdapter {
  private readonly BASE_URL = 'https://api.linkedin.com/v2';

  constructor(credentials: PlatformCredentials) {
    super('linkedin', credentials);
  }

  async publish(post: PlatformPost): Promise<PublishResult> {
    try {
      const personUrn = this.credentials.platformAccountId || `urn:li:person:${this.credentials.accountId}`;

      const shareRequest: LinkedInShareRequest = {
        author: personUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: [post.text, ...(post.hashtags || [])].filter(Boolean).join(' '),
            },
            shareMediaCategory: 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      };

      if (post.mediaUrls && post.mediaUrls.length > 0) {
        shareRequest.specificContent['com.linkedin.ugc.ShareContent'].shareMediaCategory = 'IMAGE';
        
        const mediaUrns = await this.uploadMedia(post.mediaUrls, personUrn);
        
        shareRequest.specificContent['com.linkedin.ugc.ShareContent'].media = mediaUrns.map(urn => ({
          status: 'READY' as const,
          media: urn,
        }));
      } else if (post.link) {
        shareRequest.specificContent['com.linkedin.ugc.ShareContent'].shareMediaCategory = 'ARTICLE';
      }

      const url = `${this.BASE_URL}/ugcPosts`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
        body: JSON.stringify(shareRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Failed to publish to LinkedIn',
        };
      }

      const postId = data.id;

      return {
        success: true,
        platformPostId: postId,
        platformUrl: `https://www.linkedin.com/feed/update/${postId}`,
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
      const url = `${this.BASE_URL}/socialActions/${platformPostId}/statistics`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.credentials.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      });

      const data = await response.json();

      return {
        impressions: data.impressionCount || 0,
        engagement: data.engagementCount || 0,
        clicks: data.clickCount || 0,
        likes: data.likeCount || 0,
        comments: data.commentCount || 0,
        shares: data.shareCount || 0,
      };
    } catch (error) {
      console.error('[LinkedInAdapter] Failed to fetch analytics:', error);
      return {};
    }
  }

  async validateCredentials(): Promise<boolean> {
    try {
      const url = `${this.BASE_URL}/me`;
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
      const url = 'https://www.linkedin.com/oauth/v2/accessToken';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.credentials.refreshToken,
          client_id: process.env.LINKEDIN_CLIENT_ID || '',
          client_secret: process.env.LINKEDIN_CLIENT_SECRET || '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_description || 'Failed to refresh token');
      }

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || this.credentials.refreshToken,
        expiresAt: new Date(Date.now() + data.expires_in * 1000),
      };
    } catch (error) {
      throw error;
    }
  }

  getCapabilities(): PlatformCapabilities {
    return {
      maxTextLength: 3000,
      maxMediaCount: 9,
      supportsVideo: true,
      supportsMultipleImages: true,
      supportsScheduling: false,
      supportsHashtags: true,
      supportsLinks: true,
    };
  }

  async deletePost(platformPostId: string): Promise<boolean> {
    try {
      const url = `${this.BASE_URL}/ugcPosts/${platformPostId}`;
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

  private async uploadMedia(mediaUrls: string[], personUrn: string): Promise<string[]> {
    const mediaUrns: string[] = [];

    for (const mediaUrl of mediaUrls) {
      try {
        const registerUrl = `${this.BASE_URL}/assets?action=registerUpload`;
        const registerResponse = await fetch(registerUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.credentials.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            registerUploadRequest: {
              recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
              owner: personUrn,
              serviceRelationships: [
                {
                  relationshipType: 'OWNER',
                  identifier: 'urn:li:userGeneratedContent',
                },
              ],
            },
          }),
        });

        const registerData = await registerResponse.json();
        
        const uploadUrl = registerData.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
        const asset = registerData.value.asset;

        const mediaResponse = await fetch(mediaUrl);
        const mediaBuffer = await mediaResponse.arrayBuffer();

        await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.credentials.accessToken}`,
          },
          body: mediaBuffer,
        });

        mediaUrns.push(asset);
      } catch (error) {
        console.error('[LinkedInAdapter] Failed to upload media:', error);
      }
    }

    return mediaUrns;
  }
}
