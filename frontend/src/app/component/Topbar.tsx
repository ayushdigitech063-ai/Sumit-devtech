import { Phone, Mail } from "lucide-react";
import Container from "../ui/Container";
import { site } from "@/data/site";

export default function Topbar() {
  return (
    <div className="bg-black py-2 text-xs text-white/70">
      <Container className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-4">
          {site.phones.map((p) => (
            <a key={p} href={`tel:${p.replace(/-/g, "")}`} className="flex items-center gap-1.5 hover:text-white">
              <Phone size={13} className="text-accent" /> <b className="font-semibold text-white">IND</b> {p}
            </a>
          ))}
        </div>
        <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-white">
          <Mail size={13} className="text-accent" /> {site.email} · {site.parent}
        </a>
      </Container>
    </div>
  );
}