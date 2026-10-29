"use client";

import React from "react";
import { CheckCircle2, ArrowDown, MapPin, Briefcase, Clock, Sparkles } from "lucide-react";
import Container from "@/app/ui/Container";
import type { Opening, HiringStep } from "@/data/career-data";

export interface JobDetailsSectionProps {
  job: Opening;
  process: HiringStep[];
}

export default function JobDetailsSection({ job, process }: JobDetailsSectionProps) {
  return (
    <section className="relative bg-white py-16 md:py-24 border-t border-line">
      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Column: Role Details & Hiring Process */}
            <div className="lg:col-span-8 space-y-12">
              {/* About the Role */}
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                  <i className="h-0.5 w-6 bg-brand" /> Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                  About the Role
                </h2>
                <p className="text-base leading-relaxed text-muted">
                  {job.summary}
                </p>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-ink">
                    Responsibilities
                  </h3>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-muted">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <CheckCircle2 size={13} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What We Look For (Requirements) */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-ink">
                    What We Look For
                  </h3>
                  <ul className="space-y-3">
                    {job.requirements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-muted">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-2/20 text-accent-2">
                          <CheckCircle2 size={13} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nice to Have (if present) */}
              {job.niceToHave && job.niceToHave.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-ink">
                    Nice to Have
                  </h3>
                  <ul className="space-y-3">
                    {job.niceToHave.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-muted">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-dark/10 text-dark">
                          <CheckCircle2 size={13} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 4-Step Hiring Process */}
              {process && process.length > 0 && (
                <div className="space-y-6 pt-8 border-t border-line">
                  <div>
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                      <i className="h-0.5 w-6 bg-brand" /> Roadmap
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-ink mt-2">
                      Our Hiring Process
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {process.map((step, idx) => (
                      <div
                        key={step.id}
                        className="rounded-2xl border border-line bg-light/50 p-5 transition hover:border-accent/40 hover:bg-light"
                      >
                        <span className="font-heading text-2xl font-black text-accent">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-heading text-base font-bold text-ink mt-2">
                          {step.title}
                        </h4>
                        <p className="text-xs leading-relaxed text-muted mt-1">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Quick-Facts Card */}
            <div className="lg:col-span-4">
              <aside className="sticky top-28 rounded-3xl border border-line bg-light/70 p-6 sm:p-7 backdrop-blur-md shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-accent">
                  <Sparkles size={14} />
                  <span>Position Summary</span>
                </div>

                <h3 className="font-heading text-xl font-bold text-ink mb-6">
                  {job.title}
                </h3>

                <dl className="space-y-4 border-y border-line/80 py-5 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-muted">
                      <MapPin size={16} className="text-accent" />
                      <span>Location</span>
                    </dt>
                    <dd className="font-semibold text-ink text-right">{job.location}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-muted">
                      <Briefcase size={16} className="text-accent-2" />
                      <span>Job Type</span>
                    </dt>
                    <dd className="font-semibold text-ink">{job.type}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-muted">
                      <Clock size={16} className="text-accent" />
                      <span>Experience</span>
                    </dt>
                    <dd className="font-semibold text-ink">{job.experience}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-muted">
                      <Sparkles size={16} className="text-emerald-500" />
                      <span>Department</span>
                    </dt>
                    <dd className="font-semibold text-ink">{job.department}</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <a
                    href="#apply"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-accent/25 transition duration-200 hover:-translate-y-0.5"
                  >
                    <span>Apply for this role</span>
                    <ArrowDown size={16} />
                  </a>
                  <p className="mt-3 text-center text-[11px] text-muted">
                    Fast review cycle. Applications reviewed within 48 hours.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

