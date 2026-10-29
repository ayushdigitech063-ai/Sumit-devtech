"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Container from "@/app/ui/Container";
import SectionHeading from "@/app/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { careerData, applyHref, CAREERS_EMAIL, type CareerData } from "@/data/career-data";
import { PerkIcon, JobMeta, getDepartments, fadeUp } from "./Career-Shared";

// Template 2 - Dark: split hero with stat tiles, numbered perks, job cards in a grid
export default function CareerTemplateTwo({ data = careerData }: { data?: CareerData }) {
  const reduce = useReducedMotion();
  const departments = getDepartments(data.openings);
  const [dept, setDept] = useState("All");

  const jobs = dept === "All" ? data.openings : data.openings.filter((o) => o.department === dept);

  return (
    <main className="bg-dark text-white">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-24 md:pt-28">
        <Container>
          <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-2">
            <div>
              <motion.span
                {...fadeUp(reduce)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {data.hero.badge}
              </motion.span>

              <motion.h1
                {...fadeUp(reduce, 1)}
                className="mt-6 font-bold tracking-tight sm:text-3xl lg:text-5xl"
              >
                {data.hero.title} <span className="text-accent">{data.hero.highlight}</span>
              </motion.h1>

              <motion.p {...fadeUp(reduce, 2)} className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                {data.hero.text}
              </motion.p>

              <motion.div {...fadeUp(reduce, 3)} className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#openings"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-dark transition hover:opacity-90"
                >
                  See open roles <ArrowRight size={16} />
                </a>
                <a
                  href={applyHref()}
                  className="inline-flex items-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold transition hover:border-accent hover:text-accent"
                >
                  Send your resume
                </a>
              </motion.div>
            </div>

            {/* Stat tiles, the second column sits lower */}
            <div className="grid grid-cols-2 gap-4">
              {data.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  {...fadeUp(reduce, i)}
                  className={cn(
                    "rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl",
                    i % 2 === 1 && "mt-8"
                  )}
                >
                  <p className="font-heading text-4xl font-bold text-accent sm:text-5xl">{s.value}</p>
                  <p className="mt-2 text-sm text-white/60">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Perks ---------- */}
      <section className="border-t border-white/5 bg-dark-2 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading
              center
              dark
              label={data.perksSection.label}
              title={data.perksSection.title}
              text={data.perksSection.text}
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.perks.map((perk, i) => (
                <motion.div
                  key={perk.id}
                  {...fadeUp(reduce, i)}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-dark p-8 transition hover:border-accent/50"
                >
                  <span className="absolute right-6 top-4 font-heading text-6xl font-bold text-white/[0.06]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-accent transition group-hover:bg-accent group-hover:text-dark">
                    <PerkIcon name={perk.icon} />
                  </div>
                  <h3 className="relative mt-6 font-heading text-xl font-bold">{perk.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-white/60">{perk.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Open positions ---------- */}
      <section id="openings" className="scroll-mt-24 bg-slate-50 py-16 text-dark md:py-24">
        <Container>
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading
              center
              label={data.openingsSection.label}
              title={data.openingsSection.title}
              text={data.openingsSection.text}
            />

            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {departments.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDept(d)}
                  aria-pressed={dept === d}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm font-medium transition",
                    dept === d
                      ? "border-dark bg-dark text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-dark/40"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {jobs.length === 0 && (
                <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 md:col-span-2">
                  No open roles right now. Send your resume to {CAREERS_EMAIL}.
                </p>
              )}

              {jobs.map((job, i) => (
                <motion.article
                  key={job.id}
                  {...fadeUp(reduce, i % 2)}
                  className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full bg-dark/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-dark/70">
                      {job.department}
                    </span>
                    <Link
                      href={`/career/${job.slug}#apply`}
                      aria-label={`Apply for ${job.title}`}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 text-dark transition group-hover:border-dark group-hover:bg-dark group-hover:text-white"
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>

                  <h3 className="mt-5 font-heading text-2xl font-bold">{job.title}</h3>
                  <JobMeta job={job} className="mt-2 text-slate-500" />
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{job.summary}</p>

                  <ul className="mt-5 space-y-2 text-sm text-slate-600">
                    {job.requirements.slice(0, 3).map((r) => (
                      <li key={r} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-dark" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/career/${job.slug}#apply`}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-dark"
                  >
                    Apply now <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Hiring process ---------- */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading
              center
              dark
              label={data.processSection.label}
              title={data.processSection.title}
              text={data.processSection.text}
            />
            <div className="mt-12 grid gap-5 md:grid-cols-4">
              {data.process.map((step, i) => (
                <motion.div
                  key={step.id}
                  {...fadeUp(reduce, i)}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <span className="font-heading text-3xl font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-heading text-lg font-bold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Final call ---------- */}
      {/* <section className="px-4 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1200px] rounded-3xl bg-orange-300 px-8 py-14 text-center text-dark md:px-16">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">{data.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-dark/70">{data.cta.text}</p>
          <a
            href={applyHref()}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-dark px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Send your resume <ArrowRight size={16} />
          </a>
        </div>
      </section> */}
    </main>
  );
}