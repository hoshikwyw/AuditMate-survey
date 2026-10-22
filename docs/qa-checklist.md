# Manual QA checklist

Run this on a real phone before sending her the link. ~10 minutes.

## Before you start
- [ ] `src/config/personal.ts` has her name and your name (not "Her name" / "Your name").
- [ ] Cloudflare has `RESEND_API_KEY` and `TO_EMAIL` set, and you redeployed after setting them.
- [ ] Open the deployed link, not localhost.

## Phones to test
Test on at least one, ideally both:
- [ ] Android, Chrome
- [ ] iPhone, Safari

And **open the link from inside Viber/Telegram** (tap it in a chat). Those apps open their own in-app browser, which behaves a little differently.

## Flow
- [ ] Link preview in Viber/Telegram shows "A quick favour 💛".
- [ ] Welcome screen shows her name. Tap the language button: everything switches to Burmese and back.
- [ ] Q1: tapping a workplace moves to the next question by itself.
- [ ] Q2: the task list matches the workplace (e.g. bank → loan files, KYC).
- [ ] Q3: tap 3 tasks → numbers 1, 2, 3 appear; a 4th can't be picked; **Clear** resets.
- [ ] Q4: **Skip** works and moves on.
- [ ] Q5: picking **Not sure** clears the others.
- [ ] Q6 / Q7: the question names her #1 task.
- [ ] Q9: tapping a suggestion chip fills the note; the note stays editable; counter shows /300.
- [ ] Back button keeps all answers.

## Draft saving
- [ ] Halfway through, close the tab and reopen the link → "Continue where I left off" brings her back.
- [ ] Switch language halfway → answers still there.

## Review + send
- [ ] Review shows every answer; **Edit** on any one → change it → **Next** returns to review.
- [ ] Send is disabled until the consent box is ticked.
- [ ] **Send** shows "Sending…", then the thank-you screen — no other app opens.
- [ ] The email "AuditMate survey from mama 💛" arrives in your inbox within a minute (check Spam the first time and mark it Not spam). The time shown is the phone's local time.
- [ ] Tapping Send several times quickly gives **one** email.
- [ ] Turn on airplane mode → Send → "Couldn't send yet" box appears with **Try again / Copy my answers / Save answers as a file**. Turn airplane mode off → **Try again** → thank-you screen + email arrives.

## Display
- [ ] Burmese text is not cut off or overlapping anywhere (especially stacked letters like ကျော်, ပြီး).
- [ ] Nothing scrolls sideways.
- [ ] Buttons at the bottom aren't hidden behind the phone's home bar.

## Reset for the real thing
- [ ] After testing on **her** phone (if you borrow it), clear the draft: tap **Start over** on the welcome screen, or clear site data — otherwise she'll see your test answers.
