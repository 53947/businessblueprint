# MASTER BUILD PROMPT — businessblueprint.io 100% Completion

## Context
businessblueprint.io is a multi-app SaaS platform for local businesses. The app registry at `client/src/config/app-registry.ts` is the single source of truth. All apps use "/ appname" protocol (triad black "/" + brand color text). Brand names always use full URL format (businessblueprint.io, never abbreviated). Side-nav and dashboard read from the registry. Mobile is mandatory for every change.

---

## APP-BY-APP GAP LIST

### 1. / publish (Business Listings) — 95% done
**Working:** Sync from Google/Yelp, CRUD listings, PIN-protected canonical profile, metrics
**Fix:**
- [ ] Coverage grid component — verify it renders real directory data, not a stub
- [ ] Metrics population — views/clicks/calls from `listingMetricsSnapshots` show 0. Need a periodic sync or manual trigger to populate
- [ ] Directory distribution — schema supports `distributionTargets` + `distributionSubmissions` but no UI to push to directories

### 2. / elevate (Reviews & Reputation) — 80% done
**Working:** Sync reviews from Google/Yelp, display reviews, manual responses, analytics
**Fix:**
- [ ] **CRITICAL BUG**: AI response generation passes hardcoded data (empty review text, rating=5, platform="google") instead of actual review data. File: `server/routes.ts` lines ~2214-2264. Fix to pass real review text, rating, and platform
- [ ] Response posting — responses save to local DB only, never posted back to Google/Yelp APIs
- [ ] Facebook reviews — UI shows Facebook in platform breakdown but no Facebook API integration exists
- [ ] CRM contact matching — substring match on name only, high false-positive rate. Add email matching

### 3. / optimize (SEO Health) — 75% done
**Working:** SEO scan, keyword tracking, on-page analysis, content briefs, action plans (all AI-powered)
**Fix:**
- [ ] **Keyword rank tracking** — `currentRank` field exists but no service populates it. Need rank checking integration or basic SERP scraper
- [ ] Keyword volume/difficulty — populated by AI estimates only, not real data
- [ ] Backlinks tab — STUB ("coming soon"). Implement or honestly label as future feature
- [ ] Local SEO tab — STUB. Implement or label
- [ ] Schema Markup tab — STUB. Implement or label
- [ ] Reports tab — STUB. Implement or label

### 4. / amplify (Advertising) — 40% done
**Working:** Reddit campaigns (full: create, manage, comments, sentiment), budget allocation, reports data, AI creative drafting
**Fix:**
- [ ] **Meta Ads** — campaigns store locally only, no Meta Graph API calls. Either implement or clearly mark as "Coming Soon"
- [ ] **Google Ads** — same as Meta, no real API calls
- [ ] **Microsoft Ads** — same, no real API calls
- [ ] Meta/Google/Microsoft OAuth connection flows — not implemented
- [ ] Audiences sub-tab — empty stub for Meta/Google
- [ ] Creatives sub-tab — empty stub
- [ ] Bulk campaign actions (pause/resume/delete) — UI buttons exist but no click handlers
- [ ] Performance trends chart — stub ("coming soon")
- [ ] Reddit wizard TODOs — `amplify-reddit-wizard.tsx` has incomplete sections

### 5. / promote (Email + SMS Marketing) — 40% done
**Working:** Campaign CRUD (draft only), template CRUD, contact management with GDPR/CAN-SPAM compliance
**Fix:**
- [ ] **No send execution** — no endpoint to actually send a campaign. Need POST `/api/send/campaigns/:id/send` that queues emails/SMS
- [ ] **No recipient selection UI** — campaigns have no way to pick a list/segment
- [ ] **No scheduling UI** — schema has `scheduledFor` fields but no UI or endpoint
- [ ] **Dashboard metrics hardcoded** — `/api/send/metrics` returns mock data (totalContacts: 12,847, avgOpenRate: 42.1%)
- [ ] **No email/SMS provider integration** — schema mentions telnyx/smtp/ses but no actual send logic
- [ ] **List management** — `sendLists` table exists but no UI to create/manage lists
- [ ] **Contact import** — button exists but no import endpoint
- [ ] **Automations** — button routes to `/promote/automations` which doesn't exist
- [ ] **A/B testing** — schema supports but no UI or endpoints

