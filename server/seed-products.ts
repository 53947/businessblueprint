import { db } from "./db";
import { products } from "@shared/schema";

const individualProducts = [
  {
    productId: "business-listings",
    name: "Business Listings Management",
    description: "Distribute and sync your business information across 100+ directories including Google, Bing, Facebook, Yelp, and more",
    category: "core",
    improvesCategory: ["visibility", "completeness"],
    diyPrice: "29.99",
    mspPrice: "49.99",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "100+ directory distribution",
      "Real-time data synchronization",
      "Centralized management dashboard",
      "Duplicate listing cleanup",
      "NAP consistency monitoring"
    ]),
    deliveryMethod: ["diy", "msp"],
    estimatedImpact: "+15-25 points",
    displayOrder: 1,
    isActive: true
  },
  {
    productId: "review-management",
    name: "Review & Reputation Management",
    description: "Monitor, respond to, and generate reviews across multiple platforms with AI-powered assistance",
    category: "core",
    improvesCategory: ["reviews", "engagement"],
    diyPrice: "39.99",
    mspPrice: "59.99",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Multi-platform review monitoring",
      "AI-powered review responses",
      "Review generation campaigns",
      "Email/SMS review requests",
      "Sentiment analysis"
    ]),
    deliveryMethod: ["diy", "msp"],
    estimatedImpact: "+20-30 points",
    displayOrder: 2,
    isActive: true
  },
  {
    productId: "social-media-management",
    name: "Content Management Platform",
    description: "/content - Create, schedule, and publish social media content with AI assistance across multiple platforms",
    category: "core",
    improvesCategory: ["engagement", "visibility"],
    diyPrice: "49.99",
    mspPrice: "79.99",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "DIY: 3 platforms (FB, IG, LinkedIn, X, Google Business) - pick your favorites",
      "MSP: All 7 platforms including TikTok & Snapchat",
      "AI caption generator with tone control",
      "Smart hashtag suggestions",
      "Visual content calendar with drag-drop scheduling",
      "Media library with cloud storage",
      "Post analytics & performance tracking",
      "Template library for quick posting",
      "MSP: Dedicated strategist + team collaboration"
    ]),
    deliveryMethod: ["diy", "msp"],
    estimatedImpact: "+15-20 points",
    displayOrder: 3,
    isActive: true
  },
  {
    productId: "local-seo",
    name: "Local SEO & Rank Tracking",
    description: "Track local search rankings, keywords, and improve your visibility in local search results",
    category: "core",
    improvesCategory: ["visibility"],
    diyPrice: "59.99",
    mspPrice: "89.99",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Local map & search rank tracking",
      "Keyword monitoring",
      "Hyper-local grid view rankings",
      "Competitor analysis",
      "Performance analytics (90-day history)"
    ]),
    deliveryMethod: ["diy", "msp"],
    estimatedImpact: "+10-15 points",
    displayOrder: 4,
    isActive: true
  },
  {
    productId: "google-business-setup",
    name: "Google Business Profile Setup",
    description: "Professional setup and optimization of your Google Business Profile",
    category: "core",
    improvesCategory: ["completeness", "visibility"],
    diyPrice: "99.00",
    mspPrice: "149.00",
    setupFee: "0.00",
    billingCycle: "one_time",
    features: JSON.stringify([
      "Complete profile setup",
      "Business verification",
      "Photo optimization (3+ photos)",
      "Category selection",
      "Hours & attributes setup"
    ]),
    deliveryMethod: ["diy", "msp"],
    estimatedImpact: "+25-35 points",
    displayOrder: 5,
    isActive: true
  },
  {
    productId: "store-locator",
    name: "Store Locator & Pages",
    description: "Interactive store locator with dedicated landing pages for each location",
    category: "core",
    improvesCategory: ["visibility", "completeness"],
    diyPrice: "69.99",
    mspPrice: "99.99",
    setupFee: "99.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Interactive map locator",
      "Dedicated location pages",
      "Mobile-responsive design",
      "Search by address/zip",
      "Directions integration"
    ]),
    deliveryMethod: ["diy", "msp"],
    estimatedImpact: "+10-15 points",
    displayOrder: 6,
    isActive: true
  },
  {
    productId: "website-builder",
    name: "Website Builder",
    description: "Create and manage a professional website for your business",
    category: "core",
    improvesCategory: ["completeness"],
    diyPrice: "29.99",
    mspPrice: "79.99",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Drag-and-drop builder",
      "Mobile responsive templates",
      "SEO optimization",
      "SSL certificate included",
      "Custom domain support"
    ]),
    deliveryMethod: ["diy", "msp"],
    estimatedImpact: "+15-20 points",
    displayOrder: 7,
    isActive: true
  },
  {
    productId: "ai-business-coach",
    name: "AI Business Coach",
    description: "Personalized AI guidance for your digital marketing journey",
    category: "solution",
    improvesCategory: ["visibility", "reviews", "completeness", "engagement"],
    diyPrice: "99.00",
    mspPrice: "59.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Personalized business guidance",
      "Step-by-step task breakdown",
      "Progress tracking & analytics",
      "Real-time help & support",
      "Team training support"
    ]),
    deliveryMethod: ["diy", "msp"],
    estimatedImpact: "Accelerates all improvements",
    displayOrder: 8,
    isActive: true
  },
  {
    productId: "captaining-journey",
    name: "Captaining Your Journey",
    description: "8 weeks of personal oversight during your digital launch phase",
    category: "solution",
    improvesCategory: ["visibility", "reviews", "completeness", "engagement"],
    diyPrice: "249.00",
    mspPrice: "249.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: JSON.stringify([
      "Personal oversight (8 weeks)",
      "Blueprint implementation guidance",
      "Configuration verification",
      "Challenge navigation support",
      "Smooth transition to independence"
    ]),
    deliveryMethod: ["diy", "msp"],
    estimatedImpact: "Ensures successful implementation",
    displayOrder: 9,
    isActive: true
  }
];

async function seedProducts() {
  try {
    console.log("Seeding individual products...");
    
    for (const product of individualProducts) {
      await db.insert(products).values(product).onConflictDoNothing();
      console.log(`✓ Seeded: ${product.name}`);
    }
    
    console.log("\nProducts seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
}

seedProducts();
