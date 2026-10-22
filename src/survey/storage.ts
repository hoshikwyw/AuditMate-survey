// Saves the draft in this browser so a refresh or closed tab doesn't lose her answers.
// Storage can be unavailable (private mode, blocked site data), so every call is guarded.

import type { SurveyState } from './state'

const STORAGE_KEY = 'auditmate-survey:v1'

export function loadState(): SurveyState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<SurveyState>
    if (!parsed || typeof parsed !== 'object' || !parsed.answers || !parsed.responseId) return null
    return parsed as SurveyState
  } catch {
    return null
  }
}

export function saveState(state: SurveyState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Not fatal: the survey still works, it just won't survive a refresh.
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
