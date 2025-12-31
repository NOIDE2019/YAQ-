"use client";

import { useState } from "react";

type Card = {
  id: string;
  title: string;
  subtitle: string;
  price: "$" | "$$" | "$$$";
  moods: string[];
  goals: string[];
};


const ALL_CARDS: Card[] = [
  {
    id: "1",
    title: "Noche de Pizzas",
    subtitle: "Delivery + cerveza artesanal",
    price: "$$",
    moods: ["feliz", "indeciso"],
    goals: ["comer"],
  },
  {
    id: "2",
    title: "Masaje Relax",
    subtitle: "Desconectá hoy",
    price: "$$$",
    moods: ["relajado"],
    goals: ["escapada"],
  },
  {
    id: "3",
    title: "Regalo Sorpresa",
    subtitle: "Libro + chocolate",
    price: "$",
    moods: ["feliz", "random"],
    goals: ["regalar"],
  },
  {
    id: "4",
    title: "Escapada Relax",
    subtitle: "Cabaña en el bosque",
    price: "$$$",
    moods: ["relajado"],
    goals: ["escapada"],
  },
  {
    id: "5",
    title: "Hamburguesa Clásica",
    subtitle: "Rápido y rendidor",
    price: "$",
    moods: ["indeciso"],
    goals: ["comer"],
  },
];

function pickThreeSmart(
  cards: Card[],
  mood: string | null,
  goal: string | null,
  budget: string | null
) {
  const scored = cards.map((card) => {
    let score = 0;

    if (mood && card.moods.includes(mood)) score += 2;
    if (goal && card.goals.includes(goal)) score += 2;
    if (budget && card.price === budget) score += 1;

    return { card, score };
  });

  const weighted = scored
    .sort((a, b) => b.score - a.score)
    .map((item) => item.card);

  return weighted.slice(0, 3);
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
const [mood, setMood] = useState<string | null>(null);
const [goal, setGoal] = useState<string | null>(null);
const [budget, setBudget] = useState<string | null>(null);
const [selectedCard, setSelectedCard] = useState<Card | null>(null);

function handleClick() {
 setSelectedCard(null);
 setLoading(true);

  setTimeout(() => {
    const picked = pickThreeSmart(
      ALL_CARDS,
      mood,
      goal,
      budget
    );

    setCards(picked);
    setLoading(false);
  }, 1000);
}

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 40,
        fontFamily: "sans-serif",
        background: "#0f172a",
        color: "white",
      }}
    >
      <h2 style={{ marginBottom: 10 }}>¿Cómo te sentís hoy?</h2>
<h2 style={{ marginBottom: 10 }}>¿Qué estás buscando?</h2>
<h2 style={{ marginBottom: 10 }}>¿Cuál es tu presupuesto?</h2>

<div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 30 }}>
  {[
    { id: "low", label: "$ Low" },
    { id: "medium", label: "$$ Medio" },
    { id: "high", label: "$$$ Alto" },
  ].map((o) => (
    <button
      key={o.id}
      onClick={() => setBudget(o.id)}
      style={{
        padding: "10px 20px",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        fontSize: 16,
        background: budget === o.id ? "#f59e0b" : "#1f2937",
        color: budget === o.id ? "#111827" : "white",
        fontWeight: budget === o.id ? "bold" : "normal",
      }}
    >
      {o.label}
    </button>
  ))}
</div>

<div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
  {[
    { id: "regalar", label: "🎁 Regalar" },
    { id: "comer", label: "🍔 Para comer" },
    { id: "escapada", label: "🌄 Escapada" },
    { id: "salir", label: "🍹 Salir" },
  ].map((o) => (
    <button
      key={o.id}
      onClick={() => setGoal(o.id)}
      style={{
        padding: "10px 16px",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        background: goal === o.id ? "#f59e0b" : "#1f2937",
        color: goal === o.id ? "#111827" : "white",
        fontWeight: goal === o.id ? "bold" : "normal",
      }}
    >
      {o.label}
    </button>
  ))}
</div>

<div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
  {[
    { id: "feliz", label: "🙂 Feliz" },
    { id: "relajado", label: "😌 Relajado" },
    { id: "indeciso", label: "🤔 Indeciso" },
    { id: "random", label: "🎲 Sorprendeme" },
  ].map((o) => (
    <button
      key={o.id}
      onClick={() => setMood(o.id)}
      style={{
        padding: "10px 16px",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        background: mood === o.id ? "#f59e0b" : "#1f2937",
        color: mood === o.id ? "#111827" : "white",
        fontWeight: mood === o.id ? "bold" : "normal",
      }}
    >
      {o.label}
    </button>
  ))}
</div>

      <h1 style={{ fontSize: 32 }}>YA HORA QUÉ</h1>
      <p style={{ marginBottom: 30 }}>Decisiones resueltas en 30 segundos</p>

      <div
        style={{
          background: "#111827",
          padding: 30,
          borderRadius: 16,
          marginBottom: 40,
          maxWidth: 900,
        }}
      >
        <h2>¿Cómo te sentís hoy?</h2>
        <p style={{ opacity: 0.7 }}>Esto es solo visual por ahora</p>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <button
            onClick={handleClick}
            style={{
              padding: "16px 32px",
              fontSize: 18,
              background: "#f59e0b",
              color: "#111827",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            MOSTRAME OPCIONES
          </button>
        </div>
      </div>
{selectedCard && (
  <div style={{ marginTop: 30, textAlign: "center" }}>
    <h2>Elegiste:</h2>
    <p style={{ fontSize: 20, fontWeight: "bold" }}>
      {selectedCard.title}
    </p>
  </div>
)}


      {loading && <p>Barajando opciones…</p>}

      {!loading && cards.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}

              style={{
  background: "linear-gradient(180deg, #fbbf24, #f59e0b)",
  borderRadius: 16,
  padding: 24,
  color: "#111827",
  cursor: "pointer",
  opacity:
    selectedCard && selectedCard.id !== card.id ? 0.4 : 1,
  boxShadow:
    selectedCard?.id === card.id
      ? "0 0 0 4px #111827"
      : "none",
}}

            >
              <h3>{card.title}</h3>
              <p>{card.subtitle}</p>
              <strong>{card.price}</strong>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
