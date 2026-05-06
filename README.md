# 🌐 TriadBlue Ecosystem  
### Unified Documentation, Architecture, and Brand Standards  

**Version:** 2.1  
**Last Updated:** November 1, 2025  

---

## 🧱 Overview
The **TriadBlue Ecosystem** combines three modular platforms into one connected business infrastructure:  

| Platform | Domain | Description |
|-----------|---------|-------------|
| **BusinessBlueprint** | businessblueprint.io | AI-driven digital intelligence and marketing blueprint platform |
| **HostsBlue** | hostsblue.com | Hosting, domains, and AI site builder services |
| **SwipesBlue** | swipesblue.com | Payment gateway for all TriadBlue products |

> Each operates independently but shares **authentication (SSO)** and **payment processing (SwipesBlue)**.

---

## 📘 Pre-Work Requirements
Before starting a task or editing any file:
1. **Review the following documents:**
   - [Replit Collaboration Guide](docs/replit.md)
   - [TriadBlue Standards](docs/triadblue-standards.md)
   - [System Constants](docs/_constants.md)
   - [Architecture Reference](docs/architecture.md)
2. Confirm your assigned Issue in GitHub.  
3. Post a check-in comment:  
   > “Checked constants and standards — ready to start task.”

---

## 👥 Roles & Responsibilities

| Role | Description | Key Tasks |
|------|--------------|-----------|
| **Architect** | Owns architecture & merge approval | Reviews PRs, manages dependencies, validates standards |
| **Agent** | Builds, fixes, and deploys features | Codes new modules, references GitHub Issues in commits |
| **Assistant** | Organizes data, content, menus | Maintains docs, updates copy, ensures content accuracy |

> **Rule:** No merges or edits outside assigned Issues. No one builds off the record.

---

## 🔁 Workflow

1. **Issue Created** → Task assigned  
2. **Agent Builds** → Commit with Issue ID  
3. **Architect Reviews** → Approves merge  
4. **Assistant Updates** → Docs, text, or content fixes  
5. **Main Branch** merges only through Architect

---

## ⚙️ Development Commands
```bash
# Install
npm install

# Start client
npm run dev

# Build production
npm run build



---

## 🔄 GitHub Automation & Sync Rules  
**Applies to All Contributors — Non-Negotiable**

**📘 PURPOSE:**  
GitHub is the single source of truth for all *approved* documentation, task progress, and code activity.  
Replit is your build workspace — not your ledger.

**🔁 Twice-Daily Sync (MANDATORY):**  
- **11:59 AM** → Push active commits + update `STATUS_REPORT.md`  
- **11:59 PM** → Final sync + update all open Issues  

**✅ Must Be Versioned in GitHub**
- `/README.md` — TriadBlue overview and workflow policies  
- `/docs/replit.md` — Official Replit workspace standards  
- `/docs/architecture.md` — Technical system structure  
- `/docs/_constants.md` — Brand + color definitions  
- `/docs/triadblue-standards.md` — Design + UX specifications  
- `/docs/dependencies.md` — Third-party API and package references  

**🚫 Keep Private (Do Not Push)**
- `/docs/replit_incidents.md` — Internal issue logs  
- `/docs/replit_configuration.md` — Secrets, credentials, deployment configs  
- Any `/notes/` or `/tmp/` folders  

**🧾 GitHub Issues Policy**
- Every commit must reference an Issue ID (`#24 – Fix Constants Path`)  
- No task may begin without an associated Issue  
- Close Issues only after documentation and testing are complete  

**⚙️ Auto-Sync Integration (Optional)**
- If using Replit → GitHub auto-push, verify commit message formatting and branch targeting before each deploy.  
- Use the command:  
  ```bash
  git add . && git commit -m "Docs sync: Updated replit.md (#issueID)" && git push
 # adds an empty line to README
