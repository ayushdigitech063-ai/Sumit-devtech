"use client";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Send,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Copy,
  Check,
  Building2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Container from "@/app/ui/Container";
import Reveal from "@/app/animation/Reveal";
import { site } from "@/data/site";
import { z } from "zod";
import { submitLead } from "@/lib/leads-api";

const servicesList = [
  "Website Design & UI/UX",
  "React & Next.js App",
  "WordPress Development",
  "Shopify / E-Commerce",
  "Custom Web Application",
  "Mobile App Development",
  "SEO & Digital Marketing",
  "Support & Maintenance",
];

const budgetRanges = [
  "₹25k - ₹50k",
  "₹50k - ₹1.5 Lakh",
  "₹1.5L - ₹5 Lakh",
  "₹5 Lakh+ / Enterprise",
];

const countryCodes = [
  { label: "🇮🇳 IN +91", value: "+91" },
  { label: "🇺🇸 US +1", value: "+1" },
  { label: "🇬🇧 UK +44", value: "+44" },
  { label: "🇦🇪 UAE +971", value: "+971" },
  { label: "🇸🇦 SA +966", value: "+966" },
  { label: "🇦🇺 AU +61", value: "+61" },
  { label: "🇩🇪 DE +49", value: "+49" },
  { label: "🇨🇦 CA +1", value: "+1" },
  { label: "🇸🇬 SG +65", value: "+65" },
];

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().optional(),
  email: z.string().trim().email("Please enter a valid email address"),
  countryCode: z.string().min(1, "Country code is required"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^\d{7,15}$/, "Phone number must be 7 to 15 digits"),
  message: z.string().trim().min(5, "Please write at least 5 characters"),
  services: z.string().optional(),
  budget: z.string().optional(),
});

type Errors = Partial<
  Record<
    "firstName" | "lastName" | "email" | "phone" | "message" | "services" | "budget",
    string
  >
>;

const contactFaqs = [
  {
    q: "How fast will your team respond to my inquiry?",
    a: "We review and respond to every message within 2 to 4 business hours. If you need urgent assistance, you can reach out via WhatsApp or call us directly.",
  },
  {
    q: "Do you sign a Non-Disclosure Agreement (NDA)?",
    a: "Yes, 100%. We take client confidentiality and intellectual property very seriously and routinely execute NDAs before project discovery and scope discussions.",
  },
  {
    q: "Can you take over or modernize an existing website or app?",
    a: "Absolutely. We specialize in modernizing legacy codebases, migrating WordPress/PHP to Next.js/React, improving performance, and taking over ongoing technical support.",
  },
  {
    q: "What is your typical project delivery process?",
    a: "We follow a 4-step agile workflow: 1) Requirements & Architecture, 2) Interactive Figma Prototyping, 3) Sprint-based Development & Testing, 4) Production Launch & 60-Day Post-Launch Warranty.",
  },
];

