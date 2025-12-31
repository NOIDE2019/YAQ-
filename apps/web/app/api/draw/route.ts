import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

type PriceTier = "$" | "$$" | "$$$";

type Card = {
  id: string;
  theme: string;
  subcategory: string;
  name: string;
  priceTier: PriceTier;
  includes: string[];
  why: string;
  closeType: "redirect" | "whatsapp";
  closeUrl: string;
  planB: string;
  tags?: string[];
};

export async function GET() {
  try {
    const filePath = path.join(
  process.cwd(),
  "..",
  "..",
  "data",
  "cards",
  "tigre_beta_20.json"
);

    const json = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(json);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load cards" },
      { status: 500 }
    );
  }
}
