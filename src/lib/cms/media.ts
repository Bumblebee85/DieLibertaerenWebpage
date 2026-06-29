import type { Media } from "@/payload-types";

/** Medien-URL und Alt-Text aus einem Payload-Upload-Feld auflösen. */
export function resolveMediaUrl(
  image: string | number | Media | null | undefined
): { url?: string; alt?: string } {
  if (!image || typeof image === "string" || typeof image === "number") {
    return {};
  }

  return {
    url: image.url ?? undefined,
    alt: image.alt ?? undefined,
  };
}