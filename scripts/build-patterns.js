/**
 * Kairos v01 — Pattern Builder
 * Processes template includes in patterns-src/ and outputs to patterns/.
 *
 * Usage: node scripts/build-patterns.js
 *
 * Include syntax: {{ include "filename" }}
 * Variable syntax: {{ variableName }}
 */
const fs = require('fs');
const path = require('path');

const TEMPLATE_DIR = path.join(__dirname, '..', 'templates');
const SRC_DIR = path.join(__dirname, '..', 'patterns-src');
const OUT_DIR = path.join(__dirname, '..', 'patterns');

function processIncludes(html, context) {
  return html.replace(/\{\{\s*include\s+"([^"]+)"\s*\}\}/g, function(match, filename) {
    var filePath = path.join(TEMPLATE_DIR, filename);
    if (!fs.existsSync(filePath)) {
      console.warn('  [WARN] Template not found: ' + filename);
      return '<!-- MISSING: ' + filename + ' -->';
    }
    var content = fs.readFileSync(filePath, 'utf-8');
    return processVariables(content, context);
  });
}

function processVariables(html, context) {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, function(match, key) {
    return context[key] !== undefined ? context[key] : match;
  });
}

// Check if patterns-src exists
if (!fs.existsSync(SRC_DIR)) {
  console.log('patterns-src/ directory not found.');
  console.log('This script is for future use when patterns are migrated to templates.');
  console.log('Current patterns/ files are already up to date.');
  process.exit(0);
}

var files = fs.readdirSync(SRC_DIR).filter(function(f) { return f.endsWith('.html'); });
console.log('Kairos Pattern Builder');
console.log('══════════════════════');

files.forEach(function(file) {
  var src = fs.readFileSync(path.join(SRC_DIR, file), 'utf-8');
  var context = {
    title: file.replace('.html', '').replace(/-/g, ' '),
    cssPath: '../dist/kairos.css',
    jsPath: '../dist/kairos.min.js',
    pageName: file.replace('.html', ''),
  };

  var output = processIncludes(src, context);
  fs.writeFileSync(path.join(OUT_DIR, file), output);
  console.log('  [BUILD] ' + file);
});

console.log('\n' + files.length + ' patterns built.');
