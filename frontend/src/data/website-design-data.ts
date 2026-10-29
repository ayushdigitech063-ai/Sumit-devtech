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
    | "Layout"
    | "Smartphone"
    | "Palette"
    | "Code2"
    | "ShoppingCart"
    | "RefreshCw"
    | "Flame"
    | "Gauge";
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
  iconName: "Briefcase" | "ShoppingBag" | "HeartPulse" | "Rocket";
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const heroFeatureChips: FeatureChip[] = [
  { id: "chip-1", label: "UI/UX Excellence" },
  { id: "chip-2", label: "Mobile Responsive" },
  { id: "chip-3", label: "SEO Layouts" },
  { id: "chip-4", label: "Fast Speeds" },
];

export const heroTrustItems: TrustItem[] = [
  { id: "trust-1", value: "4.9/5", label: "Rating (250+ Designs)" },
  { id: "trust-2", value: "100%", label: "Satisfaction Guarantee" },
  { id: "trust-3", value: "99.8%", label: "UX Usability Score" },
  { id: "trust-4", value: "Native", label: "Figma & Adobe XD" },
];

export const ecosystemCards: EcosystemCard[] = [
  {
    id: "eco-1",
    title: "UI/UX & Wireframing",
    description: "User journey mapping, interactive click-dummies, and low-fidelity prototypes designed for frictionless conversions.",
    iconName: "Layout",
    badge: "Strategic Core",
    colSpan: "wide",
  },
  {
    id: "eco-2",
    title: "Responsive Design",
    description: "Adaptive layouts built for ultra-sharp rendering from compact 360px phones to 4K ultra-wide monitors.",
    iconName: "Smartphone",
    badge: "Mobile-First",
  },
  {
    id: "eco-3",
    title: "Brand Visual Identity",
    description: "Harmonious color palettes, purposeful typography, custom iconography, and unified design token systems.",
    iconName: "Palette",
  },
  {
    id: "eco-4",
    title: "Figma to Code",
    description: "Pixel-perfect translation of approved design frames into clean, semantic, and accessible TypeScript/React code.",
    iconName: "Code2",
    badge: "1:1 Precision",
    colSpan: "wide",
  },
  {
    id: "eco-5",
    title: "E-Commerce UI Design",
    description: "Product display cards, intuitive filtering, frictionless checkout funnels, and conversion-boosted mobile carts.",
    iconName: "ShoppingCart",
  },
  {
    id: "eco-6",
    title: "Website Redesign",
    description: "Modernizing outdated legacy websites with refreshed visual aesthetics while preserving 100% of organic SEO equity.",
    iconName: "RefreshCw",
  },
  {
    id: "eco-7",
    title: "Landing Page Design",
    description: "High-velocity campaign pages engineered with psychological hooks, scannable hierarchies, and bold CTAs.",
    iconName: "Flame",
    badge: "High Conversion",
    colSpan: "wide",
  },
  {
    id: "eco-8",
    title: "Core Web Vitals & Speed",
    description: "Streamlined DOM structures, zero layout shift (CLS), rapid interactive states (INP), and lightning-fast LCP metrics.",
    iconName: "Gauge",
  },
];

