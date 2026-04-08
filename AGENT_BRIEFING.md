# AGENT BRIEFING — businessblueprint.io
# Written: April 8, 2026
# Author: Claude Opus 4.6 (session 2)
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

| File | Purpose | Lines |
|------|---------|-------|
| `shared/schema.ts` | Database schema — 50+ tables, single source of truth | ~4165 |
| `server/routes.ts` | Main routes — 100+ endpoints | ~4292 |
| `server/routes/crm.ts` | CRM routes | ~2502 |
| `server/routes/amplify.ts` | / amplify routes (campaigns, audiences, budget, Reddit OAuth) | ~2496 |
| `server/routes/content.ts` | / post routes (posts, media, platforms, analytics, AI) | ~909 |
| `server/routes/dnb.ts` | D&B DUNS routes (status, lookup, verify, profile, manual) | ~220 |
| `server/services/dnb.ts` | D&B Direct+ API service (OAuth2, lookup, verify, profile) | ~368 |
| `server/services/timeline-logger.ts` | CRM timeline logging — `logContactActivity()` | ~38 |
| `server/services/reviewSync.ts` | Review sync from Google/Yelp + response push + contact matching |
| `server/services/analyticsSync.ts` | Post analytics sync from connected platforms |
| `server/services/googlePlaces.ts` | Google Places API + review reply |
| `server/services/listing-distribution/listingAdapterFactory.ts` | Factory for 9 listing adapters (incl. D&B) | ~70 |
| `server/services/listing-distribution/adapters/dnbAdapter.ts` | D&B listing distribution adapter | ~98 |
| `client/src/config/app-registry.ts` | SINGLE SOURCE OF TRUTH for app names, colors, pricing |
| `client/src/components/side-nav.tsx` | Sidebar navigation (3 zones: Tools / Guide / Admin) |
| `client/src/components/header.tsx` | Header component |
| `client/src/App.tsx` | App router |
| `client/src/pages/publish-dashboard.tsx` | / publish dashboard (includes D&B DUNS section) | ~1200 |
| `client/src/pages/about.tsx` | About page (rewritten this session — ecosystem logos, apps) | ~192 |
| `client/src/pages/contact.tsx` | Contact page (cleaned this session — no yellow, real info) | ~136 |
| `shared/routes.ts` | Route manifest for sitemap (cleaned this session — no dead routes) | ~119 |
| `drizzle.config.ts` | Uses `DATABASE_URL` env var for db:push |

---

## WHAT WAS DONE THIS SESSION (April 7-8, 2026)

### Commit `c9bc485` — D&B DUNS Number Integration (/ publish)
**5-part integration of Dun & Bradstreet DUNS number lookup/verification:**

1. **Schema** (`shared/schema.ts`):
   - Added `dunsNumber` (varchar 9) to `clients` table
   - Added 7 DUNS columns to `canonicalBusinessProfiles`: `dunsNumber`, `dunsVerified`, `dunsVerifiedAt`, `dunsMatchConfidence`, `dunsCompanyName`, `dunsAddress`, `dunsLastChecked`

2. **D&B Service** (`server/services/dnb.ts`):
   - OAuth2 client credentials flow with token caching
   - `lookupDuns()` — match business by name+address → DUNS number + confidence
   - `getCompanyProfile()` — full firmographic data by DUNS number
   - `verifyDuns()` — check if DUNS is valid and active
   - Graceful fallback when `DNB_API_KEY`/`DNB_API_SECRET` not set

3. **API Routes** (`server/routes/dnb.ts`, registered in `server/routes.ts` line ~3190):
   - `GET /api/dnb/status` — config check + current DUNS status for client
   - `POST /api/dnb/lookup` — auto-lookup from canonical profile data
   - `POST /api/dnb/verify` — verify + mark as verified in DB
   - `GET /api/dnb/profile/:dunsNumber` — full D&B company profile
   - `POST /api/dnb/manual` — manually enter a known DUNS number

4. **Publish Dashboard** (`client/src/pages/publish-dashboard.tsx`):
   - D&B DUNS card at top of Overview tab with 3 states: verified, found-not-verified, no DUNS
   - Auto-lookup button pulls from canonical business profile
   - Manual entry with 9-digit validation
   - Link to apply for free DUNS at D&B when not found

5. **Listing Adapter** (`server/services/listing-distribution/adapters/dnbAdapter.ts`):
   - Registered in factory as `dnb`, reports 12 downstream directories
   - Verify/update support via `BaseListingAdapter` interface

