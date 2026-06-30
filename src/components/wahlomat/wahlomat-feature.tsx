"use client";

import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/shared/section";
import type { WahlomatElectionDisplay } from "@/lib/cms/wahlomat";
import { SchnellCheckQuiz } from "./schnell-check-quiz";
import { ThesenOverview } from "./thesen-overview";

type WahlomatFeatureProps = {
  election: WahlomatElectionDisplay;
  elections: WahlomatElectionDisplay[];
  onElectionChange?: (slug: string) => void;
};

export function WahlomatFeature({
  election,
  elections,
  onElectionChange,
}: WahlomatFeatureProps) {
  const [activeTab, setActiveTab] = useState("quiz");
  const overviewRef = useRef<HTMLDivElement>(null);

  const showAllThesen = () => {
    setActiveTab("thesen");
    requestAnimationFrame(() => {
      overviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="space-y-10">
      {elections.length > 1 && (
        <div className="mx-auto flex max-w-xl flex-col gap-2">
          <label htmlFor="wahlomat-election" className="text-sm font-medium text-muted-foreground">
            Wahl auswählen
          </label>
          <select
            id="wahlomat-election"
            value={election.slug}
            onChange={(e) => onElectionChange?.(e.target.value)}
            className="rounded-full border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {elections.map((item) => (
              <option key={item.id} value={item.slug}>
                {item.title} ({item.region} {item.year})
              </option>
            ))}
          </select>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">
        <TabsList className="mx-auto flex w-full max-w-md">
          <TabsTrigger value="quiz" className="flex-1">
            Schnell-Check
          </TabsTrigger>
          <TabsTrigger value="thesen" className="flex-1">
            Unsere Thesen
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quiz" className="mt-0">
          <SchnellCheckQuiz thesen={election.thesen} onShowAllThesen={showAllThesen} />
        </TabsContent>

        <TabsContent value="thesen" className="mt-0">
          <div ref={overviewRef}>
            <SectionHeader
              title="Unsere Thesen"
              subtitle={`Alle ${election.thesen.length} Positionen von DIE LIBERTÄREN zum Wahl-O-Mat ${election.region} – mit Begründung und Kategorien.`}
            />
            <ThesenOverview
              thesen={election.thesen}
              categories={election.categories}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}