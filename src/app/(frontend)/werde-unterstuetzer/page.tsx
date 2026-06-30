import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CopyAddressButton } from "@/components/donation/copy-address-button";
import { CTASection } from "@/components/shared/cta-section";
import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeader } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { donationInfo } from "@/data/donation";
import { seoPages } from "@/data/seo-pages";
import { createPageMetadata } from "@/lib/seo/metadata";
import { Banknote, Bitcoin, ExternalLink, Heart, ShieldCheck } from "lucide-react";

export const metadata: Metadata = createPageMetadata(seoPages.unterstuetzer);

export default function WerdeUnterstuetzerPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Unterstützer werden" }]} />
      <PageHeader
        title="Investiere in deine Freiheit"
        subtitle="Wir lehnen staatliche Parteienfinanzierung ab – deshalb brauchen wir deine freiwillige Unterstützung für Aufklärung, Veranstaltungen und den politischen Kampf um Freiheit."
      />

      <Section>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "Aus Prinzip",
              text: "Keine staatliche Finanzierung – nur freiwillige Unterstützung für echte Freiheitsarbeit.",
            },
            {
              icon: ShieldCheck,
              title: "Steuerlich absetzbar",
              text: donationInfo.taxNote,
            },
            {
              icon: Banknote,
              title: "Jeder Beitrag zählt",
              text: "Ob einmalig oder regelmäßig – auch Kleinspenden bringen uns einen Schritt vorwärts.",
            },
          ].map((item) => (
            <Card key={item.title} className="texture-surface-card border-primary/10">
              <CardHeader>
                <item.icon className="h-8 w-8 text-primary" />
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeader
          title="Spende mit Giralgeld"
          subtitle="Einmalige Überweisung oder regelmäßige Fördermitgliedschaft per Lastschrift."
          align="center"
        />
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <Card className="texture-surface-card">
            <CardHeader>
              <CardTitle>Einmalige Spende</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Überweise einen Betrag deiner Wahl direkt auf unser Vereinskonto.
              </p>
              <div className="rounded-xl bg-muted/50 p-4 text-sm">
                <p>
                  <span className="font-semibold">Empfänger:</span>{" "}
                  {donationInfo.recipient}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">IBAN:</span> {donationInfo.iban}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">BIC:</span> {donationInfo.bic}
                </p>
              </div>
              <CopyAddressButton value={donationInfo.iban.replace(/\s/g, "")} label="IBAN kopieren" />
            </CardContent>
          </Card>

          <Card className="texture-surface-card">
            <CardHeader>
              <CardTitle>PayPal & Fördermitgliedschaft</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Spende schnell per PayPal oder richte eine regelmäßige Unterstützung ein.
              </p>
              <Button className="w-full" asChild>
                <a
                  href={donationInfo.paypalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mit PayPal spenden
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">
                Für Lastschrift-Mandate und Fördermitgliedschaft kontaktiere uns unter{" "}
                <Link href="/kontakt" className="text-primary hover:underline">
                  info@die-libertaeren.de
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Spende mit Krypto-Währung"
          subtitle="Bitcoin (Lightning & On-Chain) und Ethereum – scanne den QR-Code oder kopiere die Adresse."
          align="center"
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {donationInfo.crypto.map((wallet) => (
            <Card key={wallet.id} className="texture-surface-card text-center">
              <CardHeader className="pb-2">
                <Bitcoin className="mx-auto h-6 w-6 text-primary" />
                <CardTitle className="text-base">{wallet.coin}</CardTitle>
                <Badge variant="muted">{wallet.network}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mx-auto w-fit rounded-xl border border-border bg-white p-2 shadow-sm">
                  <Image
                    src={wallet.qrImage}
                    alt={wallet.qrImageAlt}
                    width={200}
                    height={200}
                    className="h-40 w-40 object-contain"
                    unoptimized
                  />
                </div>
                {wallet.address && (
                  <>
                    <p className="break-all font-mono text-xs text-muted-foreground">
                      {wallet.address}
                    </p>
                    <CopyAddressButton value={wallet.address} />
                  </>
                )}
                {!wallet.address && (
                  <p className="text-xs text-muted-foreground">
                    QR-Code scannen zum Spenden
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <CTASection
        title="Freiheit ist kein Geschenk, sondern dein Recht!"
        description="Werde der Patron einer wahren Freiheitsbewegung – freiheitlich aus Prinzip."
        primaryLabel="Mitglied werden"
        primaryHref="/werde-mitglied"
        secondaryLabel="Kontakt"
        secondaryHref="/kontakt"
      />
    </>
  );
}