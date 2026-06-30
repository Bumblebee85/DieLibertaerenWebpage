import freiheitsbewegungData from "@/data/freiheitsbewegung.json";
import { resolveMediaUrl } from "@/lib/cms/media";
import { getPayloadClient } from "@/lib/payload";

export type FreiheitsbewegungFigure = {
  id: string;
  name: string;
  years: string;
  role: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type FreiheitsbewegungCard = {
  title: string;
  paragraphs: string[];
};

export type FreiheitsbewegungHistoryParagraph = {
  icon: "book-open" | "globe";
  text: string;
};

export type FreiheitsbewegungPageDisplay = {
  pageTitle: string;
  pageSubtitle: string;
  introParagraphs: string[];
  austrianSchool: {
    title: string;
    subtitle: string;
    cardLeft: FreiheitsbewegungCard;
    cardRight: FreiheitsbewegungCard;
  };
  figuresSectionTitle: string;
  figures: FreiheitsbewegungFigure[];
  history: {
    title: string;
    subtitle: string;
    paragraphs: FreiheitsbewegungHistoryParagraph[];
    milestonesTitle: string;
    milestones: string[];
  };
};

const jsonFallback: FreiheitsbewegungPageDisplay = {
  pageTitle: freiheitsbewegungData.pageTitle,
  pageSubtitle: freiheitsbewegungData.pageSubtitle,
  introParagraphs: freiheitsbewegungData.introParagraphs,
  austrianSchool: {
    title: freiheitsbewegungData.austrianSchool.title,
    subtitle: freiheitsbewegungData.austrianSchool.subtitle,
    cardLeft: {
      title: freiheitsbewegungData.austrianSchool.cardLeft.title,
      paragraphs: freiheitsbewegungData.austrianSchool.cardLeft.paragraphs,
    },
    cardRight: {
      title: freiheitsbewegungData.austrianSchool.cardRight.title,
      paragraphs: freiheitsbewegungData.austrianSchool.cardRight.paragraphs,
    },
  },
  figuresSectionTitle: freiheitsbewegungData.figuresSectionTitle,
  figures: freiheitsbewegungData.figures.map((figure, index) => ({
    id: `json-${index}`,
    name: figure.name,
    years: figure.years,
    role: figure.role,
    imageUrl: figure.imageUrl,
    imageAlt: figure.name,
  })),
  history: {
    title: freiheitsbewegungData.history.title,
    subtitle: freiheitsbewegungData.history.subtitle,
    paragraphs: freiheitsbewegungData.history.paragraphs.map((item) => ({
      icon: item.icon as "book-open" | "globe",
      text: item.text,
    })),
    milestonesTitle: freiheitsbewegungData.history.milestonesTitle,
    milestones: freiheitsbewegungData.history.milestones,
  },
};

function mapCard(
  card: { title?: string | null; paragraphs?: Array<{ text?: string | null }> | null } | undefined,
  fallback: FreiheitsbewegungCard
): FreiheitsbewegungCard {
  if (!card?.title) return fallback;

  return {
    title: card.title,
    paragraphs:
      (card.paragraphs ?? []).length > 0
        ? (card.paragraphs ?? []).map((item) => item.text ?? "").filter(Boolean)
        : fallback.paragraphs,
  };
}

export async function getFreiheitsbewegungContent(): Promise<FreiheitsbewegungPageDisplay> {
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: "freiheitsbewegung", depth: 1 });

    if ((global?.introParagraphs ?? []).length > 0 || global?.pageTitle) {
      const austrian = global.austrianSchool;
      const history = global.history;

      return {
        pageTitle: global.pageTitle ?? jsonFallback.pageTitle,
        pageSubtitle: global.pageSubtitle ?? jsonFallback.pageSubtitle,
        introParagraphs:
          (global.introParagraphs ?? []).length > 0
            ? (global.introParagraphs ?? []).map((item) => item.text ?? "").filter(Boolean)
            : jsonFallback.introParagraphs,
        austrianSchool: {
          title: austrian?.title ?? jsonFallback.austrianSchool.title,
          subtitle: austrian?.subtitle ?? jsonFallback.austrianSchool.subtitle,
          cardLeft: mapCard(austrian?.cardLeft, jsonFallback.austrianSchool.cardLeft),
          cardRight: mapCard(austrian?.cardRight, jsonFallback.austrianSchool.cardRight),
        },
        figuresSectionTitle:
          global.figuresSectionTitle ?? jsonFallback.figuresSectionTitle,
        figures:
          (global.figures ?? []).length > 0
            ? (global.figures ?? []).map((figure, index) => {
                const { url, alt } = resolveMediaUrl(figure.photo);
                return {
                  id: `cms-${index}`,
                  name: figure.name,
                  years: figure.years,
                  role: figure.role,
                  imageUrl: url ?? figure.imageUrl ?? undefined,
                  imageAlt: alt ?? figure.name,
                };
              })
            : jsonFallback.figures,
        history: {
          title: history?.title ?? jsonFallback.history.title,
          subtitle: history?.subtitle ?? jsonFallback.history.subtitle,
          paragraphs:
            (history?.paragraphs ?? []).length > 0
              ? (history?.paragraphs ?? []).map((item) => ({
                  icon: (item.icon === "globe" ? "globe" : "book-open") as
                    | "book-open"
                    | "globe",
                  text: item.text ?? "",
                }))
              : jsonFallback.history.paragraphs,
          milestonesTitle:
            history?.milestonesTitle ?? jsonFallback.history.milestonesTitle,
          milestones:
            (history?.milestones ?? []).length > 0
              ? (history?.milestones ?? []).map((item) => item.text ?? "").filter(Boolean)
              : jsonFallback.history.milestones,
        },
      };
    }
  } catch {
    // Fallback unten
  }

  return jsonFallback;
}