import blogPosts from "@/data/blog-posts.json";
import { getSiteUrl } from "@/lib/seo/site-url";

export type SitemapEntry = {
  path: string;
  lastModified?: Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

/** Öffentliche statische Routen (ohne Admin, API, Redirects). */
export const staticSitemapRoutes: SitemapEntry[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/unsere-prinzipien", changeFrequency: "monthly", priority: 0.9 },
  { path: "/programm", changeFrequency: "monthly", priority: 0.9 },
  { path: "/stimmst-du-mit-uns-ueberein", changeFrequency: "monthly", priority: 0.85 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.85 },
  { path: "/events", changeFrequency: "weekly", priority: 0.8 },
  { path: "/mitmachen", changeFrequency: "monthly", priority: 0.75 },
  { path: "/werde-mitglied", changeFrequency: "monthly", priority: 0.8 },
  { path: "/spenden", changeFrequency: "monthly", priority: 0.75 },
  { path: "/netzwerk", changeFrequency: "monthly", priority: 0.7 },
  { path: "/bundesvorstand", changeFrequency: "monthly", priority: 0.7 },
  { path: "/kontakt", changeFrequency: "yearly", priority: 0.6 },
  { path: "/impressum", changeFrequency: "yearly", priority: 0.3 },
  { path: "/datenschutz", changeFrequency: "yearly", priority: 0.3 },
];

export function getBlogSitemapEntries(): SitemapEntry[] {
  return blogPosts.posts.map((post) => ({
    path: `/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}

export function toAbsoluteSitemapUrl(path: string): string {
  return `${getSiteUrl()}${path}`;
}