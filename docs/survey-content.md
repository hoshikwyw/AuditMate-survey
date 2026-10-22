# AuditMate Survey — Full Content (Draft v1)

> English + Myanmar draft for review before building.
> **Myanmar text is a draft** — have it checked by a native speaker (or her colleague-style wording).
> Audit terms that Myanmar auditors normally say in English (vouching, working paper, lead sheet, confirmation, KYC, NPL…) are kept in English on purpose.
> `id` = what gets stored. Labels can change freely; ids should stay stable.

Flow: Welcome → Q1 → Q2 (list depends on Q1) → Q3 (only Q2 picks) → Q4 → Q5 → Q6 → Q7 → Q8 → Q9 → Review → Thank you
Target: ~9 taps, under 3 minutes. No typing except optional note.

---

## Welcome

| | English | မြန်မာ |
|---|---|---|
| Title | Hi [Her name] 💛 | မင်္ဂလာပါ [Her name] 💛 |
| Subtitle | I want to make your work easier and give you more rest time. Just ~3 minutes of tapping. No client names or company details needed. | အလုပ်တွေ ပိုလွယ်ပြီး အနားယူချိန် ပိုရအောင် ကူညီချင်လို့ပါ။ ၃ မိနစ်လောက် နှိပ်ရုံပါပဲ။ Client အမည်၊ ကုမ္ပဏီ အချက်အလက် ဘာမှ မလိုပါဘူး။ |
| Button | Start (3 min) | စမယ် (၃ မိနစ်) |

## Common buttons

| id | English | မြန်မာ |
|---|---|---|
| next | Next | ရှေ့ဆက်မယ် |
| back | Back | နောက်သို့ |
| skip | Skip | ကျော်မယ် |
| edit | Edit | ပြင်မယ် |
| send | Send to [Your name] 💛 | [Your name] ဆီ ပို့မယ် 💛 |
| copy | Copy my answers | အဖြေတွေ ကူးယူမယ် |
| retry | Try again | ထပ်ကြိုးစားမယ် |
| progress | Question X of Y | မေးခွန်း Y ခုမှာ X |
| pick_up_to_3 | Pick up to 3 | အများဆုံး ၃ ခု ရွေးပါ |

---

## Q1. Where do you work? (single, required)

| | English | မြန်မာ |
|---|---|---|
| Question | Where do you work? | ဘယ်လိုနေရာမှာ အလုပ်လုပ်လဲ? |
| Helper | Pick the closest one. | အနီးစပ်ဆုံး တစ်ခုကို ရွေးပေးပါ။ |

