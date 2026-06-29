import highlightsData from "@/data/highlights.json";
import { resolveMediaUrl } from "@/lib/cms/media";
import { getPayloadClient } from "@/lib/payload";
import type { Highlight } from "@/payload-types";

export type HighlightDisplay = {
  id: string;
  slug: string;
  title: string;
  shortText: string;
  imageUrl?: string;
  imageAlt?: string;
  date?: string;
  link: string;
};

const DEFAULT_HIGHLIGHT_IMAGES: Record<string, string> = {
  "afuera-fest-2026": "/images/afuera-fest-hero.jpg",
};

function todayIso(): string {
  return new Date().toISOString().split("T")[0];
}

function isHighlightVisible(highlight: Highlight, today: string): boolean {
  if (!highlight.isActive) return false;
  if (!highlight.activeUntil) return true;
  return highlight.activeUntil >= today;
}

function resolveHighlightImage(
  slug: string,
  imageUrl?: string,
  imageAlt?: string
): { url?: string; alt?: string } {
  return {
    url: imageUrl ?? DEFAULT_HIGHLIGHT_IMAGES[slug],
    alt: imageAlt,
  };
}

function mapPayloadHighlight(highlight: Highlight): HighlightDisplay {
  const slug = highlight.slug ?? String(highlight.id);
  const { url, alt } = resolveMediaUrl(highlight.image);
  const image = resolveHighlightImage(slug, url, alt);

  return {
    id: String(highlight.id),
    slug,
    title: highlight.title,
    shortText: highlight.shortText,
    imageUrl: image.url,
    imageAlt: image.alt ?? highlight.title,
    date: highlight.date ?? undefined,
    link: highlight.link,
  };
}

function mapJsonHighlight(
  highlight: (typeof highlightsData.highlights)[number]
): HighlightDisplay {
  const slug = highlight.id;
  const image = resolveHighlightImage(
    slug,
    "image" in highlight ? (highlight.image as string | undefined) : undefined
  );

  return {
    id: highlight.id,
    slug,
    title: highlight.title,
    shortText: highlight.subtitle,
    imageUrl: image.url,
    imageAlt: image.alt ?? highlight.title,
    date: "date" in highlight ? (highlight.date as string | undefined) : undefined,
    link: highlight.link,
  };
}

/** Aktive Highlights aus Payload (inkl. activeUntil-Filter), mit JSON-Fallback. */
export async function getActiveHighlights(): Promise<HighlightDisplay[]> {
  const today = todayIso();

  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: "highlights",
      where: {
        and: [
          { isActive: { equals: true } },
          {
            or: [
              { activeUntil: { exists: false } },
              { activeUntil: { equals: null } },
              { activeUntil: { greater_than_equal: today } },
            ],
          },
        ],
      },
      sort: "-date",
      limit: 10,
      depth: 1,
    });

    if (result.docs.length > 0) {
      const visible = (result.docs as Highlight[]).filter((doc) =>
        isHighlightVisible(doc, today)
      );

      if (visible.length > 0) {
        return visible.map(mapPayloadHighlight);
      }
    }
  } catch {
    // MongoDB nicht erreichbar – Fallback auf statische JSON-Daten
  }

  return highlightsData.highlights
    .filter((item) => item.isActive)
    .map(mapJsonHighlight);
}