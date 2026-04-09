# CLAUDE.md — businessblueprint.io
# Last updated: April 2, 2026

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
**Tagline:** We assess. We prescribe. You grow.
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

### Setup Cadence (fixed order)
1. / connect → 2. / publish → 3. / elevate → 4. / respond → 5. / engage → 6. / post → 7. / promote → 8. / amplify

### Digital IQ Scoring
Digital IQ = Scan Score (0-70) + Operational Score (0-70) = 0-140
Grade Scale: A (120-140), B (100-119), C (80-99), D (60-79), F (0-59)

9 scoring categories mapped 1:1 to 9 apps: promote, post, elevate, respond, engage, publish, optimize, connect, amplify.

### Key Files
- `client/src/config/app-registry.ts` — SINGLE SOURCE OF TRUTH for app names, colors, pricing
- `shared/schema.ts` — database schema
- `shared/knowledge-base/` — KB TypeScript files for Directions for Use + Coach Blue
- `client/src/components/side-nav.tsx` — sidebar navigation (3 zones: Tools / Guide / Admin)
- `server/routes.ts` — main routes
- `server/prompts/` — NOT in this repo (those are in scansblue)

### Sidebar Structure (3 Zones)
1. **Your Tools** — / connect + Anchor Suite apps + Compass Suite apps
2. **Your Guide** — Coach Blue + Digital IQ + Directions for Use
3. **Admin** — Settings (Billing inside Settings as sub-section)

### Chat Widget
Two tabs: Tab 1 = Support Agent (Socket.IO), Tab 2 = Coach Blue (REST API)
Non-subscribers see Coach Blue tab grayed out.

### Payment Rules
ALL payment processing through swipesblue.com. Zero Stripe references in any customer-facing code. All `STRIPE_` env vars should be deleted — nothing reads them. SwipesBlue env vars (API_KEY, API_URL, MERCHANT_ID, WEBHOOK_SECRET) are configured.

---

## COMPLETED SYSTEMS

- Landing page copy — all 9 app pages ✓
- File renames and route cleanup ✓
- Prescriptions score fix ✓
- Lucide icon replacement ✓
- How It Works 6 steps ✓
- SwipesBlue payment cleanup ✓
- Directions for Use Phases 1-4 (knowledge base, DB tables, APIs, page, sidebar, Coach Blue KB, two-tab chat widget, triggers/email) ✓
- Product ID rename + scoring restructure (c96e49d) ✓
- Assessment redesign Phase A — detection methods (bundled into c96e49d) ✓
- Assessment redesign Phase B — scan-first form (fcde37d) ✓
- Homepage/footer fixes (white bg, 100 contacts, amplify color, Coach Blue image, integration section) ✓

## PENDING

- SwipesBlue POST /api/v1/checkout/sessions endpoint (redirect + embedded modes)
- 11 STRIPE_ env vars need deletion from Railway environment
- schema.ts paymentProvider default "stripe" → "swipesblue"
- Ecosystem footer taglines need updating (prompt written: ECOSYSTEM_FOOTER_1_BUSINESSBLUEPRINT.md)
- **External AI Audit — staging site setup**
  - Deploy clone to `review.businessblueprint.io` (or similar subdomain)
  - New Railway service from same repo, separate fresh Postgres database
  - Seed with admin account + sample data so auditor sees full functionality
  - Decide: copy real API keys (stay hidden in Railway env vars) or skip external integrations
  - Auditor gets full site access, zero access to secrets/keys/production data
  - Tear down Railway service + DNS record when audit is complete

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
