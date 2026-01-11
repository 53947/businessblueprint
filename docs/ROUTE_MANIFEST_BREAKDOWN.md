# BusinessBlueprint Route Manifest Breakdown
**Generated: January 11, 2026**

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| **Total Pages** | 57 |
| **Live** | 30 |
| **Built** | 12 |
| **Auth Required** | 10 |
| **Admin Only** | 3 |
| **Dynamic** | 3 |
| **In Navigation** | 31 |

---

## CATEGORY: PUBLIC (Marketing & Information)
**Total routes: 10**

| Route | Name | Status | In Nav | Auth | Notes |
|-------|------|--------|--------|------|-------|
| `/` | Home | LIVE | Yes | No | Main landing page |
| `/about` | About Us | LIVE | Yes | No | Company information |
| `/contact` | Contact | LIVE | Yes | No | Get in touch |
| `/sitemap` | Site Map | LIVE | Yes | No | Platform navigation |
| `/privacy` | Privacy Policy | LIVE | Yes | No | Data protection policy |
| `/terms` | Terms of Service | LIVE | Yes | No | Terms and conditions |
| `/data-deletion` | Data Deletion | LIVE | Yes | No | Request data deletion |
| `/journey` | Success Journey | LIVE | Yes | No | 5-step success process |
| `/tour` | Platform Tour | BUILT | No | No | Interactive tour (not linked) |
| `/biif` | BIIF | LIVE | Yes | No | Business Innovation Framework |

---

## CATEGORY: ASSESSMENT (Digital IQ Flow)
**Total routes: 4**

| Route | Name | Status | In Nav | Auth | Notes |
|-------|------|--------|--------|------|-------|
| `/assessment` | Digital IQ Assessment | LIVE | Yes | No | Free 27-question assessment |
| `/dashboard/:id` | Prescription Dashboard | DYNAMIC | No | No | View personalized prescription (dynamic URL) |
| `/find-results` | Find My Results | LIVE | Yes | No | Look up assessment results |
| `/assessment-checkout` | Assessment Checkout | BUILT | No | No | Complete assessment purchase |

---

## CATEGORY: AI COACH (Coach Blue)
**Total routes: 1**

| Route | Name | Status | In Nav | Auth | Notes |
|-------|------|--------|--------|------|-------|
| `/ai-coach` | Coach Blue | LIVE | Yes | No | AI business coaching (Premium badge) |

---

## CATEGORY: PRICING (Plans & Checkout)
**Total routes: 7**

| Route | Name | Status | In Nav | Auth | Notes |
|-------|------|--------|--------|------|-------|
| `/pricing` | Pricing | LIVE | Yes | No | View subscription plans |
| `/subscription` | Subscription Plans | LIVE | Yes | No | DIY or Managed Services |
| `/pathways` | Pathways | LIVE | Yes | No | Paths to digital success |
| `/marketplace` | Marketplace | LIVE | Yes | No | Browse apps and tools |
| `/marketplace/checkout` | Marketplace Checkout | BUILT | No | No | Complete marketplace purchase |
| `/cart` | Shopping Cart | BUILT | No | No | Review cart items |
| `/checkout` | Checkout | BUILT | No | No | Complete purchase |

---

## CATEGORY: COMMVERSE (Communication Bundle)
**Total routes: 11**

| Route | Name | Status | In Nav | Auth | Notes |
|-------|------|--------|--------|------|-------|
| `/commverse` | Commverse Bundle | LIVE | Yes | No | Complete communication suite landing |
| `/commverse-pricing` | Commverse Pricing | BUILT | No | No | Communication tools pricing |
| `/send` | Send Landing | LIVE | Yes | No | Email and SMS marketing landing |
| `/send-app` | Send Dashboard | AUTH | No | **Yes** | Manage Send campaigns (requires auth) |
| `/inbox` | Inbox Landing | LIVE | Yes | No | Unified inbox overview |
| `/inbox-app` | Inbox Dashboard | AUTH | No | **Yes** | Manage unified inbox (requires auth) |
| `/livechat` | LiveChat Landing | LIVE | Yes | No | Real-time chat overview |
| `/livechat-demo` | LiveChat Demo | BUILT | No | No | Try live chat widget |
| `/livechat-install` | LiveChat Install | LIVE | Yes | No | Install LiveChat widget |
| `/content-landing` | Content Landing | LIVE | Yes | No | Content creation overview |
| `/content` | Content Dashboard | AUTH | No | **Yes** | Manage content calendar (requires auth) |

