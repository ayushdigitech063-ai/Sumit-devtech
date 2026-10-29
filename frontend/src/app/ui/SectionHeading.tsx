import { cn } from "@/lib/utils";

type Props = {
  label: string;
  title: React.ReactNode;
  text?: string;
  dark?: boolean;
  center?: boolean;
  className?: string;
};

export default function SectionHeading({ label, title, text, dark, center, className }: Props) {
  return (
    <div className={cn("mb-12 max-w-3xl", center && "mx-auto text-center", className)}>
      <span className={cn("mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-accent", center && "justify-center")}>
        <i className="h-0.5 w-8 bg-brand" /> {label}
      </span>
      <h2 className={cn("text-3xl font-bold md:text-5xl", dark ? "text-white" : "text-ink")}>{title}</h2>
      {text && <p className={cn("mt-4 text-lg", dark ? "text-white/65" : "text-muted")}>{text}</p>}
    </div>
  );
}