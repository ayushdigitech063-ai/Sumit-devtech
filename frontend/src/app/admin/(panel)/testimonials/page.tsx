"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Star,
  Plus,
  Trash2,
  Edit2,
  Search,
  Sparkles,
  Building,
  UploadCloud,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";
import {
  fetchTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  type TestimonialItem,
} from "@/lib/testimonials-api";
import { uploadImageFile } from "@/lib/upload-api";
import { confirmAction, notify } from "@/lib/alerts";

const CATEGORIES = [
  "Web Development",
  "E-Commerce",
  "Medical & Healthcare",
  "Enterprise & SaaS",
  "Digital Growth",
  "Mobile App Development",
];

const AVATAR_COLORS = [
  { name: "Blue", class: "bg-blue-600" },
  { name: "Emerald", class: "bg-emerald-500" },
  { name: "Orange", class: "bg-orange-500" },
  { name: "Purple", class: "bg-purple-600" },
  { name: "Amber", class: "bg-amber-600" },
  { name: "Rose", class: "bg-rose-500" },
  { name: "Teal", class: "bg-teal-600" },
  { name: "Indigo", class: "bg-indigo-600" },
];

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadingImg, setUploadingImg] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    projectType: "Web Development",
    rating: 5,
    text: "",
    featured: false,
    avatarUrl: "",
    avatarBg: "bg-blue-600",
  });

  const loadData = async () => {
    setLoading(true);
    const data = await fetchTestimonials();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      role: "",
      company: "",
      projectType: "Web Development",
      rating: 5,
      text: "",
      featured: false,
      avatarUrl: "",
      avatarBg: "bg-blue-600",
    });
    setErrorMsg(null);
    setModalOpen(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role || "",
      company: item.company,
      projectType: item.projectType || "Web Development",
      rating: item.rating || 5,
      text: item.text,
      featured: Boolean(item.featured),
      avatarUrl: item.avatarUrl || "",
      avatarBg: item.avatarBg || "bg-blue-600",
    });
    setErrorMsg(null);
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingImg(true);
      setErrorMsg(null);
      const res = await uploadImageFile(file);
      setFormData((prev) => ({ ...prev, avatarUrl: res.url }));
    } catch (err: any) {
      setErrorMsg(err.message || "Image upload failed");
    } finally {
      setUploadingImg(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.company.trim() || !formData.text.trim()) {
      setErrorMsg("Client name, company and testimonial text are required.");
      return;
    }

    startTransition(async () => {
      try {
        if (editingItem && (editingItem._id || editingItem.id)) {
          const id = (editingItem._id || editingItem.id)!;
          await updateTestimonial(id, formData);
          notify.success("Testimonial updated!");
        } else {
          await createTestimonial(formData);
          notify.success("New testimonial added!");
        }
        setModalOpen(false);
        await loadData();
      } catch (err: any) {
        setErrorMsg(err.message || "Failed to save testimonial.");
        notify.error(err.message || "Failed to save testimonial.");
      }
    });
  };

  const handleDelete = async (id: string, name: string) => {
    const confirmed = await confirmAction({
      title: `Delete testimonial from "${name}"?`,
      text: "This client review will be permanently removed from the website review showcase.",
      confirmButtonText: "Yes, Delete It",
    });

    if (!confirmed) return;

    try {
      await deleteTestimonial(id);
      setItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
      notify.success("Testimonial deleted successfully!");
    } catch (err: any) {
      notify.error(err.message || "Failed to delete");
    }
  };

  const handleToggleFeatured = async (item: TestimonialItem) => {
    const id = (item._id || item.id)!;
    try {
      const updated = await updateTestimonial(id, { featured: !item.featured });
      setItems((prev) =>
        prev.map((it) => ((it._id || it.id) === id ? { ...it, featured: updated.featured } : it))
      );
    } catch (err: any) {
      alert("Failed to update status");
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.text.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      selectedCategory === "All" || item.projectType === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            Client Testimonials & Reviews
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage real client feedback, star ratings, and showcase stories for the homepage.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, company, review..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === "All"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All ({items.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading testimonials...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
          <Star className="w-12 h-12 text-slate-300 mx-auto mb-3 stroke-[1.5]" />
          <h3 className="text-base font-semibold text-slate-800">No testimonials found</h3>
          <p className="text-sm text-slate-500 mt-1">Try adjusting your search or add a new testimonial.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const id = (item._id || item.id)!;
            const initials = item.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative group"
              >
                <div>
                  {/* Top bar with rating and featured badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < item.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-200 fill-slate-200"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => handleToggleFeatured(item)}
                      title="Click to toggle featured state on homepage"
                      className={`text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1 transition-colors ${
                        item.featured
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      {item.featured ? "Featured" : "Standard"}
                    </button>
                  </div>

                  {/* Review quote */}
                  <p className="text-sm text-slate-700 italic line-clamp-4 mb-4 leading-relaxed">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>

                <div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    {/* User info */}
                    <div className="flex items-center gap-3 min-w-0">
                      {item.avatarUrl ? (
                        <img
                          src={item.avatarUrl}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0"
                        />
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-full ${
                            item.avatarBg || "bg-blue-600"
                          } text-white font-bold text-xs flex items-center justify-center flex-shrink-0`}
                        >
                          {initials}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-slate-900 truncate">{item.name}</h4>
                        <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                          <Building className="w-3 h-3 flex-shrink-0" />
                          {item.role ? `${item.role}, ` : ""}
                          <span className="font-medium text-slate-700">{item.company}</span>
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 pl-2">
                      <button
                        onClick={() => openEditModal(item)}
                        title="Edit testimonial"
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(id, item.name)}
                        title="Delete testimonial"
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 text-[11px] text-slate-400 font-medium">
                    Category: <span className="text-slate-600">{item.projectType}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                {editingItem ? "Edit Testimonial" : "Add New Testimonial"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Vilaksh Jain"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Client Role / Designation
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Founder & Lead Dermatologist"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company / Clinic Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Derma Pro Center"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Industry / Category
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Star Rating (1 - 5)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        type="button"
                        key={stars}
                        onClick={() => setFormData({ ...formData, rating: stars })}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            stars <= formData.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-200 hover:text-amber-200"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">
                      {formData.rating} of 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Avatar Background Color (fallback)
                  </label>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {AVATAR_COLORS.map((col) => (
                      <button
                        type="button"
                        key={col.class}
                        onClick={() => setFormData({ ...formData, avatarBg: col.class })}
                        className={`w-6 h-6 rounded-full ${col.class} transition-all ${
                          formData.avatarBg === col.class
                            ? "ring-2 ring-offset-2 ring-slate-800 scale-110"
                            : "opacity-70 hover:opacity-100"
                        }`}
                        title={col.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Avatar Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Client Photo (Optional)
                </label>
                <div className="flex items-center gap-3">
                  {formData.avatarUrl && (
                    <img
                      src={formData.avatarUrl}
                      alt="Avatar preview"
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    />
                  )}
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <UploadCloud className="w-4 h-4 text-slate-500" />
                    {uploadingImg ? "Uploading..." : "Upload Photo from PC"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploadingImg}
                      className="hidden"
                    />
                  </label>
                  {formData.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, avatarUrl: "" })}
                      className="text-xs text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Testimonial / Review Text *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="What did the client say about our services, execution and results?..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Featured toggle */}
              <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Mark as Featured Story
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Highlighted prominently in the homepage testimonials carousel.
                  </p>
                </div>
              </label>

              {/* Footer buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending || uploadingImg}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-colors disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      {editingItem ? "Update Testimonial" : "Create Testimonial"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
