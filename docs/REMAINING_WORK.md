# Business Blueprint - Remaining Work

**Last Updated:** October 28, 2025

## 🎯 High Priority - Core Features

### 1. Social Media Platform Integrations (/content)
**Status:** Meta configured, others pending

#### Platform APIs to Build:
- [ ] **LinkedIn** - OAuth, posting, profile management
  - Get API credentials (LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET)
  - Build OAuth 2.0 flow
  - Create posting endpoint
  - DM polling (LinkedIn doesn't support webhooks)
  
- [ ] **X (Twitter)** - OAuth 2.0 with PKCE, posting, DM webhooks
  - Get API credentials (TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET, TWITTER_API_KEY)
  - Build OAuth 2.0 PKCE flow
  - Create posting endpoint (tweets)
  - Configure webhook for DMs
  - Implement token refresh logic
  
- [ ] **Google Business Profile** - OAuth, posting, location management
  - Set up Google Cloud Project
  - Enable Google Business Profile API
  - Get OAuth credentials
  - Build posting endpoint
  - Note: No DM support (requires separate Google Business Messages API)
  
- [ ] **TikTok** (MSP Tier Only) - OAuth, video upload/posting
  - Apply for TikTok Marketing API (2-4 week approval process)
  - Get API credentials
  - Build OAuth flow
  - Create video upload/posting endpoints
  - Configure webhook for comments/DMs
  
- [ ] **Snapchat** (MSP Tier Only) - Consider skipping
  - ⚠️ API primarily for advertising, not organic posts
  - Limited organic posting via Snap Kit
  - No DM access
  - **Recommendation:** Skip unless user specifically needs

#### Frontend Work:
- [ ] **Platform Connection UI** in `/content`
  - "Connect Platform" modal with all platform options
  - Show connected accounts with status (active/expired)
  - Disconnect button for each platform
  - Token expiration warnings
  
- [ ] **Multi-Platform Post Composer**
  - Platform selector (checkboxes for FB/IG/LinkedIn/X/Google)
  - Platform-specific character limits
  - Media upload to Cloudflare R2
  - Hashtag suggestions
  - AI caption generation
  - Preview for each platform
  
- [ ] **Post Scheduling Interface**
  - Calendar view
  - Time zone selector
  - Scheduled posts queue
  - Draft posts management
  
- [ ] **Analytics Dashboard**
  - Per-platform performance metrics
  - Engagement tracking
  - Best time to post recommendations

---

### 2. Unified Inbox (/inbox) - Social Media DMs
**Status:** Email/SMS/Livechat working, social DMs pending

- [ ] **Meta DM Integration**
  - Wait for Facebook business verification ⏳
  - Add Messenger product to Meta app
  - Add Instagram product to Meta app
  - Configure webhooks for messages
  - Get Page Access Token
  - Test Facebook Page DMs → /inbox
  - Test Instagram DMs → /inbox
  
- [ ] **Twitter DM Integration**
  - Set up Twitter Account Activity API
  - Configure webhook for DMs
  - Implement CRC token validation
  - Test DMs flow to /inbox
  
- [ ] **LinkedIn DM Polling**
  - Build polling service (every 5 minutes)
  - Store lastMessageId to track new messages
  - Push to /inbox when new messages arrive
  
- [ ] **TikTok DM Integration** (if platform added)
  - Configure webhook
  - Test DM receiving
  
- [ ] **Unified Inbox Enhancements**
  - Filter by platform (FB/IG/Twitter/LinkedIn/Email/SMS/Livechat)
  - Search across all conversations
  - Bulk actions (mark as read, archive, delete)
  - Conversation threading improvements

---

### 3. Database Schema & Migrations
**Status:** Schema exists, may need adjustments

- [ ] **Push Social Media Schema to Production**
  - Run `npm run db:push --force` to sync schema
  - Verify `social_media_accounts` table created
  - Verify `content_posts` table created
  - Verify `content_media` table created
  
- [ ] **Verify Inbox Tables**
  - Ensure `inbox_channel_connections` supports all platforms
  - Ensure `inbox_messages2` supports social DMs
  
- [ ] **Test Data Seeding** (optional)
  - Create test client
  - Connect test social accounts
  - Create sample posts

---

## 🔧 Medium Priority - Enhancements

### 4. AI Coach Improvements
- [ ] Add conversation history in sidebar
- [ ] Save/export conversation feature
- [ ] AI Coach access from /content for post ideas
- [ ] AI review response improvements (more natural language)

### 5. Synup Integration Enhancements
**Status:** Listings & reviews working

- [ ] **Social Posting via Synup** (if available in Synup API)
  - Check if Synup supports social posting
  - If yes, integrate as alternative to direct APIs
  
- [ ] **Review Monitoring Improvements**
  - Real-time notifications for new reviews
  - Automated response suggestions
  - Review sentiment dashboard

### 6. Payment & Billing (Swipes Blue)
**Status:** Basic NMI integration exists

- [ ] **Subscription Management**
  - Active subscriptions dashboard
  - Cancel/upgrade/downgrade flows
  - Payment method management
  - Invoice history
  
- [ ] **À La Carte Marketplace**
  - Complete checkout flow
  - Order confirmation emails
  - Access provisioning after purchase
  
- [ ] **Usage-Based Billing** (if needed)
  - Track social posts per month
  - Track inbox messages processed
  - Overage charges for MSP tier

### 7. Client Portal Enhancements
- [ ] **Dashboard Widgets**
  - Recent social posts
  - Inbox message count
  - Review summary
  - Analytics overview
  
- [ ] **My Domains Management**
  - Domain registration (OpenSRS)
  - DNS management
  - Email setup
  - SSL certificate status
  
- [ ] **Settings & Preferences**
  - Notification preferences (email/SMS alerts)
  - Timezone settings
  - Team member management (for MSP clients)

---

## 🎨 Low Priority - Polish & Optimization

### 8. UI/UX Improvements
- [ ] Mobile responsiveness audit
- [ ] Loading states & skeleton screens
- [ ] Error handling improvements
- [ ] Toast notifications consistency
- [ ] Dark mode support (if requested)

### 9. Testing & Quality Assurance
- [ ] E2E tests for social posting flow
- [ ] E2E tests for OAuth connections
- [ ] E2E tests for inbox DM receiving
- [ ] Load testing for webhook endpoints
- [ ] Security audit (token storage, webhook signatures)

### 10. Documentation
- [ ] API documentation for all social endpoints
- [ ] User guide for connecting platforms
- [ ] User guide for posting content
- [ ] User guide for inbox management
- [ ] Admin documentation for troubleshooting

### 11. Performance Optimization
- [ ] Image optimization for uploaded media
- [ ] Video transcoding for TikTok
- [ ] Webhook rate limiting
- [ ] Database query optimization
- [ ] Caching strategy for API calls

---

## ⚠️ Blockers & Dependencies

### Current Blockers:
1. **Meta Business Verification** ⏳
   - Waiting on Facebook to approve business
   - ETA: 1-3 business days
   - **Blocks:** Facebook/Instagram DM integration
   
2. **API Credentials Needed:**
   - LinkedIn: LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET
   - Twitter: TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET, TWITTER_API_KEY
   - Google: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
   - TikTok: TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET (requires 2-4 week approval)

3. **Database Schema Push**
   - Schema exists but not pushed to production database
   - Need to run `npm run db:push --force`

---

## 📊 Completion Estimates

### Phase 1: Core Social Media (2-3 weeks)
- LinkedIn integration: 2-3 days
- Twitter integration: 2-3 days
- Google Business: 2-3 days
- Frontend UI: 3-4 days
- Testing: 2-3 days

### Phase 2: Unified Inbox DMs (1-2 weeks)
- Meta DM webhooks: 2-3 days (once verified)
- Twitter DM webhooks: 1-2 days
- LinkedIn polling: 1-2 days
- UI improvements: 2-3 days
- Testing: 1-2 days

### Phase 3: TikTok (Optional, 1-2 weeks)
- API approval: 2-4 weeks ⏳
- Integration: 3-4 days
- Testing: 1-2 days

### Phase 4: Polish & Launch (1-2 weeks)
- Payment flows: 3-4 days
- Portal enhancements: 2-3 days
- Testing & QA: 2-3 days
- Documentation: 1-2 days

**Total Estimated Time:** 6-10 weeks for full completion

---

## 🚀 Recommended Next Steps

### Immediate (This Week):
1. ✅ Wait for Meta business verification
2. Get LinkedIn API credentials
3. Get Twitter API credentials
4. Push database schema to production
5. Start LinkedIn integration while waiting

### Short Term (Next 2 Weeks):
1. Complete LinkedIn integration
2. Complete Twitter integration
3. Build platform connection UI
4. Once Meta verified, integrate FB/IG DMs

### Medium Term (Next Month):
1. Google Business Profile integration
2. Multi-platform post composer
3. Scheduling interface
4. Apply for TikTok API (if needed)

### Long Term (2-3 Months):
1. Analytics dashboard
2. Advanced AI features
3. Team collaboration tools
4. White-label capabilities

---

## 📝 Notes

- **Focus on DIY tier first** (FB/IG/LinkedIn/X/Google) before MSP tier
- **TikTok can be Phase 2** - requires long approval process
- **Snapchat is optional** - limited API capabilities
- **Test with demo accounts** before rolling out to production clients
- **Document as you build** - API quirks, rate limits, gotchas

---

**Priority Order:**
1. 🔴 Meta business verification (waiting)
2. 🟠 LinkedIn + Twitter integrations
3. 🟡 Google Business Profile
4. 🟢 TikTok (optional)
5. ⚪ Snapchat (skip unless requested)
