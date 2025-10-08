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

**Three Distinct Purchasing Flows:**
The platform features three separate purchasing scenarios, each with different UI presentation and user journey:

1.  **Flow 3a: General Subscription Page (`/subscription`)**
    *   **Purpose:** Direct subscription purchase with pathway selection.
    *   **UI Layout:** Plan-focused presentation with prominent MSP/DIY buttons, detailed feature lists, and dynamic order summary.

2.  **Flow 3b: Assessment/Diagnosis-Driven Recommendations (`/assessment-checkout`)**
    *   **Purpose:** Post-diagnosis recommendations leading to purchase.
    *   **UI Layout:** Diagnosis-driven, integrating pathway preference, AI-recommended apps, and bundle options presented as a natural progression from assessment results.

3.  **Flow 3c: A La Carte Individual App Ordering (`/apps-marketplace`)**
    *   **Purpose:** Direct purchase of individual apps without assessment.
    *   **UI Layout:** App-focused with individual app cards, "Add to Cart" functionality, and bundle offerings positioned as value-add suggestions.

**Critical Design Requirements for Flows:**
-   Cannot reuse the same UI across all three flows; each requires a distinct layout.
-   Plans appear differently based on the flow (prominent, bundle options, or alongside individual apps).
-   Order summary behavior adapts to the flow's context (pathway/plan/addons, diagnosis/recommendations/bundle, individual apps/optional bundle).
-   User context informs the presentation, catering to users who know their plan, completed an assessment, or seek specific apps.

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
-   **OpenSRS:** Domain registration, transfer, and DNS management API for webhosted.io.

## Integration Details

### OpenSRS Domain Management (webhosted.io)
**Status:** ✅ Schema complete, backend service pending, UI design mapped

**Purpose:** Comprehensive domain and DNS management for client websites

**API Documentation:** https://domains.opensrs.guide/

**Capabilities:**
- **Domain Registration:** Using `sw_register` command with XML protocol
- **Domain Transfers:** Auth code management, transfer status tracking
- **DNS Management:** Full record support (A, AAAA, CNAME, MX, TXT, SPF, DKIM)
- **Nameservers:** OpenSRS defaults (ns1.systemdns.com, ns2.systemdns.com) or custom
- **Security:** WHOIS privacy, domain locking, auto-renewal
- **Authentication:** API key + IP authorization (ports 55443, 55000 required)

**Database Schema (Complete):**
- `domains` - Domain registration tracking
- `dns_records` - DNS record management with verification
- `domain_transfers` - Transfer process tracking
- `nameserver_history` - Nameserver change audit trail

**UI Design Reference (WPMUDev Hub 2.0 style):**
- Tab navigation: Registered Domains | Connected Domains | Transferred Domains
- Visual status indicators (✓ verified DNS/SSL, ⊙ pending propagation)
- One-click operations: Add DNS Records, Import Records, Check Nameservers
- Auto-import from existing DNS providers
- Modal-based DNS configuration
- Color-coded status with copy-friendly record display

**Implementation:** Service wrapper needed (server/services/opensrs.ts), DNS UI components

---

### Impersonation System (All Platforms)
**Status:** ✅ Schema complete, backend service pending

**Purpose:** Secure admin support access for troubleshooting client issues

**Security Model:**
- **Dual-Token JWT:** Separate tokens for impersonated user and admin
- **Audit Logging:** Immutable logs of all actions (who, what, when, where)
- **User Consent:** Required approval via email/SMS/in-app notification
- **Session Limits:** 30-minute auto-expiry, manual end option
- **Access Control:**
  - Read-only mode by default
  - Restricted actions: delete_account, change_password, modify_billing
  - Granular permissions per session
- **Compliance:** SOC2/GDPR-ready with complete audit trail

**Database Schema (Complete):**
- `impersonation_sessions` - Session management with dual tokens
- `impersonation_audit_log` - Comprehensive action tracking

