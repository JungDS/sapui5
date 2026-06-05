#!/usr/bin/env node
/**
 * ABAP Curriculum Master-Detail Page Generator
 *
 * Purpose:
 * - Read reference/abap_curriculum_20260529_180000.json (rich, 4-level bilingual curriculum)
 * - Emit a self-contained static master-detail page under docs/roadmap/
 *   Layout: top tabs = track / left list = section / right = sub_2 compact rows
 *           (sub_1 as group subheaders) / inline expand = rich body + depth_3.
 * - Reuses the Stage 7 shell (common.css / shell.css / shell.js).
 *   Track tabs ride on the existing [data-stage7-tabset] handler.
 *
 * Usage from repository root:
 *   node tools/build-abap-curriculum.mjs
 *
 * Output filename: docs/roadmap/abap-curriculum-claude-<yyyymmdd>-<hhmmss>.html
 * The generated filename is printed to stdout so it can be registered in
 * assets/shell.js (DOCS).
 */
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const SRC = path.join(repoRoot, 'reference', 'abap_curriculum_20260529_180000.json');
const OUT_DIR = path.join(repoRoot, 'docs', 'roadmap');

/* ---------- helpers ---------- */

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Korean-first value extractor: handles {ko,en} objects, plain strings, null.
function ko(v) {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'object' && ('ko' in v || 'en' in v)) return v.ko || v.en || '';
  return String(v);
}

// {ko:[],en:[]} -> ko array
function koList(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (Array.isArray(v.ko)) return v.ko;
  if (Array.isArray(v.en)) return v.en;
  return [];
}

