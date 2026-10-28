"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import Container from "@/app/ui/Container";
import { BlogPost } from "@/data/blog-data";

export default function RelatedBlogs({
  currentSlug,
  allPosts,
}: {
  currentSlug: string;
  allPosts: BlogPost[];
}) {
  const related = allPosts.filter((p) => p.slug !== currentSlug).slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-light border-t border-line">
      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                <i className="h-0.5 w-6 bg-brand" /> Related Articles
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">Keep Reading</h2>
            </div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent hover:underline"
            >
              Browse All <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="group rounded-3xl border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-accent/40 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                    {post.category}
                  </span>

                  <h3 className="font-heading text-base font-extrabold text-ink group-hover:text-accent transition-colors line-clamp-2 mt-1 mb-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-line/60 flex items-center justify-between text-[11px] font-semibold text-muted">
                  <span>{post.readTime}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-accent group-hover:gap-1.5 transition-all">
                    Read Article <ArrowUpRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

