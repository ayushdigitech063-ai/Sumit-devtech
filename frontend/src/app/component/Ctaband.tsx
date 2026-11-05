import { Phone, ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Reveal from "../animation/Reveal";
import { site } from "@/data/site";
import { useState } from "react";

export default function Ctaband() {
  const [open, setOpen] = useState(false);
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
          <h2 className="mx-auto max-w-3xl font-heading text-3xl font-bold md:text-5xl text-brand tracking-tight">
            Have a Project in Mind? Let’s Build Something Amazing!
          </h2>
          <p className="mx-auto mb-9 mt-5 max-w-2xl text-base sm:text-lg text-muted font-normal leading-relaxed">
            Get a free personalized consultation, custom budget estimate &amp; technical blueprint for your business within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="#" onClick={openQuote} variant="primary" className="shadow-lg shadow-accent/25 hover:shadow-accent/40 gap-2">
              Get Free Quote
              <ArrowRight size={16} />
            </Button>
            <Button
              href={`tel:${site.phones[0].replace(/-/g, "")}`}
              variant="outline"
              className="border-2 border-dark/30 bg-white text-dark shadow-sm hover:border-dark hover:bg-dark hover:text-white transition-all duration-300 font-semibold"
            >
              <Phone size={17} className="text-accent" /> {site.phones[0]}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
