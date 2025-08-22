// Simple debug script to test Vendasta API connection
console.log('=== VENDASTA DEBUG SCRIPT ===');
console.log('Environment variables:');
console.log('VENDASTA_API_KEY present:', !!process.env.VENDASTA_API_KEY);
console.log('VENDASTA_CLIENT_ID present:', !!process.env.VENDASTA_CLIENT_ID);
console.log('VENDASTA_CLIENT_SECRET present:', !!process.env.VENDASTA_CLIENT_SECRET);

if (process.env.VENDASTA_API_KEY) {
  console.log('API Key starts with:', process.env.VENDASTA_API_KEY.substring(0, 20) + '...');
}

const testUrl = `https://api.vendasta.com/business-center/customers?apiUser=${process.env.VENDASTA_CLIENT_ID}&apiKey=${encodeURIComponent(process.env.VENDASTA_API_KEY)}`;
console.log('Test URL (without credentials):', 'https://api.vendasta.com/business-center/customers?apiUser=[REDACTED]&apiKey=[REDACTED]');

// Test the connection
fetch(testUrl, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => {
  console.log('Response status:', response.status);
  console.log('Response headers:', Object.fromEntries(response.headers.entries()));
  return response.text();
}).then(text => {
  console.log('Response body:', text.substring(0, 500));
}).catch(error => {
  console.error('Fetch error:', error.message);
  console.error('Full error:', error);
});