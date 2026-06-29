import quotesData from "@/data/quotes.json";
import { resolveMediaUrl } from "@/lib/cms/media";
import { getPayloadClient } from "@/lib/payload";
import type { Quote } from "@/payload-types";

export type QuoteDisplay = {
  id: string;
  text: string;
  authorName: string;
  authorTitle?: string;
  authorImageUrl?: string;
  authorImageAlt?: string;
  source?: string;
};

function mapPayloadQuote(quote: Quote): QuoteDisplay {
  const { url, alt } = resolveMediaUrl(quote.authorImage);

  return {
    id: String(quote.id),
    text: quote.quoteText,
    authorName: quote.authorName,
    authorTitle: quote.authorTitle ?? undefined,
    authorImageUrl: url,
    authorImageAlt: alt ?? quote.authorName,
    source: quote.source ?? undefined,
  };
}

function mapJsonQuote(quote: (typeof quotesData.quotes)[number]): QuoteDisplay {
  return {
    id: quote.id,
    text: quote.text,
    authorName: quotesData.author,
    authorTitle: "Bundesvorsitzender DIE LIBERTÄREN",
    source: "DIE LIBERTÄREN",
  };
}

/** Veröffentlichte Zitate aus Payload, mit JSON-Fallback. */
export async function getPublishedQuotes(): Promise<QuoteDisplay[]> {
  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: "quotes",
      where: {
        published: { equals: true },
      },
      sort: "-createdAt",
      limit: 100,
      depth: 1,
    });

    if (result.docs.length > 0) {
      return (result.docs as Quote[]).map(mapPayloadQuote);
    }
  } catch {
    // MongoDB nicht erreichbar – Fallback auf statische JSON-Daten
  }

  return quotesData.quotes.map(mapJsonQuote);
}