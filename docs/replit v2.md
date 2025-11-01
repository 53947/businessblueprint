# TriadBlue Ecosystem – Replit Workflow & Policies  
**Version 2.0 — November 2025**

---

## Overview
TriadBlue operates three independent digital platforms within a shared ecosystem:  
BusinessBlueprint.io (AI Digital Intelligence), HostsBlue.com (Web Hosting & Domains), and SwipesBlue.com (Payments).  

All development occurs within Replit projects and is tracked through GitHub Issues.  
Swipes Blue acts as the central payment processor across all platforms.  

---

## 🧭 Workflow Rules
- **Discuss first — never auto-change.**  
- **Explicit approval required** before any feature edit.  
- **Reliability > creativity.**  
- **Document every task via GitHub Issue.**

---

## 🕐 Sync Schedule
- **Twice daily:** 11:59 AM and 11:59 PM  
- Update `STATUS_REPORT.md` and relevant Issues.  
- Add entry “no updates – [date]” if no activity.  

---

## 🧱 Branding & Logo
- Fonts = Archivo Semi Expanded (first word) + Archivo (rest)  
- Same font size (24 pt)  
- Text shadows 2 pt blur / 10 pt distance @ 315°  
- No unauthorized logo changes or “improvements.”  

---

## 🧩 Navigation
Header: Applications | Solutions | Pricing | Login  
Applications = Commverse apps (`/send`, `/inbox`, `/livechat`, `/content`)  
Solutions = Business Blueprint, Hosts Blue, Swipes Blue  
Pricing = Pathways + Marketplace  

Client portal sidebar is fixed — do not modify menu order or icons.  

---

## 🧰 Environment Configuration
- NODE_ENV handled in `package.json` — never in Secrets.  
- Remove “production” secret to allow devDependencies (Vite etc.).  
- Do not rename routes or restructure folders without approval.  
- Vite assets must remain under `/assets/*` for build pipeline.  

---

## 🛠️ Architecture Snapshot
Full stack monorepo using React + TypeScript + Node + PostgreSQL (Neon).  
Real-time features via Socket.IO.  
AI services through OpenAI GPT-4o.  

Refer to `architecture.md` for expanded structure and flows.  

---

## ⚠️ Incident & Config Docs
- Internal issues → `/docs/replit_incidents.md`  
- Environment setup → `/docs/replit_configuration.md`  
*(Keep both private — never commit to public GitHub.)*  

---

## 🧩 Dependencies Summary
See `dependencies.md` for full list of frameworks and integrations.  

---

## 🧭 Standards Link
All design and UI work must comply with `triadblue-standards.md` and `_constants.md`.  

---
