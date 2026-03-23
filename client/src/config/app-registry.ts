// App Registry — Single source of truth for all product data
// Every menu, page, card, and landing page should reference this file.

// ── Slash App Icons ──
import publishIcon from "@assets/new logos and wordmarks/: publish icon.png";
import elevateIcon from "@assets/new logos and wordmarks/: elevate icon.png";
import optimizeIcon from "@assets/new logos and wordmarks/: optimize icon.png";
import promoteIcon from "@assets/new logos and wordmarks/: promote icon.png";
import respondIcon from "@assets/new logos and wordmarks/: respond icon.png";
import engageIcon from "@assets/new logos and wordmarks/: engage icon.png";
import postIcon from "@assets/new logos and wordmarks/: post icon.png";
import connectIcon from "@assets/new logos and wordmarks/: connect icon.png";
// TODO: Replace with actual amplify icon when available
import amplifyIcon from "@assets/new logos and wordmarks/: promote icon.png";

// ── Bundle Icons ──
import anchorIcon from "@assets/new logos and wordmarks/localblue Brandmark icon.png";
import compassIcon from "@assets/new logos and wordmarks/: commverse icon.png";

// ── Other Product Icons ──
import coachBlueIcon from "@assets/new logos and wordmarks/4step-AI Business Coach step- Coach Blue.png";
import digitalIQIcon from "@assets/new logos and wordmarks/Digitla IQ.png";
import scanningToolIcon from "@assets/new logos and wordmarks/scanning tool.png";

// ── How It Works Step Icons ──
import step1Icon from "@assets/new logos and wordmarks/1step-Assessment.png";
import step2Icon from "@assets/new logos and wordmarks/2step-Prescription.png";
import step3Icon from "@assets/new logos and wordmarks/3step-localblue.png";
import step4Icon from "@assets/new logos and wordmarks/4step-AI Business Coach step- Coach Blue.png";
import step5Icon from "@assets/new logos and wordmarks/5step-commverse.png";

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
    description: "Business Listings Manager",
    icon: publishIcon,
    landingRoute: "/publish-landing",
    dashboardRoute: "/publish-app",
    standalonePrice: 29,
    bundlePrice: 24.75,
    bundleId: "anchor",
    isSlashApp: true,
  },
  {
    id: "elevate",
    name: "elevate",
    color: "#E9B307",
    description: "Reputation & Reviews Manager",
    icon: elevateIcon,
    landingRoute: "/elevate-landing",
    dashboardRoute: "/elevate-app",
    standalonePrice: 29,
    bundlePrice: 24.75,
    bundleId: "anchor",
    isSlashApp: true,
  },
  {
    id: "optimize",
    name: "optimize",
    color: "#374151",
    description: "SEO Health Monitor",
    icon: optimizeIcon,
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
    description: "Email Campaign Manager",
    icon: promoteIcon,
    landingRoute: "/promote",
    dashboardRoute: "/promote-app",
    standalonePrice: 29,
    bundlePrice: 24.75,
    bundleId: "compass",
    isSlashApp: true,
  },
  {
    id: "respond",
    name: "respond",
    color: "#001882",
    description: "Unified Multi-Channel Inbox",
    icon: respondIcon,
    landingRoute: "/respond",
    dashboardRoute: "/respond-app",
    standalonePrice: 29,
    bundlePrice: 24.75,
    bundleId: "compass",
    isSlashApp: true,
  },
  {
    id: "engage",
    name: "engage",
    color: "#660099",
    description: "Live Chat Widget",
    icon: engageIcon,
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
    description: "Social Media Manager",
    icon: postIcon,
    landingRoute: "/post-landing",
    dashboardRoute: "/post",
    standalonePrice: 29,
    bundlePrice: 24.75,
    bundleId: "compass",
    isSlashApp: true,
  },
  {
    id: "amplify",
    name: "amplify",
    color: "#6EA6FF",
    description: "Advertising Platform",
    icon: amplifyIcon,
    landingRoute: "/amplify-landing",
    dashboardRoute: "/amplify",
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
    color: "#0000FF",
    icon: anchorIcon,
    price: 99,
    appIds: ["publish", "elevate", "optimize", "amplify"],
    description: "Local SEO & Reputation Bundle",
  },
  {
    id: "compass",
    name: "Compass Suite",
    color: "#F97316",
    icon: compassIcon,
    price: 99,
    appIds: ["promote", "respond", "engage", "post"],
    description: "Communication & Marketing Bundle",
  },
];

export const CONNECT_CRM: ConnectConfig = {
  id: "connect",
  name: "connect",
  color: "#008060",
  icon: connectIcon,
  isSlashApp: true,
  tiers: [
    { name: "Starter", price: 0, contactLimit: 250 },
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
  standalonePrice: 99,
  withOneBundlePrice: 59,
  withBothBundlesPrice: 0,
  description: "Personal AI Business Coach",
};

export const DIGITAL_IQ: DigitalIQConfig = {
  id: "digitaliq",
  name: "Digital IQ",
  color: "#A00028",
  icon: digitalIQIcon,
  isSlashApp: false,
  route: "/assessment",
  price: 0,
  description: "Digital IQ Assessment Tool",
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  { step: 1, title: "Assessment", icon: step1Icon },
  { step: 2, title: "Prescription", icon: step2Icon },
  { step: 3, title: "Anchor Suite", icon: step3Icon },
  { step: 4, title: "Coach Blue", icon: step4Icon },
  { step: 5, title: "Compass Suite", icon: step5Icon },
];

export const SCANNING_TOOL: ScanningToolConfig = {
  id: "scansblue",
  name: "ScansBlue",
  icon: scanningToolIcon,
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