### 6. / respond (Unified Inbox) — 70% done
**Working:** Conversation list, message threads, email sending via inboxEmailService, CRM context panel, WebSocket real-time, typing indicators
**Fix:**
- [ ] **SMS sending** — schema supports, no actual SMS provider integration
- [ ] **Social channel sending** — WhatsApp/Facebook/Instagram icons shown but outbound not implemented (receive-only via webhooks)
- [ ] **Settings page** — button shows a toast, no actual settings modal/page
- [ ] **Conversation assignment** — schema has `assignedToId`, no UI to assign
- [ ] **Tags & categories** — schema fields exist, no UI
- [ ] **Quick replies** — `inboxQuickReplies` table exists, no UI to use/manage
- [ ] **Attachment upload** — schema supports, no UI in respond (widget does support)

### 7. / engage (Live Chat Widget) — 60% done
**Working:** Widget renders on customer sites, real-time WebSocket messaging, settings persistence, CRM auto-contact creation, embed code generation
**Fix:**
- [ ] **Pre-chat form** — `enablePreChatForm` flag exists, widget doesn't render it
- [ ] **File upload in chat** — `enableFileUpload` setting exists, not implemented in widget
- [ ] **Rating/feedback** — schema supports `ratingSubmitted` event, no UI
- [ ] **Business hours** — timezone field exists, not enforced (chat available 24/7 regardless)
- [ ] **Agent availability** — `chatAgents` table exists with `isOnline`, no agent panel UI
- [ ] **Analytics** — endpoint returns all zeros, no real event aggregation
- [ ] **Offline message queue** — not implemented
- [ ] **Conversation routing/transfer** — not implemented

### 8. / post (Social Media) — 65% done
**Working:** Post CRUD, media upload, OAuth for Facebook/Instagram/Google Business, platform connect/disconnect, scheduling DB fields
**Fix:**
- [ ] **AI suggestions/captions** — endpoints return hardcoded responses, not calling Claude. Wire to Claude API
- [ ] **Platform publishing** — `contentPublisher.ts` worker exists but untested against live platform APIs. Verify it actually posts to Facebook/Instagram/Google Business
- [ ] **Analytics** — no real engagement data fetched from connected platforms. Need to pull likes/reach/impressions from platform APIs
- [ ] **Calendar drag-and-drop** — static display only, no rescheduling via drag
- [ ] **LinkedIn/Twitter/TikTok** — mark clearly as "Coming Soon" (no OAuth, don't build)
- [ ] **DM routing to / respond** — not wired
- [ ] **Audience targeting from / connect** — accepted in API but not used for distribution

---

## NON-APP ITEMS

### 9. Security
- [ ] Add authentication middleware to CRM routes (`server/routes/crm.ts`) — all /api/crm endpoints currently public
- [ ] Add clientId ownership validation on client-scoped endpoints

### 10. Admin Panel (`client/src/pages/admin-panel.tsx`)
- [ ] Currently a stub with TODOs
- [ ] Needs: client management, subscription oversight, system health

### 11. Brand Studio (`client/src/pages/brand-studio.tsx`)
- [ ] Currently a stub. Build or remove route

### 12. BIIF Page (`client/src/pages/biif.tsx`)
- [ ] Placeholder. Build or remove route

### 13. Brand Protocol — Logo Images in Headers
- [ ] Headers/titles still use text "businessblueprint.io" — swap to logo image
- [ ] Same for hostsblue.com, swipesblue.com, builderblue2.com, scansblue.com

### 14. Mobile Responsive Pass
- [ ] Verify every page works on mobile viewport
- [ ] Priority: client-portal, bundle-section, side-nav, all dashboards

---

## RULES
- Read `app-registry.ts` before touching any product data
- Never abbreviate brand names (always businessblueprint.io)
- Side-nav and dashboard read from registry — don't hardcode
- Commit after each numbered section
- Test on mobile viewport after every change
- If a feature can't be completed (needs API keys, third-party setup), mark it honestly as "Coming Soon" in the UI rather than showing a broken button

## KEY FILES
- App registry: `client/src/config/app-registry.ts`
- Bundle sections: `client/src/components/bundle-section.tsx`
- Side nav: `client/src/components/side-nav.tsx`
- Client portal: `client/src/pages/client-portal.tsx`
- Main routes: `server/routes.ts`
- CRM routes: `server/routes/crm.ts`
- Schema: `shared/schema.ts`
- SEO routes: `server/routes/optimize.ts`
- Amplify routes: `server/routes/amplify.ts`
- Send routes: `server/routes/send.ts`
- Chat routes: `server/routes/chat.ts`
- Content routes: `server/routes/content.ts`
- Post management: `client/src/pages/post-management.tsx`
