import { readFileSync, readdirSync } from "node:fs";
const g = JSON.parse(readFileSync("reference/abap_glossary.json","utf8"));
const keys = new Set(Object.keys(g));
let miss = 0;
readdirSync("docs/abap/lesson-content").forEach(f => {
  const html = readFileSync("docs/abap/lesson-content/"+f,"utf8");
  [...html.matchAll(/data-glossary="([^"]+)"/g)].forEach(m => {
    if (!keys.has(m[1])) { console.log("MISSING:", m[1], "in", f); miss++; }
  });
});
console.log(miss === 0 ? "OK: 미정의 0" : "미정의 "+miss);
