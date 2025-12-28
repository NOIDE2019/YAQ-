import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.API_PORT || 4000;

function loadSet(setName = "tigre_beta_20") {
  const p = path.join(__dirname, "../../../data/cards", `${setName}.json`);
  const raw = fs.readFileSync(p, "utf-8");
  return JSON.parse(raw);
}

app.get("/health", (_req, res) => res.json({ ok: true, service: "yaq-api", ts: Date.now() }));

app.get("/api/sets/:setName", (req, res) => {
  try {
    const set = loadSet(req.params.setName);
    res.json(set);
  } catch {
    res.status(404).json({ error: "set_not_found" });
  }
});

app.get("/api/draw", (req, res) => {
  const { set = "tigre_beta_20", theme, subcategory, tier, seed = "0" } = req.query;
  if (!theme || !subcategory || !tier) return res.status(400).json({ error: "missing_params" });

  const data = loadSet(set);
  const pool = data.cards.filter(c => c.theme === theme && c.subcategory === subcategory && c.priceTier === tier);
  const fallbackPool = pool.length >= 3 ? pool : data.cards.filter(c => c.theme === theme && c.subcategory === subcategory);

  const s = Number(seed) || 0;
  const rng = mulberry32(hashStr(`${theme}|${subcategory}|${tier}|${s}`));
  const shuffled = [...fallbackPool].sort(() => rng() - 0.5);
  res.json({ pick: shuffled.slice(0, 3), poolSize: fallbackPool.length });
});

app.post("/api/events", (req, res) => {
  const evt = { ...req.body, ts: Date.now() };
  const eventsPath = path.join(__dirname, "../events.jsonl");
  fs.appendFileSync(eventsPath, JSON.stringify(evt) + "\n");
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`yaq-api listening on :${PORT}`));

function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function mulberry32(a) {
  return function () {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
