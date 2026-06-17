// 커밋 직전 staged 파일 R1 타임스탬프 자동 스탬프 | 최종수정 2026-06-16 19:05 KST | v1.2
//
// 목적: 04_CONVENTIONS R1(수정 시 최상단 `YYYY-MM-DD HH:MM KST` 갱신)을 사람의 기억이 아니라
//   git pre-commit 단계에서 기계적으로 강제한다. 커밋되는 staged 파일의 헤더 타임스탬프를
//   현재 KST(OS 실제 Asia/Seoul 시각)로 처리한다:
//     - 헤더가 이미 있으면 → 현재 KST로 교체
//     - 헤더가 없으면      → 파일 타입에 맞는 올바른 위치/형식으로 헤더를 새로 삽입
//   처리 후 다시 stage 한다.
//   - git이 자동 실행하므로 어떤 편집 도구(Claude / Codex / Antigravity / 사람)로 고쳤든 공통 적용.
//   - 수동 트리거가 없어 "실행을 깜빡"할 단계가 존재하지 않는다.
//
// 대상: .md / .css / .js / .mjs / .html (staged ACM). JSON은 주석 불가 → 제외.
// 제외: archive/ · node_modules/ · .git/.
// 삽입 위치: js/mjs는 셔뱅(#!) 뒤, md는 첫 H1 다음.
//   html: 모든 파일은 최상단 주석을 둔다(있으면 갱신, 없으면 삽입). 추가로 <body>가 있으면
//         data-doc-updated-at 속성도 처리(있으면 갱신, 없으면 주입).
// 안전: 어떤 오류도 커밋을 막지 않는다(fail-open, exit 0).

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { extname, basename } from "node:path";

function nowKST() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false
  }).formatToParts(new Date());
  const get = (t) => (parts.find((p) => p.type === t) || {}).value;
  let hh = get("hour");
  if (hh === "24") hh = "00";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, time: `${hh}:${get("minute")}` };
}

// .md/.css/.js/.mjs + 프래그먼트 .html 주석: "최종수정[:] YYYY-MM-DD HH:MM[:SS] KST" (첫 발생 = 헤더)
function stampComment(content, { date, time }) {
  const re = /(최종수정)(:?\s+)\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}(?::\d{2})?(\s*)KST/;
  if (!re.test(content)) return null;
  return content.replace(re, `$1$2${date} ${time}$3KST`);
}

// 운영 .html: data-doc-updated-at="YYYY-MM-DD[...]" 의 날짜 부분만 갱신(포맷/시간 접미사 보존)
function stampHtmlAttr(content, { date }) {
  const re = /(data-doc-updated-at\s*=\s*")\d{4}-\d{2}-\d{2}/;
  if (!re.test(content)) return null;
  return content.replace(re, `$1${date}`);
}

// 최상단(공백 제외 첫 토큰)이 `<!-- … 최종수정 … KST … -->` 주석이면 그 안의 날짜·시각만 갱신.
function stampHtmlTopComment(content, { date, time }) {
  const m = content.match(/^\s*<!--[^]*?-->/);
  if (!m) return null;
  const re = /(최종수정)(:?\s+)\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}(?::\d{2})?(\s*)KST/;
  if (!re.test(m[0])) return null;
  return content.replace(m[0], m[0].replace(re, `$1$2${date} ${time}$3KST`));
}

// .html 규칙: (1) 모든 HTML은 최상단 주석을 둔다(있으면 갱신, 없으면 삽입).
//            (2) 추가로 <body>가 있으면 data-doc-updated-at도 처리(있으면 갱신, 없으면 주입).
function ensureHtml(content, ts, name) {
  let out = content;
  const topUpdated = stampHtmlTopComment(out, ts);
  out = topUpdated !== null
    ? topUpdated
    : `<!-- ${name} | 최종수정 ${ts.date} ${ts.time} KST -->\n${out}`;
  if (/<body\b/i.test(out)) {
    const attrUpdated = stampHtmlAttr(out, ts);
    out = attrUpdated !== null
      ? attrUpdated
      : out.replace(/<body\b/i, `<body data-doc-updated-at="${ts.date}"`);
  }
  return out;
}

// ── 헤더가 없을 때: 타입별로 올바른 위치에 새 헤더를 삽입 ───────────────────
function insertComment(content, ts, ext, name) {
  const line = ext === "css"
    ? `/* ${name} | 최종수정 ${ts.date} ${ts.time} KST | v1.0 */`
    : `// ${name} | 최종수정 ${ts.date} ${ts.time} KST | v1.0`;
  const lines = content.split(/\r?\n/);
  if (lines[0] && lines[0].startsWith("#!")) {       // 셔뱅 보존(js/mjs)
    lines.splice(1, 0, line);
    return lines.join("\n");
  }
  return line + "\n" + content;
}

function insertMd(content, ts) {
  const tsLine = `> 📅 **최종수정: ${ts.date} ${ts.time} KST**`;
  const lines = content.split(/\r?\n/);
  const h1 = lines.findIndex((l) => /^#\s/.test(l));
  if (h1 >= 0) { lines.splice(h1 + 1, 0, "", tsLine); return lines.join("\n"); }
  return `${tsLine}\n\n${content}`;
}

function stagedFiles() {
  const out = execSync("git diff --cached --name-only --diff-filter=ACM", { encoding: "utf8" });
  return out.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
}

function main() {
  const ts = nowKST();
  const stamped = [];
  const inserted = [];

  for (const rel of stagedFiles()) {
    const norm = rel.split("\\").join("/");
    if (/^(archive|node_modules|\.git)\//.test(norm)) continue;
    const ext = extname(norm).slice(1).toLowerCase();
    if (!["md", "css", "js", "mjs", "html"].includes(ext)) continue;
    if (!existsSync(norm)) continue;

    let content;
    try { content = readFileSync(norm, "utf8"); } catch { continue; }

    const name = basename(norm);
    let updated, isInsert;
    if (ext === "html") {
      // 모든 HTML은 최상단 주석 보장(+ body 있으면 속성). 최상단 주석이 없던 경우만 "삽입"으로 분류.
      isInsert = stampHtmlTopComment(content, ts) === null;
      updated = ensureHtml(content, ts, name);
    } else {
      updated = stampComment(content, ts);
      isInsert = updated === null;
      if (isInsert) updated = ext === "md" ? insertMd(content, ts) : insertComment(content, ts, ext, name);
    }

    if (updated !== content) {
      writeFileSync(norm, updated);
      execSync(`git add -- "${norm}"`);
      (isInsert ? inserted : stamped).push(norm);
    }
  }

  if (stamped.length) {
    console.log(`[pre-commit] R1 타임스탬프 갱신 → ${ts.date} ${ts.time} KST (${stamped.length}): ${stamped.join(", ")}`);
  }
  if (inserted.length) {
    console.log(`[pre-commit] R1 타임스탬프 헤더 신규 삽입 (${inserted.length}): ${inserted.join(", ")}`);
  }
}

try { main(); } catch { /* fail-open: 훅 오류로 커밋을 막지 않는다 */ }
process.exit(0);
