import { describe, expect, it } from 'vitest'
import { initialState, reducer } from './state'
import type { Action, SurveyState } from './state'

const run = (actions: Action[], start: SurveyState = initialState()) => actions.reduce(reducer, start)

const pickTasks = (tasks: string[]) =>
  run(tasks.map((id): Action => ({ type: 'toggleMulti', question: 'tasks', id })))

/** All required questions answered (except ranking, which depends on the tasks). */
const answerRequired = (start: SurveyState) =>
  run(
    [
      { type: 'toggleMulti', question: 'voucherFormat', id: 'paper' },
      { type: 'toggleMulti', question: 'problems', id: 'qty_mismatch' },
      { type: 'selectSingle', question: 'device', id: 'laptop_and_phone' },
      { type: 'selectSingle', question: 'buildFirst', id: 'stock_compare' },
    ],
    start,
  )

describe('reducer', () => {
  it('blocks Next on an unanswered required question', () => {
    const s = run([{ type: 'next' }])
    expect(s.screen).toBe('tasks')
    expect(reducer(s, { type: 'next' }).screen).toBe('tasks')
  })

  it('makes exclusive options clear the others, and vice versa', () => {
    let s = run([
      { type: 'toggleMulti', question: 'voucherFormat', id: 'paper' },
      { type: 'toggleMulti', question: 'voucherFormat', id: 'pdf' },
      { type: 'toggleMulti', question: 'voucherFormat', id: 'not_sure' },
    ])
    expect(s.answers.voucherFormat).toEqual(['not_sure'])
    s = reducer(s, { type: 'toggleMulti', question: 'voucherFormat', id: 'photos' })
    expect(s.answers.voucherFormat).toEqual(['photos'])
  })

  it('limits problems to 3 picks', () => {
    const s = run(
      ['missing_voucher', 'qty_mismatch', 'duplicates', 'wrong_date'].map(
        (id): Action => ({ type: 'toggleMulti', question: 'problems', id }),
      ),
    )
    expect(s.answers.problems).toEqual(['missing_voucher', 'qty_mismatch', 'duplicates'])
  })

  it('ignores multi actions on single questions and vice versa', () => {
    const s = initialState()
    expect(reducer(s, { type: 'toggleMulti', question: 'device', id: 'phone' })).toBe(s)
    expect(reducer(s, { type: 'selectSingle', question: 'tasks', id: 'totals' })).toBe(s)
  })

  it('ranks in tap order, max 3, and untapping shifts the rest up', () => {
    let s = pickTasks(['excel_vouchers', 'stock_count', 'stock_in_out', 'investigate'])
    for (const id of ['stock_in_out', 'excel_vouchers', 'stock_count', 'investigate']) s = reducer(s, { type: 'toggleRank', id })
    expect(s.answers.topTasks).toEqual(['stock_in_out', 'excel_vouchers', 'stock_count'])
    s = reducer(s, { type: 'toggleRank', id: 'stock_in_out' })
    expect(s.answers.topTasks).toEqual(['excel_vouchers', 'stock_count'])
    s = reducer(s, { type: 'clearRank' })
    expect(s.answers.topTasks).toEqual([])
  })

  it('never ranks a task she did not pick, and drops a ranking when its task is unticked', () => {
    let s = pickTasks(['excel_vouchers', 'stock_count'])
    expect(reducer(s, { type: 'toggleRank', id: 'reports' }).answers.topTasks).toEqual([])
    s = reducer(s, { type: 'toggleRank', id: 'stock_count' })
    s = reducer(s, { type: 'toggleMulti', question: 'tasks', id: 'stock_count' })
    expect(s.answers.topTasks).toEqual([])
  })

  it('skips optional questions only', () => {
    const s = { ...pickTasks(['stock_count']), screen: 'fileSize' as const }
    const skipped = reducer(s, { type: 'skip', question: 'fileSize' })
    expect(skipped.skipped).toEqual(['fileSize'])
    expect(skipped.screen).toBe('problems')
    const multiSkip = reducer({ ...s, screen: 'recordMethod' }, { type: 'skip', question: 'recordMethod' })
    expect(multiSkip.answers.recordMethod).toEqual([])
    expect(reducer({ ...s, screen: 'device' }, { type: 'skip', question: 'device' })).toEqual({ ...s, screen: 'device' })
  })

  it('returns to review after editing', () => {
    let s: SurveyState = { ...answerRequired(pickTasks(['stock_count'])), screen: 'review' }
    s = reducer(s, { type: 'edit', question: 'fileSize' })
    expect(s.screen).toBe('fileSize')
    s = reducer(s, { type: 'selectSingle', question: 'fileSize', id: '200_1000' })
    s = reducer(s, { type: 'next' })
    expect(s.screen).toBe('review')
    expect(s.editing).toBe(false)
  })

  it('sends her to a newly incomplete required question after an edit', () => {
    let s = answerRequired(pickTasks(['excel_vouchers', 'stock_count']))
    s = run(
      [
        { type: 'toggleRank', id: 'stock_count' },
        { type: 'goto', screen: 'review' },
        { type: 'edit', question: 'tasks' },
        { type: 'toggleMulti', question: 'tasks', id: 'stock_count' }, // unticks the ranked task
        { type: 'toggleMulti', question: 'tasks', id: 'reports' },
        { type: 'next' },
      ],
      s,
    )
    expect(s.screen).toBe('topTasks')
  })

  it('keeps answers when switching language', () => {
    const s = reducer(pickTasks(['stock_count']), { type: 'setLang', lang: 'my' })
    expect(s.lang).toBe('my')
    expect(s.answers.tasks).toEqual(['stock_count'])
  })

  it('limits the note to 300 characters', () => {
    expect(reducer(initialState(), { type: 'setNote', note: 'x'.repeat(400) }).answers.note).toHaveLength(300)
  })

  it('records the send time only once', () => {
    const s = reducer(initialState(), { type: 'markSent' })
    expect(s.screen).toBe('thanks')
    expect(reducer(s, { type: 'markSent' }).sentAt).toBe(s.sentAt)
  })
})
