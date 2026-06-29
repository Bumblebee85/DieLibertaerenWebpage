import type { CollectionConfig } from "payload";
import { slugify } from "@/lib/cms/slugify";

/**
 * Aktuelle Highlights für „Aktuell bei DIE LIBERTÄREN“ auf der Startseite.
 * Nur Einträge mit isActive = true und gültigem activeUntil werden angezeigt.
 */
export const Highlights: CollectionConfig = {
  slug: "highlights",
  labels: {
    singular: "Highlight",
    plural: "Highlights",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "isActive", "activeUntil", "link"],
    group: "Startseite",
    description:
      "Aktuelle Meldungen und Kampagnen – z. B. Afuera Fest. Maximal ein bis zwei gleichzeitig aktiv halten.",
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
      admin: {
        description: "Große Überschrift im Highlight-Bereich.",
      },
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      unique: true,
      admin: {
        description:
          "Kurzname für interne Zuordnung (wird automatisch aus dem Titel erzeugt).",
      },
    },
    {
      name: "shortText",
      type: "textarea",
      label: "Kurztext",
      required: true,
      admin: {
        description: "1–3 Sätze unter der Überschrift. Plain Text, kein HTML nötig.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "date",
          type: "date",
          label: "Datum / Zeitraum (Anzeige)",
          admin: {
            width: "50%",
            description: "Wird als Info-Zeile angezeigt (z. B. Fest-Datum).",
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "dd.MM.yyyy",
            },
          },
        },
        {
          name: "activeUntil",
          type: "date",
          label: "Aktiv bis",
          admin: {
            width: "50%",
            description:
              "Optional: Highlight wird nach diesem Datum automatisch ausgeblendet.",
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "dd.MM.yyyy",
            },
          },
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      label: "Bild",
      relationTo: "media",
      admin: {
        description: "Querformat empfohlen (z. B. 1200 × 800 px).",
      },
    },
    {
      name: "link",
      type: "text",
      label: "Link (URL)",
      required: true,
      admin: {
        description: "Ziel des Buttons – intern (/events) oder extern (https://…).",
      },
      validate: (value: unknown) => {
        if (!value || typeof value !== "string") {
          return "Bitte einen Link angeben.";
        }
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
    {
      name: "isActive",
      type: "checkbox",
      label: "Auf Startseite anzeigen",
      defaultValue: false,
      admin: {
        description: "Nur aktive Highlights erscheinen unter „Aktuell bei DIE LIBERTÄREN“.",
      },
    },
  ],
};