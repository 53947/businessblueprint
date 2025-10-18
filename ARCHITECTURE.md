# Triad Blue Ecosystem - Technical Architecture

> **Version:** 2.0  
> **Last Updated:** October 18, 2025  
> **Architecture Decision Date:** October 18, 2025

---

## 🏗️ Executive Summary

The Triad Blue ecosystem consists of three **standalone, independently marketable** platforms:

1. **Business Blueprint (businessblueprint.io)** - Digital intelligence platform
2. **Hosts Blue (hostsblue.com)** - Web hosting & domain services  
3. **Swipes Blue (swipesblue.com)** - Payment gateway

**Critical Design Principle:** Each platform operates independently but shares authentication (SSO) and payment processing (Swipes Blue).

---

## 📐 Architecture Overview

### High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    TRIAD BLUE ECOSYSTEM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │  Business        │  │  Hosts Blue      │  │  Swipes Blue │ │
│  │  Blueprint       │  │  hostsblue.com   │  │  swipesblue  │ │
│  │  .io             │  │                  │  │  .com        │ │
│  │                  │  │                  │  │              │ │
│  │  - Assessments   │  │  - Domains       │  │  - Checkout  │ │
│  │  - AI Coach      │  │  - Hosting       │  │  - Invoices  │ │
│  │  - Synup         │  │  - WordPress     │  │  - Analytics │ │
│  │  - Commverse     │  │  - Email         │  │  - NMI API   │ │
│  │  - Portal        │  │  - AI Builder    │  │              │ │
│  └────────┬─────────┘  └────────┬─────────┘  └──────┬───────┘ │
│           │                     │                    │         │
│           └─────────────────────┴────────────────────┘         │
│                                 │                              │
│                    ┌────────────▼──────────────┐               │
│                    │   Unified SSO (Phase 2)   │               │
│                    │   JWT Token Exchange      │               │
│                    └───────────────────────────┘               │
│                                                                 │
│           ┌─────────────────────────────────────────┐          │
│           │  Payment Flow (ALL Platforms)           │          │
│           │                                         │          │
│           │  Any Platform → Swipes Blue Checkout   │          │
│           │  ↓                                      │          │
│           │  NMI Payment Gateway                   │          │
│           │  ↓                                      │          │
│           │  Success → Invoice + Return to Origin  │          │
│           └─────────────────────────────────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Platform Breakdown

### 1. Business Blueprint (businessblueprint.io)

**Status:** ~65% complete, production ready  
**Deployment:** Already live, hosted on Replit  
**Database:** PostgreSQL (Neon serverless)

**Core Features:**
- AI-powered Digital Assessment (Google Business + Synup)
- Digital Blueprint generation (11-step strategy)
- AI Business Coach (OpenAI GPT-4o)
- Client Portal with comprehensive dashboard
- Synup integration (listings, reviews, reputation)
- Commverse ecosystem (/send, /livechat, /inbox)
- À la carte marketplace
- 6-tier pricing system
- Impersonation system for admin support

**Planned Features (Phase 1):**
- Admin Dashboard (role-based interface)
- My Domains management (source of truth)
- Synup Scan integration
- AI Coach conversation history
- Review response automation

**Tech Stack:**
- Frontend: React 18, TypeScript, Wouter, Tailwind CSS, Shadcn/ui
- Backend: Node.js, Express.js, TypeScript
- Database: PostgreSQL with Drizzle ORM
- Auth: RS256 JWT
- Real-time: Socket.IO
- AI: OpenAI GPT-4o
- APIs: Synup, Google Places, Telnyx

---

### 2. Hosts Blue (hostsblue.com)

**Status:** ~5% complete (foundation only)  
**Deployment:** To be built as standalone app  
**Database:** PostgreSQL (separate or shared - TBD)

**MVP Features (Phase 0):**
- Domain search & registration (OpenSRS)
- Hosting signup (WPMUDev)
- Basic customer dashboard
- Payment via Swipes Blue

**Core Features (Phase 1):**
- AI Website Builder (simple, for middle-aged users)
- WPMUDev white-label integration (Hub Client, Branda Pro)
- OpenSRS complete domain management (DNS, transfers, renewals)
- WordPress management dashboard
- Email hosting (OpenSRS)
- SSL certificate automation

**Advanced Features (Phase 2-3):**
- Site performance monitoring
- Automated backups
- Migration tools
- Security scanning

