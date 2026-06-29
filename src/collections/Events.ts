import type { CollectionConfig } from "payload";

const categoryOptions = [
  { label: "Stammtisch", value: "stammtisch" },
  { label: "Fest", value: "fest" },
  { label: "Parteitag", value: "parteitag" },
  { label: "Veranstaltung", value: "veranstaltung" },
  { label: "Workshop", value: "workshop" },
  { label: "Sonstiges", value: "sonstiges" },
] as const;

/**
 * Veranstaltungen für Startseite-Teaser und /events.
 */
export const Events: CollectionConfig = {
  slug: "events",
  labels: {
    singular: "Veranstaltung",
    plural: "Veranstaltungen",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "startDate", "location", "category", "published"],
    group: "Startseite",
    description: "Termine, Stammtische und Feste – erscheinen auf der Startseite und unter /events.",
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
      type: "row",
      fields: [
        {
          name: "startDate",
          type: "date",
          label: "Startdatum",
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
          name: "endDate",
          type: "date",
          label: "Enddatum (optional)",
          admin: {
            width: "50%",
            description: "Für mehrtägige Events. Leer lassen bei eintägigen Terminen.",
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "dd.MM.yyyy",
            },
          },
          validate: (value: unknown, { siblingData }) => {
            const startDate = (siblingData as { startDate?: string } | undefined)
              ?.startDate;
            if (!value || typeof value !== "string" || !startDate) {
              return true;
            }
            if (value < startDate) {
              return "Enddatum darf nicht vor dem Startdatum liegen.";
            }
            return true;
          },
        },
      ],
    },
    {
      name: "location",
      type: "text",
      label: "Ort",
      required: true,
      admin: {
        description: 'Stadt oder Venue, z. B. „Hamburg" oder „Camping Strandbad Gerlebogk".',
      },
    },
    {
      name: "category",
      type: "select",
      label: "Kategorie",
      required: true,
      defaultValue: "stammtisch",
      options: [...categoryOptions],
    },
    {
      name: "description",
      type: "textarea",
      label: "Beschreibung",
      admin: {
        description: "Kurze Info zum Event – optional, wird auf der Events-Seite angezeigt.",
      },
    },
    {
      name: "image",
      type: "upload",
      label: "Bild (optional)",
      relationTo: "media",
    },
    {
      name: "link",
      type: "text",
      label: "Link",
      admin: {
        description: "Optional: Anmeldung oder externe Infoseite. Standard: /events",
      },
      defaultValue: "/events",
      validate: (value: unknown) => {
        if (!value || typeof value !== "string") return true;
        if (
          value.startsWith("/") ||
          value.startsWith("http://") ||
          value.startsWith("https://")
        ) {
          return true;
        }
        return "Link muss mit /, http:// oder https:// beginnen.";
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