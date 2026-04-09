# CLAUDE.md — businessblueprint.io
# Last updated: April 9, 2026

---

## READ THE UNIVERSAL RULES FIRST

Before doing ANY work, fetch and read the TRIADBLUE universal brand rules:
```
curl -s "https://linkblue-githubproxy.up.railway.app/api/github/file?repo=.github&path=CLAUDE.md"
```
Those rules govern colors, fonts, naming, payments, and ecosystem standards. They are non-negotiable.

---

## PLATFORM IDENTITY

**Name:** businessblueprint.io
**Tagline:** Get Assessed. Get Prescribed. Get Business.
**Role:** Flagship platform — local business marketing and management SaaS
**Stack:** React + TypeScript + Tailwind + shadcn/ui + Express + Drizzle ORM + PostgreSQL + Wouter
**Deployment:** Railway (migrated from Replit 2026-04-09)
**Database:** Neon PostgreSQL (Dean-owned project, separate from Replit)
**Object Storage:** Cloudflare R2 — bucket `content-storage`, ENAM region. Used for / post media uploads. Env vars: `CLOUDFLARE_R2_ACCESS_KEY_ID`, `CLOUDFLARE_R2_SECRET_ACCESS_KEY`, `CLOUDFLARE_R2_ENDPOINT`, `CLOUDFLARE_R2_BUCKET`.
**Auth:** Magic-link + credential auth (production). Replit OIDC removed. Future: OpenAuth on Cloudflare Workers for social login (Google, GitHub, etc.)
**Cloudflare Account:** `53947@triadblue.com` — manages DNS, R2, and future Workers. Wrangler CLI authenticated locally.
**Environments:** Production (`main` branch) + Staging (`staging` branch) on Railway
**Local path:** `/Users/deanlewis/businessblueprint`
**Preview URL:** `businessblueprint-production-f6a9.up.railway.app`

---

## ARCHITECTURE

### The Prescription Model
Scan a business's online presence → diagnose what's broken → prescribe targeted app solutions → provide Directions for Use.

### App Ecosystem

**Compass Suite — $99/mo (communications)**
/ promote, / engage, / respond, / post — each $29/mo standalone

**Anchor Suite — $99/mo (local presence)**
/ publish, / elevate, / optimize, / amplify — each $29/mo standalone

**Standalone**
/ connect CRM — FREE Starter (100 contacts) or $29/mo Performance. Never bundled.
Coach Blue — $99/mo standalone, $59/mo with one suite, FREE with both suites.

