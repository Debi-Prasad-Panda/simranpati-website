"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/site";
import ThemeSwitch from "./ThemeSwitch";

export default function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu open/close
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Desktop dropdown
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const handleToggle = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };



  return (
    <header className="fixed top-0 w-full z-50 bg-surface-variant/90 backdrop-blur-sm border-b border-outline-variant/30">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-16">
        <Link
          className="font-display text-2xl font-bold tracking-tight text-ink-sepia"
          href="/"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            className={`text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 pb-1 ${
              pathname === "/"
                ? "text-primary border-b-2 border-accent-doodle"
                : "text-on-surface-variant hover:text-accent-doodle"
            }`}
            href="/"
          >
            Home
          </Link>

          {/* Portfolio Dropdown */}
          <div
            className="relative font-body"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className={`text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 pb-1 flex items-center gap-1 cursor-pointer ${
                pathname?.startsWith("/portfolio")
                  ? "text-primary border-b-2 border-accent-doodle"
                  : "text-on-surface-variant hover:text-accent-doodle"
              }`}
            >
              <span>Portfolio</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-48 z-50 transform origin-top-left transition-all duration-200">
                <div className="rounded bg-container-warm border border-outline-variant/40 shadow-lg py-2">
                  <Link
                    className="block px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink-sepia hover:bg-paper-foundation hover:text-accent-doodle transition-colors"
                    href="/portfolio/writing"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Writing
                  </Link>
                  <Link
                    className="block px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink-sepia hover:bg-paper-foundation hover:text-accent-doodle transition-colors"
                    href="/portfolio/design"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Design
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            className={`text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 pb-1 ${
              pathname === "/about"
                ? "text-primary border-b-2 border-accent-doodle"
                : "text-on-surface-variant hover:text-accent-doodle"
            }`}
            href="/about"
          >
            About
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeSwitch isDarkMode={isDarkMode} onToggle={handleToggle} />
          <Link
            className={`rounded bg-accent-doodle text-paper-foundation px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-90 ${
              pathname === "/contact" ? "bg-surface-tint" : ""
            }`}
            href="/contact"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeSwitch isDarkMode={isDarkMode} onToggle={handleToggle} />
          <button
            className="text-ink-sepia p-1 cursor-pointer focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-paper-foundation border-t border-outline-variant/30 px-6 py-6 space-y-4 absolute w-full left-0 top-[60px] shadow-lg z-50">
          <Link
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink-sepia py-2 border-b border-outline-variant/10"
            href="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <div className="space-y-2">
            <span className="block text-[10px] uppercase tracking-[0.25em] text-on-surface-variant font-bold">
              Portfolio
            </span>
            <div className="pl-4 flex flex-col gap-2">
              <Link
                className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-sepia py-1"
                href="/portfolio/writing"
                onClick={() => setIsOpen(false)}
              >
                Writing
              </Link>
              <Link
                className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-sepia py-1"
                href="/portfolio/design"
                onClick={() => setIsOpen(false)}
              >
                Design
              </Link>
            </div>
          </div>
          <Link
            className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink-sepia py-2 border-b border-outline-variant/10"
            href="/about"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            className="block text-center rounded bg-accent-doodle text-paper-foundation px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-90 w-full"
            href="/contact"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
