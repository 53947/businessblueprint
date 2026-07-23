# TriadBlue Replit Workspace – Collaboration & Governance Rules
**Version 2.0 — November 2025**

---

## 📘 Purpose

This document defines **how the team works together** in the Replit environment. It establishes behavioral rules, approval workflows, and documentation standards for all contributors (Owner, Agent, Assistant, Architect).

For **technical architecture**, see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)  
For **design standards**, see [`docs/TRIAD_BLUE_STANDARDS.md`](docs/TRIAD_BLUE_STANDARDS.md)  
For **brand constants**, see [`docs/_constants.md`](docs/_constants.md)

---

## 🔁 Core Workflow Rules

### Discuss First — Never Auto-Change
- **DO NOT** make changes to existing features without explicit approval
- When user points something out → **DISCUSS FIRST** (do not automatically fix)
- Only implement changes when user **explicitly requests** them
- Reliability and consistency are critical
- Changes only happen when discussed and approved

### Explicit Approval Required
- No feature edits outside assigned GitHub Issues
- No merges or code changes "off the record"
- Every commit must reference an Issue ID (e.g., `#24 – Fix login flow`)

### Reliability > Creativity
- Existing functionality must not break
- New features must be tested before delivery
- User-facing changes require explicit sign-off

---

## 👥 Team Roles & Responsibilities

| Role | Responsibilities | Authority |
|------|------------------|-----------|
| **Owner (Dean)** | Final approvals, business decisions, feature requests | Highest authority |
| **Architect (Rune)** | Reviews PRs, validates standards, manages dependencies | Merge approval |
| **Agent (Axel)** | Builds features, fixes bugs, deploys code | Implementation |
| **Assistant (Lumen)** | Organizes docs, updates copy, maintains content | Content management |

**Rule:** No one builds or merges without an assigned GitHub Issue.

---

## 📝 Documentation Standards

### Twice-Daily STATUS_REPORT.md Updates (MANDATORY)
- **11:59 AM** → Push active commits + update STATUS_REPORT.md
- **11:59 PM** → Final sync + update all open Issues

### GitHub Issues Policy
- Every commit must reference an Issue ID
- No task may begin without an associated Issue
- Close Issues only after documentation and testing are complete

### File Update Requirements
When making changes, update:
1. **STATUS_REPORT.md** - Log what was done
2. **GitHub Issue** - Mark progress
3. **ARCHITECTURE.md** (if technical structure changes)
4. **TRIAD_BLUE_STANDARDS.md** (if design standards change)

---

## 🎨 Design & Branding Rules

### Read Standards TWICE Before UI Changes
Before making any UI/branding changes:
1. Read [`docs/TRIAD_BLUE_STANDARDS.md`](docs/TRIAD_BLUE_STANDARDS.md) **twice**
2. Reference [`docs/_constants.md`](docs/_constants.md) for all color/font values
3. Verify navigation structure matches standards

### Navigation Structure (CRITICAL - NO CHANGES WITHOUT OWNER APPROVAL)
**⚠️ IMPORTANT:** The navigation menu structure below is the OFFICIAL standard as of November 2025. Do NOT modify without explicit approval from Dean (Owner).

**Main Header (5 Sections):**
1. **How It Works** - 5-step journey with prescription highlight
2. **Pricing** - Base Plans + Execution Styles + Marketplace
3. **Applications** - Commverse Bundle + individual apps
4. **Solutions** - BusinessBlueprint, HostsBlue, SwipesBlue platforms
5. **Resources** - Learn, Platforms, Developers columns

**Commverse apps:** `/send`, `/inbox`, `/content`, `/livechat` (all lowercase)

