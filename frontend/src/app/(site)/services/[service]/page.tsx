import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchServiceBySlug, fetchServices, type ServiceData } from "@/lib/services-api";
import { fetchSeoByPath } from "@/lib/seo-api";
import {
  HeroSection,
  DesignEcosystemSection,
  ServicesSection,
  ProcessSection,
  StatsSection,
  IndustriesSection,
  FaqSection,
} from "@/app/sections/website-design-section";
import type { ServicePageData } from "@/types/service-page";

import { supportedServices } from "@/data/locations-data";

interface Props {
  params: Promise<{ service: string }>;
}

const DEFAULT_SERVICE_SLUGS = [
  "website-design",
  "php-website-development",
  "reactjs-website-development",
  "wordpress-website-development",
  "shopify-website-development",
  "ecommerce-website-development",
  "dynamic-website-design",
  "responsive-website-design",
  "digital-marketing-services",
  "maintenance-hosting-support",
  "website-maintenance",
  ...supportedServices.map((s) => s.slug),
];

export async function generateStaticParams() {
  try {
    const services = await fetchServices(false);
    if (services && services.length > 0) {
      const dbSlugs = services.map((s) => s.slug);
      const combined = Array.from(new Set([...DEFAULT_SERVICE_SLUGS, ...dbSlugs]));
      return combined.map((slug) => ({ service: slug }));
    }
  } catch {
    // fallback to preset list
  }
  return DEFAULT_SERVICE_SLUGS.map((slug) => ({ service: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  const currentPath = `/services/${slug.toLowerCase()}`;

  // 1. Check if SEO Manager has custom metadata configured for this path
  const customSeo = await fetchSeoByPath(currentPath);
  if (customSeo && customSeo.title) {
    return {
      title: customSeo.title,
      description: customSeo.description,
      keywords: customSeo.keywords && customSeo.keywords.length > 0 ? customSeo.keywords : undefined,
      robots: customSeo.robots || "index, follow",
      alternates: {
        canonical: customSeo.canonicalUrl || `https://sumitdevtech.com${currentPath}`,
      },
      openGraph: {
        title: customSeo.ogTitle || customSeo.title,
        description: customSeo.ogDescription || customSeo.description,
        images: customSeo.ogImage ? [{ url: customSeo.ogImage }] : undefined,
        url: `https://sumitdevtech.com${currentPath}`,
        siteName: "Sumit DevTech",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: customSeo.ogTitle || customSeo.title,
        description: customSeo.ogDescription || customSeo.description,
        images: customSeo.ogImage ? [customSeo.ogImage] : undefined,
      },
    };
  }

  // 2. Fallback to service DB data
  const service = await fetchServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Sumit DevTech",
    };
  }

  const metaTitle = service.metaTitle || `${service.title} | Sumit DevTech`;
  const metaDesc = service.metaDescription || service.description;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `https://sumitdevtech.com/services/${service.slug}`,
      siteName: "Sumit DevTech",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
    },
  };
}

