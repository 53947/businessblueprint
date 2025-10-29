import { Router, Request, Response } from 'express';
import { db } from '../db';
import { socialMediaAccounts } from '@shared/schema';
import { eq, and } from 'drizzle-orm';
import crypto from 'crypto';

const router = Router();

// Twitter/X OAuth 2.0 configuration
const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.BASE_URL || 'https://businessblueprint.io'}/api/auth/twitter/callback';

const TWITTER_AUTH_URL = 'https://twitter.com/i/oauth2/authorize';
const TWITTER_TOKEN_URL = 'https://api.twitter.com/2/oauth2/token';
const TWITTER_API_URL = 'https://api.twitter.com/2';

// OAuth 2.0 scopes
const SCOPES = [
  'tweet.read',
  'tweet.write',
  'users.read',
  'dm.read',
  'dm.write',
  'offline.access', // For refresh tokens
].join(' ');

// ============================================================================
// OAuth 2.0 Flow with PKCE
// ============================================================================

/**
 * Step 1: Initiate Twitter OAuth 2.0 flow with PKCE
 * GET /api/auth/twitter?clientId=123&state=abc123
 */
router.get('/auth/twitter', async (req: Request, res: Response) => {
  try {
    const { clientId, state } = req.query;

    if (!clientId) {
      return res.status(400).json({ error: 'Missing clientId parameter' });
    }

    if (!TWITTER_CLIENT_ID || !TWITTER_CLIENT_SECRET) {
      return res.status(500).json({ error: 'Twitter API credentials not configured' });
    }

    // Generate PKCE code verifier and challenge
    const codeVerifier = crypto.randomBytes(32).toString('base64url');
    const codeChallenge = crypto
      .createHash('sha256')
      .update(codeVerifier)
      .digest('base64url');

    // Store code verifier in session (you'll need it for token exchange)
    // For now, we'll include it in state (in production, use secure session storage)
    const stateData = {
      clientId,
      userState: state || '',
      codeVerifier,
    };
    const encodedState = Buffer.from(JSON.stringify(stateData)).toString('base64url');

    // Build Twitter OAuth URL
    const authUrl = new URL(TWITTER_AUTH_URL);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', TWITTER_CLIENT_ID);
    authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.append('scope', SCOPES);
    authUrl.searchParams.append('state', encodedState);
    authUrl.searchParams.append('code_challenge', codeChallenge);
    authUrl.searchParams.append('code_challenge_method', 'S256');

    // Redirect user to Twitter authorization
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error('[Twitter Auth] Error initiating OAuth:', error);
    res.status(500).json({ error: 'Failed to initiate Twitter authentication' });
  }
});

/**
 * Step 2: Twitter OAuth callback
 * GET /api/auth/twitter/callback?code=...&state=...
 */
