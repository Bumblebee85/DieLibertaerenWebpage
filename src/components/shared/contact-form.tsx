"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-primary/10 p-8 text-center">
        <h3 className="font-display text-xl font-bold">Vielen Dank!</h3>
        <p className="mt-2 text-muted-foreground">
          Deine Nachricht wurde erfasst. Wir melden uns schnellstmöglich bei dir.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Für direkte Anfragen:{" "}
          <a href="mailto:info@die-libertaeren.de" className="text-primary hover:underline">
            info@die-libertaeren.de
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Vor- und Nachname
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            E-Mail-Adresse
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-medium">
          Betreff
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option>Partei allgemein</option>
          <option>Mitgliedschaft</option>
          <option>Spenden</option>
          <option>Netzwerk</option>
          <option>Programme</option>
          <option>Datenschutz</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Deine Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input type="checkbox" required className="mt-1" />
        <span>
          Hiermit bestätige ich die{" "}
          <a href="/datenschutz" className="text-primary hover:underline">
            Datenschutzerklärung
          </a>
          .
        </span>
      </label>

      <Button type="submit" size="lg">
        Senden
      </Button>
    </form>
  );
}