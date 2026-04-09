# CLAUDE.md — businessblueprint.io
# Last updated: April 8, 2026

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
**Deployment:** Railway
**Local path:** `/Users/deanlewis/businessblueprint`

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

### Key Files
- `client/src/config/app-registry.ts` — SINGLE SOURCE OF TRUTH for app names, colors, pricing
- `shared/schema.ts` — database schema
- `shared/score-utils.ts` — Digital IQ display score, labels, colors (70-140 scale)
- `shared/knowledge-base/` — KB TypeScript files for Directions for Use + Coach Blue
- `client/src/components/side-nav.tsx` — sidebar navigation (3 zones: Tools / Guide / Admin)
- `server/services/assessment-ai.ts` — AssessmentAIService (DeepSeek narratives + recommendations)
- `server/services/timeline-logger.ts` — cross-app activity logging to / connect contact records
- `server/routes.ts` — main routes
- `server/routes/optimize.ts` — / optimize SEO tool routes (57KB)

### Sidebar Structure (3 Zones)
1. **Your Tools** — / connect + Anchor Suite apps + Compass Suite apps
2. **Your Guide** — Coach Blue + Digital IQ + Directions for Use
3. **Admin** — Settings (Billing inside Settings as sub-section)

### Chat Widget
Two tabs: Tab 1 = Support Agent (Socket.IO), Tab 2 = Coach Blue (REST API)
Non-subscribers see Coach Blue tab grayed out.

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

## PENDING

- Email delivery — Resend silently failing (logs `Resend ID: undefined`). Root MX record added. `send.send.businessblueprint.io` typo DNS records need deleting.
- Journey email cadence — drip emails need rewriting to reference current products, suites, Coach Blue, Directions for Use
- D&B Direct+ API credentials — Dean needs to obtain from D&B (sales-driven). Code handles missing credentials gracefully.
- Reddit Ads API credentials — Dean applied. Manual approval required (~7 day turnaround). Code fully built.
- DataForSEO credentials — needed for / optimize real data features. Pay-per-use. `DATAFORSEO_LOGIN` + `DATAFORSEO_PASSWORD`.
- / elevate gaps — Google review response API push needs real OAuth credentials from business owner. Yelp does not support automated replies.
- / post gaps — social engagement → CRM contact matching not built (needs platform OAuth commenter identity data)
- / amplify gaps — campaign-to-contact targeting not wired to actual ad platform APIs
- Header — may still show "Inbox" instead of "/ respond" — verify

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

**AGENTS: Update this section on every commit. Your work is not done until this changelog reflects it.**
