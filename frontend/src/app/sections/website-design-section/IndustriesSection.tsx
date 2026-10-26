"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, ShoppingBag, HeartPulse, Rocket, LucideIcon } from "lucide-react";
import Container from "@/app/ui/Container";
import SectionHeading from "@/app/ui/SectionHeading";
import { ServicePageData, IndustryItem } from "@/types/service-page";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  ShoppingBag,
  HeartPulse,
  Rocket,
};

export interface IndustriesSectionProps {
  data?: ServicePageData["industries"];
  label?: string;
  title?: React.ReactNode;
  text?: string;
  items?: IndustryItem[];
}

export default function IndustriesSection({
  data,
  label: labelProp,
  title: titleProp,
  text: textProp,
  items: itemsProp,
}: IndustriesSectionProps = {}) {
  const shouldReduceMotion = useReducedMotion();

  const label = data?.label ?? labelProp ?? "Domain Expertise";
  const title = titleProp ?? (
    data ? (
      <>
        {data.title}{" "}
        {data.highlight && <span className="text-brand">{data.highlight}</span>}
      </>
    ) : (
      <>
        Website Designs Built For{" "}
        <span className="text-brand">Every Industry</span>
      </>
    )
  );
  const text =
    data?.text ??
    textProp ??
    "Whether establishing enterprise credibility, accelerating consumer sales, or scaling SaaS signups, our custom designs target your industry's specific user behaviors.";
  const items = data?.items ?? itemsProp ?? [];

  return (
    <section className="relative bg-light md:py-18 overflow-hidden">
      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <SectionHeading
            center
            label={label}
            title={title}
            text={text}
          />

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((ind, index) => {
            const Icon = iconMap[ind.iconName] || Briefcase;

            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col justify-between rounded-3xl border border-line bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-light border border-line text-dark transition duration-300 group-hover:bg-accent group-hover:text-white group-hover:border-accent">
                    <Icon size={22} />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-dark mt-5 mb-2.5 transition-colors group-hover:text-accent">
                    {ind.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted">
                    {ind.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted">Impact</span>
                  <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
                    {ind.metric}
                  </span>
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>
      </Container>
    </section>
  );
}
