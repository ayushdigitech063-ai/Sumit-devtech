"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Smartphone, BarChart3, ShieldCheck, Zap, Cloud,
  Globe, Search, Palette, GitMerge, Bell, RefreshCw, Lock, FileText,
  Shield, Server, Activity, TrendingUp, Users, Mail, Layers, Code2,
  SplitSquareVertical,
} from "lucide-react";
import Container from "@/app/ui/Container";
import { ProjectDetailItem } from "@/data/projects-data";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  LayoutDashboard, Smartphone, BarChart3, ShieldCheck, Zap, Cloud,
  Globe, Search, Palette, GitMerge, Bell, RefreshCw, Lock, FileText,
  Shield, Server, Activity, TrendingUp, Users, Mail, Layers, Code2,
  SplitSquareVertical,
};

export default function ProjectFeatures({ project }: { project: ProjectDetailItem }) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-widest text-accent">
              <i className="h-0.5 w-7 bg-brand" /> Key Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ink leading-tight">
              Everything Built Into the Solution
            </h2>
            <p className="mt-3 text-muted max-w-xl mx-auto text-base">
              Every feature was deliberately engineered to solve a specific pain point.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.features.map((f, i) => {
              const Icon = iconMap[f.icon] ?? Zap;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-3xl border border-line bg-light p-6 transition-all hover:border-accent/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/8"
                >
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-heading text-base font-extrabold text-ink mb-2">{f.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{f.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

