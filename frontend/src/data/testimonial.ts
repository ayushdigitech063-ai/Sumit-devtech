export interface TestimonialItem {
  id: string;
  name: string;
  initials: string;
  role?: string;
  company: string;
  projectType: string;
  rating: number;
  text: string;
  featured?: boolean;
  avatarBg?: string;
}

export const reviewSummary = {
  rating: "4.9",
  totalReviews: "120+",
  link: "https://share.google/mFDBvfMog5fKrtZrt",
  recommendationRate: "99%",
  projectsDelivered: "500+",
};

export const testimonialCategories = [
  "All Stories",
  "Web Development",
  "E-Commerce",
  "Medical & Healthcare",
  "Enterprise & SaaS",
  "Digital Growth",
] as const;

export const testimonials: TestimonialItem[] = [
  {
    id: "test-1",
    initials: "VJ",
    name: "Dr. Vilaksh Jain",
    role: "Founder & Lead Dermatologist",
    company: "Derma Pro Center",
    projectType: "Medical & Healthcare",
    rating: 5,
    featured: true,
    avatarBg: "bg-emerald-500",
    text: "Got my dermatology clinic website made from Sumit DevTech. Clean design, loads lightning fast, and patients can easily find what they need and book consults online. Very happy with the professional approach and post-launch support.",
  },
  {
    id: "test-2",
    initials: "AK",
    name: "Anand Kishore",
    role: "Managing Director",
    company: "Melet.in",
    projectType: "E-Commerce",
    rating: 5,
    featured: true,
    avatarBg: "bg-accent",
    text: "I needed a proper eCommerce setup for Melet, and these guys delivered exactly that. Smooth checkout, clean responsive design, and they were always available whenever I had questions during payment gateway integration.",
  },
  {
    id: "test-3",
    initials: "MG",
    name: "Dr. Manish Ganwani",
    role: "Cosmetic Surgeon",
    company: "drmanishganwani.com",
    projectType: "Medical & Healthcare",
    rating: 5,
    featured: true,
    avatarBg: "bg-blue-600",
    text: "Professional team through and through. They understood what a medical authority website needs: trustworthy design, clear clinical information, and frictionless contact options. No endless back and forth, just clean execution.",
  },
  {
    id: "test-4",
    initials: "JP",
    name: "Jatin Prajapati",
    role: "Operations Head",
    company: "Sunway Solution",
    projectType: "Enterprise & SaaS",
    rating: 5,
    avatarBg: "bg-purple-600",
    text: "Sunway Solution needed a corporate business website that looked credible to enterprise clients. Sumit DevTech built exactly that. Good proactive communication throughout and delivered right on schedule.",
  },
  {
    id: "test-5",
    initials: "RS",
    name: "Rajesh Sharma",
    role: "Chief Operating Officer",
    company: "LogiCore Solutions",
    projectType: "Enterprise & SaaS",
    rating: 5,
    avatarBg: "bg-amber-600",
    text: "Sumit DevTech delivered an enterprise cloud platform that completely transformed how we run our 12 warehouse facilities. The real-time inventory visibility alone paid for the project within 3 months.",
  },
  {
    id: "test-6",
    initials: "PM",
    name: "Priya Mehta",
    role: "Marketing Director",
    company: "CloudAxis",
    projectType: "Web Development",
    rating: 5,
    avatarBg: "bg-rose-500",
    text: "Our marketing team can now update content themselves via the headless CMS, and the site runs with sub-second speeds. We have seen a measurable 40% lift in inbound demo requests since launch.",
  },
  {
    id: "test-7",
    initials: "SK",
    name: "Sneha Kapoor",
    role: "Founder",
    company: "BloomCart India",
    projectType: "Digital Growth",
    rating: 5,
    avatarBg: "bg-teal-600",
    text: "Our marketing spend felt like a black hole before Sumit DevTech rebuilt our SEO structure and acquisition funnels. We scaled to ₹38L monthly revenue with an exceptional 3.8x ROAS.",
  },
  {
    id: "test-8",
    initials: "VN",
    name: "Vikram Nair",
    role: "Product Lead",
    company: "PayNest Fintech",
    projectType: "Web Development",
    rating: 5,
    avatarBg: "bg-indigo-600",
    text: "The comprehensive design system and reactive frontend they engineered saved our internal dev team months of work. App Store ratings jumped from 3.1 to 4.8 stars in the first quarter post-redesign.",
  },
  {
    id: "test-9",
    initials: "AJ",
    name: "Amit Joshi",
    role: "CTO",
    company: "FinVault Technologies",
    projectType: "Enterprise & SaaS",
    rating: 5,
    avatarBg: "bg-cyan-600",
    text: "We went from fearing every deployment to shipping confidently every day. The zero-trust server hardening and CI/CD pipelines gave our institutional investors peace of mind.",
  },
];
