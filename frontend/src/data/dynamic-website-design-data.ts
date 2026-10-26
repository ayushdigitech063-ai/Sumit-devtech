import { ServicePageData } from "@/types/service-page";
import type {
  FeatureChip,
  TrustItem,
  EcosystemCard,
  ServiceItem,
  ProcessStep,
  StatItem,
  IndustryItem,
  FaqItem,
} from "@/data/website-design-data";

export const heroFeatureChips: FeatureChip[] = [
  { id: "chip-1", label: "Database-Driven UI" },
  { id: "chip-2", label: "Custom CMS Portals" },
  { id: "chip-3", label: "Real-Time Data Feeds" },
  { id: "chip-4", label: "API Integrations" },
];

export const heroTrustItems: TrustItem[] = [
  { id: "trust-1", value: "4.9/5", label: "Rating (300+ Dynamic Sites)" },
  { id: "trust-2", value: "100%", label: "Database Security" },
  { id: "trust-3", value: "99.9%", label: "Server Uptime" },
  { id: "trust-4", value: "PHP+SQL", label: "MySQL Core Stack" },
];

export const ecosystemCards: EcosystemCard[] = [
  {
    id: "eco-1",
    title: "Database-Driven Architecture",
    description: "Custom MySQL and PostgreSQL schemas that keep your content, users, and products organized, scalable, and fast to query.",
    iconName: "Code2",
    badge: "Data Core",
    colSpan: "wide",
  },
  {
    id: "eco-2",
    title: "Custom CMS Admin Panels",
    description: "Simple admin dashboards that let your team update pages, images, and listings in real time without touching code.",
    iconName: "Layout",
    badge: "No-Code Control",
  },
  {
    id: "eco-3",
    title: "Dynamic Content Rendering",
    description: "Personalized feeds, live filters, and instant search that show every visitor the content that matters to them.",
    iconName: "Palette",
  },
  {
    id: "eco-4",
    title: "Real-Time API Integrations",
    description: "Reliable connections to RESTful APIs, payment gateways, CRMs, and third-party services with live data synchronization.",
    iconName: "RefreshCw",
    badge: "Live Sync",
    colSpan: "wide",
  },
  {
    id: "eco-5",
    title: "Dynamic E-Commerce Portals",
    description: "Interactive product catalogs, live inventory updates, and smooth checkout flows backed by your own database.",
    iconName: "ShoppingCart",
  },
  {
    id: "eco-6",
    title: "User Auth & Roles",
    description: "Secure sign-up and login on any device, encrypted passwords, and multi-level permissions for admins, staff, and customers.",
    iconName: "Smartphone",
  },
  {
    id: "eco-7",
    title: "Sub-Second Caching Speed",
    description: "Tuned SQL queries, Redis caching, and efficient server rendering that keep data-heavy pages loading quickly.",
    iconName: "Gauge",
    badge: "Blazing Fast",
    colSpan: "wide",
  },
  {
    id: "eco-8",
    title: "Dynamic SEO & Sitemaps",
    description: "Automatic meta tags, schema markup, and always-fresh XML sitemaps so new content gets discovered quickly.",
    iconName: "Flame",
  },
];

