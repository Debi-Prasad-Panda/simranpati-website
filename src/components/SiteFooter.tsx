import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-outline-variant bg-surface">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 px-6 py-10 text-sm text-on-surface-variant md:flex-row md:justify-between md:px-16">
        <div className="font-display text-lg text-ink-sepia">
          {siteConfig.name}
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-6">
          <Link className="hover:text-accent-doodle" href="/portfolio/design">
            Portfolio
          </Link>
          <Link className="hover:text-accent-doodle" href="/portfolio/writing">
            Writing
          </Link>
          <Link className="hover:text-accent-doodle" href="/contact">
            Inquiries
          </Link>
          <Link className="hover:text-accent-doodle" href="/contact">
            Privacy
          </Link>
        </nav>
        <div className="text-center md:text-right">
          © 2026 {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
