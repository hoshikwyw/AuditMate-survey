import { useRef, useState } from 'react'
import type { Dispatch } from 'react'
import { copyText, downloadJson } from '../lib/fallback'
import { submitAnswers } from '../lib/submit'
import { buildExport, buildMessage } from './export'
import type { Action, SurveyState } from './state'

export type SendStatus = 'idle' | 'sending' | 'failed'

/** One-tap silent send, plus copy / save backups if it fails. */
export function useSend(state: SurveyState, dispatch: Dispatch<Action>) {
  const [status, setStatus] = useState<SendStatus>('idle')
  const [copied, setCopied] = useState(false)
  const busy = useRef(false)
  // Fixed on the first attempt so retries send an identical payload (the server dedupes on it).
  const submittedAt = useRef<string | undefined>(undefined)

  const send = async () => {
    if (busy.current) return // ignore repeat taps while sending
    busy.current = true
    setStatus('sending')
    submittedAt.current ??= new Date().toISOString()
    const ok = await submitAnswers({
      lang: state.lang,
      responseId: state.responseId,
      startedAt: state.startedAt,
      submittedAt: submittedAt.current,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      answers: state.answers,
      skipped: state.skipped,
      consent: true,
      website: (document.getElementById('website') as HTMLInputElement | null)?.value ?? '',
    })
    busy.current = false
    if (ok) {
      dispatch({ type: 'markSent' })
      setStatus('idle')
    } else {
      setStatus('failed')
    }
  }

  const copy = async () => {
    const ok = await copyText(buildMessage(state))
    setCopied(ok)
    if (ok) setTimeout(() => setCopied(false), 2500)
  }

  const saveFile = () => {
    downloadJson(`auditmate-survey-${state.responseId.slice(0, 8)}.json`, buildExport(state))
  }

  return { status, copied, send, copy, saveFile }
}
