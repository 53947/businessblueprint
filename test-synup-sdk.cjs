// Test Synup SDK directly
const synup = require('@mx-inventor/synup')(process.env.SYNUP_API_KEY);

const { Locations, Listings, Interactions } = synup;

console.log('Testing Synup SDK with API key...');
console.log('API Key (first 4 chars):', process.env.SYNUP_API_KEY.substring(0, 4));
console.log('');

// Test 1: Get all locations
console.log('Test 1: Fetching all locations...');
Locations.getAll()
  .then(response => {
    console.log('✅ Success! Raw response:', JSON.stringify(response, null, 2));
    
    // Check different possible response formats
    const locations = response.data?.locations || response.locations || response.data || response;
    console.log('\nParsed locations:', JSON.stringify(locations, null, 2));
    
    // If we got locations, try to fetch listings for the first one
    if (Array.isArray(locations) && locations.length > 0) {
      const locationId = locations[0].id;
      console.log(`\nTest 2: Fetching listings for location ${locationId}...`);
      
      return Listings.getAll(locationId);
    } else if (locations && locations.id) {
      // Single location response
      const locationId = locations.id;
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
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  });
