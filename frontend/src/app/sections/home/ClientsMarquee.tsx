import Image from "next/image";
import Marquee from "../../ui/Marquee";
import Reveal from "../../animation/Reveal";
import { clients } from "@/data/clients";

function Logo({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="grid h-20 w-48 shrink-0 place-items-center rounded-2xl border border-line bg-white p-4 opacity-100 transition duration-300 hover:opacity-100">
      <Image src={logo} alt={name} width={140} height={50} unoptimized className="max-h-12 w-auto object-contain" />
    </div>
  );
} 

export default function ClientsMarquee() {
  const half = Math.ceil(clients.length / 2);
  return (
    <section className="overflow-hidden py-20 md:py-24">
      <Reveal>
        <p className="mb-10 px-6 text-center text-sm font-semibold uppercase tracking-[0.16em] text-muted">
          Trusted by 500+ businesses across the world
        </p>
      </Reveal>
      <div className="space-y-4">
        <Marquee>
          {clients.slice(0, half).map((c) => <Logo key={c.name} {...c} />)}
        </Marquee>
        <Marquee reverse>
          {clients.slice(half).map((c) => <Logo key={c.name} {...c} />)}
        </Marquee>
      </div>
    </section>
  );
}