**Workflow:**
1. Admin requests impersonation with reason
2. System notifies user for consent
3. User approves (or auto-approve after timeout for urgent support)
4. Admin gains limited access with persistent visual indicator
5. All actions logged with admin/user IDs, timestamps, IP addresses
6. Session auto-expires or admin manually ends

**UI Components Needed:**
- Admin panel: Initiate impersonation, view active sessions
- User consent modal: Approve/reject with notification
- Persistent banner: "Admin [name] is viewing your account"
- Exit impersonation button for admin

---

### /send Email + SMS Platform
**Status:** ✅ Backend complete, UI pending

**Backend Complete:**
- Database schema: contacts, lists, templates, campaigns, automations
- Storage interface: Full CRUD operations
- Email service: Nodemailer configured
- SMS service: Telnyx configured
- API routes: Protected with JWT auth, client ownership validation
- Compliance: GDPR/CAN-SPAM/TCPA consent tracking

**UI Components Needed:**
1. **Dashboard:** ✅ Complete - Metrics overview, campaign performance, contact growth, activity feed
2. **Contact Management:** Data table, import wizard, detail view, consent indicators, bulk actions
3. **List/Segment Builder:** Visual list creation, dynamic segments with rule builder
4. **Template Builder:** Drag-drop email blocks, HTML editor, device preview, personalization tags
5. **Campaign Composer:** Step-by-step wizard, A/B testing, scheduling, multi-channel (email + SMS)
6. **Automation Builder:** Visual workflow with triggers/actions/conditions, pre-built templates
7. **Analytics Dashboard:** Performance metrics, deliverability reports, ROI tracking

---

### Unified Inbox (Communications Hub)
**Status:** ✅ Database schema & WebSocket infrastructure complete

**Purpose:** Centralized communications hub for all customer messaging channels

**Channels Supported:**
- Live Chat Widget (website visitors)
- Email (IMAP/SMTP integration)
- SMS (Telnyx integration)
- WhatsApp Business Cloud API
- Facebook Messenger
- Instagram Direct Messages  
- X (Twitter) Direct Messages
- TikTok Business Messaging

**Database Schema (Complete):**
- `inbox_channel_connections` - API credentials & webhook configuration for each platform
- `inbox_conversations` - Unified conversation threads across channels
- `inbox_messages2` - Individual messages with attachments, status tracking
- `inbox_attachments` - File attachments with thumbnails
- `inbox_quick_replies` - Canned responses and quick reply templates
- `inbox_participants` - Multi-participant conversation support
- `livechat_sessions` - Live chat widget session tracking with visitor context

**WebSocket Infrastructure (Complete):**
- Socket.IO server for real-time bidirectional messaging
- Room-based architecture (client rooms, conversation rooms, session rooms)
- Events: `chat:message`, `agent:message`, `typing:start/stop`, `messages:read`
- Auto-conversation creation for new live chat sessions
- Message persistence with status tracking (sent, delivered, read)
- Typing indicators and read receipts

**Live Chat Widget Features:**
- Embeddable JavaScript widget for any website
- WebSocket real-time messaging
- Visitor context tracking (page URL, referrer, location, user agent)
- Session persistence and reconnection handling
- Agent assignment and transfer capabilities

**Team Collaboration Features (Planned):**
- Conversation assignment to team members
- Internal notes (not visible to customers)
- Conversation status management (open, pending, resolved, closed)
- Tags and categorization
- Priority levels
- Sentiment analysis

**Integration APIs (Planned):**
- Facebook Graph API v19.0 for Messenger
- Instagram Messenger Platform
- WhatsApp Cloud API with template messaging
- X/Twitter Account Activity API with CRC validation
- TikTok Business Messaging API
- Email: IMAP for receiving, existing Nodemailer for sending
- SMS: Telnyx webhook integration for incoming messages

**DIY Email Setup Flow (with OpenSRS):**
1. Domain verification (via DNS TXT record)
2. MX record auto-configuration
3. SPF/DKIM setup for sender authentication
4. Test email send to verify deliverability
5. Guided first campaign creation