**Pattern:** Landing page (public) + Dashboard (`-app` suffix, requires auth)

---

## CATEGORY: LOCALBLUE (Local Business Bundle)
**Total routes: 5**

| Route | Name | Status | In Nav | Auth | Notes |
|-------|------|--------|--------|------|-------|
| `/localblue` | LocalBlue Bundle | LIVE | Yes | No | Local business presence landing |
| `/listings-landing` | Listings Landing | LIVE | Yes | No | Directory sync overview |
| `/listings-app` | Listings Dashboard | AUTH | No | **Yes** | Manage business listings (requires auth) |
| `/reputation-landing` | Reputation Landing | LIVE | Yes | No | Reputation management overview |
| `/reputation-app` | Reputation Dashboard | AUTH | No | **Yes** | Manage reviews (requires auth) |

**Pattern:** Landing page (public) + Dashboard (`-app` suffix, requires auth)

---

## CATEGORY: RELATIONSHIPS (CRM)
**Total routes: 2**

| Route | Name | Status | In Nav | Auth | Notes |
|-------|------|--------|--------|------|-------|
| `/relationships` | Relationships Landing | LIVE | Yes | No | CRM overview and pricing |
| `/relationships-app` | Relationships Dashboard | AUTH | No | **Yes** | CRM contacts, companies, deals, tasks (requires auth) |

**Pattern:** Landing page (public) + Dashboard (`-app` suffix, requires auth)

---

## CATEGORY: PORTAL (Dashboard & Apps)
**Total routes: 10**

| Route | Name | Status | In Nav | Auth | Notes |
|-------|------|--------|--------|------|-------|
| `/portal/login` | Portal Login | LIVE | Yes | No | Sign in to portal |
| `/portal/verify` | Verify Magic Link | BUILT | No | No | Email verification |
| `/portal/test` | Portal Test | BUILT | No | No | Test portal access |
| `/portal/dashboard` | Portal Dashboard | AUTH | No | **Yes** | Business command center |
| `/portal/inbox` | Portal Inbox | AUTH | No | **Yes** | Portal messages |
| `/portal/prescriptions/:id` | View Prescription | DYNAMIC | No | **Yes** | View specific prescription |
| `/portal/prescriptions` | All Prescriptions | AUTH | No | **Yes** | View all prescriptions |
| `/portal/prescription/:token` | Prescription Token | DYNAMIC | No | No | Access via token (no auth, uses token) |
| `/portal` | Client Portal | AUTH | Yes | **Yes** | Portal home |
| `/portal/assessment/confirmation` | Assessment Confirmation | BUILT | No | No | Confirm submission |

---

## CATEGORY: SCANSBLUE (Site Analysis)
**Total routes: 2**

| Route | Name | Status | In Nav | Auth | Notes |
|-------|------|--------|--------|------|-------|
| `/scansblue/purchase` | ScansBlue Purchase | BUILT | No | No | Purchase full report |
| `/scansblue/success` | ScansBlue Success | BUILT | No | No | Purchase confirmation |

---

## CATEGORY: RESOURCES (Help & Support)
**Total routes: 2**

| Route | Name | Status | In Nav | Auth | Notes |
|-------|------|--------|--------|------|-------|
| `/knowledge-base` | Knowledge Base | LIVE | Yes | No | Learn digital marketing |
| `/api-docs` | API Documentation | LIVE | Yes | No | Developer API reference |

---

## CATEGORY: ADMIN (Internal Only)
**Total routes: 3**

| Route | Name | Status | In Nav | Auth | Notes |
|-------|------|--------|--------|------|-------|
| `/admin` | Admin Panel | ADMIN | No | **Yes** | System administration |
| `/brand-studio` | Brand Studio | ADMIN | No | **Yes** | Manage brand assets |
| `/logo-preview` | Logo Preview | ADMIN | No | **Yes** | Preview brand logos |

---

## INDIVIDUAL APPS VERIFICATION

