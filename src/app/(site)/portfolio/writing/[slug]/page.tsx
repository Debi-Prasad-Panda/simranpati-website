import { notFound } from "next/navigation";
import { getWritingPostBySlug } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";
import { siteConfig } from "@/lib/site";
import WritingReader from "@/components/WritingReader";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getWritingPostBySlug(slug);
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/portfolio/writing/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${siteConfig.url}/portfolio/writing/${post.slug}`,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : [],
    },
  };
}

export default async function WritingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getWritingPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const html = await markdownToHtml(post.body);

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-16 pt-[120px]">
      <WritingReader
        title={post.title}
        excerpt={post.excerpt}
        readingTime={post.readingTime}
        publishedAt={formattedDate}
        coverImageUrl={post.coverImageUrl}
        htmlContent={html}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            image: post.coverImageUrl,
            author: {
              "@type": "Person",
              name: "Simran",
            },
          }),
        }}
      />
    </div>
  );
}
