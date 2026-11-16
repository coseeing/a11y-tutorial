// 預約試聽頁 A 版（良好）。對照表見 docs/design.md 4.7。

import { DateField } from '../../site/DateField.jsx'
import { RadioGroup } from '../../site/FormField.jsx'
import { TrialPage } from './TrialParts.jsx'

export default function TrialA() {
  return <TrialPage nameLabelled exposeRequired exposeError DateFieldComponent={DateField} GroupComponent={RadioGroup} />
}
