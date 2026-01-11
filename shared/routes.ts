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
  { path: "/about", name: "About Us", description: "Company information", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/contact", name: "Contact", description: "Get in touch", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/sitemap", name: "Site Map", description: "Platform navigation", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/privacy", name: "Privacy Policy", description: "Data protection policy", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/terms", name: "Terms of Service", description: "Terms and conditions", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/data-deletion", name: "Data Deletion", description: "Request data deletion", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/journey", name: "Success Journey", description: "5-step success process", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/tour", name: "Platform Tour", description: "Interactive tour", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/biif", name: "BIIF", description: "Business Innovation Framework", category: "Public", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  
  // Assessment Flow
  { path: "/assessment", name: "Digital IQ Assessment", description: "Free 27-question assessment", category: "Assessment", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true, badge: "Free" },
  { path: "/dashboard/:id", name: "Prescription Dashboard", description: "View personalized prescription", category: "Assessment", requiresAuth: false, isAdmin: false, isDynamic: true, surfacedInNav: false },
  { path: "/find-results", name: "Find My Results", description: "Look up assessment results", category: "Assessment", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/assessment-checkout", name: "Assessment Checkout", description: "Complete assessment purchase", category: "Assessment", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  
  // AI Coach
  { path: "/ai-coach", name: "Coach Blue", description: "AI business coaching", category: "AI Coach", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true, badge: "Premium" },
  
  // Pricing & Commerce
  { path: "/pricing", name: "Pricing", description: "View subscription plans", category: "Pricing", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/subscription", name: "Subscription Plans", description: "DIY or Managed Services", category: "Pricing", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/pathways", name: "Pathways", description: "Paths to digital success", category: "Pricing", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/marketplace", name: "Marketplace", description: "Browse apps and tools", category: "Pricing", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/marketplace/checkout", name: "Marketplace Checkout", description: "Complete marketplace purchase", category: "Pricing", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/cart", name: "Shopping Cart", description: "Review cart items", category: "Pricing", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/checkout", name: "Checkout", description: "Complete purchase", category: "Pricing", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  
  // Commverse Apps
  { path: "/commverse", name: "Commverse Bundle", description: "Complete communication suite", category: "Commverse", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/commverse-pricing", name: "Commverse Pricing", description: "Communication tools pricing", category: "Commverse", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/send", name: "Send Landing", description: "Email and SMS marketing", category: "Commverse", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/send/dashboard", name: "Send Dashboard", description: "Manage Send campaigns", category: "Commverse", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/inbox", name: "Inbox Landing", description: "Unified inbox overview", category: "Commverse", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/inbox/dashboard", name: "Inbox Dashboard", description: "Manage unified inbox", category: "Commverse", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/livechat", name: "LiveChat Landing", description: "Real-time chat overview", category: "Commverse", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/livechat/dashboard", name: "LiveChat Dashboard", description: "Manage live chat conversations", category: "Commverse", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/livechat-demo", name: "LiveChat Demo", description: "Try live chat widget", category: "Commverse", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/livechat-install", name: "LiveChat Install", description: "Install LiveChat widget", category: "Commverse", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/content", name: "Content Landing", description: "Content creation overview", category: "Commverse", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/content/dashboard", name: "Content Dashboard", description: "Manage content calendar", category: "Commverse", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  
  // LocalBlue Apps
  { path: "/localblue", name: "LocalBlue Bundle", description: "Local business presence", category: "LocalBlue", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/listings", name: "Listings Landing", description: "Directory sync overview", category: "LocalBlue", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/listings/dashboard", name: "Listings Dashboard", description: "Manage business listings", category: "LocalBlue", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/reputation", name: "Reputation Landing", description: "Reputation management overview", category: "LocalBlue", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/reputation/dashboard", name: "Reputation Dashboard", description: "Manage reviews", category: "LocalBlue", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  
  // Relationships CRM
  { path: "/relationships", name: "Relationships Landing", description: "CRM overview and pricing", category: "Relationships", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/relationships/dashboard", name: "Relationships Dashboard", description: "CRM contacts, companies, deals, tasks", category: "Relationships", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  
  // Client Portal
  { path: "/portal/login", name: "Portal Login", description: "Sign in to portal", category: "Portal", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/portal/verify", name: "Verify Magic Link", description: "Email verification", category: "Portal", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/portal/test", name: "Portal Test", description: "Test portal access", category: "Portal", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/portal/dashboard", name: "Portal Dashboard", description: "Business command center", category: "Portal", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/portal/inbox", name: "Portal Inbox", description: "Portal messages", category: "Portal", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/portal/prescriptions/:id", name: "View Prescription", description: "View specific prescription", category: "Portal", requiresAuth: true, isAdmin: false, isDynamic: true, surfacedInNav: false },
  { path: "/portal/prescriptions", name: "All Prescriptions", description: "View all prescriptions", category: "Portal", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/portal/prescription/:token", name: "Prescription Token", description: "Access via token", category: "Portal", requiresAuth: false, isAdmin: false, isDynamic: true, surfacedInNav: false },
  { path: "/portal", name: "Client Portal", description: "Portal home", category: "Portal", requiresAuth: true, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/portal/assessment/confirmation", name: "Assessment Confirmation", description: "Confirm submission", category: "Portal", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  
  // ScansBlue
  { path: "/scansblue/purchase", name: "ScansBlue Purchase", description: "Purchase full report", category: "ScansBlue", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  { path: "/scansblue/success", name: "ScansBlue Success", description: "Purchase confirmation", category: "ScansBlue", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: false },
  
  // Resources
  { path: "/knowledge-base", name: "Knowledge Base", description: "Learn digital marketing", category: "Resources", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  { path: "/api-docs", name: "API Documentation", description: "Developer API reference", category: "Resources", requiresAuth: false, isAdmin: false, isDynamic: false, surfacedInNav: true },
  
  // Admin
  { path: "/admin", name: "Admin Panel", description: "System administration", category: "Admin", requiresAuth: true, isAdmin: true, isDynamic: false, surfacedInNav: false },
  { path: "/brand-studio", name: "Brand Studio", description: "Manage brand assets", category: "Admin", requiresAuth: true, isAdmin: true, isDynamic: false, surfacedInNav: false },
  { path: "/logo-preview", name: "Logo Preview", description: "Preview brand logos", category: "Admin", requiresAuth: true, isAdmin: true, isDynamic: false, surfacedInNav: false },
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
