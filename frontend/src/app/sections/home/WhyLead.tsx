import Image from "next/image";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import { whyLead, whyLeadStats, IMG } from "@/data/home";

export default function WhyLead() {
  return (
    <Section id="why-we-lead">
      <SectionHeading
        label="Why We Lead"
        title={<>Leading Website Design & Development Company in <span className="text-brand">Jaipur, India</span></>}
      />
      <div className="grid items-start gap-12 lg:grid-cols-[1.25fr_0.75fr]">
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

        <Reveal className="relative">
          <div className="relative `h-[280px] w-full` overflow-hidden `rounded-[32px]`" style={{aspectRatio : "4/3"}}>
            <Image
              src={`${IMG}/about-image.webp`}
              alt="Leading web development team in Jaipur"
              fill
              sizes="(min-width:1024px) 400px, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 `bg-gradient-to-t` from-dark/70 via-transparent" />
          </div>
          <div className="absolute inset-x-4 bottom-4 grid gap-2">
            {whyLeadStats.map((s) => (
              <div key={s.value} className="rounded-2xl bg-white/95 px-5 py-3 text-sm backdrop-blur">
                <b className="font-heading text-base text-accent">{s.value}</b> <span className="text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}