# AuditMate Survey — Full Content (v2: Excel ⇄ vouchers ⇄ warehouse)

> Generated from `src/config/survey.ts` and `src/config/ui.ts` — edit those files, not this one.
> **Myanmar text is a draft**: have it checked by a native speaker.
> `id` = what gets sent. Labels can change freely; ids should stay stable.

Her work: receive Excel files → check each row against vouchers → compare with actual warehouse stock → find what is missing or wrong → find evidence and why.

Flow: Welcome → Q1 → Q2 → Q3 → Q4 → Q5 → Q6 → Q7 → Q8 → Q9 → Q10 → Review → Thank you

Conditional: Q2 (ranking) only appears with 2+ tasks picked in Q1. Q7–Q8 name her #1 task and are hidden if she only picked "Something not on this list" (not_listed).

---

## Q1. Which of these checks do you do? (multi, required)

| | English | မြန်မာ |
|---|---|---|
| Question | Which of these checks do you do? | ဒီထဲက ဘယ်လို စစ်ဆေးမှုတွေ လုပ်ရလဲ? |
| Helper | Tap all that apply. | သက်ဆိုင်တာ အားလုံး နှိပ်ပါ။ |

| id | English | မြန်မာ |
|---|---|---|
| excel_vouchers | Checking Excel records against vouchers | Excel စာရင်းတွေကို voucher နဲ့ တိုက်စစ်တာ |
| stock_count | Counting warehouse stock and comparing with records | ဂိုဒေါင်ထဲက ပစ္စည်းတွေ ရေတွက်ပြီး စာရင်းနဲ့ တိုက်စစ်တာ |
| stock_in_out | Checking stock-in / stock-out vouchers | ပစ္စည်း အဝင် / အထွက် voucher တွေ စစ်တာ |
| invoices_receipts | Checking vouchers against invoices and receipts | Voucher တွေကို invoice၊ ပြေစာ နဲ့ တိုက်စစ်တာ |
| cash_bank | Checking cash / bank records | ငွေသား / ဘဏ် စာရင်း စစ်တာ |
| sales_delivery | Checking sales and delivery records | အရောင်းနဲ့ ပစ္စည်းပို့ဆောင်မှု စာရင်း စစ်တာ |
| approvals | Checking approvals and signatures | ခွင့်ပြုချက်နဲ့ လက်မှတ်တွေ စစ်တာ |
| totals | Checking totals and calculations | စုစုပေါင်းနဲ့ တွက်ချက်မှုတွေ စစ်တာ |
| investigate | Investigating differences and finding evidence | ကွာခြားချက်တွေကို စုံစမ်းပြီး အထောက်အထား ရှာတာ |
| reports | Writing up findings / reports | တွေ့ရှိချက် / Report ရေးတာ |
| not_listed | Something not on this list | ဒီစာရင်းထဲ မပါတဲ့ အလုပ် |

---

## Q2. Which of these take the most time or feel the most annoying? (rank up to 3, required)

| | English | မြန်မာ |
|---|---|---|
| Question | Which of these take the most time or feel the most annoying? | ဒီထဲက ဘယ်အလုပ်တွေက အချိန်အကုန်ဆုံး ဒါမှမဟုတ် စိတ်အညစ်ဆုံးလဲ? |
| Helper | Tap up to 3 — your first tap is #1. | အများဆုံး ၃ ခု နှိပ်ပါ — ပထမနှိပ်တာက နံပါတ် ၁ ပါ။ |

Options: only the tasks she picked in Q1 (tap order = ranking).

---

## Q3. What do the vouchers look like? (multi, required)

| | English | မြန်မာ |
|---|---|---|
| Question | What do the vouchers look like? | Voucher တွေက ဘယ်လိုပုံစံလဲ? |
| Helper | Tap all that apply. | သက်ဆိုင်တာ အားလုံး နှိပ်ပါ။ |

| id | English | မြန်မာ |
|---|---|---|
| paper | Paper vouchers | စာရွက် voucher |
| pdf | Scanned PDF files | Scan ဖတ်ထားတဲ့ PDF ဖိုင် |
| photos | Photos on a phone | ဖုန်းထဲက ဓာတ်ပုံ |
| software | Inside accounting software | စာရင်းကိုင် Software ထဲမှာ |
| excel | Also in Excel | Excel ထဲမှာလည်း ရှိတယ် |
| not_sure *(clears others)* | Not sure | မသေချာပါ |

