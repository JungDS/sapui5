#!/usr/bin/env node
// NotebookLM curriculum source builder | 최종수정 2026-06-17 04:13 KST | v1.0
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const SRC = path.join(repoRoot, "reference", "abap_curriculum_v5_4_20260605_000000.json");
const OUT_DIR = path.join(repoRoot, "reference", "notebooklm");
const OUT = path.join(OUT_DIR, "abap_curriculum_v5_4_notebooklm_full_source.txt");

function ko(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && !Array.isArray(value)) return value.ko || value.en || JSON.stringify(value);
  return String(value);
}

function en(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && !Array.isArray(value)) return value.en || value.ko || JSON.stringify(value);
  return String(value);
}

function list(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (Array.isArray(value.ko)) return value.ko;
  if (Array.isArray(value.en)) return value.en;
  return [value];
}

function scalar(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(scalar).filter(Boolean).join(" | ");
  if (typeof value === "object" && ("ko" in value || "en" in value)) {
    const k = ko(value);
    const e = en(value);
    return k && e && k !== e ? `${k} / ${e}` : k || e;
  }
  return JSON.stringify(value, null, 2);
}

function block(label, value, lines) {
  lines.push(`<${label}>`);
  if (Array.isArray(value)) {
    value.forEach((item, index) => lines.push(`- ${index + 1}. ${scalar(item)}`));
  } else if (value && typeof value === "object" && !("ko" in value || "en" in value)) {
    for (const [key, item] of Object.entries(value)) {
      lines.push(`${key}: ${scalar(item)}`);
    }
  } else {
    lines.push(scalar(value));
  }
  lines.push(`</${label}>`);
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
            track,
            section,
            sub1,
            lesson,
            trackChapterNumber,
            globalChapterNumber,
            lessonNumber
          });
        }
      }
    }
  }

  return lessons;
}

