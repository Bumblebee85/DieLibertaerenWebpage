import type { CollectionConfig } from "payload";

/**
 * Tagesaktuelle libertäre Impulse für die Startseite.
 */
export const DailyImpulses: CollectionConfig = {
  slug: "daily-impulses",
  labels: {
    singular: "Tagesimpuls",
    plural: "Tagesimpulse",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "published"],
    group: "Startseite",
    description:
      "Kurze News mit libertärer Einordnung. Die 3 neuesten veröffentlichten Impulse erscheinen auf der Startseite.",
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
    },
    {
      name: "shortText",
      type: "textarea",
      label: "Kurztext",
      required: true,
      admin: {
        description: "Kurze Zusammenfassung der Meldung (2–4 Sätze).",
      },
    },
    {
      name: "libertarianPerspective",
      type: "textarea",
      label: "Libertäre Einordnung",
      required: true,
      admin: {
        description:
          "Warum ist das für Libertäre relevant? Freiheitliche Perspektive in 1–3 Sätzen.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "date",
          type: "date",
          label: "Datum",
          required: true,
          admin: {
            width: "50%",
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "dd.MM.yyyy",
            },
          },
        },
        {
          name: "sourceLink",
          type: "text",
          label: "Quell-Link (optional)",
          admin: {
            width: "50%",
            description: "Link zur Originalquelle oder zum Blog-Artikel.",
          },
          validate: (value: unknown) => {
            if (!value || typeof value !== "string") return true;
            if (
              value.startsWith("/") ||
              value.startsWith("http://") ||
              value.startsWith("https://")
            ) {
              return true;
            }
            return "Link muss mit /, http:// oder https:// beginnen.";
          },
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