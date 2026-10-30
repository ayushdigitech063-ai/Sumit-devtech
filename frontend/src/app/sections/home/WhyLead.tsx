"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import { Award, Wallet, Layers, Globe, Headphones, ShoppingCart } from "lucide-react";
import { apiFetch, ApiError } from "@/lib/api";

/* PREVIOUS STATIC IMPORTS (COMMENTED OUT FOR REFERENCE):
import { whyLead } from "@/data/home";
*/

// Original sequence ke icons array me preserve kiye gaye hain
const leadIcons = [Award, Wallet, Layers, Globe, Headphones, ShoppingCart];

export default function WhyLead() {
  const [leadData, setLeadData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWhyLead() {
      try {
        const res = await apiFetch<any>("/home/why-lead");
        if (res && res.data) {
          setLeadData(res.data);
        }
      } catch (err) {
        if (err instanceof ApiError) {
          console.error(`API Error (${err.status}):`, err.message);
        } else {
          console.error("Failed to load why lead section:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    loadWhyLead();
  }, []);

  // Layout shift rokne ke liye simple skeleton
  if (loading) {
    return (
      <Section id="why-we-lead" className="mt-0">
        <div className="mx-auto w-full max-w-5xl px-6 animate-pulse">
          <div className="mx-auto mb-4 h-6 w-32 rounded-full bg-ink/10" />
          <div className="mx-auto mb-10 h-10 w-2/3 rounded-xl bg-ink/10" />
          <div className="grid gap-5 sm:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-ink/10" />
            ))}
          </div>
        </div>
      </Section>
    );
  }

  // Fallbacks agar backend se data pending ho ya empty ho
  const label = leadData?.label || leadData?.tagline || "Why We Lead";
  const title = leadData?.title || leadData?.heading || "Leading Website Design & Development Company in Jaipur, India";
  
  // Backend me items 'features', 'items', 'cards', ya 'whyLead' me se kisi bhi key me ho sakte hain
  const features = leadData?.features || leadData?.items || leadData?.cards || leadData?.whyLead || [];

  return (
    <Section id="why-we-lead" className="mt-0">
      {/* PREVIOUS STATIC HEADING (COMMENTED OUT):
      <SectionHeading
        center
        label="Why We Lead"
        title={<>Leading Website Design & Development Company in <span className="text-brand">Jaipur, India</span></>}
      />
      */}

      {/* NAYA DYNAMIC HEADING */}
      <SectionHeading
        center
        label={label}
        title={
          <>
            {typeof title === "string" && title.includes("Jaipur, India") ? (
              <>
                {title.replace("Jaipur, India", "")}
                <span className="text-brand">Jaipur, India</span>
              </>
            ) : (
              title
            )}
          </>
        }
      />

      <div className="mx-auto grid w-full max-w-5xl gap-4 sm:mt-10 md:gap-5">
        {/* PREVIOUS STATIC MAPPING (COMMENTED OUT):
        <div className="grid gap-5 sm:grid-cols-2">
          {whyLead.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={(i % 2) * 0.1}>
                <div className="group flex h-full gap-4 rounded-2xl bg-light p-6 transition duration-300 hover:-translate-y-2 hover:bg-dark hover:text-white">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand text-white">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">{f.title}</h3>
                    <p className="text-sm text-muted transition group-hover:text-white/70">{f.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        */}

        {/* NAYA DYNAMIC MAPPING */}
        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((f: any, i: number) => {
            const Icon = leadIcons[i % leadIcons.length];
            const cardTitle = f.title || "";
            const cardDescription = f.text || f.description || "";

            return (
              <Reveal key={cardTitle || i} delay={(i % 2) * 0.1}>
                <div className="group flex h-full gap-4 rounded-2xl bg-light p-6 transition duration-300 hover:-translate-y-2 hover:bg-dark hover:text-white">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand text-white">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">{cardTitle}</h3>
                    <p className="text-sm text-muted transition group-hover:text-white/70">
                      {cardDescription}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}