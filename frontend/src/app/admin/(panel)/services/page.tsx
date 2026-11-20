"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  Search,
  Eye,
  EyeOff,
  ExternalLink,
} from "lucide-react";
import {
  ServiceData,
  fetchServices,
  updateService,
  deleteService,
} from "@/lib/services-api";
import { confirmAction, notify } from "@/lib/alerts";

export default function AdminServicesListPage() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadServices = async () => {
    setLoading(true);
    const data = await fetchServices(true);
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleToggleActive = async (svc: ServiceData) => {
    if (!svc._id) return;
    const result = await updateService(svc._id, { isActive: !svc.isActive });
    if (result.success) {
      notify.success(svc.isActive ? `${svc.title} set to Draft` : `${svc.title} is now Live!`);
      loadServices();
    }
  };

  const handleDelete = async (svc: ServiceData) => {
    if (!svc._id) return;
    const confirmed = await confirmAction({
      title: `Delete "${svc.title}"?`,
      text: `This will permanently remove the dynamic page /services/${svc.slug}.`,
      confirmButtonText: "Delete Service",
    });
    if (!confirmed) return;

    const result = await deleteService(svc._id);
    if (result.success) {
      notify.success(`"${svc.title}" deleted.`);
      loadServices();
    } else {
      notify.error(result.message || "Failed to delete.");
    }
  };

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Layers className="text-orange-500" size={26} />
            All Dynamic Services
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your dynamic service landing pages or add a new one with the step-by-step template.
          </p>
        </div>
        <Link
          href="/admin/services/create"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/25 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          Add New Service
        </Link>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search services by title or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          />
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-3">
          <span>Total: <b>{services.length}</b></span>
          <span>Live: <b>{services.filter((s) => s.isActive).length}</b></span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading services...</div>
        ) : filteredServices.length === 0 ? (
          <div className="p-12 text-center">
            <Layers size={40} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-semibold text-slate-700">No Services Found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Add your first dynamic service using the template builder.
            </p>
            <Link
              href="/admin/services/create"
              className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-xl"
            >
              <Plus size={14} /> Add New Service
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Live URL</th>
                  <th className="py-3.5 px-4 text-center">Features</th>
                  <th className="py-3.5 px-4 text-center">FAQs</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredServices.map((svc) => (
                  <tr key={svc._id || svc.slug} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{svc.title}</div>
                      <div className="text-xs text-slate-400 line-clamp-1">{svc.badge}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                      /services/{svc.slug}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {svc.ecosystemCards?.length || 0} cards
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                        {svc.faqs?.length || 0}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(svc)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                          svc.isActive
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {svc.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                        {svc.isActive ? "Live" : "Draft"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <a
                        href={`/services/${svc.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
                        title="View Live Page"
                      >
                        <ExternalLink size={15} />
                      </a>
                      <Link
                        href={`/admin/services/edit/${svc.slug}`}
                        className="inline-flex p-1.5 text-slate-400 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition"
                        title="Edit Service"
                      >
                        <Edit2 size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(svc)}
                        className="inline-flex p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                        title="Delete Service"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
