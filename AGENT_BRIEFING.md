# AGENT BRIEFING — businessblueprint.io
# Written: April 7, 2026
# Author: Claude Opus 4.6 (prior agent session)
# Purpose: Bring the next agent fully up to speed

---

## READ THESE FIRST (NON-NEGOTIABLE)

1. **Global rules**: `/Users/deanlewis/.claude/CLAUDE.md` — brand colors, naming, payment rules, audience, copy standards, verification requirements
2. **Project rules**: `/Users/deanlewis/businessblueprint/CLAUDE.md` — architecture, app ecosystem, pricing, sidebar structure, completed/pending work
3. **Remote brand rules**: `curl -s "https://linkblue-githubproxy.up.railway.app/api/github/file?repo=.github&path=CLAUDE.md"`

If you skip these, you will break something. Dean does not tolerate placeholder work, wrong brand names, or decisions made without his direction.

---

## WHAT THIS PROJECT IS

**businessblueprint.io** is the flagship SaaS platform for TRIADBLUE Inc. It assesses a local business's online presence, diagnoses what's broken, prescribes targeted app solutions, and provides Directions for Use.

**Stack**: React + TypeScript + Tailwind + shadcn/ui + Express + Drizzle ORM + PostgreSQL + Wouter
**Deployment**: Replit (production), also connected to GitHub at `TRIADBLUE/businessblueprint`
**Local path**: `/Users/deanlewis/businessblueprint`

---

## THE APP ECOSYSTEM

9 apps organized into suites + standalone:

### Compass Suite — $99/mo (communications)
| App | Color | Standalone |
|-----|-------|-----------|
| / promote | #1844A6 | $29/mo |
| / engage | #660099 | $29/mo |
| / respond | #001882 | $29/mo |
| / post | #FF44CC | $29/mo |

### Anchor Suite — $99/mo (local presence)
| App | Color | Standalone |
|-----|-------|-----------|
| / publish | #064A6C | $29/mo |
| / elevate | #E9B307 | $29/mo |
| / optimize | #374151 | $29/mo |
| / amplify | #97ACCA | $29/mo |

