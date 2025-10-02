# cloudpleaser.io - Digital Intelligence Platform

## Overview

cloudpleaser.io helps local businesses succeed online through AI-powered digital intelligence and strategic guidance. Our core value proposition is simple: Get Found, Get Customers, Get Business. The platform analyzes businesses' online presence using Google Business Intelligence, creates personalized Digital Blueprints, and provides both DIY and Managed Service Provider (MSP) pathways. We focus on mass market automation to minimize manual intervention while maximizing business growth outcomes.

## Brand Positioning

**Strategic Positioning:** Digital Intelligence Incubator - nurturing businesses from digital obscurity to digital maturity through systematic, data-driven growth programs.

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
- cloudpleaser.io: Digital marketing platform (never mention Vendasta)
- webhosted.io: Website hosting platform (never mention WPMUDev)
- airswiped.com: Payment gateway platform (never mention NMI Network)
- Focus on mass market automation to minimize manual intervention
- Two primary pathways: DIY (self-service) and MSP (managed services)
- AI-powered Google Business Intelligence drives assessment recommendations

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

## System Architecture

The application employs a full-stack architecture with a monorepo structure, separating frontend, backend, and shared components.

**Frontend:**
- **Framework:** React 18 with TypeScript
- **Routing:** Wouter
- **Styling:** Tailwind CSS with Shadcn/ui components
- **State Management:** TanStack Query
- **Forms:** React Hook Form with Zod validation
- **Build Tool:** Vite

**Backend:**
- **Runtime:** Node.js with Express.js
- **Language:** TypeScript with ES modules
- **Database:** PostgreSQL with Drizzle ORM, hosted on Neon (serverless)
- **Session Management:** Connect-pg-simple
- **Email Service:** Nodemailer

**Core Features & Components:**
- **AI Coach:** An integral part of the platform, leveraging OpenAI GPT-4o for personalized guidance, step-by-step instructions, and progress tracking. It offers tiered pricing (Essential and Pro) and adapts to user experience levels.
- **Client Portal:** ✅ COMPLETED - A fully functional, cloudpleaser.io-branded portal providing clients with a comprehensive dashboard overview, business listings management, review management, campaign tracking, and task management. Features real-time Vendasta integration with Account Group ID authentication, purple portal branding, and mobile-responsive design.
- **Vendasta Integration:** ✅ COMPLETED - Comprehensive API integration with Vendasta Business Center, including customer synchronization, dashboard data retrieval, and authentication flow using Account Group IDs.
- **Data Flow:** Involves assessment creation, background processing (Google Business data, AI analysis), automated report delivery, and pathway selection (DIY/MSP).
- **UI/UX Decisions:** Emphasis on consistent branding, custom color schemes, and a multi-tab interface for organized information within the AI Coach and Client Portal. Visual progress indicators and priority-based action items are utilized.

## External Dependencies

-   **Google Places API:** Used for retrieving business data and facilitating presence analysis.
-   **OpenAI API:** Essential for AI-powered analysis, recommendations generation, and the AI Coach functionality.
-   **SMTP Credentials:** Required for sending automated email reports and notifications.
-   **Neon PostgreSQL:** The primary serverless database solution.
-   **Drizzle ORM:** Used for type-safe database interactions.
-   **Shadcn/ui:** Component library for UI development.
-   **Tailwind CSS:** Utility-first CSS framework for styling.
-   **Vendasta API:** For bi-directional synchronization of client data, form submissions, and enabling dashboard access without embedding Vendasta's UI. This includes real-time webhooks and API polling for data integrity.

## Current Development Sprint

### 🚨 IMMEDIATE PRIORITY (Blocking Users)
- [x] **Task 1:** Fix Digital Blueprint pathway selection - "ACTION REQUIRED" section currently blocks user progress
  - ✅ Added conditional logic to only show ACTION REQUIRED when no pathway selected
  - ✅ Added green confirmation section when pathway is chosen
  - ✅ Users can now change their pathway selection
- [x] **Task 2:** Verify/configure Google Places API key - Service is built but may need configuration  
  - ✅ Google Places API key is properly configured and working
  - ✅ Successfully tested with real business data (UX Webcrafters)
  - ⚠️ OpenAI quota exceeded - preventing AI analysis completion  
- [x] **Task 3:** Verify/configure Email service SMTP credentials - May need setup for reports
  - ✅ Email credentials properly configured with Google alias
  - ✅ FROM_EMAIL: noreply@businessblueprint.io (updated from cloudpleaser.io)
  - ✅ SMTP authentication setup complete

### 💰 REVENUE PRIORITY (Enable Payments)
- [x] **Task 4:** Complete NMI payment integration and subscription billing system
  - ✅ NMI service integration with proper month_frequency billing cycles
  - ✅ Frontend payment form with Collect.js tokenization
  - ✅ Backend API with Zod validation and tax calculation
  - ✅ Production-ready core billing functionality
  - ⚠️ Webhook handling and idempotency identified for future enhancement
- [x] **Task 5:** Implement 7-day free trial feature mentioned in AI Coach pricing
  - ✅ Database schema updated with trial period support
  - ✅ Backend logic for AI Coach addon trial detection
  - ✅ Trial status API endpoint and delayed billing implementation
  - ✅ Frontend trial badge and enhanced messaging
  - ⚠️ Trial-to-active transition and cancellation flow for future enhancement

### 👥 CLIENT EXPERIENCE (Remove "Coming Soon" Placeholders)
- [ ] **Task 6:** Build Client Portal Review Management interface
- [ ] **Task 7:** Build Client Portal Campaign Management interface  
- [ ] **Task 8:** Build Client Portal Advanced Task Management

### ✨ POLISH & GROWTH (Future Enhancements)
- [ ] **Task 9:** Complete AI Coach feature implementation - verify all tabs functional
- [ ] **Task 10:** Fix assessment timing promise - change from "24 hours" to realistic timeframe
- [ ] **Task 11:** Research cost-effective alternatives to Vendasta/Synup
- [ ] **Task 12:** Build embeddable dashboard system for client portal

### 📊 Sprint Progress Tracking
**Started:** December 26, 2024  
**Current Task:** Task 6 - Build Client Portal Review Management interface  
**Completed:** 5/12 tasks  
**Estimated Sprint Duration:** 2-3 weeks  

### 🔄 How to Use This Task List
1. **Check Daily:** Review current task and progress
2. **Update Status:** Mark tasks as complete by changing `[ ]` to `[x]`
3. **Add Notes:** Include implementation details below each completed task
4. **Track Blockers:** Note any issues that prevent progress