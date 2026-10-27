export interface PricingFeature {
  title: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  price: string;
  period: string;
  popular?: boolean;
  idealFor: string;
  deliveryTime: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

export interface PackageCategory {
  id: string;
  title: string;
  description: string;
  plans: PricingPlan[];
}

export const packageCategories: PackageCategory[] = [
  {
    id: "web-dev",
    title: "Web Design & Development Packages",
    description: "End-to-end engineering from startup MVP websites to high-traffic enterprise web platforms.",
    plans: [
      {
        id: "static",
        name: "Static",
        tagline: "A fast, professional online presence.",
        price: "₹14,999",
        period: "one-time",
        idealFor: "Freelancers, local shops, and small businesses that need to be found online",
        deliveryTime: "7 - 10 Days",
        ctaText: "Get Static Website",
        ctaHref: "/contact-us?plan=starter-web",
        features: [
          "Up to 5 pages (Home, About, Services, Gallery, Contact)",
          "Custom responsive design for mobile, tablet, and desktop",
          "Contact form with email notifications",
          "Basic on-page SEO (titles, meta tags, sitemap)",
          "Google Maps and WhatsApp chat button",
          "Social media links",
          "Free SSL setup",
        ],
      },
      {
        id: "dynamic",
        name: "Dynamic",
        tagline: "A website you can update yourself and grow over time..",
        price: "₹29,999",
        period: "one-time",
        idealFor: "Growing businesses, clinics, institutes, real estate, and service companies that publish content often",
        deliveryTime: "2 - 3 Weeks",
        ctaText: "Get Dynamic Website",
        ctaHref: "/contact-us?plan=growth-web",
        features: [
          "Up to 12 pages",
          "Admin panel to edit pages, images, and listings without code",
          "Blog or news section",
          "Database-driven features (enquiry records, service listings, testimonials)",
          "Online enquiry or appointment booking form",
          "Advanced SEO setup (schema markup, speed optimization)",
          "Google Analytics and Search Console setup",
          "1 third-party integration (CRM, payment link, or email tool)",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        tagline: "A complete, custom digital platform built to scale.",
        price: "₹59,999",
        period: "starting from",
        idealFor: "Online stores, startups, and established businesses that want custom features and room to grow.",
        deliveryTime: "4 - 6 Weeks",
        ctaText: "Get Premium Quote",
        ctaHref: "/contact-us?plan=enterprise-web",
        features: [
          "Unlimited pages and fully custom UI/UX design",
          "E-commerce store (products, cart, checkout, order management)",
          "Payment gateway and COD setup",
          "User login, roles, and customer dashboards",
          "Custom features and API integrations",
          "Speed tuning for strong Core Web Vitals",
          "Monthly SEO and performance report for the first 3 months",
          "90 days of priority support after launch",
        ],
      },
    ],
  },
];

export const packageFaqs = [
  {
    q: "Are there any hidden costs after package completion?",
    a: "No. All our package quotes are completely transparent. Third-party recurring subscriptions like custom domains or premium cloud hosting plans are billed directly to your own account so you maintain 100% ownership.",
  },
  {
    q: "Do I get full ownership of my website's code and assets?",
    a: "Yes, absolutely. Once final delivery is verified, you receive complete source code repository access and full IP rights.",
  },
  {
    q: "What if my requirements don't fit into a standard package?",
    a: "We regularly architect bespoke enterprise scopes. Simply schedule a free consultation with our tech team and we will craft a tailor-made scope of work for your specific milestones.",
  },
  {
    q: "How does the payment milestone schedule work?",
    a: "Typically projects are split into structured milestones: 40% project kickoff advance, 40% upon staging milestone approval, and 20% on live deployment and code handoff.",
  },
];

