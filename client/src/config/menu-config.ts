// client/src/config/menu-config.ts
// SINGLE SOURCE OF TRUTH for all menu structure.
// header.tsx, mobile menu, and any future menu component imports from here.
// Product data comes from app-registry.ts. This file defines LAYOUT and SECTIONS.

import {
  APP_REGISTRY, BUNDLE_REGISTRY, CONNECT_CRM, COACH_BLUE, DIGITAL_IQ,
  HOW_IT_WORKS_STEPS, SCANNING_TOOL, getAppsByBundle,
} from "@/config/app-registry";

// ── Platform icons (non-registry) ──
import blueprintIcon from "@assets/images_logos/bb-favicon.png";
import hostsBlueIcon from "@assets/images_logos/hostsblue-brandmark.png";
import swipesBlueIcon from "@assets/images_logos/swipesblue-brandmark.png";
import consoleBlueIcon from "@assets/images_logos/consoleblue-favicon.png";
import scansBlueIcon from "@assets/images_logos/scansblue-icon.png";
import businessIQScannerIcon from "@assets/images_logos/business-iq-scanner.png";

// ── Lucide icon name strings (rendered via ICON_MAP in app-name.tsx) ──
const compassIcon = "Layers";
const bookOpenIcon = "BookOpen";
const shoppingBasketIcon = "ShoppingBasket";
const lightbulbIcon = "Lightbulb";
const graduationCapIcon = "GraduationCap";
const codeIcon = "Code";
const helpCircleIcon = "HelpCircle";
const fileTextIcon = "FileText";
const videoIcon = "Video";
const usersIcon = "Users";
const messageSquareIcon = "MessageSquare";
const trendingUpIcon = "TrendingUp";
const logInIcon = "LogIn";
const settingsIcon = "Settings";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
  href: string;
  testId: string;
  icon: string;
  borderColor: string;
}

export interface PlatformEntry {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
  borderColor: string;
  testId: string;
}

export interface ResourceLink {
  label: string;
  description: string;
  href: string;
  icon: string;
  testId: string;
}

export interface ResourceColumn {
  title: string;
  icon: string;
  items: ResourceLink[];
}

// ─────────────────────────────────────────────
// NAV_ITEMS — top-level nav labels
// ─────────────────────────────────────────────

export const NAV_ITEMS = [
  { label: "How It Works", icon: compassIcon, testId: "menu-trigger-how-it-works" },
  { label: "Products", icon: shoppingBasketIcon, testId: "menu-trigger-products" },
  { label: "Solutions", icon: lightbulbIcon, testId: "menu-trigger-solutions" },
  { label: "Resources", icon: bookOpenIcon, testId: "menu-trigger-resources" },
] as const;

// ─────────────────────────────────────────────
// HOW IT WORKS MENU
// ─────────────────────────────────────────────

export const HOW_IT_WORKS_MENU: {
  title: string;
  description: string;
  steps: HowItWorksStep[];
  ctaText: string;
  ctaHref: string;
} = {
  title: "A Blueprint to Your Growth",
  description: "Six steps. One platform. Everything your local business needs to get found, get trusted, and get customers.",
  ctaText: "Start Your Blueprint Assessment →",
  ctaHref: "/assessment",
  steps: [
    {
      number: 1,
      title: "Scan Your Digital Presence",
      description: "See what the internet sees.",
      href: "/assessment",
      testId: "link-step1",
      icon: HOW_IT_WORKS_STEPS[0].icon,
      borderColor: "#A00028",
    },
    {
      number: 2,
      title: "Get Your Custom Blueprint",
      description: "Your prescription. Not a template.",
      href: "#",
      testId: "link-step2",
      icon: HOW_IT_WORKS_STEPS[1].icon,
      borderColor: "#FFC107",
    },
    {
      number: 3,
      title: "Build Your Foundation",
      description: "Everything connects through here.",
      href: "/connect",
      testId: "link-step3",
      icon: HOW_IT_WORKS_STEPS[2].icon,
      borderColor: "#008060",
    },
    {
      number: 4,
      title: "Own Your Local Presence",
      description: "Google. D&B. Every directory.",
      href: "/anchor",
      testId: "link-step4",
      icon: HOW_IT_WORKS_STEPS[3].icon,
      borderColor: "#064A6C",
    },
    {
      number: 5,
      title: "Activate Your Communications",
      description: "Every channel. One inbox.",
      href: "/compass",
      testId: "link-step5",
      icon: HOW_IT_WORKS_STEPS[4].icon,
      borderColor: "#F97316",
    },
    {
      number: 6,
      title: "Never Grow Alone",
      description: "Your coach. Always on.",
      href: "/coach-blue",
      testId: "link-step6",
      icon: HOW_IT_WORKS_STEPS[5].icon,
      borderColor: "#0000FF",
    },
  ],
};

// ─────────────────────────────────────────────
// SOLUTIONS MENU
// ─────────────────────────────────────────────