**LocalBlue apps (PERMANENT - DO NOT CHANGE):**
- **/localblue** - LocalBlue bundle (local business presence) - TriadBlack & TriadBlue (#0000FF)
- **/listings** - Directory sync & consistency - TriadBlack & #FF0040 (pink/red)
- **/reputation** - Review response & reputation management - TriadBlack & #D59600 (gold)

**⚠️ CRITICAL NAMING RULE:** Always use **`/localblue`**, **`/listings`**, **`/reputation`** (lowercase with "/" prefix). NEVER spell out letters. These are official apps with official branding.

### Logo & Typography Rules
- Logo uses **Archivo fonts** (never images)
- Text shadow: 2pt blur, 10pt distance @ 315°
- Gradient: 315° (EEFBFF → 6EA6FF → 0000FF)
- See [`docs/_constants.md`](docs/_constants.md) for canonical values

---

## 🔐 Communication Style

### User Preferences
- Use **simple, everyday language** (no technical jargon)
- Explain changes clearly before implementing
- Ask for approval when uncertain
- Be direct and concise

### When to Ask vs. Execute
**Ask first:**
- Feature changes or removals
- Design/UI modifications
- Database schema changes
- Route/navigation changes

**Execute directly:**
- Bug fixes (non-breaking)
- Performance improvements
- Code cleanup (no behavior change)
- Documentation updates

---

## ⚙️ Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database migration
npm run db:push
```

---

## 📂 Documentation Reference Map

**⚠️ ALL DOCUMENTS BELOW ARE REQUIRED READING BEFORE MAKING ANY CHANGES**

| Document | Full Path | Purpose | When to Read |
|----------|-----------|---------|--------------|
| **README.md** | `/README.md` | Public-facing project summary | Before external communication |
| **replit.md** | `/replit.md` | **THIS FILE** — Behavioral & governance rules | FIRST - Read before any work |
| **TRIAD_BLUE_STANDARDS.md** | `/docs/TRIAD_BLUE_STANDARDS.md` | Design & branding standards | Before ANY UI/design changes (read TWICE) |
| **_constants.md** | `/docs/_constants.md` | Brand constants (colors, fonts, values) | Before using any colors/fonts |
| **ARCHITECTURE.md** | `/docs/ARCHITECTURE.md` | Technical structure & system design | Before technical/structural changes |
| **PRESCRIPTION_SYSTEM.md** | `/docs/PRESCRIPTION_SYSTEM.md` | Prescription automation guide | Before building assessment automation |
| **STATUS_REPORT.md** | `/STATUS_REPORT.md` | Running operational log | Update TWICE daily (11:59 AM/PM) |
| **GITHUB_ISSUES_TO_CREATE.md** | `/GITHUB_ISSUES_TO_CREATE.md` | Issue templates & backlog | Before creating new GitHub issues |

**No excuses — these paths are explicit. Read the relevant docs before proceeding.**

---

## 🚨 Critical Rules

1. **Never break existing features** without explicit approval
2. **Always reference GitHub Issues** in commits
3. **Update STATUS_REPORT.md twice daily** (11:59 AM / PM)
4. **Read standards documentation** before UI changes
5. **Discuss first** — never auto-fix
6. **Test before delivery** — verify changes work
7. **Document everything** — no undocumented changes

---

## 🔄 Version History

- **v2.0** (Nov 2025) - Reorganized into behavioral/governance focus
- **v1.0** (Oct 2025) - Initial combined documentation

---

## 📧 Email Delivery Status (IMPORTANT)

**Issue:** Replit blocks outbound SMTP (port 587), so Nodemailer cannot send emails.

**Current Workaround (Nov 2025):**
1. Assessment dashboard shows "Save This Page" with copy-able link after submission
2. `/find-results` page allows users to look up assessments by email
3. Demo accounts (demo@, test@, agency@businessblueprint.io) return direct links without email

**Recommended Fix:** Set up Resend integration for transactional email delivery:
- Best pricing: $20/mo for 50,000 emails
- Free tier: 3,000 emails/month
- Clean API with excellent TypeScript support
- Use Replit's Resend connector integration

**Files affected:**
- `server/services/email.ts` - Current Nodemailer implementation (non-functional in production)
- `client/src/pages/find-results.tsx` - Email lookup fallback page
- `client/src/pages/dashboard.tsx` - Shows copy-able dashboard link during analysis

---

## 🤖 Multi-AI Provider System (Jan 2026)

**Purpose:** Enable switching between Claude, OpenAI, and DeepSeek providers via admin panel to optimize costs while maintaining quality.

### Architecture
- **Unified AI Provider** (`server/services/ai-provider.ts`) - Abstraction layer with automatic fallback chain
- **AI Settings Service** (`server/services/ai-settings.ts`) - Database-driven provider selection per feature
- **Admin Panel** (`client/src/components/admin/ai-settings-panel.tsx`) - UI for changing providers

### Default Configuration
| Feature | Default Provider | Reasoning |
|---------|-----------------|-----------|
| Assessment Analysis | DeepSeek | 90% cost reduction for high-volume operations |
| Prescription Generation | DeepSeek | 90% cost reduction for structured output |
| Coach Blue Coaching | Claude | Premium quality for customer-facing interactions |

### Cost Estimates (per 1K tokens)
- DeepSeek: $0.0014 (Good quality)
- Claude: $0.015 (Premium quality)
- OpenAI: $0.030 (Premium quality)

### API Keys Required (in Replit Secrets)
- `ANTHROPIC_API_KEY` - For Claude provider
- `OPENAI_API_KEY` - For OpenAI provider
- `DEEPSEEK_API_KEY` - For DeepSeek provider

### Key Files
- `server/services/ai-provider.ts` - Unified provider with fallback support
- `server/services/ai-settings.ts` - Settings management
- `server/services/openai.ts` - Business analysis service (uses unified provider)
- `server/services/aiCoach.ts` - Coach Blue service (uses unified provider)
- `shared/schema.ts` - Contains `aiSettings` table definition

---

## 💬 Live Chat System (/ chat) - Jan 2026

**Purpose:** Multi-tenant SaaS live chat platform integrated into BusinessBlueprint.io. Stores visitor data on BB servers and syncs contacts to customers' /relationships CRM accounts.

### Architecture
- **Widget API** (`server/routes/chat.ts`) - Public endpoints for embeddable widget
- **Dashboard API** (`server/routes/chat.ts`) - Authenticated endpoints for conversation management
- **Distributable Widget** (`client/public/chat-widget.js`) - Vanilla JS widget for WordPress/Shopify/embed
- **Dashboard UI** (`client/src/pages/chat-dashboard.tsx`) - React-based conversation management

### Database Schema (in `shared/schema.ts`)
- `livechatWidgetSettings` - Per-client widget customization (colors, position, welcome message)
- `livechatSessions` - Visitor sessions with page URL, referrer, user agent
- `livechatAgents` - Support agents with availability status
- `chatAnalyticsEvents` - Widget opens, messages, conversions tracking
- Uses existing `inboxConversations` and `inboxMessages2` for message storage
- CRM sync: Creates/updates `crmContacts` when visitor provides email

### Widget Installation
Customers embed the widget using:
```html
<script src="https://businessblueprint.io/chat-widget.js" data-client-id="CLIENT_ID"></script>
```

### Security Model
- CORS middleware on all widget endpoints (allows cross-origin requests)
- Client validation: Widget endpoints verify client exists before processing
- Dashboard uses sessionStorage for clientId (production should use authenticated tenant)

### Key Routes
| Endpoint | Purpose |
|----------|---------|
| `GET /api/chat/widget/settings/:clientId` | Load widget configuration |
| `POST /api/chat/widget/sessions` | Create/resume chat session |
| `POST /api/chat/widget/messages` | Send message from visitor |
| `GET /api/chat/widget/messages/:sessionId` | Get message history |
| `POST /api/chat/widget/analytics` | Track widget events |
| `GET /api/chat/dashboard/conversations/:clientId` | List client conversations |
| `GET /api/chat/dashboard/analytics/:clientId` | Get analytics summary |

### Production Enhancements (TODO)
1. Implement signed client tokens for widget authentication
2. Add domain allowlist per client for CORS validation
3. Enforce server-side tenant auth for dashboard routes
4. Add real-time Socket.IO for instant message delivery

---

**Remember:** This file governs **how we work together**. For **what we're building**, see the technical docs referenced above.
