import type { CollectionConfig } from "payload";
import { slugify } from "@/lib/cms/slugify";

const weekdayOptions = [
  { label: "Montag", value: "1" },
  { label: "Dienstag", value: "2" },
  { label: "Mittwoch", value: "3" },
  { label: "Donnerstag", value: "4" },
  { label: "Freitag", value: "5" },
  { label: "Samstag", value: "6" },
  { label: "Sonntag", value: "0" },
] as const;

const weekOfMonthOptions = [
  { label: "Erster", value: "first" },
  { label: "Zweiter", value: "second" },
  { label: "Dritter", value: "third" },
  { label: "Vierter", value: "fourth" },
  { label: "Letzter", value: "last" },
] as const;

/**
 * Veranstaltungen für Kalender, Startseite-Teaser und /events.
 */
export const Events: CollectionConfig = {
  slug: "events",
  labels: {
    singular: "Veranstaltung",
    plural: "Veranstaltungen",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "title",
      "categories",
      "startDate",
      "endDate",
      "venue",
      "recurrence",
      "published",
    ],
    group: "Veranstaltungen",
    description:
      'Termine, Stammtische und Feste. Kalender auf /events, Teaser auf der Startseite. Wiederkehrende Stammtische über „Wiederholung" einrichten.',
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
      type: "tabs",
      tabs: [
        {
          label: "Allgemein",
          description: "Titel, Beschreibung, Bild und Kategorien",
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
              label: "URL-Slug",
              unique: true,
              admin: {
                description: "Wird automatisch aus dem Titel erzeugt. Erscheint unter /events/…",
              },
            },
            {
              name: "content",
              type: "richText",
              label: "Beschreibung",
              admin: {
                description: "Ausführliche Event-Beschreibung mit Formatierung.",
              },
            },
            {
              name: "excerpt",
              type: "textarea",
              label: "Kurztext",
              admin: {
                description:
                  "Kurze Zusammenfassung für Kalender und Teaser (2–3 Sätze).",
              },
            },
            {
              name: "image",
              type: "upload",
              label: "Bild",
              relationTo: "media",
              admin: {
                description: "Event-Foto oder Banner – zuerst unter Medien hochladen.",
              },
            },
            {
              name: "categories",
              type: "relationship",
              relationTo: "event-categories",
              hasMany: true,
              label: "Kategorien",
              admin: {
                description:
                  'Mehrere Kategorien möglich, z. B. „Die Libertären" + „Libertärer Stammtisch".',
              },
            },
            {
              name: "tags",
              type: "array",
              label: "Schlagwörter",
              labels: { singular: "Schlagwort", plural: "Schlagwörter" },
              admin: {
                description: "Stichwörter durch Komma getrennt eingeben (z. B. libertarismus, Dresden).",
              },
              fields: [
                {
                  name: "tag",
                  type: "text",
                  label: "Schlagwort",
                  required: true,
                },
              ],
            },
            {
              name: "seriesName",
              type: "text",
              label: "Veranstaltungsserie",
              admin: {
                description:
                  'Optional: Name der Serie bei wiederkehrenden Events (z. B. „Libertärer Stammtisch Frankfurt").',
              },
            },
            {
              name: "published",
              type: "checkbox",
              label: "Veröffentlicht",
              defaultValue: true,
            },
            {
              name: "showQrCode",
              type: "checkbox",
              label: "QR-Code anzeigen",
              defaultValue: true,
              admin: {
                description: "QR-Code auf der Event-Detailseite zum Teilen des Termins.",
              },
            },
          ],
        },
        {
          label: "Datum & Zeit",
          description: "Start, Ende, Zeitzone und Wiederholung",
          fields: [
            {
              name: "allDay",
              type: "checkbox",
              label: "Ganztägige Veranstaltung",
              defaultValue: false,
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
                  label: "Enddatum",
                  admin: {
                    width: "50%",
                    description: "Für mehrtägige Events. Bei Einzeltagen leer lassen.",
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
              type: "row",
              fields: [
                {
                  name: "startTime",
                  type: "text",
                  label: "Startzeit",
                  admin: {
                    width: "33%",
                    description: "z. B. 19:00",
                    condition: (_, siblingData) => !siblingData?.allDay,
                  },
                },
                {
                  name: "endTime",
                  type: "text",
                  label: "Endzeit",
                  admin: {
                    width: "33%",
                    description: "z. B. 22:00",
                    condition: (_, siblingData) => !siblingData?.allDay,
                  },
                },
                {
                  name: "timezone",
                  type: "select",
                  label: "Zeitzone",
                  defaultValue: "Europe/Berlin",
                  admin: { width: "34%" },
                  options: [
                    { label: "Europe/Berlin", value: "Europe/Berlin" },
                    { label: "Europe/Vienna", value: "Europe/Vienna" },
                    { label: "Europe/Zurich", value: "Europe/Zurich" },
                  ],
                },
              ],
            },
            {
              name: "recurrence",
              type: "group",
              label: "Wiederkehrende Veranstaltung",
              admin: {
                description:
                  "Für regelmäßige Stammtische: Häufigkeit und Enddatum festlegen. Ausnahmen für einzelne abgesagte Termine unten eintragen.",
              },
              fields: [
                {
                  name: "enabled",
                  type: "checkbox",
                  label: "Wiederholung aktivieren",
                  defaultValue: false,
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "frequency",
                      type: "select",
                      label: "Häufigkeit",
                      defaultValue: "monthly",
                      admin: {
                        width: "50%",
                        condition: (_, siblingData) => siblingData?.enabled === true,
                      },
                      options: [
                        { label: "Wöchentlich", value: "weekly" },
                        { label: "Monatlich", value: "monthly" },
                        { label: "Jährlich", value: "yearly" },
                      ],
                    },
                    {
                      name: "interval",
                      type: "number",
                      label: "Intervall",
                      defaultValue: 1,
                      min: 1,
                      admin: {
                        width: "50%",
                        description: "z. B. alle 2 Wochen = Intervall 2",
                        condition: (_, siblingData) => siblingData?.enabled === true,
                      },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "weekOfMonth",
                      type: "select",
                      label: "Woche im Monat",
                      admin: {
                        width: "50%",
                        condition: (_, siblingData) =>
                          siblingData?.enabled === true &&
                          siblingData?.frequency === "monthly",
                        description: 'z. B. „Erster Mittwoch" → Erster + Mittwoch',
                      },
                      options: [...weekOfMonthOptions],
                    },
                    {
                      name: "weekday",
                      type: "select",
                      label: "Wochentag",
                      admin: {
                        width: "50%",
                        condition: (_, siblingData) =>
                          siblingData?.enabled === true &&
                          (siblingData?.frequency === "weekly" ||
                            siblingData?.frequency === "monthly"),
                      },
                      options: [...weekdayOptions],
                    },
                  ],
                },
                {
                  name: "endDate",
                  type: "date",
                  label: "Wiederholung endet am",
                  admin: {
                    description:
                      "Letzter Termin der Serie (z. B. 2031-06-02 für monatliche Stammtische).",
                    date: {
                      pickerAppearance: "dayOnly",
                      displayFormat: "dd.MM.yyyy",
                    },
                    condition: (_, siblingData) => siblingData?.enabled === true,
                  },
                },
                {
                  name: "exceptions",
                  type: "array",
                  label: "Ausnahmeregelungen",
                  labels: { singular: "Ausnahme", plural: "Ausnahmen" },
                  admin: {
                    description:
                      "Einzelne Termine auslassen (z. B. Feiertage oder Absagen).",
                    condition: (_, siblingData) => siblingData?.enabled === true,
                  },
                  fields: [
                    {
                      name: "date",
                      type: "date",
                      label: "Ausnahmedatum",
                      required: true,
                      admin: {
                        date: {
                          pickerAppearance: "dayOnly",
                          displayFormat: "dd.MM.yyyy",
                        },
                      },
                    },
                    {
                      name: "reason",
                      type: "text",
                      label: "Grund (optional)",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Ort & Details",
          description: "Veranstaltungsort, Veranstalter, Kosten und Links",
          fields: [
            {
              name: "venue",
              type: "relationship",
              relationTo: "event-locations",
              label: "Veranstaltungsort",
              admin: {
                description:
                  "Ort auswählen oder unter Veranstaltungsorte neu anlegen. Bei Online-Events leer lassen.",
              },
            },
            {
              name: "locationLabel",
              type: "text",
              label: "Ort (Freitext)",
              admin: {
                description:
                  'Anzeigename wenn kein Veranstaltungsort gewählt, z. B. „Online" oder „Hamburg".',
              },
            },
            {
              name: "isVirtual",
              type: "checkbox",
              label: "Virtuelle Veranstaltung",
              defaultValue: false,
            },
            {
              name: "virtualUrl",
              type: "text",
              label: "Link zur Online-Veranstaltung",
              admin: {
                condition: (_, siblingData) => siblingData?.isVirtual === true,
                description: "Zoom-, Jitsi- oder YouTube-Link",
              },
            },
            {
              name: "organizers",
              type: "relationship",
              relationTo: "event-organizers",
              hasMany: true,
              label: "Veranstalter",
            },
            {
              name: "website",
              type: "text",
              label: "Veranstaltungs-Website",
              admin: {
                description: "Externe Infoseite oder Anmeldung",
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "admissionFee",
                  type: "text",
                  label: "Eintritt",
                  admin: {
                    width: "50%",
                    description: "0 oder leer = kostenlos / Feld ausblenden",
                  },
                },
                {
                  name: "admissionCurrency",
                  type: "text",
                  label: "Währung",
                  defaultValue: "EUR",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "link",
              type: "text",
              label: "Zusätzlicher Link",
              admin: {
                description: "Optional: Anmeldung oder externe Seite. Standard: Event-Detailseite",
              },
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
          ],
        },
      ],
    },
  ],
};