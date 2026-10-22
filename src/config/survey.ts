// All survey questions and answer options live here.
// Source of truth for wording: docs/survey-content.md.
// Labels can be edited freely; keep ids stable because they are what gets sent.

import type { Option, Question, Text, WorkplaceId } from './types'

const t = (en: string, my: string): Text => ({ en, my })
const o = (id: string, en: string, my: string, extra: Partial<Option> = {}): Option => ({
  id,
  label: t(en, my),
  ...extra,
})

// ─── Q2 task lists, one per workplace ──────────────────────────────────────

const TASKS_AUDIT_FIRM: Option[] = [
  o('chase_docs', 'Requesting and chasing documents from clients', 'Client ဆီက စာရွက်စာတမ်းတွေ တောင်းတာ၊ လိုက်တောင်းရတာ'),
  o('vouching', 'Vouching — checking entries against invoices and vouchers', 'Vouching — စာရင်းသွင်းချက်တွေကို invoice / voucher နဲ့ တိုက်စစ်တာ'),
  o('confirmations', 'Bank / receivable / payable confirmation letters', 'Bank / Receivable / Payable confirmation စာတွေ'),
  o('working_papers', 'Preparing lead sheets and working papers', 'Lead sheet နဲ့ working paper ပြင်ဆင်တာ'),
  o('analytical', 'Comparing this year vs last year (analytical review)', 'ယခုနှစ်နဲ့ ယမန်နှစ် ပမာဏတွေ နှိုင်းယှဉ်တာ (Analytical review)'),
  o('sampling', 'Selecting samples for testing', 'စစ်ဖို့ sample ရွေးတာ'),
  o('recalc', 'Recalculating depreciation, interest, accruals', 'Depreciation၊ အတိုး၊ accrual တွေ ပြန်တွက်တာ'),
  o('bank_rec', 'Checking bank reconciliations', 'Bank reconciliation စစ်တာ'),
  o('counts', 'Cash count / stock count at the client', 'Client ဆီမှာ ငွေသား / ကုန်ပစ္စည်း ရေတွက်တာ'),
  o('clean_excel', 'Cleaning up client Excel files / trial balance', 'Client ရဲ့ Excel / Trial balance တွေကို ရှင်းလင်းပြင်ဆင်တာ'),
  o('review_notes', 'Clearing review notes from senior / manager', 'Senior / Manager ရဲ့ review note တွေ ပြင်ရတာ'),
  o('tax_comp', 'Tax computations', 'အခွန် တွက်ချက်တာ'),
  o('draft_fs', 'Drafting financial statements / audit report', 'ငွေစာရင်းရှင်းတမ်း / Audit report မူကြမ်း ရေးတာ'),
  o('juggle_clients', 'Juggling many clients and deadlines', 'Client အများကြီးနဲ့ deadline တွေ စီမံရတာ'),
]

const TASKS_INTERNAL_COMPANY: Option[] = [
  o('plan_audit', 'Planning audits / risk assessment', 'Audit အစီအစဉ်ဆွဲတာ / Risk assessment'),
  o('branch_visits', 'Visiting branches or departments', 'ဌာနခွဲ / ဌာနတွေကို သွားစစ်တာ'),
  o('cash_count', 'Cash counts', 'ငွေသား ရေတွက်စစ်ဆေးတာ'),
  o('stock_check', 'Stock / inventory checks', 'ကုန်ပစ္စည်း / Inventory စစ်တာ'),
  o('vouchers_claims', 'Checking payment vouchers and expense claims', 'Payment voucher နဲ့ expense claim တွေ စစ်တာ'),
  o('procurement', 'Checking purchases / procurement', 'ဝယ်ယူမှု (Procurement) တွေ စစ်တာ'),
  o('sop_testing', 'Checking if staff follow procedures (SOP / controls)', 'ဝန်ထမ်းတွေ SOP / လုပ်ထုံးလုပ်နည်း လိုက်နာမလား စစ်တာ'),
  o('data_check', 'Checking data in Excel or system reports', 'Excel / System report ထဲက data တွေ စစ်တာ'),
  o('interviews', 'Interviewing staff and taking notes', 'ဝန်ထမ်းတွေကို မေးမြန်းပြီး မှတ်စုရေးတာ'),
  o('evidence', 'Collecting and organizing evidence', 'အထောက်အထားတွေ စုဆောင်းစီစဉ်တာ'),
  o('findings', 'Writing findings and recommendations', 'တွေ့ရှိချက်နဲ့ အကြံပြုချက် ရေးတာ'),
  o('mgmt_report', 'Preparing reports for management', 'Management အတွက် report ပြင်ဆင်တာ'),
  o('follow_up', 'Following up on old findings', 'ယခင်တွေ့ရှိချက်တွေ ပြင်ပြီးပြီလား ပြန်စစ်တာ (Follow-up)'),
  o('schedule', 'Tracking the audit schedule and deadlines', 'Audit အချိန်ဇယားနဲ့ deadline တွေ စီမံတာ'),
]

