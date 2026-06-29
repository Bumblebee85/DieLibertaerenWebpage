import type { CollectionConfig } from "payload";

/**
 * Admin-Benutzer für Chris, Manuel und weitere Redakteure.
 * Login unter /admin
 */
export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
    },
    {
      name: "role",
      type: "select",
      label: "Rolle",
      defaultValue: "editor",
      options: [
        { label: "Administrator", value: "admin" },
        { label: "Redakteur", value: "editor" },
      ],
    },
  ],
};