"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "@/app/ui/Container";
import { ProjectDetailItem } from "@/data/projects-data";

export default function RelatedProjects({
  current,
  all,
}: {
  current: string;
  all: ProjectDetailItem[];
}) {
  const related = all.filter((p) => p.slug !== current).slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-white border-t border-line">
      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-end justify-between"
          >
            <div>
              <span className="mb-2 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-accent">
                <i className="h-0.5 w-7 bg-brand" /> More Work
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-ink">Explore Other Projects</h2>
            </div>
            <Link
              href="/project"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline"
            >
              View All <ArrowUpRight size={14} />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/project-detail/${p.slug}`}
                  className="group block rounded-3xl border border-line bg-light overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-accent/30"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{p.category}</span>
                    <h3 className="font-heading text-base font-extrabold text-ink mt-1 mb-2 group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-accent group-hover:gap-2 transition-all">
                      View Project <ArrowUpRight size={13} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

