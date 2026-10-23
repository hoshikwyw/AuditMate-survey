import { describe, expect, it } from 'vitest'
import { buildExport, buildMessage } from './export'
import { initialState, reducer } from './state'
import type { Action } from './state'

const finished = () =>
  (
    [
      { type: 'setLang', lang: 'my' },
      { type: 'toggleMulti', question: 'tasks', id: 'excel_vouchers' },
      { type: 'toggleMulti', question: 'tasks', id: 'stock_count' },
      { type: 'toggleRank', id: 'stock_count' },
      { type: 'toggleRank', id: 'excel_vouchers' },
      { type: 'toggleMulti', question: 'voucherFormat', id: 'paper' },
      { type: 'skip', question: 'fileSize' },
      { type: 'toggleMulti', question: 'problems', id: 'qty_mismatch' },
      { type: 'toggleMulti', question: 'problems', id: 'missing_voucher' },
      { type: 'toggleMulti', question: 'recordMethod', id: 'highlight' },
      { type: 'selectSingle', question: 'frequency', id: 'daily' },
      { type: 'selectSingle', question: 'duration', id: '2_4h' },
      { type: 'selectSingle', question: 'device', id: 'laptop_and_phone' },
      { type: 'selectSingle', question: 'buildFirst', id: 'stock_compare' },
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
    expect(message).toContain('   #1 Counting warehouse stock and comparing with records\n   #2 Checking Excel records against vouchers')
    expect(message).toContain('How often do you do "Counting warehouse stock and comparing with records"?\n   • Almost every working day')
  })

  it('marks skipped questions and keeps her note as written', () => {
    expect(message).toContain('How many rows does a typical Excel file have?\n   (skipped)')
    expect(message).toContain('Note: "အချိန်မီ အိမ်ပြန်ချင်တယ်။"')
  })
})

describe('buildExport', () => {
  it('includes raw ids, readable labels and skipped questions', () => {
    const data = buildExport(finished(), new Date('2026-10-22T10:03:00.000Z'))
    expect(data.responseId).toBe('abcdef12-3456')
    expect(data.language).toBe('my')
    expect(data.answers.topTasks).toEqual(['stock_count', 'excel_vouchers'])
    expect(data.readable.problems).toEqual(["Quantity doesn't match", 'A row has no voucher (or a voucher has no row)'])
    expect(data.skipped).toEqual(['fileSize'])
  })
})
