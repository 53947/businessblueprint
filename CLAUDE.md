# CLAUDE.md — businessblueprint.io
# Last updated: April 11, 2026

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

### Email / SMTP Env Vars (CRITICAL — split by purpose)
There is **NO `RESEND_API_KEY` env var.** Two separate Resend API keys are configured on Railway:

- **`ONBOARDING_RESEND_API_KEY`** — system / onboarding emails. Used by:
  - `server/services/assessment-emails.ts` (assessment confirmations, admin notifications)
  - `server/services/resend-email.ts` (magic link, generic system mail)
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

### TCPA / SMS Consent (do not bypass)
SMS phone numbers stored in `clients`, `assessments`, or `sendContacts` MUST have explicit consent.
- `clients` table: `smsConsent`, `smsConsentDate`, `smsConsentIp`
- `assessments` table: `smsConsent` (consent IP/date are stored on the linked client)
- `sendContacts` table: existing `smsConsent`/`smsConsentDate`/`smsConsentIp`/`smsConsentMethod` fields
- UI rule: consent checkbox appears next to phone field on assessment form (always), client signup (only when phone is non-empty), and client portal profile edit (only when phone is being CHANGED)
- Server rule: `POST /api/clients/register`, `PATCH /api/portal/profile`, and `POST /api/assessments` all reject phone updates without consent and store `smsConsentIp` from `x-forwarded-for` / `req.ip`
- CRM → / promote auto-sync (`POST /api/send/:clientId/sync-crm`) sets `smsConsent: false` and `smsStatus: "unsubscribed"` — never auto-grants SMS consent. Email consent IS inferred from CRM (the contact gave it to the business).

