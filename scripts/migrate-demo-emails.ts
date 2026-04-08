/**
 * Migrate 53947@ demo accounts to demo@ emails.
 * Uses raw SQL to handle the massive number of FK references.
 * Run on Replit: npx tsx scripts/migrate-demo-emails.ts
 */
import { pool } from "../server/db";

const migrations = [
  { from: "53947@businessblueprint.io", to: "admin@businessblueprint.io" },
  { from: "53947@hostsblue.com", to: "demo@hostsblue.com" },
  { from: "53947@swipesblue.com", to: "demo@swipesblue.com" },
  { from: "53947@builderblue2.com", to: "demo@builderblue2.com" },
];

async function migrate() {
  const client = await pool.connect();
  try {
    for (const { from, to } of migrations) {
      // Check if 53947@ record exists
      const sourceRes = await client.query(
        `SELECT id FROM clients WHERE email = $1`, [from]
      );

      if (sourceRes.rows.length > 0) {
        // Check if demo@ already exists
        const demoRes = await client.query(
          `SELECT id FROM clients WHERE email = $1`, [to]
        );

        if (demoRes.rows.length > 0) {
          // Reassign all FK references from old demo@ to 53947@ record, then delete old
          const oldId = demoRes.rows[0].id;
          const newId = sourceRes.rows[0].id;

          // Update all tables that reference the old demo client to point to the 53947 client
          const fkTables = await client.query(`
            SELECT tc.table_name, kcu.column_name
            FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
            JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
            WHERE tc.constraint_type = 'FOREIGN KEY'
              AND ccu.table_name = 'clients'
              AND ccu.column_name = 'id'
          `);

          for (const row of fkTables.rows) {
            await client.query(
              `UPDATE "${row.table_name}" SET "${row.column_name}" = $1 WHERE "${row.column_name}" = $2`,
              [newId, oldId]
            );
          }

          // Now safe to delete old demo@ record
          await client.query(`DELETE FROM clients WHERE id = $1`, [oldId]);
          console.log(`[MERGED] old demo record (id: ${oldId}) into 53947 record (id: ${newId})`);
        }

        // Rename 53947@ → demo@ and ensure admin
        await client.query(`
          UPDATE clients SET
            email = $1,
            is_admin = true,
            is_protected = true,
            is_email_verified = true,
            enabled_features = 'CO,VI,SP,RE,SO,RI',
            account_status = 'active'
          WHERE email = $2
        `, [to, from]);
        console.log(`[UPDATED] ${from} → ${to}`);

      } else {
        // No 53947@ record — check if demo@ exists and just update it
        const demoRes = await client.query(
          `SELECT id FROM clients WHERE email = $1`, [to]
        );

        if (demoRes.rows.length > 0) {
          await client.query(`
            UPDATE clients SET
              is_admin = true,
              is_protected = true,
              is_email_verified = true,
              enabled_features = 'CO,VI,SP,RE,SO,RI',
              account_status = 'active'
            WHERE email = $1
          `, [to]);
          console.log(`[UPDATED] ${to} — already exists, set to admin`);
        } else {
          // Create fresh
          await client.query(`
            INSERT INTO clients (email, company_name, enabled_features, is_admin, is_protected, is_email_verified, account_status)
            VALUES ($1, $2, 'CO,VI,SP,RE,SO,RI', true, true, true, 'active')
          `, [to, to.split("@")[1]]);
          console.log(`[CREATED] ${to}`);
        }
      }
    }

    console.log("\nDone. demo@ accounts are admin/protected. 53947@ emails are free.");
  } finally {
    client.release();
    process.exit(0);
  }
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