const TASKS_BANK_MFI: Option[] = [
  o('branch_audit', 'Branch audits', 'ဘဏ်ခွဲ စစ်ဆေးတာ'),
  o('vault_count', 'Vault / cash counts', 'ငွေတိုက်နဲ့ ငွေသား ရေတွက်စစ်ဆေးတာ'),
  o('loan_files', 'Loan file reviews', 'ချေးငွေဖိုင်တွေ စစ်တာ'),
  o('collateral', 'Checking collateral documents', 'အာမခံပစ္စည်း စာရွက်စာတမ်း စစ်တာ'),
  o('kyc', 'KYC — checking customer documents', 'KYC — ဖောက်သည် စာရွက်စာတမ်း စစ်တာ'),
  o('aml', 'AML — checking suspicious transactions', 'AML — သံသယဖြစ်ဖွယ် ငွေလွှဲမှုတွေ စစ်တာ'),
  o('daily_txn', 'Reviewing daily transaction reports', 'နေ့စဉ် ငွေသွင်းငွေထုတ် report တွေ စစ်တာ'),
  o('npl_aging', 'Checking overdue loans / NPL aging', 'ကြွေးကျန်ချေးငွေ / NPL aging စစ်တာ'),
  o('interest_fees', 'Checking interest and fee calculations', 'အတိုးနဲ့ ဝန်ဆောင်ခ တွက်ချက်မှု စစ်တာ'),
  o('cbm_compliance', 'Central Bank (CBM) compliance checks', 'ဗဟိုဘဏ် (CBM) စည်းမျဉ်း လိုက်နာမှု စစ်တာ'),
  o('gl_rec', 'Checking suspense / GL account reconciliations', 'Suspense / GL account reconciliation စစ်တာ'),
  o('findings', 'Writing findings and branch reports', 'တွေ့ရှိချက်နဲ့ ဘဏ်ခွဲ report ရေးတာ'),
  o('follow_up', 'Following up on old findings', 'ယခင်တွေ့ရှိချက်တွေ ပြန်စစ်တာ (Follow-up)'),
  o('schedule', 'Tracking the audit schedule and deadlines', 'Audit အချိန်ဇယားနဲ့ deadline တွေ စီမံတာ'),
]

