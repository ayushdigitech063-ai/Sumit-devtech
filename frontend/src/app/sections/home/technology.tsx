"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import { cn } from "@/lib/utils";
import { fetchCommonTechnologies, type TechnologyItem } from "@/lib/common-api";

const STATIC_TABS = [
  {
    label: "CMS & Framework",
    items: [
      { name: "WordPress", icon: "https://sumitdevtech.com/assets/images/icons/WordPress_blue_logo.svg" },
      { name: "Shopify", icon: "https://sumitdevtech.com/assets/images/icons/shopify.svg" },
      { name: "Laravel", icon: "https://sumitdevtech.com/assets/images/icons/laravel.svg" },
      { name: "Next.js", icon: "https://sumitdevtech.com/assets/images/icons/nextjs.svg" },
    ],
  },
  {
    label: "Website Design",
    items: [
      { name: "HTML5", icon: "https://sumitdevtech.com/assets/images/icons/html5.svg" },
      { name: "CSS3", icon: "https://sumitdevtech.com/assets/images/icons/css3.svg" },
      { name: "Tailwind CSS", icon: "https://sumitdevtech.com/assets/images/icons/tailwind-css.svg" },
      { name: "Bootstrap 5", icon: "https://sumitdevtech.com/assets/images/icons/bootstrap-5.svg" },
    ],
  },
  {
    label: "Web Applications",
    items: [
      { name: "React", icon: "https://sumitdevtech.com/assets/images/icons/react.svg" },
      { name: "Node.js", icon: "https://sumitdevtech.com/assets/images/icons/nodejs.svg" },
      { name: "PHP", icon: "https://sumitdevtech.com/assets/images/icons/php.svg" },
      { name: "JavaScript", icon: "https://sumitdevtech.com/assets/images/icons/javascript.svg" },
    ],
  },
  {
    label: "Digital Marketing",
    items: [
      { name: "SEO", icon: "https://sumitdevtech.com/assets/images/icons/Search-Engine-Optimization.svg" },
      { name: "Google Ads", icon: "https://sumitdevtech.com/assets/images/icons/ads.svg" },
      { name: "Social Media", icon: "https://sumitdevtech.com/assets/images/icons/instagram.svg" },
      { name: "Content Marketing", icon: "https://sumitdevtech.com/assets/images/icons/content-writing.svg" },
    ],
  },
  {
    label: "API Services",
    items: [
      { name: "REST APIs", icon: "https://sumitdevtech.com/assets/images/icons/api.svg" },
      { name: "Payment Gateways", icon: "https://sumitdevtech.com/assets/images/icons/paypal.svg" },
    ],
  },
];

export default function Technology() {
  const [tabs, setTabs] = useState<{ label: string; items: { name: string; icon?: string }[] }[]>(STATIC_TABS);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetchCommonTechnologies().then((items) => {
      if (items && items.length > 0) {
        const grouped: { [category: string]: { name: string; icon?: string }[] } = {};
        items.forEach((item) => {
          if (!grouped[item.category]) {
            grouped[item.category] = [];
          }
          grouped[item.category].push({ name: item.name, icon: item.icon });
        });

        const newTabs = Object.keys(grouped).map((cat) => ({
          label: cat,
          items: grouped[cat],
        }));

        if (newTabs.length > 0) {
          setTabs(newTabs);
        }
      }
    });
  }, []);

  const tab = tabs[active] || tabs[0];

  return (
    <Section id="technology">
      <SectionHeading
        center
        label="Technology"
        title={<>We Work in <span className="text-brand">Technology</span></>}
        text="Building innovative digital solutions that solve problems, improve efficiency, and power modern businesses."
      />

      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full px-6 py-2.5 text-sm font-semibold transition",
              i === active ? "bg-brand text-white shadow-lg shadow-accent/30" : "bg-light text-dark hover:bg-accent/10 hover:text-accent"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mx-auto flex max-w-4xl flex-wrap justify-center gap-5"
        >
          {tab && tab.items.map((item) =>
            item.icon ? (
              <div
                key={item.name}
                className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-5 shadow-sm transition duration-300 hover:border-accent hover:shadow-md"
              >
                <div className="relative h-12 w-12">
                  <Image src={item.icon} alt={item.name} fill className="object-contain" />
                </div>
                <span className="text-xs font-semibold text-dark">{item.name}</span>
              </div>
            ) : null
          )}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
