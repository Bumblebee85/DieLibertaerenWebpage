import quotesData from "@/data/quotes.json";
import { getPayloadClient } from "@/lib/payload";
import type { Quote } from "@/payload-types";

export type QuoteDisplay = {
  id: string;
  text: string;
  author: string;
  authorHandle?: string;
  authorUrl?: string;
  date?: string;
};

function mapPayloadQuote(quote: Quote): QuoteDisplay {
  return {
    id: String(quote.id),
    text: quote.text,
    author: quote.author,
    authorHandle: quote.authorHandle ?? undefined,
    authorUrl: quote.authorUrl ?? undefined,
    date: quote.publishedAt ?? undefined,
  };
}

function mapJsonQuote(quote: (typeof quotesData.quotes)[number]): QuoteDisplay {
  return {
    id: quote.id,
    text: quote.text,
    author: quotesData.author,
    authorHandle: quotesData.handle,
    authorUrl: quotesData.profileUrl,
    date: quote.date,
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
      sort: "-publishedAt",
      limit: 100,
    });

    if (result.docs.length > 0) {
      return result.docs.map(mapPayloadQuote);
    }
  } catch {
    // MongoDB nicht erreichbar – Fallback auf statische JSON-Daten
  }

  return quotesData.quotes.map(mapJsonQuote);
}