"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogCategoryDisplay, BlogPostDisplay } from "@/lib/cms/blog";
import { formatDateDE } from "@/lib/utils";

type BlogPostGridProps = {
  posts: BlogPostDisplay[];
  categories: BlogCategoryDisplay[];
};

export function BlogPostGrid({ posts, categories }: BlogPostGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((post) => post.category.slug === activeCategory);
  }, [activeCategory, posts]);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            activeCategory === "all"
              ? "bg-primary text-secondary"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Alle Kategorien
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === category.slug
                ? "bg-primary text-secondary"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredPosts.length} von {posts.length} Artikeln
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="group">
            <CardHeader>
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge variant="muted">{post.category.name}</Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="transition-colors group-hover:text-primary">
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

      {filteredPosts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
          <p className="text-muted-foreground">
            Keine Artikel in dieser Kategorie gefunden.
          </p>
        </div>
      )}
    </div>
  );
}