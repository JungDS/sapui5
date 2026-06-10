// 수정 직전(pre-edit) 원본 스냅샷 훅 | 최종수정 2026-06-09 11:30 KST | v1.0
//
// 목적(3번 시나리오): 커밋 전, 수시로 바뀌는 파일을 되돌리기 위한 로컬 안전망.
//   Claude가 Edit/Write로 파일을 바꾸기 "직전"에 디스크의 현재 원본을 스냅샷한다.
//   git이 못 잡는 "커밋 사이 중간 편집 상태"를 보존한다. (1·2번 = 영구 이력은 git이 담당)
//
// 저장 위치: archive/_local/<원본경로>/<파일명(확장자 제외)>/<yyyymmdd>_<hhmmss>.<ext>
//   - archive/_local/ 는 .gitignore 대상(로컬 전용, 저장소·이력 미오염).
//   - 커밋 시 .githooks/post-commit 이 비운다(커밋마다 초기화).
//
// 타임스탬프(= 수정 전 원본의 시각):
//   - .html  : data-doc-updated-at 메타데이터
//   - .css/.js/.mjs : 첫 줄 헤더의 `최종수정 YYYY-MM-DD HH:MM`
//   - 없으면 파일 mtime(마지막 저장 시각)으로 fallback
//
// 대상 확장자: html/css/js/mjs. archive/ 및 신규(없는) 파일은 제외.
// 안전성: 어떤 오류도 편집을 막지 않도록 항상 exit 0.

import { readFileSync, statSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, join, relative, extname, basename, isAbsolute } from "node:path";

function pad(n) { return String(n).padStart(2, "0"); }

function fmt(y, mo, d, h, mi, s) {
  return `${y}${pad(mo)}${pad(d)}_${pad(h)}${pad(mi)}${pad(s)}`;
}

function tsFromContent(content, ext) {
  try {
    if (ext === "html") {
      const m = content.match(/data-doc-updated-at\s*=\s*"(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/);
      if (m) return fmt(m[1], +m[2], +m[3], +m[4], +m[5], +(m[6] || 0));
    } else {
      // 첫 줄만 검사
      const first = content.split(/\r?\n/, 1)[0] || "";
      const m = first.match(/최종수정\s+(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?/);
      if (m) return fmt(m[1], +m[2], +m[3], +m[4], +m[5], +(m[6] || 0));
    }
  } catch { /* ignore */ }
  return null;
}

function tsFromMtime(filePath) {
  const t = statSync(filePath).mtime;
  return fmt(t.getFullYear(), t.getMonth() + 1, t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds());
}

async function main() {
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  let payload;
  try { payload = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); }
  catch { return; }

  const root = payload.cwd || process.cwd();
  const fp = payload?.tool_input?.file_path;
  if (!fp) return;

  const abs = isAbsolute(fp) ? fp : join(root, fp);
  let rel = relative(root, abs).split("\\").join("/");
  // 저장소 밖이면 무시
  if (rel.startsWith("..")) return;
  // archive/ 는 읽기 전용
  if (rel.startsWith("archive/")) return;

  const ext = extname(abs).slice(1).toLowerCase();
  if (!["html", "css", "js", "mjs"].includes(ext)) return;

  // 신규 파일(아직 디스크에 없음)은 보존할 원본이 없음
  if (!existsSync(abs)) return;

  let content = "";
  try { content = readFileSync(abs, "utf8"); } catch { /* binary 등 */ }

  const ts = tsFromContent(content, ext) || tsFromMtime(abs);

  const relDir = dirname(rel);
  const name = basename(rel, "." + ext);
  const destDir = join(root, "archive", "_local", relDir, name);
  const dest = join(destDir, `${ts}.${ext}`);

  mkdirSync(destDir, { recursive: true });
  copyFileSync(abs, dest);
}

main().catch(() => {}).finally(() => process.exit(0));
