import type { Metadata } from "next";
import CareerTemplateTwo from "../sections/career-section/Career-TemplateTwo";


export const metadata: Metadata = {
  title: "Careers at Sumit DevTech | Web Development Jobs in Jaipur",
  description:
    "Join Sumit DevTech in Jaipur. See open roles in web development, design, SEO and sales, and learn how we hire.",
  alternates: { canonical: "/career" },
  openGraph: {
    title: "Careers at Sumit DevTech | Web Development Jobs in Jaipur",
    description:
      "Join Sumit DevTech in Jaipur. See open roles in web development, design, SEO and sales, and learn how we hire.",
    url: "https://sumitdevtech.com/career",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Sumit DevTech | Web Development Jobs in Jaipur",
    description: "Join Sumit DevTech in Jaipur. See open roles and how we hire.",
  },
};

export default function CareerPage() {

  return <CareerTemplateTwo />
}