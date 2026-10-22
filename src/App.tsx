// TEMPORARY component preview (Step 4). Replaced by the real screens in Step 5.

import { useState } from 'react'
import { Button } from './components/Button'
import { Checkbox } from './components/Checkbox'
import { ChoiceCard } from './components/ChoiceCard'
import { Chip } from './components/Chip'
import { LanguageToggle } from './components/LanguageToggle'
import { ProgressBar } from './components/ProgressBar'
import { ScreenLayout } from './components/ScreenLayout'
import { ArrowLeftIcon, ArrowRightIcon } from './components/icons'
import { tr } from './config/i18n'
import { NOTE_CHIPS, QUESTIONS, TASK_LISTS } from './config/survey'
import type { Lang } from './config/types'
import { UI } from './config/ui'
import { useDocumentLang } from './hooks/useDocumentLang'

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [single, setSingle] = useState<string>()
  const [multi, setMulti] = useState<string[]>([])
  const [rank, setRank] = useState<string[]>([])
  const [consent, setConsent] = useState(false)
  useDocumentLang(lang)

  const workplace = QUESTIONS[0]
  const tasks = TASK_LISTS.audit_firm.slice(0, 5)

  return (
    <ScreenLayout
      header={
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1">
            <ProgressBar current={3} total={9} label={tr(UI.progress, lang, { x: 3, y: 9 })} />
          </div>
          <LanguageToggle lang={lang} onChange={setLang} />
        </div>
      }
      footer={
        <div className="flex gap-3">
          <Button variant="secondary" aria-label={tr(UI.back, lang)}>
            <ArrowLeftIcon />
          </Button>
          <Button fullWidth>
            {tr(UI.next, lang)} <ArrowRightIcon />
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-8" lang={lang}>
        <Section title="Single choice">
          <h1 className="text-xl font-bold">{tr(workplace.title, lang)}</h1>
          <p className="text-muted">{tr(workplace.helper!, lang)}</p>
          <div role="radiogroup" className="flex flex-col gap-2.5">
            {workplace.options.map((opt) => (
              <ChoiceCard
                key={opt.id}
                mode="single"
                lang={lang}
                label={tr(opt.label, lang)}
                selected={single === opt.id}
                onClick={() => setSingle(opt.id)}
              />
            ))}
          </div>
        </Section>

        <Section title="Multiple choice">
          {tasks.map((opt) => (
            <ChoiceCard
              key={opt.id}
              mode="multi"
              lang={lang}
              label={tr(opt.label, lang)}
              selected={multi.includes(opt.id)}
              onClick={() => setMulti((m) => (m.includes(opt.id) ? m.filter((x) => x !== opt.id) : [...m, opt.id]))}
            />
          ))}
        </Section>

        <Section title="Ranking (up to 3)">
          {tasks.map((opt) => {
            const index = rank.indexOf(opt.id)
            return (
              <ChoiceCard
                key={opt.id}
                mode="rank"
                lang={lang}
                label={tr(opt.label, lang)}
                selected={index >= 0}
                rank={index + 1}
                disabled={index < 0 && rank.length >= 3}
                onClick={() => setRank((r) => (r.includes(opt.id) ? r.filter((x) => x !== opt.id) : [...r, opt.id]))}
              />
            )
          })}
          <Button variant="ghost" onClick={() => setRank([])}>
            {tr(UI.clear, lang)}
          </Button>
        </Section>

        <Section title="Chips">
          <div className="flex flex-wrap gap-2">
            {NOTE_CHIPS.map((chip) => (
              <Chip key={chip.en} lang={lang} label={tr(chip, lang)} onClick={() => {}} />
            ))}
          </div>
        </Section>

        <Section title="Consent">
          <Checkbox lang={lang} checked={consent} onChange={setConsent} label={tr(UI.consent, lang)} />
          <Button fullWidth disabled={!consent}>
            {tr(UI.send, lang)}
          </Button>
        </Section>
      </div>
    </ScreenLayout>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2.5">
      <h2 className="text-xs font-semibold tracking-wide text-muted uppercase" lang="en">
        {title}
      </h2>
      {children}
    </section>
  )
}