### Standalone
- **/ connect CRM** (#008060) — FREE Starter (100 contacts) or $29/mo Performance. Never bundled.
- **Coach Blue** (#0000FF) — $99/mo standalone, $59/mo with one suite, FREE with both suites.

### Diagnostic Apps
- / scan (#E00420), / assess (#960D71)

### Setup Cadence (fixed order)
1. / connect → 2. / publish → 3. / elevate → 4. / respond → 5. / engage → 6. / post → 7. / promote → 8. / amplify

---

## KEY FILES MAP

| File | Purpose | Size |
|------|---------|------|
| `shared/schema.ts` | Database schema — 50+ tables, single source of truth | ~121KB |
| `server/routes.ts` | Main routes — 100+ endpoints | ~157KB |
| `server/routes/crm.ts` | CRM routes | ~81KB |
| `server/routes/content.ts` | / post routes (posts, media, platforms, analytics, AI) | ~893 lines |
| `server/routes/amplify.ts` | / amplify routes (campaigns, audiences, budget, Reddit) | ~2393 lines |
| `client/src/config/app-registry.ts` | SINGLE SOURCE OF TRUTH for app names, colors, pricing |
| `client/src/components/side-nav.tsx` | Sidebar navigation (3 zones: Tools / Guide / Admin) |
| `client/src/components/header.tsx` | Header component |
| `client/src/App.tsx` | App router |
| `server/services/timeline-logger.ts` | CRM timeline logging — `logContactActivity()` |
| `server/services/reviewSync.ts` | Review sync from Google/Yelp + response push + contact matching |
| `server/services/analyticsSync.ts` | Post analytics sync from connected platforms |
| `server/services/googlePlaces.ts` | Google Places API + review reply |
| `drizzle.config.ts` | Uses `DATABASE_URL` env var for db:push |

---

## WHAT WAS DONE THIS SESSION (April 7, 2026)

Commit: `821565a` — `feat: complete spoke apps — elevate review push + contact matching, post analytics tab, amplify CRM audiences`

### Part 1 — / elevate (Review Response Push + Contact Matching)
- **Added** `replyToReview()` method to `server/services/googlePlaces.ts` — pushes review replies to Google My Business API via `PUT /v4/accounts/{accountId}/locations/{locationId}/reviews/{reviewId}/reply`
- **Rewrote** `respondToReview()` in `server/services/reviewSync.ts`:
  1. Saves response to DB (existing)
  2. Attempts Google API push if Google Business OAuth credentials exist
  3. Matches reviewer name to CRM contacts (full name match, then unique first-name match)
  4. Logs `review_responded` event to CRM timeline via `logContactActivity()`
- **Added** contact matching on incoming review sync (both Google and Yelp loops in `syncClientReviews`):
  - Matches reviewer to CRM contact by name
  - Logs `review_received` event to CRM timeline
- **Added** `sql` import to drizzle-orm imports in reviewSync.ts
- Note: Yelp API does NOT support automated review replies — this is a platform limitation, not a code gap

### Part 2 — / post (Analytics Tab + Engagement Data)
- **Added** `analyticsData` query to `post-management.tsx` — fetches from `/api/post/${clientId}/analytics`
- **Replaced** the "Coming Soon" placeholder in the analytics tab with real engagement metrics:
  - Aggregate cards: Likes, Comments, Shares, Impressions (using `#FF44CC` / post color)
  - Per-post breakdown showing platform + engagement per post
  - Empty state when no analytics data exists
- **Added** Sync button that calls `POST /api/post/${clientId}/analytics/sync`
- **Added** `POST /:clientId/analytics/sync` endpoint in `server/routes/content.ts` — triggers `analyticsSyncService.syncClientAnalytics()`
- **Added** engagement milestone logging in `analyticsSync.ts`
- **Added** `RefreshCw` to Lucide imports
- **Removed** "Coming Soon" badge from analytics tab

### Part 3 — / amplify (CRM Audience Targeting)
- **Schema change**: Added `sourceType` (varchar 50) and `crmFilter` (jsonb) columns to `amplify_audiences` table in `shared/schema.ts`
- **Added** `POST /api/amplify/audiences/from-crm` endpoint in `server/routes/amplify.ts`:
  - Creates audiences from CRM contacts with optional filters (lifecycleStage, leadSource, status)
  - Logs `ad_campaign_targeted` timeline events for each contact (capped at 500)
- **Added** `POST /api/amplify/attribute` endpoint:
  - Logs ad attribution (`ad_attribution` event) linking a contact to a campaign
  - Accepts UTM parameters
- **Added** `CrmAudienceCard` component in `amplify-dashboard.tsx`:
  - Audience name input
  - Contact filter dropdown (All, Customers, Leads, Subscribers)
  - Target platform dropdown (Meta, Google, Reddit)
  - "Build Audience from / connect" button
- **Removed** `ComingSoonCard` component (was unused but contained "Coming Soon" badge)

---

## PENDING SCHEMA MIGRATION

The schema change (2 new nullable columns on `amplify_audiences`) has NOT been pushed to the production database yet.

**To push**: In the Replit Shell, run:
```bash
git pull --rebase origin main && DATABASE_URL="$DATABASE_URL" npm run db:push
```
Check `env | grep -i database` first to confirm you're hitting the production DB, not a dev instance.

---

## PENDING WORK (from CLAUDE.md)

- SwipesBlue `POST /api/v1/checkout/sessions` endpoint (redirect + embedded modes)
- 11 `STRIPE_` env vars need deletion from Railway environment
- `schema.ts` `paymentProvider` default "stripe" → "swipesblue"
- Ecosystem footer taglines need updating (prompt written: `ECOSYSTEM_FOOTER_1_BUSINESSBLUEPRINT.md`)

---

## CRITICAL RULES FOR ALL AGENTS

1. **Payment**: ALL payment goes through swipesblue.com. The words "Stripe" and "NMI" must NEVER appear in any TRIADBLUE codebase except swipesblue itself.
2. **No "Coming Soon"**: Never add it. Remove it if you find it.
3. **No placeholder content**: Everything must be production-ready.
4. **No old names**: CommVerse, Commverse, LocalBlue, Localblue, AI Coach, AICoach — these are dead.
5. **Brand colors**: Triad Black #09080E, Triad White #E9ECF0 (not #FFFFFF on dark backgrounds), Triad Gray #808080. Pure Blue #0000FF is logo-only, never in UI.
6. **Font**: Archivo Semi Expanded
7. **App names always link**: Every app name displayed anywhere must be clickable.
8. **Section dividers**: Always include visible borders/lines between sections.
9. **Dark backgrounds**: WHITE TEXT ONLY. No app colors. No exceptions.
10. **Verification**: Before reporting task complete, read actual file content. Show changed lines as proof. Tables of checkmarks are not verification.
11. **Dean decides**: Never make architecture, business, or product decisions without his explicit direction.
12. **TRIADBLUE is always ALL CAPS**. All other platform names are lowercase: businessblueprint.io, hostsblue.com, swipesblue.com, scansblue.com, Console.Blue

---

## CONNECT HUB (Most Recent Feature Before This Session)

The Connect hub has cross-app activity logging across 4 phases (commit `3bff5ee`). Timeline logger infrastructure, app colors, and event icons are all in place. The `logContactActivity()` function in `server/services/timeline-logger.ts` is the single entry point for all CRM timeline events. It accepts:

```typescript
{
  clientId: number;
  contactId: number;
  eventType: string;        // e.g. 'review_received', 'review_responded', 'ad_campaign_targeted', 'ad_attribution'
  eventSubtype?: string;
  title: string;
  description?: string;
  sourceApp: string;        // promote, post, elevate, respond, engage, publish, optimize, connect, amplify
  sourceEntityType?: string;
  sourceEntityId?: string;
  metadata?: Record<string, any>;
  actorType?: 'user' | 'system' | 'automation';
}
```

---

## DIGITAL IQ SCORING

Digital IQ = Scan Score (0-70) + Operational Score (0-70) = 0-140
Grade Scale: A (120-140), B (100-119), C (80-99), D (60-79), F (0-59)
9 categories mapped 1:1 to 9 apps.

---

## SIDEBAR STRUCTURE (3 Zones)

1. **Your Tools** — / connect + Anchor Suite apps + Compass Suite apps
2. **Your Guide** — Coach Blue + Digital IQ + Directions for Use
3. **Admin** — Settings (Billing inside Settings as sub-section)

---

## CHAT WIDGET

Two tabs: Tab 1 = Support Agent (Socket.IO), Tab 2 = Coach Blue (REST API)
Non-subscribers see Coach Blue tab grayed out.

---

## DEAN'S PREFERENCES

- Does NOT want work lost between sessions
- Expects documentation of all plans and progress
- Works across Replit + Claude Code + Claude Chat
- Always backup before destructive operations
- Mobile development is mandatory for every change
- Prefers terse responses — no trailing summaries
- Uses full URL format for platform names (businessblueprint.io, not "BusinessBlueprint")
- Logo images in headers, not text

---

*End of briefing.*
*TRIADBLUE Inc. — businessblueprint.io*
