// All survey questions and answer options live here.
// Source of truth for wording: docs/survey-content.md.
// Labels can be edited freely; keep ids stable because they are what gets sent.

import type { Option, Question, Text } from './types'

const t = (en: string, my: string): Text => ({ en, my })
const o = (id: string, en: string, my: string, extra: Partial<Option> = {}): Option => ({
  id,
  label: t(en, my),
  ...extra,
})

const NOT_SURE = o('not_sure', 'Not sure', 'မသေချာပါ', { exclusive: true })

/** Tasks that can't be a meaningful "#1 task" for the frequency/duration questions. */
export const NON_RANKABLE_TASKS = ['not_listed']

export const QUESTIONS: Question[] = [
  {
    id: 'tasks',
    kind: 'multi',
    required: true,
    title: t('Which of these checks do you do?', 'ဒီထဲက ဘယ်လို စစ်ဆေးမှုတွေ လုပ်ရလဲ?'),
    helper: t('Tap all that apply.', 'သက်ဆိုင်တာ အားလုံး နှိပ်ပါ။'),
    options: [
      o('excel_vouchers', 'Checking Excel records against vouchers', 'Excel စာရင်းတွေကို voucher နဲ့ တိုက်စစ်တာ'),
      o('stock_count', 'Counting warehouse stock and comparing with records', 'ဂိုဒေါင်ထဲက ပစ္စည်းတွေ ရေတွက်ပြီး စာရင်းနဲ့ တိုက်စစ်တာ'),
      o('stock_in_out', 'Checking stock-in / stock-out vouchers', 'ပစ္စည်း အဝင် / အထွက် voucher တွေ စစ်တာ'),
      o('invoices_receipts', 'Checking vouchers against invoices and receipts', 'Voucher တွေကို invoice၊ ပြေစာ နဲ့ တိုက်စစ်တာ'),
      o('cash_bank', 'Checking cash / bank records', 'ငွေသား / ဘဏ် စာရင်း စစ်တာ'),
      o('sales_delivery', 'Checking sales and delivery records', 'အရောင်းနဲ့ ပစ္စည်းပို့ဆောင်မှု စာရင်း စစ်တာ'),
      o('approvals', 'Checking approvals and signatures', 'ခွင့်ပြုချက်နဲ့ လက်မှတ်တွေ စစ်တာ'),
      o('totals', 'Checking totals and calculations', 'စုစုပေါင်းနဲ့ တွက်ချက်မှုတွေ စစ်တာ'),
      o('investigate', 'Investigating differences and finding evidence', 'ကွာခြားချက်တွေကို စုံစမ်းပြီး အထောက်အထား ရှာတာ'),
      o('reports', 'Writing up findings / reports', 'တွေ့ရှိချက် / Report ရေးတာ'),
      o('not_listed', 'Something not on this list', 'ဒီစာရင်းထဲ မပါတဲ့ အလုပ်'),
    ],
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
    id: 'voucherFormat',
    kind: 'multi',
    required: true,
    title: t('What do the vouchers look like?', 'Voucher တွေက ဘယ်လိုပုံစံလဲ?'),
    helper: t('Tap all that apply.', 'သက်ဆိုင်တာ အားလုံး နှိပ်ပါ။'),
    options: [
      o('paper', 'Paper vouchers', 'စာရွက် voucher'),
      o('pdf', 'Scanned PDF files', 'Scan ဖတ်ထားတဲ့ PDF ဖိုင်'),
      o('photos', 'Photos on a phone', 'ဖုန်းထဲက ဓာတ်ပုံ'),
      o('software', 'Inside accounting software', 'စာရင်းကိုင် Software ထဲမှာ'),
      o('excel', 'Also in Excel', 'Excel ထဲမှာလည်း ရှိတယ်'),
      NOT_SURE,
    ],
  },
  {
    id: 'fileSize',
    kind: 'single',
    required: false,
    title: t('How many rows does a typical Excel file have?', 'ပုံမှန် Excel ဖိုင်တစ်ခုမှာ အတန်း (row) ဘယ်လောက် ရှိလဲ?'),
    helper: t('A rough guess is fine.', 'ခန့်မှန်းပြီး ဖြေရင် ရပါတယ်။'),
    options: [
      o('lt_50', 'Less than 50', '၅၀ အောက်'),
      o('50_200', '50–200', '၅၀–၂၀၀'),
      o('200_1000', '200–1,000', '၂၀၀–၁,၀၀၀'),
      o('1000_5000', '1,000–5,000', '၁,၀၀၀–၅,၀၀၀'),
      o('gt_5000', 'More than 5,000', '၅,၀၀၀ ထက် ပို'),
      o('varies', 'It varies / not sure', 'အမျိုးမျိုးပဲ / မသေချာပါ'),
    ],
  },
  {
    id: 'problems',
    kind: 'multi',
    required: true,
    maxPicks: 3,
    title: t('Which problems do you find most often?', 'ဘယ်လို အမှားတွေကို အတွေ့ရ အများဆုံးလဲ?'),
    helper: t('Pick up to 3.', 'အများဆုံး ၃ ခု ရွေးပါ။'),
    options: [
      o('missing_voucher', 'A row has no voucher (or a voucher has no row)', 'Voucher မရှိတဲ့ စာရင်း (ဒါမှမဟုတ် စာရင်းမရှိတဲ့ voucher)'),
      o('amount_mismatch', "Amount doesn't match", 'ငွေပမာဏ မကိုက်ညီတာ'),
      o('qty_mismatch', "Quantity doesn't match", 'အရေအတွက် မကိုက်ညီတာ'),
      o('stock_diff', 'Warehouse stock is more or less than the records', 'ဂိုဒေါင်ထဲက ပစ္စည်း စာရင်းထက် ပို / လို နေတာ'),
      o('duplicates', 'Duplicate entries', 'နှစ်ခါ ထပ်သွင်းထားတာ'),
      o('skipped_numbers', 'Voucher numbers skipped', 'Voucher နံပါတ် ကျော်နေတာ'),
      o('wrong_date', 'Wrong date', 'ရက်စွဲ မှားတာ'),
      o('wrong_item', 'Wrong item, code or account', 'ပစ္စည်း၊ ကုဒ် ဒါမှမဟုတ် account မှားတာ'),
      o('missing_approval', 'Missing approval or signature', 'ခွင့်ပြုချက် / လက်မှတ် မပါတာ'),
      o('wrong_totals', "Totals don't add up", 'စုစုပေါင်း မမှန်တာ'),
      NOT_SURE,
    ],
  },
  {
    id: 'recordMethod',
    kind: 'multi',
    required: false,
    title: t('When you find a problem, how do you note it now?', 'အမှားတွေ့ရင် အခု ဘယ်လို မှတ်ထားလဲ?'),
    helper: t('Tap all that apply.', 'သက်ဆိုင်တာ အားလုံး နှိပ်ပါ။'),
    options: [
      o('highlight', 'Highlight cells in Excel', 'Excel မှာ အရောင်ခြယ်ထားတာ'),
      o('excel_comments', 'Comments / notes in Excel', 'Excel ထဲမှာ comment / မှတ်ချက် ရေးတာ'),
      o('excel_list', 'A separate list in Excel', 'Excel မှာ သီးသန့်စာရင်း လုပ်တာ'),
      o('word_report', 'In a Word document or report', 'Word ဖိုင် ဒါမှမဟုတ် report ထဲမှာ'),
      o('paper_notes', 'On paper / in a notebook', 'စာရွက် / မှတ်စုစာအုပ်ထဲမှာ'),
      o('tell_boss', 'I tell my boss or colleague directly', 'အထက်လူကြီး / လုပ်ဖော်ကိုင်ဖက်ကို တိုက်ရိုက်ပြောတာ'),
      o('chat', 'By Viber / Telegram message', 'Viber / Telegram နဲ့ ပို့တာ'),
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
      o('month_end', 'Mostly at month-end', 'လကုန်မှာ အများဆုံး'),
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
      o('laptop_and_phone', 'Laptop at the desk + phone in the warehouse', 'စားပွဲမှာ Laptop + ဂိုဒေါင်မှာ ဖုန်း'),
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
      o('auto_match', 'Match Excel rows with vouchers for me', 'Excel စာရင်းနဲ့ voucher ကို အလိုအလျောက် တိုက်ပေးတာ'),
      o('find_errors', 'Find duplicates, skipped numbers and wrong totals', 'ထပ်နေတာ၊ ကျော်နေတဲ့ နံပါတ်၊ စုစုပေါင်း မှားတာ ရှာပေးတာ'),
      o('stock_compare', 'Compare stock records with the warehouse count', 'စာရင်းနဲ့ ဂိုဒေါင် ရေတွက်ချက်ကို နှိုင်းယှဉ်ပေးတာ'),
      o('checklist', 'Tick each line as OK / missing / wrong, with notes and photos', 'စာရင်းတစ်ကြောင်းချင်းကို မှန် / မရှိ / မှား လို့ မှတ်ပြီး မှတ်ချက်၊ ဓာတ်ပုံ ထည့်လို့ရတာ'),
      o('evidence', 'Keep the evidence for each problem in one place', 'အမှားတစ်ခုချင်းရဲ့ အထောက်အထားတွေကို တစ်နေရာထဲ စုထားတာ'),
      o('report', 'Make the problem list / report for me', 'အမှားစာရင်း / Report ကို အလိုအလျောက် ထုတ်ပေးတာ'),
      o('surprise_me', 'Surprise me — build what you think helps', 'ကိုယ်ထင်တာ လုပ်ပေးပါ (Surprise me)'),
    ],
  },
]

export const NOTE_MAX_LENGTH = 300

/** Quick-tap chips that fill the optional note. */
export const NOTE_CHIPS: Text[] = [
  t('I want to find the matching voucher faster.', 'သက်ဆိုင်တဲ့ voucher ကို မြန်မြန် ရှာချင်တယ်။'),
  t('I want stock differences found automatically.', 'ပစ္စည်း ကွာခြားချက်တွေကို အလိုအလျောက် ရှာပေးစေချင်တယ်။'),
  t('I want the report made for me.', 'Report ကို အလိုအလျောက် ထုတ်ပေးစေချင်တယ်။'),
  t('I want to go home on time.', 'အချိန်မီ အိမ်ပြန်ချင်တယ်။'),
  t('Show me a demo first.', 'Demo အရင် ပြပါ။'),
]
