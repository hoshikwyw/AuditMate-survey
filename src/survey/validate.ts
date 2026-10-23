// Server-side check of a submission (runs in the Cloudflare Function, see functions/api/submit.ts).
// Never trusts the browser: rebuilds a clean state using only ids that exist in the survey config.

import { NOTE_MAX_LENGTH, QUESTIONS } from '../config/survey'
import type { Lang, QuestionId } from '../config/types'
import { EMPTY_ANSWERS, MULTI_IDS, SINGLE_IDS, firstMissingRequired, getOptions, getQuestion, reconcile } from './flow'
import type { Answers } from './flow'
import { initialState } from './state'
import type { SurveyState } from './state'

/** What the browser sends to /api/submit. */
export interface SubmitPayload {
  lang: Lang
  responseId: string
  startedAt?: string
  /** Set once on the first send attempt, so retries produce the identical email. */
  submittedAt: string
  /** Her phone's time zone, so the email shows her local time. */
  timeZone?: string
  answers: Answers
  skipped: QuestionId[]
  consent: true
  /** Honeypot: hidden field that real users never fill in. */
  website?: string
}

export type ValidationResult =
  | { ok: true; state: SurveyState; submittedAt: Date; timeZone?: string }
  | { ok: false; error: string }

const QUESTION_IDS = new Set<string>(QUESTIONS.map((q) => q.id))
const fail = (error: string): ValidationResult => ({ ok: false, error })
const isString = (v: unknown): v is string => typeof v === 'string'
const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every(isString)

function validDate(v: unknown): Date | undefined {
  if (!isString(v) || v.length > 40) return undefined
  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? undefined : d
}

function validTimeZone(v: unknown): string | undefined {
  if (!isString(v) || v.length > 64) return undefined
  try {
    new Intl.DateTimeFormat('en', { timeZone: v })
    return v
  } catch {
    return undefined
  }
}

export function validateSubmission(input: unknown, now = new Date()): ValidationResult {
  if (!input || typeof input !== 'object') return fail('not an object')
  const p = input as Record<string, unknown>

  if (p.website) return fail('honeypot')
  if (p.consent !== true) return fail('no consent')
  if (p.lang !== 'en' && p.lang !== 'my') return fail('bad lang')
  if (!isString(p.responseId) || !/^[\w-]{8,64}$/.test(p.responseId)) return fail('bad responseId')

  const submittedAt = validDate(p.submittedAt)
  // Allow for a wrong phone clock, but not wildly off.
  if (!submittedAt || Math.abs(submittedAt.getTime() - now.getTime()) > 2 * 24 * 3600 * 1000) return fail('bad submittedAt')
  const startedAt = p.startedAt === undefined ? undefined : validDate(p.startedAt)
  if (p.startedAt !== undefined && !startedAt) return fail('bad startedAt')

  const raw = p.answers
  if (!raw || typeof raw !== 'object') return fail('no answers')
  const a = raw as Record<string, unknown>

  // Rebuild answers field by field; anything not in the config is rejected.
  // MULTI_IDS lists tasks before topTasks, so ranking is checked against the picked tasks.
  let answers: Answers = { ...EMPTY_ANSWERS }
  for (const key of MULTI_IDS) {
    const value = a[key] ?? []
    if (!isStringArray(value) || new Set(value).size !== value.length) return fail(`bad ${key}`)
    const options = getOptions(key, answers)
    if (value.some((id) => !options.some((o) => o.id === id))) return fail(`unknown ${key}`)
    const max = getQuestion(key).maxPicks
    if (max && value.length > max) return fail(`too many ${key}`)
    const exclusive = options.filter((o) => o.exclusive).map((o) => o.id)
    if (value.length > 1 && value.some((id) => exclusive.includes(id))) return fail(`exclusive ${key}`)
    answers = { ...answers, [key]: value }
  }

  for (const key of SINGLE_IDS) {
    const value = a[key]
    if (value === undefined || value === null) continue
    if (!isString(value) || !getOptions(key, answers).some((o) => o.id === value)) return fail(`bad ${key}`)
    answers = { ...answers, [key]: value }
  }

  const note = a.note ?? ''
  if (!isString(note) || note.length > NOTE_MAX_LENGTH) return fail('bad note')
  answers = { ...answers, note: note.trim() }

  const cleaned = reconcile(answers)
  if (firstMissingRequired(cleaned) !== undefined) return fail('incomplete')

  const skipped = p.skipped ?? []
  if (!isStringArray(skipped) || skipped.some((q) => !QUESTION_IDS.has(q))) return fail('bad skipped')

  const state: SurveyState = {
    ...initialState(p.lang),
    responseId: p.responseId,
    startedAt: startedAt?.toISOString(),
    answers: cleaned,
    skipped: skipped as QuestionId[],
    consent: true,
    screen: 'review',
  }
  return { ok: true, state, submittedAt, timeZone: validTimeZone(p.timeZone) }
}
