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
    <Section id="purpose-section" dark>
      <SectionHeading
        dark
        center
        label="Our Purpose"
        title={<>Driven by Purpose, <span className="text-brand">Guided by Vision</span></>}
        text="Good work doesn't need a fancy pitch. It needs the right people, a clear head, and the honesty to tell clients what they actually need."
      />

      <div className="mx-auto mt-12 grid w-full max-w-5xl gap-4 sm:mt-14 md:gap-5">
        {/* Row 1: photo carousel + featured card, same height */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <div className="relative min-h-[260px] overflow-hidden rounded-2xl md:min-h-[340px]">
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
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-white/10 bg-dark-2 p-6 shadow-xl md:p-8">
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
              <FeaturedIcon size={26} />
            </span>
            <h3 className="text-xl font-semibold text-white sm:text-2xl">{featured.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">{featured.text}</p>
          </div>
        </div>

        {/* Row 2: three equal cards, full width */}
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {others.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group flex min-w-0 flex-col rounded-2xl border border-white/10 bg-dark-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 md:p-6"
              >
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                  <Icon size={22} />
                </span>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}