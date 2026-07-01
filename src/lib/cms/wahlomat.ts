import wahlomatData from "@/data/wahlomat-thesen.json";
import { getPayloadClient } from "@/lib/payload";
import type { WahlomatElection } from "@/payload-types";
import type { PartyPosition, These } from "@/lib/wahlomat";

export type WahlomatElectionDisplay = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  region: string;
  year: number;
  source: string;
  thesen: These[];
  categories: string[];
};

function mapJsonElection(): WahlomatElectionDisplay {
  const thesen = wahlomatData.thesen as These[];
  return {
    id: "json-fallback",
    slug: "sachsen-anhalt-2026",
    title: wahlomatData.title,
    subtitle: wahlomatData.subtitle,
    region: wahlomatData.region,
    year: 2026,
    source: wahlomatData.source,
    thesen,
    categories: Array.from(new Set(thesen.map((t) => t.category))).sort(),
  };
}

function mapElection(doc: WahlomatElection): WahlomatElectionDisplay {
  const thesen: These[] = (doc.thesen ?? [])
    .map((item) => ({
      id: item.theseNumber,
      these: item.theseText,
      position: item.position as PartyPosition,
      begruendung: item.begruendung,
      category: item.category,
    }))
    .sort((a, b) => a.id - b.id);

  return {
    id: String(doc.id),
    slug: doc.slug ?? String(doc.id),
    title: doc.title,
    subtitle: doc.subtitle ?? "Positionen von DIE LIBERTÄREN",
    region: doc.region,
    year: doc.year,
    source: doc.source ?? "Libertärer Kompass",
    thesen,
    categories: Array.from(new Set(thesen.map((t) => t.category))).sort(),
  };
}

export async function getPublishedWahlomatElections(): Promise<
  WahlomatElectionDisplay[]
> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "wahlomat-elections",
      where: { published: { equals: true } },
      sort: "-year",
      limit: 50,
      pagination: false,
      depth: 0,
    });

    if (result.docs.length > 0) {
      return result.docs.map((doc) => mapElection(doc as WahlomatElection));
    }
  } catch {
    // Fallback unten
  }

  return [mapJsonElection()];
}

export async function getWahlomatElectionBySlug(
  slug?: string
): Promise<WahlomatElectionDisplay> {
  const elections = await getPublishedWahlomatElections();

  if (slug) {
    const match = elections.find((e) => e.slug === slug);
    if (match) return match;
  }

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "wahlomat-elections",
      where: {
        and: [{ published: { equals: true } }, { isDefault: { equals: true } }],
      },
      limit: 1,
      depth: 0,
    });
    if (result.docs[0]) {
      return mapElection(result.docs[0] as WahlomatElection);
    }
  } catch {
    // Fallback unten
  }

  return elections[0] ?? mapJsonElection();
}