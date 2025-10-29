# Social Media API Integration Setup Guide

## Overview
This document outlines all required API credentials, OAuth scopes, and webhook configurations for Business Blueprint's social media content management platform (`/content`) and unified inbox (`/inbox`).

## Platform Support Matrix

### DIY Tier (3 Platforms)
- ✅ Facebook (Meta)
- ✅ Instagram (Meta)  
- LinkedIn
- X (Twitter)
- Google Business Profile

### MSP Tier (7 Platforms)
All DIY platforms PLUS:
- TikTok
- Snapchat

---

## 1. Meta (Facebook & Instagram & WhatsApp)

### Status: ✅ CONFIGURED
- **App ID:** 190094768417980 (Stored in `META_APP_ID`)
- **App Secret:** Stored in `META_APP_SECRET`
- **Domain Verified:** businessblueprint.io
- **Webhook Endpoint:** `https://businessblueprint.io/api/webhooks/meta`
- **Verify Token:** `business_blueprint_meta_verify_token_2024`

### OAuth Scopes Required
```
pages_manage_posts
pages_read_engagement  
pages_messaging
instagram_basic
instagram_content_publish
instagram_manage_messages
whatsapp_business_management
whatsapp_business_messaging
```

### API Capabilities
- ✅ Post to Facebook Pages
- ✅ Post to Instagram
- ✅ Receive Facebook Page messages (webhook)
- ✅ Receive Instagram DMs (webhook)
- ✅ Receive WhatsApp messages (webhook)
- ✅ Read comments and engagement

### Next Steps
1. Complete Meta Business Verification (pending)
2. Add Messenger product to app
3. Add Instagram product to app
4. Configure webhooks for `messages`, `messaging_postbacks`, `message_reads`
5. Get Page Access Token

---

## 2. LinkedIn

### Status: ⏳ NEEDS SETUP

### Developer Account Setup
1. Create LinkedIn App: https://www.linkedin.com/developers/apps
2. Add redirect URI: `https://businessblueprint.io/api/auth/linkedin/callback`
3. Request access to LinkedIn Marketing Developer Platform

### Required Credentials
- **Client ID** → Store as `LINKEDIN_CLIENT_ID`
- **Client Secret** → Store as `LINKEDIN_CLIENT_SECRET`

### OAuth Scopes Required
```
w_member_social        # Post on behalf of user
r_basicprofile         # Read profile
r_organization_social  # Manage organization posts
rw_organization_admin  # Organization admin access
```

### API Endpoints to Implement
- **POST** `/api/auth/linkedin` - OAuth initiation
- **GET** `/api/auth/linkedin/callback` - OAuth callback
- **POST** `/api/social/linkedin/publish` - Publish content
- **GET** `/api/social/linkedin/profile` - Get profile info

### Webhook Support
⚠️ LinkedIn does NOT support webhooks for DMs. Must use polling:
- Poll endpoint: `GET /v2/messages`
- Recommended: Poll every 5 minutes for new messages
- Store `lastMessageId` to track new messages

### Platform Limitations
- Text posts: 3,000 characters max
- Images: Up to 9 images per post
- Videos: Max 10 minutes, 5GB
- No native DM webhooks (requires polling)

---

## 3. X (Twitter)

### Status: ⏳ NEEDS SETUP

### Developer Account Setup
1. Apply for X Developer Account: https://developer.x.com
2. Create Project and App (Free tier = 1,500 posts/month)
3. Enable OAuth 2.0 with PKCE
4. Add redirect URI: `https://businessblueprint.io/api/auth/twitter/callback`

### Required Credentials
- **API Key** → Store as `TWITTER_API_KEY`
- **API Secret** → Store as `TWITTER_API_SECRET`
- **Bearer Token** → Store as `TWITTER_BEARER_TOKEN`
- **Client ID** → Store as `TWITTER_CLIENT_ID`
- **Client Secret** → Store as `TWITTER_CLIENT_SECRET`

