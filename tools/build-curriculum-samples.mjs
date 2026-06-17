#!/usr/bin/env node
// ABAP Curriculum sample builder / inliner | 최종수정 2026-06-17 04:13 KST | v1.1
/*
 * ABAP Curriculum sample builder / inliner.
 *
 * Reads the v5.4 curriculum JSON and emits 4 harmonized sample pages, each driven by
 * the shared engine (assets/abap-curriculum-explorer.js) with a different skin layout.
 * The JSON is inlined as <script type="application/json" data-curriculum-data> so the
 * pages open directly via file:// (the engine falls back to fetch when served).
 *
 * Usage (from repo root):
 *   node tools/build-curriculum-samples.mjs            # version v1 (default)
 *   node tools/build-curriculum-samples.mjs --version=v2
 *
 * Filenames: abap-curriculum-claude-v<ver>_sample<n>-<yyyymmdd>-<hhmmss>.html
 *   sample1 = Studio, sample2 = Library, sample3 = Focus, sample4 = Dashboard
 */
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const SRC = path.join(repoRoot, "reference", "abap_curriculum_v5_4_20260605_000000.json");
const OUT_DIR = path.join(repoRoot, "docs", "roadmap");

const versionArg = process.argv.find((a) => a.startsWith("--version="));
const VERSION = versionArg ? versionArg.split("=")[1] : "v1";

