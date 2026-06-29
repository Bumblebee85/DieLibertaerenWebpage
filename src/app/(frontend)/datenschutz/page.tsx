import type { Metadata } from "next";
import Link from "next/link";
import { LegalNav, LegalProse, LegalSection } from "@/components/legal/legal-prose";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { legal } from "@/data/legal";
import siteConfig from "@/data/site-config.json";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von DIE LIBERTÄREN e.V. – transparent, DSGVO-konform und mit minimaler Datenerhebung.",
};

const navItems = [
  { id: "grundsaetze", label: "Grundsätze" },
  { id: "verantwortlicher", label: "Verantwortlicher" },
  { id: "ueberblick", label: "Überblick" },
  { id: "hosting", label: "Hosting" },
  { id: "datenbank", label: "CMS und Datenbank" },
  { id: "logfiles", label: "Server-Logdateien" },
  { id: "kontaktformular", label: "Kontaktformular" },
  { id: "externe-links", label: "Externe Dienste" },
  { id: "tracking", label: "Tracking und Cookies" },
  { id: "rechtsgrundlagen", label: "Rechtsgrundlagen" },
  { id: "speicherdauer", label: "Speicherdauer" },
  { id: "rechte", label: "Deine Rechte" },
  { id: "beschwerde", label: "Beschwerderecht" },
  { id: "aenderungen", label: "Änderungen" },
];

