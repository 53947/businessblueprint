// client/src/config/menu-config.ts
// SINGLE SOURCE OF TRUTH for all menu structure.
// header.tsx, mobile menu, and any future menu component imports from here.
// Product data comes from app-registry.ts. This file defines LAYOUT and SECTIONS.

import {
  APP_REGISTRY, BUNDLE_REGISTRY, CONNECT_CRM, COACH_BLUE, DIGITAL_IQ,
  HOW_IT_WORKS_STEPS, SCANNING_TOOL, getAppsByBundle,
} from "@/config/app-registry";

// ── Platform icons (non-registry) ──
import blueprintIcon from "@assets/brand/bb-favicon.png";
import hostsBlueIcon from "@assets/platforms/hostsblue-brandmark.png";
import swipesBlueIcon from "@assets/platforms/swipesblue-brandmark.png";
import consoleBlueIcon from "@assets/platforms/consoleblue-favicon.png";
import scansBlueIcon from "@assets/platforms/scansblue-icon.png";
import businessIQScannerIcon from "@assets/platforms/business-iq-scanner.png";

// ── SVG utility icons ──
import compassIcon from "@assets/icons/layers.svg";
import bookOpenIcon from "@assets/icons/book-open.svg";
import shoppingBasketIcon from "@assets/icons/shopping-basket.svg";
import lightbulbIcon from "@assets/icons/lightbulb.svg";
import graduationCapIcon from "@assets/icons/graduation-cap.svg";
import codeIcon from "@assets/icons/code.svg";
import helpCircleIcon from "@assets/icons/help-circle.svg";
import fileTextIcon from "@assets/icons/file-text.svg";
import videoIcon from "@assets/icons/video.svg";
import usersIcon from "@assets/icons/users.svg";
import messageSquareIcon from "@assets/icons/message-square.svg";
import trendingUpIcon from "@assets/icons/trending-up.svg";
import logInIcon from "@assets/icons/log-in.svg";
import settingsIcon from "@assets/app-icons/settings.png";

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
  title: "A Blueprint to your growth",
  description: "Custom digital growth plan based on AI analysis of your business",
  ctaText: "Start Your Blueprint Assessment →",
  ctaHref: "/assessment",
  steps: [
    {
      number: 1,
      title: "Digital IQ Assessment",
      description: "Free — You start with a quick assessment, and we generate your custom blueprint.",
      href: "/assessment",
      testId: "link-step1",
      icon: HOW_IT_WORKS_STEPS[0].icon,
      borderColor: "#A00028",
    },
    {
      number: 2,
      title: "Prescribed Blueprint",
      description: "Your custom action plan with SEO, content strategy, and revenue-focused steps.",
      href: "#",
      testId: "link-step2",
      icon: HOW_IT_WORKS_STEPS[1].icon,
      borderColor: "#FFC107",
    },
    {
      number: 3,
      title: "/ localblue",
      description: "Local SEO bundle — $99/mo. Listings, reputation, and SEO optimization.",
      href: "/localblue",
      testId: "link-step3",
      icon: HOW_IT_WORKS_STEPS[2].icon,
      borderColor: "#0000FF",
    },
    {
      number: 4,
      title: "Coach Blue",
      description: "24/7 AI business coach guiding you through every step of your growth journey.",
      href: "/ai-coach",
      testId: "link-step4",
      icon: HOW_IT_WORKS_STEPS[3].icon,
      borderColor: "#A855F7",
    },
    {
      number: 5,
      title: "/ commverse",
      description: "Communication bundle — $99/mo. Email, inbox, chat, and social media.",
      href: "/commverse",
      testId: "link-step5",
      icon: HOW_IT_WORKS_STEPS[4].icon,
      borderColor: "#22C55E",
    },
  ],
};

// ─────────────────────────────────────────────
// SOLUTIONS MENU
// ─────────────────────────────────────────────

const PLATFORMS: PlatformEntry[] = [
  { id: "businessblueprint", name: "BusinessBlueprint", description: "Digital Intelligence", href: "/", icon: blueprintIcon, borderColor: "#FF6B00", testId: "link-solution-businessblueprint" },
  { id: "hostsblue", name: "HostsBlue", description: "Web Services", href: "#hostsblue", icon: hostsBlueIcon, borderColor: "#8000FF", testId: "link-solution-hostsblue" },
  { id: "swipesblue", name: "SwipesBlue", description: "Payment Gateway", href: "#swipesblue", icon: swipesBlueIcon, borderColor: "#FF0040", testId: "link-solution-swipesblue" },
  { id: "consoleblue", name: "ConsoleBlue", description: "Admin Console", href: "#consoleblue", icon: consoleBlueIcon, borderColor: "#0000FF", testId: "link-solution-consoleblue" },
  { id: "scansblue", name: "ScansBlue", description: "Site Analysis", href: "#scansblue", icon: scansBlueIcon, borderColor: "#0000FF", testId: "link-solution-scansblue" },
];

const PRODUCT_ENTRIES: PlatformEntry[] = [
  { id: "coachblue", name: COACH_BLUE.name, description: COACH_BLUE.description, href: "/ai-coach", icon: COACH_BLUE.icon, borderColor: COACH_BLUE.color, testId: "link-solution-ai-coach" },
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

const GRAY_FILTER = "invert(50%) sepia(10%) saturate(100%) hue-rotate(180deg) brightness(90%) contrast(90%)";

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
        { label: "/ engage Installation", description: "Widget integration guide", href: "/engage-install", icon: codeIcon, testId: "link-resources-engage-install" },
        { label: "Site Map", description: "Complete navigation", href: "/sitemap", icon: compassIcon, testId: "link-resources-sitemap" },
      ],
    },
    {
      title: "Support",
      icon: helpCircleIcon,
      items: [
        { label: "Help Center", description: "Get answers & support", href: "/contact", icon: messageSquareIcon, testId: "link-resources-help" },
        { label: "Live Demo", description: "Try our live chat", href: "/engage-demo", icon: messageSquareIcon, testId: "link-resources-demo" },
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
export { GRAY_FILTER };
