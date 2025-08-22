// Test various customer identifiers to find working ones
console.log('=== CUSTOMER SYNC TEST ===');

const testCustomers = [
  'webhosted',
  'test',
  'demo',
  'cloudpleaser',
  'sample-customer',
  '12345',
  'default'
];

async function testCustomerSync(customerIdentifier) {
  console.log(`\n🧪 Testing customer: ${customerIdentifier}`);
  
  try {
    const response = await fetch('http://localhost:5000/api/clients/sync-vendasta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ customerIdentifier })
    });
    
    const data = await response.json();
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    return response.status === 200;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('Testing customer sync with various identifiers...\n');
  
  for (const customer of testCustomers) {
    const success = await testCustomerSync(customer);
    if (success) {
      console.log(`\n🎉 Found working customer: ${customer}`);
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between tests
  }
  
  console.log('\n✅ Customer sync test complete!');
}

runTests().catch(console.error);