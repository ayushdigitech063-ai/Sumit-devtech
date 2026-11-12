"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Briefcase,
  Clock,
  Sparkles,
  CheckCircle2,
  Mail,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Container from "@/app/ui/Container";
import SectionHeading from "@/app/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { careerData, applyHref, CAREERS_EMAIL, type CareerData } from "@/data/career-data";
import { PerkIcon, fadeUp } from "./Career-Shared";
import CareerApplyModal from "./CareerApplyModal";

interface JobOpeningItem {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  requirements?: string[];
  responsibilities?: string[];
  isOpen?: boolean;
}

// Template 2 - Managed light theme: white / off-white cream sections with modern cards
export default function CareerTemplateTwo({ data = careerData }: { data?: CareerData }) {
  const reduce = useReducedMotion();
  const [openings, setOpenings] = useState<JobOpeningItem[]>([]);
  const [loadingOpenings, setLoadingOpenings] = useState(true);
  const [dept, setDept] = useState("All");

  // Modal State for instant apply without leaving page
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpeningItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch live openings from Backend API
  useEffect(() => {
    async function loadBackendOpenings() {
      try {
        const res = await fetch("/api/careers/openings", { cache: "no-store" });
        const result = await res.json();
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          // Filter only active open positions
          const activeJobs = result.data.filter((j: any) => j.isOpen !== false);
          setOpenings(activeJobs);
        } else {
          // Fallback to careerData if backend is still initializing
          setOpenings(data.openings.map((o) => ({ ...o, _id: o.id })));
        }
      } catch (err) {
        console.error("Failed to fetch openings:", err);
        setOpenings(data.openings.map((o) => ({ ...o, _id: o.id })));
      } finally {
        setLoadingOpenings(false);
      }
    }
    loadBackendOpenings();
  }, [data.openings]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResumeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const departments = [
    "All",
    ...Array.from(new Set(openings.map((o) => o.department).filter(Boolean))),
  ];

  const filteredJobs = dept === "All" ? openings : openings.filter((o) => o.department === dept);

  const handleOpenApplyModal = (job: JobOpeningItem) => {
    setSelectedJobForModal(job);
    setIsModalOpen(true);
  };

  return (
    <main className="bg-white text-ink">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#10131e] via-[#141826] to-[#191e2f] text-white pt-36 pb-24 md:pt-40 md:pb-28 min-h-[75vh] flex items-center border-b border-white/10">
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.04] overflow-hidden z-0"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute right-0 -top-32 h-[520px] w-[520px] animate-blob rounded-full bg-accent/25 opacity-70 blur-[130px] overflow-hidden" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-[460px] w-[460px] animate-blob rounded-full bg-amber-400/20 opacity-60 blur-[120px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-blue-500/15 blur-[140px]" />

        <Container className="relative z-10 w-full">
          <div className="relative mx-auto max-w-[1000px] text-center flex flex-col items-center">
            <motion.span
              {...fadeUp(reduce)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {data.hero.badge}
            </motion.span>

            <motion.h1
              {...fadeUp(reduce, 1)}
              className="mt-6 font-heading text-4xl sm:text-5xl md:text-5xl lg:text-[3.75rem] font-bold tracking-tight leading-[1.12] text-white max-w-4xl"
            >
              {data.hero.title} <span className="text-brand">{data.hero.highlight}</span>
            </motion.h1>

            <motion.p {...fadeUp(reduce, 2)} className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white/80">
              {data.hero.text}
            </motion.p>

            <motion.div {...fadeUp(reduce, 3)} className="mt-9 flex flex-wrap justify-center items-center gap-4 relative">
              <a
                href="#openings"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-heading font-bold text-white shadow-lg shadow-accent/25 hover:shadow-accent/40 transition hover:scale-105"
              >
                See open roles <ArrowRight size={16} />
              </a>

              {/* Resume Dropdown Button with WhatsApp & Email options */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setResumeDropdownOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-heading font-semibold text-white/90 backdrop-blur-md transition hover:border-white/40 hover:bg-white/10"
                >
                  <span>Send your resume</span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${resumeDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {resumeDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 w-64 rounded-2xl border border-white/15 bg-[#14151a]/95 p-2 shadow-2xl backdrop-blur-2xl z-50 text-left"
                    >
                      <a
                        href="https://wa.me/917976865261?text=Hi%20Sumit%20DevTech%2C%20I%20want%20to%20apply%20for%20a%20career%20opportunity."
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setResumeDropdownOpen(false)}
                        className="group/item flex items-center gap-3 rounded-xl p-3 text-xs font-semibold text-white/90 transition-all hover:bg-emerald-500/15 hover:text-white"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">
                          <FaWhatsapp size={18} />
                        </div>
                        <div>
                          <div className="font-heading font-bold text-sm text-white">WhatsApp HR</div>
                          <div className="text-[11px] text-white/50 font-normal">+91 79768 65261</div>
                        </div>
                      </a>

                      <a
                        href={applyHref()}
                        onClick={() => setResumeDropdownOpen(false)}
                        className="group/mail flex items-center gap-3 rounded-xl p-3 text-xs font-semibold text-white/90 transition-all hover:bg-accent/15 hover:text-white mt-1 border-t border-white/5 pt-2"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent group-hover/mail:bg-accent group-hover/mail:text-white transition-colors">
                          <Mail size={17} />
                        </div>
                        <div>
                          <div className="font-heading font-bold text-sm text-white">Send via Email</div>
                          <div className="text-[11px] text-white/50 font-normal">{CAREERS_EMAIL}</div>
                        </div>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ---------- Perks Section ---------- */}
      <section className="relative overflow-hidden border-t border-line/60 bg-[#f7f6f3] py-20 md:py-28 text-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px]"
        />
        <Container className="relative z-10">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading
              center
              label={data.perksSection.label}
              title={data.perksSection.title}
              text={data.perksSection.text}
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.perks.map((perk, i) => (
                <motion.div
                  key={perk.id}
                  {...fadeUp(reduce, i)}
                  className="group relative overflow-hidden rounded-3xl border border-line bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-accent/40"
                >
                  <span className="absolute right-6 top-4 font-heading text-6xl font-bold text-dark/[0.05]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent transition group-hover:bg-brand group-hover:text-white">
                    <PerkIcon name={perk.icon} />
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-bold text-ink">{perk.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{perk.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Open roles (Backend Driven + Instant Modal Apply) ---------- */}
      <section id="openings" className="bg-white py-20 text-ink md:py-28 border-t border-line/50">
        <Container>
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading
              center
              label={data.openingsSection.label}
              title={data.openingsSection.title}
              text={data.openingsSection.text}
            />

            {/* Department filter */}
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {departments.map((d) => (
                <button
                  key={d}
                  onClick={() => setDept(d)}
                  aria-pressed={dept === d}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-xs sm:text-sm font-heading font-bold transition-all duration-300",
                    dept === d
                      ? "border-dark bg-dark text-white shadow-md shadow-black/15 scale-102"
                      : "border-line bg-[#f7f6f3] text-muted hover:border-dark/40 hover:text-dark hover:bg-white"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Redesigned Job Cards in Single Row Layout */}
            <div className="mt-12 flex flex-col gap-6">
              {loadingOpenings ? (
                <div className="py-16 text-center">
                  <Loader2 size={32} className="animate-spin text-accent mx-auto mb-3" />
                  <p className="text-sm text-muted">Fetching latest job openings...</p>
                </div>
              ) : filteredJobs.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-line bg-[#f7f6f3] p-8 text-center text-muted">
                  No open roles right now in this department. Send your resume to {CAREERS_EMAIL}.
                </p>
              ) : (
                filteredJobs.map((job, i) => (
                  <motion.article
                    key={job._id || job.id || i}
                    {...fadeUp(reduce, i)}
                    className="group relative flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 sm:gap-8 rounded-3xl border border-line/80 bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_16px_36px_rgba(255,106,31,0.12)] overflow-hidden"
                  >
                    {/* Left & Middle Column Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-accent">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                          {job.department}
                        </span>
                        <span className="text-xs font-semibold text-muted/70">
                          {job.type} • {job.location}
                        </span>
                      </div>

                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-ink tracking-tight group-hover:text-accent transition-colors">
                        {job.title}
                      </h3>

                      {/* Meta Badges Row */}
                      <div className="mt-3 flex flex-wrap items-center gap-2.5 text-xs text-muted">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f7f6f3] px-3 py-1 font-medium text-ink/80">
                          <MapPin size={13} className="text-accent" /> {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f7f6f3] px-3 py-1 font-medium text-ink/80">
                          <Briefcase size={13} className="text-accent" /> {job.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f7f6f3] px-3 py-1 font-medium text-ink/80">
                          <Clock size={13} className="text-accent" /> {job.experience}
                        </span>
                      </div>

                      <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-muted max-w-3xl">
                        {job.summary}
                      </p>

                      {/* Key Requirements Highlights in flex wrap row */}
                      {job.requirements && job.requirements.length > 0 && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {job.requirements.slice(0, 3).map((r, rIdx) => (
                            <span
                              key={rIdx}
                              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-light/70 px-3 py-1 text-[11px] font-medium text-ink/80"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                              {r}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Column Action: Modal Trigger on Current Page */}
                    <div className="flex lg:flex-col items-center justify-between lg:justify-center gap-4 lg:pl-6 lg:border-l lg:border-line/60 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenApplyModal(job)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-heading font-bold text-white shadow-md shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 hover:scale-105 shrink-0"
                      >
                        Apply Now
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenApplyModal(job)}
                        aria-label={`Apply for ${job.title}`}
                        className="hidden lg:grid h-10 w-10 place-items-center rounded-2xl bg-light text-dark shadow-sm transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:rotate-45"
                      >
                        <ArrowUpRight size={18} />
                      </button>
                    </div>
                  </motion.article>
                ))
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Hiring Process Roadmap ---------- */}
      <section className="relative overflow-hidden border-t border-line/60 bg-[#f7f6f3] py-20 text-ink md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px]"
        />
        <Container className="relative z-10">
          <div className="mx-auto max-w-[1240px]">
            <SectionHeading
              center
              label={data.processSection.label}
              title={data.processSection.title}
              text={data.processSection.text}
            />

            <div className="mt-16 relative">
              <div 
                aria-hidden="true"
                className="hidden lg:block pointer-events-none absolute left-[12%] right-[12%] top-7 z-0 h-[3px] border-t-2 border-dashed border-accent/40"
              />

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
                {data.process.map((step, i) => (
                  <motion.div
                    key={step.id}
                    {...fadeUp(reduce, i)}
                    className="group relative flex flex-col items-center text-center"
                  >
                    <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white border-2 border-dashed border-accent p-1 shadow-md shadow-accent/15 transition-all duration-500 group-hover:border-solid group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/30">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-tr from-accent to-accent-2 text-white font-heading font-black text-lg shadow-inner">
                        {String(i + 1).padStart(2, "0")}
                      </div>

                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                      </span>
                    </div>

                    <div className="w-full flex-1 rounded-3xl border border-line/80 bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:border-accent/50 group-hover:shadow-[0_12px_28px_rgba(255,106,31,0.10)] flex flex-col justify-between">
                      <div>
                        <span className="inline-block mb-3 px-3 py-1 rounded-full bg-accent/10 text-[10px] font-extrabold uppercase tracking-widest text-accent">
                          Step 0{i + 1}
                        </span>
                        
                        <h3 className="font-heading text-xl font-bold text-ink mb-2.5 group-hover:text-accent transition-colors">
                          {step.title}
                        </h3>
                        
                        <p className="text-xs sm:text-sm text-muted font-normal leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-line/50 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-muted">
                        <CheckCircle2 size={13} className="text-accent" />
                        <span>Stage {i + 1} Completed</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Instant Apply Modal (No Page Redirection) ---------- */}
      <CareerApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJobForModal}
      />
    </main>
  );
}
