"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DesignGallery from "@/components/DesignGallery";
import { DesignProject } from "@/lib/content";

type DesignPortfolioGridProps = {
  projects: DesignProject[];
};

export default function DesignPortfolioGrid({ projects }: DesignPortfolioGridProps) {
  const [activeProject, setActiveProject] = useState<DesignProject | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    if (!activeProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // Prevent background scroll

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeProject]);

  return (
    <div>
      {/* Grid of design projects */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setActiveProject(project)}
            className="break-inside-avoid block bg-container-warm p-5 rounded group hover:-translate-y-1 transition-transform duration-300 border border-outline-variant/30 cursor-pointer mb-8"
          >
            <div className="mb-4 overflow-hidden rounded bg-paper-foundation p-3">
              <Image
                alt={project.title}
                height={320}
                src={project.coverImageUrl}
                width={480}
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-doodle">
                {project.role || "Design Case Study"}
              </span>
              <h2 className="font-display text-2xl text-ink-sepia group-hover:text-accent-doodle transition-colors duration-300">
                {project.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-sepia/95 backdrop-blur-sm p-4 md:p-8 transition-all duration-300"
          onClick={() => setActiveProject(null)}
        >
          {/* Main Modal Container */}
          <div
            className="relative w-full max-w-6xl bg-paper-foundation border border-outline-variant/30 rounded shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button on Desktop */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute right-4 top-4 md:right-6 md:top-6 text-ink-sepia/70 hover:text-ink-sepia transition-colors p-2 z-50 bg-paper-foundation/80 backdrop-blur rounded-full border border-outline-variant/20 flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest"
              aria-label="Close modal"
            >
              <span>Close</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Panel: High-Resolution Visual Design Showcase (60% Width) */}
            <div className="w-full md:w-[60%] bg-surface-variant/20 flex flex-col overflow-y-auto p-4 md:p-8 border-b md:border-b-0 md:border-r border-outline-variant/20 max-h-[45vh] md:max-h-[90vh]">
              <div className="my-auto">
                <DesignGallery
                  coverImageUrl={activeProject.coverImageUrl}
                  galleryImages={activeProject.galleryImages}
                  title={activeProject.title}
                />
              </div>
            </div>

            {/* Right Panel: Contextual Sidebar (40% Width) */}
            <div className="w-full md:w-[40%] bg-container-warm p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[45vh] md:max-h-[90vh] pt-12 md:pt-16">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface-variant font-mono">
                  {activeProject.year}
                </span>
                <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink-sepia leading-tight">
                  {activeProject.title}
                </h2>
                
                <div className="mt-6">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-accent-doodle">
                    Overview
                  </h3>
                  <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                    {activeProject.overview}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-accent-doodle">
                    Role & Strategy
                  </h3>
                  <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
                    {activeProject.role}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-outline-variant/30">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant">
                  Tools Used
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activeProject.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded bg-paper-foundation border border-outline-variant/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold text-ink-sepia"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
