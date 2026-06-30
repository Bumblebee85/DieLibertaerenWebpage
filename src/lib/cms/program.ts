import thesenData from "@/data/thesen-v4.json";
import { resolveMediaUrl } from "@/lib/cms/media";
import { getPayloadClient } from "@/lib/payload";
import type { ProgramTopicCategory } from "@/payload-types";

export type LeitbildItem = {
  title: string;
  headline: string;
  text: string;
};

export type ProgramPillar = {
  id: "individuell" | "vertraglich" | "gesellschaftlich";
  title: string;
  subtitle: string;
  description: string;
};

export type ProgramTopicItem = {
  topic: string;
  massnahme: string;
};

export type ProgramTopicCategoryDisplay = {
  id: string;
  category: string;
  pillar: "individuell" | "vertraglich" | "gesellschaftlich";
  items: ProgramTopicItem[];
};

export type ProgramDisplay = {
  title: string;
  subtitle: string;
  pdfUrl: string;
  leitbild: {
    vision: LeitbildItem;
    mission: LeitbildItem;
    values: LeitbildItem;
  };
  grundthese: {
    title: string;
    text: string;
    pillars: ProgramPillar[];
  };
  ersteMassnahmen: string[];
  topics: ProgramTopicCategoryDisplay[];
};

function mapJsonProgram(): ProgramDisplay {
  const data = thesenData as Omit<ProgramDisplay, "topics"> & {
    topics: Array<{
      category: string;
      pillar: string;
      items: ProgramTopicItem[];
    }>;
  };

  return {
    ...data,
    topics: data.topics.map((topic, index) => ({
      id: `json-${index}`,
      category: topic.category,
      pillar: topic.pillar as ProgramPillar["id"],
      items: topic.items,
    })),
  };
}

const jsonProgram = mapJsonProgram();

function mapTopicCategory(doc: ProgramTopicCategory): ProgramTopicCategoryDisplay {
  return {
    id: String(doc.id),
    category: doc.category,
    pillar: doc.pillar as ProgramPillar["id"],
    items: (doc.items ?? []).map((item) => ({
      topic: item.topic,
      massnahme: item.massnahme,
    })),
  };
}

export async function getProgramContent(): Promise<ProgramDisplay> {
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: "program", depth: 1 });

    const topicsResult = await payload.find({
      collection: "program-topic-categories",
      where: { published: { equals: true } },
      sort: "sortOrder",
      limit: 100,
      pagination: false,
      depth: 0,
    });

    const pdfUrl = resolveMediaUrl(global.pdfFile).url ?? jsonProgram.pdfUrl;

    const leitbild = global.leitbild;
    const grundthese = global.grundthese;

    if (leitbild?.vision?.headline && grundthese?.text) {
      const topics =
        topicsResult.docs.length > 0
          ? topicsResult.docs.map((doc) =>
              mapTopicCategory(doc as ProgramTopicCategory)
            )
          : jsonProgram.topics;

      return {
        title: global.title ?? jsonProgram.title,
        subtitle: global.subtitle ?? jsonProgram.subtitle,
        pdfUrl,
        leitbild: {
          vision: leitbild.vision as LeitbildItem,
          mission: leitbild.mission as LeitbildItem,
          values: leitbild.values as LeitbildItem,
        },
        grundthese: {
          title: grundthese.title ?? "Grundthese",
          text: grundthese.text,
          pillars: (grundthese.pillars ?? []).map((pillar) => ({
            id: pillar.id as ProgramPillar["id"],
            title: pillar.title,
            subtitle: pillar.subtitle,
            description: pillar.description,
          })),
        },
        ersteMassnahmen:
          (global.ersteMassnahmen ?? []).length > 0
            ? (global.ersteMassnahmen ?? []).map((item) => item.text)
            : jsonProgram.ersteMassnahmen,
        topics,
      };
    }
  } catch {
    // Fallback unten
  }

  return jsonProgram;
}