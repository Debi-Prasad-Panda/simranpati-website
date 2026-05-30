"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track mouse coordinate offsets (-1 to 1) from the center of the viewport
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      container.style.setProperty("--mouse-x", `${x}`);
      container.style.setProperty("--mouse-y", `${y}`);
    };

    // Track vertical scroll progress
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      container.style.setProperty("--scroll-y", `${scrollPercent}`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      style={{
        "--mouse-x": "0",
        "--mouse-y": "0",
        "--scroll-y": "0",
      } as React.CSSProperties}
    >
      {/* 1. Dotted Graph Paper Texture (Moves slightly with scroll, calibrated opacity) */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#cfc5bb_1.5px,transparent_1.5px)] [background-size:40px_40px] opacity-40"
        style={{
          transform: "translateY(calc(var(--scroll-y) * -35px))",
          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />

      {/* 2. Draftsman's Ruled Margin & Corner Marks (Layer 1 - Deepest, moves slow, Ink Sepia watermark) */}
      <div
        className="absolute left-8 md:left-20 top-0 bottom-0 w-[1px] bg-ink-sepia/10"
        style={{
          transform: "translateX(calc(var(--mouse-x) * 10px))",
          transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {/* Technical crosshair / registration mark */}
        <svg
          className="absolute top-48 -left-3 w-6 h-6 text-ink-sepia/20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="7" />
          <path d="M12 2v20M2 12h20" />
        </svg>
      </div>

      {/* 3. The Spiral "Narrative Thread" (Layer 2 - Medium speed, Gold Accent) */}
      <div
        className="absolute right-8 md:right-20 bottom-1/4 w-36 h-36 text-accent-doodle/30"
        style={{
          transform:
            "translate(calc(var(--mouse-x) * 20px), calc(var(--scroll-y) * -80px + var(--mouse-y) * 20px)) rotate(calc(var(--mouse-x) * 4deg))",
          transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {/* Beautiful organic spiral representing continuous thread of ideas */}
          <path d="M50,50 Q45,35 60,35 T70,55 T45,70 T30,45 T65,25 T80,60 T35,85 T15,35" />
          <text
            x="10"
            y="95"
            className="font-display text-[8px] tracking-wider fill-ink-sepia/40 stroke-none uppercase font-bold"
          >
            narrative thread
          </text>
        </svg>
      </div>

      {/* 4. Creative Sparks & Target Rings (Layer 3 - High speed, Ink Sepia + Accent mix) */}
      <div
        className="absolute right-12 md:right-28 top-1/4 w-28 h-28 text-ink-sepia/15"
        style={{
          transform:
            "translate(calc(var(--mouse-x) * 35px), calc(var(--scroll-y) * -120px + var(--mouse-y) * 35px)) rotate(calc(var(--mouse-x) * -8deg))",
          transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Hand-drawn editorial star/spark (four points) */}
          <path d="M30,30 Q30,10 30,30 Q50,30 30,30 Q30,50 30,30 Q10,30 30,30 Z" fill="currentColor" fillOpacity="0.05" />
          {/* Nested smaller star */}
          <path
            d="M70,60 Q70,48 70,60 Q82,60 70,60 Q70,72 70,60 Q58,60 70,60 Z"
            fill="currentColor"
            fillOpacity="0.05"
            style={{ transformOrigin: "center", transform: "scale(0.8)" }}
          />
          {/* Compass / target rings */}
          <circle cx="70" cy="60" r="16" strokeDasharray="3 3" className="text-accent-doodle/30" />
        </svg>
      </div>

      {/* 5. Concept Map blobs (Layer 2 - Left side, medium-slow, Gold Accent) */}
      <div
        className="absolute left-12 md:left-24 bottom-24 w-32 h-32 text-accent-doodle/25"
        style={{
          transform:
            "translate(calc(var(--mouse-x) * 25px), calc(var(--scroll-y) * -65px + var(--mouse-y) * 25px)) rotate(calc(var(--mouse-x) * 6deg))",
          transition: "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Concentric organic sketching */}
          <path d="M20,50 C20,30 40,25 60,30 C80,35 85,55 70,70 C55,85 30,80 20,50 Z" />
          <path d="M25,50 C25,35 42,30 58,35 C74,40 78,56 66,66 C54,76 33,72 25,50 Z" opacity="0.5" strokeDasharray="2 2" />
          <text
            x="15"
            y="20"
            className="font-body text-[8px] italic tracking-widest fill-ink-sepia/40 stroke-none uppercase font-bold"
          >
            art &amp; pixels
          </text>
        </svg>
      </div>
    </div>
  );
}
