import Image from "next/image";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import { whyLead} from "@/data/home";

export default function WhyLead() {
  return (
    <Section id="why-we-lead" className="mt-0">
      <SectionHeading
      center
        label="Why We Lead"
        title={<>Leading Website Design & Development Company in <span className="text-brand">Jaipur, India</span></>}
      />
      <div className="mx-auto grid w-full max-w-5xl gap-4 sm:mt-10 md:gap-5">
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
      </div>
    </Section>
  );
}