# Triad Blue Ecosystem - Digital Business Solutions

## Overview
Triad Blue operates three **STANDALONE** platforms that can be marketed and sold independently:

1. **Business Blueprint (businessblueprint.io)** - AI-powered digital intelligence for local businesses
2. **Hosts Blue (hostsblue.com)** - Web hosting & domain services (WPMUDev + OpenSRS white-label)
3. **Swipes Blue (swipesblue.com)** - Payment gateway (NMI white-label, processes payments for ALL platforms)

The ecosystem focuses on helping local businesses in the US and Canada succeed online through AI-driven online presence analysis, personalized Digital Blueprints, and both DIY and Managed Service Provider (MSP) pathways. The core value proposition is "Get Found, Get Customers, Get Business," positioning Triad Blue as a Digital Intelligence Incubator.

**CRITICAL ARCHITECTURAL DECISION (Oct 18, 2025):** All three platforms are separate deployments. Swipes Blue is the payment backbone for the entire ecosystem.

## User Preferences
Preferred communication style: Simple, everyday language.

**Development Workflow - CRITICAL:**
- **DO NOT make changes to existing features without explicit user approval**
- When user points out something or asks a question, **DISCUSS FIRST** - do not automatically fix
- Only implement changes when user **explicitly requests** them (e.g., "fix this", "change that", "update this")
- Reliability and consistency are critical - the user needs to rely on the system as-is
- Changes only happen when discussed and approved by the user

**GitHub Documentation Schedule:**
- Update STATUS_REPORT.md and relevant documentation **twice daily** at 11:59 AM and 11:59 PM
- On days with no work, add entry: "No updates - [date]"
- Always document completed features, bug fixes, and configuration changes
- Keep GitHub issues synchronized with actual progress

**Logo Design Process:**
- DO NOT change any logo elements unless specifically instructed
- Only modify exactly what is requested - no additional "improvements"
- Keep compass design consistent across iterations unless told otherwise
- Business Blueprint logo concept: Compass + Pencil = "AI" using actual blueprint tools

**OFFICIAL BRAND LOGO KEY (BIBLE) - Oct 18, 2025:**
- **Source:** attached_assets/All Brand Logo Key_1760807746522.png
- **CRITICAL:** ALL branding uses FONTS (Archivo), NEVER images of text
- **Typography:** First word = Archivo Semi Expanded, subsequent words = Archivo
- **Text Shadow (ALL logos):** Color #00FF40, 325° angle, 15px distance, 5px blur opacity

**Business Blueprint Logo (businessblueprint.io):**
- "business" = #FFA500 (orange) - Archivo Semi Expanded
- "blueprint" = #0000FF (blue) - Archivo
- ".io" = #84D71A (green) - Archivo

**Swipes Blue Logo (swipesblue.com):**
- "swipes" = #FF0040 (red) - Archivo Semi Expanded
- "blue" = #0000FF (blue) - Archivo
- ".com" = #84D71A (green) - Archivo

**Hosts Blue Logo (hostsblue.com):**
- "hosts" = #660099 (purple) - Archivo Semi Expanded
- "blue" = #0000FF (blue) - Archivo
- ".com" = #84D71A (green) - Archivo

**Brand Identity & Official Color Palette:**
- **Core Black:** #09080E
- **Triad Blue:** #0000FF and #0057FF
- **Business Blueprint:** #FFA500 (orange)
- **Hosts Blue:** #660099 (purple)
- **Swipes Blue:** #FF0040 (red)
- **TLD Green (3rd rank accent):** #84D71A
- **App Colors:** /send: #E6B747, /inbox: #0080FF and #FF96DD, /livechat: #8000FF
- **UI Element Colors:** Button Primary: #0057FF, Button Secondary: #F79248, Header: #0000FF, #F79248, #09080E, Content/Font: #09080E and #5B5B5B
- **Pathway Colors:** AI Business Coach: #09080E and #FF0040, DIY: #0057FF, MSP: #F79248
- Dark background adaptations: Brand logos use brightness-0 invert for white appearance on dark backgrounds

**Official 5-Step Journey Icons & Sizing Standards:**
- Digital Assessment: w-16 h-16 (64px)
- Digital Blueprint: w-16 h-16 (64px)
- Choose Your Path: w-16 h-16 (64px)
- AI Coach: w-[86px] h-[86px] (86px)
- Digital Success: w-[74px] h-[74px] (74px)
- These 5 standardized icons and names must never be varied across all platform uses

**Official Pathway Icons & Terminology:**
- **Do It Yourself (DIY)**
- **Managed Services Provided (MSP)**
- **AI Business Coach**
- **Captaining Your Journey**
- All icons displayed at 90% size coverage using flex containers with maxWidth/maxHeight
- Consistent terminology: Always use "Do It Yourself (DIY)" and "Managed Services Provided (MSP)" in all titles, headings, categories, groups, and menus

