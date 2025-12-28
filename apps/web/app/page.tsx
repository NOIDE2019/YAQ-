"use client";

import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

const THEMES = [
  { key: "gastronomia", label: "Gastronomía" },
  { key: "escapadas", label: "Escapadas cerca" },
  { key: "objetos", label: "Objetos (bolucompras)" }
] as const;

const SUBCATS: Record<string, string[]> = {
  gastronomia: ["Delivery resuelto", "Salida simple", "Plan especial", "Plan en casa (picada/armado)"],
  escapadas: ["Spa & relax", "Naturaleza", "Urbana (hotel + paseo)", "Actividad suave (aventura light)"],
  objetos: ["Bolucompra dopamina", "Regalo resuelto", "Upgrade cotidiano", "Hobby & auto-regalo"]
};

const TIERS = ["$", "$$", "$$$"] as const;

type Card = {
  id: string;
  name: string;
  priceTier: "$" | "$$" | "$$$";
  includes: string[];
  why: string;
  closeUrl: string;
  planB: string;
};

export default function Page() {
  const [theme, setTheme] = useState<(typeof THEMES)[number]["key"]>("gastronomia");
  const [subcategory, setSubcategory] = useState<string>(SUBCATS["gastronomia"][0]);
  const [tier, setTier] = useState<(typeof TIERS)[number]>("$$");
  const [seed, setSeed] = useState<number>(1);
  const [draws, setDraws] = useState<number>(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);

  const canReroll = draws < 1;

  async function draw(nextSeed: number) {
    setLoading(true);
    try {
      const url = `${API_BASE}/api/draw?set=tigre_beta_20&theme=${encodeURIComponent(theme)}&subcategory=${encodeURIComponent(subcategory)}&tier=${encodeURIComponent(tier)}&seed=${nextSeed}`;
      const res = await fetch(url);
      const json = await res.json();
      setCards(json.pick || []);
      fetch(`${API_BASE}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "draw", city: "Tigre", theme, subcategory, tier, seed: nextSeed })
      }).catch(() => {});
    } finally {
      setLoading(false);
    }
  }

  function start() { setDraws(0); draw(seed); }
  function reroll() {
    if (!canReroll) return;
    const next = seed + 1;
    setSeed(next);
    setDraws(d => d + 1);
    draw(next);
  }

  function choose(card: Card) {
    fetch(`${API_BASE}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "choose", cardId: card.id, city: "Tigre", theme, subcategory, tier })
    }).catch(() => {});
    window.open(card.closeUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="grid" style={{ gap: 18 }}>
      <header className="grid" style={{ gap: 6 }}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ margin: 0 }}>YAQ — Tigre Beta</h1>
          <span className="badge">3 cartas • 30–60s</span>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          Elegí tema, subcategoría y rango. Te damos 3 opciones. Una sola re-tirada.
        </p>
      </header>

      <section className="card grid" style={{ gap: 12 }}>
        <div className="row">
          <div style={{ minWidth: 220 }}>
            <label>Tema</label>
            <select value={theme} onChange={(e) => {
              const t = e.target.value as any;
              setTheme(t);
              setSubcategory(SUBCATS[t][0]);
            }}>
              {THEMES.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
            </select>
          </div>

          <div style={{ minWidth: 260 }}>
            <label>Subcategoría</label>
            <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
              {SUBCATS[theme].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div style={{ minWidth: 160 }}>
            <label>Rango</label>
            <select value={tier} onChange={(e) => setTier(e.target.value as any)}>
              {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="row">
          <button className="btn btnPrimary" onClick={start} disabled={loading}>
            {loading ? "Cargando..." : "Tirar 3 cartas"}
          </button>
          <button className="btn" onClick={reroll} disabled={!cards.length || loading || !canReroll}>
            Re-tirar (1)
          </button>
        </div>
      </section>

      {cards.length > 0 && (
        <section className="grid grid3">
          {cards.map((c) => (
            <div key={c.id} className="card grid" style={{ gap: 10 }}>
              <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                <span className="badge">{c.priceTier}</span>
                <span className="muted" style={{ fontSize: 12 }}>{c.id}</span>
              </div>
              <h3 style={{ margin: "2px 0 0 0" }}>{c.name}</h3>
              <div className="muted" style={{ fontSize: 13 }}>{c.why}</div>
              <div style={{ fontSize: 13 }}>
                <b>Incluye:</b>
                <ul style={{ margin: "8px 0 0 18px", padding: 0 }}>
                  {c.includes.map((it, i) => <li key={i} className="muted">{it}</li>)}
                </ul>
              </div>
              <div className="row" style={{ marginTop: 6 }}>
                <button className="btn btnPrimary" onClick={() => choose(c)}>
                  Elegir y cerrar
                </button>
              </div>
              <div className="muted" style={{ fontSize: 12 }}>Plan B: {c.planB}</div>
            </div>
          ))}
        </section>
      )}

      <footer className="muted" style={{ marginTop: 10, fontSize: 12 }}>
        ADN YAQ: máximo 3 cartas por tirada. Si querés “ver más”, hay que mejorar la curaduría.
      </footer>
    </main>
  );
}
