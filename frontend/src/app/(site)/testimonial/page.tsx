import React, { Suspense } from "react";
import type { Metadata } from "next";
import { TestimonialHero, TestimonialGrid } from "../../sections/testimonial-sections";

export const metadata: Metadata = {
  title: "Client Testimonials & Reviews | Sumit DevTech",
  description:
    "Read authentic reviews and ratings from founders, doctors, and business leaders who trusted Sumit DevTech for web development, eCommerce platforms, and custom digital systems.",
  alternates: {
    canonical: "/testimonial",
  },
  openGraph: {
    title: "Client Testimonials & Reviews | Sumit DevTech",
    description:
      "Explore verified client feedback and ratings for Sumit DevTech's web engineering and digital design work.",
    url: "https://sumitdevtech.com/testimonial",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Testimonials & Reviews | Sumit DevTech",
    description: "Read real client feedback on Sumit DevTech web development and design.",
  },
};

export default function TestimonialPage() {
  return (
    <>
      <TestimonialHero />
      <Suspense fallback={<div className="min-h-[500px] bg-light" />}>
        <TestimonialGrid />
      </Suspense>
    </>
  );
}

