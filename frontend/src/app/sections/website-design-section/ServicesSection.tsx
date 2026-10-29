"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "@/app/ui/Container";
import SectionHeading from "@/app/ui/SectionHeading";
import { ServicePageData, ServiceItem } from "@/types/service-page";

export interface ServicesSectionProps {
  data?: ServicePageData["services"];
  id?: string;
  label?: string;
  title?: React.ReactNode;
  text?: string;
  services?: ServiceItem[];
}

export default function ServicesSection({
  data,
  id: idProp,
  label: labelProp,
  title: titleProp,
  text: textProp,
  services: servicesProp,
}: ServicesSectionProps = {}) {
  const shouldReduceMotion = useReducedMotion();

  const id = data?.id ?? idProp ?? "web-design-services";
  const label = data?.label ?? labelProp ?? "Expertise & Services";
  const title = titleProp ?? (
    data ? (
      <>
        {data.title}{" "}
        {data.highlight && <span className="text-brand">{data.highlight}</span>}
      </>
    ) : (
      <>
        Precision-Engineered Web Design{" "}
        <span className="text-brand">Solutions</span>
      </>
    )
  );
  const text =
    data?.text ??
    textProp ??
    "Explore our focused design capabilities. Every package is custom-crafted to solve specific user experience bottlenecks and drive measurable business ROI.";
  const services = data?.items ?? servicesProp ?? [];

  return (
    <section id={id} className="relative bg-light md:py-18 overflow-hidden">
      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <SectionHeading
            center
            label={label}
            title={title}
            text={text}
          />

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : index * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col justify-between rounded-3xl border border-line bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/15"
            >
              <div>
                {/* Header with Number & Category indicator */}
                <div className="flex items-center justify-between border-b border-line/60 pb-5">
                  <span className="font-heading text-2xl font-black text-brand tracking-tight">
                    {service.number}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-heading text-xl font-bold text-dark mt-6 mb-3 transition-colors duration-300 group-hover:text-accent">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-sm leading-relaxed text-muted line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-line/60">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-light px-2.5 py-1 text-[11px] font-semibold text-muted border border-line/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