const PLATFORMS: PlatformEntry[] = [
  { id: "businessblueprint", name: "businessblueprint.io", description: "Digital Intelligence", href: "/", icon: blueprintIcon, borderColor: "#FF6B00", testId: "link-solution-businessblueprint" },
  { id: "hostsblue", name: "HostsBlue", description: "Web Services", href: "#hostsblue", icon: hostsBlueIcon, borderColor: "#8000FF", testId: "link-solution-hostsblue" },
  { id: "swipesblue", name: "SwipesBlue", description: "Payment Gateway", href: "#swipesblue", icon: swipesBlueIcon, borderColor: "#FF0040", testId: "link-solution-swipesblue" },
  { id: "consoleblue", name: "ConsoleBlue", description: "Admin Console", href: "#consoleblue", icon: consoleBlueIcon, borderColor: "#0000FF", testId: "link-solution-consoleblue" },
  { id: "scansblue", name: "ScansBlue", description: "Site Analysis", href: "#scansblue", icon: scansBlueIcon, borderColor: "#0000FF", testId: "link-solution-scansblue" },
];

const PRODUCT_ENTRIES: PlatformEntry[] = [
  { id: "coachblue", name: COACH_BLUE.name, description: COACH_BLUE.description, href: "/coach-blue", icon: COACH_BLUE.icon, borderColor: COACH_BLUE.color, testId: "link-solution-coach-blue" },
  { id: "digitaliq", name: DIGITAL_IQ.name, description: DIGITAL_IQ.description, href: DIGITAL_IQ.route, icon: DIGITAL_IQ.icon, borderColor: DIGITAL_IQ.color, testId: "link-solution-digital-iq" },
  { id: "scanner", name: "Business IQ Scanner", description: "Digital Footprint Analysis", href: "/assessment", icon: businessIQScannerIcon, borderColor: "#0000FF", testId: "link-solution-business-iq-scanner" },
  { id: "connect", name: `/ ${CONNECT_CRM.name}`, description: CONNECT_CRM.description, href: "/connect", icon: CONNECT_CRM.icon, borderColor: CONNECT_CRM.color, testId: "link-solution-connect" },
];

export const SOLUTIONS_MENU = {
  platforms: PLATFORMS,
  products: PRODUCT_ENTRIES,
  // Slash apps come from APP_REGISTRY directly — consumed in header.tsx via loop
};

// ─────────────────────────────────────────────
// RESOURCES MENU
// ─────────────────────────────────────────────

export const RESOURCES_MENU: {
  columns: ResourceColumn[];
  cta: { label: string; description: string; href: string };
} = {
  columns: [
    {
      title: "Learn",
      icon: graduationCapIcon,
      items: [
        { label: "Getting Started Guide", description: "5-step digital growth journey", href: "/journey", icon: compassIcon, testId: "link-resources-journey" },
        { label: "Success Stories", description: "Real results from businesses", href: "/about", icon: trendingUpIcon, testId: "link-resources-success" },
        { label: "Video Tutorials", description: "Step-by-step walkthroughs", href: "/biif", icon: videoIcon, testId: "link-resources-biif" },
        { label: "Knowledge Base", description: "How our platform works", href: "/knowledge-base", icon: bookOpenIcon, testId: "link-resources-knowledge-base" },
      ],
    },
    {
      title: "Developers",
      icon: codeIcon,
      items: [
        { label: "/ promote API Docs", description: "Email & SMS API reference", href: "/api-docs", icon: fileTextIcon, testId: "link-resources-api" },
        { label: "/ respond API Docs", description: "Unified communications API", href: "/api-docs", icon: fileTextIcon, testId: "link-resources-respond-api" },
        { label: "/ post API Docs", description: "Social media posting API", href: "/api-docs", icon: fileTextIcon, testId: "link-resources-post-api" },
        { label: "/ engage Installation", description: "Widget integration guide", href: "/engage/install", icon: codeIcon, testId: "link-resources-engage-install" },
        { label: "Site Map", description: "Complete navigation", href: "/sitemap", icon: compassIcon, testId: "link-resources-sitemap" },
      ],
    },
    {
      title: "Support",
      icon: helpCircleIcon,
      items: [
        { label: "Help Center", description: "Get answers & support", href: "/contact", icon: messageSquareIcon, testId: "link-resources-help" },
        { label: "Live Demo", description: "Try our live chat", href: "/engage/demo", icon: messageSquareIcon, testId: "link-resources-demo" },
        { label: "Client Portal", description: "Manage your account", href: "/portal", icon: usersIcon, testId: "link-resources-portal" },
        { label: "Admin Login", description: "Owner & staff access", href: "/api/login?redirect=/admin", icon: logInIcon, testId: "link-resources-admin-login" },
      ],
    },
  ],
  cta: {
    label: "Need personalized guidance?",
    description: "Talk to our digital growth experts",
    href: "/contact",
  },
};

// Re-export for convenience
export { APP_REGISTRY, BUNDLE_REGISTRY, CONNECT_CRM, COACH_BLUE, DIGITAL_IQ, SCANNING_TOOL, getAppsByBundle };
export { blueprintIcon, hostsBlueIcon, swipesBlueIcon, consoleBlueIcon, scansBlueIcon, settingsIcon };
