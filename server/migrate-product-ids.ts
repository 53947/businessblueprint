/**
 * Migration: Rename product_id values in the products table
 *
 * Old IDs → New IDs (matching app-registry.ts):
 *   inbox → respond
 *   send → promote
 *   livechat → engage
 *   content → post (already correct in some rows)
 *   commverse → compass
 *   listings → publish
 *   reputation → elevate
 *   localblue → anchor
 *   relationships → connect
 *
 * Also updates product names and descriptions to match current branding.
 * This migration also updates referencing tables:
 *   - assessment_product_recommendations.product_id
 *   - recommendations.product_id
 *   - recommendations.bundle_id
 *
 * Run: npx tsx server/migrate-product-ids.ts
 */

import { db } from "./db";
import { sql } from "drizzle-orm";

const ID_RENAMES: [string, string][] = [
  ['inbox', 'respond'],
  ['send', 'promote'],
  ['livechat', 'engage'],
  ['content', 'post'],
  ['commverse', 'compass'],
  ['listings', 'publish'],
  ['reputation', 'elevate'],
  ['localblue', 'anchor'],
  ['relationships', 'connect'],
];

const NAME_UPDATES: Record<string, { name: string; description: string }> = {
  'respond': {
    name: '/ respond',
    description: 'Unified Multi-Channel Inbox — Consolidates email, SMS, social messages, live chat into ONE inbox',
  },
  'promote': {
    name: '/ promote',
    description: 'Email Campaign Manager — Build and segment your customer list, create campaigns',
  },
  'engage': {
    name: '/ engage',
    description: 'Live Chat Widget — Real-time customer support and lead capture',
  },
  'post': {
    name: '/ post',
    description: 'Social Media Manager — Schedule posts, create content with AI, track engagement',
  },
  'compass': {
    name: 'Compass Suite',
    description: 'Communication & Marketing Bundle — All 4 communication tools (/ promote, / respond, / engage, / post) in one integrated platform',
  },
  'publish': {
    name: '/ publish',
    description: 'Business Listings Manager — Manage 50+ directory listings from one dashboard',
  },
  'elevate': {
    name: '/ elevate',
    description: 'Reputation & Reviews Manager — Monitor and respond to reviews across all platforms',
  },
  'anchor': {
    name: 'Anchor Suite',
    description: 'Local SEO & Reputation Bundle — / publish, / elevate, / optimize, / amplify in one integrated platform',
  },
  'connect': {
    name: '/ connect',
    description: 'Customer Relationship Management Tool — Centralized customer database and sales pipeline',
  },
};

async function migrateProductIds() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  Product ID Migration — Old Names → New Names");
  console.log("═══════════════════════════════════════════════════\n");

  try {
    // Step 1: Rename product_id in the products table
    console.log("Step 1: Renaming product_id values in products table...\n");
    for (const [oldId, newId] of ID_RENAMES) {
      const result = await db.execute(
        sql`UPDATE products SET product_id = ${newId} WHERE product_id = ${oldId}`
      );
      console.log(`  ${oldId} → ${newId}`);
    }

    // Step 2: Update names and descriptions
    console.log("\nStep 2: Updating product names and descriptions...\n");
    for (const [id, data] of Object.entries(NAME_UPDATES)) {
      await db.execute(
        sql`UPDATE products SET name = ${data.name}, description = ${data.description} WHERE product_id = ${id}`
      );
      console.log(`  ${id}: name="${data.name}"`);
    }

    // Step 3: Update product_id references in assessment_product_recommendations
    console.log("\nStep 3: Updating assessment_product_recommendations.product_id...\n");
    for (const [oldId, newId] of ID_RENAMES) {
      await db.execute(
        sql`UPDATE assessment_product_recommendations SET product_id = ${newId} WHERE product_id = ${oldId}`
      );
      console.log(`  assessment_product_recommendations: ${oldId} → ${newId}`);
    }

    // Step 4: Update product_id and bundle_id references in recommendations
    console.log("\nStep 4: Updating recommendations.product_id and bundle_id...\n");
    for (const [oldId, newId] of ID_RENAMES) {
      await db.execute(
        sql`UPDATE recommendations SET product_id = ${newId} WHERE product_id = ${oldId}`
      );
      await db.execute(
        sql`UPDATE recommendations SET bundle_id = ${newId} WHERE bundle_id = ${oldId}`
      );
      console.log(`  recommendations: ${oldId} → ${newId}`);
    }

    // Step 5: Update prices to $29/mo (all standalone apps are now $29)
    console.log("\nStep 5: Updating prices to $29.00 for all standalone apps...\n");
    const standaloneApps = ['respond', 'promote', 'engage', 'post', 'publish', 'elevate', 'optimize', 'amplify', 'connect'];
    for (const appId of standaloneApps) {
      await db.execute(
        sql`UPDATE products SET diy_price = '29.00' WHERE product_id = ${appId}`
      );
    }
    // Bundles are $99/mo
    for (const bundleId of ['compass', 'anchor']) {
      await db.execute(
        sql`UPDATE products SET diy_price = '99.00' WHERE product_id = ${bundleId}`
      );
    }
    console.log("  All standalone apps: $29.00/mo");
    console.log("  All bundles: $99.00/mo");

    console.log("\n═══════════════════════════════════════════════════");
    console.log("  Migration complete!");
    console.log("═══════════════════════════════════════════════════");
    process.exit(0);
  } catch (error) {
    console.error("\nMigration FAILED:", error);
    process.exit(1);
  }
}

migrateProductIds();
