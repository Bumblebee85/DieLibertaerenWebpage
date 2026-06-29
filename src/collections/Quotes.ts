import type { CollectionConfig } from "payload";

/**
 * Zitat-Pool für die Rotations-Sektion auf der Startseite.
 * Erweiterbar um Mises, Rothbard, Hayek, Antony Müller u. a.
 */
export const Quotes: CollectionConfig = {
  slug: "quotes",
  admin: {
    useAsTitle: "author",
    defaultColumns: ["text", "author", "source", "published"],
    group: "Inhalte",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "text",
      type: "textarea",
      label: "Zitat",
      required: true,
    },
    {
      name: "author",
      type: "text",
      label: "Autor",
      required: true,
    },
    {
      name: "authorHandle",
      type: "text",
      label: "Handle / Kurzname",
      admin: {
        description: 'z. B. "@hummel_mathias"',
      },
    },
    {
      name: "authorUrl",
      type: "text",
      label: "Profil-URL",
    },
    {
      name: "source",
      type: "select",
      label: "Quelle",
      defaultValue: "partei",
      options: [
        { label: "DIE LIBERTÄREN", value: "partei" },
        { label: "Ludwig von Mises", value: "mises" },
        { label: "Murray Rothbard", value: "rothbard" },
        { label: "Friedrich Hayek", value: "hayek" },
        { label: "Antony Müller", value: "mueller" },
        { label: "Sonstiges", value: "sonstiges" },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Datum",
    },
    {
      name: "published",
      type: "checkbox",
      label: "Veröffentlicht",
      defaultValue: true,
    },
  ],
};