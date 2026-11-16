// ⚠️ B 版專用：刻意做壞的「日期欄位＋日曆」。不要修好它。
//
// 外觀與 A 版的 DateField 完全相同（共用 site/CalendarShell.jsx 的版面），但：
//   - 欄位：畫面上的標籤文字沒有和輸入框關聯，只剩 placeholder → NVDA 只念「編輯區」，
//     一輸入提示就消失；沒有「必要的」；沒有展開／收合狀態
//   - 日曆按鈕：念得出「選擇日期 按鈕」，但沒有 aria-haspopup → 不知道按下去會跳出東西
//   - 開啟日曆：焦點留在按鈕上；日曆沒有對話框角色與名稱 → NVDA 什麼都沒念
//   - 日期格：方向鍵沒有作用，每一格都要按 Tab 才到得了；每格只念數字，不知道是星期幾
//   - Tab 會從日曆跑到背景頁面；Esc 沒有作用
//   - 關閉後（選日期、取消、確定）焦點跳回頁首
//   - 出錯時只有紅框，沒有文字，也沒有「無效的輸入」
//
// 對應教材 B3：情境 2、3、4、5、6。
//
// 刻意「修好一半」：日期格加了 tabindex 與 Enter／空白鍵處理，用鍵盤選得到日期。
// 不然學員只會發現「鍵盤完全不能用」，體會不到「一格一格跳、只念數字」的困擾。

import { Input } from '@coseeing/ui'
import { useEffect, useRef, useState } from 'react'
import { CalendarShell, DateFieldFrame, dayClass, FieldLabel } from '../site/CalendarShell.jsx'
import { addMonths, DATE_PLACEHOLDER, formatDate, parseDate, sameDay, today } from '../site/calendar.js'
import { inputInvalidLook } from '../site/styles.js'

/** 問題：關閉日曆後，焦點沒有回到欄位，而是跳回頁面最上方的網站名稱。 */
function jumpToPageTop() {
  window.scrollTo(0, 0)
  document.querySelector('[data-page-top]')?.focus()
}

export function FakeDateField({ id, label, required, value, onChange, error }) {
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(today)
  const wrapRef = useRef(null)

  const selected = parseDate(value)

  // 用滑鼠點日曆以外的地方時關閉（與 A 版相同）
  useEffect(() => {
    if (!open) return undefined
    const onMouseDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  const close = (pickedDate) => {
    if (pickedDate) onChange(formatDate(pickedDate))
    setOpen(false)
    jumpToPageTop()
  }

  return (
    <DateFieldFrame
      wrapRef={wrapRef}
      // 問題：<label> 沒有 htmlFor，沒有和輸入框關聯
      label={<FieldLabel required={required}>{label}</FieldLabel>}
      input={
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={DATE_PLACEHOLDER}
          autoComplete="off"
          // 問題：出錯時只有紅框（沒有 aria-invalid，也沒有錯誤文字）
          className={error ? inputInvalidLook : undefined}
        />
      }
      buttonProps={{
        'aria-label': '選擇日期',
        // 問題：開啟後焦點留在按鈕上
        onClick: () => {
          setMonth(selected ?? today())
          setOpen((v) => !v)
        },
      }}
      popup={
        open ? (
          <CalendarShell
            month={month}
            onPrevMonth={() => setMonth(addMonths(month, -1))}
            onNextMonth={() => setMonth(addMonths(month, 1))}
            renderDay={(date) => (
              <div
                key={date.getDate()}
                // 問題：每一格都在 Tab 順序中，沒有方向鍵操作；沒有角色，名稱只有數字
                tabIndex={0}
                onClick={() => close(date)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    close(date)
                  }
                }}
                className={dayClass({ selected: sameDay(date, selected), isToday: sameDay(date, today()) })}
              >
                {date.getDate()}
              </div>
            )}
            onCancel={() => close()}
            // 每一格都要 Tab 經過，沒有「目前所在的日期」可言，「確定」只會關閉日曆
            onConfirm={() => close()}
          />
        ) : null
      }
    />
  )
}
