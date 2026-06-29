import type { CollectionConfig } from "payload";

/**
 * Thesenpapiere, Satzung und andere PDF-Dokumente.
 * Dateien werden über die Media-Collection hochgeladen.
 */
export const Documents: CollectionConfig = {
  slug: "documents",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "published"],
    group: "Inhalte",
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
      name: "slug",
      type: "text",
      label: "Slug",
      unique: true,
    },
    {
      name: "category",
      type: "select",
      label: "Kategorie",
      required: true,
      defaultValue: "thesenpapier",
      options: [
        { label: "Thesenpapier", value: "thesenpapier" },
        { label: "Satzung", value: "satzung" },
        { label: "Positionspapier", value: "positionspapier" },
        { label: "Sonstiges", value: "sonstiges" },
      ],
    },
    {
      name: "description",
      type: "textarea",
      label: "Beschreibung",
    },
    {
      name: "file",
      type: "upload",
      label: "PDF-Datei",
      relationTo: "media",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Veröffentlichungsdatum",
    },
    {
      name: "published",
      type: "checkbox",
      label: "Veröffentlicht",
      defaultValue: true,
    },
  ],
};