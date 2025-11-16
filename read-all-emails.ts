import { getMyThreads } from './server/services/agentmail';
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
  return {apiKey: connectionSettings.settings.api_key};
}

async function readAll() {
  const threads = await getMyThreads();
  const {apiKey} = await getCredentials();
  const client = new AgentMailClient({
    baseUrl: "https://api.agentmail.to",
    apiKey: apiKey
  });
  
  console.log('📧 READING ALL EMAILS THOROUGHLY\n');
  console.log('='.repeat(100) + '\n');
  
  for (let i = 0; i < threads.threads.length; i++) {
    const threadPreview = threads.threads[i];
    const fullThread = await client.threads.get(threadPreview.threadId);
    
    console.log(`\n${'='.repeat(100)}`);
    console.log(`EMAIL ${i + 1} of ${threads.threads.length}`);
    console.log('='.repeat(100));
    console.log(`📬 Subject: ${fullThread.subject}`);
    console.log(`👤 From: ${fullThread.senders.join(', ')}`);
    console.log(`📅 Date: ${fullThread.timestamp}`);
    console.log(`🏷️  Labels: ${fullThread.labels.join(', ')}`);
    console.log('-'.repeat(100));
    console.log('\n📄 FULL EMAIL CONTENT:\n');
    
    if (fullThread.messages && fullThread.messages.length > 0) {
      fullThread.messages.forEach((msg: any, msgIdx: number) => {
        console.log(`\n--- Message ${msgIdx + 1} ---\n`);
        console.log(msg.text || msg.html || 'No content');
      });
    }
    
    console.log('\n' + '='.repeat(100) + '\n');
  }
}

readAll();
