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
  if (!project) return { title: "Page Not Found | CraftSite" };

  const pageTitle = project.name || "Published Website";
  const pageDescription =
    project.description || `Explore ${pageTitle}, built with visual builder tools on CraftSite.`;

  return {
    title: `${pageTitle} — CraftSite`,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      siteName: pageTitle,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

export default async function PublicPage({ params }: Props) {
  const { slug } = await params;
  const project = await getPublished(slug);
  if (!project) notFound();

  return (
    <PageRenderer
      components={project.components || []}
      theme={project.theme}
      title={project.name}
      description={project.description}
    />
  );
}
