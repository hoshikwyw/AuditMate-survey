// Pure survey logic: which options and questions she sees, and in what order.
// No React here, so it can be tested on its own.

import { NON_RANKABLE_TASKS, QUESTIONS } from '../config/survey'
import type { MultiQuestionId, Option, Question, QuestionId, SingleQuestionId } from '../config/types'

export type Answers = { [K in MultiQuestionId]: string[] } & { [K in SingleQuestionId]?: string } & {
  note: string
}

export const MULTI_IDS: MultiQuestionId[] = ['tasks', 'topTasks', 'voucherFormat', 'problems', 'recordMethod']
export const SINGLE_IDS: SingleQuestionId[] = ['fileSize', 'frequency', 'duration', 'device', 'buildFirst']

export const EMPTY_ANSWERS: Answers = {
  tasks: [],
  topTasks: [],
  voucherFormat: [],
  problems: [],
  recordMethod: [],
  note: '',
}

export type Screen = 'welcome' | QuestionId | 'review' | 'thanks'

const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q])) as Record<QuestionId, Question>

export function getQuestion(id: QuestionId): Question {
  return QUESTION_BY_ID[id]
}

export function isQuestionScreen(screen: Screen): screen is QuestionId {
  return screen in QUESTION_BY_ID
}

export function isMulti(id: QuestionId): id is MultiQuestionId {
  return (MULTI_IDS as string[]).includes(id)
}

/** Tasks she picked that make sense to rank. */
export function rankableTasks(answers: Answers): Option[] {
  return getQuestion('tasks').options.filter(
    (opt) => answers.tasks.includes(opt.id) && !NON_RANKABLE_TASKS.includes(opt.id),
  )
}

/** The options shown for a question, given her earlier answers. */
export function getOptions(id: QuestionId, answers: Answers): Option[] {
  return id === 'topTasks' ? rankableTasks(answers) : getQuestion(id).options
}

/** Her #1 task: first ranked, or the only rankable one if she picked just one. */
export function primaryTask(answers: Answers): Option | undefined {
  const rankable = rankableTasks(answers)
  if (rankable.length === 1) return rankable[0]
  return rankable.find((opt) => opt.id === answers.topTasks[0])
}

export function isVisible(id: QuestionId, answers: Answers): boolean {
  switch (id) {
    case 'topTasks':
      // Nothing to rank with fewer than two tasks.
      return rankableTasks(answers).length >= 2
    case 'frequency':
    case 'duration':
      // Ranking comes first and is required, so any rankable task means a #1 will exist.
      return rankableTasks(answers).length >= 1
    default:
      return true
  }
}

export function visibleQuestions(answers: Answers): Question[] {
  return QUESTIONS.filter((q) => isVisible(q.id, answers))
}

export function isAnswered(id: QuestionId, answers: Answers): boolean {
  return isMulti(id) ? answers[id].length > 0 : answers[id] !== undefined
}

export function canContinue(id: QuestionId, answers: Answers): boolean {
  return !getQuestion(id).required || isAnswered(id, answers)
}

export function nextScreen(screen: Screen, answers: Answers): Screen {
  if (screen === 'welcome') return visibleQuestions(answers)[0].id
  if (screen === 'review' || screen === 'thanks') return screen
  const visible = visibleQuestions(answers)
  const index = visible.findIndex((q) => q.id === screen)
  return visible[index + 1]?.id ?? 'review'
}

export function prevScreen(screen: Screen, answers: Answers): Screen {
  if (screen === 'welcome' || screen === 'thanks') return screen
  const visible = visibleQuestions(answers)
  if (screen === 'review') return visible[visible.length - 1].id
  const index = visible.findIndex((q) => q.id === screen)
  return index > 0 ? visible[index - 1].id : 'welcome'
}

/** "Question X of Y" — the total shrinks when questions get skipped by the flow. */
export function progress(screen: Screen, answers: Answers): { current: number; total: number } {
  const visible = visibleQuestions(answers)
  const index = visible.findIndex((q) => q.id === screen)
  return { current: index + 1, total: visible.length }
}

/** The first required question she hasn't answered yet (used to block sending). */
export function firstMissingRequired(answers: Answers): QuestionId | undefined {
  return visibleQuestions(answers).find((q) => !canContinue(q.id, answers))?.id
}

/**
 * Rebuilds answers keeping only ids that exist in the current config, e.g. after a task is
 * unticked (its ranking goes too) or a saved draft comes from an older version of the survey.
 */
export function reconcile(answers: Partial<Answers>): Answers {
  const result: Answers = { ...EMPTY_ANSWERS, note: typeof answers.note === 'string' ? answers.note : '' }
  // Order matters: tasks before topTasks, because ranking options depend on the picked tasks.
  for (const id of MULTI_IDS) {
    const valid = new Set(getOptions(id, result).map((opt) => opt.id))
    const value = answers[id]
    result[id] = Array.isArray(value) ? [...new Set(value.filter((v) => valid.has(v)))] : []
  }
  for (const id of SINGLE_IDS) {
    const value = answers[id]
    if (getOptions(id, result).some((opt) => opt.id === value)) result[id] = value
  }
  return result
}
