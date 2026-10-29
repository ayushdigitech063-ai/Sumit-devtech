import { ServicePageData } from "@/types/service-page";

export interface FeatureChip {
  id: string;
  label: string;
}

export interface TrustItem {
  id: string;
  value: string;
  label: string;
}

export interface EcosystemCard {
  id: string;
  title: string;
  description: string;
  iconName:
    | "Smartphone"
    | "Tablet"
    | "Monitor"
    | "Maximize"
    | "Cpu"
    | "Eye"
    | "Zap"
    | "Sliders";
  badge?: string;
  colSpan?: "default" | "wide";
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: [string, string];
  href: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface StatItem {
  id: string;
  numericValue: number;
  suffix: string;
  decimals?: number;
  label: string;
  subtext: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  iconName: "ShoppingBag" | "Rocket" | "Briefcase" | "HeartPulse";
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const heroFeatureChips: FeatureChip[] = [
  { id: "chip-1", label: "Mobile-First UI" },
  { id: "chip-2", label: "Fluid Breakpoints" },
  { id: "chip-3", label: "Touch Optimization" },
  { id: "chip-4", label: "Fast Speeds" },
];

export const heroTrustItems: TrustItem[] = [
  { id: "trust-1", value: "4.9/5", label: "Rating (250+ Responsive Sites)" },
  { id: "trust-2", value: "100%", label: "Mobile Guarantee" },
  { id: "trust-3", value: "<1.2s", label: "Average Mobile FCP" },
  { id: "trust-4", value: "100%", label: "Google Mobile-Friendly" },
];

export const responsiveEcosystemCards: EcosystemCard[] = [
  {
    id: "eco-1",
    title: "Mobile-First Architecture",
    description: "Prioritizing mobile viewport constraints first to guarantee lightning-fast rendering and intuitive thumb navigation.",
    iconName: "Smartphone",
    badge: "Core Standard",
    colSpan: "wide",
  },
  {
    id: "eco-2",
    title: "Fluid Grid Layouts",
    description: "Proportional, resolution-independent CSS layouts that scale smoothly between screen widths without hard breaks.",
    iconName: "Maximize",
    badge: "Dynamic Flex",
  },
  {
    id: "eco-3",
    title: "Touch Gesture Optimization",
    description: "Generous tap targets (48px+), swipe-friendly carousels, and thumb-friendly bottom sheets for mobile ergonomics.",
    iconName: "Sliders",
  },
  {
    id: "eco-4",
    title: "Adaptive Typography & Media",
    description: "Fluid clamp() type scales and next-gen responsive image formats (AVIF/WebP) tailored to device pixel densities.",
    iconName: "Eye",
    badge: "Sharp & Scaled",
    colSpan: "wide",
  },
  {
    id: "eco-5",
    title: "Cross-Device Compatibility",
    description: "Flawless rendering and consistent functionality verified across iOS Safari, Chrome Mobile, Android, and desktop browsers.",
    iconName: "Tablet",
  },
  {
    id: "eco-6",
    title: "Retina / High-DPI Clarity",
    description: "Vector SVGs and @2x/@3x asset pipelines ensuring ultra-crisp interface elements on Apple Retina and AMOLED screens.",
    iconName: "Monitor",
  },
  {
    id: "eco-7",
    title: "Core Web Vitals Optimization",
    description: "Zero Cumulative Layout Shift (CLS) during viewport resizing and rapid Interaction to Next Paint (INP) responsiveness.",
    iconName: "Zap",
    badge: "Google Certified",
    colSpan: "wide",
  },
  {
    id: "eco-8",
    title: "Dynamic Device Breakpoints",
    description: "Precision-engineered media queries handling ultra-wide desktop monitors, laptops, foldable phones, and tablets.",
    iconName: "Cpu",
  },
];

export const responsiveServicesData: ServiceItem[] = [
  {
    id: "service-1",
    number: "01",
    title: "Mobile-First Web Architecture",
    description:
      "We design interfaces starting from the smallest handheld screens upwards, ensuring zero clutter, rapid interactions, and top-tier usability on smartphones.",
    tags: ["Touch UX", "Mobile Indexing"],
    href: "/contact-us",
  },
  {
    id: "service-2",
    number: "02",
    title: "Tablet & Hybrid Screen Adaptability",
    description:
      "Optimizing touch-and-cursor interfaces for iPads, Android tablets, foldables, and convertible laptops with responsive split-screen layouts.",
    tags: ["Foldable Ready", "Adaptive Navigation"],
    href: "/contact-us",
  },
  {
    id: "service-3",
    number: "03",
    title: "Cross-Browser Fluid Layouts",
    description:
      "Engineering consistent CSS Grid and Flexbox structures that eliminate horizontal overflow and scale gracefully across every browser engine.",
    tags: ["Zero Horizontal Scroll", "Fluid CSS"],
    href: "/contact-us",
  },
  {
    id: "service-4",
    number: "04",
    title: "High-DPI & Retina Image Optimization",
    description:
      "Serving context-aware images via Next.js Image with modern formats, reducing mobile payload sizes while maintaining pristine sharpness.",
    tags: ["AVIF & WebP", "Responsive srcset"],
    href: "/contact-us",
  },
  {
    id: "service-5",
    number: "05",
    title: "Responsive E-Commerce & Checkout UX",
    description:
      "Frictionless mobile carts, thumb-friendly product sliders, and single-tap checkout funnels that significantly lower mobile cart abandonment.",
    tags: ["One-Hand Checkout", "Mobile Conversion"],
    href: "/contact-us",
  },
  {
    id: "service-6",
    number: "06",
    title: "Legacy Site Modernization & Viewport Audits",
    description:
      "Modernizing non-responsive legacy websites into mobile-responsive experiences with rigorous Google Mobile-Friendly compliance checks.",
    tags: ["Viewport Audit", "Zero SEO Impact"],
    href: "/contact-us",
  },
];

export const responsiveProcessSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Viewport & Breakpoint Strategy",
    description:
      "Analyzing user device analytics, establishing responsive grid systems, and planning structural content prioritization for mobile, tablet, and desktop.",
    deliverable: "Responsive UX Blueprint",
  },
  {
    number: "02",
    title: "Fluid Wireframing & Grid Design",
    description:
      "Crafting multi-device Figma prototypes demonstrating dynamic component reflow, tap target ergonomics, and navigation transitions across viewports.",
    deliverable: "Multi-Screen Figma Prototypes",
  },
  {
    number: "03",
    title: "Responsive Component Development",
    description:
      "Developing modular Next.js / TypeScript components styled with Tailwind CSS, utilizing fluid typography clamp() formulas and responsive container queries.",
    deliverable: "Fluid Next.js Components",
  },
  {
    number: "04",
    title: "Multi-Device QA & Cross-Browser Testing",
    description:
      "Comprehensive testing across physical iPhones, Samsung Galaxy phones, iPads, laptops, and 4K displays to verify zero layout shifts or visual glitches.",
    deliverable: "Cross-Device QA Sign-off",
  },
];