**Official Client Portal Sidebar Menu Order (NEVER CHANGE WITHOUT AUTHORIZATION):**
1. Overview (LayoutDashboard icon)
2. [Double Space - hasSpaceBefore: true]
3. /inbox (inbox icon from attached_assets/inbox icon_1760788273855.png)
4. /livechat (livechat icon from attached_assets/livechat icon_1760788412068.png)
5. Tasks (CheckSquare icon)
6. -----[Divider with Double Space]-----
7. Local SEO Mgmt (Local SEO icon from attached_assets/LOCAL SEO_1760785581174.png)
8. /send (send icon from attached_assets/send1_1760785706637.png)
9. Social Media Mgmt (Social Media icon from attached_assets/Social Media Mgmt_1760786453964.png)
10. Reputation Mgmt (Reputation icon from attached_assets/Reputation Management Icon_1760786977607.png)
11. -----[Divider with Double Space]-----
12. Settings (settings icon from attached_assets/settings_1760788009769.png)

**CRITICAL:** This menu order and icon set were finalized on Oct 18, 2025. DO NOT modify without explicit user authorization. Both desktop and mobile navigation must use the same navItems array in client/src/components/side-nav.tsx.

## System Architecture

The application uses a full-stack monorepo architecture with React 18, TypeScript, Wouter, Tailwind CSS, Shadcn/ui, TanStack Query, React Hook Form, and Zod on the frontend. The backend is built with Node.js, Express.js, TypeScript, PostgreSQL with Drizzle ORM on Neon, and Connect-pg-simple for session management.

**Core Architectural Decisions & Features:**
- **AI Coach:** Leverages OpenAI GPT-4o for personalized guidance.
- **Client Portal:** Comprehensive dashboard for managing business listings, reviews, campaigns, and tasks, with mobile responsiveness.
- **Commverse Ecosystem:** Unified communication platform including `/send` (Email/SMS), `/livechat`, and `/inbox` (multi-channel aggregator with real-time WebSocket messaging).
- **À La Carte Marketplace:** A `/marketplace` for purchasing individual apps and addons with shopping cart functionality and branded checkout.
- **Pricing System:** A 6-tier structure with animated pricing tables, pathway toggles, and billing cycle options, including a 35% markup.
- **Landing Pages Design System:** Unified gray-on-white design with colored icons and consistent branding.
- **Three Distinct Purchasing Flows:** General subscription, assessment-driven recommendations, and individual app ordering.
- **Impersonation System:** Secure, dual-token JWT based admin support access with audit logging and granular control.
- **OpenSRS Domain Management:** Comprehensive domain and DNS management.
- **Whitelabeling:** All platform components are branded as businessblueprint.io.
- **Three-Platform Ecosystem:** businessblueprint.io, webhosted.io, and airswiped.com are distinct yet integrated.
- **Multi-Platform Navigation Architecture:** Client Portal as the central hub, sidebar navigation, and seamless cross-app navigation maintaining login state.
- **Synup Integration (API v4):** Complete listings and reputation management system with a service layer, database schema, storage layer, and secure API routes. Features a white-label security model and verified endpoints for location, listings, reviews, and analytics.
- **AI-Powered Reputation Management:** Automated review response system using OpenAI GPT-4o with sentiment-based tone adaptation and context-aware responses, supporting bulk processing.
- **Automated Review Monitoring & Alerts:** Real-time notification system for new reviews via multi-channel alerts (Email, WebSocket) with configurable preferences and intelligent alert logic.
- **Brand Studio:** Admin-only asset management system with database persistence. Uploads stored as base64 in PostgreSQL (brand_assets table), converted to blob URLs for display with comprehensive memory leak prevention. Features upload, delete, preview, and categorization (logos, icons, additional assets) with proper cleanup on component unmount and remote deletions.

## External Dependencies

-   **Google Places API:** Business data and presence analysis.
-   **OpenAI API:** AI-powered analysis, recommendations, and AI Coach.
-   **SMTP Credentials:** Sending automated emails.
-   **Neon PostgreSQL:** Serverless database solution.
-   **Drizzle ORM:** Type-safe database interactions.
-   **Shadcn/ui:** Component library.
-   **Tailwind CSS:** Utility-first CSS framework.
-   **Synup API:** Business listings and reputation management.
-   **Telnyx:** SMS messaging.
-   **NMI (Network Merchants Inc.):** Payment gateway integration.
-   **OpenSRS:** Domain registration, transfer, DNS management, and email automation.
-   **Socket.IO:** Real-time WebSocket communication.
-   **Facebook Graph API:** Messenger integration.
-   **Instagram Messenger Platform:** Instagram DM integration.
-   **WhatsApp Business Cloud API:** WhatsApp messaging integration.
-   **X/Twitter Account Activity API:** X (Twitter) DM integration.
-   **TikTok Business Messaging API:** TikTok message integration.
-   **WPMUDev:** White-label WordPress hosting and management (Hosts Blue).
-   **OpenSRS:** Domain registration, transfer, DNS, and email automation (Hosts Blue).

