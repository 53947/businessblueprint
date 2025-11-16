import { getMyInboxes, getMyThreads } from './server/services/agentmail';

async function checkMyInbox() {
  try {
    console.log('📧 Checking my AgentMail inbox...\n');
    console.log('My email: businessblueprint.agent@agentmail.triadblue.com\n');
    
    // Get inboxes
    const inboxes = await getMyInboxes();
    console.log('✅ My Inboxes:');
    console.log(JSON.stringify(inboxes, null, 2));
    console.log('\n');
    
    // Get threads/emails
    const threads = await getMyThreads();
    console.log('✅ My Threads/Emails:');
    console.log(JSON.stringify(threads, null, 2));
    
    if (threads && threads.data && threads.data.length > 0) {
      console.log(`\n📬 I have ${threads.data.length} email thread(s)!`);
    } else {
      console.log('\n📭 Inbox is empty - waiting for emails...');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkMyInbox();
