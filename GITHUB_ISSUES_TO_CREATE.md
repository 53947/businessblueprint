# GitHub Issues to Create - High Priority Tasks

> Visit: https://github.com/53947/The_Blue_Link/issues/new/choose  
> Copy/paste each issue below using the appropriate template

---

## Business Blueprint Issues

### Issue 1: Complete Synup Listings Automation
**Template:** Business Blueprint Task  
**Title:** `[BB] Complete Synup listings sync automation`  
**Labels:** `business-blueprint, enhancement, high-priority`

**Description:**
Automate the synchronization of business listings from Synup API across 200+ directories.

**Acceptance Criteria:**
- [ ] Automated daily sync of listings from Synup API
- [ ] Status tracking for each directory (active, pending, rejected)
- [ ] Error handling and retry logic for failed syncs
- [ ] Client dashboard displays real-time listing status
- [ ] Email notifications for listing approval/rejection

**Technical Notes:**
- Uses existing Synup SDK integration (@mx-inventor/synup)
- Leverage server/services/synup.ts and synupMappings.ts
- Store sync results in synupListings table
- Implement background job scheduler for daily sync

**Priority:** High

---

### Issue 2: AI Coach Conversation History
**Template:** Business Blueprint Task  
**Title:** `[BB] Add conversation history to AI Business Coach`  
**Labels:** `business-blueprint, enhancement, high-priority`

**Description:**
Enable users to view past AI Coach conversations and continue previous discussions.

**Acceptance Criteria:**
- [ ] Store coach conversations in database with timestamps
- [ ] Display conversation history in sidebar/panel
- [ ] Allow users to resume previous conversations
- [ ] Search/filter past conversations by topic
- [ ] Export conversation as PDF/text

**Technical Notes:**
- Create new table: aiCoachConversations (clientId, timestamp, messages)
- Update client/src/components/ai-coach.tsx
- Use TanStack Query for conversation loading
- Integrate with existing OpenAI service (server/services/aiCoach.ts)

**Priority:** High

---

### Issue 3: Review Response Automation Workflows
**Template:** Business Blueprint Task  
**Title:** `[BB] Implement automated review response workflows`  
**Labels:** `business-blueprint, enhancement, high-priority`

**Description:**
Create automated workflows to respond to reviews based on user-defined rules.

**Acceptance Criteria:**
- [ ] Define response rules (auto-respond to 4-5 star reviews)
- [ ] Template library for common responses
- [ ] AI-generated personalized responses (using existing GPT-4o)
- [ ] Schedule responses (immediate vs delayed)
- [ ] Dashboard for reviewing/approving automated responses

**Technical Notes:**
- Extend server/services/reviewAI.ts for automation rules
- Add reviewResponseWorkflows table to schema
- Integrate with existing review monitoring system
- Use client preferences from review-notifications settings

**Priority:** High

---

### Issue 4: Campaign Tracking System
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
- [ ] Export campaign reports

**Technical Notes:**
- Create campaigns table in schema
- New page: client/src/pages/campaigns.tsx
- Integrate with /send dashboard for email/SMS campaigns
- Use Recharts for analytics visualization

**Priority:** Medium

---

### Issue 5: SMS Marketing Campaigns (/send)
**Template:** Business Blueprint Task  
**Title:** `[BB] Complete SMS marketing features in /send`  
**Labels:** `business-blueprint, commverse, enhancement, high-priority`

**Description:**
Full SMS campaign functionality for Commverse /send app.

**Acceptance Criteria:**
- [ ] SMS contact management (import, segments)
- [ ] SMS template builder with personalization
- [ ] Schedule SMS broadcasts
- [ ] Track delivery status and responses
- [ ] Compliance features (opt-out, TCPA)

**Technical Notes:**
- Extend client/src/pages/send-dashboard.tsx
- Use existing Telnyx service (server/services/telnyx.ts)
- Add smsContacts and smsCampaigns tables
- Rate limiting for SMS sending

**Priority:** High

---

