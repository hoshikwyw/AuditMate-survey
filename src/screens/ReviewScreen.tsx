import type { Dispatch } from 'react'
import { Button } from '../components/Button'
import { Checkbox } from '../components/Checkbox'
import { Heading } from '../components/Heading'
import { LanguageToggle } from '../components/LanguageToggle'
import { ScreenLayout } from '../components/ScreenLayout'
import { ArrowLeftIcon } from '../components/icons'
import { localizeDigits, tr } from '../config/i18n'
import { UI } from '../config/ui'
import { firstMissingRequired, visibleQuestions } from '../survey/flow'
import type { Action, SurveyState } from '../survey/state'
import { answerLabels, questionTitle } from '../survey/summary'

interface Props {
  state: SurveyState
  dispatch: Dispatch<Action>
  /** Wired up to sharing in Step 6. */
  onSend: () => void
}

export function ReviewScreen({ state, dispatch, onSend }: Props) {
  const { lang, answers } = state
  const complete = firstMissingRequired(answers) === undefined

  return (
    <ScreenLayout
      header={
        <div className="flex justify-end">
          <LanguageToggle lang={lang} onChange={(l) => dispatch({ type: 'setLang', lang: l })} />
        </div>
      }
      footer={
        <div className="flex gap-3">
          <Button variant="secondary" aria-label={tr(UI.back, lang)} onClick={() => dispatch({ type: 'back' })}>
            <ArrowLeftIcon />
          </Button>
          <Button fullWidth disabled={!state.consent || !complete} onClick={onSend}>
            <span lang={lang}>{tr(UI.send, lang)}</span>
          </Button>
        </div>
      }
    >
      <div lang={lang} className="flex flex-col gap-5">
        <Heading>{tr(UI.reviewTitle, lang)}</Heading>

        <ol className="flex flex-col gap-2.5">
          {visibleQuestions(answers).map((q, i) => {
            const labels = answerLabels(q.id, answers, lang)
            const ranked = q.kind === 'rank'
            return (
              <li key={q.id} className="flex items-start gap-3 rounded-2xl border border-line bg-white px-4 py-3">
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-sm text-muted">
                    {localizeDigits(i + 1, lang)}. {questionTitle(q.id, answers, lang)}
                  </span>
                  {labels.length > 0 ? (
                    <ul className="flex flex-col gap-0.5 font-medium text-ink">
                      {labels.map((label, j) => (
                        <li key={label}>
                          {ranked ? `#${localizeDigits(j + 1, lang)} ` : ''}
                          {label}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-muted italic">{tr(UI.reviewSkipped, lang)}</span>
                  )}
                  {q.withNote && answers.note && <p className="mt-1 text-ink">“{answers.note}”</p>}
                </div>
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'edit', question: q.id })}
                  className="min-h-10 shrink-0 rounded-xl px-3 text-sm font-semibold text-coral-600 hover:bg-coral-50 focus-visible:outline-3 focus-visible:outline-coral-500"
                >
                  {tr(UI.edit, lang)}
                </button>
              </li>
            )
          })}
        </ol>

        <Checkbox
          lang={lang}
          checked={state.consent}
          onChange={(consent) => dispatch({ type: 'setConsent', consent })}
          label={tr(UI.consent, lang)}
        />
      </div>
    </ScreenLayout>
  )
}
