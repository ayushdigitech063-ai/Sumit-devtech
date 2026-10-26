import { site } from "./site";

export type ProjectCategory = "See All" | "Technology" | "Helpdesk" | "Analysis" | "Marketing";

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  categories: ProjectCategory[];
  description: string;
  image?: string;
  href: string;
  featured?: boolean;
  bentoSpan?: "col-span-1" | "col-span-1 md:col-span-2" | "col-span-1 lg:col-span-2";
  gradientAccent?: string;
}

export interface ProjectPageData {
  hero: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
  };
  projects: {
    categories: ProjectCategory[];
    items: ProjectItem[];
  };
  cta: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    buttonText: string;
    buttonHref: string;
    phoneNumber: string;
  };
}

export const fallbackPhone = site.phones?.[0] || "+91-6201533997";

export const projectsPageData: ProjectPageData = {
  hero: {
    badge: "Portfolio & Case Studies",
    title: "Our Work & Impactful",
    highlight: "Projects",
    subtitle:
      "Explore how we transform complex business challenges into sleek, high-converting digital products, cloud platforms, and modern web applications.",
  },
  projects: {
    categories: ["See All", "Technology", "Helpdesk", "Analysis", "Marketing"],
    items: [
      {
        id: "proj-1",
        slug: "software-and-app",
        title: "Software & App Development",
        categories: ["Technology"],
        description: "Enterprise-grade cloud application with reactive frontend architecture and microservices backend.",
        image: "",
        href: "/project-details",
        featured: true,
        bentoSpan: "col-span-1 lg:col-span-2",
        gradientAccent: "from-accent/20 via-dark-2 to-dark",
      },
      {
        id: "proj-2",
        slug: "web-development",
        title: "Web Development",
        categories: ["Technology"],
        description: "High-velocity Next.js digital platform engineered for sub-second speeds and flawless mobile UX.",
        image: "",
        href: "/project-details",
        bentoSpan: "col-span-1",
        gradientAccent: "from-accent-2/20 via-dark-2 to-dark",
      },
      {
        id: "proj-3",
        slug: "platform-integration",
        title: "Platform Integration",
        categories: ["Technology", "Helpdesk"],
        description: "Unified API middleware synchronizing legacy CRM, ERP, and real-time customer ticketing systems.",
        image: "",
        href: "/project-details",
        bentoSpan: "col-span-1",
        gradientAccent: "from-emerald-500/20 via-dark-2 to-dark",
      },
      {
        id: "proj-4",
        slug: "network-security",
        title: "Network Security & DevOps",
        categories: ["Technology", "Helpdesk"],
        description: "Zero-trust server hardening, automated WAF intrusion defense, and 24/7 uptime infrastructure.",
        image: "",
        href: "/project-details",
        bentoSpan: "col-span-1",
        gradientAccent: "from-cyan-500/20 via-dark-2 to-dark",
      },
      {
        id: "proj-5",
        slug: "digital-marketing",
        title: "Digital Marketing & Growth",
        categories: ["Marketing", "Analysis"],
        description: "Data-driven SEO campaign and multi-channel acquisition funnel generating 3.8x revenue return.",
        image: "",
        href: "/project-details",
        bentoSpan: "col-span-1",
        gradientAccent: "from-amber-500/20 via-dark-2 to-dark",
      },
      {
        id: "proj-6",
        slug: "product-and-design",
        title: "Product & UI/UX Design",
        categories: ["Marketing", "Technology"],
        description: "Human-centered design system and interactive prototype driving 45% higher conversion completion.",
        image: "",
        href: "/project-details",
        featured: true,
        bentoSpan: "col-span-1 lg:col-span-2",
        gradientAccent: "from-accent/25 via-accent-2/15 to-dark",
      },
    ],
  },
  cta: {
    badge: "Start Your Project",
    title: "Elevating Customer",
    highlight: "Experience.",
    subtitle:
      "Partner with our specialized design and development team to engineer an exceptional digital product that delivers measurable commercial results.",
    buttonText: "Get In Touch",
    buttonHref: "/contact-us",
    phoneNumber: fallbackPhone,
  },
};
