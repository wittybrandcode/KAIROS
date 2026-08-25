/**
 * Kairos v01 — Pattern Updater
 * Updates all pattern HTML files to reference dist/ instead of shared/.
 * Also adds skip-link + live-region + theme toggle where missing.
 */
const fs = require('fs');
const path = require('path');

const PATTERN_DIR = path.join(__dirname, '..', 'patterns');

const SKIP_LINK = '<a class="kairos-skip-link" href="#kairos-main-content">SKIP TO CONTENT</a>';
const LIVE_REGION = '<div id="kairos-live-region" aria-live="polite" aria-atomic="true" class="kairos-sr-only"></div>';
const THEME_TOGGLE_STYLE = '<style>.kairos-theme-toggle{position:fixed;top:var(--kairos-space-compact);right:var(--kairos-space-compact);z-index:9999;}</style>';
const THEME_TOGGLE_BTN = '<button class="kairos-theme-toggle" data-kairos-toggle="theme" aria-label="Toggle dark/light theme"><span class="kairos-theme-toggle-icon">&#9790;</span> <span class="kairos-theme-toggle-label">DARK</span></button>';

const files = fs.readdirSync(PATTERN_DIR).filter(f => f.endsWith('.html'));
let updated = 0;

files.forEach(file => {
  const filePath = path.join(PATTERN_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // 1. Update CSS path: shared/kairos.css → dist/kairos.css
  if (content.includes('../shared/kairos.css')) {
    content = content.replace(/\.\.\/shared\/kairos\.css/g, '../dist/kairos.css');
    changed = true;
  }

  // 2. Update JS path: shared/kairos.js → dist/kairos.min.js
  if (content.includes('../shared/kairos.js')) {
    content = content.replace(/\.\.\/shared\/kairos\.js/g, '../dist/kairos.min.js');
    changed = true;
  }

  // 3. Add skip-link if missing (after <body> or <body ...>)
  if (!content.includes('kairos-skip-link') && content.includes('<body')) {
    content = content.replace(/(<body[^>]*>)/, '$1\n  ' + SKIP_LINK);
    changed = true;
  }

  // 4. Add live-region if missing (before </body>)
  if (!content.includes('kairos-live-region') && content.includes('</body>')) {
    content = content.replace('</body>', '  ' + LIVE_REGION + '\n</body>');
    changed = true;
  }

  // 5. Add theme toggle style before </head> if missing
  if (!content.includes('kairos-theme-toggle') && content.includes('</head>')) {
    content = content.replace('</head>', '  ' + THEME_TOGGLE_STYLE + '\n</head>');
    changed = true;
  }

  // 6. Add theme toggle button after skip-link or after <body> if missing
  if (!content.includes('data-kairos-toggle="theme"') && content.includes('<body')) {
    if (content.includes('kairos-skip-link')) {
      content = content.replace(
        /(kairos-skip-link"[^>]*>[^<]*<\/a>)/,
        '$1\n  ' + THEME_TOGGLE_BTN
      );
    } else {
      content = content.replace(/(<body[^>]*>)/, '$1\n  ' + THEME_TOGGLE_BTN);
    }
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    updated++;
    console.log('  [UPDATED] ' + file);
  }
});

console.log('\n' + updated + '/' + files.length + ' pattern files updated.');
