# Content-Automatisierung (Grok + Payload)

Portable Skripte für Tagesimpulse und Wochen-Blog – lokal, auf einem VPS oder per Cron.

## Voraussetzungen

In `.env.local` (oder Server-Umgebung):

```env
MONGODB_URI=mongodb+srv://.../die-libertaeren
PAYLOAD_SECRET=...mindestens-32-zeichen...
GROK_API_KEY=xai-...
```

Optional:

```env
GROK_MODEL=grok-3-mini
GENERATE_DAILY_COUNT=3
```

API-Key: [console.x.ai](https://console.x.ai/)

## Befehle

```bash
# 3 Tagesimpulse für heute (überspringt, wenn bereits vorhanden)
npm run generate:daily

# Ein Blog-Artikel pro Kalenderwoche
npm run generate:weekly
```

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
| `generate:weekly` | `blog-posts` | Ein Post pro KW-Slug (`woche-2026-26`) |

Inhalte erscheinen nach Veröffentlichung (`published: true`) auf Startseite bzw. `/blog`.