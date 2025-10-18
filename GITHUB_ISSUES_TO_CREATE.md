# GitHub Issues to Create - Triad Blue Ecosystem

> **Last Updated:** October 18, 2025  
> **Visit:** https://github.com/53947/The_Blue_Link/issues/new/choose  
> **Copy/paste each issue below using the appropriate template**

---

## 🏗️ ARCHITECTURE OVERVIEW

**CRITICAL DECISION (Oct 18, 2025):**
- **Three STANDALONE apps** (separate deployments, can be marketed independently)
- **Swipes Blue** is the payment processor for ALL platforms
- **Single Sign-On (SSO)** connects all three platforms
- **Each app** must be self-sufficient and marketable on its own

### Platform Roles
1. **Business Blueprint (businessblueprint.io)** - Digital intelligence platform with AI coach, Synup integration, Commverse ecosystem
2. **Hosts Blue (hostsblue.com)** - WPMUDev white-label hosting, OpenSRS domains, AI website builder
3. **Swipes Blue (swipesblue.com)** - NMI white-label payment gateway (processes payments for all platforms)

---

## 📋 ISSUE ORGANIZATION

### Total Issues: 28
- **Phase 0 (MVP - Launch ASAP):** 8 issues
- **Business Blueprint:** 10 issues
- **Hosts Blue:** 9 issues  
- **Swipes Blue:** 6 issues
- **Cross-Platform:** 3 issues

### Priority Levels
- **🔴 CRITICAL (Phase 0 MVP):** Must launch before anything else
- **🟠 HIGH:** Core features for full platform launch
- **🟡 MEDIUM:** Enhancement features
- **🟢 LOW:** Nice-to-have features

---

# PHASE 0: MVP - LAUNCH ASAP

> **Goal:** Get Hosts Blue and Swipes Blue to market as quickly as possible

---

## 🔴 MVP-1: Swipes Blue - Shopping Cart

**Template:** Swipes Blue Task  
**Title:** `[SB][MVP] Build shopping cart system`  
**Labels:** `swipes-blue, mvp, critical-priority`

**Description:**
Core shopping cart functionality to enable checkout flow.

**Acceptance Criteria:**
- [ ] Add/remove items from cart
- [ ] Update item quantities
- [ ] Calculate totals (subtotal, tax if applicable)
- [ ] Cart persistence (localStorage for guests, database for logged-in users)
- [ ] Display cart icon with item count
- [ ] Simple cart UI (modal or sidebar)

**Technical Notes:**
- Create client/src/components/shopping-cart.tsx
- Add cartItems table to schema (userId, productId, quantity, price)
- localStorage fallback for non-authenticated users
- Use existing marketplace cart patterns as reference

**Priority:** 🔴 CRITICAL (MVP)

**Estimated Time:** 3-4 days

---

## 🔴 MVP-2: Swipes Blue - NMI Payment Checkout

**Template:** Swipes Blue Task  
**Title:** `[SB][MVP] Implement NMI payment gateway checkout`  
**Labels:** `swipes-blue, mvp, critical-priority, nmi`

**Description:**
Complete payment checkout using NMI (Network Merchants Inc.) gateway with tokenization.

**Acceptance Criteria:**
- [ ] Secure checkout page with NMI Collect.js tokenization
- [ ] Support major credit/debit cards (Visa, MC, Amex, Discover)
- [ ] Real-time payment validation
- [ ] Receipt generation and email
- [ ] Basic transaction logging

**Technical Notes:**
- Use VITE_NMI_TOKENIZATION_KEY secret (already available)
- Create server/services/nmi.ts for API integration
- Implement NMI Collect.js for PCI compliance (client-side tokenization)
- Create client/src/pages/checkout.tsx
- Add transactions table to schema (id, userId, amount, status, nmiTransactionId, createdAt)
- Reference NMI docs: https://docs.nmi.com/

**Priority:** 🔴 CRITICAL (MVP)

**Depends On:** MVP-1 (Shopping Cart)

**Estimated Time:** 5-7 days

---

## 🔴 MVP-3: Swipes Blue - Merchant Signup

**Template:** Swipes Blue Task  
**Title:** `[SB][MVP] Merchant registration and onboarding`  
**Labels:** `swipes-blue, mvp, critical-priority`

**Description:**
Allow businesses to sign up for Swipes Blue merchant accounts.

**Acceptance Criteria:**
- [ ] Merchant registration form (business name, contact, tax ID)
- [ ] Email verification
- [ ] Basic merchant dashboard (view transactions)
- [ ] Account status management
- [ ] Terms of service acceptance

**Technical Notes:**
- Create merchants table in schema
- Extend existing user authentication
- Create client/src/pages/merchant-signup.tsx
- Create client/src/pages/merchant-dashboard.tsx
- Email verification via existing nodemailer service

**Priority:** 🔴 CRITICAL (MVP)

**Estimated Time:** 3-4 days

---

## 🔴 MVP-4: Hosts Blue - Domain Search & Registration

**Template:** Hosts Blue Task  
**Title:** `[HB][MVP] OpenSRS domain search and registration`  
**Labels:** `hosts-blue, mvp, critical-priority, openSRS`

**Description:**
Domain availability search and registration flow using OpenSRS API.

**Acceptance Criteria:**
- [ ] Domain search with availability check (650+ TLDs)
- [ ] Domain registration flow
- [ ] WHOIS privacy option
- [ ] Auto-renew setting
- [ ] Domain lock by default
- [ ] Payment processing via Swipes Blue

**Technical Notes:**
- Create server/services/openSRS.ts (XML over HTTPS API)
- OpenSRS API docs: https://domains.opensrs.guide/docs/overview
- Add domains table to schema (domain, userId, registeredAt, expiresAt, autoRenew, locked)
- Create client/src/pages/domain-search.tsx
- Integrate with Swipes Blue for payment
- Use Horizon test environment first (horizon.opensrs.net)

**Priority:** 🔴 CRITICAL (MVP)

**Estimated Time:** 6-8 days

---

