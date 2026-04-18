import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const root = process.cwd();
const publicDir = join(root, 'client', 'public');
const emailFiles = [
  'server/services/assessment-emails.ts',
  'server/services/resend-email.ts',
  'server/services/email.ts',
];

const urlPattern = /https:\/\/businessblueprint\.io\/([^"'\s`]+\.(png|jpg|jpeg|svg|gif))/g;
const baseUrlPattern = /\$\{baseUrl\}\/([^"'\s`${}]+\.(png|jpg|jpeg|svg|gif))/g;

let missing = 0;

for (const file of emailFiles) {
  const fullPath = join(root, file);
  if (!existsSync(fullPath)) continue;
  const content = readFileSync(fullPath, 'utf8');

  for (const pattern of [urlPattern, baseUrlPattern]) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const filename = match[1];
      const assetPath = join(publicDir, filename);
      if (!existsSync(assetPath)) {
        console.error(`MISSING: ${file} references "${filename}" but ${join('client/public', filename)} does not exist`);
        missing++;
      }
    }
  }
}

if (missing > 0) {
  console.error(`\n${missing} email image(s) missing from client/public/. Add the files or remove the references.`);
  process.exit(1);
}

console.log('All email image references verified.');
