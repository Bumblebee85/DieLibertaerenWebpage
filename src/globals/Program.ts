import type { Field, GlobalConfig } from "payload";

/**
 * Programm-Metadaten, Leitbild, Grundthese und erste Maßnahmen.
 * Themen-Kategorien liegen in der Collection program-topic-categories.
 */
export const Program: GlobalConfig = {
  slug: "program",
  label: "Programm",
  admin: {
    group: "Programm",
    description:
      "Titel, Leitbild, Grundthese und erste Maßnahmen des Thesenpapiers.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Titel",
      required: true,
      defaultValue: "Thesenpapier",
    },
    {
      name: "subtitle",
      type: "text",
      label: "Untertitel",
      defaultValue: "FREIHEITLICH – AUS PRINZIP",
    },
    {
      name: "pdfFile",
      type: "upload",
      label: "PDF (Thesenpapier)",
      relationTo: "media",
      admin: {
        description: "Optional: PDF zum Download auf der Programm-Seite.",
      },
    },
    {
      name: "leitbild",
      type: "group",
      label: "Leitbild",
      fields: [
        {
          name: "vision",
          type: "group",
          label: "Vision",
          fields: leitbildItemFields(),
        },
        {
          name: "mission",
          type: "group",
          label: "Mission",
          fields: leitbildItemFields(),
        },
        {
          name: "values",
          type: "group",
          label: "Werte",
          fields: leitbildItemFields(),
        },
      ],
    },
    {
      name: "grundthese",
      type: "group",
      label: "Grundthese",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titel",
          defaultValue: "Grundthese",
        },
        {
          name: "text",
          type: "textarea",
          label: "Text",
          required: true,
        },
        {
          name: "pillars",
          type: "array",
          label: "Säulen",
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: "id",
              type: "select",
              label: "Säule",
              required: true,
              options: [
                { label: "Individuelle Freiheit", value: "individuell" },
                { label: "Vertragliche Freiheit", value: "vertraglich" },
                { label: "Gesellschaftliche Freiheit", value: "gesellschaftlich" },
              ],
            },
            {
              name: "title",
              type: "text",
              label: "Titel",
              required: true,
            },
            {
              name: "subtitle",
              type: "text",
              label: "Untertitel",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
              label: "Beschreibung",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "ersteMassnahmen",
      type: "array",
      label: "Erste Maßnahmen",
      fields: [
        {
          name: "text",
          type: "text",
          label: "Maßnahme",
          required: true,
        },
      ],
    },
  ],
};

function leitbildItemFields(): Field[] {
  return [
    {
      name: "title",
      type: "text",
      label: "Kategorie",
      required: true,
    },
    {
      name: "headline",
      type: "text",
      label: "Überschrift",
      required: true,
    },
    {
      name: "text",
      type: "textarea",
      label: "Text",
      required: true,
    },
  ];
}