export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type HomeProcessData = {
  label: string;
  title: string;
  highlight: string;
  text: string;
  centerLabel: string;
  steps: ProcessStep[]; // works best with 4 to 8 steps
};

export const homeProcessData: HomeProcessData = {
  label: "Work Process",
  title: "Our Proven Process to",
  highlight: "Deliver Successful Digital Solutions",
  text: "We don't jump straight into designing. Every project goes through a proper process - so nothing gets missed, and you know what's happening at every step.",
  centerLabel: "Sumit DevTech",
  steps: [
    {
      id: "plan-research",
      title: "Plan & Research",
      description:
        "We learn your business, your goals and your customers first. Only then do we start.",
    },
    {
      id: "wireframe-prototyping",
      title: "Wireframe & Prototyping",
      description:
        "Before any code, we map the layout and show you how the site will look and flow.",
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design",
      description:
        "Clean, easy-to-use screens that fit your brand and keep visitors on your site.",
    },
    {
      id: "development",
      title: "Development",
      description:
        "Solid code that loads fast, works on every screen and has on-page SEO built in.",
    },
    {
      id: "testing-qa",
      title: "Testing & QA",
      description:
        "We check every page on every device and screen size before anything goes live.",
    },
    {
      id: "launch",
      title: "Launch",
      description:
        "Once you approve, we launch the site and stay available if anything needs fixing.",
    },
    {
      id: "training-handover",
      title: "Training & Handover",
      description:
        "We walk you through the admin, so you can update text, images and blogs yourself.",
    },
    {
      id: "support-growth",
      title: "Support & Growth",
      description:
        "Bug fixes, updates and 24/7 support, plus SEO work to help your site keep growing.",
    },
  ],
};