export const responsiveStatsData: StatItem[] = [
  {
    id: "stat-1",
    numericValue: 250,
    suffix: "+",
    label: "Responsive Sites Launched",
    subtext: "Delivering unified experiences across all screen form-factors.",
  },
  {
    id: "stat-2",
    numericValue: 100,
    suffix: "%",
    label: "Mobile Guarantee",
    subtext: "Passes 100% of Google Mobile-Friendly and responsive tests.",
  },
  {
    id: "stat-3",
    numericValue: 1.2,
    suffix: "s",
    decimals: 1,
    label: "Average Mobile FCP",
    subtext: "Optimized mobile assets ensure sub-second rendering speeds.",
  },
  {
    id: "stat-4",
    numericValue: 24,
    suffix: "/7",
    label: "Viewport & Device Care",
    subtext: "Continuous testing as new smartphone resolutions emerge.",
  },
];

export const responsiveIndustriesData: IndustryItem[] = [
  {
    id: "ind-1",
    title: "E-Commerce & Retail",
    description:
      "Fast, fluid shopping experiences designed for one-thumb browsing, instant search filtering, and seamless Apple Pay & Google Pay checkouts.",
    metric: "+45%",
    metricLabel: "Mobile Conversion Lift",
    iconName: "ShoppingBag",
  },
  {
    id: "ind-2",
    title: "SaaS & Tech Platforms",
    description:
      "Responsive dashboards and application interfaces that maintain data density on desktops while offering intuitive card layouts on mobile.",
    metric: "99.8%",
    metricLabel: "Cross-Device Usability",
    iconName: "Rocket",
  },
  {
    id: "ind-3",
    title: "Corporate & Professional Services",
    description:
      "Authoritative, polished web presence ensuring executives and clients experience executive-tier branding on smartphones during meetings.",
    metric: "100%",
    metricLabel: "Mobile Brand Trust",
    iconName: "Briefcase",
  },
  {
    id: "ind-4",
    title: "Healthcare & Local Services",
    description:
      "Accessible, urgent-care friendly interfaces with high-contrast buttons, fast GPS directions, and frictionless click-to-call integrations.",
    metric: "3x",
    metricLabel: "Tap-to-Call Rate",
    iconName: "HeartPulse",
  },
];