**Tech Stack:**
- Frontend: React 18, TypeScript, Wouter, Tailwind CSS, Shadcn/ui (same as BB)
- Backend: Node.js, Express.js, TypeScript
- Database: PostgreSQL with Drizzle ORM
- Auth: JWT (shared with SSO)
- AI: OpenAI GPT-4o (website builder)
- APIs: WPMUDev, OpenSRS, Swipes Blue (payments)

**White-Label Integrations:**
- **WPMUDev:** Hub Client plugin for complete white-label hosting
- **OpenSRS:** XML API for domain registration, DNS, SSL, email

---

### 3. Swipes Blue (swipesblue.com)

**Status:** ~5% complete (NMI key configured)  
**Deployment:** To be built as standalone app  
**Database:** PostgreSQL (separate or shared - TBD)

**MVP Features (Phase 0):**
- Shopping cart system
- NMI payment checkout (Collect.js tokenization)
- Merchant signup
- Basic invoice generation
- Transaction logging

**Core Features (Phase 1):**
- Recurring billing & subscription management
- Revenue reporting & analytics
- Dunning management (failed payment retry)

**Advanced Features (Phase 2-3):**
- Digital wallets (Apple Pay, Google Pay)
- ACH/eCheck payments
- Batch processing
- Multi-MID routing
- AI fraud detection
- 3D Secure 2.0
- Refund processing
- Customer payment portal
- Abandoned cart recovery

**Tech Stack:**
- Frontend: React 18, TypeScript, Wouter, Tailwind CSS, Shadcn/ui
- Backend: Node.js, Express.js, TypeScript
- Database: PostgreSQL with Drizzle ORM
- Auth: JWT (shared with SSO)
- Payment Gateway: NMI (Network Merchants Inc.)
- PCI Compliance: Collect.js client-side tokenization

**White-Label Integration:**
- **NMI:** Full white-label payment gateway with branded checkout pages

---

## 🔐 Authentication & Single Sign-On (SSO)

### Current State (Phase 0 - Phase 1)
**Separate authentication per platform**

Each platform maintains its own user accounts:
- Business Blueprint: Existing user system (RS256 JWT)
- Hosts Blue: Separate user accounts
- Swipes Blue: Separate merchant accounts

### Future State (Phase 2)
**Unified SSO across all platforms**

