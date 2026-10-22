# AuditMate Survey 💛

A 3-minute, phone-first survey (English / မြန်မာ) to find out which auditing tasks eat the most time, so we know what to build first in AuditMate.

- 9 tap-only questions; the task list adapts to where she works
- Answers autosave on her phone (refresh-safe)
- **No backend, no database, no accounts, no tracking.** Answers reach you when she taps **Send**, which opens her phone's share sheet (Viber / Telegram / Messenger) with a readable summary. Fallbacks: copy to clipboard, or save as a `.json` file.

---

## 1. Before you send it: set the names

Edit [src/config/personal.ts](src/config/personal.ts):

```ts
export const PERSONAL = {
  herName: 'Her name',   // shown on welcome + thank-you screens
  yourName: 'Your name', // shown on the Send button and thank-you message
}
```

## 2. Run it locally

Requires Node.js 22.12+ (24 recommended).

```bash
npm install
npm run dev        # http://localhost:5173 — use browser DevTools phone view (F12 → phone icon)
```

Other commands:

| Command | What it does |
|---|---|
| `npm test` | Runs the unit tests (survey logic, config, export, storage) |
| `npm run typecheck` | TypeScript check |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serves the production build locally |

## 3. Deploy for free (Cloudflare Pages)

Pick **one** of these. Both are free and give you an `https://….pages.dev` link.

### Option A — Connect GitHub (recommended: every `git push` redeploys)

1. Create a repository on GitHub (it can be **private**) and push this project:
   ```bash
   git remote add origin https://github.com/<you>/auditmate-survey.git
   git push -u origin main
   ```
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → sign up / log in (free plan).
3. **Workers & Pages → Create → Pages → Connect to Git**, then pick your repository.
   (Cloudflare reorganises this menu from time to time; look for "Pages" and "Connect to Git".)
4. Build settings:
   | Setting | Value |
   |---|---|
   | Framework preset | `React (Vite)` or `None` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Environment variables | none needed (`.node-version` already pins Node 24) |
5. **Save and Deploy.** After ~1 minute you get a link like `https://auditmate-survey.pages.dev`.

### Option B — Upload from your computer (no GitHub)

```bash
npm run build
npx wrangler login                                          # opens the browser once
npx wrangler pages deploy dist --project-name auditmate-survey
```

Run the last two commands again whenever you change something.

### Alternatives
Vercel and Netlify work the same way (build `npm run build`, output `dist`). Netlify also reads [public/_headers](public/_headers); on Vercel those headers are ignored, which is harmless.

## 4. Before sending her the link

1. Open the deployed link on your own phone and run through [docs/qa-checklist.md](docs/qa-checklist.md) (~10 min). Especially: tap the link **inside Viber/Telegram** and do a full test send to yourself.
2. On the welcome screen, tap **Start over** if you tested on the phone she'll use, so she doesn't see your test answers.
3. Send her the link 💛

## 5. Reading her answers

You'll receive a message like this:

```
AuditMate survey 💛
ID abcdef12 · 2026-10-22 10:55 · in Myanmar · 3 min

3. Which of these take the most time or feel the most annoying?
   #1 KYC — checking customer documents
   #2 Loan file reviews

6. How often do you do "KYC — checking customer documents"?
   • Almost every working day
7. How long does "KYC — checking customer documents" usually take each time?
   • 1–2 hours
...
```

Labels are always in English so they're easy to compare; her note stays exactly as she wrote it. What to look at first:

- **Q3 #1–#3** → her most painful tasks → what to prototype first
- **Q6 × Q7** → how much time the #1 task costs per week
- **Q5** → whether to build around Excel, PDFs, or paper
- **Q8** → laptop app vs phone app
- **Q9 + note** → her own vote

## Changing questions or wording

- All questions, options and task lists: [src/config/survey.ts](src/config/survey.ts)
- Buttons, screens, messages: [src/config/ui.ts](src/config/ui.ts)
- Human-readable copy of everything: [docs/survey-content.md](docs/survey-content.md)

Every option has an `id` (what gets sent) and a `label` (what she sees). Change labels freely; keep ids stable. Run `npm test` afterwards — it checks every text exists in both languages and ids are unique.

## Project structure

```
src/
  config/        questions, task lists, UI text, names, EN/MY helpers
  survey/        flow logic, state reducer, autosave, export/message builder (+ tests)
  screens/       Welcome, Question, Review, Thanks
  components/    ChoiceCard, Button, ProgressBar, LanguageToggle, Chip, Checkbox, layout
  lib/share.ts   share sheet / clipboard / file download helpers
public/
  _headers       security headers for Cloudflare Pages (noindex, strict CSP)
docs/
  survey-content.md   all wording in EN + MY
  qa-checklist.md     manual test on real phones
```

## Privacy

- No names, companies, client data or financial data are asked for.
- Nothing is sent anywhere until she taps **Send** and picks who to share with.
- Draft answers are stored only in her browser (`localStorage`) and can be cleared with **Start over**.
- The page is marked `noindex`, so search engines won't list it. Anyone with the link can still open it, but there is nothing to see except an empty survey: no one can view anyone else's answers.
- The only external requests are Google Fonts (Inter + Noto Sans Myanmar).

## Troubleshooting

| Problem | Fix |
|---|---|
| Send says "Copied! Now paste it…" | That browser (often Viber/Telegram's in-app browser or desktop Firefox) has no share sheet. Pasting into a chat works fine, or open the link in Chrome/Safari. |
| Burmese text looks like boxes | The device can't load Google Fonts. Most phones have a Myanmar system font as fallback; otherwise check the internet connection. |
| She sees old answers | Tap **Start over** on the welcome screen. |
| Cloudflare build fails on Node version | Make sure `.node-version` is committed, or set env var `NODE_VERSION=24` in the Pages project settings. |
