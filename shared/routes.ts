// Shared Route Manifest - Single source of truth for all application routes
// Both App.tsx and sitemap.tsx import from here to stay synchronized

export type RouteStatus = "LIVE" | "BUILT" | "ADMIN" | "AUTH" | "DYNAMIC";

export interface RouteDefinition {
  path: string;
  name: string;
  description: string;
  category: string;
  requiresAuth: boolean;
  isAdmin: boolean;
  isDynamic: boolean;
  surfacedInNav: boolean;
  badge?: string;
}

// All routes extracted from App.tsx - this is the canonical source
export const routeManifest: RouteDefinition[] = [
  // Public Pages
  { path: "/", name: "Home", description: "Main landing page", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/about", name: "About", description: "About businessblueprint.io and TRIADBLUE", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/contact", name: "Contact", description: "Get in touch", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/sitemap", name: "Site Map", description: "Platform navigation", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/privacy", name: "Privacy Policy", description: "Data protection policy", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/terms", name: "Terms of Service", description: "Terms and conditions", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/data-deletion", name: "Data Deletion", description: "Request data deletion", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/journey", name: "How It Works", description: "6-step guided journey", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/knowledge-base", name: "Knowledge Base", description: "How Digital IQ works", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },

  // Assessment
  { path: "/assessment", name: "Digital IQ Assessment", description: "Free business digital health scan", category: "Assessment", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true, badge: "Free" },
  { path: "/find-results", name: "Find My Results", description: "Look up assessment results by email", category: "Assessment", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/dashboard/:id", name: "Assessment Dashboard", description: "View assessment results", category: "Assessment", requiresAuth: false, isAdmin: false, isDynamic: true, surfacedInNav: false },

  // Compass Suite
  { path: "/compass", name: "Compass Suite", description: "Communications bundle — $99/mo", category: "Compass Suite", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/compass-pricing", name: "Compass Pricing", description: "Compass Suite pricing details", category: "Compass Suite", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/promote", name: "/ promote", description: "Email and SMS marketing", category: "Compass Suite", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/promote/dashboard", name: "/ promote Dashboard", description: "Campaign management", category: "Compass Suite", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/respond", name: "/ respond", description: "Unified inbox for all channels", category: "Compass Suite", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/engage", name: "/ engage", description: "Live chat widget for your website", category: "Compass Suite", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/engage/dashboard", name: "/ engage Dashboard", description: "Chat management", category: "Compass Suite", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/engage-demo", name: "/ engage Demo", description: "Try the chat widget", category: "Compass Suite", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/engage-install", name: "/ engage Install", description: "Install chat widget", category: "Compass Suite", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/post", name: "/ post", description: "Social media scheduling and management", category: "Compass Suite", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/post/dashboard", name: "/ post Dashboard", description: "Content calendar and publishing", category: "Compass Suite", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },

  // Anchor Suite
  { path: "/anchor", name: "Anchor Suite", description: "Local presence bundle — $99/mo", category: "Anchor Suite", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/publish", name: "/ publish", description: "Directory listing management", category: "Anchor Suite", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/publish/dashboard", name: "/ publish Dashboard", description: "Manage business listings", category: "Anchor Suite", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/elevate", name: "/ elevate", description: "Review monitoring and ratings", category: "Anchor Suite", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/elevate/dashboard", name: "/ elevate Dashboard", description: "Manage reviews and ratings", category: "Anchor Suite", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/optimize", name: "/ optimize", description: "SEO health monitoring", category: "Anchor Suite", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/optimize/dashboard", name: "/ optimize Dashboard", description: "SEO tracking and keywords", category: "Anchor Suite", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/amplify", name: "/ amplify", description: "Advertising management — Google, Meta, Reddit", category: "Anchor Suite", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/amplify/dashboard", name: "/ amplify Dashboard", description: "Campaign and budget management", category: "Anchor Suite", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },

  // / connect CRM (standalone)
  { path: "/connect", name: "/ connect", description: "CRM — every customer, every conversation, one place", category: "/ connect CRM", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/connect/dashboard", name: "/ connect Dashboard", description: "Contacts, companies, deals, pipeline", category: "/ connect CRM", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },

  // Coach Blue
  { path: "/coach-blue", name: "Coach Blue", description: "AI business coach", category: "Coach Blue", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },

  // Client Portal
  { path: "/portal/login", name: "Portal Login", description: "Sign in to your portal", category: "Portal", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/portal/dashboard", name: "Portal Dashboard", description: "Your business command center", category: "Portal", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/portal/directions", name: "Directions for Use", description: "Your step-by-step setup plan", category: "Portal", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/portal/prescriptions", name: "Your Prescription", description: "Your digital growth prescription", category: "Portal", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/portal/prescriptions/:id", name: "View Prescription", description: "Prescription detail", category: "Portal", requiresAuth: true, isAdmin: false, isDynamic: true, surfacedInNav: false },
  { path: "/portal/prescription/:token", name: "Prescription Access", description: "Access via token", category: "Portal", requiresAuth: false, isAdmin: false, isDynamic: true, surfacedInNav: false },
  { path: "/portal/respond", name: "/ respond", description: "Unified inbox", category: "Portal", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },

  // Pricing
  { path: "/pricing", name: "Pricing", description: "View all pricing", category: "Pricing", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/marketplace", name: "Marketplace", description: "Browse apps", category: "Pricing", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/cart", name: "Cart", description: "Review cart", category: "Pricing", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/checkout", name: "Checkout", description: "Complete purchase", category: "Pricing", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },

  // Resources
  { path: "/api-docs", name: "API Documentation", description: "Developer API reference", category: "Resources", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },

  // Admin
  { path: "/admin", name: "Admin Panel", description: "System administration", category: "Admin", requiresAuth: true, isAdmin: true, isDynamic: false, surfacedInNav: false },
];

// Derive status from explicit flags
export function getRouteStatus(route: RouteDefinition): RouteStatus {
  if (route.isDynamic) return "DYNAMIC";
  if (route.isAdmin) return "ADMIN";
  if (route.requiresAuth) return "AUTH";
  if (route.surfacedInNav) return "LIVE";
  return "BUILT";
}

// Get stats from manifest
export function getRouteStats() {
  return {
    total: routeManifest.length,
    live: routeManifest.filter(r => getRouteStatus(r) === "LIVE").length,
    built: routeManifest.filter(r => getRouteStatus(r) === "BUILT").length,
    auth: routeManifest.filter(r => getRouteStatus(r) === "AUTH").length,
    admin: routeManifest.filter(r => getRouteStatus(r) === "ADMIN").length,
    dynamic: routeManifest.filter(r => getRouteStatus(r) === "DYNAMIC").length,
    linkedInNav: routeManifest.filter(r => r.surfacedInNav).length,
    requiresAuth: routeManifest.filter(r => r.requiresAuth).length,
  };
}

// Group routes by category
export function getRoutesByCategory() {
  return routeManifest.reduce((acc, route) => {
    if (!acc[route.category]) acc[route.category] = [];
    acc[route.category].push(route);
    return acc;
  }, {} as Record<string, RouteDefinition[]>);
}
