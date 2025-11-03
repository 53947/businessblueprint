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

### Navigation Structure (UNCHANGEABLE)
**Main Header:** Applications | Solutions | Pricing | Login  
**Commverse apps:** `/send`, `/inbox`, `/content`, `/livechat` (all lowercase)

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

| Document | Location | Purpose |
|----------|----------|---------|
| **README.md** | `/` (root) | Public-facing project summary |
| **replit.md** | `/` (root) | This file — behavioral & governance rules |
| **TRIAD_BLUE_STANDARDS.md** | `/docs/` | Design & branding standards |
| **ARCHITECTURE.md** | `/docs/` | Technical structure & system design |
| **_constants.md** | `/docs/` | Brand constants (colors, fonts, values) |
| **STATUS_REPORT.md** | `/` (root) | Running operational log |
| **GITHUB_ISSUES_TO_CREATE.md** | `/` (root) | Issue templates & backlog |

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

**Remember:** This file governs **how we work together**. For **what we're building**, see the technical docs referenced above.
