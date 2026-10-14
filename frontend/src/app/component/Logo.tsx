import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex flex-col leading-none">
      <b className="font-heading text-2xl font-extrabold text-white">SUMIT</b>
      <small className="mt-1 self-start bg-accent-2 px-1 py-0.5 text-center text-[0.44rem] font-bold tracking-[0.42em] text-dark">
        DEVTECH
      </small>
    </Link>
  );
}