const TASKS_GOVERNMENT: Option[] = [
  o('gov_vouchers', 'Checking payment vouchers and bills', 'ငွေပေးချေမှု voucher နဲ့ ဘေလ်တွေ စစ်တာ'),
  o('budget_actual', 'Comparing budget vs actual spending', 'ဘတ်ဂျက်နဲ့ အမှန်သုံးစွဲငွေ နှိုင်းယှဉ်တာ'),
  o('rules_compliance', 'Checking compliance with financial rules', 'ငွေစာရင်းဆိုင်ရာ စည်းမျဉ်းတွေ လိုက်နာမှု စစ်တာ'),
  o('tenders', 'Checking tenders / procurement', 'တင်ဒါ / ဝယ်ယူမှု စစ်တာ'),
  o('cashbook_ledger', 'Checking cash books and ledgers', 'Cash book နဲ့ လယ်ဂျာတွေ စစ်တာ'),
  o('assets_store', 'Checking assets / store records', 'ပစ္စည်းစာရင်း / ဂိုဒေါင်မှတ်တမ်း စစ်တာ'),
  o('payroll_allow', 'Checking payroll and allowances', 'လစာနဲ့ စရိတ်တွေ စစ်တာ'),
  o('soe_accounts', 'Auditing state enterprise accounts', 'နိုင်ငံပိုင်လုပ်ငန်း ငွေစာရင်းတွေ စစ်တာ'),
  o('audit_memos', 'Writing findings / audit memos', 'တွေ့ရှိချက် / Audit memo ရေးတာ'),
  o('gov_report', 'Preparing audit reports', 'စာရင်းစစ် အစီရင်ခံစာ ပြင်ဆင်တာ'),
  o('objections', 'Following up on audit objections', 'စာရင်းစစ် ကန့်ကွက်ချက်တွေ Follow-up လုပ်တာ'),
  o('field_trips', 'Planning field / office visits', 'ကွင်းဆင်း / ရုံးများသို့ သွားရောက်စစ်ဆေးမှု စီစဉ်တာ'),
]

const TASKS_ACCOUNTING: Option[] = [
  o('data_entry', 'Recording transactions / data entry', 'စာရင်းသွင်းတာ / Data entry'),
  o('bank_rec', 'Bank reconciliation', 'Bank reconciliation'),
  o('invoices_pv', 'Preparing invoices and payment vouchers', 'Invoice နဲ့ payment voucher ပြင်ဆင်တာ'),
  o('month_end', 'Month-end closing', 'လကုန် စာရင်းပိတ်တာ'),
  o('tb_fs', 'Preparing trial balance and financial statements', 'Trial balance နဲ့ ငွေစာရင်းရှင်းတမ်း ပြင်ဆင်တာ'),
  o('payroll', 'Payroll', 'လစာ တွက်ချက်တာ'),
  o('tax_filing', 'Tax (commercial tax, income tax, withholding)', 'အခွန် (ကုန်သွယ်လုပ်ငန်းခွန်၊ ဝင်ငွေခွန်၊ Withholding)'),
  o('fixed_assets', 'Fixed asset register and depreciation', 'ပုံသေပိုင်ပစ္စည်း စာရင်းနဲ့ Depreciation'),
  o('ar_ap', 'Following up receivables / payables', 'ရရန်ငွေ / ပေးရန်ငွေ လိုက်ကြည့်တာ'),
  o('auditor_schedules', 'Preparing schedules for auditors', 'Auditor တွေအတွက် schedule ပြင်ဆင်ပေးတာ'),
  o('mgmt_report', 'Management reports', 'Management report'),
]

const TASKS_OTHER: Option[] = [
  o('clean_excel', 'Cleaning and fixing Excel data', 'Excel data ရှင်းလင်းပြင်ဆင်တာ'),
  o('check_txn', 'Checking transactions one by one', 'ငွေလွှဲမှုတွေ တစ်ခုချင်း စစ်တာ'),
  o('compare_files', 'Comparing two files or two periods', 'ဖိုင်နှစ်ခု / ကာလနှစ်ခု နှိုင်းယှဉ်တာ'),
  o('reconcile', 'Matching / reconciling records', 'မှတ်တမ်းတွေ တိုက်ဆိုင်စစ်ဆေးတာ (Reconcile)'),
  o('calculations', 'Calculations (percentages, interest, depreciation)', 'တွက်ချက်မှု (ရာခိုင်နှုန်း၊ အတိုး၊ Depreciation)'),
  o('sampling', 'Selecting samples', 'Sample ရွေးတာ'),
  o('working_papers', 'Preparing working papers', 'Working paper ပြင်ဆင်တာ'),
  o('evidence', 'Organizing receipts, invoices and evidence', 'ပြေစာ၊ invoice၊ အထောက်အထား စီစဉ်တာ'),
  o('findings', 'Writing notes, findings or reports', 'မှတ်စု၊ တွေ့ရှိချက်၊ report ရေးတာ'),
  o('schedule', 'Tracking tasks and deadlines', 'အလုပ်တွေနဲ့ deadline စီမံတာ'),
]

