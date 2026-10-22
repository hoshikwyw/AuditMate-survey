import { useRef, useState } from 'react'
import type { Dispatch } from 'react'
import { copyText, downloadJson, shareText } from '../lib/share'
import { buildExport, buildMessage } from './export'
import type { Action, SurveyState } from './state'

export type SendStatus =
  | 'idle'
  | 'sending'
  /** No share sheet on this device: the message was copied so she can paste it. */
  | 'pasteNow'
  | 'failed'

/** Send / copy / save actions shared by the review and thank-you screens. */
export function useSend(state: SurveyState, dispatch: Dispatch<Action>) {
  const [status, setStatus] = useState<SendStatus>('idle')
  const [copied, setCopied] = useState(false)
  const busy = useRef(false)

  const send = async () => {
    if (busy.current) return // ignore repeat taps while the share sheet is open
    busy.current = true
    setStatus('sending')
    try {
      const result = await shareText('AuditMate survey', buildMessage(state))
      if (result === 'shared') {
        dispatch({ type: 'markSent' })
        setStatus('idle')
      } else if (result === 'cancelled') {
        setStatus('idle')
      } else if (result === 'unsupported') {
        setStatus((await copyText(buildMessage(state))) ? 'pasteNow' : 'failed')
      } else {
        setStatus('failed')
      }
    } finally {
      busy.current = false
    }
  }

  const copy = async () => {
    const ok = await copyText(buildMessage(state))
    setCopied(ok)
    if (ok) setTimeout(() => setCopied(false), 2500)
    return ok
  }

  const saveFile = () => {
    downloadJson(`auditmate-survey-${state.responseId.slice(0, 8)}.json`, buildExport(state))
  }

  /** She pasted the copied message herself. */
  const confirmPasted = () => {
    dispatch({ type: 'markSent' })
    setStatus('idle')
  }

  return { status, copied, send, copy, saveFile, confirmPasted }
}
