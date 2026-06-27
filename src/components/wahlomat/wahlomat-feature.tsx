"use client";

import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/shared/section";
import { SchnellCheckQuiz } from "./schnell-check-quiz";
import { ThesenOverview } from "./thesen-overview";

export function WahlomatFeature() {
  const [activeTab, setActiveTab] = useState("quiz");
  const overviewRef = useRef<HTMLDivElement>(null);

  const showAllThesen = () => {
    setActiveTab("thesen");
    requestAnimationFrame(() => {
      overviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
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
        <SchnellCheckQuiz onShowAllThesen={showAllThesen} />
      </TabsContent>

      <TabsContent value="thesen" className="mt-0">
        <div ref={overviewRef}>
          <SectionHeader
            title="Unsere Thesen"
            subtitle="Alle 80 Positionen von DIE LIBERTÄREN zum Wahl-O-Mat Sachsen-Anhalt – mit Begründung und Kategorien."
          />
          <ThesenOverview />
        </div>
      </TabsContent>
    </Tabs>
  );
}