"use client";

import React from "react";
import Link from "next/link";
import { Quote, CheckCircle2, ArrowRight, Share2, Bookmark } from "lucide-react";
import Container from "@/app/ui/Container";
import { BlogPost } from "@/data/blog-data";

export default function BlogDetailContent({ post }: { post: BlogPost }) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <div className="mx-auto w-full max-w-[840px]">
          {/* Article Introduction */}
          <div className="text-lg sm:text-xl text-ink font-medium leading-relaxed mb-10 pb-8 border-b border-line">
            {post.content.introduction}
          </div>

          {/* Article Sections */}
          <div className="space-y-12">
            {post.content.sections.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  {sec.heading}
                </h2>

                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-base sm:text-lg text-muted leading-relaxed">
                    {p}
                  </p>
                ))}

                {/* Key Takeaways Card */}
                {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                  <div className="my-6 rounded-2xl border border-line bg-light p-6">
                    <div className="font-bold text-sm uppercase tracking-wider text-accent mb-3">
                      Key Takeaways
                    </div>
                    <ul className="space-y-2.5">
                      {sec.keyTakeaways.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-ink">
                          <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Styled Pull Quote */}
                {sec.quote && (
                  <blockquote className="my-8 rounded-2xl border-l-4 border-brand bg-accent/5 p-6 sm:p-8">
                    <Quote size={28} className="text-accent mb-2 opacity-50" />
                    <p className="font-heading text-lg sm:text-xl font-bold text-ink italic leading-snug">
                      &ldquo;{sec.quote}&rdquo;
                    </p>
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="mt-12 rounded-3xl border border-line bg-light p-8">
            <h3 className="font-heading text-xl font-extrabold text-ink mb-3">Final Perspective</h3>
            <p className="text-base text-muted leading-relaxed">{post.content.conclusion}</p>
          </div>

          {/* Tags & Share */}
          <div className="mt-10 pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-muted uppercase">Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-light border border-line px-3 py-1 text-xs font-semibold text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Article link copied to clipboard!");
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-bold text-ink hover:border-accent hover:text-accent transition-colors"
              >
                <Share2 size={13} /> Share Article
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

