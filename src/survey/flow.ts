// Pure survey logic: which options and questions she sees, and in what order.
// No React here, so it can be tested on its own.

import { NON_RANKABLE_TASKS, QUESTIONS, TASK_LISTS } from '../config/survey'
import type { Option, Question, QuestionId, WorkplaceId } from '../config/types'

export interface Answers {
  workplace?: WorkplaceId
  tasks: string[]
  /** Ranked: index 0 is her #1. */
  topTasks: string[]
  stress?: string
  tools: string[]
  frequency?: string
  duration?: string
  device?: string
  buildFirst?: string
  note: string
}

export const EMPTY_ANSWERS: Answers = { tasks: [], topTasks: [], tools: [], note: '' }

export type Screen = 'welcome' | QuestionId | 'review' | 'thanks'

const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q])) as Record<QuestionId, Question>

export function getQuestion(id: QuestionId): Question {
  return QUESTION_BY_ID[id]
}

export function isQuestionScreen(screen: Screen): screen is QuestionId {
  return screen in QUESTION_BY_ID
}

/** Task options for her workplace (empty until Q1 is answered). */
export function taskOptions(answers: Answers): Option[] {
  return answers.workplace ? TASK_LISTS[answers.workplace] : []
}

/** Tasks she picked that make sense to rank. */
export function rankableTasks(answers: Answers): Option[] {
  return taskOptions(answers).filter(
    (opt) => answers.tasks.includes(opt.id) && !NON_RANKABLE_TASKS.includes(opt.id),
  )
}

/** The options shown for a question, given her earlier answers. */
export function getOptions(id: QuestionId, answers: Answers): Option[] {
  switch (id) {
    case 'tasks':
      return taskOptions(answers)
    case 'topTasks':
      return rankableTasks(answers)
    default:
      return getQuestion(id).options.filter(
        (opt) => !opt.onlyFor || (answers.workplace && opt.onlyFor.includes(answers.workplace)),
      )
  }
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
  const value = answers[id]
  return Array.isArray(value) ? value.length > 0 : value !== undefined
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
 * Drops answers that no longer make sense after an earlier answer changed,
 * e.g. tasks from a different workplace's list.
 */
export function reconcile(answers: Answers): Answers {
  const validTasks = new Set(taskOptions(answers).map((opt) => opt.id))
  const tasks = answers.tasks.filter((id) => validTasks.has(id))
  const rankable = new Set(rankableTasks({ ...answers, tasks }).map((opt) => opt.id))
  const topTasks = answers.topTasks.filter((id) => rankable.has(id))
  const validTools = new Set(getOptions('tools', answers).map((opt) => opt.id))
  const tools = answers.tools.filter((id) => validTools.has(id))
  return { ...answers, tasks, topTasks, tools }
}
