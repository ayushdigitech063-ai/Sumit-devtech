import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  variant?: "primary" | "outline" | "light";
  className?: string;
  children: React.ReactNode;
};

export default function Button({ href, variant = "primary", className, children }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition duration-300 hover:-translate-y-1",
        variant === "primary" && "bg-brand text-white shadow-lg shadow-accent/30",
        variant === "outline" && "text-white ring-1 ring-white/40 hover:bg-white hover:text-dark",
        variant === "light" && "bg-white text-dark hover:bg-dark hover:text-white",
        className
      )}
    >
      {children}
    </Link>
  );
}