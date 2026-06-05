import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const docsDir = path.join(repoRoot, 'docs');
const pagesDir = path.join(repoRoot, 'pages');
const indexFile = path.join(repoRoot, 'index.html');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else {
      if (path.extname(filePath) === '.html') {
        callback(filePath);
      }
    }
  }
}

function cleanseFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Remove data-distributor="정훈영" (handles single or double quotes, and potential trailing space/newlines)
  content = content.replace(/\s*data-distributor=["']정훈영["']/g, '');

  // 2. Remove distributor badges
  content = content.replace(/<span class="stage7-badge amber">배포자:\s*정훈영<\/span>/gi, '');
  content = content.replace(/<span class="badge amber">배포자:\s*정훈영<\/span>/gi, '');

  // 3. Remove distributor from footer texts
  // (handles variations: " · 배포자: 정훈영", " | 배포자: 정훈영", " · 배포자: 정훈영 · 혼합 문체 기준 · Final", etc.)
  content = content.replace(/\s*[·|/]\s*배포자:\s*정훈영/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    const relPath = path.relative(repoRoot, filePath);
    console.log(`[Cleansed] ${relPath}`);
  }
}

console.log('Starting legacy distributor metadata cleansing in docs/, pages/, and index.html ...');

// Cleanse docs directory
walkDir(docsDir, cleanseFile);

// Cleanse pages directory
walkDir(pagesDir, cleanseFile);

// Cleanse root index.html
if (fs.existsSync(indexFile)) {
  cleanseFile(indexFile);
}

console.log('Cleansing completed.');
