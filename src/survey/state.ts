// Survey state + reducer. Every change goes through here so it can be saved and tested.

import type { Lang, QuestionId, WorkplaceId } from '../config/types'
import {
  EMPTY_ANSWERS,
  canContinue,
  firstMissingRequired,
  getOptions,
  getQuestion,
  isQuestionScreen,
  nextScreen,
  prevScreen,
  reconcile,
} from './flow'
import type { Answers, Screen } from './flow'
import { NOTE_MAX_LENGTH } from '../config/survey'

export interface SurveyState {
  lang: Lang
  screen: Screen
  answers: Answers
  /** Optional questions she explicitly skipped (shown as "Skipped" on review). */
  skipped: QuestionId[]
  consent: boolean
  /** True after tapping "Edit" on the review screen. */
  editing: boolean
  responseId: string
  startedAt?: string
  sentAt?: string
}

export type Action =
  | { type: 'setLang'; lang: Lang }
  | { type: 'goto'; screen: Screen }
  | { type: 'edit'; question: QuestionId }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'selectSingle'; question: QuestionId; id: string }
  | { type: 'toggleMulti'; question: QuestionId; id: string }
  | { type: 'toggleRank'; id: string }
  | { type: 'clearRank' }
  | { type: 'skip'; question: QuestionId }
  | { type: 'setNote'; note: string }
  | { type: 'setConsent'; consent: boolean }
  | { type: 'markSent' }
  | { type: 'reset' }

export function newResponseId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function initialState(lang: Lang = 'en'): SurveyState {
  return {
    lang,
    screen: 'welcome',
    answers: EMPTY_ANSWERS,
    skipped: [],
    consent: false,
    editing: false,
    responseId: newResponseId(),
  }
}

function withAnswers(state: SurveyState, question: QuestionId, answers: Answers): SurveyState {
  return {
    ...state,
    answers: reconcile(answers),
    skipped: state.skipped.filter((q) => q !== question),
  }
}

export function reducer(state: SurveyState, action: Action): SurveyState {
  const { answers } = state

  switch (action.type) {
    case 'setLang':
      return { ...state, lang: action.lang }

    case 'goto':
      return { ...state, screen: action.screen }

    case 'edit':
      return { ...state, screen: action.question, editing: true }

    case 'next': {
      if (isQuestionScreen(state.screen) && !canContinue(state.screen, answers)) return state
      if (state.editing) {
        // Coming from review: go straight back, unless the edit made a required question incomplete.
        const missing = firstMissingRequired(answers)
        return { ...state, screen: missing ?? 'review', editing: missing !== undefined }
      }
      return {
        ...state,
        screen: nextScreen(state.screen, answers),
        startedAt: state.startedAt ?? new Date().toISOString(),
      }
    }

    case 'back':
      if (state.editing && !firstMissingRequired(answers)) return { ...state, screen: 'review', editing: false }
      return { ...state, screen: prevScreen(state.screen, answers) }

    case 'selectSingle': {
      const value = action.question === 'workplace' ? (action.id as WorkplaceId) : action.id
      return withAnswers(state, action.question, { ...answers, [action.question]: value })
    }

    case 'toggleMulti': {
      const q = action.question as 'tasks' | 'tools'
      const current = answers[q]
      const options = getOptions(q, answers)
      const picked = options.find((opt) => opt.id === action.id)
      if (!picked) return state

      let next: string[]
      if (current.includes(action.id)) {
        next = current.filter((id) => id !== action.id)
      } else if (picked.exclusive) {
        next = [action.id]
      } else {
        const exclusiveIds = new Set(options.filter((opt) => opt.exclusive).map((opt) => opt.id))
        next = [...current.filter((id) => !exclusiveIds.has(id)), action.id]
        const max = getQuestion(q).maxPicks
        if (max && next.length > max) return state
      }
      return withAnswers(state, q, { ...answers, [q]: next })
    }

    case 'toggleRank': {
      const current = answers.topTasks
      const max = getQuestion('topTasks').maxPicks ?? 3
      let next: string[]
      if (current.includes(action.id)) {
        next = current.filter((id) => id !== action.id)
      } else if (current.length < max && getOptions('topTasks', answers).some((o) => o.id === action.id)) {
        next = [...current, action.id]
      } else {
        return state
      }
      return withAnswers(state, 'topTasks', { ...answers, topTasks: next })
    }

    case 'clearRank':
      return withAnswers(state, 'topTasks', { ...answers, topTasks: [] })

    case 'skip': {
      if (getQuestion(action.question).required) return state
      const cleared: Answers = { ...answers, [action.question]: undefined }
      if (action.question === 'buildFirst') cleared.note = ''
      return {
        ...state,
        answers: reconcile(cleared),
        skipped: [...state.skipped.filter((q) => q !== action.question), action.question],
        screen: state.editing ? 'review' : nextScreen(action.question, cleared),
        editing: false,
      }
    }

    case 'setNote':
      return { ...state, answers: { ...answers, note: action.note.slice(0, NOTE_MAX_LENGTH) } }

    case 'setConsent':
      return { ...state, consent: action.consent }

    case 'markSent':
      return { ...state, sentAt: state.sentAt ?? new Date().toISOString(), screen: 'thanks' }

    case 'reset':
      return initialState(state.lang)
  }
}
