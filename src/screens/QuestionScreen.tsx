import { useEffect, useRef } from 'react'
import type { Dispatch } from 'react'
import { Button } from '../components/Button'
import { ChoiceCard } from '../components/ChoiceCard'
import { Chip } from '../components/Chip'
import { Heading } from '../components/Heading'
import { LanguageToggle } from '../components/LanguageToggle'
import { ProgressBar } from '../components/ProgressBar'
import { ScreenLayout } from '../components/ScreenLayout'
import { ArrowLeftIcon, ArrowRightIcon } from '../components/icons'
import { tr } from '../config/i18n'
import { NOTE_CHIPS, NOTE_MAX_LENGTH } from '../config/survey'
import type { QuestionId } from '../config/types'
import { UI } from '../config/ui'
import { canContinue, getOptions, getQuestion, progress } from '../survey/flow'
import type { Action, SurveyState } from '../survey/state'
import { questionTitle } from '../survey/summary'

/** Delay before moving on after a single-choice tap, so she sees her pick register. */
const AUTO_ADVANCE_MS = 350

interface Props {
  id: QuestionId
  state: SurveyState
  dispatch: Dispatch<Action>
}

export function QuestionScreen({ id, state, dispatch }: Props) {
  const { lang, answers } = state
  const question = getQuestion(id)
  const options = getOptions(id, answers)
  const { current, total } = progress(id, answers)
  const ok = canContinue(id, answers)
  const autoAdvance = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(autoAdvance.current), [])

  const selectSingle = (optionId: string) => {
    const changed = answers[id] !== optionId
    dispatch({ type: 'selectSingle', question: id, id: optionId })
    // Quick flow: single-choice questions move on by themselves (not the last one, which has a note).
    if (changed && !question.withNote) {
      window.clearTimeout(autoAdvance.current)
      autoAdvance.current = window.setTimeout(() => dispatch({ type: 'next' }), AUTO_ADVANCE_MS)
    }
  }

  const max = question.maxPicks
  const picked = id === 'topTasks' ? answers.topTasks : id === 'tasks' ? answers.tasks : id === 'tools' ? answers.tools : []

  return (
    <ScreenLayout
      header={
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <ProgressBar current={current} total={total} label={tr(UI.progress, lang, { x: current, y: total })} />
          </div>
          <LanguageToggle lang={lang} onChange={(l) => dispatch({ type: 'setLang', lang: l })} />
        </div>
      }
      footer={
        <div className="flex gap-3">
          <Button variant="secondary" aria-label={tr(UI.back, lang)} onClick={() => dispatch({ type: 'back' })}>
            <ArrowLeftIcon />
          </Button>
          {!question.required && (
            <Button variant="ghost" onClick={() => dispatch({ type: 'skip', question: id })}>
              <span lang={lang}>{tr(UI.skip, lang)}</span>
            </Button>
          )}
          <Button fullWidth disabled={!ok} onClick={() => dispatch({ type: 'next' })}>
            <span lang={lang}>{tr(UI.next, lang)}</span> <ArrowRightIcon />
          </Button>
        </div>
      }
    >
      <div lang={lang} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Heading>{questionTitle(id, answers, lang)}</Heading>
          {question.helper && <p className="text-muted">{tr(question.helper, lang)}</p>}
        </div>

        <div
          role={question.kind === 'single' ? 'radiogroup' : 'group'}
          aria-label={questionTitle(id, answers, lang)}
          className="flex flex-col gap-2.5"
        >
          {options.map((opt) => {
            const label = tr(opt.label, lang)
            if (question.kind === 'single') {
              return (
                <ChoiceCard
                  key={opt.id}
                  mode="single"
                  lang={lang}
                  label={label}
                  selected={answers[id] === opt.id}
                  onClick={() => selectSingle(opt.id)}
                />
              )
            }
            if (question.kind === 'rank') {
              const index = answers.topTasks.indexOf(opt.id)
              return (
                <ChoiceCard
                  key={opt.id}
                  mode="rank"
                  lang={lang}
                  label={label}
                  selected={index >= 0}
                  rank={index + 1}
                  disabled={index < 0 && max !== undefined && answers.topTasks.length >= max}
                  onClick={() => dispatch({ type: 'toggleRank', id: opt.id })}
                />
              )
            }
            return (
              <ChoiceCard
                key={opt.id}
                mode="multi"
                lang={lang}
                label={label}
                selected={picked.includes(opt.id)}
                onClick={() => dispatch({ type: 'toggleMulti', question: id, id: opt.id })}
              />
            )
          })}
        </div>

        {question.kind === 'rank' && answers.topTasks.length > 0 && (
          <Button variant="ghost" className="self-start" onClick={() => dispatch({ type: 'clearRank' })}>
            {tr(UI.clear, lang)}
          </Button>
        )}

        {question.withNote && <NoteField state={state} dispatch={dispatch} />}
      </div>
    </ScreenLayout>
  )
}

function NoteField({ state, dispatch }: Omit<Props, 'id'>) {
  const { lang, answers } = state
  const setNote = (note: string) => dispatch({ type: 'setNote', note })

  return (
    <div className="mt-2 flex flex-col gap-3 border-t border-line pt-5">
      <label htmlFor="note" className="font-semibold text-ink">
        {tr(UI.notePrompt, lang)}
      </label>
      <div className="flex flex-wrap gap-2">
        {NOTE_CHIPS.map((chip) => (
          <Chip key={chip.en} lang={lang} label={tr(chip, lang)} onClick={() => setNote(tr(chip, lang))} />
        ))}
      </div>
      <textarea
        id="note"
        rows={3}
        maxLength={NOTE_MAX_LENGTH}
        value={answers.note}
        placeholder={tr(UI.notePlaceholder, lang)}
        onChange={(e) => setNote(e.target.value)}
        aria-describedby="note-hint"
        className="w-full resize-none rounded-2xl border-2 border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-coral-500 focus:outline-none"
      />
      <p id="note-hint" className="flex justify-between gap-3 text-sm text-muted">
        <span>{tr(UI.noteHint, lang)}</span>
        <span aria-hidden="true">
          {answers.note.length}/{NOTE_MAX_LENGTH}
        </span>
      </p>
    </div>
  )
}
