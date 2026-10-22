import { describe, expect, it } from 'vitest'
import { initialState, reducer } from './state'
import type { Action, SurveyState } from './state'

const run = (actions: Action[], start: SurveyState = initialState()) => actions.reduce(reducer, start)

/** State sitting on a given screen after answering Q1 + Q2. */
const atAuditFirm = (tasks: string[]) =>
  run([
    { type: 'selectSingle', question: 'workplace', id: 'audit_firm' },
    ...tasks.map((id): Action => ({ type: 'toggleMulti', question: 'tasks', id })),
  ])

describe('reducer', () => {
  it('blocks Next on an unanswered required question', () => {
    const s = run([{ type: 'next' }])
    expect(s.screen).toBe('workplace')
    expect(reducer(s, { type: 'next' }).screen).toBe('workplace')
  })

  it('makes exclusive options clear the others, and vice versa', () => {
    let s = run([
      { type: 'toggleMulti', question: 'tools', id: 'excel' },
      { type: 'toggleMulti', question: 'tools', id: 'pdf' },
      { type: 'toggleMulti', question: 'tools', id: 'not_sure' },
    ])
    expect(s.answers.tools).toEqual(['not_sure'])
    s = reducer(s, { type: 'toggleMulti', question: 'tools', id: 'word' })
    expect(s.answers.tools).toEqual(['word'])
  })

  it('ranks in tap order, max 3, and untapping shifts the rest up', () => {
    let s = atAuditFirm(['vouching', 'sampling', 'recalc', 'bank_rec'])
    for (const id of ['recalc', 'vouching', 'sampling', 'bank_rec']) s = reducer(s, { type: 'toggleRank', id })
    expect(s.answers.topTasks).toEqual(['recalc', 'vouching', 'sampling'])
    s = reducer(s, { type: 'toggleRank', id: 'recalc' })
    expect(s.answers.topTasks).toEqual(['vouching', 'sampling'])
    s = reducer(s, { type: 'clearRank' })
    expect(s.answers.topTasks).toEqual([])
  })

  it('never ranks a task she did not pick', () => {
    const s = reducer(atAuditFirm(['vouching', 'sampling']), { type: 'toggleRank', id: 'tax_comp' })
    expect(s.answers.topTasks).toEqual([])
  })

  it('removes a task from the ranking when it is unticked', () => {
    let s = atAuditFirm(['vouching', 'sampling'])
    s = reducer(s, { type: 'toggleRank', id: 'sampling' })
    s = reducer(s, { type: 'toggleMulti', question: 'tasks', id: 'sampling' })
    expect(s.answers.topTasks).toEqual([])
  })

  it('skips optional questions only', () => {
    const s = { ...atAuditFirm(['vouching']), screen: 'stress' as const }
    const skipped = reducer(s, { type: 'skip', question: 'stress' })
    expect(skipped.skipped).toEqual(['stress'])
    expect(skipped.screen).toBe('tools')
    expect(reducer({ ...s, screen: 'tools' }, { type: 'skip', question: 'tools' })).toEqual({ ...s, screen: 'tools' })
  })

  it('returns to review after editing', () => {
    let s: SurveyState = run(
      [
        { type: 'toggleMulti', question: 'tools', id: 'excel' },
        { type: 'selectSingle', question: 'device', id: 'phone' },
        { type: 'selectSingle', question: 'buildFirst', id: 'find_errors' },
        { type: 'goto', screen: 'review' },
      ],
      atAuditFirm(['vouching']),
    )
    s = reducer(s, { type: 'edit', question: 'stress' })
    expect(s.screen).toBe('stress')
    s = reducer(s, { type: 'selectSingle', question: 'stress', id: 'deadlines' })
    s = reducer(s, { type: 'next' })
    expect(s.screen).toBe('review')
    expect(s.editing).toBe(false)
  })

  it('sends her to a newly incomplete required question after an edit', () => {
    let s: SurveyState = run(
      [
        { type: 'toggleMulti', question: 'tools', id: 'excel' },
        { type: 'selectSingle', question: 'device', id: 'phone' },
        { type: 'selectSingle', question: 'buildFirst', id: 'find_errors' },
        { type: 'toggleRank', id: 'vouching' },
        { type: 'toggleRank', id: 'sampling' },
      ],
      atAuditFirm(['vouching', 'sampling']),
    )
    s = reducer({ ...s, screen: 'review' }, { type: 'edit', question: 'workplace' })
    s = reducer(s, { type: 'selectSingle', question: 'workplace', id: 'bank_mfi' })
    s = reducer(s, { type: 'next' })
    expect(s.screen).toBe('tasks')
  })

  it('keeps answers when switching language', () => {
    const s = reducer(atAuditFirm(['vouching']), { type: 'setLang', lang: 'my' })
    expect(s.lang).toBe('my')
    expect(s.answers.tasks).toEqual(['vouching'])
  })

  it('limits the note to 300 characters', () => {
    const s = reducer(initialState(), { type: 'setNote', note: 'x'.repeat(400) })
    expect(s.answers.note).toHaveLength(300)
  })

  it('records the send time only once', () => {
    const s = reducer(initialState(), { type: 'markSent' })
    expect(s.screen).toBe('thanks')
    expect(reducer(s, { type: 'markSent' }).sentAt).toBe(s.sentAt)
  })
})
