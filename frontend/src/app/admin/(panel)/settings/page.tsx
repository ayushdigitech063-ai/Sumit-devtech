"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Settings,
  User,
  Shield,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Server,
  Database,
  Globe,
  Lock,
  Mail,
  Fingerprint,
} from "lucide-react";

export default function SettingsAdminPage() {
  const [profile, setProfile] = useState<{ id: string; name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [isProfilePending, startProfileTransition] = useTransition();

  // Password Form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState<string | null>(null);
  const [pwdError, setPwdError] = useState<string | null>(null);
  const [isPwdPending, startPwdTransition] = useTransition();

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetch(`${API_BASE}/auth/me`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          setProfile(data.user);
          setName(data.user.name || "");
          setEmail(data.user.email || "");
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [API_BASE]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess(null);
    setProfileError(null);

    startProfileTransition(async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/profile`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, email }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to update profile");
        setProfileSuccess("Admin profile updated successfully!");
        setProfile(data.user);
      } catch (err: any) {
        setProfileError(err.message || "Something went wrong.");
      }
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdSuccess(null);
    setPwdError(null);

    if (newPassword.length < 8) {
      setPwdError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwdError("New password and confirm password do not match.");
      return;
    }

    startPwdTransition(async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/change-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ currentPassword, newPassword }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to change password");

        setPwdSuccess("Password changed successfully! Keep it safe.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (err: any) {
        setPwdError(err.message || "Failed to change password.");
      }
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-slate-700" />
          Settings & Preferences
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage your administrator profile, security credentials, and system environment info.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile & Security (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Admin Profile Form */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Administrator Profile</h2>
                <p className="text-xs text-slate-500">Update your account name and email address</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="mt-5 space-y-4">
              {profileSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{profileSuccess}</span>
                </div>
              )}

              {profileError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{profileError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Display Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Super Admin"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sumitdevtech@admin.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Fingerprint className="w-3.5 h-3.5" />
                  Role: <strong className="text-slate-700 uppercase">{profile?.role || "superadmin"}</strong>
                </span>
                <button
                  type="submit"
                  disabled={isProfilePending || loading}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-colors disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {isProfilePending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Security & Password</h2>
                <p className="text-xs text-slate-500">Ensure your administrative account stays secure</p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="mt-5 space-y-4">
              {pwdSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{pwdSuccess}</span>
                </div>
              )}

              {pwdError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{pwdError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Current Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    New Password *
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isPwdPending}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm transition-colors disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {isPwdPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: System & Environment Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-600" />
              Environment & Infrastructure
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <span className="text-slate-500">Platform Version</span>
                <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">v2.4.0</span>
              </div>

              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <span className="text-slate-500">Node Environment</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <span className="text-slate-500">Database Engine</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                  MongoDB Atlas
                </span>
              </div>

              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <span className="text-slate-500">Media CDN</span>
                <span className="font-semibold text-slate-800">Cloudinary Cloud</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Live Website</span>
                <a
                  href="https://websitedevelopmentcompany4u.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Visit Domain
                </a>
              </div>
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/40 rounded-2xl border border-blue-100 p-5">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
              Admin Security Tips
            </h4>
            <p className="text-xs text-blue-800/80 leading-relaxed">
              Always use a strong alphanumeric password with at least one symbol for administrative security. Session tokens expire every 7 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
