"use client";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import { site } from "@/data/site";
import { z } from "zod";

const services = [
  "Website Design",
  "WordPress Development",
  "Shopify Development",
  "E-Commerce Development",
  "Custom Website Development",
  "UI / UX Design",
  "SEO & Digital Marketing",
  "Other",
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
  message: z.string().trim().min(10, "Please write at least 10 characters"),
  services: z.array(z.string()),
});

type Errors = Partial<
  Record<"firstName" | "lastName" | "email" | "phone" | "message", string>
>;

const fieldCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-4 focus:ring-accent/15 aria-[invalid=true]:border-red-500";
const labelCls = "mb-1.5 block text-sm font-semibold text-ink";
const errCls = "mt-1.5 text-xs text-red-600";
const linkCls =
  "inline-flex items-center gap-2 font-semibold underline underline-offset-4 transition hover:text-accent";

export default function ContactUsPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // read the form
  const readForm = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    return {
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      email: fd.get("email"),
      countryCode: fd.get("countryCode"),
      phone: fd.get("phone"),
      message: fd.get("message"),
      services: fd.getAll("services"),
    };
  };

  // validate -> return errors not submmit

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

  // onblur validate individual field
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

  // submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const all = validateForm(readForm(e.currentTarget));
    setErrors(all);
    if (Object.keys(all).length) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

  return (
    <Section id="contact-us" light>
      <SectionHeading
        center
        label="Contact Us"
        title="Get in touch with us"
        text="We are here to assist you. Reach out to us for any inquiries, support, or feedback. Our team is ready to help you with your needs."
      />

      <div className="mx-auto mt-4 grid max-w-5xl gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
        {/* FORM */}
        <Reveal>
          <div className="rounded-3xl border border-line bg-white p-5 shadow-xl shadow-black/5 sm:p-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid min-h-[420px] place-items-center text-center"
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
                      className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-green-100 text-green-600"
                    >
                      <CheckCircle2 size={44} />
                    </motion.span>
                    <h3 className="mb-2 text-2xl font-extrabold">Thank you!</h3>
                    <p className="mb-6 text-muted">
                      Your message has been received. We will get back to you
                      shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="rounded-full border-2 border-accent px-7 py-2.5 font-semibold text-accent transition hover:bg-accent hover:text-white"
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
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className={labelCls}>
                        First name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        autoComplete="given-name"
                        aria-invalid={!!errors.firstName}
                        className={fieldCls}
                      />
                      {errors.firstName && (
                        <p className={errCls}>{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelCls}>
                        Last name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        autoComplete="family-name"
                        className={fieldCls}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelCls}>
                      Email
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

                  <div>
                    <label htmlFor="phone" className={labelCls}>
                      Phone number
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        defaultValue="+91"
                        aria-label="Country code"
                        className={`${fieldCls} !w-[110px] shrink-0`}
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
                          e.currentTarget.value = e.currentTarget.value.replace(
                            /\D/g,
                            "",
                          );
                        }}
                      />
                    </div>
                    {errors.phone && <p className={errCls}>{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className={labelCls}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your project..."
                      aria-invalid={!!errors.message}
                      className={`${fieldCls} resize-none`}
                    />
                    {errors.message && (
                      <p className={errCls}>{errors.message}</p>
                    )}
                  </div>

                  <fieldset>
                    <legend className={labelCls}>Services</legend>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {/* {services.map((s) => (
                        <label
                          key={s}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm transition hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent/5"
                        >
                          <input
                            type="checkbox"
                            name="services"
                            value={s}
                            className="h-4 w-4 accent-accent"
                          />
                          {s}
                        </label>
                      ))} */}
                      <select
                        name="countryCode"
                        defaultValue="+91"
                        aria-label="Country code"
                        className={`${fieldCls} !w-[545px]`}
                      >
                        {services.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </fieldset>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* INFO */}
        <Reveal delay={0.15}>
          <div className="space-y-9 lg:pt-4">
            <div>
              <h3 className="mb-1 text-xl font-bold">Chat with us</h3>
              <p className="mb-4 text-sm text-muted">
                Speak to our friendly team via WhatsApp or email.
              </p>
              <div className="space-y-3 text-sm">
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkCls} block w-fit`}
                >
                  <FaWhatsapp size={17} className="text-accent" /> Chat with us
                  on WhatsApp
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className={`${linkCls} block w-fit`}
                >
                  <Mail size={17} className="text-accent" /> {site.email}
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-1 text-xl font-bold">Call us</h3>
              <p className="mb-4 text-sm text-muted">
                Call our team and talk to us directly.
              </p>
              <div className="space-y-3 text-sm">
                {site.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/-/g, "")}`}
                    className={`${linkCls} block w-fit`}
                  >
                    <Phone size={17} className="text-accent" /> {p}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-1 text-xl font-bold">Visit us</h3>
              <p className="mb-4 text-sm text-muted">
                Chat to us in person at our Jaipur office.
              </p>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm font-semibold underline underline-offset-4 transition hover:text-accent"
              >
                <MapPin size={17} className="mt-0.5 shrink-0 text-accent" />{" "}
                {site.address}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
