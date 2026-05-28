import { getDesignProjects, getWritingPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default async function sitemap() {
  const [writing, design] = await Promise.all([
    getWritingPosts(),
    getDesignProjects(),
  ]);

  const baseRoutes = [
    "",
    "/about",
    "/contact",
    "/portfolio/writing",
    "/portfolio/design",
  ];

  return [
    ...baseRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
    })),
    ...writing.map((post) => ({
      url: `${siteConfig.url}/writing/${post.slug}`,
      lastModified: post.publishedAt,
    })),
    ...design.map((project) => ({
      url: `${siteConfig.url}/design/${project.slug}`,
    })),
  ];
}
