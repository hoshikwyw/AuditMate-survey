import { describe, expect, it } from 'vitest'
import { NOTE_CHIPS, QUESTIONS, TASK_LISTS } from './survey'
import { UI } from './ui'
import type { Option, Text } from './types'

const filled = (text: Text) => text.en.trim() !== '' && text.my.trim() !== ''
const uniqueIds = (options: Option[]) => new Set(options.map((o) => o.id)).size === options.length

describe('survey config', () => {
  it('has 9 questions with unique ids', () => {
    expect(QUESTIONS).toHaveLength(9)
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(9)
  })

  it('has every question text in both languages', () => {
    for (const q of QUESTIONS) {
      expect(filled(q.title), q.id).toBe(true)
      if (q.helper) expect(filled(q.helper), q.id).toBe(true)
      for (const opt of q.options) expect(filled(opt.label), `${q.id}.${opt.id}`).toBe(true)
      expect(uniqueIds(q.options), q.id).toBe(true)
    }
  })

  it('has a task list for every workplace option, with unique ids and both languages', () => {
    const workplaces = QUESTIONS.find((q) => q.id === 'workplace')!.options.map((o) => o.id)
    expect(Object.keys(TASK_LISTS).sort()).toEqual([...workplaces].sort())
    for (const [workplace, list] of Object.entries(TASK_LISTS)) {
      expect(uniqueIds(list), workplace).toBe(true)
      for (const opt of list) expect(filled(opt.label), `${workplace}.${opt.id}`).toBe(true)
    }
  })

  it('has all UI text and note chips in both languages', () => {
    for (const [key, text] of Object.entries(UI)) expect(filled(text), key).toBe(true)
    for (const chip of NOTE_CHIPS) expect(filled(chip)).toBe(true)
  })
})
