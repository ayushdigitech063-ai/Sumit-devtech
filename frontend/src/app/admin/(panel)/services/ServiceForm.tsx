"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Layers,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Plus,
  Trash2,
  CheckCircle2,
  Globe,
  Sliders,
  BarChart3,
  ListOrdered,
  Save,
} from "lucide-react";
import {
  ServiceData,
  ServiceFaq,
  EcosystemCard,
  ServiceItem,
  ProcessStep,
  StatItem,
  createService,
  updateService,
  fetchServiceBySlug,
} from "@/lib/services-api";
import { notify } from "@/lib/alerts";

interface Props {
  editSlug?: string;
}

export default function ServiceFormPage({ editSlug }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(!!editSlug);
  const [serviceId, setServiceId] = useState<string | null>(null);

  // 1. Basic & URL
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [badge, setBadge] = useState("Professional Web Design");
  const [highlight, setHighlight] = useState("Convert Visitors");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // 2. Hero Section
  const [chipsText, setChipsText] = useState("UI/UX Excellence, Mobile Responsive, SEO Layouts, Fast Speeds");
  const [trustItems, setTrustItems] = useState<{ value: string; label: string }[]>([
    { value: "4.9/5", label: "Rating (250+ Designs)" },
    { value: "100%", label: "Satisfaction Guarantee" },
    { value: "99.8%", label: "UX Usability Score" },
    { value: "Native", label: "Figma & Adobe XD" },
  ]);
  const [ctaButtonText, setCtaButtonText] = useState("Get Free Consultation");
  const [ctaButtonHref, setCtaButtonHref] = useState("/contact-us");

  // 3. Ecosystem / Features Section
  const [ecosystemTitle, setEcosystemTitle] = useState("Our Core Technical");
  const [ecosystemHighlight, setEcosystemHighlight] = useState("Ecosystem");
  const [ecosystemText, setEcosystemText] = useState(
    "An integrated end-to-end framework uniting user-centered wireframing, high-fidelity visual styling, and high-velocity code."
  );
  const [ecosystemCards, setEcosystemCards] = useState<EcosystemCard[]>([
    {
      id: "card-1",
      title: "UI/UX & Wireframing",
      description: "Interactive prototypes and click-dummies designed for frictionless conversions.",
      iconName: "Layout",
      badge: "Strategic Core",
    },
    {
      id: "card-2",
      title: "Responsive Design",
      description: "Adaptive layouts built for sharp rendering across all phones and desktops.",
      iconName: "Smartphone",
      badge: "Mobile-First",
    },
    {
      id: "card-3",
      title: "Brand Visual Identity",
      description: "Harmonious color palettes, purposeful typography, and unified design token systems.",
      iconName: "Palette",
    },
    {
      id: "card-4",
      title: "High-Speed Code",
      description: "Pixel-perfect translation into clean, fast, and accessible TypeScript code.",
      iconName: "Code2",
      badge: "1:1 Precision",
    },
  ]);

  // 4. Services List (Offerings)
  const [servicesSectionTitle, setServicesSectionTitle] = useState("Precision-Engineered");
  const [servicesSectionHighlight, setServicesSectionHighlight] = useState("Solutions");
  const [servicesSectionText, setServicesSectionText] = useState(
    "Explore our focused design capabilities. Every package is custom-crafted to solve specific user experience bottlenecks."
  );
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([
    {
      id: "srv-1",
      number: "01",
      title: "Custom UI/UX & Wireframing",
      description: "Bespoke interfaces grounded in extensive user behavior research.",
      tags: ["Figma & FigJam", "User Journey Mapping"],
      href: "/contact-us",
    },
    {
      id: "srv-2",
      number: "02",
      title: "Responsive Web Development",
      description: "Layouts that flex dynamically across smartphone, tablet, laptop, and desktop viewports.",
      tags: ["Fluid Breakpoints", "Mobile-First UX"],
      href: "/contact-us",
    },
  ]);

  // 5. Process Section
  const [processTitle, setProcessTitle] = useState("Our 4-Step");
  const [processHighlight, setProcessHighlight] = useState("Process");
  const [processText, setProcessText] = useState(
    "From initial concepts and architecture to high-fidelity models and responsive code."
  );
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([
    {
      number: "01",
      title: "Discovery & UX Wireframing",
      description: "Analyze business objectives, audience demographics, and blueprints.",
      deliverable: "Interactive Wireframes & Sitemap",
    },
    {
      number: "02",
      title: "UI Visual Styling",
      description: "Craft high-fidelity interface mockups in Figma, color palettes, and components.",
      deliverable: "Complete Figma Design System",
    },
    {
      number: "03",
      title: "Frontend Engineering",
      description: "Translate approved designs into semantic, fully responsive code.",
      deliverable: "Clean, Modular App Code",
    },
    {
      number: "04",
      title: "Testing & Launch",
      description: "Cross-browser verification, mobile responsiveness, and deployment.",
      deliverable: "Live, High-Speed Website",
    },
  ]);

  // 6. Stats Numbers
  const [stats, setStats] = useState<StatItem[]>([
    { id: "stat-1", numericValue: 250, suffix: "+", label: "Websites Delivered", subtext: "Across diverse business domains worldwide." },
    { id: "stat-2", numericValue: 99.9, suffix: "%", decimals: 1, label: "Client Satisfaction", subtext: "Pixel-perfect engineering standards." },
    { id: "stat-3", numericValue: 10, suffix: "+", label: "Years Expertise", subtext: "Refining user-centric engineering." },
    { id: "stat-4", numericValue: 24, suffix: "/7", label: "Dedicated Support", subtext: "Continuous enhancements and rapid assistance." },
  ]);

  // 7. FAQs
  const [faqs, setFaqs] = useState<ServiceFaq[]>([
    {
      question: "What is included in this service?",
      answer: "End-to-end deliverables including UI/UX research, design prototypes, responsive code, and post-launch support.",
    },
    {
      question: "How long does a typical project take?",
      answer: "Usually between 1 to 3 weeks depending on the project scope, page count, and custom feature requirements.",
    },
  ]);
  const [faqQ, setFaqQ] = useState("");
  const [faqA, setFaqA] = useState("");

  // Load existing service if editing
  useEffect(() => {
    if (!editSlug) return;
    fetchServiceBySlug(editSlug).then((data) => {
      if (data) {
        setServiceId(data._id || null);
        setTitle(data.title || "");
        setSlug(data.slug || "");
        setBadge(data.badge || "Professional Web Design");
        setHighlight(data.highlight || "");
        setDescription(data.description || "");
        setMetaTitle(data.metaTitle || "");
        setMetaDescription(data.metaDescription || "");
        setChipsText((data.chips || []).map((c) => c.label).join(", "));
        if (data.trustItems && data.trustItems.length > 0) setTrustItems(data.trustItems);
        setCtaButtonText(data.ctaButtonText || "Get Free Consultation");
        setCtaButtonHref(data.ctaButtonHref || "/contact-us");

        if (data.ecosystemTitle) setEcosystemTitle(data.ecosystemTitle);
        if (data.ecosystemHighlight) setEcosystemHighlight(data.ecosystemHighlight);
        if (data.ecosystemText) setEcosystemText(data.ecosystemText);
        if (data.ecosystemCards && data.ecosystemCards.length > 0) setEcosystemCards(data.ecosystemCards);

        if (data.servicesSectionTitle) setServicesSectionTitle(data.servicesSectionTitle);
        if (data.servicesSectionHighlight) setServicesSectionHighlight(data.servicesSectionHighlight);
        if (data.servicesSectionText) setServicesSectionText(data.servicesSectionText);
        if (data.serviceItems && data.serviceItems.length > 0) setServiceItems(data.serviceItems);

        if (data.processTitle) setProcessTitle(data.processTitle);
        if (data.processHighlight) setProcessHighlight(data.processHighlight);
        if (data.processText) setProcessText(data.processText);
        if (data.processSteps && data.processSteps.length > 0) setProcessSteps(data.processSteps);

        if (data.stats && data.stats.length > 0) setStats(data.stats);
        if (data.faqs && data.faqs.length > 0) setFaqs(data.faqs);
      }
      setLoading(false);
    });
  }, [editSlug]);

  // Card helpers
  const handleAddCard = () => {
    setEcosystemCards([
      ...ecosystemCards,
      {
        id: `card-${Date.now()}`,
        title: "New Feature / Capability",
        description: "Clear explanation of this feature capability.",
        iconName: "Sparkles",
      },
    ]);
  };
  const handleRemoveCard = (index: number) => {
    setEcosystemCards(ecosystemCards.filter((_, i) => i !== index));
  };

  // Offering helpers
  const handleAddOffering = () => {
    setServiceItems([
      ...serviceItems,
      {
        id: `srv-${Date.now()}`,
        number: String(serviceItems.length + 1).padStart(2, "0"),
        title: "New Service Offering",
        description: "Detailed description of what is delivered.",
        tags: ["Custom", "Scalable"],
        href: "/contact-us",
      },
    ]);
  };
  const handleRemoveOffering = (index: number) => {
    setServiceItems(serviceItems.filter((_, i) => i !== index));
  };

  // Process helpers
  const handleAddStep = () => {
    setProcessSteps([
      ...processSteps,
      {
        number: String(processSteps.length + 1).padStart(2, "0"),
        title: "Next Workflow Step",
        description: "What happens during this step.",
        deliverable: "Step Deliverable",
      },
    ]);
  };
  const handleRemoveStep = (index: number) => {
    setProcessSteps(processSteps.filter((_, i) => i !== index));
  };

  // FAQ helpers
  const handleAddFaq = () => {
    if (!faqQ.trim() || !faqA.trim()) {
      notify.error("FAQ Question and Answer are required.");
      return;
    }
    setFaqs([...faqs, { question: faqQ.trim(), answer: faqA.trim() }]);
    setFaqQ("");
    setFaqA("");
  };
  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // Save Service
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !description.trim()) {
      notify.error("Service Title, URL Slug, and Description are required!");
      return;
    }

    const chips = chipsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((label, i) => ({ id: `chip-${i}`, label }));

    const payload: Partial<ServiceData> = {
      title: title.trim(),
      slug: slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-"),
      badge: badge.trim(),
      highlight: highlight.trim(),
      description: description.trim(),
      metaTitle: metaTitle.trim() || `${title} | Sumit DevTech`,
      metaDescription: metaDescription.trim() || description.trim(),
      chips,
      trustItems,
      ctaButtonText,
      ctaButtonHref,
      ecosystemTitle,
      ecosystemHighlight,
      ecosystemText,
      ecosystemCards,
      servicesSectionTitle,
      servicesSectionHighlight,
      servicesSectionText,
      serviceItems,
      processTitle,
      processHighlight,
      processText,
      processSteps,
      stats,
      faqs,
      isActive: true,
    };

    startTransition(async () => {
      let result;
      if (serviceId) {
        result = await updateService(serviceId, payload);
      } else {
        result = await createService(payload);
      }

      if (result.success) {
        notify.success(editSlug ? "Service updated successfully!" : "New Service published successfully!");
        router.push("/admin/services");
      } else {
        notify.error(result.message || "Failed to save service.");
      }
    });
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-400">Loading service content...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full pb-20 font-sans">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-16 z-20 bg-[#f6f6f9]/90 backdrop-blur-md py-4 border-b border-slate-200">
        <div>
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-1 transition"
          >
            <ArrowLeft size={14} /> Back to All Services
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Layers className="text-orange-500" size={24} />
            {editSlug ? `Edit Service: ${title || editSlug}` : "Add New Dynamic Service"}
          </h1>
          <p className="text-xs text-slate-500">
            Fill in the sections below to automatically build your live service landing page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/services"
            className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-md shadow-orange-500/25 transition cursor-pointer disabled:opacity-50"
          >
            <Save size={15} />
            {isPending ? "Publishing..." : editSlug ? "Update Service Page" : "Publish Service Page"}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────
          SECTION 0: Basic Info & Page URL
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Globe className="text-orange-500" size={18} />
          <h2 className="text-base font-bold text-slate-900">Basic Info & Page URL</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Service Name / Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Website Design & UI/UX"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!editSlug) {
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
                }
              }}
              className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              URL Slug *
            </label>
            <input
              type="text"
              placeholder="e.g. website-design"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">Live URL: <b>/services/{slug || "..."}</b></p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Short Description / Overview *
          </label>
          <textarea
            rows={2}
            placeholder="Brief 1-2 sentence overview shown in meta and previews..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              SEO Meta Title (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Website Design Services | Sumit DevTech"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              SEO Meta Description (Optional)
            </label>
            <input
              type="text"
              placeholder="Google snippet text..."
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="text-orange-500" size={18} />
            <h2 className="text-base font-bold text-slate-900">1. Hero Section (Top Banner)</h2>
          </div>
          <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
            Header Banner
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Top Pill Badge
            </label>
            <input
              type="text"
              placeholder="e.g. Bespoke Website Design"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Highlight Word (Orange Accent in Title)
            </label>
            <input
              type="text"
              placeholder="e.g. Convert Visitors"
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Feature Chips (Comma-separated badges)
          </label>
          <input
            type="text"
            placeholder="UI/UX Excellence, Mobile Responsive, SEO Layouts, Fast Speeds"
            value={chipsText}
            onChange={(e) => setChipsText(e.target.value)}
            className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
          />
        </div>

        {/* Trust items */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Trust Points / Ratings (Shown below Hero buttons)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {trustItems.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <input
                  type="text"
                  placeholder="Value (e.g. 4.9/5)"
                  value={item.value}
                  onChange={(e) => {
                    const copy = [...trustItems];
                    copy[idx].value = e.target.value;
                    setTrustItems(copy);
                  }}
                  className="w-full text-xs font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Rating)"
                  value={item.label}
                  onChange={(e) => {
                    const copy = [...trustItems];
                    copy[idx].label = e.target.value;
                    setTrustItems(copy);
                  }}
                  className="w-full text-[11px] px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              CTA Button Text
            </label>
            <input
              type="text"
              value={ctaButtonText}
              onChange={(e) => setCtaButtonText(e.target.value)}
              className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              CTA Button Link
            </label>
            <input
              type="text"
              value={ctaButtonHref}
              onChange={(e) => setCtaButtonHref(e.target.value)}
              className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────
          SECTION 2: ECOSYSTEM / FEATURES CARDS
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sliders className="text-orange-500" size={18} />
            <h2 className="text-base font-bold text-slate-900">2. Features & Ecosystem Section (Grid Cards)</h2>
          </div>
          <button
            type="button"
            onClick={handleAddCard}
            className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <Plus size={14} /> Add Card
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Section Title</label>
            <input
              type="text"
              value={ecosystemTitle}
              onChange={(e) => setEcosystemTitle(e.target.value)}
              className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Highlight Word</label>
            <input
              type="text"
              value={ecosystemHighlight}
              onChange={(e) => setEcosystemHighlight(e.target.value)}
              className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Section Subtitle</label>
          <input
            type="text"
            value={ecosystemText}
            onChange={(e) => setEcosystemText(e.target.value)}
            className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
          />
        </div>

        {/* Cards List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ecosystemCards.map((card, i) => (
            <div key={card.id || i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-orange-600">Card #{i + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCard(i)}
                  className="text-slate-400 hover:text-rose-500 p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Card Title"
                value={card.title}
                onChange={(e) => {
                  const copy = [...ecosystemCards];
                  copy[i].title = e.target.value;
                  setEcosystemCards(copy);
                }}
                className="w-full text-xs font-bold px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
              />
              <textarea
                rows={2}
                placeholder="Card Description"
                value={card.description}
                onChange={(e) => {
                  const copy = [...ecosystemCards];
                  copy[i].description = e.target.value;
                  setEcosystemCards(copy);
                }}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="Badge (optional e.g. Mobile-First)"
                value={card.badge || ""}
                onChange={(e) => {
                  const copy = [...ecosystemCards];
                  copy[i].badge = e.target.value;
                  setEcosystemCards(copy);
                }}
                className="w-full text-[11px] px-3 py-1 bg-white border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────
          SECTION 3: OFFERINGS / SUB-SERVICES
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ListOrdered className="text-orange-500" size={18} />
            <h2 className="text-base font-bold text-slate-900">3. Services & Offerings (Numbered List)</h2>
          </div>
          <button
            type="button"
            onClick={handleAddOffering}
            className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <Plus size={14} /> Add Offering
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Section Title</label>
            <input
              type="text"
              value={servicesSectionTitle}
              onChange={(e) => setServicesSectionTitle(e.target.value)}
              className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Highlight Word</label>
            <input
              type="text"
              value={servicesSectionHighlight}
              onChange={(e) => setServicesSectionHighlight(e.target.value)}
              className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-3">
          {serviceItems.map((item, i) => (
            <div key={item.id || i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">#{item.number || i + 1} Offering</span>
                <button
                  type="button"
                  onClick={() => handleRemoveOffering(i)}
                  className="text-slate-400 hover:text-rose-500 p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Offering Title"
                  value={item.title}
                  onChange={(e) => {
                    const copy = [...serviceItems];
                    copy[i].title = e.target.value;
                    setServiceItems(copy);
                  }}
                  className="sm:col-span-2 text-xs font-bold px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={Array.isArray(item.tags) ? item.tags.join(", ") : ""}
                  onChange={(e) => {
                    const copy = [...serviceItems];
                    copy[i].tags = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                    setServiceItems(copy);
                  }}
                  className="text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Description"
                value={item.description}
                onChange={(e) => {
                  const copy = [...serviceItems];
                  copy[i].description = e.target.value;
                  setServiceItems(copy);
                }}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────
          SECTION 4: WORKING PROCESS
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-orange-500" size={18} />
            <h2 className="text-base font-bold text-slate-900">4. Working Process (Step-by-Step)</h2>
          </div>
          <button
            type="button"
            onClick={handleAddStep}
            className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <Plus size={14} /> Add Step
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Section Title</label>
            <input
              type="text"
              value={processTitle}
              onChange={(e) => setProcessTitle(e.target.value)}
              className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Highlight Word</label>
            <input
              type="text"
              value={processHighlight}
              onChange={(e) => setProcessHighlight(e.target.value)}
              className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {processSteps.map((step, i) => (
            <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-600">Step {step.number || i + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveStep(i)}
                  className="text-slate-400 hover:text-rose-500 p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Step Title"
                value={step.title}
                onChange={(e) => {
                  const copy = [...processSteps];
                  copy[i].title = e.target.value;
                  setProcessSteps(copy);
                }}
                className="w-full text-xs font-bold px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
              />
              <textarea
                rows={2}
                placeholder="Step Description"
                value={step.description}
                onChange={(e) => {
                  const copy = [...processSteps];
                  copy[i].description = e.target.value;
                  setProcessSteps(copy);
                }}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="Deliverable (e.g. Completed Milestone)"
                value={step.deliverable}
                onChange={(e) => {
                  const copy = [...processSteps];
                  copy[i].deliverable = e.target.value;
                  setProcessSteps(copy);
                }}
                className="w-full text-[11px] px-3 py-1 bg-white border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────
          SECTION 5: STATS NUMBERS
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <BarChart3 className="text-orange-500" size={18} />
          <h2 className="text-base font-bold text-slate-900">5. Stats & Metrics (Numbers)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="250"
                  value={s.numericValue}
                  onChange={(e) => {
                    const copy = [...stats];
                    copy[i].numericValue = Number(e.target.value);
                    setStats(copy);
                  }}
                  className="w-2/3 text-xs font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="+"
                  value={s.suffix}
                  onChange={(e) => {
                    const copy = [...stats];
                    copy[i].suffix = e.target.value;
                    setStats(copy);
                  }}
                  className="w-1/3 text-xs font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Metric Label"
                value={s.label}
                onChange={(e) => {
                  const copy = [...stats];
                  copy[i].label = e.target.value;
                  setStats(copy);
                }}
                className="w-full text-xs font-semibold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="Subtext"
                value={s.subtext}
                onChange={(e) => {
                  const copy = [...stats];
                  copy[i].subtext = e.target.value;
                  setStats(copy);
                }}
                className="w-full text-[11px] px-2.5 py-1 bg-white border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────
          SECTION 6: FAQS
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <HelpCircle className="text-orange-500" size={18} />
          <h2 className="text-base font-bold text-slate-900">6. Frequently Asked Questions (FAQs)</h2>
        </div>

        {/* Add FAQ box */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <input
            type="text"
            placeholder="Add Question (e.g. What is included in this service?)"
            value={faqQ}
            onChange={(e) => setFaqQ(e.target.value)}
            className="w-full text-sm px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          />
          <textarea
            rows={2}
            placeholder="Add Answer..."
            value={faqA}
            onChange={(e) => setFaqA(e.target.value)}
            className="w-full text-sm px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          />
          <button
            type="button"
            onClick={handleAddFaq}
            className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <Plus size={14} /> Add FAQ Item
          </button>
        </div>

        {/* Existing FAQs */}
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="flex items-start justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs gap-3">
              <div>
                <div className="font-bold text-slate-900">{f.question}</div>
                <div className="text-slate-600 mt-1">{f.answer}</div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFaq(i)}
                className="text-slate-400 hover:text-rose-500 p-1 shrink-0"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────
          BOTTOM SAVE BUTTON
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <Link
          href="/admin/services"
          className="px-5 py-2.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-lg shadow-orange-500/25 transition cursor-pointer disabled:opacity-50"
        >
          <Save size={16} />
          {isPending ? "Publishing..." : editSlug ? "Update Service Page" : "Publish Service Page"}
        </button>
      </div>
    </form>
  );
}
