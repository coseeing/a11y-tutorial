import { useLayoutEffect, useRef } from 'react'
import { Table } from '@coseeing/ui'

// Reuse the shared table's visual structure. The exercise needs row headers,
// which its current public API cannot express, and deliberately missing scope in B.
export function PracticeScheduleTable({ columns, rows, variant }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const table = ref.current.querySelector('table')
    const original = table.innerHTML
    for (const row of table.querySelectorAll('tbody tr')) {
      const cell = row.firstElementChild
      const header = document.createElement('th')
      for (const attr of cell.attributes) header.setAttribute(attr.name, attr.value)
      header.innerHTML = cell.innerHTML
      row.replaceChild(header, cell)
    }
    for (const header of table.querySelectorAll('th')) {
      if (variant === 'a') header.setAttribute('scope', header.closest('thead') ? 'col' : 'row')
      else header.removeAttribute('scope')
    }
    return () => { table.innerHTML = original }
  }, [variant, columns, rows])
  return <div id="practice-morning-table" ref={ref}><Table columns={columns} rows={rows} /></div>
}