### OAuth Scopes Required
```
tweet.read
tweet.write
users.read
dm.read
dm.write
offline.access  # For refresh tokens
```

### API Endpoints to Implement
- **POST** `/api/auth/twitter` - OAuth 2.0 PKCE flow initiation
- **GET** `/api/auth/twitter/callback` - OAuth callback
- **POST** `/api/social/twitter/publish` - Create tweet
- **GET** `/api/social/twitter/profile` - Get user profile

### Webhook Support
✅ X supports webhooks for DMs via Account Activity API
- **Webhook URL:** `https://businessblueprint.io/api/webhooks/twitter`
- **CRC Token:** Required for validation
- Events: `direct_message_events`, `direct_message_indicate_typing_events`

### Platform Limitations
- Posts: 280 characters (or 4,000 for X Premium)
- Images: Up to 4 images per tweet
- Videos: Max 2:20 minutes (free), 10 minutes (premium)
- Rate limits: 1,500 tweets/month (Free tier)

---

## 4. Google Business Profile

### Status: ⏳ NEEDS SETUP

### Developer Account Setup
1. Create Google Cloud Project: https://console.cloud.google.com
2. Enable Google Business Profile API
3. Enable Google My Business API
4. Create OAuth 2.0 credentials
5. Add redirect URI: `https://businessblueprint.io/api/auth/google/callback`

### Required Credentials
- **Client ID** → Store as `GOOGLE_CLIENT_ID`
- **Client Secret** → Store as `GOOGLE_CLIENT_SECRET`

### OAuth Scopes Required
```
https://www.googleapis.com/auth/business.manage
https://www.googleapis.com/auth/plus.business.manage
```

### API Endpoints to Implement
- **POST** `/api/auth/google` - OAuth initiation
- **GET** `/api/auth/google/callback` - OAuth callback
- **POST** `/api/social/google/publish` - Create Google Business post
- **GET** `/api/social/google/locations` - List managed locations
- **GET** `/api/social/google/reviews` - Fetch reviews (read-only)

### Webhook Support
⚠️ Google Business Profile does NOT support webhooks for messages
- Messages are handled through Google Business Messages (separate API)
- Requires Google Business Messages partner verification
- Alternative: Integrate with Synup for review monitoring

### Platform Limitations
- Posts: 1,500 characters
- Images: Up to 10 images
- Posts expire after 7 days automatically
- No DM support (requires separate Google Business Messages API)

---

## 5. TikTok (MSP Tier Only)

### Status: ⏳ NEEDS SETUP

### Developer Account Setup
1. Apply for TikTok for Developers: https://developers.tiktok.com
2. Create TikTok app
3. Request Marketing API access (may take weeks)
4. Add redirect URI: `https://businessblueprint.io/api/auth/tiktok/callback`

### Required Credentials
- **Client Key** → Store as `TIKTOK_CLIENT_KEY`
- **Client Secret** → Store as `TIKTOK_CLIENT_SECRET`

### OAuth Scopes Required
```
user.info.basic
video.upload
video.publish
video.list
```

### API Endpoints to Implement
- **POST** `/api/auth/tiktok` - OAuth initiation
- **GET** `/api/auth/tiktok/callback` - OAuth callback
- **POST** `/api/social/tiktok/upload` - Upload video to TikTok
- **POST** `/api/social/tiktok/publish` - Publish video

### Webhook Support
✅ TikTok supports webhooks via Events API
- **Webhook URL:** `https://businessblueprint.io/api/webhooks/tiktok`
- Events: `video.published`, `comment.created`, `direct_message.created`

### Platform Limitations
- Videos only (no image posts)
- Max video length: 10 minutes
- Max file size: 287MB
- Caption: 2,200 characters
- Hashtags: Up to 30
- API access requires business verification (can take 2-4 weeks)

---

## 6. Snapchat (MSP Tier Only)

### Status: ⏳ NEEDS SETUP

