"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import { apiFetch, ApiError } from "@/lib/api";

/* PREVIOUS STATIC IMPORTS (COMMENTED OUT FOR REFERENCE):
import { whyChoose } from "@/data/home";
*/

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

  // Layout shift rokne ke liye simple placeholder
  if (loading) {
    return (
      <Section id="why-choose" light>
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mx-auto mb-3 h-5 w-28 rounded-full bg-ink/10" />
          <div className="mx-auto mb-3 h-9 w-2/3 rounded-xl bg-ink/10" />
          <div className="mx-auto mb-10 h-5 w-1/2 rounded bg-ink/10" />
          <div className="grid gap-5 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-44 rounded-3xl bg-ink/10" />
            ))}
          </div>
        </div>
      </Section>
    );
  }

  // Fallback defaults
  const label = chooseData?.label || chooseData?.tagline || "Why Choose";
  const title = chooseData?.title || chooseData?.heading || "Why Choose Sumit DevTech";
  const text = chooseData?.text || chooseData?.subheading || "We don't just build websites. We stick around after the job is done.";
  const items = chooseData?.items || chooseData?.cards || chooseData?.whyChoose || [];

  return (
    <Section id="why-choose" light>
      {/* PREVIOUS STATIC HEADING (COMMENTED OUT):
      <SectionHeading
        center
        label="Why Choose"
        title={<>Why Choose <span className="text-brand">Sumit DevTech</span></>}
        text="We don't just build websites. We stick around after the job is done."
      />
      */}

      {/* NAYA DYNAMIC HEADING */}
      <SectionHeading
        center
        label={label}
        title={
          <>
            {typeof title === "string" && title.includes("Sumit DevTech") ? (
              <>
                {title.replace("Sumit DevTech", "")}
                <span className="text-brand">Sumit DevTech</span>
              </>
            ) : (
              title
            )}
          </>
        }
        text={text}
      />

      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        {/* PREVIOUS STATIC MAPPING (COMMENTED OUT):
        {whyChoose.map((item, i) => (
          <Reveal key={item.title} delay={(i % 2) * 0.1} className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl hover:shadow-accent/10 sm:flex-row">
              <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-auto sm:min-h-[170px] sm:w-44">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width:640px) 176px, 90vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-brand font-heading text-sm font-extrabold text-white shadow-lg">
                  0{i + 1}
                </span>
              </div>

              <div className="flex flex-col justify-center p-5 md:p-6">
                <h3 className="mb-1.5 text-lg font-bold md:text-xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.text}</p>
              </div>

              <span className="absolute bottom-0 left-0 h-1 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
            </article>
          </Reveal>
        ))}
        */}

        {/* NAYA DYNAMIC MAPPING */}
        {items.map((item: any, i: number) => {
          const itemTitle = item.title || "";
          const itemText = item.text || item.description || "";
          const itemImage = item.image?.url || item.image || "/images/placeholder.webp";

          return (
            <Reveal key={itemTitle || i} delay={(i % 2) * 0.1} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl hover:shadow-accent/10 sm:flex-row">
                {/* image thumbnail */}
                <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-auto sm:min-h-[170px] sm:w-44">
                  <Image
                    src={itemImage}
                    alt={itemTitle}
                    fill
                    sizes="(min-width:640px) 176px, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-brand font-heading text-sm font-extrabold text-white shadow-lg">
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </span>
                </div>

                {/* text */}
                <div className="flex flex-col justify-center p-5 md:p-6">
                  <h3 className="mb-1.5 text-lg font-bold md:text-xl">{itemTitle}</h3>
                  <p className="text-sm leading-relaxed text-muted">{itemText}</p>
                </div>

                {/* accent line that grows on hover */}
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}