### Issue 6: Unified Inbox Advanced Filtering
**Template:** Business Blueprint Task  
**Title:** `[BB] Add advanced filtering to Unified Inbox`  
**Labels:** `business-blueprint, commverse, enhancement, medium-priority`

**Description:**
Advanced filtering and search for the Unified Inbox (/inbox).

**Acceptance Criteria:**
- [ ] Filter by channel (email, SMS, WhatsApp, etc.)
- [ ] Filter by status (unread, starred, archived)
- [ ] Search messages by content/sender
- [ ] Date range filtering
- [ ] Save custom filter presets

**Technical Notes:**
- Update client/src/pages/inbox.tsx
- Add filter query params to API routes
- Implement full-text search on messages
- Store filter presets in user preferences

**Priority:** Medium

---

## Hosts Blue Issues

### Issue 7: Website Hosting Management Dashboard
**Template:** Hosts Blue Task  
**Title:** `[HB] Build website hosting management dashboard`  
**Labels:** `hosts-blue, enhancement, high-priority`

**Description:**
Core dashboard for managing website hosting services.

**Acceptance Criteria:**
- [ ] List all hosted websites for a client
- [ ] Display hosting plan details (storage, bandwidth, uptime)
- [ ] Site performance metrics (speed, visitors)
- [ ] Quick actions (restart, backup, restore)
- [ ] Alerts for resource limits

**Technical Notes:**
- Create new page: client/src/pages/hosting-dashboard.tsx
- New schema tables: websites, hostingPlans, resourceUsage
- Integrate with hosting provider API (TBD)
- Real-time resource monitoring

**Priority:** High

**Related Features:** #8 (Domain Management), #9 (WordPress Management)

---

### Issue 8: OpenSRS Domain Registration Interface
**Template:** Hosts Blue Task  
**Title:** `[HB] Implement OpenSRS domain registration and management`  
**Labels:** `hosts-blue, enhancement, high-priority, openSRS`

**Description:**
Complete domain registration, transfer, and DNS management using OpenSRS API.

**Acceptance Criteria:**
- [ ] Domain search and availability check
- [ ] Domain registration flow with payment
- [ ] Domain transfer process
- [ ] DNS record management (A, CNAME, MX, TXT)
- [ ] Nameserver configuration
- [ ] Domain renewal automation
- [ ] WHOIS privacy settings

**Technical Notes:**
- Create server/services/openSRS.ts for API integration
- Research OpenSRS white-label email automation
- Add domains table to schema
- Create client/src/pages/domain-management.tsx
- Integrate with airswiped.com for payment processing

**Priority:** High

**Related Features:** #11 (Email Service Setup)

---

### Issue 9: WordPress Installation & Management
**Template:** Hosts Blue Task  
**Title:** `[HB] WordPress installation and management tools`  
**Labels:** `hosts-blue, enhancement, high-priority`

**Description:**
One-click WordPress installation and management system.

**Acceptance Criteria:**
- [ ] One-click WordPress installation
- [ ] WordPress version management (updates)
- [ ] Plugin management (install, update, activate)
- [ ] Theme management
- [ ] Database backup & restore
- [ ] Security scanning for vulnerabilities

**Technical Notes:**
- Integrate with hosting provider's WordPress API
- Create client/src/pages/wordpress-manager.tsx
- Add wordpressSites table to schema
- Automated security patch notifications

**Priority:** High

---

### Issue 10: SSL Certificate Automation
**Template:** Hosts Blue Task  
**Title:** `[HB] Automated SSL certificate provisioning and renewal`  
**Labels:** `hosts-blue, enhancement, medium-priority`

**Description:**
Automatic SSL certificate installation and renewal for all hosted sites.

**Acceptance Criteria:**
- [ ] Auto-provision SSL on new site creation
- [ ] Support for Let's Encrypt (free) and premium SSL
- [ ] Automatic renewal before expiration
- [ ] Mixed content detection and fixing
- [ ] SSL status dashboard with expiry alerts

**Technical Notes:**
- Let's Encrypt integration via ACME protocol
- Add sslCertificates table to schema
- Background job for renewal checks
- Email alerts 30 days before expiry