function transformToServicePageData(service: ServiceData): ServicePageData {
  return {
    hero: {
      badge: service.badge || "Professional Service",
      title: service.title,
      highlight: service.highlight,
      description: service.description,
      chips: (service.chips || []).map((c, i) => ({ id: c.id || `chip-${i}`, label: c.label })),
      primaryCta: { label: service.ctaButtonText || "Get Free Consultation", href: service.ctaButtonHref || "/contact-us" },
      secondaryCta: { label: "Explore Services", href: "#services-section" },
      trustItems: (service.trustItems || []).map((t, i) => ({ id: t.id || `trust-${i}`, value: t.value, label: t.label })),
    },
    ecosystem: {
      label: service.ecosystemLabel || "Full-Stack Hub",
      title: service.ecosystemTitle || "Our Core Technical",
      highlight: service.ecosystemHighlight || "Ecosystem",
      text: service.ecosystemText || "",
      cards: (service.ecosystemCards || []).map((card, i) => ({
        id: card.id || `card-${i}`,
        title: card.title,
        description: card.description,
        iconName: card.iconName || "Code2",
        badge: card.badge,
        colSpan: card.colSpan,
      })),
    },
    services: {
      id: "services-section",
      label: service.servicesSectionLabel || "Expertise & Services",
      title: service.servicesSectionTitle || "Precision-Engineered",
      highlight: service.servicesSectionHighlight || "Solutions",
      text: service.servicesSectionText || "",
      items: (service.serviceItems || []).map((item, i) => ({
        id: item.id || `srv-${i}`,
        number: item.number || String(i + 1).padStart(2, "0"),
        title: item.title,
        description: item.description,
        tags: [item.tags?.[0] || "Custom", item.tags?.[1] || "Tailored"] as [string, string],
        href: item.href || "/contact-us",
      })),
    },
    process: {
      label: service.processLabel || "Proven Workflow",
      title: service.processTitle || "Our 4-Step",
      highlight: service.processHighlight || "Process",
      text: service.processText || "",
      steps: (service.processSteps || []).map((step, i) => ({
        number: step.number || String(i + 1).padStart(2, "0"),
        title: step.title,
        description: step.description,
        deliverable: step.deliverable || "Completed Milestone",
      })),
    },
    stats: {
      items: (service.stats || []).map((s, i) => ({
        id: s.id || `stat-${i}`,
        numericValue: s.numericValue,
        suffix: s.suffix,
        decimals: s.decimals,
        label: s.label,
        subtext: s.subtext,
      })),
    },
    industries: {
      label: service.industriesLabel || "Domain Expertise",
      title: service.industriesTitle || "Built For",
      highlight: service.industriesHighlight || "Every Industry",
      text: service.industriesText || "",
      items: (service.industries || []).map((ind, i) => ({
        id: ind.id || `ind-${i}`,
        title: ind.title,
        description: ind.description,
        metric: ind.metric,
        metricLabel: ind.metricLabel,
        iconName: ind.iconName || "Briefcase",
      })),
    },
    faq: {
      label: "Got Questions?",
      title: `FAQs for ${service.title || "This Service"}`,
      highlight: "",
      text: `Clear answers and frequently asked questions about our ${service.title || "service"} process, timelines, and deliverables.`,
      items: (service.faqs || []).map((faq, i) => ({
        id: `faq-${i}`,
        question: faq.question,
        answer: faq.answer,
      })),
    },
    cta: {
      badge: service.ctaBadge || "Let's Build Your Vision",
      title: service.ctaTitle || "Ready to Elevate Your",
      highlight: service.ctaHighlight || "Brand Online?",
      text: service.ctaText || "Partner with us to build an impactful, conversion-engineered digital solution.",
      benefits: service.ctaBenefits && service.ctaBenefits.length > 0 ? service.ctaBenefits : ["100% Code Ownership", "High-Performance Speeds", "Dedicated Support"],
      buttonText: service.ctaButtonText || "Get Free Consultation",
      buttonHref: service.ctaButtonHref || "/contact-us",
    },
  };
}

export default async function DynamicServicePage({ params }: Props) {
  const { service: slug } = await params;
  let pageData: ServicePageData | null = null;
  const currentPath = `/services/${slug.toLowerCase()}`;

  const [dbService, customSeo] = await Promise.all([
    fetchServiceBySlug(slug),
    fetchSeoByPath(currentPath),
  ]);

  if (dbService && dbService.isActive !== false) {
    pageData = transformToServicePageData(dbService);
  }

  if (!pageData) {
    notFound();
  }

  return (
    <>
      {/* Dynamic Custom Schema Injection if provided by SEO Manager */}
      {customSeo?.customSchemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: customSeo.customSchemaJson }}
        />
      )}
      <HeroSection data={pageData.hero} />
      <DesignEcosystemSection data={pageData.ecosystem} />
      <ServicesSection data={pageData.services} />
      <ProcessSection data={pageData.process} />
      <StatsSection data={pageData.stats} />
      <IndustriesSection data={pageData.industries} />
      <FaqSection data={pageData.faq} />
    </>
  );
}
