# AuditMate Survey 💛

A 3-minute, phone-first survey (English / မြန်မာ) to find out which auditing tasks eat the most time, so we know what to build first in AuditMate.

- 9 tap-only questions; the task list adapts to where she works
- Answers autosave on her phone (refresh-safe)
- **One tap to send, silently.** Her answers go to a small Cloudflare Function on the same site, which checks them and emails them to you through [Resend](https://resend.com). She just sees the thank-you screen.
- No database, no accounts, no tracking. The email API key lives only in Cloudflare, never in the page.
- If sending fails (e.g. no internet), nothing is lost: she gets **Try again**, **Copy my answers**, and **Save answers as a file**.

```
Her phone ──tap Send──▶ /api/submit (Cloudflare Function) ──validates──▶ Resend ──▶ your inbox
```

---

## 1. Set the names

[src/config/personal.ts](src/config/personal.ts) — currently `mama` and `Khaing`.

## 2. Set up Resend (free, ~3 min)

1. Sign up at [resend.com](https://resend.com) **with the email address where you want her answers**.
2. **API Keys → Create API key** (permission: *Sending access* is enough). Copy the key (`re_…`).

That's it — no domain needed. Without a verified domain, Resend sends from `onboarding@resend.dev` and **only to your own Resend account email**, which is exactly what we want. Free plan: 3,000 emails/month, 100/day.

## 3. Run it locally

Requires Node.js 22.12+ (24 recommended).

```bash
npm install
npm run dev          # survey UI with hot reload → http://localhost:5173
```

`npm run dev` alone shows the full survey, but **Send** will fail (no function running) — you'll see the Try again / Copy / Save box, which is also a good way to test the fallback.

To test real sending locally:

```bash
cp .dev.vars.example .dev.vars      # then put your real RESEND_API_KEY and TO_EMAIL in it
npm run build
npm run dev:api                     # runs the Cloudflare Function on http://localhost:8788
```

Then either open **http://localhost:8788** (production build + function), or keep `npm run dev` running too — it forwards `/api` to port 8788, so http://localhost:5173 sends for real.

`.dev.vars` is git-ignored. Never commit your key.

Other commands:

| Command | What it does |
|---|---|
| `npm test` | Unit tests (survey logic, server validation, email text, storage) |
| `npm run typecheck` | TypeScript check for the app and the function |
| `npm run build` | Production build into `dist/` |

## 4. Deploy for free (Cloudflare Pages)

The function in [functions/api/submit.ts](functions/api/submit.ts) is deployed automatically with the site — Cloudflare Pages picks up the `functions/` folder.

### Option A — Connect GitHub (recommended: every `git push` redeploys)

1. Create a repository on GitHub (it can be **private**) and push:
   ```bash
   git remote add origin https://github.com/<you>/auditmate-survey.git
   git push -u origin main
   ```
2. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
   (Cloudflare reorganises this menu from time to time; look for "Pages" and "Connect to Git".)
3. Build settings:
   | Setting | Value |
   |---|---|
   | Framework preset | `React (Vite)` or `None` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
4. Before the first deploy (or right after, then redeploy): **Settings → Variables and Secrets** → add, for **Production**:
   | Name | Type | Value |
   |---|---|---|
   | `RESEND_API_KEY` | **Secret** | your `re_…` key |
   | `TO_EMAIL` | Text or Secret | your Resend account email |
5. **Deploy.** You get a link like `https://auditmate-survey.pages.dev`.

> Changed a variable after deploying? Go to **Deployments → ⋯ → Retry deployment** so the function picks it up.

### Option B — Upload from your computer (no GitHub)

```bash
npm run build
npx wrangler login
npx wrangler pages deploy dist --project-name auditmate-survey
npx wrangler pages secret put RESEND_API_KEY --project-name auditmate-survey
npx wrangler pages secret put TO_EMAIL --project-name auditmate-survey
npx wrangler pages deploy dist --project-name auditmate-survey   # deploy again so the secrets apply
```

Run from the project root (not inside `dist/`) so the `functions/` folder is included.

## 5. Before sending her the link

1. On your own phone, open the deployed link and go through [docs/qa-checklist.md](docs/qa-checklist.md) — including **one real test submission**. Check the email arrives (and look in Spam the first time; mark it "Not spam").
2. Tap **Start over** on the welcome screen if you tested on the phone she'll use.
3. Send her the link 💛

## 6. Reading her answers

You'll get an email titled **"AuditMate survey from mama 💛"**:

```
AuditMate survey 💛
ID abcdef12 · 2026-10-22 16:33 · in Myanmar · 3 min

3. Which of these take the most time or feel the most annoying?
   #1 KYC — checking customer documents
   #2 Loan file reviews

6. How often do you do "KYC — checking customer documents"?
   • Almost every working day
7. How long does "KYC — checking customer documents" usually take each time?
   • 1–2 hours
...
— Raw data (JSON) —
{ … }
```

The time is her phone's local time. Labels are always in English so they're easy to compare; her note stays exactly as she wrote it. The JSON at the bottom keeps the raw answer ids for later.

What to look at first (her work: Excel ⇄ vouchers ⇄ warehouse stock):
- **Q2 #1–#3** → her most painful checks → what to prototype first
- **Q7 × Q8** → how much time the #1 task costs per week
- **Q3** → how vouchers get into the app (paper → manual tick list / photos; PDF or software → import)
- **Q4** → file size: small files = tick-list UI, big files = automatic matching first
- **Q5** → her top 3 problems = the automatic checks to build (duplicates, skipped numbers, qty/stock differences…)
- **Q6** → what the output should look like (highlighted Excel, problem list, Word report)
- **Q9** → laptop app, phone app, or both (phone for warehouse counts)
- **Q10 + note** → her own vote

## Changing questions or wording

- Questions, options, task lists: [src/config/survey.ts](src/config/survey.ts)
- Buttons, screens, messages: [src/config/ui.ts](src/config/ui.ts)
- Readable copy of everything: [docs/survey-content.md](docs/survey-content.md)

Every option has an `id` (what gets sent) and a `label` (what she sees). Change labels freely; keep ids stable. The server validates against the same config, so new options work automatically. Run `npm test` afterwards.

## Project structure

```
functions/
  api/submit.ts  Cloudflare Function: validate → email via Resend
src/
  config/        questions, task lists, UI text, names, EN/MY helpers
  survey/        flow logic, state, autosave, email text, server validation (+ tests)
  screens/       Welcome, Question, Review, Thanks
  components/    ChoiceCard, Button, ProgressBar, LanguageToggle, Chip, Checkbox, layout
  lib/           submit (POST /api/submit), fallback (copy / save file)
public/
  _headers       security headers (noindex, strict CSP)
docs/
  survey-content.md   all wording in EN + MY
  qa-checklist.md     manual test on real phones
```

## Security & privacy

- No names, companies, client data or financial data are asked for.
- Nothing leaves her phone until she ticks consent and taps **Send**.
- The Resend key is a Cloudflare secret; the browser only ever talks to your own `/api/submit`.
- The function **rebuilds** the submission from scratch, accepting only option ids that exist in the survey config (unknown fields are dropped), checks it's complete and consistent, limits size and note length, rejects posts from other websites, and has a hidden honeypot field against bots.
- Retries can't send duplicate emails (Resend idempotency key). Double taps are ignored.
- Because Resend only sends to your own email, the endpoint can't be abused to email anyone else. Worst case, someone who finds the link could send you junk survey emails — capped by Resend's 100/day free limit.
- Nobody can read submitted answers from the site: there is no storage and no admin page.
- The page is `noindex`. The only third-party requests from her phone are Google Fonts.

## Troubleshooting

| Problem | Fix |
|---|---|
| Send always shows "Couldn't send yet" on the deployed site | Check **Settings → Variables and Secrets** has both `RESEND_API_KEY` and `TO_EMAIL`, then **retry the deployment**. Look at **Deployments → Functions logs** for `Resend error …` or `not configured`. |
| Resend error 403 "only send testing emails to your own email address" | `TO_EMAIL` must be the email you signed up to Resend with (or verify a domain in Resend). |
| No email but site says thank you | Check Spam / Promotions. The Resend dashboard → **Emails** shows every send. |
| Send fails on `npm run dev` | Expected — run `npm run dev:api` too (see step 3). |
| Burmese text looks like boxes | The device can't load Google Fonts; most phones fall back to a system Myanmar font. |
| She sees old answers | Tap **Start over** on the welcome screen. |
