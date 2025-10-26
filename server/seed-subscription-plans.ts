import { db } from "./db";
import { subscriptionPlans, subscriptionAddons } from "@shared/schema";

const plans = [
  // DIY TIERS
  {
    planId: "diy-starter",
    name: "STARTER",
    description: "Do It Yourself (DIY) - Business Blueprint base plan with 100 locations",
    pathway: "diy",
    tierLevel: "starter",
    basePrice: "250.00",
    setupFee: "0.00",
    billingCycle: "monthly",
    features: [
      "Business Listings Management (100 locations)",
      "Review & Reputation Management",
      "Social Media Management",
      "Local SEO & Rank Tracking",
      "/send - Email + SMS Marketing Platform",
      "/inbox - Unified Communications Hub",
      "/livechat - Live Chat Widget",
      "AI-powered Assessment",
      "Digital IQ Dashboard"
    ],
    maxUsers: 3,
    maxProjects: 1,
    isActive: true
  },
  {
    planId: "diy-growth",
    name: "GROWTH",
    description: "Do It Yourself (DIY) - Starter + Pro add-ons for enhanced features",
    pathway: "diy",
    tierLevel: "growth",
    basePrice: "316.00", // $250 + $35 (Listings Pro) + $20 (Reviews Pro) + $6 (Social Pro) + $5 (SEO Pro)
    setupFee: "0.00",
    billingCycle: "monthly",
    features: [
      "Business Listings Management (100 locations)",
      "Review & Reputation Management",
      "Social Media Management",
      "Local SEO & Rank Tracking",
      "/send - Email + SMS Marketing Platform",
      "/inbox - Unified Communications Hub",
      "/livechat - Live Chat Widget",
      "Listings Pro - Advanced listing features",
      "Reviews Pro - Enhanced review management",
      "Social Pro - Advanced social media tools",
      "SEO Pro - Premium SEO features",
      "Priority AI support",
      "Advanced analytics dashboard",
      "Custom reporting"
    ],
    maxUsers: 5,
    maxProjects: 3,
    isActive: true
  },

  // MSP TIERS
  {
    planId: "msp-expansion-essential",
    name: "EXPANSION Essential",
    description: "Managed Services Provided (MSP) - Expert team handles implementation and management",
    pathway: "msp",
    tierLevel: "expansion-essential",
    basePrice: "399.00",
    setupFee: "499.00",
    billingCycle: "monthly",
    features: [
      "Business Listings Management (100 locations)",
      "Review & Reputation Management",
      "Social Media Management",
      "Local SEO & Rank Tracking",
      "/send - Email + SMS Marketing Platform (Managed)",
      "/inbox - Unified Communications Hub (Managed)",
      "/livechat - Live Chat Widget (Managed)",
      "Dedicated account manager",
      "Expert implementation team",
      "Monthly strategy sessions",
      "Professional content creation",
      "Managed campaign execution",
      "Priority support (4-hour response)"
    ],
    maxUsers: 10,
    maxProjects: 5,
    isActive: true
  },
  {
    planId: "msp-expansion-pro",
    name: "EXPANSION Pro",
    description: "Managed Services Provided (MSP) - Expansion with enhanced service levels",
    pathway: "msp",
    tierLevel: "expansion-pro",
    basePrice: "649.00",
    setupFee: "499.00",
    billingCycle: "monthly",
    features: [
      "Business Listings Management (100 locations)",
      "Review & Reputation Management",
      "Social Media Management",
      "Local SEO & Rank Tracking",
      "/send - Email + SMS Marketing Platform (Managed)",
      "/inbox - Unified Communications Hub (Managed)",
      "/livechat - Live Chat Widget (Managed)",
      "Dedicated account manager",
      "Expert implementation team",
      "Advanced automation workflows",
      "Custom integration support",
      "Bi-weekly strategy sessions",
      "Enhanced reporting & analytics",
      "A/B testing & optimization",
      "Dedicated success team",
      "Priority support (2-hour response)"
    ],
    maxUsers: 15,
    maxProjects: 10,
    isActive: true
  },
  {
    planId: "msp-leadership-essential",
    name: "LEADERSHIP Essential",
    description: "Managed Services Provided (MSP) - Enterprise-level managed services",
    pathway: "msp",
    tierLevel: "leadership-essential",
    basePrice: "999.00",
    setupFee: "999.00",
    billingCycle: "monthly",
    features: [
      "Business Listings Management (unlimited locations)",
      "Review & Reputation Management (unlimited)",
      "Social Media Management (unlimited)",
      "Local SEO & Rank Tracking (unlimited)",
      "/send - Email + SMS Marketing Platform (Managed)",
      "/inbox - Unified Communications Hub (Managed)",
      "/livechat - Live Chat Widget (Managed)",
      "Executive strategy partner",
      "Weekly strategic planning",
      "Custom development resources",
      "Multi-location support (unlimited)",
      "White-label options available",
      "Advanced API integrations",
      "Priority support (1-hour response)",
      "Quarterly business reviews"
    ],
    maxUsers: 25,
    maxProjects: 25,
    isActive: true
  },
  {
    planId: "msp-leadership-pro",
    name: "LEADERSHIP Pro",
    description: "Managed Services Provided (MSP) - Premium enterprise solution with unlimited resources",
    pathway: "msp",
    tierLevel: "leadership-pro",
    basePrice: "1249.00",
    setupFee: "999.00",
    billingCycle: "monthly",
    features: [
      "Business Listings Management (unlimited locations)",
      "Review & Reputation Management (unlimited)",
      "Social Media Management (unlimited)",
      "Local SEO & Rank Tracking (unlimited)",
      "/send - Email + SMS Marketing Platform (Managed)",
      "/inbox - Unified Communications Hub (Managed)",
      "/livechat - Live Chat Widget (Managed)",
      "Unlimited users & projects",
      "24/7 premium support (30-min response)",
      "Dedicated development team",
      "Custom feature development",
      "Enterprise SLA guarantees",
      "On-demand consulting hours",
      "Annual strategic planning",
      "C-level executive access"
    ],
    maxUsers: null, // unlimited
    maxProjects: null, // unlimited
    isActive: true
  }
];

