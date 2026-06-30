import "./load-env";

const BASE =
  process.env.SEED_URL?.trim() ||
  process.env.NEXT_PUBLIC_SERVER_URL?.trim() ||
  "https://die-libertaeren-webpage.vercel.app";

const SECRET =
  process.env.SEED_SECRET?.trim() || process.env.PAYLOAD_SECRET?.trim();

async function main() {
  if (!SECRET || SECRET.length < 16) {
    console.error("Set SEED_SECRET or PAYLOAD_SECRET (min. 16 chars).");
    process.exit(1);
  }

  const endpoints = [`${BASE}/seed-content`, `${BASE}/payload-health`];

  for (const url of endpoints) {
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

    console.log(`  → ${response.status}`);
    console.log(JSON.stringify(json, null, 2));

    if (response.ok) {
      process.exit(0);
    }

    if (response.status !== 404) {
      process.exit(1);
    }
  }

  console.error("All seed endpoints returned 404 – production not deployed yet.");
  process.exit(1);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});