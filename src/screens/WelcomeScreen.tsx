import { Button } from '../components/Button'
import { Heading } from '../components/Heading'
import { LanguageToggle } from '../components/LanguageToggle'
import { ScreenLayout } from '../components/ScreenLayout'
import { ArrowRightIcon } from '../components/icons'
import { tr } from '../config/i18n'
import { UI } from '../config/ui'
import type { Dispatch } from 'react'
import type { Action, SurveyState } from '../survey/state'

interface Props {
  state: SurveyState
  dispatch: Dispatch<Action>
}

export function WelcomeScreen({ state, dispatch }: Props) {
  const { lang } = state
  const hasDraft = state.startedAt !== undefined

  return (
    <ScreenLayout
      header={
        <div className="flex justify-end">
          <LanguageToggle lang={lang} onChange={(l) => dispatch({ type: 'setLang', lang: l })} />
        </div>
      }
      footer={
        <div className="flex flex-col gap-2">
          <Button fullWidth onClick={() => dispatch({ type: 'next' })}>
            {tr(hasDraft ? UI.resume : UI.start, lang)} <ArrowRightIcon />
          </Button>
          {hasDraft && (
            <Button variant="ghost" fullWidth onClick={() => dispatch({ type: 'reset' })}>
              {tr(UI.startOver, lang)}
            </Button>
          )}
        </div>
      }
    >
      <div lang={lang} className="flex flex-1 flex-col justify-center gap-5 pb-8">
        <span className="text-6xl" aria-hidden="true">
          💛
        </span>
        <Heading className="text-3xl">{tr(UI.welcomeTitle, lang)}</Heading>
        <p className="text-lg leading-relaxed text-muted">{tr(UI.welcomeSubtitle, lang)}</p>
      </div>
    </ScreenLayout>
  )
}
