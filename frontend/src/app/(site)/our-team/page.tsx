import type { Metadata } from "next";
import { team as fallbackTeam } from "@/data/team";
import { fetchTeamMembers } from "@/lib/team-api";
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

export default async function OurTeamPage() {
  const dynamicTeam = await fetchTeamMembers(true);
  const members = dynamicTeam.length > 0 ? dynamicTeam : fallbackTeam;

  return (
    <main>
      <HeroSection memberCount={members.length} />
      <TeamGridSection members={members as any} />
    </main>
  );
}
