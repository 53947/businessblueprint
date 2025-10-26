const fs = require('fs');
const { spawn } = require('child_process');

// Use tar to extract since it can handle zip on some systems
const tar = spawn('tar', ['-xzf', 'Triad Blue.colorpalette_1761474925931.zip']);

tar.on('close', (code) => {
  if (code === 0) {
    console.log('Extracted successfully');
  } else {
    // Try manual extraction using Node
    const execSync = require('child_process').execSync;
    try {
      execSync('file "Triad Blue.colorpalette_1761474925931.zip"');
    } catch (e) {
      console.log('Using fallback method');
    }
  }
});
