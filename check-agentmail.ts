import { AgentMailClient } from 'agentmail';

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) throw new Error('X_REPLIT_TOKEN not found');

  const connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=agentmail',
    { headers: { 'Accept': 'application/json', 'X_REPLIT_TOKEN': xReplitToken } }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings?.settings?.api_key) throw new Error('AgentMail not connected');
  return { apiKey: connectionSettings.settings.api_key };
}

async function main() {
  const { apiKey } = await getCredentials();
  const client = new AgentMailClient({ apiKey });

  const inboxId = "agents@agentmail.triadblue.com";
  const messagesResponse = await client.inboxes.messages.list(inboxId);
  
  console.log("=== ALL MESSAGES IN INBOX ===\n");
  console.log(`Total messages: ${messagesResponse.count}\n`);
  
  if (messagesResponse.messages) {
    for (const msg of messagesResponse.messages) {
      console.log(`--- ${msg.subject} ---`);
      console.log(`From: ${msg.from}`);
      console.log(`Date: ${msg.timestamp}`);
      console.log(`Preview: ${msg.preview?.substring(0, 100)}...`);
      console.log("");
    }
  }
}

main().catch(console.error);
