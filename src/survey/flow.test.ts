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

describe('ranking options', () => {
  it('only offers tasks she picked, never "not on this list"', () => {
    const a = answers({ tasks: ['excel_vouchers', 'stock_count', 'not_listed'] })
    expect(getOptions('topTasks', a).map((o) => o.id)).toEqual(['excel_vouchers', 'stock_count'])
  })
})

describe('visible questions', () => {
  it('shows all 10 when she picks several tasks', () => {
    expect(visibleQuestions(answers({ tasks: ['excel_vouchers', 'stock_count'] }))).toHaveLength(10)
  })

  it('skips ranking with one task and uses it as #1', () => {
    const a = answers({ tasks: ['stock_count'] })
    const ids = visibleQuestions(a).map((q) => q.id)
    expect(ids).not.toContain('topTasks')
    expect(ids).toContain('frequency')
    expect(primaryTask(a)?.id).toBe('stock_count')
  })

  it('skips ranking, frequency and duration when only "not on this list" is picked', () => {
    const ids = visibleQuestions(answers({ tasks: ['not_listed'] })).map((q) => q.id)
    expect(ids).not.toContain('topTasks')
    expect(ids).not.toContain('frequency')
    expect(ids).not.toContain('duration')
  })

  it('uses the first ranked task as #1', () => {
    const a = answers({ tasks: ['excel_vouchers', 'stock_count'], topTasks: ['stock_count', 'excel_vouchers'] })
    expect(primaryTask(a)?.id).toBe('stock_count')
  })
})

describe('navigation', () => {
  const a = answers({ tasks: ['stock_count'] })

  it('goes welcome → first question → … → review, skipping hidden questions', () => {
    expect(nextScreen('welcome', a)).toBe('tasks')
    expect(nextScreen('tasks', a)).toBe('voucherFormat')
    expect(nextScreen('buildFirst', a)).toBe('review')
  })

  it('goes back the same way', () => {
    expect(prevScreen('voucherFormat', a)).toBe('tasks')
    expect(prevScreen('tasks', a)).toBe('welcome')
    expect(prevScreen('review', a)).toBe('buildFirst')
  })

  it('counts progress over visible questions only', () => {
    expect(progress('voucherFormat', a)).toEqual({ current: 2, total: 9 })
  })

  it('finds the first unanswered required question', () => {
    expect(firstMissingRequired(EMPTY_ANSWERS)).toBe('tasks')
    expect(firstMissingRequired(a)).toBe('voucherFormat')
  })
})

describe('reconcile', () => {
  it('drops rankings of unticked tasks and ids that no longer exist', () => {
    const after = reconcile({
      tasks: ['excel_vouchers', 'removed_task'],
      topTasks: ['stock_count', 'excel_vouchers'],
      problems: ['duplicates', 'old_problem'],
      device: 'toaster',
      buildFirst: 'report',
    })
    expect(after.tasks).toEqual(['excel_vouchers'])
    expect(after.topTasks).toEqual(['excel_vouchers'])
    expect(after.problems).toEqual(['duplicates'])
    expect(after.device).toBeUndefined()
    expect(after.buildFirst).toBe('report')
  })

  it('ignores fields from the old survey version', () => {
    const after = reconcile({ workplace: 'bank_mfi', tools: ['excel'] } as Partial<Answers>)
    expect(after).toEqual(EMPTY_ANSWERS)
  })
})