const ts = (() => {
  const d = new Date();
  const z = (n) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}${z(d.getMonth() + 1)}${z(d.getDate())}-` +
    `${z(d.getHours())}${z(d.getMinutes())}${z(d.getSeconds())}`
  );
})();

if (!fs.existsSync(SRC)) {
  console.error("Source JSON not found:", SRC);
  process.exit(1);
}

// Validate JSON, then inline a safe string (neutralize "<" so "</script>" can't break out).
const rawJson = fs.readFileSync(SRC, "utf8");
JSON.parse(rawJson); // throws if invalid
const inlineJson = rawJson.replace(/</g, "\\u003c");

/* ---------- shared fragments ---------- */
const DIFFICULTY_SELECT = `<select data-curriculum-difficulty aria-label="난이도">
        <option value="all">전체 난이도</option>
        <option value="low">하</option>
        <option value="mid">중</option>
        <option value="high">상</option>
      </select>`;

const head = (title, { stage7 = false } = {}) => `<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
<link rel="stylesheet" href="../../assets/common.css" />${stage7 ? `\n<link rel="stylesheet" href="../../assets/shell.css" />` : ""}
<link rel="stylesheet" href="../../assets/abap-curriculum-explorer.css" />
<script src="../../assets/common.js" defer></script>${stage7 ? `\n<script src="../../assets/shell.js" defer></script>` : ""}
<script src="../../assets/abap-curriculum-explorer.js" defer></script>
</head>`;

const dataScript = `<script type="application/json" data-curriculum-data>${inlineJson}</script>`;

const stats = (big = false) => `<div class="abx-stats">
        <div class="abx-stat"><strong data-stat="tracks">2</strong><span>Tracks</span></div>
        <div class="abx-stat"><strong data-stat="sections">34</strong><span>Sections</span></div>
        <div class="abx-stat"><strong data-stat="units">205</strong><span>Learning Units</span></div>
        <div class="abx-stat"><strong data-stat="hours">-</strong><span>Recommended Hours</span></div>
      </div>`;

const heroLead = `상단에서 <button class="term" data-term="ABAP" type="button">ABAP</button> 학습 트랙을 고르고,
        좌측에서 섹션을 선택하면 우측에 세부 학습 단위가 펼쳐집니다. 검색과 난이도 필터로
        <button class="term" data-term="CDS" type="button">CDS</button>·<button class="term" data-term="RAP" type="button">RAP</button>
        같은 주제를 빠르게 찾을 수 있습니다.`;

const breadcrumb = (label) => `<div class="breadcrumb" data-prose="summary">
        <a href="../../index.html">홈</a><span>›</span>
        <a href="../../pages/roadmap.html">로드맵 / 학습전략</a><span>›</span>
        <span>${label}</span>
      </div>`;

/* ---------- per-layout body builders ---------- */

// sample1 — Studio (full-viewport immersive app)
const studioBody = () => `<div class="abx-root abx-studio" data-abap-curriculum-root data-layout="studio">
  <header class="abx-appbar">
    <div class="abx-appbar__brand">ABAP 커리큘럼 · Studio</div>
    <nav class="abx-tabs" data-track-tabs role="tablist" aria-label="트랙 선택"></nav>
    <div class="abx-appbar__tools">
      <input type="search" data-curriculum-search placeholder="검색: ALV, CDS, RAP…" aria-label="커리큘럼 검색" />
      ${DIFFICULTY_SELECT}
    </div>
  </header>
  <div class="abx-app-body">
    <aside class="abx-rail">
      <div class="abx-rail__head"><span data-current-track-title>Track</span><span class="abx-count" data-visible-count>0</span></div>
      <div class="abx-list" data-section-list></div>
    </aside>
    <main class="abx-main">
      <button type="button" class="abx-back abx-nav-btn" data-back>← 목록</button>
      <div class="abx-loading" data-loading-state><strong>커리큘럼을 불러오는 중입니다.</strong><span>잠시만 기다려 주세요.</span></div>
      <div class="abx-detail" data-section-detail hidden></div>
    </main>
  </div>
</div>
${dataScript}`;

// sample2 — Library (integrated in the stage7 doc shell)
const libraryBody = () => `<div class="stage7-doc-layout">
  <section class="stage7-hero prose-summary" data-prose="summary">
    ${breadcrumb("ABAP 커리큘럼 · Library")}
    <div class="stage7-hero__eyebrow">SAP Developer Learning Library</div>
    <h1>ABAP 커리큘럼 · Library</h1>
    <p class="lead">${heroLead}</p>
    ${stats()}
  </section>
  <main>
    <div class="abx-root abx-library" data-abap-curriculum-root data-layout="library">
      <div class="abx-toolbar">
        <label class="abx-field"><span>검색</span><input type="search" data-curriculum-search placeholder="예: ALV, CDS, RAP, DDIC" /></label>
        <label class="abx-field"><span>난이도</span>${DIFFICULTY_SELECT}</label>
      </div>
      <nav class="abx-tabs" data-track-tabs role="tablist" aria-label="트랙 선택"></nav>
      <div class="abx-grid">
        <aside class="abx-rail">
          <div class="abx-rail__head"><span data-current-track-title>Track</span><span class="abx-count" data-visible-count>0</span></div>
          <div class="abx-list" data-section-list></div>
        </aside>
        <main class="abx-main">
          <button type="button" class="abx-back abx-nav-btn" data-back>← 목록</button>
          <div class="abx-loading" data-loading-state><strong>커리큘럼을 불러오는 중입니다.</strong><span>잠시만 기다려 주세요.</span></div>
          <div class="abx-detail" data-section-detail hidden></div>
        </main>
      </div>
    </div>
  </main>
  <footer class="stage7-footer prose-summary" data-prose="summary">
    ABAP 커리큘럼 Library · Stage 7 Docs · ${new Date().toISOString().slice(0, 10)}
  </footer>
</div>
${dataScript}`;

// sample3 — Focus (three-pane reading mode)
const focusBody = () => `<div class="abx-root abx-focus" data-abap-curriculum-root data-layout="focus">
  <header class="abx-appbar">
    <div class="abx-appbar__brand">ABAP 커리큘럼 · Focus</div>
    <nav class="abx-tabs" data-track-tabs role="tablist" aria-label="트랙 선택"></nav>
    <input type="search" data-curriculum-search placeholder="검색…" aria-label="커리큘럼 검색" />
    ${DIFFICULTY_SELECT}
  </header>
  <div class="abx-focus-body">
    <aside class="abx-rail">
      <div class="abx-rail__head"><span data-current-track-title>Track</span><span class="abx-count" data-visible-count>0</span></div>
      <div class="abx-list" data-section-list></div>
    </aside>
    <nav class="abx-unitrail" data-unit-nav aria-label="학습 단위 목차"></nav>
    <main class="abx-main">
      <div class="abx-loading" data-loading-state><strong>커리큘럼을 불러오는 중입니다.</strong><span>잠시만 기다려 주세요.</span></div>
      <div class="abx-detail" data-section-detail hidden></div>
    </main>
  </div>
</div>
${dataScript}`;

// sample4 — Dashboard (search-first, card grid)
const dashboardBody = () => `<div class="stage7-doc-layout">
  <section class="stage7-hero prose-summary" data-prose="summary">
    ${breadcrumb("ABAP 커리큘럼 · Dashboard")}
    <div class="stage7-hero__eyebrow">SAP Developer Learning Library</div>
    <h1>ABAP 커리큘럼 · Dashboard</h1>
    <p class="lead">${heroLead}</p>
    ${stats(true)}
  </section>
  <main>
    <div class="abx-root abx-dashboard" data-abap-curriculum-root data-layout="dashboard">
      <div class="abx-toolbar abx-toolbar--hero">
        <label class="abx-field"><span>검색</span><input type="search" data-curriculum-search placeholder="키워드로 섹션 찾기: ALV, CDS, RAP, BAPI…" /></label>
        <label class="abx-field"><span>난이도</span>${DIFFICULTY_SELECT}</label>
      </div>
      <nav class="abx-tabs" data-track-tabs role="tablist" aria-label="트랙 선택"></nav>
      <div class="abx-dash-head"><h2 data-current-track-title>Track</h2><span class="abx-count" data-visible-count>0</span></div>
      <div data-section-list></div>
      <div class="abx-dash-detail">
        <div class="abx-loading" data-loading-state><strong>섹션 카드를 선택하면 상세가 표시됩니다.</strong><span>검색·난이도로 먼저 좁혀 보세요.</span></div>
        <div class="abx-detail" data-section-detail hidden></div>
      </div>
    </div>
  </main>
  <footer class="stage7-footer prose-summary" data-prose="summary">
    ABAP 커리큘럼 Dashboard · Stage 7 Docs · ${new Date().toISOString().slice(0, 10)}
  </footer>
</div>
${dataScript}`;

// v2/sample1 — Focus Library (stage7/Library header + in-flow Focus 3-pane below)
const focusLibraryBody = () => `<div class="stage7-doc-layout">
  <section class="stage7-hero prose-summary" data-prose="summary">
    ${breadcrumb("ABAP 커리큘럼 · Focus Library")}
    <div class="stage7-hero__eyebrow">SAP Developer Learning Library</div>
    <h1>ABAP 커리큘럼 · Focus Library</h1>
    <p class="lead">${heroLead}</p>
    ${stats()}
  </section>
  <main>
    <div class="abx-root abx-focus-doc" data-abap-curriculum-root data-layout="focus-doc">
      <div class="abx-toolbar">
        <label class="abx-field"><span>검색</span><input type="search" data-curriculum-search placeholder="예: ALV, CDS, RAP, DDIC" /></label>
        <label class="abx-field"><span>난이도</span>${DIFFICULTY_SELECT}</label>
      </div>
      <nav class="abx-tabs" data-track-tabs role="tablist" aria-label="트랙 선택"></nav>
      <div class="abx-focus-body">
        <aside class="abx-rail">
          <div class="abx-rail__head"><span data-current-track-title>Track</span><span class="abx-count" data-visible-count>0</span></div>
          <div class="abx-list" data-section-list></div>
        </aside>
        <nav class="abx-unitrail" data-unit-nav aria-label="학습 단위 목차"></nav>
        <main class="abx-main">
          <div class="abx-loading" data-loading-state><strong>커리큘럼을 불러오는 중입니다.</strong><span>잠시만 기다려 주세요.</span></div>
          <div class="abx-detail" data-section-detail hidden></div>
        </main>
      </div>
    </div>
  </main>
  <footer class="stage7-footer prose-summary" data-prose="summary">
    ABAP 커리큘럼 Focus Library · Stage 7 Docs · ${new Date().toISOString().slice(0, 10)}
  </footer>
</div>
${dataScript}`;

/* ---------- page assembly ---------- */
const bodyAttrs = (docId, title) =>
  `data-page-type="doc" data-active-category="roadmap" data-doc-id="${docId}" data-doc-title="${title}" data-prose-root="true"`;

// Build sets per version. Each request bumps the version; sample numbers restart at 1.
const BUILDS = {
  v1: [
    { name: "Studio", title: "ABAP 커리큘럼 · Studio", stage7: false, body: studioBody },
    { name: "Library", title: "ABAP 커리큘럼 · Library", stage7: true, body: libraryBody },
    { name: "Focus", title: "ABAP 커리큘럼 · Focus", stage7: false, body: focusBody },
    { name: "Dashboard", title: "ABAP 커리큘럼 · Dashboard", stage7: true, body: dashboardBody }
  ],
  v2: [
    { name: "Focus Library", title: "ABAP 커리큘럼 · Focus Library", stage7: true, body: focusLibraryBody }
  ]
};

const samples = (BUILDS[VERSION] || BUILDS.v1).map((s, i) => ({ ...s, n: i + 1 }));

fs.mkdirSync(OUT_DIR, { recursive: true });

const generated = [];
for (const s of samples) {
  const fileName = `abap-curriculum-claude-${VERSION}_sample${s.n}-${ts}.html`;
  const docId = `abap-curriculum-claude-${VERSION}-sample${s.n}`;
  const bodyOpen = s.stage7
    ? `<body ${bodyAttrs(docId, s.title)}>`
    : `<body class="abx-immersive">`;
  const html = `<!DOCTYPE html>
<html lang="ko">
${head(`${s.title} · SAP Developer Learning Library`, { stage7: s.stage7 })}
${bodyOpen}
${s.body()}
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT_DIR, fileName), html, "utf8");
  generated.push({ name: s.name, fileName });
}

console.log(`Built ${generated.length} samples (version ${VERSION}, ${ts}):`);
for (const g of generated) console.log(`  ${g.name.padEnd(10)} -> docs/roadmap/${g.fileName}`);
