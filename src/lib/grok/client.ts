const GROK_API_URL = "https://api.x.ai/v1/chat/completions";

export type GrokMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function callGrokJson<T>(options: {
  messages: GrokMessage[];
  model?: string;
  temperature?: number;
}): Promise<T> {
  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    throw new Error("GROK_API_KEY ist nicht gesetzt.");
  }

  const model = options.model ?? process.env.GROK_MODEL ?? "grok-3-mini";

  const response = await fetch(GROK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: options.temperature ?? 0.7,
      response_format: { type: "json_object" },
      messages: options.messages,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Grok API Fehler (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
  };

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Grok API lieferte keine Antwort.");
  }

  return JSON.parse(content) as T;
}