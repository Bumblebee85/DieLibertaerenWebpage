import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";

/** Mehrere Absätze in Lexical-Struktur für Payload-Seeds umwandeln. */
export function plainParagraphsToLexical(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "" as const,
        indent: 0,
        version: 1,
        children: [
          {
            type: "text",
            format: 0,
            detail: 0,
            mode: "normal",
            style: "",
            text,
            version: 1,
          },
        ],
        direction: "ltr" as const,
      })),
      direction: "ltr" as const,
    },
  };
}

/** Einfachen Text in Lexical-Struktur für Payload-Seeds umwandeln. */
export function plainTextToLexical(text: string) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: "paragraph",
          format: "" as const,
          indent: 0,
          version: 1,
          children: [
            {
              type: "text",
              format: 0,
              detail: 0,
              mode: "normal",
              style: "",
              text,
              version: 1,
            },
          ],
          direction: "ltr" as const,
        },
      ],
      direction: "ltr" as const,
    },
  };
}

/** Rich Text aus Payload oder Plain-Text-Fallback als HTML rendern. */
export function richTextToHtml(
  value: unknown,
  plainFallback?: string
): string {
  if (value && typeof value === "object" && "root" in (value as object)) {
    return convertLexicalToHTML({ data: value as Parameters<typeof convertLexicalToHTML>[0]["data"] });
  }

  if (typeof value === "string" && value.length > 0) {
    return `<p>${value}</p>`;
  }

  if (plainFallback) {
    return `<p>${plainFallback}</p>`;
  }

  return "";
}