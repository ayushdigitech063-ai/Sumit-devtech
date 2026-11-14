import Image from "next/image";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import { team as fallbackTeam } from "@/data/team";
import { fetchTeamMembers } from "@/lib/team-api";
import Button from "@/app/ui/Button";

export default async function Team() {
  const dynamicTeam = await fetchTeamMembers(true);
  const teamList = dynamicTeam.length > 0 ? dynamicTeam : fallbackTeam;
  const displayTeam = teamList.slice(0, 3);

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
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {displayTeam.map((m, i) => (
            <Reveal key={m.name || i} delay={i * 0.12}>
              <div className="group mx-auto w-full `max-w-[300px]` overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/15 md:max-w-none">
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
                  <div className="absolute inset-0 `bg-gradient-to-t` from-dark/60 via-transparent" />
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