/** Added to the end of every task list. */
const TASKS_COMMON: Option[] = [
  o('review_team', "Reviewing my team's work", 'အဖွဲ့ဝင်တွေရဲ့ အလုပ်ကို review လုပ်တာ'),
  o('not_listed', 'Something not on this list', 'ဒီစာရင်းထဲ မပါတဲ့ အလုပ်'),
]

export const TASK_LISTS: Record<WorkplaceId, Option[]> = {
  audit_firm: [...TASKS_AUDIT_FIRM, ...TASKS_COMMON],
  internal_company: [...TASKS_INTERNAL_COMPANY, ...TASKS_COMMON],
  bank_mfi: [...TASKS_BANK_MFI, ...TASKS_COMMON],
  government: [...TASKS_GOVERNMENT, ...TASKS_COMMON],
  accounting: [...TASKS_ACCOUNTING, ...TASKS_COMMON],
  other: [...TASKS_OTHER, ...TASKS_COMMON],
}

/** Tasks that can't be a meaningful "#1 task" for the frequency/duration questions. */
export const NON_RANKABLE_TASKS = ['not_listed']

// ─── Questions ──────────────────────────────────────────────────────────────

export const QUESTIONS: Question[] = [
  {
    id: 'workplace',
    kind: 'single',
    required: true,
    title: t('Where do you work?', 'ဘယ်လိုနေရာမှာ အလုပ်လုပ်လဲ?'),
    helper: t('Pick the closest one.', 'အနီးစပ်ဆုံး တစ်ခုကို ရွေးပေးပါ။'),
    options: [
      o('audit_firm', "Audit firm — auditing client companies' accounts", 'Audit Firm — Client ကုမ္ပဏီတွေရဲ့ ငွေစာရင်းကို စစ်ဆေးတာ'),
      o('internal_company', 'Internal audit at a company', 'ကုမ္ပဏီတစ်ခုရဲ့ Internal Audit'),
      o('bank_mfi', 'Internal audit at a bank or microfinance', 'ဘဏ် / Microfinance ရဲ့ Internal Audit'),
      o('government', "Government audit (Auditor General's office)", 'အစိုးရ စာရင်းစစ် (ပြည်ထောင်စုစာရင်းစစ်ချုပ်ရုံး)'),
      o('accounting', 'Accounting / finance team', 'စာရင်းကိုင် / ဘဏ္ဍာရေး ဌာန'),
      o('other', 'Something else / not sure', 'အခြား / မသေချာပါ'),
    ],
  },
  {
    id: 'tasks',
    kind: 'multi',
    required: true,
    title: t('Which of these do you do in a normal week?', 'ပုံမှန် တစ်ပတ်မှာ ဒီထဲက ဘာတွေ လုပ်ရလဲ?'),
    helper: t('Tap all that apply.', 'သက်ဆိုင်တာ အားလုံး နှိပ်ပါ။'),
    options: [], // from TASK_LISTS[workplace]
  },
  {
    id: 'topTasks',
    kind: 'rank',
    required: true,
    maxPicks: 3,
    title: t(
      'Which of these take the most time or feel the most annoying?',
      'ဒီထဲက ဘယ်အလုပ်တွေက အချိန်အကုန်ဆုံး ဒါမှမဟုတ် စိတ်အညစ်ဆုံးလဲ?',
    ),
    helper: t('Tap up to 3 — your first tap is #1.', 'အများဆုံး ၃ ခု နှိပ်ပါ — ပထမနှိပ်တာက နံပါတ် ၁ ပါ။'),
    options: [], // only the tasks she picked
  },
  {
    id: 'stress',
    kind: 'single',
    required: false,
    title: t('When do you feel most stressed at work?', 'အလုပ်မှာ ဘယ်အချိန်မှာ အစိတ်ညစ်ဆုံးလဲ?'),
    helper: t('Pick the one that feels heaviest.', 'အလေးဆုံးလို့ ခံစားရတာ တစ်ခု ရွေးပါ။'),
    options: [
      o('waiting_docs', 'Waiting for or chasing documents', 'စာရွက်စာတမ်းတွေ စောင့်ရ / လိုက်တောင်းရချိန်'),
      o('many_txn', 'Checking lots of transactions one by one', 'ငွေလွှဲမှု အများကြီးကို တစ်ခုချင်း စစ်ရချိန်'),
      o('messy_data', "Messy Excel / numbers that don't match", 'Excel ရှုပ်ပွ၊ ဂဏန်းတွေ မကိုက်ညီချိန်'),
      o('documentation', 'Preparing working papers and documentation', 'Working paper နဲ့ မှတ်တမ်းတွေ ပြင်ဆင်ရချိန်'),
      o('review_corrections', 'Getting review notes / corrections', 'Review note / ပြင်ဆင်ချက်တွေ ရချိန်'),
      o('writing_report', 'Writing the report or findings', 'Report / တွေ့ရှိချက် ရေးရချိန်'),
      o('deadlines', 'Many deadlines at the same time', 'Deadline တွေ တပြိုင်နက် စုလာချိန်'),
      o('travel', 'Travelling / site visits', 'ခရီးသွား / ကွင်းဆင်းရချိန်'),
      o('not_sure', 'Not sure', 'မသေချာပါ'),
    ],
  },
  {
    id: 'tools',
    kind: 'multi',
    required: true,
    title: t('What do you use most at work?', 'အလုပ်မှာ ဘာတွေ အများဆုံး သုံးလဲ?'),
    helper: t('Tap all that apply.', 'သက်ဆိုင်တာ အားလုံး နှိပ်ပါ။'),
    options: [
      o('excel', 'Microsoft Excel', 'Microsoft Excel'),
      o('gsheets', 'Google Sheets', 'Google Sheets'),
      o('word', 'Microsoft Word', 'Microsoft Word'),
      o('pdf', 'PDF files', 'PDF ဖိုင်များ'),
      o('paper', 'Paper documents and calculator', 'စာရွက်စာတမ်းနဲ့ ဂဏန်းပေါင်းစက်'),
      o('acct_software', 'Accounting software (client / company system)', 'စာရင်းကိုင် Software (Client / ကုမ္ပဏီ system)'),
      o('audit_software', 'Audit software (e.g. CaseWare)', 'Audit Software (ဥပမာ CaseWare)'),
      o('core_banking', 'Core banking system', 'Core Banking System', { onlyFor: ['bank_mfi'] }),
      o('chat_email', 'Email / Viber / Telegram', 'Email / Viber / Telegram'),
      o('not_sure', 'Not sure', 'မသေချာပါ', { exclusive: true }),
    ],
  },
  {
    id: 'frequency',
    kind: 'single',
    required: false,
    title: t('How often do you do "{task}"?', '"{task}" ကို ဘယ်လောက် ခဏခဏ လုပ်ရလဲ?'),
    helper: t('A rough guess is fine.', 'ခန့်မှန်းပြီး ဖြေရင် ရပါတယ်။'),
    options: [
      o('daily', 'Almost every working day', 'အလုပ်ရက်တိုင်းလိုလို'),
      o('2_3_week', '2–3 times a week', 'တစ်ပတ်မှာ ၂–၃ ခါ'),
      o('weekly', 'About once a week', 'တစ်ပတ်မှာ တစ်ခါလောက်'),
      o('few_month', 'A few times a month', 'တစ်လမှာ အနည်းငယ်'),
      o('busy_season', 'Only in busy season / some audits', 'Busy season / အချို့ audit တွေမှာပဲ'),
      o('not_sure', 'Not sure', 'မသေချာပါ'),
    ],
  },
  {
    id: 'duration',
    kind: 'single',
    required: false,
    title: t('How long does "{task}" usually take each time?', '"{task}" ကို တစ်ခါလုပ်ရင် ပုံမှန် ဘယ်လောက်ကြာလဲ?'),
    helper: t('Think of one normal time.', 'ပုံမှန် တစ်ခါကို စဉ်းစားကြည့်ပါ။'),
    options: [
      o('lt_15m', 'Less than 15 minutes', '၁၅ မိနစ်အောက်'),
      o('15_30m', '15–30 minutes', '၁၅–၃၀ မိနစ်'),
      o('30_60m', '30–60 minutes', '၃၀–၆၀ မိနစ်'),
      o('1_2h', '1–2 hours', '၁–၂ နာရီ'),
      o('2_4h', '2–4 hours', '၂–၄ နာရီ'),
      o('gt_4h', 'More than 4 hours', '၄ နာရီထက် ပိုကြာ'),
      o('depends', 'It depends / not sure', 'အခြေအနေပေါ် မူတည်တယ် / မသေချာပါ'),
    ],
  },
  {
    id: 'device',
    kind: 'single',
    required: true,
    title: t('Where would you use a tool like this?', 'ဒီလို Tool ကို ဘာနဲ့ သုံးချင်လဲ?'),
    options: [
      o('office_pc', 'Office computer (Windows)', 'ရုံးကွန်ပျူတာ (Windows)'),
      o('own_laptop', 'My own Windows laptop', 'ကိုယ်ပိုင် Windows Laptop'),
      o('mac', 'Mac', 'Mac'),
      o('phone', 'Phone', 'ဖုန်း'),
      o('both', 'Computer and phone', 'ကွန်ပျူတာရော ဖုန်းရော'),
      o('not_sure', 'Not sure', 'မသေချာပါ'),
    ],
  },
  {
    id: 'buildFirst',
    kind: 'single',
    required: true,
    withNote: true,
    title: t('If I build one thing first, what should it do?', 'ပထမဆုံး တစ်ခု လုပ်ပေးရမယ်ဆိုရင် ဘာလုပ်ပေးစေချင်လဲ?'),
    helper: t('Your final vote 💛', 'နောက်ဆုံးမဲ ပေးပါ 💛'),
    options: [
      o('auto_excel', 'Do my repetitive Excel steps for me', 'ထပ်ခါထပ်ခါ လုပ်ရတဲ့ Excel အလုပ်တွေ လုပ်ပေးတာ'),
      o('find_errors', 'Find mistakes, duplicates and differences', 'အမှား၊ ထပ်နေတာ၊ ကွာခြားချက်တွေ ရှာပေးတာ'),
      o('reconcile', 'Match / reconcile records automatically', 'မှတ်တမ်းတွေ အလိုအလျောက် တိုက်ဆိုင်ပေးတာ'),
      o('calculations', 'Do audit calculations and sampling', 'Audit တွက်ချက်မှုနဲ့ sampling လုပ်ပေးတာ'),
      o('organize_evidence', 'Organize my documents and evidence', 'စာရွက်စာတမ်းနဲ့ အထောက်အထားတွေ စီစဉ်ပေးတာ'),
      o('write_reports', 'Help write findings and reports faster', 'တွေ့ရှိချက်နဲ့ report တွေ မြန်မြန်ရေးနိုင်အောင် ကူညီတာ'),
      o('track_tasks', 'Track my tasks, clients and deadlines', 'အလုပ်၊ Client နဲ့ deadline တွေ မှတ်ပေးတာ'),
      o('surprise_me', 'Surprise me — build what you think helps', 'ကိုယ်ထင်တာ လုပ်ပေးပါ (Surprise me)'),
    ],
  },
]

export const NOTE_MAX_LENGTH = 300

/** Quick-tap chips that fill the optional note. */
export const NOTE_CHIPS: Text[] = [
  t('I want fewer repetitive Excel steps.', 'Excel မှာ ထပ်ခါထပ်ခါ လုပ်ရတာ လျှော့ချင်တယ်။'),
  t('I want to find differences quickly.', 'ကွာခြားချက်တွေကို မြန်မြန် ရှာချင်တယ်။'),
  t('I want to finish working papers faster.', 'Working paper တွေ မြန်မြန် ပြီးချင်တယ်။'),
  t('I want to go home on time.', 'အချိန်မီ အိမ်ပြန်ချင်တယ်။'),
  t('Show me a demo first.', 'Demo အရင် ပြပါ။'),
]
