# Architectural Decisions

## 1. app-registry.ts is the single source of truth

All product names, colors, prices, icons, routes, and bundle membership are defined in `client/src/config/app-registry.ts`. Any code that needs product data should import from this file rather than hardcoding values.

## 2. AppName is the only way to render app names

The `AppName` component (`client/src/components/app-name.tsx`) is the canonical way to display a product name with its icon, color, and optional description. All menus, cards, headers, and landing pages should use this component instead of manually styling app names.
