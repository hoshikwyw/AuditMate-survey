// Interface text (buttons, screens, messages) in both languages.
// {her} and {me} are replaced with the names from personal.ts.
// {x} and {y} are replaced with the current question number and total.

import type { Text } from './types'

export const UI = {
  welcomeTitle: { en: 'Hi {her} 💛', my: 'မင်္ဂလာပါ {her} 💛' },
  welcomeSubtitle: {
    en: 'I want to make your work easier and give you more rest time. Just ~3 minutes of tapping. No client names or company details needed.',
    my: 'အလုပ်တွေ ပိုလွယ်ပြီး အနားယူချိန် ပိုရအောင် ကူညီချင်လို့ပါ။ ၃ မိနစ်လောက် နှိပ်ရုံပါပဲ။ Client အမည်၊ ကုမ္ပဏီ အချက်အလက် ဘာမှ မလိုပါဘူး။',
  },
  start: { en: 'Start (3 min)', my: 'စမယ် (၃ မိနစ်)' },
  resume: { en: 'Continue where I left off', my: 'ရပ်ထားတဲ့နေရာက ဆက်မယ်' },
  startOver: { en: 'Start over', my: 'အစက ပြန်စမယ်' },

  next: { en: 'Next', my: 'ရှေ့ဆက်မယ်' },
  back: { en: 'Back', my: 'နောက်သို့' },
  skip: { en: 'Skip', my: 'ကျော်မယ်' },
  edit: { en: 'Edit', my: 'ပြင်မယ်' },
  clear: { en: 'Clear', my: 'ပြန်ရှင်းမယ်' },
  progress: { en: 'Question {x} of {y}', my: 'မေးခွန်း {y} ခုမှာ {x}' },
  pickUpTo: { en: 'Pick up to {n}', my: 'အများဆုံး {n} ခု ရွေးပါ' },
  required: { en: 'Please pick an answer to continue.', my: 'ဆက်သွားဖို့ အဖြေတစ်ခု ရွေးပေးပါ။' },
  language: { en: 'မြန်မာ', my: 'English' },

  notePrompt: { en: 'Anything you wish a tool could do?', my: 'ဘာလုပ်ပေးနိုင်ရင် ကောင်းမလဲ ပြောချင်တာ ရှိလား?' },
  notePlaceholder: { en: 'I wish I could just…', my: '…ကို လွယ်လွယ်လေး လုပ်နိုင်ရင် ကောင်းမှာပဲ' },
  noteHint: {
    en: 'Optional. Max 300 characters. No client details please.',
    my: 'မဖြစ်မနေ မဟုတ်ပါ။ စာလုံး ၃၀၀ အထိ။ Client အချက်အလက် မထည့်ပါနဲ့။',
  },

  reviewTitle: { en: 'Your answers', my: 'ဖြေထားတဲ့ အဖြေများ' },
  reviewSkipped: { en: 'Skipped', my: 'ကျော်ထားသည်' },
  consent: {
    en: "I'm happy to share these answers to help plan AuditMate.",
    my: 'AuditMate စီစဉ်ဖို့ ဒီအဖြေတွေ မျှဝေရတာ ကျေနပ်ပါတယ်။',
  },
  send: { en: 'Send to {me} 💛', my: '{me} ဆီ ပို့မယ် 💛' },
  copy: { en: 'Copy my answers', my: 'အဖြေတွေ ကူးယူမယ်' },
  copied: { en: 'Copied!', my: 'ကူးယူပြီးပါပြီ!' },
  exportJson: { en: 'Save answers as a file', my: 'အဖြေတွေကို ဖိုင်အဖြစ် သိမ်းမယ်' },
  retry: { en: 'Try again', my: 'ထပ်ကြိုးစားမယ်' },
  sendFailed: {
    en: "Couldn't send yet. Your answers are saved on this phone. Try again or copy them.",
    my: 'မပို့နိုင်သေးပါ။ အဖြေတွေ ဒီဖုန်းထဲမှာ သိမ်းထားပါတယ်။ ထပ်ကြိုးစားပါ ဒါမှမဟုတ် ကူးယူပါ။',
  },

  thanksTitle: { en: 'Thank you, {her} 💛', my: 'ကျေးဇူးပါ {her} 💛' },
  thanksMessage: {
    en: "Now go rest — I'll take it from here. — {me}",
    my: 'အခု အနားယူတော့နော် — ကျန်တာ ကိုယ်လုပ်လိုက်မယ်။ — {me}',
  },
} satisfies Record<string, Text>

export type UiKey = keyof typeof UI
