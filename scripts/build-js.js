/**
 * Kairos v01 — JavaScript Build Pipeline
 * Reads src/kairos.js and copies/minifies to dist/.
 */
const fs = require('fs');
const path = require('path');

const ENTRY = path.join(__dirname, '..', 'src', 'kairos.js');
const OUT_DIR = path.join(__dirname, '..', 'dist');
const OUT_FULL = path.join(OUT_DIR, 'kairos.js');
const OUT_MIN = path.join(OUT_DIR, 'kairos.min.js');

// Ensure dist/ exists
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

console.log('Kairos JS Build');
console.log('═══════════════');

// 1. Read source
const source = fs.readFileSync(ENTRY, 'utf-8');

// 2. Write unminified
fs.writeFileSync(OUT_FULL, source);
const fullSize = (Buffer.byteLength(source) / 1024).toFixed(1);

// 3. Simple minification (remove comments + collapse whitespace)
let minified = source
  // Remove multi-line comments
  .replace(/\/\*[\s\S]*?\*\//g, '')
  // Remove single-line comments (careful with URLs)
  .replace(/(^|[^:])\/\/.*$/gm, '$1')
  // Collapse multiple newlines
  .replace(/\n\s*\n\s*\n/g, '\n')
  // Remove leading whitespace on lines
  .replace(/^\s+/gm, '')
  // Collapse spaces around operators
  .replace(/\s*([{}();,:])\s*/g, '$1')
  // But restore space after keywords
  .replace(/\b(var|function|return|if|else|switch|case|break|new|typeof|instanceof|void|delete|throw|in|of|for|while|do|try|catch|finally|class|const|let)\b(?=[^{}();,:])/g, '$1 ');

fs.writeFileSync(OUT_MIN, minified.trim());
const minSize = (Buffer.byteLength(minified) / 1024).toFixed(1);

console.log(`  dist/kairos.js      ${fullSize} KB`);
console.log(`  dist/kairos.min.js  ${minSize} KB  (minified)`);
console.log(`\nBuild complete.`);
