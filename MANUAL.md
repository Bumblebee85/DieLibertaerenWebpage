# DIE LIBERTÄREN Website – Entwickler-Handbuch

Zentrale Referenz für Menschen und KI-Assistenten. Lies diese Datei zuerst, bevor du am Projekt arbeitest.

**Repository:** [github.com/Bumblebee85/DieLibertaerenWebpage](https://github.com/Bumblebee85/DieLibertaerenWebpage)  
**Stack:** Next.js 16 · React 19 · Payload CMS 3 · MongoDB Atlas · Tailwind CSS 4 · Vercel

---

## 1. Projektziel

Moderne, hochwertige Website für **DIE LIBERTÄREN** – Deutschlands konsequent libertäre Partei. Die Seite soll:

- politische Positionen klar und premium präsentieren (Thesenpapier, Prinzipien, Libertärer Kompass),
- redaktionelle Inhalte automatisieren (Tagesimpulse, Wochen-Blog via Grok),
- Inhalte über Payload CMS pflegbar machen (ohne Code-Deploy für Texte),
- auf Vercel Free/Hobby-Tier lauffähig bleiben (kein separates Backend nötig).

Die Testversion läuft parallel zur Legacy-Site auf `die-libertaeren.de` (WordPress).

---

## 2. Architektur (Kurzüberblick)

```
Browser
   │
   ▼
Next.js App Router (src/app/)
   ├── (frontend)/     → Öffentliche Seiten
   └── (payload)/      → /admin + /api/* (Payload REST)
           │
           ▼
      MongoDB Atlas (Produktion) / lokale MongoDB
           │
      JSON-Fallbacks (src/data/) wenn DB nicht erreichbar
```

**Wichtige Prinzipien:**

| Prinzip | Umsetzung |
|---------|-----------|
| CMS-first | Startseite, Programm, Blog, Events etc. aus Payload; JSON nur als Fallback |
| Server Components | Daten in `page.tsx` laden, an Client-Komponenten als Props übergeben |
| Idempotente Seeds | `npm run seed:*` legt nur fehlende Einträge an |
| Grok-Automatisierung | Tagesimpulse + Wochen-Blog per Skript oder HTTP-Route |

---

## 3. Verzeichnisstruktur

```
├── MANUAL.md                 ← Diese Datei
├── README.md                 ← Setup, Vercel, MongoDB (operativ)
├── scripts/AUTOMATION.md     ← Grok-Cron, generate:* Befehle
├── public/
│   ├── images/               ← Hero, Logos, Section-Bilder
│   ├── documents/            ← PDFs (Thesen, Satzung)
│   └── IMAGE-PROMPTS.md      ← Grok-Imagine-Prompts für Assets
├── src/
│   ├── app/
│   │   ├── (frontend)/       ← Alle öffentlichen Routen
│   │   └── (payload)/        ← Payload Admin + API
│   ├── collections/          ← Payload Collections (Schema)
│   ├── globals/              ← Payload Globals (einzelne Seiten-Inhalte)
│   ├── components/
│   │   ├── home/             ← Hero, Highlights, Zitate, Impulse, Events
│   │   ├── layout/           ← Header, Footer
│   │   ├── programm/         ← Thesen-Viewer
│   │   ├── wahlomat/         ← Libertärer Kompass Quiz
│   │   ├── blog/             ← Blog-Grid, aktueller Beitrag
│   │   ├── shared/           ← CTA, Section, Backgrounds
│   │   └── ui/               ← shadcn/ui (Button, Card, …)
│   ├── data/                 ← JSON-Fallbacks (siehe Abschnitt 6)
│   ├── lib/
│   │   ├── cms/              ← Datenabruf Payload → Display-Typen
│   │   ├── generate/         ← Grok Tages-/Wochen-Generierung
│   │   ├── grok/             ← xAI API Client
│   │   ├── seed/             ← Seed-Hilfsfunktionen
│   │   └── seo/              ← Metadata, Sitemap
│   ├── scripts/              ← CLI: seed, generate, check
│   └── payload.config.ts     ← Payload-Hauptkonfiguration
```

---

## 4. Routen & Seiten

| Route | Quelle | Beschreibung |
|-------|--------|--------------|
| `/` | CMS + JSON | Hero, Highlights, Zitate, Impulse, Events, Säulen, CTA |
| `/unsere-prinzipien` | Statisch | Drei Säulen der Freiheit |
| `/programm` | Global `program` + Collection `program-topic-categories` | Thesenpapier v4 |
| `/thesen` | Redirect | → `/programm` |
| `/events` | Collections `events`, `event-locations`, `event-categories` | Kalender + Veranstaltungen |
| `/events/[slug]` | Collection `events` | Event-Detail mit QR-Code |
| `/blog`, `/blog/[slug]` | Collections `blog-posts`, `weekly-essays` | Blog + aktueller libertärer Beitrag |
| `/bundesvorstand` | Statisch | Vorstand |
| `/beirat` | Global `beirat` + Collection `beirat-members` | Beirat |
| `/freiheitsbewegung` | Global `freiheitsbewegung` | Geschichte, Österr. Schule |
| `/stimmst-du-mit-uns-ueberein` | Collection `wahlomat-elections` | Libertärer Kompass |
| `/mitmachen`, `/werde-mitglied`, `/spenden`, `/werde-unterstuetzer` | Statisch + `site-config.json` | Engagement |
| `/netzwerk`, `/kontakt` | Statisch | Vernetzung, Kontaktformular |
| `/impressum`, `/datenschutz` | Statisch | Rechtliches |
| `/admin` | Payload | CMS-Backend |
| `/payload-health` | API | Diagnose Payload + MongoDB |
| `/seed-content` | API (geschützt) | Remote-Seed auf Vercel |
| `/generate-daily`, `/generate-weekly` | API (geschützt) | Grok-Generierung remote |

---

## 5. Payload CMS

### Admin-Zugang

- URL: `/admin`
- Ersten User: `ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run seed:admin`
- Health-Check nach Deploy: `/payload-health` → `ok: true`

### Globals (einzelne Konfigurationsseiten)

| Slug | Label | Inhalt |
|------|-------|--------|
| `hero` | Hero (Startseite) | Eyebrow, Titel, Akzent, Tagline, Haupttext, CTAs |
| `program` | Programm | Thesen-Titel, Leitbild, Grundthese, erste Maßnahmen, PDF |
| `beirat` | Beirat | Seiten-Metadaten |
| `freiheitsbewegung` | Freiheitsbewegung | Vollständiger Seiteninhalt |

### Collections (Startseite-Gruppe)

| Slug | Zweck |
|------|-------|
| `highlights` | „Aktuell bei DIE LIBERTÄREN“ – `isActive` + `activeUntil` |
| `quotes` | Zitat-Rotation (`published: true`) |
| `events` | Veranstaltungen (Kalender, Wiederholungen, QR) |
| `event-locations` | Veranstaltungsorte |
| `event-categories` | Veranstaltungs-Kategorien |
| `event-organizers` | Veranstalter |
| `daily-impulses` | Tagesaktuelle Impulse (max. 3 pro Tag sichtbar) |
| `weekly-essays` | Aktueller libertärer Beitrag |
| `blog-posts` | Blog-Artikel |
| `prompt-templates` | Grok System-Prompts (Slug `daily-impulses-system`) |

### Weitere Collections

`users`, `media`, `documents`, `program-topic-categories`, `wahlomat-elections`, `blog-categories`, `beirat-members`

### Datenabruf im Code

Jede CMS-Domain hat eine Datei unter `src/lib/cms/`:

- `getHeroContent()` → `src/lib/cms/hero.ts`
- `getPublishedQuotes()` → `src/lib/cms/quotes.ts`
- `getFreiheitsbewegungContent()` → `src/lib/cms/freiheitsbewegung.ts`
- usw.

**Muster:** Payload abfragen → bei Fehler oder leerem Ergebnis JSON aus `src/data/` laden.

### Schema ändern

1. Collection/Global in `src/collections/` oder `src/globals/` bearbeiten
2. In `payload.config.ts` registrieren (falls neu)
3. `npm run generate:types`
4. `src/lib/cms/*.ts` und Komponenten anpassen
5. Optional: Seed-Skript erweitern

---

## 6. JSON-Fallbacks (`src/data/`)

| Datei | Verwendung |
|-------|------------|
| `hero.json` | Hero-Texte wenn Global leer / DB down |
| `quotes.json` | Zitate-Fallback |
| `events.json` | Events-Fallback |
| `highlights.json` | Highlights-Fallback |
| `thesen-v4.json` | Programm-Fallback |
| `freiheitsbewegung.json` | Freiheitsbewegung-Fallback |
| `beirat.json` | Beirat-Fallback |
| `blog-posts.json`, `weekly-essays.json` | Blog-Fallback |
| `wahlomat-thesen.json` | Libertärer Kompass-Fallback |
| `site-config.json` | Kontakt, Social, Newsletter-URLs |
| `daily-news.json` | Legacy News (wird durch Impulse ersetzt) |

**Regel:** JSON-Fallbacks mit CMS-Defaults synchron halten, wenn sich Standardtexte ändern.

---

## 7. Umgebungsvariablen

Siehe `.env.example`. Pflicht für Produktion:

| Variable | Beschreibung |
|----------|--------------|
| `PAYLOAD_SECRET` | Min. 32 Zeichen |
| `MONGODB_URI` | Atlas Connection String inkl. DB-Name `/die-libertaeren` |
| `NEXT_PUBLIC_SERVER_URL` | Production-URL |

Optional / Automatisierung:

| Variable | Beschreibung |
|----------|--------------|
| `GROK_API_KEY` | xAI API für generate:daily/weekly |
| `GROK_MODEL` | Default: `grok-3-mini` |
| `SEED_SECRET` | Schutz für `/seed-content`, `/generate-*` |
| `GENERATE_DAILY_COUNT` | Anzahl Impulse pro Lauf (Default 3) |
| `MONGODB_URI_DIRECT` | Fallback ohne SRV-DNS (Windows) |

Prüfen: `npm run check:payload`

**Auto-Seed:** Beim ersten Payload-Start (Vercel Cold Start) werden fehlende Editorial-Inhalte automatisch befüllt (`onInit`). Deaktivieren: `AUTO_SEED_ON_INIT=false`.

**Medien auf Vercel:** `BLOB_READ_WRITE_TOKEN` in Vercel setzen (Storage → Blob). Upload unter `/admin` → Medien; in Veranstaltungen verknüpfen.

---

## 8. NPM-Skripte

| Befehl | Zweck |
|--------|-------|
| `npm run dev` | Dev-Server Port **3010** |
| `npm run build` | Production-Build (inkl. Payload importmap) |
| `npm run lint` | ESLint |
| `npm run generate:types` | `payload-types.ts` neu erzeugen |
| `npm run seed:admin` | Ersten CMS-User anlegen |
| `npm run seed:cms` | Highlights + Hero + Basis-Events |
| `npm run seed:content` | Vollständiger Seed: Zitate, Impulse, Editorial, CMS |
| `npm run seed:editorial` | Nur Editorial (Programm, Kompass, Blog, Beiträge, Beirat, Prompts) |
| `npm run seed:quotes` / `seed:impulses` / `seed:highlights` | Einzelne Collections |
| `npm run generate:daily` | 3 Tagesimpulse via Grok (lokal) |
| `npm run generate:weekly` | Wochen-Blog via Grok (lokal) |
| `npm run generate:daily:remote` | Ruft Vercel-Route auf |
| `npm run generate:weekly:remote` | Ruft Vercel-Route auf |

Details zur Cron-Einrichtung: `scripts/AUTOMATION.md`

---

## 9. Deployment (Vercel)

1. Push auf `main` → automatisches Production-Deploy
2. Env-Vars in Vercel setzen (siehe Abschnitt 7)
3. Nach Deploy: `https://<domain>/payload-health`
4. Hero/Global initial befüllen: `npm run seed:cms` (lokal mit Atlas-URI) oder `/seed-content` remote

**Git-Workflow:**

```powershell
git pull
# … Änderungen …
npm run lint
npm run build    # optional lokal testen
git add .
git commit -m "feat: …"
git push origin main
```

---

## 10. Brand & Design

| Token | Hex | Verwendung |
|-------|-----|------------|
| Primary | `#FFB200` | Buttons, Akzente, Hero-Highlight |
| Secondary | `#03050F` | Header, Footer, dunkle Flächen |
| Text | `#21232D` | Fließtext |
| Accent | `#61CE70` | Erfolg, Highlights |
| Orange | `#FF4D08` | Sekundärer Akzent |

- Schrift: `font-display` für Überschriften
- Komponenten: shadcn/ui + Tailwind 4
- Animationen: `framer-motion` (sparsam, z. B. Hero)
- Bilder: `public/IMAGE-PROMPTS.md` für Grok-Imagine

---

## 11. Hero-Bereich (Startseite)

**CMS:** Global `hero` unter Admin → Gruppe „Startseite“

| Feld | Standard |
|------|----------|
| eyebrow | Willkommen bei DIE LIBERTÄREN |
| headline | DIE LIBERTÄREN |
| headlineAccent | Deutschlands konsequenteste libertäre Stimme (gold, einzige Unterzeile) |
| description | Deutschlands konsequenteste Stimme für Libertarismus, Eigentum und freien Markt: Wir stehen für individuelle Freiheit, drastische Zurückdrängung des Staates und das Nichtaggressionsprinzip – ehrlich und kompromisslos. |
| primaryCta | Unsere Prinzipien → `/unsere-prinzipien` |
| secondaryCta | Thesenpapier → `/programm` |

**Code:** `src/components/home/hero.tsx` (Client) · `src/lib/cms/hero.ts` (Daten) · `src/data/hero.json` (Fallback)

`headlineAccent` leer lassen → nur `headline` ohne goldene Ergänzung. Es gibt keine separate graue Tagline mehr im Hero.

---

## 12. Automatisierung (Grok)

- Parteikonto: `die-libertaeren-party`
- API: `GROK_API_KEY` (nur dieser Name, kein `XAI_API_KEY`)
- System-Prompt editierbar in CMS: `prompt-templates` → Slug `daily-impulses-system`
- Remote-Aufruf (Vercel):

```bash
curl -X POST "https://<domain>/generate-daily" \
  -H "Authorization: Bearer <SEED_SECRET>"
```

Idempotent: bestehende Einträge für Datum/KW werden übersprungen.

---

## 13. Wichtige Prompts für KI-Assistenten

Wenn du als KI an diesem Projekt arbeitest:

1. **Lies zuerst** `MANUAL.md` und bei CMS-Fragen `README.md` + `scripts/AUTOMATION.md`.
2. **Ändere nur** was die Aufgabe verlangt – keine Drive-by-Refactors.
3. **Payload-Schema:** nach Änderungen immer `npm run generate:types`.
4. **Fallbacks:** neue CMS-Felder brauchen JSON-Fallback + `src/lib/cms/*.ts` Mapper.
5. **Hero/Texte:** bevorzugt CMS-Global, nicht hardcoded in Komponenten.
6. **Commits:** saubere Messages auf Deutsch oder Englisch, ein Thema pro Commit.
7. **Nicht committen:** `.env.local`, Secrets, `node_modules`.
8. **Testen:** `npm run lint` und bei größeren Änderungen `npm run build`.
9. **Deploy:** Push auf `main` reicht – Vercel deployt automatisch.
10. **Bilder:** Prompts aus `public/IMAGE-PROMPTS.md`, Speicherort `public/images/`.

### Typische Aufgaben-Prompts

- *„Hero-Text ändern“* → CMS Global `hero` oder `src/data/hero.json` + Seed
- *„Neues Highlight“* → Collection `highlights` oder `npm run seed:highlights`
- *„Tagesimpulse generieren“* → `npm run generate:daily` oder Remote-Route
- *„Neue Seite“* → `src/app/(frontend)/<route>/page.tsx` + SEO in `src/data/seo-pages.ts`
- *„Thesen aktualisieren“* → Global `program` + `program-topic-categories`

---

## 14. Coding Guidelines

- **TypeScript** strict, keine `any` ohne Grund
- **Server vs. Client:** `"use client"` nur wenn nötig (Interaktion, Animation)
- **Imports:** `@/` Alias für `src/`
- **Styling:** Tailwind utility-first; bestehende Klassen und Tokens wiederverwenden
- **CMS-Zugriff:** nur in Server Components / `lib/cms` / Scripts – nie im Client
- **Fehlerbehandlung:** try/catch mit JSON-Fallback, nicht mit leerer Seite
- **SEO:** `createPageMetadata()` aus `src/lib/seo/metadata.ts`, Einträge in `seo-pages.ts`
- **Barrierefreiheit:** sinnvolle `alt`-Texte, semantisches HTML (`h1` nur einmal pro Seite)

---

## 15. Kontakte & Links

- Website (Legacy): https://die-libertaeren.de
- E-Mail: info@die-libertaeren.de (aus `site-config.json`)
- Newsletter: CleverReach-URL in `site-config.json`

---

## 16. Veranstaltungen verwalten (für Chris)

**Admin:** `/admin` → Gruppe **Veranstaltungen**

Das Events-System ersetzt das WordPress-Plugin „The Events Calendar". Alles ist in vier Bereiche aufgeteilt – einmal anlegen, dann bei jedem Termin auswählen.

### Schritt-für-Schritt: Neuen Termin anlegen

1. **Veranstaltungsorte** (einmalig pro Location)
   - Admin → Veranstaltungsorte → „Neu erstellen"
   - Name, Adresse, PLZ, Stadt, optional Kartenlink
   - „Karte anzeigen" / „Kartenlink anzeigen" aktivieren

2. **Veranstaltung anlegen**
   - Admin → Veranstaltungen → „Neu erstellen"
   - **Tab „Allgemein":** Titel, Beschreibung, Bild, Kategorien (mehrere möglich), Schlagwörter
   - **Tab „Datum & Zeit":** Start/Ende, Uhrzeiten, Zeitzone; bei Stammtischen **Wiederholung aktivieren**
   - **Tab „Ort & Details":** Veranstaltungsort auswählen, Veranstalter, Website, Eintritt

3. **Veröffentlichen** – Häkchen „Veröffentlicht" setzen → Termin erscheint auf `/events`

### Wiederkehrende Stammtische

Für monatliche Stammtische (z. B. „jeden ersten Mittwoch"):

| Feld | Beispiel |
|------|----------|
| Wiederholung aktivieren | ✓ |
| Häufigkeit | Monatlich |
| Woche im Monat | Erster |
| Wochentag | Mittwoch |
| Wiederholung endet am | 2031-06-01 |

**Ausnahmeregelungen:** Einzelne Termine auslassen (Feiertag, Absage) – Datum in der Ausnahmen-Liste eintragen.

### QR-Code

Jede Veranstaltung hat auf der Detailseite (`/events/<slug>`) einen QR-Code zum Teilen. Deaktivieren: Häkchen „QR-Code anzeigen" entfernen.

### Frontend

| URL | Inhalt |
|-----|--------|
| `/events` | Monatskalender + Terminliste (wie WordPress-Kalender) |
| `/events/<slug>` | Detailseite mit Beschreibung, Karte, QR-Code |

### Collections (Admin-Gruppe „Veranstaltungen")

| Slug | Zweck |
|------|-------|
| `events` | Termine |
| `event-locations` | Orte / Venues |
| `event-categories` | Kategorien (Stammtisch, Online, …) |
| `event-organizers` | Veranstalter |

### Technik (für Entwickler)

- Wiederholungs-Logik: `src/lib/cms/event-recurrence.ts`
- Datenabruf: `src/lib/cms/events.ts`
- QR-API: `/api/events/<slug>/qr`
- Seed: `npm run seed:cms` (Kategorien, Orte, Beispiel-Stammtische)

---

*Zuletzt aktualisiert: Juli 2026 – Events/Calendar-System, Veranstaltungen-Handbuch.*