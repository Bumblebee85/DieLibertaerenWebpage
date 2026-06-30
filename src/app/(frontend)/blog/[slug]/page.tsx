import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ArticleJsonLd } from "@/components/shared/json-ld";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/cms/blog";
import { richTextToHtml } from "@/lib/cms/rich-text";
import { createPageMetadata } from "@/lib/seo/metadata";
import { formatDateDE } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Artikel nicht gefunden" };

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: [...post.tags, post.category.name, "Libertarismus", "DIE LIBERTÄREN"],
    ogImage: post.imageUrl,
    ogImageAlt: post.title,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const contentHtml = richTextToHtml(post.content, post.contentHtml || post.excerpt);

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        datePublished={post.date}
        image={post.imageUrl}
      />
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />
      <PageHeader title={post.title} subtitle={post.excerpt} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {formatDateDE(post.date)} · {post.author}
            </span>
            <Badge variant="muted">{post.category.name}</Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <div
            className="prose prose-lg max-w-none space-y-6 text-lg leading-relaxed text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
          <Button variant="outline" className="mt-12" asChild>
            <Link href="/blog">← Zurück zum Blog</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}