import type { CollectionConfig } from "payload";

/**
 * Veranstaltungen, Stammtische und Parteitage.
 * Wird auf der Startseite und unter /events angezeigt.
 */
export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "location", "type", "published"],
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
      admin: {
        description: "URL-freundlicher Name (optional, wird aus dem Titel abgeleitet).",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "date",
          type: "date",
          label: "Datum",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "time",
          type: "text",
          label: "Uhrzeit",
          admin: {
            width: "50%",
            description: 'z. B. "19:00 - 22:00"',
          },
        },
      ],
    },
    {
      name: "location",
      type: "text",
      label: "Ort",
      required: true,
    },
    {
      name: "type",
      type: "select",
      label: "Art",
      required: true,
      defaultValue: "stammtisch",
      options: [
        { label: "Stammtisch", value: "stammtisch" },
        { label: "Parteitag", value: "parteitag" },
        { label: "Veranstaltung", value: "veranstaltung" },
        { label: "Sonstiges", value: "sonstiges" },
      ],
    },
    {
      name: "series",
      type: "text",
      label: "Serie",
      admin: {
        description: "Optional: Name einer Veranstaltungsreihe.",
      },
    },
    {
      name: "recurring",
      type: "checkbox",
      label: "Wiederkehrend",
      defaultValue: false,
    },
    {
      name: "recurrence",
      type: "text",
      label: "Wiederholung",
      admin: {
        condition: (_, siblingData) => siblingData?.recurring === true,
        description: 'z. B. "Jeden ersten Mittwoch im Monat"',
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Beschreibung",
    },
    {
      name: "externalUrl",
      type: "text",
      label: "Externe URL",
      admin: {
        description: "Optionaler Link zu weiteren Infos oder Anmeldung.",
      },
    },
    {
      name: "published",
      type: "checkbox",
      label: "Veröffentlicht",
      defaultValue: true,
    },
  ],
};