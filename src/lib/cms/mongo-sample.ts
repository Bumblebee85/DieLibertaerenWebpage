import type { Payload } from "payload";

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

/**
 * Zufällige veröffentlichte Dokumente per MongoDB $sample.
 * Ist die Collection kleiner als size, liefert MongoDB alle Docs in Zufallsreihenfolge.
 */
export async function samplePublished<T extends object>(
  payload: Payload,
  collectionSlug: string,
  size: number
): Promise<T[]> {
  const model = payload.db.collections[collectionSlug];
  if (!model?.aggregate) {
    return [];
  }

  const docs = await model.aggregate([
    { $match: { published: true } },
    { $sample: { size } },
  ]);

  return (docs as Record<string, unknown>[]).map((doc) =>
    normalizeMongoDoc<T>(doc)
  );
}