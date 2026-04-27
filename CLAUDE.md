# CLAUDE.md — businessblueprint.io
# Last updated: April 12, 2026

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
/ convert — Lead Capture and Conversion Tool. FREE (with branding) or $59/year Premium (removes branding, advanced fields, conditional logic, multi-step, A/B testing, custom design). Never bundled.
Coach Blue — $99/mo standalone, $59/mo with one suite, FREE with both suites.

**Diagnostic Apps**
/ scan (#E00420), / assess (#960D71)

### Setup Cadence (fixed order — 10 steps)
1. / connect + / convert → 2. / publish → 3. / elevate → 4. / optimize → 5. / respond → 6. / engage → 7. / post → 8. / promote → 9. / amplify

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
- / convert — Lead Capture and Conversion Tool
- Coach Blue — AI Business Coach
- Anchor Suite — Local Solution. Get Found, Stay Credible.
- Compass Suite — Complete Communications Engine.

### Key Files
- `client/src/config/app-registry.ts` — SINGLE SOURCE OF TRUTH for app names, colors, pricing (includes CONVERT_FORM)
- `shared/schema.ts` — database schema (~4,500 lines, 60+ tables including convert_forms/fields/submissions/templates/analytics_daily/ab_tests)
- `shared/score-utils.ts` — Digital IQ display score, labels, colors (70-140 scale)
- `shared/google-business-categories.ts` — 517 Google Business Profile categories for assessment autocomplete
- `shared/knowledge-base/` — KB TypeScript files for Directions for Use + Coach Blue
- `client/src/components/side-nav.tsx` — sidebar navigation (3 zones: Tools / Guide / Admin). / connect + / convert are first two items.
- `server/services/assessment-ai.ts` — AssessmentAIService (DeepSeek narratives + recommendations, tone rules for personality-driven output)
- `server/services/timeline-logger.ts` — cross-app activity logging to / connect contact records
- `server/services/resend-email.ts` — all email templates (Coach Blue approved design: orange borders, transparent outline buttons, Archivo font, anti-dark-mode meta)
- `server/services/presenceScanner.ts` — presence scanner with expanded chat detection (40+ patterns + DOM-based)
- `server/services/dataforseo.ts` — DataForSEO centralized service (SERP, keywords, DA — NOT backlinks)
- `server/services/moz-backlinks.ts` — Moz Links API for all backlink data ($5/mo vs DataForSEO $100/mo)
- `server/routes.ts` — main routes (~3,000 lines)
- `server/routes/convert.ts` — / convert routes (~1,800 lines: forms CRUD, builder GET/PUT, public endpoints with CORS, submission pipeline with extracted helper, SwipesBlue checkout + webhook, analytics, A/B tests, premium enforcement)
- `server/routes/send.ts` — / promote routes (~1,700 lines: campaign CRUD, send dispatch, substituteVars with {{formUrl:SLUG}} resolution, conversions endpoint, forms-sent metric)
- `server/routes/crm.ts` — CRM routes (~81KB). Contact delete cleans up 7 FK-linked tables before deleting.
- `server/routes/optimize.ts` — / optimize SEO tool routes
- `client/public/convert/embed.js` — vanilla JS embed script (1,200+ lines: inline/popup/slide-in, 20 field types, multi-step, conditional logic, A/B traffic splitting, start tracking, payment checkout)
- `railway.json` — Railway build + deploy config. Build command: `rm -rf dist && npm run build && npm run db:push` (db:push runs on every deploy so schema stays in sync automatically)
- `vite.config.ts` — uses `process.cwd()` (NOT `import.meta.dirname` — breaks in esbuild bundle)

### / convert Architecture (Phases A-E shipped 2026-04-11/12)
- **Phase A:** 4 DB tables (convert_forms, convert_form_fields, convert_submissions, convert_templates), 16 seeded templates, CRUD routes, 6-step submission pipeline (insert → CRM upsert → sendContacts → timeline → autoresponder → notification), landing page, dashboard (5 tabs), hosted form page, side-nav + app-registry entry
- **Phase B:** Visual form builder at /convert/builder/:formId with 3-panel layout (field palette → canvas → properties/design panel), HTML5 drag-and-drop, 20 field types, multi-step, template-based creation, 30s auto-save, 10 preset color themes
- **Phase C:** Vanilla JS embed script at /convert/embed.js (inline/popup/slide-in modes, 5 popup triggers, localStorage show frequency, conditional logic runtime, signature canvas, star rating widget, global window.bbConvert API), CORS on public endpoints, SwipesBlue payment checkout + webhook with HMAC verification, dashboard embed-code panel with copy buttons + iframe preview
- **Phase D:** / promote integration — {{formUrl:SLUG}} template variable in substituteVars (resolves to hosted URL with utm_source=promote + campaign attribution), form picker modal in campaign editor (Insert Form + Insert Form Link buttons), sourceCampaignId on convert_submissions, campaign conversions endpoint + UI panel, Form Links Sent dashboard metric
- **Phase E:** Daily analytics tracking table (convert_analytics_daily), /start endpoint for funnel middle tracking, per-form analytics endpoint with timeline + source breakdown + step drop-off, A/B testing (7 endpoints: create/list/get/start/stop/winner/delete with form duplication + z-test confidence), premium tier enforcement (isConvertPremium helper gates 10+ features server-side with 403), branding enforcement in public endpoint, PremiumUpgradeModal, Analytics dashboard tab with Recharts timeline + funnel + per-form breakdown, AbTestPanel with 4 states

### Sidebar Structure (3 Zones)
1. **Your Tools** — / connect + / convert + Anchor Suite apps + Compass Suite apps
2. **Your Guide** — Coach Blue + Digital IQ + Directions for Use
3. **Admin** — Settings (Billing inside Settings as sub-section)

### Chat Widget
Two tabs: Tab 1 = Support Agent (Socket.IO), Tab 2 = Coach Blue (REST API)
Non-subscribers see Coach Blue tab grayed out.

### Deployment & Git Workflow
- **All code changes go to `staging` branch. NEVER push directly to `main`.**
- Railway production deploys from `main`. Railway staging deploys from `staging`.
- After every PR merge (staging → main), sync main back into staging: `git pull origin main && git push origin staging` — prevents drift.
- `npm run db:push` runs automatically on every Railway deploy (added to `railway.json` build command 2026-04-11). Schema changes are applied to whichever Neon branch the environment's DATABASE_URL points to.
- Production and staging each have their own Neon database branch. Never cross them.
- `dist/` is gitignored and untracked — Railway builds fresh every deploy via `rm -rf dist && npm run build && npm run db:push`.
- `import.meta.dirname` is FORBIDDEN in any server-bundled file — use `process.cwd()` instead. esbuild ESM bundles break with it.
- No `Procfile` or `railway.toml` — `railway.json` is the only deploy config.
- The "MCP Server Claude" Railway service was deleted (2026-04-12). Only `businessblueprint` service remains.

### Payment Rules
ALL payment processing through swipesblue.com. Zero Stripe references in any customer-facing code. All `STRIPE_` env vars have been deleted. `schema.ts` `paymentProvider` default is `"swipesblue"`. SwipesBlue env vars (API_KEY, API_URL, MERCHANT_ID, WEBHOOK_SECRET) are configured. SwipesBlue `POST /api/v1/checkout/sessions` endpoint exists with redirect + embedded modes.

/ convert payment fields use the platform-wide SwipesBlue env vars (not per-client credentials). The `/api/convert/public/:clientId/:formSlug/checkout` endpoint creates a pending submission + SwipesBlue session. The `/api/convert/webhook/swipesblue` endpoint verifies HMAC-SHA256 signature and runs the submission pipeline on checkout.session.completed.

### Email / SMTP Env Vars (CRITICAL — split by purpose)
There is **NO `RESEND_API_KEY` env var.** Two separate Resend API keys are configured on Railway:

- **`ONBOARDING_RESEND_API_KEY`** — system / onboarding emails. Used by:
  - `server/services/assessment-emails.ts` (assessment confirmations, admin notifications)
  - `server/services/resend-email.ts` (magic link, generic system mail, sendRawEmail for / convert autoresponders + notifications)
  - `server/services/setup-triggers.ts` (Directions for Use trigger emails)
  - `server/services/stall-detector.ts` (re-engagement nudges)
  - `server/routes/optimize.ts` (monthly SEO report email)
- **`PROMOTE_RESEND_API_KEY`** — / promote campaign sending. Used by:
  - `server/routes/send.ts` (campaign dispatch loop)

If you add a new system email path, use `ONBOARDING_RESEND_API_KEY`. If you add a new campaign-style send to end-customer audiences, use `PROMOTE_RESEND_API_KEY`. **Never reintroduce a generic `RESEND_API_KEY` reference** — every email send will silently fail.

**SMTP for / respond inbox** (`server/services/inbox-email.ts`) uses Resend over SMTP, NOT the API:
- `RESEND_BUSINESSBLUEPRINT_SMTP_HOSTNAME` (default `smtp.resend.com`)
- `RESEND_BUSINESSBLUEPRINT_SMTP_PORT` (default `465`)
- `RESEND_BUSINESSBLUEPRINT_SMTP_USER` (default `resend`)
- `RESEND_BUSINESSBLUEPRINT_SMTP_API_KEY`
Never reference `SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASS`/`EMAIL_USER`/`EMAIL_PASS` — those env vars do not exist on Railway.

### Email Template Design Standard
ALL email templates match the Coach Blue approved design:
- Container: `#EEFBFF` background, `.email-outline` border: `2px solid #F97316` (orange)
- Header/footer: `#f2f4f6` background with blue architect grid lines at 8% opacity, `border: 4px solid #F97316`
- Buttons: `background: transparent; color: #F97316; border: 2px solid #F97316;` — NEVER solid fill. Secondary buttons use `#09080E` border.
- Font: Archivo Semi Expanded. Text color: `#09080E`.
- Anti-dark-mode meta tags in every email `<head>`: `<meta name="color-scheme" content="light only">`
- Copyright: `© 2026 businessblueprint.io`
- No purple gradients. No Segoe UI. No solid green/blue/orange fill buttons.

### Consent (TCPA + CAN-SPAM)
**SMS consent** — phone numbers stored in `clients`, `assessments`, or `sendContacts` MUST have explicit consent.
- `clients` table: `smsConsent`, `smsConsentDate`, `smsConsentIp`
- `assessments` table: `smsConsent`
- `sendContacts` table: `smsConsent`/`smsConsentDate`/`smsConsentIp`/`smsConsentMethod`
- UI: consent checkbox next to phone field on assessment form (always), client signup (only when phone is non-empty), client portal profile edit (only when phone is CHANGED)
- Server: register/profile/assessment endpoints reject phone without consent, store consent IP from `x-forwarded-for`/`req.ip`
- CRM → / promote auto-sync sets `smsConsent: false` — never auto-grants SMS consent

**Email consent** — added 2026-04-12:
- `clients` table: `emailConsent`, `emailConsentDate`, `emailConsentIp`
- UI: always-visible checkbox below email field on client signup page
- Server: register endpoint stores emailConsent + date + IP

**/ convert form consent** — handled per-submission via field mappings (`email_consent`, `sms_consent` mapsTo values). Consent metadata (IP, timestamp, method="convert_form") stored on both `convertSubmissions` and `sendContacts` rows.

### Assessment Form — Business Classification
The industry field uses a **searchable autocomplete** backed by 517 Google Business Profile categories (`shared/google-business-categories.ts`), NOT a hardcoded dropdown. The component is `client/src/components/business-classification-select.tsx`.

Two supplemental context questions follow the classification:
- "How do customers typically reach you?" → `assessments.customerFlow` (in_person / go_to_customers / online / mixed)
- "How do most customers find you?" → `assessments.customerDiscovery` (word_of_mouth / online_search / social_media / advertising / other)

Both feed into DeepSeek via the assessment-ai.ts prompt for industry-specific prescriptions.

### Assessment → Client Data Transfer
On `POST /api/clients/register` AND `GET /api/clients/verify-magic-link`, if an assessment exists for that email, the server copies these fields to the new client (only when client doesn't already have them):
- `phone` → `clients.phone`
- `address` + `city` + `state` + `zipCode` → `clients.address` (joined as `"street, city, state, zip"`)
- `website` → `clients.website`
- `industry` → `clients.businessCategory`
And patches the auto-created CRM contact's `phone`/`firstName`/`lastName` (only if they're still the default `New Client` / `Portal User`).

### Phone Placeholder Standard
Every phone input across the platform uses: `+1 (555) 000-0000` — international format, consistent everywhere.

---

## PENDING

### API Credentials (Dean's side)
- D&B Direct+ API credentials — Dean needs to obtain from D&B (sales-driven). Code handles missing credentials gracefully.
- Reddit Ads API credentials — Dean applied. Manual approval required (~7 day turnaround). Code fully built.
- DataForSEO credentials — needed for / optimize real data features. Pay-per-use. `DATAFORSEO_LOGIN` + `DATAFORSEO_PASSWORD`.
- MOZ_API_TOKEN — set in Railway env vars. $5/mo Moz Links API for backlink data.

### Feature Gaps
- / elevate — Google review response API push needs real OAuth credentials from business owner. Yelp does not support automated replies.
- / post — social engagement → CRM contact matching not built (needs platform OAuth committer identity data)
- / amplify — campaign-to-contact targeting not wired to actual ad platform APIs
- / engage notification email send — schema + UI shipped, but the actual "send a notification email when a new chat starts" code path is NOT yet wired
- / engage contact email surfacing — `contactEmail` stored but not yet rendered in `client/public/chat-widget.js`
- SwipesBlue webhook signature format — current implementation assumes hex-HMAC-SHA256. Needs verification against SwipesBlue's actual docs before real payment forms go live.

### Infrastructure
- Email DNS cleanup — `send.send.businessblueprint.io` typo DNS records still need deleting
- Journey email cadence — drip emails need rewriting to reference current products, suites, Coach Blue, Directions for Use
- OpenAuth on Cloudflare Workers — replace magic-link auth with social login (Google, GitHub, etc.). Not urgent.
- External AI Audit — staging site setup planned for independent review

### Intentional Design Choices (do not "fix")
- `connect-dashboard.tsx` is 253KB. Do not refactor or split without explicit instruction.
- `dashboardData.data.client` (NOT `dashboardData.client`) — the portal dashboard endpoint returns nested under `.data`.
- CRM sidebar bottom actions: "Return to Dashboard" / "Return to Homepage" / "Logout" — renamed from "Exit to..." on 2026-04-12.

---

## CURRENT STATE CHANGELOG

| Date | Changes |
|------|---------|
| 2026-04-27 | **Spoke-site brand assets switched to canonical CDN URLs — `@assets/` imports eliminated, legacy CDN names renamed, dead imports purged.** Resolves the architectural debt called out in the swipesblue 2026-04-27 changelog row ("spoke sites bundle from `attached_assets/`, not the CDN") for the bbp repo. (a) **41 active swaps** across 16 source files: every `import X from "@assets/images_logos/..."` brand-asset line replaced with a `const X = "https://cdn.triadblue.com/brands/<brand>/<slot>.png";` declaration at the same position. JSX untouched. Files: `client/src/config/menu-config.ts` (5), `app-registry.ts` (1), `components/side-nav.tsx` (7), `digital-blueprint.tsx` (1), `brand-logo.tsx` (4 active), `pathway-icons.tsx` (1), `how-it-works.tsx` (1), `footer.tsx` (6), `chat-widget.tsx` (2), `brand-icons.tsx` (1), `ai-coach-pricing.tsx` (2), `pages/home.tsx` (1 active), `find-results.tsx` (1), `connect-dashboard.tsx` (1), `about.tsx` (6), `portal-prescriptions.tsx` (1 runtime path swap from broken `/assets/images_logos/coachblue48.png` to CDN). (b) **4 legacy CDN renames**: `brand-logo.tsx` L4/L5 and `tour.tsx` L506/L567 changed `logo-lockup.png` → `logo-image-and-logo-text-as-url.png` and `logo-text.png` → `logo-text-as-url.png` per the 2026-04-27 canonical nomenclature lock. Legacy CDN files still resolve 200 (cp not mv during rename) so this is purely a nomenclature alignment, not a fix for broken URLs. (c) **9 dead `@assets` imports deleted**: `brand-logo.tsx` L10–12 (`webhostedLogo`, `webhostedIcon`, `airswipedLogo`), `pages/home.tsx` L10/L11/L13/L14/L15 (`bbIcon`, `bbLogo`, `webhostedIcon`, `webhostedLogo`, `airswipedLogo`), `pages/marketplace-checkout.tsx` L14 (`airswipedLogo`). All zero-JSX-reference imports. Removes ~9 unused PNG bundle dependencies. (d) **Coach Blue mapping rule**: every Coach Blue `@assets` reference (variable names ending in `coachBlueIcon`/`coachBlueLarge`/`aiCoachIcon`/`aiCoachLogo`/`aiCoachSmall`/`coachBlueIcon24`/`coachBlueIcon48`) routes to `cdn.triadblue.com/brands/coachblue/logo-image.png` (semantically correct folder), NOT the bbp folder. Bbp brandmark refs (`bb-favicon.png`, `bb-logo-only.png`, `bb-header-logo.png`) route to `businessblueprint/logo-image.png` or `businessblueprint/logo-image-and-logo-text-as-url.png` per role. (e) **Out of scope, untouched** (4 items): `menu-config.ts` L17 `business-iq-scanner.png` (Business IQ Scanner illustration), `brand-icons.tsx` L3 `commverse-icon-old.png` (forbidden legacy brand), L4 `digital-iq-icon-old.png` (legacy), L5 `digital-iq-assessment-icon.png` (Digital IQ illustration). All four remain as `@assets/` imports for future-pass scope. (f) **Pre-existing CDN-URL Coach Blue refs in bbp folder NOT touched per scope**: `header.tsx` L55 `coachBlueIcon`, `home.tsx` L17 `coachBlueStepIcon`, `journey.tsx` L260 — all currently point at `businessblueprint/logo-image.png` (byte-identical to coachblue version). These are existing CDN constants outside the approved edit list. Recommend follow-up to align them with the coachblue/ semantic-folder rule. (g) **Observation, no action**: `cdn.triadblue.com/brands/coachblue/logo-image-{24,256}px.png` and `businessblueprint/logo-image-256px.png` and `hostsblue/logo-text-as-url.png` all return 404. Not needed by the current swap (all icon refs use `logo-image.png` source with CSS sizing) but flagged as future generation-pipeline candidates. (h) `npx tsc --noEmit` passes clean (exit 0). NIXPACKS_INSTALL_CMD=`npm ci --include=dev` verified set on Railway production prior to push (R7 satisfied). |
| 2026-03-25 | Lucide icons, How It Works, SwipesBlue cleanup |
| 2026-03-26 | Landing pages, file renames, prescriptions score, old name fixes |
| 2026-03-31 | Directions for Use Phases 1-4. Assessment redesign Phases A+B |
| 2026-04-02 | Ecosystem footer tagline |
| 2026-04-07 | D&B DUNS integration. Site-wide page cleanup. Reddit OAuth fix. About page ecosystem logos |
| 2026-04-08 | / optimize Phases A-D (4 builds). Results page journey. DataForSEO service. Backlink swap to Moz |
| 2026-04-09 | Railway migration. Staging branch created. MCP server directory deleted |
| 2026-04-11 | Resend env var split. Portal UX (SectionHeader, profile editing, admin delete). CRM buttons + portal links. SMS consent / TCPA. Data flow fixes (assessment→client transfer, SMTP vars, engage email config, promote CRM auto-sync) |
| 2026-04-11 | Pre-existing tsc errors fixed (consoleBlueIcon removed, assessments.clientId added to schema). Railway db:push added to build command. dist/ untracked. Staging/main drift fixed. mcp-server/ deleted from repo |
| 2026-04-11–12 | **/ convert Phase A** — 4 DB tables, 16 seeded templates, CRUD routes, 6-step submission pipeline, landing page, dashboard, hosted form page, side-nav + app-registry entry (PR #6) |
| 2026-04-12 | **/ convert Phase B** — Visual form builder with 3-panel drag-drop, 20 field types, properties/design/settings panels, template modal, preview modes, multi-step (PR #7) |
| 2026-04-12 | **/ convert Phase C** — Vanilla JS embed script (1,129 lines), CORS, SwipesBlue payment checkout + webhook, embed-code panel with tabs + iframe preview (PR #9) |
| 2026-04-12 | **/ convert Phase D** — / promote integration: {{formUrl:SLUG}} in substituteVars, form picker modal, campaign conversion analytics, sourceCampaignId attribution, Form Links Sent dashboard metric (PR #10) |
| 2026-04-12 | **/ convert Phase E** — Daily analytics tracking, per-form analytics endpoint with Recharts timeline, A/B testing (7 endpoints + embed traffic splitting + z-test confidence), premium tier enforcement (isConvertPremium gates 10+ features), PremiumUpgradeModal, Analytics tab, AbTestPanel (PR #11) |
| 2026-04-12 | **Assessment experience fixes** — Email templates redesigned to Coach Blue standard (orange borders, transparent buttons, anti-dark-mode, Archivo font, 2026 copyright). Chat detection expanded (40+ patterns + DOM-based + GTM logging). Industry dropdown replaced with 517-category Google Business Profile autocomplete. DeepSeek tone rules for personality-driven prescriptions. customerFlow + customerDiscovery assessment questions (PR #12) |
| 2026-04-12 | CRM contact delete FK cleanup (7 related tables cleaned before contact deletion). CRM sidebar buttons renamed "Return to Dashboard" / "Return to Homepage" / "Logout" (PR #13) |
| 2026-04-12 | Phone placeholders standardized to +1 (555) 000-0000 across 7 files. Email consent checkbox + schema + server on client signup (PR #14) |
| 2026-04-17 | **Audit fixes** — Removed Coming Soon card from engage-dashboard + 2 coming-soon refs from respond. Added / convert to footer. Fixed assessment email: border #6EA6FF→#F97316, checkmark #00FF40→#4E7C63, 4× BusinessBlueprint→businessblueprint, 8× #0000FF→#09080E. Swept #0000FF from all email templates (45 instances across email.ts + resend-email.ts). Changed #6EA6FF→#8085A1 in resend-email.ts ScansBlue gradient. Replaced product PNG icon refs with inline Lucide SVGs via shared email-icons.ts. Added logo + scansblue-icon + Coach Blue PNG to client/public/. Build-time email asset check added to npm build. |
| 2026-04-18 | **Coach Blue onboarding emails** — 6-email template system (coach-blue-email-template.ts + onboarding-emails.ts). Locked frame: Allerta Stencil headers, Copperplate body, #97ACCA header, orange callout, periwinkle CTAs, legal footer with logo images. Brand assets: Coach Blue portrait, businessblueprint text-only logo, TRIADBLUE logo added to client/public/. **Tour page full rewrite** — correct 6 steps, Lucide icons from registry, correct pricing, SlashApp branded names, Triad White card headers. **Journey fixes** — Coach Blue portrait updated, #0000FF→#001BB2, SlashApp applied to all 43 app name refs. |
| 2026-04-25 | **Social-card meta-tag fix in `client/index.html`: og-image and twitter-image now point at the canonical 1200×630 CDN PNG.** Symptom before: `og:image` and `twitter:image` were both pointing at `https://businessblueprint.io/favicon.png` — a tiny square favicon, not a 1200×630 social card. Every link preview on Slack / iMessage / Discord / Facebook / LinkedIn / TikTok rendered the favicon instead of the "Make more money" card. **Fix:** updated `og:image` to `https://cdn.triadblue.com/brands/businessblueprint/og-image.png` and added the three companion tags `og:image:width="1200"`, `og:image:height="630"`, `og:image:type="image/png"`. Updated `twitter:image` to `https://cdn.triadblue.com/brands/businessblueprint/twitter-image.png`. Spec-compliance fix at the same time: `twitter:card` and `twitter:image` both now use `<meta name="...">` (W3C-correct for Twitter Card meta) instead of the prior `<meta property="...">`. The remaining twitter:* tags (`twitter:url`, `twitter:title`, `twitter:description`) were left with `property=` per the prompt scope (image-related meta only, no rewording of titles/descriptions/URLs). The ConsoleBlue OGA embed script in the same `<head>` continues to override these tags at runtime in browsers; the static-HTML edit is what scrapers (which don't execute JS) rely on. **CDN target was prepped earlier today** (see tbsys CLAUDE.md 2026-04-25 (cont.) entry — `BBP Open graph images.png` 1200×630 was scp'd to `/var/www/cdn/brands/businessblueprint/og-image.png` and `twitter-image.png` on the Kamatera CDN; both URLs verified `HTTP/1.1 200 OK image/png`). **Deploy:** Railway production auto-deploys from `main`; per the project rule "All code changes go to `staging` branch, never push directly to main", commit landed on `staging` first → push `origin staging` → fast-forward merge `main` ← `staging` → push `origin main` so both branches stay at the same SHA (no drift). **Companion work outstanding:** the swipesblue.com repo's own `index.html` has the same stale `og:image` pattern (still points at `/images/less_fees_more_revenue.jpg`); the swipesblue CDN file is already live at `https://cdn.triadblue.com/brands/swipesblue/og-image.png` (uploaded earlier today, see tbsys 2026-04-25 (cont.) item 2) but the swipesblue repo edit + redeploy is a separate task in a separate repo, scoped out of tonight. |

**AGENTS: Update this section on every commit. Your work is not done until this changelog reflects it.**
**AGENTS: All changes go to `staging` branch. NEVER push to `main` directly.**
**AGENTS: After every PR merge, sync main back into staging: `git pull origin main && git push origin staging`**

---

## HANDOFF NOTES FOR THE NEXT AGENT (2026-04-12)

**Current branch state:** `staging` and `main` are **in sync** at commit `f05aff9`. No drift. Working tree is clean.

**Recent session (2026-04-11–12) delivered:**
- / convert Phases A through E (complete app: data model → visual builder → embed script → / promote integration → analytics + A/B testing + premium enforcement)
- Assessment experience fixes (email templates, chat detection, Google taxonomy autocomplete, DeepSeek tone rules)
- CRM delete FK fix, sidebar rename, phone placeholder standardization, email consent on signup
- Pre-existing tsc error fixes, Railway db:push automation, dist/ cleanup, mcp-server/ removal, staging/main drift resolution
- `.github` CLAUDE.MD updated with / convert in the universal brand rules
- Total: ~10,000+ lines of new code across 14 sliced commits, 14 PRs merged, zero tsc errors at every checkpoint

**Things that look broken but are intentional:**
- `connect-dashboard.tsx` is 253KB. Do not refactor without explicit instruction.
- `dashboardData.data.client` (NOT `dashboardData.client`) — nested response.
- Premium features in / convert show lock icons and "$59/year" badges but are cosmetically gated (server enforces via 403). The billing checkout for Premium is not yet wired to SwipesBlue — the "Upgrade Now" button links to the /convert landing page.

**Key file map:**
- / convert: `server/routes/convert.ts`, `client/src/pages/convert-*.tsx`, `client/src/components/convert/*.tsx`, `client/public/convert/embed.js`, `shared/schema.ts` (search for `convert_`)
- / promote integration: `server/routes/send.ts` (substituteVars, conversions, forms-sent), `client/src/pages/promote-campaign-editor.tsx`, `client/src/components/promote/campaign-conversions.tsx`, `client/src/components/convert/form-picker-modal.tsx`
- Assessment: `client/src/components/assessment-form.tsx`, `client/src/components/business-classification-select.tsx`, `shared/google-business-categories.ts`, `server/services/assessment-ai.ts`, `server/services/presenceScanner.ts`
- Emails: `server/services/resend-email.ts`, `server/services/assessment-emails.ts`
- CRM: `server/routes/crm.ts` (contact delete with FK cleanup), `client/src/pages/connect-dashboard.tsx`
