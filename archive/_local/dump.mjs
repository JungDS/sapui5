import { readFileSync } from "node:fs";
const d = JSON.parse(readFileSync("reference/abap_curriculum_v5_4_20260605_000000.json","utf8"));
const sec = d.tracks[0].sections.find(s => s.section_id === process.argv[2]);
sec.sub_levels_1.forEach(g => g.sub_levels_2.forEach(u => {
  console.log("\n######", u.sub_2_id, "|", u.sub_2_name);
  console.log("[handled]", u.handled_contents.ko);
  console.log("[keywords]", (u.technical_keywords||[]).join(", "));
  (u.learning_content_design.ko||[]).forEach(x => console.log("  -", x));
  console.log("[lab]", u.hands_on_lab.ko);
  (u.caution_points.ko||[]).forEach(x => console.log("  ! ", x));
}));
