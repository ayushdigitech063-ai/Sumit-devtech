"use client";

import React from "react";
import Image from "next/image";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa6";

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio: string;
  linkedin?: string;
  instagram?: string;
}

export interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const initials = member.name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const hasSocials = Boolean(member.linkedin || member.instagram);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/15">
      {/* Photo / Fallback Initials */}
      <div className="relative aspect-square w-full overflow-hidden bg-dark">
        {member.image ? (
          <Image
            src={member.image}
            alt={`${member.name} - ${member.role}`}
            fill
            sizes="(min-width: 1024px) 340px, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-accent to-accent-2 text-white">
            <span className="font-heading text-4xl font-extrabold tracking-wider">{initials}</span>
          </div>
        )}

        {/* Gradient shadow overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-dark/75 via-transparent to-transparent opacity-60 transition duration-300 group-hover:opacity-85"
        />

        {/* Social Links Overlay (Visible on hover, focus-within, and touch) */}
        {hasSocials && (
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-2.5 p-4 transition-all duration-300 translate-y-2 opacity-90 sm:translate-y-3 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s LinkedIn profile`}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-dark/85 text-white shadow-lg backdrop-blur-md transition duration-200 hover:bg-accent hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <FaLinkedinIn size={16} />
              </a>
            )}
            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s Instagram profile`}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-dark/85 text-white shadow-lg backdrop-blur-md transition duration-200 hover:bg-accent hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <FaInstagram size={16} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Member Details */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-xl font-bold tracking-tight text-ink">
          {member.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-accent">
          {member.role}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
          {member.bio}
        </p>
      </div>
    </article>
  );
}

