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

const STATUSES: ("New" | "In progress" | "Won" | "Lost")[] = [
  "New",
  "In progress",
  "Won",
  "Lost",
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
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteAdminLead(id);
      setLeads((prev) => prev.filter((l) => l._id !== id));
      if (selectedLead?._id === id) setSelectedLead(null);
    } catch (err) {
      console.error(err);
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
            <option value="Won">Won (Closed)</option>
            <option value="Lost">Lost</option>
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
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-400">
                    No leads found. When a client submits any form, it will appear right here!
                  </td>
                </tr>
              ) : (
                leads.map((l) => (
                  <tr
                    key={l._id}
                    className={`transition-colors hover:bg-slate-50/80 cursor-pointer ${
                      !l.isRead ? "bg-orange-50/40" : ""
                    }`}
                    onClick={() => setSelectedLead(l)}
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        {!l.isRead && (
                          <span className="h-2 w-2 rounded-full bg-orange-500 shrink-0" />
                        )}
                        <div>
                          <span className="block font-bold text-slate-900 text-sm">{l.name}</span>
                          <span className="text-xs text-slate-600 font-medium flex items-center gap-1 mt-0.5">
                            <Phone size={11} className="text-slate-400" /> {l.phone}
                          </span>
                          {l.email && (
                            <span className="text-xs text-slate-400 font-normal block">
                              {l.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-sm font-medium text-slate-800">
                      {l.service || "General Inquiry"}
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 capitalize border border-slate-200">
                        {l.source.replace("_", " ")}
                      </span>
                    </td>

                    <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={l.status}
                        onChange={(e) => handleStatusChange(l._id, e.target.value)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold border outline-none cursor-pointer ${
                          l.status === "New"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : l.status === "In progress"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : l.status === "Won"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                      >
                        {STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
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
