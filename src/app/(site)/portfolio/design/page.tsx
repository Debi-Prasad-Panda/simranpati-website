import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { getDesignProjects } from "@/lib/content";

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
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            className="break-inside-avoid block bg-container-warm p-5 rounded group hover:-translate-y-1 transition-transform duration-300 border border-outline-variant/30"
            href={`/portfolio/design/${project.slug}`}
          >
            <div className="mb-4 overflow-hidden rounded bg-paper-foundation p-3">
              <Image
                alt={project.title}
                height={320}
                src={project.coverImageUrl}
                width={480}
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent-doodle">
                {project.role || "Design Case Study"}
              </span>
              <h2 className="font-display text-2xl text-ink-sepia group-hover:text-accent-doodle transition-colors duration-300">
                {project.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
