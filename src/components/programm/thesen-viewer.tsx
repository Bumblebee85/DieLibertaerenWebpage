"use client";

import { useState, useMemo } from "react";
import { Download, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import thesenData from "@/data/thesen-v4.json";

export function ThesenViewer() {
  const [search, setSearch] = useState("");
  const [activePillar, setActivePillar] = useState("all");

  const filteredTopics = useMemo(() => {
    return thesenData.topics
      .filter((cat) => activePillar === "all" || cat.pillar === activePillar)
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            !search ||
            item.topic.toLowerCase().includes(search.toLowerCase()) ||
            item.massnahme.toLowerCase().includes(search.toLowerCase()) ||
            cat.category.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [search, activePillar]);

  return (
    <div className="space-y-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Themen und Maßnahmen durchsuchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-border bg-white py-3 pl-11 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <Button size="lg" asChild>
          <a href={thesenData.pdfUrl} download="Thesenpapier.pdf">
            <Download className="mr-2 h-4 w-4" />
            Thesenpapier als PDF
          </a>
        </Button>
      </div>

      <Tabs defaultValue="leitbild">
        <TabsList className="mb-8">
          <TabsTrigger value="leitbild">Leitbild</TabsTrigger>
          <TabsTrigger value="grundthese">Grundthese</TabsTrigger>
          <TabsTrigger value="massnahmen">Erste Maßnahmen</TabsTrigger>
          <TabsTrigger value="themen">Alle Themen</TabsTrigger>
        </TabsList>

        <TabsContent value="leitbild">
          <div className="grid gap-8 md:grid-cols-3">
            {Object.values(thesenData.leitbild).map((item) => (
              <Card key={item.title} className="border-none bg-muted/50">
                <CardHeader>
                  <Badge className="w-fit">{item.title}</Badge>
                  <CardTitle className="text-xl leading-snug">
                    {item.headline}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grundthese">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{thesenData.grundthese.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <p className="text-lg leading-relaxed">{thesenData.grundthese.text}</p>
              <div className="grid gap-6 md:grid-cols-3">
                {thesenData.grundthese.pillars.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="rounded-2xl border border-border bg-muted/30 p-6"
                  >
                    <h3 className="font-display text-lg font-bold text-primary">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium">{pillar.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="massnahmen">
          <Card>
            <CardHeader>
              <CardTitle>Erste Maßnahmen</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {thesenData.ersteMassnahmen.map((massnahme, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-secondary">
                      {i + 1}
                    </span>
                    <p className="pt-1 leading-relaxed">{massnahme}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="themen">
          <div className="mb-6 flex flex-wrap gap-2">
            {[
              { id: "all", label: "Alle" },
              { id: "individuell", label: "Individuelle Freiheit" },
              { id: "vertraglich", label: "Vertragliche Freiheit" },
              { id: "gesellschaftlich", label: "Gesellschaftliche Freiheit" },
            ].map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activePillar === pillar.id
                    ? "bg-primary text-secondary"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {pillar.label}
              </button>
            ))}
          </div>

          <Accordion type="multiple" className="space-y-4">
            {filteredTopics.map((category) => (
              <AccordionItem
                key={category.category}
                value={category.category}
                className="rounded-2xl border border-border bg-white px-6"
              >
                <AccordionTrigger className="text-xl font-semibold">
                  {category.category}
                  <Badge variant="muted" className="ml-3">
                    {category.items.length} Maßnahmen
                  </Badge>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div
                        key={item.topic}
                        className="rounded-xl bg-muted/30 p-5"
                      >
                        <h4 className="font-semibold text-foreground">
                          {item.topic}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.massnahme}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
}