import type { CollectionConfig } from "payload";

/**
 * Themen-Kategorien für das Programm (Tab „Alle Themen“).
 */
export const ProgramTopicCategories: CollectionConfig = {
  slug: "program-topic-categories",
  labels: {
    singular: "Themen-Kategorie",
    plural: "Themen-Kategorien",
  },
  admin: {
    useAsTitle: "category",
    defaultColumns: ["category", "pillar", "sortOrder", "published"],
    group: "Programm",
    description:
      "Kategorien mit konkreten Themen und Maßnahmen für das Thesenpapier.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "category",
      type: "text",
      label: "Kategorie",
      required: true,
    },
    {
      name: "pillar",
      type: "select",
      label: "Freiheitssäule",
      required: true,
      options: [
        { label: "Individuelle Freiheit", value: "individuell" },
        { label: "Vertragliche Freiheit", value: "vertraglich" },
        { label: "Gesellschaftliche Freiheit", value: "gesellschaftlich" },
      ],
    },
    {
      name: "sortOrder",
      type: "number",
      label: "Reihenfolge",
      defaultValue: 0,
      admin: {
        description: "Niedrigere Zahlen erscheinen zuerst.",
      },
    },
    {
      name: "items",
      type: "array",
      label: "Themen & Maßnahmen",
      fields: [
        {
          name: "topic",
          type: "text",
          label: "Thema",
          required: true,
        },
        {
          name: "massnahme",
          type: "textarea",
          label: "Maßnahme",
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