import pg from "pg";

const EMAIL = "support@businessblueprint.io";

async function main() {
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  // Find the client ID first
  const { rows } = await client.query("SELECT id, email, company_name FROM clients WHERE email = $1", [EMAIL]);
  if (rows.length === 0) {
    console.log(`No client found with email: ${EMAIL}`);
    await client.end();
    return;
  }

  const clientId = rows[0].id;
  console.log(`Found client: ID=${clientId}, email=${rows[0].email}, company=${rows[0].company_name}`);

  // Delete dependent records in order, then the client
  const tables = [
    "setup_task_events",
    "setup_notes",
    "setup_tasks",
    "ai_coach_messages",
    "ai_coach_conversations",
    "client_assessments",
    "account_status_history",
    "magic_link_tokens",
    "dashboard_access",
    "email_change_history",
    "billing_history",
    "subscription_addon_selections",
    "subscriptions",
    "support_tickets",
    "livechat_sessions",
    "impersonation_audit_log",
    "impersonation_sessions",
    "inbox_messages",
    "campaigns",
    "send_campaign_sends",
    "send_campaigns",
    "send_list_contacts",
    "send_contacts",
    "send_lists",
    "prescriptions",
    "brand_colors",
    "brand_assets",
    "tasks",
    "social_media_accounts",
    "content_posts",
    "content_templates",
    "inbox_channel_connections",
    "inbox_conversations",
    "chat_widget_settings",
    "chat_agents",
    "chat_analytics_events",
    "canonical_business_profiles",
    "business_listings",
    "business_reviews",
    "domains",
    "crm_companies",
    "crm_contacts",
    "crm_pipelines",
    "crm_segments",
    "crm_tags",
    "crm_lead_forms",
    "crm_automations",
    "crm_subscriptions",
    "crm_appointments",
    "api_keys",
    "webhook_subscriptions",
    "email_templates",
    "email_logs",
    "admin_activity_log",
    "ai_settings",
    "ad_account_connections",
    "seo_profiles",
  ];

  let totalDeleted = 0;
  for (const table of tables) {
    try {
      const col = table === "magic_link_tokens" ? "email" : "client_id";
      const val = table === "magic_link_tokens" ? EMAIL : clientId;
      const result = await client.query(`DELETE FROM ${table} WHERE ${col} = $1`, [val]);
      if (result.rowCount && result.rowCount > 0) {
        console.log(`  ${table}: deleted ${result.rowCount} row(s)`);
        totalDeleted += result.rowCount;
      }
    } catch {
      // Table might not have client_id column, skip silently
    }
  }

  // Delete the client record itself
  const del = await client.query("DELETE FROM clients WHERE id = $1", [clientId]);
  console.log(`  clients: deleted ${del.rowCount} row(s)`);
  totalDeleted += del.rowCount || 0;

  console.log(`\nDone. Total rows deleted: ${totalDeleted}`);
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
