import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectDetails } from "@/data/projects-data";
import {
  ProjectDetailHero,
  ProjectOverview,
  ProjectFeatures,
  ProjectResults,
  RelatedProjects,
} from "../../../sections/project-detail-sections";

export function generateStaticParams() {
  return projectDetails.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectDetails.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | Sumit DevTech`,
    description: project.tagline,
    alternates: { canonical: `/project-detail/${slug}` },
    openGraph: {
      title: `${project.title} | Sumit DevTech`,
      description: project.tagline,
      url: `https://sumitdevtech.com/project-detail/${slug}`,
      siteName: "Sumit DevTech",
      type: "article",
      images: [{ url: project.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Sumit DevTech`,
      description: project.tagline,
    },
  };
}

async function ProjectDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectDetails.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <>
      <ProjectDetailHero project={project} />
      <ProjectOverview project={project} />
      <ProjectFeatures project={project} />
      <ProjectResults project={project} />
      <RelatedProjects current={slug} all={projectDetails} />
    </>
  );
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark" />}>
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}