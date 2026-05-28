import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getWritingPosts } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Writing Portfolio",
  description: "Long-form essays, critiques, and narratives from Simran.",
});

export default async function WritingPortfolioPage() {
  const posts = await getWritingPosts();

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-16">
      <header className="mx-auto mb-16 max-w-3xl text-center flex flex-col items-center">
        <h1 className="font-display text-5xl md:text-6xl text-ink-sepia mb-6 relative inline-block">
          Selected Works
          {/* Doodle Accent */}
          <svg className="absolute -bottom-4 left-0 w-full h-4 text-accent-doodle animate-pulse" preserveAspectRatio="none" viewBox="0 0 200 20">
            <path d="M0,10 Q50,0 100,10 T200,10" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
          </svg>
        </h1>
        <p className="mt-8 text-lg text-on-surface-variant max-w-[65ch]">
          Essays, critique, and narratives exploring the intersection of digital culture and human experience. Words intended to be read slowly.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {posts.map((post, index) => {
          const isFeatured = index === 0;
          return (
            <Link
              key={post.id}
              className={`rounded-lg p-8 md:p-12 flex flex-col justify-between group relative overflow-hidden transition-transform duration-500 hover:-translate-y-1 border border-outline-variant/30 ${
                isFeatured
                  ? "md:col-span-8 bg-container-warm"
                  : "md:col-span-4 bg-surface-variant"
              }`}
              href={`/portfolio/writing/${post.slug}`}
            >
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-surface-tint opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>

              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-surface-tint border border-surface-tint px-3 py-1 rounded-full bg-paper-foundation">
                    {index % 2 === 0 ? "Essay" : "Critique"}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-1">
                    {post.readingTime} min read
                  </span>
                </div>

                <h2 className={`${
                  isFeatured ? "text-3xl md:text-4xl" : "text-2xl"
                } font-display text-ink-sepia mb-4 group-hover:text-accent-doodle transition-colors duration-300`}>
                  {post.title}
                </h2>

                <p className="text-sm text-on-surface-variant line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-outline-variant/40 pt-6 mt-auto">
                <div className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                  Published {post.publishedAt ? `in ${post.publishedAt.split("-")[0]}` : "recently"}
                </div>
                <svg className="h-5 w-5 text-surface-tint group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
