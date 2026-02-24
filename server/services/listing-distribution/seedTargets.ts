import { db } from "../../db";
import { distributionTargets } from "@shared/schema";
import { eq } from "drizzle-orm";

interface TargetSeed {
  slug: string;
  displayName: string;
  type: "aggregator" | "direct_api";
  adapterKey: string;
  requiredEnvVars: string[];
  feedsDirectories: string[];
  description: string;
  estimatedProcessingTime: string;
}

const TARGET_SEEDS: TargetSeed[] = [
  {
    slug: "foursquare",
    displayName: "Foursquare",
    type: "aggregator",
    adapterKey: "foursquare",
    requiredEnvVars: ["FOURSQUARE_API_KEY"],
    feedsDirectories: [
      "Apple Maps", "Uber", "Snapchat", "Samsung", "HERE WeGo",
      "TripAdvisor", "Waze", "OpenTable", "Zillow", "Booking.com",
      "MapQuest", "TomTom", "Navmii", "Audi", "BMW", "Mercedes",
      "GasBuddy", "Pitney Bowes",
      "Skyscanner", "Trivago", "Moovit", "Citymapper", "Scout GPS", "Sygic", "Swarm",
    ],
    description: "Foursquare/Factual data aggregator — feeds Apple Maps, Uber, TripAdvisor, Waze, and 21+ other directories",
    estimatedProcessingTime: "1-4 weeks",
  },
  {
    slug: "neustar",
    displayName: "Neustar Localeze",
    type: "aggregator",
    adapterKey: "neustar",
    requiredEnvVars: ["NEUSTAR_API_KEY"],
    feedsDirectories: [
      "Bing", "Yahoo", "Superpages", "DexKnows", "CitySearch",
      "Local.com", "YellowPages.com", "WhitePages", "AnyWho",
      "Switchboard", "InfoSpace", "DogPile", "Addresses.com",
      "Where To?", "USSearch", "PeopleSmart", "Neustar Localeze",
      "YellowBot", "n49.com", "EZLocal", "Judy's Book", "Cybo", "iBegin",
    ],
    description: "Neustar/Localeze aggregator — feeds Bing, Yahoo, Superpages, YellowPages, and 19+ other directories",
    estimatedProcessingTime: "2-6 weeks",
  },
  {
    slug: "data_axle",
    displayName: "Data Axle",
    type: "aggregator",
    adapterKey: "data_axle",
    requiredEnvVars: ["DATA_AXLE_API_KEY"],
    feedsDirectories: [
      "411.com", "Manta", "MerchantCircle", "Hotfrog", "Brownbook",
      "Cylex", "eLocal", "iGlobal", "ShowMeLocal", "Tupalo",
      "ChamberofCommerce.com", "USCity.net", "FindOpen",
      "Data Axle Reference Solutions", "Credibility.com",
      "MapQuest Business", "Loc8NearMe", "BizVotes", "MyLocalServices", "Opendi", "Company.com", "YellowBot",
    ],
    description: "Data Axle/Infogroup aggregator — feeds 411.com, Manta, MerchantCircle, and 19+ other directories",
    estimatedProcessingTime: "2-4 weeks",
  },
  {
    slug: "acxiom",
    displayName: "Acxiom",
    type: "aggregator",
    adapterKey: "acxiom",
    requiredEnvVars: ["ACXIOM_CLIENT_ID", "ACXIOM_CLIENT_SECRET"],
    feedsDirectories: [
      "Epsilon", "Oracle Data Cloud", "TransUnion", "Equifax",
      "Experian", "LiveRamp", "Acxiom AbiliTec", "Acxiom InfoBase",
      "Nielsen", "Dun & Bradstreet", "Verisk", "CoreLogic",
    ],
    description: "Acxiom consumer data aggregator — feeds Epsilon, Oracle Data Cloud, Nielsen, D&B, credit bureaus, and identity networks",
    estimatedProcessingTime: "3-6 weeks",
  },
  {
    slug: "gbp",
    displayName: "Google Business Profile",
    type: "direct_api",
    adapterKey: "gbp",
    requiredEnvVars: ["GOOGLE_PLACES_API_KEY"],
    feedsDirectories: ["Google Business Profile", "Google Maps", "Google Search Local Pack", "Google Hotels", "Google Shopping Local"],
    description: "Direct Google Business Profile API — manages your listing on Google Maps, Search, Hotels, and Shopping",
    estimatedProcessingTime: "1-7 days",
  },
  {
    slug: "facebook",
    displayName: "Facebook Business",
    type: "direct_api",
    adapterKey: "facebook",
    requiredEnvVars: ["FACEBOOK_PAGE_ACCESS_TOKEN"],
    feedsDirectories: ["Facebook Business", "Facebook Marketplace", "Instagram Location", "WhatsApp Business", "Threads"],
    description: "Facebook/Meta Business location management — updates your business page, Instagram, WhatsApp, and Threads",
    estimatedProcessingTime: "1-3 days",
  },
  {
    slug: "bing",
    displayName: "Bing Places",
    type: "direct_api",
    adapterKey: "bing",
    requiredEnvVars: ["BING_PLACES_API_KEY"],
    feedsDirectories: ["Bing Places", "Bing Maps", "Cortana", "MSN Local", "Microsoft Edge Local", "Outlook Local"],
    description: "Bing Places for Business API — manages your listing on Bing Maps, Cortana, MSN, Edge, and Outlook",
    estimatedProcessingTime: "1-2 weeks",
  },
  {
    slug: "apple",
    displayName: "Apple Business Connect",
    type: "direct_api",
    adapterKey: "apple",
    requiredEnvVars: ["APPLE_BUSINESS_CONNECT_TOKEN"],
    feedsDirectories: ["Apple Maps", "Apple Wallet", "Siri", "Safari Suggestions", "Apple Business Chat", "CarPlay POI"],
    description: "Apple Business Connect API — manages your listing on Apple Maps, Siri, Safari, Business Chat, and CarPlay",
    estimatedProcessingTime: "1-2 weeks",
  },
];

/**
 * Seeds the distribution_targets table with all 8 targets.
 * Safe to call multiple times — upserts by slug.
 */
export async function seedDistributionTargets(): Promise<{ created: number; updated: number }> {
  let created = 0;
  let updated = 0;

  for (const seed of TARGET_SEEDS) {
    const [existing] = await db
      .select()
      .from(distributionTargets)
      .where(eq(distributionTargets.slug, seed.slug))
      .limit(1);

    if (existing) {
      await db.update(distributionTargets).set({
        displayName: seed.displayName,
        type: seed.type,
        adapterKey: seed.adapterKey,
        requiredEnvVars: seed.requiredEnvVars,
        feedsDirectories: seed.feedsDirectories,
        description: seed.description,
        estimatedProcessingTime: seed.estimatedProcessingTime,
        updatedAt: new Date(),
      }).where(eq(distributionTargets.id, existing.id));
      updated++;
    } else {
      await db.insert(distributionTargets).values({
        slug: seed.slug,
        displayName: seed.displayName,
        type: seed.type,
        adapterKey: seed.adapterKey,
        requiredEnvVars: seed.requiredEnvVars,
        feedsDirectories: seed.feedsDirectories,
        description: seed.description,
        estimatedProcessingTime: seed.estimatedProcessingTime,
        isEnabled: false,
      });
      created++;
    }
  }

  console.log(`Distribution targets seeded: ${created} created, ${updated} updated`);
  return { created, updated };
}
