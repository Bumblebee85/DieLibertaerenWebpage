# Content-Automatisierung (Grok + Payload)

Portable Skripte für Tagesimpulse und Wochen-Blog – lokal, auf einem VPS oder per Cron.

## Voraussetzungen

In `.env.local` (oder Server-Umgebung):

```env
MONGODB_URI=mongodb+srv://.../die-libertaeren
PAYLOAD_SECRET=...mindestens-32-zeichen...
# Offizieller xAI-API-Schlüssel des DIE-LIBERTÄREN-Parteikontos
GROK_API_KEY=xai-...
```

Nur `GROK_API_KEY` wird verwendet (kein `XAI_API_KEY` o. Ä.). API-Anfragen laufen unter dem Parteikonto `die-libertaeren-party`.

Optional:

```env
GROK_MODEL=grok-3-mini
GENERATE_DAILY_COUNT=3
```

API-Key: [console.x.ai](https://console.x.ai/)

## Befehle

```bash
# Lokal (MongoDB direkt)
npm run generate:daily
npm run generate:weekly

# Über Vercel (wenn lokal querySrv ECONNREFUSED)
npm run generate:daily:remote
npm run generate:weekly:remote
```

Bei **querySrv ECONNREFUSED** unter Windows: In Atlas „Standard connection string“ kopieren und als `MONGODB_URI_DIRECT` in `.env.local` setzen (ohne SRV-DNS).

## Cron-Beispiele (Linux)

```cron
# Täglich 6:00 Uhr – 3 Impulse
0 6 * * * cd /pfad/zur/DieLibertaerenWebseite && npm run generate:daily >> /var/log/libertaeren-daily.log 2>&1

# Montags 7:00 Uhr – Wochen-Blog
0 7 * * 1 cd /pfad/zur/DieLibertaerenWebseite && npm run generate:weekly >> /var/log/libertaeren-weekly.log 2>&1
```

## Windows Task Scheduler

1. Programm: `pwsh.exe`
2. Argumente: `-NoProfile -Command "cd C:\Pfad\DieLibertaerenWebseite; npm run generate:daily"`
3. Trigger nach Bedarf (täglich / wöchentlich)

## Verhalten

| Skript | Collection | Idempotenz |
|--------|------------|------------|
| `generate:daily` | `daily-impulses` | Max. 3 Einträge pro Datum |
| `generate:weekly` | `weekly-essays` + `blog-posts` | Ein Aufsatz pro KW + Blog-Slug (`woche-2026-26`) |

Skripte laden `.env.local` und verbinden über `MONGODB_URI` (bevorzugt). Prüfen: `npm run check:payload`.

Inhalte erscheinen nach Veröffentlichung (`published: true`) auf Startseite (Wochenaufsatz unter „Aktuelle Veranstaltungen“) bzw. `/blog`.