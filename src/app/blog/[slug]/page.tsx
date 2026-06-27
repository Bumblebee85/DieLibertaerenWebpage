import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import blogPosts from "@/data/blog-posts.json";
import { formatDateDE } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.posts.find((p) => p.slug === slug);
  if (!post) return { title: "Artikel nicht gefunden" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHeader title={post.title} subtitle={post.excerpt} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {formatDateDE(post.date)} · {post.author}
            </span>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="muted">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="prose prose-lg max-w-none space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>{post.excerpt}</p>
            <p>
              Dieser Artikel wird in Kürze mit dem vollständigen Inhalt aus dem
              bestehenden Blog übernommen. Bis dahin findest du den Originalartikel
              auf der bisherigen Website.
            </p>
          </div>
          <Button variant="outline" className="mt-12" asChild>
            <Link href="/blog">← Zurück zum Blog</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}