**Priority:** Medium

---

### Issue 11: Email Service Setup & Management
**Template:** Hosts Blue Task  
**Title:** `[HB] Email hosting service setup and management`  
**Labels:** `hosts-blue, enhancement, high-priority`

**Description:**
Complete email hosting solution with inbox, spam filtering, and forwarding.

**Acceptance Criteria:**
- [ ] Email account creation (name@domain.com)
- [ ] Webmail access integration
- [ ] Spam filtering configuration
- [ ] Email forwarding rules
- [ ] Storage quota management
- [ ] Email client setup guides (IMAP/POP3)

**Technical Notes:**
- Research OpenSRS white-label email automation capabilities
- Create client/src/pages/email-management.tsx
- Add emailAccounts table to schema
- Integrate with email provider API

**Priority:** High

**Related Features:** #8 (Domain Management for MX records)

---

## Swipes Blue Issues

### Issue 12: NMI Payment Checkout Implementation
**Template:** Swipes Blue Task  
**Title:** `[SB] Implement NMI payment gateway checkout`  
**Labels:** `swipes-blue, enhancement, high-priority, nmi`

**Description:**
Complete payment checkout using NMI (Network Merchants Inc.) gateway.

**Acceptance Criteria:**
- [ ] Secure checkout page with NMI tokenization
- [ ] Support credit/debit cards
- [ ] 3D Secure authentication (SCA compliance)
- [ ] Real-time payment validation
- [ ] Receipt generation and email
- [ ] Refund processing interface

**Technical Notes:**
- Use VITE_NMI_TOKENIZATION_KEY secret (already available)
- Create server/services/nmi.ts for API integration
- Create client/src/pages/checkout.tsx
- Add transactions table to schema
- PCI compliance considerations

**Priority:** High

**Related Features:** #13 (Shopping Cart), #15 (Invoice Generation)

---

### Issue 13: Shopping Cart System
**Template:** Swipes Blue Task  
**Title:** `[SB] Build shopping cart functionality`  
**Labels:** `swipes-blue, enhancement, high-priority`

**Description:**
Full-featured shopping cart with add/remove items, quantity, and totals.

**Acceptance Criteria:**
- [ ] Add/remove items from cart
- [ ] Update quantities
- [ ] Calculate totals (subtotal, tax, shipping)
- [ ] Cart persistence (localStorage + database)
- [ ] Apply discount/promo codes
- [ ] Abandoned cart recovery

**Technical Notes:**
- Create client/src/components/shopping-cart.tsx
- Add cartItems table to schema (for logged-in users)
- LocalStorage for guest carts
- Integrate with existing marketplace cart logic

**Priority:** High

---

### Issue 14: Recurring Billing & Subscription Management
**Template:** Swipes Blue Task  
**Title:** `[SB] Subscription billing and management system`  
**Labels:** `swipes-blue, enhancement, high-priority`

**Description:**
Manage recurring subscriptions with automated billing.

**Acceptance Criteria:**
- [ ] Create subscription plans (monthly, annual)
- [ ] Automated recurring charges via NMI
- [ ] Trial period support
- [ ] Subscription cancellation/pause
- [ ] Dunning management (failed payment retry)
- [ ] Subscription analytics dashboard

**Technical Notes:**
- Extend existing subscription system (client/src/pages/subscription.tsx)
- Create server/services/subscriptionBilling.ts
- Add subscriptionBilling table to schema
- Webhook handling for NMI recurring events

**Priority:** High

---

### Issue 15: Invoice Generation & Management
**Template:** Swipes Blue Task  
**Title:** `[SB] Automated invoice generation system`  
**Labels:** `swipes-blue, enhancement, medium-priority`

**Description:**
Generate, send, and manage invoices for all transactions.

**Acceptance Criteria:**
- [ ] Auto-generate invoices on payment
- [ ] PDF invoice generation
- [ ] Email invoices to customers
- [ ] Invoice history and search
- [ ] Partial payment support
- [ ] Invoice templates (customizable branding)

