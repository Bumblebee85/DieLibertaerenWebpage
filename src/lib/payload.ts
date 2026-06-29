import { getPayload, type Payload } from "payload";
import config from "@payload-config";

let cached: Promise<Payload> | null = null;

/**
 * Gemeinsame Payload-Instanz für Server Components und API-Routen.
 * Wird gecacht, damit bei mehreren Aufrufen pro Request nur eine Verbindung entsteht.
 */
export async function getPayloadClient(): Promise<Payload> {
  if (!cached) {
    cached = getPayload({ config }).catch((error) => {
      cached = null;
      throw error;
    });
  }
  return cached;
}