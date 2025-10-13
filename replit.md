# businessblueprint.io - Digital Intelligence Platform

### Overview
businessblueprint.io is an AI-powered digital intelligence platform designed to help local businesses enhance their online presence, attract customers, and grow. It offers AI-driven analysis of online presence, generates personalized Digital Blueprints, and provides both Do It Yourself (DIY) and Managed Service Provider (MSP) pathways for business growth. The platform aims for mass market automation, leveraging Google Business Intelligence to minimize manual intervention and maximize results. It functions as a "Digital Intelligence Incubator," nurturing businesses from digital obscurity to digital maturity through systematic, data-driven growth programs.

**Brand Positioning:** Digital Intelligence Incubator
**Customer-Facing Message:** Helping Local Businesses Succeed Online
**Value Proposition:** Get Found, Get Customers, Get Business

### User Preferences
Preferred communication style: Simple, everyday language.

**Logo Design Process:**
- DO NOT change any logo elements unless specifically instructed
- Only modify exactly what is requested - no additional "improvements"
- Keep compass design consistent across iterations unless told otherwise
- businessblueprint.io logo concept: Compass + Pencil = "AI" using actual blueprint tools

**Business Context:**
- businessblueprint.io: Digital marketing platform - OFFICIAL BRAND (never mention Vendasta or cloudpleaser.io)
- webhosted.io: Website hosting platform (never mention WPMUDev)
- airswiped.com: Payment gateway platform (never mention NMI Network)
- Focus on mass market automation to minimize manual intervention
- Two primary pathways: DIY (self-service) and MSP (managed services)
- AI-powered Google Business Intelligence drives assessment recommendations

**Online Images (Email Signatures) - Trigger: "online images":**
- Email signature images: attached_assets/BB Signature for DLL_1759682563632.png
- Logo: attached_assets/BB Light Version Logo and Icon-synup_1759682563631.png
- **Action needed:** Upload to businessblueprint.io website at /assets/signature/
- Email HTML must use public URL: https://businessblueprint.io/assets/signature/[filename]
- Email clients require publicly hosted URLs (cannot access local/Replit files)

**Brand Identity:**
- Official Brand Assets: cloudpleaser logo, webhosted logo, airswiped logo, AI Coach logo, Digital Blueprint icon
- Digital IQ Assessment preserves Brain icon (per specific requirement)
- **Master Color Key**:
  - businessblueprint.io: black "business" + blueprint blue #0080FF + fluorescent green ".io"
  - webhosted.io: black "web" + webhosted purple #660099 + fluorescent green ".io"
  - airswiped.com: black "air" + airswiped red #CB0505 + fluorescent green ".com"
  - Common colors: Black #000000, White #FFFFFF
  - Fluorescent green TLD: #AAFF00 (used for all .io/.com extensions)
- Purple reserved for portal pages across all platforms
- Page-specific pleaser colors: Yellow (contact), Orange (about), Blue (pricing), avoiding platform colors
- Format: black-[signature-color]-fluorescent-green across all platforms
- Dark background adaptations: Brand logos use brightness-0 invert for white appearance on dark backgrounds

**Official 5-Step Journey Icons & Sizing Standards:**
- Digital Assessment: w-16 h-16 (64px) - standard size
- Digital Blueprint: w-16 h-16 (64px) - standard size
- Choose Your Path: w-16 h-16 (64px) - standard size
- AI Coach: w-[86px] h-[86px] (86px) - 10% smaller than base size
- Digital Success: w-[74px] h-[74px] (74px) - 15% bigger than base size
- These 5 standardized icons and names must never be varied across all platform uses

**Official Pathway Icons & Terminology:**
- **Do It Yourself (DIY):** Official icon from attached_assets/do it yourself icon_1759648904285.png
- **Managed Services Provided (MSP):** Official icon from attached_assets/managed services icon_1759648904285.png
- **AI Business Coach:** Official icon from attached_assets/ai business coach icon_1759648904283.png
- **Captaining Your Journey:** Official icon from attached_assets/Captaining Icon_1759648904285.png
- All icons displayed at 90% size coverage using flex containers with maxWidth/maxHeight
- Consistent terminology: Always use "Do It Yourself (DIY)" and "Managed Services Provided (MSP)" in all titles, headings, categories, groups, and menus
- Icons accompany pathway names wherever they appear (client/src/components/pathway-icons.tsx)

### System Architecture

The application utilizes a full-stack monorepo architecture.

**Frontend:**
- **Framework:** React 18 with TypeScript
- **Routing:** Wouter
- **Styling:** Tailwind CSS with Shadcn/ui
- **State Management:** TanStack Query
- **Forms:** React Hook Form with Zod validation
- **Build Tool:** Vite

**Backend:**
- **Runtime:** Node.js with Express.js
- **Language:** TypeScript with ES modules
- **Database:** PostgreSQL with Drizzle ORM on Neon (serverless)
- **Session Management:** Connect-pg-simple

