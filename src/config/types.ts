export type Lang = 'en' | 'my'

/** A piece of text in both languages. */
export type Text = Record<Lang, string>

export interface Option {
  id: string
  label: Text
  /** Selecting this clears every other choice (e.g. "Not sure"). */
  exclusive?: boolean
  /** Only show this option when Q1 (workplace) is one of these. */
  onlyFor?: WorkplaceId[]
}

export type WorkplaceId =
  | 'audit_firm'
  | 'internal_company'
  | 'bank_mfi'
  | 'government'
  | 'accounting'
  | 'other'

export type QuestionKind = 'single' | 'multi' | 'rank'

export type QuestionId =
  | 'workplace'
  | 'tasks'
  | 'topTasks'
  | 'stress'
  | 'tools'
  | 'frequency'
  | 'duration'
  | 'device'
  | 'buildFirst'

export interface Question {
  id: QuestionId
  kind: QuestionKind
  /** May contain {task}, replaced with her #1 task name. */
  title: Text
  helper?: Text
  required: boolean
  /** Fixed options. Questions with dynamic options (tasks, topTasks) leave this empty. */
  options: Option[]
  /** For multi / rank questions. */
  maxPicks?: number
  /** Shows the optional free-text note under the options (final question only). */
  withNote?: boolean
}
