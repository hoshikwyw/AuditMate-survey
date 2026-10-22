import { beforeEach, describe, expect, it } from 'vitest'
import { loadState, saveState } from './storage'
import { initialState } from './state'

// Minimal in-memory localStorage for the Node test environment.
const memory = new Map<string, string>()
globalThis.localStorage = {
  getItem: (k: string) => memory.get(k) ?? null,
  setItem: (k: string, v: string) => void memory.set(k, v),
  removeItem: (k: string) => void memory.delete(k),
  clear: () => memory.clear(),
  key: () => null,
  length: 0,
} as Storage

describe('storage', () => {
  beforeEach(() => memory.clear())

  it('round-trips a draft', () => {
    const state = { ...initialState('my'), screen: 'tools' as const }
    saveState(state)
    expect(loadState()).toEqual(state)
  })

  it('ignores broken data', () => {
    memory.set('auditmate-survey:v1', '{not json')
    expect(loadState()).toBeNull()
  })

  it('drops answers and screens that no longer exist in the config', () => {
    memory.set(
      'auditmate-survey:v1',
      JSON.stringify({
        ...initialState(),
        screen: 'someRemovedQuestion',
        answers: { workplace: 'audit_firm', tasks: ['vouching', 'removed_task'], topTasks: [], tools: [] },
      }),
    )
    const state = loadState()!
    expect(state.answers.tasks).toEqual(['vouching'])
    expect(state.answers.note).toBe('')
    expect(state.screen).toBe('welcome')
  })
})
