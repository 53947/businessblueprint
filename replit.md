# Triad Blue Ecosystem - Digital Business Solutions

## Overview
Triad Blue offers three independent digital platforms: Business Blueprint (AI digital intelligence), Hosts Blue (web hosting & domains), and Swipes Blue (payment gateway). The ecosystem's purpose is to empower local businesses in the US and Canada with AI-driven online presence analysis, personalized Digital Blueprints, and both DIY and Managed Service Provider (MSP) pathways. Triad Blue aims to be a Digital Intelligence Incubator, helping businesses "Get Found, Get Customers, Get Business." Swipes Blue serves as the central payment processor for all platforms.

**📘 CROSS-PLATFORM STANDARDS:** See `TRIAD_BLUE_STANDARDS.md` for comprehensive development standards that MUST be followed across all three platforms (navigation, typography, colors, technical architecture, features to copy vs rebuild).

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

**OFFICIAL BRAND LOGO KEY:**
- ALL branding uses FONTS (Archivo), NEVER images of text
- **Typography:** First word = Archivo Semi Expanded, subsequent words = Archivo (BOTH MUST BE SAME FONT SIZE)
- **Text Shadow:** 5pt blur, 315° angle, 5-10pt distance (applies to ALL wordmark text)

**CRITICAL:** The client portal sidebar menu order and icon set were finalized. DO NOT modify without explicit user authorization. Both desktop and mobile navigation must use the same navItems array in `client/src/components/side-nav.tsx`.

## Critical Production Issues & Lessons Learned

**IMPORTANT FOR ALL ASSISTANTS:**
- **DO NOT assume agent-built features are buggy or need refactoring without investigating first**
- **DO NOT rename routes, move files, or restructure code without explicit user approval**
- **ALWAYS investigate root causes thoroughly before making changes**

**Development Environment Issue - October 26, 2025 (RESOLVED):**
- **Symptom:** Application crashes on startup with "Cannot find package 'vite'" error. Development server (`npm run dev`) fails to start. LSP shows errors for missing packages.
- **Root Cause:** NODE_ENV was set as a SECRET in the Replit Secrets pane with value "production". When NODE_ENV=production, npm automatically skips installing all devDependencies (including vite, typescript, @vitejs/plugin-react, etc.) during `npm install`. This is standard npm behavior to reduce production bundle sizes.
- **Solution:** Delete the NODE_ENV secret from the Secrets pane. The application's package.json scripts already handle NODE_ENV correctly:
  - `"dev": "NODE_ENV=development tsx server/index.ts"` ✅
  - `"start": "NODE_ENV=production node dist/index.js"` ✅
  - The .replit deployment config also sets it: `run = ["sh", "-c", "NODE_ENV=production node dist/index.js"]`
- **Important:** NODE_ENV should NEVER be added to Secrets. Let the package.json scripts handle it. Confirmed working on swipesblue.com which has no NODE_ENV secret.
- **Files Affected:** None - this was purely an environment configuration issue, not a code issue.
- **Verification:** After deleting the secret, run `npm install` via packager_tool to install all packages including devDependencies, then restart the "Start application" workflow.

**Production Deployment Issue - October 24, 2025 (RESOLVED):**
- **Symptom:** Blank white screen on businessblueprint.io despite working dev environment
- **Root Cause:** A `/assets/:filename` route was added to serve brand assets from database (favicon, logo). This route intercepted Vite's JavaScript/CSS bundle requests (`/assets/index-*.js`, `/assets/index-*.css`) in production, causing 404 errors and blank screen. In development, Vite middleware served bundles before this route ran, hiding the bug.
- **Solution:** Renamed route from `/assets/:filename` to `/brand-assets/:filename` in `server/routes.ts`. Updated `client/index.html` and `client/src/pages/brand-studio.tsx` to use `/brand-assets/` for favicons/logos. This allows Vite bundles to load from `/assets/` via static file serving.
- **Files Modified:** `server/routes.ts` (line 2602), `client/index.html` (lines 6-8), `client/src/pages/brand-studio.tsx` (display text)
- **Additional Fixes:** Removed `dist` from `.gitignore` to ensure build artifacts are included in deployments.

**Route Hierarchy for Production:**
1. `/brand-assets/:filename` - Database-stored brand assets (favicons, logos, icons)
2. `/attached_assets/*` - Static files from `attached_assets` directory
3. `/assets/*` - Vite build artifacts (JS, CSS bundles) served from `dist/public/assets/`
4. All other routes - SPA fallback serving `index.html`

## Replit Platform Configuration

