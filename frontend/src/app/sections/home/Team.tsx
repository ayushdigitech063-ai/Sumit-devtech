import Image from "next/image";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import { fetchTeamMembers } from "@/lib/team-api";
import Button from "@/app/ui/Button";

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

export default async function Team() {
  const dynamicTeam = await fetchTeamMembers(true);
  const teamList = dynamicTeam.length > 0 ? dynamicTeam : DEFAULT_TEAM_MEMBERS;
  const displayTeam = teamList.slice(0, 3);

  // Separate CEO / Founder from other team members
  const ceoMember =
    teamList.find(
      (m) =>
        m.role?.toLowerCase().includes("ceo") ||
        m.role?.toLowerCase().includes("founder")
    ) || teamList[0];

  const employeeMembers = teamList.filter((m) => m !== ceoMember);

  // Symmetrically duplicate employees for a seamless right-to-left marquee loop on mobile (translateX -50%)
  const employeeBase =
    employeeMembers.length <= 2
      ? [...employeeMembers, ...employeeMembers]
      : employeeMembers;
  const marqueeEmployees = [...employeeBase, ...employeeBase];

  return (
    <Section id="team" light>
      <SectionHeading
        center
        label="Our Team"
        title={
          <>
            Meet The Experts Behind{" "}
            <span className="text-brand">Our Success</span>
          </>
        }
        text="Our team of passionate developers, managers, and digital strategists work together to deliver innovative solutions that drive real results."
      />

      <div className="mx-auto max-w-5xl">
        {/* ========================================================
            MOBILE VIEW: CEO Card Static on Top + Employees Marquee Below
           ======================================================== */}
        <div className="block md:hidden">
          {/* Static CEO / Leadership Card */}
          {ceoMember && (
            <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-3xl bg-white shadow-sm border border-line">
              <div
                className="relative overflow-hidden bg-dark"
                style={{ aspectRatio: "1 / 1" }}
              >
                <Image
                  src={ceoMember.image || "/images/teams/owner-sumit-kumar-mishra.png"}
                  alt={`${ceoMember.name} - ${ceoMember.role}`}
                  fill
                  sizes="320px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent" />
                <span className="absolute top-3.5 right-3.5 rounded-full bg-orange-500 text-white px-3 py-1 text-[11px] font-bold shadow-md">
                  Leadership
                </span>
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-ink">{ceoMember.name}</h3>
                <p className="mb-2 text-xs font-semibold text-accent">
                  {ceoMember.role}
                </p>
                {ceoMember.bio && (
                  <p className="text-[13px] leading-relaxed text-muted line-clamp-3">
                    {ceoMember.bio}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Right-to-Left Auto-Scrolling Employees Marquee */}
          {employeeMembers.length > 0 && (
            <div className="mt-7 relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]">
              <div 
                className="flex w-max animate-marquee gap-4 py-2 hover:[animation-play-state:paused]"
                style={{ animationDuration: "20s" }}
              >
                {marqueeEmployees.map((m, i) => (
                  <div
                    key={`${m.name}-${i}`}
                    className="w-[250px] shrink-0 overflow-hidden rounded-3xl bg-white shadow-sm border border-line select-none"
                  >
                    <div
                      className="relative overflow-hidden bg-dark"
                      style={{ aspectRatio: "1 / 1" }}
                    >
                      <Image
                        src={m.image || "/images/teams/owner-sumit-kumar-mishra.png"}
                        alt={`${m.name} - ${m.role}`}
                        fill
                        sizes="250px"
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent" />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-base font-bold text-ink truncate">{m.name}</h3>
                      <p className="mb-1 text-xs font-semibold text-accent truncate">
                        {m.role}
                      </p>
                      {m.bio && (
                        <p className="text-xs leading-relaxed text-muted line-clamp-2">
                          {m.bio}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            DESKTOP VIEW: 3-Column Standard Grid
           ======================================================== */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {displayTeam.map((m, i) => (
            <Reveal key={m.name || i} delay={i * 0.12}>
              <div className="group mx-auto w-full overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/15">
                <div
                  className="relative overflow-hidden bg-dark"
                  style={{ aspectRatio: "1 / 1" }}
                >
                  <Image
                    src={m.image || "/images/teams/owner-sumit-kumar-mishra.png"}
                    alt={`${m.name} - ${m.role}`}
                    fill
                    sizes="(min-width:768px) 280px, 300px"
                    className="object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">{m.name}</h3>
                  <p className="mb-2 text-xs font-semibold text-accent md:text-sm">
                    {m.role}
                  </p>
                  <p className="mb-4 text-[13px] leading-relaxed text-muted line-clamp-3">
                    {m.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/our-team">View all team members &rarr;</Button>
        </div>
      </div>
    </Section>
  );
}
