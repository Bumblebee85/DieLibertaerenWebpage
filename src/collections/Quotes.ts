import type { CollectionConfig } from "payload";

/**
 * Zitat-Pool für die Rotations-Sektion auf der Startseite.
 */
export const Quotes: CollectionConfig = {
  slug: "quotes",
  labels: {
    singular: "Zitat",
    plural: "Zitate",
  },
  admin: {
    useAsTitle: "authorName",
    defaultColumns: ["quoteText", "authorName", "authorTitle", "published"],
    group: "Startseite",
    description:
      "Zitate rotieren automatisch auf der Startseite. Mindestens ein veröffentlichtes Zitat empfohlen.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "quoteText",
      type: "textarea",
      label: "Zitat",
      required: true,
      admin: {
        description: "Der Zitat-Text in Anführungszeichen auf der Startseite.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "authorName",
          type: "text",
          label: "Autor / Autorin",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "authorTitle",
          type: "text",
          label: "Titel / Funktion",
          admin: {
            width: "50%",
            description: 'z. B. „Bundesvorsitzender DIE LIBERTÄREN"',
          },
        },
      ],
    },
    {
      name: "authorImage",
      type: "upload",
      label: "Autoren-Bild (optional)",
      relationTo: "media",
      admin: {
        description: "Optional: Porträt neben dem Zitat.",
      },
    },
    {
      name: "source",
      type: "text",
      label: "Quelle (optional)",
      admin: {
        description: "z. B. Rede, Interview, Twitter/X, Buchtitel.",
      },
    },
    {
      name: "published",
      type: "checkbox",
      label: "Veröffentlicht",
      defaultValue: true,
      admin: {
        description: "Nur veröffentlichte Zitate erscheinen in der Rotation.",
      },
    },
  ],
};