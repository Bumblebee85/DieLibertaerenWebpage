import type { CollectionConfig } from "payload";

/**
 * Aktuelle Highlights für die Startseite („Aktuell bei DIE LIBERTÄREN“).
 * Nur Einträge mit isActive = true werden angezeigt.
 */
export const Highlights: CollectionConfig = {
  slug: "highlights",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "isActive", "link"],
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
      name: "subtitle",
      type: "richText",
      label: "Untertitel",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      label: "Bild",
      relationTo: "media",
    },
    {
      name: "buttonText",
      type: "text",
      label: "Button-Text",
    },
    {
      name: "link",
      type: "text",
      label: "Link (URL)",
      required: true,
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Aktiv (auf Startseite anzeigen)",
      defaultValue: false,
    },
  ],
};