export const servicesData: ServiceItem[] = [
  {
    id: "service-1",
    number: "01",
    title: "Custom UI/UX & Wireframing",
    description:
      "We design bespoke interfaces grounded in extensive user behavior research, ensuring intuitive navigation and compelling customer journeys from the first click.",
    tags: ["Figma & FigJam", "User Journey Mapping"],
    href: "/contact-us",
  },
  {
    id: "service-2",
    number: "02",
    title: "Responsive Web Design",
    description:
      "Our layouts flex dynamically across smartphone, tablet, laptop, and desktop viewports with fluid typography, responsive grids, and touch-optimized tap targets.",
    tags: ["Fluid Breakpoints", "Mobile-First UX"],
    href: "/contact-us",
  },
  {
    id: "service-3",
    number: "03",
    title: "Website Redesign & Rebranding",
    description:
      "Breathe fresh vitality into tired or underperforming websites with a contemporary visual overhaul, upgraded usability, and preserved URL/SEO structures.",
    tags: ["Modern Revamp", "Zero SEO Loss"],
    href: "/contact-us",
  },
  {
    id: "service-4",
    number: "04",
    title: "E-Commerce Storefront UI",
    description:
      "We build conversion-driven storefront experiences featuring distraction-free product showcases, intuitive search filters, and streamlined single-page checkouts.",
    tags: ["High-Conversion Funnels", "Streamlined Cart"],
    href: "/contact-us",
  },
  {
    id: "service-5",
    number: "05",
    title: "Figma / Adobe XD to Code",
    description:
      "Transforming complex UI designs into modular, clean, and reusable Next.js / React components without visual deviation or bloated stylesheets.",
    tags: ["Pixel Precision", "Component Architecture"],
    href: "/contact-us",
  },
  {
    id: "service-6",
    number: "06",
    title: "High-Velocity Landing Pages",
    description:
      "Tailor-made for paid ad campaigns and product launches, our targeted landing pages combine persuasive copy structure with focused conversion architecture.",
    tags: ["A/B Testing Ready", "Speed Optimized"],
    href: "/contact-us",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & UX Wireframing",
    description:
      "We analyze your business objectives, target audience demographics, and market competitors to architect user flows, content blueprints, and clickable wireframes.",
    deliverable: "Interactive Wireframes & Sitemap",
  },
  {
    number: "02",
    title: "UI Visual Styling",
    description:
      "We craft high-fidelity interface mockups in Figma, perfecting typography pairings, brand color palettes, micro-interactions, and component design tokens.",
    deliverable: "Complete Figma Design System",
  },
  {
    number: "03",
    title: "Frontend Development",
    description:
      "Our engineering team translates approved designs into semantic, fully responsive Next.js / TypeScript code featuring fluid animations and accessible HTML.",
    deliverable: "Clean, Modular App Code",
  },
  {
    number: "04",
    title: "Testing & Launch",
    description:
      "Rigorous cross-browser verification, mobile responsiveness testing, Core Web Vitals profiling, accessibility audits, and smooth production deployment.",
    deliverable: "Live, High-Speed Website",
  },
];

export const statsData: StatItem[] = [
  {
    id: "stat-1",
    numericValue: 250,
    suffix: "+",
    label: "Websites Designed",
    subtext: "Delivered across diverse business domains worldwide.",
  },
  {
    id: "stat-2",
    numericValue: 99.9,
    suffix: "%",
    decimals: 1,
    label: "Mobile Responsiveness",
    subtext: "Pixel-perfect display on every screen size & orientation.",
  },
  {
    id: "stat-3",
    numericValue: 10,
    suffix: "+",
    label: "Years Design Expertise",
    subtext: "Refining user-centric engineering and modern interfaces.",
  },
  {
    id: "stat-4",
    numericValue: 24,
    suffix: "/7",
    label: "Support & Maintenance",
    subtext: "Continuous design enhancements and rapid assistance.",
  },
];

export const industriesData: IndustryItem[] = [
  {
    id: "ind-1",
    title: "Corporate & B2B",
    description:
      "Authoritative, credible digital presences built to establish enterprise authority, generate high-intent inbound leads, and showcase client case studies.",
    metric: "99%",
    metricLabel: "B2B Trust Index",
    iconName: "Briefcase",
  },
  {
    id: "ind-2",
    title: "E-Commerce & Retail",
    description:
      "Engaging storefronts engineered to maximize average order value, streamline browsing, and convert first-time visitors into repeat customers.",
    metric: "+45%",
    metricLabel: "Conversion Lift",
    iconName: "ShoppingBag",
  },
  {
    id: "ind-3",
    title: "Healthcare & Services",
    description:
      "Clean, reassuring, and ADA-compliant interfaces designed for effortless appointment scheduling, service discovery, and patient confidence.",
    metric: "100%",
    metricLabel: "Clean & Secure UX",
    iconName: "HeartPulse",
  },
  {
    id: "ind-4",
    title: "Tech Startups & SaaS",
    description:
      "Sleek, product-centric interfaces with feature animations, interactive interactive previews, clear pricing tiers, and fast signup pathways.",
    metric: "10x",
    metricLabel: "Scale & Growth Ready",
    iconName: "Rocket",
  },
];

