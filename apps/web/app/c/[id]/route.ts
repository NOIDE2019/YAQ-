import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

type Card = {
  id: string;
  closeType: "redirect" | "whatsapp";
  closeUrl: string;
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  // apps/web  ->  ../../data/cards/tigre_beta_20.json
  const filePath = path.join(process.cwd(), "..", "..", "data", "cards", "tigre_beta_20.json");
;
;
  ;

  const raw = await fs.readFile(filePath, "utf-8");
  const json = JSON.parse(raw) as { cards: Card[] };

  const card = json.cards.find((c) => c.id === id);

  if (!card?.closeUrl) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

return new NextResponse(null, {
  status: 302,
  headers: {
    Location: card.closeUrl,
    "Cache-Control": "no-store",
  },
});
;
;
}
