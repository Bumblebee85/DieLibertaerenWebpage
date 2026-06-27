import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von DIE LIBERTÄREN e.V.",
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader
        title="Datenschutz"
        subtitle="Informationen zum Umgang mit personenbezogenen Daten bei DIE LIBERTÄREN e.V."
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6 leading-relaxed text-muted-foreground">
          <p>
            Der Schutz deiner persönlichen Daten ist uns wichtig. DIE LIBERTÄREN
            e.V. verarbeitet personenbezogene Daten nur im Rahmen der geltenden
            Datenschutzgesetze, insbesondere der DSGVO.
          </p>
          <p>
            Die vollständige Datenschutzerklärung findest du als PDF-Dokument auf
            unserer Website. Bei Fragen zum Datenschutz wende dich bitte an:
          </p>
          <p>
            <a
              href="mailto:info@die-libertaeren.de"
              className="text-primary hover:underline"
            >
              info@die-libertaeren.de
            </a>
          </p>
          <Button asChild>
            <a
              href="https://die-libertaeren.de/wp-content/uploads/2020/07/Datenschutzerklaerung_DIE_LIBERTAEREN_e.V._20220807.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Datenschutzerklärung als PDF
            </a>
          </Button>
        </div>
      </Section>
    </>
  );
}