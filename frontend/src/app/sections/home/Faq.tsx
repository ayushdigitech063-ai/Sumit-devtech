"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import Button from "../../ui/Button";
import { faqs } from "@/data/faq";
import { IMG } from "@/data/home";
import { cn } from "@/lib/utils";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <Section id="faq" light>
      <div className="mx-auto w-full max-w-[1100px] px-6">
      <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-32px" style={{ aspectRatio: "4 / 4.4" }}>
            <Image
              src={`${IMG}/sdt-faq-tech-team.jpg`}
              alt="Sumit DevTech senior software and design team"
              fill
              sizes="(min-width:1024px) 480px, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0`bg-gradient-to-t` from-dark/80 via-transparent" />
            <div className="absolute left-4 top-4 rounded-2xl bg-white px-4 py-2 text-sm font-bold">
              <span className="text-accent">✓</span> 100% Transparent Pricing
            </div>
            <div className="absolute right-4 top-16 rounded-2xl bg-white px-4 py-2 text-sm font-bold">
              <span className="text-accent">✓</span> 500+ Successful Projects
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 p-5 backdrop-blur">
              <h4 className="font-heading text-lg font-bold">Still have questions?</h4>
              <p className="mb-3 text-sm text-muted">Speak directly with our technical team</p>
              <Button href="/" className=" `!px-6 !py-2.5` text-sm">Talk to Us</Button>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            label="Frequently Asked Questions"
            title={<>Everything You <span className="text-brand">Need to Know</span></>}
            text="Clear, transparent answers about our development process, project timelines, pricing structure, and ongoing support."
          />
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div
                key={f.q}
                className={cn("rounded-2xl border bg-white transition", open === i ? "border-accent shadow-xl shadow-accent/10" : "border-line")}
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center gap-4 p-5 text-left md:p-6"
                >
                  <span className="font-heading text-sm font-bold text-accent">0{i + 1}</span>
                  <span className="flex-1 font-heading text-lg font-semibold">{f.q}</span>
                  <Plus className={cn("shrink-0 text-accent transition-transform duration-300", open === i && "rotate-45")} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-4 pr-3 text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </Section>
  );
}