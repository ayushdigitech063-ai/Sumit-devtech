import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import Button from "../../ui/Button";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <Section id="projects" dark>
     <SectionHeading dark center={true} label="Our Projects" title={<>Check Out <span className="text-brand">Our Work</span></>} />
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {projects.slice(0, 6).map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.1}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                title="View Live Project"
                className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-500 hover:-translate-y-2 hover:border-accent"
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "16 / 10" }}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 320px, (min-width:640px) 45vw, 100vw"
                    className="object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-dark/80 px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <h3 className="text-base font-bold text-white">{p.title}</h3>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition group-hover:bg-brand">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="mt-12 text-center">
        <Button href="/all-projects">View All Projects &rarr;</Button>
      </div>
    </Section>
  );
}