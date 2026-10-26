// All text and openings for the career page live here.
// The roles, perks and process below are SAMPLE content - replace them with your real ones.

export type Opening = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Internship ...
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export type Perk = {
  id: string;
  title: string;
  description: string;
  icon: string; // a name from the icon list in career-shared.tsx
};

export type HiringStep = {
  id: string;
  title: string;
  description: string;
};

export type CareerData = {
  hero: { badge: string; title: string; highlight: string; text: string };
  stats: { value: string; label: string }[];
  perksSection: { label: string; title: string; text: string };
  perks: Perk[];
  openingsSection: { label: string; title: string; text: string };
  openings: Opening[];
  processSection: { label: string; title: string; text: string };
  process: HiringStep[];
  cta: { title: string; text: string };
};

export const CAREERS_EMAIL = "info@sumitdevtech.com";

// Opens the visitor's email app with the job title already in the subject
export const applyHref = (job?: Opening) =>
  `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
    job ? `Application: ${job.title}` : "Career enquiry"
  )}`;

export const careerData: CareerData = {
  hero: {
    badge: "We're hiring",
    title: "Build your career with",
    highlight: "Sumit DevTech",
    text: "Join a Jaipur team that has spent 10+ years building fast, SEO-ready websites for 500+ clients. You will work on real projects, with people who pick up the phone.",
  },

  stats: [
    { value: "10+", label: "Years of experience" },
    { value: "15+", label: "Developers on the team" },
    { value: "500+", label: "Happy clients" },
    { value: "1000+", label: "Projects delivered" },
  ],

  perksSection: {
    label: "Why join us",
    title: "A place to learn, build and grow",
    text: "We keep the team small enough that your work is seen and your questions get answered.",
  },
  perks: [
    {
      id: "real-projects",
      title: "Learn on real projects",
      description: "You work on live client websites from your first weeks, not on practice tasks.",
      icon: "GraduationCap",
    },
    {
      id: "senior-access",
      title: "Direct access to seniors",
      description: "Ask the developer or manager next to you. No ticket systems, no waiting for days.",
      icon: "MessageCircle",
    },
    {
      id: "modern-stack",
      title: "Modern tech stack",
      description: "Next.js, React, Tailwind, WordPress, Shopify and PHP, depending on the project.",
      icon: "Code2",
    },
    {
      id: "growth",
      title: "A clear growth path",
      description: "We set goals with you and review them, so you know what the next step looks like.",
      icon: "TrendingUp",
    },
    {
      id: "team",
      title: "A friendly team",
      description: "Developers, designers and marketers work together, and we say what we mean.",
      icon: "Users",
    },
    {
      id: "shipping",
      title: "Work that goes live",
      description: "What you build is used by real customers, and you see the result.",
      icon: "Rocket",
    },
  ],

  openingsSection: {
    label: "Open positions",
    title: "Find the role that fits you",
    text: "Pick a team to filter the list, then open a role to see the details.",
  },
  openings: [
    {
      id: "nextjs-developer",
      title: "Next.js / React Developer",
      department: "Development",
      location: "Jaipur (Mansarovar)",
      type: "Full-time",
      experience: "1-3 years",
      summary:
        "Build fast, SEO-friendly websites and web applications for clients across India and abroad.",
      responsibilities: [
        "Turn designs into responsive Next.js pages",
        "Build reusable components and connect them to APIs",
        "Keep pages fast and search-engine ready",
      ],
      requirements: [
        "Good knowledge of React, Next.js and Tailwind CSS",
        "Comfortable with Git and REST APIs",
        "Care about clean, readable code",
      ],
    },
    {
      id: "wordpress-developer",
      title: "WordPress Developer",
      department: "Development",
      location: "Jaipur (Mansarovar)",
      type: "Full-time",
      experience: "1-2 years",
      summary:
        "Create WordPress sites that clients can manage themselves, from themes to plugins.",
      responsibilities: [
        "Build custom themes and set up plugins",
        "Make sites easy for clients to edit",
        "Fix bugs and keep sites secure and quick",
      ],
      requirements: [
        "Solid PHP, HTML, CSS and JavaScript",
        "Experience with Elementor or custom themes",
        "Knowledge of basic site speed and security",
      ],
    },
    {
      id: "ui-ux-designer",
      title: "UI/UX Designer",
      department: "Design",
      location: "Jaipur (Mansarovar)",
      type: "Full-time",
      experience: "1-3 years",
      summary:
        "Design clear, good-looking interfaces that keep visitors on the site and turn them into customers.",
      responsibilities: [
        "Create wireframes, prototypes and final designs",
        "Work with developers so designs are built as planned",
        "Keep designs consistent with each client's brand",
      ],
      requirements: [
        "Strong Figma skills and a portfolio of web projects",
        "Understanding of responsive design",
        "Able to explain your design choices",
      ],
    },
    {
      id: "seo-executive",
      title: "SEO Executive",
      department: "Marketing",
      location: "Jaipur (Mansarovar)",
      type: "Full-time",
      experience: "1-2 years",
      summary:
        "Help client websites get found on Google through technical and on-page SEO.",
      responsibilities: [
        "Research keywords and plan page content",
        "Run site audits and fix technical issues",
        "Track rankings and report results to clients",
      ],
      requirements: [
        "Hands-on experience with on-page and technical SEO",
        "Comfortable with Google Search Console and Analytics",
        "Clear written English",
      ],
    },
    {
      id: "business-development",
      title: "Business Development Executive",
      department: "Sales",
      location: "Jaipur (Mansarovar)",
      type: "Full-time",
      experience: "1+ years",
      summary:
        "Speak with business owners, understand what they need and bring new website projects to the team.",
      responsibilities: [
        "Follow up on enquiries and book consultations",
        "Prepare simple, clear proposals with the team",
        "Keep clients updated until the project starts",
      ],
      requirements: [
        "Good communication in Hindi and English",
        "Experience selling IT or digital services is a plus",
        "Honest and patient with clients",
      ],
    },
    {
      id: "web-intern",
      title: "Web Development Intern",
      department: "Development",
      location: "Jaipur (Mansarovar)",
      type: "Internship",
      experience: "Fresher",
      summary:
        "Start your career by working with our developers on real websites and learning how an agency runs.",
      responsibilities: [
        "Help build and test pages on live projects",
        "Learn Git, code reviews and deployment",
        "Fix small bugs with guidance from a senior",
      ],
      requirements: [
        "Basics of HTML, CSS and JavaScript",
        "Willing to learn React or WordPress",
        "Finishing or recently finished a degree or course",
      ],
    },
  ],

  processSection: {
    label: "Hiring process",
    title: "How we hire",
    text: "Simple and fast, with no long waiting between steps.",
  },
  process: [
    {
      id: "apply",
      title: "Apply",
      description: "Send your resume and portfolio or GitHub link by email.",
    },
    {
      id: "call",
      title: "Intro call",
      description: "A short chat about your work, your goals and the role.",
    },
    {
      id: "task",
      title: "Skill round",
      description: "A practical task or interview that matches the role.",
    },
    {
      id: "offer",
      title: "Offer & joining",
      description: "We share the offer, answer your questions and plan your first week.",
    },
  ],

  cta: {
    title: "Don't see your role?",
    text: "We are always happy to meet good people. Send us your resume and tell us what you would like to do.",
  },
};