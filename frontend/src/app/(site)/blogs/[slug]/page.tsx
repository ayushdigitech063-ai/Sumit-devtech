import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog-data";
import {
  BlogDetailHero,
  BlogDetailContent,
  RelatedBlogs,
} from "../../../sections/blog-sections";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Sumit DevTech`,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: {
      title: `${post.title} | Sumit DevTech`,
      description: post.excerpt,
      url: `https://sumitdevtech.com/blogs/${slug}`,
      siteName: "Sumit DevTech",
      type: "article",
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Sumit DevTech`,
      description: post.excerpt,
    },
  };
}

async function BlogDetailShell({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <>
      <BlogDetailHero post={post} />
      <BlogDetailContent post={post} />
      <RelatedBlogs currentSlug={slug} allPosts={blogPosts} />
    </>
  );
}

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark animate-pulse" />}>
      <BlogDetailShell params={params} />
    </Suspense>
  );
}

