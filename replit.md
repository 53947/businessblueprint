# Triad Blue Ecosystem - Digital Business Solutions

## Overview
Triad Blue operates three interconnected platforms: Business Blueprint (AI-powered digital intelligence for local businesses), Hosts Blue (web services), and Swipes Blue (payment gateway). The ecosystem focuses on helping local businesses in the US and Canada succeed online through AI-driven online presence analysis, personalized Digital Blueprints, and both DIY and Managed Service Provider (MSP) pathways. The core value proposition is "Get Found, Get Customers, Get Business," positioning Triad Blue as a Digital Intelligence Incubator.

## User Preferences
Preferred communication style: Simple, everyday language.

**Logo Design Process:**
- DO NOT change any logo elements unless specifically instructed
- Only modify exactly what is requested - no additional "improvements"
- Keep compass design consistent across iterations unless told otherwise
- Business Blueprint logo concept: Compass + Pencil = "AI" using actual blueprint tools

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