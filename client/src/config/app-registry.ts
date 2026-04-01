// App Registry — Single source of truth for all product data
// Every menu, page, card, and landing page should reference this file.
// Icons use Lucide React icon name strings. Rendered via AppIcon component.

// Coach Blue keeps his custom PNG icon
import coachBlueIcon from "@assets/images_logos/coachblue48.png";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface SlashApp {
  id: string;
  name: string;
  color: string;
  description: string;
  icon: string;
  landingRoute: string;
  dashboardRoute: string;
  standalonePrice: number;
  bundlePrice: number;
  bundleId: "anchor" | "compass";
  isSlashApp: true;
}

export interface BundleConfig {
  id: string;
  name: string;
  color: string;
  icon: string;
  price: number;
  appIds: string[];
  description: string;
}

export interface CoachBlueConfig {
  id: string;
  name: string;
  color: string;
  icon: string;
  isSlashApp: false;
  isPngIcon: true;
  standalonePrice: number;
  withOneBundlePrice: number;
  withBothBundlesPrice: number;
  description: string;
}

export interface DigitalIQConfig {
  id: string;
  name: string;
  color: string;
  icon: string;
  isSlashApp: false;
  route: string;
  price: number;
  description: string;
}

export interface ConnectConfig {
  id: string;
  name: string;
  color: string;
  icon: string;
  isSlashApp: true;
  tiers: { name: string; price: number; contactLimit: number | null }[];
  description: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  icon: string;
}

export interface ScanningToolConfig {
  id: string;
  name: string;
  icon: string;
}

// ─────────────────────────────────────────────
// Registries
// ─────────────────────────────────────────────

export const APP_REGISTRY: SlashApp[] = [
  {
    id: "publish",
    name: "publish",
    color: "#064A6C",
    description: "Business Listings",
    icon: "BookOpen",
    landingRoute: "/publish",
    dashboardRoute: "/publish/dashboard",
    standalonePrice: 29,
    bundlePrice: 24.75,
    bundleId: "anchor",
    isSlashApp: true,
  },
  {
    id: "elevate",
    name: "elevate",
    color: "#E9B307",
    description: "Reviews & Ratings",
    icon: "Star",
    landingRoute: "/elevate",
    dashboardRoute: "/elevate/dashboard",
    standalonePrice: 29,
    bundlePrice: 24.75,
    bundleId: "anchor",
    isSlashApp: true,
  },
  {
    id: "optimize",
    name: "optimize",
    color: "#374151",
    description: "Website SEO",
    icon: "Target",
    landingRoute: "/optimize",
    dashboardRoute: "/optimize/dashboard",
    standalonePrice: 29,
    bundlePrice: 24.75,
    bundleId: "anchor",
    isSlashApp: true,
  },
  {
    id: "promote",
    name: "promote",
    color: "#1844A6",
    description: "Email & SMS Campaigns",
    icon: "Mail",
    landingRoute: "/promote",
    dashboardRoute: "/promote/dashboard",
    standalonePrice: 29,
    bundlePrice: 24.75,
    bundleId: "compass",
    isSlashApp: true,
  },
  {
    id: "respond",
    name: "respond",
    color: "#001882",
    description: "Unified Mailbox",
    icon: "Inbox",
    landingRoute: "/respond",
    dashboardRoute: "/respond/dashboard",
    standalonePrice: 29,
    bundlePrice: 24.75,
    bundleId: "compass",
    isSlashApp: true,
  },
  {
    id: "engage",
    name: "engage",
    color: "#660099",
    description: "Live Chat",
    icon: "MessageCircle",
    landingRoute: "/engage",
    dashboardRoute: "/engage/dashboard",
    standalonePrice: 29,
    bundlePrice: 24.75,
    bundleId: "compass",
    isSlashApp: true,
  },
  {
    id: "post",
    name: "post",
    color: "#FF44CC",
    description: "Social Media",
    icon: "Share2",
    landingRoute: "/post",
    dashboardRoute: "/post/dashboard",
    standalonePrice: 29,
    bundlePrice: 24.75,
    bundleId: "compass",
    isSlashApp: true,
  },
  {
    id: "amplify",
    name: "amplify",
    color: "#97ACCA",
    description: "Digital Advertising",
    icon: "Megaphone",
    landingRoute: "/amplify",
    dashboardRoute: "/amplify/dashboard",
    standalonePrice: 29,
    bundlePrice: 24.75,
    bundleId: "anchor",
    isSlashApp: true,
  },
];

export const BUNDLE_REGISTRY: BundleConfig[] = [
  {
    id: "anchor",
    name: "Anchor Suite",
    color: "#2073E3",
    icon: "Anchor",
    price: 99,
    appIds: ["publish", "elevate", "optimize", "amplify"],
    description: "Local SEO & Reputation Bundle",
  },
  {
    id: "compass",
    name: "Compass Suite",
    color: "#F97316",
    icon: "Compass",
    price: 99,
    appIds: ["promote", "respond", "engage", "post"],
    description: "Communication & Marketing Bundle",
  },
];

export const CONNECT_CRM: ConnectConfig = {
  id: "connect",
  name: "connect",
  color: "#008060",
  icon: "Users",
  isSlashApp: true,
  tiers: [
    { name: "Starter", price: 0, contactLimit: 100 },
    { name: "Unlimited", price: 29, contactLimit: null },
  ],
  description: "Customer Relationship Management Tool",
};

export const COACH_BLUE: CoachBlueConfig = {
  id: "coachblue",
  name: "Coach Blue",
  color: "#0000FF",
  icon: coachBlueIcon,
  isSlashApp: false,
  isPngIcon: true,
  standalonePrice: 99,
  withOneBundlePrice: 59,
  withBothBundlesPrice: 0,
  description: "Personal AI Business Coach",
};

export const DIGITAL_IQ: DigitalIQConfig = {
  id: "digitaliq",
  name: "Digital IQ",
  color: "#A00028",
  icon: "BarChart3",
  isSlashApp: false,
  route: "/assessment",
  price: 0,
  description: "Digital IQ Assessment Tool",
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  { step: 1, title: "Scan Your Digital Presence", icon: "ClipboardCheck" },
  { step: 2, title: "Get Your Custom Blueprint", icon: "FileText" },
  { step: 3, title: "Build Your Foundation", icon: "Users" },
  { step: 4, title: "Own Your Local Presence", icon: "Anchor" },
  { step: 5, title: "Activate Your Communications", icon: "Compass" },
  { step: 6, title: "Never Grow Alone", icon: "coachblue-png" },
];

export const SCANNING_TOOL: ScanningToolConfig = {
  id: "scansblue",
  name: "ScansBlue",
  icon: "ScanLine",
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

export function getAppById(id: string): SlashApp | undefined {
  return APP_REGISTRY.find((app) => app.id === id);
}

export function getAppsByBundle(bundleId: string): SlashApp[] {
  return APP_REGISTRY.filter((app) => app.bundleId === bundleId);
}

export function getBundlePrice(bundleId: string): number {
  const bundle = BUNDLE_REGISTRY.find((b) => b.id === bundleId);
  return bundle?.price ?? 0;
}

export function getAllApps(): SlashApp[] {
  return APP_REGISTRY;
}
