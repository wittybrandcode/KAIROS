const fs = require('fs');
const css = fs.readFileSync('dist/kairos.min.css', 'utf8');

// Find :root block properly (not just first })
const rootStart = css.indexOf(':root{');
if (rootStart < 0) { console.log(':root not found'); process.exit(1); }

let depth = 0;
let rootEnd = -1;
for (let i = rootStart + 6; i < css.length; i++) {
  if (css[i] === '{') depth++;
  if (css[i] === '}') {
    if (depth === 0) { rootEnd = i + 1; break; }
    depth--;
  }
}
const root = css.substring(rootStart, rootEnd);

// Extract radio tokens from :root
const radioTokens = root.match(/--kairos-radio[^;]+/g) || [];
const chkTokens = root.match(/--kairos-chk[^;]+/g) || [];

console.log('=== radio tokens in :root ===');
radioTokens.forEach(t => console.log('  ' + t));
console.log('\n=== checkbox token in :root ===');
chkTokens.forEach(t => console.log('  ' + t));

// Extract all --kairos-radio-* values
console.log('\n=== ALL radio references in full CSS ===');
const allRadio = css.match(/--kairos-radio[^;{},)]+/g) || [];
const unique = [...new Set(allRadio)];
unique.forEach(t => console.log('  ' + t));