**Diagnostic Apps**
/ scan (#E00420), / assess (#960D71)

### Setup Cadence (fixed order — 9 steps)
1. / connect → 2. / publish → 3. / elevate → 4. / optimize → 5. / respond → 6. / engage → 7. / post → 8. / promote → 9. / amplify

### Digital IQ Scoring
Digital IQ = Scan Score (0-70) + Operational Score (0-70) = 0-140
Display: 70-140 scale. Formula: `displayScore = 70 + Math.round(rawScore / 2)`
Shared utility: `shared/score-utils.ts` with `getDisplayScore()`, `getScoreLabel()`, `getScoreColor()`

**NO LETTER GRADES ANYWHERE.** Use descriptive labels only:
- 130-140: Exceptional
- 115-129: Strong
- 100-114: Building Momentum
- 85-99: Room to Grow
- 70-84: Getting Started

9 scoring categories mapped 1:1 to 9 apps: promote, post, elevate, respond, engage, publish, optimize, connect, amplify.

### Locked App Descriptions (exact — never paraphrase)
- / publish — Directory Listings Management Tool
- / elevate — Reviews and Ratings Management Tool
- / optimize — SEO Management Tool
- / amplify — Digital Advertising Tool
- / promote — Email and SMS Campaigns Tool
- / respond — Multi-Channel Unified Inbox
- / engage — Live Chat Widget Tool
- / post — Create, Schedule and Post Social Media Tool
- / connect — CRM — Customer Relationship Management
- Coach Blue — AI Business Coach
- Anchor Suite — Local Solution. Get Found, Stay Credible.
- Compass Suite — Complete Communications Engine.

### Key Files
- `client/src/config/app-registry.ts` — SINGLE SOURCE OF TRUTH for app names, colors, pricing
- `shared/schema.ts` — database schema
- `shared/score-utils.ts` — Digital IQ display score, labels, colors (70-140 scale)
- `shared/knowledge-base/` — KB TypeScript files for Directions for Use + Coach Blue
- `client/src/components/side-nav.tsx` — sidebar navigation (3 zones: Tools / Guide / Admin)
- `server/services/assessment-ai.ts` — AssessmentAIService (DeepSeek narratives + recommendations)
- `server/services/timeline-logger.ts` — cross-app activity logging to / connect contact records
- `server/services/dataforseo.ts` — DataForSEO centralized service (SERP, keywords, DA — NOT backlinks)
- `server/services/moz-backlinks.ts` — Moz Links API for all backlink data ($5/mo vs DataForSEO $100/mo)
- `server/routes.ts` — main routes
- `server/routes/optimize.ts` — / optimize SEO tool routes
- `railway.json` — Railway build + deploy config
- `vite.config.ts` — uses `process.cwd()` (NOT `import.meta.dirname` — breaks in esbuild bundle)

### Sidebar Structure (3 Zones)
1. **Your Tools** — / connect + Anchor Suite apps + Compass Suite apps
2. **Your Guide** — Coach Blue + Digital IQ + Directions for Use
3. **Admin** — Settings (Billing inside Settings as sub-section)

### Chat Widget
Two tabs: Tab 1 = Support Agent (Socket.IO), Tab 2 = Coach Blue (REST API)
Non-subscribers see Coach Blue tab grayed out.

### Deployment & Git Workflow
- **All code changes go to `staging` branch. NEVER push directly to `main`.**
- Railway production deploys from `main`. Railway staging deploys from `staging`.
- Dean tests on staging URL, then uses Railway's Sync feature (pull from staging into production) to go live.
- Railway sync is a PULL: go to the receiving environment, click Sync, choose source. When syncing to production, exclude `DATABASE_URL` from the changeset.
- Production and staging each have their own Neon database branch. Never cross them.
- `dist/` is gitignored — Railway builds fresh every deploy via `rm -rf dist && npm run build`.
- `import.meta.dirname` is FORBIDDEN in any server-bundled file — use `process.cwd()` instead. esbuild ESM bundles break with it.
- No `Procfile` or `railway.toml` — `railway.json` is the only deploy config.

### Payment Rules
ALL payment processing through swipesblue.com. Zero Stripe references in any customer-facing code. All `STRIPE_` env vars have been deleted. `schema.ts` `paymentProvider` default is `"swipesblue"`. SwipesBlue env vars (API_KEY, API_URL, MERCHANT_ID, WEBHOOK_SECRET) are configured. SwipesBlue `POST /api/v1/checkout/sessions` endpoint exists with redirect + embedded modes.

---

## COMPLETED SYSTEMS

- Landing page copy — all 9 app pages ✓
- File renames and route cleanup ✓
- Prescriptions score fix ✓
- Lucide icon replacement ✓
- How It Works 6 steps ✓
- SwipesBlue payment cleanup ✓
- Directions for Use Phases 1-4 (knowledge base, DB tables, APIs, page, sidebar, Coach Blue KB, two-tab chat widget, triggers/email) ✓
- Product ID rename + scoring restructure ✓
- Assessment redesign Phase A — detection methods ✓
- Assessment redesign Phase B — scan-first form ✓
- Homepage/footer fixes (white bg, 100 contacts, amplify color, Coach Blue image, integration section) ✓
- Prescription journey redesign — assessment-ai.ts, narrative DeepSeek output, architect grid paper UI, suggestedDate on setup_tasks, task generation on user click only ✓
- Connect hub activity logging — timeline-logger.ts, app colors, event icons, wired promote/respond/engage ✓
- Spoke apps completion — elevate review push + contact matching, post analytics tab, amplify CRM audiences ✓
- D&B DUNS integration — lookup, verify, manual entry, listing distribution adapter ✓
- Site-wide page cleanup — routes manifest, about, contact, find-results, knowledge-base, assessment-confirmation, client-portal, api-docs ✓
- Reddit OAuth callback fix ✓
- About page ecosystem fix — uses real logo images ✓
- Digital IQ score display — 70-140 scale, descriptive labels, no letter grades ✓
- / optimize Phase A — critical layer: AI fix instructions, Core Web Vitals, schema generator, local rank tracking, 8-tab restructure, PriorityBadge system ✓
- / optimize Phases B-D — important/relevant/optional layers: DataForSEO integration, competitor enrichment, backlinks, enhanced keywords, reports, content tools, snippet preview ✓
- Results page journey — full prescription display for pre-signup visitors, architect grid paper, strengths + prescription narratives, polling, conversion CTA ✓
- Backlink provider swap — DataForSEO Backlinks API ($100/mo) replaced with Moz Links API ($5/mo). DataForSEO retained for SERP/keywords/DA only. ✓
- Railway migration — moved from Replit to Railway. WebSocket CORS, health check endpoint, PORT env var, Replit Vite plugins removed, Object Storage graceful degradation, process.cwd() fix for esbuild, dist/ gitignored, Procfile/railway.toml removed ✓
- Admin email — renamed from demo@businessblueprint.io to admin@businessblueprint.io ✓
- Cloudflare R2 Object Storage — replaced Replit sidecar with R2 bucket `content-storage` for / post media uploads ✓

## PENDING

- **Post-Railway audit** — full audit of staging + production needed to confirm everything works after migration
- **Object Storage replacement** — DONE. Swapped Replit sidecar to Cloudflare R2 (`content-storage` bucket). ✓
- **Replit decommission** — once Railway is stable, stop Replit deployments. Old Neon DB on Replit project can be kept as backup.
- Email delivery — Resend silently failing (logs `Resend ID: undefined`). Root MX record added. `send.send.businessblueprint.io` typo DNS records need deleting.
- Journey email cadence — drip emails need rewriting to reference current products, suites, Coach Blue, Directions for Use
- D&B Direct+ API credentials — Dean needs to obtain from D&B (sales-driven). Code handles missing credentials gracefully.
- Reddit Ads API credentials — Dean applied. Manual approval required (~7 day turnaround). Code fully built.
- DataForSEO credentials — needed for / optimize real data features. Pay-per-use. `DATAFORSEO_LOGIN` + `DATAFORSEO_PASSWORD`.
- MOZ_API_TOKEN — set in Railway env vars. $5/mo Moz Links API for backlink data.
- / elevate gaps — Google review response API push needs real OAuth credentials from business owner. Yelp does not support automated replies.
- / post gaps — social engagement → CRM contact matching not built (needs platform OAuth commenter identity data)
- / amplify gaps — campaign-to-contact targeting not wired to actual ad platform APIs
- Header — may still show "Inbox" instead of "/ respond" — verify
- **OpenAuth on Cloudflare Workers** — replace magic-link auth with OpenAuth (openauth.js.org) for social login (Google, GitHub, etc.). Self-hosted on Cloudflare Workers, free, no user limits. Not urgent — current magic-link auth works.
- **External AI Audit** — staging site setup planned for independent review (deferred from April 8)

---

## CURRENT STATE CHANGELOG

| Date | Changes |
|------|---------|
| 2026-03-31 | Directions for Use Phases 1-4 verified complete. Assessment redesign Phases A+B committed. |
| 2026-03-26 | Landing pages, file renames, prescriptions score, old name fixes all verified. |
| 2026-03-25 | Lucide icons, How It Works, SwipesBlue cleanup committed. |
| 2026-04-02 | Ecosystem footer tagline prompt written. |
| 2026-04-07 | D&B DUNS integration (schema, service, routes, publish dashboard, listing adapter). Site-wide cleanup: routes manifest, about, contact, find-results, knowledge-base, assessment-confirmation, client-portal, api-docs. Reddit OAuth redirect fix. About page ecosystem logos. |
| 2026-04-08 | / optimize Phase A — critical layer build. Schema: seo_backlinks +5 cols, seo_competitors +5 cols, seo_pages +4 cols, new seo_local_rankings table. Crawler: AI fix instructions, broken link detection, Core Web Vitals, priority layers. Routes: replaced 4 stubs (backlinks, local-rankings, schema-markup, reports, core-web-vitals). Client: 10→8 tabs, PriorityBadge system, Overview priority dashboard, SiteHealthTab, CompetitorsTab, local rank tracking UI. |
| 2026-04-08 | / optimize Phase B — important layer. Services: long-tail keyword gen, search intent classification. Routes: 9 new (keywords/long-tail, keywords/classify-intent, keywords/:id/locations, competitors CRUD+analyze, pages/internal-links, pages/image-audit). Enhanced reports with ranking changes + backlink activity. Client: KeywordsTab (intent badges, long-tail expansion, location tracking), CompetitorsTab (real CRUD, gap analysis), BacklinksTab (6 stats, filters), SiteHealthTab (image audit), ReportsTab (generate + stored reports). |
| 2026-04-08 | / optimize Phase C — relevant layer. Routes: 10 new (competitors/backlinks, competitors/content-gap, competitors/traffic, competitors/top-pages, competitors/compare, pages/redirect-chains, pages/heading-structure, pages/keyword-density, backlinks/referring-domains). Client: CompetitorsTab (domain comparison, content gap, traffic estimates), SiteHealthTab (redirect chains, heading structure, keyword density), BacklinksTab (referring domains chart). |
| 2026-04-08 | / optimize Phase D — optional/polish layer. Routes: 6 new (content/length-recommendations, content/click-potential, content/question-keywords, content/topic-clusters, content/seo-score, pages/snippet-preview). Client: ContentTab (length recommendations, CTR estimates, question keywords, topic clusters, SEO writing assistant), SiteHealthTab (SERP snippet preview), BacklinksTab (anchor text distribution). |
| 2026-04-08 | Results page journey — full rewrite of find-results.tsx. Architect grid paper prescription display (score, strengths narrative, prescription narrative, numbered action items with app colors, IQ summary with projected score). Polling for in-progress assessments. Email lookup renders full prescription inline. Removed all temporary access/expired language. Conversion CTA with Coach Blue teaser. Legacy recommendation fallback for older assessments. Admin email renamed demo@ → admin@businessblueprint.io. |
| 2026-04-08 | / optimize Phase B rebuild — DataForSEO centralized service (server/services/dataforseo.ts). Schema: seoProfiles +4 cols (domainAuthority, organicTraffic, totalBacklinks, lastDaCheck). Routes: 7 new (competitors/:id/enrich, competitors/:id/keywords, domain-authority, backlinks/discover, backlinks/summary, keywords/enrich, reports/email). Enhanced gatherReportData with CWV + referringDomains. Client: OverviewTab (DA/backlinks/keywords/report cards), CompetitorsTab (enrich button, expandable keyword rows, DA hero), BacklinksTab (discover button, summary query, referring domains, link type badges), KeywordsTab (enrich button, intent color fix), ReportsTab (email button, score change badges). Fixed position→rank TS error in reports. Replaced all bg-gray-50 with bg-white. |
| 2026-04-08 | Backlink provider swap — replaced DataForSEO Backlinks API with Moz Links API (server/services/moz-backlinks.ts). Swapped backlinks/discover + competitors/backlinks endpoints to use Moz. DataForSEO retained for SERP, keywords, DA, competitor keywords only. |
| 2026-04-09 | Railway migration — deleted Procfile + railway.toml (were launching MCP server). Created railway.json. Fixed import.meta.dirname → process.cwd() in vite.config.ts + server/vite.ts. Removed dist/ from git, added to .gitignore. Updated WebSocket CORS to businessblueprint.io. Added /api/health endpoint. PORT reads from env var. Removed Replit Vite plugins. Object Storage graceful degradation. Deleted mcp-server/ directory. Created staging branch. Set up Railway staging/production environments with separate Neon database branches. |

**AGENTS: Update this section on every commit. Your work is not done until this changelog reflects it.**
**AGENTS: All changes go to `staging` branch. NEVER push to `main` directly.**
