import type { Payload } from "payload";
import {
  PROMPT_TEMPLATE_KEYS,
  type PromptTemplateKey,
} from "@/collections/PromptTemplates";
import {
  PARTY_DAILY_SYSTEM_PROMPT,
  PARTY_WEEKLY_SYSTEM_PROMPT,
} from "@/lib/grok/party";

export { PROMPT_TEMPLATE_KEYS };

export async function getSystemPromptForTemplate(
  payload: Payload,
  key: PromptTemplateKey,
  fallback: string
): Promise<string> {
  try {
    const result = await payload.find({
      collection: "prompt-templates",
      where: {
        and: [{ slug: { equals: key } }, { active: { equals: true } }],
      },
      limit: 1,
      pagination: false,
      depth: 0,
    });

    const prompt = result.docs[0]?.systemPrompt?.trim();
    if (prompt) return prompt;
  } catch {
    // Fallback unten
  }

  return fallback;
}

export async function getDailyImpulsesSystemPrompt(
  payload: Payload
): Promise<string> {
  return getSystemPromptForTemplate(
    payload,
    PROMPT_TEMPLATE_KEYS.DAILY_IMPULSES_SYSTEM,
    PARTY_DAILY_SYSTEM_PROMPT
  );
}

export async function getWeeklyEssaySystemPrompt(
  payload: Payload
): Promise<string> {
  return getSystemPromptForTemplate(
    payload,
    PROMPT_TEMPLATE_KEYS.WEEKLY_ESSAY_SYSTEM,
    PARTY_WEEKLY_SYSTEM_PROMPT
  );
}