### Commit `15e8aec` — Site-Wide Page Cleanup (8 files)

1. **`shared/routes.ts`** — Full rewrite of `routeManifest`. Removed all dead routes (CommVerse, LocalBlue, /send, /inbox, /livechat, /content, /listings, /reputation, /relationships, /ai-coach, /subscription, /pathways, /biif, /tour, /brand-studio, /logo-preview). Added correct Compass Suite, Anchor Suite, / connect, Coach Blue, Portal routes.

2. **`client/src/pages/about.tsx`** — Full rewrite. Clean hero with Archivo font on `bg-[#E9ECF0]`, "What We Do" section, apps in two columns with "/" + color rendering, CTA with `#09080E` button. No fake stats, no team section.

3. **`client/src/pages/contact.tsx`** — Full rewrite. Replaced `bg-gray-50` → `bg-[#E9ECF0]`, all yellow → `#064A6C`/`#09080E`, removed "empower" references, added Archivo font. Real contact info: contact@businessblueprint.io, +1 (575) 201-3515, Mon-Sat 8am-5pm MST.

4. **`client/src/pages/find-results.tsx`** — `bg-gray-50` → `bg-[#E9ECF0]` on both page-level divs.

5. **`client/src/pages/knowledge-base.tsx`** — Score labels updated to 5 correct ranges (Exceptional/Strong/Building Momentum/Room to Grow/Getting Started) with brand colors. `DIGITAL_IQ_AREAS` updated to 9 areas mapped 1:1 to apps with ~7.78 pts each. FAQs fixed (removed DIY/Managed Services). Step 4 now references Directions for Use + Coach Blue.

6. **`client/src/pages/assessment-confirmation.tsx`** — Removed all `dark:` classes, gradient → `bg-[#E9ECF0]`, "Google Business Intelligence" → "our proprietary digital scanner", "Expert Review & Delivery (within 24 hours)" → "Prescription Delivery (2-3 minutes)", manual review → automatic delivery.

7. **`client/src/pages/client-portal.tsx`** — Removed all `dark:` classes, Digital IQ card gradient → `bg-[#09080E]`, three `bg-gray-50` → `bg-[#E9ECF0]`.

8. **`client/src/pages/api-docs.tsx`** — Removed all `dark:` classes, hero gradient → `bg-[#E9ECF0]`, added Archivo font to heading.

### Commit `1f7b128` — Reddit OAuth Callback Fix
- All 4 response paths in the Reddit OAuth callback (`server/routes/amplify.ts` ~line 272) now `res.redirect()` to `/amplify/dashboard?connected=reddit` or `?error=...` instead of returning JSON.

### Commit `2de0ff6` — About Page Ecosystem Logos
- Replaced plain-text ecosystem section with actual logo images (same as footer pattern): `triadblueEcosystem`, `bbLogo`, `swipesLogo`, `hostsLogo`, `scansLogo`, `builderLogo`.
- Removed `BrandLogo` component import and `ECOSYSTEM` const.

---

## PENDING SCHEMA MIGRATION

The D&B schema changes (DUNS fields on `canonicalBusinessProfiles` + `clients`) and the amplify schema changes (`sourceType`/`crmFilter` on `amplify_audiences`) need to be pushed to production.

**To push on Replit Shell:**
```bash
git pull --rebase origin main && DATABASE_URL="$DATABASE_URL" npm run db:push
```
Check `env | grep -i database` first to confirm you're hitting the production DB.

**Dean was given this command.** If the schema push already happened, these columns will already exist and `db:push` will be a no-op.

---

## PENDING WORK (from CLAUDE.md)

- SwipesBlue `POST /api/v1/checkout/sessions` endpoint (redirect + embedded modes)
- 11 `STRIPE_` env vars need deletion from Railway environment
- `schema.ts` `paymentProvider` default "stripe" → "swipesblue"
- Ecosystem footer taglines need updating (prompt written: `ECOSYSTEM_FOOTER_1_BUSINESSBLUEPRINT.md`)

---

## PAGES THAT STILL NEED CLEANUP

The site-wide cleanup (commit `15e8aec`) covered 8 files. These pages were NOT touched and may still have issues:

