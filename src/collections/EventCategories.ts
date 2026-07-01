import type { CollectionConfig } from "payload";
import { slugify } from "@/lib/cms/slugify";

/**
 * Kategorien für Veranstaltungen (z. B. Stammtisch, Online, Parteitag).
 */
export const EventCategories: CollectionConfig = {
  slug: "event-categories",
  labels: {
    singular: "Veranstaltungs-Kategorie",
    plural: "Veranstaltungs-Kategorien",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug"],
    group: "Veranstaltungen",
    description:
      'Kategorien wie „Libertärer Stammtisch" oder „Online" – mehrere pro Event möglich.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.name && !data.slug) {
          data.slug = slugify(data.name);
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      unique: true,
    },
  ],
};