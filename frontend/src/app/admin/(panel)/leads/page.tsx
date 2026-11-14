"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Inbox,
  Search,
  Filter,
  Trash2,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
  RefreshCw,
  Tag,
  CheckCircle,
} from "lucide-react";
import {
  fetchAdminLeads,
  updateAdminLeadStatus,
  deleteAdminLead,
  type LeadItem,
} from "@/lib/leads-api";
import { confirmAction, notify } from "@/lib/alerts";

const STATUSES: { value: string; label: string }[] = [
  { value: "New", label: "New" },
  { value: "In progress", label: "In Progress" },
  { value: "Converted", label: "Converted" },
  { value: "Cancelled", label: "Cancelled" },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [total, setTotal] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminLeads({
        status: statusFilter,
        source: sourceFilter,
        search,
      });
      if (res.success) {
        setLeads(res.data);
        setTotal(res.total);
        setUnreadCount(res.unreadCount);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, sourceFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const handleStatusChange = async (id: string, newStatus: any) => {
    try {
      await updateAdminLeadStatus(id, newStatus);
      setLeads((prev) =>
        prev.map((l) => (l._id === id ? { ...l, status: newStatus, isRead: true } : l))
      );
      if (selectedLead?._id === id) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus, isRead: true } : null));
      }
      notify.success(`Lead status updated to ${newStatus}!`);
    } catch (err) {
      notify.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string, clientName?: string) => {
    const confirmed = await confirmAction({
      title: `Delete lead ${clientName ? `from "${clientName}"` : ""}?`,
      text: "This lead record will be permanently removed from the CRM database.",
      confirmButtonText: "Yes, Delete Lead",
    });

    if (!confirmed) return;

    try {
      await deleteAdminLead(id);
      setLeads((prev) => prev.filter((l) => l._id !== id));
      if (selectedLead?._id === id) setSelectedLead(null);
      notify.success("Lead deleted successfully!");
    } catch (err) {
      notify.error("Failed to delete lead");
    }
  };

  return (
    <div className="space-y-6 font-sans pb-10 text-slate-800">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-black">Leads & Enquiries</h1>
            {unreadCount > 0 && (
              <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            All leads captured from Contact Form, Exit Popups, Chatbot & Package unlocks.
          </p>
        </div>

        <button
          onClick={loadData}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw size={15} className={loading ? "animate-spin text-orange-500" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search by name, phone, email, service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-500 focus:bg-white"
          />
        </form>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:border-orange-500 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="New">New</option>
            <option value="In progress">In Progress</option>
            <option value="Converted">Converted</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:border-orange-500 cursor-pointer"
          >
            <option value="all">All Sources</option>
            <option value="contact_form">Contact Us Form</option>
            <option value="quote_popup">Quote Modal / Popup</option>
            <option value="chatbot">Interactive Chatbot</option>
            <option value="package_unlock">Package Pricing Unlock</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500">
                <th className="px-4 py-3">NAME & CONTACT</th>
                <th className="px-4 py-3">SERVICE</th>
                <th className="px-4 py-3">SOURCE</th>
                <th className="px-4 py-3">STATUS</th>
                <th className="px-4 py-3">DATE</th>
                <th className="px-4 py-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-400">
                    Loading leads data...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Inbox size={40} className="stroke-[1.3] text-slate-300 mb-2" />
                      <p className="text-sm font-semibold text-slate-600">No leads found</p>
                      <p className="text-xs text-slate-400 mt-0.5">Try adjusting your filters or search.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map((l) => (
                  <tr
                    key={l._id}
                    onClick={() => setSelectedLead(l)}
                    className={`hover:bg-slate-50/70 cursor-pointer transition ${
                      !l.isRead ? "bg-orange-50/30" : ""
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        {!l.isRead && (
                          <span
                            className="h-2 w-2 rounded-full bg-orange-500 shrink-0"
                            title="Unread"
                          />
                        )}
                        <div>
                          <div className="font-bold text-slate-900">{l.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Phone size={11} className="text-slate-400" />
                            <span>{l.phone}</span>
                          </div>
                          {l.email && (
                            <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <Mail size={11} className="text-slate-400" />
                              <span className="truncate max-w-[180px]">{l.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                        {l.service || "General Inquiry"}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="inline-block rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 capitalize">
                        {l.source.replace("_", " ")}
                      </span>
                    </td>

                    <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={l.status === "Won" ? "Converted" : l.status === "Lost" ? "Cancelled" : l.status}
                        onChange={(e) => handleStatusChange(l._id, e.target.value)}
                        className={`h-8 rounded-lg border px-2 text-xs font-bold outline-none cursor-pointer transition ${
                          l.status === "New"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : l.status === "In progress"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : l.status === "Converted" || l.status === "Won"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {STATUSES.map((st) => (
                          <option key={st.value} value={st.value}>
                            {st.label}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3.5 text-xs text-slate-400 font-normal">
                      {new Date(l.createdAt).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDelete(l._id)}
                        title="Delete lead"
                        className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-2xs p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Lead Details</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-sm">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase">Client Name</span>
                <div className="text-base font-bold text-slate-900">{selectedLead.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Phone</span>
                  <div className="font-semibold text-slate-800">
                    <a href={`tel:${selectedLead.phone}`} className="hover:text-orange-600">
                      {selectedLead.phone}
                    </a>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Email</span>
                  <div className="font-semibold text-slate-800">
                    {selectedLead.email ? (
                      <a href={`mailto:${selectedLead.email}`} className="hover:text-orange-600">
                        {selectedLead.email}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase">Service Requested</span>
                <div className="font-semibold text-orange-600">{selectedLead.service || "General Inquiry"}</div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase">Lead Source</span>
                <div className="capitalize font-medium text-slate-700">
                  {selectedLead.source.replace("_", " ")}
                </div>
              </div>

              {selectedLead.message && (
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Client Message</span>
                  <div className="rounded-xl bg-slate-50 p-3 text-slate-700 text-xs font-medium border border-slate-100 mt-1 whitespace-pre-wrap">
                    {selectedLead.message}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-xs font-bold transition flex items-center gap-1.5"
                >
                  Contact on WhatsApp
                </a>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