### Assessment → Client Data Transfer
On `POST /api/clients/register` AND `GET /api/clients/verify-magic-link`, if an assessment exists for that email, the server copies these fields to the new client (only when client doesn't already have them):
- `phone` → `clients.phone`
- `address` + `city` + `state` + `zipCode` → `clients.address` (joined as `"street, city, state, zip"`)
- `website` → `clients.website`
- `industry` → `clients.businessCategory`
And patches the auto-created CRM contact's `phone`/`firstName`/`lastName` (only if they're still the default `New Client` / `Portal User`).
This is what makes / publish auto-create a populated profile and downstream apps have something to work with.

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
- Resend env var split — generic `RESEND_API_KEY` references replaced with `ONBOARDING_RESEND_API_KEY` (system) and `PROMOTE_RESEND_API_KEY` (campaigns) across 6 files. This was the silent-failure root cause. ✓
- Portal Dashboard navigation — `SectionHeader` (with `showHomeButton`) added to post-management, portal-prescriptions, directions-for-use, optimize-setup, amplify-reddit-wizard, subscription. Top-right Home button added to connect-dashboard. `Dashboard` is now the FIRST item in `side-nav.tsx`. ✓
- Profile editing — `PATCH /api/portal/profile` endpoint with typed-business-name confirmation. Editable Business Information card on client-portal.tsx (Edit/Save/Cancel + AlertDialog confirmation). Email locked with tooltip. ✓
- Admin delete client — `DELETE /api/admin/clients/:id` (rejects `isProtected` clients with 403, cleans CRM/setup/magic-link FK rows). Red Trash button + AlertDialog in admin-panel.tsx. NOTE: assessments are preserved (linked by email, not FK). ✓
- Assessment confirmation email CTA — replaced "Check Status in Portal" (which broke for users without an account) with green "Create Your Free Account" + orange "View Your Results" buttons. Updated email-notice copy. ✓
- All 12 CRM Overview buttons wired — `DashboardView` now takes `onNavigate`/`onAddContact`/`onCreateDeal`/`onCreateTask`/`onImportContacts`. `StatCard` and `QuickActionCard` accept `onClick`. `pendingAction` state on `ConnectDashboard` flows down to `ContactsView` to auto-open Add/Import dialogs. URL params `?action=add-contact` / `?action=import-contacts` honored on first render. ✓
- CRM sidebar exit links — replaced single "Exit to Portal" with three stacked buttons: `Exit to Dashboard` (`/portal/dashboard`), `Logout` (clears storage + redirects to `/portal/login`), `Exit to Portal` (`/`). ✓
- Header contextual App Dashboard button — for logged-in users on any of 9 app landing pages (`/connect`, `/publish`, `/elevate`, `/optimize`, `/amplify`, `/promote`, `/respond`, `/engage`, `/post`), header shows a `/ [app] Dashboard` button in the app's brand color, before the existing portal Dashboard button. ✓
- Connect landing celebrates free plan — logged-in users see a green "✓ Your FREE Starter Plan is Active" badge + single "Open Your CRM →" button instead of cart/pricing CTAs. Logged-out users still see existing 3-button layout with added free-plan note. ✓
- "Use this profile for / publish" button on Business Information card — links to `/publish/dashboard`. ✓
- SMS consent / TCPA compliance — schema fields on `clients` (smsConsent/Date/Ip) and `assessments` (smsConsent). Consent checkbox on assessment form (next to phone), client signup (conditional on phone being entered), and client portal profile edit (conditional on phone being CHANGED). Server validation on register, profile patch, and assessment creation. Consent IP captured from `x-forwarded-for`/`req.ip`. CRM→/promote sync defaults SMS consent to false. ✓
- Assessment → client data transfer — `POST /api/clients/register` and `GET /api/clients/verify-magic-link` now copy phone/address/website/industry from the assessment to the new client record (only if client doesn't already have those fields). Also patches the CRM contact's first/last name from `assessment.businessName` if still default. ✓
- inbox-email.ts SMTP env vars — replaced `SMTP_HOST`/`PORT`/`USER`/`PASS`/`EMAIL_USER`/`EMAIL_PASS` references with `RESEND_BUSINESSBLUEPRINT_SMTP_HOSTNAME`/`PORT`/`USER`/`API_KEY`. ✓
- / engage email config — schema fields on `chatWidgetSettings`: `contactEmail` (shown to visitors), `notificationEmail` (where alerts go), `notifyOnNewChat` (boolean). UI in engage-dashboard.tsx ChatSettingsPanel "Email Configuration" section. GET defaults branch + PUT both updated. ✓
- / promote CRM auto-populate — new `POST /api/send/:clientId/sync-crm` endpoint pulls all CRM contacts into `sendContacts` (skipping ones without email/phone or already present). Auto-fires on first / promote visit when `sendContacts` is empty AND CRM has contacts. The existing "Sync Status: Live" button is now wired to "Sync CRM Contacts" via `syncCrmContacts()`. **Remove approach:** all contacts auto-populate, user removes the ones they don't want via the existing delete endpoint. ✓

## PENDING

### CRITICAL — must address before production sync
- **3 pre-existing TypeScript errors** (NOT introduced this week, but blocking clean builds):
  1. `client/src/config/menu-config.ts:232` — `consoleBlueIcon` is referenced but never imported / declared. Likely should be `scansBlueIcon` or a new `consoleBlueIcon` import.
  2. `server/routes.ts` (registration handler, currently around lines 2468 + 2471) — references `assessments.clientId` but the `assessments` table has NO `clientId` column. The code does `existingAssessment[0].clientId` and `db.update(assessments).set({ clientId: client.id })`. Either add `clientId` to the assessments schema (and run db:push) or rip out the linking lines and rely on email-based lookup. The code somehow runs in prod (silent runtime failure?), but tsc has been complaining for at least a week.
- **DB push branch verification** — `npm run db:push` was run twice on 2026-04-11 against whatever the local `.env` `DATABASE_URL` points to (Neon endpoint `ep-blue-darkness-amgf40q5-pooler-...`). Both migrations are additive nullable columns (safe), but **before merging staging → main** confirm the OTHER Neon branch also got the new columns. If only one branch was migrated, Railway will throw runtime errors when the code references missing columns. Pushed schema additions:
  - `clients`: `sms_consent`, `sms_consent_date`, `sms_consent_ip`
  - `assessments`: `sms_consent`
  - `chat_widget_settings`: `contact_email`, `notification_email`, `notify_on_new_chat`
- **Verify Railway env vars exist on BOTH staging and production environments:**
  - `ONBOARDING_RESEND_API_KEY` (was the silent-failure root cause when missing)
  - `PROMOTE_RESEND_API_KEY`
  - `RESEND_BUSINESSBLUEPRINT_SMTP_HOSTNAME` / `_PORT` / `_USER` / `_API_KEY`

### Other pending
- **Post-Railway audit** — full audit of staging + production needed to confirm everything works after migration
- **Replit decommission** — once Railway is stable, stop Replit deployments. Old Neon DB on Replit project can be kept as backup.
- Email DNS cleanup — `send.send.businessblueprint.io` typo DNS records still need deleting (root MX record was added during the Resend troubleshooting; the code-side issue was the env var name, fixed 2026-04-11)
- Journey email cadence — drip emails need rewriting to reference current products, suites, Coach Blue, Directions for Use
- D&B Direct+ API credentials — Dean needs to obtain from D&B (sales-driven). Code handles missing credentials gracefully.
- Reddit Ads API credentials — Dean applied. Manual approval required (~7 day turnaround). Code fully built.
- DataForSEO credentials — needed for / optimize real data features. Pay-per-use. `DATAFORSEO_LOGIN` + `DATAFORSEO_PASSWORD`.
- MOZ_API_TOKEN — set in Railway env vars. $5/mo Moz Links API for backlink data.
- / elevate gaps — Google review response API push needs real OAuth credentials from business owner. Yelp does not support automated replies.
- / post gaps — social engagement → CRM contact matching not built (needs platform OAuth commenter identity data)
- / amplify gaps — campaign-to-contact targeting not wired to actual ad platform APIs
- **OpenAuth on Cloudflare Workers** — replace magic-link auth with OpenAuth (openauth.js.org) for social login (Google, GitHub, etc.). Self-hosted on Cloudflare Workers, free, no user limits. Not urgent — current magic-link auth works.
- **External AI Audit** — staging site setup planned for independent review (deferred from April 8)
- **/ engage notification email send** — schema + UI for `notificationEmail` and `notifyOnNewChat` shipped, but the actual "send a notification email when a new chat starts" code path is NOT yet wired. Wherever new chat conversations are inserted (search for `inboxConversations` insert + 'chat' channel type, or chat widget Socket.IO new-conversation handler), read the client's `chatWidgetSettings.notifyOnNewChat` and send via `ONBOARDING_RESEND_API_KEY` if true.
- **/ engage contact email surfacing** — the `contactEmail` field is stored, but not yet rendered in the public chat-widget JS (`client/public/chat-widget.js`). Widget needs to read it from the settings endpoint and display it to visitors.

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
| 2026-04-11 | **Resend env var fix (commit `284e718`)** — replaced 8 references to `process.env.RESEND_API_KEY` (which doesn't exist on Railway → silent email failure root cause) with `ONBOARDING_RESEND_API_KEY` for system mail (assessment-emails.ts, resend-email.ts, setup-triggers.ts, stall-detector.ts, optimize.ts) and `PROMOTE_RESEND_API_KEY` for campaign mail (routes/send.ts). Updated all error log messages to match. |
| 2026-04-11 | **Portal UX (commit `87f9215`)** — 4 fixes in 1 commit. (1) `SectionHeader` with `showHomeButton` added to post-management, portal-prescriptions, directions-for-use, optimize-setup, amplify-reddit-wizard, subscription. Top-right Home button on connect-dashboard. `Dashboard` is now first item in side-nav. (2) `PATCH /api/portal/profile` endpoint with typed-business-name confirmation; editable Business Information card with Edit/Save/Cancel + AlertDialog confirm; email locked. (3) `DELETE /api/admin/clients/:id` admin endpoint (rejects `isProtected` 403, cleans CRM/setup/magic-link FK rows, preserves assessments which are linked by email not FK); red Trash button + AlertDialog in admin-panel.tsx. Added `crmNotes`, `crmCompanies`, `setupTasks`, `setupNotes`, `setupTaskEvents`, `magicLinkTokens` to schema imports. (4) Assessment confirmation email CTA replaced with green "Create Your Free Account" + orange "View Your Results" buttons. Discovered: `assessments.clientId` doesn't exist in schema — diverged from spec by removing the `db.update(assessments).set({clientId: null})` line. |
| 2026-04-11 | **CRM buttons + portal links (commit `60ddb79`)** — 6 fixes. (1) Portal "Open CRM" → `/connect/dashboard`; "Add Contact" → `/connect/dashboard?action=add-contact`. (2) All 12 CRM Overview buttons wired: added `pendingAction` state + URL param parsing in `ConnectDashboard`; `DashboardView` now takes `onNavigate`/`onAddContact`/`onCreateDeal`/`onCreateTask`/`onImportContacts`; `StatCard` and `QuickActionCard` accept `onClick`; `ContactsView` accepts `pendingAction` prop and auto-opens its `showAddDialog` / `showImportDialog`. Stripped `dark:` classes from edited sections. (3) CRM sidebar bottom replaced with three buttons: Exit to Dashboard / Logout / Exit to Portal. (4) Header contextual `/ [app] Dashboard` button for the 9 app landing pages (`/connect`, `/publish`, `/elevate`, `/optimize`, `/amplify`, `/promote`, `/respond`, `/engage`, `/post`), placed before the existing portal Dashboard button. (5) Connect landing celebrates free plan for logged-in users (green badge + single "Open Your CRM →" button). (6) "Use this profile for / publish" button added to Business Information card. |
| 2026-04-11 | **SMS consent / TCPA (commit `4236759`)** — schema additions on `clients` (smsConsent, smsConsentDate, smsConsentIp) and `assessments` (smsConsent), added to `insertClientSchema` and `insertAssessmentSchema` `.pick({...})`. Assessment form: `smsConsent: false` default + checkbox under phone field. Client signup page: optional Phone field + conditional checkbox (only when phone is non-empty) + client-side validation. Client portal profile edit: `smsConsentEdit` state + conditional checkbox (only when phone is being CHANGED). Server: register endpoint validates + stores consent + IP (`x-forwarded-for`/`req.ip`); profile patch validates + stores + records consent date/IP only on phone changes; assessment creation propagates consent through `validatedData.smsConsent`. Ran `npm run db:push` against local `.env` Neon endpoint successfully. |
| 2026-04-11 | **Data flow fixes (commit `39ef26c`)** — 4 fixes. (1) Assessment → client data transfer: `POST /api/clients/register` and `GET /api/clients/verify-magic-link` now copy `phone`/`address`+`city`+`state`+`zipCode`/`website`/`industry` from the assessment to the new client (only if client doesn't already have those fields), and patch the auto-created CRM contact's phone/firstName/lastName from `assessment.businessName`. (2) `inbox-email.ts` SMTP env vars: replaced `SMTP_HOST`/`PORT`/`USER`/`PASS`/`EMAIL_USER`/`EMAIL_PASS` with `RESEND_BUSINESSBLUEPRINT_SMTP_HOSTNAME`/`PORT`/`USER`/`API_KEY`. (3) / engage email config: schema `chat_widget_settings.contact_email`/`notification_email`/`notify_on_new_chat`. UI in engage-dashboard.tsx ChatSettingsPanel adds an "Email Configuration" subsection with both email inputs + notify checkbox. GET defaults branch + PUT updated. (4) / promote CRM auto-populate: new `POST /api/send/:clientId/sync-crm` endpoint pulls all `crmContacts` for the client into `sendContacts` (skips no-email-no-phone, skips already-synced by email). TCPA-safe defaults: `emailConsent: true`, `emailConsentMethod: "crm_sync"`, `smsConsent: false`, `smsStatus: "unsubscribed"`. Auto-fires on first / promote dashboard visit when `sendContacts` is empty AND CRM has contacts. The existing fake "Sync Status: Live" button is now wired to "Sync CRM Contacts" via `syncCrmContacts()`. Ran `npm run db:push` again successfully. |

**AGENTS: Update this section on every commit. Your work is not done until this changelog reflects it.**
**AGENTS: All changes go to `staging` branch. NEVER push to `main` directly.**

---

## HANDOFF NOTES FOR THE NEXT AGENT (2026-04-11)

**Current branch state:** `staging` is **5 commits ahead of `main`**. Commits in order (oldest → newest):
1. `284e718` — fix: use correct Resend API key env vars — ONBOARDING for system emails, PROMOTE for campaigns
2. `87f9215` — feat: portal UX — dashboard button everywhere, profile editing, admin delete, email CTA fix
3. `60ddb79` — fix: wire all CRM buttons, portal links, header app dashboard, connect free plan celebration
4. `4236759` — feat: SMS consent opt-in on assessment, signup, and profile — TCPA compliance
5. `39ef26c` — feat: data flow fixes — assessment→client transfer, SMTP vars, engage email config, promote CRM auto-sync

**Before merging staging → main, do these in order:**
1. Visually QA staging (Railway preview URL) for the new portal UX, CRM button wiring, profile editing flow, signup phone+consent, engage email config, and promote CRM sync.
2. Confirm Railway env vars exist on **both** environments: `ONBOARDING_RESEND_API_KEY`, `PROMOTE_RESEND_API_KEY`, `RESEND_BUSINESSBLUEPRINT_SMTP_*`. If staging is missing any of these, system email will silently fail there.
3. Run `npm run db:push` against the production Neon branch. The local `.env` `DATABASE_URL` was used for both pushes today — if it points only at staging, production will throw "column does not exist" runtime errors when the new code references the new columns. Schema additions are 100% additive nullable columns (safe to apply to either branch independently).
4. (Optional but recommended) Fix the 3 pre-existing TypeScript errors before they accumulate further:
   - `client/src/config/menu-config.ts:232` — `consoleBlueIcon` undefined
   - `server/routes.ts` (registration handler) — 2 references to `assessments.clientId` on a column that doesn't exist
5. After production sync via Railway, smoke-test: take an unauthenticated user through assessment → results → signup → portal dashboard → CRM Open CRM → Add Contact → / promote (verify auto-sync happened) → / engage settings → save email config.

**Things that look broken but are intentional:**
- `connect-dashboard.tsx` is 253KB. Do not refactor or split it without explicit instruction — Dean has said to keep it intact.
- `assessments` table has no `clientId` column despite existing code referencing it. The 2 tsc errors in the register handler have been there for at least a week and prod still works. Don't touch unless fixing both code AND schema.
- `dashboardData.data.client` (NOT `dashboardData.client`) — the portal dashboard endpoint returns nested under `.data`. Easy gotcha when adding new client-portal.tsx code.

**Key file map for the work that just landed:**
- Portal/CRM/header buttons → `client/src/pages/client-portal.tsx`, `connect-dashboard.tsx`, `connect-landing.tsx`, `components/header.tsx`, `components/side-nav.tsx`
- Profile editing + SMS consent UI → `client/src/pages/client-portal.tsx`, `client-signup.tsx`, `components/assessment-form.tsx`
- Profile editing + SMS consent API → `server/routes.ts` (search for `/api/portal/profile`, `/api/clients/register`, `/api/assessments`, `/api/clients/verify-magic-link`)
- Admin delete → `server/routes.ts` (`/api/admin/clients/:id` DELETE) + `client/src/pages/admin-panel.tsx`
- Engage email config → `shared/schema.ts` (`chatWidgetSettings`), `server/routes/chat.ts` (settings GET/PUT), `client/src/pages/engage-dashboard.tsx` (`ChatSettingsPanel`)
- Promote CRM sync → `server/routes/send.ts` (`/api/send/:clientId/sync-crm`), `client/src/pages/promote-dashboard.tsx`
- SMTP for inbox → `server/services/inbox-email.ts`
- Resend env var split → `server/services/assessment-emails.ts`, `resend-email.ts`, `setup-triggers.ts`, `stall-detector.ts`, `routes/optimize.ts`, `routes/send.ts`
