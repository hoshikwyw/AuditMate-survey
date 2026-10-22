import { useEffect, useReducer } from 'react'
import { initialState, reducer } from './state'
import { loadState, saveState } from './storage'

/** Survey state that restores the saved draft on load and saves on every change. */
export function useSurvey() {
  const [state, dispatch] = useReducer(reducer, undefined, () => loadState() ?? initialState())

  useEffect(() => {
    saveState(state)
  }, [state])

  return [state, dispatch] as const
}
