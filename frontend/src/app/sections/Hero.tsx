"use client";
import Container from "../ui/Container";
import Button from "../ui/Button";
import WordReveal from "../animation/WordReveal";
import HeroShowcase from "./HeroShowCase";

const stats = [
  { value: "500+", label: "Happy clients" },
  { value: "1000+", label: "Projects done" },
  { value: "4.9★", label: "Google rating" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-dark py-16 pb-8 text-white"
    >
      {/* background layers */}
      <div className="pointer-events-none absolute inset-0 animate-grid bg-[linear-gradient(#ffffff0d_1px,transparent_1px),linear-gradient(90deg,#ffffff0d_1px,transparent_1px)] `bg-[size:52px_52px]` `[mask-image:radial-gradient(circle_at_60%_40%,#000,transparent_72%)]`" />
      <div className="pointer-events-none absolute -right-24 -top-44 `h-[520px] w-[520px]` animate-blob rounded-full bg-accent opacity-50 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 `h-[420px] w-[420px]` animate-blob rounded-full bg-accent-2 opacity-40 blur-[90px] [animation-delay:-6s]" />

      <Container className="relative grid items-center gap-8 pr-30 pl-30 lg:grid-cols-[1.1fr_0.9fr]">
        {/* left */}
        <div>
          <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium">
            <i className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-green-500" />
            <span>Now booking projects · Jaipur, India</span>
          </span>

          <h1 className="text-5xl font-extrabold md:text-6xl xl:text-7xl">
            <WordReveal text="We Build Websites That" />
            <span className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-top">
              <span className="inline-block text-brand">Convert Visitors</span>
            </span>
            <br />
            <WordReveal text="Into Customers." delay={0.5} />
          </h1>

          <p className="mb-8 mt-6 max-w-xl text-lg text-white/70">
            Fast, beautiful, SEO-ready websites, apps and digital marketing —
            from startups to enterprises. Fixed pricing, zero ghosting.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button href="/">Get Free Consultation →</Button>
            <Button href="/" variant="outline">
              View Portfolio
            </Button>
          </div>

          <div className="mt-11 flex flex-wrap gap-9">
            {stats.map((s) => (
              <div key={s.label}>
                <b className="block font-heading text-4xl font-extrabold">
                  {s.value}
                </b>
                <small className="text-white/50">{s.label}</small>
              </div>
            ))}
          </div>
        </div>

        {/* right: dashboard */}
        <div className="relative">
          <HeroShowcase />
        </div>
      </Container>
    </section>
  );
}
