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

const KEY = 'auditmate-survey:v2'

describe('storage', () => {
  beforeEach(() => memory.clear())

  it('round-trips a draft', () => {
    const state = { ...initialState('my'), screen: 'voucherFormat' as const }
    saveState(state)
    expect(loadState()).toEqual(state)
  })

  it('ignores broken data and drafts from the old survey version', () => {
    memory.set(KEY, '{not json')
    expect(loadState()).toBeNull()
    memory.clear()
    memory.set('auditmate-survey:v1', JSON.stringify({ ...initialState(), screen: 'workplace' }))
    expect(loadState()).toBeNull()
  })

  it('drops answers and screens that no longer exist in the config', () => {
    memory.set(
      KEY,
      JSON.stringify({ ...initialState(), screen: 'someRemovedQuestion', answers: { tasks: ['stock_count', 'removed_task'] } }),
    )
    const state = loadState()!
    expect(state.answers.tasks).toEqual(['stock_count'])
    expect(state.answers.problems).toEqual([])
    expect(state.screen).toBe('welcome')
  })
})
