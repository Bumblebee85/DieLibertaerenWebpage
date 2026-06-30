import blogPostsData from "@/data/blog-posts.json";
import { resolveMediaUrl } from "@/lib/cms/media";
import { getPayloadClient } from "@/lib/payload";
import type { BlogCategory, BlogPost } from "@/payload-types";

export type BlogCategoryDisplay = {
  id: string;
  name: string;
  slug: string;
};

export type BlogPostDisplay = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: unknown;
  contentHtml: string;
  date: string;
  author: string;
  imageUrl?: string;
  imageAlt?: string;
  category: BlogCategoryDisplay;
  tags: string[];
};

function mapJsonCategory(tag: string, index: number): BlogCategoryDisplay {
  const slug = tag
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    id: `json-cat-${index}`,
    name: tag,
    slug: slug || `kategorie-${index}`,
  };
}

function mapJsonPost(
  post: (typeof blogPostsData.posts)[number],
  index: number
): BlogPostDisplay {
  const category = mapJsonCategory(post.tags[0] ?? "Allgemein", index);
  return {
    id: post.slug,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    contentHtml: `<p>${post.excerpt}</p>`,
    date: post.date,
    author: post.author,
    imageUrl: post.image,
    imageAlt: post.title,
    category,
    tags: post.tags,
  };
}

function mapCategory(
  category: string | number | BlogCategory | null | undefined
): BlogCategoryDisplay {
  if (!category || typeof category === "string" || typeof category === "number") {
    return { id: "unknown", name: "Allgemein", slug: "allgemein" };
  }

  return {
    id: String(category.id),
    name: category.name,
    slug: category.slug ?? String(category.id),
  };
}

function mapPost(doc: BlogPost): BlogPostDisplay {
  const { url, alt } = resolveMediaUrl(doc.featuredImage);
  const tags = (doc.tags ?? []).map((item) => item.tag);

  return {
    id: String(doc.id),
    slug: doc.slug ?? String(doc.id),
    title: doc.title,
    excerpt: doc.excerpt,
    content: doc.content,
    contentHtml: "",
    date: doc.date.split("T")[0],
    author: doc.author ?? "DIE LIBERTÄREN",
    imageUrl: url,
    imageAlt: alt ?? doc.title,
    category: mapCategory(doc.category),
    tags,
  };
}

export async function getBlogCategories(): Promise<BlogCategoryDisplay[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "blog-categories",
      sort: "name",
      limit: 100,
      pagination: false,
      depth: 0,
    });

    if (result.docs.length > 0) {
      return result.docs.map((doc) => ({
        id: String(doc.id),
        name: (doc as BlogCategory).name,
        slug: (doc as BlogCategory).slug ?? String(doc.id),
      }));
    }
  } catch {
    // Fallback unten
  }

  const seen = new Map<string, BlogCategoryDisplay>();
  blogPostsData.posts.forEach((post, index) => {
    const cat = mapJsonCategory(post.tags[0] ?? "Allgemein", index);
    seen.set(cat.slug, cat);
  });
  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getPublishedBlogPosts(): Promise<BlogPostDisplay[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "blog-posts",
      where: { published: { equals: true } },
      sort: "-date",
      limit: 200,
      pagination: false,
      depth: 1,
    });

    if (result.docs.length > 0) {
      return result.docs.map((doc) => mapPost(doc as BlogPost));
    }
  } catch {
    // Fallback unten
  }

  return blogPostsData.posts.map(mapJsonPost);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPostDisplay | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "blog-posts",
      where: {
        and: [{ slug: { equals: slug } }, { published: { equals: true } }],
      },
      limit: 1,
      depth: 1,
    });

    if (result.docs[0]) {
      return mapPost(result.docs[0] as BlogPost);
    }
  } catch {
    // Fallback unten
  }

  const jsonPost = blogPostsData.posts.find((p) => p.slug === slug);
  if (!jsonPost) return null;

  const index = blogPostsData.posts.indexOf(jsonPost);
  return mapJsonPost(jsonPost, index);
}