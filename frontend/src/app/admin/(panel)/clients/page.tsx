"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, RefreshCw, Upload, Check, Building2, Eye, EyeOff } from "lucide-react";
import {
  fetchAdminClients,
  createAdminClient,
  updateAdminClient,
  deleteAdminClient,
  type ClientLogoItem,
} from "@/lib/clients-api";
import { confirmAction, notify } from "@/lib/alerts";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientLogoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    order: 0,
  });

  const loadClients = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminClients();
      setClients(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ name: "", logo: "", order: clients.length + 1 });
    setIsModalOpen(true);
  };

  const openEditModal = (client: ClientLogoItem) => {
    setEditingId(client._id);
    setFormData({ name: client.name, logo: client.logo, order: client.order || 0 });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
        body: data,
      });
      const json = await res.json();
      if (json.url || json.secure_url) {
        setFormData((prev) => ({ ...prev, logo: json.url || json.secure_url }));
        notify.success("Logo uploaded!");
      } else {
        notify.error("Upload failed. Please enter direct logo URL.");
      }
    } catch {
      notify.error("Error uploading image. Please provide a direct URL.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.logo) {
      notify.error("Please provide both client name and logo.");
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await updateAdminClient(editingId, formData);
        notify.success("Client logo updated!");
      } else {
        await createAdminClient(formData);
        notify.success("Client logo created!");
      }
      setIsModalOpen(false);
      loadClients();
    } catch (err: any) {
      notify.error(err.message || "Failed to save client logo");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (client: ClientLogoItem) => {
    try {
      await updateAdminClient(client._id, { isActive: !client.isActive });
      setClients((prev) =>
        prev.map((c) => (c._id === client._id ? { ...c, isActive: !c.isActive } : c))
      );
      notify.success(`Client logo ${!client.isActive ? "activated" : "deactivated"}!`);
    } catch (err: any) {
      notify.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const confirmed = await confirmAction({
      title: `Delete "${name}"?`,
      text: "This client partner logo will be permanently deleted from the live marquee.",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirmed) return;

    try {
      await deleteAdminClient(id);
      setClients((prev) => prev.filter((c) => c._id !== id));
      notify.success("Client logo deleted!");
    } catch (err: any) {
      notify.error("Failed to delete logo");
    }
  };

  return (
    <div className="space-y-6 font-sans pb-10 text-slate-800">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-black">Client Logos & Partners</h1>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">
              {clients.length} Total
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Manage the scrolling client logos marquee displayed across the website homepage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadClients}
            title="Refresh list"
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-2xs cursor-pointer"
          >
            <RefreshCw size={16} className={loading ? "animate-spin text-orange-500" : ""} />
          </button>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 text-sm font-bold shadow-md shadow-orange-500/25 transition cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Client Logo</span>
          </button>
        </div>
      </div>

      {/* Grid of Client Logos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loading ? (
          <div className="col-span-full py-16 text-center text-slate-400">Loading client logos...</div>
        ) : clients.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400">
            <Building2 size={36} className="mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-slate-700">No client logos yet</p>
            <p className="text-xs text-slate-400 mt-1">Click &quot;Add Client Logo&quot; above to add your first client.</p>
          </div>
        ) : (
          clients.map((c) => (
            <div
              key={c._id}
              className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-3.5 shadow-2xs transition-all hover:shadow-md ${
                c.isActive ? "border-slate-200" : "border-slate-200/50 opacity-60 bg-slate-50"
              }`}
            >
              {/* Logo Preview Stage */}
              <div className="relative flex h-20 w-full items-center justify-center rounded-xl bg-slate-50 p-2 border border-slate-100">
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={120}
                  height={45}
                  unoptimized
                  className="max-h-12 w-auto object-contain"
                />
              </div>

              {/* Title & Order */}
              <div className="mt-3">
                <h4 className="font-bold text-xs text-slate-900 truncate" title={c.name}>
                  {c.name}
                </h4>
                <span className="text-[10px] text-slate-400 font-medium">Order: #{c.order || 0}</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(c)}
                  title={c.isActive ? "Visible on site (Click to hide)" : "Hidden (Click to show)"}
                  className={`text-xs p-1 rounded-lg transition ${
                    c.isActive ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  {c.isActive ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(c)}
                    title="Edit client"
                    className="p-1 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(c._id, c.name)}
                    title="Delete client"
                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal: Add / Edit Client Logo */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-2xs p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? "Edit Client Logo" : "Add Client Logo"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Client / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tech Mahindra, Brand Knock"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-800 outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Logo URL or Upload *
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://... logo.svg or .png"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="flex-1 h-10 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-800 outline-none focus:border-orange-500 focus:bg-white"
                  />
                  <label className="flex items-center justify-center h-10 px-3 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer shrink-0 gap-1.5">
                    <Upload size={14} />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {formData.logo && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
                  <Image
                    src={formData.logo}
                    alt="Preview"
                    width={140}
                    height={50}
                    unoptimized
                    className="max-h-12 w-auto object-contain"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-800 outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-md shadow-orange-500/20 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingId ? "Update Logo" : "Add Logo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
