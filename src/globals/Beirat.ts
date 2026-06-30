import type { GlobalConfig } from "payload";
import { ADVISORY_ICON_OPTIONS } from "@/lib/cms/advisory-icons";

/**
 * Seiteninhalt /beirat inkl. Nachruf-Sektion.
 */
export const Beirat: GlobalConfig = {
  slug: "beirat",
  label: "Beirat",
  admin: {
    group: "Beirat",
    description: "Einleitung, Aufgaben, Nachruf und Kontakt-Hinweis für die Beirat-Seite.",
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
      defaultValue: "Der Beirat",
    },
    {
      name: "pageSubtitle",
      type: "text",
      label: "Seitenuntertitel",
      defaultValue:
        "Wissenschaftliches Gremium für fundiertes Expertenwissen, strategische Einordnung und gesellschaftliche Vernetzung.",
    },
    {
      name: "intro",
      type: "textarea",
      label: "Einleitung",
      required: true,
    },
    {
      name: "tasksSectionTitle",
      type: "text",
      label: "Überschrift Aufgaben",
      defaultValue: "Zweck und Aufgaben",
    },
    {
      name: "tasks",
      type: "array",
      label: "Aufgaben-Karten",
      fields: [
        {
          name: "icon",
          type: "select",
          label: "Symbol",
          required: true,
          options: [...ADVISORY_ICON_OPTIONS],
          defaultValue: "book-open",
        },
        {
          name: "title",
          type: "text",
          label: "Titel",
          required: true,
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
      name: "membersSectionTitle",
      type: "text",
      label: "Überschrift Mitglieder",
      defaultValue: "Unser Beirat",
    },
    {
      name: "membersSectionSubtitle",
      type: "text",
      label: "Untertitel Mitglieder",
      defaultValue:
        "Vertreter aus Wissenschaft, Wirtschaft, Zivilgesellschaft und libertärem Aktivismus.",
    },
    {
      name: "nachruf",
      type: "group",
      label: "Nachruf",
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          label: "Nachruf anzeigen",
          defaultValue: true,
        },
        {
          name: "badgeLabel",
          type: "text",
          label: "Badge-Text",
          defaultValue: "Nachruf",
        },
        {
          name: "title",
          type: "text",
          label: "Titel",
          defaultValue: "In Gedenken an Dr. Antony Peter Müller",
        },
        {
          name: "subtitle",
          type: "text",
          label: "Untertitel",
          defaultValue:
            "Gestorben am 24. Mai 2026 – Ehemaliger Beirat der DIE LIBERTÄREN",
        },
        {
          name: "body",
          type: "richText",
          label: "Nachruf-Text",
          required: true,
        },
      ],
    },
    {
      name: "contactHint",
      type: "textarea",
      label: "Kontakt-Hinweis",
      defaultValue: "Fragen zum Beirat? Schreib uns an info@die-libertaeren.de.",
    },
  ],
};