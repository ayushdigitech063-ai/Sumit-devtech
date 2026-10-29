import type { Metadata } from "next";
import { team } from "@/data/team";
import {
  HeroSection,
  TeamGridSection,
} from "@/app/sections/our-team-section";

export const metadata: Metadata = {
  title: "Our Team | Sumit DevTech",
  description:
    "Meet the passionate developers, project managers, and leadership behind Sumit DevTech delivering cutting-edge web applications and digital solutions.",
  openGraph: {
    title: "Our Team | Sumit DevTech",
    description:
      "Meet the passionate developers, project managers, and leadership behind Sumit DevTech delivering cutting-edge web applications and digital solutions.",
    url: "https://sumitdevtech.com/our-team",
    type: "website",
  },
  alternates: {
    canonical: "/our-team",
  },
};

export default function OurTeamPage() {
  return (
    <main>
      <HeroSection memberCount={team.length} />
      <TeamGridSection members={team} />
    </main>
  );
}

