"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Globe } from "lucide-react";

export interface ProjectData {
  title: string;
  category: string;
  url: string;
  image?: string;
}

export interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/15">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit live website: ${project.title} (${project.category})`}
        className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-3xl"
      >
        {/* Project Thumbnail Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-dark">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top transition duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-accent to-accent-2 text-white">
              <Globe size={40} />
            </div>
          )}

          {/* Category Pill on top-left of image */}
          <span className="absolute left-3 top-3 rounded-full bg-dark/85 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-md border border-white/10 shadow-sm">
            {project.category}
          </span>

          {/* Subtle gradient vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-dark/60 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-70"
          />
        </div>

        {/* Card Body */}
        <div className="flex flex-1 items-center justify-between p-5 sm:p-6">
          <div className="min-w-0 pr-3">
            <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-ink transition-colors duration-200 group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-muted truncate">
              <Globe size={13} className="shrink-0 text-accent" />
              <span>{project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
            </p>
          </div>

          {/* Action Arrow Icon Button */}
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-light/70 text-ink shadow-sm transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:border-transparent group-hover:rotate-45">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </a>
    </article>
  );
}
