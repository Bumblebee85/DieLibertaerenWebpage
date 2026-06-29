import type { Metadata } from "next";
import Link from "next/link";
import { LegalNav, LegalProse, LegalSection } from "@/components/legal/legal-prose";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { legal } from "@/data/legal";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum von DIE LIBERTÄREN e.V. – Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz).",
};

const navItems = [
  { id: "anbieter", label: "Anbieterkennzeichnung" },
  { id: "kontakt", label: "Kontakt" },
  { id: "register", label: "Vereinsregister" },
  { id: "inhalt", label: "Verantwortlich für Inhalte" },
  { id: "streitbeilegung", label: "Streitbeilegung" },
  { id: "haftung-inhalte", label: "Haftung für Inhalte" },
  { id: "haftung-links", label: "Haftung für Links" },
  { id: "urheberrecht", label: "Urheberrecht" },
];

export default function ImpressumPage() {
  const { streetAddress, postalAddress, representatives, contentResponsible } =
    legal;

  return (
    <>
      <PageHeader
        title="Impressum"
        subtitle="Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)"
      />
      <Section>
        <LegalProse>
          <LegalNav items={navItems} />

          <LegalSection id="anbieter" title="Anbieterkennzeichnung">
            <p>
              <strong>{legal.organization}</strong>
            </p>
            <address className="not-italic">
              <p className="font-medium text-foreground">Geschäftsanschrift</p>
              <p>
                {streetAddress.street}
                <br />
                {streetAddress.postalCode} {streetAddress.city}
                <br />
                {streetAddress.country}
              </p>
              <p className="mt-4 font-medium text-foreground">Postanschrift</p>
              <p>
                {postalAddress.postbox}
                <br />
                {postalAddress.postalCode} {postalAddress.city}
                <br />
                {postalAddress.country}
              </p>
            </address>
            <p>
              Vertreten durch:
              <br />
              {representatives.map((person) => (
                <span key={person.name}>
                  {person.name}, {person.role}
                  <br />
                </span>
              ))}
            </p>
          </LegalSection>

          <LegalSection id="kontakt" title="Kontakt">
            <p>
              Telefon:{" "}
              <a
                href={`tel:${legal.contact.phone.replace(/\s/g, "")}`}
                className="text-primary hover:underline"
              >
                {legal.contact.phone}
              </a>
              <br />
              E-Mail:{" "}
              <a
                href={`mailto:${legal.contact.email}`}
                className="text-primary hover:underline"
              >
                {legal.contact.email}
              </a>
            </p>
          </LegalSection>

          <LegalSection id="register" title="Vereinsregister">
            <p>
              Eingetragen im Vereinsregister.
              <br />
              Registergericht: {legal.register.court}
              <br />
              Registernummer: {legal.register.number}
            </p>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: nicht
              vorhanden (gemeinnütziger eingetragener Verein).
            </p>
          </LegalSection>

          <LegalSection
            id="inhalt"
            title="Verantwortlich für redaktionelle Inhalte"
          >
            <p>
              Verantwortlich im Sinne von § 18 Abs. 2 MStV (Medienstaatsvertrag):
            </p>
            <p>
              {contentResponsible.name}, {contentResponsible.role}
              <br />
              {contentResponsible.address}
            </p>
          </LegalSection>

          <LegalSection id="streitbeilegung" title="Streitbeilegung">
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .
            </p>
            <p>
              Wir sind nicht verpflichtet und nicht bereit, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </LegalSection>

          <LegalSection id="haftung-inhalte" title="Haftung für Inhalte">
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
              Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>
          </LegalSection>

          <LegalSection id="haftung-links" title="Haftung für Links">
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>
            <p>
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
              mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren
              zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
              inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
              konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
              Bekanntwerden von Rechtsverletzungen werden wir derartige Links
              umgehend entfernen.
            </p>
          </LegalSection>

          <LegalSection id="urheberrecht" title="Urheberrecht">
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
            <p>
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
              Seite nicht vom Betreiber erstellt wurden, werden die
              Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
              Dritter als solche gekennzeichnet. Solltest du trotzdem auf eine
              Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
              entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Inhalte umgehend entfernen.
            </p>
          </LegalSection>

          <p className="text-sm">
            Weitere Informationen zum Datenschutz findest du in unserer{" "}
            <Link href="/datenschutz" className="text-primary hover:underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </LegalProse>
      </Section>
    </>
  );
}