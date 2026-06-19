const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');
fs.mkdirSync(assetsDir, { recursive: true });

const png = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64'
);

for (const name of ['icon.png', 'splash-icon.png', 'adaptive-icon.png']) {
  fs.writeFileSync(path.join(assetsDir, name), png);
}

console.log('Created placeholder assets in', assetsDir);
