// Direct test of Synup SDK with live data
const synup = require('@mx-inventor/synup')(process.env.SYNUP_API_KEY);

async function testSynupIntegration() {
  console.log('🧪 Testing Synup Live Data Integration\n');
  console.log('=' .repeat(50));
  
  try {
    // Test 1: Get Locations
    console.log('\n📍 Test 1: Fetching Locations...');
    const locationsResponse = await synup.Locations.list();
    const locations = locationsResponse.edges.map(e => e.node);
    
    console.log(`✅ Found ${locations.length} location(s)`);
    
    if (locations.length > 0) {
      const location = locations[0];
      console.log('\nLocation Details:');
      console.log(`  - Account ID: ${location.accountId}`);
      console.log(`  - Name: ${location.name}`);
      console.log(`  - Address: ${location.street}, ${location.city}, ${location.stateIso}`);
      console.log(`  - Status: ${location.approved}`);
      
      // Test 2: Get Listings for this location
      console.log('\n' + '='.repeat(50));
      console.log('\n📋 Test 2: Fetching Listings...');
      
      try {
        const listingsResponse = await synup.Listings.getPremium(location.accountId);
        console.log('✅ Listings Response:', JSON.stringify(listingsResponse, null, 2));
      } catch (listingsError) {
        console.log('⚠️ Listings Error:', listingsError.message);
        
        // Try alternative method
        try {
          const altListings = await synup.Listings.getAdittional(location.accountId);
          console.log('✅ Additional Listings:', JSON.stringify(altListings, null, 2));
        } catch (altError) {
          console.log('⚠️ Alternative Listings Error:', altError.message);
        }
      }
      
      // Test 3: Get Reviews/Interactions
      console.log('\n' + '='.repeat(50));
      console.log('\n⭐ Test 3: Fetching Reviews (Interactions)...');
      
      try {
        const reviewsResponse = await synup.Interactions.getByLocationId(location.accountId);
        console.log('✅ Reviews Response:', JSON.stringify(reviewsResponse, null, 2));
      } catch (reviewsError) {
        console.log('⚠️ Reviews Error:', reviewsError.message);
      }
      
      // Test 4: Get Analytics
      console.log('\n' + '='.repeat(50));
      console.log('\n📊 Test 4: Fetching Analytics...');
      
      try {
        const analyticsGoogle = await synup.Analytics.google.getRankingPerformance(location.accountId);
        console.log('✅ Google Analytics:', JSON.stringify(analyticsGoogle, null, 2));
      } catch (analyticsError) {
        console.log('⚠️ Analytics Error:', analyticsError.message);
      }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('\n🎉 Synup Integration Test Complete!\n');
    
  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    console.error('Full Error:', error);
  }
}

testSynupIntegration();
