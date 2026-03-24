import { db } from '../db';
import { adAccountConnections } from '../../shared/schema';
import { eq, and } from 'drizzle-orm';
import crypto from 'crypto';

// ============================================================
// Reddit Ads Service — /amplify platform integration
// ============================================================

const REDDIT_ADS_API = 'https://ads-api.reddit.com';
const REDDIT_OAUTH_API = 'https://oauth.reddit.com';
const USER_AGENT = 'businessblueprint-amplify/1.0';
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

// --------------- Interfaces ---------------

export interface CreateCampaignData {
  name: string;
  objective: 'BRAND_AWARENESS' | 'TRAFFIC' | 'CONVERSIONS' | 'VIDEO_VIEWS' | 'APP_INSTALLS' | 'CATALOG_SALES' | 'REACH' | 'ENGAGEMENT';
  daily_budget_micro: number; // budget in micro-currency (e.g. $5 = 5_000_000)
  start_time: string; // ISO 8601
  end_time?: string;
  is_paid?: boolean;
  funding_instrument_id: string;
  configured_status?: 'ACTIVE' | 'PAUSED';
}

export interface CreateAdGroupData {
  campaign_id: string;
  name: string;
  bid_micro: number;
  bid_strategy?: 'CPC' | 'CPM' | 'CPV';
  start_time: string;
  end_time?: string;
  target: {
    subreddits?: string[];
    interests?: string[];
    geos?: { country: string; region?: string; city?: string }[];
    devices?: ('DESKTOP' | 'MOBILE' | 'TABLET')[];
    os?: ('IOS' | 'ANDROID')[];
    custom_audience_ids?: string[];
    exclude_custom_audience_ids?: string[];
  };
  configured_status?: 'ACTIVE' | 'PAUSED';
  expansion_enabled?: boolean;
}

export interface CreateAdData {
  ad_group_id: string;
  name: string;
  post_id?: string; // existing post to promote
  link_url?: string;
  headline?: string;
  preview_headline?: string;
  thumbnail_url?: string;
  call_to_action?: 'LEARN_MORE' | 'SIGN_UP' | 'SHOP_NOW' | 'DOWNLOAD' | 'INSTALL' | 'VISIT_SITE' | 'GET_QUOTE';
  configured_status?: 'ACTIVE' | 'PAUSED';
  click_url?: string;
}

export interface SubredditResult {
  name: string;
  display_name: string;
  subscribers: number;
  active_user_count: number;
  public_description: string;
  over18: boolean;
  url: string;
  icon_img?: string;
}

export interface ConversionEvent {
  event_at: string; // ISO 8601 timestamp
  event_type: {
    tracking_type: 'PageVisit' | 'ViewContent' | 'Search' | 'AddToCart' | 'AddToWishlist' | 'Purchase' | 'Lead' | 'SignUp' | 'Custom';
  };
  user: {
    email?: string; // will be SHA-256 hashed
    external_id?: string;
    ip_address?: string;
    user_agent?: string;
    idfa?: string;
    aaid?: string;
    click_id?: string;
    uuid?: string;
  };
  event_metadata?: {
    currency?: string;
    value_decimal?: number;
    item_count?: number;
    conversion_id?: string;
  };
}

// --------------- Token Encryption Helpers ---------------

const ENCRYPTION_KEY = process.env.TOKEN_ENCRYPTION_KEY || process.env.SESSION_SECRET || 'businessblueprint-default-key-change-me';

function getEncryptionKey(): Buffer {
  return crypto.createHash('sha256').update(ENCRYPTION_KEY).digest();
}

function encryptToken(plaintext: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', getEncryptionKey(), iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decryptToken(ciphertext: string): string {
  const [ivHex, encrypted] = ciphertext.split(':');
  if (!ivHex || !encrypted) return ciphertext; // plain text fallback
  try {
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', getEncryptionKey(), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch {
    return ciphertext; // plain text fallback
  }
}

