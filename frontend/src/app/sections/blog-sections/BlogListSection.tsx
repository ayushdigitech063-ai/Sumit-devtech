"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, ArrowUpRight, Search, Sparkles, BookOpen } from "lucide-react";
import Container from "@/app/ui/Container";
import { BlogPost, blogCategories } from "@/data/blog-data";

export default function BlogListSection({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Articles");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = useMemo(() => posts.find((p) => p.featured) || posts[0], [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Articles" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <section className="relative bg-light py-16 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <Container>
        <div className="mx-auto w-full max-w-[1140px]">
          {/* Filter Bar & Search */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {blogCategories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-dark text-white shadow-md"
                        : "bg-white border border-line text-muted hover:text-dark hover:border-dark/30"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Search Box */}
            <div className="relative min-w-[240px] max-w-xs">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search articles & topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-line bg-white py-2 pl-9 pr-4 text-xs sm:text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          {/* Grid of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-fr">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="group relative h-full flex flex-col justify-between"
                >
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="relative flex flex-col justify-between h-full rounded-3xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl focus:outline-none"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <span className="rounded-full bg-dark/80 backdrop-blur-md px-3 py-0.5 text-[11px] font-bold text-white border border-white/10">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Meta info */}
                      <div className="flex items-center gap-3 text-xs font-semibold text-muted mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-accent" /> {post.publishedAt}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-accent-2" /> {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-lg font-extrabold text-ink group-hover:text-accent transition-colors duration-200 line-clamp-2 leading-snug mb-3">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-muted line-clamp-3 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Author & Arrow Footer */}
                    <div className="mt-4 border-t border-line/70 pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-accent/15 flex items-center justify-center font-bold text-xs text-accent">
                          {post.author.name.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-ink">{post.author.name}</span>
                      </div>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-light border border-line text-dark transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:rotate-45">
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="rounded-3xl border border-line bg-white p-12 text-center my-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-light text-muted mb-4">
                <BookOpen size={28} />
              </div>
              <h3 className="font-heading text-xl font-bold text-ink mb-2">No articles found</h3>
              <p className="text-sm text-muted max-w-md mx-auto mb-6">
                We couldn&apos;t find any articles matching your search criteria. Try a different query or reset filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All Articles");
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:scale-105"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

