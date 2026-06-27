"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  categories,
  getPositionColor,
  getPositionLabel,
  thesen,
  type PartyPosition,
} from "@/lib/wahlomat";

const positionFilters: Array<PartyPosition | "all"> = [
  "all",
  "Ja",
  "Neutral",
  "Nein",
];

export function ThesenOverview() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePosition, setActivePosition] = useState<PartyPosition | "all">(
    "all"
  );

  const filteredByCategory = useMemo(() => {
    const query = search.toLowerCase().trim();

    return categories
      .filter((category) => activeCategory === "all" || category === activeCategory)
      .map((category) => ({
        category,
        items: thesen.filter((these) => {
          if (these.category !== category) return false;
          if (activePosition !== "all" && these.position !== activePosition) {
            return false;
          }
          if (!query) return true;

          return (
            these.these.toLowerCase().includes(query) ||
            these.begruendung.toLowerCase().includes(query) ||
            String(these.id).includes(query)
          );
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [search, activeCategory, activePosition]);

  const totalVisible = filteredByCategory.reduce(
    (sum, group) => sum + group.items.length,
    0
  );

  return (
    <div className="space-y-8">
      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Thesen durchsuchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-border bg-white py-3 pl-11 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === "all"
                ? "bg-primary text-secondary"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Alle Kategorien
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-secondary"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {positionFilters.map((position) => (
            <button
              key={position}
              onClick={() => setActivePosition(position)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                activePosition === position
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-white text-muted-foreground hover:border-primary/40"
              }`}
            >
              {position === "all" ? "Alle Positionen" : getPositionLabel(position)}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {totalVisible} von {thesen.length} Thesen angezeigt
      </p>

      <Accordion type="multiple" className="space-y-4">
        {filteredByCategory.map((group) => (
          <AccordionItem
            key={group.category}
            value={group.category}
            className="rounded-2xl border border-border bg-white px-6"
          >
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">
              <span className="flex items-center gap-3">
                {group.category}
                <Badge variant="muted">{group.items.length}</Badge>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {group.items.map((these) => (
                  <article
                    key={these.id}
                    className="rounded-xl border border-border/60 bg-muted/20 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        These {these.id}
                      </span>
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getPositionColor(these.position)}`}
                      >
                        {these.position}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold leading-snug text-foreground">
                      {these.these}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Unsere Begründung:{" "}
                      </span>
                      {these.begruendung}
                    </p>
                  </article>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {totalVisible === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
          <p className="text-muted-foreground">
            Keine Thesen gefunden. Passe deine Filter oder Suche an.
          </p>
        </div>
      )}
    </div>
  );
}