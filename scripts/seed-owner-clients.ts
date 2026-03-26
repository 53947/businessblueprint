/**
 * Seed script — creates Dean's owner/admin client records.
 * Run on Replit: npx tsx scripts/seed-owner-clients.ts
 */
import { db } from "../server/db";
import { clients } from "../shared/schema";
import { eq } from "drizzle-orm";

const ownerClients = [
  { email: "53947@businessblueprint.io", companyName: "businessblueprint.io" },
  { email: "53947@hostsblue.com", companyName: "hostsblue.com" },
  { email: "53947@swipesblue.com", companyName: "swipesblue.com" },
  { email: "53947@builderblue2.com", companyName: "builderblue2.com" },
];

async function seed() {
  for (const entry of ownerClients) {
    // Check if already exists
    const [existing] = await db
      .select()
      .from(clients)
      .where(eq(clients.email, entry.email));

    if (existing) {
      console.log(`[SKIP] ${entry.email} already exists (id: ${existing.id})`);
      continue;
    }

    const [created] = await db
      .insert(clients)
      .values({
        email: entry.email,
        companyName: entry.companyName,
        enabledFeatures: "CO,VI,SP,RE,SO,RI",
        isAdmin: true,
        isProtected: true,
        isEmailVerified: true,
        accountStatus: "active",
      })
      .returning();

    console.log(`[CREATED] ${created.email} → id: ${created.id}`);
  }

  console.log("\nDone.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
