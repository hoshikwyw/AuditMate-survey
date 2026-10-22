import { useDocumentLang } from './hooks/useDocumentLang'
import { QuestionScreen } from './screens/QuestionScreen'
import { ReviewScreen } from './screens/ReviewScreen'
import { ThanksScreen } from './screens/ThanksScreen'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { isQuestionScreen } from './survey/flow'
import { useSurvey } from './survey/useSurvey'

export default function App() {
  const [state, dispatch] = useSurvey()
  useDocumentLang(state.lang)
  const { screen } = state

  if (screen === 'welcome') return <WelcomeScreen state={state} dispatch={dispatch} />
  if (screen === 'review') return <ReviewScreen state={state} dispatch={dispatch} />
  if (screen === 'thanks') return <ThanksScreen state={state} dispatch={dispatch} />
  if (isQuestionScreen(screen)) return <QuestionScreen key={screen} id={screen} state={state} dispatch={dispatch} />
  return null
}
