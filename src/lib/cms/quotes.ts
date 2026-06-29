import quotesData from "@/data/quotes.json";
import { resolveMediaUrl } from "@/lib/cms/media";
import { samplePublished } from "@/lib/cms/mongo-sample";
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

/** Deckt die volle Zitat-Bibliothek ab; $sample liefert bei weniger Docs alle in Zufallsreihenfolge. */
const QUOTE_SAMPLE_SIZE = 100;

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

/** Veröffentlichte Zitate zufällig aus Payload ($sample), mit JSON-Fallback. */
export async function getPublishedQuotes(): Promise<QuoteDisplay[]> {
  try {
    const payload = await getPayloadClient();
    const docs = await samplePublished<Quote>(payload, "quotes", QUOTE_SAMPLE_SIZE);

    if (docs.length > 0) {
      return docs.map(mapPayloadQuote);
    }
  } catch {
    // MongoDB nicht erreichbar – Fallback auf statische JSON-Daten
  }

  return shuffle(quotesData.quotes.map(mapJsonQuote));
}