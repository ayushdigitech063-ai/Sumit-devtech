import { cn } from "@/lib/utils";

export default function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full `max-w-[1220px]` px-6", className)}>{children}</div>;
}