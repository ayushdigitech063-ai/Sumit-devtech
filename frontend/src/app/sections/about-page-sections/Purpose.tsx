"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Section from "@/app/ui/Section";
import SectionHeading from "@/app/ui/SectionHeading";
import { Star } from "lucide-react";

export const OUR_PURPOSE = [
  {
    title: "Our Mission",
    icon: Star,
    text: "To build digital solutions that solve real business problems - not just look good in a portfolio. Every project that comes in gets the same attention, whether it's a small local business or a growing brand.",
  },
  {
    title: "Our Vision",
    icon: Star,
    text: "To be the kind of company that clients recommend without being asked. Not the biggest agency in Jaipur - the most reliable one.",
  },
  {
    title: "Our Values",   
    icon: Star,
    text: "Straight communication. No overpromising. Deadlines that are actually met. And when something goes wrong - fix it without excuses.",
  },
  {
    title: "Our Approach",
    icon: Star,
    text: "First, understand the business. Then figure out what the website actually needs to do. Design and development come after that - not before.",
  },
];

export const TEAM_PICTURES = [
  {
    src: "/images/aboutPage/group_photo_1.png",
    alt: "picture of our team",
  },
  {
    src: "/images/aboutPage/group_photo_2.png",
    alt: "picture of our team",
  },
  {
    src: "/images/aboutPage/group_photo_3.png",
    alt: "picture of our team",
  },
  {
    src: "/images/aboutPage/group_photo_4.png",
    alt: "picture of our team",
  },
];

export default function Purpose() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const [featured, ...others] = OUR_PURPOSE;
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
                {TEAM_PICTURES.map((picture, index) => (
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
              <FeaturedIcon size={24} />
            </span>
            <h3 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base font-normal">
              {featured.text}
            </p>
          </div>
        </div>

        {/* Row 2: remaining 3 purpose cards */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {others.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col rounded-3xl border border-line bg-white p-7 shadow-xs hover:shadow-md transition duration-300"
              >
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
                  <Icon size={18} />
                </span>
                <h4 className="font-heading text-lg font-bold text-slate-900">
                  {item.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