| App | Landing Page | Status | Dashboard | Status |
|-----|--------------|--------|-----------|--------|
| **Relationships** | `/relationships` | LIVE ✓ | `/relationships-app` | AUTH ✓ |
| **Send** | `/send` | LIVE ✓ | `/send-app` | AUTH ✓ |
| **Content** | `/content-landing` | LIVE ✓ | `/content` | AUTH ✓ |
| **Inbox** | `/inbox` | LIVE ✓ | `/inbox-app` | AUTH ✓ |
| **LiveChat** | `/livechat` | LIVE ✓ | `/livechat-demo` | BUILT (demo only) |
| **Listings** | `/listings-landing` | LIVE ✓ | `/listings-app` | AUTH ✓ |
| **Reputation** | `/reputation-landing` | LIVE ✓ | `/reputation-app` | AUTH ✓ |
| **Commverse** | `/commverse` | LIVE ✓ | N/A (bundle) | N/A |
| **LocalBlue** | `/localblue` | LIVE ✓ | N/A (bundle) | N/A |

---

## NAVIGATION AUDIT

### Main Header Dropdowns (from navigation-config.ts):
1. **How It Works** → 5-step journey (Assessment → Blueprint → LocalBlue → Coach Blue → Commverse)
2. **Products** → Apps & bundles with pricing
3. **Solutions** → Platforms & services
4. **Resources** → Learn, support, and manage

### Action Buttons (Right Side):
- Cart → `/cart`
- Inbox → `/portal/inbox`
- Dashboard → `/portal/dashboard`
- Digital IQ → `/assessment`

---

## CRITICAL ANSWERS

### 1. Bundle pages - landing only or dashboard sections?
**Answer:** `/commverse` and `/localblue` are **landing pages only**. They describe the bundle and link to individual apps. Dashboard functionality is in the individual app dashboards (`/send-app`, `/inbox-app`, `/content`, `/listings-app`, `/reputation-app`).

### 2. How are individual apps organized?
**Answer:** Apps are organized by category:
- **Commverse** category: `/send`, `/inbox`, `/livechat`, `/content-landing` (+ their `-app` dashboards)
- **LocalBlue** category: `/listings-landing`, `/reputation-landing` (+ their `-app` dashboards)
- **Relationships** category: `/relationships` (landing) + `/relationships-app` (dashboard)
- **Portal** category: User's authenticated dashboard, inbox, prescriptions

### 3. Is `/relationships` a separate app or bundled?
**Answer:** `/relationships` is a **standalone app** with its own category. It follows the same pattern as other apps:
- `/relationships` = Public landing page (pricing, features)
- `/relationships-app` = Authenticated CRM dashboard (contacts, companies, deals, tasks)

### 4. What routes exist but are NOT linked in navigation?
**Not linked (surfacedInNav: false):**
- `/tour` - Platform Tour
- `/dashboard/:id` - Dynamic prescription view
- `/assessment-checkout` - Assessment purchase flow
- `/marketplace/checkout`, `/cart`, `/checkout` - Commerce flow pages
- `/commverse-pricing` - Pricing details
- All `-app` dashboard routes (require auth first)
- `/livechat-demo` - Demo page
- `/scansblue/*` - Purchase/success pages
- `/portal/verify`, `/portal/test` - Utility pages
- All `/portal/prescriptions/*` routes - Accessed from portal
- All admin routes

### 5. What routes are broken or incomplete?
**All routes are functional.** Notes:
- `/livechat` has landing and demo but no authenticated dashboard (may be intentional - widget install only)
- ScansBlue routes are for Stripe purchase flow, not standalone pages

---

## APP NAMING PATTERN

All apps follow a consistent pattern:
- **Landing page:** `/app-name` or `/app-name-landing` (public, describes features/pricing)
- **Dashboard:** `/app-name-app` or `/app-name` (authenticated, actual functionality)

| App | Landing Route | Dashboard Route |
|-----|---------------|-----------------|
| Send | `/send` | `/send-app` |
| Inbox | `/inbox` | `/inbox-app` |
| LiveChat | `/livechat` | `/livechat-demo` (demo only) |
| Content | `/content-landing` | `/content` |
| Listings | `/listings-landing` | `/listings-app` |
| Reputation | `/reputation-landing` | `/reputation-app` |
| Relationships | `/relationships` | `/relationships-app` |

---

## STATUS LEGEND

| Status | Meaning |
|--------|---------|
| **LIVE** | Public page, linked in navigation |
| **BUILT** | Functional but not in main navigation |
| **AUTH** | Requires authentication to access |
| **ADMIN** | Admin-only access required |
| **DYNAMIC** | URL contains dynamic parameters (`:id`, `:token`) |

---

## SOURCE FILE

The route manifest is defined in: `shared/routes.ts`

This file serves as the single source of truth for all 57 application routes and is imported by the sitemap page at `/sitemap`.

---

*Document generated from shared/routes.ts manifest*
