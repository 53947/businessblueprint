/**
 * Wipe all data from the database for a fresh start.
 * Preserves table structure, just removes all rows.
 * Run on Replit: npx tsx scripts/wipe-all-data.ts
 */
import { pool } from "../server/db";

async function wipe() {
  const client = await pool.connect();
  try {
    // Get all table names
    const res = await client.query(`
      SELECT tablename FROM pg_tables
      WHERE schemaname = 'public'
      AND tablename != 'drizzle_migrations'
    `);

    const tables = res.rows.map(r => r.tablename);
    console.log(`Found ${tables.length} tables to wipe.\n`);

    // Truncate all tables in one statement with CASCADE to handle FK constraints
    if (tables.length > 0) {
      const tableList = tables.map(t => `"${t}"`).join(", ");
      await client.query(`TRUNCATE ${tableList} CASCADE`);
      console.log("All tables truncated:");
      tables.forEach(t => console.log(`  ✓ ${t}`));
    }

    // Re-seed the demo accounts
    console.log("\nRe-seeding demo accounts...");
    const demoAccounts = [
      { email: "admin@businessblueprint.io", companyName: "businessblueprint.io" },
      { email: "demo@hostsblue.com", companyName: "hostsblue.com" },
      { email: "demo@swipesblue.com", companyName: "swipesblue.com" },
      { email: "demo@builderblue2.com", companyName: "builderblue2.com" },
    ];

    for (const acct of demoAccounts) {
      await client.query(`
        INSERT INTO clients (email, company_name, enabled_features, is_admin, is_protected, is_email_verified, account_status)
        VALUES ($1, $2, 'CO,VI,SP,RE,SO,RI', true, true, true, 'active')
      `, [acct.email, acct.companyName]);
      console.log(`  ✓ ${acct.email}`);
    }

    console.log("\nDone. Database is clean. Demo accounts are ready.");
  } finally {
    client.release();
    process.exit(0);
  }
}

wipe().catch((err) => {
  console.error("Wipe failed:", err);
  process.exit(1);
});
