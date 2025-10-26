/**
 * Base Platform Adapter Interface
 * Defines the contract that all social media platform integrations must implement
 */

export interface PlatformPost {
  text?: string;
  mediaUrls?: string[];
  scheduledTime?: Date;
  link?: string;
  hashtags?: string[];
}

export interface PublishResult {
  success: boolean;
  platformPostId?: string;
  platformUrl?: string;
  error?: string;
  publishedAt?: Date;
}

export interface PlatformAnalytics {
  impressions?: number;
  engagement?: number;
  clicks?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
}

export interface PlatformCredentials {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  accountId?: string;
  platformAccountId?: string;
}

export interface PlatformCapabilities {
  maxTextLength: number;
  maxMediaCount: number;
  supportsVideo: boolean;
  supportsMultipleImages: boolean;
  supportsScheduling: boolean;
  supportsHashtags: boolean;
  supportsLinks: boolean;
  requiresApproval?: boolean;
}

export abstract class BasePlatformAdapter {
  protected platform: string;
  protected credentials: PlatformCredentials;

  constructor(platform: string, credentials: PlatformCredentials) {
    this.platform = platform;
    this.credentials = credentials;
  }

  /**
   * Publish a post to the platform
   */
  abstract publish(post: PlatformPost): Promise<PublishResult>;

  /**
   * Get analytics for a post
   */
  abstract getAnalytics(platformPostId: string): Promise<PlatformAnalytics>;

  /**
   * Validate that credentials are still valid
   */
  abstract validateCredentials(): Promise<boolean>;

  /**
   * Refresh access token if needed
   */
  async refreshAccessToken(): Promise<PlatformCredentials> {
    throw new Error(`${this.platform} does not support token refresh`);
  }

  /**
   * Get platform-specific capabilities
   */
  abstract getCapabilities(): PlatformCapabilities;

  /**
   * Delete a post from the platform
   */
  async deletePost(platformPostId: string): Promise<boolean> {
    throw new Error(`${this.platform} does not support post deletion`);
  }

  /**
   * Update a post on the platform (if supported)
   */
  async updatePost(platformPostId: string, post: PlatformPost): Promise<PublishResult> {
    throw new Error(`${this.platform} does not support post updates`);
  }
}
