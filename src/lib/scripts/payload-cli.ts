import "@/scripts/load-env";

import type { Payload } from "payload";
import {
  ensureMongoDatabaseName,
  getDatabaseHost,
  getDatabaseName,
  getDatabaseUrl,
  getPayloadEnvStatus,
} from "@/lib/payload-env";

function trimEnv(value: string | undefined): string {
  return value?.trim() ?? "";
}

/**
 * URI für CLI-Skripte: MONGODB_URI_DIRECT (Windows/ohne SRV-DNS) → MONGODB_URI → Fallback.
 */
export function getScriptDatabaseUrl(): string {
  const direct = trimEnv(process.env.MONGODB_URI_DIRECT);
  if (
    direct &&
    (direct.startsWith("mongodb://") || direct.startsWith("mongodb+srv://"))
  ) {
    return ensureMongoDatabaseName(direct);
  }

  return getDatabaseUrl();
}

/**
 * Stellt sicher, dass CLI-Skripte eine MongoDB-URI haben, bevor @payload-config geladen wird.
 */
export function assertScriptMongoEnv(): {
  host: string | null;
  dbName: string;
} {
  const scriptUrl = getScriptDatabaseUrl();
  if (scriptUrl) {
    process.env.MONGODB_URI = scriptUrl;
  }

  const status = getPayloadEnvStatus();

  if (!status.dbUrlSet) {
    console.error(
      "Keine gültige MongoDB-URI. Setze MONGODB_URI in .env.local (z. B. mongodb+srv://…/die-libertaeren)."
    );
    console.error(
      "Bei querySrv ECONNREFUSED (Windows): Atlas-Standard-URI als MONGODB_URI_DIRECT hinterlegen."
    );
    process.exit(1);
  }

  if (!status.envSources.MONGODB_URI && !status.envSources.MONGODB_URL) {
    if (scriptUrl.startsWith("mongodb")) {
      console.warn(
        "Hinweis: Skript nutzt DATABASE_URL. Für Produktion/Cron empfohlen: MONGODB_URI setzen."
      );
    }
  }

  return {
    host: getDatabaseHost(),
    dbName: getDatabaseName(),
  };
}

/** Payload-Client für CLI – lädt Config erst nach load-env (dynamischer Import). */
export async function getPayloadForScript(): Promise<Payload> {
  const { host, dbName } = assertScriptMongoEnv();
  console.log(`MongoDB: ${host} / ${dbName}`);

  const { default: config } = await import("@payload-config");
  const { getPayload } = await import("payload");
  return getPayload({ config });
}