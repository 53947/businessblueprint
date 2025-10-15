#!/bin/bash

# GitHub API token from environment
TOKEN="$GITHUB_TOKEN"
REPO="53947/The_Blue_Link"

# Function to create GitHub issue
create_issue() {
  local title="$1"
  local body="$2"
  local labels="$3"
  
  curl -s -X POST \
    -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/repos/$REPO/issues" \
    -d "{\"title\":\"$title\",\"body\":$(echo "$body" | jq -Rs .),\"labels\":$(echo "$labels" | jq -Rc 'split(",")') }" | jq -r '.number // "error"'
}

echo "Creating GitHub Issues for Triad Blue Ecosystem..."
echo ""

# Issue 2: AI Coach Conversation History
create_issue "[BB] Add conversation history to AI Business Coach" "## Platform
Business Blueprint (businessblueprint.io)

## Description
Enable users to view past AI Coach conversations and continue previous discussions.

## Acceptance Criteria
- [ ] Store coach conversations in database with timestamps
- [ ] Display conversation history in sidebar/panel
- [ ] Allow users to resume previous conversations
- [ ] Search/filter past conversations by topic
- [ ] Export conversation as PDF/text

## Technical Notes
- Create new table: aiCoachConversations (clientId, timestamp, messages)
- Update client/src/components/ai-coach.tsx
- Use TanStack Query for conversation loading
- Integrate with existing OpenAI service (server/services/aiCoach.ts)

## Priority
High" "business-blueprint,enhancement,high-priority"

# Issue 3: Review Response Automation
create_issue "[BB] Implement automated review response workflows" "## Platform
Business Blueprint (businessblueprint.io)

## Description
Create automated workflows to respond to reviews based on user-defined rules.

## Acceptance Criteria
- [ ] Define response rules (auto-respond to 4-5 star reviews)
- [ ] Template library for common responses
- [ ] AI-generated personalized responses (using existing GPT-4o)
- [ ] Schedule responses (immediate vs delayed)
- [ ] Dashboard for reviewing/approving automated responses

## Technical Notes
- Extend server/services/reviewAI.ts for automation rules
- Add reviewResponseWorkflows table to schema
- Integrate with existing review monitoring system
- Use client preferences from review-notifications settings

## Priority
High" "business-blueprint,enhancement,high-priority"

# Issue 4: Campaign Tracking System
create_issue "[BB] Build comprehensive campaign tracking system" "## Platform
Business Blueprint (businessblueprint.io)

## Description
Track marketing campaigns across channels with performance metrics.

## Acceptance Criteria
- [ ] Create/manage campaigns (name, goals, channels, budget)
- [ ] Track campaign performance (impressions, clicks, conversions)
- [ ] Multi-channel support (email, SMS, social media)
- [ ] Visual analytics dashboard with charts
- [ ] Export campaign reports

## Technical Notes
- Create campaigns table in schema
- New page: client/src/pages/campaigns.tsx
- Integrate with /send dashboard for email/SMS campaigns
- Use Recharts for analytics visualization

## Priority
Medium" "business-blueprint,enhancement,medium-priority"

# Issue 5: SMS Marketing Campaigns
create_issue "[BB] Complete SMS marketing features in /send" "## Platform
Business Blueprint (businessblueprint.io)

## Description
Full SMS campaign functionality for Commverse /send app.

## Acceptance Criteria
- [ ] SMS contact management (import, segments)
- [ ] SMS template builder with personalization
- [ ] Schedule SMS broadcasts
- [ ] Track delivery status and responses
- [ ] Compliance features (opt-out, TCPA)

## Technical Notes
- Extend client/src/pages/send-dashboard.tsx
- Use existing Telnyx service (server/services/telnyx.ts)
- Add smsContacts and smsCampaigns tables
- Rate limiting for SMS sending

## Priority
High" "business-blueprint,commverse,enhancement,high-priority"

# Issue 6: Unified Inbox Advanced Filtering
create_issue "[BB] Add advanced filtering to Unified Inbox" "## Platform
Business Blueprint (businessblueprint.io)

## Description
Advanced filtering and search for the Unified Inbox (/inbox).

## Acceptance Criteria
- [ ] Filter by channel (email, SMS, WhatsApp, etc.)
- [ ] Filter by status (unread, starred, archived)
- [ ] Search messages by content/sender
- [ ] Date range filtering
- [ ] Save custom filter presets

## Technical Notes
- Update client/src/pages/inbox.tsx
- Add filter query params to API routes
- Implement full-text search on messages
- Store filter presets in user preferences

## Priority
Medium" "business-blueprint,commverse,enhancement,medium-priority"

# Issue 7: Hosting Dashboard
create_issue "[HB] Build website hosting management dashboard" "## Platform
Hosts Blue (hostsblue.com)

## Description
Core dashboard for managing website hosting services.

## Acceptance Criteria
- [ ] List all hosted websites for a client
- [ ] Display hosting plan details (storage, bandwidth, uptime)
- [ ] Site performance metrics (speed, visitors)
- [ ] Quick actions (restart, backup, restore)
- [ ] Alerts for resource limits

## Technical Notes
- Create new page: client/src/pages/hosting-dashboard.tsx
- New schema tables: websites, hostingPlans, resourceUsage
- Integrate with hosting provider API (TBD)
- Real-time resource monitoring

## Priority
High

## Related Features
#8 (Domain Management), #9 (WordPress Management)" "hosts-blue,enhancement,high-priority"

# Issue 8: OpenSRS Domain Registration
create_issue "[HB] Implement OpenSRS domain registration and management" "## Platform
Hosts Blue (hostsblue.com)

## Description
Complete domain registration, transfer, and DNS management using OpenSRS API.

## Acceptance Criteria
- [ ] Domain search and availability check
- [ ] Domain registration flow with payment
- [ ] Domain transfer process
- [ ] DNS record management (A, CNAME, MX, TXT)
- [ ] Nameserver configuration
- [ ] Domain renewal automation
- [ ] WHOIS privacy settings

## Technical Notes
- Create server/services/openSRS.ts for API integration
- Research OpenSRS white-label email automation
- Add domains table to schema
- Create client/src/pages/domain-management.tsx
- Integrate with airswiped.com for payment processing

## Priority
High

## Related Features
#11 (Email Service Setup)" "hosts-blue,enhancement,high-priority,openSRS"

# Issue 9: WordPress Management
create_issue "[HB] WordPress installation and management tools" "## Platform
Hosts Blue (hostsblue.com)

## Description
One-click WordPress installation and management system.

## Acceptance Criteria
- [ ] One-click WordPress installation
- [ ] WordPress version management (updates)
- [ ] Plugin management (install, update, activate)
- [ ] Theme management
- [ ] Database backup & restore
- [ ] Security scanning for vulnerabilities

## Technical Notes
- Integrate with hosting provider's WordPress API
- Create client/src/pages/wordpress-manager.tsx
- Add wordpressSites table to schema
- Automated security patch notifications

## Priority
High" "hosts-blue,enhancement,high-priority"

# Issue 10: SSL Certificate Automation
create_issue "[HB] Automated SSL certificate provisioning and renewal" "## Platform
Hosts Blue (hostsblue.com)

## Description
Automatic SSL certificate installation and renewal for all hosted sites.

## Acceptance Criteria
- [ ] Auto-provision SSL on new site creation
- [ ] Support for Let's Encrypt (free) and premium SSL
- [ ] Automatic renewal before expiration
- [ ] Mixed content detection and fixing
- [ ] SSL status dashboard with expiry alerts

## Technical Notes
- Let's Encrypt integration via ACME protocol
- Add sslCertificates table to schema
- Background job for renewal checks
- Email alerts 30 days before expiry

## Priority
Medium" "hosts-blue,enhancement,medium-priority"

# Issue 11: Email Service Setup
create_issue "[HB] Email hosting service setup and management" "## Platform
Hosts Blue (hostsblue.com)

## Description
Complete email hosting solution with inbox, spam filtering, and forwarding.

## Acceptance Criteria
- [ ] Email account creation (name@domain.com)
- [ ] Webmail access integration
- [ ] Spam filtering configuration
- [ ] Email forwarding rules
- [ ] Storage quota management
- [ ] Email client setup guides (IMAP/POP3)

## Technical Notes
- Research OpenSRS white-label email automation capabilities
- Create client/src/pages/email-management.tsx
- Add emailAccounts table to schema
- Integrate with email provider API

## Priority
High

## Related Features
#8 (Domain Management for MX records)" "hosts-blue,enhancement,high-priority"

# Issue 12: NMI Payment Checkout
create_issue "[SB] Implement NMI payment gateway checkout" "## Platform
Swipes Blue (swipesblue.com)

## Description
Complete payment checkout using NMI (Network Merchants Inc.) gateway.

## Acceptance Criteria
- [ ] Secure checkout page with NMI tokenization
- [ ] Support credit/debit cards
- [ ] 3D Secure authentication (SCA compliance)
- [ ] Real-time payment validation
- [ ] Receipt generation and email
- [ ] Refund processing interface

## Technical Notes
- Use VITE_NMI_TOKENIZATION_KEY secret (already available)
- Create server/services/nmi.ts for API integration
- Create client/src/pages/checkout.tsx
- Add transactions table to schema
- PCI compliance considerations

## Priority
High

## Related Features
#13 (Shopping Cart), #15 (Invoice Generation)" "swipes-blue,enhancement,high-priority,nmi"

# Issue 13: Shopping Cart System
create_issue "[SB] Build shopping cart functionality" "## Platform
Swipes Blue (swipesblue.com)

## Description
Full-featured shopping cart with add/remove items, quantity, and totals.

## Acceptance Criteria
- [ ] Add/remove items from cart
- [ ] Update quantities
- [ ] Calculate totals (subtotal, tax, shipping)
- [ ] Cart persistence (localStorage + database)
- [ ] Apply discount/promo codes
- [ ] Abandoned cart recovery

## Technical Notes
- Create client/src/components/shopping-cart.tsx
- Add cartItems table to schema (for logged-in users)
- LocalStorage for guest carts
- Integrate with existing marketplace cart logic

## Priority
High" "swipes-blue,enhancement,high-priority"

# Issue 14: Recurring Billing & Subscriptions
create_issue "[SB] Subscription billing and management system" "## Platform
Swipes Blue (swipesblue.com)

## Description
Manage recurring subscriptions with automated billing.

## Acceptance Criteria
- [ ] Create subscription plans (monthly, annual)
- [ ] Automated recurring charges via NMI
- [ ] Trial period support
- [ ] Subscription cancellation/pause
- [ ] Dunning management (failed payment retry)
- [ ] Subscription analytics dashboard

## Technical Notes
- Extend existing subscription system (client/src/pages/subscription.tsx)
- Create server/services/subscriptionBilling.ts
- Add subscriptionBilling table to schema
- Webhook handling for NMI recurring events

## Priority
High" "swipes-blue,enhancement,high-priority"

# Issue 15: Invoice Generation
create_issue "[SB] Automated invoice generation system" "## Platform
Swipes Blue (swipesblue.com)

## Description
Generate, send, and manage invoices for all transactions.

## Acceptance Criteria
- [ ] Auto-generate invoices on payment
- [ ] PDF invoice generation
- [ ] Email invoices to customers
- [ ] Invoice history and search
- [ ] Partial payment support
- [ ] Invoice templates (customizable branding)

## Technical Notes
- Create server/services/invoicing.ts
- Use PDF generation library (jsPDF or similar)
- Add invoices table to schema
- Create client/src/pages/invoices.tsx

## Priority
Medium" "swipes-blue,enhancement,medium-priority"

# Issue 16: Revenue Reporting & Analytics
create_issue "[SB] Revenue reporting and financial analytics" "## Platform
Swipes Blue (swipesblue.com)

## Description
Comprehensive financial reporting and revenue analytics.

## Acceptance Criteria
- [ ] Daily/weekly/monthly revenue reports
- [ ] Payment method breakdown
- [ ] Refund tracking
- [ ] Revenue trends visualization
- [ ] Export reports (CSV, PDF)
- [ ] Tax reporting summaries

## Technical Notes
- Create client/src/pages/revenue-analytics.tsx
- Use Recharts for visualizations
- Add revenueReports table to schema
- Scheduled report generation

## Priority
Medium" "swipes-blue,enhancement,medium-priority"

# Issue 17: Unified SSO
create_issue "[SHARED] Implement unified SSO across all three platforms" "## Platform
Cross-Platform (SHARED)

## Description
Single sign-on system allowing users to access all three platforms with one login.

## Acceptance Criteria
- [ ] Shared authentication service
- [ ] JWT token works across all platforms
- [ ] Session management (remember me, logout all devices)
- [ ] OAuth2 implementation
- [ ] Account linking (merge existing accounts)

## Technical Notes
- Create shared auth service (server/services/unifiedAuth.ts)
- Extend existing JWT system
- Subdomain cookie sharing (*.triadblue.com)
- Update all three platform login flows

## Priority
High" "business-blueprint,hosts-blue,swipes-blue,enhancement,high-priority,shared"

# Issue 18: Master Dashboard
create_issue "[SHARED] Build unified master dashboard across platforms" "## Platform
Cross-Platform (SHARED)

## Description
Unified dashboard showing data from all three platforms in one view.

## Acceptance Criteria
- [ ] Single dashboard with all platform metrics
- [ ] Quick navigation between platforms
- [ ] Aggregated notifications from all platforms
- [ ] Cross-platform search
- [ ] Unified activity timeline

## Technical Notes
- Create client/src/pages/master-dashboard.tsx
- Aggregate data from all platform APIs
- Shared navigation component
- Cross-platform notification system

## Priority
High" "business-blueprint,hosts-blue,swipes-blue,enhancement,high-priority,shared"

# Issue 19: Consolidated Billing
create_issue "[SHARED] Unified billing across all three platforms" "## Platform
Cross-Platform (SHARED)

## Description
Single invoice covering all services from all three platforms.

## Acceptance Criteria
- [ ] Combined monthly invoice for all platforms
- [ ] Itemized breakdown by platform
- [ ] Single payment for all services
- [ ] Proration handling for mid-cycle changes
- [ ] Billing history across all platforms

## Technical Notes
- Extend server/services/pricing.ts
- Aggregate charges from all platforms
- Single transaction via NMI
- Create client/src/pages/consolidated-billing.tsx

## Priority
Medium" "business-blueprint,hosts-blue,swipes-blue,enhancement,medium-priority,shared"

echo ""
echo "✅ GitHub Issues Created Successfully!"
