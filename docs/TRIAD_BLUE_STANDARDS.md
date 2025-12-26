# TriadBlue Standards & Design System  
**Version 2.0 — November 2025**

---

## 📘 Overview
All TriadBlue brands share one visual and interaction system.  
No developer may deviate from these rules without explicit approval.

---

## 🎨 Branding
Refer to `_constants.md` for canonical colors and typography.

### Official Logo (UPDATED NOV 2025)
- **Main Header Logo:** Image-based `BBlueprint Main Header Logo_1762489845362.png`
  - Lightbulb icon: Orange (#FF6B00) outer ring + Blue (#0000FF) interior with grid pattern
  - Text: "business" (orange) + "blueprint" (blue) + ".io" (green #00FF00)
  - Used in navigation header and all main branding
- **Favicon:** `Blueprint_Favicon_1762489845363.png` (lightbulb icon only)
- **Location:** Stored in `attached_assets/`, imported via `@assets/` alias
- **Implementation:** See `client/src/components/brand-logo.tsx`

### Typography
All wordmarks use Archivo family, 24 pt, 2 pt blur, 10 pt distance @ 315°.  

**Gradient:** 315° (EEFBFF → 6EA6FF → 0000FF)  
**Black:** #09080E  

---

## 🧭 Platform Model & Plans

**Platform Model:** BusinessBlueprint is a **DIY-only platform** powered by **Coach Blue** (AI Business Coach).

**Base Plans:** Start (Orange) / Advanced (Blue) / Scale (Green)

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

### Brand Icons (LOCKED - DO NOT CHANGE)
**⚠️ These brand icons are the official visual identity for key products/concepts:**

All brand icons follow the same style:
- **Primary Color:** TriadBlue (#0000FF) for head silhouette
- **Accent Color:** Vivid Orange (#FF6B00) for internal symbols
- **File Location:** `client/src/components/brand-icons.tsx`

**The 6 Official Brand Icons:**
1. **DigitalIQIcon** - Head with "IQ" text + brain gears
2. **CommverseIcon** - Head with 4 connected app nodes (grid pattern)
3. **CoachBlueIcon** - Head with compass/guidance symbol
4. **BasePlanIcon** - Head with stacked tier layers
5. **ActionPlanIcon** - Head with calendar + checkmarks
6. **BuildMethodIcon** - Head with crossed wrench + hammer

**Usage Rules:**
- Import from `@/components/brand-icons`
- Default size: 64px (customizable via `size` prop)
- Can add custom className for positioning/spacing
- Icons are SVG React components for sharp rendering at any size
- Do NOT modify SVG paths without owner approval
- These replace all PNG/raster versions

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
