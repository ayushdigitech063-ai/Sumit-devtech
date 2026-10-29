"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { z } from "zod";
import { toast, Toaster } from "sonner";
import { loginRequest } from "@/lib/auth-api";
import { ApiError } from "@/lib/api";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const field =
  "h-12 w-full rounded-xl border border-white/20 bg-black pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/60 focus:border-accent focus:ring-accent/20 [color-scheme:dark] autofill:shadow-[inset_0_0_0px_1000px_#000] autofill:[-webkit-text-fill-color:#fff]";

export default function LoginForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ emailError: "", passwordError: "", formError: "" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError({ emailError: "", passwordError: "", formError: "" });

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      let emailErr = "";
      let passwordErr = "";
      for (const issue of validation.error.issues) {
        if (issue.path[0] === "email" && !emailErr) {
          emailErr = issue.message;
        } else if (issue.path[0] === "password" && !passwordErr) {
          passwordErr = issue.message;
        }
      }
      setError({ emailError: emailErr, passwordError: passwordErr, formError: "" });
      return;
    }

    setLoading(true);

    try {
      // Simulate loading interval before calling API
      await new Promise<void>((resolve) => {
        let elapsed = 0;
        const interval = setInterval(() => {
          elapsed += 100;
          if (elapsed >= 600) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });

      await loginRequest(validation.data.email, validation.data.password);
      toast.success("Login successful! Redirecting...");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      const errorMessage =
        err instanceof ApiError ? err.message : "Could not reach the server. Please try again.";
      setError({ emailError: "", passwordError: "", formError: errorMessage });
      toast.error(errorMessage);
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster position="top-right" richColors theme="dark" />
      <form onSubmit={onSubmit} className="space-y-5">
      <label className="block text-sm font-semibold">
        Email
        <div className="relative mt-2">
          <Mail size={18} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
          <input name="email" type="email" placeholder="admin@yourdomain.com" className={field} />
        </div>
        {error.emailError && <p role="alert" className="mt-1.5 text-xs font-semibold text-red-400">{error.emailError}</p>}
      </label>

      <label className="block text-sm font-semibold">
        Password
        <div className="relative mt-2">
          <Lock size={18} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
          <input
            name="password"
            type={show ? "text" : "password"}
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
        {error.passwordError && <p role="alert" className="mt-1.5 text-xs font-semibold text-red-400">{error.passwordError}</p>}
      </label>

    
      <button
        disabled={loading}
        className="w-full rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
    </>
  );
}