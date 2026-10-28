"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";
import Container from "@/app/ui/Container";
import { BlogPost } from "@/data/blog-data";

export default function BlogDetailHero({ post }: { post: BlogPost }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-dark text-white pt-22 pb-12 border-b border-white/10">
      <Container>
        <div className="mx-auto w-full max-w-[880px]">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-xs text-white/50 font-medium">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-white/80 transition-colors">Blogs</Link>
            <span>/</span>
            <span className="text-white/80 truncate max-w-[200px]">{post.title}</span>
          </div>

          {/* Category Chip */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
              <Tag size={12} className="text-accent" />
              {post.category}
            </span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.12] text-white mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Meta Bar & Author Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-b border-white/10 py-5 text-xs sm:text-sm text-white/70">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand flex items-center justify-center font-bold text-sm text-white shadow-md">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-white text-sm">{post.author.name}</div>
                <div className="text-xs text-white/60">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-accent" /> {post.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-accent-2" /> {post.readTime}
              </span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative mt-8 h-72 sm:h-96 md:h-[460px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 880px"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

