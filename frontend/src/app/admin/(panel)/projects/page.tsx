"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  FolderKanban,
  Plus,
  Search,
  ExternalLink,
  Trash2,
  Edit2,
  RefreshCw,
  Sparkles,
  Globe,
  Star,
  Upload,
  Loader2,
  Check,
} from "lucide-react";
import {
  fetchProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  type ProjectData,
} from "@/lib/projects-api";
import { uploadImageFile } from "@/lib/upload-api";

const CATEGORIES = [
  "E-Commerce Website",
  "Corporate Website",
  "Booking Website",
  "Travel Website",
  "IT Services Website",
  "Tourism Website",
  "Service Website",
  "Medical Website",
  "Web Application",
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: CATEGORIES[0],
    url: "",
    image: "/images/projects/case-thumb.png",
    description: "",
    featured: false,
  });

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetchProjects();
      if (res.success && res.data) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: CATEGORIES[0],
      url: "",
      image: "/images/projects/case-thumb.png",
      description: "",
      featured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProjectData) => {
    setEditingId(p._id);
    setFormData({
      title: p.title,
      category: p.category,
      url: p.url,
      image: p.image || "/images/projects/case-thumb.png",
      description: p.description || "",
      featured: p.featured || false,
    });
    setIsModalOpen(true);
  };

  // Handle direct file upload from PC
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadImageFile(file);
      if (res.url) {
        setFormData((prev) => ({ ...prev, image: res.url }));
      }
    } catch (err: any) {
      alert("Failed to upload image: " + (err.message || "Unknown error"));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;

    setSaving(true);
    try {
      if (editingId) {
        await updateAdminProject(editingId, formData);
      } else {
        await createAdminProject(formData);
      }
      setIsModalOpen(false);
      loadProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete project "${title}"?`)) return;
    try {
      await deleteAdminProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.url.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 font-sans pb-10 text-slate-800">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-black">Projects Portfolio</h1>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">
              {projects.length} live
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Add, update, or remove portfolio client websites displayed across your website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadProjects}
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
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search projects by title, category, URL..."
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
          <option value="all">All Categories ({projects.length})</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-20 text-center text-sm text-slate-400 bg-white rounded-2xl border border-slate-200">
          Loading portfolio projects...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 p-6">
          <FolderKanban size={40} className="mx-auto mb-2 text-slate-300" />
          <p className="text-sm font-semibold">No projects found.</p>
          <button
            onClick={openAddModal}
            className="mt-3 text-xs font-bold text-orange-600 hover:underline"
          >
            + Add your first project now
          </button>
        </div>
      ) : (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p) => (
            <div
              key={p._id}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={p.image || "/images/projects/case-thumb.png"}
                    alt={p.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                      {p.category}
                    </span>
                    {p.featured && (
                      <span className="rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white flex items-center gap-0.5">
                        <Star size={10} /> Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-orange-600 transition">
                    {p.title}
                  </h3>
                  {p.description && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {p.description}
                    </p>
                  )}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 transition truncate max-w-full"
                  >
                    <Globe size={13} className="text-slate-400 shrink-0" />
                    <span className="truncate">{p.url}</span>
                    <ExternalLink size={11} className="shrink-0" />
                  </a>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => openEditModal(p)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-orange-600 transition cursor-pointer px-2 py-1 rounded-md hover:bg-white"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(p._id, p.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition cursor-pointer px-2 py-1 rounded-md hover:bg-red-50"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-8 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Project Title *
                </label>
                <input
                  required
                  placeholder="e.g. The Murtiwala / Global Healthcare"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Website URL *
                  </label>
                  <input
                    required
                    type="url"
                    placeholder="https://example.com"
                    value={formData.url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Upload Image Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Project Preview Image
                </label>

                {/* Upload Button & Preview */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative h-20 w-32 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                    <Image
                      src={formData.image || "/images/projects/case-thumb.png"}
                      alt="Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="projectImageInput"
                    />
                    <label
                      htmlFor="projectImageInput"
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-xl border border-dashed border-orange-400 bg-orange-50/50 hover:bg-orange-50 text-orange-700 text-xs font-bold transition cursor-pointer"
                    >
                      {uploading ? (
                        <>
                          <Loader2 size={15} className="animate-spin text-orange-600" />
                          <span>Uploading image...</span>
                        </>
                      ) : (
                        <>
                          <Upload size={15} className="text-orange-600" />
                          <span>Upload Image from Computer</span>
                        </>
                      )}
                    </label>

                    <input
                      placeholder="Or paste image URL (https://...)"
                      value={formData.image}
                      onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                      className="w-full h-8 rounded-lg border border-slate-200 px-2.5 text-xs text-slate-700 outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Short Description (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell clients what technologies or results were achieved in this project..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                />
                <label htmlFor="featuredCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Feature this project on Homepage Carousel
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
                  disabled={saving || uploading}
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition cursor-pointer disabled:opacity-70"
                >
                  {saving ? "Saving..." : editingId ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
