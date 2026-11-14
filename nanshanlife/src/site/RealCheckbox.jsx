import { Checkbox } from '@coseeing/ui'
import { useId } from 'react'

/** A 版用：DS Checkbox，包成和 FakeCheckbox 相同的介面。 */
export function RealCheckbox({ checked, onChange, label }) {
  const id = useId()
  return (
    <Checkbox
      id={id}
      label={label}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  )
}
