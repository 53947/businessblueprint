/**
 * Platform Adapter Factory
 * Creates the appropriate platform adapter based on platform type
 */

import { BasePlatformAdapter, PlatformCredentials } from './basePlatformAdapter';
import { FacebookAdapter, InstagramAdapter } from './facebookAdapter';
import { LinkedInAdapter } from './linkedinAdapter';
import { XAdapter } from './xAdapter';
import { GoogleBusinessAdapter } from './googleBusinessAdapter';

export type SupportedPlatform = 
  | 'facebook' 
  | 'instagram' 
  | 'linkedin' 
  | 'x' 
  | 'google_business'
  | 'tiktok'
  | 'snapchat';

export class PlatformFactory {
  /**
   * Create a platform adapter instance
   */
  static createAdapter(
    platform: SupportedPlatform,
    credentials: PlatformCredentials
  ): BasePlatformAdapter {
    switch (platform) {
      case 'facebook':
        return new FacebookAdapter(credentials);
      
      case 'instagram':
        return new InstagramAdapter(credentials);
      
      case 'linkedin':
        return new LinkedInAdapter(credentials);
      
      case 'x':
        return new XAdapter(credentials);
      
      case 'google_business':
        return new GoogleBusinessAdapter(credentials);
      
      case 'tiktok':
      case 'snapchat':
        throw new Error(`${platform} integration coming in Phase 2`);
      
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  /**
   * Get list of supported platforms for a subscription tier
   */
  static getSupportedPlatforms(tier: 'diy' | 'msp'): SupportedPlatform[] {
    const phase1Platforms: SupportedPlatform[] = [
      'facebook',
      'instagram',
      'linkedin',
      'x',
      'google_business',
    ];

    const maxPlatforms = tier === 'diy' ? 3 : 7;

    return phase1Platforms.slice(0, maxPlatforms);
  }

  /**
   * Validate platform credentials
   */
  static async validateCredentials(
    platform: SupportedPlatform,
    credentials: PlatformCredentials
  ): Promise<boolean> {
    try {
      const adapter = PlatformFactory.createAdapter(platform, credentials);
      return await adapter.validateCredentials();
    } catch (error) {
      console.error(`[PlatformFactory] Failed to validate ${platform} credentials:`, error);
      return false;
    }
  }

  /**
   * Check if a platform is available (Phase 1 vs Phase 2)
   */
  static isPlatformAvailable(platform: SupportedPlatform): boolean {
    const phase1Platforms: SupportedPlatform[] = [
      'facebook',
      'instagram',
      'linkedin',
      'x',
      'google_business',
    ];

    return phase1Platforms.includes(platform);
  }

  /**
   * Get platform display name
   */
  static getPlatformDisplayName(platform: SupportedPlatform): string {
    const displayNames: Record<SupportedPlatform, string> = {
      facebook: 'Facebook',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      x: 'X (Twitter)',
      google_business: 'Google Business Profile',
      tiktok: 'TikTok',
      snapchat: 'Snapchat',
    };

    return displayNames[platform] || platform;
  }
}

/**
 * Platform-specific OAuth configuration
 */
export const PLATFORM_OAUTH_CONFIG = {
  facebook: {
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    scopes: ['pages_manage_posts', 'pages_read_engagement', 'pages_show_list'],
  },
  instagram: {
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    scopes: ['instagram_basic', 'instagram_content_publish', 'pages_show_list'],
  },
  linkedin: {
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    scopes: ['w_member_social', 'r_basicprofile'],
  },
  x: {
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    tokenUrl: 'https://api.twitter.com/2/oauth2/token',
    scopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
  },
  google_business: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: [
      'https://www.googleapis.com/auth/business.manage',
      'https://www.googleapis.com/auth/plus.business.manage',
    ],
  },
} as const;
