import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

function getWhereClause(id: string) {
  const numId = Number(id);
  return !isNaN(numId) ? eq(projects.id, numId) : eq(projects.slug, id);
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    if (!id) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    const [row] = await db.select().from(projects).where(getWhereClause(id)).limit(1);
    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(row);
  } catch (error) {
    console.error("GET /api/projects/[id]", error);
    return NextResponse.json({ error: "Failed to load project" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    if (!id) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = await req.json();
    const updates: Partial<typeof projects.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (typeof body.name === "string") updates.name = body.name.trim() || "Untitled project";
    if (typeof body.description === "string") updates.description = body.description;
    if (Array.isArray(body.components)) updates.components = body.components;
    if (body.theme && typeof body.theme === "object") updates.theme = body.theme;
    if (typeof body.isPublished === "boolean") updates.isPublished = body.isPublished;
    if (typeof body.slug === "string") updates.slug = body.slug;

    const [row] = await db
      .update(projects)
      .set(updates)
      .where(getWhereClause(id))
      .returning();

    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(row);
  } catch (error) {
    console.error("PUT /api/projects/[id]", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    if (!id) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    await db.delete(projects).where(getWhereClause(id));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/projects/[id]", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
