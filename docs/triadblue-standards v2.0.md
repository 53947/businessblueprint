# TriadBlue Standards & Design System  
**Version 2.0 — November 2025**

---

## 📘 Overview
All TriadBlue brands share one visual and interaction system.  
No developer may deviate from these rules without explicit approval.

---

## 🎨 Branding
Refer to `_constants.md` for canonical colors and typography.  
All wordmarks use Archivo family, 24 pt, 2 pt blur, 10 pt distance @ 315°.  

**Gradient:** 315° (EEFBFF → 6EA6FF → 0000FF)  
**Black:** #09080E  

---

## 🧭 Pathways and Plans
Pathways: Orange DIY / Blue MSP / Green ALC  
Base Plans: Start (Orange) / Advanced (Blue) / Scale (Green)  

---

## 🗂️ Navigation
**Main Header:** Applications | Solutions | Pricing | Login  
**Client Portal Sidebar:** Fixed order, same navItems desktop/mobile.  

Commverse apps = lowercase paths (`/send`, `/inbox`, `/content`, `/livechat`).  

---

## 🧩 Icons and Imagery
- Vector SVG only (no raster text images)  
- Standard stroke weights across brands  
- Consistent shadow direction (315°)  
- Approved iconography: megaphone, blueprint, swoosh, compass, cloud  

---

## 🧠 Terminology
- “Coach Blue” refers to AI Business Coach persona.  
- “Commverse” refers only to four native apps.  
- No third-party vendor names in public text.  

---

## ⚙️ Technical
- No `/assets/*` custom routes.  
- `.gitignore` must retain `dist`.  
- All constants import from `_constants.md`.  
- Update STATUS_REPORT.md twice daily (11:59 AM / PM).  

---

## 📎 File Reference
- `_constants.md` → Visual system  
- `architecture.md` → Platform structure  
- `replit.md` → Workflow rules  
- `dependencies.md` → Package audit  