| id | English | မြန်မာ |
|---|---|---|
| audit_firm | Audit firm — auditing client companies' accounts | Audit Firm — Client ကုမ္ပဏီတွေရဲ့ ငွေစာရင်းကို စစ်ဆေးတာ |
| internal_company | Internal audit at a company | ကုမ္ပဏီတစ်ခုရဲ့ Internal Audit |
| bank_mfi | Internal audit at a bank or microfinance | ဘဏ် / Microfinance ရဲ့ Internal Audit |
| government | Government audit (Auditor General's office) | အစိုးရ စာရင်းစစ် (ပြည်ထောင်စုစာရင်းစစ်ချုပ်ရုံး) |
| accounting | Accounting / finance team | စာရင်းကိုင် / ဘဏ္ဍာရေး ဌာန |
| other | Something else / not sure | အခြား / မသေချာပါ |

→ Decides which task list appears in Q2.

---

## Q2. Which tasks are part of your normal week? (multi, required)

| | English | မြန်မာ |
|---|---|---|
| Question | Which of these do you do in a normal week? | ပုံမှန် တစ်ပတ်မှာ ဒီထဲက ဘာတွေ လုပ်ရလဲ? |
| Helper | Tap all that apply. | သက်ဆိုင်တာ အားလုံး နှိပ်ပါ။ |

Every list also ends with:

| id | English | မြန်မာ |
|---|---|---|
| review_team | Reviewing my team's work | အဖွဲ့ဝင်တွေရဲ့ အလုပ်ကို review လုပ်တာ |
| not_listed | Something not on this list | ဒီစာရင်းထဲ မပါတဲ့ အလုပ် |

### 2A — Audit firm (`audit_firm`)

| id | English | မြန်မာ |
|---|---|---|
| chase_docs | Requesting and chasing documents from clients | Client ဆီက စာရွက်စာတမ်းတွေ တောင်းတာ၊ လိုက်တောင်းရတာ |
| vouching | Vouching — checking entries against invoices and vouchers | Vouching — စာရင်းသွင်းချက်တွေကို invoice / voucher နဲ့ တိုက်စစ်တာ |
| confirmations | Bank / receivable / payable confirmation letters | Bank / Receivable / Payable confirmation စာတွေ |
| working_papers | Preparing lead sheets and working papers | Lead sheet နဲ့ working paper ပြင်ဆင်တာ |
| analytical | Comparing this year vs last year (analytical review) | ယခုနှစ်နဲ့ ယမန်နှစ် ပမာဏတွေ နှိုင်းယှဉ်တာ (Analytical review) |
| sampling | Selecting samples for testing | စစ်ဖို့ sample ရွေးတာ |
| recalc | Recalculating depreciation, interest, accruals | Depreciation၊ အတိုး၊ accrual တွေ ပြန်တွက်တာ |
| bank_rec | Checking bank reconciliations | Bank reconciliation စစ်တာ |
| counts | Cash count / stock count at the client | Client ဆီမှာ ငွေသား / ကုန်ပစ္စည်း ရေတွက်တာ |
| clean_excel | Cleaning up client Excel files / trial balance | Client ရဲ့ Excel / Trial balance တွေကို ရှင်းလင်းပြင်ဆင်တာ |
| review_notes | Clearing review notes from senior / manager | Senior / Manager ရဲ့ review note တွေ ပြင်ရတာ |
| tax_comp | Tax computations | အခွန် တွက်ချက်တာ |
| draft_fs | Drafting financial statements / audit report | ငွေစာရင်းရှင်းတမ်း / Audit report မူကြမ်း ရေးတာ |
| juggle_clients | Juggling many clients and deadlines | Client အများကြီးနဲ့ deadline တွေ စီမံရတာ |

### 2B — Company internal audit (`internal_company`)

| id | English | မြန်မာ |
|---|---|---|
| plan_audit | Planning audits / risk assessment | Audit အစီအစဉ်ဆွဲတာ / Risk assessment |
| branch_visits | Visiting branches or departments | ဌာနခွဲ / ဌာနတွေကို သွားစစ်တာ |
| cash_count | Cash counts | ငွေသား ရေတွက်စစ်ဆေးတာ |
| stock_check | Stock / inventory checks | ကုန်ပစ္စည်း / Inventory စစ်တာ |
| vouchers_claims | Checking payment vouchers and expense claims | Payment voucher နဲ့ expense claim တွေ စစ်တာ |
| procurement | Checking purchases / procurement | ဝယ်ယူမှု (Procurement) တွေ စစ်တာ |
| sop_testing | Checking if staff follow procedures (SOP / controls) | ဝန်ထမ်းတွေ SOP / လုပ်ထုံးလုပ်နည်း လိုက်နာမလား စစ်တာ |
| data_check | Checking data in Excel or system reports | Excel / System report ထဲက data တွေ စစ်တာ |
| interviews | Interviewing staff and taking notes | ဝန်ထမ်းတွေကို မေးမြန်းပြီး မှတ်စုရေးတာ |
| evidence | Collecting and organizing evidence | အထောက်အထားတွေ စုဆောင်းစီစဉ်တာ |
| findings | Writing findings and recommendations | တွေ့ရှိချက်နဲ့ အကြံပြုချက် ရေးတာ |
| mgmt_report | Preparing reports for management | Management အတွက် report ပြင်ဆင်တာ |
| follow_up | Following up on old findings | ယခင်တွေ့ရှိချက်တွေ ပြင်ပြီးပြီလား ပြန်စစ်တာ (Follow-up) |
| schedule | Tracking the audit schedule and deadlines | Audit အချိန်ဇယားနဲ့ deadline တွေ စီမံတာ |

### 2C — Bank / microfinance internal audit (`bank_mfi`)

| id | English | မြန်မာ |
|---|---|---|
| branch_audit | Branch audits | ဘဏ်ခွဲ စစ်ဆေးတာ |
| vault_count | Vault / cash counts | ငွေတိုက်နဲ့ ငွေသား ရေတွက်စစ်ဆေးတာ |
| loan_files | Loan file reviews | ချေးငွေဖိုင်တွေ စစ်တာ |
| collateral | Checking collateral documents | အာမခံပစ္စည်း စာရွက်စာတမ်း စစ်တာ |
| kyc | KYC — checking customer documents | KYC — ဖောက်သည် စာရွက်စာတမ်း စစ်တာ |
| aml | AML — checking suspicious transactions | AML — သံသယဖြစ်ဖွယ် ငွေလွှဲမှုတွေ စစ်တာ |
| daily_txn | Reviewing daily transaction reports | နေ့စဉ် ငွေသွင်းငွေထုတ် report တွေ စစ်တာ |
| npl_aging | Checking overdue loans / NPL aging | ကြွေးကျန်ချေးငွေ / NPL aging စစ်တာ |
| interest_fees | Checking interest and fee calculations | အတိုးနဲ့ ဝန်ဆောင်ခ တွက်ချက်မှု စစ်တာ |
| cbm_compliance | Central Bank (CBM) compliance checks | ဗဟိုဘဏ် (CBM) စည်းမျဉ်း လိုက်နာမှု စစ်တာ |
| gl_rec | Checking suspense / GL account reconciliations | Suspense / GL account reconciliation စစ်တာ |
| findings | Writing findings and branch reports | တွေ့ရှိချက်နဲ့ ဘဏ်ခွဲ report ရေးတာ |
| follow_up | Following up on old findings | ယခင်တွေ့ရှိချက်တွေ ပြန်စစ်တာ (Follow-up) |
| schedule | Tracking the audit schedule and deadlines | Audit အချိန်ဇယားနဲ့ deadline တွေ စီမံတာ |

### 2D — Government audit (`government`)

| id | English | မြန်မာ |
|---|---|---|
| gov_vouchers | Checking payment vouchers and bills | ငွေပေးချေမှု voucher နဲ့ ဘေလ်တွေ စစ်တာ |
| budget_actual | Comparing budget vs actual spending | ဘတ်ဂျက်နဲ့ အမှန်သုံးစွဲငွေ နှိုင်းယှဉ်တာ |
| rules_compliance | Checking compliance with financial rules | ငွေစာရင်းဆိုင်ရာ စည်းမျဉ်းတွေ လိုက်နာမှု စစ်တာ |
| tenders | Checking tenders / procurement | တင်ဒါ / ဝယ်ယူမှု စစ်တာ |
| cashbook_ledger | Checking cash books and ledgers | Cash book နဲ့ လယ်ဂျာတွေ စစ်တာ |
| assets_store | Checking assets / store records | ပစ္စည်းစာရင်း / ဂိုဒေါင်မှတ်တမ်း စစ်တာ |
| payroll_allow | Checking payroll and allowances | လစာနဲ့ စရိတ်တွေ စစ်တာ |
| soe_accounts | Auditing state enterprise accounts | နိုင်ငံပိုင်လုပ်ငန်း ငွေစာရင်းတွေ စစ်တာ |
| audit_memos | Writing findings / audit memos | တွေ့ရှိချက် / Audit memo ရေးတာ |
| gov_report | Preparing audit reports | စာရင်းစစ် အစီရင်ခံစာ ပြင်ဆင်တာ |
| objections | Following up on audit objections | စာရင်းစစ် ကန့်ကွက်ချက်တွေ Follow-up လုပ်တာ |
| field_trips | Planning field / office visits | ကွင်းဆင်း / ရုံးများသို့ သွားရောက်စစ်ဆေးမှု စီစဉ်တာ |

### 2E — Accounting / finance (`accounting`)

| id | English | မြန်မာ |
|---|---|---|
| data_entry | Recording transactions / data entry | စာရင်းသွင်းတာ / Data entry |
| bank_rec | Bank reconciliation | Bank reconciliation |
| invoices_pv | Preparing invoices and payment vouchers | Invoice နဲ့ payment voucher ပြင်ဆင်တာ |
| month_end | Month-end closing | လကုန် စာရင်းပိတ်တာ |
| tb_fs | Preparing trial balance and financial statements | Trial balance နဲ့ ငွေစာရင်းရှင်းတမ်း ပြင်ဆင်တာ |
| payroll | Payroll | လစာ တွက်ချက်တာ |
| tax_filing | Tax (commercial tax, income tax, withholding) | အခွန် (ကုန်သွယ်လုပ်ငန်းခွန်၊ ဝင်ငွေခွန်၊ Withholding) |
| fixed_assets | Fixed asset register and depreciation | ပုံသေပိုင်ပစ္စည်း စာရင်းနဲ့ Depreciation |
| ar_ap | Following up receivables / payables | ရရန်ငွေ / ပေးရန်ငွေ လိုက်ကြည့်တာ |
| auditor_schedules | Preparing schedules for auditors | Auditor တွေအတွက် schedule ပြင်ဆင်ပေးတာ |
| mgmt_report | Management reports | Management report |

### 2F — Other / not sure (`other`) — general mixed list

| id | English | မြန်မာ |
|---|---|---|
| clean_excel | Cleaning and fixing Excel data | Excel data ရှင်းလင်းပြင်ဆင်တာ |
| check_txn | Checking transactions one by one | ငွေလွှဲမှုတွေ တစ်ခုချင်း စစ်တာ |
| compare_files | Comparing two files or two periods | ဖိုင်နှစ်ခု / ကာလနှစ်ခု နှိုင်းယှဉ်တာ |
| reconcile | Matching / reconciling records | မှတ်တမ်းတွေ တိုက်ဆိုင်စစ်ဆေးတာ (Reconcile) |
| calculations | Calculations (percentages, interest, depreciation) | တွက်ချက်မှု (ရာခိုင်နှုန်း၊ အတိုး၊ Depreciation) |
| sampling | Selecting samples | Sample ရွေးတာ |
| working_papers | Preparing working papers | Working paper ပြင်ဆင်တာ |
| evidence | Organizing receipts, invoices and evidence | ပြေစာ၊ invoice၊ အထောက်အထား စီစဉ်တာ |
| findings | Writing notes, findings or reports | မှတ်စု၊ တွေ့ရှိချက်၊ report ရေးတာ |
| schedule | Tracking tasks and deadlines | အလုပ်တွေနဲ့ deadline စီမံတာ |

---

## Q3. Which take the most time or annoy you most? (rank up to 3, required)

| | English | မြန်မာ |
|---|---|---|
| Question | Which of these take the most time or feel the most annoying? | ဒီထဲက ဘယ်အလုပ်တွေက အချိန်အကုန်ဆုံး ဒါမှမဟုတ် စိတ်အညစ်ဆုံးလဲ? |
| Helper | Tap up to 3 — your first tap is #1. | အများဆုံး ၃ ခု နှိပ်ပါ — ပထမနှိပ်တာက နံပါတ် ၁ ပါ။ |
| Clear | Clear | ပြန်ရှင်းမယ် |

Options: **only the tasks she picked in Q2** (tap order = ranking). If she picked only 1, it's auto #1 and this screen is skipped. If she only picked `not_listed`, skip to Q4.

---

## Q4. When do you feel most stressed at work? (single, skippable)

| | English | မြန်မာ |
|---|---|---|
| Question | When do you feel most stressed at work? | အလုပ်မှာ ဘယ်အချိန်မှာ အစိတ်ညစ်ဆုံးလဲ? |
| Helper | Pick the one that feels heaviest. | အလေးဆုံးလို့ ခံစားရတာ တစ်ခု ရွေးပါ။ |

| id | English | မြန်မာ |
|---|---|---|
| waiting_docs | Waiting for or chasing documents | စာရွက်စာတမ်းတွေ စောင့်ရ / လိုက်တောင်းရချိန် |
| many_txn | Checking lots of transactions one by one | ငွေလွှဲမှု အများကြီးကို တစ်ခုချင်း စစ်ရချိန် |
| messy_data | Messy Excel / numbers that don't match | Excel ရှုပ်ပွ၊ ဂဏန်းတွေ မကိုက်ညီချိန် |
| documentation | Preparing working papers and documentation | Working paper နဲ့ မှတ်တမ်းတွေ ပြင်ဆင်ရချိန် |
| review_corrections | Getting review notes / corrections | Review note / ပြင်ဆင်ချက်တွေ ရချိန် |
| writing_report | Writing the report or findings | Report / တွေ့ရှိချက် ရေးရချိန် |
| deadlines | Many deadlines at the same time | Deadline တွေ တပြိုင်နက် စုလာချိန် |
| travel | Travelling / site visits | ခရီးသွား / ကွင်းဆင်းရချိန် |
| not_sure | Not sure | မသေချာပါ |

---

## Q5. What do you work with most? (multi, required)

| | English | မြန်မာ |
|---|---|---|
| Question | What do you use most at work? | အလုပ်မှာ ဘာတွေ အများဆုံး သုံးလဲ? |
| Helper | Tap all that apply. | သက်ဆိုင်တာ အားလုံး နှိပ်ပါ။ |

| id | English | မြန်မာ |
|---|---|---|
| excel | Microsoft Excel | Microsoft Excel |
| gsheets | Google Sheets | Google Sheets |
| word | Microsoft Word | Microsoft Word |
| pdf | PDF files | PDF ဖိုင်များ |
| paper | Paper documents and calculator | စာရွက်စာတမ်းနဲ့ ဂဏန်းပေါင်းစက် |
| acct_software | Accounting software (client / company system) | စာရင်းကိုင် Software (Client / ကုမ္ပဏီ system) |
| audit_software | Audit software (e.g. CaseWare) | Audit Software (ဥပမာ CaseWare) |
| core_banking *(bank_mfi only)* | Core banking system | Core Banking System |
| chat_email | Email / Viber / Telegram | Email / Viber / Telegram |
| not_sure *(exclusive)* | Not sure | မသေချာပါ |

---

## Q6. How often do you do your #1 task? (single, skippable)

| | English | မြန်မာ |
|---|---|---|
| Question | How often do you do "{#1 task}"? | "{#1 task}" ကို ဘယ်လောက် ခဏခဏ လုပ်ရလဲ? |
| Helper | A rough guess is fine. | ခန့်မှန်းပြီး ဖြေရင် ရပါတယ်။ |

| id | English | မြန်မာ |
|---|---|---|
| daily | Almost every working day | အလုပ်ရက်တိုင်းလိုလို |
| 2_3_week | 2–3 times a week | တစ်ပတ်မှာ ၂–၃ ခါ |
| weekly | About once a week | တစ်ပတ်မှာ တစ်ခါလောက် |
| few_month | A few times a month | တစ်လမှာ အနည်းငယ် |
| busy_season | Only in busy season / some audits | Busy season / အချို့ audit တွေမှာပဲ |
| not_sure | Not sure | မသေချာပါ |

## Q7. How long does it take each time? (single, skippable)

| | English | မြန်မာ |
|---|---|---|
| Question | How long does "{#1 task}" usually take each time? | "{#1 task}" ကို တစ်ခါလုပ်ရင် ပုံမှန် ဘယ်လောက်ကြာလဲ? |
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

## Q8. Where would you use the tool? (single, required)

| | English | မြန်မာ |
|---|---|---|
| Question | Where would you use a tool like this? | ဒီလို Tool ကို ဘာနဲ့ သုံးချင်လဲ? |

| id | English | မြန်မာ |
|---|---|---|
| office_pc | Office computer (Windows) | ရုံးကွန်ပျူတာ (Windows) |
| own_laptop | My own Windows laptop | ကိုယ်ပိုင် Windows Laptop |
| mac | Mac | Mac |
| phone | Phone | ဖုန်း |
| both | Computer and phone | ကွန်ပျူတာရော ဖုန်းရော |
| not_sure | Not sure | မသေချာပါ |

> Offline question removed — given Myanmar internet/power conditions, AuditMate should just work offline by default.

---

## Q9. What should I build first? (single + optional note)

| | English | မြန်မာ |
|---|---|---|
| Question | If I build one thing first, what should it do? | ပထမဆုံး တစ်ခု လုပ်ပေးရမယ်ဆိုရင် ဘာလုပ်ပေးစေချင်လဲ? |
| Helper | Your final vote 💛 | နောက်ဆုံးမဲ ပေးပါ 💛 |

| id | English | မြန်မာ |
|---|---|---|
| auto_excel | Do my repetitive Excel steps for me | ထပ်ခါထပ်ခါ လုပ်ရတဲ့ Excel အလုပ်တွေ လုပ်ပေးတာ |
| find_errors | Find mistakes, duplicates and differences | အမှား၊ ထပ်နေတာ၊ ကွာခြားချက်တွေ ရှာပေးတာ |
| reconcile | Match / reconcile records automatically | မှတ်တမ်းတွေ အလိုအလျောက် တိုက်ဆိုင်ပေးတာ |
| calculations | Do audit calculations and sampling | Audit တွက်ချက်မှုနဲ့ sampling လုပ်ပေးတာ |
| organize_evidence | Organize my documents and evidence | စာရွက်စာတမ်းနဲ့ အထောက်အထားတွေ စီစဉ်ပေးတာ |
| write_reports | Help write findings and reports faster | တွေ့ရှိချက်နဲ့ report တွေ မြန်မြန်ရေးနိုင်အောင် ကူညီတာ |
| track_tasks | Track my tasks, clients and deadlines | အလုပ်၊ Client နဲ့ deadline တွေ မှတ်ပေးတာ |
| surprise_me | Surprise me — build what you think helps | ကိုယ်ထင်တာ လုပ်ပေးပါ (Surprise me) |

Optional note:

| | English | မြန်မာ |
|---|---|---|
| Prompt | Anything you wish a tool could do? | ဘာလုပ်ပေးနိုင်ရင် ကောင်းမလဲ ပြောချင်တာ ရှိလား? |
| Placeholder | "I wish I could just…" | "…ကို လွယ်လွယ်လေး လုပ်နိုင်ရင် ကောင်းမှာပဲ" |
| Skip | Skip note | မှတ်ချက် ကျော်မယ် |
| Limit | Max 300 characters. No client details please. | စာလုံး ၃၀၀ အထိ။ Client အချက်အလက် မထည့်ပါနဲ့။ |

Quick-tap chips (fill the note, still editable):

| English | မြန်မာ |
|---|---|
| I want fewer repetitive Excel steps. | Excel မှာ ထပ်ခါထပ်ခါ လုပ်ရတာ လျှော့ချင်တယ်။ |
| I want to find differences quickly. | ကွာခြားချက်တွေကို မြန်မြန် ရှာချင်တယ်။ |
| I want to finish working papers faster. | Working paper တွေ မြန်မြန် ပြီးချင်တယ်။ |
| I want to go home on time. | အချိန်မီ အိမ်ပြန်ချင်တယ်။ |
| Show me a demo first. | Demo အရင် ပြပါ။ |

---

## Review & Send

| | English | မြန်မာ |
|---|---|---|
| Title | Your answers | ဖြေထားတဲ့ အဖြေများ |
| Consent | I'm happy to share these answers to help plan AuditMate. | AuditMate စီစဉ်ဖို့ ဒီအဖြေတွေ မျှဝေရတာ ကျေနပ်ပါတယ်။ |
| Send | Send to [Your name] 💛 | [Your name] ဆီ ပို့မယ် 💛 |
| Failed | Couldn't send yet. Your answers are saved on this phone. Try again or copy them. | မပို့နိုင်သေးပါ။ အဖြေတွေ ဒီဖုန်းထဲမှာ သိမ်းထားပါတယ်။ ထပ်ကြိုးစားပါ ဒါမှမဟုတ် ကူးယူပါ။ |

## Thank you

| | English | မြန်မာ |
|---|---|---|
| Title | Thank you, [Her name] 💛 | ကျေးဇူးပါ [Her name] 💛 |
| Message | Now go rest — I'll take it from here. — [Your name] | အခု အနားယူတော့နော် — ကျန်တာ ကိုယ်လုပ်လိုက်မယ်။ — [Your name] |
