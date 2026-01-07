import { db } from "./db";
import { products } from "@shared/schema";

// AUTHORIZED PRODUCTS ONLY - Based on shared/products.ts catalog
// DO NOT add products not in the official catalog
const authorizedProducts = [
  {
    productId: "inbox",
    name: "Inbox",
    description: "Unified Communication Hub - Consolidates email, SMS, social messages, live chat into ONE inbox",
    category: "core",
    improvesCategory: ["engagement", "visibility"],
    diyPrice: "34.00",
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
    productId: "send",
    name: "Send",
    description: "Email & SMS Marketing Platform - Build and segment your customer list, create campaigns",
    category: "core",
    improvesCategory: ["engagement", "visibility"],
    diyPrice: "34.00",
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
    productId: "content",
    name: "Content",
    description: "Social Media Management - Schedule posts, create content with AI, track engagement",
    category: "core",
    improvesCategory: ["engagement", "visibility"],
    diyPrice: "34.00",
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
    productId: "livechat",
    name: "LiveChat",
    description: "Website Chat Widget - Real-time customer support and lead capture",
    category: "core",
    improvesCategory: ["engagement", "visibility"],
    diyPrice: "34.00",
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
    productId: "listings",
    name: "Listings",
    description: "Business Listings Management - Manage 50+ directory listings from one dashboard",
    category: "core",
    improvesCategory: ["visibility", "completeness"],
    diyPrice: "39.00",
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
    displayOrder: 5,
    isActive: true
  },
  {
    productId: "reputation",
    name: "Reputation",
    description: "Ratings & Review Management - Monitor and respond to reviews across all platforms",
    category: "core",
    improvesCategory: ["reviews", "engagement"],
    diyPrice: "39.00",
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
    displayOrder: 6,
    isActive: true
  },
  {
    productId: "localblue",
    name: "LocalBlue Complete",
    description: "Full Local SEO Package - Includes Listings + Reputation + GBP optimization",
    category: "bundle",
    improvesCategory: ["visibility", "reviews", "completeness"],
    diyPrice: "59.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Includes Listings + Reputation management",
      "Google Business Profile optimization",
      "Local keyword tracking",
      "Competitor analysis",
      "Monthly performance reports"
    ]),
    deliveryMethod: ["diy"],
    estimatedImpact: "+30-50 points",
    displayOrder: 7,
    isActive: true
  },
  {
    productId: "relationships",
    name: "Relationships CRM",
    description: "The Truth Center - Centralized customer database and sales pipeline",
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
      "Seamless integration with all CommVerse and LocalBlue tools"
    ]),
    deliveryMethod: ["diy"],
    estimatedImpact: "+15-25 points",
    displayOrder: 8,
    isActive: true
  },
  {
    productId: "hostsBlue",
    name: "HostsBlue.com",
    description: "Complete Web Services - Domain, hosting, email, website builder",
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
    displayOrder: 9,
    isActive: true
  },
  {
    productId: "swipesBlue",
    name: "SwipesBlue.com",
    description: "Payment Processing and E-commerce - Integrated payment gateway",
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
    displayOrder: 10,
    isActive: true
  }
];

async function seedProducts() {
  try {
    console.log("Seeding AUTHORIZED products only...");
    console.log("Products: inbox, send, content, livechat, listings, reputation, localblue, relationships, hostsBlue, swipesBlue");
    
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
