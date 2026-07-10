import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/constants/content";
import { SITE_CONFIG } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const staticPages = [
    "",
    "/features",
    "/barcode-generator",
    "/qr-generator",
    "/batch-generator",
    "/templates",
    "/scanner",
    "/favorites",
    "/history",
    "/ai-generator",
    "/developer",
    "/status",
    "/guides/ean",
    "/guides/upc",
    "/guides/code128",
    "/guides/gs1",
    "/help",
    "/sign-in",
    "/sign-up",
    "/barcode-guide",
    "/qr-guide",
    "/blog",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
    "/cookie-policy",
    "/dmca",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
