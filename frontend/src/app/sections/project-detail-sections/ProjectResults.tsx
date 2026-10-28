"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Container from "@/app/ui/Container";
import { ProjectDetailItem } from "@/data/projects-data";

export default function ProjectResults({ project }: { project: ProjectDetailItem }) {
  return (
    <section className="py-16 md:py-20 bg-dark text-white relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-20 top-0 h-[400px] w-[400px] rounded-full bg-accent opacity-20 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-accent-2 opacity-15 blur-[90px]" />

      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-widest text-accent">
              <i className="h-0.5 w-7 bg-brand" /> Measured Outcomes
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Results That Speak for Themselves
            </h2>
          </motion.div>

          {/* Results grid */}
          <div className="grid sm:grid-cols-3 gap-6 mb-14">
            {project.results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm text-center"
              >
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp size={18} className="text-accent" />
                </div>
                <div className="font-heading text-4xl font-black text-accent tracking-tight mb-1">{r.value}</div>
                <div className="text-sm font-bold text-white mb-2">{r.metric}</div>
                <p className="text-xs text-white/60 leading-relaxed">{r.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

