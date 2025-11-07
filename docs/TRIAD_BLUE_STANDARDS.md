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

### Main Header (OFFICIAL STANDARD - NO CHANGES WITHOUT OWNER APPROVAL)
**⚠️ As of November 2025, this is the UNCHANGEABLE navigation structure:**

1. **How It Works** - 5-step journey with prescription highlight
2. **Pricing** - Base Plans + Execution Styles + Marketplace  
3. **Applications** - Commverse Bundle + individual apps
4. **Solutions** - BusinessBlueprint, HostsBlue, SwipesBlue platforms
5. **Resources** - Learn, Platforms, Developers columns

**Plus:** Login button (far right)

### Client Portal Sidebar
Fixed order, same navItems desktop/mobile.

### Commverse Apps
Lowercase paths only: `/send`, `/inbox`, `/content`, `/livechat`  

---

## 🧩 Icons and Imagery
- Vector SVG only (no raster text images)  
- Standard stroke weights across brands  
- Consistent shadow direction (315°)  
- Approved iconography: megaphone, blueprint, swoosh, compass, cloud  

### Official 5-Step Journey Icons (LOCKED - DO NOT CHANGE)
**⚠️ These icons are permanently assigned and cannot be used for any other purpose:**

1. **ClipboardCheck** (Orange #F97316) - Complete your digital assessment
2. **FileText** (Yellow #EAB308) - Get your prescribed blueprint
3. **Layers** (Blue #3B82F6) - Choose your base plan
4. **Wrench** (Purple #A855F7) - Select your build method
5. **Rocket** (Green #22C55E) - Start to Build

**Implementation:** Each icon uses a light background tint (10% opacity) with the icon at 20px (w-5 h-5) inside a 32px rounded container.

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
