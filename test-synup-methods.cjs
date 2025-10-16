// Quick test of individual Synup SDK methods
const synup = require('@mx-inventor/synup')(process.env.SYNUP_API_KEY);

const LOCATION_ID = 60487;

async function testMethod(name, fn) {
  console.log(`\n🧪 Testing ${name}...`);
  try {
    const result = await Promise.race([
      fn(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout after 5s')), 5000))
    ]);
    console.log(`✅ ${name} Success:`, JSON.stringify(result, null, 2).substring(0, 500));
    return result;
  } catch (error) {
    console.log(`⚠️ ${name} Error:`, error.message);
    return null;
  }
}

async function run() {
  console.log('Testing Synup SDK Methods...\n');
  
  // Test Listings methods
  await testMethod('Listings.getPremium', () => synup.Listings.getPremium(LOCATION_ID));
  await testMethod('Listings.getAdittional', () => synup.Listings.getAdittional(LOCATION_ID));
  
  // Test Interactions (Reviews) methods
  await testMethod('Interactions.getByLocationId', () => synup.Interactions.getByLocationId(LOCATION_ID));
  await testMethod('Interactions.getSourcesByLocation', () => synup.Interactions.getSourcesByLocation(LOCATION_ID));
  
  // Test Analytics
  await testMethod('Analytics.google.getRankingPerformance', () => synup.Analytics.google.getRankingPerformance(LOCATION_ID));
  
  console.log('\n✅ All tests complete!');
  process.exit(0);
}

run();
