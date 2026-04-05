import pg from "pg";

const EMAIL = process.argv[2] || "support@businessblueprint.io";

async function main() {
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const { rows } = await client.query("SELECT id, email, company_name, is_protected FROM clients WHERE email = $1", [EMAIL]);
  if (rows.length === 0) {
    console.log(`No client found with email: ${EMAIL}`);
    await client.end();
    return;
  }

  if (rows[0].is_protected) {
    console.log(`Client ${EMAIL} is PROTECTED. Aborting.`);
    await client.end();
    return;
  }

  const clientId = rows[0].id;
  console.log(`Found client: ID=${clientId}, email=${rows[0].email}, company=${rows[0].company_name}`);
  console.log(`Deleting all data for this client...\n`);

  // Use a single transaction with deferred constraints
  await client.query("BEGIN");
  await client.query("SET CONSTRAINTS ALL DEFERRED");

  // Get all tables that have a client_id column
  const { rows: fkTables } = await client.query(`
    SELECT DISTINCT tc.table_name
    FROM information_schema.columns c
    JOIN information_schema.table_constraints tc ON tc.table_schema = c.table_schema
    WHERE c.column_name = 'client_id'
      AND c.table_schema = 'public'
      AND c.table_name != 'clients'
    ORDER BY tc.table_name
  `);

  let totalDeleted = 0;

  // Delete from all tables with client_id
  for (const { table_name } of fkTables) {
    try {
      const result = await client.query(`DELETE FROM "${table_name}" WHERE client_id = $1`, [clientId]);
      if (result.rowCount && result.rowCount > 0) {
        console.log(`  ${table_name}: deleted ${result.rowCount} row(s)`);
        totalDeleted += result.rowCount;
      }
    } catch (err: any) {
      console.log(`  ${table_name}: skipped (${err.message?.split('\n')[0]})`);
    }
  }

  // Also delete magic_link_tokens by email
  try {
    const r = await client.query("DELETE FROM magic_link_tokens WHERE email = $1", [EMAIL]);
    if (r.rowCount && r.rowCount > 0) {
      console.log(`  magic_link_tokens: deleted ${r.rowCount} row(s)`);
      totalDeleted += r.rowCount;
    }
  } catch {}

  // Delete the client record
  const del = await client.query("DELETE FROM clients WHERE id = $1", [clientId]);
  console.log(`  clients: deleted ${del.rowCount} row(s)`);
  totalDeleted += del.rowCount || 0;

  await client.query("COMMIT");
  console.log(`\nDone. Total rows deleted: ${totalDeleted}`);
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
