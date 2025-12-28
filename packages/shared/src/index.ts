export type PriceTier = "$" | "$$" | "$$$";
export type Theme = "gastronomia" | "escapadas" | "objetos";

export type Card = {
  id: string;
  theme: Theme;
  subcategory: string;
  name: string;
  priceTier: PriceTier;
  includes: string[];
  why: string;
  closeType: "redirect" | "whatsapp" | "checkout";
  closeUrl: string;
  planB: string;
  tags: string[];
};

export type CardSet = {
  city: string;
  currency: "ARS";
  tiers: PriceTier[];
  cards: Card[];
};
