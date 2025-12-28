import fs from "fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/validate-cards.js data/cards/tigre_beta_20.json");
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(file, "utf-8"));
let ok = true;

const ids = new Set();
for (const c of data.cards) {
  if (!c.id || ids.has(c.id)) { ok = false; console.error("Bad id:", c.id); }
  ids.add(c.id);
  if (!c.planB) { ok = false; console.error("Missing planB:", c.id); }
  if (!c.includes || c.includes.length < 2) { ok = false; console.error("Includes too short:", c.id); }
  if (!c.why || c.why.length < 8) { ok = false; console.error("Why too short:", c.id); }
}
console.log(ok ? "OK ✅" : "FAILED ❌");
process.exit(ok ? 0 : 2);
