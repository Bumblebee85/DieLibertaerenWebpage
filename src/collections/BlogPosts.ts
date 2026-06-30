import type { CollectionConfig } from "payload";
import { slugify } from "@/lib/cms/slugify";

/**
 * Blog-Artikel mit Rich Text und Kategorie.
 */
export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  labels: {
    singular: "Blog-Artikel",
    plural: "Blog-Artikel",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "category", "published"],
    group: "Blog",
    description: "Vollständige Blog-Artikel mit Rich Text.",
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
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      unique: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Kurzbeschreibung",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Inhalt",
      required: true,
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
          name: "author",
          type: "text",
          label: "Autor",
          defaultValue: "DIE LIBERTÄREN",
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "featuredImage",
      type: "upload",
      label: "Beitragsbild",
      relationTo: "media",
    },
    {
      name: "category",
      type: "relationship",
      label: "Kategorie",
      relationTo: "blog-categories",
      required: true,
    },
    {
      name: "tags",
      type: "array",
      label: "Tags",
      fields: [
        {
          name: "tag",
          type: "text",
          label: "Tag",
          required: true,
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