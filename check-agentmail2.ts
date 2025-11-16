import agentmail from 'agentmail';
console.log('Default export:', agentmail);
console.log('Type:', typeof agentmail);
if (typeof agentmail === 'function') {
  console.log('Constructor name:', agentmail.name);
}
