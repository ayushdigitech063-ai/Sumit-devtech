import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { careerData, Opening as JobOpening } from "@/data/career-data";
import {
  JobHeroSection,
  JobDetailsSection,
  ApplyFormSection,
} from "@/app/sections/career-detail-section";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function getJob(slug: string): Promise<JobOpening | null> {
  try {
    const res = await fetch(`${API_BASE}/careers/openings/${slug}`, {
      cache: "no-store",
    });
    const result = await res.json();
    if (result.success && result.data) {
      const j = result.data;
      return {
        id: j._id,
        slug: j.slug,
        title: j.title,
        department: j.department,
        location: j.location,
        type: j.type,
        experience: j.experience,
        summary: j.summary,
        responsibilities: j.responsibilities || [],
        requirements: j.requirements || [],
        niceToHave: j.niceToHave || [],
      };
    }
  } catch (err) {
    console.error("Failed to fetch job opening from backend:", err);
  }

  return careerData.openings.find((o) => o.slug === slug) || null;
}

export function generateStaticParams() {
  return careerData.openings.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
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
  const job = await getJob(slug);

  if (!job) notFound();

  return (
    <>
      <JobHeroSection job={job} />
      <JobDetailsSection job={job} process={careerData.process} />
      <ApplyFormSection job={job} />
    </>
  );
}

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-light" />}>
      <JobDetailContent params={params} />
    </Suspense>
  );
}
