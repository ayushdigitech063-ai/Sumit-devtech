"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  RefreshCw,
  ExternalLink,
  Download,
  FileText,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react";
import {
  fetchJobOpenings,
  createAdminJobOpening,
  updateAdminJobOpening,
  deleteAdminJobOpening,
  fetchAdminApplications,
  updateAdminApplicationStatus,
  deleteAdminApplication,
  type JobOpeningItem,
  type ApplicationItem,
} from "@/lib/careers-api";

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<"applications" | "openings">("applications");

  // Openings state
  const [openings, setOpenings] = useState<JobOpeningItem[]>([]);
  const [loadingOpenings, setLoadingOpenings] = useState(true);

  // Applications state
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [appSearch, setAppSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

  // Job Opening Modal state
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [savingJob, setSavingJob] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: "",
    department: "Engineering",
    location: "Jaipur, India / Remote",
    type: "Full-time",
    experience: "2-4 Years",
    summary: "",
    responsibilities: "Build high-speed modern responsive web applications\nCollaborate with UI/UX designers and clients\nEnsure code quality and automated testing",
    requirements: "2+ years of hands-on experience\nStrong understanding of modern web frameworks\nGood problem solving and communication skills",
    isOpen: true,
  });

  const loadOpenings = async () => {
    setLoadingOpenings(true);
    try {
      const res = await fetchJobOpenings();
      if (res.success && res.data) setOpenings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOpenings(false);
    }
  };

  const loadApplications = async () => {
    setLoadingApps(true);
    try {
      const res = await fetchAdminApplications({ status: statusFilter, search: appSearch });
      if (res.success && res.data) setApplications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingApps(false);
    }
  };

  useEffect(() => {
    loadOpenings();
    loadApplications();
  }, []);

  useEffect(() => {
    loadApplications();
  }, [statusFilter]);

  const openAddJobModal = () => {
    setEditingJobId(null);
    setJobForm({
      title: "",
      department: "Engineering",
      location: "Jaipur, India / Remote",
      type: "Full-time",
      experience: "2-4 Years",
      summary: "",
      responsibilities: "Build high-speed modern responsive web applications\nCollaborate with UI/UX designers and clients\nEnsure code quality and automated testing",
      requirements: "2+ years of hands-on experience\nStrong understanding of modern web frameworks\nGood problem solving and communication skills",
      isOpen: true,
    });
    setIsJobModalOpen(true);
  };

  const openEditJobModal = (j: JobOpeningItem) => {
    setEditingJobId(j._id);
    setJobForm({
      title: j.title,
      department: j.department,
      location: j.location,
      type: j.type,
      experience: j.experience,
      summary: j.summary,
      responsibilities: Array.isArray(j.responsibilities) ? j.responsibilities.join("\n") : "",
      requirements: Array.isArray(j.requirements) ? j.requirements.join("\n") : "",
      isOpen: j.isOpen,
    });
    setIsJobModalOpen(true);
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.summary) return;

    setSavingJob(true);
    try {
      const payload = {
        ...jobForm,
        responsibilities: jobForm.responsibilities.split("\n").map((r) => r.trim()).filter(Boolean),
        requirements: jobForm.requirements.split("\n").map((r) => r.trim()).filter(Boolean),
      };

      if (editingJobId) {
        await updateAdminJobOpening(editingJobId, payload);
      } else {
        await createAdminJobOpening(payload);
      }
      setIsJobModalOpen(false);
      loadOpenings();
    } catch (err) {
      console.error(err);
      alert("Failed to save job opening.");
    } finally {
      setSavingJob(false);
    }
  };

  const handleDeleteJob = async (id: string, title: string) => {
    if (!window.confirm(`Delete job opening "${title}"?`)) return;
    try {
      await deleteAdminJobOpening(id);
      setOpenings((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAppStatus = async (id: string, status: string) => {
    try {
      await updateAdminApplicationStatus(id, status);
      setApplications((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: status as any, isRead: true } : a))
      );
      if (selectedApp?._id === id) {
        setSelectedApp((prev) => (prev ? { ...prev, status: status as any, isRead: true } : null));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteApp = async (id: string) => {
    if (!window.confirm("Delete this candidate application?")) return;
    try {
      await deleteAdminApplication(id);
      setApplications((prev) => prev.filter((a) => a._id !== id));
      if (selectedApp?._id === id) setSelectedApp(null);
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
            <h1 className="text-2xl font-bold text-black">Careers & Recruitment</h1>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">
              {applications.length} Candidates
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Post job vacancies, review incoming candidate resumes, and manage hiring pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              loadOpenings();
              loadApplications();
            }}
            title="Refresh"
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition shadow-2xs cursor-pointer"
          >
            <RefreshCw size={16} />
          </button>

          <button
            onClick={openAddJobModal}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition hover:shadow-orange-500/40 cursor-pointer"
          >
            <Plus size={16} />
            <span>Post New Job Vacancy</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("applications")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition cursor-pointer ${
            activeTab === "applications"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Users size={16} />
          <span>Received Applications & Resumes ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("openings")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition cursor-pointer ${
            activeTab === "openings"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Briefcase size={16} />
          <span>Active Job Vacancies ({openings.length})</span>
        </button>
      </div>

      {/* TAB 1: APPLICATIONS & RESUMES */}
      {activeTab === "applications" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search candidates by name, phone, email, role..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loadApplications()}
                className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-500 focus:bg-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="all">All Application Statuses</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Candidates Table */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500">
                    <th className="px-4 py-3">CANDIDATE</th>
                    <th className="px-4 py-3">APPLIED ROLE</th>
                    <th className="px-4 py-3">EXPERIENCE</th>
                    <th className="px-4 py-3">RESUME (CV)</th>
                    <th className="px-4 py-3">STATUS</th>
                    <th className="px-4 py-3">DATE</th>
                    <th className="px-4 py-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loadingApps ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-400">
                        Loading applicant resumes...
                      </td>
                    </tr>
                  ) : applications.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-400">
                        No applications received yet. When candidates apply on `/career`, their resumes will be displayed here!
                      </td>
                    </tr>
                  ) : (
                    applications.map((a) => (
                      <tr
                        key={a._id}
                        className={`transition hover:bg-slate-50/80 cursor-pointer ${
                          !a.isRead ? "bg-orange-50/30" : ""
                        }`}
                        onClick={() => setSelectedApp(a)}
                      >
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            {!a.isRead && (
                              <span className="h-2 w-2 rounded-full bg-orange-500 shrink-0" />
                            )}
                            <div>
                              <span className="block font-bold text-slate-900 text-sm">
                                {a.fullName}
                              </span>
                              <span className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                                <Phone size={11} className="text-slate-400" /> {a.phone}
                              </span>
                              <span className="text-xs text-slate-400 block">{a.email}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3.5 text-sm font-semibold text-slate-800">
                          {a.jobTitle}
                        </td>

                        <td className="px-4 py-3.5 text-xs text-slate-600 font-medium">
                          {a.experience || "Fresh / Not specified"}
                        </td>

                        {/* Resume Download / View Button */}
                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={a.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 px-3 py-1.5 text-xs font-bold border border-orange-200 transition"
                          >
                            <FileText size={13} className="text-orange-600" />
                            <span>View Resume</span>
                            <ExternalLink size={10} />
                          </a>
                        </td>

                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={a.status}
                            onChange={(e) => handleAppStatus(a._id, e.target.value)}
                            className={`rounded-lg px-2.5 py-1 text-xs font-bold border outline-none cursor-pointer ${
                              a.status === "Shortlisted"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : a.status === "Hired"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : a.status === "Rejected"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}
                          >
                            <option value="Under Review">Under Review</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Hired">Hired</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>

                        <td className="px-4 py-3.5 text-xs text-slate-400">
                          {new Date(a.createdAt).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                          })}
                        </td>

                        <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleDeleteApp(a._id)}
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
        </div>
      )}

      {/* TAB 2: ACTIVE JOB VACANCIES */}
      {activeTab === "openings" && (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          {loadingOpenings ? (
            <div className="col-span-2 py-16 text-center text-sm text-slate-400 bg-white rounded-2xl border border-slate-200">
              Loading openings...
            </div>
          ) : openings.length === 0 ? (
            <div className="col-span-2 py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
              No vacancies created yet.
            </div>
          ) : (
            openings.map((job) => (
              <div
                key={job._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                      {job.department}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        job.isOpen
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {job.isOpen ? "Hiring Active" : "Closed"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-1">{job.title}</h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-slate-400" /> {job.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={12} className="text-slate-400" /> {job.type}
                    </span>
                    <span>•</span>
                    <span>{job.experience}</span>
                  </div>

                  <p className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {job.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditJobModal(job)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-orange-600 transition px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
                    >
                      <Edit2 size={13} />
                      <span>Edit Vacancy</span>
                    </button>
                    <Link
                      href={`/career/${job.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition px-2 py-1.5"
                    >
                      <span>View Live</span>
                      <ExternalLink size={11} />
                    </Link>
                  </div>

                  <button
                    onClick={() => handleDeleteJob(job._id, job.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-50"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Candidate Application Detail Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-2xs p-4"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Candidate Details</h3>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-sm">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase">Candidate Name</span>
                <div className="text-base font-bold text-slate-900">{selectedApp.fullName}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Phone</span>
                  <div className="font-semibold text-slate-800">
                    <a href={`tel:${selectedApp.phone}`} className="hover:text-orange-600">
                      {selectedApp.phone}
                    </a>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Email</span>
                  <div className="font-semibold text-slate-800">
                    <a href={`mailto:${selectedApp.email}`} className="hover:text-orange-600">
                      {selectedApp.email}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase">Applied Role</span>
                <div className="font-bold text-orange-600">{selectedApp.jobTitle}</div>
              </div>

              {/* Candidate Type Badge & Details */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Candidate Type:</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    selectedApp.candidateType === "experienced"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {selectedApp.candidateType === "experienced" ? "Experienced" : "Fresher"}
                  </span>
                </div>

                {selectedApp.candidateType === "experienced" && (
                  <div className="pt-2 border-t border-slate-200/60 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block">Previous Company:</span>
                      <strong className="text-slate-800">{selectedApp.previousCompany || "N/A"}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Experience:</span>
                      <strong className="text-slate-800">{selectedApp.experienceYears || selectedApp.experience || "N/A"}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Designation:</span>
                      <strong className="text-slate-800">{selectedApp.currentDesignation || "N/A"}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Notice Period:</span>
                      <strong className="text-slate-800">{selectedApp.noticePeriod || "Immediate"}</strong>
                    </div>
                    {selectedApp.currentSalary && (
                      <div>
                        <span className="text-slate-400 block">Current Salary:</span>
                        <strong className="text-slate-800">{selectedApp.currentSalary}</strong>
                      </div>
                    )}
                    {selectedApp.payslipUrl && (
                      <div className="col-span-2 pt-1">
                        <a
                          href={selectedApp.payslipUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200"
                        >
                          <Download size={13} />
                          <span>View Uploaded Payslip</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {selectedApp.coverNote && (
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Cover Note</span>
                  <div className="rounded-xl bg-slate-50 p-3 text-slate-700 text-xs font-medium border border-slate-100 mt-1 whitespace-pre-wrap">
                    {selectedApp.coverNote}
                  </div>
                </div>
              )}

              {/* Resume Download Action */}
              <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="text-orange-600" size={20} />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">{selectedApp.resumeFileName || "Resume.pdf"}</span>
                    <span className="text-[10px] text-slate-400">Uploaded by candidate</span>
                  </div>
                </div>
                <a
                  href={selectedApp.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 text-xs font-bold transition flex items-center gap-1 shadow-sm"
                >
                  <Download size={13} />
                  <span>Open CV</span>
                </a>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`https://wa.me/${selectedApp.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-xs font-bold transition"
                >
                  Message on WhatsApp
                </a>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {isJobModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 overflow-y-auto"
          onClick={() => setIsJobModalOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 my-8 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingJobId ? "Edit Job Vacancy" : "Post New Job Vacancy"}
              </h3>
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleJobSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Job Title *
                </label>
                <input
                  required
                  placeholder="e.g. Senior Full-Stack Engineer / UI Designer"
                  value={jobForm.title}
                  onChange={(e) => setJobForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Department
                  </label>
                  <input
                    placeholder="Engineering / Design / Marketing"
                    value={jobForm.department}
                    onChange={(e) => setJobForm((prev) => ({ ...prev, department: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Job Type
                  </label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-800 outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Location
                  </label>
                  <input
                    placeholder="Jaipur, India / Remote"
                    value={jobForm.location}
                    onChange={(e) => setJobForm((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Experience Required
                  </label>
                  <input
                    placeholder="e.g. 2+ Years / Freshers"
                    value={jobForm.experience}
                    onChange={(e) => setJobForm((prev) => ({ ...prev, experience: e.target.value }))}
                    className="w-full h-10 rounded-xl border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Job Summary & Role Overview *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the main purpose and expectations of this role..."
                  value={jobForm.summary}
                  onChange={(e) => setJobForm((prev) => ({ ...prev, summary: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Key Responsibilities (One per line)
                </label>
                <textarea
                  rows={4}
                  value={jobForm.responsibilities}
                  onChange={(e) => setJobForm((prev) => ({ ...prev, responsibilities: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Requirements & Skills (One per line)
                </label>
                <textarea
                  rows={4}
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm((prev) => ({ ...prev, requirements: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-900 outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="jobOpenCheck"
                  checked={jobForm.isOpen}
                  onChange={(e) => setJobForm((prev) => ({ ...prev, isOpen: e.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                />
                <label htmlFor="jobOpenCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Actively Hiring (Visible on career page)
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingJob}
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition cursor-pointer disabled:opacity-70"
                >
                  {savingJob ? "Saving..." : editingJobId ? "Save Changes" : "Post Vacancy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