#### SSO Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Central Auth Service                       │
│                  (Business Blueprint)                       │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  User Login → Generate JWT Token                     │  │
│  │  ↓                                                    │  │
│  │  Token signed with RS256 (shared private key)        │  │
│  │  ↓                                                    │  │
│  │  Token valid across all three platforms              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Token Payload:                                             │
│  {                                                          │
│    userId: "...",                                           │
│    email: "...",                                            │
│    platforms: {                                             │
│      businessBlueprint: { clientId: "..." },                │
│      hostsBlue: { customerId: "..." },                      │
│      swipesBlue: { merchantId: "..." }                      │
│    },                                                       │
│    roles: ["client", "admin"],                              │
│    iat: ...,                                                │
│    exp: ...                                                 │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
         │              │              │
         ▼              ▼              ▼
   ┌─────────┐    ┌─────────┐    ┌─────────┐
   │   BB    │    │   HB    │    │   SB    │
   │  Verify │    │  Verify │    │  Verify │
   │  Token  │    │  Token  │    │  Token  │
   └─────────┘    └─────────┘    └─────────┘
```

#### SSO Implementation Options

**Option A: Subdomain Cookie Sharing**
- All platforms under `*.triadblue.com`
  - businessblueprint.triadblue.com
  - hostsblue.triadblue.com
  - swipesblue.triadblue.com
- Set cookie domain to `.triadblue.com`
- JWT stored in httpOnly cookie
- Shared across all subdomains automatically

**Option B: Separate Domains with Token Exchange (CHOSEN)**
- Keep separate domains (.io, .com, .com)
- Use OAuth2-style redirect flow
- Login on one platform → redirect to auth service → return with token
- Token passed via URL parameter or postMessage
- Each platform stores token locally

**Recommendation:** Option B (separate domains) for brand independence

#### Account Linking
- Users can link existing accounts from all three platforms
- `linkedAccounts` table tracks cross-platform user IDs
- Merge accounts flow available in settings

---

## 👥 Admin vs Client Interface Architecture

### Problem Statement
Admin (you) needs different views than clients:
- Admin: See ALL clients, system metrics, impersonation access
- Clients: See only THEIR data

### Solution: Role-Based Routing (NOT Separate Accounts)

#### Current Implementation (Business Blueprint)
```typescript
// Existing pattern in Business Blueprint
if (user.email === 'admin@businessblueprint.io' || user.role === 'admin') {
  // Show admin features
  // Enable impersonation
}
```

#### Enhanced Implementation (Phase 1)

```typescript
// Middleware: server/middleware/roleCheck.ts
export function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// Route protection
router.get('/api/admin/dashboard', requireAdmin, getAdminDashboard);

// Frontend routing: client/src/App.tsx
function App() {
  const { user } = useAuth();
  
  if (user.role === 'admin') {
    return <AdminRoutes />;  // Admin Dashboard
  }
  
  return <ClientRoutes />;  // Client Portal
}
```

#### Admin Dashboard Features
Located at: `/admin` or `/dashboard/admin`

**Displays:**
- Total client count
- Active subscriptions
- Revenue metrics (aggregated)
- Recent client activity feed
- System health status
- Client list with search/filter
- Quick impersonation access
- Synup integration status across all clients

**Does NOT require:**
- Separate admin business account in Synup
- Separate client account for testing

**Testing Features:**
- Admin can create a test client account (e.g., test@businessblueprint.io)
- Switch to that account via impersonation to test features
- No need to pollute admin account with test data

---

## 💳 Payment Processing Architecture

### Universal Payment Flow (ALL Platforms)

**Critical Rule:** Swipes Blue processes ALL payments across the entire ecosystem

```
┌──────────────────────────────────────────────────────────────┐
│                    Payment Request Flow                      │
└──────────────────────────────────────────────────────────────┘

1. User initiates purchase on ANY platform:
   ┌────────────────────────────────────────────────────────┐
   │  Business Blueprint: Subscription purchase             │
   │  Hosts Blue: Domain registration or hosting plan       │
   │  Swipes Blue: Direct merchant transaction              │
   └────────────────────────────────────────────────────────┘
                         ↓
2. Platform creates payment request to Swipes Blue API:
   POST /api/payment/create
   {
     platform: "hostsblue",
     items: [...],
     total: 99.00,
     customerId: "...",
     returnUrl: "https://hostsblue.com/success",
     cancelUrl: "https://hostsblue.com/cancel"
   }
                         ↓
3. Swipes Blue generates checkout session:
   Response: { checkoutUrl: "https://swipesblue.com/checkout/abc123" }
                         ↓
4. User redirected to Swipes Blue checkout page:
   - NMI Collect.js tokenization form
   - Branded as Swipes Blue
   - Secure card entry (PCI compliant)
                         ↓
5. User completes payment:
   - NMI processes transaction
   - Swipes Blue records transaction
   - Invoice generated
                         ↓
6. Redirect back to origin platform:
   Success: returnUrl + ?sessionId=abc123&status=success
   Failure: cancelUrl + ?sessionId=abc123&status=failed
                         ↓
7. Origin platform verifies payment:
   GET /api/payment/verify/{sessionId}
   Response: { status: "paid", transactionId: "...", amount: 99.00 }
                         ↓
8. Origin platform fulfills order:
   - Business Blueprint: Activate subscription
   - Hosts Blue: Provision domain/hosting
   - Swipes Blue: Update merchant dashboard
```

### Payment Database Schema

**Swipes Blue (transactions table):**
```typescript
{
  id: "...",
  platform: "hostsblue", // or "businessblueprint", "swipesblue"
  platformTransactionId: "...", // platform-specific order ID
  nmiTransactionId: "...",
  amount: 99.00,
  currency: "USD",
  status: "completed",
  customerId: "...",
  items: [...],
  createdAt: timestamp,
  completedAt: timestamp
}
```

**Origin Platforms (orders/purchases table):**
```typescript
{
  id: "...",
  customerId: "...",
  swipesBlueSessionId: "abc123",
  swipesBlueTransactionId: "...",
  status: "paid",
  items: [...],
  total: 99.00,
  createdAt: timestamp
}
```

---

## 🌍 My Domains - Central Source of Truth

### Problem
Domains are referenced in multiple places:
- Assessment form (optional website field)
- Synup locations (domain tracking)
- Google Business Profile (website URL)
- Hosts Blue (domain registration)

### Solution: My Domains Management Section

**Location:** Client Portal → Settings → My Domains

**Database Schema:**
```typescript
// shared/schema.ts
export const clientDomains = pgTable('client_domains', {
  id: serial('id').primaryKey(),
  clientId: integer('client_id').references(() => clients.id),
  domain: varchar('domain', { length: 255 }).notNull(),
  isPrimary: boolean('is_primary').default(false),
  verified: boolean('verified').default(false),
  expiresAt: timestamp('expires_at'),
  dnsStatus: varchar('dns_status', { length: 50 }), // 'active', 'pending', 'error'
  registeredViaHostsBlue: boolean('registered_via_hosts_blue').default(false),
  linkedToSynup: boolean('linked_to_synup').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});
```

**Features:**
- Add/edit/remove domains
- Mark one as primary domain
- Verify ownership (DNS TXT record check)
- Link to Hosts Blue (if registered there)
- Link to Synup location (if tracking there)
- Show expiration date and DNS status
- Pre-populate from assessment form

**Integration Points:**
1. **Assessment Form:** Auto-populates My Domains when user completes assessment
2. **Synup Locations:** Pulls domain from My Domains when creating location
3. **Google Business:** Uses primary domain for website URL
4. **Hosts Blue:** Marks domain as "registered_via_hosts_blue" when purchased
5. **Email Setup:** Uses domain for email hosting configuration

---

## 🔍 Synup Integration Strategy

### Synup Subdomains (Configured)

1. **scan.businessblueprint.io** → Lead capture tool
   - CNAME → scan.synup.com
   - White-labeled Synup scan interface
   - Captures leads when businesses check their presence
   - **Status:** Not yet configured (DNS setup needed)

2. **dashboard.businessblueprint.io** → Partner dashboard
   - Where YOU manage client accounts in Synup
   - **Status:** Not using (we have our own admin dashboard)

3. **\*.dashboard.businessblueprint.io** → Client dashboards
   - For agencies who want to give clients Synup-branded portals
   - **Status:** Not needed (we have our own client portal)

### Synup Scan + Google Business Intelligence

**Goal:** Merge both data sources for comprehensive online presence analysis

**Implementation (Phase 1):**

```typescript
// server/services/assessment.ts
async function generateEnhancedAssessment(businessData) {
  // 1. Google Business Profile data (existing)
  const googleData = await googleBusiness.getProfile(businessData.name);
  
  // 2. Synup Scan data (NEW)
  const synupScanData = await synup.scanBusiness({
    businessName: businessData.name,
    address: businessData.address,
    phone: businessData.phone
  });
  
  // 3. Merge data sources
  const assessment = {
    googleBusiness: {
      verified: googleData.verified,
      reviews: googleData.reviews,
      hours: googleData.hours,
      photos: googleData.photos
    },
    synupScan: {
      totalDirectories: synupScanData.totalDirectories, // e.g., 200+
      activeListing: synupScanData.activeListings, // e.g., 45
      missingListings: synupScanData.missingListings, // e.g., 155
      citationInconsistencies: synupScanData.inconsistencies // e.g., 12
    },
    overallScore: calculateEnhancedScore(googleData, synupScanData) // 0-140
  };
  
  return assessment;
}

function calculateEnhancedScore(googleData, synupScanData) {
  // Google factors (70 points max)
  const googleScore = calculateGoogleScore(googleData); // 0-70
  
  // Synup factors (70 points max)
  const directoryScore = (synupScanData.activeListings / synupScanData.totalDirectories) * 50;
  const consistencyScore = synupScanData.citationInconsistencies === 0 ? 20 : 
                           Math.max(0, 20 - synupScanData.citationInconsistencies);
  
  return Math.round(googleScore + directoryScore + consistencyScore); // 0-140
}
```

---

## 🚀 Deployment Strategy

### Phase 0: Separate Deployments (MVP)

**Business Blueprint:**
- Already deployed on Replit
- Domain: businessblueprint.io
- Database: Neon PostgreSQL (existing)

**Hosts Blue:**
- New deployment on Replit (or separate host)
- Domain: hostsblue.com
- Database: Either shared with BB or new instance

**Swipes Blue:**
- New deployment on Replit (or separate host)
- Domain: swipesblue.com
- Database: Either shared or new instance

### Database Strategy

**Option A: Shared PostgreSQL Database**
- All three platforms use same Neon instance
- Separate schemas or table prefixes
- **Pros:** Easier cross-platform queries, single DB to manage
- **Cons:** Tight coupling, scaling limitations

**Option B: Separate Databases per Platform**
- Each platform has its own Neon instance
- **Pros:** True separation, independent scaling
- **Cons:** Cross-platform queries require API calls

**Recommendation:** Start with Option A (shared DB), migrate to Option B when scaling needed

### Environment Variables

**Shared Across All Platforms:**
- `DATABASE_URL` (if shared database)
- `JWT_SECRET` (for SSO)
- `OPENAI_API_KEY`

**Platform-Specific:**
- Business Blueprint: `SYNUP_API_KEY`, `GOOGLE_PLACES_API_KEY`, `TELNYX_API_KEY`
- Hosts Blue: `WPMUDEV_API_KEY`, `OPENSRS_API_KEY`
- Swipes Blue: `NMI_API_KEY`, `NMI_TOKENIZATION_KEY`

### Deployment Checklist

**Swipes Blue (Must Deploy First):**
1. Set up new Replit project or deployment
2. Configure NMI credentials
3. Deploy shopping cart + checkout flow
4. Test payment processing
5. Point swipesblue.com domain

**Hosts Blue:**
1. Set up new Replit project or deployment
2. Configure WPMUDev + OpenSRS credentials
3. Deploy domain registration + hosting signup
4. Integrate Swipes Blue for payments
5. Point hostsblue.com domain

**Business Blueprint (Already Deployed):**
1. Add Admin Dashboard
2. Add My Domains section
3. Integrate Synup Scan
4. Configure Swipes Blue for subscription payments (future)

---

## 📊 Cross-Platform Data Flow

### User Account Linking (Phase 2)

**Scenario:** User has accounts on all three platforms, wants unified experience

**Database Schema:**
```typescript
export const linkedAccounts = pgTable('linked_accounts', {
  id: serial('id').primaryKey(),
  primaryUserId: integer('primary_user_id').notNull(), // Main account
  platform: varchar('platform', { length: 50 }).notNull(), // 'businessblueprint', 'hostsblue', 'swipesblue'
  platformUserId: varchar('platform_user_id', { length: 255 }).notNull(),
  linkedAt: timestamp('linked_at').defaultNow()
});
```

**Flow:**
1. User logs into Business Blueprint
2. Navigates to Hosts Blue (SSO kicks in)
3. If no Hosts Blue account, prompt to create one
4. If existing Hosts Blue account, prompt to link
5. Once linked, user sees unified Master Dashboard

### Master Dashboard (Phase 2)

**Location:** Business Blueprint (central hub)

**Displays:**
- Business Blueprint metrics (assessment score, reviews, listings status)
- Hosts Blue services (domains, hosting, sites)
- Swipes Blue financials (revenue, transactions, invoices)

**Implementation:**
```typescript
// Aggregate data from all platforms
async function getMasterDashboardData(userId) {
  const linkedAccounts = await getLinkedAccounts(userId);
  
  const data = {
    businessBlueprint: await bb.getClientSummary(userId),
    hostsBlue: linkedAccounts.hostsBlue 
      ? await hostsBlue.getCustomerSummary(linkedAccounts.hostsBlue.platformUserId)
      : null,
    swipesBlue: linkedAccounts.swipesBlue
      ? await swipesBlue.getMerchantSummary(linkedAccounts.swipesBlue.platformUserId)
      : null
  };
  
  return data;
}
```

---

## 🔧 Technology Stack Summary

### Frontend (All Platforms)
- **Framework:** React 18 with TypeScript
- **Routing:** Wouter
- **Styling:** Tailwind CSS
- **Components:** Shadcn/ui
- **Forms:** React Hook Form + Zod validation
- **State:** TanStack Query v5
- **Build:** Vite

### Backend (All Platforms)
- **Runtime:** Node.js
- **Framework:** Express.js with TypeScript
- **Database:** PostgreSQL (Neon serverless)
- **ORM:** Drizzle ORM
- **Auth:** RS256 JWT
- **Sessions:** Connect-pg-simple (Business Blueprint)
- **Real-time:** Socket.IO (Business Blueprint, optional for others)

### External Services

**Business Blueprint:**
- OpenAI GPT-4o (AI analysis, coach, review responses)
- Synup API v4 (listings, reviews, scan)
- Google Places API (business data)
- Telnyx (SMS)
- Nodemailer (email)

**Hosts Blue:**
- WPMUDev API (hosting, WordPress management)
- OpenSRS API (domains, DNS, SSL, email)
- OpenAI GPT-4o (AI website builder)

**Swipes Blue:**
- NMI API (payment processing)
- NMI Collect.js (tokenization, PCI compliance)

---

## 📈 Scalability Considerations

### Current Architecture (Phase 0-1)
- Monolithic deployments per platform
- Shared database (recommended initially)
- Single server per platform

### Future Architecture (Phase 3+)
- Microservices per major feature
- Separate databases per platform
- Load balancing across multiple instances
- CDN for static assets
- Caching layer (Redis)
- Message queue for async operations (Bull/BullMQ)

### Database Scaling Strategy
1. **Start:** Shared Neon PostgreSQL
2. **Scale vertically:** Upgrade Neon tier
3. **Read replicas:** For reporting queries
4. **Separate databases:** When platforms become truly independent
5. **Sharding:** If individual platforms reach massive scale

---

## 🔒 Security Considerations

### Authentication
- RS256 JWT tokens (asymmetric encryption)
- httpOnly cookies (prevent XSS)
- CSRF protection
- Rate limiting on auth endpoints

### Payment Security (Swipes Blue)
- PCI compliance via NMI Collect.js (client-side tokenization)
- Never store raw card data
- Encrypted communication (HTTPS only)
- Transaction logging and audit trails

### API Security
- API key rotation policy
- Secrets stored in environment variables
- IP whitelisting for sensitive endpoints (OpenSRS)
- Request validation with Zod schemas

### Data Privacy
- GDPR/CCPA compliance
- Client data isolation (tenant-based queries)
- Encryption at rest (Neon PostgreSQL)
- Audit logging for admin actions

---

## 📝 Development Guidelines

### Code Organization

**Shared Code (Business Blueprint - Current):**
```
/
├── client/               # React frontend
│   ├── src/
│   │   ├── pages/        # Route components
│   │   ├── components/   # Reusable UI components
│   │   ├── lib/          # Utilities, query client
│   │   └── hooks/        # Custom React hooks
├── server/               # Express backend
│   ├── routes.ts         # API routes
│   ├── services/         # Business logic
│   │   ├── synup.ts
│   │   ├── openai.ts
│   │   └── ...
│   ├── middleware/       # Auth, logging, etc.
│   └── index.ts          # Server entry
├── shared/               # Shared types & schemas
│   └── schema.ts         # Drizzle ORM schemas
└── package.json
```

**Recommended Structure (Hosts Blue & Swipes Blue):**
- Mirror the same structure as Business Blueprint
- Keep shared utilities consistent across platforms
- Reuse UI components (Shadcn) for consistent UX

### Naming Conventions
- **Database tables:** snake_case (e.g., `client_domains`, `synup_listings`)
- **TypeScript:** camelCase for variables, PascalCase for types/components
- **Files:** kebab-case (e.g., `my-domains.tsx`, `synup-service.ts`)
- **API routes:** REST conventions (e.g., `GET /api/domains`, `POST /api/domains`)

---

## ✅ Quality Assurance

### Testing Strategy

**Unit Tests:**
- Service layer functions
- Utility functions
- API request/response validation

**Integration Tests:**
- API endpoint testing
- Database queries
- External service mocks (Synup, NMI, etc.)

**E2E Tests:**
- Critical user flows (signup, checkout, domain purchase)
- Cross-platform flows (Hosts Blue → Swipes Blue payment)
- Playwright for browser automation

### Monitoring & Logging

**Application Monitoring:**
- Error tracking (Sentry or similar)
- Performance monitoring (New Relic via WPMUDev)
- Uptime monitoring (Business Blueprint, Hosts Blue, Swipes Blue)

**Logging:**
- Structured logging (Winston or Pino)
- Log levels: error, warn, info, debug
- Audit logs for admin actions and financial transactions

---

## 🗺️ Migration Path (Future)

### If Scaling Requires Separation

**Current:** Three separate apps, shared database  
**Future:** Three separate apps, separate databases

**Migration Steps:**
1. Create new PostgreSQL instances for Hosts Blue and Swipes Blue
2. Export relevant tables from shared database
3. Import into new instances
4. Update cross-platform queries to use APIs instead of direct DB access
5. Implement API versioning for backward compatibility
6. Gradual cutover with monitoring

---

## 📚 Additional Resources

- **GitHub Issues:** https://github.com/53947/The_Blue_Link/issues
- **STATUS_REPORT.md:** Current progress and metrics
- **ROADMAP.md:** Development timeline and phases
- **GITHUB_ISSUES_TO_CREATE.md:** Complete issue specifications

---

**Document Version:** 2.0  
**Last Updated:** October 18, 2025  
**Next Review:** November 1, 2025  
**Maintained By:** Development Team
