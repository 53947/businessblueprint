# businessblueprint.io — Claude Code Instructions
# Project-specific rules. Global rules in ~/.claude/CLAUDE.md apply to every session.

## WHAT THIS IS

businessblueprint.io — business growth / local SEO platform with apps.
90% complete. Priority platform for revenue generation.

## TECHNICAL STACK

  Frontend: React + TypeScript + Tailwind + shadcn/ui
  Backend: Node.js + Express + Drizzle ORM + PostgreSQL
  Auth: Replit Auth + magic link passwordless login
  Schema: shared/schema.ts (50+ tables)
  Routes: server/routes.ts + server/routes/crm.ts

## SINGLE SOURCES OF TRUTH

  app-registry.ts  — all pricing, colors, app configuration
  menu-config.ts   — all navigation structure
  AppName component — renders app icon + / + appname + subtitle

Read these before writing anything that touches app names, colors, or pricing.

## SUITE STRUCTURE — SUITES NEVER CROSS-POLLINATE

Compass Suite — $99/mo
  / promote — Email campaigns (#1844A6)
  / engage — LiveChat widget (#660099)
  / respond — Unified inbox (#001882)
  / post — Social media management (#FF44CC)

Anchor Suite — $99/mo (#2073E3)
  / elevate — Reviews (#E9B307)
  / optimize — SEO monitoring (#374151)
  / publish — Listings management (#064A6C)
  / amplify — Advertising (#97ACCA)

/ connect CRM — Always standalone, NEVER bundled
  FREE: 100 contacts | $29/mo Unlimited

Each app: $29/mo standalone outside a suite.

Coach Blue — AI business coach
  $99/mo standalone | $59/mo with one suite | FREE with both suites
  Icon: always face PNG (coachblue.png) — NEVER a Lucide icon
  Icon files: attached_assets/brand/coachblue*.png

## APP ICONS

All apps use Lucide React icons except Coach Blue (face PNG).
  / promote — Mail | / respond — Inbox | / engage — MessageCircle
  / post — Share2 | / publish — BookOpen | / elevate — Star
  / optimize — Target | / amplify — Megaphone | / connect — Users
  / assess — Lightbulb | / scan — ScanLine

## DO NOT TOUCH WITHOUT EXPLICIT INSTRUCTION

  Payment system (SwipesBlue integration)
  Authentication system
  Admin panel
  Database schema (shared/schema.ts)
  ScansBlue assessment flow
  Any server-side code not explicitly listed in the prompt
  Coach Blue face PNG icons
  Any component structure or layout not explicitly listed in the prompt
