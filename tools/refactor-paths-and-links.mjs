import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

// Class A: Moved and Renamed documents
// Class B: Archived documents (change path to archive/v3/99-reference/, keep name)
// Class C: Renamed documents under docs/ (same directory)
const fileMoves = [
  // Class A
  {
    src: 'v3/99-reference/sap-odata-external-export-summary-v3.html',
    dest: 'docs/abap/abap-odata-export.html',
    depthChange: 0
  },
  {
    src: 'v3/99-reference/sap-developer-glossary-v3.html',
    dest: 'docs/reference/sap-developer-glossary.html',
    depthChange: 0
  },
  {
    src: 'v3/99-reference/sap-developer-writing-style-guide-v3.html',
    dest: 'docs/reference/sap-developer-writing-style-guide.html',
    depthChange: 0
  },

  // Class B
  {
    src: 'v3/99-reference/prose-audit-report-v3-5.html',
    dest: 'archive/v3/99-reference/prose-audit-report-v3-5.html',
    depthChange: 1 // Depth increases from 2 to 3
  },
  {
    src: 'v3/99-reference/final-audit-report-v3.html',
    dest: 'archive/v3/99-reference/final-audit-report-v3.html',
    depthChange: 1 // Depth increases from 2 to 3
  },
  {
    src: 'v3/99-reference/stage5-navigation-audit.html',
    dest: 'archive/v3/99-reference/stage5-navigation-audit.html',
    depthChange: 1 // Depth increases from 2 to 3
  },

  // Class C
  {
    src: 'docs/ui5/sapui5-controller-function-intro.html',
    dest: 'docs/ui5/ui5-controller-basics.html',
    depthChange: 0
  },
  {
    src: 'docs/ui5/sapui5-odata-model-crud.html',
    dest: 'docs/ui5/ui5-odata-crud.html',
    depthChange: 0
  },
  {
    src: 'docs/ui5/sapui5-messaging-input-validation.html',
    dest: 'docs/ui5/ui5-validation-messaging.html',
    depthChange: 0
  },
  {
    src: 'docs/ui5/sapui5-routing-layout.html',
    dest: 'docs/ui5/ui5-routing-layout.html',
    depthChange: 0
  },
  {
    src: 'docs/ui5/sapui5-messaging-data-flow.html',
    dest: 'docs/ui5/ui5-data-flow.html',
    depthChange: 0
  },
  {
    src: 'docs/ui5/fiori-launchpad-deployment.html',
    dest: 'docs/ui5/fiori-launchpad.html',
    depthChange: 0
  },
  {
    src: 'docs/practice/flight-integrated-practice.html',
    dest: 'docs/practice/flight-practice.html',
    depthChange: 0
  },
  {
    src: 'docs/practice/flight-model-table-guide.html',
    dest: 'docs/practice/flight-model-guide.html',
    depthChange: 0
  },
  {
    src: 'docs/roadmap/debugging-troubleshooting-guide.html',
    dest: 'docs/roadmap/dev-debugging.html',
    depthChange: 0
  }
];

