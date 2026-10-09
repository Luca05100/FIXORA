# AutoBook — Sistem de Programări Online pentru Service-uri Auto

Aplicație web completă (frontend + backend) pentru un sistem de programări online, destinată service-urilor auto mici, detailing auto și vulcanizare.

## 🚀 Stack Tehnic

- **Frontend**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4
- **Backend**: API Routes (Next.js)
- **Bază de date**: SQLite (development) / PostgreSQL (producție) via Prisma ORM
- **Autentificare**: NextAuth.js v5 (JWT + Credentials)
- **Email**: Resend SDK (fallback: console log în dev)
- **Deploy**: Vercel + Neon/Supabase PostgreSQL

## 📋 Funcționalități

### Parte publică
- ✅ Landing page cu CTA „Programează-te acum"
- ✅ Formular de programare cu validare completă (frontend + backend)
- ✅ Notificări email automate (client + proprietar)
- ✅ Pagină de confirmare after-submit
- ✅ Rate limiting pe formularul public
- ✅ GDPR consent checkbox

### Panou admin
- ✅ Login securizat (email + parolă)
- ✅ Dashboard cu programări filtrabile pe status
- ✅ Confirmare manuală cu oră exactă
- ✅ Marcare finalizare + email mulțumire + link review Google
- ✅ Setări: servicii, orar, link Google Reviews, contact
- ✅ Statistici cu grafic (ultimele 30 zile)

### Automatizări
- ✅ Email automat la primirea cererii
- ✅ Email confirmare programare
- ✅ Email mulțumire + review la finalizare
- ✅ Cron reminder zilnic (pentru programări confirmate a doua zi)
- ✅ Webhook generic (WhatsApp/Telegram ready)

## 🛠 Instalare și rulare locală

### Cerințe
- Node.js 18+ (recomandat 20+)
- npm 9+

### Pași

```bash
# 1. Clonează repository-ul
git clone <repo-url>
cd autobook

# 2. Instalează dependențele
npm install

# 3. Configurează variabilele de mediu
cp .env.example .env
# Editează .env cu valorile tale

# 4. Creează baza de date și generează Prisma Client
npx prisma generate
npx prisma db push

# 5. Populează baza de date cu date inițiale
npx tsx prisma/seed.ts

# 6. Pornește serverul de development
npm run dev
```

Aplicația va fi disponibilă la **http://localhost:3000**.

### Login admin
- **Email**: `admin@autobook.ro`
- **Parolă**: `admin123`
- **URL**: http://localhost:3000/admin/login

## 🔐 Variabile de mediu

| Variabilă | Obligatoriu | Descriere |
|-----------|:-----------:|-----------|
| `DATABASE_URL` | ✅ | SQLite: `file:./dev.db` / PostgreSQL: `postgresql://...` |
| `AUTH_SECRET` | ✅ | Secret NextAuth (generează: `openssl rand -base64 32`) |
| `AUTH_URL` | ✅ | URL-ul aplicației (`http://localhost:3000` / `https://app.example.com`) |
| `RESEND_API_KEY` | ❌ | API key Resend (fără el, emailurile se loghează în consolă) |
| `EMAIL_FROM` | ❌ | Adresa de expeditor (`noreply@autobook.ro`) |
| `CRON_SECRET` | ✅ prod | Secret pentru protejarea endpoint-ului cron |
| `WEBHOOK_URL` | ❌ | URL webhook extern (WhatsApp, Telegram, etc.) |
| `WEBHOOK_SECRET` | ❌ | Secret pentru webhook-uri trimise |
| `INCOMING_WEBHOOK_SECRET` | ❌ | Secret pentru webhook-uri primite |

## 🚢 Deploy pe Vercel

