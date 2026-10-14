import { FaWhatsapp } from "react-icons/fa6";
import { site } from "@/data/site";

export default function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-xl transition hover:scale-110"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-40" />
      <FaWhatsapp size={28} className="relative" />
    </a>
  );
}