import type { CollectionConfig } from "payload";
import { slugify } from "@/lib/cms/slugify";

/**
 * Libertärer Kompass – Wahlen mit Thesen, Kategorien und Positionen.
 */
export const WahlomatElections: CollectionConfig = {
  slug: "wahlomat-elections",
  labels: {
    singular: "Kompass-Einheit",
    plural: "Kompass-Einheiten",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "region", "year", "isDefault", "published"],
    group: "Libertärer Kompass",
    description:
      "Positionen zur Wahl pro Wahlereignis (z. B. Sachsen-Anhalt 2026). Eine Einheit als Standard markieren.",
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.title && !data.slug) {
          data.slug = slugify(data.title);
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Titel",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      unique: true,
      admin: {
        description: "URL-Kennung, z. B. sachsen-anhalt-2026",
      },
    },
    {
      name: "subtitle",
      type: "text",
      label: "Untertitel",
      defaultValue: "Positionen von DIE LIBERTÄREN",
    },
    {
      type: "row",
      fields: [
        {
          name: "region",
          type: "text",
          label: "Region / Bundesland",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "year",
          type: "number",
          label: "Jahr",
          required: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "source",
      type: "text",
      label: "Quelle",
      defaultValue: "Libertärer Kompass",
    },
    {
      name: "isDefault",
      type: "checkbox",
      label: "Standard-Wahl",
      defaultValue: false,
      admin: {
        description: "Wird auf der Libertärer-Kompass-Seite vorausgewählt.",
      },
    },
    {
      name: "thesen",
      type: "array",
      label: "Thesen",
      fields: [
        {
          name: "theseNumber",
          type: "number",
          label: "Nummer",
          required: true,
        },
        {
          name: "theseText",
          type: "textarea",
          label: "These",
          required: true,
        },
        {
          name: "position",
          type: "select",
          label: "Position",
          required: true,
          options: [
            { label: "Ja", value: "Ja" },
            { label: "Nein", value: "Nein" },
            { label: "Neutral", value: "Neutral" },
          ],
        },
        {
          name: "begruendung",
          type: "textarea",
          label: "Begründung",
          required: true,
        },
        {
          name: "category",
          type: "text",
          label: "Kategorie",
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