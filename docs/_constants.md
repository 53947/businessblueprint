# 🎛️ TriadBlue System Constants (Single Source of Truth)

> This file defines every brand, color, typography, and structural constant for the TriadBlue ecosystem.  
> All other documents reference this file. No color, font, or mapping values may be re-defined elsewhere.

---

## 1️⃣ Identity & Casing

- Brand name: **TriadBlue**
- Products: **BusinessBlueprint**, **HostsBlue**, **SwipesBlue**
- Ecosystem suite: **Commverse**
- AI Business Coach: **Coach Blue**
- **App labels and URLs are lowercase**: `/send`, `/inbox`, `/content`, `/livechat`

---

## 2️⃣ Core Colors

| Token | Hex | Usage |
|---|---|---|
| **triadblue.primary** | `#0000FF` | Core ecosystem blue |
| **triadblue.black** | `#09080E` | Standard black (text, outlines, app “/”) |
| **bb.accent** | `#FF6B00` | BusinessBlueprint accent (LOCKED - vivid orange) |
| **swipes.red** | `#FF0040` | SwipesBlue accent; payments & alerts |
| **hosts.purple** | `#8000FF` | HostsBlue primary; secondary on BusinessBlueprint |
| **tld.green** | `#00FF40` | Shared green for TLDs and ALC/Scale |

---

## 3️⃣ TriadBlue Gradient (Wordmark)

- **Direction:** Left → Right (315° visual bias)  
- **Stops:**
  - Start (at “T”): `#EEFBFF`
  - Midpoint (at “D”): `#6EA6FF`
  - End (at “e”): `#0000FF`

---

## 4️⃣ Commverse App Colors

> Label format: **`[black] "/" [accent] appname`**, all lowercase.

| App | Base (slash “/”) | Accent (app name) | Notes |
|------|------------------|------------------|-------|
| **/send** | `#09080E` | `#FF6B00` | Messaging / dispatch |
| **/inbox** | `#09080E` | `#0080FF` | Communications intake |
| **/content** | `#09080E` | `#E91EBC` | Media / creative hub |
| **/livechat** | `#09080E` | `#8000FF` | Real-time support (HostsBlue purple) |

---

## 4️⃣.1 LocalBlue App Colors (PERMANENT - DO NOT CHANGE)

> **PERMANENT NAMING RULE:** Use **`/localblue`**, **`/listings`**, **`/reputation`** (lowercase, with "/" prefix). Never spell out letters. These are official apps.

| App | Base (slash "/") | Accent (app name) | Notes |
|------|------------------|------------------|-------|
| **/localblue** | `#09080E` | `#0000FF` | LocalBlue bundle - local business presence |
| **/listings** | `#09080E` | `#FF0040` | Directory sync & consistency |
| **/reputation** | `#09080E` | `#D59600` | Review response & reputation management (gold) |

**Official Branding Assets:**
- `/localblue`: Blue wordmark + blue star icon (TriadBlack & TriadBlue)
- `/listings`: Pink/red wordmark + house/magnifying glass icon (TriadBlack & #FF0040)
- `/reputation`: Gold wordmark + shield/thumbs-up icon (TriadBlue & #D59600/gold)

---

## 5️⃣ Pathways & Base Plan Mapping

### Pathways
| Pathway | Color | Hex |
|----------|--------|------|
| DIY | Orange | `#FF6B00` |
| MSP | Blue | `#0000FF` |
| ALC (A la Carte) | Green | `#00FF40` |

### Base Plans
| Plan | Color | Hex |
|-------|--------|------|
| Start | Orange | `#FF6B00` |
| Advanced | Blue | `#0000FF` |
| Scale | Green | `#00FF40` |

**Color order rule:** Always **Orange → Blue → Green**

### Primary CTA - Blueprint to Your Growth
| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| **Blueprint to Your Growth** | Dark Red | `#A00028` | Primary CTA color (replaces orange duplicates) |

### 5-Step Journey Icons (LOCKED - DO NOT CHANGE)
| Step | Icon | Color | Hex | Action |
|------|------|-------|-----|---------|
| 1 | Blueprint to Your Growth (Lightbulb) | Dark Red | `#A00028` | Blueprint to Your Growth assessment |
| 2 | FileText | Yellow | `#EAB308` | Get your prescribed blueprint |
| 3 | Layers | Blue | `#3B82F6` | Choose your base plan |
| 4 | Wrench | Purple | `#A855F7` | Select your build method |
| 5 | Rocket | Green | `#22C55E` | Start to Build |

**⚠️ CRITICAL:** These icon assignments are permanent. They cannot be changed or used for any other purpose.

---

## 6️⃣ Typography & Shadows

| Element | Font | Size | Color | Shadow |
|----------|------|------|--------|---------|
| 1st word (e.g., *Business*) | Archivo Semi Expanded | 24 pt | `#FFA500` | 2 pt blur, 10 pt distance @ 315° |
| 2nd word (e.g., *Blueprint*) | Archivo | 24 pt | `#0000FF` | 2 pt blur, 10 pt distance @ 315° |
| 3rd word (TLD) | Archivo | 24 pt | `#00FF40` | 2 pt blur, 10 pt distance @ 315° |

All three words share identical size, baseline, and alignment.

---

## 7️⃣ Navigation Rules

- **Marketplace** → lives under **Pricing**; never a top-level item.  
- **Commverse** → exactly 4 apps: `/send`, `/inbox`, `/content`, `/livechat` (all lowercase).  
- **Coach Blue** → referenced in copy; **not** a pathway.

---

## 8️⃣ White-Label Policy

- Never expose or reference external vendors in public materials.  
- Internal references use: **“Base Plan Provider”** or **“Platform API Source.”**

---

## 9️⃣ Canonical Technical Rules

| Rule | Directive |
|------|------------|
| Routing | 🚫 Do **not** create `/assets/*` routes — reserved by Vite |
| .gitignore | Must exclude `.env`, `.env.*`, `node_modules/`; must **not** exclude `dist/` |
| Color order | Always **Orange → Blue → Green** |
| Currency format | `$99/mo`, `$299/mo`, etc. |
| Apps | lowercase in UI and URLs |
| PWA/Mobile | **TBD** (owner to be assigned) |

---

## 🔖 Version Control

- This file supersedes any conflicting values elsewhere.  
- Update this file **first**, then commit references.  
- **Last updated:** YYYY-MM-DD