function sha256Hash(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

// --------------- Service Class ---------------

export class RedditAdsService {
  private clientId: string;
  private clientSecret: string;

  constructor() {
    this.clientId = process.env.REDDIT_CLIENT_ID || '';
    this.clientSecret = process.env.REDDIT_CLIENT_SECRET || '';
  }

  // ---- Internal fetch with retry & rate-limit backoff ----

  private async fetchWithRetry(
    url: string,
    options: RequestInit,
    retries = MAX_RETRIES,
  ): Promise<Response> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      const response = await fetch(url, options);

      if (response.status === 429 && attempt < retries) {
        const retryAfter = response.headers.get('retry-after');
        const delay = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : BASE_DELAY_MS * Math.pow(2, attempt);
        console.warn(`[RedditAds] Rate limited (429). Retrying in ${delay}ms (attempt ${attempt + 1}/${retries})`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      return response;
    }

    // This shouldn't be reached but satisfies TypeScript
    throw new Error('[RedditAds] Max retries exceeded');
  }

  private adsHeaders(accessToken?: string | null): Record<string, string> {
    const headers: Record<string, string> = {
      'User-Agent': USER_AGENT,
      'Content-Type': 'application/json',
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return headers;
  }

  private basicAuthHeader(): string {
    return 'Basic ' + Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
  }

  // ============================================================
  // 1. OAuth
  // ============================================================

  getAuthorizationUrl(clientId: number, redirectUri: string): string {
    const state = `reddit_${clientId}_${Date.now()}`;
    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'code',
      state,
      redirect_uri: redirectUri,
      duration: 'permanent',
      scope: 'adsedit adsread identity',
    });
    return `https://www.reddit.com/api/v1/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(
    code: string,
    redirectUri: string,
  ): Promise<{ access_token: string; refresh_token: string; expires_in: number }> {
    const response = await this.fetchWithRetry('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        Authorization: this.basicAuthHeader(),
        'User-Agent': USER_AGENT,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }).toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] Token exchange failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] Token exchange failed: ${response.status}`);
    }

    const data = await response.json();
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    };
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ access_token: string; refresh_token: string; expires_in: number }> {
    const response = await this.fetchWithRetry('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        Authorization: this.basicAuthHeader(),
        'User-Agent': USER_AGENT,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }).toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] Token refresh failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] Token refresh failed: ${response.status}`);
    }

    const data = await response.json();
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token || refreshToken, // Reddit may not return a new refresh token
      expires_in: data.expires_in,
    };
  }

  // ============================================================
  // 2. Campaign Management
  // ============================================================

  async getCampaigns(accessToken: string, accountId: string): Promise<any[]> {
    const url = `${REDDIT_ADS_API}/api/v3/accounts/${accountId}/campaigns`;
    const response = await this.fetchWithRetry(url, {
      method: 'GET',
      headers: this.adsHeaders(accessToken),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] getCampaigns failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] getCampaigns failed: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  }

  async createCampaign(
    accessToken: string,
    accountId: string,
    data: CreateCampaignData,
  ): Promise<any> {
    const url = `${REDDIT_ADS_API}/api/v3/accounts/${accountId}/campaigns`;
    const response = await this.fetchWithRetry(url, {
      method: 'POST',
      headers: this.adsHeaders(accessToken),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] createCampaign failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] createCampaign failed: ${response.status}`);
    }

    return response.json();
  }

  async updateCampaign(
    accessToken: string,
    accountId: string,
    campaignId: string,
    data: Partial<CreateCampaignData>,
  ): Promise<any> {
    const url = `${REDDIT_ADS_API}/api/v3/accounts/${accountId}/campaigns/${campaignId}`;
    const response = await this.fetchWithRetry(url, {
      method: 'PUT',
      headers: this.adsHeaders(accessToken),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] updateCampaign failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] updateCampaign failed: ${response.status}`);
    }

    return response.json();
  }

  async pauseCampaign(accessToken: string, accountId: string, campaignId: string): Promise<any> {
    return this.updateCampaign(accessToken, accountId, campaignId, {
      configured_status: 'PAUSED',
    });
  }

  async resumeCampaign(accessToken: string, accountId: string, campaignId: string): Promise<any> {
    return this.updateCampaign(accessToken, accountId, campaignId, {
      configured_status: 'ACTIVE',
    });
  }

  // ============================================================
  // 3. Ad Groups
  // ============================================================

  async createAdGroup(
    accessToken: string,
    accountId: string,
    data: CreateAdGroupData,
  ): Promise<any> {
    const url = `${REDDIT_ADS_API}/api/v3/accounts/${accountId}/adgroups`;
    const response = await this.fetchWithRetry(url, {
      method: 'POST',
      headers: this.adsHeaders(accessToken),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] createAdGroup failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] createAdGroup failed: ${response.status}`);
    }

    return response.json();
  }

  async getAdGroups(
    accessToken: string,
    accountId: string,
    campaignId?: string,
  ): Promise<any[]> {
    let url = `${REDDIT_ADS_API}/api/v3/accounts/${accountId}/adgroups`;
    if (campaignId) {
      url += `?campaign_id=${campaignId}`;
    }

    const response = await this.fetchWithRetry(url, {
      method: 'GET',
      headers: this.adsHeaders(accessToken),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] getAdGroups failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] getAdGroups failed: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  }

  // ============================================================
  // 4. Ads
  // ============================================================

  async createAd(
    accessToken: string,
    accountId: string,
    data: CreateAdData,
  ): Promise<any> {
    const url = `${REDDIT_ADS_API}/api/v3/accounts/${accountId}/ads`;
    const response = await this.fetchWithRetry(url, {
      method: 'POST',
      headers: this.adsHeaders(accessToken),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] createAd failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] createAd failed: ${response.status}`);
    }

    return response.json();
  }

  async getAds(
    accessToken: string,
    accountId: string,
    adGroupId?: string,
  ): Promise<any[]> {
    let url = `${REDDIT_ADS_API}/api/v3/accounts/${accountId}/ads`;
    if (adGroupId) {
      url += `?ad_group_id=${adGroupId}`;
    }

    const response = await this.fetchWithRetry(url, {
      method: 'GET',
      headers: this.adsHeaders(accessToken),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] getAds failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] getAds failed: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  }

  // ============================================================
  // 5. Audiences
  // ============================================================

  async createCustomAudience(
    accessToken: string,
    data: { name: string },
  ): Promise<any> {
    const url = `${REDDIT_ADS_API}/api/v3/custom_audiences`;
    const response = await this.fetchWithRetry(url, {
      method: 'POST',
      headers: this.adsHeaders(accessToken),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] createCustomAudience failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] createCustomAudience failed: ${response.status}`);
    }

    return response.json();
  }

  async addUsersToAudience(
    accessToken: string,
    audienceId: string,
    hashedEmails: string[],
  ): Promise<any> {
    // Ensure all emails are SHA-256 hashed (lowercase)
    const users = hashedEmails.map((email) => {
      // If it looks like a plain email, hash it
      if (email.includes('@')) {
        return { email: sha256Hash(email) };
      }
      return { email: email.toLowerCase() };
    });

    const url = `${REDDIT_ADS_API}/api/v3/custom_audiences/${audienceId}/users`;
    const response = await this.fetchWithRetry(url, {
      method: 'PATCH',
      headers: this.adsHeaders(accessToken),
      body: JSON.stringify({ users }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] addUsersToAudience failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] addUsersToAudience failed: ${response.status}`);
    }

    return response.json();
  }

  // ============================================================
  // 6. Reporting
  // ============================================================

  async getCampaignReport(
    accessToken: string,
    accountId: string,
    campaignId: string,
    startDate: string,
    endDate: string,
  ): Promise<any> {
    const params = new URLSearchParams({
      starts_at: startDate,
      ends_at: endDate,
      campaign_id: campaignId,
      metrics: 'impressions,clicks,spend,conversions,upvotes,video_views,engagement_rate',
      group_by: 'campaign_id',
    });

    const url = `${REDDIT_ADS_API}/api/v3/accounts/${accountId}/reports?${params.toString()}`;
    const response = await this.fetchWithRetry(url, {
      method: 'GET',
      headers: this.adsHeaders(accessToken),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] getCampaignReport failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] getCampaignReport failed: ${response.status}`);
    }

    return response.json();
  }

  // ============================================================
  // 7. Subreddit Intelligence
  // ============================================================

  async searchSubreddits(query: string, accessToken?: string | null): Promise<SubredditResult[]> {
    const url = `${REDDIT_OAUTH_API}/subreddits/search?q=${encodeURIComponent(query)}&limit=10`;
    const response = await this.fetchWithRetry(url, {
      method: 'GET',
      headers: this.adsHeaders(accessToken),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] searchSubreddits failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] searchSubreddits failed: ${response.status}`);
    }

    const data = await response.json();
    const children = data?.data?.children || [];

    return children.map((child: any) => {
      const sub = child.data;
      return {
        name: sub.display_name_prefixed || `r/${sub.display_name}`,
        display_name: sub.display_name,
        subscribers: sub.subscribers || 0,
        active_user_count: sub.active_user_count || sub.accounts_active || 0,
        public_description: sub.public_description || '',
        over18: sub.over18 || false,
        url: sub.url || `/r/${sub.display_name}`,
        icon_img: sub.icon_img || sub.community_icon || undefined,
      } as SubredditResult;
    });
  }

  async getSubredditPosts(
    subreddit: string,
    limit: number = 25,
    accessToken?: string | null,
  ): Promise<any[]> {
    const cleanSub = subreddit.replace(/^r\//, '');
    const url = `${REDDIT_OAUTH_API}/r/${encodeURIComponent(cleanSub)}/hot?limit=${limit}`;
    const response = await this.fetchWithRetry(url, {
      method: 'GET',
      headers: this.adsHeaders(accessToken),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] getSubredditPosts failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] getSubredditPosts failed: ${response.status}`);
    }

    const data = await response.json();
    const children = data?.data?.children || [];

    return children.map((child: any) => ({
      id: child.data.id,
      title: child.data.title,
      author: child.data.author,
      score: child.data.score,
      upvote_ratio: child.data.upvote_ratio,
      num_comments: child.data.num_comments,
      created_utc: child.data.created_utc,
      url: child.data.url,
      selftext: child.data.selftext?.substring(0, 500) || '',
      permalink: `https://reddit.com${child.data.permalink}`,
    }));
  }

  // ============================================================
  // 8. Comments
  // ============================================================

  async getAdComments(accessToken: string, adId: string): Promise<any[]> {
    // Reddit promoted posts use the same comment structure as regular posts
    const url = `${REDDIT_OAUTH_API}/comments/${adId}`;
    const response = await this.fetchWithRetry(url, {
      method: 'GET',
      headers: this.adsHeaders(accessToken),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] getAdComments failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] getAdComments failed: ${response.status}`);
    }

    const data = await response.json();
    // Reddit returns [post_listing, comments_listing]
    const commentsListing = Array.isArray(data) && data.length > 1 ? data[1] : data;
    const children = commentsListing?.data?.children || [];

    return children
      .filter((child: any) => child.kind === 't1') // t1 = comment
      .map((child: any) => ({
        id: child.data.id,
        fullname: child.data.name, // t1_xxxxx
        author: child.data.author,
        body: child.data.body,
        score: child.data.score,
        created_utc: child.data.created_utc,
        parent_id: child.data.parent_id,
        replies: child.data.replies?.data?.children?.length || 0,
      }));
  }

  async replyToComment(
    accessToken: string,
    commentId: string,
    text: string,
  ): Promise<any> {
    // Ensure the comment ID has the t1_ prefix
    const thingId = commentId.startsWith('t1_') ? commentId : `t1_${commentId}`;

    const url = `${REDDIT_OAUTH_API}/api/comment`;
    const response = await this.fetchWithRetry(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': USER_AGENT,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        thing_id: thingId,
        text,
        api_type: 'json',
      }).toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] replyToComment failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] replyToComment failed: ${response.status}`);
    }

    return response.json();
  }

  // ============================================================
  // 9. Conversions API
  // ============================================================

  async sendConversionEvent(
    accessToken: string,
    data: ConversionEvent,
  ): Promise<any> {
    // Hash all PII fields with SHA-256 lowercase
    const hashedUser: Record<string, string> = {};
    if (data.user.email) {
      hashedUser.email = sha256Hash(data.user.email);
    }
    if (data.user.external_id) {
      hashedUser.external_id = sha256Hash(data.user.external_id);
    }
    if (data.user.ip_address) {
      hashedUser.ip_address = sha256Hash(data.user.ip_address);
    }
    // Non-PII fields pass through
    if (data.user.user_agent) hashedUser.user_agent = data.user.user_agent;
    if (data.user.idfa) hashedUser.idfa = sha256Hash(data.user.idfa);
    if (data.user.aaid) hashedUser.aaid = sha256Hash(data.user.aaid);
    if (data.user.click_id) hashedUser.click_id = data.user.click_id;
    if (data.user.uuid) hashedUser.uuid = data.user.uuid;

    const payload = {
      events: [
        {
          event_at: data.event_at,
          event_type: data.event_type,
          user: hashedUser,
          event_metadata: data.event_metadata || {},
        },
      ],
    };

    const url = `${REDDIT_ADS_API}/api/v3/conversions/events`;
    const response = await this.fetchWithRetry(url, {
      method: 'POST',
      headers: this.adsHeaders(accessToken),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[RedditAds] sendConversionEvent failed: ${response.status} ${errorText}`);
      throw new Error(`[RedditAds] sendConversionEvent failed: ${response.status}`);
    }

    return response.json();
  }

  // ============================================================
  // 10. Token Management
  // ============================================================

  async getValidToken(clientId: number | string): Promise<string | null> {
    try {
      const [connection] = await db
        .select()
        .from(adAccountConnections)
        .where(
          and(
            eq(adAccountConnections.clientId, typeof clientId === "string" ? parseInt(clientId) || 0 : clientId),
            eq(adAccountConnections.platform, 'reddit'),
            eq(adAccountConnections.status, 'active'),
          ),
        )
        .limit(1);

      if (!connection || !connection.accessToken) {
        console.warn(`[RedditAds] No active Reddit connection found for client ${clientId}`);
        return null;
      }

      const accessToken = decryptToken(connection.accessToken);
      const refreshToken = connection.refreshToken ? decryptToken(connection.refreshToken) : null;

      // Check if token is expired (with 5 min buffer)
      const isExpired =
        connection.tokenExpiresAt &&
        new Date(connection.tokenExpiresAt).getTime() < Date.now() + 5 * 60 * 1000;

      if (!isExpired) {
        return accessToken;
      }

      // Token expired — refresh it
      if (!refreshToken) {
        console.error(`[RedditAds] Token expired and no refresh token for client ${clientId}`);
        await db
          .update(adAccountConnections)
          .set({ status: 'expired', updatedAt: new Date() })
          .where(eq(adAccountConnections.id, connection.id));
        return null;
      }

      console.log(`[RedditAds] Refreshing expired token for client ${clientId}`);
      const tokens = await this.refreshAccessToken(refreshToken);

      // Update DB with new tokens
      await db
        .update(adAccountConnections)
        .set({
          accessToken: encryptToken(tokens.access_token),
          refreshToken: encryptToken(tokens.refresh_token),
          tokenExpiresAt: new Date(Date.now() + tokens.expires_in * 1000),
          updatedAt: new Date(),
        })
        .where(eq(adAccountConnections.id, connection.id));

      return tokens.access_token;
    } catch (error) {
      console.error(`[RedditAds] getValidToken error for client ${clientId}:`, error);
      return null;
    }
  }

  async storeToken(
    clientId: number | string,
    accountId: string,
    accountName: string,
    tokens: { access_token: string; refresh_token: string; expires_in: number },
  ): Promise<void> {
    try {
      // Check if a connection already exists for this client + platform
      const [existing] = await db
        .select()
        .from(adAccountConnections)
        .where(
          and(
            eq(adAccountConnections.clientId, typeof clientId === "string" ? parseInt(clientId) || 0 : clientId),
            eq(adAccountConnections.platform, 'reddit'),
          ),
        )
        .limit(1);

      const tokenData = {
        accountId,
        accountName,
        accessToken: encryptToken(tokens.access_token),
        refreshToken: encryptToken(tokens.refresh_token),
        tokenExpiresAt: new Date(Date.now() + tokens.expires_in * 1000),
        status: 'active' as const,
        updatedAt: new Date(),
      };

      if (existing) {
        await db
          .update(adAccountConnections)
          .set(tokenData)
          .where(eq(adAccountConnections.id, existing.id));
        console.log(`[RedditAds] Updated token for client ${clientId}`);
      } else {
        await db.insert(adAccountConnections).values({
          clientId: typeof clientId === 'string' ? parseInt(clientId) || 0 : clientId,
          platform: 'reddit',
          ...tokenData,
          createdAt: new Date(),
        });
        console.log(`[RedditAds] Stored new token for client ${clientId}`);
      }
    } catch (error) {
      console.error(`[RedditAds] storeToken error for client ${clientId}:`, error);
      throw error;
    }
  }
}

export const redditAdsService = new RedditAdsService();
