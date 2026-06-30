import beiratData from "@/data/beirat.json";
import { getAdvisoryIcon, type AdvisoryIconKey } from "@/lib/cms/advisory-icons";
import { resolveMediaUrl } from "@/lib/cms/media";
import { plainParagraphsToLexical } from "@/lib/cms/rich-text";
import { getPayloadClient } from "@/lib/payload";
import type { BeiratMember } from "@/payload-types";

export type BeiratTaskDisplay = {
  icon: AdvisoryIconKey;
  title: string;
  text: string;
};

export type BeiratMemberDisplay = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  imageAlt?: string;
  deceased: boolean;
  deceasedDate?: string;
};

export type BeiratNachrufDisplay = {
  enabled: boolean;
  badgeLabel: string;
  title: string;
  subtitle: string;
  body?: unknown;
  bodyPlain: string;
};

export type BeiratPageDisplay = {
  pageTitle: string;
  pageSubtitle: string;
  intro: string;
  tasksSectionTitle: string;
  tasks: BeiratTaskDisplay[];
  membersSectionTitle: string;
  membersSectionSubtitle: string;
  members: BeiratMemberDisplay[];
  nachruf: BeiratNachrufDisplay;
  contactHint: string;
};

const jsonNachrufBody = plainParagraphsToLexical(beiratData.nachruf.paragraphs);

const jsonFallback: BeiratPageDisplay = {
  pageTitle: beiratData.pageTitle,
  pageSubtitle: beiratData.pageSubtitle,
  intro: beiratData.intro,
  tasksSectionTitle: beiratData.tasksSectionTitle,
  tasks: beiratData.tasks.map((task) => ({
    icon: task.icon as AdvisoryIconKey,
    title: task.title,
    text: task.text,
  })),
  membersSectionTitle: beiratData.membersSectionTitle,
  membersSectionSubtitle: beiratData.membersSectionSubtitle,
  members: beiratData.members.map((member, index) => ({
    id: `json-${index}`,
    name: member.name,
    role: member.role,
    bio: member.bio,
    imageUrl: member.imageUrl,
    imageAlt: member.name,
    deceased: member.deceased,
    deceasedDate: member.deceasedDate,
  })),
  nachruf: {
    enabled: beiratData.nachruf.enabled,
    badgeLabel: beiratData.nachruf.badgeLabel,
    title: beiratData.nachruf.title,
    subtitle: beiratData.nachruf.subtitle,
    body: jsonNachrufBody,
    bodyPlain: beiratData.nachruf.paragraphs.join("\n\n"),
  },
  contactHint: beiratData.contactHint,
};

function mapMember(doc: BeiratMember): BeiratMemberDisplay {
  const { url, alt } = resolveMediaUrl(doc.photo);

  return {
    id: String(doc.id),
    name: doc.name,
    role: doc.role,
    bio: doc.bio,
    imageUrl: url ?? doc.imageUrl ?? undefined,
    imageAlt: alt ?? doc.name,
    deceased: Boolean(doc.deceased),
    deceasedDate: doc.deceasedDate ?? undefined,
  };
}

export async function getBeiratPageContent(): Promise<BeiratPageDisplay> {
  try {
    const payload = await getPayloadClient();
    const [global, membersResult] = await Promise.all([
      payload.findGlobal({ slug: "beirat", depth: 0 }),
      payload.find({
        collection: "beirat-members",
        where: { published: { equals: true } },
        sort: "sortOrder",
        limit: 50,
        pagination: false,
        depth: 1,
      }),
    ]);

    if (global?.intro) {
      const members =
        membersResult.docs.length > 0
          ? membersResult.docs.map((doc) => mapMember(doc as BeiratMember))
          : jsonFallback.members;

      const nachruf = global.nachruf;

      return {
        pageTitle: global.pageTitle ?? jsonFallback.pageTitle,
        pageSubtitle: global.pageSubtitle ?? jsonFallback.pageSubtitle,
        intro: global.intro,
        tasksSectionTitle: global.tasksSectionTitle ?? jsonFallback.tasksSectionTitle,
        tasks:
          (global.tasks ?? []).length > 0
            ? (global.tasks ?? []).map((task) => ({
                icon: (task.icon ?? "book-open") as AdvisoryIconKey,
                title: task.title,
                text: task.text,
              }))
            : jsonFallback.tasks,
        membersSectionTitle:
          global.membersSectionTitle ?? jsonFallback.membersSectionTitle,
        membersSectionSubtitle:
          global.membersSectionSubtitle ?? jsonFallback.membersSectionSubtitle,
        members,
        nachruf: {
          enabled: nachruf?.enabled ?? false,
          badgeLabel: nachruf?.badgeLabel ?? "Nachruf",
          title: nachruf?.title ?? jsonFallback.nachruf.title,
          subtitle: nachruf?.subtitle ?? jsonFallback.nachruf.subtitle,
          body: nachruf?.body ?? jsonFallback.nachruf.body,
          bodyPlain: jsonFallback.nachruf.bodyPlain,
        },
        contactHint: global.contactHint ?? jsonFallback.contactHint,
      };
    }
  } catch {
    // Fallback unten
  }

  return jsonFallback;
}

export { getAdvisoryIcon };