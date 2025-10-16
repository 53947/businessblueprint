const synup = require('@mx-inventor/synup')(process.env.SYNUP_API_KEY);

console.log('Synup SDK structure:');
console.log('Type:', typeof synup);
console.log('Keys:', Object.keys(synup));
console.log('');

// Check each module
for (const key of Object.keys(synup)) {
  console.log(`${key}:`, typeof synup[key], Object.keys(synup[key] || {}));
}