export const servicesData: ServiceItem[] = [
  {
    id: "service-1",
    number: "01",
    title: "Custom Database-Driven Web Design",
    description:
      "We build PHP and MySQL web portals on a clean database architecture with structured queries and secure data storage, so your site grows as your content does.",
    tags: ["Database UI", "PHP / MySQL"],
    href: "/contact-us",
  },
  {
    id: "service-2",
    number: "02",
    title: "Bespoke CMS & Admin Dashboards",
    description:
      "Easy-to-use admin panels designed around your workflow, so you can manage pages, products, images, and user records without developer help.",
    tags: ["Custom Admin Panel", "Content Management"],
    href: "/contact-us",
  },
  {
    id: "service-3",
    number: "03",
    title: "Real-Time Data & API Integration",
    description:
      "Connect your website with third-party APIs, live data feeds, payment gateways, and business tools, with data kept in sync automatically.",
    tags: ["RESTful APIs", "Live Data Feeds"],
    href: "/contact-us",
  },
  {
    id: "service-4",
    number: "04",
    title: "Dynamic E-Commerce & Product Portals",
    description:
      "Filterable catalogs, working shopping carts, live stock tracking, and custom checkout flows that respond instantly to what customers do.",
    tags: ["Dynamic Catalog", "Inventory Sync"],
    href: "/contact-us",
  },
  {
    id: "service-5",
    number: "05",
    title: "User Authentication & Portals",
    description:
      "Secure login and registration, role-based access control, and personal profile areas so each user sees only what they should.",
    tags: ["User Auth", "Role Management"],
    href: "/contact-us",
  },
  {
    id: "service-6",
    number: "06",
    title: "Dynamic Speed & SQL Tuning",
    description:
      "We optimize slow queries, add smart indexing and Redis caching, and fine-tune server rendering to keep data-rich pages loading in under a second.",
    tags: ["Query Optimization", "Redis Caching"],
    href: "/contact-us",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Database Schema & Wireframing",
    description:
      "We map your data model, plan entity relationships, and sketch dynamic user flows so the structure is right before any build begins.",
    deliverable: "ER Diagram & Flow Wireframes",
  },
  {
    number: "02",
    title: "Dynamic UI Component Styling",
    description:
      "We design responsive templates, data grids, forms, and admin screens that make real-time content easy to read and manage.",
    deliverable: "Frontend Templates & Admin Mockups",
  },
  {
    number: "03",
    title: "Backend Code & API Integration",
    description:
      "Our developers write the server-side logic, database queries, and API endpoints that power your features and connect your tools.",
    deliverable: "Working Backend & API Endpoints",
  },
  {
    number: "04",
    title: "QA Testing & Launch",
    description:
      "We run database load tests, SQL security audits, and speed tuning, then deploy to a live server with a smooth go-live.",
    deliverable: "Secure, Live Dynamic Website",
  },
];

export const statsData: StatItem[] = [
  {
    id: "stat-1",
    numericValue: 300,
    suffix: "+",
    label: "Dynamic Sites Built",
    subtext: "Data-driven websites delivered across many industries.",
  },
  {
    id: "stat-2",
    numericValue: 100,
    suffix: "%",
    label: "Database Integration",
    subtext: "Every feature connected to a clean, well-structured database.",
  },
  {
    id: "stat-3",
    numericValue: 99.9,
    suffix: "%",
    decimals: 1,
    label: "Server Uptime",
    subtext: "Reliable hosting setups that keep your portal available.",
  },
  {
    id: "stat-4",
    numericValue: 24,
    suffix: "/7",
    label: "Support & Maintenance",
    subtext: "Ongoing updates, monitoring, and quick technical help.",
  },
];

export const industriesData: IndustryItem[] = [
  {
    id: "ind-1",
    title: "Corporate & Enterprise",
    description:
      "Dynamic company portals with role-based access, news and notice management, and private client areas.",
    metric: "99%",
    metricLabel: "Enterprise Trust Index",
    iconName: "Briefcase",
  },
  {
    id: "ind-2",
    title: "Dynamic E-Commerce",
    description:
      "Filterable product catalogs, real-time stock updates, and live carts that make buying quick and easy.",
    metric: "+50%",
    metricLabel: "Sales Growth",
    iconName: "ShoppingBag",
  },
  {
    id: "ind-3",
    title: "Healthcare & Booking",
    description:
      "Online appointment scheduling, live doctor availability calendars, and patient portals that reduce phone calls.",
    metric: "24/7",
    metricLabel: "Online Booking",
    iconName: "HeartPulse",
  },
  {
    id: "ind-4",
    title: "SaaS & Member Portals",
    description:
      "Interactive user dashboards, subscription management, and live data feeds that keep members engaged.",
    metric: "10x",
    metricLabel: "Scale & Growth Ready",
    iconName: "Rocket",
  },
];

