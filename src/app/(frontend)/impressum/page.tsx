import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von DIE LIBERTÄREN e.V.",
};

export default function ImpressumPage() {
  return (
    <>
      <PageHeader title="Impressum" />
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          <Image
            src="/images/logo-dark.png"
            alt="DIE LIBERTÄREN Logo"
            width={300}
            height={98}
            className="mb-8"
          />

          <div className="space-y-2">
            <p className="font-semibold">DIE LIBERTÄREN e.V.</p>
            <p>Postfach 75 02 07</p>
            <p>81332 München</p>
          </div>

          <div>
            <h2 className="font-semibold">Vereinsregister-Nummer</h2>
            <p className="text-muted-foreground">VR 209533, Amtsgericht München</p>
          </div>

          <div>
            <h2 className="font-semibold">Vertreten durch</h2>
            <p className="text-muted-foreground">
              Dr. Mathias Hummel, Bundesvorsitzender
              <br />
              Florian Handwerker, Bundesgeschäftsführer
            </p>
          </div>

          <div>
            <h2 className="font-semibold">Kontakt</h2>
            <p className="text-muted-foreground">
              Telefon: +49 159 06320502
              <br />
              E-Mail: info@die-libertaeren.de
            </p>
          </div>

          <div>
            <h2 className="font-semibold">Haftungsausschluss</h2>
            <p className="leading-relaxed text-muted-foreground">
              Die grafische Gestaltung, die einzelnen Elemente sowie die Inhalte
              der Homepage sind urheberrechtlich geschützt. Weiterverwendung und
              Vervielfältigung sind nur zu privaten Zwecken und für Mitglieder von
              DIE LIBERTÄREN gestattet.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Die auf diesen Seiten veröffentlichten Inhalte werden sorgfältig
              recherchiert und geprüft. Dennoch können die Anbieter keine Gewähr
              und keine Haftung für die Richtigkeit, Vollständigkeit und
              Aktualität der Inhalte übernehmen.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p className="text-muted-foreground">
              Florian Handwerker, Bundesgeschäftsführer
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}