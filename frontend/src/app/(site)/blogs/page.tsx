import React, { Suspense } from "react";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-data";
import { BlogListSection } from "../../sections/blog-sections";
import Container from "../../ui/Container";

export const metadata: Metadata = {
  title: "Technology & Digital Insights | Sumit DevTech Blogs",
  description:
    "Explore engineering deep dives, web design methodologies, cloud architecture, and cybersecurity insights authored by Sumit DevTech engineers.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Technology & Digital Insights | Sumit DevTech",
    description:
      "Articles, tutorials, and perspectives on full-stack web applications, Next.js, UI/UX, and cloud engineering.",
    url: "https://sumitdevtech.com/blogs",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology & Digital Insights | Sumit DevTech",
    description: "Read in-depth technical blogs and engineering case studies.",
  },
};

export default function BlogsPage() {
  return (
    <>
      {/* Blog Page Hero Banner */}
      <section className="relative overflow-hidden bg-dark text-white pt-28 pb-16 md:pt-20 md:pb-25 border-b border-white/10">
        
        <Container>
          <div className="mx-auto w-full max-w-[1100px] text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Insights, Tutorials &amp; Engineering
            </span>

            <h1 className="text-3xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Technology &amp; Digital <span className="text-brand">Articles</span>
            </h1>

            <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-white/75 leading-relaxed">
              Perspectives on modern Next.js architecture, UI/UX design systems, zero-trust cloud infrastructure, and conversion optimization.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Blog List with Search & Filtering */}
      <Suspense fallback={<div className="min-h-[500px] bg-light" />}>
        <BlogListSection posts={blogPosts} />
      </Suspense>
    </>
  );
}