- `client/src/pages/journey.tsx` — still references "Google Business Intelligence" (confirmed via grep)
- `client/src/pages/biif.tsx` — exists but route was removed from manifest; may need deletion or redirect
- `client/src/pages/checkout.tsx` — may have old yellow/dark: patterns
- `client/src/pages/optimize.tsx` — not audited
- `client/src/pages/assessment-form.tsx` — not audited
- `client/src/pages/promote-api-docs.tsx` — not audited

---

## CRITICAL RULES FOR ALL AGENTS

1. **Payment**: ALL payment goes through swipesblue.com. The words "Stripe" and "NMI" must NEVER appear in any TRIADBLUE codebase except swipesblue itself.
2. **No "Coming Soon"**: Never add it. Remove it if you find it.
3. **No placeholder content**: Everything must be production-ready.
4. **No old names**: CommVerse, Commverse, LocalBlue, Localblue, AI Coach, AICoach — these are dead.
5. **Brand colors**: Triad Black #09080E, Triad White #E9ECF0 (not #FFFFFF on dark backgrounds), Triad Gray #808080. Pure Blue #0000FF is logo-only, never in UI.
6. **Font**: Archivo Semi Expanded for headings.
7. **App names always link**: Every app name displayed anywhere must be clickable.
8. **Section dividers**: Always include visible borders/lines between sections.
9. **Dark backgrounds**: WHITE TEXT ONLY. No app colors. No exceptions.
10. **No dark mode**: Do not add `dark:` classes. We do not have dark mode.
11. **No bg-gray-50**: Use `bg-[#E9ECF0]` or `bg-white` for page backgrounds.
12. **No yellow/gold/indigo as accent colors**: Not brand colors.
13. **No "Managed Services" or "DIY"**: These concepts do not exist in our product.
14. **No fabricated statistics**: If we don't have real numbers, don't make them up.
15. **No "Google Business Intelligence"**: Our scanner is proprietary.
16. **Score labels**: Exceptional (130-140), Strong (115-129), Building Momentum (100-114), Room to Grow (85-99), Getting Started (70-84). NO letter grades.
17. **Verification**: Before reporting task complete, read actual file content. Show changed lines as proof.
18. **Dean decides**: Never make architecture, business, or product decisions without his explicit direction.
19. **TRIADBLUE is always ALL CAPS**. All other platform names are lowercase.
20. **Always push after commit**: Do not ask — just push to origin immediately.

---

## CONNECT HUB + TIMELINE LOGGER

The Connect hub has cross-app activity logging across 4 phases (commit `3bff5ee`). The `logContactActivity()` function in `server/services/timeline-logger.ts` is the single entry point for all CRM timeline events:

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
Grade Scale: Exceptional (130-140), Strong (115-129), Building Momentum (100-114), Room to Grow (85-99), Getting Started (70-84)
9 categories mapped 1:1 to 9 apps. Each ~7.78 points.

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

## D&B DUNS INTEGRATION (NEW THIS SESSION)

The D&B Direct+ API requires a subscription. Dean needs to obtain `DNB_API_KEY` and `DNB_API_SECRET` from D&B and add them to the environment. The service gracefully handles missing credentials — everything works except live API calls, and the manual entry path is always available.

**API endpoints:**
- Auth: `POST https://plus.dnb.com/v2/token` (Basic auth with key:secret)
- Match: `POST https://plus.dnb.com/v1/match/cleanseMatch`
- Profile: `GET https://plus.dnb.com/v1/data/duns/{dunsNumber}?blockIDs=companyinfo_L1_v1`

**Listing adapter** registered in factory as `dnb` — reports 12 downstream directories (Apple Maps, Bing, Yahoo, MapQuest, etc.)

---

## CONTACT INFO (CONFIRMED)

- Email: contact@businessblueprint.io
- Phone: +1 (575) 201-3515
- Hours: Mon-Sat 8am-5pm MST
- Office: Remote - businessblueprint.io

---

## ECOSYSTEM TAGLINES (CONFIRMED)

- businessblueprint.io → "Get Assessed. Get Prescribed. Get Business."
- swipesblue.com → "Go Blue. Get Swiped. Get Paid."
- hostsblue.com → "Go Blue. Get Site. Go Live."
- scansblue.com → "Go Blue. Get Scanned. Get Scored."
- BUILDERBLUE2.COM → "Go Blue. Get Vibed. Get Ahead."
- TRIADBLUE.COM → "Six Platforms. One Ecosystem. Go Blue."

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
- **Always push to origin after every commit — never ask, just do it**

---

*End of briefing.*
*TRIADBLUE Inc. — businessblueprint.io*
