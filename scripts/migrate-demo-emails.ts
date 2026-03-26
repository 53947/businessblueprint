/**
 * Migrate 53947@ demo accounts to demo@ emails.
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
    const [existing] = await db
      .select()
      .from(clients)
      .where(eq(clients.email, from));

    if (!existing) {
      console.log(`[SKIP] ${from} not found`);
      continue;
    }

    const [updated] = await db
      .update(clients)
      .set({ email: to })
      .where(eq(clients.email, from))
      .returning();

    console.log(`[UPDATED] ${from} → ${updated.email} (id: ${updated.id})`);
  }

  console.log("\nDone. 53947@ emails are now free for real user accounts.");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
