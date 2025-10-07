# businessblueprint.io - Digital Intelligence Platform

## Overview

businessblueprint.io is an AI-powered digital intelligence platform designed to help local businesses enhance their online presence, attract customers, and grow. It offers AI-driven analysis of online presence, generates personalized Digital Blueprints, and provides both Do It Yourself (DIY) and Managed Service Provider (MSP) pathways for business growth. The platform aims for mass market automation, leveraging Google Business Intelligence to minimize manual intervention and maximize results.

**Recent Updates (October 7, 2025):**
- ✅ Fixed subscription page order summary bug: JSON parsing issue resolved, pricing now displays correctly
- ✅ Fixed useEffect infinite loop: Plan auto-selection no longer re-triggers on every render
- ✅ Subscription page testing: MSP/DIY switching, addon selection, pricing calculation all working
- ✅ Database schema: Added icon column to subscription_addons with appropriate icon names
- ✅ Mega menu enhanced with dark mode support, gradient hover effects, and comprehensive test coverage
- ✅ Updated to official icons: AI Business Coach (compass+pencil cap/whistle), /send (email/arrow)
- ✅ Fixed pricing page: Dynamic calculations by billing cycle, "Digital Blueprint" branding
- ✅ Homepage ecosystem cards: Overflow prevention, responsive sizing
- ✅ Navigation improvements: Platform logos visible with names in Apps mega menu
- ✅ **Flow 3b Assessment Checkout (COMPLETED):** Product-based pricing with proper billing cycle calculations, pathway support (DIY/MSP/Combination), correct discount application

**Brand Positioning:** Digital Intelligence Incubator - nurturing businesses from digital obscurity to digital maturity through systematic, data-driven growth programs.
**Customer-Facing Message:** Helping Local Businesses Succeed Online
**Value Proposition:** Get Found, Get Customers, Get Business

## User Preferences

Preferred communication style: Simple, everyday language.

**Logo Design Process:**
- DO NOT change any logo elements unless specifically instructed
- Only modify exactly what is requested - no additional "improvements"
- Keep compass design consistent across iterations unless told otherwise
- businessblueprint.io logo concept: Compass + Pencil = "AI" using actual blueprint tools

Business Context:
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

Brand Identity:
- Official Brand Assets: cloudpleaser logo, webhosted logo, airswiped logo, AI Coach logo, Digital Blueprint icon
- Digital IQ Assessment preserves Brain icon (per specific requirement)
- **Master Color Key** (from attached_assets/Master Color Key for Logos and Icons_1759184165353.png):
  - businessblueprint.io: black "business" + blueprint blue #0080FF + fluorescent green ".io"
  - webhosted.io: black "web" + webhosted purple #660099 + fluorescent green ".io"
  - airswiped.com: black "air" + airswiped red #CB0505 + fluorescent green ".com"
  - Common colors: Black #000000, White #FFFFFF
  - Fluorescent green TLD: #AAFF00 (used for all .io/.com extensions)
- Purple reserved for portal pages across all platforms
- Page-specific pleaser colors: Yellow (contact), Orange (about), Blue (pricing), avoiding platform colors
- Format: black-[signature-color]-fluorescent-green across all platforms
- Dark background adaptations: Brand logos use brightness-0 invert for white appearance on dark backgrounds
- **DEPRECATED:** Pink #FC8EA0 (replaced by webhosted purple #660099)

**Official 5-Step Journey Icons & Sizing Standards:**
- Digital Assessment: w-16 h-16 (64px) - standard size
- Digital Blueprint: w-16 h-16 (64px) - standard size
- Choose Your Path: w-16 h-16 (64px) - standard size
- AI Coach: w-[86px] h-[86px] (86px) - 10% smaller than base size
- Digital Success: w-[74px] h-[74px] (74px) - 15% bigger than base size
- These 5 standardized icons and names must never be varied across all platform uses

**Official Pathway Icons & Terminology (Updated October 5, 2025):**
- **Do It Yourself (DIY):** Official icon from attached_assets/do it yourself icon_1759648904285.png
- **Managed Services Provided (MSP):** Official icon from attached_assets/managed services icon_1759648904285.png
- **AI Business Coach:** Official icon from attached_assets/ai business coach icon_1759648904283.png
- **Captaining Your Journey:** Official icon from attached_assets/Captaining Icon_1759648904285.png
- All icons displayed at 90% size coverage using flex containers with maxWidth/maxHeight
- Consistent terminology: Always use "Do It Yourself (DIY)" and "Managed Services Provided (MSP)" in all titles, headings, categories, groups, and menus
- Icons accompany pathway names wherever they appear (client/src/components/pathway-icons.tsx)

## System Architecture

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
- **Email Service:** Nodemailer

