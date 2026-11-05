"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Section from "@/app/ui/Section";
import SectionHeading from "@/app/ui/SectionHeading";
import { OurPurpose, pictures } from "@/data/about";

export default function Purpose() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const [featured, ...others] = OurPurpose;
  const FeaturedIcon = featured.icon;

  return (
    <Section id="purpose-section" light className="bg-white border-t border-line/50">
      <SectionHeading
        center
        label="Our Purpose"
        title={<>Driven by Purpose, <span className="text-brand">Guided by Vision</span></>}
        text="Good work doesn't need a fancy pitch. It needs the right people, a clear head, and the honesty to tell clients what they actually need."
      />

      <div className="mx-auto mt-12 grid w-full max-w-5xl gap-4 sm:mt-14 md:gap-5">
        {/* Row 1: photo carousel + featured card, same height */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <div className="relative min-h-[260px] overflow-hidden rounded-3xl border border-line shadow-sm md:min-h-[340px]">
            <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
              <div className="flex h-full touch-pan-y">
                {pictures.map((picture, index) => (
                  <div key={picture.src} className="relative h-full min-w-0 flex-[0_0_100%]">
                    <Image
                      src={picture.src}
                      alt={picture.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 512px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-line/80 bg-[#faf9f6] p-7 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-accent hover:shadow-[0_12px_28px_rgba(255,106,31,0.08)]">
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent">
              <FeaturedIcon size={26} />
            </span>
            <h3 className="font-heading text-2xl font-bold text-ink sm:text-3xl">{featured.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base font-normal">{featured.text}</p>
          </div>
        </div>

        {/* Row 2: three equal cards, full width */}
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {others.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group flex min-w-0 flex-col rounded-3xl border border-line/80 bg-[#faf9f6] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_12px_28px_rgba(255,106,31,0.08)]"
              >
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="font-heading text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted font-normal">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
