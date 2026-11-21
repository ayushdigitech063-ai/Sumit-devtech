"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import Button from "../../ui/Button";
import { cn } from "@/lib/utils";
import { fetchCommonFaqs, type FaqItem } from "@/lib/common-api";

const STATIC_FALLBACK_FAQS: FaqItem[] = [
  { question: "How much does a website cost?", answer: "Website cost depends on the scope and complexity - a high-conversion business site starts differently from a full-scale eCommerce storefront or a custom React web application. We provide detailed, itemized proposals with zero hidden costs. We believe in 100% transparent, value-driven pricing." },
  { question: "How long does website development take?", answer: "Standard professional websites are typically delivered in 5-7 working days. More sophisticated platforms, such as multi-vendor eCommerce stores or custom SaaS dashboards, take approximately 2-4 weeks. We always establish clear milestone roadmaps before development begins." },
  { question: "Can I update the website content after it goes live?", answer: "Yes, absolutely. All our websites are built with intuitive content management capabilities. You can easily modify text, images, blogs, and products without any programming knowledge. We also provide full 1-on-1 walkthrough training." },
  { question: "Does my website rank on Google automatically?", answer: "Every website we develop is engineered with complete on-page technical SEO: semantic HTML5 schema, OpenGraph tags, automated XML sitemaps, fast TTFB, and Core Web Vitals optimization. To achieve top rankings for competitive keywords, we also offer dedicated organic SEO and conversion growth services." },
];

export default function Faq() {
  const [faqs, setFaqs] = useState<FaqItem[]>(STATIC_FALLBACK_FAQS);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    fetchCommonFaqs().then((data) => {
      if (data && data.length > 0) {
        setFaqs(data);
      }
    });
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <Section id="faq" light>
      {/* FAQ Schema for Google Search Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto w-full max-w-[1100px] px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-32px" style={{ aspectRatio: "4 / 4.4" }}>
              <Image
                src="https://sumitdevtech.com/assets/images/sdt-faq-tech-team.jpg"
                alt="Sumit DevTech senior software and design team"
                fill
                sizes="(min-width:1024px) 480px, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent" />
              <div className="absolute left-4 top-4 rounded-2xl bg-white px-4 py-2 text-sm font-bold">
                Clear Answers
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xl font-bold">Have More Questions?</p>
                <p className="text-xs text-white/80 mt-1">Directly discuss your tech & timeline with our developers.</p>
                <div className="mt-4">
                  <Button href="/contact-us" variant="primary">
                    Book Free 1-on-1 Consultation
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              label="FAQ's"
              title={
                <>
                  Frequently Asked <span className="text-brand">Questions</span>
                </>
              }
              text="Everything you need to know about our development process, milestone deliveries, and post-launch support."
            />

            <div className="space-y-4">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={f._id || i}
                    className={cn(
                      "rounded-2xl border transition duration-300",
                      isOpen ? "border-orange-500/40 bg-orange-50/20 shadow-xs" : "border-line bg-white hover:border-slate-300"
                    )}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-dark text-base"
                      aria-expanded={isOpen}
                    >
                      <span>{f.question}</span>
                      <span
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-dark transition-transform duration-300",
                          isOpen && "rotate-45 bg-brand text-white"
                        )}
                      >
                        <Plus size={16} />
                      </span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-0 text-sm leading-relaxed text-muted font-normal">
                            {f.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
