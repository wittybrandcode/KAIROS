/**
 * Kairos v01 — Development Server
 * Serves patterns/ with auto-rebuild on src/ changes.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 3000;
const ROOT = path.join(__dirname, '..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/plain; charset=utf-8',
};

function rebuild() {
  try {
    console.log('[REBUILD] Building CSS + JS...');
    execSync('node scripts/build-css.js', { cwd: ROOT, stdio: 'pipe' });
    execSync('node scripts/build-js.js', { cwd: ROOT, stdio: 'pipe' });
    console.log('[REBUILD] Done.');
  } catch (e) {
    console.error('[REBUILD ERROR]', e.message);
  }
}

// Initial build
rebuild();

// Watch src/ for changes
let debounce = null;
fs.watch(path.join(ROOT, 'src'), { recursive: true }, (eventType, filename) => {
  if (debounce) clearTimeout(debounce);
  debounce = setTimeout(() => {
    console.log(`[WATCH] Changed: ${filename}`);
    rebuild();
  }, 200);
});

// HTTP Server
const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/patterns/index.html';

  // Try patterns/ first, then dist/, then root
  const candidates = [
    path.join(ROOT, 'patterns', urlPath),
    path.join(ROOT, 'dist', urlPath),
    path.join(ROOT, urlPath),
  ];

  let filePath = null;
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      filePath = candidate;
      break;
    }
  }

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found: ' + urlPath);
    return;
  }

  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-cache',
  });

  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`\n  Kairos Dev Server`);
  console.log(`  ════════════════`);
  console.log(`  http://localhost:${PORT}/patterns/index.html`);
  console.log(`  Watching src/ for changes...\n`);
});
