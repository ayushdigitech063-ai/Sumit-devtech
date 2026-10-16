import { PenLine } from "lucide-react";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import Button from "../../ui/Button";

export default function Articles() {
  return (
    <Section id="articles">
      <div className="mx-auto w-full max-w-[1100px] px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          label="Technology & Digital Insights"
          center={true}
          title={<>Latest Tech News & <span className="text-brand">Articles</span></>}
          text="In-depth perspectives on modern web architecture, UI/UX engineering, and revenue-focused digital innovation from Sumit DevTech."
        />
        <div className="mb-12"><Button href="/">Explore All Blogs</Button></div>
      </div>

      <Reveal>
        <div className="grid items-center gap-8 rounded-32px bg-light p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
          <div>
            <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white"><PenLine size={26} /></span>
            <h3 className="mb-3 text-3xl font-extrabold">New Articles Coming Soon</h3>
            <p className="text-muted">
              Our team is currently drafting brand new research papers and tutorials on cutting-edge web development and UI/UX design.
            </p>
          </div>
          {/* shimmering skeleton cards */}
          {/* <div className="grid gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-4 rounded-2xl bg-white p-4">
                <div className="h-16 w-20 shrink-0 animate-pulse rounded-xl bg-accent/15" style={{ animationDelay: `${i * 0.25}s` }} />
                <div className="flex-1 space-y-2.5 py-1">
                  <div className="h-3 w-4/5 animate-pulse rounded bg-line" style={{ animationDelay: `${i * 0.25}s` }} />
                  <div className="h-3 w-3/5 animate-pulse rounded bg-line" style={{ animationDelay: `${i * 0.25 + 0.1}s` }} />
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </Reveal>
      </div>
    </Section>
  );
}