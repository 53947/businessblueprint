import { AgentMailClient } from 'agentmail';

const client = new AgentMailClient({
  baseUrl: "https://api.agentmail.to",
  apiKey: "test"
});

console.log('Client properties:', Object.keys(client));
console.log('\nClient prototype:', Object.getOwnPropertyNames(Object.getPrototypeOf(client)));
