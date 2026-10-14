import { Code, Gauge, Layers, Target, Award, Wallet, Globe, Headphones, ShoppingCart, Users, Star, FolderOpen, ThumbsUp, Monitor, PanelsTopLeft, Smartphone, Palette, Search, AppWindow, Wrench  } from "lucide-react";

// To use local images later: download them to /public/images and change this to "/images"
export const IMG = "https://sumitdevtech.com/assets/images";

export const aboutFeatures = [
  { icon: Code, title: "Custom Web Solutions", text: "We work on everything - simple HTML sites, WordPress, eCommerce stores, custom web applications, and business management systems." },
  { icon: Gauge, title: "Performance First", text: "Every website we build loads fast, works on mobile, and is set up properly for search engines from day one." },
  { icon: Layers, title: "Diverse Experience", text: "We've worked with people starting fresh with no website to companies that have been around for years needing upgrades." },
  { icon: Target, title: "Tailored Requirements", text: "If you have a specific requirement that doesn't fit into a standard package, we'll design a customized fit." },
];
export const aboutIntro =
  "We work on everything - simple HTML sites, WordPress, eCommerce stores, custom web applications, and business management systems. Every website we build loads fast, works on mobile, and is set up properly for search engines from day one.";

export const aboutYears = { value: 10, label: "Years of Expertise in Business" };

export const aboutStats = [
  { icon: Users, value: 15, suffix: "+", label: "Full-time Developers" },
  { icon: Star, value: 500, suffix: "+", label: "Happy Clients" },
  { icon: FolderOpen, value: 1000, suffix: "+", label: "Projects Delivered" },
  { icon: ThumbsUp, value: 100, suffix: "%", label: "Client Satisfaction" },
];

export const homeServices = [
  { title: "Website Development", href: "/website-development-services", image: `${IMG}/services/website-development.png`, text: "From scratch to live - we code websites that load fast, look sharp, and don't break after a month.", icon : Monitor },
  { title: "WordPress Website Development", href: "/wordpress-website-development", image: `${IMG}/services/wordpress-development.png`, text: "We build WordPress sites you can actually manage yourself. No dependency on us for every small change.",  icon :  PanelsTopLeft},
  { title: "Ecommerce Website Development", href: "/ecommerce-website-development", image: `${IMG}/services/ecommerce-development.png`, text: "Selling online is more than just adding products. We build stores that make buying easy for your customers.", icon : ShoppingCart },
  { title: "Responsive Web Design", href: "/responsive-website-design", image: `${IMG}/services/responsive-design.png`, text: "Your website should work on a 5-inch phone the same way it does on a 27-inch monitor. We make sure it does.", icon : Smartphone },
  { title: "Shopify Website Development", href: "/shopify-website-development", image: `${IMG}/services/shopify-development.png`, text: "If you're serious about e-commerce, Shopify is worth it. We set it up the right way from day one." ,  icon : ShoppingCart},
  { title: "UI UX Design", href: "/ui-ux-designing", image: `${IMG}/services/ui-ux-design.png`, text: "Good design isn't decoration. It's the reason people stay on your site instead of hitting the back button.",  icon : Palette},
  { title: "SEO Optimization", href: "/digital-marketing-services", image: `${IMG}/services/seo-optimization.png`, text: "Getting found on Google takes more than keywords. We handle the technical side that most agencies ignore." ,  icon : Search},
  { title: "Web Applications", href: "/web-applications", image: `${IMG}/services/web-applications.png`, text: "Got a business process that wastes your team's time? We build tools that fix that.", icon : AppWindow },
  { title: "Website Maintenance", href: "/website-maintenance", image: `${IMG}/services/website-maintenance.png`, text: "Sites break, get hacked, and go slow. We keep an eye on yours, so you don't have to worry about it.",  icon : Wrench },
];

export const whyLead = [
  { icon: Award, title: "10+ Years of Mastery", text: "A decade of engineering high-performance websites and digital products in Jaipur." },
  { icon: Wallet, title: "100% Fixed Pricing", text: "Strict zero hidden costs. What we quote in our proposal is exactly what you pay." },
  { icon: Layers, title: "Multi-Industry Domain", text: "Proven digital solutions across healthcare, retail, real estate, education, and SaaS." },
  { icon: Globe, title: "Global Client Footprint", text: "Active clients across USA, UK, UAE & Saudi Arabia, plus trusted white-label overflow." },
  { icon: Headphones, title: "Zero Ghosting Guarantee", text: "Direct developer access and fast response times. We stay with you long after launch." },
  { icon: ShoppingCart, title: "Full-Stack E-Commerce", text: "Revenue-focused online stores with custom payment gateways, CRM, and speed tuning." },
];

export const whyLeadStats = [
  { value: "4.9/5 Rating", label: "Client Reviews" },
  { value: "1000+ Projects", label: "Delivered" },
  { value: "500+ Clients", label: "Global Reach" },
];

export const whyChoose = [
  { title: "Expertise & Experience", image: `${IMG}/Expertise-%26-Innovation.webp`, text: "10 years in this field and a team of 15+ developers who have actually solved real problems - not just followed tutorials." },
  { title: "End-to-End Services", image: `${IMG}/End-to-End-Services.webp`, text: "Design, development, SEO, deployment, maintenance - you won't need to chase five different vendors. We handle it all." },
  { title: "Always Available", image: `${IMG}/Client-Centric-Approach.webp`, text: "Call us, WhatsApp us, message us. We pick up. No ticket systems, no waiting 48 hours for a reply." },
  { title: "We Mean What We Say", image: `${IMG}/Proven-Quality-Delivery.webp`, text: "Deadlines, budgets, deliverables - we commit, and we deliver. No excuses, no ghosting after payment." },
];
console.log(whyChoose[0].image);