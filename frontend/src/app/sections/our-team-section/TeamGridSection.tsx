"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/app/ui/Container";
import SectionHeading from "@/app/ui/SectionHeading";
import TeamMemberCard, { TeamMember } from "./TeamMemberCard";

export interface TeamGridSectionProps {
  members: TeamMember[];
}

export default function TeamGridSection({ members }: TeamGridSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="team-grid" className="relative bg-white py-16 md:py-24 border-t border-line">
      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <SectionHeading
            center
            label="Dedicated Talent"
            title={
              <>
                Meet The Experts Behind <span className="text-brand">Our Success</span>
              </>
            }
            text="Our cross-functional team blends design precision, modern code practices, and transparent communication to bring your digital vision to life."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
          >
            {members.map((member) => (
              <motion.div key={member.name} variants={itemVariants}>
                <TeamMemberCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

