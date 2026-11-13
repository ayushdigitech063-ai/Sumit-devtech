export interface CityLocation {
  slug: string;
  name: string;
  state: string;
  country: string;
  tagline: string;
  phone?: string;
  popularAreas: string[];
  localKeywords: string[];
}

export interface ServiceDefinition {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  highlights: string[];
  deliverables: string[];
}

export const supportedCities: CityLocation[] = [
  {
    slug: "in-jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    country: "India",
    tagline: "Premier Web Design & Digital Growth Agency in Pink City",
    popularAreas: ["Mansarovar", "Malviya Nagar", "Vaishali Nagar", "C-Scheme", "Raja Park", "Tonk Road"],
    localKeywords: [
      "best website development company in jaipur",
      "seo services in jaipur",
      "web design agency jaipur rajasthan",
      "ecommerce developers in jaipur",
    ],
  },
  {
    slug: "in-delhi-ncr",
    name: "Delhi NCR",
    state: "Delhi",
    country: "India",
    tagline: "Enterprise Web Development & Performance SEO for Delhi, Gurgaon & Noida",
    popularAreas: ["Gurgaon Cyber City", "Noida Sector 62", "South Delhi", "Connaught Place", "Nehru Place"],
    localKeywords: [
      "website development company in delhi ncr",
      "seo agency in gurgaon",
      "web designers in noida",
      "custom ecommerce development delhi",
    ],
  },
  {
    slug: "in-mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    country: "India",
    tagline: "High-Converting Web Design & Growth Marketing for Mumbai Businesses",
    popularAreas: ["BKC", "Andheri West", "Lower Parel", "Nariman Point", "Powai", "Navi Mumbai"],
    localKeywords: [
      "website development company in mumbai",
      "seo services in mumbai",
      "shopify developers mumbai",
      "corporate website design bkc",
    ],
  },
  {
    slug: "in-bangalore",
    name: "Bangalore",
    state: "Karnataka",
    country: "India",
    tagline: "Next.js, React & Scalable SaaS Development for Bangalore Tech Ecosystem",
    popularAreas: ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Electronic City"],
    localKeywords: [
      "nextjs developers in bangalore",
      "software development agency bangalore",
      "seo agency for startups bangalore",
      "react development bangalore",
    ],
  },
  {
    slug: "in-pune",
    name: "Pune",
    state: "Maharashtra",
    country: "India",
    tagline: "Bespoke Web Design & Growth Architecture for Pune Enterprises",
    popularAreas: ["Hinjewadi", "Koregaon Park", "Viman Nagar", "Baner", "Kothrud", "Wakad"],
    localKeywords: [
      "web development in pune",
      "seo experts pune",
      "wordpress agency pune",
    ],
  },
  {
    slug: "in-dubai",
    name: "Dubai",
    state: "Dubai",
    country: "UAE",
    tagline: "Luxury Web Design & Global Digital Expansion for UAE Enterprises",
    popularAreas: ["Downtown Dubai", "Business Bay", "Dubai Marina", "JLT", "DIFC"],
    localKeywords: [
      "website development company in dubai",
      "seo agency uae",
      "ecommerce web design dubai",
    ],
  },
];

export const supportedServices: ServiceDefinition[] = [
  {
    slug: "seo-services",
    name: "Search Engine Optimization (SEO)",
    shortName: "SEO Services",
    description: "Rank #1 on Google with high-intent keyword ranking, technical zero-loss audits, and ROI-driven conversion funnels.",
    iconName: "TrendingUp",
    highlights: ["First Page Google Rankings", "Technical Core Web Vitals Audit", "Local 3-Pack Map Dominance", "Data-Driven ROI Funnels"],
    deliverables: ["Comprehensive SEO Audit", "High-Volume Competitor Gap Analysis", "On-Page Semantic Optimization", "High-Authority Editorial Backlinks"],
  },
  {
    slug: "website-design",
    name: "Bespoke Website Design & UI/UX",
    shortName: "Website Design",
    description: "Visually stunning, mobile-first responsive web designs engineered to convert visitors into loyal paying customers.",
    iconName: "Layout",
    highlights: ["Custom Figma UI/UX Prototypes", "Sub-Second Page Speeds", "Fluid Mobile-First Breakpoints", "100% Brand Tailored"],
    deliverables: ["Wireframes & Interactive Prototypes", "Custom Design System", "Production Ready Component Code", "Conversion Rate Optimization"],
  },
  {
    slug: "web-development",
    name: "Next.js & Custom Web Development",
    shortName: "Web Development",
    description: "Scalable, lightning-fast web applications built on Next.js 15, React, Node.js, and modern cloud infrastructure.",
    iconName: "Code2",
    highlights: ["React & Next.js Turbopack", "Clean Server Component Architecture", "Secure Zero-Trust APIs", "99.9% Uptime SLA"],
    deliverables: ["Full-Stack Source Code", "CI/CD Deployment Pipelines", "Cloud CDN Setup", "Post-Launch Warranty"],
  },
  {
    slug: "ecommerce-development",
    name: "Shopify & Custom E-Commerce Development",
    shortName: "E-Commerce Development",
    description: "High-volume, frictionless online stores designed for maximum average order value and frictionless checkout.",
    iconName: "ShoppingBag",
    highlights: ["Shopify & WooCommerce Experts", "Seamless Payment Gateway Integration", "High-Speed Mobile Cart", "Automated Inventory Sync"],
    deliverables: ["Custom Storefront Theme", "Payment & Courier Integrations", "Analytics & Conversion Tracking", "Staff Training"],
  },
  {
    slug: "wordpress-development",
    name: "Enterprise WordPress & Headless CMS",
    shortName: "WordPress Development",
    description: "Secure, high-speed custom WordPress themes and headless setups without bloat or security vulnerabilities.",
    iconName: "Globe",
    highlights: ["Custom Theme & Gutenberg Blocks", "No Bulky Elementor Bloat", "Zero-Vulnerability Hardening", "Sub-Second Cache Speeds"],
    deliverables: ["Custom Gutenberg Theme", "Enterprise Hosting Setup", "Automated Daily Backups", "Editor Documentation"],
  },
];
