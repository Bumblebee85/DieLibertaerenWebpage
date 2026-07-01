import type { CollectionConfig } from "payload";

/** Bilder und Dateien – z. B. Stammtisch-Fotos, Event-Banner, PDFs. */
export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Medium",
    plural: "Medien",
  },
  admin: {
    group: "Medien",
    description:
      "Bilder hochladen (JPG, PNG, WebP) und in Veranstaltungen, Beirat oder Programm verknüpfen.",
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "application/pdf"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 800, height: 600, position: "centre" },
      { name: "hero", width: 1920, height: 1080, position: "centre" },
    ],
    adminThumbnail: "thumbnail",
    focalPoint: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alternativtext",
      required: true,
      admin: {
        description: "Kurze Bildbeschreibung für Barrierefreiheit und SEO.",
      },
    },
    {
      name: "caption",
      type: "text",
      label: "Bildunterschrift (optional)",
      admin: {
        description: "z. B. „Libertärer Stammtisch Hamburg, Juni 2026“",
      },
    },
  ],
};