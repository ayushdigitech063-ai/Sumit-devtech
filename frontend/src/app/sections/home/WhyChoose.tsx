"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { apiFetch, ApiError } from "@/lib/api";

const DEFAULT_WHY_CHOOSE = [
  {
    title: "10+ Years of Mastery",
    text: "Proven digital solutions engineered for enterprise scale, reliability, and high performance.",
    image: "/images/projects/case-thumb.png",
    chip: "Proven Track Record",
  },
  {
    title: "End-to-End Solutions",
    text: "Full lifecycle engineering from system architecture & UI/UX to final secure cloud deployment.",
    image: "/images/projects/case-thumb2.png",
    chip: "Full-Cycle Agile",
  },
  {
    title: "Client-Centric Delivery",
    text: "Direct communication with senior developers, weekly sprints, and continuous hypercare support.",
    image: "/images/aboutPage/group_photo_1.png",
    chip: "Direct Team Access",
  },
  {
    title: "Transparent & Fixed Pricing",
    text: "Clear milestone deliverables with strict zero hidden costs, scope creep, or surprise retainers.",
    image: "/images/aboutPage/group_photo_2.png",
    chip: "Guaranteed Price Lock",
  },
];

export default function WhyChoose() {
  const [chooseData, setChooseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWhyChoose() {
      try {
        const res = await apiFetch<any>("/home/why-choose");
        if (res && res.data) {
          setChooseData(res.data);
        }
      } catch (err) {
        if (err instanceof ApiError) {
          console.error(`API Error (${err.status}):`, err.message);
        } else {
          console.error("Failed to load why choose section:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    loadWhyChoose();
  }, []);

  if (loading) {
    return (
      <Section id="why-choose" className="bg-[#fafbfc] py-16">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mx-auto mb-3 h-5 w-28 rounded-full bg-slate-200" />
          <div className="mx-auto mb-3 h-9 w-2/3 rounded-xl bg-slate-200" />
          <div className="mx-auto mb-10 h-5 w-1/2 rounded bg-slate-200" />
          <div className="grid gap-5 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-44 rounded-3xl bg-slate-200" />
            ))}
          </div>
        </div>
      </Section>
    );
  }

  const label = chooseData?.label || chooseData?.tagline || "WHY CHOOSE";
  const title = chooseData?.title || chooseData?.heading || "Why Brands Trust Sumit DevTech";
  const text = chooseData?.text || chooseData?.subheading || "We don't just build websites. We stick around after the job is done.";
  
  const rawItems = chooseData?.items || chooseData?.cards || chooseData?.whyChoose || [];
  const items = rawItems.length > 0 ? rawItems : DEFAULT_WHY_CHOOSE;

  return (
    <Section id="why-choose" className="relative overflow-hidden bg-gradient-to-b from-white via-[#fafbfc] to-white py-16 sm:py-20 font-sans">
      {/* Background Soft Mesh Ambient */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(#e2e8f0 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-6 sm:px-8 z-10">
        {/* Centered Heading with Normal Clean Font */}
        <SectionHeading
          center
          label={label}
          title={
            <>
              {typeof title === "string" && title.includes("Sumit DevTech") ? (
                <>
                  {title.replace("Sumit DevTech", "")}
                  <span className="text-orange-500 font-bold">Sumit DevTech</span>
                </>
              ) : (
                title
              )}
            </>
          }
          text={text}
        />

        {/* 2x2 Bento Style Cards Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item: any, i: number) => {
            const itemTitle = item.title || DEFAULT_WHY_CHOOSE[i % DEFAULT_WHY_CHOOSE.length].title;
            const itemText = item.text || item.description || DEFAULT_WHY_CHOOSE[i % DEFAULT_WHY_CHOOSE.length].text;
            const itemImage = item.image?.url || item.image || DEFAULT_WHY_CHOOSE[i % DEFAULT_WHY_CHOOSE.length].image;
            const itemChip = item.chip || DEFAULT_WHY_CHOOSE[i % DEFAULT_WHY_CHOOSE.length].chip;

            return (
              <Reveal key={itemTitle || i} delay={(i % 2) * 0.1} className="h-full">
                <article className="group relative flex h-full flex-col sm:flex-row overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer">
                  {/* Metallic Light-Shine Sweep on Hover */}
                  <span className="pointer-events-none absolute -inset-y-full -left-[100%] w-[120%] -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/80 to-transparent transition-all duration-700 ease-out group-hover:left-[150%]" />

                  {/* Left: Thumbnail Image Box */}
                  <div className="relative h-48 w-full sm:h-auto sm:w-52 shrink-0 overflow-hidden bg-slate-100">
                    <Image
                      src={itemImage}
                      alt={itemTitle}
                      fill
                      sizes="(min-width:640px) 210px, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/20" />

                    {/* Step Number Badge */}
                    <div className="absolute left-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500 text-white font-sans text-xs font-bold shadow-md shadow-orange-500/30">
                      0{i + 1}
                    </div>
                  </div>

                  {/* Right: Content with Normal System Font */}
                  <div className="flex flex-col justify-between p-5 sm:p-6 flex-1">
                    <div>
                      {/* Pill Badge */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <CheckCircle2 size={13} className="text-orange-500" />
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          {itemChip}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-sans text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-orange-600 transition-colors">
                        {itemTitle}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 font-sans text-xs sm:text-sm font-normal leading-relaxed text-slate-600 line-clamp-3">
                        {itemText}
                      </p>
                    </div>

                    {/* Bottom Micro Indicator */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-orange-600 transition-colors">
                      <span>Certified Quality</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Subtle Brand Accent Line Underneath */}
                  <span className="absolute bottom-0 left-0 h-[2.5px] w-0 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500 group-hover:w-full" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