**Technical Notes:**
- Create server/services/invoicing.ts
- Use PDF generation library (jsPDF or similar)
- Add invoices table to schema
- Create client/src/pages/invoices.tsx

**Priority:** Medium

---

### Issue 16: Revenue Reporting & Analytics
**Template:** Swipes Blue Task  
**Title:** `[SB] Revenue reporting and financial analytics`  
**Labels:** `swipes-blue, enhancement, medium-priority`

**Description:**
Comprehensive financial reporting and revenue analytics.

**Acceptance Criteria:**
- [ ] Daily/weekly/monthly revenue reports
- [ ] Payment method breakdown
- [ ] Refund tracking
- [ ] Revenue trends visualization
- [ ] Export reports (CSV, PDF)
- [ ] Tax reporting summaries

**Technical Notes:**
- Create client/src/pages/revenue-analytics.tsx
- Use Recharts for visualizations
- Add revenueReports table to schema
- Scheduled report generation

**Priority:** Medium

---

## Cross-Platform (SHARED) Issues

### Issue 17: Unified Single Sign-On (SSO)
**Template:** Business Blueprint Task  
**Title:** `[SHARED] Implement unified SSO across all three platforms`  
**Labels:** `business-blueprint, hosts-blue, swipes-blue, enhancement, high-priority, shared`

**Description:**
Single sign-on system allowing users to access all three platforms with one login.

**Acceptance Criteria:**
- [ ] Shared authentication service
- [ ] JWT token works across all platforms
- [ ] Session management (remember me, logout all devices)
- [ ] OAuth2 implementation
- [ ] Account linking (merge existing accounts)

**Technical Notes:**
- Create shared auth service (server/services/unifiedAuth.ts)
- Extend existing JWT system
- Subdomain cookie sharing (*.triadblue.com)
- Update all three platform login flows

**Priority:** High

---

### Issue 18: Master Client Dashboard
**Template:** Business Blueprint Task  
**Title:** `[SHARED] Build unified master dashboard across platforms`  
**Labels:** `business-blueprint, hosts-blue, swipes-blue, enhancement, high-priority, shared`

**Description:**
Unified dashboard showing data from all three platforms in one view.

**Acceptance Criteria:**
- [ ] Single dashboard with all platform metrics
- [ ] Quick navigation between platforms
- [ ] Aggregated notifications from all platforms
- [ ] Cross-platform search
- [ ] Unified activity timeline

**Technical Notes:**
- Create client/src/pages/master-dashboard.tsx
- Aggregate data from all platform APIs
- Shared navigation component
- Cross-platform notification system

**Priority:** High

---

### Issue 19: Consolidated Billing System
**Template:** Swipes Blue Task  
**Title:** `[SHARED] Unified billing across all three platforms`  
**Labels:** `business-blueprint, hosts-blue, swipes-blue, enhancement, medium-priority, shared`

**Description:**
Single invoice covering all services from all three platforms.

**Acceptance Criteria:**
- [ ] Combined monthly invoice for all platforms
- [ ] Itemized breakdown by platform
- [ ] Single payment for all services
- [ ] Proration handling for mid-cycle changes
- [ ] Billing history across all platforms

**Technical Notes:**
- Extend server/services/pricing.ts
- Aggregate charges from all platforms
- Single transaction via NMI
- Create client/src/pages/consolidated-billing.tsx

**Priority:** Medium

---

## Summary

**Total Issues:** 19  
**Business Blueprint:** 6 issues  
**Hosts Blue:** 5 issues  
**Swipes Blue:** 5 issues  
**Cross-Platform:** 3 issues  

**Priority Breakdown:**
- **High Priority:** 14 issues
- **Medium Priority:** 5 issues

---

## Next Steps

1. Visit: https://github.com/53947/The_Blue_Link/issues/new/choose
2. Copy/paste each issue above using the appropriate template
3. After creating all issues, set up the Project Board
4. Link related issues together using the "Related Features" references

---

**Pro Tip:** You can create these faster by:
1. Opening multiple browser tabs
2. Using the templates (they auto-fill labels)
3. Just copy/paste the Title and Description sections
