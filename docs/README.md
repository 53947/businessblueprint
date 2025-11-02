# TriadBlue Documentation Index  
**Last Updated:** November 2, 2025

---

## 📚 Core Documentation Hierarchy

All TriadBlue documentation follows a strict hierarchy. When conflicts arise, higher-level documents take precedence.

### 🏛️ Level 1: Foundation (Single Source of Truth)

**[_constants.md](./_constants.md)**  
The canonical source for all brand colors, typography, pathways, and visual system constants. **No other file may redefine these values.** All documents reference this file.

---

### 🎨 Level 2: Standards & Governance

**[TRIAD_BLUE_STANDARDS.md](./TRIAD_BLUE_STANDARDS.md)**  
Visual and interaction standards across all three platforms. Covers branding, navigation, icons, imagery, and terminology. **All developers must follow these rules.**

**[AI_OPERATIONS_GUIDE.md](./AI_OPERATIONS_GUIDE.md)**  
Charter defining the four AI entities (Axel, Rune, Lumen, Cyen), their roles, responsibilities, boundaries, and operational protocols. **Defines who does what.**

**[replit.md](./replit.md)**  
Workflow rules and development policies for working within Replit. Covers approval requirements, sync schedules, branding rules, navigation standards, and environment configuration. **Defines how we work.**

---

### 🏗️ Level 3: Technical Architecture

**[ARCHITECTURE.md](./ARCHITECTURE.md)**  
Complete technical architecture for the TriadBlue ecosystem. Details platform breakdown, database schemas, API integrations, authentication flows, and deployment strategies.

**[dependencies.md](./dependencies.md)**  
Comprehensive list of all packages, frameworks, and integrations used across the ecosystem.

---

### 📋 Level 4: Feature & Status Documentation

**[CONTENT_PLATFORM_STATUS.md](./CONTENT_PLATFORM_STATUS.md)**  
Status tracking for the /content social media management platform.

**[REMAINING_WORK.md](./REMAINING_WORK.md)**  
Tracking document for outstanding tasks and features.

**[STATUS_REPORT.md](../STATUS_REPORT.md)**  
Daily sync log (11:59 AM and 11:59 PM) documenting all completed features, bug fixes, and configuration changes. **Must be kept current.**

---

### 🔧 Level 5: Integration Guides

**[SEND_API_INTEGRATION_GUIDE.md](./SEND_API_INTEGRATION_GUIDE.md)**  
Technical guide for integrating with the /send messaging API.

**[SOCIAL_MEDIA_API_SETUP.md](./SOCIAL_MEDIA_API_SETUP.md)**  
Setup instructions for social media platform integrations (Facebook, Instagram, LinkedIn, X, etc.).

**[SYNUP_TESTING.md](./SYNUP_TESTING.md)**  
Testing documentation for Synup API integration.

---

## 🔍 Quick Reference

### When You Need To:

**Define a color or typography value:**  
→ Check `_constants.md` first. Never create new values without updating that file.

**Understand navigation structure:**  
→ See `TRIAD_BLUE_STANDARDS.md` section 🗂️ Navigation

**Know who can do what (AI roles):**  
→ Read `AI_OPERATIONS_GUIDE.md`

**Understand workflow and approval process:**  
→ Read `replit.md`

**See technical architecture:**  
→ Read `ARCHITECTURE.md`

**Check what features are complete:**  
→ Read `STATUS_REPORT.md` (root directory)

---

## ⚠️ Important Rules

1. **Never modify `_constants.md` without explicit approval** - It's the source of truth
2. **Read `TRIAD_BLUE_STANDARDS.md` TWICE before making UI changes** - Prevents standard violations
3. **Update `STATUS_REPORT.md` twice daily** - 11:59 AM and 11:59 PM
4. **Follow AI Operations Charter** - Each AI has defined boundaries
5. **Discuss before changing** - Never auto-fix without approval

---

## 📝 Documentation Maintenance

**Responsibility:** Lumen (Documentation Assistant) maintains this index  
**Review:** Rune (Architect) approves all structural changes  
**Execution:** Axel (Builder) implements approved updates  

**Update Frequency:**  
- This index: When new documents are added or structure changes  
- _constants.md: When brand/design system changes  
- STATUS_REPORT.md: Twice daily  
- Other docs: As needed based on feature changes