## 🔴 MVP-5: Hosts Blue - Hosting Signup

**Template:** Hosts Blue Task  
**Title:** `[HB][MVP] WPMUDev hosting signup integration`  
**Labels:** `hosts-blue, mvp, critical-priority, wpmudev`

**Description:**
Allow customers to sign up for web hosting via WPMUDev white-label.

**Acceptance Criteria:**
- [ ] Display hosting plans (Basic, Growing, Enterprise)
- [ ] Hosting signup form
- [ ] Create account via WPMUDev API
- [ ] Payment processing via Swipes Blue
- [ ] Confirmation email with login credentials
- [ ] Link domain to hosting account

**Technical Notes:**
- Create server/services/wpmudev.ts
- WPMUDev API docs: https://wpmudev.com/docs/api-plugin-development/
- Add hostingAccounts table to schema
- Create client/src/pages/hosting-signup.tsx
- Integrate Hub Client Plugin for white-label
- Reference WPMUDev reseller setup: https://wpmudev.com/blog/wpmu-dev-white-label-reseller-hosting/

**Priority:** 🔴 CRITICAL (MVP)

**Estimated Time:** 6-8 days

---

## 🔴 MVP-6: Hosts Blue - Basic Customer Dashboard

**Template:** Hosts Blue Task  
**Title:** `[HB][MVP] Customer dashboard for domains and hosting`  
**Labels:** `hosts-blue, mvp, critical-priority`

**Description:**
Simple dashboard where customers can view their domains and hosting services.

**Acceptance Criteria:**
- [ ] List all customer domains with expiry dates
- [ ] List hosting accounts with status
- [ ] Quick actions (renew domain, view hosting details)
- [ ] Billing history
- [ ] Support contact link

**Technical Notes:**
- Create client/src/pages/hosts-dashboard.tsx
- Display data from domains and hostingAccounts tables
- Simple, clean UI - no complex features yet
- Mobile-responsive design

**Priority:** 🔴 CRITICAL (MVP)

**Estimated Time:** 3-4 days

---

## 🔴 MVP-7: Swipes Blue - Basic Invoice Generation

**Template:** Swipes Blue Task  
**Title:** `[SB][MVP] Simple invoice generation for transactions`  
**Labels:** `swipes-blue, mvp, critical-priority`

**Description:**
Auto-generate invoices for completed transactions.

**Acceptance Criteria:**
- [ ] Auto-create invoice on successful payment
- [ ] Display invoice details (items, total, transaction ID, date)
- [ ] Simple invoice view page
- [ ] Email invoice to customer
- [ ] Invoice number generation

**Technical Notes:**
- Add invoices table to schema
- Create client/src/pages/invoice-view.tsx
- Email via existing nodemailer service
- Simple HTML template (PDF generation can wait for later phase)

**Priority:** 🔴 CRITICAL (MVP)

**Estimated Time:** 2-3 days

---

## 🔴 MVP-8: Cross-Platform Payment Integration

**Template:** Swipes Blue Task  
**Title:** `[SHARED][MVP] Connect Swipes Blue to Hosts Blue payments`  
**Labels:** `swipes-blue, hosts-blue, mvp, critical-priority, shared`

**Description:**
Enable Hosts Blue to process payments through Swipes Blue gateway.

**Acceptance Criteria:**
- [ ] Hosts Blue can create payment requests to Swipes Blue
- [ ] Payment flows redirect to Swipes Blue checkout
- [ ] Success/failure callbacks return to Hosts Blue
- [ ] Transaction records linked to Hosts Blue services
- [ ] Unified payment history

**Technical Notes:**
- Create shared payment API endpoint in Swipes Blue
- Hosts Blue calls Swipes Blue API for checkout
- Handle redirect flows with return URLs
- Store platform source in transactions table

**Priority:** 🔴 CRITICAL (MVP)

**Depends On:** MVP-2 (NMI Checkout), MVP-4 (Domain Registration), MVP-5 (Hosting Signup)

**Estimated Time:** 4-5 days

---

# BUSINESS BLUEPRINT ISSUES

---

## 🟠 BB-1: Admin Dashboard Interface

**Template:** Business Blueprint Task  
**Title:** `[BB] Build admin master dashboard with role-based views`  
**Labels:** `business-blueprint, enhancement, high-priority, admin`

**Description:**
Create dedicated admin interface for managing all clients, separate from client portal view.

**Acceptance Criteria:**
- [ ] Role-based routing (admin sees Admin Dashboard, clients see Client Portal)
- [ ] Admin Dashboard shows:
  - [ ] Total clients count
  - [ ] Active subscriptions
  - [ ] Revenue metrics
  - [ ] Recent activity feed
  - [ ] System health status
- [ ] Client list with search/filter
- [ ] Quick actions (view client, impersonate, suspend account)
- [ ] Synup integration status across all clients
- [ ] Admin does NOT need separate business account (role-based only)

**Technical Notes:**
- Create client/src/pages/admin-dashboard.tsx
- Extend existing role checking middleware
- Admin role check: user.email === 'admin@businessblueprint.io' or user.role === 'admin'
- Aggregate queries across clients table
- Reuse existing impersonation system
- Add admin navigation component

**Priority:** 🟠 HIGH

**Estimated Time:** 5-6 days

---

## 🟠 BB-2: My Domains Management Section

**Template:** Business Blueprint Task  
**Title:** `[BB] My Domains management for tracking client business domains`  
**Labels:** `business-blueprint, enhancement, high-priority`

**Description:**
Dedicated section where clients manage their business domains (source of truth for all domain-related features).

**Acceptance Criteria:**
- [ ] Add/edit/remove business domains
- [ ] Mark primary domain
- [ ] Domain verification status
- [ ] Link to Synup listings tracking
- [ ] Link to Hosts Blue (if domain hosted there)
- [ ] Domain expiration tracking
- [ ] DNS status check

**Acceptance Criteria (continued):**
- [ ] Accessible from Client Portal → Settings → My Domains
- [ ] Validation: proper domain format, no duplicates
- [ ] Integration with existing assessment data (pre-fill from assessment if available)

