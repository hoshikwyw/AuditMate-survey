import type { Dispatch } from 'react'
import { Button } from '../components/Button'
import { Heading } from '../components/Heading'
import { ScreenLayout } from '../components/ScreenLayout'
import { tr } from '../config/i18n'
import { UI } from '../config/ui'
import type { Action, SurveyState } from '../survey/state'
import { useSend } from '../survey/useSend'

export function ThanksScreen({ state, dispatch }: { state: SurveyState; dispatch: Dispatch<Action> }) {
  const { lang } = state
  const { copied, copy, saveFile } = useSend(state, dispatch)

  return (
    <ScreenLayout>
      <div lang={lang} className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <span className="text-6xl" aria-hidden="true">
          💛
        </span>
        <Heading className="text-3xl">{tr(UI.thanksTitle, lang)}</Heading>
        <p className="max-w-xs text-lg leading-relaxed text-muted">{tr(UI.thanksMessage, lang)}</p>
      </div>

      <div lang={lang} className="flex flex-col items-center gap-2 pb-4 text-center">
        <p className="text-sm text-muted">{tr(UI.thanksBackup, lang)}</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button variant="secondary" onClick={copy}>
            {tr(copied ? UI.copied : UI.copy, lang)}
          </Button>
          <Button variant="ghost" onClick={saveFile}>
            {tr(UI.exportJson, lang)}
          </Button>
        </div>
      </div>
    </ScreenLayout>
  )
}
