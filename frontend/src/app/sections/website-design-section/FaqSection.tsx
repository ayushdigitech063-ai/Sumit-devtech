"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import Container from "@/app/ui/Container";
import SectionHeading from "@/app/ui/SectionHeading";
import { ServicePageData, FaqItem } from "@/types/service-page";
import { cn } from "@/lib/utils";

export interface FaqSectionProps {
  data?: ServicePageData["faq"];
  label?: string;
  title?: React.ReactNode;
  text?: string;
  items?: FaqItem[];
}

export default function FaqSection({
  data,
  label: labelProp,
  title: titleProp,
  text: textProp,
  items: itemsProp,
}: FaqSectionProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const label = data?.label ?? labelProp ?? "Got Questions?";
  const title = titleProp ?? (
    data ? (
      <>
        {data.title}{" "}
        {data.highlight && <span className="text-brand">{data.highlight}</span>}
      </>
    ) : (
      <>
        Frequently Asked <span className="text-brand">Questions</span>
      </>
    )
  );
  const text =
    data?.text ??
    textProp ??
    "Clear answers about our design process, deliverables, mobile adaptability, and production timelines.";
  const items = data?.items ?? itemsProp ?? [];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="relative bg-white md:py-20 overflow-hidden border-t border-line/60">
      {/* FAQ Schema for Search Engines */}
      {items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <SectionHeading
            center
            label={label}
            title={title}
            text={text}
          />

          <div className="mx-auto max-w-3xl space-y-4">
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              const contentId = `faq-content-${item.id}`;
              const headerId = `faq-header-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-all duration-300",
                    isOpen
                      ? "border-accent/40 bg-light/70 shadow-lg shadow-accent/5"
                      : "border-line bg-white hover:border-line/80 hover:bg-light/40"
                  )}
                >
                  <button
                    type="button"
                    id={headerId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center justify-between p-6 text-left transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                  >
                    <span className="flex items-center gap-3 pr-4">
                      <HelpCircle
                        size={18}
                        className={cn(
                          "transition-colors shrink-0",
                          isOpen ? "text-accent" : "text-muted"
                        )}
                      />
                      <h3
                        className={cn(
                          "font-heading text-base md:text-lg font-bold transition-colors m-0",
                          isOpen ? "text-dark" : "text-dark/80"
                        )}
                      >
                        {item.question}
                      </h3>
                    </span>
                    <ChevronDown
                      size={20}
                      className={cn(
                        "text-muted transition-transform duration-300 shrink-0",
                        isOpen && "rotate-180 text-accent"
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={headerId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <p className="px-6 pb-6 pt-1 text-sm leading-relaxed text-muted border-t border-line/40 m-0">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
