import { runGenerateWeekly } from "@/lib/generate/run-weekly";
import { getPayloadForScript } from "@/lib/scripts/payload-cli";
import { PARTY_ACCOUNT } from "@/lib/grok/party";

async function main() {
  const payload = await getPayloadForScript();

  console.log(`Parteikonto: ${PARTY_ACCOUNT.name} (Grok via GROK_API_KEY)`);
  console.log("Generiere aktuellen libertären Beitrag …");

  const result = await runGenerateWeekly(payload);

  if (result.skipped) {
    console.log(
      `– Libertärer Beitrag für KW ${result.weekNumber} („${result.slug}“) existiert bereits. Nichts zu tun.`
    );
    process.exit(0);
  }

  if (result.createdEssay) {
    console.log(`✓ Libertärer Beitrag angelegt: ${result.title} (KW ${result.weekNumber})`);
  }
  if (result.createdPost) {
    console.log(`✓ Blog-Post angelegt: ${result.title} (/blog/${result.slug})`);
  }

  process.exit(0);
}

main().catch((error) => {
  console.error("generate:weekly fehlgeschlagen:", error instanceof Error ? error.message : error);
  process.exit(1);
});