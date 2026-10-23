import { describe, expect, it } from 'vitest'
import { validateSubmission } from './validate'
import type { SubmitPayload } from './validate'

const NOW = new Date('2026-10-22T10:05:00.000Z')

const valid = (): SubmitPayload => ({
  lang: 'my',
  responseId: 'abcdef12-3456-7890',
  startedAt: '2026-10-22T10:00:00.000Z',
  submittedAt: '2026-10-22T10:04:00.000Z',
  timeZone: 'Asia/Yangon',
  answers: {
    tasks: ['excel_vouchers', 'stock_count'],
    topTasks: ['stock_count', 'excel_vouchers'],
    voucherFormat: ['paper'],
    fileSize: undefined,
    problems: ['qty_mismatch', 'missing_voucher'],
    recordMethod: ['highlight'],
    frequency: 'daily',
    duration: '2_4h',
    device: 'laptop_and_phone',
    buildFirst: 'stock_compare',
    note: ' I want to go home on time. ',
  },
  skipped: ['fileSize'],
  consent: true,
  website: '',
})

const reject = (mutate: (p: SubmitPayload) => unknown) => {
  const p = valid()
  const result = validateSubmission(mutate(p) ?? p, NOW)
  return result.ok ? 'accepted' : result.error
}

describe('validateSubmission', () => {
  it('accepts a complete submission and returns a clean state', () => {
    const result = validateSubmission(valid(), NOW)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.state.answers.topTasks).toEqual(['stock_count', 'excel_vouchers'])
    expect(result.state.answers.note).toBe('I want to go home on time.')
    expect(result.timeZone).toBe('Asia/Yangon')
  })

  it('does not pass through unknown fields', () => {
    const p = { ...valid(), extra: '<script>', answers: { ...valid().answers, injected: 'x' } }
    const result = validateSubmission(p, NOW)
    expect(result.ok && JSON.stringify(result.state)).not.toContain('injected')
  })

  it('rejects bots that fill the honeypot', () => {
    expect(reject((p) => void (p.website = 'http://spam'))).toBe('honeypot')
  })

  it('rejects missing consent and malformed input', () => {
    expect(reject((p) => ({ ...p, consent: false }))).toBe('no consent')
    expect(reject(() => 'hello')).toBe('not an object')
    expect(reject((p) => ({ ...p, responseId: '../../etc' }))).toBe('bad responseId')
  })

  it('rejects options that are not in the survey', () => {
    expect(reject((p) => void (p.answers.tasks = ['excel_vouchers', 'hack']))).toBe('unknown tasks')
    expect(reject((p) => void (p.answers.device = 'toaster'))).toBe('bad device')
  })

  it('rejects ranking a task she did not pick, or too many picks', () => {
    expect(reject((p) => void (p.answers.topTasks = ['stock_count', 'reports']))).toBe('unknown topTasks')
    expect(reject((p) => void (p.answers.problems = ['qty_mismatch', 'duplicates', 'wrong_date', 'wrong_totals']))).toBe(
      'too many problems',
    )
  })

  it('rejects "Not sure" combined with other answers', () => {
    expect(reject((p) => void (p.answers.voucherFormat = ['paper', 'not_sure']))).toBe('exclusive voucherFormat')
  })

  it('rejects incomplete submissions and long notes', () => {
    expect(reject((p) => void (p.answers.device = undefined))).toBe('incomplete')
    expect(reject((p) => void (p.answers.topTasks = []))).toBe('incomplete')
    expect(reject((p) => void (p.answers.note = 'x'.repeat(301)))).toBe('bad note')
  })

  it('rejects timestamps far from now, and ignores a bad time zone', () => {
    expect(reject((p) => void (p.submittedAt = '2020-01-01T00:00:00Z'))).toBe('bad submittedAt')
    const result = validateSubmission({ ...valid(), timeZone: 'Mars/Olympus' }, NOW)
    expect(result.ok && result.timeZone).toBeUndefined()
  })
})
