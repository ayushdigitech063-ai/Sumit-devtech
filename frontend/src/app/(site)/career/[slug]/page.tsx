import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { careerData } from "@/data/career-data";
import {
  JobHeroSection,
  JobDetailsSection,
  ApplyFormSection,
} from "@/app/sections/career-detail-section";

export function generateStaticParams() {
  return careerData.openings.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = careerData.openings.find((o) => o.slug === slug);
  if (!job) return {};

  return {
    title: `${job.title} | Careers | Sumit DevTech`,
    description: job.summary,
    alternates: { canonical: `/career/${slug}` },
    openGraph: {
      title: `${job.title} | Careers | Sumit DevTech`,
      description: job.summary,
      url: `https://sumitdevtech.com/career/${slug}`,
      siteName: "Sumit DevTech",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} | Careers | Sumit DevTech`,
      description: job.summary,
    },
  };
}

async function JobDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = careerData.openings.find((o) => o.slug === slug);

  if (!job) notFound();

  return (
    <main>
      <JobHeroSection job={job} />
      <JobDetailsSection job={job} process={careerData.process} />
      <ApplyFormSection job={job} />
    </main>
  );
}

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark animate-pulse" />}>
      <JobDetailContent params={params} />
    </Suspense>
  );
}

