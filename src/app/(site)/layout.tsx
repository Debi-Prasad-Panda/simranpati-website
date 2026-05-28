import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col relative">
      {/* Ambient Doodle Layer (Background) */}
      <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none opacity-30 overflow-hidden">
        {/* Abstract squiggles */}
        <svg className="absolute top-28 right-10 doodle-float text-accent-doodle w-32 h-32" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,50 Q30,20 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2"></path>
          <path d="M20,60 Q40,30 60,60 T100,60" fill="none" opacity="0.5" stroke="currentColor" strokeWidth="1"></path>
        </svg>
        <svg className="absolute top-1/2 left-5 doodle-float text-accent-doodle w-48 h-48" fill="none" style={{ animationDelay: "-2s" }} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeDasharray="2 4" strokeWidth="0.5"></circle>
          <path d="M50,10 L50,90 M10,50 L90,50" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
        </svg>
        <svg className="absolute bottom-28 right-1/4 doodle-float text-accent-doodle w-24 h-24" fill="none" style={{ animationDelay: "-4s" }} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,90 L90,10 M10,10 L90,90" fill="none" opacity="0.3" stroke="currentColor" strokeWidth="1"></path>
          <rect fill="none" height="50" stroke="currentColor" strokeWidth="1" width="50" x="25" y="25"></rect>
        </svg>
      </div>

      <SiteHeader />
      <main className="flex-1 pt-24 z-10 relative">{children}</main>
      <SiteFooter />
    </div>
  );
}
