import type { MetadataRoute } from "next";
import {
  getBlogSitemapEntries,
  staticSitemapRoutes,
  toAbsoluteSitemapUrl,
} from "@/lib/seo/sitemap-routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = staticSitemapRoutes.map((route) => ({
    url: toAbsoluteSitemapUrl(route.path),
    lastModified: route.lastModified ?? new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogRoutes = await getBlogSitemapEntries();
  const blogEntries = blogRoutes.map((route) => ({
    url: toAbsoluteSitemapUrl(route.path),
    lastModified: route.lastModified ?? new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticEntries, ...blogEntries];
}