export default function ContactUsPage() {
  const [selectedService, setSelectedService] = useState(servicesList[0]);
  const [selectedBudget, setSelectedBudget] = useState(budgetRanges[1]);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const readForm = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    return {
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      email: fd.get("email"),
      countryCode: fd.get("countryCode"),
      phone: fd.get("phone"),
      message: fd.get("message"),
      services: selectedService,
      budget: selectedBudget,
    };
  };

  const validateForm = (raw: any): Errors => {
    const fieldErrors: Errors = {};
    try {
      contactSchema.parse(raw);
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.issues.forEach((issue) => {
          const key = issue.path[0] as keyof Errors;
          if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
        });
      }
    }
    return fieldErrors;
  };

  const touched = useRef<Set<string>>(new Set());
  const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const name = e.target.name;
    touched.current.add(name);
    const all = validateForm(readForm(e.currentTarget));
    const visible: Errors = {};
    (Object.keys(all) as (keyof Errors)[]).forEach((k) => {
      if (touched.current.has(k)) visible[k] = all[k];
    });
    setErrors(visible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const raw = readForm(e.currentTarget);
    const all = validateForm(raw);
    setErrors(all);
    if (Object.keys(all).length) return;

    setLoading(true);
    try {
      const fullName = [raw.firstName, raw.lastName].filter(Boolean).join(" ");
      await submitLead({
        name: fullName || "Contact Client",
        email: String(raw.email || ""),
        phone: String(raw.phone || ""),
        countryCode: String(raw.countryCode || "+91"),
        service: selectedService,
        source: "contact_form",
        message: String(raw.message || ""),
        metadata: {
          firstName: raw.firstName,
          lastName: raw.lastName,
          service: selectedService,
          budget: selectedBudget,
        },
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

  const contactFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: contactFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#fafafc] text-slate-800">
      {/* FAQ Schema for Search Engine Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqSchema) }}
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Sleek modern dark header with radiant ambient glows      */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#0d1017] text-white pt-36 pb-20 md:pt-42 md:pb-28 border-b border-white/10">
        <div className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-orange-500/15 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-32 left-10 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[130px]" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <Container className="relative z-10 w-full text-center">
          <div className="mx-auto max-w-3xl">
            {/* Main Page Title - Single H1 */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Get in Touch{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                with Our Team
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Have an ambitious project in mind or need expert technical consultation? Reach out to discuss your scope, request a custom quote, or explore engineering solutions.
            </p>

            {/* Quick Trust Highlights Strip */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5">
                <Clock size={14} className="text-orange-400" />
                <span>&lt; 2hr Response Time</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>100% NDA Protected</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5">
                <Award size={14} className="text-amber-400" />
                <span>4.9★ Google Rating</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT: Split Form + Sidebar Action Cards                       */}
      {/* ========================================================================= */}
      <section className="relative -mt-10 pb-20 md:pb-28 z-20">
        <Container>
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:gap-10 items-start">
            
            {/* FORM CARD */}
            <Reveal>
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-9 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden">
                <div className="mb-7 pb-5 border-b border-slate-100">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Send us a message
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Fill out the form below and our engineering team will get back to you within 24 hours.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid min-h-[420px] place-items-center text-center py-10"
                    >
                      <div className="max-w-md mx-auto">
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 18,
                            delay: 0.1,
                          }}
                          className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-md shadow-emerald-500/10"
                        >
                          <CheckCircle2 size={44} />
                        </motion.span>
                        <h3 className="mb-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                          Thank you! We received your inquiry.
                        </h3>
                        <p className="mb-6 text-sm text-slate-600 leading-relaxed">
                          Your message has been assigned to our lead architect. You will receive a technical brief and consultation schedule within 24 hours.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => setSent(false)}
                            className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                          >
                            Send Another Message
                          </button>
                          <a
                            href={site.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-6 py-3 font-bold text-xs sm:text-sm text-white shadow-md transition"
                          >
                            <FaWhatsapp size={16} />
                            <span>Chat on WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      noValidate
                      onSubmit={handleSubmit}
                      onBlur={handleBlur}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* SERVICE SELECTION CHIPS */}
                      <div>
                        <label className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                          What service do you need? <span className="text-orange-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {servicesList.map((svc) => {
                            const isSelected = selectedService === svc;
                            return (
                              <button
                                key={svc}
                                type="button"
                                onClick={() => setSelectedService(svc)}
                                className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                                  isSelected
                                    ? "bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-500/30 scale-[1.02]"
                                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-orange-300 hover:bg-orange-50/40"
                                }`}
                              >
                                {svc}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* NAME FIELDS */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                            First Name <span className="text-orange-500">*</span>
                          </label>
                          <input
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            autoComplete="given-name"
                            aria-invalid={!!errors.firstName}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                          />
                          {errors.firstName && (
                            <p className="mt-1 text-xs text-red-600 font-medium">{errors.firstName}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="lastName" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            autoComplete="family-name"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                          />
                        </div>
                      </div>

                      {/* EMAIL FIELD */}
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Work Email Address <span className="text-orange-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@company.com"
                          autoComplete="email"
                          aria-invalid={!!errors.email}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
                        )}
                      </div>

                      {/* PHONE WITH COUNTRY CODE */}
                      <div>
                        <label htmlFor="phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Phone Number <span className="text-orange-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select
                            name="countryCode"
                            defaultValue="+91"
                            aria-label="Country code"
                            className="w-[125px] shrink-0 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3 text-xs sm:text-sm font-semibold text-slate-800 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 cursor-pointer"
                          >
                            {countryCodes.map((c) => (
                              <option key={c.label} value={c.value}>
                                {c.label}
                              </option>
                            ))}
                          </select>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            inputMode="numeric"
                            placeholder="98765 43210"
                            autoComplete="tel-national"
                            aria-invalid={!!errors.phone}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                            onChange={(e) => {
                              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
                            }}
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>
                        )}
                      </div>

                      {/* ESTIMATED BUDGET RANGE */}
                      <div>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Estimated Budget (Optional)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {budgetRanges.map((b) => {
                            const isSelected = selectedBudget === b;
                            return (
                              <button
                                key={b}
                                type="button"
                                onClick={() => setSelectedBudget(b)}
                                className={`rounded-xl py-2 px-2.5 text-center text-xs font-semibold transition border cursor-pointer ${
                                  isSelected
                                    ? "bg-orange-50 text-orange-600 border-orange-500 ring-2 ring-orange-500/20"
                                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {b}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* MESSAGE TEXTAREA */}
                      <div>
                        <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Project Brief & Details <span className="text-orange-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Tell us about your project requirements, target timeline, features, or current challenges..."
                          aria-invalid={!!errors.message}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 resize-none"
                        />
                        {errors.message && (
                          <p className="mt-1 text-xs text-red-600 font-medium">{errors.message}</p>
                        )}
                      </div>

                      {/* SUBMIT BUTTON */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-4 font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-orange-500/35 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer text-sm sm:text-base active:scale-[0.99]"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Sending Your Brief...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Inquiry & Get Proposal</span>
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                        <ShieldCheck size={14} className="text-emerald-600" />
                        <span>Your data is strictly confidential. We never spam.</span>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* SIDEBAR CARDS */}
            <Reveal delay={0.15}>
              <div className="space-y-5">
                {/* 1. WHATSAPP CARD */}
                <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/40 via-white to-white p-6 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                        <FaWhatsapp size={22} />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">Direct WhatsApp</h3>
                        <p className="text-xs text-emerald-700 font-medium">Quick 15-minute response</p>
                      </div>
                    </div>
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Prefer direct messaging? Chat directly with our solutions architect for quick technical answers and estimates.
                  </p>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs py-3 px-4 transition shadow-sm active:scale-[0.98]"
                  >
                    <span>Open WhatsApp Chat</span>
                    <ExternalLink size={14} />
                  </a>
                </div>

                {/* 2. DIRECT CALL CARD */}
                <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-50 text-orange-600 border border-orange-100">
                      <Phone size={20} />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Call Us Directly</h3>
                      <p className="text-xs text-slate-500">Mon - Sat, 9:00 AM - 8:00 PM IST</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 mt-4">
                    {site.phones.map((p, idx) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/-/g, "")}`}
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs font-bold text-slate-800 hover:border-orange-300 hover:bg-orange-50/30 transition group"
                      >
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-medium">
                            {idx === 0 ? "Founder & Tech Lead" : "Sales & Marketing Team"}
                          </span>
                          <span className="text-sm font-semibold text-slate-900 group-hover:text-orange-600">
                            {p}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-orange-600 bg-orange-100/80 px-2.5 py-1 rounded-lg">
                          Call
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* 3. EMAIL & OFFICE LOCATION CARD */}
                <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md transition space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Mail size={14} className="text-orange-500" />
                        <span>Official Email</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="text-[11px] font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedEmail ? (
                          <>
                            <Check size={12} /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={12} /> Copy
                          </>
                        )}
                      </button>
                    </div>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-sm font-bold text-slate-900 hover:text-orange-600 transition block"
                    >
                      {site.email}
                    </a>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      <MapPin size={14} className="text-orange-500" />
                      <span>Development Headquarters</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {site.address}
                    </p>
                    <a
                      href={mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* 4. CLIENT ASSURANCE BADGE BOX */}
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-5 text-slate-700">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                    What Happens Next?
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">1.</span>
                      <span>Review: We analyze your requirements and existing tech stack.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">2.</span>
                      <span>Discovery Call: A 20-min session to lock down scope and milestones.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">3.</span>
                      <span>Custom Proposal: Transparent quote, timeline, and tech architecture.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE MAP & HEADQUARTERS PREVIEW                                */}
      {/* ========================================================================= */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="mx-auto max-w-[1180px] rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] items-stretch">
              <div className="p-8 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-[#181c26] text-white">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-orange-400 mb-4 border border-white/10">
                    <Building2 size={13} />
                    <span>Jaipur Headquarters</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
                    Visit Our Development Center
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    We welcome clients, founders, and partners to our Jaipur studio for face-to-face project planning and architecture workshops.
                  </p>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <MapPin size={16} className="text-orange-400 shrink-0 mt-0.5" />
                      <span>{site.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock size={16} className="text-orange-400 shrink-0" />
                      <span>Monday to Saturday: 9:00 AM – 8:00 PM IST</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-2.5 text-xs font-bold text-white transition shadow-sm"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Embedded Map */}
              <div className="h-[300px] md:h-auto min-h-[300px] w-full bg-slate-100 relative">
                <iframe
                  title="Website Development Company 4U Location"
                  src="https://maps.google.com/maps?q=Mansarovar%20Sector%206,%20Jaipur,%20Rajasthan%20302020&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. FREQUENTLY ASKED QUESTIONS (FAQ H2 -> H3 -> P Hierarchy)              */}
      {/* ========================================================================= */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2 block">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Inquiries
              </h2>
            </div>

            <div className="space-y-3">
              {contactFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-900 hover:text-orange-600 transition cursor-pointer text-sm sm:text-base"
                    >
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900 m-0">
                        {faq.q}
                      </h3>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
                          isOpen ? "rotate-180 text-orange-600" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        <p className="m-0 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
