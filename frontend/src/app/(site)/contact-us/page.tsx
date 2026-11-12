"use client";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, MessageSquare, Send, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Container from "@/app/ui/Container";
import Reveal from "@/app/animation/Reveal";
import { site } from "@/data/site";
import { z } from "zod";
import { submitLead } from "@/lib/leads-api";

const services = [
  "Website Design & UI/UX",
  "WordPress Development",
  "Shopify / E-Commerce Store",
  "Next.js / React Web App",
  "Custom Web Application",
  "Website Maintenance & Support",
  "SEO & Digital Marketing",
  "Other / Custom Requirement",
];

const countryCodes = [
  { label: "IN +91", value: "+91" },
  { label: "US +1", value: "+1" },
  { label: "UK +44", value: "+44" },
  { label: "UAE +971", value: "+971" },
  { label: "SA +966", value: "+966" },
  { label: "AU +61", value: "+61" },
  { label: "DE +49", value: "+49" },
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
});

type Errors = Partial<
  Record<"firstName" | "lastName" | "email" | "phone" | "message" | "services", string>
>;

const fieldCls =
  "w-full rounded-xl border border-line bg-light px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 aria-[invalid=true]:border-red-500";
const labelCls = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700";
const errCls = "mt-1.5 text-xs text-red-600 font-medium";

export default function ContactUsPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const readForm = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    return {
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      email: fd.get("email"),
      countryCode: fd.get("countryCode"),
      phone: fd.get("phone"),
      message: fd.get("message"),
      services: fd.get("services"),
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
      const selectedService = String(raw.services || "General Inquiry");
      const fullName = [raw.firstName, raw.lastName].filter(Boolean).join(" ");
      await submitLead({
        name: fullName || "Contact Client",
        email: String(raw.email || ""),
        phone: String(raw.phone || ""),
        countryCode: String(raw.countryCode || "+91"),
        service: selectedService,
        source: "contact_form",
        message: String(raw.message || ""),
        metadata: { firstName: raw.firstName, lastName: raw.lastName, service: selectedService },
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

  return (
    <main className="min-h-screen bg-[#fbfbfe]">
      {/* Hero Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#10131e] via-[#141826] to-[#191e2f] text-white pt-36 pb-20 md:pt-40 md:pb-24 border-b border-white/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute right-0 -top-32 h-[480px] w-[480px] rounded-full bg-accent/20 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-[400px] w-[400px] rounded-full bg-amber-400/15 blur-[120px]" />

        <Container className="relative z-10 w-full text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Contact Sumit DevTech</span>
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              Get in Touch <span className="text-brand">with Us</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              We are here to assist you. Reach out to discuss your project, get a custom quote, or explore technical solutions.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.3fr_0.85fr] lg:gap-14 items-start">
            {/* Contact Form Card */}
            <Reveal>
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-9 shadow-xl shadow-slate-900/5">
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900">Send us a message</h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid min-h-[380px] place-items-center text-center py-8"
                    >
                      <div>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 16,
                            delay: 0.1,
                          }}
                          className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600 shadow-md shadow-emerald-500/10"
                        >
                          <CheckCircle2 size={44} />
                        </motion.span>
                        <h3 className="mb-2 text-2xl font-bold text-slate-900">Thank you!</h3>
                        <p className="mb-6 text-sm text-slate-600 max-w-sm mx-auto">
                          Your message has been received successfully. Our project manager will reach out shortly.
                        </p>
                        <button
                          type="button"
                          onClick={() => setSent(false)}
                          className="rounded-full bg-brand px-7 py-3 font-semibold text-white shadow-lg shadow-accent/25 transition hover:scale-102"
                        >
                          Send another message
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      noValidate
                      onSubmit={handleSubmit}
                      onBlur={handleBlur}
                      exit={{ opacity: 0 }}
                      className="space-y-4 sm:space-y-5"
                    >
                      {/* Name Fields */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className={labelCls}>
                            First name *
                          </label>
                          <input
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            autoComplete="given-name"
                            aria-invalid={!!errors.firstName}
                            className={fieldCls}
                          />
                          {errors.firstName && <p className={errCls}>{errors.firstName}</p>}
                        </div>
                        <div>
                          <label htmlFor="lastName" className={labelCls}>
                            Last name
                          </label>
                          <input
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            autoComplete="family-name"
                            className={fieldCls}
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className={labelCls}>
                          Email address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@company.com"
                          autoComplete="email"
                          aria-invalid={!!errors.email}
                          className={fieldCls}
                        />
                        {errors.email && <p className={errCls}>{errors.email}</p>}
                      </div>

                      {/* Phone Field */}
                      <div>
                        <label htmlFor="phone" className={labelCls}>
                          Phone number *
                        </label>
                        <div className="flex gap-2.5">
                          <select
                            name="countryCode"
                            defaultValue="+91"
                            aria-label="Country code"
                            className={`${fieldCls} !w-[110px] shrink-0 font-medium`}
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
                            className={fieldCls}
                            onChange={(e) => {
                              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
                            }}
                          />
                        </div>
                        {errors.phone && <p className={errCls}>{errors.phone}</p>}
                      </div>

                      {/* Service Dropdown */}
                      <div>
                        <label htmlFor="services" className={labelCls}>
                          Service required
                        </label>
                        <select
                          id="services"
                          name="services"
                          defaultValue={services[0]}
                          className={`${fieldCls} font-medium cursor-pointer`}
                        >
                          {services.map((svc) => (
                            <option key={svc} value={svc}>
                              {svc}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label htmlFor="message" className={labelCls}>
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Tell us about your project requirements, timeline, budget..."
                          aria-invalid={!!errors.message}
                          className={`${fieldCls} resize-none`}
                        />
                        {errors.message && <p className={errCls}>{errors.message}</p>}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-bold text-white shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 hover:shadow-accent/35 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Sending Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send size={16} />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* Sidebar Contact Info Cards */}
            <Reveal delay={0.15}>
              <div className="space-y-6">
                {/* WhatsApp Card */}
                <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-md shadow-slate-900/5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <FaWhatsapp size={20} />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Chat on WhatsApp</h3>
                      <p className="text-xs text-slate-400">Instant answers from our engineering team</p>
                    </div>
                  </div>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-4 py-2.5 transition shadow-sm"
                  >
                    <span>Open WhatsApp Chat</span>
                    <MessageSquare size={14} />
                  </a>
                </div>

                {/* Direct Call Card */}
                <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-md shadow-slate-900/5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
                      <Phone size={18} />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Call Us Directly</h3>
                      <p className="text-xs text-slate-400">Available Mon - Sat, 9 AM to 8 PM IST</p>
                    </div>
                  </div>
                  <div className="space-y-2 mt-2">
                    {site.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/-/g, "")}`}
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 text-xs font-bold text-slate-800 hover:border-orange-300 hover:bg-orange-50/30 transition"
                      >
                        <span>{p}</span>
                        <span className="text-[10px] font-semibold text-orange-600 bg-orange-100/70 px-2 py-0.5 rounded-md">Call</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Email & Office Card */}
                <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-md shadow-slate-900/5">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        <Mail size={14} className="text-orange-500" />
                        <span>Email Support</span>
                      </div>
                      <a
                        href={`mailto:${site.email}`}
                        className="text-sm font-semibold text-slate-800 hover:text-orange-600 transition"
                      >
                        {site.email}
                      </a>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        <MapPin size={14} className="text-orange-500" />
                        <span>Office Address</span>
                      </div>
                      <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-slate-600 hover:text-orange-600 transition block leading-relaxed"
                      >
                        {site.address}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
