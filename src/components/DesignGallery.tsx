"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface DesignGalleryProps {
  coverImageUrl: string;
  galleryImages: string[];
  title: string;
}

export default function DesignGallery({
  coverImageUrl,
  galleryImages,
  title,
}: DesignGalleryProps) {
  const allImages = [coverImageUrl, ...galleryImages].filter(Boolean);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showNext = useCallback(() => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex + 1) % allImages.length);
    }
  }, [activeIndex, allImages.length]);

  const showPrev = useCallback(() => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex - 1 + allImages.length) % allImages.length);
    }
  }, [activeIndex, allImages.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, closeLightbox, showNext, showPrev]);

  if (allImages.length === 0) return null;

  return (
    <div>
      {/* Cover Image */}
      <div 
        className="group relative cursor-pointer overflow-hidden bg-surface p-4 border border-outline-variant transition-transform hover:scale-[1.01] duration-300"
        onClick={() => openLightbox(0)}
      >
        <Image
          alt={title}
          height={720}
          src={allImages[0]}
          width={900}
          className="w-full object-cover transition-opacity duration-300 group-hover:opacity-95"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-ink-sepia/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-paper-foundation px-4 py-2 text-xs uppercase tracking-widest text-ink-sepia shadow-md">
            View Fullscreen
          </span>
        </div>
      </div>

      {/* Gallery Images */}
      {allImages.length > 1 && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {allImages.slice(1).map((image, idx) => (
            <div
              key={image}
              className="group relative cursor-pointer overflow-hidden bg-surface p-3 border border-outline-variant transition-transform hover:scale-[1.02] duration-300"
              onClick={() => openLightbox(idx + 1)}
            >
              <Image
                alt={`${title} detail ${idx + 1}`}
                height={480}
                src={image}
                width={900}
                className="w-full object-cover transition-opacity duration-300 group-hover:opacity-95"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink-sepia/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full bg-paper-foundation px-3 py-1.5 text-[10px] uppercase tracking-widest text-ink-sepia shadow-sm">
                  Zoom
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-sepia/90 backdrop-blur-md p-4 transition-all duration-300"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute right-6 top-6 text-paper-foundation/80 hover:text-paper-foundation transition-colors p-2 z-50"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left Arrow */}
          {allImages.length > 1 && (
            <button
              className="absolute left-6 text-paper-foundation/80 hover:text-paper-foundation hover:bg-paper-foundation/10 transition-all p-3 rounded-full z-50"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image Container */}
          <div
            className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              alt={`${title} fullscreen`}
              height={1080}
              src={allImages[activeIndex]}
              width={1600}
              className="max-h-[85vh] max-w-[90vw] object-contain select-none shadow-2xl"
            />
            {/* Index indicator */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm text-paper-foundation/60 tracking-widest font-mono">
              {activeIndex + 1} / {allImages.length}
            </div>
          </div>

          {/* Right Arrow */}
          {allImages.length > 1 && (
            <button
              className="absolute right-6 text-paper-foundation/80 hover:text-paper-foundation hover:bg-paper-foundation/10 transition-all p-3 rounded-full z-50"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
