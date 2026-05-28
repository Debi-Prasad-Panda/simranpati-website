import { notFound } from "next/navigation";
import { getDesignProjectBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import DesignGallery from "@/components/DesignGallery";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getDesignProjectBySlug(slug);
  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.overview,
    alternates: {
      canonical: `${siteConfig.url}/portfolio/design/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.overview,
      type: "article",
      url: `${siteConfig.url}/portfolio/design/${project.slug}`,
      images: project.coverImageUrl ? [{ url: project.coverImageUrl }] : [],
    },
  };
}

export default async function DesignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getDesignProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  return (
    <section className="mx-auto flex max-w-[1280px] flex-col gap-10 px-6 py-16 md:flex-row md:px-16">
      <div className="md:w-[60%]">
        <DesignGallery
          coverImageUrl={project.coverImageUrl}
          galleryImages={project.galleryImages}
          title={project.title}
        />
      </div>
      <aside className="md:w-[40%] bg-container-warm p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-on-surface-variant">
          {project.year}
        </p>
        <h1 className="mt-4 font-display text-4xl text-ink-sepia">
          {project.title}
        </h1>
        <p className="mt-4 text-on-surface-variant">{project.overview}</p>
        <div className="mt-6">
          <h2 className="text-sm uppercase tracking-[0.3em] text-on-surface-variant">
            Role & Strategy
          </h2>
          <p className="mt-2 text-on-surface-variant">{project.role}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-sm uppercase tracking-[0.3em] text-on-surface-variant">
            Tools
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-sm border border-outline-variant px-3 py-1 text-xs uppercase tracking-[0.2em]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
