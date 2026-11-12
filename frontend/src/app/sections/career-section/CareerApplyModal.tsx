"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  Briefcase,
  MapPin,
  Clock,
  Send,
  Loader2,
  Building2,
  UserCheck,
  ReceiptText,
} from "lucide-react";
import { submitApplication } from "@/lib/applications-api";

export interface JobModalData {
  _id?: string;
  id?: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  experience?: string;
}

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobModalData | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXTS = [".pdf", ".doc", ".docx"];

export default function CareerApplyModal({ isOpen, onClose, job }: ApplyModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Candidate type: Fresher or Experienced
  const [candidateType, setCandidateType] = useState<"fresher" | "experienced">("fresher");

  // Files
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [payslipFile, setPayslipFile] = useState<File | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [coverNote, setCoverNote] = useState("");

  // Experienced Fields
  const [experienceYears, setExperienceYears] = useState("");
  const [previousCompany, setPreviousCompany] = useState("");
  const [currentDesignation, setCurrentDesignation] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("Immediate");

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const payslipInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !job) return null;

  // Strict Phone Handler - Max 10 digits only
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTS.includes(ext)) {
      setErrorMsg("Resume format invalid. Only .pdf, .doc, and .docx are accepted.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrorMsg("Resume size exceeds 5MB limit.");
      return;
    }
    setErrorMsg(null);
    setResumeFile(file);
  };

  const handlePayslipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (![".pdf", ".jpg", ".jpeg", ".png"].includes(ext)) {
      setErrorMsg("Payslip format invalid. Only PDF or image formats are accepted.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrorMsg("Payslip size exceeds 5MB limit.");
      return;
    }
    setErrorMsg(null);
    setPayslipFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation 1: Full Name
    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    // Validation 2: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    // Validation 3: Phone exactly 10 digits
    if (phone.length !== 10) {
      setErrorMsg("Mobile number must be exactly 10 digits.");
      return;
    }

    // Validation 4: Resume
    if (!resumeFile) {
      setErrorMsg("Please upload your resume file (.pdf, .doc, .docx).");
      return;
    }

    // Validation 5: Experienced candidate requirements
    if (candidateType === "experienced") {
      if (!previousCompany.trim()) {
        setErrorMsg("Please enter your previous/current company name.");
        return;
      }
      if (!experienceYears.trim()) {
        setErrorMsg("Please specify your total experience.");
        return;
      }
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("jobId", job._id || job.id || "");
      data.append("jobTitle", job.title);
      data.append("fullName", fullName.trim());
      data.append("email", email.trim().toLowerCase());
      data.append("phone", phone);
      data.append("candidateType", candidateType);
      data.append("location", location.trim());
      data.append("link", link.trim());
      data.append("coverNote", coverNote.trim());
      data.append("file", resumeFile);

      if (candidateType === "experienced") {
        data.append("experienceYears", experienceYears.trim());
        data.append("previousCompany", previousCompany.trim());
        data.append("currentDesignation", currentDesignation.trim());
        data.append("currentSalary", currentSalary.trim());
        data.append("expectedSalary", expectedSalary.trim());
        data.append("noticePeriod", noticePeriod);
        if (payslipFile) {
          data.append("payslip", payslipFile);
        }
      }

      await submitApplication(data);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMsg(null);
    setResumeFile(null);
    setPayslipFile(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setLink("");
    setCoverNote("");
    setPreviousCompany("");
    setExperienceYears("");
    setCurrentDesignation("");
    setCurrentSalary("");
    setExpectedSalary("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="relative bg-[#10131e] text-white p-6 sm:p-7 border-b border-white/10">
          <button
            type="button"
            onClick={handleReset}
            className="absolute top-5 right-5 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {job.department || "Open Role"}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
            Apply for {job.title}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/70">
            {job.location && (
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
                <MapPin size={13} className="text-accent" /> {job.location}
              </span>
            )}
            {job.type && (
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
                <Briefcase size={13} className="text-accent" /> {job.type}
              </span>
            )}
            {job.experience && (
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
                <Clock size={13} className="text-accent" /> {job.experience}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading">Application Received!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. We have received your application for <strong>{job.title}</strong>. Our HR recruitment team will review your profile and contact you soon.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-accent hover:bg-accent/90 text-white font-bold text-sm shadow-md transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2.5">
                  <AlertCircle size={16} className="shrink-0 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* CANDIDATE LEVEL SELECTION: Fresher vs Experienced */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Are you a Fresher or Experienced candidate? <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCandidateType("fresher")}
                    className={`flex items-center justify-center gap-2.5 p-3 rounded-2xl border text-sm font-bold transition-all ${
                      candidateType === "fresher"
                        ? "border-accent bg-accent/10 text-accent shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <UserCheck size={18} />
                    Fresher
                  </button>

                  <button
                    type="button"
                    onClick={() => setCandidateType("experienced")}
                    className={`flex items-center justify-center gap-2.5 p-3 rounded-2xl border text-sm font-bold transition-all ${
                      candidateType === "experienced"
                        ? "border-accent bg-accent/10 text-accent shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Building2 size={18} />
                    Experienced
                  </button>
                </div>
              </div>

              {/* Basic Details: Name, Email & 10-digit Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Number (10 Digits) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="9876543210"
                      className="w-full pl-12 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-900 font-medium"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {phone.length}/10 digits entered
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Current Location / City
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-900"
                  />
                </div>
              </div>

              {/* EXPERIENCED FIELDS (Conditional Rendering) */}
              {candidateType === "experienced" && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 pb-2 border-b border-amber-200/60">
                    <Building2 size={16} className="text-accent" />
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Work Experience & Previous Company Details
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Previous / Current Company <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={previousCompany}
                        onChange={(e) => setPreviousCompany(e.target.value)}
                        placeholder="e.g. Infosys, TCS, Tech Agency"
                        className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Current Designation / Role
                      </label>
                      <input
                        type="text"
                        value={currentDesignation}
                        onChange={(e) => setCurrentDesignation(e.target.value)}
                        placeholder="e.g. React Developer"
                        className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Total Experience <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        placeholder="e.g. 2.5 Years"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Current Salary (CTC)
                      </label>
                      <input
                        type="text"
                        value={currentSalary}
                        onChange={(e) => setCurrentSalary(e.target.value)}
                        placeholder="e.g. ₹3.6 LPA"
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Notice Period
                      </label>
                      <select
                        value={noticePeriod}
                        onChange={(e) => setNoticePeriod(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-900"
                      >
                        <option value="Immediate">Immediate</option>
                        <option value="15 Days">15 Days</option>
                        <option value="30 Days">30 Days</option>
                        <option value="60 Days">60 Days</option>
                      </select>
                    </div>
                  </div>

                  {/* Last Month Payslip Upload */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Upload Last Month Payslip (Optional / Verification)
                    </label>
                    {payslipFile ? (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-emerald-200">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <ReceiptText size={18} className="text-emerald-600 shrink-0" />
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {payslipFile.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setPayslipFile(null);
                            if (payslipInputRef.current) payslipInputRef.current.value = "";
                          }}
                          className="text-xs text-rose-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-2 p-3 bg-white border border-dashed border-slate-300 hover:border-accent rounded-xl cursor-pointer text-xs font-semibold text-slate-600 hover:text-accent transition-colors">
                        <Upload size={15} />
                        Upload Payslip (PDF / JPG / PNG up to 5MB)
                        <input
                          ref={payslipInputRef}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handlePayslipChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}

              {/* Portfolio / GitHub Link */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Portfolio / GitHub / LinkedIn (Optional)
                </label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://github.com/yourhandle or portfolio link"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-900"
                />
              </div>

              {/* Resume File Upload Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Upload Resume / CV <span className="text-rose-500">*</span>
                </label>
                
                {resumeFile ? (
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">{resumeFile.name}</p>
                        <p className="text-xs text-slate-500">
                          {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setResumeFile(null);
                        if (resumeInputRef.current) resumeInputRef.current.value = "";
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove file"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-accent/60 bg-slate-50/70 hover:bg-accent/5 rounded-2xl p-5 cursor-pointer transition-colors group">
                    <Upload size={24} className="text-slate-400 group-hover:text-accent mb-2 transition-colors" />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-accent transition-colors">
                      Click to upload your resume
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5">
                      PDF, DOC, DOCX up to 5MB
                    </span>
                    <input
                      ref={resumeInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Cover Note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Cover Note / Message (Optional)
                </label>
                <textarea
                  rows={2}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Share a brief note about yourself, key technologies and availability..."
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-900 resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/90 text-white px-7 py-2.5 text-sm font-bold shadow-md shadow-accent/25 hover:shadow-accent/40 transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
