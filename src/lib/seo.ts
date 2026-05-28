import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export function buildMetadata(partial: Metadata): Metadata {
  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      type: "website",
      url: siteConfig.url,
    },
    ...partial,
  };
}