**Viewing Custom Domains:**
- Custom domains (like businessblueprint.io) are managed in the **Deployments tab**, NOT in a general account domains section
- To view/manage domains: Navigate to Deployments tab → Settings tab → Domain management
- If domains were purchased through Replit: They appear in the Domains tab within the Publishing section
- DNS configuration: Add A and TXT records at your domain registrar, allow up to 48 hours for propagation
- Common issues: Multiple A records, A+AAAA records together, or Cloudflare proxied records can interfere with SSL certificate renewals

## System Architecture

The application uses a full-stack monorepo architecture. The frontend is built with React 18, TypeScript, Wouter, Tailwind CSS, Shadcn/ui, TanStack Query, React Hook Form, and Zod. The backend utilizes Node.js, Express.js, TypeScript, PostgreSQL with Drizzle ORM on Neon, and Connect-pg-simple for session management.

**UI/UX Design & Branding:**
- **Typography:** Archivo font family with specific styling for logo text (Semi Expanded for first word, regular for subsequent words). No text shadows.
- **Logo Sizing Standards:** Defined pixel values for horizontal, vertical, and sidebar logos, and navigation icons to ensure consistency (e.g., 36px icon + 24px text for default horizontal logo).
- **Brand Identity:** Specific color palette for core elements, each platform, TLD accent, and app-specific features (e.g., Triad Blue: #0000FF, Business Blueprint: #FFA500).
- **Standardized Icons & Terminology:** Official 5-Step Journey icons with fixed sizes and consistent pathway icons and terminology (DIY, MSP, AI Business Coach).
- **Client Portal Sidebar:** Fixed menu order, specific icons, and structure.
- **Landing Pages:** Unified gray-on-white design with colored icons.

**Technical Implementations & Feature Specifications:**
- **AI Coach:** Leverages OpenAI GPT-4o for personalized guidance.
- **Client Portal:** Centralized dashboard for managing business aspects, mobile-responsive.
- **Commverse Ecosystem:** Unified communication platform (`/send` for Email/SMS, `/livechat`, and `/inbox` for multi-channel aggregation with WebSockets).
- **À La Carte Marketplace:** For purchasing individual apps with shopping cart and branded checkout.
- **Pricing System:** 6-tier structure with animated tables, pathway toggles, and billing options (includes 35% markup).
- **Purchasing Flows:** Three distinct flows: general subscription, assessment-driven recommendations, and individual app ordering.
- **Impersonation System:** Secure, dual-token JWT based admin support access with audit logging.
- **Whitelabeling:** All platform components are branded under businessblueprint.io.
- **Multi-Platform Ecosystem:** Business Blueprint, Hosts Blue, and Swipes Blue are distinct but integrated with shared login states and cross-app navigation.
- **Synup Integration:** Comprehensive listings and reputation management with a white-label security model and verified API endpoints.
- **AI-Powered Reputation Management:** GPT-4o for automated review responses, sentiment analysis, and bulk processing.
- **Automated Review Monitoring:** Real-time multi-channel alerts for new reviews.
- **Brand Studio:** Admin-only asset management, storing uploads as base64 in PostgreSQL, converted to blob URLs for display, with memory leak prevention.

**System Design Choices:**
- **Three Standalone Apps:** Business Blueprint, Hosts Blue, and Swipes Blue are separate deployments.
- **Swipes Blue as Payment Processor:** Centralized payment processing for the entire ecosystem.
- **Admin vs. Client Interface:** Role-based routing with an impersonation system for admin support.
- **My Domains Management:** Central source of truth for client domains, feeding other services.

## External Dependencies

-   **Google Places API:** Business data.
-   **OpenAI API:** AI services.
-   **SMTP Credentials:** Email sending.
-   **Neon PostgreSQL:** Serverless database.
-   **Drizzle ORM:** Database interactions.
-   **Shadcn/ui:** Component library.
-   **Tailwind CSS:** CSS framework.
-   **Synup API:** Business listings and reputation management.
-   **Telnyx:** SMS messaging.
-   **NMI (Network Merchants Inc.):** Payment gateway.
-   **OpenSRS:** Domain registration, DNS, and email automation.
-   **Socket.IO:** Real-time communication.
-   **Facebook Graph API:** Messenger integration.
-   **Instagram Messenger Platform:** Instagram DM integration.
-   **WhatsApp Business Cloud API:** WhatsApp messaging.
-   **X/Twitter Account Activity API:** X (Twitter) DM integration.
-   **TikTok Business Messaging API:** TikTok messaging.
-   **WPMUDev:** WordPress hosting and management (Hosts Blue).