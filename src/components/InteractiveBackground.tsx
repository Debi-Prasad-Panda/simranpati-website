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
        className="absolute inset-0 dots-grid opacity-40"
        style={{
          transform: "translateY(calc(var(--scroll-y) * -35px))",
          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />

      {/* 2. Draftsman's Ruled Margin line (Left side, slow speed) */}
      <div
        className="absolute left-8 md:left-20 top-0 bottom-0 w-[1px] bg-ink-sepia/10"
        style={{
          transform: "translateX(calc(var(--mouse-x) * 8px))",
          transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {/* Technical crosshair / registration mark */}
        <svg
          className="absolute top-48 -left-3 w-6 h-6 text-ink-sepia/15"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="7" />
          <path d="M12 2v20M2 12h20" />
        </svg>
        {/* Secondary registration mark */}
        <svg
          className="absolute bottom-48 -left-3 w-6 h-6 text-ink-sepia/15"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="7" />
          <path d="M12 2v20M2 12h20" />
        </svg>
      </div>

      {/* 3. Fibonacci Golden Spiral (Top Left - Layer 1, moves slowly in opposite direction) */}
      <div
        className="absolute left-10 md:left-24 top-32 w-40 h-40 text-accent-doodle/25"
        style={{
          transform:
            "translate(calc(var(--mouse-x) * -12px), calc(var(--scroll-y) * -50px + var(--mouse-y) * -12px)) rotate(calc(var(--mouse-x) * -3deg))",
          transition: "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Fibonacci spiral */}
          <path d="M50,50 A1,1 0 0,1 50,51 A2,2 0 0,1 48,50 A4,4 0 0,1 50,46 A8,8 0 0,1 58,50 A16,16 0 0,1 50,66 A32,32 0 0,1 18,50 A64,64 0 0,1 50,-14" />
          {/* Dotted border boxes */}
          <rect x="18" y="18" width="64" height="48" strokeDasharray="2 2" className="text-ink-sepia/10" />
          <line x1="50" y1="18" x2="50" y2="82" strokeDasharray="2 2" className="text-ink-sepia/10" />
          <text
            x="70"
            y="26"
            className="font-mono text-[6px] tracking-widest fill-ink-sepia/30 stroke-none font-bold uppercase"
          >
            phi = 1.618
          </text>
        </svg>
      </div>

      {/* 4. The Spiral "Narrative Thread" (Bottom Right - Layer 3, moves fast) */}
      <div
        className="absolute right-8 md:right-24 bottom-24 w-44 h-44 text-accent-doodle/30"
        style={{
          transform:
            "translate(calc(var(--mouse-x) * 30px), calc(var(--scroll-y) * -200px + var(--mouse-y) * 30px)) rotate(calc(var(--mouse-x) * 6deg))",
          transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
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
            x="12"
            y="95"
            className="font-display text-[8px] tracking-wider fill-ink-sepia/45 stroke-none uppercase font-bold"
          >
            narrative thread
          </text>
        </svg>
      </div>

      {/* 5. Creative Sparks & Orbit Rings (Top Right - Layer 2, moves medium) */}
      <div
        className="absolute right-12 md:right-28 top-20 w-32 h-32 text-ink-sepia/15"
        style={{
          transform:
            "translate(calc(var(--mouse-x) * 22px), calc(var(--scroll-y) * -110px + var(--mouse-y) * 22px)) rotate(calc(var(--mouse-x) * -5deg))",
          transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
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

      {/* 6. Draft Typography "A" & "W" Layout (Middle Right - Layer 3, moves very fast) */}
      <div
        className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 w-36 h-36 text-accent-doodle/25"
        style={{
          transform:
            "translate(calc(var(--mouse-x) * 35px), calc(var(--scroll-y) * -160px + var(--mouse-y) * 35px)) rotate(calc(var(--mouse-x) * -8deg))",
          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Letter A guidelines */}
          <path d="M20,70 L35,25 L50,70" />
          <line x1="26" y1="55" x2="44" y2="55" />
          {/* Letter W guidelines */}
          <path d="M50,25 L60,70 L70,35 L80,70 L90,25" />
          {/* Typographic baseline and grid markers */}
          <circle cx="35" cy="48" r="22" strokeDasharray="2 2" className="text-ink-sepia/10" />
          <circle cx="70" cy="48" r="22" strokeDasharray="2 2" className="text-ink-sepia/10" />
          <line x1="10" y1="25" x2="90" y2="25" strokeDasharray="1 3" className="text-ink-sepia/15" />
          <line x1="10" y1="70" x2="90" y2="70" strokeDasharray="1 3" className="text-ink-sepia/15" />
          <text
            x="15"
            y="85"
            className="font-display text-[7px] tracking-wider fill-ink-sepia/40 stroke-none uppercase font-bold"
          >
            letterforms
          </text>
        </svg>
      </div>

      {/* 7. Artist's Palette & Paintbrush (Bottom Left - Layer 2, moves medium-slow) */}
      <div
        className="absolute left-10 md:left-24 bottom-28 w-36 h-36 text-accent-doodle/30"
        style={{
          transform:
            "translate(calc(var(--mouse-x) * 20px), calc(var(--scroll-y) * -80px + var(--mouse-y) * 20px)) rotate(calc(var(--mouse-x) * 4deg))",
          transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Palette shape */}
          <path d="M30,75 C15,70 15,40 30,25 C45,10 75,15 85,35 C95,55 75,85 55,85 C45,85 40,78 35,78 C30,78 30,75 30,75 Z" />
          {/* Thumbhole */}
          <circle cx="45" cy="65" r="5" />
          {/* Paint spots */}
          <circle cx="35" cy="38" r="4.5" fill="currentColor" fillOpacity="0.15" />
          <circle cx="50" cy="30" r="3.5" fill="currentColor" fillOpacity="0.15" />
          <circle cx="68" cy="35" r="4.5" fill="currentColor" fillOpacity="0.15" />
          <circle cx="75" cy="52" r="3.5" fill="currentColor" fillOpacity="0.15" />
          {/* Paintbrush passing behind / through */}
          <line x1="25" y1="85" x2="80" y2="30" strokeWidth="1.2" />
          {/* Brush tip */}
          <path d="M80,30 L83,22 C84,20 81,19 79,21 Z" fill="currentColor" fillOpacity="0.3" />
          <text
            x="28"
            y="94"
            className="font-mono text-[6.5px] fill-ink-sepia/40 stroke-none uppercase tracking-widest font-bold"
          >
            visual art
          </text>
        </svg>
      </div>

      {/* 8. Open Novel / Manuscript (Middle Left - Layer 2, moves medium-fast) */}
      <div
        className="absolute left-6 md:left-16 top-1/3 w-36 h-28 text-ink-sepia/15"
        style={{
          transform:
            "translate(calc(var(--mouse-x) * 25px), calc(var(--scroll-y) * -95px + var(--mouse-y) * 25px)) rotate(calc(var(--mouse-x) * 5deg))",
          transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        <svg viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Left page curves */}
          <path d="M50,65 C30,65 20,55 10,60 L10,20 C20,15 30,25 50,25" />
          {/* Right page curves */}
          <path d="M50,65 C70,65 80,55 90,60 L90,20 C80,15 70,25 50,25" />
          {/* Spine line */}
          <line x1="50" y1="25" x2="50" y2="65" />
          {/* Page lines left */}
          <line x1="18" y1="33" x2="42" y2="33" strokeDasharray="1 2" opacity="0.6" />
          <line x1="18" y1="41" x2="42" y2="41" strokeDasharray="1 2" opacity="0.6" />
          <line x1="18" y1="49" x2="42" y2="49" strokeDasharray="1 2" opacity="0.6" />
          {/* Page lines right */}
          <line x1="58" y1="33" x2="82" y2="33" strokeDasharray="1 2" opacity="0.6" />
          <line x1="58" y1="41" x2="82" y2="41" strokeDasharray="1 2" opacity="0.6" />
          <line x1="58" y1="49" x2="82" y2="49" strokeDasharray="1 2" opacity="0.6" />
          {/* Ribbon bookmark */}
          <path d="M50,25 Q52,45 56,60 L51,57 L46,60 Z" fill="currentColor" fillOpacity="0.2" />
          <text
            x="30"
            y="75"
            className="font-body text-[7px] italic fill-ink-sepia/40 stroke-none font-bold uppercase tracking-wider"
          >
            storytelling
          </text>
        </svg>
      </div>
    </div>
  );
}
