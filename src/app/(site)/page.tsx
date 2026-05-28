import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import {
  getDesignProjects,
  getSiteSettings,
  getWritingPosts,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Home",
  description:
    "Curated words and visual art by Simran. Explore writing, visual design, and editorial case studies.",
});

export default async function HomePage() {
  const [designProjects, writingPosts, settings] = await Promise.all([
    getDesignProjects(),
    getWritingPosts(),
    getSiteSettings(),
  ]);

  const design = designProjects[0];
  const writing = writingPosts[0];

  // Select 3 items dynamically to showcase recent explorations (2 designs, 1 writing)
  const recentWorks = [
    designProjects[0],
    writingPosts[0],
    designProjects[1] || writingPosts[1],
  ].filter(Boolean);

  return (
    <div className="relative overflow-hidden">
      <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-16 relative">
        <div className="absolute top-6 left-6 w-40 h-40 pointer-events-none opacity-30 z-0">
          <svg fill="none" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="80" r="56" stroke="#BF9270" strokeDasharray="6 6" strokeWidth="2" />
            <circle cx="80" cy="80" r="36" stroke="#BF9270" strokeWidth="1.5" />
            <path d="M40 80 H120" stroke="#BF9270" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-outline-variant px-4 py-2 text-xs uppercase tracking-[0.3em] text-on-surface-variant bg-paper-foundation">
              Portfolio &amp; Journal
            </div>
            <h1 className="mt-6 font-display text-5xl leading-tight text-ink-sepia md:text-6xl lg:text-7xl">
              {settings.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-on-surface-variant leading-relaxed">
              {settings.heroTagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                className="rounded-sm bg-accent-doodle px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-paper-foundation hover:bg-primary transition-colors flex items-center gap-2"
                href="/portfolio/writing"
              >
                View Writing
                <span>&rarr;</span>
              </Link>
              <Link
                className="rounded-sm border border-ink-sepia px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-sepia hover:bg-ink-sepia hover:text-paper-foundation transition-colors"
                href="/portfolio/design"
              >
                Explore Design
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-full w-full border border-outline-variant"></div>
            <div className="relative bg-container-deep p-4 z-10 shadow-sm rounded-sm">
              <Image
                alt="Editorial workspace"
                height={560}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5-cZZnkQq8TXQ8I_6N8VD3QHcApnbN3_Ts5LQQ1dr2kH4Ll6h-5RqzmIfwB0f_CmPfrx5e86rsQ1K-6wkCLBB2R_OH67Q4O2xExf98Td6Kvc2k4Rf4tflZg_2LJYdbS_vMlVapbl3AQlM8iJ9y5G0nLtp51iDOz7TjVcZrGxRjPZ2kBy57hQzF4dM33l4Q7_tgT3_g1Vz4pdLGjlQ4PZW8noZGRqbrtMSj1yd-4IUX-2ZbXCZQm3Z4nRMSVTcI2U9rHqN"
                width={520}
                className="rounded-sm"
              />
              <div className="absolute -bottom-4 left-6 bg-paper-foundation px-4 py-1 text-lg font-display italic text-accent-doodle border border-outline-variant/40 shadow-sm">
                Simran
              </div>
            </div>
            <svg className="absolute -bottom-10 right-0 w-40 h-20 pointer-events-none opacity-20 text-accent-doodle z-0" fill="none" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 40 Q 50 10 100 40 T 200 40" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-20 md:px-16">
        <div className="mb-12 flex items-end justify-between border-b border-outline-variant/30 pb-6">
          <div>
            <h2 className="font-display text-4xl text-ink-sepia">Recent Works</h2>
            <p className="text-sm text-on-surface-variant mt-2">
              A glimpse into current explorations across writing and pixels.
            </p>
          </div>
          <Link
            className="text-xs font-bold uppercase tracking-[0.2em] text-accent-doodle hover:text-primary transition-colors flex items-center gap-1"
            href="/portfolio/design"
          >
            Browse All Portfolio &rarr;
          </Link>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {recentWorks.map((work) => {
            const isDesign = 'overview' in work; // DesignProject has overview, WritingPost has excerpt
            const href = isDesign 
              ? `/portfolio/design/${work.slug}` 
              : `/portfolio/writing/${work.slug}`;
            const category = isDesign ? (work.role || "UI Design") : "Editorial";
            const title = work.title;
            const description = isDesign ? work.overview : work.excerpt;
            const imageUrl = work.coverImageUrl;

            return (
              <Link
                key={`${isDesign ? "design" : "writing"}-${work.id}`}
                className="bg-container-warm p-6 border border-outline-variant/30 rounded group hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between"
                href={href}
              >
                <div>
                  <span className="inline-flex items-center px-3 py-1 bg-paper-foundation border border-outline-variant/30 text-on-surface-variant font-bold text-[10px] uppercase tracking-widest rounded-full">
                    {category}
                  </span>
                  <div className="mt-4 bg-paper-foundation p-3 rounded overflow-hidden">
                    <Image
                      alt={title}
                      height={240}
                      src={imageUrl}
                      width={400}
                      className="w-full h-40 object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"
                    />
                  </div>
                  <h3 className="font-display text-2xl text-ink-sepia mt-4 group-hover:text-accent-doodle transition-colors duration-300 line-clamp-1">
                    {title}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
                    {description}
                  </p>
                </div>
                <div className="flex justify-end mt-6 pt-4 border-t border-outline-variant/20">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent-doodle group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
                    View Project &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Simran",
            description:
              "Multidisciplinary writer and visual designer specializing in editorial experiences.",
            url: siteConfig.url,
          }),
        }}
      />
    </div>
  );
}