### 1. Pregătire bază de date
1. Creează o bază de date PostgreSQL pe [Neon](https://neon.tech) sau [Supabase](https://supabase.com)
2. Copiază connection string-ul

### 2. Actualizare Prisma pentru PostgreSQL
În `prisma/schema.prisma`, schimbă:
```prisma
datasource db {
  provider = "postgresql"    // ← schimbat din "sqlite"
  url      = env("DATABASE_URL")
}
```

### 3. Deploy pe Vercel
```bash
# Instalează Vercel CLI
npm i -g vercel

# Deploy
vercel

# Setează variabilele de mediu în dashboard-ul Vercel
# sau cu CLI:
vercel env add DATABASE_URL
vercel env add AUTH_SECRET
vercel env add AUTH_URL
vercel env add RESEND_API_KEY
vercel env add CRON_SECRET
```

### 4. Inițializare bază de date în producție
```bash
# Generează schema
npx prisma db push

# Seed (opțional — sau creează admin-ul din UI)
npx tsx prisma/seed.ts
```

## ⏰ Configurare Cron Reminder

### Local (development)
Rulează manual:
```bash
curl http://localhost:3000/api/cron/reminder \
  -H "Authorization: Bearer dev-cron-secret"
```

### Vercel (producție)
Cron-ul este configurat automat în `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/reminder",
      "schedule": "0 18 * * *"
    }
  ]
}
```
Aceasta rulează zilnic la 18:00 UTC (21:00 ora României).

> **Important**: Setează `CRON_SECRET` în Vercel Environment Variables. Vercel trimite automat acest secret ca header `Authorization: Bearer <secret>`.

### Alternativă: cron.org / GitHub Actions
Dacă nu folosești Vercel, poți folosi un serviciu extern de cron:
```bash
# crontab -e
0 21 * * * curl -H "Authorization: Bearer YOUR_SECRET" https://your-app.com/api/cron/reminder
```

## 🎨 Personalizare per client

### Branding
Editează `src/config/branding.ts` pentru a schimba:
- Numele businessului
- Culorile (primary, accent, etc.)
- Textele de pe landing page
- Features afișate
- Informații de contact implicite

### Setări din admin
Din panoul admin (`/admin/setari`):
- Numele businessului
- Telefon, email, adresă
- Link Google Reviews
- Program de lucru
- Culoare principală
- URL logo

### Servicii
Din panoul admin, adaugă/editează/dezactivează servicii oferite.

## 📁 Structura proiectului

```
autobook/
├── prisma/
│   ├── schema.prisma           # Schema bazei de date
│   └── seed.ts                 # Date inițiale
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   ├── programare/         # Formular programare
│   │   ├── confirmare/         # Pagina post-submit
│   │   ├── admin/              # Panou admin (login, programări, setări, statistici)
│   │   └── api/                # API routes
│   │       ├── appointments/   # CRUD programări
│   │       ├── services/       # CRUD servicii
│   │       ├── settings/       # Setări
│   │       ├── stats/          # Statistici
│   │       ├── cron/           # Cron reminder
│   │       └── webhook/        # Webhook generic
│   ├── components/
│   │   ├── ui/                 # Button, Card, Input, Select, etc.
│   │   ├── admin/              # AdminShell, sidebar
│   │   └── layout/             # Header, Footer
│   ├── lib/
│   │   ├── auth.ts             # NextAuth config
│   │   ├── email.ts            # Email service (Resend)
│   │   ├── notifications.ts    # Orchestrare notificări
│   │   ├── prisma.ts           # Prisma client singleton
│   │   ├── rate-limit.ts       # Rate limiter
│   │   ├── validators.ts       # Zod schemas (shared)
│   │   └── webhook.ts          # Webhook dispatcher
│   ├── config/
│   │   └── branding.ts         # Configurare branding centrală
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   └── middleware.ts           # Auth middleware
├── .env.example                # Template variabile de mediu
├── vercel.json                 # Cron config Vercel
├── next.config.ts              # Security headers
└── README.md
```

## ⚠️ Simplificări / Ce trebuie îmbunătățit înainte de producție

### Prioritate mare
1. **Rate limiting in-memory** — în producție cu multiple instanțe, trebuie Redis (Upstash)
2. **Parola admin hardcodată în seed** — schimbă imediat `admin123` cu o parolă puternică
3. **Template-uri email simple** — de înlocuit cu template-uri HTML responsive (React Email)
4. **Niciun test automat** — de adăugat unit tests (Vitest) și E2E tests (Playwright)
5. **Validare dată programare** — nu verifică dacă ziua selectată e în programul de lucru

### Prioritate medie
6. **Upload logo** — acum se folosește doar URL; de adăugat upload cu Vercel Blob/Cloudinary
7. **Paginare admin** — lista de programări nu are paginare vizuală (doar API-ul o suportă)
8. **Multi-tenant** — codul e single-tenant; pentru mai mulți clienți, trebuie adăugat `tenantId` pe toate modelele
9. **Pagina de privacy policy / terms** — necesară pentru GDPR
10. **Logging structurat** — de înlocuit `console.log` cu un logger (Pino/Winston)

### Nice to have
11. **Calendar vizual** — în loc de `<input type="date">`, un calendar React interactiv
12. **Notificări WhatsApp/Telegram** — modulul webhook e pregătit, trebuie doar conectat
13. **Export date** — export CSV/PDF pentru programări
14. **Dark mode** — suport pentru tema dark
15. **i18n** — suport multi-limbă (acum doar română)
16. **PWA** — Progressive Web App cu notificări push
17. **Middleware migrat** — Next.js 16 recomandă `proxy` în loc de `middleware` (deprecation warning)
