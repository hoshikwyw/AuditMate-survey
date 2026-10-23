// Saves the draft in this browser so a refresh or closed tab doesn't lose her answers.
// Storage can be unavailable (private mode, blocked site data), so every call is guarded.

import { reconcile, visibleQuestions } from './flow'
import type { Screen } from './flow'
import { initialState } from './state'
import type { SurveyState } from './state'

// v2 = voucher / warehouse survey. Drafts from v1 (audit-role survey) are simply ignored.
const STORAGE_KEY = 'auditmate-survey:v2'

export function loadState(): SurveyState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<SurveyState>
    if (!parsed || typeof parsed !== 'object' || !parsed.answers || !parsed.responseId) return null
    // Merge over defaults and drop answers that no longer exist, in case the survey config changed since.
    const restored = { ...initialState(), ...parsed, answers: reconcile(parsed.answers) }
    const validScreens: Screen[] = ['welcome', 'review', 'thanks', ...visibleQuestions(restored.answers).map((q) => q.id)]
    if (!validScreens.includes(restored.screen)) restored.screen = 'welcome'
    return restored
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
