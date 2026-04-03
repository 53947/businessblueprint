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

---

## CURRENT STATE CHANGELOG

| Date | Changes |
|------|---------|
| 2026-03-31 | Directions for Use Phases 1-4 verified complete. Assessment redesign Phases A+B committed. |
| 2026-03-26 | Landing pages, file renames, prescriptions score, old name fixes all verified. |
| 2026-03-25 | Lucide icons, How It Works, SwipesBlue cleanup committed. |
| 2026-04-02 | Ecosystem footer tagline prompt written. |

**AGENTS: Update this section on every commit. Your work is not done until this changelog reflects it.**