export const responsiveFaqData: FaqItem[] = [
  {
    id: "faq-1",
    question: "What makes responsive website design essential for modern businesses?",
    answer:
      "Over 65% of global internet traffic originates from mobile devices. A responsive website automatically recalculates layouts, font sizes, and image dimensions according to each visitor's screen width. This guarantees lower bounce rates, higher search engine rankings, and maximized conversion rates across every screen size.",
  },
  {
    id: "faq-2",
    question: "How do you test websites across different devices and screen resolutions?",
    answer:
      "We test on both physical smartphones (iOS and Android), tablets, laptops, and ultra-wide desktop monitors, alongside cloud device labs like BrowserStack. We evaluate touch targets, navigation menus, orientation changes (portrait vs. landscape), and network throttled mobile connections.",
  },
  {
    id: "faq-3",
    question: "Will responsive design improve our Google SEO rankings?",
    answer:
      "Yes. Google utilizes Mobile-First Indexing, meaning Google's crawler primarily indexes and evaluates the mobile version of your website. Having a clean, responsive layout with fast mobile Core Web Vitals is a decisive factor in ranking at the top of search engine results pages.",
  },
  {
    id: "faq-4",
    question: "Can our existing non-responsive website be made responsive without rebuilding from scratch?",
    answer:
      "In many cases, yes. We can perform a comprehensive viewport audit and refactor the CSS/HTML into a fluid grid system while preserving your existing backend and content. During our initial consultation, we will assess your current codebase and recommend the most cost-effective path.",
  },
  {
    id: "faq-5",
    question: "How do you ensure fast page speeds on mobile cellular connections?",
    answer:
      "We enforce mobile-first asset pipelines: serving modern WebP/AVIF images with responsive srcset attributes, deferring non-critical scripts, using lightweight SVGs, and optimizing Next.js bundle sizes. This ensures your site loads in under 1.5 seconds even on 4G mobile connections.",
  },
];


export const responsiveWebsiteDesignData: ServicePageData = {
  hero: {
    badge: "Responsive Website Design Services",
    title: "Responsive Designs That",
    highlight: "Adapt Seamlessly",
    description: "Deliver frictionless, high-converting browsing experiences across smartphones, tablets, laptops, and 4K displays. Engineered with fluid grids, touch ergonomics, and sub-second mobile speeds.",
    chips: heroFeatureChips,
    primaryCta: { label: "Get Responsive Quote", href: "/contact-us" },
    secondaryCta: { label: "Explore Features", href: "#responsive-services" },
    trustItems: heroTrustItems,
    previewUrl: "sumitdevtech.com/responsive-website-design",
    floatingBadge1: { title: "100% Mobile Ready", sub: "Fluid Viewports 360px–4K" },
    floatingBadge2: { title: "Smart Breakpoint Grid", sub: "Zero Layout Shift (CLS)" },
  },
  ecosystem: {
    label: "Adaptive Framework",
    title: "Our 8-Core Responsive",
    highlight: "Ecosystem",
    text: "A cohesive engineering foundation designed to dynamically recalculate geometry, asset weight, and interaction mechanics across every modern viewport.",
    cards: responsiveEcosystemCards,
  },
  services: {
    id: "responsive-services",
    label: "Responsive Capabilities",
    title: "Comprehensive Multi-Device",
    highlight: "Design Services",
    text: "Explore our focused responsive capabilities. Every solution is custom-architected to eliminate device-specific friction, accelerate page speed, and maximize engagement.",
    items: responsiveServicesData,
  },
  process: {
    label: "Adaptive Workflow",
    title: "Our 4-Step Responsive",
    highlight: "Design Process",
    text: "From viewport analysis and fluid wireframing to high-performance component engineering and multi-device QA, every phase guarantees device-agnostic excellence.",
    steps: responsiveProcessSteps,
  },
  stats: {
    items: responsiveStatsData,
  },
  industries: {
    label: "Adaptive By Sector",
    title: "Responsive Layouts Built For",
    highlight: "Every Industry",
    text: "Whether converting mobile shoppers, driving executive B2B inquiries, or facilitating urgent local calls, our responsive designs optimize user behavior by industry.",
    items: responsiveIndustriesData,
  },
  faq: {
    label: "Got Questions?",
    title: "Frequently Asked",
    highlight: "Questions",
    text: "Clear answers about mobile-first indexing, multi-device testing methods, fluid typography, and responsive migration timelines.",
    items: responsiveFaqData,
  },
  cta: {
    badge: "Fluid & Device Agnostic",
    title: "Ready to Deliver a Seamless",
    highlight: "Multi-Device Experience?",
    text: "Partner with specialized responsive frontend engineers and UI/UX designers to guarantee your website shines brilliantly on every smartphone, tablet, laptop, and desktop.",
    benefits: [
      "100% Fluid Breakpoint Architecture",
      "Touch-Optimized UI & Navigation",
      "Google Mobile-First Indexing Ready",
    ],
    buttonText: "Get Responsive Quote",
    buttonHref: "/contact-us",
  },
};