---

## Q4. How many rows does a typical Excel file have? (single, skippable)

| | English | မြန်မာ |
|---|---|---|
| Question | How many rows does a typical Excel file have? | ပုံမှန် Excel ဖိုင်တစ်ခုမှာ အတန်း (row) ဘယ်လောက် ရှိလဲ? |
| Helper | A rough guess is fine. | ခန့်မှန်းပြီး ဖြေရင် ရပါတယ်။ |

| id | English | မြန်မာ |
|---|---|---|
| lt_50 | Less than 50 | ၅၀ အောက် |
| 50_200 | 50–200 | ၅၀–၂၀၀ |
| 200_1000 | 200–1,000 | ၂၀၀–၁,၀၀၀ |
| 1000_5000 | 1,000–5,000 | ၁,၀၀၀–၅,၀၀၀ |
| gt_5000 | More than 5,000 | ၅,၀၀၀ ထက် ပို |
| varies | It varies / not sure | အမျိုးမျိုးပဲ / မသေချာပါ |

---

## Q5. Which problems do you find most often? (multi, up to 3, required)

| | English | မြန်မာ |
|---|---|---|
| Question | Which problems do you find most often? | ဘယ်လို အမှားတွေကို အတွေ့ရ အများဆုံးလဲ? |
| Helper | Pick up to 3. | အများဆုံး ၃ ခု ရွေးပါ။ |

| id | English | မြန်မာ |
|---|---|---|
| missing_voucher | A row has no voucher (or a voucher has no row) | Voucher မရှိတဲ့ စာရင်း (ဒါမှမဟုတ် စာရင်းမရှိတဲ့ voucher) |
| amount_mismatch | Amount doesn't match | ငွေပမာဏ မကိုက်ညီတာ |
| qty_mismatch | Quantity doesn't match | အရေအတွက် မကိုက်ညီတာ |
| stock_diff | Warehouse stock is more or less than the records | ဂိုဒေါင်ထဲက ပစ္စည်း စာရင်းထက် ပို / လို နေတာ |
| duplicates | Duplicate entries | နှစ်ခါ ထပ်သွင်းထားတာ |
| skipped_numbers | Voucher numbers skipped | Voucher နံပါတ် ကျော်နေတာ |
| wrong_date | Wrong date | ရက်စွဲ မှားတာ |
| wrong_item | Wrong item, code or account | ပစ္စည်း၊ ကုဒ် ဒါမှမဟုတ် account မှားတာ |
| missing_approval | Missing approval or signature | ခွင့်ပြုချက် / လက်မှတ် မပါတာ |
| wrong_totals | Totals don't add up | စုစုပေါင်း မမှန်တာ |
| not_sure *(clears others)* | Not sure | မသေချာပါ |

---

## Q6. When you find a problem, how do you note it now? (multi, skippable)

| | English | မြန်မာ |
|---|---|---|
| Question | When you find a problem, how do you note it now? | အမှားတွေ့ရင် အခု ဘယ်လို မှတ်ထားလဲ? |
| Helper | Tap all that apply. | သက်ဆိုင်တာ အားလုံး နှိပ်ပါ။ |

| id | English | မြန်မာ |
|---|---|---|
| highlight | Highlight cells in Excel | Excel မှာ အရောင်ခြယ်ထားတာ |
| excel_comments | Comments / notes in Excel | Excel ထဲမှာ comment / မှတ်ချက် ရေးတာ |
| excel_list | A separate list in Excel | Excel မှာ သီးသန့်စာရင်း လုပ်တာ |
| word_report | In a Word document or report | Word ဖိုင် ဒါမှမဟုတ် report ထဲမှာ |
| paper_notes | On paper / in a notebook | စာရွက် / မှတ်စုစာအုပ်ထဲမှာ |
| tell_boss | I tell my boss or colleague directly | အထက်လူကြီး / လုပ်ဖော်ကိုင်ဖက်ကို တိုက်ရိုက်ပြောတာ |
| chat | By Viber / Telegram message | Viber / Telegram နဲ့ ပို့တာ |

---

## Q7. How often do you do "{task}"? (single, skippable)

| | English | မြန်မာ |
|---|---|---|
| Question | How often do you do "{task}"? | "{task}" ကို ဘယ်လောက် ခဏခဏ လုပ်ရလဲ? |
| Helper | A rough guess is fine. | ခန့်မှန်းပြီး ဖြေရင် ရပါတယ်။ |