const addons = [
  {
    addonId: "ai-coach-essential",
    name: "AI Business Coach - Essential",
    description: "Smart AI guidance with automated task suggestions and basic progress tracking",
    category: "coaching",
    icon: "Brain",
    price: "59.00",
    billingCycle: "monthly",
    compatiblePathways: ["diy", "msp"],
    isActive: true
  },
  {
    addonId: "ai-coach-pro",
    name: "AI Business Coach - Pro",
    description: "Unlimited personalized AI guidance with advanced strategies and 24/7 availability",
    category: "coaching",
    icon: "Sparkles",
    price: "99.00",
    billingCycle: "monthly",
    compatiblePathways: ["diy", "msp"],
    isActive: true
  },
  {
    addonId: "captain-journey",
    name: "Captain Your Journey",
    description: "Personal business coach with weekly 1-on-1 sessions, custom strategies, and accountability",
    category: "coaching",
    icon: "Ship",
    price: "249.00",
    billingCycle: "monthly",
    compatiblePathways: ["diy", "msp"],
    isActive: true
  },
  {
    addonId: "extra-locations-10",
    name: "Additional 10 Locations",
    description: "Expand your listings management to 10 more business locations",
    category: "capacity",
    icon: "MapPin",
    price: "49.00",
    billingCycle: "monthly",
    compatiblePathways: ["diy", "msp"],
    isActive: true
  },
  {
    addonId: "extra-locations-50",
    name: "Additional 50 Locations",
    description: "Expand your listings management to 50 more business locations",
    category: "capacity",
    icon: "Building",
    price: "199.00",
    billingCycle: "monthly",
    compatiblePathways: ["diy", "msp"],
    isActive: true
  },
  {
    addonId: "priority-support",
    name: "Priority Support Upgrade",
    description: "Upgrade to 1-hour response time support with dedicated phone line",
    category: "support",
    icon: "Headphones",
    price: "99.00",
    billingCycle: "monthly",
    compatiblePathways: ["diy"],
    isActive: true
  },

  // DIY Add-Ons - Synup-Based Services
  {
    addonId: "listings",
    name: "Listings",
    description: "Accurate profiles across directories, maps, and search engines. Profile sync (NAP, hours, site), major directories + long-tail, duplicate suppression",
    category: "synup-diy",
    icon: "MapPin",
    price: "44.00",
    billingCycle: "monthly",
    compatiblePathways: ["diy"],
    isActive: true
  },
  {
    addonId: "reviews-pro",
    name: "Reviews (Pro)",
    description: "Generate more reviews & respond faster. SMS/email requests + QR, unified inbox (Google, FB, Yelp), AI reply drafts + alerts, widgets + trend reports",
    category: "synup-diy",
    icon: "Star",
    price: "25.00",
    billingCycle: "monthly",
    compatiblePathways: ["diy"],
    isActive: true
  },
  {
    addonId: "reviews-gold",
    name: "Reviews (Gold)",
    description: "Advanced insights and automation. Smart routing + win-back, response templates + guardrails, competitor benchmarking, multi-location roll-ups + compliance",
    category: "synup-diy",
    icon: "Award",
    price: "63.00",
    billingCycle: "monthly",
    compatiblePathways: ["diy"],
    isActive: true
  },
  {
    addonId: "social",
    name: "Social",
    description: "Plan, publish, and track performance. FB/IG/X/LinkedIn scheduling, calendar + drag & drop, AI captions + hashtag help, analytics + link-in-bio page",
    category: "synup-diy",
    icon: "Share2",
    price: "8.00",
    billingCycle: "monthly",
    compatiblePathways: ["diy"],
    isActive: true
  },
  {
    addonId: "local-seo",
    name: "Local SEO",
    description: "Climb (and stay) in the local 3-pack. Local keyword + map pack tracking, competitor comparison, on-page checks + GBP tips, monthly scorecard + quick wins",
    category: "synup-diy",
    icon: "TrendingUp",
    price: "6.00",
    billingCycle: "monthly",
    compatiblePathways: ["diy"],
    isActive: true
  },

  // MSP Add-Ons - Managed Services
  {
    addonId: "reputation-management",
    name: "Reputation Management",
    description: "Monitor & respond across platforms. AI-assisted responses (tone controls), alerts, tagging, monthly reporting. Includes 50 responses/mo, +$2 each additional",
    category: "synup-msp",
    icon: "Shield",
    price: "15.00",
    billingCycle: "monthly",
    compatiblePathways: ["msp"],
    isActive: true
  },
  {
    addonId: "social-posting",
    name: "Social Media Posting",
    description: "Branded content publishing. Consistent cross-channel cadence, calendar, approvals, basic analytics. +$3 per extra post",
    category: "synup-msp",
    icon: "Send",
    price: "25.00",
    billingCycle: "monthly",
    compatiblePathways: ["msp"],
    isActive: true
  },

  // MSP Packages - Full Service Tiers
  {
    addonId: "msp-standard",
    name: "Standard MSP",
    description: "10 managed hours ($69/hr additional). Initial response: P1 90m, P2 120m, P3 180m. Service hours: 24×5. Channels: Email + Phone. Dedicated CSM + Knowledge Base",
    category: "msp-package",
    icon: "Wrench",
    price: "313.00",
    billingCycle: "monthly",
    compatiblePathways: ["msp"],
    isActive: true
  },
  {
    addonId: "msp-premium",
    name: "Premium MSP",
    description: "20 managed hours ($56/hr additional). Initial response: P1 30m, P2 60m, P3 90m. Service hours: 24×5 + dedicated support 12×5. Channels: Email + Chat + Phone. Dedicated Slack channel + CSM",
    category: "msp-package",
    icon: "Crown",
    price: "625.00",
    billingCycle: "monthly",
    compatiblePathways: ["msp"],
    isActive: true
  }
];

async function seedSubscriptionPlans() {
  try {
    console.log("Seeding subscription plans...");
    
    for (const plan of plans) {
      await db.insert(subscriptionPlans)
        .values(plan)
        .onConflictDoUpdate({
          target: subscriptionPlans.planId,
          set: plan
        });
      console.log(`✓ Seeded/Updated plan: ${plan.name} (${plan.pathway.toUpperCase()})`);
    }

    console.log("\nSeeding subscription add-ons...");
    
    for (const addon of addons) {
      await db.insert(subscriptionAddons)
        .values(addon)
        .onConflictDoUpdate({
          target: subscriptionAddons.addonId,
          set: addon
        });
      console.log(`✓ Seeded/Updated addon: ${addon.name}`);
    }
    
    console.log("\n✅ Subscription plans and add-ons seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding subscription plans:", error);
    process.exit(1);
  }
}

seedSubscriptionPlans();
