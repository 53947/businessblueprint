# businessblueprint.io — Platform Post-Mortem

**Report date:** 2026-05-23
**Snapshot:** branch `main` (production)
**Prepared by:** Claude Code, on direction from Dean Laskowski (TRIADBLUE Inc.)
**Purpose:** Comprehensive structural and functional inventory of the platform prior to opening `audit.businessblueprint.io` for external review.

---

## Table of contents

0. [How to read this document](#0-how-to-read-this-document)
1. [The verdict in one paragraph](#1-the-verdict-in-one-paragraph)
2. [Platform identity](#2-platform-identity)
3. [Surface area at a glance](#3-surface-area-at-a-glance)
4. [The 13 apps — state of each](#4-the-13-apps--state-of-each)
5. [The backend engine room](#5-the-backend-engine-room)
6. [The database](#6-the-database)
7. [External integrations — what's actually live](#7-external-integrations--whats-actually-live)
8. [Frontend architecture](#8-frontend-architecture)
9. [Honest gap list (consolidated A-to-Z)](#9-honest-gap-list-consolidated-a-to-z)
10. [Intentional choices that look like bugs](#10-intentional-choices-that-look-like-bugs-dont-fix-these)
11. [Infrastructure and operations](#11-infrastructure-and-operations)
12. [What this means for audit.businessblueprint.io](#12-what-this-means-for-auditbusinessblueprintio)
13. [Recommended audit focus areas](#13-recommended-audit-focus-areas)
14. [Appendix — methodology and limitations](#14-appendix--methodology-and-limitations)

---

## 0. How to read this document

This is a structural and functional inventory built from four parallel reads of the codebase (frontend, backend, schema, app-by-app) plus the project's authoritative `CLAUDE.md`. It is **not** a runtime test — no flow was clicked through in a browser, no API endpoint was live-exercised against external systems, no OAuth handshake was verified against a real provider for the purposes of this report.

Where the report says "shipped," the code is present and structurally complete. Where it says "partial" or "stub," there is explicit evidence: file presence, an entry in the CLAUDE.md "Feature Gaps" section, a returned-501 / placeholder pattern in the source, or a missing credential gating the feature.

Treat this as a thorough map, not a certificate of operation. The audit subdomain that this report precedes is what will surface runtime truth.

---

## 1. The verdict in one paragraph

You have built a real platform. 70 frontend pages, 73 routes, ~80 endpoints in the main routes file plus 18 delegated route files, 42+ backend services, 15 ad-platform adapters, 3 background jobs, 88 database tables across 14 domains, full TCPA/CAN-SPAM/GDPR consent infrastructure, SwipesBlue payment integration with HMAC-verified webhooks, multi-AI provider routing (DeepSeek/OpenAI/Claude), Cloudflare R2 storage, Resend split between system and campaign keys, Socket.IO real-time, magic-link auth, JWT-based public API, a 5-shipped-phase / convert subsystem, and a full SEO suite backed by Moz + DataForSEO. **Roughly 7 of 13 apps are functionally shipped; 6 are partial — UI done, server schema done, but external platform API wiring is either stubbed or blocked on credentials in flight.** The gaps are concentrated in social/ads OAuth — exactly where third-party API approval cycles bottleneck a platform like this, not where code quality is the limit.

---

## 2. Platform identity

- **Tagline:** Get Assessed. Get Prescribed. Get Business.
- **Model:** Scan a business → diagnose → prescribe targeted apps → guide setup → operate.
- **Stack:** React + TypeScript + Tailwind + shadcn/ui + Wouter + Express + Drizzle ORM + PostgreSQL (Neon).
- **Hosting:** Railway (prod from `main`, staging from `staging`). Cloudflare DNS. Cloudflare R2 object storage.
- **Auth:** Magic-link + credential auth. Replit OIDC removed. Sessions via `connect-pg-simple`, 7-day rolling cookie. JWT for the public API.
- **Email:** Resend, with two API keys split by purpose — `ONBOARDING_RESEND_API_KEY` for system/transactional mail; `PROMOTE_RESEND_API_KEY` for campaign sending. SMTP-over-Resend for the / respond inbox.
- **Payments:** SwipesBlue only. Zero Stripe or NMI references in customer-facing code.

---

## 3. Surface area at a glance

| Layer | Count | Notes |
|---|---|---|
| Frontend pages | 70 .tsx files | All have valid exports; no "Coming Soon" placeholders |
| Registered routes (Wouter) | 73 | Includes aliases and dynamic params |
| UI primitives (shadcn) | 50 | Full shadcn install |
| Public marketing pages | ~10 | home, about, contact, pricing, privacy, terms, journey, tour, etc. |
| App landing pages | 13 | One per slash-app + 2 suite bundles |
| App dashboard pages | 10 | Plus 3 specialized (convert builder, optimize setup, amplify reddit wizard) |
| Backend endpoints in `routes.ts` | ~80 | Main monolith file, 4,808 lines |
| Delegated routers | 18 | convert, send, crm, optimize, chat, api (v1 public), amplify, ai-coach, content, plus 9 platform-specific |
| Backend services | 42+ | External APIs, internal logic, schedulers |
| Platform ad/listing adapters | 15+ | Meta, Google, LinkedIn, TikTok, Snapchat, Pinterest, Nextdoor, Spotify, Microsoft Ads, Reddit, X, Yelp Ads, YouTube, Waze, GBP |
| Listing-distribution adapters | 9 | Acxiom, DataAxle, Neustar, DNB, Apple Connect, Foursquare, Facebook Listing, Bing Places, GBP Listing |
| Background jobs | 3 | scheduler (10s poll), stall-detector (6h), analyticsSync (6h) |
| Database tables | 88 | Across 14 domains |
| WebSocket events | 8 | Customer + agent rooms for live chat |
| Embed scripts (public JS) | 3 | chat-widget.js, livechat-widget.js, convert/embed.js (1,200+ lines) |

---

## 4. The 13 apps — state of each

### / scan — Website Presence Scanner — **PARTIAL**

Diagnostic only. The actual scanning is **outsourced to scansblue.com** via webhook callback; businessblueprint stores the results in `scansBlueResults` and handles purchase routing through SwipesBlue. The presence scanner (`presenceScanner.ts`) has been hardened with 40+ chat detection patterns + DOM-based detection — that piece is internal and working.

**Verdict:** functions for its diagnostic role inside the assessment flow, but / scan as a standalone product lives at scansblue.com.

---

### / assess — Digital IQ Assessment — **SHIPPED**

The crown jewel of onboarding. 47-field form, 27 operational questions across 9 scoring categories, Google Business Profile 517-category autocomplete (backed by `shared/google-business-categories.ts`, not a hardcoded dropdown), customerFlow + customerDiscovery context questions, DeepSeek-powered prescriptions with personality-driven tone rules. Digital IQ scored on the 70–140 scale (descriptive labels, no letter grades).

Assessment → client data transfer is wired: phone, address, website, industry are copied to the new client record on signup or magic-link verification. Coach-Blue-branded confirmation + admin notification emails are working.

**Gap:** Prescriptions don't auto-link to product setup tasks — manual cross-reference only.

---

### / promote — Email and SMS Campaigns — **SHIPPED**

1,950-line route file (`server/routes/send.ts`). Campaigns (email/SMS/both), 12 send-related tables, full consent infrastructure (`sendConsentRecords`, `sendSuppressionList`, `sendBounceLog`, `sendUnsubscribeRecords`, `sendPreferenceCenter`), template variable substitution including the `{{formUrl:SLUG}}` cross-app variable that resolves to / convert hosted form URLs with campaign attribution baked in.

Form picker modal in the campaign editor, conversion analytics panel, Form Links Sent dashboard metric. Resend dispatch with throttling. Uses the dedicated `PROMOTE_RESEND_API_KEY`.

**Gap:** A/B testing exists in / convert but not / promote. Conditional content blocks not implemented.

---

### / respond — Multi-Channel Unified Inbox — **PARTIAL**

The weakest link in the Compass Suite right now.

- **Email channel works** (Resend SMTP, inbound + outbound).
- **Live chat channel works** (Socket.IO, real-time, backed by `livechatSessions`).
- **Social channels are stubbed:** Facebook, Instagram, WhatsApp, TikTok, X, LinkedIn message sync — UI tabs exist, OAuth routes exist, but the actual message-fetching pipelines are not wired.

CLAUDE.md explicitly flags two operational gaps: the new-chat notification email send path is **not wired** despite schema and UI being in place; and the `contactEmail` field is stored but not surfaced in `chat-widget.js`.

---

### / engage — Live Chat Widget — **SHIPPED (with known limitations)**

Widget config (color, position, welcome message, offline message, allowed domains, custom CSS, file upload toggle, pre-chat form toggle), `chat-widget.js` (666 lines, IIFE, vendor-free), `livechatSessions` for visitor tracking, `chatAnalyticsEvents` for per-event telemetry. Two-tab design (Support Agent via Socket.IO, Coach Blue via REST). Non-subscribers see the Coach Blue tab grayed out.

**Gap:** Agent routing schema exists but assignment is incomplete. File upload backend ready, frontend not hooked. New-chat notification email — schema and UI present, dispatch not wired (same gap as / respond above).

---

### / post — Social Media Tool — **PARTIAL**

The composer is shipped. Media uploads to Cloudflare R2 are working. The post scheduler (`server/services/scheduler.ts`) polls `contentPosts` every 10 seconds with atomic claim + lock + retry-with-backoff — that's production-quality plumbing.

**What's missing:** the actual platform publish calls. The 9 platform route files (`meta`, `google`, `linkedin`, `tiktok`, `snapchat`, `pinterest`, `nextdoor`, `spotify`, `microsoft-ads`) exist and OAuth routes exist, but the publish handlers are placeholders. Engagement-to-CRM matching (called out in CLAUDE.md gaps) is not built — needs platform OAuth committer identity data.

---

### / publish — Directory Listings Management — **SHIPPED with infrastructure caveats**

`canonicalBusinessProfiles` is the single NAP source-of-truth (with PIN-gated editing, DUNS verification fields, data versioning). 100+ distribution targets registered in `distributionTargets`. Per-client submissions tracked in `distributionSubmissions` with retry/error counting. Profile editor, coverage grid, distribution UI all in place. D&B DUNS lookup gracefully handles missing credentials.

**Gap:** D&B Direct+ credentials still pending (sales-driven approval). Real platform sync (the adapters in `listing-distribution/`) is structurally complete but the live runs against most aggregators were not verified during this audit.

---

### / elevate — Reviews and Ratings Management — **PARTIAL**

Review fetch from Google Business + Yelp works via `reviewSync.ts`. Sentiment analysis via DeepSeek (`reviewAI.ts`). UI dashboard with sentiment badges, response composer, AI response suggestions, CRM matching (reviewer name/email → contact).

**Hard gap on automated response push:** Google's review response API needs OAuth credentials from each individual business owner (per CLAUDE.md feature gaps — this is a platform-level constraint, not a code bug). Yelp has no automated-reply API at all. So elevate ships the listening side; the speaking side is half a feature that depends on per-customer OAuth that can't be pre-baked.

---

### / optimize — SEO Management Tool — **SHIPPED**

The biggest backend file in the platform: `server/routes/optimize.ts` at 4,347 lines. 12 SEO-domain tables (`seoProfiles`, `seoScans`, `seoKeywords`, `seoKeywordRankings`, `seoPages`, `seoTechnicalIssues`, `seoBacklinks`, `seoActionItems`, `seoReports`, `seoCompetitors`, `seoCompetitorData`, `seoLocalRankings`).

DataForSEO for keywords/SERP/DA (paid per-use), Moz Links API for backlinks at $5/mo (the cost-conscious swap from DataForSEO's $100/mo backlink product). 8-tab dashboard with priority-layer system (critical/important/relevant/optional). Monthly email report on the Coach Blue brand standard. Action items with effort/impact estimates. Local rank tracking by city.

**Gap:** Google Search Console integration is optional and not implemented. Mobile usability schema exists, no API integration.

---

### / amplify — Digital Advertising — **PARTIAL**

2,496-line route file. 8 amplify tables. Dashboard with 6 tabs, budget allocation per platform, spend alerts, Reddit-specific wizard (1,476-line page). All the structural work is done.

**What's not working:** the publish-to-platform API calls. Facebook/Instagram via Meta Graph — OAuth exists, campaign publish stubbed. Google Ads — route exists, endpoints stubbed. TikTok — route exists, implementation missing. Microsoft Ads — same. Reddit — wizard built, **credentials pending** (applied; manual approval ~7 days). Real-time spend tracking from platforms — schema ready, polling not wired. CLAUDE.md explicitly flags "campaign-to-contact targeting not wired to actual ad platform APIs."

---

### / connect — CRM — **SHIPPED**

2,511-line route file. 6 core CRM tables (`crmContacts`, `crmCompanies`, `crmDeals`, `crmTasks`, `crmNotes`, `crmTimeline`) plus pipelines/stages, segments, custom field defs, appointments, tags, automations + steps + executions, lead forms, subscriptions tier tracking.

Contact delete includes FK cleanup across 7 related tables — a real bug class avoided. Timeline logs cross-app activity from / promote, / convert, / post, / respond, etc. via `timelineLogger`. The 257KB `connect-dashboard.tsx` is intentional — CLAUDE.md says do not refactor without explicit instruction.

**Gap:** Deal forecasting (probability-weighted pipeline value) not calculated. Workflow automation steps logged but not executed (the MVP note in `crm.ts` admits async steps are persisted, the job runner is not wired). Email sync (pulling from client mailbox) not built.

---

### / convert — Lead Capture and Conversion — **SHIPPED**

The most complete recent build. Phases A through E all shipped 2026-04-11 → 2026-04-12 in 14 sliced PRs. 2,086-line route file. 6 tables. 1,200-line vanilla JS embed script supporting inline/popup/slide-in with 5 popup triggers, localStorage show-frequency control, conditional logic runtime, signature canvas, star ratings.

Form builder with 3-panel drag-drop, 20 field types, multi-step, A/B testing (7 endpoints with z-test confidence), 10 preset color themes, 16 seeded templates. SwipesBlue payment checkout with HMAC-SHA256 webhook verification. Premium tier server-side enforcement gating 10+ features with 403. Daily analytics aggregation, per-form funnel breakdown, source attribution.

**Gap:** Premium "Upgrade Now" button currently links to the landing page, not a SwipesBlue checkout — the upgrade flow itself isn't wired to a payment session. Custom domains for hosted forms not supported. Form versioning/snapshot history not implemented.

---

### Coach Blue — AI Business Coach — **SHIPPED**

3,524-line route file. DeepSeek backend with personality-driven tone. 6-email onboarding series (Allerta Stencil headers, Copperplate body, periwinkle CTAs, legal footer with logos, anti-dark-mode meta). Chat widget integration (separate tab from Support Agent). Subscription gating (free with both suites, $59/mo with one suite, $99 standalone).

Tour page rewritten 2026-04-18 with correct 6 steps, Lucide icons, correct pricing, SlashApp branded names. Journey page Coach Blue refs updated to point at the canonical CDN asset.

**Gap:** No context awareness — Coach Blue doesn't see the client's actual app data, it's purely conversational. Can't execute tasks on the user's behalf (can't create CRM contacts, can't send emails). Knowledge base is hardcoded, not user-customizable.

---

## 5. The backend engine room

### Routes layer

`server/routes.ts` is the 4,808-line spine. It registers ~80 direct endpoints and mounts 18 delegated routers. The delegation pattern is reasonable: anything app-specific lives in its own file (`routes/convert.ts`, `routes/send.ts`, `routes/crm.ts`, etc.), and `routes.ts` carries the cross-cutting concerns (assessment, admin, portal, dashboard aggregation, webhooks, magic link, brand assets).

### Auth

Three flavors coexisting:

1. **Admin credential login** via `routes/auth.ts` with bcrypt.
2. **Client magic-link** via `POST /api/clients/login` → token email → `GET /api/clients/verify-magic-link`.
3. **JWT** for the public REST API at `/api/v1/*` (Bearer or `?token=` query).

Sessions are stored in PostgreSQL via `connect-pg-simple`. Dev mode bypasses auth with a synthetic user.

### Middleware

Lean — only `auth.ts` and `clientPortalAuth.ts` in `server/middleware/`. The portal middleware accepts either client or admin sessions, which is the bridge that lets admins impersonate cleanly.

### Services

42+ files. The notable ones:

- **AI provider abstraction** (`ai-provider.ts`) — unified interface routing across DeepSeek (primary), OpenAI (fallback), Claude (fallback). Per-client overrides via the `ai-settings` table.
- **Platform adapters** — base class + 15 implementations following the same contract. Adding the 16th platform should be a small task.
- **Listing distribution** — same pattern, 9 adapters behind a factory.
- **Schedulers** — `scheduler.ts` polls every 10s with atomic claim/lock/retry; `stall-detector.ts` runs every 6h; `analyticsSync.ts` runs every 6h.
- **Email split** — `assessment-emails.ts`, `resend-email.ts`, `setup-triggers.ts`, `stall-detector.ts`, `onboarding-emails.ts`, `inbox-email.ts`. All system mail uses `ONBOARDING_RESEND_API_KEY`; only `routes/send.ts` uses `PROMOTE_RESEND_API_KEY`. Re-introducing a generic `RESEND_API_KEY` reference anywhere would silently break sends (per CLAUDE.md).

### WebSocket

`server/websocket.ts` (360 lines), Socket.IO with two auth modes (sessionId for customers, JWT for agents), three room types (`client:*`, `conversation:*`, `session:*`), 8 events covering join/message/typing/read.

### Background work

Three jobs running on boot. None use an external queue — they're in-process polling loops. That's fine at current scale; it's a single-Railway-instance assumption that should be noted if horizontal scaling is ever pursued.

### Stubs and concerns flagged by the backend audit

1. `POST /api/setup/demo-accounts` is a hardcoded demo-account creator for "Meta review" — verify if still needed.
2. The 180+ line `recommendations` endpoint in `routes.ts` (~line 814) does heavy logic — worth a real read.
3. CRM automations "MVP Implementation Notes" indicate async steps are logged but not executed; no job runner.
4. `convert.ts` public submission endpoints have CORS open — confirm rate limiting and CSRF posture before audit subdomain goes wide.
5. SwipesBlue webhook signature format (hex HMAC-SHA256) is assumed — CLAUDE.md says verify against SwipesBlue's actual docs before real payment forms go live.

---

## 6. The database

**88 tables across 14 domains.** More than CLAUDE.md's "~60+" estimate — the schema has grown.

| Domain | Table count (approx) | Purpose |
|---|---|---|
| Core / Auth / Users | 5 | users, sessions, clients, magicLinkTokens, emailChangeHistory |
| Assessment / Onboarding | 6 | assessments, recommendations, scansBlueResults, scansBluePurchases, clientAssessments, assessmentProductRecommendations |
| Billing / Subscriptions | 6 | subscriptionPlans, subscriptionAddons, subscriptions, subscriptionAddonSelections, products, billingHistory |
| CRM / Relationships | 18 | contacts, companies, deals, tasks, notes, timeline, pipelines, stages, segments + members, custom fields, appointments, tags, subscriptions, lead forms, automations + steps + executions |
| Send / Marketing | 12 | contacts, lists, listContacts, templates, campaigns, campaignSends, automations, consentRecords, suppressionList, bounceLog, preferenceCenter, unsubscribeRecords |
| Content / Social | 5 | socialMediaAccounts, contentMedia, contentPosts, contentAnalytics, contentTemplates |
| Respond / Inbox | 8 | channelConnections, conversations, messages2, attachments, quickReplies, participants, livechatSessions, brandAssets |
| Publish / Listings | 8 | businessListings, syncLogs, metricsSnapshots, businessReviews, canonicalBusinessProfiles, distributionTargets, distributionSubmissions, distributionLogs |
| Engage / Chat | 3 | chatWidgetSettings, chatAgents, chatAnalyticsEvents |
| Optimize / SEO | 12 | profiles, scans, keywords, rankings, pages, technicalIssues, backlinks, contentBriefs, actionItems, reports, competitors, competitorData, localRankings |
| Amplify / Ads | 8 | adAccountConnections, campaigns, adSets, ads, audiences, budgetAllocations, spendAlerts, redditAdComments |
| Convert / Forms | 6 | forms, fields, submissions, templates, analyticsDaily, abTests |
| Setup / Directions | 3 | setupTasks, setupNotes, setupTaskEvents |
| Coach Blue | 2 | aiCoachConversations, aiCoachMessages |
| Audit / Logs / Compliance | 9 | accountStatusHistory, adminActivityLog, prescriptions, emailLogs, emailTemplates, supportTickets, ticketComments, impersonationSessions, impersonationAuditLog, aiSettings |
| Domain / DNS (OpenSRS) | 4 | domains, dnsRecords, domainTransfers, nameserverHistory |
| API / Webhooks | 2 | apiKeys, webhookSubscriptions |
| Legacy / General | 5 | tasks, brandColors, inboxMessages (legacy), campaigns (legacy), dashboardAccess |

### Consent infrastructure

Ten tables touch consent. The audit trail (`sendConsentRecords`, `sendUnsubscribeRecords`, with IP + timestamp + method on every grant) is what gives the platform a defensible TCPA/CAN-SPAM posture. The schema-level email consent column on `clients` (added 2026-04-12) closes one of the last operational gaps.

### Legacy / cleanup candidates

Two legacy tables — `inboxMessages` and `campaigns` — are flagged in schema as superseded by `inboxMessages2` and `sendCampaigns`. Worth a future cleanup; not blocking anything.

### OpenSRS

Domain registration tables (`domains`, `dnsRecords`, `domainTransfers`, `nameserverHistory`) suggest planned domain reseller integration with hostsblue.com. Not visible as a working feature in the businessblueprint frontend right now — verify intent.

---

## 7. External integrations — what's actually live

### Working with credentials

- Resend (both keys: ONBOARDING + PROMOTE)
- DeepSeek (assessment AI, Coach Blue, review responses)
- Moz Links API ($5/mo for backlinks)
- SwipesBlue (API key, merchant ID, webhook secret all set)
- Cloudflare R2 (post media uploads)
- Telnyx (SMS/voice, inbound webhook at `/api/telnyx/webhook`)

### Pending credentials

- D&B Direct+ — sales-driven; code handles missing credentials gracefully
- Reddit Ads — applied, manual approval ~7 days; code complete
- DataForSEO — `DATAFORSEO_LOGIN`, `DATAFORSEO_PASSWORD` — without these, / optimize SEO real-data features are gated

### Adapter code exists, wiring incomplete

- Meta Graph API (Facebook/Instagram post publish + inbox + ads)
- Google Ads API (publish + analytics)
- Google Business Profile (review response push needs per-business-owner OAuth)
- LinkedIn (ads + organic + messages)
- TikTok (ads + posts + messages)
- Snapchat, Pinterest, Nextdoor, Spotify, Microsoft Ads, X, Waze, YouTube — adapters present, OAuth stubbed or partial
- Yelp Ads (read-only; Yelp does not allow automated reply)
- Listing distribution adapters: Acxiom, DataAxle, Neustar, Apple Connect, Foursquare, Bing Places, Facebook Listing

### Already external (not built here)

- scansblue.com owns the scan engine and full-report delivery
- swipesblue.com is the only payment processor — the words "Stripe" and "NMI" are forbidden in this codebase

---

## 8. Frontend architecture

**Router:** Wouter (not React Router). Lightweight.

**Layout — three zones in the authenticated side-nav:**

1. **Your Tools** — / connect, / convert, then Anchor Suite (publish/elevate/optimize/amplify), then Compass Suite (promote/respond/engage/post)
2. **Your Guide** — Coach Blue (icon-only, fires `openCoachBlue` window event), Digital IQ (link to prescriptions), Directions for Use
3. **Admin** — Settings (Billing nested inside as sub-section)

**Feature gating:** Items have feature codes (CO, RS, LC, SE, PO, LI, RE, OP, AM, AC). Locked items show a lock icon and redirect to `/subscription` on click. The `enabledFeatures` prop on side-nav drives this.

**Auth flow:** Magic link via email/SMS. Session stored in both `sessionStorage` and `localStorage` (`clientId` + `authToken`). App init clears stale auth requiring both keys to be valid.

**Big files (intentional, per CLAUDE.md):**

- `connect-dashboard.tsx` — 257KB. Do not refactor.
- `optimize.tsx` — 253KB. The SEO megafile.
- `amplify-dashboard.tsx` — 135KB.
- `post-management.tsx` — 78KB.
- `admin-panel.tsx` — 57KB (1,657 lines).

**Public embed scripts:**

- `chat-widget.js` (666 lines) — Coach Blue + Support Agent floating widget
- `livechat-widget.js` — possibly the prior generation or / engage-specific
- `convert/embed.js` (1,200+ lines) — / convert form embed with inline/popup/slide-in, payment, A/B traffic splitting

**Brand discipline (auditable):** The 2026-04-25 social-card fix, the 2026-04-27 spoke-site CDN sweep (41 active swaps + 4 legacy renames + 9 dead imports purged), and the 2026-04-29 Coach Blue semantic-folder cleanup — these three changelog entries together represent real, methodical brand hygiene work. The audit should see clean OG/Twitter cards and consistent CDN-served brand assets.

---

## 9. Honest gap list (consolidated A-to-Z)

### Product gaps explicitly acknowledged in CLAUDE.md

1. / elevate — Google review response API push needs per-business-owner OAuth (platform constraint, not code bug)
2. / elevate — Yelp does not support automated replies (platform constraint)
3. / post — social engagement → CRM contact matching not built (needs committer identity OAuth data)
4. / amplify — campaign-to-contact targeting not wired to actual ad platform APIs
5. / engage — new-chat notification email send code path not wired despite schema + UI being present
6. / engage — `contactEmail` stored but not rendered in `chat-widget.js`
7. SwipesBlue webhook signature format — current implementation assumes hex-HMAC-SHA256; verify against vendor docs before live payment forms

### Inferred from code audit

8. CRM automation step executor not wired (steps persist but don't run)
9. / convert premium "Upgrade Now" button currently lands on the marketing page, not a SwipesBlue checkout session
10. / promote A/B testing not implemented (it lives only in / convert)
11. / post platform publish handlers are stubs — composer and scheduler are real, but the actual API push to Meta/Google/LinkedIn/TikTok/etc. is not wired
12. / amplify ad publish + spend polling stubs across most platforms (Reddit blocked on credentials, others blocked on wiring)
13. / respond social channels (Facebook, Instagram, WhatsApp, TikTok, X, LinkedIn DMs) not connected
14. Two legacy tables (`inboxMessages`, `campaigns`) superseded but not removed
15. The `POST /api/setup/demo-accounts` Meta-review demo seeder may be stale

### Infrastructure / ops gaps

16. Email DNS — `send.send.businessblueprint.io` typo records still need deleting
17. Journey email cadence — drip emails need rewriting to reference current products, suites, Coach Blue, Directions for Use
18. OpenAuth on Cloudflare Workers — planned replacement for magic-link with social login (Google, GitHub), not urgent
19. External AI Audit — staging site setup planned for independent review (this is the audit subdomain project)

### Credentials waiting on Dean's side

20. D&B Direct+ API (sales call)
21. Reddit Ads API (in approval queue)
22. DataForSEO (pay-per-use, not yet set)

---

## 10. Intentional choices that look like bugs (don't "fix" these)

- `connect-dashboard.tsx` at 257KB is intentional. CLAUDE.md says do not refactor without explicit instruction.
- `dashboardData.data.client` (nested under `.data`) is the actual contract. Don't flatten it.
- CRM sidebar bottom actions are deliberately worded "Return to Dashboard" / "Return to Homepage" / "Logout" (renamed from "Exit to..." on 2026-04-12).
- `import.meta.dirname` is **forbidden** in any server-bundled file — use `process.cwd()`. esbuild ESM bundles break with it.
- No `Procfile` or `railway.toml`. `railway.json` is the only deploy config.
- `npm run db:push` runs on every Railway deploy via `railway.json` build command. Schema changes apply to whichever Neon branch the environment's DATABASE_URL points at.
- `dist/` is gitignored and built fresh every deploy.
- Pure Blue #0000FF is **never** used in UI — logo images only. Brand discipline.
- App accent colors are non-negotiable. Coach Blue is #001BB2 in UI (deep blue), not pure blue.
- App name format is always `/ appname` (slash, space, lowercase) except `TRIADBLUE` which is always all caps.
- Phone placeholder is always `+1 (555) 000-0000`.

---

## 11. Infrastructure and operations

- **Railway services (production):** `businessblueprint` (prod from `main`) + `businessblueprint-staging` (from `staging`). The "MCP Server Claude" Railway service was deleted on 2026-04-12.
- **Neon DB branches:** separate prod + staging. `npm run db:push` runs on every Railway deploy.
- **Cloudflare:** DNS for businessblueprint.io and the canonical asset CDN (`cdn.triadblue.com/brands/<brand>/`). R2 bucket `content-storage` in ENAM region holds / post media. Cloudflare account: `53947@triadblue.com`. Wrangler CLI authenticated locally.
- **Git workflow:** all changes go to `staging` first, never directly to `main`. After every PR merge from staging → main, sync main back into staging to prevent drift.
- **Preview URL:** `businessblueprint-production-f6a9.up.railway.app`.
- **At the start of this report:** `staging` and `main` were in sync at commit `f05aff9`. Working tree was clean.

---

## 12. What this means for audit.businessblueprint.io

The planned audit subdomain — new Railway service from `main`, new Neon `audit` branch, AUDIT_MODE auto-login as a fixed demo client, sticky audit banner, seeded demo data — will give an auditor honest access to:

- **All 7 shipped apps in their working state.** / assess, / promote, / engage, / optimize, / connect, / convert, Coach Blue will all behave correctly with seeded data.
- **The 6 partial apps in their visible state.** The auditor will see UIs, schemas, and where platform OAuth screens dead-end. That's the truthful picture.
- **Every page and route on the platform.** Marketing, portal, dashboards, embeds, admin panel (though admin will need its own seeded admin user).
- **The intentional non-fixes** (large files, naming choices, color discipline).

**What an audit will NOT show because the audit env cannot fake it:**

- Real ad platform publishes (no OAuth credentials)
- Real review response API push (per-business-owner OAuth)
- Real D&B lookups (credentials pending)
- Real Reddit ads activity (credentials pending)
- Real backlink data unless the Moz key is included in the audit env vars
- Real DataForSEO queries unless those credentials are added

**Recommended audit-banner language:**

> External integrations (Google Business, ad platforms, payment processors) are not connected in this audit environment. You will see the connect screens, but clicking through will not complete handshakes.

That's the honest framing.

---

## 13. Recommended audit focus areas

If an auditor had one hour with this platform, the highest-signal order is:

1. **/ convert end-to-end** — it's the newest big build; most likely to have a fresh-paint issue.
2. **The submission pipeline** — `routes/convert.ts` 6-step pipeline, then how / promote's `substituteVars` resolves `{{formUrl:SLUG}}`.
3. **Consent posture** — the 10 consent-related tables, the IP-capture flow on signup + assessment + form submit.
4. **The 80-endpoint `routes.ts` monolith** — likely the highest cyclomatic complexity in the codebase.
5. **The 4,347-line `routes/optimize.ts`** — heavy reliance on DataForSEO + Moz; verify error handling on credential absence.
6. **WebSocket auth** (`server/websocket.ts`) — two auth modes is where session bugs hide.
7. **The SwipesBlue webhook HMAC verification** — payment integrity gate.
8. **The platform adapter base class** — if it's well-shaped, the 15 implementations inherit quality; if it's leaky, that's a problem multiplier.
9. **The CRM contact-delete FK cleanup** — verify it actually runs in the right order.
10. **The schedule + stall-detector loops** — single-instance assumption is worth surfacing for any future horizontal scaling.

---

## 14. Appendix — methodology and limitations

### Methodology

This report was assembled in a single session by Claude Code on 2026-05-23. Four parallel Explore sub-agents were dispatched against the repository at `/Users/deanlewis/businessblueprint`, each given a non-overlapping slice of the surface area:

1. **Frontend agent** — full inventory of `client/src/pages/`, `client/src/components/`, `client/src/App.tsx`, `client/src/config/app-registry.ts`, `client/src/components/side-nav.tsx`, and `client/public/` embed scripts.
2. **Backend agent** — full inventory of `server/index.ts`, `server/routes.ts`, every file in `server/routes/`, every file in `server/services/`, middleware, background jobs, WebSocket, and external integrations.
3. **Schema agent** — full read of `shared/schema.ts` (~4,500 lines), every Drizzle table categorized by domain.
4. **App-by-app agent** — for each of the 13 apps, an assessment of frontend pages, backend routes, database tables, external APIs, shipped state, what works, what's gapped, with evidence.

The four agent reports were synthesized into this document. CLAUDE.md served as the authoritative source for intentional design choices, known feature gaps, recent changelog history, and infrastructure facts.

### Limitations

- **No runtime testing was performed.** No flow was clicked through a browser. No API endpoint was exercised live. No OAuth handshake was verified against an external system. Production behavior is inferred from code presence and structure.
- **No security audit was performed.** This report does not assess CSRF posture, rate-limiting, secret handling, dependency vulnerabilities, RLS posture on the database, or any other security dimension beyond noting concerns flagged by the inventory agents.
- **No performance audit was performed.** Bundle sizes, query plans, N+1 patterns, and load behavior are out of scope.
- **No accessibility audit was performed.** WCAG conformance, screen-reader behavior, color contrast on dark backgrounds (beyond the brand-rule "white text only on dark") are out of scope.
- **No mobile audit was performed.** The CLAUDE.md user-preferences memory notes "Mobile development is mandatory for every change" — this report does not verify that has held.
- **Counts may drift.** "70 pages," "88 tables," "~80 endpoints," "4,808 lines" — these were accurate at the time of agent execution. Any commit between then and the moment this report is read may shift them.
- **Feature-state classifications (SHIPPED / PARTIAL / STUB) are inventory-level, not test-level.** A "shipped" app may still have runtime bugs an auditor will surface. A "partial" app may have working code paths the inventory missed.

For runtime truth, the audit subdomain (audit.businessblueprint.io) is the next step.

---

*End of report.*