| id | English | မြန်မာ |
|---|---|---|
| daily | Almost every working day | အလုပ်ရက်တိုင်းလိုလို |
| 2_3_week | 2–3 times a week | တစ်ပတ်မှာ ၂–၃ ခါ |
| weekly | About once a week | တစ်ပတ်မှာ တစ်ခါလောက် |
| few_month | A few times a month | တစ်လမှာ အနည်းငယ် |
| month_end | Mostly at month-end | လကုန်မှာ အများဆုံး |
| not_sure | Not sure | မသေချာပါ |

---

## Q8. How long does "{task}" usually take each time? (single, skippable)

| | English | မြန်မာ |
|---|---|---|
| Question | How long does "{task}" usually take each time? | "{task}" ကို တစ်ခါလုပ်ရင် ပုံမှန် ဘယ်လောက်ကြာလဲ? |
| Helper | Think of one normal time. | ပုံမှန် တစ်ခါကို စဉ်းစားကြည့်ပါ။ |

| id | English | မြန်မာ |
|---|---|---|
| lt_15m | Less than 15 minutes | ၁၅ မိနစ်အောက် |
| 15_30m | 15–30 minutes | ၁၅–၃၀ မိနစ် |
| 30_60m | 30–60 minutes | ၃၀–၆၀ မိနစ် |
| 1_2h | 1–2 hours | ၁–၂ နာရီ |
| 2_4h | 2–4 hours | ၂–၄ နာရီ |
| gt_4h | More than 4 hours | ၄ နာရီထက် ပိုကြာ |
| depends | It depends / not sure | အခြေအနေပေါ် မူတည်တယ် / မသေချာပါ |

---

## Q9. Where would you use a tool like this? (single, required)

| | English | မြန်မာ |
|---|---|---|
| Question | Where would you use a tool like this? | ဒီလို Tool ကို ဘာနဲ့ သုံးချင်လဲ? |

| id | English | မြန်မာ |
|---|---|---|
| office_pc | Office computer (Windows) | ရုံးကွန်ပျူတာ (Windows) |
| own_laptop | My own Windows laptop | ကိုယ်ပိုင် Windows Laptop |
| mac | Mac | Mac |
| phone | Phone | ဖုန်း |
| laptop_and_phone | Laptop at the desk + phone in the warehouse | စားပွဲမှာ Laptop + ဂိုဒေါင်မှာ ဖုန်း |
| not_sure | Not sure | မသေချာပါ |

---

## Q10. If I build one thing first, what should it do? (single, required)

| | English | မြန်မာ |
|---|---|---|
| Question | If I build one thing first, what should it do? | ပထမဆုံး တစ်ခု လုပ်ပေးရမယ်ဆိုရင် ဘာလုပ်ပေးစေချင်လဲ? |
| Helper | Your final vote 💛 | နောက်ဆုံးမဲ ပေးပါ 💛 |

| id | English | မြန်မာ |
|---|---|---|
| auto_match | Match Excel rows with vouchers for me | Excel စာရင်းနဲ့ voucher ကို အလိုအလျောက် တိုက်ပေးတာ |
| find_errors | Find duplicates, skipped numbers and wrong totals | ထပ်နေတာ၊ ကျော်နေတဲ့ နံပါတ်၊ စုစုပေါင်း မှားတာ ရှာပေးတာ |
| stock_compare | Compare stock records with the warehouse count | စာရင်းနဲ့ ဂိုဒေါင် ရေတွက်ချက်ကို နှိုင်းယှဉ်ပေးတာ |
| checklist | Tick each line as OK / missing / wrong, with notes and photos | စာရင်းတစ်ကြောင်းချင်းကို မှန် / မရှိ / မှား လို့ မှတ်ပြီး မှတ်ချက်၊ ဓာတ်ပုံ ထည့်လို့ရတာ |
| evidence | Keep the evidence for each problem in one place | အမှားတစ်ခုချင်းရဲ့ အထောက်အထားတွေကို တစ်နေရာထဲ စုထားတာ |
| report | Make the problem list / report for me | အမှားစာရင်း / Report ကို အလိုအလျောက် ထုတ်ပေးတာ |
| surprise_me | Surprise me — build what you think helps | ကိုယ်ထင်တာ လုပ်ပေးပါ (Surprise me) |