### Developer Account Setup
1. Create Snap Business Account: https://businesshelp.snapchat.com
2. Apply for Snapchat Marketing API: https://kit.snapchat.com/marketing-api
3. Create OAuth app
4. Add redirect URI: `https://businessblueprint.io/api/auth/snapchat/callback`

### Required Credentials
- **Client ID** → Store as `SNAPCHAT_CLIENT_ID`
- **Client Secret** → Store as `SNAPCHAT_CLIENT_SECRET`

### OAuth Scopes Required
```
snapchat-marketing-api
snapchat-audience-match
```

### API Endpoints to Implement
- **POST** `/api/auth/snapchat` - OAuth initiation
- **GET** `/api/auth/snapchat/callback` - OAuth callback
- **POST** `/api/social/snapchat/publish` - Create Snap ad/story

### Webhook Support
⚠️ Snapchat Marketing API does NOT support webhooks for organic posts
- API is primarily for advertising
- Organic posting requires Snap Kit (different API)
- DMs not accessible via API

### Platform Limitations
- Snapchat API is primarily for advertising, NOT organic posts
- Organic posting requires Snap Kit Publisher API (limited availability)
- No DM access via API
- **Consider:** May not be worth implementing due to API limitations

---

## Implementation Priority

### Phase 1: Core Platforms (Week 1)
1. ✅ Meta (Facebook/Instagram) - Already configured
2. LinkedIn - High business value
3. X (Twitter) - Popular platform

### Phase 2: Google & Advanced (Week 2)
4. Google Business Profile - Local SEO value
5. TikTok - Growing platform (MSP tier)

### Phase 3: Optional (Week 3)
6. Snapchat - Consider skipping due to API limitations

---

## Webhook Consolidation

### Unified Webhook Handler
All platforms feed into: `/inbox` via `inbox_channel_connections` table

**Webhook Endpoints:**
- `/api/webhooks/meta` - Facebook, Instagram, WhatsApp
- `/api/webhooks/twitter` - X (Twitter) DMs
- `/api/webhooks/tiktok` - TikTok messages
- `/api/webhooks/linkedin` - Not supported (use polling)
- `/api/webhooks/google` - Not supported
- `/api/webhooks/snapchat` - Not supported

**Polling Required For:**
- LinkedIn messages (every 5 minutes)
- Google Business messages (if enabled)

---

## Security Best Practices

### Token Storage
- All OAuth tokens stored encrypted in `social_media_accounts.accessToken`
- Refresh tokens encrypted in `social_media_accounts.refreshToken`
- Never log tokens in error messages or logs
- Use Replit Secrets for app credentials

### Token Refresh
- Implement automatic token refresh before expiration
- Handle expired token errors gracefully
- Re-prompt user for OAuth if refresh fails

### Webhook Security
- Verify webhook signatures for all platforms
- Use verify tokens (Meta, Twitter)
- Rate limit webhook endpoints
- Log all webhook events for debugging

---

## Next Steps

1. [ ] Obtain LinkedIn API credentials
2. [ ] Obtain X (Twitter) API credentials
3. [ ] Obtain Google Cloud API credentials
4. [ ] Apply for TikTok Marketing API access (2-4 week wait)
5. [ ] Evaluate Snapchat viability (may skip)
6. [ ] Build OAuth flow handlers for each platform
7. [ ] Build posting endpoints for each platform
8. [ ] Build webhook receivers for each platform
9. [ ] Implement token refresh logic
10. [ ] Test end-to-end for all platforms

---

## Testing Accounts Needed

Each platform requires test accounts for development:
- ✅ Facebook Page (for testing)
- ✅ Instagram Business Account (for testing)
- [ ] LinkedIn Personal + Company Page
- [ ] X (Twitter) account
- [ ] Google Business Profile location
- [ ] TikTok Creator account
- [ ] Snapchat Business account

---

**Last Updated:** October 28, 2025
**Status:** Meta configured, other platforms pending setup
