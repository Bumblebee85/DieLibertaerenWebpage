# DIE LIBERTÄREN – Website

Premium, moderne Next.js-Website für die deutsche libertäre Partei **DIE LIBERTÄREN**.

Vollständig statisch vorgerendert – ideal für den **Vercel Hobby/Free Tier** (keine API-Routes, keine Server Actions, keine Datenbank).

---

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** + shadcn/ui-Komponenten + lucide-react
- **framer-motion** für subtile Animationen
- Inhalte über editierbare JSON-Dateien in `src/data/`

### Brand-Farben (exakt von die-libertaeren.de)

| Token | Hex | Verwendung |
|-------|-----|------------|
| Primary | `#FFB200` | Buttons, Links, Akzente |
| Secondary | `#03050F` | Header, Footer, dunkle Sektionen |
| Text | `#21232D` | Fließtext |
| Accent | `#61CE70` | Erfolg, Highlights |
| Orange | `#FF4D08` | Sekundärer Akzent |
| Muted | `#F5F5F5` | Hintergründe |

---

## Lokale Entwicklung

```powershell
cd C:\KI_CODE_Projekte\DieLibertaerenWebseite
npm install
npm run dev
```

Der Dev-Server startet standardmäßig auf Port **3010**:

**http://localhost:3010**

Alternativ mit explizitem Port-Flag:

```powershell
npm run dev -- --port 3010
```

### Produktions-Build lokal testen

```powershell
npm run build
npm start
```

---

## Deployment auf Vercel (Schritt für Schritt)

Die Testversion läuft parallel zur bestehenden Seite auf die-libertaeren.de – entweder über die automatische Vercel-URL (`*.vercel.app`) oder eine eigene Subdomain.

### Voraussetzungen

