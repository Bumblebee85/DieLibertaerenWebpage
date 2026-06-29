import type { MetadataRoute } from "next";
import {
  getBlogSitemapEntries,
  staticSitemapRoutes,
  toAbsoluteSitemapUrl,
} from "@/lib/seo/sitemap-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticSitemapRoutes.map((route) => ({
    url: toAbsoluteSitemapUrl(route.path),
    lastModified: route.lastModified ?? new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries = getBlogSitemapEntries().map((route) => ({
    url: toAbsoluteSitemapUrl(route.path),
    lastModified: route.lastModified ?? new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticEntries, ...blogEntries];
}