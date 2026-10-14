import Container from "./Container";
import { cn } from "@/lib/utils";

type Props = { id?: string; dark?: boolean; light?: boolean; className?: string; children: React.ReactNode };

export default function Section({ id, dark, light, className, children }: Props) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-24", dark && "bg-dark text-white", light && "bg-light", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}