import { db } from "./db";
import { products } from "@shared/schema";

// AUTHORIZED PRODUCTS ONLY - Based on app-registry.ts (source of truth)
// Product IDs match app-registry.ts: respond, promote, engage, post, publish, elevate, optimize, amplify, connect
// Bundle IDs: compass (Compass Suite), anchor (Anchor Suite)
const authorizedProducts = [
  {
    productId: "compass",
    name: "Compass Suite",
    description: "Communication & Marketing Bundle — All 4 communication tools (/ promote, / respond, / engage, / post) in one integrated platform",
    category: "bundle",
    improvesCategory: ["engagement", "visibility"],
    diyPrice: "99.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "All 4 communication tools in one platform",
      "Unified dashboard for all customer communications",
      "Save vs buying apps separately",
      "Perfect sync between email, SMS, social, and chat",
      "One login, one bill, complete control"
    ]),
    deliveryMethod: ["diy"],
    estimatedImpact: "+40-60 points",
    displayOrder: 0,
    isActive: true
  },
  {
    productId: "respond",
    name: "/ respond",
    description: "Unified Multi-Channel Inbox — Consolidates email, SMS, social messages, live chat into ONE inbox",
    category: "core",
    improvesCategory: ["engagement", "visibility"],
    diyPrice: "29.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Consolidates all messages into ONE inbox",
      "Never miss a customer message again",
      "Respond faster, close more deals",
      "Track response times and conversation history",
      "Works across email, SMS, social, and chat"
    ]),
    deliveryMethod: ["diy"],
    estimatedImpact: "+15-25 points",
    displayOrder: 1,
    isActive: true
  },
  {
    productId: "promote",
    name: "/ promote",
    description: "Email Campaign Manager — Build and segment your customer list, create campaigns",
    category: "core",
    improvesCategory: ["engagement", "visibility"],
    diyPrice: "29.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Build and segment your customer list",
      "Create professional email campaigns in minutes",
      "Send targeted SMS messages",
      "Automated drip campaigns that run themselves",
      "Track open rates, clicks, and conversions"
    ]),
    deliveryMethod: ["diy"],
    estimatedImpact: "+15-25 points",
    displayOrder: 2,
    isActive: true
  },
  {
    productId: "post",
    name: "/ post",
    description: "Social Media Manager — Schedule posts, create content with AI, track engagement",
    category: "core",
    improvesCategory: ["engagement", "visibility"],
    diyPrice: "29.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Schedule posts across all platforms",
      "Create engaging content with AI assistance",
      "Track engagement and performance",
      "Respond to comments and DMs",
      "Content calendar and planning tools"
    ]),
    deliveryMethod: ["diy"],
    estimatedImpact: "+15-20 points",
    displayOrder: 3,
    isActive: true
  },
  {
    productId: "engage",
    name: "/ engage",
    description: "Live Chat Widget — Real-time customer support and lead capture",
    category: "core",
    improvesCategory: ["engagement", "visibility"],
    diyPrice: "29.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Real-time customer support",
      "Proactive chat invitations",
      "Mobile app for on-the-go responses",
      "Chat transcripts and history",
      "Lead capture and qualification"
    ]),
    deliveryMethod: ["diy"],
    estimatedImpact: "+10-20 points",
    displayOrder: 4,
    isActive: true
  },
  {
    productId: "anchor",
    name: "Anchor Suite",
    description: "Local SEO & Reputation Bundle — / publish, / elevate, / optimize, / amplify in one integrated platform",
    category: "bundle",
    improvesCategory: ["visibility", "reviews", "completeness"],
    diyPrice: "99.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Includes / publish + / elevate + / optimize + / amplify",
      "Google Business Profile optimization",
      "Local keyword tracking",
      "Competitor analysis",
      "Monthly performance reports"
    ]),
    deliveryMethod: ["diy"],
    estimatedImpact: "+30-50 points",
    displayOrder: 5,
    isActive: true
  },
  {
    productId: "publish",
    name: "/ publish",
    description: "Business Listings Manager — Manage 50+ directory listings from one dashboard",
    category: "core",
    improvesCategory: ["visibility", "completeness"],
    diyPrice: "29.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Manage 50+ directory listings from one dashboard",
      "Ensure NAP (Name, Address, Phone) consistency",
      "Update hours, services, photos across all platforms",
      "Monitor listing performance",
      "Fix duplicate and incorrect listings"
    ]),
    deliveryMethod: ["diy"],
    estimatedImpact: "+20-30 points",
    displayOrder: 6,
    isActive: true
  },
  {
    productId: "elevate",
    name: "/ elevate",
    description: "Reputation & Reviews Manager — Monitor and respond to reviews across all platforms",
    category: "core",
    improvesCategory: ["reviews", "engagement"],
    diyPrice: "29.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Monitor reviews across all platforms",
      "Automated review request campaigns",
      "Respond to reviews from one dashboard",
      "Sentiment analysis and trending",
      "Showcase positive reviews on your website"
    ]),
    deliveryMethod: ["diy"],
    estimatedImpact: "+20-30 points",
    displayOrder: 7,
    isActive: true
  },
  {
    productId: "optimize",
    name: "/ optimize",
    description: "SEO Health Monitor — Complete SEO health monitoring, keyword tracking, and AI-powered optimization",
    category: "core",
    improvesCategory: ["visibility", "completeness"],
    diyPrice: "29.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Real-time SEO health score and monitoring",
      "AI-powered keyword research and rank tracking",
      "On-page SEO analysis with actionable suggestions",
      "Technical SEO audit with fix instructions",
      "AI content briefs and optimization",
      "Prioritized action plans"
    ]),
    deliveryMethod: ["diy"],
    estimatedImpact: "+15-25 points",
    displayOrder: 8,
    isActive: true
  },
  {
    productId: "amplify",
    name: "/ amplify",
    description: "Advertising Platform — Manage and optimize your digital advertising campaigns",
    category: "core",
    improvesCategory: ["visibility", "engagement"],
    diyPrice: "29.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Manage digital advertising campaigns",
      "Track ad performance and ROI",
      "Optimize ad spend across platforms",
      "Targeted audience management",
      "Performance reporting and analytics"
    ]),
    deliveryMethod: ["diy"],
    estimatedImpact: "+15-25 points",
    displayOrder: 9,
    isActive: true
  },
  {
    productId: "connect",
    name: "/ connect",
    description: "Customer Relationship Management Tool — Centralized customer database and sales pipeline",
    category: "core",
    improvesCategory: ["engagement", "completeness"],
    diyPrice: "29.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Centralized customer database (single source of truth)",
      "Track every interaction across all channels",
      "Sales pipeline and opportunity tracking",
      "Automated follow-ups and reminders",
      "Integration with all Compass and Anchor tools"
    ]),
    deliveryMethod: ["diy"],
    estimatedImpact: "+15-25 points",
    displayOrder: 10,
    isActive: true
  },
  {
    productId: "hostsBlue",
    name: "hostsblue.com",
    description: "Complete Web Services — Domain, hosting, email, website builder",
    category: "partner",
    improvesCategory: ["completeness", "visibility"],
    diyPrice: "0.00",
    setupFee: "0.00",
    billingCycle: "varies",
    features: JSON.stringify([
      "Domain registration and transfer",
      "Professional email hosting (@yourbusiness.com)",
      "SSL certificates and trust badges",
      "Website builder (drag-and-drop)",
      "One-click WordPress install",
      "99.9% uptime guarantee"
    ]),
    deliveryMethod: ["partner"],
    estimatedImpact: "+20-30 points",
    displayOrder: 11,
    isActive: true
  },
  {
    productId: "swipesBlue",
    name: "swipesblue.com",
    description: "Payment Processing — Integrated payment gateway",
    category: "partner",
    improvesCategory: ["engagement"],
    diyPrice: "0.00",
    setupFee: "0.00",
    billingCycle: "transaction",
    features: JSON.stringify([
      "Integrated payment gateway",
      "Shopping cart and checkout",
      "Secure payment processing",
      "All features included free",
      "Transaction-fee model only (2.9% + 30¢)"
    ]),
    deliveryMethod: ["partner"],
    estimatedImpact: "+10-15 points",
    displayOrder: 12,
    isActive: true
  }
];

async function seedProducts() {
  try {
    console.log("Seeding AUTHORIZED products only...");
    console.log("Products: respond, promote, post, engage, publish, elevate, optimize, amplify, connect, compass, anchor, hostsBlue, swipesBlue");

    for (const product of authorizedProducts) {
      await db.insert(products).values(product).onConflictDoNothing();
      console.log(`✓ Seeded: ${product.name} (${product.productId})`);
    }

    console.log("\nAuthorized products seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
}

seedProducts();
