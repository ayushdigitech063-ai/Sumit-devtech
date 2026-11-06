import Link from "next/link";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center group ${className || ""}`}>
      {/* Direct Transparent High-Res Logo (White Box Removed) */}
      <Image
        src="/images/logo-white-text.png"
        alt="Website Development Company 4u"
        width={340}
        height={75}
        priority
        className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
}