router.get('/auth/twitter/callback', async (req: Request, res: Response) => {
  try {
    const { code, state, error: oauthError } = req.query;

    // Handle OAuth errors
    if (oauthError) {
      console.error('[Twitter Callback] OAuth error:', oauthError);
      return res.redirect(`/content?error=twitter_auth_failed&message=${oauthError}`);
    }

    if (!code || !state) {
      return res.redirect('/content?error=missing_code');
    }

    // Decode state
    const stateData = JSON.parse(Buffer.from(state as string, 'base64url').toString());
    const { clientId, codeVerifier } = stateData;

    if (!clientId || !codeVerifier) {
      return res.redirect('/content?error=invalid_state');
    }

    // Exchange code for access token
    const tokenResponse = await fetch(TWITTER_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('[Twitter Callback] Token exchange failed:', errorText);
      return res.redirect('/content?error=token_exchange_failed');
    }

    const tokenData = await tokenResponse.json();
    const { access_token, refresh_token, expires_in } = tokenData;

    // Get user profile
    const profileResponse = await fetch(`${TWITTER_API_URL}/users/me?user.fields=profile_image_url,username`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    if (!profileResponse.ok) {
      console.error('[Twitter Callback] Failed to fetch profile');
      return res.redirect('/content?error=profile_fetch_failed');
    }

    const profileData = await profileResponse.json();
    const profile = profileData.data;

    // Calculate token expiration
    const expiresAt = new Date(Date.now() + (expires_in * 1000));

    // Store connection in database
    const accountData = {
      clientId: parseInt(clientId),
      platform: 'twitter' as const,
      platformAccountId: profile.id,
      platformAccountName: profile.name,
      platformAccountHandle: `@${profile.username}`,
      platformAccountAvatar: profile.profile_image_url,
      accessToken: access_token,
      refreshToken: refresh_token,
      tokenExpiresAt: expiresAt,
      accountType: 'personal',
      permissions: SCOPES.split(' '),
      metadata: {
        username: profile.username,
        name: profile.name,
      },
      isActive: true,
      lastSyncedAt: new Date(),
    };

    // Check if account already exists
    const existing = await db.query.socialMediaAccounts.findFirst({
      where: and(
        eq(socialMediaAccounts.clientId, parseInt(clientId)),
        eq(socialMediaAccounts.platform, 'twitter'),
        eq(socialMediaAccounts.platformAccountId, profile.id)
      ),
    });

    if (existing) {
      // Update existing account
      await db
        .update(socialMediaAccounts)
        .set({
          accessToken: access_token,
          refreshToken: refresh_token,
          tokenExpiresAt: expiresAt,
          isActive: true,
          lastSyncedAt: new Date(),
          syncError: null,
        })
        .where(eq(socialMediaAccounts.id, existing.id));
    } else {
      // Insert new account
      await db.insert(socialMediaAccounts).values(accountData);
    }

    console.log('[Twitter Callback] Successfully connected Twitter account:', profile.id);

    // Redirect back to content page
    res.redirect('/content?success=twitter_connected');
  } catch (error) {
    console.error('[Twitter Callback] Error:', error);
    res.redirect('/content?error=connection_failed');
  }
});

// ============================================================================
// Token Refresh
// ============================================================================

/**
 * Refresh Twitter access token using refresh token
 */
async function refreshTwitterToken(account: any): Promise<string | null> {
  try {
    if (!account.refreshToken) {
      console.error('[Twitter Refresh] No refresh token available');
      return null;
    }

    const tokenResponse = await fetch(TWITTER_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: account.refreshToken,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('[Twitter Refresh] Token refresh failed:', errorText);
      return null;
    }

    const tokenData = await tokenResponse.json();
    const { access_token, refresh_token, expires_in } = tokenData;

    // Update database with new tokens
    const expiresAt = new Date(Date.now() + (expires_in * 1000));
    await db
      .update(socialMediaAccounts)
      .set({
        accessToken: access_token,
        refreshToken: refresh_token || account.refreshToken, // Keep old if not provided
        tokenExpiresAt: expiresAt,
        syncError: null,
      })
      .where(eq(socialMediaAccounts.id, account.id));

    return access_token;
  } catch (error) {
    console.error('[Twitter Refresh] Error:', error);
    return null;
  }
}

// ============================================================================
// Posting & Content Management
// ============================================================================

/**
 * Post a tweet
 * POST /api/social/twitter/publish
 */
router.post('/social/twitter/publish', async (req: Request, res: Response) => {
  try {
    const { accountId, text, mediaIds } = req.body;

    if (!accountId || !text) {
      return res.status(400).json({ error: 'Missing required fields: accountId, text' });
    }

    // Get account credentials
    let account = await db.query.socialMediaAccounts.findFirst({
      where: and(
        eq(socialMediaAccounts.id, accountId),
        eq(socialMediaAccounts.platform, 'twitter'),
        eq(socialMediaAccounts.isActive, true)
      ),
    });

    if (!account) {
      return res.status(404).json({ error: 'Twitter account not found or inactive' });
    }

    // Check if token is expired and refresh if needed
    let accessToken = account.accessToken;
    if (account.tokenExpiresAt && new Date() > account.tokenExpiresAt) {
      console.log('[Twitter Publish] Token expired, attempting refresh...');
      const newToken = await refreshTwitterToken(account);
      if (!newToken) {
        await db.update(socialMediaAccounts)
          .set({ syncError: 'Token expired and refresh failed', isActive: false })
          .where(eq(socialMediaAccounts.id, accountId));
        return res.status(401).json({ error: 'Twitter token expired. Please reconnect your account.' });
      }
      accessToken = newToken;
    }

    // Build tweet payload
    const tweetPayload: any = {
      text: text,
    };

    // Add media if provided
    if (mediaIds && mediaIds.length > 0) {
      tweetPayload.media = {
        media_ids: mediaIds,
      };
    }

    // Create tweet
    const publishResponse = await fetch(`${TWITTER_API_URL}/tweets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweetPayload),
    });

    if (!publishResponse.ok) {
      const errorData = await publishResponse.text();
      console.error('[Twitter Publish] Failed:', errorData);
      
      // Update account error
      await db.update(socialMediaAccounts)
        .set({ syncError: `Publish failed: ${errorData.substring(0, 500)}` })
        .where(eq(socialMediaAccounts.id, accountId));

      return res.status(publishResponse.status).json({ 
        error: 'Failed to publish to Twitter',
        details: errorData,
      });
    }

    const result = await publishResponse.json();
    const tweetId = result.data.id;
    const username = account.platformAccountHandle?.replace('@', '') || '';
    const tweetUrl = `https://twitter.com/${username}/status/${tweetId}`;

    // Update last sync time
    await db.update(socialMediaAccounts)
      .set({ lastSyncedAt: new Date(), syncError: null })
      .where(eq(socialMediaAccounts.id, accountId));

    res.json({
      success: true,
      postId: tweetId,
      url: tweetUrl,
      platform: 'twitter',
    });
  } catch (error) {
    console.error('[Twitter Publish] Error:', error);
    res.status(500).json({ error: 'Failed to publish to Twitter' });
  }
});

/**
 * Get Twitter user profile
 * GET /api/social/twitter/profile/:accountId
 */
router.get('/social/twitter/profile/:accountId', async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    const account = await db.query.socialMediaAccounts.findFirst({
      where: and(
        eq(socialMediaAccounts.id, parseInt(accountId)),
        eq(socialMediaAccounts.platform, 'twitter')
      ),
    });

    if (!account) {
      return res.status(404).json({ error: 'Twitter account not found' });
    }

    // Fetch current profile
    const profileResponse = await fetch(
      `${TWITTER_API_URL}/users/${account.platformAccountId}?user.fields=profile_image_url,username,public_metrics`,
      {
        headers: {
          'Authorization': `Bearer ${account.accessToken}`,
        },
      }
    );

    if (!profileResponse.ok) {
      return res.status(profileResponse.status).json({ error: 'Failed to fetch Twitter profile' });
    }

    const profileData = await profileResponse.json();
    const profile = profileData.data;

    res.json({
      id: profile.id,
      name: profile.name,
      username: profile.username,
      profileImage: profile.profile_image_url,
      metrics: profile.public_metrics,
    });
  } catch (error) {
    console.error('[Twitter Profile] Error:', error);
    res.status(500).json({ error: 'Failed to fetch Twitter profile' });
  }
});

