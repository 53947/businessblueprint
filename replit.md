# Business Blueprint - Digital Intelligence Platform

## Overview

Business Blueprint is an AI-powered digital intelligence platform that helps small businesses improve their online presence through assessments, recommendations, and integrated marketing tools. The platform is part of the TriadBlue ecosystem, which includes three standalone applications: Business Blueprint (businessblueprint.io), Hosts Blue (hostsblue.com), and Swipes Blue (swipesblue.com).

The platform provides business assessments, AI coaching, reputation management via Synup integration, and a suite of communication tools (Commverse: /send, /inbox, /livechat, /content). It operates on a tiered subscription model with DIY and MSP pathways, offering both self-service and managed service options.

## User Preferences

Preferred communication style: Simple, everyday language.

**Development Workflow:**
- DO NOT make changes to existing features without explicit user approval
- When user points out something, DISCUSS FIRST - do not automatically fix
- Only implement changes when user explicitly requests them
- Reliability and consistency are critical
- Changes only happen when discussed and approved

**Documentation Standards:**
- Update STATUS_REPORT.md twice daily at 11:59 AM and 11:59 PM
- Document all completed features, bug fixes, and configuration changes
- Keep GitHub issues synchronized with progress

**Design Standards:**
- Follow TRIAD_BLUE_STANDARDS.md for all branding, navigation, and typography
- Navigation structure is UNCHANGEABLE: Applications | Solutions | Pricing
- Logo uses Archivo fonts (never images), with specific text shadow rules
- Read standards documentation TWICE before making any UI changes

## System Architecture

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Wouter for routing (client-side)
- TanStack Query v5 for data fetching
- Tailwind CSS + Shadcn/ui components
- Archivo font family for typography
- Vite for build tooling

**Backend:**
- Node.js with Express 5
- PostgreSQL (Neon Serverless) via Drizzle ORM
- Session storage with connect-pg-simple
- Socket.IO for real-time messaging
- RS256 JWT authentication for API access

**Authentication:**
- Replit Auth (OpenID Connect) for user sessions
- JWT tokens for client portal API access
- Multi-layer security for Synup integration (cross-tenant prevention, business name verification)

### Core Architectural Decisions

**Multi-Platform Ecosystem Design:**
The system is architected as three independent platforms that share authentication (SSO) and payment processing. Business Blueprint serves as the primary digital intelligence platform, while Swipes Blue handles all payment transactions across the ecosystem. This separation allows each platform to be marketed and deployed independently while maintaining shared services.

**Database Schema Strategy:**
Uses Drizzle ORM with a single PostgreSQL database containing tables for assessments, clients, subscriptions, social media integrations, content management, and communication channels. The schema supports multiple pathways (DIY/MSP/ALC) and tier-based feature access. Session management uses a dedicated `sessions` table for Replit Auth.

**Real-Time Communication:**
WebSocket connections via Socket.IO enable live chat (/livechat widget), unified inbox (/inbox), and real-time notifications. Authentication middleware supports both JWT tokens (for agents) and session IDs (for customers), allowing secure bi-directional messaging without requiring customer login.

**AI Integration Pattern:**
OpenAI GPT-4o powers multiple features through dedicated service classes (AICoachService, OpenAIAnalysisService, reviewAI). Each service maintains context-specific prompts and handles token management independently. AI responses are cached where appropriate to reduce API costs.

**Route Organization:**
Production route hierarchy: `/brand-assets/*` (database assets) → `/attached_assets/*` (static files) → `/assets/*` (Vite bundles) → SPA fallback. This specific order prevents route conflicts that caused production deployment issues in October 2024.

**Subscription & Pricing Model:**
Three-pathway system (DIY, MSP, ALC) with base plans (Start/Advanced/Scale) and add-ons. PricingEngine service calculates costs dynamically based on tier selections and included features. NMI integration handles payment processing via Swipes Blue with tokenized checkout flow.

### Key Integration Points

**Synup API (Listings & Reviews):**
Full integration with location management, listings synchronization, and review monitoring. Service layer abstracts API v4 endpoints with Base64-encoded location IDs. Multi-layer security prevents cross-tenant data access and validates business names strictly. Review monitoring service polls for new reviews and triggers email alerts.

**Meta Platforms (Facebook/Instagram/WhatsApp):**
OAuth flows for platform connections, webhook endpoints for receiving messages, and unified inbox for managing conversations. App ID 190094768417980 with verified domain. Supports posting content, receiving DMs, and handling comments across Meta properties.

**Commverse Apps Architecture:**
Four integrated applications (/send, /inbox, /livechat, /content) operate as part of Business Blueprint but maintain separate routing and feature sets. Each app has dedicated database tables, API routes, and UI components. Access controlled by subscription tier and add-on selections.

**Media Storage (Cloudflare R2):**
Content management uses S3-compatible storage with MediaStorageService handling uploads, transformations (via Sharp), and CDN delivery. Supports image optimization, video storage, and tagging. Falls back gracefully when credentials unavailable.

## External Dependencies

**Third-Party APIs:**
- **OpenAI GPT-4o** - AI assistant, business coach, content generation, review responses
- **Synup API v4** - Business listings management, reputation monitoring, review synchronization
- **Google Places API** - Business data lookup, location verification, initial assessment data
- **Meta Graph API** - Facebook/Instagram/WhatsApp integration for content posting and messaging
- **Telnyx** - Voice and SMS messaging capabilities
- **NMI (Network Merchants Inc)** - Payment gateway via Swipes Blue integration

**Infrastructure Services:**
- **Neon PostgreSQL** - Serverless database hosting
- **Cloudflare R2** - S3-compatible object storage for media files
- **Replit Auth** - OpenID Connect authentication provider
- **Socket.IO** - WebSocket server for real-time features

**Pending Integrations (Not Yet Configured):**
- LinkedIn API (social posting, professional profile management)
- X (Twitter) API v2 (OAuth 2.0 PKCE, posting, DM webhooks)
- Google Business Profile API (posting, location management)
- TikTok Marketing API (video upload, MSP tier only)
- OpenSRS (domain and email automation for Hosts Blue)
- WPMUDev (WordPress hosting tools for Hosts Blue)

**Development Tools:**
- Vite (build system - requires NODE_ENV not set to "production" in dev)
- TypeScript 5+ with strict mode
- ESLint/Prettier for code quality
- Drizzle Kit for database migrations

**Important Notes:**
- Production deployments require `dist` folder in version control (was in .gitignore, caused deployment issues)
- NODE_ENV must NOT be set in Replit Secrets to allow devDependencies installation
- Route paths must not conflict with Vite's `/assets/*` pattern (use `/brand-assets/*` instead)
- All social media APIs require OAuth credentials stored in environment variables before platform connections work