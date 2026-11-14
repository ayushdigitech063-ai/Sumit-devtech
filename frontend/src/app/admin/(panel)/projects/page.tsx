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
  Tag,
  X,
} from "lucide-react";
import {
  fetchProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  fetchProjectCategories,
  createProjectCategory,
  deleteProjectCategory,
  type ProjectData,
} from "@/lib/projects-api";
import { uploadImageFile } from "@/lib/upload-api";
import { confirmAction, notify } from "@/lib/alerts";

const DEFAULT_CATEGORIES = [
  "App Development",
  "Web Application",
  "SEO Services",
  "CRM & ERP",
  "E-Commerce Website",
  "Corporate Website",
  "Booking Website",
  "Travel Website",
  "IT Services Website",
  "Tourism Website",
  "Service Website",
  "Medical Website",
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [categories, setCategories] = useState<{ _id?: string; name: string }[]>(
    DEFAULT_CATEGORIES.map((name) => ({ name }))
  );
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Category Manager Modal State
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [catLoading, setCatLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: DEFAULT_CATEGORIES[0],
    url: "",
    image: "/images/projects/case-thumb.png",
    description: "",
    featured: false,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([
        fetchProjects(),
        fetchProjectCategories(),
      ]);

      if (pRes.success && pRes.data) {
        setProjects(pRes.data);
      }
      if (cRes.success && cRes.data && cRes.data.length > 0) {
        setCategories(cRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: categories[0]?.name || DEFAULT_CATEGORIES[0],
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadImageFile(file);
      if (res.success && res.url) {
        setFormData((prev) => ({ ...prev, image: res.url }));
        notify.success("Image uploaded successfully!");
      }
    } catch (err: any) {
      notify.error("Image upload failed: " + (err.message || "Network error"));
    } finally {
      setUploading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) {
      notify.error("Title and URL are required.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const res = await updateAdminProject(editingId, formData);
        if (res.success) {
          setProjects((prev) =>
            prev.map((item) => (item._id === editingId ? res.data : item))
          );
          setIsModalOpen(false);
          notify.success("Project updated successfully!");
        }
      } else {
        const res = await createAdminProject(formData);
        if (res.success) {
          setProjects((prev) => [res.data, ...prev]);
          setIsModalOpen(false);
          notify.success("New project published successfully!");
        }
      }
    } catch (err: any) {
      notify.error(err.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = await confirmAction({
      title: `Delete "${title}"?`,
      text: "This project will be permanently removed from the website and portfolio.",
      confirmButtonText: "Yes, Delete It",
    });

    if (!confirmed) return;

    try {
      const res = await deleteAdminProject(id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
        notify.success(`"${title}" deleted successfully!`);
      }
    } catch (err: any) {
      notify.error(err.message || "Failed to delete project.");
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setCatLoading(true);
    try {
      const res = await createProjectCategory(newCatName.trim());
      if (res.success && res.data) {
        setCategories((prev) => [...prev, res.data!]);
        setNewCatName("");
        notify.success(`Category "${res.data.name}" added!`);
      } else {
        notify.error(res.message || "Could not add category");
      }
    } catch (e: any) {
      notify.error(e.message);
    } finally {
      setCatLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    const confirmed = await confirmAction({
      title: `Delete Category "${name}"?`,
      text: "This category will be permanently removed from the portfolio filters.",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirmed) return;

    try {
      const res = await deleteProjectCategory(id);
      if (res.success) {
        setCategories((prev) => prev.filter((c) => c._id !== id));
        notify.success(`Category "${name}" deleted!`);
      }
    } catch (e: any) {
      notify.error(e.message);
    }
  };

  // Filtered List
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.url.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || p.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 font-sans pb-10 text-slate-800">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-black">Projects &amp; Portfolio</h1>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">
              {projects.length} live
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Publish new projects, manage category tags, and update your live showcase.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsCatModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 shadow-2xs transition cursor-pointer"
          >
            <Tag size={15} className="text-orange-600" />
            <span>Manage Categories</span>
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/25 transition hover:shadow-orange-500/40 cursor-pointer"
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
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
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
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition duration-200 hover:border-orange-300 hover:shadow-md"
            >
              {/* Image Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                <Image
                  src={p.image || "/images/projects/case-thumb.png"}
                  alt={p.title}
                  fill
                  unoptimized
                  className="object-cover object-top transition duration-300 group-hover:scale-102"
                />
                <span className="absolute top-3 left-3 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-xs">
                  {p.category}
                </span>
                {p.featured && (
                  <span className="absolute top-3 right-3 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-xs flex items-center gap-1">
                    <Star size={10} fill="white" /> Featured
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition line-clamp-1">
                    {p.title}
                  </h3>
                  {p.description && (
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={12} />
                  </a>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(p)}
                      title="Edit Project"
                      className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id, p.title)}
                      title="Delete Project"
                      className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Manager Modal */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Tag size={18} className="text-orange-500" />
                <h3 className="text-base font-bold text-slate-900">Manage Portfolio Categories</h3>
              </div>
              <button
                onClick={() => setIsCatModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Add Category Input */}
            <form onSubmit={handleAddCategory} className="mt-4 flex gap-2">
              <input
                required
                placeholder="New category name (e.g. AI Tools)"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="flex-1 h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                disabled={catLoading}
                className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition flex items-center gap-1"
              >
                {catLoading ? <Loader2 size={13} className="animate-spin" /> : <Plus size={14} />}
                <span>Add</span>
              </button>
            </form>

            {/* Existing Categories List */}
            <div className="mt-4 max-h-60 overflow-y-auto space-y-2 pr-1">
              {categories.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                >
                  <span>{c.name}</span>
                  {c._id && (
                    <button
                      onClick={() => handleDeleteCategory(c._id!, c.name)}
                      className="p-1 text-slate-400 hover:text-red-600 transition"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
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
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
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
                  rows={3}
                  placeholder="Tell brief results or client industry..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredProject"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="h-4 w-4 rounded text-orange-600 focus:ring-orange-500 cursor-pointer"
                />
                <label htmlFor="featuredProject" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Mark as Featured (Highlights on home page)
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  <span>{editingId ? "Update Project" : "Publish Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
