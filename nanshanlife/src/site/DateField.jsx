// A 版（良好）的日期欄位：輸入框＋日曆按鈕＋日曆對話框。
// 作法參考 APG 的 Date Picker Combobox、Date Picker Dialog 範例。對照表見 docs/design.md 4.8。
//
// - 欄位：有關聯的標籤、必要的（aria-required）、格式提示（aria-describedby）、
//   role="combobox"＋aria-haspopup="dialog"＋aria-expanded（日曆開著時為已展開）
// - 日曆按鈕：名稱「選擇日期」，aria-haspopup="dialog"（按之前就知道會跳出對話框）
// - 日曆對話框：開啟時焦點移到已選的日期（未選時為今天）；方向鍵移動一天、一週；
//   每格的名稱是完整日期與星期；Tab 只在對話框內循環；Esc 關閉；關閉後焦點回到欄位

import { Input } from '@coseeing/ui'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { CalendarShell, DateFieldFrame, dayClass, FieldError, FieldLabel } from './CalendarShell.jsx'
import {
  addDays,
  addMonths,
  DATE_HINT,
  DATE_PLACEHOLDER,
  dayLabel,
  formatDate,
  parseDate,
  sameDay,
  today,
} from './calendar.js'

export function DateField({ id, label, required, value, onChange, error }) {
  const [open, setOpen] = useState(false)
  // 日曆上「目前所在」的日期：唯一在 Tab 順序中的日期格（roving tabindex）
  const [active, setActive] = useState(today)
  const wrapRef = useRef(null)
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  // 只有開啟日曆、用鍵盤移動日期時才把焦點移到日期格；按「上個月」「下個月」時焦點留在按鈕上
  const focusActive = useRef(false)

  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const dialogId = `${id}-calendar`
  const selected = parseDate(value)

  useEffect(() => {
    if (open && focusActive.current) {
      focusActive.current = false
      dialogRef.current?.querySelector('[data-active]')?.focus()
    }
  }, [open, active])

  // 用滑鼠點日曆以外的地方時關閉（焦點跟著滑鼠走，不另外移動）
  useEffect(() => {
    if (!open) return undefined
    const onMouseDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  const openCalendar = () => {
    focusActive.current = true
    setActive(selected ?? today())
    setOpen(true)
  }

  // 關閉後焦點回到欄位。先讓畫面更新（欄位已填入日期、狀態變回已收合）再移動焦點，
  // 螢幕閱讀器念到的才是最新的內容。
  const close = (pickedDate) => {
    flushSync(() => {
      if (pickedDate) onChange(formatDate(pickedDate))
      setOpen(false)
    })
    inputRef.current?.focus()
  }

  const moveTo = (date) => {
    focusActive.current = true
    setActive(date)
  }

  const onGridKeyDown = (e) => {
    const moves = {
      ArrowLeft: () => addDays(active, -1),
      ArrowRight: () => addDays(active, 1),
      ArrowUp: () => addDays(active, -7),
      ArrowDown: () => addDays(active, 7),
      Home: () => addDays(active, -active.getDay()),
      End: () => addDays(active, 6 - active.getDay()),
      PageUp: () => addMonths(active, -1),
      PageDown: () => addMonths(active, 1),
    }
    if (moves[e.key]) {
      e.preventDefault()
      moveTo(moves[e.key]())
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      close(active)
    }
  }

  const onDialogKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
      return
    }
    if (e.key !== 'Tab') return
    // Tab 只在對話框內循環：上個月、下個月、日曆（目前所在的日期）、取消、確定
    const stops = [...dialogRef.current.querySelectorAll('button, [tabindex="0"]')]
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

  const describedBy = [hintId, error ? errorId : null].filter(Boolean).join(' ')

  return (
    <DateFieldFrame
      wrapRef={wrapRef}
      label={
        <FieldLabel htmlFor={id} required={required}>
          {label}
        </FieldLabel>
      }
      input={
        <Input
          ref={inputRef}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            // 在欄位上按下鍵也能開啟日曆（APG Date Picker Combobox）
            if (e.key === 'ArrowDown' && !open) {
              e.preventDefault()
              openCalendar()
            }
          }}
          placeholder={DATE_PLACEHOLDER}
          autoComplete="off"
          invalid={Boolean(error)}
          role="combobox"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? dialogId : undefined}
          aria-required={required || undefined}
          aria-describedby={describedBy}
        />
      }
      buttonProps={{
        'aria-label': '選擇日期',
        'aria-haspopup': 'dialog',
        onClick: () => (open ? close() : openCalendar()),
      }}
      popup={
        open ? (
          <CalendarShell
            rootRef={dialogRef}
            rootProps={{
              id: dialogId,
              role: 'dialog',
              'aria-modal': true,
              'aria-label': '選擇日期',
              onKeyDown: onDialogKeyDown,
            }}
            month={active}
            // 按「上個月」「下個月」時念出新的月份
            titleProps={{ 'aria-live': 'polite' }}
            onPrevMonth={() => setActive(addMonths(active, -1))}
            onNextMonth={() => setActive(addMonths(active, 1))}
            gridProps={{ role: 'grid', 'aria-label': '日期', onKeyDown: onGridKeyDown }}
            // 每個日期格的名稱已經包含星期，星期列對輔助科技隱藏，避免重複念
            weekdayRowProps={{ 'aria-hidden': true }}
            rowProps={{ role: 'row' }}
            emptyCellProps={{ role: 'gridcell' }}
            renderDay={(date) => {
              const isActive = sameDay(date, active)
              const isSelected = sameDay(date, selected)
              return (
                <div
                  key={date.getDate()}
                  role="gridcell"
                  tabIndex={isActive ? 0 : -1}
                  data-active={isActive ? '' : undefined}
                  aria-label={dayLabel(date)}
                  aria-selected={isSelected || undefined}
                  aria-current={sameDay(date, today()) ? 'date' : undefined}
                  onClick={() => close(date)}
                  className={dayClass({ selected: isSelected, isToday: sameDay(date, today()) })}
                >
                  {date.getDate()}
                </div>
              )
            }}
            onCancel={() => close()}
            onConfirm={() => close(active)}
          />
        ) : null
      }
    >
      {/* 格式提示：畫面不顯示，由 aria-describedby 提供給輔助科技。 */}
      <span id={hintId} hidden>
        {DATE_HINT}
      </span>
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </DateFieldFrame>
  )
}
