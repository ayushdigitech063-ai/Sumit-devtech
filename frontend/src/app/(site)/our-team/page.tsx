import type { Metadata } from "next";
import { fetchTeamMembers } from "@/lib/team-api";
import {
  HeroSection,
  TeamGridSection,
} from "@/app/sections/our-team-section";

const DEFAULT_TEAM_MEMBERS = [
  {
    name: "Sumit Kumar Mishra",
    role: "CEO & Founder",
    image: "https://sumitdevtech.com/assets/images/team/sumit-mishra.webp",
    bio: "10+ years driving digital architectures, full-stack engineering, and client growth solutions.",
  },
  {
    name: "Abhishek Sharma",
    role: "Senior Full Stack Engineer",
    image: "https://sumitdevtech.com/assets/images/team/team-member-1.webp",
    bio: "Specialist in React, Next.js, and high-performance backend microservices.",
  },
  {
    name: "Pooja Verma",
    role: "Lead UI/UX Designer",
    image: "https://sumitdevtech.com/assets/images/team/team-member-2.webp",
    bio: "Crafting intuitive digital interfaces, user flows, and brand design systems.",
  },
];

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
  const members = dynamicTeam.length > 0 ? dynamicTeam : DEFAULT_TEAM_MEMBERS;

  return (
    <main>
      <HeroSection memberCount={members.length} />
      <TeamGridSection members={members as any} />
    </main>
  );
}
