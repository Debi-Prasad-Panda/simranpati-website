import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col relative">
      <InteractiveBackground />

      <SiteHeader />
      <main className="flex-1 pt-24 z-10 relative">{children}</main>
      <SiteFooter />
    </div>
  );
}