export default function DatenschutzPage() {
  const { streetAddress, postalAddress } = legal;

  return (
    <>
      <PageHeader
        title="Datenschutz"
        subtitle="Transparent, DSGVO-konform – mit so wenig Datenerhebung wie möglich."
      />
      <Section>
        <LegalProse>
          <p className="text-sm text-foreground/80">
            Stand:{" "}
            {new Date(legal.privacy.lastUpdated).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          <LegalNav items={navItems} />

          <LegalSection id="grundsaetze" title="Grundsätze">
            <p>
              Als freiheitliche Partei nehmen wir den Schutz persönlicher Daten
              ernst – nicht als Selbstzweck, sondern als Ausdruck des Respekts
              vor der Privatsphäre jedes Einzelnen. Wir erheben und verarbeiten
              personenbezogene Daten nur, soweit es für den Betrieb dieser
              Website, die Kommunikation mit Interessenten oder gesetzliche
              Pflichten erforderlich ist.
            </p>
            <p>
              Diese Datenschutzerklärung informiert dich nach Art. 13 und 14
              DSGVO darüber, welche Daten wir verarbeiten, zu welchem Zweck und
              auf welcher Rechtsgrundlage – sowie welche Rechte du hast.
            </p>
          </LegalSection>

          <LegalSection id="verantwortlicher" title="Verantwortlicher">
            <p>
              Verantwortlicher im Sinne der DSGVO:
              <br />
              <strong>{legal.organization}</strong>
            </p>
            <address className="not-italic">
              {streetAddress.street}
              <br />
              {streetAddress.postalCode} {streetAddress.city}
              <br />
              {postalAddress.postbox}, {postalAddress.postalCode}{" "}
              {postalAddress.city}
            </address>
            <p>
              E-Mail:{" "}
              <a
                href={`mailto:${legal.privacy.contactEmail}`}
                className="text-primary hover:underline"
              >
                {legal.privacy.contactEmail}
              </a>
            </p>
          </LegalSection>

          <LegalSection id="ueberblick" title="Überblick der Datenverarbeitung">
            <p>Auf dieser Website verarbeiten wir im Wesentlichen:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                technische Verbindungsdaten (Server-Logdateien beim Hosting),
              </li>
              <li>
                Inhaltsdaten im redaktionellen CMS (z. B. Veranstaltungen,
                Zitate – ohne personenbezogene Besucherdaten),
              </li>
              <li>
                Daten, die du uns freiwillig per E-Mail oder (künftig) über das
                Kontaktformular mitteilst.
              </li>
            </ul>
            <p>
              Wir setzen keine Werbe-Tracker, kein Verhaltensprofiling und
              keine unnötigen Analyse-Tools ein.
            </p>
          </LegalSection>

          <LegalSection id="hosting" title="Hosting (Vercel)">
            <p>
              Diese Website wird bei {legal.hosting.provider} gehostet (
              {legal.hosting.address}). Beim Aufruf der Seiten werden
              automatisch technische Informationen (z. B. IP-Adresse,
              Browsertyp, Zeitpunkt des Zugriffs) in Server-Logdateien
              gespeichert. Dies dient der Bereitstellung, Stabilität und
              Sicherheit der Website.
            </p>
            <p>
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an einem sicheren und funktionsfähigen Webauftritt).
              Sofern Daten in die USA übermittelt werden, stützt sich die
              Übermittlung auf geeignete Garantien (z. B. EU-Standardvertragsklauseln).
            </p>
            <p>
              Weitere Informationen:{" "}
              <a
                href={legal.hosting.privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Datenschutzerklärung von Vercel
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection id="datenbank" title="CMS und Datenbank (MongoDB Atlas)">
            <p>
              Redaktionelle Inhalte (z. B. Highlights, Veranstaltungen, Impulse)
              werden über ein Content-Management-System (Payload CMS) in einer
              Datenbank bei {legal.database.provider} verwaltet. Der
              öffentliche Website-Betrieb greift lesend auf diese Inhalte zu.
            </p>
            <p>
              Besucher der öffentlichen Seiten werden dabei nicht in der
              Datenbank gespeichert. Zugriff auf das CMS haben ausschließlich
              autorisierte Redakteure des Vereins. Die Datenbank ist auf ein{" "}
              {legal.database.region} ausgerichtet, soweit in der Konfiguration
              vorgesehen.
            </p>
            <p>
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (Betrieb und Pflege
              des Webauftritts).
              <br />
              Weitere Informationen:{" "}
              <a
                href={legal.database.privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Datenschutzerklärung von MongoDB
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection id="logfiles" title="Server-Logdateien">
            <p>
              Beim Besuch dieser Website können folgende Daten kurzzeitig in
              Logdateien erfasst werden:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>IP-Adresse (gekürzt oder vollständig, je nach Konfiguration),</li>
              <li>Datum und Uhrzeit der Anfrage,</li>
              <li>aufgerufene URL und Referrer-URL,</li>
              <li>Browsertyp und Betriebssystem.</li>
            </ul>
            <p>
              Diese Daten werden nicht mit anderen Datenquellen zusammengeführt
              und dienen ausschließlich der technischen Bereitstellung sowie der
              Abwehr von Missbrauch. Die Speicherdauer richtet sich nach den
              Vorgaben des Hosting-Anbieters und beträgt in der Regel wenige
              Tage bis Wochen.
            </p>
          </LegalSection>

          <LegalSection id="kontaktformular" title="Kontaktformular und E-Mail">
            <p>
              Auf der Seite{" "}
              <Link href="/kontakt" className="text-primary hover:underline">
                Kontakt
              </Link>{" "}
              kannst du uns eine Nachricht senden. Das Formular erhebt derzeit
              folgende Angaben: Name, E-Mail-Adresse, Betreff und Nachricht.
            </p>
            <p>
              <strong>Hinweis zum aktuellen Stand:</strong> Das Kontaktformular
              ist technisch noch nicht an einen Serverdienst angebunden. Eingegebene
              Daten werden beim Absenden nicht dauerhaft gespeichert oder
              übermittelt. Bis zur vollständigen Anbindung empfehlen wir,
              uns direkt per E-Mail zu kontaktieren:{" "}
              <a
                href={`mailto:${legal.contact.emailPublic}`}
                className="text-primary hover:underline"
              >
                {legal.contact.emailPublic}
              </a>
              .
            </p>
            <p>
              Sobald das Formular produktiv eingebunden ist, verarbeiten wir
              deine Angaben zur Bearbeitung deiner Anfrage (Art. 6 Abs. 1 lit.
              b DSGVO – vorvertragliche Kommunikation bzw. lit. f DSGVO –
              berechtigtes Interesse an der Beantwortung von Anfragen). Die
              Daten werden nicht ohne deine Einwilligung an Dritte weitergegeben,
              sofern keine gesetzliche Pflicht besteht.
            </p>
          </LegalSection>

          <LegalSection id="externe-links" title="Externe Dienste und Links">
            <p>
              Unsere Website verlinkt zu externen Angeboten, für die eigene
              Datenschutzbestimmungen gelten. Beim Anklicken verlässt du unsere
              Seite; wir haben keinen Einfluss auf die Datenverarbeitung dort:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Social-Media-Kanäle (z. B. Telegram, X, Facebook, Instagram,
                YouTube, TikTok),
              </li>
              <li>
                Newsletter-Anmeldung über CleverReach (
                <a
                  href={siteConfig.newsletter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Anmeldeformular
                </a>
                ),
              </li>
              <li>
                Shop und weitere Partnerangebote (z. B.{" "}
                <a
                  href={siteConfig.shop}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Shop
                </a>
                ).
              </li>
            </ul>
            <p>
              Bitte informiere dich auf den jeweiligen Seiten über Art, Umfang
              und Zweck der dortigen Datenerhebung.
            </p>
          </LegalSection>

          <LegalSection id="tracking" title="Tracking und Cookies">
            <p>
              Diese Website setzt <strong>keine</strong> Marketing- oder
              Analyse-Tracker ein (z. B. Google Analytics, Meta Pixel o. Ä.).
              Wir erstellen keine Nutzerprofile und verkaufen keine Daten.
            </p>
            <p>
              Technisch notwendige Cookies oder vergleichbare Technologien können
              beim Hosting oder für die Grundfunktion der Seite anfallen. Soweit
              solche Cookies gesetzt werden, dienen sie ausschließlich dem Betrieb
              der Website und erfordern nach der ePrivacy-Richtlinie keine
              Einwilligung.
            </p>
          </LegalSection>

          <LegalSection id="rechtsgrundlagen" title="Rechtsgrundlagen">
            <p>
              Soweit wir personenbezogene Daten verarbeiten, stützen wir uns auf
              folgende Rechtsgrundlagen der DSGVO:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> – Verarbeitung zur
                Erfüllung vorvertraglicher Maßnahmen oder zur Kommunikation auf
                deine Anfrage hin,
              </li>
              <li>
                <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> – berechtigtes
                Interesse an einem sicheren, funktionsfähigen und
                informationsfähigen Webauftritt,
              </li>
              <li>
                <strong>Art. 6 Abs. 1 lit. a DSGVO</strong> – Einwilligung,
                sofern du uns eine ausdrücklich erteilst (z. B. bei künftigen
                optionalen Funktionen).
              </li>
            </ul>
          </LegalSection>

          <LegalSection id="speicherdauer" title="Speicherdauer">
            <p>
              Personenbezogene Daten speichern wir nur so lange, wie es für den
              jeweiligen Zweck erforderlich ist oder gesetzliche
              Aufbewahrungsfristen bestehen. Anfragen per E-Mail werden nach
              abschließender Bearbeitung gelöscht, sofern keine gesetzliche
              Aufbewahrungspflicht entgegensteht (z. B. bei Spenden- oder
              Mitgliedschaftsvorgängen).
            </p>
          </LegalSection>

          <LegalSection id="rechte" title="Deine Rechte">
            <p>Du hast gegenüber uns folgende Rechte:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Auskunft</strong> über die von uns gespeicherten Daten
                (Art. 15 DSGVO),
              </li>
              <li>
                <strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO),
              </li>
              <li>
                <strong>Löschung</strong> („Recht auf Vergessenwerden“, Art. 17
                DSGVO),
              </li>
              <li>
                <strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO),
              </li>
              <li>
                <strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO),
              </li>
              <li>
                <strong>Widerspruch</strong> gegen Verarbeitung auf Grundlage
                von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO),
              </li>
              <li>
                <strong>Widerruf erteilter Einwilligungen</strong> mit Wirkung
                für die Zukunft (Art. 7 Abs. 3 DSGVO).
              </li>
            </ul>
            <p>
              Zur Ausübung deiner Rechte genügt eine Nachricht an{" "}
              <a
                href={`mailto:${legal.privacy.contactEmail}`}
                className="text-primary hover:underline"
              >
                {legal.privacy.contactEmail}
              </a>
              . Wir werden Anfragen unverzüglich, spätestens innerhalb eines
              Monats, bearbeiten.
            </p>
          </LegalSection>

          <LegalSection id="beschwerde" title="Beschwerderecht">
            <p>
              Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu
              beschweren. Zuständig für uns ist insbesondere:
            </p>
            <p>
              {legal.privacy.supervisoryAuthority}
              <br />
              <a
                href={legal.privacy.supervisoryAuthorityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {legal.privacy.supervisoryAuthorityUrl}
              </a>
            </p>
          </LegalSection>

          <LegalSection id="aenderungen" title="Änderungen dieser Erklärung">
            <p>
              Wir passen diese Datenschutzerklärung an, wenn sich unsere
              Website, eingesetzte Dienste oder rechtliche Anforderungen
              ändern. Die jeweils aktuelle Fassung findest du stets auf dieser
              Seite. Bei wesentlichen Änderungen, die deine Rechte betreffen,
              informieren wir nach Möglichkeit gesondert.
            </p>
          </LegalSection>

          <p className="text-sm">
            Pflichtangaben zum Anbieter findest du im{" "}
            <Link href="/impressum" className="text-primary hover:underline">
              Impressum
            </Link>
            .
          </p>
        </LegalProse>
      </Section>
    </>
  );
}