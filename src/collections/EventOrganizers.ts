import type { CollectionConfig } from "payload";

/**
 * Veranstalter – z. B. „Die Libertären" oder lokale Gruppen.
 */
export const EventOrganizers: CollectionConfig = {
  slug: "event-organizers",
  labels: {
    singular: "Veranstalter",
    plural: "Veranstalter",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "website"],
    group: "Veranstaltungen",
    description: "Wer organisiert die Veranstaltung? Standard: Die Libertären.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
    },
    {
      name: "website",
      type: "text",
      label: "Website",
      admin: {
        description: "Optional: Webseite des Veranstalters",
      },
    },
  ],
};