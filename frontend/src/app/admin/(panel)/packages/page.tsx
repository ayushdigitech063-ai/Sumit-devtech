"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  RefreshCw,
  Star,
  Clock,
  CheckCircle,
  Tag,
  Zap,
} from "lucide-react";
import {
  fetchPublicPackages,
  createAdminPackage,
  updateAdminPackage,
  deleteAdminPackage,
  type PackagePlanItem,
} from "@/lib/packages-api";

const CATEGORIES = [
  "Web Development",
  "E-Commerce Solutions",
  "WordPress & CMS",
  "Digital Marketing & SEO",
  "Maintenance & Hosting",
];

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackagePlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: CATEGORIES[0],
    tagline: "",
    price: "₹19,999",
    period: "one-time",
    deliveryTime: "7 - 10 Days",
    idealFor: "",
    popular: false,
    features: "Custom Responsive Design\nSEO Friendly Structure\nContact Form & WhatsApp\nFree SSL & Speed Tuning",
    ctaText: "Get Started",
    ctaHref: "/contact-us",
  });

  const loadPackages = async () => {
    setLoading(true);
    try {
      const res = await fetchPublicPackages();
      if (res.success && res.data) {
        setPackages(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      category: CATEGORIES[0],
      tagline: "",
      price: "₹19,999",
      period: "one-time",
      deliveryTime: "7 - 10 Days",
      idealFor: "",
      popular: false,
      features: "Custom Responsive Design\nSEO Friendly Structure\nContact Form & WhatsApp\nFree SSL & Speed Tuning",
      ctaText: "Get Started",
      ctaHref: "/contact-us",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: PackagePlanItem) => {
    setEditingId(p._id);
    setFormData({
      name: p.name,
      category: p.category || CATEGORIES[0],
      tagline: p.tagline || "",
      price: p.price,
      period: p.period || "one-time",
      deliveryTime: p.deliveryTime || "7 - 10 Days",
      idealFor: p.idealFor || "",
      popular: p.popular || false,
      features: Array.isArray(p.features) ? p.features.join("\n") : "",
      ctaText: p.ctaText || "Get Started",
      ctaHref: p.ctaHref || "/contact-us",
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    setSaving(true);
    try {
      const payload = {
        ...formData,
        features: formData.features.split("\n").map((f) => f.trim()).filter(Boolean),
      };

      if (editingId) {
        await updateAdminPackage(editingId, payload);
      } else {
        await createAdminPackage(payload);
      }
      setIsModalOpen(false);
      loadPackages();
    } catch (err) {
      console.error(err);
      alert("Failed to save package.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete package "${name}"?`)) return;
    try {
      await deleteAdminPackage(id);
      setPackages((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPackages = packages.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.price.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 font-sans pb-10 text-slate-800">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-black">Pricing Packages</h1>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">
              {packages.length} active
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Create, update pricing, features, and delivery timelines for your agency packages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadPackages}
            title="Refresh"
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition shadow-2xs cursor-pointer"
          >
            <RefreshCw size={16} className={loading ? "animate-spin text-orange-500" : ""} />
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition hover:shadow-orange-500/40 cursor-pointer"
          >
            <Plus size={16} />
            <span>Create New Package</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search packages by name, category, price..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-500 focus:bg-white"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:border-orange-500 cursor-pointer"
        >
          <option value="all">All Categories ({packages.length})</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Packages Grid */}
      {loading ? (
        <div className="py-20 text-center text-sm text-slate-400 bg-white rounded-2xl border border-slate-200">
          Loading pricing packages...
        </div>
      ) : filteredPackages.length === 0 ? (
        <div className="py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 p-6">
          <Package size={40} className="mx-auto mb-2 text-slate-300" />
          <p className="text-sm font-semibold">No packages found.</p>
          <button
            onClick={openAddModal}
            className="mt-3 text-xs font-bold text-orange-600 hover:underline"
          >
            + Create your first package now
          </button>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((p) => (
            <div
              key={p._id}
              className={`rounded-2xl border bg-white p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between ${
                p.popular ? "border-orange-400 ring-2 ring-orange-500/20" : "border-slate-200"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {p.category}
                  </span>
                  {p.popular && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-0.5 text-[10px] font-bold text-orange-700">
                      <Zap size={11} /> Popular
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                {p.tagline && (
                  <p className="text-xs text-slate-500 mt-1">{p.tagline}</p>
                )}

                <div className="my-4 pb-4 border-b border-slate-100">
                  <span className="text-3xl font-extrabold text-black">{p.price}</span>
                  <span className="text-xs text-slate-400 ml-1.5 font-medium">/{p.period}</span>
                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock size={12} className="text-orange-500" />
                    <span>Delivery in {p.deliveryTime}</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    What's included:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 mt-1.5">
                    {p.features?.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => openEditModal(p)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-orange-600 transition cursor-pointer px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
                >
                  <Edit2 size={13} />
                  <span>Edit Plan</span>
                </button>

                <button
                  onClick={() => handleDelete(p._id, p.name)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition cursor-pointer px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-50"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Package Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-8 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? "Edit Pricing Package" : "Create New Package"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Package Name *
                  </label>
                  <input
                    required
                    placeholder="e.g. Dynamic Website / Pro Store"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-800 outline-none focus:border-orange-500 cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Tagline / Subtitle
                </label>
                <input
                  placeholder="e.g. A fast, scalable online store with payment gateway"
                  value={formData.tagline}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tagline: e.target.value }))}
                  className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Price (INR) *
                  </label>
                  <input
                    required
                    placeholder="e.g. ₹29,999"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Billing Period
                  </label>
                  <input
                    placeholder="e.g. one-time / month"
                    value={formData.period}
                    onChange={(e) => setFormData((prev) => ({ ...prev, period: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Delivery Time
                  </label>
                  <input
                    placeholder="e.g. 7 - 10 Days"
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, deliveryTime: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Features List (One feature per line) *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Custom Responsive Layout&#10;Google Analytics & Tag Manager&#10;Razorpay Payment Gateway&#10;WhatsApp Live Chat Button"
                  value={formData.features}
                  onChange={(e) => setFormData((prev) => ({ ...prev, features: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Ideal For (Target Client)
                </label>
                <input
                  placeholder="e.g. Startups, restaurants, dental clinics, local stores"
                  value={formData.idealFor}
                  onChange={(e) => setFormData((prev) => ({ ...prev, idealFor: e.target.value }))}
                  className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="popularCheck"
                  checked={formData.popular}
                  onChange={(e) => setFormData((prev) => ({ ...prev, popular: e.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                />
                <label htmlFor="popularCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Highlight this package as "Most Popular" / Recommended
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition cursor-pointer disabled:opacity-70"
                >
                  {saving ? "Saving..." : editingId ? "Save Changes" : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
