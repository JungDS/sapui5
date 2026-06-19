#!/usr/bin/env node
// Track 1 Lesson work starter | 최종수정 2026-06-19 23:34 KST | v1.1
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const repoRoot = process.cwd();
const progressPath = path.join(repoRoot, ".project-docs", "02_PROGRESS.md");
const plansIndexPath = path.join(repoRoot, ".project-docs", "plans", "INDEX.md");
const curriculumPath = path.join(repoRoot, "reference", "abap_curriculum_v5_4_20260605_000000.json");
const plansRoot = path.join(repoRoot, ".project-docs", "plans");

function parseArgs(argv) {
  const args = {
    ai: "Codex GPT-5",
    dryRun: false,
    lesson: ""
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") {
      args.dryRun = true;
    } else if (arg === "--lesson") {
      args.lesson = argv[++i] || "";
    } else if (arg.startsWith("--lesson=")) {
      args.lesson = arg.slice("--lesson=".length);
    } else if (arg === "--ai") {
      args.ai = argv[++i] || args.ai;
    } else if (arg.startsWith("--ai=")) {
      args.ai = arg.slice("--ai=".length);
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage:
  node tools/start-lesson-work.mjs [--lesson THEORY-01-M02] [--ai "Codex GPT-5"] [--dry-run]

What it does:
  - Infers the next Lesson from .project-docs/02_PROGRESS.md when --lesson is omitted.
  - Adds a 02_PROGRESS active claim.
  - Creates .project-docs/plans/YYYYMM/MMDD_HHMM_<lesson>/ with PLAN/TASKS/RESULTS/assets.
  - Adds the plan to .project-docs/plans/INDEX.md.
`);
}

function readRequired(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Required file not found: ${path.relative(repoRoot, filePath)}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function formatKstParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(date);

  const get = (type) => parts.find((part) => part.type === type)?.value || "";
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute")
  };
}

function formatKst(date = new Date()) {
  const p = formatKstParts(date);
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute} KST`;
}

function stampMarkdown(content, stamp) {
  const stamped = content.replace(
    /^> 📅 \*\*최종수정: .*? KST\*\*/m,
    `> 📅 **최종수정: ${stamp}**`
  );

  if (stamped === content) {
    throw new Error("Timestamp line not found for markdown file.");
  }

  return stamped;
}

function collectLessons(data) {
  const lessons = [];
  let globalChapterNumber = 0;

  for (const track of data.tracks || []) {
    let trackChapterNumber = 0;
    for (const section of track.sections || []) {
      trackChapterNumber += 1;
      globalChapterNumber += 1;
      let lessonNumber = 0;
      for (const sub1 of section.sub_levels_1 || []) {
        for (const lesson of sub1.sub_levels_2 || []) {
          lessonNumber += 1;
          lessons.push({
            id: lesson.sub_2_id,
            title: scalar(lesson.sub_2_name),
            chapterId: section.section_id,
            chapterTitle: scalar(section.section_name),
            trackChapterNumber,
            globalChapterNumber,
            lessonNumber,
            lesson,
            section,
            sub1,
            track
          });
        }
      }
    }
  }

  return lessons;
}

function scalar(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(scalar).filter(Boolean).join(" | ");
  if (typeof value === "object" && ("ko" in value || "en" in value)) {
    return value.ko || value.en || "";
  }
  return JSON.stringify(value);
}

function inferLessonId(progress) {
  const nextMatches = [...progress.matchAll(/다음:\s*(THEORY-\d{2}-M\d{2})/g)].map((match) => match[1]);
  if (nextMatches.length > 0) {
    return nextMatches[0];
  }

  const completed = new Set(
    [...progress.matchAll(/^\|\s*(THEORY-\d{2}-M\d{2})\s*\|/gm)].map((match) => match[1])
  );
  const curriculum = JSON.parse(readRequired(curriculumPath));
  const lessons = collectLessons(curriculum).filter((lesson) => /^THEORY-/.test(lesson.id));
  const nextLesson = lessons.find((lesson) => !completed.has(lesson.id));
  if (!nextLesson) {
    throw new Error("No next THEORY Lesson could be inferred from progress.");
  }
  return nextLesson.id;
}

function getActiveClaims(progress) {
  const section = progress.match(/## 🔄 진행 중 \(Active Claims\)[\s\S]*?(?=## ✅ 완료 로그)/);
  if (!section) {
    throw new Error("Active Claims section not found in 02_PROGRESS.md.");
  }
  return [...section[0].matchAll(/^\|\s*(THEORY-\d{2}-M\d{2})\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|$/gm)]
    .map((match) => ({
      lesson: match[1],
      ai: match[2].trim(),
      startedAt: match[3].trim(),
      memo: match[4].trim()
    }));
}

function addActiveClaim(progress, lessonId, ai, stamp) {
  const activeClaims = getActiveClaims(progress);
  if (activeClaims.length > 0) {
    const activeList = activeClaims.map((claim) => `${claim.lesson} by ${claim.ai}`).join(", ");
    throw new Error(`Active claim already exists (${activeList}). Complete or release it before starting another Lesson.`);
  }

  const existing = activeClaims.find((claim) => claim.lesson === lessonId);
  if (existing) {
    throw new Error(`${lessonId} is already claimed by ${existing.ai} (${existing.startedAt}).`);
  }

  const claimRow = `| ${lessonId} | ${ai} | ${stamp} | 자동화 스크립트로 claim + plan 생성 |`;
  const tableHeader = "| Lesson | AI | 시작(KST) | 메모 |\n|---|---|---|---|";
  if (!progress.includes(tableHeader)) {
    throw new Error("Active Claims table header not found.");
  }

  return progress.replace(tableHeader, `${tableHeader}\n${claimRow}`);
}

function getCurrentBranch() {
  try {
    return execSync("git branch --show-current", { cwd: repoRoot, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim() || "(unknown)";
  } catch {
    return "(unknown)";
  }
}

function slugifyLesson(lessonId) {
  return lessonId.toLowerCase();
}

function uniquePlanDir(kstParts, lessonId) {
  const monthDir = `${kstParts.year}${kstParts.month}`;
  const baseName = `${kstParts.month}${kstParts.day}_${kstParts.hour}${kstParts.minute}_${slugifyLesson(lessonId)}`;
  let name = baseName;
  let suffix = 2;
  while (fs.existsSync(path.join(plansRoot, monthDir, name))) {
    name = `${baseName}_${suffix}`;
    suffix += 1;
  }
  return {
    monthDir,
    name,
    relativeDir: `${monthDir}/${name}`,
    absoluteDir: path.join(plansRoot, monthDir, name)
  };
}

function makePlanFiles({ lesson, stamp, branch }) {
  const title = `${lesson.id} ${lesson.title}`;
  const notebookPrompt = `nlm notebook query ad0e9cde-4dca-451e-b455-de200a9ed7b7 "${lesson.id} ${lesson.title}를 Track 1 리빌딩 DoD 기준으로 보강하려고 합니다. 누락 개념, 초보자 오해 포인트, 실습 시뮬레이션 아이디어, T-code/화면 흐름, SAP 공식 문서로 재검증할 키워드를 알려주세요."`;

  const plan = `---
status: active
goal: ${title} 리셋 이후 DoD 기준 v3 리빌딩
scope: docs/abap/lesson-content/${lesson.id}.html + reference/abap_glossary.json + 필요 시 공통 자산
branch: ${branch}
---

# PLAN — ${lesson.id}

> 📅 **최종수정: ${stamp}**

## 배경
Track 1 기준선 리셋 이후 Chapter ${String(lesson.trackChapterNumber).padStart(2, "0")}의 다음 작업은 ${lesson.id}다. 기존 산출물은 참고만 하고, 현재 DoD 기준으로 NotebookLM 보강·v3 실습·T-code 연결·검증까지 다시 확인한다.

## 접근
1. 커리큘럼 JSON에서 Lesson 목표와 범위를 확정한다.
2. NotebookLM 질의 후 SAP 공식 문서로 핵심 사실을 재검증한다.
3. v3 학습수단을 먼저 고르고, 코드/화면 흐름은 페이지 내 조작형 시뮬레이션으로 연결한다.
4. 본문 T-code를 글로서리와 \`used_in_lessons\`에 연결하고, \`data-glossary\` 패리티를 점검한다.
5. 로컬 lesson-viewer에서 콘솔 오류, 칩 바, 주요 인터랙션을 검증한다.

## 완료 정의
- Lesson 완료 기준 → [01_AI_SYNC DoD](../../../01_AI_SYNC.md).
- 내부 ID는 사용자 화면에 추가 노출하지 않는다.
- 코드/설정 흐름이 등장하면 페이지 내 조작형 시뮬레이션으로 연결한다.

## NotebookLM 시작 질의
\`\`\`powershell
${notebookPrompt}
\`\`\`
`;

  const tasks = `# TASKS — ${lesson.id}

> 📅 **최종수정: ${stamp}**
> 상태 플래그만. 산문 금지.

- [x] claim (02_PROGRESS 🔄)
- [x] plans 폴더 생성
- [x] 커리큘럼 JSON 목표 확인
- [ ] NotebookLM 질의 → 보강 포인트 확보
- [ ] SAP 공식 문서 재검증
- [ ] v3 학습수단 선택 ([06](../../../06_LEARNING_METHODS.md))
- [ ] 본문 리빌딩/보강 (fragment, 인라인 style 금지)
- [ ] 디자인 토큰 준수 (\`reference/design_variants.json\`)
- [ ] T-code 글로서리 used_in_lessons 확인
- [ ] 글로서리 패리티 (미정의 0건)
- [ ] 검증 (콘솔 오류 0건 + 칩 바 + 인터랙션 동작)
- [ ] 02_PROGRESS 완료 이동 + 챕터 표 갱신
- [ ] commit + push
`;

  const results = `# RESULTS — ${lesson.id}

> 📅 **최종수정: ${stamp}**
> 결과·검증을 표/플래그로. 산문 최소. 누적 원장 아님(SSOT는 git).

| 항목 | 결과 |
|---|---|
| 리빌딩 범위 | ⬜ ${lesson.id} |
| NotebookLM 보강 | ⬜ |
| SAP 공식 재검증 | ⬜ |
| v3 학습수단 | ⬜ |
| T-code 노출 | ⬜ |
| 글로서리 미정의 | ⬜ |
| 콘솔 오류 | ⬜ |
| 인터랙션 동작 | ⬜ |
| 커밋/푸시 | ⬜ |

## 메모
- 검증 예정 URL: \`http://127.0.0.1:8765/docs/abap/lesson-viewer.html?lesson=${lesson.id}\`
`;

  return { plan, tasks, results };
}

function updatePlansIndex(index, planDir, lesson, stamp) {
  const stamped = stampMarkdown(index, stamp);
  const row = `| active | [${planDir.relativeDir}/](${planDir.relativeDir}/) | ${lesson.id} ${lesson.title} DoD 기준 v3 리빌딩 착수 |`;
  const tableHeader = "| status | 경로 | 목표 |\n|---|---|---|";
  if (!stamped.includes(tableHeader)) {
    throw new Error("plans/INDEX.md table header not found.");
  }
  return stamped.replace(tableHeader, `${tableHeader}\n${row}`);
}

function writePlanDir(planDir, files, dryRun) {
  if (dryRun) return;

  fs.mkdirSync(path.join(planDir.absoluteDir, "assets"), { recursive: true });
  fs.writeFileSync(path.join(planDir.absoluteDir, "PLAN.md"), files.plan, "utf8");
  fs.writeFileSync(path.join(planDir.absoluteDir, "TASKS.md"), files.tasks, "utf8");
  fs.writeFileSync(path.join(planDir.absoluteDir, "RESULTS.md"), files.results, "utf8");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const stamp = formatKst();
  const kstParts = formatKstParts();

  const progress = readRequired(progressPath);
  const plansIndex = readRequired(plansIndexPath);
  const curriculum = JSON.parse(readRequired(curriculumPath));
  const lessons = collectLessons(curriculum);
  const lessonId = (args.lesson || inferLessonId(progress)).toUpperCase();
  const lesson = lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    throw new Error(`Lesson not found in curriculum: ${lessonId}`);
  }
  if (!/^THEORY-\d{2}-M\d{2}$/.test(lessonId)) {
    throw new Error(`Only Track 1 THEORY lessons are supported: ${lessonId}`);
  }

  const branch = getCurrentBranch();
  const planDir = uniquePlanDir(kstParts, lessonId);
  const stampedProgress = stampMarkdown(progress, stamp);
  const nextProgress = addActiveClaim(stampedProgress, lessonId, args.ai, stamp);
  const nextPlansIndex = updatePlansIndex(plansIndex, planDir, lesson, stamp);
  const files = makePlanFiles({ lesson, stamp, branch });

  console.log(`Lesson: ${lesson.id} - ${lesson.title}`);
  console.log(`AI: ${args.ai}`);
  console.log(`Start: ${stamp}`);
  console.log(`Plan: .project-docs/plans/${planDir.relativeDir}/`);
  console.log(`Branch: ${branch}`);

  if (args.dryRun) {
    console.log("Dry run only. No files were changed.");
    return;
  }

  fs.writeFileSync(progressPath, nextProgress, "utf8");
  fs.writeFileSync(plansIndexPath, nextPlansIndex, "utf8");
  writePlanDir(planDir, files, false);

  console.log("Updated:");
  console.log("  .project-docs/02_PROGRESS.md");
  console.log("  .project-docs/plans/INDEX.md");
  console.log(`  .project-docs/plans/${planDir.relativeDir}/PLAN.md`);
  console.log(`  .project-docs/plans/${planDir.relativeDir}/TASKS.md`);
  console.log(`  .project-docs/plans/${planDir.relativeDir}/RESULTS.md`);
}

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
