// ⚠️ B 版專用：刻意做壞的「對話框」。不要修好它。
//
// 外觀與 DS Dialog 完全相同（class 複製自 coseeing-ui/src/components/Dialog/Dialog.tsx），
// 但只是蓋在畫面上的 <div>：
//   - 沒有 dialog 角色與名稱 → 跳出來時 NVDA 什麼都不念
//   - 開啟時焦點留在原本的按鈕上
//   - 放在頁面的最後，背景頁面也沒有被擋住 → 按 Tab 要先經過頁面其他內容才到得了
//
// 對應教材 B2 情境 3：「畫面跳出對話框，但焦點還在按鈕上」。
//
// 以下三件事刻意和 A 版一樣做對（教材 B2：對話框的鍵盤操作留到 B3 再談）：
// 焦點進到對話框之後，Tab 只在對話框內循環；Esc 可以關閉；關閉後焦點回到原本的按鈕。

import { PlusIcon } from '@coseeing/ui'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export function FakeDialog({ open, onClose, title, children, actions }) {
  const panelRef = useRef(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!open) return undefined
    // 開啟時焦點還在觸發的按鈕上（問題所在），記下來，關閉時把焦點放回去
    const trigger = document.activeElement
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      trigger?.focus?.()
    }
  }, [open])

  if (!open) return null

  const onPanelKeyDown = (e) => {
    if (e.key !== 'Tab') return
    const stops = [...panelRef.current.querySelectorAll('button, a[href], input')]
    const first = stops[0]
    const last = stops[stops.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  // 放到 <body> 的最後：頁面所有內容之後
  return createPortal(
    <div
      // z-[60]：和 A 版的原生 <dialog> 一樣蓋在 toast（z-50）上面
      className="fixed inset-0 z-[60] flex items-center justify-center bg-teal-700/60 backdrop-blur-[0.3rem]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        onKeyDown={onPanelKeyDown}
        className="w-[calc(100vw-4rem)] max-w-[44rem] rounded-24 bg-neutral-white shadow-[0_1.6rem_4rem_rgb(16_36_42_/_0.25)]"
      >
        <div className="relative overflow-hidden rounded-24 p-24 tablet:p-32">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-orange-PRIMARY" />
          <div className="flex items-start justify-between gap-16">
            <h2 className="typography-headline4 m-0 text-teal-700">{title}</h2>
            <button
              type="button"
              aria-label="關閉"
              onClick={onClose}
              className="flex size-32 shrink-0 cursor-pointer items-center justify-center rounded-8 border-0 bg-transparent p-0 text-teal-700 transition-colors hover:bg-bg-light-beige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
            >
              <PlusIcon className="rotate-45" />
            </button>
          </div>
          {children ? <div className="mt-16">{children}</div> : null}
          {actions ? <div className="mt-24 flex flex-wrap justify-end gap-12">{actions}</div> : null}
        </div>
      </div>
    </div>,
    document.body,
  )
}
