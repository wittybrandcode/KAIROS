const fs = require("fs");
const path = require("path");
const patternsDir = path.join(__dirname, "../patterns");
const files = fs.readdirSync(patternsDir).filter(f => f.endsWith(".html") && !["visual-calibration.html", "all-in-one.html", "clean-calibration.html"].includes(f));

let htmlOutput = `<!DOCTYPE html>
<html lang="en" class="kairos-theme-dark">
<head>
  <meta charset="UTF-8">
  <title>Kairos 1.0 Clean Calibration</title>
  <link rel="stylesheet" href="../src/kairos.css">
  <link rel="stylesheet" href="../phosphor/style.css">
  <style>
    body { background-color: var(--kairos-bg-deep); color: var(--kairos-text); padding: var(--kairos-space-xl); font-family: var(--kairos-font-sans); margin: 0; }
    html, body { overflow: auto !important; height: auto !important; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: var(--kairos-space-lg); }
    .specimen { background: var(--kairos-bg-surface); border: 1px solid var(--kairos-border-muted); border-radius: 4px; display: flex; flex-direction: column; overflow: hidden; }
    .header { padding: var(--kairos-space-xs) var(--kairos-space-md); background: var(--kairos-bg-deep); border-bottom: 1px solid var(--kairos-border-muted); font-family: var(--kairos-font-mono); font-size: var(--kairos-text-xs); color: var(--kairos-text-muted); text-transform: uppercase; }
    .body { padding: var(--kairos-space-md); display: flex; flex-direction: column; gap: var(--kairos-space-md); overflow-x: auto; }
  </style>
</head>
<body>
  <div style="margin-bottom: var(--kairos-space-xl);">
    <h1 style="font-size: var(--kairos-text-xl); margin:0;">Kairos 1.0 Clean Calibration</h1>
  </div>
  <div class="grid">`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(patternsDir, file), "utf8");
    let name = file.replace(".html", "");
    let matches = content.matchAll(/<div class="kairos-pattern-card-body">([\s\S]*?)<\/div>\s*(?=<\/div>\s*<\/div>|<div class="kairos-pattern-card")/g);
    let combined = "";
    for (const match of matches) {
        let snip = match[1];
        snip = snip.replace(/<div class="kairos-pattern-classes">[\s\S]*?<\/div>/g, "");
        snip = snip.replace(/<script[\s\S]*?<\/script>/g, "");
        if (snip.trim()) combined += snip;
    }
    if (combined) {
        htmlOutput += `\n<div class="specimen"><div class="header">${name}</div><div class="body">${combined}</div></div>`;
    }
});

htmlOutput += `\n</div>\n<script type="module" src="../src/kairos.js"></script>\n</body>\n</html>`;
fs.writeFileSync(path.join(patternsDir, "clean-calibration.html"), htmlOutput, "utf8");
console.log("Created clean-calibration.html");

