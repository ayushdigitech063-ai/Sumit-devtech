import { IMG } from "./home";

const icon = (f: string) => `${IMG}/icons/${f}`;
export type Tech = { name: string; icon?: string };

// The tab-to-technology grouping is a draft - adjust it to how you want it shown.
export const techTabs: { label: string; items: Tech[] }[] = [
  { label: "CMS & Framework", items: [
    { name: "WordPress", icon: icon("WordPress_blue_logo.svg") },
    { name: "Shopify", icon: icon("shopify.svg") },
    { name: "Laravel", icon: icon("laravel.svg") },
    { name: "Next.js", icon: icon("nextjs.svg") },
  ]},
  { label: "Website Design", items: [
    { name: "HTML5", icon: icon("html5.svg") },
    { name: "CSS3", icon: icon("css3.svg") },
    { name: "Tailwind CSS", icon: icon("tailwind-css.svg") },
    { name: "Bootstrap 5", icon: icon("bootstrap-5.svg") },
  ]},
  { label: "Web Applications", items: [
    { name: "React", icon: icon("react.svg") },
    { name: "Node.js", icon: icon("nodejs.svg") },
    { name: "PHP", icon: icon("php.svg") },
    { name: "JavaScript", icon: icon("javascript.svg") },
  ]},
  { label: "Digital Marketing", items: [
    { name: "SEO", icon: icon("Search-Engine-Optimization.svg") }, { name: "Google Ads", icon: icon("ads.svg") }, { name: "Social Media ", icon : icon('instagram.svg') }, { name: "Content Marketing",icon: icon("content-writing.svg") }
  ]},
  { label: "API Services", items: [
    { name: "REST APIs" , icon : icon("api.svg")}, { name: "Payment Gateways", icon : icon("paypal.svg") }
  ]},
  
];