"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const field =
  "h-12 w-full rounded-xl border border-white/20 bg-white/10 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/60 focus:border-accent focus:ring-4 focus:ring-accent/20";

export default function LoginForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    // TODO (backend step): POST { email, password } to /api/auth/login.
    // If the response is not ok, call setError("Invalid email or password") and stop.
    await new Promise((r) => setTimeout(r, 600)); // placeholder so you can see the loading state
    setLoading(false);
    router.push("/admin");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block text-sm font-semibold">
        Email
        <div className="relative mt-2">
          <Mail size={18} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
          <input name="email" type="email" required autoComplete="email" placeholder="admin@yourdomain.com" className={field} />
        </div>
      </label>

      <label className="block text-sm font-semibold">
        Password
        <div className="relative mt-2">
          <Lock size={18} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
          <input
            name="password"
            type={show ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            className={`${field} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center text-white/70 hover:text-white"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </label>

      {error && <p role="alert" className="text-sm font-semibold text-red-300">{error}</p>}

      <button
        disabled={loading}
        className="w-full rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}