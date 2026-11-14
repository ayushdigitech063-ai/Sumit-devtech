"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  ExternalLink,
  Search,
  Globe,
  FileCode,
  Layers,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  AlertTriangle,
  X,
} from "lucide-react";
import { supportedCities as fallbackCities, supportedServices } from "@/data/locations-data";
import { site } from "@/data/site";
import {
  CityLocationData,
  fetchCities,
  deleteCity,
  updateCity,
  createCity,
} from "@/lib/cities-api";
import { confirmAction, notify } from "@/lib/alerts";

export default function AdminSitemapPage() {
  const [cities, setCities] = useState<CityLocationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<CityLocationData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // New city form state
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    country: "India",
    tagline: "",
    popularAreas: "",
    localKeywords: "",
  });

  const loadData = async () => {
    setLoading(true);
    const data = await fetchCities(false);
    if (data && data.length > 0) {
      setCities(data);
    } else {
      setCities(fallbackCities.map((c) => ({ ...c, isActive: true })));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Generate matrix of all City + Service landing pages
  const allCityPages = supportedServices.flatMap((service) =>
    cities.map((city) => ({
      _id: city._id,
      serviceName: service.shortName,
      serviceSlug: service.slug,
      cityName: city.name,
      citySlug: city.slug,
      state: city.state,
      country: city.country,
      isActive: city.isActive !== false,
      url: `${site.url}/services/${service.slug}/${city.slug}`,
      relativeUrl: `/services/${service.slug}/${city.slug}`,
      cityObj: city,
    }))
  );

  const filteredPages = allCityPages.filter((item) => {
    const matchesSearch =
      item.cityName.toLowerCase().includes(search.toLowerCase()) ||
      item.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      item.relativeUrl.toLowerCase().includes(search.toLowerCase());
    const matchesCity = selectedCity === "all" || item.citySlug === selectedCity;
    return matchesSearch && matchesCity;
  });

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    notify.success("URL copied to clipboard!");
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Toggle city active status
  const handleToggleActive = async (city: CityLocationData) => {
    if (!city._id) return;
    try {
      const updated = await updateCity(city._id, { isActive: !city.isActive });
      if (updated.success) {
        setCities((prev) =>
          prev.map((c) => (c._id === city._id ? { ...c, isActive: !c.isActive } : c))
        );
        notify.success(`${city.name} ${!city.isActive ? "enabled" : "disabled"} in sitemap!`);
      }
    } catch (e) {
      notify.error("Status update failed");
    }
  };

  // Confirm delete city with SweetAlert
  const handleDeleteCity = async (city: CityLocationData) => {
    if (!city._id) return;
    const confirmed = await confirmAction({
      title: `Delete ${city.name} from Sitemap?`,
      text: `All ${supportedServices.length} landing pages for this city will be permanently removed from the sitemap and website routes.`,
      confirmButtonText: "Yes, Delete City",
    });

    if (!confirmed) return;

    try {
      const res = await deleteCity(city._id);
      if (res.success) {
        setCities((prev) => prev.filter((c) => c._id !== city._id));
        notify.success(`${city.name} deleted successfully!`);
      }
    } catch (e) {
      notify.error("Failed to delete city");
    }
  };

  // Add new City
  const handleCreateCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.state) {
      notify.error("City name and state are required!");
      return;
    }
    setActionLoading(true);
    try {
      const res = await createCity({
        name: formData.name,
        state: formData.state,
        country: formData.country,
        tagline: formData.tagline,
        popularAreas: formData.popularAreas.split(",").map((s) => s.trim()).filter(Boolean),
        localKeywords: formData.localKeywords.split(",").map((s) => s.trim()).filter(Boolean),
      });
      if (res.success && res.city) {
        setCities((prev) => [res.city!, ...prev]);
        setIsAddOpen(false);
        setFormData({
          name: "",
          state: "",
          country: "India",
          tagline: "",
          popularAreas: "",
          localKeywords: "",
        });
        notify.success(`City "${res.city.name}" added with ${supportedServices.length} landing pages!`);
      } else {
        notify.error(res.message || "Failed to add city");
      }
    } catch (e: any) {
      notify.error(e.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  };

  const activePagesCount = allCityPages.filter((p) => p.isActive).length;

  return (
    <div className="space-y-6 font-sans pb-10 text-slate-800">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-black">SEO Sitemap & City Landing Pages</h1>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">
              {activePagesCount} Active URLs Live
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Manage target cities and locations to generate automated landing pages and index them in sitemap.xml.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-black text-white px-4 py-2.5 text-xs sm:text-sm font-bold shadow-sm transition"
          >
            <Plus size={16} />
            <span>Add New City</span>
          </button>

          <Link
            href="/sitemap.xml"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 transition"
          >
            <FileCode size={16} />
            <span>Open sitemap.xml</span>
            <ExternalLink size={13} className="opacity-80" />
          </Link>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Cities</span>
            <MapPin size={18} className="text-orange-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{cities.length}</div>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {cities.map((c) => c.name).join(", ")}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Services</span>
            <Layers size={18} className="text-blue-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{supportedServices.length}</div>
          <p className="text-xs text-slate-500 mt-1">SEO, Web Design, Next.js, E-Commerce, WordPress</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Generated URLs</span>
            <Globe size={18} className="text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{activePagesCount}</div>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 size={13} /> Synced with sitemap &amp; dynamic routing
          </p>
        </div>
      </div>

      {/* Cities Management Pills */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Configured Cities ({cities.length})
          </h2>
          <span className="text-xs text-slate-400">Click Delete icon to remove a city &amp; all its sitemap pages</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {cities.map((c) => (
            <div
              key={c._id || c.slug}
              className={`inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl border text-xs font-medium transition ${
                c.isActive !== false
                  ? "bg-slate-50 border-slate-200 text-slate-800"
                  : "bg-red-50/50 border-red-200 text-slate-400 line-through"
              }`}
            >
              <MapPin size={13} className={c.isActive !== false ? "text-orange-500" : "text-slate-400"} />
              <span className="font-semibold">{c.name}</span>
              <span className="text-[10px] text-slate-400">({c.state})</span>

              {/* Toggle visibility */}
              {c._id && (
                <button
                  onClick={() => handleToggleActive(c)}
                  title={c.isActive !== false ? "Disable & Hide from Sitemap" : "Enable & Show in Sitemap"}
                  className="p-1 hover:bg-slate-200/60 rounded-md text-slate-500 transition"
                >
                  {c.isActive !== false ? <Eye size={13} /> : <EyeOff size={13} className="text-red-500" />}
                </button>
              )}

              {/* Delete button */}
              {c._id && (
                <button
                  onClick={() => handleDeleteCity(c)}
                  title={`Delete ${c.name}`}
                  className="p-1 hover:bg-red-100 rounded-md text-slate-400 hover:text-red-600 transition"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search by city, service, or URL..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:border-orange-500 cursor-pointer"
          >
            <option value="all">All Cities ({cities.length})</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} ({c.country})
              </option>
            ))}
          </select>

          <button
            onClick={loadData}
            title="Refresh"
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Table of City + Service Pages */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500">
                <th className="px-5 py-3.5">CITY / REGION</th>
                <th className="px-5 py-3.5">SERVICE TARGET</th>
                <th className="px-5 py-3.5">LIVE URL PATH</th>
                <th className="px-5 py-3.5 text-center">STATUS</th>
                <th className="px-5 py-3.5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                    No matching city landing pages found.
                  </td>
                </tr>
              ) : (
                filteredPages.map((page, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <MapPin size={15} className={page.isActive ? "text-orange-500" : "text-slate-400"} />
                        <div>
                          <span className={`font-bold block ${page.isActive ? "text-slate-900" : "text-slate-400 line-through"}`}>
                            {page.cityName}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {page.state}, {page.country}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="inline-block rounded-lg bg-orange-50 border border-orange-200/60 px-2.5 py-1 text-xs font-semibold text-orange-700">
                        {page.serviceName}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <code className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                        {page.relativeUrl}
                      </code>
                    </td>

                    <td className="px-5 py-3.5 text-center">
                      {page.isActive ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={11} /> Live &amp; Indexed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500 border border-slate-200">
                          <EyeOff size={11} /> Disabled
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <button
                          onClick={() => handleCopy(page.url)}
                          title="Copy Full URL"
                          className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                        >
                          {copiedUrl === page.url ? (
                            <Check size={14} className="text-emerald-600" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>

                        <Link
                          href={page.relativeUrl}
                          target="_blank"
                          title="Open Live Page"
                          className="grid h-8 w-8 place-items-center rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white transition"
                        >
                          <ExternalLink size={14} />
                        </Link>

                        {page.cityObj._id && (
                          <button
                            onClick={() => handleDeleteCity(page.cityObj)}
                            title={`Delete ${page.cityName} from Sitemap`}
                            className="grid h-8 w-8 place-items-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {cityToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-100">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Delete City from Sitemap?</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900">{cityToDelete.name}</strong>?
              Deleting this city will permanently remove all <span className="font-semibold text-orange-600">{supportedServices.length} landing pages</span> from the sitemap and live routes.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCityToDelete(null)}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCity(cityToDelete)}
                disabled={actionLoading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition"
              >
                {actionLoading ? <RefreshCw size={13} className="animate-spin" /> : <Trash2 size={13} />}
                <span>Yes, Delete City</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New City Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-orange-500" />
                <h3 className="text-base font-bold text-slate-900">Add New City to Local SEO</h3>
              </div>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCity} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City Name *</label>
                  <input
                    required
                    placeholder="e.g. Chandigarh, Ahmedabad"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">State / Region *</label>
                  <input
                    required
                    placeholder="e.g. Punjab, Gujarat"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Country</label>
                <input
                  placeholder="India"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hero Tagline</label>
                <input
                  placeholder="Premier Web Development & SEO in..."
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Popular Areas (comma separated)</label>
                <input
                  placeholder="Sector 17, IT Park, Mohali, Zirakpur"
                  value={formData.popularAreas}
                  onChange={(e) => setFormData({ ...formData, popularAreas: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Local SEO Keywords (comma separated)</label>
                <input
                  placeholder="web development company in chandigarh, best seo agency..."
                  value={formData.localKeywords}
                  onChange={(e) => setFormData({ ...formData, localKeywords: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition"
                >
                  {actionLoading ? <RefreshCw size={14} className="animate-spin" /> : <Plus size={14} />}
                  <span>Add City &amp; Generate URLs</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
