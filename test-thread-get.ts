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

async function test() {
  const threads = await getMyThreads();
  const firstThread = threads.threads[0];
  
  console.log('First thread data:');
  console.log('  inboxId:', firstThread.inboxId);
  console.log('  threadId:', firstThread.threadId);
  console.log('  threadId type:', typeof firstThread.threadId);
  
  const {apiKey} = await getCredentials();
  const client = new AgentMailClient({
    baseUrl: "https://api.agentmail.to",
    apiKey: apiKey
  });
  
  // Try calling with different parameter structures
  try {
    console.log('\nTrying: client.threads.get(threadId)');
    const result = await client.threads.get(firstThread.threadId);
    console.log('Success!', result);
  } catch (e: any) {
    console.log('Failed:', e.message);
  }
}

test();