**Core Architectural Decisions & Features:**
- **AI Coach:** Leverages OpenAI GPT-4o for personalized guidance.
- **Client Portal:** Comprehensive dashboard for business listings, review management, campaign tracking, and task management with mobile responsiveness.
- **Commverse Ecosystem:** A unified communication platform including `/send` (Email/SMS marketing), `/livechat`, and `/inbox` (multi-channel aggregator for email, live chat, SMS, WhatsApp, Facebook, Instagram, X, TikTok). Features real-time WebSocket messaging, conversation threading, and agent assignment.
- **À La Carte Marketplace:** A `/marketplace` page for purchasing individual apps and addons, featuring shopping cart functionality, localStorage persistence, and branded checkout via airswiped.com.
- **Pricing System:** A 6-tier structure (DIY: STARTER, GROWTH; MSP: EXPANSION Essential/Pro, LEADERSHIP Essential/Pro) with animated pricing tables (`/pricing`), pathway toggles, and billing cycle options. All pricing includes a 35% markup.
- **Landing Pages Design System:** Unified gray-on-white design with colored icons and consistent branding for all app landing pages.
- **Three Distinct Purchasing Flows:**
    1.  **General Subscription Page (`/subscription`):** Direct purchase.
    2.  **Assessment/Diagnosis-Driven Recommendations (`/assessment-checkout`):** Post-diagnosis recommendations.
    3.  **A La Carte Individual App Ordering (`/apps-marketplace`):** Individual app purchases with cart.
    Each flow has distinct UI layouts, plan presentations, and order summary behaviors.
- **Impersonation System:** Secure dual-token JWT based admin support access with immutable audit logging, user consent, and granular access control for troubleshooting across all platforms.
- **OpenSRS Domain Management (webhosted.io):** Comprehensive domain and DNS management (Registration, Transfers, DNS records, Nameservers, Security) for client websites.
- **Whitelabeling:** All platform components are branded as businessblueprint.io, removing vendor references.
- **Three-Platform Ecosystem:** businessblueprint.io (digital marketing), webhosted.io (website hosting), and airswiped.com (payment gateway) are distinct yet integrated platforms.
- **Unified Client Portal (Future):** Planned single sign-on, master dashboard, consolidated billing, cross-platform analytics, and unified support across all three platforms.
- **Synup Integration:** Complete listings and reputation management system with strict security:
  - Service Layer (`server/services/synup.ts`): Authenticated API client with centralized error handling
  - Database Schema (`shared/schema.ts`): synupLocations, synupListings, synupReviews tables with Zod validation
  - Storage Layer (`server/storage.ts`): Full CRUD operations with proper timestamp handling
  - API Routes (`server/routes.ts`): Secure endpoints with multi-layered protection:
    - JWT authentication (requireAuth middleware)
    - Cross-tenant prevention via getSynupLocationBySynupId()
    - Strict business name verification (enforced 400/403 errors)
    - Zod payload validation using insertSynup* schemas
    - Authorization checks on all listing/review operations
  - White-Label Security Model: Shared API key with strict business name matching to prevent cross-tenant abuse
  - Production Recommendations: Per-client API keys, admin pre-approval workflows, or enhanced address/contact verification
- **AI-Powered Reputation Management:** Automated review response system using OpenAI GPT-4o:
  - Service Layer (`server/services/reviewAI.ts`): GPT-4o integration with intelligent tone adaptation
  - Sentiment-Based Tone: Enthusiastic (4-5 stars), Empathetic (1-2 stars), Professional (3 stars)
  - Context-Aware Responses: Uses review text, business name, category, platform, and reviewer name
  - Fallback Templates: Manual response templates when AI generation fails
  - Bulk Processing: Batch generation support with rate limiting (5 reviews at a time)
  - Review Analytics Endpoints:
    - GET /api/synup/locations/:locationId/analytics: Comprehensive metrics (totals, averages, sentiment breakdown, platform distribution, response rates)
    - GET /api/synup/locations/:locationId/review-trends: Time-series trends with daily review counts and ratings (configurable period)
  - Integration: Seamlessly integrated with review response workflow, supporting both AI and manual responses
- **Automated Review Monitoring & Alerts:** Real-time notification system for new reviews:
  - Monitoring Service (`server/services/reviewMonitoring.ts`): Automatic alert dispatch on review creation
  - Multi-Channel Alerts:
    - Email: Professional HTML templates with sentiment-based urgency (⚠️ URGENT for negative reviews), color-coded ratings, and call-to-action buttons
    - WebSocket: Real-time browser notifications via Socket.IO to client-specific rooms
  - Configurable Preferences (GET/PUT /api/review-notifications/preferences):
    - Email/WebSocket alert toggles
    - Notification triggers: all reviews, negative only (rating ≤ threshold), positive only (rating ≥ 4)
    - Minimum rating threshold (default: 2)
    - Auto-respond toggles for future automation
  - Intelligent Alert Logic:
    - Auto-creates default preferences if none exist
    - Evaluates reviews against client-specific criteria
    - Preference-driven filtering (respects notification settings)
    - Async processing (non-blocking)
  - Alert Trigger: Automatically fires when new reviews are synced from Synup
  - WebSocket Integration: Proper initialization order ensures real-time alerts work on first request

### External Dependencies

-   **Google Places API:** Business data and presence analysis.
-   **OpenAI API:** AI-powered analysis, recommendations, and AI Coach.
-   **SMTP Credentials:** Sending automated emails (via Nodemailer).
-   **Neon PostgreSQL:** Serverless database solution.
-   **Drizzle ORM:** Type-safe database interactions.
-   **Shadcn/ui:** Component library.
-   **Tailwind CSS:** Utility-first CSS framework.
-   **Synup API:** Business listings and reputation management (200+ directories, AI-powered review responses, white-label).
-   **Telnyx:** SMS messaging for /send and Unified Inbox.
-   **NMI (Network Merchants Inc.):** Payment gateway integration for subscription billing.
-   **OpenSRS:** Domain registration, transfer, DNS management, and email automation for webhosted.io.
-   **Socket.IO:** Real-time WebSocket communication in the Unified Inbox.
-   **Facebook Graph API:** Messenger integration.
-   **Instagram Messenger Platform:** Instagram DM integration.
-   **WhatsApp Business Cloud API:** WhatsApp messaging integration.
-   **X/Twitter Account Activity API:** X (Twitter) DM integration.
-   **TikTok Business Messaging API:** TikTok message integration.