# Session Log

## 2026-03-04 — Prompt 1 of 5: App Registry + AppName Component

Created foundational files for site-wide corrections:

- `client/src/config/app-registry.ts` — Single source of truth for all product data (7 slash apps, 2 bundles, Connect CRM, Coach Blue, Digital IQ, How It Works steps, Scanning Tool). Exports types, constants, and helper functions.
- `client/src/components/app-name.tsx` — `AppName` and `BundleHeader` components for rendering app names consistently with correct icons, colors, slash prefix, and descriptions.

No existing files were modified.

## 2026-03-05 — Prompt 2 of 5: Refactor All Menus to Consume app-registry.ts

Rewrote `header.tsx` and `navigation-config.ts` so all product data comes from `app-registry.ts`:

- **navigation-config.ts** — Imports `HOW_IT_WORKS_STEPS` from registry for step icons (replacing placeholder strings).
- **header.tsx** — Removed ~40 old wordmark/icon imports, added registry imports + `AppName`/`BundleHeader` components.
  - **How It Works menu**: Registry step icons replace old badge images. Steps 3 & 5 render bundle names as styled text instead of wordmark images.
  - **Products menu**: All prices now from registry (publish $49, elevate $49, optimize $59, promote $39, respond $39, engage $39, post $39, localblue bundle $99, commverse bundle $99). All colors from registry. LocalBlue/CommVerse app grids use `getAppsByBundle()` loops with `AppName`.
  - **Solutions menu**: Slash apps rendered via `APP_REGISTRY.map()` loop with `AppName`. Non-registry platforms (BusinessBlueprint, HostsBlue, SwipesBlue, ConsoleBlue, ScansBlue) kept with existing icons.
  - **Resources menu**: Platforms column uses `APP_REGISTRY.map()` loop with `AppName`. Bundles listed from `BUNDLE_REGISTRY`.
  - **Mobile menu**: All sections mirror desktop — same registry data, same loops, same components.

Files modified: `header.tsx`, `navigation-config.ts`.

## 2026-03-05 — Prompt 3 of 5: Homepage + Pricing Page

Updated `home.tsx`, `pricing.tsx`, and `how-it-works.tsx` to consume `app-registry.ts`:

