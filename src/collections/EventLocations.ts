import type { CollectionConfig } from "payload";
import { slugify } from "@/lib/cms/slugify";

/**
 * Veranstaltungsorte – zentral pflegen, in Events per Dropdown auswählen.
 */
export const EventLocations: CollectionConfig = {
  slug: "event-locations",
  labels: {
    singular: "Veranstaltungsort",
    plural: "Veranstaltungsorte",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "city", "postalCode"],
    group: "Veranstaltungen",
    description:
      "Orte einmal anlegen (Name, Adresse, Karte) – danach bei jeder Veranstaltung auswählen.",
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
      admin: {
        description: 'z. B. „Torschenke im Bayertor" oder „Camping Strandbad Gerlebogk"',
      },
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      unique: true,
      admin: { hidden: true },
    },
    {
      name: "address",
      type: "textarea",
      label: "Adresse",
      admin: {
        description: "Straße und Hausnummer",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "postalCode",
          type: "text",
          label: "PLZ",
          admin: { width: "33%" },
        },
        {
          name: "city",
          type: "text",
          label: "Stadt",
          admin: { width: "67%" },
        },
      ],
    },
    {
      name: "mapUrl",
      type: "text",
      label: "Kartenlink",
      admin: {
        description: "Google Maps oder OpenStreetMap URL",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "showMap",
          type: "checkbox",
          label: "Karte anzeigen",
          defaultValue: true,
          admin: { width: "50%" },
        },
        {
          name: "showMapLink",
          type: "checkbox",
          label: "Kartenlink anzeigen",
          defaultValue: true,
          admin: { width: "50%" },
        },
      ],
    },
  ],
};