# Current State (as of 2026-03-05)

## Architecture

- **app-registry.ts** (`client/src/config/app-registry.ts`) exists as the single source of truth for all product data (names, colors, prices, icons, routes, bundle membership).
- **AppName component** (`client/src/components/app-name.tsx`) is the canonical way to render app names with correct icon, color, and styling.
- **BundleHeader component** renders bundle names (LocalBlue, CommVerse) with correct branding.

## Completed Work (Prompts 1-5)

### Menus & Navigation
- All menus (header.tsx, navigation-config.ts) refactored to consume registry
- Old wordmark PNG imports removed from header.tsx
- App names rendered as live text via AppName/BundleHeader, never as images
- Mobile menu mirrors desktop — same registry data, same loops

### Pages Updated
- **Homepage** (home.tsx): All product data from registry, correct prices and colors
- **Pricing page** (pricing.tsx): Complete rewrite from registry data
- **How It Works** (how-it-works.tsx): Registry step icons
- **All 11 landing pages**: Audited and fixed (send, respond, livechat, post, list, review, optimize, relationships, localblue, commverse, ai-coach)
- **Coach Blue** (ai-coach.tsx): Complete rewrite from 32-line stub to full landing page
- **Commverse Pricing** (commverse-pricing.tsx): All colors, prices, and links corrected
- **Marketplace** (marketplace.tsx): All addon prices corrected
- **Tour** (tour.tsx): Old app names replaced
- **Dashboard** (dashboard.tsx): LocalBlue price corrected
- **Send Dashboard** (send-dashboard.tsx): Navigation routes updated to /promote/
- **Chat Dashboard** (chat-dashboard.tsx): Title updated to / engage
- **Send API Docs** (send-api-docs.tsx): CommVerse bundle description and price corrected

### Colors Corrected
- / promote: #E6B747 → #1844A6
- / elevate: #D59600 → #E9B307
- / publish: #FF0040 → #064A6C
- / respond: #0080FF → #6EA6FF
- / post: #FC6ACD/#EF4444 → #FF44CC
- CommVerse bundle: #FF6B00/#FC6ACD → #F97316

### Prices Corrected
- CommVerse apps: $35 → $39 standalone, $29 bundle
- LocalBlue apps: publish/elevate $49/$39, optimize $59/$39
- CommVerse bundle: $119 → $99
- LocalBlue bundle: various → $99
- / connect: Starter Free, Unlimited $29/mo
- Coach Blue: $99/$59/FREE loyalty pricing

### Global Cleanup
- No old app names visible anywhere in user-facing UI
- All routes in App.tsx match registry landingRoute and dashboardRoute
- Navigation links in dashboards use correct /promote/ paths
