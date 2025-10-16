// Test Synup SDK directly
const synup = require('@mx-inventor/synup')(process.env.SYNUP_API_KEY);

const { Locations, Listings, Interactions } = synup;

console.log('Testing Synup SDK with API key...');
console.log('');

// Test 1: Get all locations
console.log('Test 1: Fetching all locations...');
Locations.getAll()
  .then(response => {
    console.log('✅ Success! Locations response:', JSON.stringify(response, null, 2));
    
    // If we got locations, try to fetch listings for the first one
    if (response && response.length > 0) {
      const locationId = response[0].id;
      console.log(`\nTest 2: Fetching listings for location ${locationId}...`);
      
      return Listings.getAll(locationId);
    }
  })
  .then(listingsResponse => {
    if (listingsResponse) {
      console.log('✅ Listings response:', JSON.stringify(listingsResponse, null, 2));
    }
  })
  .catch(error => {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  });
