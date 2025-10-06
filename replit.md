# businessblueprint.io - Digital Intelligence Platform

## Overview

businessblueprint.io is an AI-powered digital intelligence platform designed to help local businesses enhance their online presence, attract customers, and grow. It offers AI-driven analysis of online presence, generates personalized Digital Blueprints, and provides both Do It Yourself (DIY) and Managed Service Provider (MSP) pathways for business growth. The platform aims for mass market automation, leveraging Google Business Intelligence to minimize manual intervention and maximize results.

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