// Direct test of Vendasta Business Center API
console.log('=== DIRECT VENDASTA API TEST ===');

const baseUrl = 'https://business-center-api.vendasta.com';
const apiUser = process.env.VENDASTA_CLIENT_ID;
const apiKey = process.env.VENDASTA_API_KEY;

console.log('Config:', {
  baseUrl,
  hasApiUser: !!apiUser,
  hasApiKey: !!apiKey,
  apiUserSample: apiUser ? apiUser.substring(0, 10) + '...' : 'none'
});

const endpoints = [
  '/account',
  '/account/list',
  '/api/account',
  '/api/account/list', 
  '/api/v3/account/create',
  '/api/v2/account/create',
  '/business-center/account'
];

async function testEndpoint(endpoint) {
  const url = `${baseUrl}${endpoint}?apiUser=${apiUser}&apiKey=${encodeURIComponent(apiKey)}`;
  const displayUrl = `${baseUrl}${endpoint}?apiUser=${apiUser}&apiKey=[REDACTED]`;
  
  console.log(`\nTesting: ${displayUrl}`);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Response: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ SUCCESS! Response:', JSON.stringify(data, null, 2).substring(0, 500));
      return true;
    } else {
      const text = await response.text();
      console.log(`❌ Failed: ${text.substring(0, 300)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('\n🧪 Testing all endpoints...\n');
  
  for (const endpoint of endpoints) {
    const success = await testEndpoint(endpoint);
    if (success) {
      console.log(`\n🎉 Found working endpoint: ${endpoint}`);
      break;
    }
  }
  
  console.log('\n✅ Test complete!');
}

runTests().catch(console.error);