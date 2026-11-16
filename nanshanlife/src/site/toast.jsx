// toast：不移動焦點的訊息（「已加入收藏」「報名成功…」「訂閱成功」）。A、B 兩版共用。
//
// 兩版外觀相同（class 複製自 coseeing-ui/src/components/Toast/Toast.tsx），差別只有一個屬性：
// - A 版（announce）：外層容器是一直存在的 role="status"，toast 出現時 NVDA 會主動念出
// - B 版：外層容器沒有任何 live region 語意，toast 出現時 NVDA 什麼都不念
//
// 不直接用 DS 的 Toast：它把 role="status" 放在 toast 本身，「連同 role 一起動態插入」的
// live region 不一定念得出來，也沒辦法做出拿掉語意的 B 版。

import { useCallback, useEffect, useRef, useState } from 'react'

/** toast 停留的時間。兩版相同，避免停留時間成為干擾因素（教材：5 秒以上）。 */
const TOAST_DURATION = 6000

/**
 * 稍微延後再顯示：toast 常跟著「對話框關閉、焦點回到按鈕」一起發生，
 * 等 NVDA 開始念焦點之後再插入訊息，訊息才會排在後面念出來，而不是被焦點的報讀打斷。
 */
const TOAST_DELAY = 200

/** 回傳 [toast, showToast]。showToast(文字) 會顯示 toast，並在一段時間後自動消失。 */
export function useToast() {
  const [toast, setToast] = useState(null)
  const timers = useRef([])
  const count = useRef(0)

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  useEffect(() => clearTimers, [])

  const showToast = useCallback((text) => {
    clearTimers()
    setToast(null)
    timers.current.push(
      setTimeout(() => {
        count.current += 1
        setToast({ id: count.current, text })
        timers.current.push(setTimeout(() => setToast(null), TOAST_DURATION))
      }, TOAST_DELAY),
    )
  }, [])

  return [toast, showToast]
}

/** 放在頁面最後。announce：toast 出現時要不要讓螢幕閱讀器念出（A 版 true，B 版 false）。 */
export function ToastHost({ toast, announce }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-16"
      {...(announce ? { role: 'status' } : {})}
    >
      {toast ? (
        <div
          key={toast.id}
          className="pointer-events-auto flex w-full max-w-[40rem] items-start gap-12 rounded-[1.2rem] bg-teal-PRIMARY px-20 py-16 shadow-[0_0.8rem_2.4rem_rgb(16_36_42_/_0.24)]"
        >
          <span aria-hidden="true" className="mt-6 size-8 shrink-0 rounded-full bg-green-300" />
          <p className="typography-strong1 m-0 text-bg-light-off-white">{toast.text}</p>
        </div>
      ) : null}
    </div>
  )
}
