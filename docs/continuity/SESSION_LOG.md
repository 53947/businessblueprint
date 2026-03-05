# Session Log

## 2026-03-04 — Prompt 1 of 5: App Registry + AppName Component

Created foundational files for site-wide corrections:

- `client/src/config/app-registry.ts` — Single source of truth for all product data (7 slash apps, 2 bundles, Connect CRM, Coach Blue, Digital IQ, How It Works steps, Scanning Tool). Exports types, constants, and helper functions.
- `client/src/components/app-name.tsx` — `AppName` and `BundleHeader` components for rendering app names consistently with correct icons, colors, slash prefix, and descriptions.

No existing files were modified.

## 2026-03-05 — Prompt 2 of 5: Refactor All Menus to Consume app-registry.ts

Rewrote `header.tsx` and `navigation-config.ts` so all product data comes from `app-registry.ts`:

- **navigation-config.ts** — Imports `HOW_IT_WORKS_STEPS` from registry for step icons (replacing placeholder strings).
- **header.tsx** — Removed ~40 old wordmark/icon imports, added registry imports + `AppName`/`BundleHeader` components.
  - **How It Works menu**: Registry step icons replace old badge images. Steps 3 & 5 render bundle names as styled text instead of wordmark images.
  - **Products menu**: All prices now from registry (publish $49, elevate $49, optimize $59, promote $39, respond $39, engage $39, post $39, localblue bundle $99, commverse bundle $99). All colors from registry. LocalBlue/CommVerse app grids use `getAppsByBundle()` loops with `AppName`.
  - **Solutions menu**: Slash apps rendered via `APP_REGISTRY.map()` loop with `AppName`. Non-registry platforms (BusinessBlueprint, HostsBlue, SwipesBlue, ConsoleBlue, ScansBlue) kept with existing icons.
  - **Resources menu**: Platforms column uses `APP_REGISTRY.map()` loop with `AppName`. Bundles listed from `BUNDLE_REGISTRY`.
  - **Mobile menu**: All sections mirror desktop — same registry data, same loops, same components.

Files modified: `header.tsx`, `navigation-config.ts`.

## 2026-03-05 — Prompt 3 of 5: Homepage + Pricing Page

Updated `home.tsx`, `pricing.tsx`, and `how-it-works.tsx` to consume `app-registry.ts`:

- **how-it-works.tsx** — Replaced 5 old badge imports (`badge1`-`badge5`) with `HOW_IT_WORKS_STEPS[i].icon` from registry. Both desktop and mobile sections updated.
- **home.tsx** — Removed 18 old icon/logo imports (sendIcon, sendLogo, inboxIcon, inboxLogo, livechatIcon, livechatLogo, contentIcon, contentLogo, commverseBundle, commverseIcon, localBlueLogo, heroAssessmentIcon, heroCoachIcon, blueprintToGrowthIcon, badge2-5). Added registry imports + `AppName`/`BundleHeader`.
  - **Hero steps**: Registry step icons replace old badges. Steps 3 & 5 render bundle names as styled text (`/ localblue` in #0000FF, `/ commverse` in #F97316) instead of wordmark images.
  - **CTA buttons**: `heroAssessmentIcon` → `DIGITAL_IQ.icon`, `heroCoachIcon` → `COACH_BLUE.icon`.
  - **CommVerse Bundle section**: Header uses `BundleHeader`. Individual apps use `AppName` via `getAppsByBundle("commverse").map()`. Prices corrected: $35→$39, $140→$156, $100→$99, $40→$57 savings. Color corrected: #FF6B00→#F97316.
  - **Prescription section**: Card 3 references both LocalBlue + CommVerse bundles with styled text, expanded app list.
  - **Apps Overview section**: All 4 cards use `AppName` instead of old icon+logo pairs, wrapped in `Link` to `landingRoute`.
  - **Base Plans section**: CommVerse image replaced with styled text; mentions both bundles.
  - **Platform Ecosystem**: App list expanded to include all 8 slash apps (publish, elevate, optimize, promote, respond, engage, post, connect).
- **pricing.tsx** — Complete rewrite. White background, all data from registry.
  - Section 1: Digital IQ Assessment (FREE) with flow diagram using `HOW_IT_WORKS_STEPS`.
  - Section 2: / connect CRM (Free/\$29 tiers) + Coach Blue (\$99/\$59/FREE tiers).
  - Section 3: / localblue bundle (\$99/mo, 3 apps via `getAppsByBundle`).
  - Section 4: / commverse bundle (\$99/mo, 4 apps via `getAppsByBundle`).
  - Section 5: Full Picture comparison (All Standalone vs Both Bundles + CRM, computed from registry).
  - Section 6: Pricing rules text block.

Files modified: `home.tsx`, `pricing.tsx`, `how-it-works.tsx`.
