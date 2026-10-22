import { describe, expect, it } from 'vitest'
import {
  EMPTY_ANSWERS,
  firstMissingRequired,
  getOptions,
  nextScreen,
  prevScreen,
  primaryTask,
  progress,
  reconcile,
  visibleQuestions,
} from './flow'
import type { Answers } from './flow'

const answers = (partial: Partial<Answers>): Answers => ({ ...EMPTY_ANSWERS, ...partial })

describe('task options', () => {
  it('are empty until workplace is picked', () => {
    expect(getOptions('tasks', EMPTY_ANSWERS)).toEqual([])
  })

  it('follow the workplace', () => {
    const bank = getOptions('tasks', answers({ workplace: 'bank_mfi' })).map((o) => o.id)
    expect(bank).toContain('loan_files')
    expect(bank).not.toContain('vouching')
    expect(bank).toContain('review_team')
  })

  it('ranking only offers tasks she picked, never "not on this list"', () => {
    const a = answers({ workplace: 'audit_firm', tasks: ['vouching', 'sampling', 'not_listed'] })
    expect(getOptions('topTasks', a).map((o) => o.id)).toEqual(['vouching', 'sampling'])
  })

  it('shows core banking only for bank workplaces', () => {
    expect(getOptions('tools', answers({ workplace: 'bank_mfi' })).map((o) => o.id)).toContain('core_banking')
    expect(getOptions('tools', answers({ workplace: 'audit_firm' })).map((o) => o.id)).not.toContain('core_banking')
  })
})

describe('visible questions', () => {
  it('shows all 9 when she picks several tasks', () => {
    const a = answers({ workplace: 'audit_firm', tasks: ['vouching', 'sampling'] })
    expect(visibleQuestions(a)).toHaveLength(9)
  })

  it('skips ranking with one task and uses it as #1', () => {
    const a = answers({ workplace: 'audit_firm', tasks: ['vouching'] })
    const ids = visibleQuestions(a).map((q) => q.id)
    expect(ids).not.toContain('topTasks')
    expect(ids).toContain('frequency')
    expect(primaryTask(a)?.id).toBe('vouching')
  })

  it('skips ranking, frequency and duration when only "not on this list" is picked', () => {
    const a = answers({ workplace: 'audit_firm', tasks: ['not_listed'] })
    const ids = visibleQuestions(a).map((q) => q.id)
    expect(ids).not.toContain('topTasks')
    expect(ids).not.toContain('frequency')
    expect(ids).not.toContain('duration')
  })

  it('uses the first ranked task as #1', () => {
    const a = answers({ workplace: 'audit_firm', tasks: ['vouching', 'sampling'], topTasks: ['sampling', 'vouching'] })
    expect(primaryTask(a)?.id).toBe('sampling')
  })
})

describe('navigation', () => {
  const a = answers({ workplace: 'audit_firm', tasks: ['vouching'] })

  it('goes welcome → first question → … → review, skipping hidden questions', () => {
    expect(nextScreen('welcome', a)).toBe('workplace')
    expect(nextScreen('tasks', a)).toBe('stress')
    expect(nextScreen('buildFirst', a)).toBe('review')
  })

  it('goes back the same way', () => {
    expect(prevScreen('stress', a)).toBe('tasks')
    expect(prevScreen('workplace', a)).toBe('welcome')
    expect(prevScreen('review', a)).toBe('buildFirst')
  })

  it('counts progress over visible questions only', () => {
    expect(progress('stress', a)).toEqual({ current: 3, total: 8 })
  })

  it('finds the first unanswered required question', () => {
    expect(firstMissingRequired(EMPTY_ANSWERS)).toBe('workplace')
    expect(firstMissingRequired(a)).toBe('tools')
  })
})

describe('reconcile', () => {
  it('drops tasks and rankings that no longer belong after changing workplace', () => {
    const before = answers({
      workplace: 'bank_mfi',
      tasks: ['loan_files', 'kyc', 'review_team'],
      topTasks: ['kyc', 'loan_files'],
      tools: ['excel', 'core_banking'],
    })
    const after = reconcile({ ...before, workplace: 'audit_firm' })
    expect(after.tasks).toEqual(['review_team'])
    expect(after.topTasks).toEqual([])
    expect(after.tools).toEqual(['excel'])
  })
})