**Technical Notes:**
- Add clientDomains table to schema (id, clientId, domain, isPrimary, verified, expiresAt, dnsStatus)
- Create client/src/pages/my-domains.tsx
- Update assessment form to populate this table
- This becomes source of truth for Synup location domain, Google Business domain, etc.
- Add domain verification via DNS TXT record (optional for later phase)

**Priority:** 🟠 HIGH

**Estimated Time:** 4-5 days

---

## 🟠 BB-3: Synup Scan Integration

**Template:** Business Blueprint Task  
**Title:** `[BB] Integrate Synup Scan with Google Business intelligence`  
**Labels:** `business-blueprint, enhancement, high-priority, synup`

**Description:**
Combine Synup's 200+ directory scan with existing Google Business Profile data for comprehensive online presence analysis.

**Acceptance Criteria:**
- [ ] Call Synup Scan API during assessment
- [ ] Merge Synup scan results with Google Business data
- [ ] Enhanced Digital Assessment scoring (incorporate directory coverage)
- [ ] Display combined results in Blueprint
- [ ] Show which directories are missing vs active
- [ ] Highlight citation inconsistencies across directories
- [ ] Improved recommendations based on both data sources

**Technical Notes:**
- Setup scan.businessblueprint.io subdomain (CNAME → scan.synup.com)
- Configure in Synup Agency Settings
- Extend server/services/synup.ts with scan API calls
- Merge data in assessment generation logic
- Update scoring algorithm to include directory coverage (scale 0-140)
- Add synupScanResults table to schema
- Reference: https://support.synup.com/hc/en-us/articles/360040568373-Agency-Tools-Scan-Tool-Setup

**Priority:** 🟠 HIGH

**Estimated Time:** 6-7 days

---

## 🟠 BB-4: Complete Synup Listings Automation

**Template:** Business Blueprint Task  
**Title:** `[BB] Complete Synup listings sync automation`  
**Labels:** `business-blueprint, enhancement, high-priority, synup`

**Description:**
Automate the synchronization of business listings from Synup API across 200+ directories.

**Acceptance Criteria:**
- [ ] Automated daily sync of listings from Synup API
- [ ] Status tracking for each directory (active, pending, rejected)
- [ ] Error handling and retry logic for failed syncs
- [ ] Client dashboard displays real-time listing status
- [ ] Email notifications for listing approval/rejection
- [ ] Background job scheduler (cron or similar)

**Technical Notes:**
- Uses existing Synup SDK integration (@mx-inventor/synup)
- Leverage server/services/synup.ts and synupMappings.ts
- Store sync results in synupListings table
- Implement background job scheduler for daily sync
- Node-cron or similar for scheduling

**Priority:** 🟠 HIGH

**Estimated Time:** 5-6 days

---

## 🟠 BB-5: AI Coach Conversation History

**Template:** Business Blueprint Task  
**Title:** `[BB] Add conversation history to AI Business Coach`  
**Labels:** `business-blueprint, enhancement, high-priority, ai`

**Description:**
Enable users to view past AI Coach conversations and continue previous discussions.

**Acceptance Criteria:**
- [ ] Store coach conversations in database with timestamps
- [ ] Display conversation history in sidebar/panel
- [ ] Allow users to resume previous conversations
- [ ] Search/filter past conversations by topic or date
- [ ] Export conversation as PDF/text
- [ ] Auto-save conversations during chat

**Technical Notes:**
- Create aiCoachConversations table (id, clientId, title, messages JSON, createdAt, updatedAt)
- Update client/src/components/ai-coach.tsx
- Use TanStack Query for conversation loading
- Integrate with existing OpenAI service (server/services/aiCoach.ts)
- Generate conversation titles via GPT-4o (summarize first message)

**Priority:** 🟠 HIGH

**Estimated Time:** 4-5 days

---

## 🟠 BB-6: Review Response Automation Workflows

**Template:** Business Blueprint Task  
**Title:** `[BB] Implement automated review response workflows`  
**Labels:** `business-blueprint, enhancement, high-priority, synup, ai`

**Description:**
Create automated workflows to respond to reviews based on user-defined rules.

**Acceptance Criteria:**
- [ ] Define response rules (e.g., auto-respond to 4-5 star reviews)
- [ ] Template library for common responses
- [ ] AI-generated personalized responses (using existing GPT-4o)
- [ ] Schedule responses (immediate vs delayed)
- [ ] Dashboard for reviewing/approving automated responses before posting
- [ ] Bulk approve/reject capability

**Technical Notes:**
- Extend server/services/reviewAI.ts for automation rules
- Add reviewResponseWorkflows table to schema (clientId, rules, templates, enabled)
- Integrate with existing review monitoring system
- Use client preferences from review-notifications settings
- Add approval queue before posting responses

**Priority:** 🟠 HIGH

**Estimated Time:** 6-7 days

---

## 🟡 BB-7: Campaign Tracking System

**Template:** Business Blueprint Task  
**Title:** `[BB] Build comprehensive campaign tracking system`  
**Labels:** `business-blueprint, enhancement, medium-priority`

**Description:**
Track marketing campaigns across channels with performance metrics.

**Acceptance Criteria:**
- [ ] Create/manage campaigns (name, goals, channels, budget)
- [ ] Track campaign performance (impressions, clicks, conversions)
- [ ] Multi-channel support (email, SMS, social media)
- [ ] Visual analytics dashboard with charts
- [ ] Export campaign reports (CSV, PDF)
- [ ] Campaign templates for common types

**Technical Notes:**
- Create campaigns table in schema (id, clientId, name, goals, channels, budget, status, metrics JSON)
- New page: client/src/pages/campaigns.tsx
- Integrate with /send dashboard for email/SMS campaigns
- Use Recharts for analytics visualization
- Track UTM parameters for attribution

**Priority:** 🟡 MEDIUM

**Estimated Time:** 7-8 days

---

## 🟡 BB-8: SMS Marketing Campaigns (/send)

