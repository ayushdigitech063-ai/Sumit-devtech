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
        image: "/images/projects/case-thumb.png",
        href: "/project-detail/software-and-app",
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
        image: "/images/projects/case-thumb2.png",
        href: "/project-detail/web-development",
        bentoSpan: "col-span-1",
        gradientAccent: "from-accent-2/20 via-dark-2 to-dark",
      },
      {
        id: "proj-3",
        slug: "platform-integration",
        title: "Platform Integration",
        categories: ["Technology", "Helpdesk"],
        description: "Unified API middleware synchronizing legacy CRM, ERP, and real-time customer ticketing systems.",
        image: "/images/projects/case-thumb3.png",
        href: "/project-detail/platform-integration",
        bentoSpan: "col-span-1",
        gradientAccent: "from-emerald-500/20 via-dark-2 to-dark",
      },
      {
        id: "proj-4",
        slug: "network-security",
        title: "Network Security & DevOps",
        categories: ["Technology", "Helpdesk"],
        description: "Zero-trust server hardening, automated WAF intrusion defense, and 24/7 uptime infrastructure.",
        image: "/images/projects/case-thumb4.png",
        href: "/project-detail/network-security",
        bentoSpan: "col-span-1",
        gradientAccent: "from-cyan-500/20 via-dark-2 to-dark",
      },
      {
        id: "proj-5",
        slug: "digital-marketing",
        title: "Digital Marketing & Growth",
        categories: ["Marketing", "Analysis"],
        description: "Data-driven SEO campaign and multi-channel acquisition funnel generating 3.8x revenue return.",
        image: "/images/projects/case-thumb5.png",
        href: "/project-detail/digital-marketing",
        bentoSpan: "col-span-1",
        gradientAccent: "from-amber-500/20 via-dark-2 to-dark",
      },
      {
        id: "proj-6",
        slug: "product-and-design",
        title: "Product & UI/UX Design",
        categories: ["Marketing", "Technology"],
        description: "Human-centered design system and interactive prototype driving 45% higher conversion completion.",
        image: "/images/projects/case-thumb6.png",
        href: "/project-detail/product-and-design",
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


// ─── Project Detail Page Types ─────────────────────────────────────────────────

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectTechStack {
  name: string;
  color: string;
}

export interface ProjectFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProjectResult {
  metric: string;
  value: string;
  description: string;
}

export interface ProjectDetailItem {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  duration: string;
  deliveredAt: string;
  liveUrl?: string;
  image: string;
  overview: string;
  challenge: string;
  solution: string;
  stats: ProjectStat[];
  techStack: ProjectTechStack[];
  features: ProjectFeature[];
  results: ProjectResult[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const projectDetails: ProjectDetailItem[] = [
  {
    slug: "software-and-app",
    title: "Software & App Development",
    tagline: "Enterprise-grade cloud application with reactive frontend and microservices backend.",
    category: "Technology",
    duration: "4 Months",
    deliveredAt: "2024",
    liveUrl: "/contact-us",
    image: "/images/projects/case-thumb.png",
    overview:
      "We engineered a full-stack enterprise SaaS platform to digitize operations for a mid-sized logistics company. The system replaced paper-based workflows with real-time dashboards, automated reporting, and a mobile-first interface—cutting manual data entry by 70%.",
    challenge:
      "The client operated across 12 warehouses with disconnected spreadsheets and legacy software that couldn't scale. There was no single source of truth, causing frequent inventory discrepancies and delayed order fulfilment.",
    solution:
      "We designed a microservices architecture using Next.js on the frontend and Node.js + PostgreSQL on the backend, deployed on AWS with auto-scaling. A real-time sync engine using WebSockets ensured all warehouses saw live inventory data simultaneously.",
    stats: [
      { value: "70%", label: "Reduction in manual work" },
      { value: "12", label: "Warehouses integrated" },
      { value: "3.2×", label: "Faster order fulfilment" },
      { value: "99.9%", label: "System uptime SLA" },
    ],
    techStack: [
      { name: "Next.js 15", color: "bg-accent/15 text-accent" },
      { name: "Node.js", color: "bg-emerald-500/15 text-emerald-600" },
      { name: "PostgreSQL", color: "bg-blue-500/15 text-blue-600" },
      { name: "AWS", color: "bg-amber-500/15 text-amber-600" },
      { name: "WebSockets", color: "bg-purple-500/15 text-purple-600" },
      { name: "Docker", color: "bg-cyan-500/15 text-cyan-600" },
    ],
    features: [
      { icon: "LayoutDashboard", title: "Real-Time Dashboard", description: "Live inventory and order data across all warehouses with zero refresh delays." },
      { icon: "Smartphone", title: "Mobile-First Interface", description: "Fully responsive PWA enabling warehouse staff to operate from any device." },
      { icon: "BarChart3", title: "Automated Reporting", description: "Scheduled PDF & Excel reports delivered to stakeholders without manual effort." },
      { icon: "ShieldCheck", title: "Role-Based Access", description: "Granular permissions per user role — warehouse manager, driver, and admin." },
      { icon: "Zap", title: "WebSocket Sync", description: "Sub-second data propagation across all connected clients using Socket.io." },
      { icon: "Cloud", title: "Cloud Auto-Scaling", description: "AWS ECS auto-scales compute during peak dispatch hours with zero downtime." },
    ],
    results: [
      { metric: "Order Processing", value: "3.2×", description: "Faster fulfilment cycle from order receipt to dispatch." },
      { metric: "Error Rate", value: "−85%", description: "Inventory discrepancies eliminated by real-time sync." },
      { metric: "Staff Productivity", value: "+60%", description: "Hours saved per week per warehouse by removing paper workflows." },
    ],
    testimonial: {
      quote: "Sumit DevTech delivered a platform that completely transformed how we run our warehouses. The real-time visibility alone paid for the project within 3 months.",
      author: "Rajesh Sharma",
      role: "COO, LogiCore Solutions",
    },
  },
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "High-velocity Next.js digital platform engineered for sub-second speeds and flawless mobile UX.",
    category: "Technology",
    duration: "6 Weeks",
    deliveredAt: "2024",
    liveUrl: "/contact-us",
    image: "/images/projects/case-thumb2.png",
    overview:
      "A performance-first corporate website for a B2B SaaS company, built with Next.js 15 App Router, achieving a Lighthouse score of 99 and sub-800ms LCP on mobile.",
    challenge:
      "The client's existing WordPress site loaded in 6+ seconds on mobile, had poor Core Web Vitals scores, and couldn't handle marketing campaign traffic spikes without downtime.",
    solution:
      "We rebuilt the entire site in Next.js with static generation (SSG), implemented a headless CMS for content management, used a global CDN, and applied image optimization via Next.js Image component throughout.",
    stats: [
      { value: "99", label: "Lighthouse Score" },
      { value: "780ms", label: "LCP on mobile" },
      { value: "6×", label: "Faster than old site" },
      { value: "40%", label: "Conversion rate lift" },
    ],
    techStack: [
      { name: "Next.js 15", color: "bg-accent/15 text-accent" },
      { name: "TypeScript", color: "bg-blue-500/15 text-blue-600" },
      { name: "Tailwind CSS", color: "bg-cyan-500/15 text-cyan-600" },
      { name: "Sanity CMS", color: "bg-red-500/15 text-red-600" },
      { name: "Vercel", color: "bg-dark/10 text-ink" },
      { name: "Framer Motion", color: "bg-purple-500/15 text-purple-600" },
    ],
    features: [
      { icon: "Zap", title: "Sub-Second Load", description: "SSG + CDN edge caching delivers pages in under 800ms globally." },
      { icon: "Smartphone", title: "Mobile-First Design", description: "Pixel-perfect responsive layouts tested across 20+ device sizes." },
      { icon: "Globe", title: "Headless CMS", description: "Sanity Studio lets the marketing team edit content without touching code." },
      { icon: "Search", title: "Technical SEO", description: "Structured data, canonical tags, and XML sitemap generation built-in." },
      { icon: "Palette", title: "Animated UI", description: "Scroll-triggered Framer Motion animations with prefers-reduced-motion support." },
      { icon: "ShieldCheck", title: "Secure & GDPR Ready", description: "CSP headers, cookie consent, and form data encryption from day one." },
    ],
    results: [
      { metric: "Page Speed", value: "6×", description: "Improvement over old WordPress site on mobile devices." },
      { metric: "Bounce Rate", value: "−34%", description: "Visitors stay longer thanks to faster loads and better UX." },
      { metric: "Lead Generation", value: "+40%", description: "Higher form fill rate from improved CTA placement and page speed." },
    ],
    testimonial: {
      quote: "Our marketing team can now update content themselves, and the site just flies. We've seen a measurable uptick in demo requests since launch.",
      author: "Priya Mehta",
      role: "Marketing Director, CloudAxis",
    },
  },
  {
    slug: "platform-integration",
    title: "Platform Integration",
    tagline: "Unified API middleware synchronizing legacy CRM, ERP, and real-time customer ticketing systems.",
    category: "Technology · Helpdesk",
    duration: "3 Months",
    deliveredAt: "2023",
    liveUrl: "/contact-us",
    image: "/images/projects/case-thumb3.png",
    overview:
      "Built a robust API integration layer connecting Salesforce CRM, SAP ERP, and a custom helpdesk ticketing system for a 500-seat enterprise—eliminating data silos and reducing support resolution time by 55%.",
    challenge:
      "Three departments operated on entirely separate platforms with no data sharing. Support agents couldn't see customer orders, sales reps couldn't see open tickets, and finance had no live revenue visibility.",
    solution:
      "We built a Node.js middleware hub with webhook listeners, REST adapters, and a message queue (RabbitMQ) to sync data bi-directionally in near real-time. A unified admin dashboard gave every team a single view of the customer.",
    stats: [
      { value: "3", label: "Systems integrated" },
      { value: "55%", label: "Faster ticket resolution" },
      { value: "<2s", label: "Avg. data sync latency" },
      { value: "500+", label: "Daily active users" },
    ],
    techStack: [
      { name: "Node.js", color: "bg-emerald-500/15 text-emerald-600" },
      { name: "RabbitMQ", color: "bg-amber-500/15 text-amber-600" },
      { name: "Salesforce API", color: "bg-blue-500/15 text-blue-600" },
      { name: "SAP REST", color: "bg-indigo-500/15 text-indigo-600" },
      { name: "PostgreSQL", color: "bg-cyan-500/15 text-cyan-600" },
      { name: "React", color: "bg-accent/15 text-accent" },
    ],
    features: [
      { icon: "GitMerge", title: "Bi-Directional Sync", description: "Changes in any system propagate to all connected platforms within 2 seconds." },
      { icon: "Bell", title: "Real-Time Alerts", description: "Automated Slack/email notifications when high-priority tickets are created." },
      { icon: "LayoutDashboard", title: "Unified Dashboard", description: "Single-pane view of customer orders, open tickets, and invoice status." },
      { icon: "RefreshCw", title: "Retry & Dead-Letter", description: "Failed syncs are retried automatically; unresolvable events are quarantined." },
      { icon: "Lock", title: "OAuth 2.0 Auth", description: "Secure token-based authentication for all third-party API connections." },
      { icon: "FileText", title: "Audit Log", description: "Full traceable log of every data event for compliance and debugging." },
    ],
    results: [
      { metric: "Resolution Time", value: "−55%", description: "Support tickets resolved faster with full customer context visible." },
      { metric: "Data Errors", value: "−90%", description: "Manual copy-paste data entry eliminated across all three systems." },
      { metric: "Team Efficiency", value: "+45%", description: "Hours saved per week across sales, support, and finance teams." },
    ],
  },
  {
    slug: "network-security",
    title: "Network Security & DevOps",
    tagline: "Zero-trust server hardening, automated WAF intrusion defense, and 24/7 uptime infrastructure.",
    category: "Technology · Helpdesk",
    duration: "8 Weeks",
    deliveredAt: "2024",
    liveUrl: "/contact-us",
    image: "/images/projects/case-thumb4.png",
    overview:
      "Designed and deployed a zero-trust security architecture and fully automated CI/CD DevOps pipeline for a fintech startup processing ₹50Cr+ monthly transactions.",
    challenge:
      "The client was running on a single unmonitored VPS with no firewall rules, no automated deployments, and no incident response plan. A minor DDoS attack caused 14 hours of downtime and significant revenue loss.",
    solution:
      "We migrated to AWS with multi-AZ redundancy, implemented CloudFront WAF rules, set up a GitHub Actions CI/CD pipeline with automated security scanning, and established 24/7 Datadog monitoring with on-call alerting.",
    stats: [
      { value: "99.99%", label: "Uptime since deployment" },
      { value: "0", label: "Security incidents post-launch" },
      { value: "8 min", label: "Avg. deploy cycle time" },
      { value: "14→0", label: "Hours of downtime reduced" },
    ],
    techStack: [
      { name: "AWS", color: "bg-amber-500/15 text-amber-600" },
      { name: "CloudFront WAF", color: "bg-orange-500/15 text-orange-600" },
      { name: "GitHub Actions", color: "bg-dark/10 text-ink" },
      { name: "Terraform", color: "bg-purple-500/15 text-purple-600" },
      { name: "Datadog", color: "bg-accent/15 text-accent" },
      { name: "Docker", color: "bg-cyan-500/15 text-cyan-600" },
    ],
    features: [
      { icon: "Shield", title: "Zero-Trust Architecture", description: "Every service, user, and device verified before access — no implicit trust." },
      { icon: "Zap", title: "CI/CD Pipeline", description: "GitHub Actions pipeline with automated testing, SAST scanning, and zero-downtime deploys." },
      { icon: "Activity", title: "24/7 Monitoring", description: "Datadog APM and synthetic monitors with PagerDuty on-call escalation." },
      { icon: "Globe", title: "WAF & DDoS Protection", description: "CloudFront WAF blocks malicious traffic before it reaches origin servers." },
      { icon: "Server", title: "Multi-AZ Redundancy", description: "Infrastructure spans two availability zones — failure of one is invisible to users." },
      { icon: "RefreshCw", title: "Disaster Recovery", description: "Automated daily backups with 15-minute RTO and 1-hour RPO tested quarterly." },
    ],
    results: [
      { metric: "Uptime", value: "99.99%", description: "Achieved in 6 months post-deployment, up from ~94%." },
      { metric: "Deploy Frequency", value: "10×", description: "Team ships features daily instead of monthly painful releases." },
      { metric: "Security Posture", value: "A+", description: "SSL Labs, Mozilla Observatory, and OWASP audit all passed at highest grade." },
    ],
    testimonial: {
      quote: "We went from fearing every deployment to shipping confidently every day. The security improvements alone gave our investors peace of mind.",
      author: "Amit Joshi",
      role: "CTO, FinVault Technologies",
    },
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing & Growth",
    tagline: "Data-driven SEO campaign and multi-channel acquisition funnel generating 3.8× revenue return.",
    category: "Marketing · Analysis",
    duration: "6 Months",
    deliveredAt: "2024",
    liveUrl: "/contact-us",
    image: "/images/projects/case-thumb5.png",
    overview:
      "Executed a full-funnel digital marketing strategy for an e-commerce brand — combining technical SEO, Google Ads, and conversion rate optimization — achieving ₹38L monthly revenue from ₹10L ad spend.",
    challenge:
      "The client had a good product but invisible online presence. Organic traffic was near zero, Google Ads campaigns were bleeding spend with a 0.9× ROAS, and the checkout funnel had a 78% abandonment rate.",
    solution:
      "We audited the technical SEO, fixed 200+ on-page issues, built a content cluster strategy, rebuilt ad campaigns with proper audience segmentation, and ran A/B tests on the checkout flow that reduced abandonment by 38%.",
    stats: [
      { value: "3.8×", label: "Return on ad spend" },
      { value: "+310%", label: "Organic traffic growth" },
      { value: "−38%", label: "Cart abandonment rate" },
      { value: "₹38L", label: "Monthly revenue achieved" },
    ],
    techStack: [
      { name: "Google Ads", color: "bg-blue-500/15 text-blue-600" },
      { name: "Google Analytics 4", color: "bg-amber-500/15 text-amber-600" },
      { name: "SEMrush", color: "bg-emerald-500/15 text-emerald-600" },
      { name: "Hotjar", color: "bg-red-500/15 text-red-600" },
      { name: "Meta Ads", color: "bg-indigo-500/15 text-indigo-600" },
      { name: "Klaviyo", color: "bg-accent/15 text-accent" },
    ],
    features: [
      { icon: "Search", title: "Technical SEO Audit", description: "Fixed 200+ crawl errors, Core Web Vitals, and structured data issues." },
      { icon: "BarChart3", title: "Paid Media Management", description: "Google & Meta Ads restructured with SKAG strategy and smart bidding." },
      { icon: "TrendingUp", title: "Content Cluster Strategy", description: "Topical authority built across 8 product categories driving 310% organic growth." },
      { icon: "Users", title: "Audience Segmentation", description: "Lookalike audiences and retargeting funnels built on first-party GA4 data." },
      { icon: "SplitSquareVertical", title: "A/B Testing", description: "Checkout flow tested across 12 variants — winning variant cut abandonment by 38%." },
      { icon: "Mail", title: "Email Automation", description: "Klaviyo flows for abandoned cart, post-purchase upsell, and winback sequences." },
    ],
    results: [
      { metric: "ROAS", value: "3.8×", description: "From 0.9× to 3.8× return on ad spend in 5 months." },
      { metric: "Organic Traffic", value: "+310%", description: "Monthly sessions from Google Search grew from 1.2K to 4.9K." },
      { metric: "Revenue", value: "₹38L/mo", description: "Monthly revenue target hit 2 months ahead of schedule." },
    ],
    testimonial: {
      quote: "Our marketing was a black hole before Sumit DevTech. Now we know exactly where every rupee goes and the results are incredible.",
      author: "Sneha Kapoor",
      role: "Founder, BloomCart India",
    },
  },
  {
    slug: "product-and-design",
    title: "Product & UI/UX Design",
    tagline: "Human-centered design system and interactive prototype driving 45% higher conversion completion.",
    category: "Marketing · Technology",
    duration: "10 Weeks",
    deliveredAt: "2024",
    liveUrl: "/contact-us",
    image: "/images/projects/case-thumb6.png",
    overview:
      "Designed end-to-end UX for a B2C fintech app — from user research and information architecture to a high-fidelity Figma prototype and developer-ready design system — achieving a 45% uplift in onboarding completion.",
    challenge:
      "The existing app onboarding had a 72% drop-off rate. Users found the 14-step KYC flow confusing, the visual hierarchy unclear, and the app felt untrustworthy due to inconsistent UI patterns.",
    solution:
      "We conducted 20 user interviews, rebuilt the information architecture, reduced KYC to 6 steps with progress indicators, created a comprehensive design system with 80+ reusable components, and validated with usability testing before handoff.",
    stats: [
      { value: "45%", label: "Onboarding completion lift" },
      { value: "6 steps", label: "KYC reduced from 14" },
      { value: "80+", label: "Design system components" },
      { value: "4.8★", label: "Post-launch App Store rating" },
    ],
    techStack: [
      { name: "Figma", color: "bg-accent/15 text-accent" },
      { name: "FigJam", color: "bg-purple-500/15 text-purple-600" },
      { name: "Maze", color: "bg-pink-500/15 text-pink-600" },
      { name: "Zeroheight", color: "bg-indigo-500/15 text-indigo-600" },
      { name: "Lottie", color: "bg-emerald-500/15 text-emerald-600" },
      { name: "Storybook", color: "bg-amber-500/15 text-amber-600" },
    ],
    features: [
      { icon: "Users", title: "User Research", description: "20 in-depth interviews + heatmap analysis to identify friction points." },
      { icon: "Layers", title: "Design System", description: "80+ components with tokens for color, typography, spacing, and motion." },
      { icon: "Smartphone", title: "Mobile Prototype", description: "High-fidelity interactive Figma prototype with micro-interactions and transitions." },
      { icon: "Activity", title: "Usability Testing", description: "3 rounds of Maze testing with 15 participants before final handoff." },
      { icon: "Palette", title: "Brand Identity", description: "Refreshed color palette and iconography system aligned to trust and clarity." },
      { icon: "Code2", title: "Dev-Ready Handoff", description: "Zeroheight documentation site with code snippets and usage guidelines for developers." },
    ],
    results: [
      { metric: "Onboarding Completion", value: "+45%", description: "KYC completion rate improved from 28% to 73%." },
      { metric: "Support Tickets", value: "−60%", description: "UI clarity improvements reduced 'how do I...' support queries dramatically." },
      { metric: "App Store Rating", value: "4.8★", description: "Jumped from 3.1 stars to 4.8 stars in first 3 months post-redesign." },
    ],
    testimonial: {
      quote: "The design system they delivered saved our dev team months of work. And our users actually enjoy using the app now — something we'd given up on.",
      author: "Vikram Nair",
      role: "Product Lead, PayNest",
    },
  },
];



