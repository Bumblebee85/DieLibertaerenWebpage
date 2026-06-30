import "./load-env";

const BASE =
  process.env.SEED_URL?.trim() ||
  process.env.NEXT_PUBLIC_SERVER_URL?.trim() ||
  "https://die-libertaeren-webpage.vercel.app";

const SECRET =
  process.env.SEED_SECRET?.trim() || process.env.PAYLOAD_SECRET?.trim();

const target = process.argv[2] === "weekly" ? "generate-weekly" : "generate-daily";

async function main() {
  if (!SECRET || SECRET.length < 16) {
    console.error("Set SEED_SECRET or PAYLOAD_SECRET (min. 16 chars).");
    process.exit(1);
  }

  const url = `${BASE.replace(/\/$/, "")}/${target}`;
  console.log(`POST ${url} …`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-Type": "application/json",
    },
  });

  const body = await response.text();
  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch {
    json = body;
  }

  console.log(`→ ${response.status}`);
  console.log(JSON.stringify(json, null, 2));
  process.exit(response.ok ? 0 : 1);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});