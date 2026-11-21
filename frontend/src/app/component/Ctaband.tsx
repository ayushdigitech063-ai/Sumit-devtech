import { Phone, ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Reveal from "../animation/Reveal";
import { site } from "@/config/site";
import { useEffect, useState } from "react";
import { fetchPublicSettings } from "@/lib/settings-api";

export default function Ctaband() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState(site.phones[0]);

  useEffect(() => {
    fetchPublicSettings().then((s) => {
      if (s?.phone1Number) setPhone(s.phone1Number);
    });
  }, []);
  const openQuote = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();                                  
    setOpen(false);                                      
    window.dispatchEvent(new Event("open-quote-modal"));
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 text-center text-ink md:py-24 border-t border-line/60">
      {/* Subtle decorative glow for pure white background */}
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-accent/8 blur-[100px]" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-72 w-72 rounded-full bg-amber-400/8 blur-[100px]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <Container className="relative z-10">
        <Reveal>
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent">
            Let’s work together
          </span>
          <h2 className="mx-auto max-w-3xl font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-brand tracking-tight leading-tight">
            Have a Project in Mind? Let’s Build Something Amazing!
          </h2>
          <p className="mx-auto mb-9 mt-5 max-w-2xl text-base sm:text-lg text-muted font-normal leading-relaxed">
            Get a free personalized consultation, custom budget estimate &amp; technical blueprint for your business within 24 hours.
          </p>
          <div className="flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-4">
            <Button
              href="#"
              onClick={openQuote}
              variant="primary"
              className="gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm md:text-base font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 whitespace-nowrap"
            >
              <span>Get Free Quote</span>
              <ArrowRight size={14} className="shrink-0 sm:w-4 sm:h-4" />
            </Button>
            <Button
              href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
              variant="outline"
              className="gap-1.5 sm:gap-2 border-2 border-dark/30 bg-white text-dark shadow-sm hover:border-dark hover:bg-dark hover:text-white transition-all duration-300 px-3 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap"
            >
              <Phone size={14} className="text-accent shrink-0 sm:w-[17px] sm:h-[17px]" />
              <span>{phone}</span>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
