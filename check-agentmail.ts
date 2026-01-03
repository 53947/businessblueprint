import { AgentMailClient } from 'agentmail';

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  const connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=agentmail',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || !connectionSettings.settings.api_key) {
    throw new Error('AgentMail not connected');
  }
  return { apiKey: connectionSettings.settings.api_key };
}

async function main() {
  const { apiKey } = await getCredentials();
  const client = new AgentMailClient({ apiKey });

  const inboxId = "agents@agentmail.triadblue.com";
  const messageId = "PDAxMDAwMTliODJiZjUyYWQtZDQzM2FiNDYtNWI5OC00OWIxLWEwNzgtMWJiZTQwZDhkNGU1LTAwMDAwMEBlbWFpbC5hbWF6b25zZXMuY29tPg";
  
  // Get full message
  const message = await client.inboxes.messages.get(inboxId, messageId);
  console.log("=== FULL EMAIL ===\n");
  console.log("From:", message.from);
  console.log("To:", message.to);
  console.log("Subject:", message.subject);
  console.log("Date:", message.timestamp);
  console.log("\n--- TEXT CONTENT ---\n");
  console.log(message.text || "(no text version)");
}

main().catch(console.error);
