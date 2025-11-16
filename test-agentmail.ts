import { getMyInbox, getMyEmails } from './server/services/agentmail';

async function testAgentMail() {
  try {
    console.log('Testing AgentMail connection...\n');
    
    // Get inbox info
    const inbox = await getMyInbox();
    console.log('✅ My AgentMail Inbox:');
    console.log(JSON.stringify(inbox, null, 2));
    console.log('\n');
    
    // Get emails
    const emails = await getMyEmails();
    console.log('✅ My Emails:');
    console.log(JSON.stringify(emails, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testAgentMail();
