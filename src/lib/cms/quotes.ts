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

/** Oberes Limit für die Zitat-Bibliothek auf der Startseite. */
const QUOTE_FETCH_LIMIT = 500;

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
    source: "X: @hummel_mathias",
  };
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Alle veröffentlichten Zitate aus Payload, zufällig gemischt; JSON-Fallback bei DB-Ausfall. */
export async function getPublishedQuotes(): Promise<QuoteDisplay[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "quotes",
      where: { published: { equals: true } },
      limit: QUOTE_FETCH_LIMIT,
      pagination: false,
      depth: 1,
    });

    if (result.docs.length > 0) {
      return shuffle(result.docs.map((doc) => mapPayloadQuote(doc as Quote)));
    }
  } catch {
    // MongoDB nicht erreichbar – Fallback auf statische JSON-Daten
  }

  return shuffle(quotesData.quotes.map(mapJsonQuote));
}