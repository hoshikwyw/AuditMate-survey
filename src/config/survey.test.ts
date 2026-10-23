import { describe, expect, it } from 'vitest'
import { NON_RANKABLE_TASKS, NOTE_CHIPS, QUESTIONS } from './survey'
import { UI } from './ui'
import type { Option, Text } from './types'
import { MULTI_IDS, SINGLE_IDS } from '../survey/flow'

const filled = (text: Text) => text.en.trim() !== '' && text.my.trim() !== ''
const uniqueIds = (options: Option[]) => new Set(options.map((o) => o.id)).size === options.length

describe('survey config', () => {
  it('has 10 questions with unique ids', () => {
    expect(QUESTIONS).toHaveLength(10)
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(10)
  })

  it('lists every question exactly once as single or multi, matching its kind', () => {
    expect([...MULTI_IDS, ...SINGLE_IDS].sort()).toEqual(QUESTIONS.map((q) => q.id).sort())
    for (const q of QUESTIONS) expect(q.kind === 'single', q.id).toBe((SINGLE_IDS as string[]).includes(q.id))
  })

  it('has every question text in both languages', () => {
    for (const q of QUESTIONS) {
      expect(filled(q.title), q.id).toBe(true)
      if (q.helper) expect(filled(q.helper), q.id).toBe(true)
      for (const opt of q.options) expect(filled(opt.label), `${q.id}.${opt.id}`).toBe(true)
      expect(uniqueIds(q.options), q.id).toBe(true)
    }
  })

  it('only the ranking question has dynamic options', () => {
    for (const q of QUESTIONS) expect(q.options.length === 0, q.id).toBe(q.id === 'topTasks')
  })

  it('non-rankable tasks exist in the task list', () => {
    const taskIds = QUESTIONS.find((q) => q.id === 'tasks')!.options.map((o) => o.id)
    for (const id of NON_RANKABLE_TASKS) expect(taskIds).toContain(id)
  })

  it('has all UI text and note chips in both languages', () => {
    for (const [key, text] of Object.entries(UI)) expect(filled(text), key).toBe(true)
    for (const chip of NOTE_CHIPS) expect(filled(chip)).toBe(true)
  })
})
