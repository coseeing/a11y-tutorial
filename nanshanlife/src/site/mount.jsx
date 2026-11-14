import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'

/** 每個頁面入口都呼叫這個函式，把頁面元件掛到 #root。 */
export function mount(Page) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Page />
    </StrictMode>,
  )
}
