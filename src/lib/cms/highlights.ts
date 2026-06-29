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

  return {
    id: String(highlight.id),
    title: highlight.title,
    subtitleHtml: richTextToHtml(highlight.subtitle),
    imageUrl: url,
    imageAlt: alt,
    buttonText: highlight.buttonText ?? "Mehr erfahren",
    link: highlight.link,
  };
}

function mapJsonHighlight(
  highlight: (typeof highlightsData.highlights)[number]
): HighlightDisplay {
  return {
    id: highlight.id,
    title: highlight.title,
    subtitleHtml: richTextToHtml(highlight.subtitle, highlight.subtitle),
    imageUrl: "image" in highlight ? (highlight.image as string | undefined) : undefined,
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