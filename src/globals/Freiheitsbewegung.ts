import type { GlobalConfig } from "payload";

/**
 * Vollständiger Seiteninhalt /freiheitsbewegung.
 */
export const Freiheitsbewegung: GlobalConfig = {
  slug: "freiheitsbewegung",
  label: "Freiheitsbewegung",
  admin: {
    group: "Freiheitsbewegung",
    description: "Geschichte, Österreichische Schule und Meilensteine.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "pageTitle",
      type: "text",
      label: "Seitentitel",
      required: true,
      defaultValue: "Freiheitsbewegung",
    },
    {
      name: "pageSubtitle",
      type: "text",
      label: "Seitenuntertitel",
      defaultValue:
        "Von der Aufklärung bis zur Österreichischen Schule – Libertarismus als Fortsetzung des Freiheitskampfes gegen Herrschaft und Tyrannei.",
    },
    {
      name: "introParagraphs",
      type: "array",
      label: "Einleitung (Absätze)",
      fields: [
        {
          name: "text",
          type: "textarea",
          label: "Absatz",
          required: true,
        },
      ],
    },
    {
      name: "austrianSchool",
      type: "group",
      label: "Österreichische Schule",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Überschrift",
          defaultValue: "Die Österreichische Schule",
        },
        {
          name: "subtitle",
          type: "text",
          label: "Untertitel",
        },
        {
          name: "cardLeft",
          type: "group",
          label: "Linke Karte",
          fields: cardFields("Österreicher und Libertäre"),
        },
        {
          name: "cardRight",
          type: "group",
          label: "Rechte Karte",
          fields: cardFields("Antagonist des Sozialismus"),
        },
      ],
    },
    {
      name: "figuresSectionTitle",
      type: "text",
      label: "Überschrift Persönlichkeiten",
      defaultValue: "Die Begründer der Österreichischen Schule",
    },
    {
      name: "figures",
      type: "array",
      label: "Persönlichkeiten",
      fields: [
        {
          name: "name",
          type: "text",
          label: "Name",
          required: true,
        },
        {
          name: "years",
          type: "text",
          label: "Lebensdaten",
          required: true,
        },
        {
          name: "role",
          type: "text",
          label: "Rolle / Beschreibung",
          required: true,
        },
        {
          name: "photo",
          type: "upload",
          label: "Foto",
          relationTo: "media",
        },
        {
          name: "imageUrl",
          type: "text",
          label: "Bild-URL (Fallback)",
        },
      ],
    },
    {
      name: "history",
      type: "group",
      label: "Geschichte",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Überschrift",
          defaultValue: "Geschichte des Libertarismus",
        },
        {
          name: "subtitle",
          type: "text",
          label: "Untertitel",
        },
        {
          name: "paragraphs",
          type: "array",
          label: "Absätze (mit Symbol)",
          fields: [
            {
              name: "icon",
              type: "select",
              label: "Symbol",
              options: [
                { label: "Buch", value: "book-open" },
                { label: "Globus", value: "globe" },
              ],
              defaultValue: "book-open",
            },
            {
              name: "text",
              type: "textarea",
              label: "Text",
              required: true,
            },
          ],
        },
        {
          name: "milestonesTitle",
          type: "text",
          label: "Meilenstein-Karten-Titel",
          defaultValue: "Meilensteine des Freiheitskampfes",
        },
        {
          name: "milestones",
          type: "array",
          label: "Meilensteine",
          fields: [
            {
              name: "text",
              type: "text",
              label: "Eintrag",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

function cardFields(defaultTitle: string) {
  return [
    {
      name: "title",
      type: "text" as const,
      label: "Titel",
      defaultValue: defaultTitle,
      required: true,
    },
    {
      name: "paragraphs",
      type: "array" as const,
      label: "Absätze",
      fields: [
        {
          name: "text",
          type: "textarea" as const,
          label: "Absatz",
          required: true,
        },
      ],
    },
  ];
}