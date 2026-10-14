"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import { techTabs } from "@/data/technologies";
import { cn } from "@/lib/utils";

export default function Technology() {
  const [active, setActive] = useState(0);
  const tab = techTabs[active];

  return (
    <Section id="technology">
      <SectionHeading
        center
        label="Technology"
        title={<>We Work in <span className="text-brand">Technology</span></>}
        text="Building innovative digital solutions that solve problems, improve efficiency, and power modern businesses."
      />

      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {techTabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full px-6 py-2.5 text-sm font-semibold transition",
              i === active ? "bg-brand text-white shadow-lg shadow-accent/30" : "bg-light text-muted hover:bg-accent/10 hover:text-accent"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mx-auto flex max-w-4xl flex-wrap justify-center gap-5"
        >
          {tab.items.map((item) =>
            item.icon ? (
              <div
                key={item.name}
                className="group flex w-40 flex-col items-center gap-3 rounded-3xl border border-line bg-white p-6 grayscale transition duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-xl hover:shadow-accent/15 hover:grayscale-0"
              >
                <Image src={item.icon} alt={item.name} width={56} height={56} unoptimized className="h-14 w-14 object-contain" />
                <span className="text-sm font-semibold">{item.name}</span>
              </div>
            ) : (
              <span
                key={item.name}
                className="rounded-2xl border border-line bg-light px-6 py-4 font-semibold transition hover:-translate-y-1 hover:border-accent hover:text-accent"
              >
                {item.name}
              </span>
            )
          )}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}