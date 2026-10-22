// What gets sent to you: a readable message (Viber / Telegram) and a JSON file backup.
// The message always uses English labels so results are easy to compare; her note stays as she wrote it.

import type { Lang, QuestionId } from '../config/types'
import { visibleQuestions } from './flow'
import type { SurveyState } from './state'
import { answerLabels, questionTitle } from './summary'

const LANG_NAMES: Record<Lang, string> = { en: 'English', my: 'Myanmar' }

/**
 * "2026-10-22 10:03" in her time zone. The email is built on Cloudflare's servers (UTC),
 * so the browser sends its time zone along.
 */
function localTimestamp(date: Date, timeZone?: string): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  )
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`
}

function minutesBetween(start?: string, end?: string): number | undefined {
  if (!start || !end) return undefined
  const ms = new Date(end).getTime() - new Date(start).getTime()
  return ms > 0 ? Math.max(1, Math.round(ms / 60000)) : undefined
}

/** The text she shares to you. */
export function buildMessage(state: SurveyState, now = new Date(), timeZone?: string): string {
  const { answers } = state
  const minutes = minutesBetween(state.startedAt, now.toISOString())
  const lines = [
    'AuditMate survey 💛',
    [
      `ID ${state.responseId.slice(0, 8)}`,
      localTimestamp(now, timeZone),
      `in ${LANG_NAMES[state.lang]}`,
      minutes !== undefined ? `${minutes} min` : undefined,
    ]
      .filter(Boolean)
      .join(' · '),
  ]

  visibleQuestions(answers).forEach((q, i) => {
    const labels = answerLabels(q.id, answers, 'en')
    const ranked = q.kind === 'rank'
    lines.push('', `${i + 1}. ${questionTitle(q.id, answers, 'en')}`)
    if (labels.length === 0) lines.push('   (skipped)')
    labels.forEach((label, j) => lines.push(`   ${ranked ? `#${j + 1}` : '•'} ${label}`))
  })

  if (answers.note.trim()) lines.push('', `Note: "${answers.note.trim()}"`)
  return lines.join('\n')
}

export interface SurveyExport {
  responseId: string
  exportedAt: string
  startedAt?: string
  language: Lang
  /** Raw answer ids, stable even if labels are reworded later. */
  answers: SurveyState['answers']
  /** Same answers as English labels, for reading. */
  readable: Partial<Record<QuestionId, string[]>>
  skipped: QuestionId[]
}

/** Full machine-readable copy, for the "save as a file" fallback. */
export function buildExport(state: SurveyState, now = new Date()): SurveyExport {
  const readable: SurveyExport['readable'] = {}
  for (const q of visibleQuestions(state.answers)) readable[q.id] = answerLabels(q.id, state.answers, 'en')
  return {
    responseId: state.responseId,
    exportedAt: now.toISOString(),
    startedAt: state.startedAt,
    language: state.lang,
    answers: state.answers,
    readable,
    skipped: state.skipped,
  }
}
