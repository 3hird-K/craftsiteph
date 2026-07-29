import { NextResponse } from "next/server";
import { asc, count } from "drizzle-orm";
import { db } from "@/db";
import { templates } from "@/db/schema";
import { SEED_TEMPLATES } from "@/lib/presets";

export const dynamic = "force-dynamic";

async function ensureSeeded() {
  const [result] = await db.select({ value: count() }).from(templates);
  if ((result?.value ?? 0) > 0) return;

  await db.insert(templates).values(
    SEED_TEMPLATES.map((t, index) => ({
      name: t.name,
      description: t.description,
      category: t.category,
      theme: t.theme,
      components: t.build(),
      sortOrder: index,
    })),
  );
}

export async function GET() {
  try {
    await ensureSeeded();
    const rows = await db.select().from(templates).orderBy(asc(templates.sortOrder));
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/templates", error);
    return NextResponse.json({ error: "Failed to load templates" }, { status: 500 });
  }
}
