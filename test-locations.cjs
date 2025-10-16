const synup = require('@mx-inventor/synup')(process.env.SYNUP_API_KEY);

console.log('Testing Synup Locations.list()...\n');

synup.Locations.list()
  .then(response => {
    console.log('✅ Success!');
    console.log('Response:', JSON.stringify(response, null, 2));
  })
  .catch(error => {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
  });
