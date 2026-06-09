import { readFileSync } from "node:fs";
const d = JSON.parse(readFileSync("reference/abap_curriculum_v5_4_20260605_000000.json","utf8"));
const sec = d.tracks[0].sections.find(s=>s.section_id===process.argv[2]);
console.log(sec.section_id,"|",sec.section_name);
sec.sub_levels_1.forEach(g=>g.sub_levels_2.forEach(u=>{
  console.log(u.sub_2_id,"|",u.sub_2_name,"|| kw:",(u.technical_keywords||[]).join(", "));
}));