function hours(n) {
  if (n == null || n === '') return '';
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  return (Number.isInteger(num) ? num : num.toFixed(1)) + '시간';
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

function timestamp(d = new Date()) {
  const z = (n) => String(n).padStart(2, '0');
  return (
    d.getFullYear() +
    z(d.getMonth() + 1) +
    z(d.getDate()) +
    '-' +
    z(d.getHours()) +
    z(d.getMinutes()) +
    z(d.getSeconds())
  );
}

/* ---------- renderers ---------- */

function renderKeywords(keywords) {
  if (!Array.isArray(keywords) || !keywords.length) return '';
  return (
    '<div class="cur-kw-row">' +
    keywords.map((k) => `<span class="cur-kw">${esc(k)}</span>`).join('') +
    '</div>'
  );
}

function renderRowBody(s2, bodyId) {
  const parts = [];

  const objective = ko(s2.learning_objectives);
  if (objective) {
    parts.push(
      `<div class="cur-block"><h5>학습 목표</h5><p>${esc(objective)}</p></div>`
    );
  }

  const steps = koList(s2.learning_content_design);
  if (steps.length) {
    parts.push(
      '<div class="cur-block"><h5>학습 내용</h5><ol>' +
        steps.map((x) => `<li>${esc(x)}</li>`).join('') +
        '</ol></div>'
    );
  }

  const scenario = ko(s2.practical_scenario);
  if (scenario) {
    parts.push(
      `<div class="cur-block"><h5>실무 시나리오</h5><p>${esc(scenario)}</p></div>`
    );
  }

  const lab = ko(s2.hands_on_lab);
  if (lab) {
    parts.push(`<div class="cur-block"><h5>Hands-on Lab</h5><p>${esc(lab)}</p></div>`);
  }

  const cautions = (s2.caution_points || []).map((c) => ko(c)).filter(Boolean);
  if (cautions.length) {
    parts.push(
      '<div class="cur-block"><h5>주의점</h5><ul>' +
        cautions.map((x) => `<li>${esc(x)}</li>`).join('') +
        '</ul></div>'
    );
  }

  const d3 = s2.depth_3_learning_units || [];
  if (d3.length) {
    parts.push(
      '<details class="cur-d3"><summary>세부 학습 단위 ' +
        d3.length +
        '개</summary><ul>' +
        d3
          .map((u) => {
            const name = esc(ko(u.unit_name));
            const focus = esc(ko(u.focus));
            const id = esc(u.unit_id || '');
            return (
              '<li><span class="cur-d3__id">' +
              id +
              '</span> <strong>' +
              name +
              '</strong>' +
              (focus ? ` — ${focus}` : '') +
              '</li>'
            );
          })
          .join('') +
        '</ul></details>'
    );
  }

  const sc = s2.sample_code;
  if (sc && sc.snippet) {
    const note = ko(sc.note);
    parts.push(
      '<div class="cur-block"><h5>샘플 코드' +
        (sc.language ? ` <span class="cur-lang">${esc(sc.language)}</span>` : '') +
        '</h5>' +
        (note ? `<p class="cur-note">${esc(note)}</p>` : '') +
        `<pre><code>${esc(sc.snippet)}</code></pre></div>`
    );
  }

  return `<div class="cur-row__body" id="${bodyId}" hidden>${parts.join('')}</div>`;
}

function renderRow(s2, idx, rowKey) {
  const bodyId = `body-${rowKey}`;
  const diff = ko((s2.module_metadata && s2.module_metadata.difficulty_band) || '');
  const hrs = hours(s2.module_metadata && s2.module_metadata.recommended_hours);
  const meta = [diff, hrs].filter(Boolean);
  return (
    '<div class="cur-row">' +
    `<div class="cur-row__head">` +
    `<span class="cur-row__idx">${pad2(idx)}</span>` +
    `<div class="cur-row__main">` +
    (meta.length
      ? `<div class="cur-row__meta">${meta.map((m) => esc(m)).join(' · ')}</div>`
      : '') +
    `<div class="cur-row__title">${esc(ko(s2.sub_2_name))}</div>` +
    renderKeywords(s2.technical_keywords) +
    `</div>` +
    `<button type="button" class="cur-row__toggle" aria-expanded="false" aria-controls="${bodyId}" data-body="${bodyId}">상세</button>` +
    `</div>` +
    renderRowBody(s2, bodyId) +
    '</div>'
  );
}

function renderSectionPanel(track, section, sIdx, isActive) {
  const groups = [];
  let rowCounter = 0;
  for (const s1 of section.sub_levels_1 || []) {
    const note = ko(s1.learning_path_note);
    const s1meta = [s1.difficulty, hours(s1.recommended_hours)].filter(Boolean);
    const rows = (s1.sub_levels_2 || [])
      .map((s2) => {
        rowCounter += 1;
        return renderRow(s2, rowCounter, `${section.section_id}-${rowCounter}`);
      })
      .join('');
    groups.push(
      '<div class="cur-group">' +
        '<div class="cur-group__head">' +
        `<h4>${esc(s1.sub_1_id || '')} · ${esc(ko(s1.sub_1_name))}</h4>` +
        (s1meta.length
          ? `<div class="cur-group__meta">${s1meta.map((m) => esc(m)).join(' · ')}</div>`
          : '') +
        '</div>' +
        (note ? `<p class="cur-group__note">${esc(note)}</p>` : '') +
        `<div class="cur-rows">${rows}</div>` +
        '</div>'
    );
  }
  return (
    `<div class="cur-md__detail" data-panel="${esc(section.section_id)}" data-track="${esc(track.track_id)}"${isActive ? '' : ' hidden'}>` +
    '<button type="button" class="cur-back" data-back>← 목록</button>' +
    `<h3 class="cur-detail__title">${esc(section.section_id)} · ${esc(ko(section.section_name))}</h3>` +
    groups.join('') +
    '</div>'
  );
}

function renderTrackPanel(track, tIdx, isActive) {
  const sections = track.sections || [];
  const listButtons = sections
    .map((s, i) => {
      const active = i === 0;
      const meta = [
        s.topic_count ? `${s.topic_count}개 단위` : '',
        hours(s.recommended_hours),
      ]
        .filter(Boolean)
        .join(' · ');
      return (
        `<button type="button" class="cur-md__item${active ? ' is-active' : ''}" ` +
        `data-detail="${esc(s.section_id)}" data-track="${esc(track.track_id)}">` +
        `<span class="cur-md__id">${esc(s.section_id)}</span>` +
        `<span class="cur-md__name">${esc(ko(s.section_name))}</span>` +
        (meta ? `<span class="cur-md__meta">${esc(meta)}</span>` : '') +
        `</button>`
      );
    })
    .join('');

  const panels = sections
    .map((s, i) => renderSectionPanel(track, s, i, i === 0))
    .join('');

  return (
    `<div class="stage7-tab-panel" id="${esc(track.track_id)}" role="tabpanel" ` +
    `aria-labelledby="tab-${esc(track.track_id)}" data-stage7-panel="${esc(track.track_id)}"${isActive ? '' : ' hidden'}>` +
    `<div class="cur-md" data-track="${esc(track.track_id)}">` +
    `<div class="cur-md__list" role="tablist" aria-label="${esc(ko(track.track_name))} 섹션">${listButtons}</div>` +
    `<div class="cur-md__detail-wrap">${panels}</div>` +
    `</div>` +
    `</div>`
  );
}

/* ---------- page assembly ---------- */

function buildStats(data) {
  let sections = 0;
  let sub2 = 0;
  let totalHours = 0;
  for (const t of data.tracks) {
    sections += (t.sections || []).length;
    for (const s of t.sections || []) {
      for (const a of s.sub_levels_1 || []) {
        for (const x of a.sub_levels_2 || []) {
          sub2 += 1;
          const h = x.module_metadata && x.module_metadata.recommended_hours;
          if (h) totalHours += Number(h) || 0;
        }
      }
    }
  }
  return { tracks: data.tracks.length, sections, sub2, totalHours: Math.round(totalHours) };
}

const PAGE_STYLE = `
  /* 마스터-디테일 전용 (공용 디자인 시스템 미수정) */
  .cur-kw-row { display:flex; flex-wrap:wrap; gap:6px; margin:8px 0 0; }
  .cur-kw { border:1px solid var(--stage7-line); background:#f8fafc; color:#475569; border-radius:999px; padding:3px 9px; font-size:.72rem; font-weight:800; }

  .cur-md { display:grid; grid-template-columns:300px 1fr; gap:18px; margin-top:18px; align-items:start; }
  .cur-md__list { display:flex; flex-direction:column; gap:8px; position:sticky; top:84px; }
  .cur-md__item { position:relative; text-align:left; border:1px solid var(--stage7-line); background:#fff; border-radius:14px; padding:12px 14px; cursor:pointer; display:flex; flex-direction:column; gap:3px; transition:border-color .15s, box-shadow .15s; }
  .cur-md__item:hover { border-color:#bfdbfe; box-shadow:0 4px 12px rgba(0,0,0,.05); }
  .cur-md__id { font-size:.72rem; font-weight:950; letter-spacing:.04em; color:var(--stage7-blue); }
  .cur-md__name { font-size:.98rem; font-weight:850; color:var(--stage7-text); line-height:1.3; }
  .cur-md__meta { font-size:.76rem; font-weight:700; color:var(--stage7-muted); }
  .cur-md__item.is-active { background:linear-gradient(135deg,#eff6ff,#ffffff); border-color:#2563eb; box-shadow:0 6px 16px rgba(37,99,235,.15); }
  .cur-md__item.is-active .cur-md__name { color:#1d4ed8; }
  /* 우측을 가리키는 화살표 꼬리 */
  .cur-md__item.is-active::after { content:""; position:absolute; right:-9px; top:50%; transform:translateY(-50%); width:0; height:0; border-top:9px solid transparent; border-bottom:9px solid transparent; border-left:9px solid #2563eb; }

  .cur-md__detail-wrap { min-width:0; }
  .cur-back { display:none; }
  .cur-detail__title { font-size:1.15rem; font-weight:900; color:var(--stage7-text); margin:0 0 14px; padding-bottom:8px; border-bottom:2px solid #eef2f7; }

  .cur-group { margin-bottom:22px; }
  .cur-group__head { display:flex; align-items:baseline; justify-content:space-between; gap:10px; flex-wrap:wrap; }
  .cur-group__head h4 { margin:0; font-size:1rem; font-weight:900; color:#0f172a; }
  .cur-group__meta { font-size:.78rem; font-weight:800; color:var(--stage7-muted); white-space:nowrap; }
  .cur-group__note { margin:4px 0 10px; color:#64748b; font-size:.85rem; line-height:1.5; }

  .cur-rows { display:flex; flex-direction:column; gap:8px; }
  .cur-row { border:1px solid var(--stage7-line); border-radius:14px; background:#fff; overflow:hidden; }
  .cur-row__head { display:flex; align-items:flex-start; gap:12px; padding:12px 14px; }
  .cur-row__idx { flex:0 0 auto; font-size:1.05rem; font-weight:950; color:#94a3b8; min-width:26px; }
  .cur-row__main { flex:1 1 auto; min-width:0; }
  .cur-row__meta { font-size:.74rem; font-weight:850; color:#ea7317; margin-bottom:2px; }
  .cur-row__title { font-size:.98rem; font-weight:800; color:var(--stage7-text); line-height:1.35; }
  .cur-row__toggle { flex:0 0 auto; align-self:center; border:1px solid #bfdbfe; background:#eff6ff; color:#1d4ed8; border-radius:10px; padding:7px 14px; font-size:.82rem; font-weight:900; cursor:pointer; }
  .cur-row__toggle[aria-expanded="true"] { background:#1d4ed8; color:#fff; border-color:#1d4ed8; }
  .cur-row__body { padding:4px 16px 16px; border-top:1px dashed #e5e7eb; }

  .cur-block { margin-top:14px; }
  .cur-block h5 { margin:0 0 6px; font-size:.86rem; font-weight:900; color:#1d4ed8; }
  .cur-block p { margin:0; color:#374151; line-height:1.7; font-size:.92rem; }
  .cur-block ol, .cur-block ul { margin:0; padding-left:1.2rem; color:#374151; line-height:1.7; font-size:.92rem; }
  .cur-block ol li, .cur-block ul li { margin-bottom:4px; }
  .cur-lang { font-size:.7rem; font-weight:800; color:#64748b; background:#f1f5f9; border-radius:6px; padding:2px 6px; }
  .cur-note { color:#64748b !important; font-size:.84rem !important; margin-bottom:8px !important; }
  .cur-block pre { margin:8px 0 0; background:#0f172a; color:#e2e8f0; border-radius:12px; padding:14px; overflow-x:auto; font-size:.82rem; line-height:1.55; }

  .cur-d3 { margin-top:14px; border:1px solid #e5e7eb; border-radius:12px; padding:10px 14px; background:#f8fafc; }
  .cur-d3 summary { cursor:pointer; font-weight:900; font-size:.86rem; color:#0f172a; }
  .cur-d3 ul { margin:10px 0 0; padding-left:1.1rem; color:#374151; font-size:.9rem; line-height:1.6; }
  .cur-d3__id { font-size:.7rem; font-weight:850; color:#2563eb; }

  @media (max-width: 880px) {
    .cur-md { grid-template-columns:1fr; }
    .cur-md__list { position:static; }
    .cur-md__item.is-active::after { display:none; }
    .cur-md.is-detail .cur-md__list { display:none; }
    .cur-md:not(.is-detail) .cur-md__detail-wrap { display:none; }
    .cur-back { display:inline-block; margin:0 0 12px; border:1px solid var(--stage7-line); background:#f8fafc; color:#1d4ed8; border-radius:10px; padding:8px 14px; font-weight:900; cursor:pointer; }
  }
`;

const PAGE_SCRIPT = `
(function () {
  "use strict";
  // 좌측 section 선택 -> 우측 패널 전환
  document.addEventListener("click", function (e) {
    var item = e.target.closest(".cur-md__item");
    if (item) {
      var md = item.closest(".cur-md");
      var key = item.getAttribute("data-detail");
      md.querySelectorAll(".cur-md__item").forEach(function (b) {
        b.classList.toggle("is-active", b === item);
      });
      md.querySelectorAll(".cur-md__detail").forEach(function (p) {
        p.hidden = p.getAttribute("data-panel") !== key;
      });
      md.classList.add("is-detail"); // 모바일: 상세로 푸시
      return;
    }
    // 우측 행 상세 토글
    var toggle = e.target.closest(".cur-row__toggle");
    if (toggle) {
      var body = document.getElementById(toggle.getAttribute("data-body"));
      if (!body) return;
      var open = body.hasAttribute("hidden");
      if (open) { body.removeAttribute("hidden"); } else { body.setAttribute("hidden", ""); }
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "접기" : "상세";
      return;
    }
    // 모바일 뒤로가기
    var back = e.target.closest(".cur-back");
    if (back) {
      var md2 = back.closest(".cur-md");
      if (md2) md2.classList.remove("is-detail");
    }
  });
})();
`;

function buildPage(data, stats) {
  const trackTabs = data.tracks
    .map((t, i) => {
      const sub = `${(t.sections || []).length}개 섹션`;
      return (
        `<button type="button" class="${i === 0 ? 'active' : ''}" id="tab-${esc(t.track_id)}" ` +
        `data-stage7-tab="${esc(t.track_id)}" aria-selected="${i === 0}" aria-controls="${esc(t.track_id)}">` +
        `${esc(t.track_id)} · ${esc(ko(t.track_name))}<span>${esc(sub)}</span>` +
        `</button>`
      );
    })
    .join('');

  const trackPanels = data.tracks
    .map((t, i) => renderTrackPanel(t, i, i === 0))
    .join('');

  const nowIso = new Date().toISOString();

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ABAP 엔터프라이즈 커리큘럼 탐색기 · SAP Developer Learning Library</title>
<link rel="stylesheet" href="../../assets/common.css" />
<link rel="stylesheet" href="../../assets/shell.css" />
<script src="../../assets/common.js" defer></script>
<script src="../../assets/shell.js" defer></script>
<style>${PAGE_STYLE}</style>
</head>
<body
  data-page-type="doc"
  data-active-category="roadmap"
  data-doc-id="abap-curriculum-claude"
  data-doc-title="ABAP 엔터프라이즈 커리큘럼 탐색기"
  data-doc-version="5.3"
  data-doc-created-at="${esc(nowIso)}"
  data-doc-updated-at="${esc(nowIso)}"
  data-prose-root="true">

<div class="stage7-doc-layout">
  <section class="stage7-hero prose-summary" data-prose="summary">
    <div class="breadcrumb" data-prose="summary">
      <a href="../../index.html">홈</a>
      <span>›</span>
      <a href="../../pages/roadmap.html">로드맵 / 학습전략</a>
      <span>›</span>
      <span>ABAP 엔터프라이즈 커리큘럼 탐색기</span>
    </div>
    <div class="stage7-hero__eyebrow">SAP Developer Learning Library</div>
    <h1>ABAP 엔터프라이즈 커리큘럼 탐색기</h1>
    <p class="lead">
      상단에서 <button class="term" data-term="ABAP" type="button">ABAP</button> 학습 트랙을 고르고,
      좌측에서 섹션을 선택하면 우측에 세부 학습 단위와 학습목표·실습·주의점·세부 단위가 펼쳐집니다.
      기초 문법에서 <button class="term" data-term="CDS" type="button">CDS</button>,
      <button class="term" data-term="RAP" type="button">RAP</button>까지 선후수 흐름으로 탐색하세요.
    </p>
    <div class="home-badges">
      <span class="stage7-badge blue">${stats.tracks}개 트랙</span>
      <span class="stage7-badge green">${stats.sections}개 섹션</span>
      <span class="stage7-badge purple">${stats.sub2}개 학습 단위</span>
      <span class="stage7-badge amber">권장 ${stats.totalHours}시간</span>
    </div>
  </section>

  <main>
    <section class="stage7-section prose-structure" data-prose="structure" id="curriculum">
      <div class="stage7-section__label">트랙별 커리큘럼 탐색</div>
      <h2>트랙 · 섹션을 선택해 세부 학습 단위를 확인합니다</h2>
      <div class="stage7-track-tabs" data-stage7-tabset>
        <div class="stage7-tabs stage7-tabs--large" role="tablist" aria-label="커리큘럼 트랙 선택">
          ${trackTabs}
        </div>
        ${trackPanels}
      </div>
    </section>
  </main>

  <footer class="stage7-footer prose-summary" data-prose="summary">
    ABAP 엔터프라이즈 커리큘럼 탐색기 · Stage 7 Docs · ${esc(nowIso.slice(0, 10))}
  </footer>
</div>
<script>${PAGE_SCRIPT}</script>
</body>
</html>
`;
}

/* ---------- main ---------- */

function main() {
  if (!fs.existsSync(SRC)) {
    console.error('Source JSON not found:', SRC);
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(SRC, 'utf8'));
  const stats = buildStats(data);
  const html = buildPage(data, stats);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const fileName = `abap-curriculum-claude-${timestamp()}.html`;
  const outPath = path.join(OUT_DIR, fileName);
  fs.writeFileSync(outPath, html, 'utf8');

  console.log('Generated: docs/roadmap/' + fileName);
  console.log(
    `Stats: ${stats.tracks} tracks / ${stats.sections} sections / ${stats.sub2} units / ~${stats.totalHours}h`
  );
}

main();
