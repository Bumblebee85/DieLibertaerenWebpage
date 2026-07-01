import type { GlobalConfig } from "payload";

/**
 * Hero-Bereich der Startseite – vollständig im CMS editierbar.
 */
export const Hero: GlobalConfig = {
  slug: "hero",
  label: "Hero (Startseite)",
  admin: {
    group: "Startseite",
    description:
      "Überschrift, goldener Akzent und Fließtext im oberen Bereich der Startseite.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Kleine Überschrift (über dem Titel)",
      defaultValue: "Willkommen bei DIE LIBERTÄREN",
    },
    {
      name: "headline",
      type: "text",
      label: "Haupttitel",
      required: true,
      defaultValue: "DIE LIBERTÄREN",
    },
    {
      name: "headlineAccent",
      type: "text",
      label: "Gold-Akzent (unter dem Titel)",
      defaultValue: "Deutschlands konsequenteste libertäre Stimme",
      admin: {
        description:
          "Einzige Unterzeile im Hero – gold hervorgehoben. Leer lassen, um nur den Haupttitel zu zeigen.",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Haupttext",
      required: true,
      defaultValue:
        "Deutschlands konsequenteste Stimme für Libertarismus, Eigentum und freien Markt: Wir stehen für individuelle Freiheit, drastische Zurückdrängung des Staates und das Nichtaggressionsprinzip – ehrlich und kompromisslos.",
    },
    {
      name: "primaryCta",
      type: "group",
      label: "Primärer Button",
      fields: ctaFields("Unsere Prinzipien", "/unsere-prinzipien"),
    },
    {
      name: "secondaryCta",
      type: "group",
      label: "Sekundärer Button",
      fields: ctaFields("Thesenpapier", "/programm"),
    },
  ],
};

function ctaFields(defaultLabel: string, defaultHref: string) {
  return [
    {
      name: "label",
      type: "text" as const,
      label: "Beschriftung",
      defaultValue: defaultLabel,
      required: true,
    },
    {
      name: "href",
      type: "text" as const,
      label: "Link",
      defaultValue: defaultHref,
      required: true,
    },
  ];
}