import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts as fallbackPosts, BlogPost } from "@/data/blog-data";
import {
  BlogDetailHero,
  BlogDetailContent,
  RelatedBlogs,
} from "../../../sections/blog-sections";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_BASE}/blogs/detail/${slug}`, {
      cache: "no-store",
    });
    const result = await res.json();
    if (result.success && result.data) {
      const b = result.data;
      return {
        id: b._id,
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        coverImage: b.coverImage || "/images/projects/case-thumb2.png",
        category: b.category,
        readTime: b.readTime || "5 min read",
        publishedAt: new Date(b.createdAt).toLocaleDateString([], {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        featured: b.featured,
        author: {
          name: b.authorName || "Sumit Kumar",
          role: b.authorRole || "Lead Solutions Architect",
          avatar: "/images/team/member-1.png",
        },
        tags: b.tags || ["Technology"],
        content: {
          introduction: b.excerpt,
          sections: [
            {
              heading: "Overview",
              paragraphs: [b.content],
            },
          ],
          conclusion: "For customized architectural consultation, contact Sumit DevTech.",
        },
      };
    }
  } catch (err) {
    console.error("Failed to fetch blog post from backend:", err);
  }

  return fallbackPosts.find((p) => p.slug === slug) || null;
}

export function generateStaticParams() {
  return fallbackPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
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
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <>
      <BlogDetailHero post={post} />
      <BlogDetailContent post={post} />
      <RelatedBlogs currentSlug={slug} allPosts={fallbackPosts} />
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
