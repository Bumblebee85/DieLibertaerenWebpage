import type { CollectionSlug, Payload } from "payload";

/** MongoDB-Dokument aus Aggregation in Payload-kompatibles Format bringen. */
export function normalizeMongoDoc<T extends object>(
  doc: Record<string, unknown>
): T {
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: _id != null ? String(_id) : String(doc.id ?? ""),
  } as T;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Zufällige veröffentlichte Dokumente per MongoDB $sample.
 * Fallback auf Payload find + Shuffle, falls Aggregation leer bleibt.
 */
export async function samplePublished<T extends object>(
  payload: Payload,
  collectionSlug: CollectionSlug,
  size: number
): Promise<T[]> {
  const model = payload.db.collections[collectionSlug];

  if (model?.aggregate) {
    try {
      const docs = await model.aggregate([
        {
          $match: {
            $or: [{ published: true }, { published: { $exists: false } }],
          },
        },
        { $sample: { size } },
      ]);

      if (docs.length > 0) {
        return (docs as Record<string, unknown>[]).map((doc) =>
          normalizeMongoDoc<T>(doc)
        );
      }
    } catch {
      // Fallback unten
    }
  }

  const result = await payload.find({
    collection: collectionSlug,
    where: { published: { equals: true } },
    limit: size,
    pagination: false,
    depth: 1,
  });

  return shuffle(result.docs as T[]);
}