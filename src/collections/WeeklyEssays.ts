import type { CollectionConfig } from "payload";

/**
 * Aktueller libertärer Beitrag – ein Beitrag pro Kalenderwoche.
 */
export const WeeklyEssays: CollectionConfig = {
  slug: "weekly-essays",
  labels: {
    singular: "Libertärer Beitrag",
    plural: "Libertäre Beiträge",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "week", "published"],
    group: "Blog",
    description:
      "Aktueller libertärer Beitrag – wird nach Kalenderwoche auf Blog und Startseite angezeigt.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "week",
      type: "number",
      label: "Kalenderwoche (1–52)",
      required: true,
      min: 1,
      max: 52,
    },
    {
      name: "title",
      type: "text",
      label: "Titel",
      required: true,
    },
    {
      name: "author",
      type: "text",
      label: "Autor",
      defaultValue: "DIE LIBERTÄREN",
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Kurzbeschreibung",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Inhalt",
      required: true,
    },
    {
      name: "tags",
      type: "array",
      label: "Tags",
      fields: [
        {
          name: "tag",
          type: "text",
          label: "Tag",
          required: true,
        },
      ],
    },
    {
      name: "published",
      type: "checkbox",
      label: "Veröffentlicht",
      defaultValue: true,
    },
  ],
};