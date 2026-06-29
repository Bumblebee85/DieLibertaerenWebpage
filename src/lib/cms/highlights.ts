import highlightsData from "@/data/highlights.json";
import { richTextToHtml } from "@/lib/cms/rich-text";
import { getPayloadClient } from "@/lib/payload";
import type { Highlight, Media } from "@/payload-types";

export type HighlightDisplay = {
  id: string;
  title: string;
  subtitleHtml: string;
  imageUrl?: string;
  imageAlt?: string;
  buttonText: string;
  link: string;
};

const DEFAULT_HIGHLIGHT_IMAGES: Record<string, string> = {
  "afuera-fest-2026": "/images/afuera-fest-hero.jpg",
};

function resolveHighlightImage(
  id: string,
  imageUrl?: string,
  imageAlt?: string
): { url?: string; alt?: string } {
  return {
    url: imageUrl ?? DEFAULT_HIGHLIGHT_IMAGES[id],
    alt: imageAlt,
  };
}

function resolveMediaUrl(
  image: string | number | Media | null | undefined
): {
  url?: string;
  alt?: string;
} {
  if (!image || typeof image === "string" || typeof image === "number") {
    return {};
  }

  return {
    url: image.url ?? undefined,
    alt: image.alt ?? undefined,
  };
}

function mapPayloadHighlight(highlight: Highlight): HighlightDisplay | null {
  if (!highlight.isActive) {
    return null;
  }

  const { url, alt } = resolveMediaUrl(highlight.image);
  const highlightKey =
    highlight.title.toLowerCase().includes("afuera") ? "afuera-fest-2026" : String(highlight.id);
  const image = resolveHighlightImage(highlightKey, url, alt);

  return {
    id: String(highlight.id),
    title: highlight.title,
    subtitleHtml: richTextToHtml(highlight.subtitle),
    imageUrl: image.url,
    imageAlt: image.alt ?? highlight.title,
    buttonText: highlight.buttonText ?? "Mehr erfahren",
    link: highlight.link,
  };
}

function mapJsonHighlight(
  highlight: (typeof highlightsData.highlights)[number]
): HighlightDisplay {
  const imageUrl =
    "image" in highlight ? (highlight.image as string | undefined) : undefined;
  const image = resolveHighlightImage(highlight.id, imageUrl);

  return {
    id: highlight.id,
    title: highlight.title,
    subtitleHtml: richTextToHtml(highlight.subtitle, highlight.subtitle),
    imageUrl: image.url,
    imageAlt: image.alt ?? highlight.title,
    buttonText: highlight.buttonText ?? "Mehr erfahren",
    link: highlight.link,
  };
}

/** Aktive Highlights aus Payload, mit JSON-Fallback (inkl. Afuera Fest). */
export async function getActiveHighlights(): Promise<HighlightDisplay[]> {
  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: "highlights",
      where: {
        isActive: { equals: true },
      },
      sort: "-createdAt",
      limit: 10,
      depth: 1,
    });

    if (result.docs.length > 0) {
      const mapped = result.docs
        .map((doc) => mapPayloadHighlight(doc as Highlight))
        .filter((item): item is HighlightDisplay => item !== null);

      if (mapped.length > 0) {
        return mapped;
      }
    }
  } catch {
    // MongoDB nicht erreichbar – Fallback auf statische JSON-Daten
  }

  return highlightsData.highlights
    .filter((item) => item.isActive)
    .map(mapJsonHighlight);
}