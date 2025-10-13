import { synupService } from './services/synup.js';

async function testSynupIntegration() {
  console.log('🧪 Testing Synup API Integration...\n');

  try {
    // Test 1: List all locations
    console.log('📍 Test 1: Fetching all locations from Synup...');
    const locations = await synupService.getAllLocations();
    console.log(`✅ Success! Found ${locations.length} location(s)`);
    
    if (locations.length > 0) {
      console.log('\n📋 Sample location:');
      const sampleLocation = locations[0];
      console.log(JSON.stringify(sampleLocation, null, 2));
      
      // Test 2: Get specific location details
      console.log(`\n📍 Test 2: Fetching details for location ID: ${sampleLocation.id}...`);
      const locationDetails = await synupService.getLocation(sampleLocation.id);
      console.log('✅ Success! Location details retrieved');
      console.log(JSON.stringify(locationDetails, null, 2));
      
      // Test 3: Get location listings
      console.log(`\n📝 Test 3: Fetching listings for location ID: ${sampleLocation.id}...`);
      const listings = await synupService.getLocationListings(sampleLocation.id);
      console.log(`✅ Success! Found ${listings.length} listing(s)`);
      
      if (listings.length > 0) {
        console.log('\n📋 Sample listing:');
        console.log(JSON.stringify(listings[0], null, 2));
      }
      
      // Test 4: Get location reviews
      console.log(`\n⭐ Test 4: Fetching reviews for location ID: ${sampleLocation.id}...`);
      const reviews = await synupService.getLocationReviews(sampleLocation.id);
      console.log(`✅ Success! Found ${reviews.length} review(s)`);
      
      if (reviews.length > 0) {
        console.log('\n📋 Sample review:');
        console.log(JSON.stringify(reviews[0], null, 2));
      }
      
      // Test 5: Sync location listings
      console.log(`\n🔄 Test 5: Syncing listings for location ID: ${sampleLocation.id}...`);
      const syncResult = await synupService.syncLocationListings(sampleLocation.id);
      console.log(`✅ Success! Listings sync ${syncResult ? 'completed' : 'initiated'}`);
      
    } else {
      console.log('\n⚠️  No locations found in Synup account');
      console.log('This is expected if this is a new account');
    }
    
    console.log('\n✅ All Synup API tests completed successfully!');
    
  } catch (error: any) {
    console.error('\n❌ Test failed:', error.message);
    if (error.response?.data) {
      console.error('API Error Details:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

testSynupIntegration();
