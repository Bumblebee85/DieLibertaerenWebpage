import type { CollectionConfig } from "payload";

/** Uploads für Bilder und Dateien (z. B. PDF-Vorschauen). */
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "application/pdf"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alternativtext",
      required: true,
    },
  ],
};