"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  RefreshCw,
  ExternalLink,
  Star,
  Clock,
  Tag,
  CheckCircle,
  Upload,
  Loader2,
} from "lucide-react";
import {
  fetchAdminBlogs,
  createAdminBlog,
  updateAdminBlog,
  deleteAdminBlog,
  type BlogItem,
} from "@/lib/blogs-api";
import { uploadImageFile } from "@/lib/upload-api";
import BlogRichEditor from "@/app/component/adminComponent/BlogRichEditor";

const CATEGORIES = [
  "Web Development",
  "AI & Cloud",
  "UI/UX Design",
  "Cybersecurity",
  "Digital Strategy",
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
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
    excerpt: "",
    content: "",
    category: CATEGORIES[0],
    coverImage: "/images/projects/case-thumb2.png",
    readTime: "5 min read",
    authorName: "Sumit Kumar",
    authorRole: "Lead Solutions Architect",
    featured: false,
    published: true,
    tags: "Web Development, Tech, Next.js",
  });

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminBlogs();
      if (res.success && res.data) {
        setBlogs(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: CATEGORIES[0],
      coverImage: "/images/projects/case-thumb2.png",
      readTime: "5 min read",
      authorName: "Sumit Kumar",
      authorRole: "Lead Solutions Architect",
      featured: false,
      published: true,
      tags: "Web Development, Tech, Next.js",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (b: BlogItem) => {
    setEditingId(b._id);
    setFormData({
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      category: b.category,
      coverImage: b.coverImage || "/images/projects/case-thumb2.png",
      readTime: b.readTime || "5 min read",
      authorName: b.authorName || "Sumit Kumar",
      authorRole: b.authorRole || "Lead Solutions Architect",
      featured: b.featured || false,
      published: b.published ?? true,
      tags: Array.isArray(b.tags) ? b.tags.join(", ") : b.tags || "",
    });
    setIsModalOpen(true);
  };

  // Upload cover image directly from PC
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadImageFile(file);
      if (res.url) {
        setFormData((prev) => ({ ...prev, coverImage: res.url }));
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
    if (!formData.title || !formData.content) {
      alert("Please provide both title and content.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      if (editingId) {
        await updateAdminBlog(editingId, payload);
      } else {
        await createAdminBlog(payload);
      }
      setIsModalOpen(false);
      loadBlogs();
    } catch (err) {
      console.error(err);
      alert("Failed to save blog post.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete article "${title}"?`)) return;
    try {
      await deleteAdminBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || b.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 font-sans pb-10 text-slate-800">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-black">Articles & Blog Posts</h1>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">
              {blogs.length} published
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Write, manage, and publish technical insights with rich formatting and instant image uploads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadBlogs}
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
            <span>Create New Article</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search articles by title, keywords, category..."
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
          <option value="all">All Topics ({blogs.length})</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="py-20 text-center text-sm text-slate-400 bg-white rounded-2xl border border-slate-200">
          Loading blog posts...
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 p-6">
          <FileText size={40} className="mx-auto mb-2 text-slate-300" />
          <p className="text-sm font-semibold">No articles found.</p>
          <button
            onClick={openAddModal}
            className="mt-3 text-xs font-bold text-orange-600 hover:underline"
          >
            + Create your first blog post now
          </button>
        </div>
      ) : (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((b) => (
            <div
              key={b._id}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={b.coverImage || "/images/projects/case-thumb2.png"}
                    alt={b.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                      {b.category}
                    </span>
                    {b.featured && (
                      <span className="rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white flex items-center gap-0.5">
                        <Star size={10} /> Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5">
                    <Clock size={12} />
                    <span>{b.readTime || "5 min read"}</span>
                    <span>•</span>
                    <span>{b.authorName || "Sumit Kumar"}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-orange-600 transition line-clamp-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(b)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-orange-600 transition cursor-pointer px-2 py-1 rounded-md hover:bg-white"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>

                  <Link
                    href={`/blogs/${b.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition px-2 py-1"
                  >
                    <span>Preview</span>
                    <ExternalLink size={11} />
                  </Link>
                </div>

                <button
                  onClick={() => handleDelete(b._id, b.title)}
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

      {/* Add / Edit Blog Modal with React Quill */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-8 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? "Edit Article" : "Write New Article"}
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
                  Article Title *
                </label>
                <input
                  required
                  placeholder="e.g. Mastering Next.js 15: Modern Architecture"
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
                    Estimated Read Time
                  </label>
                  <input
                    placeholder="e.g. 5 min read"
                    value={formData.readTime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, readTime: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Cover Image Upload Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Cover Image
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative h-20 w-32 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                    <Image
                      src={formData.coverImage || "/images/projects/case-thumb2.png"}
                      alt="Cover Preview"
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
                      id="blogCoverInput"
                    />
                    <label
                      htmlFor="blogCoverInput"
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
                          <span>Upload Cover Image from PC</span>
                        </>
                      )}
                    </label>

                    <input
                      placeholder="Or paste image URL (https://...)"
                      value={formData.coverImage}
                      onChange={(e) => setFormData((prev) => ({ ...prev, coverImage: e.target.value }))}
                      className="w-full h-8 rounded-lg border border-slate-200 px-2.5 text-xs text-slate-700 outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Short Excerpt / Summary *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="A brief 1-2 sentence preview for cards and search engines..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 outline-none focus:border-orange-500 resize-none"
                />
              </div>

              {/* Full Body Content with React Quill Rich Text Editor */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Article Body (Rich Text Editor) *
                </label>
                <BlogRichEditor
                  value={formData.content}
                  onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                  placeholder="Write your headings, bullet points, code blocks and formatted article here..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Author Name
                  </label>
                  <input
                    value={formData.authorName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, authorName: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    placeholder="Next.js, React, Architecture"
                    value={formData.tags}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-700">Feature this Article</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-700">Published (Visible on site)</span>
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
                  {saving ? "Saving..." : editingId ? "Save Changes" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
