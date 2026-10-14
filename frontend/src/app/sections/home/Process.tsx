import Image from "next/image";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import { process } from "@/data/process";

export default function Process() {
  return (
    <Section id="process" light>
      <SectionHeading
        center
        label="Work Process"
        title={<>Our Proven Process to Deliver <span className="text-brand">Successful Digital Solutions</span></>}
        text="We don't jump straight into designing. Every project goes through a proper process - so nothing gets missed, and you know what's happening at every step."
      />
      <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="absolute left-[12%] right-[12%] top-88px hidden border-t-2 border-dashed border-accent/40 lg:block" />
        {process.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.12}>
            <div className="group relative h-full rounded-3xl bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/15">
              <div className="relative mb-5 overflow-hidden rounded-2xl" style={{ aspectRatio: "4 / 3" }}>
                <Image src={p.image} alt={p.title} fill sizes="(min-width:1024px) 280px, 90vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-brand font-heading font-extrabold text-white">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold">{p.title}</h3>
              <p className="text-sm text-muted">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}