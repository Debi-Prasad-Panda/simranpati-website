import Link from "next/link";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="fixed top-0 w-full border-b border-outline-variant bg-paper-foundation/95 backdrop-blur z-50">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <Link className="font-display text-xl text-ink-sepia hover:text-accent-doodle transition-colors" href="/admin">
            Admin Dashboard
          </Link>
          <Link
            className="text-xs uppercase tracking-[0.3em] text-on-surface-variant hover:text-accent-doodle transition-colors"
            href="/"
          >
            Back to Site
          </Link>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-6 pb-16 pt-28">
        {children}
      </main>
    </div>
  );
}