// Global search & replace mappings for files
const textReplacements = [
  // v3 references
  { search: 'v3/99-reference/sap-odata-external-export-summary-v3.html', replace: 'docs/abap/abap-odata-export.html' },
  { search: 'v3/99-reference/sap-developer-glossary-v3.html', replace: 'docs/reference/sap-developer-glossary.html' },
  { search: 'v3/99-reference/sap-developer-writing-style-guide-v3.html', replace: 'docs/reference/sap-developer-writing-style-guide.html' },
  { search: 'v3/99-reference/prose-audit-report-v3-5.html', replace: 'archive/v3/99-reference/prose-audit-report-v3-5.html' },
  { search: 'v3/99-reference/final-audit-report-v3.html', replace: 'archive/v3/99-reference/final-audit-report-v3.html' },
  { search: 'v3/99-reference/stage5-navigation-audit.html', replace: 'archive/v3/99-reference/stage5-navigation-audit.html' },

  // Base names for relative paths
  { search: 'sap-odata-external-export-summary-v3.html', replace: 'abap-odata-export.html' },
  { search: 'sap-developer-glossary-v3.html', replace: 'sap-developer-glossary.html' },
  { search: 'sap-developer-writing-style-guide-v3.html', replace: 'sap-developer-writing-style-guide.html' },

  // Class C base names
  { search: 'sapui5-controller-function-intro.html', replace: 'ui5-controller-basics.html' },
  { search: 'sapui5-odata-model-crud.html', replace: 'ui5-odata-crud.html' },
  { search: 'sapui5-messaging-input-validation.html', replace: 'ui5-validation-messaging.html' },
  { search: 'sapui5-routing-layout.html', replace: 'ui5-routing-layout.html' },
  { search: 'sapui5-messaging-data-flow.html', replace: 'ui5-data-flow.html' },
  { search: 'fiori-launchpad-deployment.html', replace: 'fiori-launchpad.html' },
  { search: 'flight-integrated-practice.html', replace: 'flight-practice.html' },
  { search: 'flight-model-table-guide.html', replace: 'flight-model-guide.html' },
  { search: 'debugging-troubleshooting-guide.html', replace: 'dev-debugging.html' }
];

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function processMoves() {
  console.log('--- Moving and Renaming Files ---');
  for (const move of fileMoves) {
    const srcPath = path.join(repoRoot, move.src);
    const destPath = path.join(repoRoot, move.dest);

    if (!fs.existsSync(srcPath)) {
      console.warn(`[Warning] Source file does not exist: ${move.src}`);
      continue;
    }

    ensureDir(destPath);
    let content = fs.readFileSync(srcPath, 'utf8');

    // If depth changes, adjust internal relative links
    if (move.depthChange > 0) {
      console.log(`[Depth Adjust] Adjusting relative paths for: ${move.src}`);
      // Replace '../../' with '../../../'
      content = content.replace(/href="\.\.\/\.\.\//g, 'href="../../../');
      content = content.replace(/src="\.\.\/\.\.\//g, 'src="../../../');
      content = content.replace(/href='\.\.\/\.\.\//g, "href='../../../");
      content = content.replace(/src='\.\.\/\.\.\//g, "src='../../../");
    }

    fs.writeFileSync(destPath, content, 'utf8');
    fs.unlinkSync(srcPath);
    console.log(`[Moved] ${move.src} -> ${move.dest}`);
  }
}

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // Skip .git, archive (except specific files in archive we just moved)
      if (file === '.git' || (file === 'archive' && filePath !== path.join(repoRoot, 'archive/v3/99-reference'))) {
        continue;
      }
      walkDir(filePath, callback);
    } else {
      callback(filePath);
    }
  }
}

function processReplacements() {
  console.log('--- Performing Global Text Replacements ---');
  walkDir(repoRoot, (filePath) => {
    const ext = path.extname(filePath);
    if (['.html', '.js', '.json'].includes(ext)) {
      // Do not process files in 'archive' except for the newly moved reference reports
      const relPath = path.relative(repoRoot, filePath).replace(/\\/g, '/');
      if (relPath.startsWith('archive/') && !relPath.startsWith('archive/v3/99-reference/')) {
        return;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      for (const rep of textReplacements) {
        if (content.includes(rep.search)) {
          // Use split & join to replace all occurrences without regex escaping issues
          content = content.split(rep.search).join(rep.replace);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[Updated Links] ${relPath}`);
      }
    }
  });
}

function cleanEmptyDirectories(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      cleanEmptyDirectories(filePath);
    }
  }
  // check again after cleaning subdirs
  if (fs.readdirSync(dir).length === 0) {
    fs.rmdirSync(dir);
    console.log(`[Cleaned Empty Dir] ${path.relative(repoRoot, dir)}`);
  }
}

function run() {
  processMoves();
  processReplacements();
  
  // Clean up legacy v3 directory if empty
  console.log('--- Cleaning Up Empty Directories ---');
  cleanEmptyDirectories(path.join(repoRoot, 'v3'));
  
  console.log('--- Refactoring Completed Successfully ---');
}

run();