function addLessonRecord(entry, allLessons, lines) {
  const { track, section, sub1, lesson, trackChapterNumber, globalChapterNumber, lessonNumber } = entry;
  const idx = allLessons.indexOf(entry);
  const previous = allLessons.slice(0, idx).map((x) => x.lesson.sub_2_id);
  const future = allLessons.slice(idx + 1).map((x) => x.lesson.sub_2_id);
  const sameChapter = allLessons
    .filter((x) => x.section.section_id === section.section_id)
    .map((x) => x.lesson.sub_2_id);

  lines.push("");
  lines.push("--------------------------------------------------------------------------------");
  lines.push(`<LESSON_RECORD id="${lesson.sub_2_id}">`);
  lines.push(`EXACT_TARGET_ID: ${lesson.sub_2_id}`);
  lines.push(`VALID_TARGET_ID: ${lesson.sub_2_id}`);
  lines.push(`TITLE_KO: ${ko(lesson.sub_2_name)}`);
  lines.push(`TITLE_EN: ${en(lesson.sub_2_name)}`);
  lines.push(`TRACK_ID: ${track.track_id}`);
  lines.push(`TRACK_NAME: ${scalar(track.track_name)}`);
  lines.push(`CHAPTER_ID: ${section.section_id}`);
  lines.push(`CHAPTER_TITLE: ${scalar(section.section_name)}`);
  lines.push(`TRACK_CHAPTER_NUMBER: ${trackChapterNumber}`);
  lines.push(`GLOBAL_CHAPTER_NUMBER: ${globalChapterNumber}`);
  lines.push(`SUB_LEVEL_1_ID: ${sub1.sub_1_id}`);
  lines.push(`SUB_LEVEL_1_TITLE: ${scalar(sub1.sub_1_name)}`);
  lines.push(`LESSON_NUMBER_IN_CHAPTER: ${lessonNumber}`);
  lines.push(`PREVIOUS_LESSON_ID: ${idx > 0 ? allLessons[idx - 1].lesson.sub_2_id : "NONE"}`);
  lines.push(`NEXT_LESSON_ID: ${idx + 1 < allLessons.length ? allLessons[idx + 1].lesson.sub_2_id : "NONE"}`);
  lines.push(`CHAPTER_LESSON_IDS_EXHAUSTIVE: ${sameChapter.join(", ")}`);
  lines.push(`ASSUMED_PRIOR_LESSON_IDS_EXHAUSTIVE: ${previous.length ? previous.join(", ") : "NONE"}`);
  lines.push(`FORWARD_CONTAINMENT_PROHIBITED_FUTURE_LESSON_IDS_EXHAUSTIVE: ${future.length ? future.join(", ") : "NONE"}`);

  block("HANDLED_CONTENTS_KO", ko(lesson.handled_contents), lines);
  block("HANDLED_CONTENTS_EN", en(lesson.handled_contents), lines);
  block("LEARNING_OBJECTIVES_KO", ko(lesson.learning_objectives), lines);
  block("LEARNING_OBJECTIVES_EN", en(lesson.learning_objectives), lines);
  block("TECHNICAL_KEYWORDS", lesson.technical_keywords || [], lines);
  block("MODULE_METADATA", lesson.module_metadata || {}, lines);
  block("LEARNING_CONTENT_DESIGN_KO", list(lesson.learning_content_design?.ko), lines);
  block("LEARNING_CONTENT_DESIGN_EN", list(lesson.learning_content_design?.en), lines);
  block("PRACTICAL_SCENARIO_KO", ko(lesson.practical_scenario), lines);
  block("PRACTICAL_SCENARIO_EN", en(lesson.practical_scenario), lines);
  block("HANDS_ON_LAB_KO", ko(lesson.hands_on_lab), lines);
  block("HANDS_ON_LAB_EN", en(lesson.hands_on_lab), lines);
  block("CAUTION_POINTS_KO", list(lesson.caution_points?.ko), lines);
  block("CAUTION_POINTS_EN", list(lesson.caution_points?.en), lines);
  block("ASSESSMENT_DESIGN", lesson.assessment_design || {}, lines);
  block("LEARNING_FRIENDLY_HANDLED_CONTENTS_KO", ko(lesson.learning_friendly?.handled_contents), lines);
  block("LEARNING_FRIENDLY_BRIDGE_FROM_PREVIOUS_KO", ko(lesson.learning_friendly?.bridge_from_previous), lines);

  lines.push(`<RAW_LESSON_JSON_FOR_LOSSLESS_REFERENCE>`);
  lines.push(JSON.stringify(lesson, null, 2));
  lines.push(`</RAW_LESSON_JSON_FOR_LOSSLESS_REFERENCE>`);
  lines.push(`</LESSON_RECORD>`);
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`Source JSON not found: ${SRC}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(SRC, "utf8"));
  const lessons = collectLessons(data);
  const trackCount = data.tracks?.length || 0;
  const sectionCount = data.tracks?.reduce((sum, track) => sum + (track.sections?.length || 0), 0) || 0;

  const lines = [];
  lines.push("ABAP Curriculum v5.4 Full Lesson Source for NotebookLM");
  lines.push("Last updated: 2026-06-17 02:31 KST");
  lines.push("File type: TXT source for NotebookLM upload");
  lines.push("Purpose: exhaustive machine-readable source for backend educational payload generation.");
  lines.push("");
  lines.push("<SOURCE_CONTRACT>");
  lines.push("This TXT file is the authoritative NotebookLM source for ABAP Curriculum v5.4.");
  lines.push("Every valid Lesson ID is represented by one explicit <LESSON_RECORD id=\"...\"> block.");
  lines.push("If a user asks for a Lesson ID that appears as EXACT_TARGET_ID or VALID_TARGET_ID, that Lesson exists.");
  lines.push("Do not infer Lesson existence from ellipses; this source contains no abbreviated lesson lists.");
  lines.push("For timeline control, use ASSUMED_PRIOR_LESSON_IDS_EXHAUSTIVE and FORWARD_CONTAINMENT_PROHIBITED_FUTURE_LESSON_IDS_EXHAUSTIVE.");
  lines.push("Prefer the target Lesson's own HANDLED_CONTENTS, LEARNING_OBJECTIVES, LEARNING_CONTENT_DESIGN, HANDS_ON_LAB, CAUTION_POINTS, ASSESSMENT_DESIGN, and LEARNING_FRIENDLY fields.");
  lines.push("</SOURCE_CONTRACT>");
  lines.push("");
  lines.push("<CURRICULUM_METADATA>");
  lines.push(`CURRICULUM_NAME: ${data.curriculum_name}`);
  lines.push(`CURRICULUM_VERSION: ${data.curriculum_version}`);
  lines.push(`GENERATED_AT: ${data.generated_at}`);
  lines.push(`TRACK_COUNT: ${trackCount}`);
  lines.push(`SECTION_COUNT: ${sectionCount}`);
  lines.push(`LESSON_COUNT: ${lessons.length}`);
  lines.push(`DESCRIPTION_KO: ${ko(data.description)}`);
  lines.push(`DESCRIPTION_EN: ${en(data.description)}`);
  lines.push("</CURRICULUM_METADATA>");
  lines.push("");
  lines.push("<VALID_TARGET_ID_INDEX_EXHAUSTIVE>");
  lessons.forEach((entry) => {
    lines.push(`${entry.lesson.sub_2_id} | ${entry.track.track_id} | ${entry.section.section_id} | Chapter ${entry.trackChapterNumber} | Lesson ${entry.lessonNumber} | ${ko(entry.lesson.sub_2_name)}`);
  });
  lines.push("</VALID_TARGET_ID_INDEX_EXHAUSTIVE>");
  lines.push("");
  lines.push("<CURRICULUM_TIMELINE_FULL>");
  lessons.forEach((entry, index) => {
    lines.push(`${String(index + 1).padStart(3, "0")} | ${entry.lesson.sub_2_id} | ${ko(entry.lesson.sub_2_name)}`);
  });
  lines.push("</CURRICULUM_TIMELINE_FULL>");

  for (const entry of lessons) {
    addLessonRecord(entry, lessons, lines);
  }

  lines.push("");
  lines.push("<VALIDATION_SUMMARY>");
  block("REFERENCE_CATALOG", data.reference_catalog || {}, lines);
  block("VALIDATION_SUMMARY_RAW", data.validation_summary || {}, lines);
  block("SOURCE_FILES", data.source_files || [], lines);
  block("LEARNING_FRIENDLY_POLICY", data.learning_friendly_policy || {}, lines);
  lines.push("</VALIDATION_SUMMARY>");

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT, lines.join("\n"), "utf8");

  console.log(`Generated ${OUT}`);
  console.log(`Tracks: ${trackCount}`);
  console.log(`Sections: ${sectionCount}`);
  console.log(`Lessons: ${lessons.length}`);
  console.log(`Bytes: ${fs.statSync(OUT).size}`);
}

main();
