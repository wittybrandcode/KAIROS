const fs = require('fs');
const path = require('path');

const patternsDir = path.join(__dirname, '../patterns');
const files = fs.readdirSync(patternsDir).filter(f => f.endsWith('.html'));

const targetTags = [
  'kairos-modal',
  'kairos-dropdown',
  'kairos-toast',
  'kairos-accordion',
  'kairos-sidebar'
];

let totalChanges = 0;

files.forEach(file => {
  const filePath = path.join(patternsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  targetTags.forEach(tag => {
    // Regex to match opening tag of target elements without data-state
    const regex = new RegExp(`<${tag}(?![^>]*data-state=)([^>]*)>`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `<${tag} data-state="closed"$1>`);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
    totalChanges++;
  }
});

console.log(`Added explicit data-state="closed" to ${totalChanges} files.`);
