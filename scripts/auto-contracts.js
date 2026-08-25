const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const cssFiles = [];
walkDir('src/components', (f) => {
  if (f.endsWith('.css') && !f.endsWith('components.css') && !f.endsWith('components-core.css')) {
    cssFiles.push(f);
  }
});

let componentsCss = fs.readFileSync('src/components/components.css', 'utf-8');
const spaceRegex = /var\(--kairos-space-([a-z-]+)\)/g;

let newContracts = '\n  /* ─── Auto-generated Component Contracts ─── */\n';

cssFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  const basename = path.basename(file, '.css');
  
  let match;
  let counter = 1;
  let hasChanges = false;
  let newContent = content;
  
  while ((match = spaceRegex.exec(content)) !== null) {
    const spaceVar = match[1];
    const contractVar = `--kairos-${basename}-space-${counter++}`;
    
    // Add to components.css
    newContracts += `  ${contractVar}: var(--kairos-space-${spaceVar});\n`;
    
    // Replace in file
    newContent = newContent.replace(`var(--kairos-space-${spaceVar})`, `var(${contractVar})`);
    hasChanges = true;
  }
  
  if (hasChanges) {
    fs.writeFileSync(file, newContent);
  }
});

componentsCss = componentsCss.replace('}', newContracts + '}');
fs.writeFileSync('src/components/components.css', componentsCss);

console.log('Done generating contracts.');