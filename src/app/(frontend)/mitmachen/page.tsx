import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, Calendar, MessageCircle } from "lucide-react";
import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata(seoPages.mitmachen);

const options = [
  {
    icon: Users,
    title: "Werde Mitglied",
    text: "Werde Teil der konsequentesten Stimme für Freiheit in Deutschland.",
    href: "/werde-mitglied",
    cta: "Mitglied werden",
  },
  {
    icon: Heart,
    title: "Spende",
    text: "Unterstütze unsere Arbeit für mehr Freiheit mit einer Spende.",
    href: "/spenden",
    cta: "Jetzt spenden",
  },
  {
    icon: Calendar,
    title: "Veranstaltungen",
    text: "Triff uns auf Stammtischen und Events in ganz Deutschland.",
    href: "/events",
    cta: "Zu den Terminen",
  },
  {
    icon: MessageCircle,
    title: "Vernetze dich",
    text: "Werde Teil des libertären Netzwerks in Wissenschaft und Zivilgesellschaft.",
    href: "/netzwerk",
    cta: "Zum Netzwerk",
  },
];

export default function MitmachenPage() {
  return (
    <>
      <PageHeader
        title="Mitmachen"
        subtitle="Gemeinsam lassen wir die Freiheit wieder erblühen. Es gibt viele Wege, sich zu engagieren."
      />

      <Section>
        <div className="grid gap-8 sm:grid-cols-2">
          {options.map((option) => (
            <Card key={option.title}>
              <CardHeader>
                <option.icon className="h-10 w-10 text-primary" />
                <CardTitle>{option.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-muted-foreground">{option.text}</p>
                <Button asChild>
                  <Link href={option.href}>{option.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}