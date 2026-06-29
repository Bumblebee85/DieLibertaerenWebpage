import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeader } from "@/components/shared/section";
import { WeeklyEssay } from "@/components/blog/weekly-essay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import blogPosts from "@/data/blog-posts.json";
import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";
import { formatDateDE } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata(seoPages.blog);

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <PageHeader
        title="Blog"
        subtitle="Grundsätzliche und aktuelle Themen – plus der Libertäre Aufsatz der Woche."
      />

      <Section>
        <WeeklyEssay />
      </Section>

      <Section className="bg-muted/30">
        <SectionHeader title="Alle Artikel" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.posts.map((post) => (
            <Card key={post.slug} className="group">
              <CardHeader>
                <div className="mb-2 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {formatDateDE(post.date)} · {post.author}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  Artikel lesen →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}