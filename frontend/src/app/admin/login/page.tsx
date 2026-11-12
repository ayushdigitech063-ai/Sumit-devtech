import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/app/component/adminComponent/LoginForm";

export const metadata: Metadata = { title: "Sign in | Sumit DevTech Admin" };

export default function LoginPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-dark px-4 py-10">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand opacity-25 blur-[100px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-brand opacity-15 blur-[110px]" />

      <div className="relative w-full max-w-md rounded-[28px] border border-white/15 bg-white/10 p-8 text-white backdrop-blur-xl sm:p-10 shadow-2xl">
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo-white-text.png"
              alt="Sumit DevTech Logo"
              width={260}
              height={60}
              className="h-11 w-auto object-contain transition-transform duration-300 hover:scale-105"
              priority
            />
          </Link>
        </div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight">Welcome back</h1>
        <p className="mb-8 mt-2 text-sm text-white/70">Sign in to manage your website.</p>
        <LoginForm />
      </div>
    </main>
  );
}
