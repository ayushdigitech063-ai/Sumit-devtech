"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Container from "@/app/ui/Container";
import { ProjectDetailItem } from "@/data/projects-data";

export default function ProjectOverview({ project }: { project: ProjectDetailItem }) {
  return (
    <section className="py-16 md:py-20 bg-light">
      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Overview + Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="mb-3 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-accent">
                <i className="h-0.5 w-7 bg-brand" /> Project Overview
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-ink mb-5 leading-tight">
                What We Built &amp; Why
              </h2>
              <p className="text-muted leading-relaxed text-base mb-8">{project.overview}</p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {project.stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl border border-line bg-white p-5 shadow-sm"
                  >
                    <div className="font-heading text-3xl font-black text-accent tracking-tight">{s.value}</div>
                    <div className="text-xs font-semibold text-muted mt-1">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Challenge / Solution / Tech Stack */}
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-line bg-white p-7 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500">
                    <CheckCircle2 size={18} />
                  </span>
                  <h3 className="font-heading text-lg font-extrabold text-ink">The Challenge</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed">{project.challenge}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-line bg-white p-7 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={18} />
                  </span>
                  <h3 className="font-heading text-lg font-extrabold text-ink">Our Solution</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed">{project.solution}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-line bg-white p-7 shadow-sm"
              >
                <h3 className="font-heading text-base font-extrabold text-ink mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold ${t.color}`}
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