Optional note — quick-tap chips:

| English | မြန်မာ |
|---|---|
| I want to find the matching voucher faster. | သက်ဆိုင်တဲ့ voucher ကို မြန်မြန် ရှာချင်တယ်။ |
| I want stock differences found automatically. | ပစ္စည်း ကွာခြားချက်တွေကို အလိုအလျောက် ရှာပေးစေချင်တယ်။ |
| I want the report made for me. | Report ကို အလိုအလျောက် ထုတ်ပေးစေချင်တယ်။ |
| I want to go home on time. | အချိန်မီ အိမ်ပြန်ချင်တယ်။ |
| Show me a demo first. | Demo အရင် ပြပါ။ |

---

## Interface text

`{her}` / `{me}` = names from `src/config/personal.ts`.

| key | English | မြန်မာ |
|---|---|---|
| welcomeTitle | Hi {her} 💛 | မင်္ဂလာပါ {her} 💛 |
| welcomeSubtitle | I want to make your work easier and give you more rest time. Just ~3 minutes of tapping. No client names or company details needed. | အလုပ်တွေ ပိုလွယ်ပြီး အနားယူချိန် ပိုရအောင် ကူညီချင်လို့ပါ။ ၃ မိနစ်လောက် နှိပ်ရုံပါပဲ။ Client အမည်၊ ကုမ္ပဏီ အချက်အလက် ဘာမှ မလိုပါဘူး။ |
| start | Start (3 min) | စမယ် (၃ မိနစ်) |
| resume | Continue where I left off | ရပ်ထားတဲ့နေရာက ဆက်မယ် |
| startOver | Start over | အစက ပြန်စမယ် |
| next | Next | ရှေ့ဆက်မယ် |
| back | Back | နောက်သို့ |
| skip | Skip | ကျော်မယ် |
| edit | Edit | ပြင်မယ် |
| clear | Clear | ပြန်ရှင်းမယ် |
| progress | Question {x} of {y} | မေးခွန်း {y} ခုမှာ {x} |
| pickUpTo | Pick up to {n} | အများဆုံး {n} ခု ရွေးပါ |
| required | Please pick an answer to continue. | ဆက်သွားဖို့ အဖြေတစ်ခု ရွေးပေးပါ။ |
| language | မြန်မာ | English |
| notePrompt | Anything you wish a tool could do? | ဘာလုပ်ပေးနိုင်ရင် ကောင်းမလဲ ပြောချင်တာ ရှိလား? |
| notePlaceholder | I wish I could just… | …ကို လွယ်လွယ်လေး လုပ်နိုင်ရင် ကောင်းမှာပဲ |
| noteHint | Optional. Max 300 characters. No client details please. | မဖြစ်မနေ မဟုတ်ပါ။ စာလုံး ၃၀၀ အထိ။ Client အချက်အလက် မထည့်ပါနဲ့။ |
| reviewTitle | Your answers | ဖြေထားတဲ့ အဖြေများ |
| reviewSkipped | Skipped | ကျော်ထားသည် |
| consent | I'm happy to share these answers to help plan AuditMate. | AuditMate စီစဉ်ဖို့ ဒီအဖြေတွေ မျှဝေရတာ ကျေနပ်ပါတယ်။ |
| send | Send to {me} 💛 | {me} ဆီ ပို့မယ် 💛 |
| copy | Copy my answers | အဖြေတွေ ကူးယူမယ် |
| copied | Copied! | ကူးယူပြီးပါပြီ! |
| exportJson | Save answers as a file | အဖြေတွေကို ဖိုင်အဖြစ် သိမ်းမယ် |
| retry | Try again | ထပ်ကြိုးစားမယ် |
| sending | Sending… | ပို့နေပါတယ်… |
| sendFailed | Couldn't send yet. Your answers are saved on this phone. Try again or copy them. | မပို့နိုင်သေးပါ။ အဖြေတွေ ဒီဖုန်းထဲမှာ သိမ်းထားပါတယ်။ ထပ်ကြိုးစားပါ ဒါမှမဟုတ် ကူးယူပါ။ |
| thanksTitle | Thank you, {her} 💛 | ကျေးဇူးပါ {her} 💛 |
| thanksMessage | Now go rest — I'll take it from here. — {me} | အခု အနားယူတော့နော် — ကျန်တာ ကိုယ်လုပ်လိုက်မယ်။ — {me} |
