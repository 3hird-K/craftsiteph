import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  try {
    const { slug } = await ctx.params;
    const [row] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.slug, slug), eq(projects.isPublished, true)))
      .limit(1);

    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(row);
  } catch (error) {
    console.error("GET /api/projects/by-slug/[slug]", error);
    return NextResponse.json({ error: "Failed to load project" }, { status: 500 });
  }
}
