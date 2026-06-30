import {
  BookOpen,
  LineChart,
  Megaphone,
  Search,
  Users,
  UserSearch,
  type LucideIcon,
} from "lucide-react";

export const ADVISORY_ICON_OPTIONS = [
  { label: "Buch / Wissen", value: "book-open" },
  { label: "Strategie / Chart", value: "line-chart" },
  { label: "Megafon / PR", value: "megaphone" },
  { label: "Analyse / Suche", value: "search" },
  { label: "Talente", value: "user-search" },
  { label: "Gruppen / Vernetzung", value: "users" },
] as const;

export type AdvisoryIconKey = (typeof ADVISORY_ICON_OPTIONS)[number]["value"];

const iconMap: Record<AdvisoryIconKey, LucideIcon> = {
  "book-open": BookOpen,
  "line-chart": LineChart,
  megaphone: Megaphone,
  search: Search,
  "user-search": UserSearch,
  users: Users,
};

export function getAdvisoryIcon(key: string | null | undefined): LucideIcon {
  if (key && key in iconMap) {
    return iconMap[key as AdvisoryIconKey];
  }
  return BookOpen;
}