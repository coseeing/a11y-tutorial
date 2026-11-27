import Page from '../pages/practice/RemindersPracticePage.jsx'
import { PracticeLayout } from '../pages/practice/PracticeLayout.jsx'
import { mount } from '../site/mount.jsx'

export default function PracticePage() {
  return <PracticeLayout><Page variant="a" /></PracticeLayout>
}

mount(PracticePage)
