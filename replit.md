# cloudpleaser.io - Digital Empowerment Platform

## Overview

cloudpleaser.io is a comprehensive digital empowerment platform designed to analyze businesses' online presence using AI and Google Business Intelligence. Its core purpose is to provide automated assessments, generate detailed reports, and offer a complete client portal for ongoing digital presence management. The platform aims to empower businesses digitally through both DIY and Managed Service Provider (MSP) pathways, focusing on mass market automation to minimize manual intervention.

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
- Consistent icon system: Brain (cloudpleaser), Globe (webhosted), Zap/Lightning (airswiped)
- Unified TLD system: All platforms use fluorescent green for .io/.com extensions
- Platform signatures: cloudpleaser (blue pleaser), webhosted (#FC8EA0 hosted), airswiped (#CB0505 swiped)
- Custom hex colors: Pink #FC8EA0, Red #CB0505 (user-specified exact colors)
- Purple reserved for portal pages across all platforms
- Page-specific pleaser colors: Yellow (contact), Orange (about), Blue (pricing), avoiding platform colors
- Format: black-[pleaser-color]-fluorescent-green across all platforms

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
- **Client Portal:** A distinct, cloudpleaser.io-branded portal providing clients with a dashboard overview, business listings management, review management, campaign tracking, and task management. It integrates securely with Vendasta data without relying on Vendasta's UI.
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