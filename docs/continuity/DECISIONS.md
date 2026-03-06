# Architectural Decisions

## 1. app-registry.ts is the single source of truth

All product names, colors, prices, icons, routes, and bundle membership are defined in `client/src/config/app-registry.ts`. Any code that needs product data should import from this file rather than hardcoding values.

## 2. AppName is the only way to render app names

The `AppName` component (`client/src/components/app-name.tsx`) is the canonical way to display a product name with its icon, color, and optional description. All menus, cards, headers, and landing pages should use this component instead of manually styling app names.

## 3. Header menus consume app-registry.ts exclusively

As of Prompt 2, `header.tsx` and `navigation-config.ts` source all product data (names, colors, prices, icons, routes) from `app-registry.ts`. No hardcoded product data remains in menu code. Slash app grids use `APP_REGISTRY.map()` and `getAppsByBundle()` loops so adding/changing an app in the registry automatically propagates to all menus.

## 4. Old wordmark image imports removed from header

All `*Wordmark` imports (commverseWordmark, localblueWordmark, sendWordmark, inboxWordmark, livechatWordmark, contentWordmark, listingsWordmark, reputationWordmark) and old badge/icon imports (badge1-5, listingsIcon, reputationIcon, sendIcon, etc.) have been removed from `header.tsx`. Product names render as live text via `AppName`/`BundleHeader` components.

## 5. App names always rendered as live text, never as images

All app name rendering uses the `AppName` component or inline styled text matching registry colors. No wordmark PNGs are used for app names anywhere in the site.

## 6. / connect tier renamed from "Performance" to "Unlimited"

The paid tier of / connect CRM is "Unlimited" ($29/mo, unlimited contacts). The registry defines this in `CONNECT_CRM.tiers`.

## 7. Coach Blue loyalty pricing

Coach Blue uses tiered loyalty pricing based on active bundles:
- $99/mo standalone
- $59/mo with one active bundle (LocalBlue or CommVerse)
- FREE with both bundles active

## 8. Bundle prices: $99/mo each

Both LocalBlue and CommVerse bundles are $99/mo. This is defined in `BUNDLE_REGISTRY` and must not be hardcoded elsewhere.

## 9. All app colors updated to final values

Every app color is defined in `app-registry.ts` and must not be hardcoded in page files. Key corrections applied across the codebase:
- / promote: #1844A6 (was #E6B747)
- / respond: #6EA6FF (was #0080FF)
- / post: #FF44CC (was #FC6ACD or #EF4444)
- / publish: #064A6C (was #FF0040)
- / elevate: #E9B307 (was #D59600)
- CommVerse bundle: #F97316 (was #FC6ACD or #00FF40)

## 10. menu-config.ts defines menu STRUCTURE, app-registry.ts defines DATA

`client/src/config/menu-config.ts` owns all menu layout: nav items, How It Works steps text, Solutions grid, Resources columns. Product data (names, colors, prices, icons) comes exclusively from `app-registry.ts` via imports. This separation means menu restructuring never touches product data, and product changes never touch menu layout.

## 11. PricingLayout is the shared pricing component

`client/src/components/pricing-layout.tsx` renders the full pricing grid (Digital IQ → Connect + Coach Blue → LocalBlue → CommVerse → Full Picture). Used by both the Products mega menu (`variant="menu"`) and `/pricing` page (`variant="page"`). All data from registry, all names via `AppName`/`BundleHeader`.

## 12. Image asset organization

Active images live in `attached_assets/` subdirectories:
- `icons/` — SVG utility icons for menus/UI
- `brand/` — BusinessBlueprint logos, favicons, Coach Blue icon
- `platforms/` — HostsBlue, SwipesBlue, ConsoleBlue, ScansBlue assets
- `app-icons/` — Old app icons/logos still used by non-registry components
- `new logos and wordmarks/` — Current app icons imported by app-registry.ts (DO NOT MOVE)

Unused images archived in `attached_assets/archived_2026_03/`.
