"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { leadOptions } from "@/data/site";
import { IMG } from "@/data/home";

const perks = ["Custom Development Blueprint", "Personalized Budget Estimate", "Accurate Time-to-Market Projection"];
const partners = ["google-partenrs.png", "meta-partenrs.png", "shopify-partenrs.png"];
const field =
  "w-full rounded-xl border border-line bg-light px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15";

export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const show = () => {
      if (sessionStorage.getItem("exit-popup")) return;
      sessionStorage.setItem("exit-popup", "1");
      setOpen(true);
    };
    const onLeave = (e: MouseEvent) => { if (e.clientY <= 0) show(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const timer = setTimeout(show, 60000);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send the form data to your backend / email service
    setSent(true);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 grid place-items-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Free consultation"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-3xl overflow-hidden rounded-[28px] bg-white md:grid-cols-2"
          >
            <button onClick={() => setOpen(false)} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/10 transition hover:bg-brand hover:text-white">
              <X size={18} />
            </button>

            <div className="bg-dark p-8 text-white">
              <h2 className="text-3xl font-extrabold text-brand">Hold on!</h2>
              <h3 className="mb-4 mt-1 text-xl font-bold">Before you go..... 👋</h3>
              <p className="mb-4 text-sm text-white/70">Grab your FREE personalized ✨</p>
              <ul className="mb-6 space-y-2.5 text-sm">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-accent" /> {p}</li>
                ))}
              </ul>
              <p className="font-semibold">Don’t Miss Out!</p>
              <p className="mb-5 text-sm text-white/60">Our experts are ready to help you kickstart your project</p>
              <div className="flex items-center gap-3">
                {partners.map((p) => (
                  <Image key={p} src={`${IMG}/${p}`} alt="Partner badge" width={72} height={40} unoptimized className="h-10 w-auto rounded bg-white p-1" />
                ))}
              </div>
            </div>

            <div className="p-8">
              {sent ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-green-100 text-3xl text-green-600">✓</span>
                    <h3 className="text-2xl font-bold">Thank You!</h3>
                    <p className="mb-6 mt-2 text-muted">Your request has been submitted successfully.</p>
                    <button onClick={() => setOpen(false)} className="rounded-full bg-brand px-8 py-3 font-semibold text-white">OK</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <label className="block text-sm font-semibold">
                    Looking For *
                    <select required className={`${field} mt-1.5`} defaultValue="">
                      <option value="" disabled>Select a service</option>
                      {leadOptions.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </label>
                  <input required placeholder="Your name" className={field} />
                  <input required type="email" placeholder="Email address" className={field} />
                  <input required type="tel" placeholder="Phone number" className={field} />
                  <button className="w-full rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-1">
                    Schedule Free Consultation
                  </button>
                  <p className="text-center text-xs text-muted">✓ Your information will be safe with us</p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}