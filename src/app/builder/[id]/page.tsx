import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { BuilderEditor } from "@/components/builder/BuilderEditor";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function BuilderPage({ params }: Props) {
  const { id } = await params;
  const projectId = Number(id);
  if (!projectId) notFound();

  const [row] = await db.select().from(projects).where(eq(projects.id, projectId)).limit(1);
  if (!row) notFound();

  const project: Project = {
    id: row.id,
    name: row.name,
    description: row.description,
    components: row.components || [],
    theme: row.theme,
    isPublished: row.isPublished,
    slug: row.slug,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };

  return <BuilderEditor project={project} />;
}
