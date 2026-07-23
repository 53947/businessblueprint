# Ecosystem Decisions

## App Name Brand Rule

App Name Format:
- `/` is always Triad Black #09080E
- The app name word uses the APP'S OWN accent color (not a universal purple)
- Font: Archivo Semi Expanded, weight 600
- Each app has its own color defined in app-registry.ts
- The app icon always appears immediately before the `/`
- Icon + `/` + name = complete identity. Never one without the other.

## App Colors (from app-registry.ts)

| App | Color |
|-----|-------|
| / publish | #064A6C |
| / elevate | #E9B307 |
| / optimize | #374151 |
| / promote | #1844A6 |
| / respond | #6EA6FF |
| / engage | #8000FF |
| / post | #FF44CC |
| / connect | #008060 |
| LocalBlue bundle | #0000FF |
| CommVerse bundle | #F97316 |
| Coach Blue | #A855F7 |
| Digital IQ | #A00028 |

## Pricing

### Bundles
- **LocalBlue Bundle**: $99/mo (3 apps: / publish $49/$39, / elevate $49/$39, / optimize $59/$39)
- **CommVerse Bundle**: $99/mo (4 apps: / promote $39/$29, / respond $39/$29, / engage $39/$29, / post $39/$29)
- Bundles do not cross-discount each other.

### Standalone Products
- **/ connect**: Free Starter (100 contacts), $29/mo Unlimited (never bundled, never discounted)
- **Coach Blue**: $99/mo standalone, $59/mo with 1 bundle, FREE with both bundles

### / optimize
- / optimize is a new SEO optimization app in the LocalBlue bundle.
- Color: #374151. Icon: target/bullseye with arrow.
- $59/mo standalone, $39/mo in LocalBlue bundle.

## Product Registry
All product data (names, colors, prices, icons, routes, bundle membership) is defined in `client/src/config/app-registry.ts`. This is the single source of truth. Any page that needs product data should import from this file.
