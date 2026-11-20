"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Search,
  Globe,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Sparkles,
  Save,
  X,
  Code2,
  Share2,
  ExternalLink,
  Layers,
  AlertCircle,
} from "lucide-react";
import {
  SeoMetaData,
  fetchAllSeo,
  saveSeoMeta,
  deleteSeoMeta,
} from "@/lib/seo-api";
import { fetchServices, ServiceData } from "@/lib/services-api";
import { confirmAction, notify } from "@/lib/alerts";

// Static site core pages
const DEFAULT_SITE_PAGES = [
  { path: "/", pageName: "Home Page" },
  { path: "/about-company", pageName: "About Company" },
  { path: "/contact-us", pageName: "Contact Us" },
  { path: "/portfolio", pageName: "Portfolio & Work" },
  { path: "/blogs", pageName: "Blogs & Articles" },
  { path: "/career", pageName: "Career & Jobs" },
  { path: "/packages", pageName: "Pricing & Packages" },
  { path: "/our-team", pageName: "Our Team" },
];

export default function AdminSeoPage() {
  const [seoList, setSeoList] = useState<SeoMetaData[]>([]);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "services" | "core">("all");
  const [isPending, startTransition] = useTransition();

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [path, setPath] = useState("");
  const [pageName, setPageName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [robots, setRobots] = useState("index, follow");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [customSchemaJson, setCustomSchemaJson] = useState("");

  const loadData = async () => {
    setLoading(true);
    const [seos, svcList] = await Promise.all([fetchAllSeo(), fetchServices(true)]);
    setSeoList(seos);
    setServices(svcList);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = (preset?: { path: string; pageName: string; defaultTitle?: string; defaultDesc?: string }) => {
    setEditingId(null);
    setPath(preset?.path || "");
    setPageName(preset?.pageName || "");
    setTitle(preset?.defaultTitle || "");
    setDescription(preset?.defaultDesc || "");
    setKeywords("");
    setCanonicalUrl(preset?.path ? `https://sumitdevtech.com${preset.path === "/" ? "" : preset.path}` : "");
    setRobots("index, follow");
    setOgTitle(preset?.defaultTitle || "");
    setOgDescription(preset?.defaultDesc || "");
    setOgImage("https://sumitdevtech.com/images/og-default.jpg");
    setTwitterCard("summary_large_image");
    setCustomSchemaJson("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: SeoMetaData) => {
    setEditingId(item._id || null);
    setPath(item.path);
    setPageName(item.pageName);
    setTitle(item.title);
    setDescription(item.description);
    setKeywords((item.keywords || []).join(", "));
    setCanonicalUrl(item.canonicalUrl || "");
    setRobots(item.robots || "index, follow");
    setOgTitle(item.ogTitle || "");
    setOgDescription(item.ogDescription || "");
    setOgImage(item.ogImage || "");
    setTwitterCard(item.twitterCard || "summary_large_image");
    setCustomSchemaJson(item.customSchemaJson || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!path.trim() || !title.trim()) {
      notify.error("Page Path and Meta Title are required.");
      return;
    }

    if (customSchemaJson.trim()) {
      try {
        JSON.parse(customSchemaJson);
      } catch (err: any) {
        notify.error("Custom Schema JSON is invalid! Please check syntax.");
        return;
      }
    }

    const payload: Partial<SeoMetaData> = {
      path: path.trim().toLowerCase(),
      pageName: pageName.trim() || path.trim(),
      title: title.trim(),
      description: description.trim(),
      keywords: keywords.split(",").map((s) => s.trim()).filter(Boolean),
      canonicalUrl: canonicalUrl.trim(),
      robots: robots.trim(),
      ogTitle: ogTitle.trim() || title.trim(),
      ogDescription: ogDescription.trim() || description.trim(),
      ogImage: ogImage.trim(),
      twitterCard,
      customSchemaJson: customSchemaJson.trim(),
      isActive: true,
    };

    startTransition(async () => {
      const result = await saveSeoMeta(payload);
      if (result.success) {
        notify.success("SEO Configuration saved successfully!");
        closeModal();
        loadData();
      } else {
        notify.error(result.message || "Failed to save SEO config.");
      }
    });
  };

  const handleDelete = async (item: SeoMetaData) => {
    if (!item._id) return;
    const confirmed = await confirmAction({
      title: `Delete SEO for "${item.path}"?`,
      text: "Default fallback metadata will be used instead.",
      confirmButtonText: "Delete SEO",
    });
    if (!confirmed) return;

    const result = await deleteSeoMeta(item._id);
    if (result.success) {
      notify.success("SEO configuration removed.");
      loadData();
    } else {
      notify.error(result.message || "Failed to delete.");
    }
  };

  // Combine All Pages: Core pages + All Dynamic Service pages
  const allDiscoveredPages = [
    ...DEFAULT_SITE_PAGES.map((p) => ({ ...p, type: "core" })),
    ...services.map((s) => ({
      path: `/services/${s.slug}`,
      pageName: `${s.title} Service`,
      defaultTitle: s.metaTitle || `${s.title} | Sumit DevTech`,
      defaultDesc: s.metaDescription || s.description,
      type: "service",
    })),
  ];

  // Map each page with its saved SEO config if exists
  const combinedViewList = allDiscoveredPages.map((page) => {
    const existingSeo = seoList.find((s) => s.path === page.path);
    return {
      path: page.path,
      pageName: page.pageName,
      type: page.type,
      seo: existingSeo || null,
      defaultTitle: (page as any).defaultTitle || `${page.pageName} | Sumit DevTech`,
      defaultDesc: (page as any).defaultDesc || "",
    };
  });

  // Also include any extra custom paths added directly by admin that aren't in discovered list
  const extraSeoItems = seoList.filter(
    (s) => !allDiscoveredPages.some((p) => p.path === s.path)
  );
  extraSeoItems.forEach((extra) => {
    combinedViewList.push({
      path: extra.path,
      pageName: extra.pageName,
      type: extra.path.startsWith("/services/") ? "service" : "custom",
      seo: extra,
      defaultTitle: extra.title,
      defaultDesc: extra.description,
    });
  });

  const filteredViewList = combinedViewList.filter((item) => {
    const matchesSearch =
      item.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.seo?.title || item.defaultTitle || "").toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (filterType === "services") return item.type === "service";
    if (filterType === "core") return item.type === "core";
    return true;
  });

  const configuredCount = combinedViewList.filter((item) => item.seo !== null).length;

  return (
    <div className="space-y-6 w-full font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Globe className="text-orange-500" size={26} />
            SEO &amp; Meta Tags Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage Meta Titles, Descriptions, Canonical URLs, OG Tags &amp; Schema JSON for all core and dynamic service pages.
          </p>
        </div>
        <button
          onClick={() => openAddModal()}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/25 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          Add Custom Page SEO
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterType === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Pages ({combinedViewList.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType("services")}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              filterType === "services" ? "bg-white text-orange-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers size={13} />
            Services Pages ({combinedViewList.filter((i) => i.type === "service").length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType("core")}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterType === "core" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Core Pages ({combinedViewList.filter((i) => i.type === "core").length})
          </button>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by URL path or page title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>
          <div className="text-xs text-slate-500 whitespace-nowrap">
            Custom SEO Configured: <b>{configuredCount}</b> / {combinedViewList.length}
          </div>
        </div>
      </div>

      {/* Main Table Listing All Pages */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading all pages and SEO configs...</div>
        ) : filteredViewList.length === 0 ? (
          <div className="p-12 text-center">
            <Globe size={40} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-semibold text-slate-700">No Pages Found</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Page / Path</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Active Meta Title &amp; Description</th>
                  <th className="py-3.5 px-4 text-center">Robots</th>
                  <th className="py-3.5 px-4 text-center">Schema</th>
                  <th className="py-3.5 px-4 text-center">SEO Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredViewList.map((item) => {
                  const hasCustom = !!item.seo;
                  const displayTitle = item.seo?.title || item.defaultTitle;
                  const displayDesc = item.seo?.description || item.defaultDesc;

                  return (
                    <tr key={item.path} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{item.pageName}</div>
                        <div className="font-mono text-xs text-orange-600 mt-0.5">{item.path}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                            item.type === "service"
                              ? "bg-orange-50 text-orange-700 border border-orange-200"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.type === "service" ? "Dynamic Service" : "Core Page"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="font-semibold text-slate-800 line-clamp-1">{displayTitle}</div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {displayDesc || "Using auto-generated summary"}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-mono text-xs text-slate-600">
                          {item.seo?.robots || "index, follow"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {item.seo?.customSchemaJson ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Custom JSON-LD
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">Default</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {hasCustom ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                            <CheckCircle2 size={12} /> Custom SEO
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                            Default
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
                          title="Open Live Page"
                        >
                          <ExternalLink size={15} />
                        </a>
                        <button
                          onClick={() => {
                            if (item.seo) {
                              openEditModal(item.seo);
                            } else {
                              openAddModal({
                                path: item.path,
                                pageName: item.pageName,
                                defaultTitle: item.defaultTitle,
                                defaultDesc: item.defaultDesc,
                              });
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition cursor-pointer"
                          title="Manage SEO"
                        >
                          <Edit2 size={13} />
                          {hasCustom ? "Edit SEO" : "Set SEO"}
                        </button>
                        {hasCustom && (
                          <button
                            onClick={() => handleDelete(item.seo!)}
                            className="inline-flex p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                            title="Reset to Default"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SEO Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto font-sans">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Globe className="text-orange-500" size={20} />
                {editingId ? `Edit SEO: ${path}` : `Configure SEO: ${path || "New Page"}`}
              </h2>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Row 1: Path & Page Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Page URL Path *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /services/website-design or /"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    className="w-full text-sm px-3.5 py-2 font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Exact route on website (starting with /)</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Internal Page Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Website Design Service"
                    value={pageName}
                    onChange={(e) => setPageName(e.target.value)}
                    className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Row 2: Title & Description */}
              <div className="space-y-4 pt-3 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Google Search Snippet (Meta Tags)
                </h3>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">Meta Title *</label>
                    <span className={`text-[11px] ${title.length > 60 ? "text-amber-600 font-bold" : "text-slate-400"}`}>
                      {title.length}/60 chars recommended
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Website Design Company in India | UI/UX & Next.js"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">Meta Description</label>
                    <span className={`text-[11px] ${description.length > 160 ? "text-amber-600 font-bold" : "text-slate-400"}`}>
                      {description.length}/160 chars recommended
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Brief compelling description shown on Google search result snippet..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Focus Keywords (comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="web design, ui ux, website company"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Robots Directive
                    </label>
                    <select
                      value={robots}
                      onChange={(e) => setRobots(e.target.value)}
                      className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                    >
                      <option value="index, follow">index, follow (Default)</option>
                      <option value="noindex, follow">noindex, follow</option>
                      <option value="noindex, nofollow">noindex, nofollow</option>
                      <option value="index, nofollow">index, nofollow</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Canonical URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://sumitdevtech.com/services/website-design"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    className="w-full text-sm px-3.5 py-2 font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Social & OpenGraph Sharing */}
              <div className="space-y-4 pt-3 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Share2 size={14} className="text-orange-500" />
                  Social Media &amp; OpenGraph Sharing (WhatsApp, LinkedIn, Twitter)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      OG / Social Title
                    </label>
                    <input
                      type="text"
                      placeholder="Leave blank to use Meta Title"
                      value={ogTitle}
                      onChange={(e) => setOgTitle(e.target.value)}
                      className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      OG Image URL (Share Banner)
                    </label>
                    <input
                      type="text"
                      placeholder="https://.../preview.jpg"
                      value={ogImage}
                      onChange={(e) => setOgImage(e.target.value)}
                      className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    OG / Social Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Leave blank to use Meta Description"
                    value={ogDescription}
                    onChange={(e) => setOgDescription(e.target.value)}
                    className="w-full text-sm px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 4: Custom JSON-LD Schema */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 size={14} className="text-orange-500" />
                  Custom Schema Markup (JSON-LD)
                </h3>
                <p className="text-xs text-slate-500">
                  Paste your raw JSON-LD schema (e.g. Service, FAQPage, Organization, BreadcrumbList). It will be injected directly into the page head.
                </p>
                <textarea
                  rows={6}
                  placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "Service",\n  "name": "Website Design",\n  "provider": {\n    "@type": "Organization",\n    "name": "Sumit DevTech"\n  }\n}`}
                  value={customSchemaJson}
                  onChange={(e) => setCustomSchemaJson(e.target.value)}
                  className="w-full text-xs font-mono p-3 bg-slate-900 text-emerald-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-md shadow-orange-500/25 transition cursor-pointer disabled:opacity-50"
                >
                  <Save size={15} />
                  {isPending ? "Saving..." : "Save SEO Config"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