## GitHub Documentation - Source of Truth

**IMPORTANT:** For complete roadmap, issue tracking, and development status, always refer to GitHub documentation:

### Primary Documentation Files
1. **GITHUB_ISSUES_TO_CREATE.md** - Complete issue specifications for all 28 features
   - Phase 0 MVP (8 issues): Hosts Blue + Swipes Blue quick launch
   - Business Blueprint (10 issues): Admin Dashboard, My Domains, Synup Scan, AI Coach, etc.
   - Hosts Blue (9 issues): AI Website Builder, WPMUDev/OpenSRS integration, WordPress management
   - Swipes Blue (6 issues): Shopping cart, NMI integration, recurring billing, analytics
   - Cross-Platform (3 issues): SSO, Master Dashboard, Consolidated Billing

2. **STATUS_REPORT.md** - Updated twice daily (11:59 AM & 11:59 PM)
   - Recent updates and completed work
   - Platform-by-platform progress
   - Development metrics (28 issues, priorities, timelines)
   - Next steps and focus recommendations

3. **ROADMAP.md** - Strategic development plan
   - Phase 0: MVP Launch (6-8 weeks) - Current focus
   - Phase 1: Core Platform Enhancement (8-10 weeks)
   - Phase 2: Advanced Features & Integration (6-8 weeks)
   - Phase 3: Polish & Enhancements (4-6 weeks)
   - Timeline: 24-32 weeks for complete ecosystem

4. **ARCHITECTURE.md** - Technical architecture documentation (coming soon)
   - Three-platform ecosystem design
   - SSO integration strategy
   - Admin vs Client interface architecture
   - Deployment strategy for standalone apps

### GitHub Repository
- **URL:** https://github.com/53947/The_Blue_Link
- **Issues:** https://github.com/53947/The_Blue_Link/issues
- **Project Board:** Visual Kanban tracking

### Architecture Decisions (Oct 18, 2025)

1. **Three Standalone Apps**
   - Business Blueprint: Already ~65% complete, production ready
   - Hosts Blue: Build from scratch (Phase 0 MVP)
   - Swipes Blue: Build from scratch (Phase 0 MVP)

2. **Swipes Blue as Payment Processor**
   - ALL platforms use Swipes Blue (NMI) for payments
   - Hosts Blue → Swipes Blue checkout flow
   - Business Blueprint → Swipes Blue (future integration)

3. **Admin vs Client Interface**
   - Role-based routing (not separate accounts)
   - Admin sees Admin Dashboard with all clients
   - Clients see Client Portal with their data only
   - Impersonation system for admin support

4. **My Domains Management**
   - Central source of truth for all client domains
   - Feeds Synup locations, Google Business, Hosts Blue services
   - Located in Client Portal → Settings → My Domains

5. **White-Label Integrations Research Completed**
   - NMI: Full capabilities documented (fraud detection, webhooks, multi-MID, batch, Apple/Google Pay)
   - WPMUDev: Complete features (Hub Client, Branda Pro, CI/CD, New Relic, hosting API)
   - OpenSRS: Domain + email automation (SSL, transfers, monitoring, email hosting)

6. **Synup Subdomains**
   - `scan.businessblueprint.io` - Lead capture tool (CNAME → scan.synup.com)
   - `dashboard.businessblueprint.io` - Partner dashboard (not using, have our own)
   - `*.dashboard.businessblueprint.io` - White-label client dashboards (not needed yet)

### When to Check GitHub
- **Before starting work:** Check ROADMAP.md for current phase and priorities
- **For issue details:** See GITHUB_ISSUES_TO_CREATE.md for complete specifications
- **For progress updates:** Check STATUS_REPORT.md (updated twice daily)
- **For architecture questions:** See ARCHITECTURE.md and this replit.md

### Development Workflow
- Update STATUS_REPORT.md twice daily at 11:59 AM and 11:59 PM
- On inactive days, add entry: "No updates - [date]"
- Always document completed features, bug fixes, and configuration changes
- Keep GitHub issues synchronized with actual progress

**Note:** This replit.md provides system architecture and technical details. GitHub documentation provides roadmap, issues, and status tracking.