#!/usr/bin/env node
// Track 1 Lesson pipeline automation | 최종수정 2026-06-19 23:34 KST | v1.1
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const repoRoot = process.cwd();
const progressPath = path.join(repoRoot, ".project-docs", "02_PROGRESS.md");
const plansIndexPath = path.join(repoRoot, ".project-docs", "plans", "INDEX.md");
const curriculumPath = path.join(repoRoot, "reference", "abap_curriculum_v5_4_20260605_000000.json");
const plansRoot = path.join(repoRoot, ".project-docs", "plans");

function parseArgs(argv) {
  const command = argv[0] && !argv[0].startsWith("--") ? argv[0] : "status";
  const rest = argv[0] && !argv[0].startsWith("--") ? argv.slice(1) : argv;
  const args = {
    ai: "Codex GPT-5",
    command,
    confirm: false,
    dryRun: false,
    json: false,
    lesson: "",
    note: "",
    startNext: false
  };

  for (let i = 0; i < rest.length; i += 1) {
    const arg = rest[i];
    if (arg === "--confirm") args.confirm = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--json") args.json = true;
    else if (arg === "--start-next") args.startNext = true;
    else if (arg === "--lesson") args.lesson = rest[++i] || "";
    else if (arg.startsWith("--lesson=")) args.lesson = arg.slice("--lesson=".length);
    else if (arg === "--ai") args.ai = rest[++i] || args.ai;
    else if (arg.startsWith("--ai=")) args.ai = arg.slice("--ai=".length);
    else if (arg === "--note") args.note = rest[++i] || "";
    else if (arg.startsWith("--note=")) args.note = arg.slice("--note=".length);
    else if (arg === "--help" || arg === "-h") {
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
  node tools/track1-pipeline.mjs status [--json]
  node tools/track1-pipeline.mjs queue [--json]
  node tools/track1-pipeline.mjs start [--lesson THEORY-01-M02] [--ai "Codex GPT-5"] [--dry-run]
  node tools/track1-pipeline.mjs finish --lesson THEORY-01-M02 --confirm --note "검증 완료" [--start-next] [--dry-run]

Workflow:
  1. status      전체 Track 1 진행률, active claim, 다음 후보 확인
  2. start       한 Lesson만 claim + plans scaffold 생성
  3. lesson work NotebookLM/SAP 공식 재검증/본문 작성/브라우저 검증 수행
  4. finish      완료 로그/챕터 표/plans 상태 갱신
  5. --start-next 완료 직후 다음 Lesson claim + plans scaffold 생성
`);
}

function readRequired(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Required file not found: ${path.relative(repoRoot, filePath)}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function writeFile(filePath, content, dryRun) {
  if (!dryRun) fs.writeFileSync(filePath, content, "utf8");
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

function stampMarkdown(content, stamp, label = "markdown file") {
  const pattern = /^> .*최종수정: .*?KST.*$/m;
  if (!pattern.test(content)) {
    if (process.env.TRACK1_DEBUG) {
      console.error(`${label} preview: ${JSON.stringify(String(content).slice(0, 240))}`);
    }
    throw new Error(`Timestamp line not found for ${label}.`);
  }

  return content.replace(pattern, `> 📅 **최종수정: ${stamp}**`);
}

function scalar(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(scalar).filter(Boolean).join(" | ");
  if (typeof value === "object" && ("ko" in value || "en" in value)) return value.ko || value.en || "";
  return JSON.stringify(value);
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
            chapter: String(trackChapterNumber).padStart(2, "0"),
            chapterId: section.section_id,
            chapterTitle: scalar(section.section_name),
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

  return lessons.filter((lesson) => /^THEORY-\d{2}-M\d{2}$/.test(lesson.id));
}

function loadState() {
  const progress = readRequired(progressPath);
  const plansIndex = readRequired(plansIndexPath);
  const curriculum = JSON.parse(readRequired(curriculumPath));
  const lessons = collectLessons(curriculum);
  const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
  return { progress, plansIndex, lessons, lessonById };
}

function getActiveClaims(progress) {
  const section = progress.match(/## 🔄 진행 중 \(Active Claims\)[\s\S]*?(?=## ✅ 완료 로그)/);
  if (!section) throw new Error("Active Claims section not found in 02_PROGRESS.md.");

  return [...section[0].matchAll(/^\|\s*(THEORY-\d{2}-M\d{2})\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|$/gm)]
    .map((match) => ({
      lesson: match[1],
      ai: match[2].trim(),
      startedAt: match[3].trim(),
      memo: match[4].trim()
    }));
}

function getCompletedLessons(progress) {
  const section = progress.match(/## ✅ 완료 로그 \(최신 위\)[\s\S]*$/);
  if (!section) throw new Error("Completed log section not found in 02_PROGRESS.md.");
  return new Set([...section[0].matchAll(/^\|\s*(THEORY-\d{2}-M\d{2})\s*\|/gm)].map((match) => match[1]));
}

function getNextLesson(lessons, completed, activeClaims) {
  const active = new Set(activeClaims.map((claim) => claim.lesson));
  return lessons.find((lesson) => !completed.has(lesson.id) && !active.has(lesson.id)) || null;
}

function buildSummary(state) {
  const activeClaims = getActiveClaims(state.progress);
  const completed = getCompletedLessons(state.progress);
  const nextLesson = getNextLesson(state.lessons, completed, activeClaims);
  const chapterRows = [];

  for (const chapter of [...new Set(state.lessons.map((lesson) => lesson.chapter))]) {
    const chapterLessons = state.lessons.filter((lesson) => lesson.chapter === chapter);
    const done = chapterLessons.filter((lesson) => completed.has(lesson.id)).length;
    const active = chapterLessons.some((lesson) => activeClaims.some((claim) => claim.lesson === lesson.id));
    chapterRows.push({
      chapter,
      status: done === chapterLessons.length ? "done" : active || done > 0 ? "active" : "todo",
      done,
      total: chapterLessons.length,
      next: chapterLessons.find((lesson) => !completed.has(lesson.id))?.id || ""
    });
  }

  return {
    total: state.lessons.length,
    completed: completed.size,
    activeClaims,
    remaining: state.lessons.length - completed.size,
    nextLesson: nextLesson ? {
      id: nextLesson.id,
      title: nextLesson.title,
      chapter: nextLesson.chapter,
      lessonNumber: nextLesson.lessonNumber
    } : null,
    chapters: chapterRows
  };
}

function printStatus(state, json) {
  const summary = buildSummary(state);
  if (json) {
    console.log(JSON.stringify(summary, null, 2));
    return;
  }

  console.log(`Track 1 total: ${summary.total}`);
  console.log(`Completed: ${summary.completed}`);
  console.log(`Remaining including active: ${summary.remaining}`);
  console.log(`Active: ${summary.activeClaims.length ? summary.activeClaims.map((claim) => `${claim.lesson} (${claim.ai}, ${claim.startedAt})`).join(", ") : "none"}`);
  console.log(`Next startable: ${summary.activeClaims.length ? "blocked until active Lesson finishes" : summary.nextLesson ? `${summary.nextLesson.id} - ${summary.nextLesson.title}` : "none"}`);
  console.log("");
  console.log("| Chapter | Status | Done/Total | Next |");
  console.log("|---|---|---|---|");
  for (const row of summary.chapters) {
    console.log(`| ${row.chapter} | ${row.status} | ${row.done}/${row.total} | ${row.next || "-"} |`);
  }
}

function printQueue(state, json) {
  const activeClaims = getActiveClaims(state.progress);
  const active = new Set(activeClaims.map((claim) => claim.lesson));
  const completed = getCompletedLessons(state.progress);
  const rows = state.lessons.map((lesson) => ({
    id: lesson.id,
    chapter: lesson.chapter,
    lessonNumber: lesson.lessonNumber,
    title: lesson.title,
    status: completed.has(lesson.id) ? "done" : active.has(lesson.id) ? "active" : "todo"
  }));

  if (json) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  console.log("| Status | Lesson | Title |");
  console.log("|---|---|---|");
  for (const row of rows) {
    console.log(`| ${row.status} | ${row.id} | ${row.title} |`);
  }
}

function getCurrentBranch() {
  try {
    return execSync("git branch --show-current", { cwd: repoRoot, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim() || "(unknown)";
  } catch {
    return "(unknown)";
  }
}

function uniquePlanDir(kstParts, lessonId) {
  const monthDir = `${kstParts.year}${kstParts.month}`;
  const baseName = `${kstParts.month}${kstParts.day}_${kstParts.hour}${kstParts.minute}_${lessonId.toLowerCase()}`;
  let name = baseName;
  let suffix = 2;
  while (fs.existsSync(path.join(plansRoot, monthDir, name))) {
    name = `${baseName}_${suffix}`;
    suffix += 1;
  }
  return {
    relativeDir: `${monthDir}/${name}`,
    absoluteDir: path.join(plansRoot, monthDir, name)
  };
}

function makePlanFiles({ lesson, stamp, branch }) {
  const notebookPrompt = `nlm notebook query ad0e9cde-4dca-451e-b455-de200a9ed7b7 "${lesson.id} ${lesson.title}를 Track 1 리빌딩 DoD 기준으로 보강하려고 합니다. 누락 개념, 초보자 오해 포인트, 실습 시뮬레이션 아이디어, T-code/화면 흐름, SAP 공식 문서로 재검증할 키워드를 알려주세요."`;

  return {
    plan: `---
status: active
goal: ${lesson.id} ${lesson.title} 리셋 이후 DoD 기준 v3 리빌딩
scope: docs/abap/lesson-content/${lesson.id}.html + reference/abap_glossary.json + 필요 시 공통 자산
branch: ${branch}
---

# PLAN — ${lesson.id}

> 📅 **최종수정: ${stamp}**

## 배경
Track 1 전체 자동화 큐에서 현재 작업 단위는 ${lesson.id}다. 기존 산출물은 참고만 하고, 현재 DoD 기준으로 NotebookLM 보강·v3 실습·T-code 연결·검증까지 다시 확인한다.

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
`,
    tasks: `# TASKS — ${lesson.id}

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
`,
    results: `# RESULTS — ${lesson.id}

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
`
  };
}

function startLesson(state, args, stamp, dryRun) {
  const activeClaims = getActiveClaims(state.progress);
  if (activeClaims.length > 0) {
    throw new Error(`Active claim already exists: ${activeClaims.map((claim) => claim.lesson).join(", ")}. Finish or release it first.`);
  }

  const completed = getCompletedLessons(state.progress);
  const lessonId = (args.lesson || getNextLesson(state.lessons, completed, activeClaims)?.id || "").toUpperCase();
  const lesson = state.lessonById.get(lessonId);
  if (!lesson) throw new Error(`Lesson not found in Track 1 curriculum: ${lessonId}`);
  if (completed.has(lessonId)) throw new Error(`${lessonId} is already completed.`);

  const kstParts = formatKstParts();
  const planDir = uniquePlanDir(kstParts, lessonId);
  const branch = getCurrentBranch();
  const claimRow = `| ${lessonId} | ${args.ai} | ${stamp} | Track 1 pipeline 자동화 claim + plan 생성 |`;
  const tableHeader = "| Lesson | AI | 시작(KST) | 메모 |\n|---|---|---|---|";
  const nextProgress = stampMarkdown(state.progress, stamp, "02_PROGRESS.md").replace(tableHeader, `${tableHeader}\n${claimRow}`);
  const indexHeader = "| status | 경로 | 목표 |\n|---|---|---|";
  const indexRow = `| active | [${planDir.relativeDir}/](${planDir.relativeDir}/) | ${lesson.id} ${lesson.title} DoD 기준 v3 리빌딩 착수 |`;
  const nextPlansIndex = stampMarkdown(state.plansIndex, stamp, "plans/INDEX.md").replace(indexHeader, `${indexHeader}\n${indexRow}`);
  const files = makePlanFiles({ lesson, stamp, branch });

  if (!dryRun) {
    fs.mkdirSync(path.join(planDir.absoluteDir, "assets"), { recursive: true });
    fs.writeFileSync(path.join(planDir.absoluteDir, "PLAN.md"), files.plan, "utf8");
    fs.writeFileSync(path.join(planDir.absoluteDir, "TASKS.md"), files.tasks, "utf8");
    fs.writeFileSync(path.join(planDir.absoluteDir, "RESULTS.md"), files.results, "utf8");
  }

  return {
    progress: nextProgress,
    plansIndex: nextPlansIndex,
    started: {
      lesson: lesson.id,
      title: lesson.title,
      planDir: `.project-docs/plans/${planDir.relativeDir}/`
    }
  };
}

function findActivePlanDir(plansIndex, lessonId) {
  const rows = [...plansIndex.matchAll(/^\|\s*active\s*\|\s*\[([^\]]+)\/\]\(([^)]+)\/\)\s*\|\s*([^|]+)\|$/gm)];
  const row = rows.find((match) => match[3].includes(lessonId));
  return row ? row[1] : "";
}

function markPlanDone(planDir, stamp, dryRun) {
  if (!planDir) return;
  const absDir = path.join(plansRoot, planDir);
  const planPath = path.join(absDir, "PLAN.md");
  const tasksPath = path.join(absDir, "TASKS.md");

  if (fs.existsSync(planPath)) {
    const plan = readRequired(planPath)
      .replace(/^status:\s*active/m, "status: done");
    writeFile(planPath, stampMarkdown(plan, stamp, `${planDir}/PLAN.md`), dryRun);
  }

  if (fs.existsSync(tasksPath)) {
    const tasks = stampMarkdown(readRequired(tasksPath), stamp, `${planDir}/TASKS.md`)
      .replace("- [ ] 02_PROGRESS 완료 이동 + 챕터 표 갱신", "- [x] 02_PROGRESS 완료 이동 + 챕터 표 갱신");
    writeFile(tasksPath, tasks, dryRun);
  }
}

function updateChapterRow(progress, lessons, completed, activeClaims, lessonId) {
  const lesson = lessons.find((item) => item.id === lessonId);
  const chapterLessons = lessons.filter((item) => item.chapter === lesson.chapter);
  const doneCount = chapterLessons.filter((item) => completed.has(item.id)).length;
  const nextLesson = chapterLessons.find((item) => !completed.has(item.id));
  const chapterActive = activeClaims.some((claim) => chapterLessons.some((item) => item.id === claim.lesson));
  const status = doneCount === chapterLessons.length ? "✅" : chapterActive || doneCount > 0 ? "🔄" : "⬜";
  const memo = doneCount === chapterLessons.length
    ? `${lessonId} 완료. Chapter ${lesson.chapter} 완료`
    : `${lessonId} 완료. 다음: ${nextLesson.id}`;
  const rowPattern = new RegExp(`^\\| ${lesson.chapter} \\| [^|]+ \\| [^|]+ \\| [^|]* \\|$`, "m");
  const row = `| ${lesson.chapter} | ${status} | ${doneCount} / ${chapterLessons.length} | ${memo} |`;
  if (!rowPattern.test(progress)) throw new Error(`Chapter row not found: ${lesson.chapter}`);
  return progress.replace(rowPattern, row);
}

function finishLesson(state, args, stamp) {
  if (!args.confirm) throw new Error("finish requires --confirm after DoD and validation are complete.");
  const lessonId = args.lesson.toUpperCase();
  const lesson = state.lessonById.get(lessonId);
  if (!lesson) throw new Error(`Lesson not found in Track 1 curriculum: ${lessonId}`);

  const activeClaims = getActiveClaims(state.progress);
  const claim = activeClaims.find((item) => item.lesson === lessonId);
  if (!claim) throw new Error(`${lessonId} is not in Active Claims.`);

  const completedBefore = getCompletedLessons(state.progress);
  if (completedBefore.has(lessonId)) throw new Error(`${lessonId} is already completed.`);

  const activeRow = new RegExp(`^\\| ${lessonId} \\| [^|]+ \\| [^|]+ \\| [^|]* \\|\\r?\\n?`, "m");
  let nextProgress = stampMarkdown(state.progress, stamp, "02_PROGRESS.md").replace(activeRow, "");
  const note = args.note || "DoD 완료";
  const doneHeader = "| Lesson | AI | 완료(KST) | 비고 |\n|---|---|---|---|";
  const doneRow = `| ${lessonId} | ${claim.ai} | ${stamp} | ${note} |`;
  nextProgress = nextProgress.replace(doneHeader, `${doneHeader}\n${doneRow}`);

  const completedAfter = new Set(completedBefore);
  completedAfter.add(lessonId);
  const activeAfter = activeClaims.filter((item) => item.lesson !== lessonId);
  nextProgress = updateChapterRow(nextProgress, state.lessons, completedAfter, activeAfter, lessonId);

  const activePlanDir = findActivePlanDir(state.plansIndex, lessonId);
  const planRowPattern = new RegExp(`^\\| active \\| \\[${escapeRegExp(activePlanDir)}\\/\\]\\(${escapeRegExp(activePlanDir)}\\/\\) \\| ([^|]+)\\|$`, "m");
  let nextPlansIndex = stampMarkdown(state.plansIndex, stamp, "plans/INDEX.md");
  if (activePlanDir && planRowPattern.test(nextPlansIndex)) {
    nextPlansIndex = nextPlansIndex.replace(planRowPattern, `| done | [${activePlanDir}/](${activePlanDir}/) | $1|`);
  }

  return {
    progress: nextProgress,
    plansIndex: nextPlansIndex,
    finished: {
      lesson: lessonId,
      title: lesson.title,
      planDir: activePlanDir ? `.project-docs/plans/${activePlanDir}/` : ""
    }
  };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const state = loadState();
  const stamp = formatKst();

  if (args.command === "status") {
    printStatus(state, args.json);
    return;
  }

  if (args.command === "queue") {
    printQueue(state, args.json);
    return;
  }

  if (args.command === "start") {
    const result = startLesson(state, args, stamp, args.dryRun);
    writeFile(progressPath, result.progress, args.dryRun);
    writeFile(plansIndexPath, result.plansIndex, args.dryRun);
    console.log(`${args.dryRun ? "Would start" : "Started"} ${result.started.lesson} - ${result.started.title}`);
    console.log(`Plan: ${result.started.planDir}`);
    return;
  }

  if (args.command === "finish") {
    const result = finishLesson(state, args, stamp);
    markPlanDone(result.finished.planDir.replace(".project-docs/plans/", "").replace(/\/$/, ""), stamp, args.dryRun);

    let progress = result.progress;
    let plansIndex = result.plansIndex;
    let started = null;

    if (args.startNext) {
      const nextState = {
        ...state,
        progress,
        plansIndex
      };
      const startResult = startLesson(nextState, { ...args, lesson: "" }, stamp, args.dryRun);
      progress = startResult.progress;
      plansIndex = startResult.plansIndex;
      started = startResult.started;
    }

    writeFile(progressPath, progress, args.dryRun);
    writeFile(plansIndexPath, plansIndex, args.dryRun);
    console.log(`${args.dryRun ? "Would finish" : "Finished"} ${result.finished.lesson} - ${result.finished.title}`);
    if (started) {
      console.log(`${args.dryRun ? "Would start" : "Started"} ${started.lesson} - ${started.title}`);
      console.log(`Plan: ${started.planDir}`);
    }
    return;
  }

  throw new Error(`Unknown command: ${args.command}`);
}

try {
  main();
} catch (error) {
  console.error(process.env.TRACK1_DEBUG ? error.stack : `Error: ${error.message}`);
  process.exit(1);
}