- GitHub-Konto
- [Vercel-Konto](https://vercel.com/signup) (Hobby/Free reicht)
- Node.js ≥ 20 lokal installiert

### Schritt 1: GitHub-Repository erstellen

1. Auf [github.com/new](https://github.com/new) ein neues Repository anlegen (z. B. `DieLibertaerenWebpage`)
2. **Ohne** README, `.gitignore` oder Lizenz initialisieren (liegen bereits im Projekt)

### Schritt 2: Code pushen

```powershell
cd C:\KI_CODE_Projekte\DieLibertaerenWebseite

git init
git add .
git commit -m "Initial commit: DIE LIBERTÄREN Website"
git remote add origin https://github.com/DEIN-USERNAME/DieLibertaerenWebpage.git
git branch -M main
git push -u origin main
```

### Schritt 3: Vercel-Projekt anlegen

1. [vercel.com/new](https://vercel.com/new) öffnen
2. **Import Git Repository** → GitHub verbinden (falls noch nicht geschehen)
3. Repository `DieLibertaerenWebpage` auswählen
4. Vercel erkennt **Next.js** automatisch – Einstellungen prüfen:

| Einstellung | Wert |
|-------------|------|
| Framework Preset | Next.js |
| Build Command | `npm run build` |
| Output Directory | *(leer lassen – Standard)* |
| Install Command | `npm install` |
| Node.js Version | 20.x |

5. **Deploy** klicken

Nach 1–2 Minuten ist die Seite unter `https://die-libertaeren-webpage.vercel.app` (oder ähnlich) erreichbar.

### Schritt 4: Automatische Deployments

Jeder Push auf `main` löst ein neues Production-Deployment aus. Pull Requests erzeugen Preview-Deployments mit eigener URL.

### Schritt 5 (optional): Eigene Subdomain

Für eine Test-Subdomain wie `neu.die-libertaeren.de`:

1. Vercel Dashboard → Projekt → **Settings** → **Domains**
2. Domain hinzufügen: `neu.die-libertaeren.de`
3. DNS beim Domain-Provider anpassen:
   - **CNAME** `neu` → `cname.vercel-dns.com`
4. Die bestehende Hauptdomain bleibt unverändert auf dem bisherigen Hosting.

### Kosten & Free Tier

Dieses Projekt nutzt ausschließlich **statische Seiten** (SSG). Es gibt:

- keine API-Routes
- keine Middleware
- keine Server Actions
- keine Datenbank oder Edge Functions

Damit bleibt das Projekt im **Vercel Hobby/Free Tier** ohne zusätzliche Serverkosten.

---

## Vercel Password Protection aktivieren

Password Protection schützt Deployments vor öffentlichem Zugriff – ideal für die Testversion vor dem Go-Live.

> **Hinweis:** Password Protection ist ein Feature von **Vercel Pro** (und höher). Im Hobby-Plan steht stattdessen **Vercel Authentication** für Preview-Deployments zur Verfügung (nur für Team-Mitglieder).

### So aktivierst du Password Protection (Pro-Plan)

1. [Vercel Dashboard](https://vercel.com/dashboard) öffnen
2. Projekt **DieLibertaerenWebpage** auswählen
3. **Settings** → **Deployment Protection** (Sidebar)
4. Bereich **Password Protection**:
   - Toggle **aktivieren**
   - **Umgebung** wählen:
     - `preview` – nur Preview-Deployments (empfohlen für Tests)
     - `prod_deployment_urls_and_all_previews` – Production-URL + alle Previews
     - `all` – alle Deployments inkl. Production
   - **Passwort** festlegen
   - **Save** klicken
5. Deployment-URL im Browser öffnen → Passwort-Eingabe erscheint
6. Nach einmaliger Eingabe wird ein Cookie gesetzt (gilt pro Deployment-URL)

### Passwort ändern oder deaktivieren

- Neues Passwort: unter **Deployment Protection** → Password Protection → Passwort ändern → **Save**
- Deaktivieren: Toggle ausschalten → **Save** (alle Deployments werden wieder öffentlich)

### Alternative im Hobby-Plan

Unter **Settings** → **Deployment Protection** → **Vercel Authentication** für Preview-Deployments aktivieren. Nur eingeladene Team-Mitglieder können die Seite dann sehen.

---

## Täglicher Entwicklungs-Workflow

1. `git pull` – neueste Änderungen holen
2. `npm run dev` – Entwicklungsserver auf Port 3010
3. Inhalte in `src/data/` bearbeiten (siehe unten)
4. `npm run lint` – Code prüfen
5. `git add .` → `git commit -m "..."` → `git push` → Vercel deployt automatisch

---

## Inhalte aktualisieren

### 1. Tagesaktuelle News (Homepage)

**Datei:** `src/data/daily-news.json`

```json
{
  "lastUpdated": "2026-06-20",
  "items": [
    {
      "id": "1",
      "title": "Überschrift",
      "summary": "Kurzbeschreibung",
      "url": "/blog/artikel-slug",
      "source": "Quelle",
      "date": "2026-06-20"
    }
  ]
}
```

Maximal 3 Einträge für die Homepage-Karten. `lastUpdated` bei jeder Änderung anpassen.

### 2. Zitate von @hummel_mathias

**Datei:** `src/data/quotes.json`

Neues Zitat zum `quotes`-Array hinzufügen:

```json
{
  "id": "11",
  "text": "Dein Zitat hier...",
  "date": "2026-06-20"
}
```

Rotation: täglich nach Tag im Jahr + alle 12 Sekunden auf der Homepage.

### 3. Libertärer Aufsatz der Woche

**Datei:** `src/data/weekly-essays.json`

Jeder Aufsatz hat ein `week`-Feld (1–52). Der Blog zeigt automatisch den Aufsatz der aktuellen Kalenderwoche.

### 4. Events

**Datei:** `src/data/events.json`

Neue Veranstaltungen zum `events`-Array hinzufügen. Datum im Format `YYYY-MM-DD`.

### 5. Blog-Artikel

**Datei:** `src/data/blog-posts.json`

Neuen Eintrag mit eindeutigem `slug` hinzufügen. Detailseite unter `/blog/[slug]`.

### 6. Thesenpapier v4

**Datei:** `src/data/thesen-v4.json`

Leitbild, Grundthese, Erste Maßnahmen und Themen-Tabelle. PDF unter `public/documents/thesen-v4.pdf` ablegen.

---

## Logo & Bilder

### Logo

- `public/logo.svg` – SVG (bevorzugt)
- `public/logo.png` – weißes Logo für dunkle Hintergründe (Footer)
- `public/logo-dark.png` – Logo für helle Hintergründe (Header)

### Hero- & Section-Bilder

10 detaillierte Grok-Imagine-Prompts in `public/IMAGE-PROMPTS.md`.

Generierte Bilder nach `public/images/` speichern.

---

## Projektstruktur

```
DieLibertaerenWebseite/
├── public/
│   ├── logo.svg / logo.png / logo-dark.png
│   ├── images/              # Grok-generierte Bilder
│   ├── documents/           # PDFs (Thesen v4, Satzung)
│   └── IMAGE-PROMPTS.md
├── src/
│   ├── app/                 # Next.js App Router Seiten
│   │   ├── page.tsx         # Homepage
│   │   ├── unsere-prinzipien/
│   │   ├── programm/
│   │   ├── events/
│   │   ├── blog/
│   │   ├── bundesvorstand/
│   │   ├── mitmachen/
│   │   ├── werde-mitglied/
│   │   ├── spenden/
│   │   ├── netzwerk/
│   │   ├── kontakt/
│   │   ├── impressum/
│   │   └── datenschutz/
│   ├── components/
│   │   ├── ui/              # shadcn/ui
│   │   ├── layout/          # Header, Footer
│   │   ├── home/            # Hero, News, Quotes, etc.
│   │   ├── programm/        # Thesen-Viewer
│   │   ├── blog/            # Weekly Essay
│   │   └── shared/          # CTA, Section, Forms
│   ├── data/                # Alle editierbaren Inhalte (JSON)
│   └── lib/                 # Utilities
├── .gitignore
├── next.config.ts
├── package.json
└── README.md
```

---

## Seitenübersicht

| Route | Beschreibung |
|-------|-------------|
| `/` | Homepage mit Hero, Zitaten, 3 Top News, Events, Leitbild |
| `/unsere-prinzipien` | Drei Säulen der Freiheit |
| `/programm` | Thesenpapier v4 (Tabs, Filter, Accordion) |
| `/thesen` | Redirect → `/programm` |
| `/events` | Veranstaltungen & Stammtische |
| `/blog` | Blog + Libertärer Aufsatz der Woche |
| `/bundesvorstand` | Vorstandsvorstellung |
| `/mitmachen` | Engagement-Übersicht |
| `/werde-mitglied` | Mitgliedschaft |
| `/spenden` | Spenden |
| `/netzwerk` | Vernetzung |
| `/kontakt` | Kontaktformular |
| `/impressum` | Impressum |
| `/datenschutz` | Datenschutz |

---

## Integration externer Formulare

Mitgliedschaft und Spenden verlinken vorerst auf die bestehende WordPress-Site. Für vollständige Integration:

- CleverReach-Newsletter: URL in `src/data/site-config.json`
- Mitgliedschaftsformular: API/Webhook anbinden oder Formular-Service einbinden
- Kontaktformular: `src/components/shared/contact-form.tsx` – Backend/API ergänzen

---

## Lizenz & Urheberrecht

Inhalte und Corporate Design gehören **DIE LIBERTÄREN e.V.**  
Technischer Code: siehe Repository-Lizenz (nach Wahl des Betreibers).