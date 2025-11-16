import { getMyThreads, getThread } from './server/services/agentmail';

async function readAllEmails() {
  try {
    console.log('📧 Reading all emails from businessblueprint.agent@agentmail.triadblue.com\n');
    console.log('='.repeat(80) + '\n');
    
    const threads = await getMyThreads();
    
    if (!threads || !threads.threads || threads.threads.length === 0) {
      console.log('No emails found.');
      return;
    }
    
    console.log(`Found ${threads.threads.length} email thread(s)\n`);
    
    // Read each thread in detail
    for (let i = 0; i < threads.threads.length; i++) {
      const threadPreview = threads.threads[i];
      console.log(`\n${'='.repeat(80)}`);
      console.log(`EMAIL ${i + 1} of ${threads.threads.length}`);
      console.log('='.repeat(80));
      console.log(`Subject: ${threadPreview.subject}`);
      console.log(`From: ${threadPreview.senders.join(', ')}`);
      console.log(`Date: ${threadPreview.timestamp}`);
      console.log(`Labels: ${threadPreview.labels.join(', ')}`);
      console.log('-'.repeat(80));
      
      // Get full thread content
      const fullThread = await getThread(threadPreview.inboxId, threadPreview.threadId);
      console.log('\nFULL CONTENT:');
      console.log(JSON.stringify(fullThread, null, 2));
      console.log('\n');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

readAllEmails();
