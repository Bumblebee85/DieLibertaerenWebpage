import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeader } from "@/components/shared/section";
import { BlogPostGrid } from "@/components/blog/blog-post-grid";
import { WeeklyEssay } from "@/components/blog/weekly-essay";
import { getBlogCategories, getPublishedBlogPosts } from "@/lib/cms/blog";
import { getWeeklyEssayForCurrentWeek } from "@/lib/cms/weekly-essays";
import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata(seoPages.blog);
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [posts, categories, weeklyEssay] = await Promise.all([
    getPublishedBlogPosts(),
    getBlogCategories(),
    getWeeklyEssayForCurrentWeek(),
  ]);

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <PageHeader
        title="Blog"
        subtitle="Grundsätzliche und aktuelle Themen – plus der Libertäre Aufsatz der Woche."
      />

      <Section>
        <WeeklyEssay
          essay={weeklyEssay.essay}
          weekNumber={weeklyEssay.weekNumber}
        />
      </Section>

      <Section className="bg-muted/30">
        <SectionHeader title="Alle Artikel" />
        <BlogPostGrid posts={posts} categories={categories} />
      </Section>
    </>
  );
}