export const faqData: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is a dynamic website, and how is it different from a static one?",
    answer:
      "A dynamic website pulls its content from a database in real time, based on what users do or what admins update. A static site shows the same fixed pages to everyone. With a dynamic site you can manage content through an admin panel without editing any code.",
  },
  {
    id: "faq-2",
    question: "Can I update my website content myself?",
    answer:
      "Yes. We build a custom admin dashboard where you can add, edit, or remove pages, blog posts, products, images, and user records. No technical knowledge is needed, and we provide a walkthrough at handover.",
  },
  {
    id: "faq-3",
    question: "Which technologies do you use for dynamic websites?",
    answer:
      "We work with PHP, MySQL, Node.js, and custom RESTful APIs, choosing the stack that best fits your performance, security, and scaling needs.",
  },
  {
    id: "faq-4",
    question: "How do you keep dynamic websites secure and fast?",
    answer:
      "We use prepared SQL statements to prevent injection attacks, encrypt passwords, apply database indexing, and add Redis or Memcached caching. Together these protect your data and keep pages loading quickly.",
  },
  {
    id: "faq-5",
    question: "How long does a dynamic website project take?",
    answer:
      "Most dynamic website projects take 2 to 4 weeks, depending on database complexity, custom admin features, and the number of API integrations. We share a milestone-based timeline at kickoff.",
  },
];

export const dynamicWebsiteDesignData: ServicePageData = {
  hero: {
    badge: "Dynamic Website Design Service",
    title: "Database-Driven Websites That Update in Real Time and",
    highlight: "Grow With You",
    description: "We build fast, interactive dynamic websites and custom CMS portals with seamless database integration, personalized user experiences, and content you can update in minutes.",
    chips: heroFeatureChips,
    primaryCta: { label: "Get Dynamic Quote", href: "/contact-us" },
    secondaryCta: { label: "Explore Features", href: "#web-design-services" },
    trustItems: heroTrustItems,
    previewUrl: "sumitdevtech.com/dynamic-website-design",
    floatingBadge1: { title: "100% Database Driven", sub: "PHP & MySQL Core" },
    floatingBadge2: { title: "Real-Time Data Sync", sub: "RESTful API Architecture" },
  },
  ecosystem: {
    label: "Dynamic Engineering Hub",
    title: "Our 8-Core Dynamic Design",
    highlight: "Ecosystem",
    text: "From database architecture and custom CMS admin panels to real-time API integrations, explore everything that powers a high-performing dynamic website.",
    cards: ecosystemCards,
  },
  services: {
    id: "web-design-services",
    label: "Expertise & Services",
    title: "Specialized Dynamic Web Design",
    highlight: "Solutions",
    text: "Our full range of dynamic web solutions is built for real-time data updates, easy content management, and interactive user experiences.",
    items: servicesData,
  },
  process: {
    label: "Proven Workflow",
    title: "Our 4-Step Dynamic Design",
    highlight: "Process",
    text: "We follow a database-first approach so your dynamic website is fast, interactive, and built to convert from day one.",
    steps: processSteps,
  },
  stats: {
    items: statsData,
  },
  industries: {
    label: "Tailored Industry Solutions",
    title: "Dynamic Designs Built For",
    highlight: "Every Industry",
    text: "We create dynamic web experiences matched to how different industries manage data, serve customers, and grow.",
    items: industriesData,
  },
  faq: {
    label: "Got Questions?",
    title: "Frequently Asked",
    highlight: "Questions",
    text: "Quick answers about our dynamic website design process, technologies, security, and timelines.",
    items: faqData,
  },
  cta: {
    badge: "Start Your Dynamic Project",
    title: "Ready to Build Your",
    highlight: "Dynamic Web Portal?",
    text: "Talk to our dynamic web design team for a free technical consultation and a tailored quote for your project.",
    benefits: [
      "Custom Database Schema & Wireframes",
      "Secure Admin Panel & Role-Based Access",
      "Fast Queries & Caching Ready",
    ],
    buttonText: "Get Free Consultation",
    buttonHref: "/contact-us",
  },
};