import { Router, Request, Response } from 'express';
import { db } from '../db';
import { socialMediaAccounts, clients } from '@shared/schema';
import { eq, and } from 'drizzle-orm';

const router = Router();

// LinkedIn OAuth configuration
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.BASE_URL || 'https://businessblueprint.io'}/api/auth/linkedin/callback`;

const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization';
const LINKEDIN_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';
const LINKEDIN_API_URL = 'https://api.linkedin.com/v2';

// Scopes required for posting and profile access
const SCOPES = [
  'w_member_social',           // Post on behalf of user
  'r_basicprofile',            // Read basic profile
  'r_organization_social',     // Read organization posts
  'rw_organization_admin',     // Manage organization posts
].join(' ');

// ============================================================================
// OAuth Flow
// ============================================================================

/**
 * Step 1: Initiate LinkedIn OAuth flow
 * GET /api/auth/linkedin?clientId=123&state=abc123
 */
router.get('/auth/linkedin', async (req: Request, res: Response) => {
  try {
    const { clientId, state } = req.query;

    if (!clientId) {
      return res.status(400).json({ error: 'Missing clientId parameter' });
    }

    if (!LINKEDIN_CLIENT_ID || !LINKEDIN_CLIENT_SECRET) {
      return res.status(500).json({ error: 'LinkedIn API credentials not configured' });
    }

    // Build LinkedIn OAuth URL
    const authUrl = new URL(LINKEDIN_AUTH_URL);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', LINKEDIN_CLIENT_ID);
    authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.append('scope', SCOPES);
    authUrl.searchParams.append('state', `${clientId}:${state || ''}`); // Pass clientId in state

    // Redirect user to LinkedIn authorization
    res.redirect(authUrl.toString());
  } catch (error) {
    console.error('[LinkedIn Auth] Error initiating OAuth:', error);
    res.status(500).json({ error: 'Failed to initiate LinkedIn authentication' });
  }
});

/**
 * Step 2: LinkedIn OAuth callback
 * GET /api/auth/linkedin/callback?code=...&state=...
 */
router.get('/auth/linkedin/callback', async (req: Request, res: Response) => {
  try {
    const { code, state, error: oauthError } = req.query;

    // Handle OAuth errors
    if (oauthError) {
      console.error('[LinkedIn Callback] OAuth error:', oauthError);
      return res.redirect(`/content?error=linkedin_auth_failed&message=${oauthError}`);
    }

    if (!code || !state) {
      return res.redirect('/content?error=missing_code');
    }

    // Extract clientId from state
    const [clientId] = (state as string).split(':');
    if (!clientId) {
      return res.redirect('/content?error=invalid_state');
    }

    // Exchange code for access token
    const tokenResponse = await fetch(LINKEDIN_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        client_id: LINKEDIN_CLIENT_ID!,
        client_secret: LINKEDIN_CLIENT_SECRET!,
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('[LinkedIn Callback] Token exchange failed:', errorText);
      return res.redirect('/content?error=token_exchange_failed');
    }

    const tokenData = await tokenResponse.json();
    const { access_token, expires_in } = tokenData;

    // Get user profile
    const profileResponse = await fetch(`${LINKEDIN_API_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    if (!profileResponse.ok) {
      console.error('[LinkedIn Callback] Failed to fetch profile');
      return res.redirect('/content?error=profile_fetch_failed');
    }

    const profile = await profileResponse.json();

    // Get profile picture
    let profilePicture = null;
    try {
      const pictureResponse = await fetch(
        `${LINKEDIN_API_URL}/me?projection=(id,profilePicture(displayImage~:playableStreams))`,
        {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        }
      );
      if (pictureResponse.ok) {
        const pictureData = await pictureResponse.json();
        const images = pictureData.profilePicture?.['displayImage~']?.elements;
        if (images && images.length > 0) {
          // Get largest image
          profilePicture = images[images.length - 1].identifiers[0].identifier;
        }
      }
    } catch (err) {
      console.warn('[LinkedIn Callback] Failed to fetch profile picture:', err);
    }

    // Calculate token expiration
    const expiresAt = new Date(Date.now() + (expires_in * 1000));

    // Store connection in database
    const accountData = {
      clientId: parseInt(clientId),
      platform: 'linkedin' as const,
      platformAccountId: profile.id,
      platformAccountName: `${profile.localizedFirstName} ${profile.localizedLastName}`,
      platformAccountHandle: null, // LinkedIn doesn't have handles
      platformAccountAvatar: profilePicture,
      accessToken: access_token,
      refreshToken: null, // LinkedIn v2 doesn't provide refresh tokens
      tokenExpiresAt: expiresAt,
      accountType: 'personal',
      permissions: SCOPES.split(' '),
      metadata: {
        firstName: profile.localizedFirstName,
        lastName: profile.localizedLastName,
        headline: profile.localizedHeadline,
      },
      isActive: true,
      lastSyncedAt: new Date(),
    };

    // Check if account already exists
    const existing = await db.query.socialMediaAccounts.findFirst({
      where: and(
        eq(socialMediaAccounts.clientId, parseInt(clientId)),
        eq(socialMediaAccounts.platform, 'linkedin'),
        eq(socialMediaAccounts.platformAccountId, profile.id)
      ),
    });

    if (existing) {
      // Update existing account
      await db
        .update(socialMediaAccounts)
        .set({
          accessToken: access_token,
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

    console.log('[LinkedIn Callback] Successfully connected LinkedIn account:', profile.id);

    // Redirect back to content page
    res.redirect('/content?success=linkedin_connected');
  } catch (error) {
    console.error('[LinkedIn Callback] Error:', error);
    res.redirect('/content?error=connection_failed');
  }
});

// ============================================================================
// Posting & Content Management
// ============================================================================

/**
 * Publish a post to LinkedIn
 * POST /api/social/linkedin/publish
 */
router.post('/social/linkedin/publish', async (req: Request, res: Response) => {
  try {
    const { accountId, text, imageUrls, visibility = 'PUBLIC' } = req.body;

    if (!accountId || !text) {
      return res.status(400).json({ error: 'Missing required fields: accountId, text' });
    }

    // Get account credentials
    const account = await db.query.socialMediaAccounts.findFirst({
      where: and(
        eq(socialMediaAccounts.id, accountId),
        eq(socialMediaAccounts.platform, 'linkedin'),
        eq(socialMediaAccounts.isActive, true)
      ),
    });

    if (!account) {
      return res.status(404).json({ error: 'LinkedIn account not found or inactive' });
    }

    // Check if token is expired
    if (account.tokenExpiresAt && new Date() > account.tokenExpiresAt) {
      await db.update(socialMediaAccounts)
        .set({ syncError: 'Token expired', isActive: false })
        .where(eq(socialMediaAccounts.id, accountId));
      return res.status(401).json({ error: 'LinkedIn token expired. Please reconnect your account.' });
    }

    // Build post payload (UGC Post API - simplified)
    const postPayload: any = {
      author: `urn:li:person:${account.platformAccountId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: text,
          },
          shareMediaCategory: imageUrls && imageUrls.length > 0 ? 'IMAGE' : 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': visibility,
      },
    };

    // Add images if provided
    if (imageUrls && imageUrls.length > 0) {
      postPayload.specificContent['com.linkedin.ugc.ShareContent'].media = imageUrls.map((url: string) => ({
        status: 'READY',
        originalUrl: url,
      }));
    }

    // Publish to LinkedIn
    const publishResponse = await fetch(`${LINKEDIN_API_URL}/ugcPosts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${account.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(postPayload),
    });

    if (!publishResponse.ok) {
      const errorData = await publishResponse.text();
      console.error('[LinkedIn Publish] Failed:', errorData);
      
      // Update account error
      await db.update(socialMediaAccounts)
        .set({ syncError: `Publish failed: ${errorData.substring(0, 500)}` })
        .where(eq(socialMediaAccounts.id, accountId));

      return res.status(publishResponse.status).json({ 
        error: 'Failed to publish to LinkedIn',
        details: errorData,
      });
    }

    const result = await publishResponse.json();
    const postId = result.id;

    // Update last sync time
    await db.update(socialMediaAccounts)
      .set({ lastSyncedAt: new Date(), syncError: null })
      .where(eq(socialMediaAccounts.id, accountId));

    res.json({
      success: true,
      postId: postId,
      url: null, // LinkedIn doesn't provide direct post URLs in response
      platform: 'linkedin',
    });
  } catch (error) {
    console.error('[LinkedIn Publish] Error:', error);
    res.status(500).json({ error: 'Failed to publish to LinkedIn' });
  }
});

/**
 * Get LinkedIn profile information
 * GET /api/social/linkedin/profile/:accountId
 */
router.get('/social/linkedin/profile/:accountId', async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    const account = await db.query.socialMediaAccounts.findFirst({
      where: and(
        eq(socialMediaAccounts.id, parseInt(accountId)),
        eq(socialMediaAccounts.platform, 'linkedin')
      ),
    });

    if (!account) {
      return res.status(404).json({ error: 'LinkedIn account not found' });
    }

    // Fetch current profile
    const profileResponse = await fetch(`${LINKEDIN_API_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${account.accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      return res.status(profileResponse.status).json({ error: 'Failed to fetch LinkedIn profile' });
    }

    const profile = await profileResponse.json();

    res.json({
      id: profile.id,
      firstName: profile.localizedFirstName,
      lastName: profile.localizedLastName,
      headline: profile.localizedHeadline,
      profilePicture: account.platformAccountAvatar,
    });
  } catch (error) {
    console.error('[LinkedIn Profile] Error:', error);
    res.status(500).json({ error: 'Failed to fetch LinkedIn profile' });
  }
});

/**
 * Disconnect LinkedIn account
 * DELETE /api/social/linkedin/:accountId
 */
router.delete('/social/linkedin/:accountId', async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    await db
      .update(socialMediaAccounts)
      .set({ isActive: false })
      .where(and(
        eq(socialMediaAccounts.id, parseInt(accountId)),
        eq(socialMediaAccounts.platform, 'linkedin')
      ));

    res.json({ success: true, message: 'LinkedIn account disconnected' });
  } catch (error) {
    console.error('[LinkedIn Disconnect] Error:', error);
    res.status(500).json({ error: 'Failed to disconnect LinkedIn account' });
  }
});

export default router;
