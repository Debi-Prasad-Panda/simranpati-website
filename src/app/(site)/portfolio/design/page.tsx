import { buildMetadata } from "@/lib/seo";
import { getDesignProjects } from "@/lib/content";
import DesignPortfolioGrid from "@/components/DesignPortfolioGrid";

export const metadata = buildMetadata({
  title: "Design Portfolio",
  description:
    "Visual design projects blending editorial layout and digital interfaces.",
});

export default async function DesignPortfolioPage() {
  const projects = await getDesignProjects();

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-16">
      <header className="mx-auto mb-16 max-w-3xl text-center flex flex-col items-center">
        <h1 className="font-display text-5xl md:text-6xl text-ink-sepia">
          Visual Portfolio
        </h1>
        <p className="mt-6 text-lg text-on-surface-variant max-w-[65ch]">
          A curated selection of editorial layouts, brand identities, and digital interfaces.
          Each project represents a delicate balance between artistic intuition and rigorous structural precision.
        </p>
      </header>
      <DesignPortfolioGrid projects={projects} />
    </section>
  );
}
