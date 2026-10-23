export type Lang = 'en' | 'my'

/** A piece of text in both languages. */
export type Text = Record<Lang, string>

export interface Option {
  id: string
  label: Text
  /** Selecting this clears every other choice (e.g. "Not sure"). */
  exclusive?: boolean
}

export type QuestionKind = 'single' | 'multi' | 'rank'

/** Questions whose answer is a list of option ids. */
export type MultiQuestionId = 'tasks' | 'topTasks' | 'voucherFormat' | 'problems' | 'recordMethod'
/** Questions whose answer is one option id. */
export type SingleQuestionId = 'fileSize' | 'frequency' | 'duration' | 'device' | 'buildFirst'
export type QuestionId = MultiQuestionId | SingleQuestionId

export interface Question {
  id: QuestionId
  kind: QuestionKind
  /** May contain {task}, replaced with her #1 task name. */
  title: Text
  helper?: Text
  required: boolean
  /** Fixed options. topTasks leaves this empty: it shows the tasks she picked. */
  options: Option[]
  /** For multi / rank questions. */
  maxPicks?: number
  /** Shows the optional free-text note under the options (final question only). */
  withNote?: boolean
}
