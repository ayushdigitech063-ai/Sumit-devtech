import Image from "next/image";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import { countries } from "@/data/countries";

export default function GlobalClient() {
  return (
    <Section id="global" dark className="relative overflow-hidden">
      {/* decorative rotating rings */}
      <div className="pointer-events-none absolute -right-40 top-1/2 h-560px w-560px -translate-y-1/2 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-white/15" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-360px w-360px -translate-y-1/2 animate-[spin_28s_linear_infinite_reverse] rounded-full border border-accent/30" />

      <div className="mx-auto w-full max-w-[1100px] px-6">
        <SectionHeading
          dark
          label="Worldwide"
          center={true}
          title={<>We Serve Clients from <span className="text-brand">All Over the World.</span></>}
          text="500+ clients from all over the world - some of them are"
        />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {countries.map((c, i) => (
            <Reveal key={c.code} delay={i * 0.08}>
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-accent">
                <span className="absolute right-4 top-4 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <Image
                  src={`https://flagcdn.com/w80/${c.code}.png`}
                  alt={`${c.name} flag`}
                  width={48}
                  height={36}
                  unoptimized
                  className="mx-auto mb-4 h-9 w-12 rounded object-cover"
                />
                <p className="text-sm font-semibold">{c.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}