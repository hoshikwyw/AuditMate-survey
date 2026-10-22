import { Heading } from '../components/Heading'
import { ScreenLayout } from '../components/ScreenLayout'
import { tr } from '../config/i18n'
import { UI } from '../config/ui'
import type { SurveyState } from '../survey/state'

export function ThanksScreen({ state }: { state: SurveyState }) {
  const { lang } = state
  return (
    <ScreenLayout>
      <div lang={lang} className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <span className="text-6xl" aria-hidden="true">
          💛
        </span>
        <Heading className="text-3xl">{tr(UI.thanksTitle, lang)}</Heading>
        <p className="max-w-xs text-lg leading-relaxed text-muted">{tr(UI.thanksMessage, lang)}</p>
      </div>
    </ScreenLayout>
  )
}