**Template:** Business Blueprint Task  
**Title:** `[BB] Complete SMS marketing features in /send`  
**Labels:** `business-blueprint, commverse, enhancement, medium-priority`

**Description:**
Full SMS campaign functionality for Commverse /send app.

**Acceptance Criteria:**
- [ ] SMS contact management (import CSV, manual entry, segments)
- [ ] SMS template builder with personalization tokens
- [ ] Schedule SMS broadcasts
- [ ] Track delivery status and responses
- [ ] Compliance features (opt-out handling, TCPA compliance)
- [ ] Character counter and segment calculator
- [ ] Link shortening with click tracking

**Technical Notes:**
- Extend client/src/pages/send-dashboard.tsx
- Use existing Telnyx service (server/services/telnyx.ts)
- Add smsContacts and smsCampaigns tables to schema
- Rate limiting for SMS sending (to avoid carrier blocks)
- Opt-out management with blocklist

**Priority:** 🟡 MEDIUM

**Estimated Time:** 8-10 days

---

## 🟡 BB-9: Unified Inbox Advanced Filtering

**Template:** Business Blueprint Task  
**Title:** `[BB] Add advanced filtering to Unified Inbox`  
**Labels:** `business-blueprint, commverse, enhancement, medium-priority`

**Description:**
Advanced filtering and search for the Unified Inbox (/inbox).

**Acceptance Criteria:**
- [ ] Filter by channel (Email, SMS, WhatsApp, Messenger, Instagram, etc.)
- [ ] Filter by status (unread, starred, archived, assigned)
- [ ] Search messages by content/sender
- [ ] Date range filtering
- [ ] Save custom filter presets
- [ ] Bulk actions (mark as read, archive, assign)
- [ ] Advanced search (regex, exact phrase)

**Technical Notes:**
- Update client/src/pages/inbox.tsx
- Add filter query params to API routes
- Implement full-text search on messages table
- Store filter presets in user preferences table
- Add search indexing for performance

**Priority:** 🟡 MEDIUM

**Estimated Time:** 5-6 days

---

## 🟢 BB-10: Custom Dashboard Widgets

**Template:** Business Blueprint Task  
**Title:** `[BB] Customizable dashboard widgets for client portal`  
**Labels:** `business-blueprint, enhancement, low-priority`

**Description:**
Allow clients to customize their portal dashboard with drag-and-drop widgets.

**Acceptance Criteria:**
- [ ] Widget library (reviews, listings, analytics, tasks, quick actions)
- [ ] Drag-and-drop interface for layout
- [ ] Save custom layouts per user
- [ ] Resize widgets
- [ ] Show/hide widgets
- [ ] Default layouts for new users

**Technical Notes:**
- Use react-grid-layout or similar
- Store layouts in dashboardLayouts table
- Create modular widget components
- Client-side layout persistence

**Priority:** 🟢 LOW

**Estimated Time:** 6-7 days

---

# HOSTS BLUE ISSUES

---

## 🟠 HB-1: AI Website Builder (Simple, Non-Technical)

**Template:** Hosts Blue Task  
**Title:** `[HB] Build AI-powered website builder for middle-aged users`  
**Labels:** `hosts-blue, enhancement, high-priority, ai`

**Description:**
Simple AI website builder that generates complete sites from business description. Designed for middle-aged users without technical patience.

**Acceptance Criteria:**
- [ ] "Tell us about your business" input (plain language, 3-5 sentences)
- [ ] AI generates complete website:
  - [ ] Site structure (pages: Home, About, Services, Contact)
  - [ ] Professional copy for all pages
  - [ ] Images (stock or AI-generated)
  - [ ] Contact forms
- [ ] Show 3 template options (Restaurant, Retail, Services, Professional)
- [ ] One-click publish to WordPress (via WPMUDev)
- [ ] Dead-simple editor for tweaks (not complex like GrapesJS):
  - [ ] Edit text inline
  - [ ] Swap images
  - [ ] Change colors
  - [ ] No code exposure
- [ ] Mobile preview
- [ ] SEO basics auto-configured (meta tags, titles)

**Technical Notes:**
- Use OpenAI GPT-4o to generate:
  - Site structure and content
  - Page layouts
  - Meta descriptions
- Stock images via existing stock_image_tool or AI generation via generate_image_tool
- Simple templates (pre-built HTML/CSS, GPT-4o fills content)
- Deploy to WordPress via WPMUDev API
- Create client/src/pages/website-builder.tsx
- Add generatedSites table to schema
- MUST be simpler than existing complex builders - focus on speed and ease

**Priority:** 🟠 HIGH

**Estimated Time:** 10-12 days

---

## 🟠 HB-2: WPMUDev White-Label Integration

**Template:** Hosts Blue Task  
**Title:** `[HB] Complete WPMUDev white-label hosting integration`  
**Labels:** `hosts-blue, enhancement, high-priority, wpmudev`

**Description:**
Full white-label integration with WPMUDev for hosting services under Hosts Blue brand.

**Acceptance Criteria:**
- [ ] Install Hub Client plugin on Hosts Blue platform
- [ ] Configure white-label branding (logo, colors, domain)
- [ ] Client role management
- [ ] Automated site provisioning via API
- [ ] Backup scheduling
- [ ] Staging environment creation
- [ ] SSH/SFTP access management
- [ ] WP-CLI command execution via API

**White-Label Features from Research:**
- [ ] Branda Pro plugin integration (30+ white-label modules)
- [ ] Custom branded emails (via SMTP from hostsblue.com)
- [ ] Custom login pages
- [ ] Hide WPMUDev branding completely
- [ ] Wholesale pricing setup

**Technical Notes:**
- Hub Client Plugin: https://wpmudev.com/project/the-hub-client/
- WPMUDev API: https://wpmudev.com/docs/api-plugin-development/
- Hosting API: https://wpmudev.com/docs/api-plugin-development/hosting-api-docs/
- Create complete server/services/wpmudev.ts
- Store API credentials securely
- Create hosting management dashboard

**Priority:** 🟠 HIGH

