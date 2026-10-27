import React, { Suspense } from "react";
import type { Metadata } from "next";
import {
  PackageHero,
  PackageCardsSection,
} from "../../sections/package-sections";
import ClientsMarquee from "../../sections/home/ClientsMarquee";

export const metadata: Metadata = {
  title: "Website Development Packages & Pricing | Sumit DevTech",
  description:
    "Explore transparent, milestone-driven website design and custom development packages from Sumit DevTech. Fast delivery, 100% code ownership, and no hidden charges.",
  alternates: {
    canonical: "/packages",
  },
  openGraph: {
    title: "Website Development Packages & Pricing | Sumit DevTech",
    description:
      "Explore transparent, milestone-driven web design, Next.js development, and eCommerce packages.",
    url: "https://sumitdevtech.com/packages",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Packages & Pricing | Sumit DevTech",
    description: "Transparent, milestone-based packages engineered for businesses and startups.",
  },
};

export default function PackagesPage() {
  return (
    <>
      {/* 1. Hero Banner */}
      <PackageHero />

      {/* 2. Trusted Partners Section */}
      <ClientsMarquee />

      {/* 3. Packages Cards & FAQs Section */}
      <Suspense fallback={<div className="min-h-[500px] bg-light" />}>
        <PackageCardsSection />
      </Suspense>
    </>
  );
}

