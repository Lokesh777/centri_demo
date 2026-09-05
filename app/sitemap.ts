import type { MetadataRoute } from "next";

import { legalDocuments } from "@/content/legal";
import { posts } from "@/content/posts";
import { site } from "@/content/site";
import { stories } from "@/content/stories";

const STATIC_ROUTES = ["", "/pricing", "/company", "/customers", "/blog", "/careers", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...stories.map((story) => ({
      url: `${site.url}/customers/${story.slug}`,
      lastModified: new Date(story.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...legalDocuments.map((document) => ({
      url: `${site.url}/legal/${document.slug}`,
      lastModified: new Date(document.updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
