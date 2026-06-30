import type { CollectionConfig } from "payload";
import { slugify } from "@/lib/cms/slugify";

/**
 * Blog-Kategorien für Filter auf der Blog-Seite.
 */
export const BlogCategories: CollectionConfig = {
  slug: "blog-categories",
  labels: {
    singular: "Blog-Kategorie",
    plural: "Blog-Kategorien",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug"],
    group: "Blog",
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