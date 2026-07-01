import type { CollectionConfig } from "payload";

export const PROMPT_TEMPLATE_KEYS = {
  DAILY_IMPULSES_SYSTEM: "daily-impulses-system",
  WEEKLY_ESSAY_SYSTEM: "weekly-essay-system",
} as const;

export type PromptTemplateKey =
  (typeof PROMPT_TEMPLATE_KEYS)[keyof typeof PROMPT_TEMPLATE_KEYS];

/**
 * Bearbeitbare Grok-System-Prompts für Content-Automatisierung.
 */
export const PromptTemplates: CollectionConfig = {
  slug: "prompt-templates",
  labels: {
    singular: "Prompt-Vorlage",
    plural: "PromptTemplates",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "active"],
    group: "Automatisierung",
    description:
      "System-Prompts für Grok-Skripte (generate:daily, generate:weekly). Slug nicht ändern, sobald verknüpft.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Bezeichnung",
      required: true,
      defaultValue: "Tagesimpulse – System-Prompt",
    },
    {
      name: "slug",
      type: "select",
      label: "Schlüssel (Slug)",
      required: true,
      unique: true,
      options: [
        {
          label: "Tagesimpulse – System-Prompt",
          value: PROMPT_TEMPLATE_KEYS.DAILY_IMPULSES_SYSTEM,
        },
        {
          label: "Wochenaufsatz – System-Prompt",
          value: PROMPT_TEMPLATE_KEYS.WEEKLY_ESSAY_SYSTEM,
        },
      ],
      defaultValue: PROMPT_TEMPLATE_KEYS.DAILY_IMPULSES_SYSTEM,
      admin: {
        description:
          "Technischer Schlüssel. Nur ein Eintrag pro Schlüssel. Nicht ändern, wenn das Skript bereits darauf verweist.",
      },
    },
    {
      name: "systemPrompt",
      type: "textarea",
      label: "System-Prompt",
      required: true,
      admin: {
        description:
          "Anweisungen an Grok (Rolle, Ton, Sprache, JSON-Ausgabe). Wird von generate:daily bzw. generate:weekly als system-Nachricht verwendet.",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Interne Notiz",
      admin: {
        description: "Optional: Hinweise für Redakteure, nicht an Grok gesendet.",
      },
    },
    {
      name: "active",
      type: "checkbox",
      label: "Aktiv",
      defaultValue: true,
      admin: {
        description:
          "Inaktive Vorlagen werden ignoriert – das Skript nutzt dann den Standard-Prompt aus dem Code.",
      },
    },
  ],
};