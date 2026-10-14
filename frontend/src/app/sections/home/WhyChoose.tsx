import Image from "next/image";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import { whyChoose } from "@/data/home";

export default function WhyChoose() {
  return (
    <Section id="why-choose" light>
      <SectionHeading
        center
        label="Why Choose"
        title={<>Why Choose <span className="text-brand">Sumit DevTech</span></>}
        text="We don't just build websites. We stick around after the job is done."
      />

      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        {whyChoose.map((item, i) => (
          <Reveal key={item.title} delay={(i % 2) * 0.1} className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl hover:shadow-accent/10 sm:flex-row">
              {/* image thumbnail */}
              <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-auto `sm:min-h-[170px]` sm:w-44">
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

              {/* text */}
              <div className="flex flex-col justify-center p-5 md:p-6">
                <h3 className="mb-1.5 text-lg font-bold md:text-xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.text}</p>
              </div>

              {/* accent line that grows on hover */}
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}