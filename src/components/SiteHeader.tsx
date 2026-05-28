"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio/writing", label: "Writing" },
  { href: "/portfolio/design", label: "Design" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-variant/90 backdrop-blur-sm border-b border-outline-variant/30">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-16">
        <Link
          className="font-display text-2xl font-bold tracking-tight text-ink-sepia"
          href="/"
        >
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                className={`text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 pb-1 ${
                  isActive
                    ? "text-primary border-b-2 border-accent-doodle"
                    : "text-on-surface-variant hover:text-accent-doodle"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          className={`hidden rounded bg-accent-doodle text-paper-foundation px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-90 md:inline-flex ${
            pathname === "/contact" ? "bg-surface-tint" : ""
          }`}
          href="/contact"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