export const faqData: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is included in your website design service?",
    answer:
      "Our end-to-end design service covers everything from initial market research and UX wireframing to high-fidelity Figma visual mockups, responsive mobile layouts, design system tokens, custom iconography, micro-animations, and production-ready frontend implementation.",
  },
  {
    id: "faq-2",
    question: "Are all website designs fully mobile responsive across devices?",
    answer:
      "Yes, 100%. We employ a mobile-first design strategy, ensuring fluid scaling, intuitive touch targets, optimized media loading, and legible typography across small 360px phones, tablets, laptops, and 4K ultra-wide screens.",
  },
  {
    id: "faq-3",
    question: "Can you redesign an existing website without losing our current SEO rankings?",
    answer:
      "Absolutely. When redesigning an existing website, we preserve your existing URL slugs, metadata structures, and heading hierarchies, while implementing 301 redirects where applicable. This ensures your search engine rankings and organic traffic remain intact.",
  },
  {
    id: "faq-4",
    question: "Do you create Figma or Adobe XD prototypes before writing code?",
    answer:
      "Yes. We design and deliver interactive clickable prototypes in Figma or Adobe XD for your review and feedback before writing any frontend code. You can test user flows, review visual styles, and request revisions until you are completely satisfied.",
  },
  {
    id: "faq-5",
    question: "What is the typical project timeline from kickoff to launch?",
    answer:
      "A typical website design project takes between 1 to 3 weeks depending on project scope, page count, and custom feature requirements. We provide a milestone-based timeline at project kickoff with regular progress check-ins.",
  },
];


export const websiteDesignData: ServicePageData = {
  hero: {
    badge: "Website Design Service",
    title: "Custom Web Designs That",
    highlight: "Convert Visitors",
    description: "We create elegant, responsive websites optimized for speed, accessibility, and conversions.",
    chips: heroFeatureChips,
    primaryCta: { label: "Get Free Design Quote", href: "/contact-us" },
    secondaryCta: { label: "Explore Services", href: "#web-design-services" },
    trustItems: heroTrustItems,
    previewUrl: "sumitdevtech.com/website-design",
    floatingBadge1: { title: "100% Mobile Ready", sub: "Fluid Micro-Breakpoints" },
    floatingBadge2: { title: "Pixel-Perfect Responsive", sub: "Modern Figma Systems" },
  },
  ecosystem: {
    label: "Full-Stack Design Hub",
    title: "Our 8-Core Web Design",
    highlight: "Ecosystem",
    text: "An integrated end-to-end framework uniting human-centered wireframing, high-fidelity visual styling, and high-velocity frontend engineering.",
    cards: ecosystemCards,
  },
  services: {
    id: "web-design-services",
    label: "Expertise & Services",
    title: "Precision-Engineered Web Design",
    highlight: "Solutions",
    text: "Explore our focused design capabilities. Every package is custom-crafted to solve specific user experience bottlenecks and drive measurable business ROI.",
    items: servicesData,
  },
  process: {
    label: "Proven Workflow",
    title: "Our 4-Step Web Design",
    highlight: "Process",
    text: "From initial concepts and architecture to high-fidelity Figma models and responsive frontend code, our process is transparent, structured, and milestone-driven.",
    steps: processSteps,
  },
  stats: {
    items: statsData,
  },
  industries: {
    label: "Domain Expertise",
    title: "Website Designs Built For",
    highlight: "Every Industry",
    text: "Whether establishing enterprise credibility, accelerating consumer sales, or scaling SaaS signups, our custom designs target your industry's specific user behaviors.",
    items: industriesData,
  },
  faq: {
    label: "Got Questions?",
    title: "Frequently Asked",
    highlight: "Questions",
    text: "Clear answers about our design process, deliverables, mobile adaptability, and production timelines.",
    items: faqData,
  },
  cta: {
    badge: "Let's Build Your Vision",
    title: "Ready to Elevate Your",
    highlight: "Brand Online?",
    text: "Partner with dedicated UI/UX designers and Next.js developers to build an impactful, conversion-engineered website tailored precisely to your goals.",
    benefits: [
      "Custom Figma Wireframes & Prototypes",
      "Mobile-First Responsive Layouts",
      "Fast Loading & Core Web Vitals Ready",
    ],
    buttonText: "Get Free Consultation",
    buttonHref: "/contact-us",
  },
};