- **how-it-works.tsx** — Replaced 5 old badge imports (`badge1`-`badge5`) with `HOW_IT_WORKS_STEPS[i].icon` from registry. Both desktop and mobile sections updated.
- **home.tsx** — Removed 18 old icon/logo imports (sendIcon, sendLogo, inboxIcon, inboxLogo, livechatIcon, livechatLogo, contentIcon, contentLogo, commverseBundle, commverseIcon, localBlueLogo, heroAssessmentIcon, heroCoachIcon, blueprintToGrowthIcon, badge2-5). Added registry imports + `AppName`/`BundleHeader`.
  - **Hero steps**: Registry step icons replace old badges. Steps 3 & 5 render bundle names as styled text (`/ localblue` in #0000FF, `/ commverse` in #F97316) instead of wordmark images.
  - **CTA buttons**: `heroAssessmentIcon` → `DIGITAL_IQ.icon`, `heroCoachIcon` → `COACH_BLUE.icon`.
  - **CommVerse Bundle section**: Header uses `BundleHeader`. Individual apps use `AppName` via `getAppsByBundle("commverse").map()`. Prices corrected: $35→$39, $140→$156, $100→$99, $40→$57 savings. Color corrected: #FF6B00→#F97316.
  - **Prescription section**: Card 3 references both LocalBlue + CommVerse bundles with styled text, expanded app list.
  - **Apps Overview section**: All 4 cards use `AppName` instead of old icon+logo pairs, wrapped in `Link` to `landingRoute`.
  - **Base Plans section**: CommVerse image replaced with styled text; mentions both bundles.
  - **Platform Ecosystem**: App list expanded to include all 8 slash apps (publish, elevate, optimize, promote, respond, engage, post, connect).
- **pricing.tsx** — Complete rewrite. White background, all data from registry.
  - Section 1: Digital IQ Assessment (FREE) with flow diagram using `HOW_IT_WORKS_STEPS`.
  - Section 2: / connect CRM (Free/\$29 tiers) + Coach Blue (\$99/\$59/FREE tiers).
  - Section 3: / localblue bundle (\$99/mo, 3 apps via `getAppsByBundle`).
  - Section 4: / commverse bundle (\$99/mo, 4 apps via `getAppsByBundle`).
  - Section 5: Full Picture comparison (All Standalone vs Both Bundles + CRM, computed from registry).
  - Section 6: Pricing rules text block.

Files modified: `home.tsx`, `pricing.tsx`, `how-it-works.tsx`.

## 2026-03-05 — Prompt 4 of 5: Landing Pages

Audited and fixed all 11 landing pages to consume `app-registry.ts`:

- **send-landing.tsx** (/ promote) — Removed `sendIcon`/`sendLogo` imports. Added `AppName appId="promote"` in hero. Color: #E6B747→#1844A6. Price: $35→$39 standalone, $75→$99 bundle. Bundle text: "3 apps"→"4 apps". AddToCart price from registry.
- **respond-landing.tsx** (/ respond) — Removed `inboxIcon`/`inboxLogo` imports. Added `AppName appId="respond"` in hero. Color: #0080FF→#6EA6FF. Price: $35→$39, $100→$99 bundle.
- **livechat-landing.tsx** (/ engage) — Removed `livechatIcon`/`livechatLogo` imports. Added `AppName appId="engage"` in hero. Color #8000FF correct (kept). Price: $35→$39, $100→$99 bundle.
- **post-landing.tsx** (/ post) — Removed `contentIcon`/`contentLogo` imports. Added `AppName appId="post"` in hero. Color: #FC6ACD→#FF44CC. Price: $35→$39, $75→$99 bundle.
- **list-landing.tsx** (/ publish) — Removed `listingsIcon`/`listingsLogo` imports. Added `AppName appId="publish"` in hero. Color: #FF0040→#064A6C. Price: $40→$49, $60→$99 bundle. Bundle text: "2 apps"→"3 apps".
- **review-landing.tsx** (/ elevate) — Removed `reputationIcon`/`reputationLogo` imports. Added `AppName appId="elevate"` in hero. Color: #D59600→#E9B307. Price: $40→$49, $60→$99 bundle. Bundle text: "2 apps"→"3 apps".
- **optimize-landing.tsx** (/ optimize) — Added `AppName appId="optimize"` in hero (replacing lucide Target icon + inline text). Price: FREE/$29→$59/$99 bundle. Pricing callout shows standalone + LocalBlue bundle pricing.
- **relationships-landing.tsx** (/ connect) — Removed `relationshipsIcon` import. Added `AppName appId="connect"` in hero. Color: #0000FF→#008060. AddToCart price from `CONNECT_CRM.tiers[1].price`.
- **localblue-landing.tsx** — Removed `badge3`/`localBlueLogo` imports. Added `BundleHeader bundleId="localblue"` in hero. Bundle price: $49.50→$99. Standalone range: $29-40→$49-59.
- **commverse-landing.tsx** — Removed `sendIcon`/`inboxIcon`/`livechatIcon` imports. Added `BundleHeader bundleId="commverse"` in hero. App grid now uses `getAppsByBundle("commverse").map()` with `AppName` — shows all 4 apps (was 3, missing /post). Color: #0080FF→#F97316. Price: $35→$39, $75→$99. Text: "Three"→"Four", savings computed from registry.
- **ai-coach.tsx** — Complete rewrite from 32-line stub to full landing page. Hero with Coach Blue icon + name from `COACH_BLUE`. Loyalty pricing section ($99/$59/FREE). Features grid (6 items). Gradient "How Pricing Works" section with bundle integration info. CTA section. Color: #A855F7 from registry. AddToCart price from `COACH_BLUE.standalonePrice`.

All pages: `AppName`/`BundleHeader` components for product names, prices from registry constants, colors from registry, no hardcoded old imports.

Files modified: `send-landing.tsx`, `respond-landing.tsx`, `livechat-landing.tsx`, `post-landing.tsx`, `list-landing.tsx`, `review-landing.tsx`, `optimize-landing.tsx`, `relationships-landing.tsx`, `localblue-landing.tsx`, `commverse-landing.tsx`, `ai-coach.tsx`.

## 2026-03-05 — Prompt 5 of 5: Global Cleanup + Continuity Updates

### Part A: Global Find/Replace

Searched entire client codebase for old app names in user-facing strings. Fixed:

- **tour.tsx** — `/reputation` → `/ elevate` (line 216); "Send + Inbox + Content + LiveChat" → "/ promote + / respond + / post + / engage" (line 403)
- **chat-dashboard.tsx** — `/ chat - Live Chat Dashboard` → `/ engage - Live Chat Dashboard` (line 242)
- **send-dashboard.tsx** — All `/send/` navigation routes → `/promote/` (campaigns/new, campaigns/new?type=sms, contacts/import, templates, automations — 6 occurrences)
- **dashboard.tsx** — LocalBlue price `$59/month` → `$99/month` (line 94)
- **send-api-docs.tsx** — CommVerse bundle description updated to include / post; price `$119` → `$99`; "Everything in /send" → "Everything in / promote"
- **commverse-pricing.tsx** — All individual app prices `$35` → `$39`; bundle price `$119` → `$99`; savings `$21` → `$57`; / promote color `#E6B747` → `#1844A6`; / respond color `#0080FF` → `#6EA6FF`; / post color `#EF4444` → `#FF44CC`; bundle color `#FC6ACD` → `#F97316`; hero accent `#00FF40` → `#F97316`; broken `/content/dashboard` link → `/post-landing`
- **marketplace.tsx** — All CommVerse app prices `$35` → `$39`; / optimize price `$29` → `$59`; CommVerse bundle price `$119` → `$99`; savings `$21` → `$57`

### Part B: Route Verification

All routes in App.tsx verified against registry — no mismatches found. Key routes confirmed:
- `/promote` → SendLanding, `/promote-app` → SendDashboard
- `/respond` → RespondLanding, `/respond-app` → RespondPage
- `/engage` → LivechatLanding, `/engage/dashboard` → ChatDashboard
- `/post-landing` → PostLanding, `/post` → PostManagement
- `/publish-landing` → ListLanding, `/publish-app` → ListManagement
- `/elevate-landing` → ReviewLanding, `/elevate-app` → ReviewManagement
- `/optimize` → OptimizeLanding, `/optimize/dashboard` → OptimizeDashboard
- `/connect` → RelationshipsLanding, `/connect/dashboard` → RelationshipsDashboard
- `/ai-coach` → AICoachPage, `/assessment` → Assessment
- `/localblue` → LocalBlueLanding, `/commverse` → CommverseLanding

### Part C: Continuity Files

- **Created** `docs/continuity/ECOSYSTEM_DECISIONS.md` — Brand rules, app colors, pricing, / optimize details
- **Created** `docs/continuity/CURRENT_STATE.md` — Full status of all work across Prompts 1-5
- **Updated** `docs/continuity/DECISIONS.md` — Added decisions 5-9 (live text rendering, tier rename, loyalty pricing, bundle prices, color values)
- **Updated** `docs/continuity/SESSION_LOG.md` — This entry

### Complete File List (All 5 Prompts)

**Prompt 1 — Created:**
- `client/src/config/app-registry.ts`
- `client/src/components/app-name.tsx`

**Prompt 2 — Modified:**
- `client/src/components/header.tsx`
- `client/src/components/navigation-config.ts`

**Prompt 3 — Modified:**
- `client/src/pages/home.tsx`
- `client/src/pages/pricing.tsx`
- `client/src/pages/how-it-works.tsx`

**Prompt 4 — Modified:**
- `client/src/pages/send-landing.tsx`
- `client/src/pages/respond-landing.tsx`
- `client/src/pages/livechat-landing.tsx`
- `client/src/pages/post-landing.tsx`
- `client/src/pages/list-landing.tsx`
- `client/src/pages/review-landing.tsx`
- `client/src/pages/optimize-landing.tsx`
- `client/src/pages/relationships-landing.tsx`
- `client/src/pages/localblue-landing.tsx`
- `client/src/pages/commverse-landing.tsx`
- `client/src/pages/ai-coach.tsx`

**Prompt 5 — Modified:**
- `client/src/pages/tour.tsx`
- `client/src/pages/chat-dashboard.tsx`
- `client/src/pages/send-dashboard.tsx`
- `client/src/pages/dashboard.tsx`
- `client/src/pages/send-api-docs.tsx`
- `client/src/pages/commverse-pricing.tsx`
- `client/src/pages/marketplace.tsx`
- `docs/continuity/ECOSYSTEM_DECISIONS.md` (created)
- `docs/continuity/CURRENT_STATE.md` (created)
- `docs/continuity/DECISIONS.md` (updated)
- `docs/continuity/SESSION_LOG.md` (updated)

## 2026-03-05 — Menu + Pricing + Image Cleanup

### Part 1: menu-config.ts
Created `client/src/config/menu-config.ts` — single source of truth for all menu structure. Defines `NAV_ITEMS`, `HOW_IT_WORKS_MENU`, `SOLUTIONS_MENU`, `RESOURCES_MENU`. Imports all product data from app-registry.ts; imports platform icons (BusinessBlueprint, HostsBlue, SwipesBlue, ConsoleBlue, ScansBlue) and SVG utility icons. Re-exports registry items for header convenience.

### Part 2: pricing-layout.tsx + header.tsx rewrite
- Created `client/src/components/pricing-layout.tsx` — shared pricing component with `variant: "menu" | "page"`. Exact layout: Digital IQ → Connect + Coach Blue (50/50) → LocalBlue bundle (3 apps) → CommVerse bundle (4 apps) → Full Picture totals. All data from registry, all names via `<AppName>`/`<BundleHeader>`, white bg, Archivo Semi Expanded font.
- Rewrote `client/src/components/header.tsx` (~500 lines, down from ~1740) to consume menu-config.ts. Products mega menu uses `<PricingLayout variant="menu" />`.
- Simplified `client/src/pages/pricing.tsx` to minimal wrapper around `<PricingLayout variant="page" />`.

### Part 3: Image Cleanup
- Archived 237 unreferenced images to `attached_assets/archived_2026_03/`
- Reorganized all remaining active assets into clean directories:
  - `icons/` — 16 SVG utility icons (unchanged)
  - `brand/` — bb-favicon, bb-header-logo, bb-logo-only, coach-blue-icon, relationships-icon, etc.
  - `platforms/` — hostsblue-brandmark, hostsblue-url, hostsblue-lockup, swipesblue-brandmark, swipesblue-lockup, consoleblue-favicon, scansblue-icon, business-iq-scanner
  - `app-icons/` — send/inbox/livechat/content/listings/reputation icons & logos, diy, managed-services, a-la-carte, captaining, settings, digital-path, digital-success, etc.
  - `new logos and wordmarks/` — untouched (used by app-registry.ts)
- Updated ALL import paths across 14 source files
- Updated runtime `/attached_assets/` paths in client-portal.tsx (10 path replacements, 25 occurrences)
- Removed dead file `client/src/components/navigation-config.ts`

### Files created:
- `client/src/config/menu-config.ts`
- `client/src/components/pricing-layout.tsx`

### Files modified:
- `client/src/components/header.tsx` (rewritten)
- `client/src/pages/pricing.tsx` (simplified)
- `client/src/components/side-nav.tsx` (21 import paths)
- `client/src/components/brand-logo.tsx` (16 import paths)
- `client/src/components/brand-icons.tsx` (4 import paths)
- `client/src/components/ai-coach-pricing.tsx` (1 import path)
- `client/src/components/pathway-icons.tsx` (6 import paths)
- `client/src/components/digital-blueprint.tsx` (1 import path)
- `client/src/pages/journey.tsx` (6 import paths)
- `client/src/pages/home.tsx` (4 import paths)
- `client/src/pages/marketplace.tsx` (1 import path)
- `client/src/pages/marketplace-checkout.tsx` (1 import path)
- `client/src/pages/pathways.tsx` (4 import paths)
- `client/src/pages/relationships.tsx` (2 import paths)
- `client/src/pages/client-portal.tsx` (10 runtime path replacements)

### Files deleted:
- `client/src/components/navigation-config.ts` (dead code)
