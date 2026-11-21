import Image from "next/image";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
const COUNTRIES = [
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "United Arab Emirates", code: "ae" },
  { name: "Canada", code: "ca" },
  { name: "Germany", code: "de" },
  { name: "India", code: "in" },
];

export default function GlobalClient() {
  // Symmetrically duplicate items for an endless, seamless right-to-left marquee loop (translateX -50%)
  const halfSet = [...COUNTRIES, ...COUNTRIES];
  const marqueeCountries = [...halfSet, ...halfSet];

  return (
    <Section id="global" className="relative overflow-hidden bg-[#f7f6f3] border-t border-line/60 py-16 sm:py-20">
      {/* decorative rotating rings */}
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-slate-300" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-[360px] w-[360px] -translate-y-1/2 animate-[spin_28s_linear_infinite_reverse] rounded-full border border-accent/20" />

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          label="Worldwide"
          center={true}
          title={<>We Serve Clients from <span className="text-brand">All Over the World.</span></>}
          text="500+ clients from all over the world - some of them are"
        />

        {/* Continuous Right-to-Left Auto-Scrolling Marquee */}
        <div className="relative mt-8 sm:mt-10 mx-auto w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]">
          <div 
            className="flex w-max animate-marquee gap-4 sm:gap-6 py-4 hover:[animation-play-state:paused]"
            style={{ animationDuration: "25s" }}
          >
            {marqueeCountries.map((c, i) => (
              <div
                key={`${c.code}-${i}`}
                className="relative w-[145px] sm:w-[170px] shrink-0 rounded-2xl sm:rounded-3xl border border-line bg-white p-5 sm:p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl hover:shadow-accent/10 select-none"
              >
                <span className="absolute right-3.5 top-3.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <Image
                  src={`https://flagcdn.com/w80/${c.code}.png`}
                  alt={`${c.name} flag`}
                  width={48}
                  height={36}
                  unoptimized
                  className="mx-auto mb-3 sm:mb-4 h-8 w-11 sm:h-9 sm:w-12 rounded object-cover shadow-xs"
                />
                <p className="text-xs sm:text-sm font-bold text-ink truncate">{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
