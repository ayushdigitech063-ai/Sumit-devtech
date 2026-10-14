import { Phone } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Reveal from "../animation/Reveal";
import { site } from "@/data/site";

export default function Ctaband() {
  return (
    <section className="relative overflow-hidden bg-brand py-20 text-center text-white md:py-24">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 animate-[spin_24s_linear_infinite] rounded-full border-40px border-white/15" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-36px border-white/10" />
      <Container className="relative">
        <Reveal>
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.16em]">Let’s work together</span>
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold md:text-5xl">
            Have a Project in Mind? Let’s Build Something Amazing!
          </h2>
          <p className="mx-auto mb-9 mt-5 max-w-2xl text-lg text-white/85">
            Get a free personalized consultation, custom budget estimate & technical blueprint for your business within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="light">Get Free Quote</Button>
            <Button href={`tel:${site.phones[0].replace(/-/g, "")}`} variant="outline">
              <Phone size={18} /> {site.phones[0]}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}