**Core Features & Components:**
- **AI Coach:** Leverages OpenAI GPT-4o for personalized guidance, offering tiered pricing.
- **Client Portal:** A comprehensive portal providing dashboard overview, business listings, review management, campaign tracking, and task management, integrated with Vendasta and mobile-responsive.
- **Vendasta Integration:** API integration for customer synchronization, dashboard data retrieval, and authentication.
- **Data Flow:** Involves assessment creation, background processing of Google Business data and AI analysis, automated report delivery, and pathway selection.
- **UI/UX Decisions:** Emphasizes consistent branding, custom color schemes, multi-tab interfaces, visual progress indicators, and priority-based action items.
- **/send Platform:** A robust Email + SMS marketing platform with unified campaigns, GDPR/CAN-SPAM/TCPA compliance, contact management, and a production-ready RESTful API with JWT authentication and client ownership validation.
- **Subscription & Billing:** Simplified DIY ($99/mo) and MSP ($299/mo) pricing, with AI Business Coach and Captain Your Journey addons. Automated purchase flows and NMI payment integration.

## Three Distinct Purchasing Flows

The platform features **THREE separate purchasing scenarios**, each with different UI presentation and user journey:

### Flow 3a: General Subscription Page (CURRENT - WORKING ✓)
**Route:** `/subscription`
**Purpose:** Direct subscription purchase with pathway selection
**UI Layout:** Plan-focused presentation
- **MSP/DIY pathway buttons** prominently displayed at top
- Plans shown as primary focus with detailed feature lists
- Order summary updates dynamically based on selections
- Addon options displayed with checkboxes
- **Current Status:** Fully functional - MSP/DIY switching, addon selection, pricing calculation all working

### Flow 3b: Assessment/Diagnosis-Driven Recommendations (COMPLETED ✓)
**Route:** `/assessment-checkout`
**Purpose:** Post-diagnosis recommendations leading to purchase
**UI Layout:** Diagnosis-driven with pathway preference integration
- System completes Digital IQ Assessment first
- AI recommends specific apps based on diagnosis results
- **Pathway preference question:** "Do you prefer DIY, MSP, or a Combination?"
- Order summary calculates bundle with recommended apps + pathway preference
- Plans from 3a shown as **bundle options**, NOT prominently displayed
- Different top verbiage emphasizing diagnosis-driven recommendations
- Must feel like natural progression from assessment results

**Implementation Details:**
- **Backend:** Products-based pricing (not subscription addons)
  - `/api/pricing/calculate-bundle` - Calculates pricing from product IDs with pathway
  - `/api/subscriptions/create-from-assessment` - Creates subscription with products
  - Pathway validation: accepts "diy", "msp", "combination", "none"
  - Billing cycle math: Monthly price × cycle months (3/12) then apply discount (5%/15%)
- **Frontend:** `client/src/pages/assessment-checkout.tsx`
  - Dynamic pathway selection (DIY/MSP/Combination)
  - Billing cycle selector (Monthly/Quarterly/Annual)
  - Real-time order summary with proper discount display
- **Architecture Decision:** Products (business-listings, review-management) are separate from subscription_addons (seo-local, social-premium)

### Flow 3c: A La Carte Individual App Ordering (TO BUILD)
**Route:** `/apps-marketplace` (or similar)
**Purpose:** Direct purchase of individual apps without assessment
**UI Layout:** App-focused with bundle suggestions
- Primary focus: Individual app cards with "Add to Cart" functionality
- Different top verbiage from 3b - emphasizes individual app selection
- Plans from 3a displayed as **"Bundle Options"** or **"Save with Packages"**
- Order summary shows selected individual apps
- May share same route/page as 3b but with **different presentation logic**
- Bundle offerings positioned as value-add suggestions, not primary focus

### Critical Design Requirements
1. **Cannot reuse same UI across all three flows** - each needs distinct layout
2. **Plans appear differently:**
   - 3a: Prominent, primary focus (current implementation)
   - 3b: Bundle offerings within diagnosis results
   - 3c: Bundle options alongside individual apps
3. **Order summary behavior:**
   - 3a: Pathway selection → plan → addons
   - 3b: Diagnosis → recommended apps → pathway preference → bundle calculation
   - 3c: Individual apps → optional bundle upgrade
4. **User context matters:**
   - 3a: User knows they want a plan
   - 3b: User completed assessment, wants recommendations
   - 3c: User wants specific apps, may discover bundles

## External Dependencies

-   **Google Places API:** For retrieving business data and presence analysis.
-   **OpenAI API:** For AI-powered analysis, recommendations, and AI Coach.
-   **SMTP Credentials:** For sending automated emails.
-   **Neon PostgreSQL:** Serverless database solution.
-   **Drizzle ORM:** For type-safe database interactions.
-   **Shadcn/ui:** Component library.
-   **Tailwind CSS:** Utility-first CSS framework.
-   **Vendasta API:** For bi-directional client data synchronization and dashboard access.
-   **Telnyx:** For SMS messaging in the /send platform.
-   **NMI (Network Merchants Inc.):** Payment gateway integration for subscription billing.