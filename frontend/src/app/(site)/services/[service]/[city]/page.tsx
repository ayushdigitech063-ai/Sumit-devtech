import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  supportedCities,
  supportedServices,
  type CityLocation,
  type ServiceDefinition,
} from "@/data/locations-data";
import { site } from "@/data/site";
import Container from "@/app/ui/Container";
import Reveal from "@/app/animation/Reveal";
import Button from "@/app/ui/Button";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Clock,
  TrendingUp,
  Award,
  ChevronRight,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    service: string;
    city: string;
  }>;
}

// 1. Generate Static Params for all combinations for high-speed prerendering
export function generateStaticParams() {
  const paramsList: { service: string; city: string }[] = [];
  supportedServices.forEach((service) => {
    supportedCities.forEach((city) => {
      paramsList.push({
        service: service.slug,
        city: city.slug,
      });
    });
  });
  return paramsList;
}

// 2. Dynamic SEO Metadata for each City + Service combination
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = supportedServices.find((s) => s.slug === serviceSlug);
  const city = supportedCities.find((c) => c.slug === citySlug);

  if (!service || !city) return {};

  const title = `Best ${service.shortName} in ${city.name} | Top Rated Agency`;
  const description = `Looking for top-rated ${service.shortName.toLowerCase()} in ${city.name}, ${city.state}? ${site.name} delivers ROI-driven solutions, custom architectures, and guaranteed business growth. Contact us today.`;
  const canonicalUrl = `${site.url}/services/${serviceSlug}/${citySlug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: site.name,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${service.shortName} in ${city.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CityServiceLandingPage({ params }: PageProps) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = supportedServices.find((s) => s.slug === serviceSlug);
  const city = supportedCities.find((c) => c.slug === citySlug);

  if (!service || !city) {
    notFound();
  }

  // Dynamic FAQ specific to this service and city
  const localFaqs = [
    {
      q: `Why should I hire a professional ${service.shortName} agency in ${city.name}?`,
      a: `Hiring an established agency like ${site.name} gives your ${city.name} business access to battle-tested engineers, custom modern tech stacks (Next.js, modern SEO funnels), and transparent communication without the risks of unreliable freelancers.`,
    },
    {
      q: `What is the cost of ${service.shortName.toLowerCase()} for businesses in ${city.name}?`,
      a: `Our pricing is milestone-based and tailored to your specific scope, features, and scale. We provide transparent, itemized quotes with zero hidden charges. Contact us to get an accurate estimate within 24 hours.`,
    },
    {
      q: `Do you provide post-launch support and maintenance in ${city.name}?`,
      a: `Yes! Every project includes a 60-day post-launch warranty, dedicated server monitoring, bug fixes, and ongoing maintenance options so your platform always runs smoothly.`,
    },
    {
      q: `How long does a typical ${service.shortName.toLowerCase()} project take to complete?`,
      a: `A custom design or high-impact landing project typically takes 2 to 4 weeks, while complex full-stack web platforms take 4 to 8 weeks depending on requirements and custom API integrations.`,
    },
  ];

  // Local JSON-LD Schemas
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${service.name} in ${city.name}`,
        provider: {
          "@type": "LocalBusiness",
          name: site.name,
          url: site.url,
          telephone: site.phones[0],
          address: {
            "@type": "PostalAddress",
            addressLocality: city.name,
            addressRegion: city.state,
            addressCountry: city.country,
          },
        },
        areaServed: {
          "@type": "City",
          name: city.name,
        },
        description: service.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: localFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: service.shortName,
            item: `${site.url}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${service.shortName} in ${city.name}`,
            item: `${site.url}/services/${serviceSlug}/${citySlug}`,
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#fafafc] text-slate-800">
      {/* Dynamic Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: City-Tailored Hero with Single H1                        */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#0d1017] text-white pt-36 pb-20 md:pt-42 md:pb-28 border-b border-white/10">
        <div className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-orange-500/15 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-32 left-10 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[130px]" />

        <Container className="relative z-10 w-full text-center">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb Navigation */}
            <div className="mb-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span>/</span>
              <span className="text-slate-300">{service.shortName}</span>
              <span>/</span>
              <span className="text-orange-400 font-semibold">{city.name}</span>
            </div>

            {/* City Location Badge */}
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-orange-400 backdrop-blur-md">
                <MapPin size={13} className="text-orange-400" />
                <span>Serving Clients Across {city.name}, {city.state}</span>
              </span>
            </div>

            {/* SINGLE H1: Local Target Keyword */}
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.18]">
              {service.name} in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                {city.name}
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {city.tagline}. {service.description} We help ambitious brands across {city.name} dominate search results and scale online revenue.
            </p>

            {/* Highlights Chips */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {service.highlights.map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-xs font-medium text-slate-200"
                >
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>{h}</span>
                </span>
              ))}
            </div>

            {/* Hero CTAs */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact-us" variant="primary" className="gap-2 shadow-lg shadow-orange-500/25 px-7 py-3.5 text-sm font-bold">
                <span>Request Free {city.name} Proposal</span>
                <ArrowRight size={16} />
              </Button>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition"
              >
                <span>Instant WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. LOCAL TRUST & KEY DELIVERABLES                                        */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-[1140px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2 block">
                  Why {city.name} Businesses Trust Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                  Engineered for High Performance, Measurable ROI & Top Local Rankings
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  In a competitive market like {city.name}, a cookie-cutter website won&apos;t cut it. We architect custom, sub-second web solutions that position your brand ahead of local competitors.
                </p>

                <div className="space-y-3.5">
                  {service.deliverables.map((del, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                        <CheckCircle2 size={13} />
                      </span>
                      <span className="text-sm font-medium text-slate-800">{del}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-6 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-emerald-600" />
                    <span>100% Code Ownership</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award size={16} className="text-amber-500" />
                    <span>500+ Projects Delivered</span>
                  </div>
                </div>
              </div>

              {/* Local Areas Served Box */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-600">
                    <MapPin size={20} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Key Areas Served in {city.name}
                    </h3>
                    <p className="text-xs text-slate-500">Fast on-site & remote engineering consultation</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  We actively work with founders, surgeons, SMEs, and enterprise leaders across key hubs in {city.name}:
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {city.popularAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-1.5 text-xs font-semibold text-slate-800"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                <div className="rounded-2xl bg-orange-50/60 border border-orange-100 p-5 text-center">
                  <p className="text-xs font-bold text-slate-900 mb-1">
                    Ready to scale your business in {city.name}?
                  </p>
                  <p className="text-[11px] text-slate-500 mb-4">
                    Speak directly with our senior technology consultant today.
                  </p>
                  <Button href="/contact-us" variant="primary" className="w-full justify-center text-xs py-2.5 font-bold">
                    Schedule Free Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. CITY-SPECIFIC FAQs (H2 -> H3 -> P Format)                             */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2 block">
                Local Inquiries
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {service.shortName} in {city.name}: Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3.5">
              {localFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs"
                >
                  <h3 className="text-base font-bold text-slate-900 mb-2.5">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. OTHER CITIES NAVIGATION (Clean Internal Linking Network)               */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-t border-slate-200/70">
        <Container>
          <div className="mx-auto max-w-[1140px] text-center">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Explore {service.shortName} Across Other Major Hubs
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {supportedCities
                .filter((c) => c.slug !== city.slug)
                .map((otherCity) => (
                  <Link
                    key={otherCity.slug}
                    href={`/services/${service.slug}/${otherCity.slug}`}
                    className="rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-orange-500 hover:text-orange-600 transition"
                  >
                    {service.shortName} in {otherCity.name}
                  </Link>
                ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
