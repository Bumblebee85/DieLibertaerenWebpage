import type { CollectionConfig } from "payload";

/**
 * Beiratsmitglieder – Karten auf /beirat.
 */
export const BeiratMembers: CollectionConfig = {
  slug: "beirat-members",
  labels: {
    singular: "Beiratsmitglied",
    plural: "Beiratsmitglieder",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "deceased", "sortOrder", "published"],
    group: "Beirat",
    description: "Mitglieder des Beirats – Foto, Rolle und Kurzbiografie.",
  },
  access: {
    read: () => true,
  },
  defaultSort: "sortOrder",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
    },
    {
      name: "role",
      type: "text",
      label: "Rolle",
      required: true,
      defaultValue: "Beirat",
    },
    {
      name: "bio",
      type: "textarea",
      label: "Kurzbiografie",
      required: true,
    },
    {
      name: "photo",
      type: "upload",
      label: "Foto",
      relationTo: "media",
      admin: {
        description: "Empfohlen: quadratisches Porträt. Alternativ externe Bild-URL unten.",
      },
    },
    {
      name: "imageUrl",
      type: "text",
      label: "Bild-URL (Fallback)",
      admin: {
        description: "Externe URL, wenn kein Upload in Medien vorhanden ist.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "deceased",
          type: "checkbox",
          label: "Verstorben",
          defaultValue: false,
          admin: { width: "33%" },
        },
        {
          name: "deceasedDate",
          type: "text",
          label: "Sterbedatum (Anzeige)",
          admin: {
            width: "67%",
            description: 'z. B. „24. Mai 2026"',
            condition: (_, siblingData) => Boolean(siblingData?.deceased),
          },
        },
      ],
    },
    {
      name: "sortOrder",
      type: "number",
      label: "Reihenfolge",
      defaultValue: 0,
      admin: {
        description: "Kleinere Zahl = weiter oben.",
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