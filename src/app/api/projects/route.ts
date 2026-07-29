import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { DEFAULT_THEME } from "@/lib/types";
import { blankProjectComponents } from "@/lib/presets";

export const dynamic = "force-dynamic";

function slugify(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
  return `${base || "project"}-${Math.random().toString(36).slice(2, 7)}`;
}

export async function GET() {
  try {
    const rows = await db.select().from(projects).orderBy(desc(projects.updatedAt));
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/projects", error);
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = typeof body.name === "string" && body.name.trim() ? body.name.trim() : "Untitled project";
    const description = typeof body.description === "string" ? body.description : "";
    const components = Array.isArray(body.components) ? body.components : blankProjectComponents();
    const theme = body.theme && typeof body.theme === "object" ? { ...DEFAULT_THEME, ...body.theme } : DEFAULT_THEME;
    const slug = typeof body.slug === "string" && body.slug ? body.slug : slugify(name);

    const [row] = await db
      .insert(projects)
      .values({
        name,
        description,
        components,
        theme,
        slug,
        isPublished: Boolean(body.isPublished),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(row, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }
    await db.delete(projects).where(eq(projects.id, id));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/projects", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
