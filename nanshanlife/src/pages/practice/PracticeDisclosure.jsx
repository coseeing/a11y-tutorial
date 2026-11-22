import { useId, useState } from 'react'
import { DisclosureButton } from '../../site/DisclosureButton.jsx'

export function PracticeDisclosure({ label, children }) {
  const id = useId()
  const [expanded, setExpanded] = useState(false)
  return (
    <div>
      <DisclosureButton
        text={label}
        expanded={expanded}
        onToggle={() => setExpanded((value) => !value)}
        a11yProps={{ 'aria-expanded': expanded, 'aria-controls': id }}
      />
      <div id={id} hidden={!expanded} className="typography-body1 px-12 py-12 text-teal-700">
        {children}
      </div>
    </div>
  )
}
