import bcrypt from "bcryptjs";
import pg from "pg";

const password = "Admin2026";
const email = "53947@triadblue.com";

async function main() {
  const hash = await bcrypt.hash(password, 10);
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const result = await client.query(
    "UPDATE users SET password_hash = $1 WHERE email = $2",
    [hash, email]
  );
  console.log(`Updated ${result.rowCount} row(s). Password set to: ${password}`);
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
