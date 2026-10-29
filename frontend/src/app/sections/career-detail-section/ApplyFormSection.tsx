"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Upload, X, CheckCircle, AlertCircle, FileText, ArrowRight } from "lucide-react";
import Container from "@/app/ui/Container";
import SectionHeading from "@/app/ui/SectionHeading";
import { submitApplication } from "@/lib/applications-api";
import type { Opening } from "@/data/career-data";

export interface ApplyFormSectionProps {
  job: Opening;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  experience?: string;
  location?: string;
  link?: string;
  coverNote?: string;
  resume?: string;
  consent?: string;
  general?: string;
}

const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_RESUME_EXTS = [".pdf", ".doc", ".docx"];

export default function ApplyFormSection({ job }: ApplyFormSectionProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [coverNote, setCoverNote] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const experienceRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const coverNoteRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const validateResume = (file: File | null): string | undefined => {
    if (!file) return "Please upload your resume (.pdf, .doc, .docx).";
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_RESUME_EXTS.includes(ext)) {
      return "Only .pdf, .doc, and .docx formats are accepted.";
    }
    if (file.size > MAX_RESUME_SIZE) {
      return "Resume file size must be less than 5 MB.";
    }
    return undefined;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const resumeErr = validateResume(file);
      setErrors((prev) => ({ ...prev, resume: resumeErr }));
    } else {
      setErrors((prev) => ({ ...prev, resume: "Please upload your resume." }));
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setErrors((prev) => ({ ...prev, resume: "Please upload your resume." }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    // Honeypot check
    const honeypot = formData.get("website");
    if (honeypot) {
      // Silently stop submission
      return;
    }

    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const experience = String(formData.get("experience") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const link = String(formData.get("link") || "").trim();
    const consent = formData.get("consent");

    const newErrors: FormErrors = {};

    if (!fullName) newErrors.fullName = "Full name is required.";
    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+()\- ]{7,20}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!experience) newErrors.experience = "Total experience is required.";
    if (!location) newErrors.location = "Current location is required.";

    if (link) {
      try {
        const parsedUrl = new URL(link);
        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          newErrors.link = "Please provide a valid web URL (http:// or https://).";
        }
      } catch {
        newErrors.link = "Please provide a valid URL format.";
      }
    }

    if (coverNote.length > 1000) {
      newErrors.coverNote = "Cover note cannot exceed 1000 characters.";
    }

    const resumeError = validateResume(selectedFile);
    if (resumeError) newErrors.resume = resumeError;

    if (!consent) {
      newErrors.consent = "You must agree to the storage of your details to apply.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // Focus first invalid field
      if (newErrors.fullName) fullNameRef.current?.focus();
      else if (newErrors.email) emailRef.current?.focus();
      else if (newErrors.phone) phoneRef.current?.focus();
      else if (newErrors.experience) experienceRef.current?.focus();
      else if (newErrors.location) locationRef.current?.focus();
      else if (newErrors.link) linkRef.current?.focus();
      else if (newErrors.coverNote) coverNoteRef.current?.focus();
      else if (newErrors.resume) fileInputRef.current?.focus();
      else if (newErrors.consent) consentRef.current?.focus();

      return;
    }

    // Submit via FormData
    setSubmitting(true);

    try {
      // Append resume file
      if (selectedFile) {
        formData.set("resume", selectedFile);
      }
      formData.set("jobSlug", job.slug);
      formData.set("position", job.title);
      formData.set("consent", "true");

      await submitApplication(formData);
      setSubmitted(true);
    } catch (err) {
      setErrors({
        general:
          err instanceof Error
            ? err.message
            : "Could not submit your application. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (hasError?: boolean) =>
    `h-12 w-full rounded-xl border ${
      hasError ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : "border-line focus:border-accent focus:ring-accent/15"
    } bg-white px-4 text-sm text-ink outline-none transition placeholder:text-muted focus:ring-4`;

  return (
    <section id="apply" className="relative scroll-mt-20 bg-light/70 py-16 md:py-24 border-t border-line">
      <Container>
        <div className="mx-auto w-full max-w-[850px]">
          <SectionHeading
            center
            label="Application Form"
            title={
              <>
                Apply for <span className="text-brand">{job.title}</span>
              </>
            }
            text="Submit your details and resume. We respect your privacy and will only use your data to evaluate your candidacy."
          />

          {submitted ? (
            <div className="rounded-3xl border border-emerald-500/20 bg-white p-8 sm:p-12 text-center shadow-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 mb-6">
                <CheckCircle size={36} />
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-ink">
                Application Received!
              </h3>
              <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted">
                Thanks, we have received your application for the <strong>{job.title}</strong> role. We will review your profile and contact you if shortlisted.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/career"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition duration-200 hover:-translate-y-0.5"
                >
                  <span>Explore Other Openings</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-line bg-white p-6 sm:p-10 shadow-xl space-y-6"
            >
              {/* General error message */}
              {errors.general && (
                <div role="alert" className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-50/80 p-4 text-sm font-semibold text-red-600">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{errors.general}</span>
                </div>
              )}

              {/* Honeypot field (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Hidden job fields */}
              <input type="hidden" name="jobSlug" value={job.slug} />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Position (Read-only) */}
                <div className="sm:col-span-2">
                  <label htmlFor="position" className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                    Position Applied For
                  </label>
                  <input
                    id="position"
                    name="position"
                    type="text"
                    readOnly
                    value={job.title}
                    className="h-12 w-full rounded-xl border border-line bg-light/70 px-4 text-sm font-semibold text-ink outline-none cursor-not-allowed"
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    ref={fullNameRef}
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    placeholder="e.g. Rahul Sharma"
                    className={inputClass(Boolean(errors.fullName))}
                  />
                  {errors.fullName && (
                    <p id="fullName-error" role="alert" className="mt-1.5 text-xs font-semibold text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    ref={emailRef}
                    id="email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="rahul@example.com"
                    className={inputClass(Boolean(errors.email))}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1.5 text-xs font-semibold text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                    Phone Number <span className="text-accent">*</span>
                  </label>
                  <input
                    ref={phoneRef}
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    placeholder="+91 98765 43210"
                    className={inputClass(Boolean(errors.phone))}
                  />
                  {errors.phone && (
                    <p id="phone-error" role="alert" className="mt-1.5 text-xs font-semibold text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Total Experience */}
                <div>
                  <label htmlFor="experience" className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                    Total Experience <span className="text-accent">*</span>
                  </label>
                  <input
                    ref={experienceRef}
                    id="experience"
                    name="experience"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.experience)}
                    aria-describedby={errors.experience ? "experience-error" : undefined}
                    placeholder="e.g. 2 years or Fresher"
                    className={inputClass(Boolean(errors.experience))}
                  />
                  {errors.experience && (
                    <p id="experience-error" role="alert" className="mt-1.5 text-xs font-semibold text-red-500">
                      {errors.experience}
                    </p>
                  )}
                </div>

                {/* Current Location */}
                <div>
                  <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                    Current Location <span className="text-accent">*</span>
                  </label>
                  <input
                    ref={locationRef}
                    id="location"
                    name="location"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={errors.location ? "location-error" : undefined}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className={inputClass(Boolean(errors.location))}
                  />
                  {errors.location && (
                    <p id="location-error" role="alert" className="mt-1.5 text-xs font-semibold text-red-500">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Current Company (Optional) */}
                <div>
                  <label htmlFor="currentCompany" className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                    Current Company <span className="text-muted text-[10px] lowercase">(optional)</span>
                  </label>
                  <input
                    id="currentCompany"
                    name="currentCompany"
                    type="text"
                    placeholder="e.g. Tech Corp"
                    className={inputClass()}
                  />
                </div>

                {/* Notice Period (Optional) */}
                <div>
                  <label htmlFor="noticePeriod" className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                    Notice Period <span className="text-muted text-[10px] lowercase">(optional)</span>
                  </label>
                  <input
                    id="noticePeriod"
                    name="noticePeriod"
                    type="text"
                    placeholder="e.g. Immediate or 30 days"
                    className={inputClass()}
                  />
                </div>

                {/* Portfolio / GitHub / LinkedIn */}
                <div>
                  <label htmlFor="link" className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                    Portfolio / GitHub / LinkedIn <span className="text-muted text-[10px] lowercase">(optional)</span>
                  </label>
                  <input
                    ref={linkRef}
                    id="link"
                    name="link"
                    type="url"
                    aria-invalid={Boolean(errors.link)}
                    aria-describedby={errors.link ? "link-error" : undefined}
                    placeholder="https://github.com/username"
                    className={inputClass(Boolean(errors.link))}
                  />
                  {errors.link && (
                    <p id="link-error" role="alert" className="mt-1.5 text-xs font-semibold text-red-500">
                      {errors.link}
                    </p>
                  )}
                </div>
              </div>

              {/* Cover Note (Optional with counter) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="coverNote" className="block text-xs font-bold uppercase tracking-wider text-ink">
                    Cover Note <span className="text-muted text-[10px] lowercase">(optional)</span>
                  </label>
                  <span className="text-xs font-medium text-muted">
                    {coverNote.length} / 1000
                  </span>
                </div>
                <textarea
                  ref={coverNoteRef}
                  id="coverNote"
                  name="coverNote"
                  rows={4}
                  maxLength={1000}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Tell us about your background, relevant projects, and why you would like to join Sumit DevTech..."
                  className={`w-full rounded-xl border ${
                    errors.coverNote ? "border-red-400" : "border-line"
                  } bg-white p-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-accent focus:ring-4 focus:ring-accent/15`}
                />
                {errors.coverNote && (
                  <p role="alert" className="mt-1 text-xs font-semibold text-red-500">
                    {errors.coverNote}
                  </p>
                )}
              </div>

              {/* Resume File Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                  Resume / CV <span className="text-accent">*</span>
                  <span className="ml-2 text-[11px] font-normal text-muted">
                    (PDF, DOC, DOCX up to 5 MB)
                  </span>
                </label>

                <div
                  className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed ${
                    errors.resume ? "border-red-400 bg-red-50/20" : "border-line bg-light/40 hover:bg-light/70"
                  } p-6 transition`}
                >
                  <input
                    ref={fileInputRef}
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Upload your resume"
                  />

                  {selectedFile ? (
                    <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-3 shadow-sm z-10">
                      <FileText size={20} className="text-accent shrink-0" />
                      <div className="min-w-0 text-left">
                        <p className="text-xs font-bold text-ink truncate max-w-xs">
                          {selectedFile.name}
                        </p>
                        <p className="text-[10px] text-muted">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        aria-label="Remove selected file"
                        className="p-1 rounded-full text-muted hover:text-red-500 hover:bg-light transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center pointer-events-none">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent mb-2">
                        <Upload size={18} />
                      </div>
                      <p className="text-xs font-semibold text-ink">
                        Click to upload or drag & drop resume
                      </p>
                      <p className="text-[11px] text-muted mt-0.5">
                        .pdf, .doc, .docx (Max 5 MB)
                      </p>
                    </div>
                  )}
                </div>
                {errors.resume && (
                  <p role="alert" className="mt-1.5 text-xs font-semibold text-red-500">
                    {errors.resume}
                  </p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    ref={consentRef}
                    type="checkbox"
                    name="consent"
                    aria-invalid={Boolean(errors.consent)}
                    className="mt-1 h-4 w-4 rounded border-line text-accent accent-accent focus:ring-accent"
                  />
                  <span className="text-xs text-muted leading-relaxed">
                    I agree to my details being stored for hiring and recruitment purposes by Sumit DevTech.
                  </span>
                </label>
                {errors.consent && (
                  <p role="alert" className="mt-1 text-xs font-semibold text-red-500">
                    {errors.consent}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 font-semibold text-white shadow-xl shadow-accent/25 transition duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting Application..." : "Submit Application"}
                  {!submitting && <ArrowRight size={16} />}
                </button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

