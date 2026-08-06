import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { PageRenderer } from "@/components/renderer/ComponentRenderer";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

async function getPublished(slug: string) {
  const [row] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.isPublished, true)))
    .limit(1);
  return row || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublished(slug);
  if (!project) return { title: "Page not found" };
  return {
    title: project.name,
    description: project.description || `Published with CraftSite`,
  };
}

export default async function PublicPage({ params }: Props) {
  const { slug } = await params;
  const project = await getPublished(slug);
  if (!project) notFound();

  return (
    <PageRenderer components={project.components || []} theme={project.theme} />
  );
}
