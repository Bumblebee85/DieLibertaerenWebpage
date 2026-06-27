import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { ContactForm } from "@/components/shared/contact-form";
import siteConfig from "@/data/site-config.json";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Nimm Kontakt mit DIE LIBERTÄREN auf – Fragen, Feedback und Anregungen.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        title="Nimm mit uns Kontakt auf"
        subtitle="Feedback, Kritik, Anregungen oder allgemeine Fragen zur Partei und Mitgliedschaft."
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <ContactForm />
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold">Anschrift</h2>
              <div className="mt-4 flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <p>{siteConfig.address}</p>
              </div>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">Telefon</h2>
              <div className="mt-4 flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href={`tel:${siteConfig.phone}`} className="text-primary hover:underline">
                  {siteConfig.phone}
                </a>
              </div>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">E-Mail</h2>
              <div className="mt-4 flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-primary hover:underline"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-muted/50 p-6 text-sm text-muted-foreground">
              <p>
                Bei technischen Fragen:{" "}
                <a
                  href="mailto:support@die-libertaeren.de"
                  className="text-primary hover:underline"
                >
                  support@die-libertaeren.de
                </a>
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}