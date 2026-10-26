import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; reverse?: boolean; className?: string };

export default function Marquee({ children, reverse, className }: Props) {
  return (
    <div className={cn("group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]", className)}>
      <div className={cn("flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]", reverse && "[animation-direction:reverse]")}>
        {children}
        {children}
      </div>
    </div>
  );
}