import { describe, expect, it } from 'vitest'
import { buildExport, buildMessage } from './export'
import { initialState, reducer } from './state'
import type { Action } from './state'

const finished = () =>
  (
    [
      { type: 'setLang', lang: 'my' },
      { type: 'selectSingle', question: 'workplace', id: 'bank_mfi' },
      { type: 'toggleMulti', question: 'tasks', id: 'loan_files' },
      { type: 'toggleMulti', question: 'tasks', id: 'kyc' },
      { type: 'toggleRank', id: 'kyc' },
      { type: 'toggleRank', id: 'loan_files' },
      { type: 'skip', question: 'stress' },
      { type: 'toggleMulti', question: 'tools', id: 'excel' },
      { type: 'selectSingle', question: 'frequency', id: 'daily' },
      { type: 'selectSingle', question: 'duration', id: '1_2h' },
      { type: 'selectSingle', question: 'device', id: 'own_laptop' },
      { type: 'selectSingle', question: 'buildFirst', id: 'find_errors' },
      { type: 'setNote', note: 'အချိန်မီ အိမ်ပြန်ချင်တယ်။' },
    ] as Action[]
  ).reduce(reducer, { ...initialState(), responseId: 'abcdef12-3456', startedAt: '2026-10-22T10:00:00.000Z' })

describe('buildMessage', () => {
  const message = buildMessage(finished(), new Date('2026-10-22T10:03:00.000Z'), 'Asia/Yangon')

  it('has a header with id, her local time, language and duration', () => {
    // 10:03 UTC = 16:33 in Myanmar (UTC+6:30)
    expect(message).toContain('ID abcdef12 · 2026-10-22 16:33 · in Myanmar · 3 min')
  })

  it('uses English labels, ranked order and the #1 task in titles', () => {
    expect(message).toContain('   #1 KYC — checking customer documents\n   #2 Loan file reviews')
    expect(message).toContain('How often do you do "KYC — checking customer documents"?\n   • Almost every working day')
  })

  it('marks skipped questions and keeps her note as written', () => {
    expect(message).toContain('When do you feel most stressed at work?\n   (skipped)')
    expect(message).toContain('Note: "အချိန်မီ အိမ်ပြန်ချင်တယ်။"')
  })
})

describe('buildExport', () => {
  it('includes raw ids, readable labels and skipped questions', () => {
    const data = buildExport(finished(), new Date('2026-10-22T10:03:00.000Z'))
    expect(data.responseId).toBe('abcdef12-3456')
    expect(data.language).toBe('my')
    expect(data.answers.topTasks).toEqual(['kyc', 'loan_files'])
    expect(data.readable.workplace).toEqual(['Internal audit at a bank or microfinance'])
    expect(data.skipped).toEqual(['stress'])
  })
})
