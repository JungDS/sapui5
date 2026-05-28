#!/usr/bin/env node
/**
 * Stage 7 ABAP Catalog Path Update Helper
 *
 * Purpose:
 * - Update data/site-map.json and data/document-catalog.json
 * - Switch ABAP core docs from legacy v3 paths to docs/abap operating paths
 * - Preserve legacy href/path fields
 *
 * Usage from repository root:
 *   node tools/stage7-update-abap-catalog-paths.mjs
 *
 * Then validate:
 *   node -e "JSON.parse(require('fs').readFileSync('data/site-map.json', 'utf8'))"
 *   node -e "JSON.parse(require('fs').readFileSync('data/document-catalog.json', 'utf8'))"
 */
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

const targetDocs = {
  'abap-classic': {
    href: '../docs/abap/abap-classic-report-itab-alv.html',
    path: 'docs/abap/abap-classic-report-itab-alv.html',
    file: 'abap-classic-report-itab-alv.html',
    legacyHref: '../v3/01-abap/abap-classic-report-itab-alv-beginner-v3.html',
    legacyPath: 'v3/01-abap/abap-classic-report-itab-alv-beginner-v3.html',
    canonicalId: 'abap-classic'
  },
  'abap-new-syntax': {
    href: '../docs/abap/abap-new-syntax.html',
    path: 'docs/abap/abap-new-syntax.html',
    file: 'abap-new-syntax.html',
    legacyHref: '../v3/01-abap/abap-new-syntax-beginner-guide-v3.html',
    legacyPath: 'v3/01-abap/abap-new-syntax-beginner-guide-v3.html',
    canonicalId: 'abap-new-syntax'
  },
  'cds-odata': {
    href: '../docs/abap/cds-to-odata.html',
    path: 'docs/abap/cds-to-odata.html',
    file: 'cds-to-odata.html',
    legacyHref: '../v3/01-abap/sap-cds-to-odata-beginner-guide-v3.html',
    legacyPath: 'v3/01-abap/sap-cds-to-odata-beginner-guide-v3.html',
    canonicalId: 'cds-odata'
  }
};

function readJson(relativePath) {
  const fullPath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`${relativePath} 파일을 찾을 수 없습니다. 저장소 루트에서 실행했는지 확인하세요.`);
  }
  return {
    fullPath,
    data: JSON.parse(fs.readFileSync(fullPath, 'utf8'))
  };
}

function writeJson(fullPath, data) {
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function updateSiteMap() {
  const { fullPath, data } = readJson('data/site-map.json');

  if (!data.documents || typeof data.documents !== 'object') {
    throw new Error('site-map.json의 documents 객체를 찾을 수 없습니다.');
  }

  Object.entries(targetDocs).forEach(([docId, target]) => {
    const entry = data.documents[docId];
    if (!entry) {
      throw new Error(`site-map.json에서 ${docId} 항목을 찾을 수 없습니다.`);
    }

    entry.href = target.href;
    entry.file = target.file;
    entry.legacy_id = docId;
    entry.canonical_id = target.canonicalId;
    entry.legacy_href = target.legacyHref;
    entry.legacy_path = target.legacyPath;
    entry.operating_path = target.path;
  });

  writeJson(fullPath, data);
}

function updateDocumentCatalog() {
  const { fullPath, data } = readJson('data/document-catalog.json');

  if (!Array.isArray(data.documents)) {
    throw new Error('document-catalog.json의 documents 배열을 찾을 수 없습니다.');
  }

  Object.entries(targetDocs).forEach(([docId, target]) => {
    const entry = data.documents.find((doc) => doc.docId === docId);
    if (!entry) {
      throw new Error(`document-catalog.json에서 ${docId} 항목을 찾을 수 없습니다.`);
    }

    entry.href = target.href;
    entry.path = target.path;
    entry.file = target.file;
    entry.legacyId = entry.legacyId || docId;
    entry.legacyHref = target.legacyHref;
    entry.legacyPath = target.legacyPath;
    entry.operatingPath = target.path;
  });

  writeJson(fullPath, data);
}

function validate() {
  const siteMap = readJson('data/site-map.json').data;
  const catalog = readJson('data/document-catalog.json').data;

  Object.entries(targetDocs).forEach(([docId, target]) => {
    const siteEntry = siteMap.documents[docId];
    if (siteEntry.href !== target.href) {
      throw new Error(`site-map.json ${docId} href 검증 실패`);
    }
    if (siteEntry.legacy_href !== target.legacyHref) {
      throw new Error(`site-map.json ${docId} legacy_href 검증 실패`);
    }

    const catalogEntry = catalog.documents.find((doc) => doc.docId === docId);
    if (catalogEntry.href !== target.href) {
      throw new Error(`document-catalog.json ${docId} href 검증 실패`);
    }
    if (catalogEntry.path !== target.path) {
      throw new Error(`document-catalog.json ${docId} path 검증 실패`);
    }
    if (catalogEntry.legacyHref !== target.legacyHref) {
      throw new Error(`document-catalog.json ${docId} legacyHref 검증 실패`);
    }
  });
}

updateSiteMap();
updateDocumentCatalog();
validate();

console.log('Stage 7 ABAP catalog paths updated successfully.');
console.log('Updated docs: abap-classic, abap-new-syntax, cds-odata.');
