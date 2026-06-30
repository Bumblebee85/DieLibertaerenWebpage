import { runGenerateDaily } from "@/lib/generate/run-daily";
import { getPayloadForScript } from "@/lib/scripts/payload-cli";
import { PARTY_ACCOUNT } from "@/lib/grok/party";

async function main() {
  const payload = await getPayloadForScript();

  console.log(`Parteikonto: ${PARTY_ACCOUNT.name} (Grok via GROK_API_KEY)`);

  const result = await runGenerateDaily(payload);

  if (result.skipped) {
    console.log(`– Bereits genug Impulse für ${result.date} vorhanden. Nichts zu tun.`);
    process.exit(0);
  }

  console.log(`Generiere ${result.created} Impulse für ${result.date} …`);
  for (const title of result.titles) {
    console.log(`✓ Impuls angelegt: ${title}`);
  }

  console.log(`\nFertig: ${result.created} Impulse für ${result.date} in Payload gespeichert.`);
  process.exit(0);
}

main().catch((error) => {
  console.error("generate:daily fehlgeschlagen:", error instanceof Error ? error.message : error);
  process.exit(1);
});