/**
 * Kairos v01 — CSS Build Pipeline
 * Reads src/kairos.css, resolves @import, bundles, and minifies.
 */
const fs = require('fs');
const path = require('path');

const ENTRY = path.join(__dirname, '..', 'src', 'kairos.css');
const OUT_DIR = path.join(__dirname, '..', 'dist');
const OUT_FULL = path.join(OUT_DIR, 'kairos.css');
const OUT_MIN = path.join(OUT_DIR, 'kairos.min.css');

// Ensure dist/ exists
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

/**
 * Recursively resolve @import url('./...') statements.
 */
function resolveImports(filePath, seen) {
  seen = seen || new Set();
  const absPath = path.resolve(filePath);

  if (seen.has(absPath)) {
    console.warn(`[WARN] Circular import detected: ${absPath}`);
    return `/* circular: ${path.basename(absPath)} */\n`;
  }
  seen.add(absPath);

  const dir = path.dirname(absPath);
  let content = fs.readFileSync(absPath, 'utf-8');

  // Match @import url('./...'); or @import url("../...");
  content = content.replace(/@import\s+url\(['"]?([^'")]+)['"]?\)\s*;/g, (match, importPath) => {
    const resolved = path.resolve(dir, importPath);
    if (!fs.existsSync(resolved)) {
      console.error(`[ERROR] Import not found: ${importPath} (from ${filePath})`);
      return `/* MISSING: ${importPath} */\n`;
    }
    return resolveImports(resolved, seen);
  });

  return content;
}

console.log('Kairos CSS Build');
console.log('════════════════');

// 1. Resolve all imports
const bundled = resolveImports(ENTRY);

// 2. Write unminified
fs.writeFileSync(OUT_FULL, bundled);
const fullSize = (Buffer.byteLength(bundled) / 1024).toFixed(1);

// 3. Minify with lightningcss
try {
  const lightningcss = require('lightningcss');
  const result = lightningcss.transform({
    filename: 'kairos.css',
    code: Buffer.from(bundled),
    minify: true,
    targets: {
      chrome: 90,
      firefox: 90,
      safari: 15,
    },
  });
  fs.writeFileSync(OUT_MIN, result.code);
  const minSize = (result.code.length / 1024).toFixed(1);

  console.log(`  dist/kairos.css      ${fullSize} KB`);
  console.log(`  dist/kairos.min.css  ${minSize} KB  (minified)`);
  console.log(`\nBuild complete.`);
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    console.log('  lightningcss not found — writing unminified only.');
    console.log('  Run: npm install');
    console.log(`  dist/kairos.css  ${fullSize} KB`);
  } else {
    console.error(`[ERROR] Minification failed:`, e.message);
    process.exit(1);
  }
}
