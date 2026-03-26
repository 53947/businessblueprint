/**
 * Migrate 53947@ demo accounts to demo@ emails.
 * Removes any existing demo@ records first to avoid conflicts.
 * Run on Replit: npx tsx scripts/migrate-demo-emails.ts
 */
import { db } from "../server/db";
import { clients } from "../shared/schema";
import { eq } from "drizzle-orm";

const migrations = [
  { from: "53947@businessblueprint.io", to: "demo@businessblueprint.io" },
  { from: "53947@hostsblue.com", to: "demo@hostsblue.com" },
  { from: "53947@swipesblue.com", to: "demo@swipesblue.com" },
  { from: "53947@builderblue2.com", to: "demo@builderblue2.com" },
];

async function migrate() {
  for (const { from, to } of migrations) {
    // Remove any existing demo@ record that would conflict
    const [existingDemo] = await db
      .select()
      .from(clients)
      .where(eq(clients.email, to));

    if (existingDemo) {
      await db.delete(clients).where(eq(clients.email, to));
      console.log(`[REMOVED] old ${to} (id: ${existingDemo.id})`);
    }

    // Find the 53947@ record
    const [source] = await db
      .select()
      .from(clients)
      .where(eq(clients.email, from));

    if (!source) {
      // No 53947@ record — create a fresh demo@ record
      const [created] = await db
        .insert(clients)
        .values({
          email: to,
          companyName: to.split("@")[1],
          enabledFeatures: "CO,VI,SP,RE,SO,RI",
          isAdmin: true,
          isProtected: true,
          isEmailVerified: true,
          accountStatus: "active",
        })
        .returning();
      console.log(`[CREATED] ${created.email} (id: ${created.id})`);
      continue;
    }

    // Rename 53947@ → demo@ and ensure admin + protected
    const [updated] = await db
      .update(clients)
      .set({
        email: to,
        isAdmin: true,
        isProtected: true,
        isEmailVerified: true,
        enabledFeatures: "CO,VI,SP,RE,SO,RI",
        accountStatus: "active",
      })
      .where(eq(clients.id, source.id))
      .returning();

    console.log(`[UPDATED] ${from} → ${updated.email} (id: ${updated.id})`);
  }

  console.log("\nDone. demo@ accounts are admin/protected. 53947@ emails are free.");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