**Estimated Time:** 8-10 days

---

## 🟠 HB-3: OpenSRS Complete Domain Management

**Template:** Hosts Blue Task  
**Title:** `[HB] Complete OpenSRS domain registration and management`  
**Labels:** `hosts-blue, enhancement, high-priority, openSRS`

**Description:**
Full domain lifecycle management using OpenSRS API (registration, transfer, DNS, email, SSL).

**Acceptance Criteria:**
- [ ] Domain registration (650+ TLDs)
- [ ] Domain transfer with auth code management
- [ ] DNS record management (A, CNAME, MX, TXT, SRV)
- [ ] Nameserver configuration
- [ ] Domain renewal automation with expiry alerts
- [ ] WHOIS privacy settings
- [ ] Domain locking/unlocking
- [ ] Bulk operations (multiple domains at once)

**White-Label Features from Research:**
- [ ] Custom technical contact in WHOIS
- [ ] Branded reseller control panel
- [ ] SSL certificate automation (Let's Encrypt + premium)
- [ ] Email hosting integration (OpenSRS hosted email)
- [ ] Auth code management for transfers
- [ ] Transfer status automation
- [ ] Domain monitoring (expiration alerts 30/60/90 days)

**Technical Notes:**
- OpenSRS XML API (ports 55443, 55000)
- API docs: https://domains.opensrs.guide/docs/overview
- Test environment: horizon.opensrs.net (use first)
- Production: rr-n1-tor.opensrs.net (requires IP authorization)
- Create comprehensive server/services/openSRS.ts
- Add tables: domains, dnsRecords, sslCertificates, emailAccounts
- Create client/src/pages/domain-management.tsx
- Automated renewal workflow (cron job)

**Priority:** 🟠 HIGH

**Estimated Time:** 10-12 days

---

## 🟠 HB-4: WordPress Management Dashboard

**Template:** Hosts Blue Task  
**Title:** `[HB] WordPress installation and management tools`  
**Labels:** `hosts-blue, enhancement, high-priority, wpmudev`

**Description:**
Complete WordPress management system via WPMUDev API.

**Acceptance Criteria:**
- [ ] One-click WordPress installation
- [ ] WordPress version management (updates with backups)
- [ ] Plugin management (install, update, activate, deactivate, delete)
- [ ] Theme management (install, switch, customize)
- [ ] Database backup & restore
- [ ] Security scanning for vulnerabilities
- [ ] Performance optimization (caching, minification)
- [ ] Malware scanning and cleanup

**White-Label Features from Research:**
- [ ] Automated maintenance tasks via WP-CLI
- [ ] CI/CD deployment (GitHub Actions, Bitbucket Pipelines)
- [ ] New Relic monitoring integration
- [ ] Automated plugin/theme updates with rollback
- [ ] Security patch management (Defender plugin)
- [ ] Performance optimization (Hummingbird, Smush plugins)

**Technical Notes:**
- WPMUDev WordPress API integration
- Create client/src/pages/wordpress-manager.tsx
- Add wordpressSites table to schema
- WP-CLI commands via API for automation
- Automated security notifications
- Plugin whitelist/blacklist functionality

**Priority:** 🟠 HIGH

**Estimated Time:** 8-10 days

---

## 🟠 HB-5: Email Hosting Management

**Template:** Hosts Blue Task  
**Title:** `[HB] OpenSRS email hosting setup and management`  
**Labels:** `hosts-blue, enhancement, high-priority, openSRS`

**Description:**
Complete email hosting solution using OpenSRS email services.

**Acceptance Criteria:**
- [ ] Email account creation (name@customdomain.com)
- [ ] Webmail access integration
- [ ] Spam filtering configuration
- [ ] Email forwarding rules
- [ ] Storage quota management
- [ ] Email client setup guides (IMAP/POP3/SMTP settings)
- [ ] Email migration tools (import from Gmail, Outlook, etc.)
- [ ] Auto-responders and vacation messages

**White-Label Features from Research:**
- [ ] Professional email with custom domains
- [ ] Mail Administration Console (MAC)
- [ ] Automated email account creation with domain registration
- [ ] Email backup and archiving
- [ ] Email alias management
- [ ] Distribution lists

**Technical Notes:**
- OpenSRS Hosted Email API
- Create client/src/pages/email-management.tsx
- Add emailAccounts table to schema
- Integrate with domain management (#HB-3)
- Automated MX record configuration
- Email quota monitoring and alerts

**Priority:** 🟠 HIGH

**Estimated Time:** 7-8 days

---

## 🟡 HB-6: SSL Certificate Automation

**Template:** Hosts Blue Task  
**Title:** `[HB] Automated SSL certificate provisioning and renewal`  
**Labels:** `hosts-blue, enhancement, medium-priority, openSRS`

**Description:**
Automatic SSL certificate installation and renewal for all hosted sites.

**Acceptance Criteria:**
- [ ] Auto-provision SSL on new site creation
- [ ] Support for Let's Encrypt (free)
- [ ] Support for premium SSL (via OpenSRS)
- [ ] Automatic renewal before expiration
- [ ] Mixed content detection and fixing
- [ ] SSL status dashboard with expiry alerts
- [ ] Force HTTPS redirects

**White-Label Features from Research:**
- [ ] OpenSRS SSL certificate API integration
- [ ] Automated certificate validation (DV, OV, EV)
- [ ] Wildcard certificate support
- [ ] Multi-domain certificates (SAN)

**Technical Notes:**
- Let's Encrypt integration via ACME protocol
- OpenSRS SSL API for premium certificates
- Add sslCertificates table to schema
- Background job for renewal checks (30 days before expiry)
- Email alerts for upcoming expirations
- Automated installation to hosting

**Priority:** 🟡 MEDIUM

**Estimated Time:** 6-7 days

---

## 🟡 HB-7: Site Performance Monitoring

**Template:** Hosts Blue Task  
**Title:** `[HB] Website performance monitoring and optimization`  
**Labels:** `hosts-blue, enhancement, medium-priority`

**Description:**
Monitor website speed, uptime, and performance with optimization suggestions.

**Acceptance Criteria:**
- [ ] Uptime monitoring (ping every 5 minutes)
- [ ] Page load speed tracking
- [ ] Performance score (Google PageSpeed Insights API)
- [ ] Downtime alerts (email, SMS)
- [ ] Performance trends over time
- [ ] Optimization recommendations
- [ ] CDN integration (if needed)

**White-Label Features from Research:**
- [ ] New Relic APM integration
- [ ] Automated performance reports
- [ ] Resource usage alerts (CPU, memory, disk)

**Technical Notes:**
- Create monitoring service with uptime checks
- Google PageSpeed Insights API integration
- Add performanceMetrics table to schema
- Create client/src/pages/site-performance.tsx
- Alerting via existing email/SMS services

**Priority:** 🟡 MEDIUM

**Estimated Time:** 6-7 days

---

## 🟡 HB-8: Site Backup & Restore System

**Template:** Hosts Blue Task  
**Title:** `[HB] Automated backup and restore for hosted sites`  
**Labels:** `hosts-blue, enhancement, medium-priority, wpmudev`

**Description:**
Automated backup system with easy restore functionality.

**Acceptance Criteria:**
- [ ] Automated daily backups (configurable: hourly, daily, weekly)
- [ ] Backup before updates (WP core, plugins, themes)
- [ ] Store backups remotely (S3 or similar)
- [ ] One-click restore functionality
- [ ] Backup retention policy (30 days default)
- [ ] Download backup archives
- [ ] Backup verification (test restores)

**White-Label Features from Research:**
- [ ] WPMUDev Snapshot Pro integration
- [ ] Automated backup scheduling via API
- [ ] Incremental backups for efficiency

**Technical Notes:**
- WPMUDev Snapshot API integration
- Add backups table to schema
- Create client/src/pages/backup-manager.tsx
- S3-compatible storage for backup archives
- Automated backup testing (monthly)

**Priority:** 🟡 MEDIUM

**Estimated Time:** 7-8 days

---

## 🟢 HB-9: Migration Assistance Tools

**Template:** Hosts Blue Task  
**Title:** `[HB] Automated website migration from other hosts`  
**Labels:** `hosts-blue, enhancement, low-priority`

**Description:**
Tools to help customers migrate existing websites to Hosts Blue.

**Acceptance Criteria:**
- [ ] Migration wizard (step-by-step)
- [ ] Support multiple platforms (cPanel, Plesk, other WP hosts)
- [ ] Automated content migration (files, database)
- [ ] DNS migration checklist
- [ ] Email migration tools
- [ ] Post-migration verification
- [ ] Migration status tracking

**Technical Notes:**
- WPMUDev migration plugin integration
- Create client/src/pages/site-migration.tsx
- Add migrations table to schema
- Automated DNS verification
- Email migration via OpenSRS

**Priority:** 🟢 LOW

**Estimated Time:** 8-10 days

---

# SWIPES BLUE ISSUES

---

## 🟠 SB-1: Recurring Billing & Subscription Management

**Template:** Swipes Blue Task  
**Title:** `[SB] NMI subscription billing and management system`  
**Labels:** `swipes-blue, enhancement, high-priority, nmi`

**Description:**
Manage recurring subscriptions with automated billing via NMI.

**Acceptance Criteria:**
- [ ] Create subscription plans (monthly, quarterly, annual)
- [ ] Automated recurring charges via NMI
- [ ] Trial period support (7/14/30 days)
- [ ] Subscription cancellation/pause/resume
- [ ] Dunning management (failed payment retry logic)
- [ ] Subscription analytics dashboard
- [ ] Proration handling for plan changes
- [ ] Grace period before suspension

**White-Label Features from Research:**
- [ ] NMI recurring billing API integration
- [ ] Webhook handling for recurring events
- [ ] Intelligent retry logic (3 attempts over 7 days)
- [ ] Automated dunning emails
- [ ] Card expiration alerts

**Technical Notes:**
- NMI Recurring Billing API: https://docs.nmi.com/
- Extend existing subscription system (client/src/pages/subscription.tsx)
- Create server/services/subscriptionBilling.ts
- Add subscriptionBilling table to schema (planId, userId, status, nextBillingDate, retryCount)
- Webhook handling for NMI recurring events
- Automated email notifications

**Priority:** 🟠 HIGH

**Estimated Time:** 8-10 days

---

## 🟠 SB-2: Revenue Reporting & Analytics

**Template:** Swipes Blue Task  
**Title:** `[SB] Revenue reporting and financial analytics`  
**Labels:** `swipes-blue, enhancement, high-priority`

**Description:**
Comprehensive financial reporting and revenue analytics for merchants.

**Acceptance Criteria:**
- [ ] Daily/weekly/monthly revenue reports
- [ ] Payment method breakdown (Visa, MC, Amex, etc.)
- [ ] Refund tracking and analysis
- [ ] Revenue trends visualization (charts)
- [ ] Export reports (CSV, PDF)
- [ ] Tax reporting summaries
- [ ] Transaction volume metrics
- [ ] Average transaction value (ATV)
- [ ] Customer lifetime value (CLV) calculations

**Technical Notes:**
- Create client/src/pages/revenue-analytics.tsx
- Use Recharts for visualizations
- Add revenueReports table to schema
- Scheduled report generation (daily cron)
- Aggregation queries for performance
- Email automated reports weekly

**Priority:** 🟠 HIGH

**Estimated Time:** 7-8 days

---

## 🟡 SB-3: Advanced NMI Features Integration

**Template:** Swipes Blue Task  
**Title:** `[SB] Integrate advanced NMI white-label capabilities`  
**Labels:** `swipes-blue, enhancement, medium-priority, nmi`

**Description:**
Implement advanced NMI features discovered in white-label research.

**Acceptance Criteria:**
- [ ] Digital wallets support (Apple Pay, Google Pay)
- [ ] ACH/eCheck payments
- [ ] Batch processing (upload CSV for bulk transactions)
- [ ] Multi-MID intelligent routing (route to different merchant accounts based on rules)
- [ ] AI-driven fraud detection (enable NMI fraud tools)
- [ ] Product/inventory management (SKU tracking)
- [ ] 3D Secure 2.0 authentication (SCA compliance for international)
- [ ] Customer vault (tokenized card storage for repeat customers)

**White-Label Features from Research:**
- [ ] Webhooks for real-time transaction notifications
- [ ] Virtual terminal (browser-based manual entry)
- [ ] Hosted payment pages (fully branded)
- [ ] Mobile SDK integration (iOS/Android - future)
- [ ] AVS and CVV verification
- [ ] Rule-based fraud screening

**Technical Notes:**
- NMI comprehensive API integration
- Extend server/services/nmi.ts with all features
- Add fraud rules configuration interface
- Create multi-MID routing logic
- Add productCatalog table for inventory
- Implement webhook receiver endpoint

**Priority:** 🟡 MEDIUM

**Estimated Time:** 10-12 days

---

## 🟡 SB-4: Refund Processing Interface

**Template:** Swipes Blue Task  
**Title:** `[SB] Complete refund processing and management`  
**Labels:** `swipes-blue, enhancement, medium-priority, nmi`

**Description:**
Full refund processing system with partial refunds, reason tracking, and reporting.

**Acceptance Criteria:**
- [ ] Full and partial refunds
- [ ] Refund reason selection (required)
- [ ] Refund approval workflow (optional for large amounts)
- [ ] Customer notification on refund
- [ ] Refund reporting and analytics
- [ ] Chargeback prevention tools
- [ ] Refund history per customer
- [ ] Automated refund reconciliation

**Technical Notes:**
- NMI refund API integration
- Add refunds table to schema (transactionId, amount, reason, status, processedAt)
- Create client/src/pages/refund-manager.tsx
- Email notifications for refunds
- Reporting in revenue analytics

**Priority:** 🟡 MEDIUM

**Estimated Time:** 4-5 days

---

## 🟡 SB-5: Customer Payment Portal

**Template:** Swipes Blue Task  
**Title:** `[SB] Self-service customer payment portal`  
**Labels:** `swipes-blue, enhancement, medium-priority`

**Description:**
Portal where customers can view invoices, update payment methods, and manage subscriptions.

**Acceptance Criteria:**
- [ ] View all invoices and payment history
- [ ] Download invoices as PDF
- [ ] Update credit card information (tokenized)
- [ ] Manage subscription (upgrade, downgrade, cancel)
- [ ] View upcoming charges
- [ ] Payment method management (add/remove cards)
- [ ] Receipt downloads

**Technical Notes:**
- Create client/src/pages/customer-portal.tsx
- Secure access via unique token or login
- NMI customer vault for card updates
- PDF generation for invoices (jsPDF or similar)

**Priority:** 🟡 MEDIUM

**Estimated Time:** 6-7 days

---

## 🟢 SB-6: Abandoned Cart Recovery

**Template:** Swipes Blue Task  
**Title:** `[SB] Automated abandoned cart recovery system`  
**Labels:** `swipes-blue, enhancement, low-priority`

**Description:**
Automated emails to recover abandoned shopping carts.

**Acceptance Criteria:**
- [ ] Track cart abandonment (user adds items but doesn't complete checkout)
- [ ] Automated email sequence (1 hour, 24 hours, 3 days)
- [ ] Discount codes for cart recovery
- [ ] Cart recovery analytics
- [ ] Exclude completed purchases from recovery
- [ ] Unsubscribe option in emails

**Technical Notes:**
- Add abandonedCarts table to schema
- Background job to identify abandoned carts
- Email templates with cart contents
- Track recovery conversions
- Discount code generation

**Priority:** 🟢 LOW

**Estimated Time:** 5-6 days

---

# CROSS-PLATFORM (SHARED) ISSUES

---

## 🟠 SHARED-1: Unified Single Sign-On (SSO)

**Template:** Cross-Platform Task  
**Title:** `[SHARED] Implement unified SSO across all three platforms`  
**Labels:** `business-blueprint, hosts-blue, swipes-blue, enhancement, high-priority, shared`

**Description:**
Single sign-on system allowing users to access all three platforms with one login.

**Acceptance Criteria:**
- [ ] Shared authentication service (central auth server)
- [ ] JWT token works across all platforms (*.triadblue.com or separate domains)
- [ ] Session management (remember me, logout all devices)
- [ ] OAuth2 implementation for secure token exchange
- [ ] Account linking (merge existing accounts across platforms)
- [ ] Cross-domain cookie handling or token-based auth
- [ ] Login on one platform = logged in everywhere

**Technical Notes:**
- Create shared auth service (could be in Business Blueprint or separate)
- Extend existing JWT system (RS256)
- Subdomain cookie sharing if all on *.triadblue.com
- OR: Token-based auth with redirect flow if separate domains
- Update all three platform login flows
- Add linkedAccounts table to track cross-platform accounts

**Priority:** 🟠 HIGH

**Estimated Time:** 10-12 days

---

## 🟠 SHARED-2: Master Client Dashboard

**Template:** Cross-Platform Task  
**Title:** `[SHARED] Build unified master dashboard across platforms`  
**Labels:** `business-blueprint, hosts-blue, swipes-blue, enhancement, high-priority, shared`

**Description:**
Unified dashboard showing data from all three platforms in one view.

**Acceptance Criteria:**
- [ ] Single dashboard with all platform metrics:
  - [ ] Business Blueprint: Assessment scores, listings status, reviews count
  - [ ] Hosts Blue: Domains, hosting status, site uptime
  - [ ] Swipes Blue: Revenue, transaction count, payment status
- [ ] Quick navigation between platforms (unified nav bar)
- [ ] Aggregated notifications from all platforms
- [ ] Cross-platform search (find anything across all platforms)
- [ ] Unified activity timeline (all actions in one feed)
- [ ] Role-based views (what user has access to)

**Technical Notes:**
- Create client/src/pages/master-dashboard.tsx
- Aggregate data from all platform APIs (REST or GraphQL)
- Shared navigation component across all platforms
- Cross-platform notification system (WebSocket or polling)
- Implement in Business Blueprint initially, link to others

**Priority:** 🟠 HIGH

**Depends On:** SHARED-1 (SSO)

**Estimated Time:** 8-10 days

---

## 🟡 SHARED-3: Consolidated Billing System

**Template:** Cross-Platform Task  
**Title:** `[SHARED] Unified billing across all three platforms`  
**Labels:** `business-blueprint, hosts-blue, swipes-blue, enhancement, medium-priority, shared`

**Description:**
Single invoice covering all services from all three platforms, processed via Swipes Blue.

**Acceptance Criteria:**
- [ ] Combined monthly invoice for all platforms
- [ ] Itemized breakdown by platform and service
- [ ] Single payment for all services (via Swipes Blue)
- [ ] Proration handling for mid-cycle changes
- [ ] Billing history across all platforms
- [ ] Optional: separate invoices if user prefers
- [ ] Consolidated payment method management

**Technical Notes:**
- Extend server/services/pricing.ts in Business Blueprint
- Aggregate charges from all platforms
- Single transaction via Swipes Blue (NMI)
- Create client/src/pages/consolidated-billing.tsx
- Add crossPlatformInvoices table to schema
- API endpoints for each platform to report charges

**Priority:** 🟡 MEDIUM

**Depends On:** SHARED-1 (SSO), MVP-2 (NMI Checkout)

**Estimated Time:** 7-8 days

---

# SUMMARY

## Total Issues: 28

### By Phase
- **Phase 0 (MVP - CRITICAL):** 8 issues
- **Post-MVP:** 20 issues

### By Platform
- **Business Blueprint:** 10 issues
- **Hosts Blue:** 9 issues
- **Swipes Blue:** 6 issues
- **Cross-Platform:** 3 issues

### By Priority
- **🔴 CRITICAL (Phase 0 MVP):** 8 issues
- **🟠 HIGH:** 13 issues
- **🟡 MEDIUM:** 6 issues
- **🟢 LOW:** 1 issue

---

## IMPLEMENTATION ORDER (RECOMMENDED)

### Phase 0: MVP Launch (6-8 weeks)
1. **MVP-1:** Swipes Blue - Shopping Cart (3-4 days)
2. **MVP-2:** Swipes Blue - NMI Checkout (5-7 days)
3. **MVP-3:** Swipes Blue - Merchant Signup (3-4 days)
4. **MVP-7:** Swipes Blue - Basic Invoicing (2-3 days)
5. **MVP-4:** Hosts Blue - Domain Search & Registration (6-8 days)
6. **MVP-5:** Hosts Blue - Hosting Signup (6-8 days)
7. **MVP-8:** Cross-Platform Payment Integration (4-5 days)
8. **MVP-6:** Hosts Blue - Basic Customer Dashboard (3-4 days)

**Total MVP Time:** ~6-8 weeks

### Phase 1: Core Platform Enhancement (8-10 weeks)
1. **BB-1:** Admin Dashboard (5-6 days)
2. **BB-2:** My Domains Management (4-5 days)
3. **BB-3:** Synup Scan Integration (6-7 days)
4. **BB-4:** Synup Listings Automation (5-6 days)
5. **HB-1:** AI Website Builder (10-12 days)
6. **HB-2:** WPMUDev White-Label (8-10 days)
7. **HB-3:** OpenSRS Complete Integration (10-12 days)
8. **SB-1:** Recurring Billing (8-10 days)
9. **SB-2:** Revenue Reporting (7-8 days)

### Phase 2: Advanced Features (6-8 weeks)
1. **SHARED-1:** Unified SSO (10-12 days)
2. **SHARED-2:** Master Dashboard (8-10 days)
3. **BB-5:** AI Coach History (4-5 days)
4. **BB-6:** Review Automation (6-7 days)
5. **HB-4:** WordPress Management (8-10 days)
6. **HB-5:** Email Hosting (7-8 days)
7. **SB-3:** Advanced NMI Features (10-12 days)

### Phase 3: Polish & Enhancements (4-6 weeks)
1. **BB-7:** Campaign Tracking (7-8 days)
2. **BB-8:** SMS Marketing (8-10 days)
3. **BB-9:** Inbox Filtering (5-6 days)
4. **HB-6:** SSL Automation (6-7 days)
5. **HB-7:** Performance Monitoring (6-7 days)
6. **HB-8:** Backup System (7-8 days)
7. **SB-4:** Refund Processing (4-5 days)
8. **SB-5:** Customer Portal (6-7 days)
9. **SHARED-3:** Consolidated Billing (7-8 days)

### Phase 4: Nice-to-Have (2-4 weeks)
1. **BB-10:** Custom Dashboard Widgets (6-7 days)
2. **HB-9:** Migration Tools (8-10 days)
3. **SB-6:** Abandoned Cart Recovery (5-6 days)

---

## KEY ARCHITECTURAL NOTES

1. **Swipes Blue FIRST:** Must launch before Hosts Blue can process payments
2. **Standalone Apps:** Each platform can be marketed and sold independently
3. **Payment Flow:** All platforms use Swipes Blue (NMI) for payment processing
4. **SSO Later:** Platforms work independently first, SSO integrates them later
5. **Admin Interface:** Business Blueprint needs admin dashboard separate from client portal
6. **My Domains:** Central source of truth for all domain-related features across platforms

---

## NEXT STEPS

1. Visit: https://github.com/53947/The_Blue_Link/issues/new/choose
2. Create issues in this order: Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4
3. Use appropriate template for each platform
4. Link related issues using "Depends On" and "Related Features"
5. Set up Project Board with columns: Backlog, Phase 0 MVP, In Progress, Review, Done
6. Begin development with MVP-1 (Shopping Cart)

---

**Documentation Date:** October 18, 2025  
**Last Reviewed:** October 18, 2025  
**Next Review:** Weekly on Fridays
