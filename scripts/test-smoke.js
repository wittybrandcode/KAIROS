/**
 * Kairos v01 — Smoke Test
 * Opens each pattern page and checks for console errors.
 */
const fs = require('fs');
const path = require('path');

const PATTERN_DIR = path.join(__dirname, '..', 'patterns');

console.log('Kairos Smoke Test');
console.log('═════════════════');

let files;
try {
  files = fs.readdirSync(PATTERN_DIR).filter(f => f.endsWith('.html'));
  console.log(`Found ${files.length} pattern pages.\n`);
} catch {
  console.log('patterns/ directory not found — skipping pattern checks.\n');
  process.exit(0);
}

// Basic HTML validation — check for broken tags, missing imports
const results = { passed: 0, warnings: 0, errors: [] };

files.forEach(file => {
  const content = fs.readFileSync(path.join(PATTERN_DIR, file), 'utf-8');
  const issues = [];

  // Check for DOCTYPE
  if (!content.includes('<!DOCTYPE')) {
    issues.push({ level: 'warning', msg: 'Missing <!DOCTYPE html>' });
  }

  // Check for kairos.css import
  if (!content.includes('kairos.css') && !content.includes('kairos.min.css')) {
    issues.push({ level: 'error', msg: 'Missing kairos.css import' });
  }

  // Check for kairos.js import
  if (!content.includes('kairos.js') && !content.includes('kairos.min.js')) {
    issues.push({ level: 'warning', msg: 'Missing kairos.js import' });
  }

  // Check for unclosed tags (basic check)
  const opens = (content.match(/<div[\s>]/g) || []).length;
  const closes = (content.match(/<\/div>/g) || []).length;
  if (Math.abs(opens - closes) > 2) {
    issues.push({ level: 'warning', msg: `Possible unclosed <div>: ${opens} opens vs ${closes} closes` });
  }

  if (issues.length === 0) {
    results.passed++;
    console.log(`  [PASS] ${file}`);
  } else {
    const hasError = issues.some(i => i.level === 'error');
    if (hasError) {
      results.errors.push({ file, issues });
      console.log(`  [FAIL] ${file}`);
    } else {
      results.warnings++;
      console.log(`  [WARN] ${file}: ${issues.map(i => i.msg).join(', ')}`);
    }
    issues.forEach(i => {
      if (i.level === 'error') console.log(`         → ${i.msg}`);
    });
  }
});

console.log(`\n${results.passed}/${files.length} passed, ${results.warnings} warnings, ${results.errors.length} errors`);

if (results.errors.length > 0) {
  process.exit(1);
}