/**
 * Disconnect Twitter account
 * DELETE /api/social/twitter/:accountId
 */
router.delete('/social/twitter/:accountId', async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    await db
      .update(socialMediaAccounts)
      .set({ isActive: false })
      .where(and(
        eq(socialMediaAccounts.id, parseInt(accountId)),
        eq(socialMediaAccounts.platform, 'twitter')
      ));

    res.json({ success: true, message: 'Twitter account disconnected' });
  } catch (error) {
    console.error('[Twitter Disconnect] Error:', error);
    res.status(500).json({ error: 'Failed to disconnect Twitter account' });
  }
});

// ============================================================================
// Webhook Handler (for DMs via Account Activity API)
// ============================================================================

/**
 * Twitter webhook verification (CRC challenge)
 * GET /api/webhooks/twitter
 */
router.get('/webhooks/twitter', (req: Request, res: Response) => {
  const { crc_token } = req.query;

  if (!crc_token) {
    return res.status(400).json({ error: 'Missing crc_token parameter' });
  }

  // Generate response token
  const responseToken = crypto
    .createHmac('sha256', TWITTER_CLIENT_SECRET || '')
    .update(crc_token as string)
    .digest('base64');

  res.json({
    response_token: `sha256=${responseToken}`,
  });
});

/**
 * Twitter webhook events (DMs, mentions, etc.)
 * POST /api/webhooks/twitter
 */
router.post('/webhooks/twitter', async (req: Request, res: Response) => {
  try {
    const event = req.body;

    console.log('[Twitter Webhook] Received event:', JSON.stringify(event, null, 2));

    // Handle direct message events
    if (event.direct_message_events) {
      for (const dmEvent of event.direct_message_events) {
        // Process DM and store in inbox
        // TODO: Implement inbox integration
        console.log('[Twitter Webhook] DM received:', dmEvent);
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('[Twitter Webhook] Error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;
