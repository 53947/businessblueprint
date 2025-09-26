# cloudpleaser.io - Digital Intelligence Platform

## Overview

cloudpleaser.io helps local businesses succeed online through AI-powered digital intelligence and strategic guidance. Our core value proposition is simple: Get Found, Get Customers, Get Business. The platform analyzes businesses' online presence using Google Business Intelligence, creates personalized Digital Blueprints, and provides both DIY and Managed Service Provider (MSP) pathways. We focus on mass market automation to minimize manual intervention while maximizing business growth outcomes.

## Brand Positioning

**Strategic Positioning:** Digital Intelligence Incubator - nurturing businesses from digital obscurity to digital maturity through systematic, data-driven growth programs.

**Customer-Facing Message:** Helping Local Businesses Succeed Online

**Value Proposition:** Get Found, Get Customers, Get Business

## User Preferences

Preferred communication style: Simple, everyday language.

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
- Unified TLD system: All platforms use fluorescent green for .io/.com extensions
- Platform signatures: cloudpleaser (blue pleaser), webhosted (#FC8EA0 hosted), airswiped (#CB0505 swiped)
- Custom hex colors: Pink #FC8EA0, Red #CB0505 (user-specified exact colors)
- Purple reserved for portal pages across all platforms
- Page-specific pleaser colors: Yellow (contact), Orange (about), Blue (pricing), avoiding platform colors
- Format: black-[pleaser-color]-fluorescent-green across all platforms
- Dark background adaptations: Brand logos use brightness-0 invert for white appearance on dark backgrounds

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
- [ ] **Task 3:** Verify/configure Email service SMTP credentials - May need setup for reports

### 💰 REVENUE PRIORITY (Enable Payments)
- [ ] **Task 4:** Complete NMI payment integration and subscription billing system
- [ ] **Task 5:** Implement 7-day free trial feature mentioned in AI Coach pricing

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
**Current Task:** Task 3 - Verifying Email service SMTP credentials  
**Completed:** 2/12 tasks  
**Estimated Sprint Duration:** 2-3 weeks  

### 🔄 How to Use This Task List
1. **Check Daily:** Review current task and progress
2. **Update Status:** Mark tasks as complete by changing `[ ]` to `[x]`
3. **Add Notes:** Include implementation details below each completed task
4. **Track Blockers:** Note any issues that prevent progress