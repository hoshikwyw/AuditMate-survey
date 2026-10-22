// Turns stored answer ids back into readable labels (review screen + the message sent in Step 6).

import { tr } from '../config/i18n'
import type { Lang, QuestionId } from '../config/types'
import { getOptions, getQuestion, primaryTask } from './flow'
import type { Answers } from './flow'

/** Labels of the chosen answers, in order (ranked order for topTasks). */
export function answerLabels(id: QuestionId, answers: Answers, lang: Lang): string[] {
  const value = answers[id]
  const ids = Array.isArray(value) ? value : value !== undefined ? [value] : []
  const options = getOptions(id, answers)
  return ids.flatMap((v) => {
    const opt = options.find((o) => o.id === v)
    return opt ? [tr(opt.label, lang)] : []
  })
}

/** Question title with {task} filled in with her #1 task. */
export function questionTitle(id: QuestionId, answers: Answers, lang: Lang): string {
  const task = primaryTask(answers)
  return tr(getQuestion(id).title, lang, { task: task ? tr(task.label, lang) : '…' })
}
