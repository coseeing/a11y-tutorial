// 日期欄位與日曆的「外觀」。A 版（site/DateField.jsx）與 B 版（lookalikes/FakeDateField.jsx）
// 都用這裡的版面與 class，所以兩版看起來完全相同；
// 角色、名稱、狀態與鍵盤操作由兩版各自傳入（rootProps、gridProps、renderDay…）。

import { Button, ChevronDownIcon } from '@coseeing/ui'
import { CalendarIcon } from './icons.jsx'
import { iconButton } from './styles.js'
import { monthTitle, monthWeeks, WEEKDAYS } from './calendar.js'

/** 標籤文字＋必填的紅色星號。星號只是視覺提示（aria-hidden），必填要另外標示才念得出來。 */
export function FieldLabel({ required, children, ...props }) {
  return (
    <label className="typography-strong2 block text-teal-700" {...props}>
      {children}
      {required ? (
        <span aria-hidden="true" className="text-red-600">
          {' '}
          *
        </span>
      ) : null}
    </label>
  )
}

/** 錯誤訊息文字（A 版才顯示；B 版只有紅框）。 */
export function FieldError({ id, children }) {
  return (
    <p id={id} className="typography-body2 m-0 text-red-600">
      {children}
    </p>
  )
}

/**
 * 日期欄位的版面：標籤、輸入框、日曆按鈕、（開啟時）日曆、其他附加內容。
 * - label：FieldLabel 元素
 * - input：輸入框元素
 * - buttonProps：日曆圖示按鈕的屬性（名稱、aria-haspopup、onClick…）
 * - popup：開啟時的日曆（CalendarShell），沒有開啟時為 null
 * - children：欄位下方的內容（A 版的隱藏提示、錯誤訊息）
 */
export function DateFieldFrame({ wrapRef, label, input, buttonProps, popup, children }) {
  return (
    <div className="grid gap-8">
      {label}
      <div ref={wrapRef} className="relative flex items-center gap-8">
        {input}
        <button type="button" className={`${iconButton} ring-1 ring-inset ring-bg-warm-gray`} {...buttonProps}>
          <CalendarIcon />
        </button>
        {popup}
      </div>
      {children}
    </div>
  )
}

/** 日期格的 class。selected：欄位目前填入的日期；isToday：今天。 */
export function dayClass({ selected, isToday }) {
  return (
    'typography-body2 flex h-[3.6rem] cursor-pointer select-none items-center justify-center rounded-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-PRIMARY ' +
    (selected ? 'bg-teal-PRIMARY text-neutral-white' : 'text-teal-700 hover:bg-neutral-beige-gray') +
    (isToday && !selected ? ' ring-1 ring-inset ring-teal-PRIMARY' : '')
  )
}

/**
 * 日曆面板：上個月／月份標題／下個月、星期列、日期格、取消／確定。
 * - rootProps：整個面板的屬性（A 版：role="dialog" 等；B 版：沒有）
 * - titleProps：月份標題的屬性
 * - gridProps、weekdayRowProps、rowProps、emptyCellProps：日期表格各層的屬性
 * - renderDay：(date) => 日期格元素（請套用 dayClass）
 */
export function CalendarShell({
  rootRef,
  rootProps,
  month,
  titleProps,
  onPrevMonth,
  onNextMonth,
  gridProps,
  weekdayRowProps,
  rowProps,
  emptyCellProps,
  renderDay,
  onCancel,
  onConfirm,
}) {
  return (
    <div
      ref={rootRef}
      className="absolute left-0 top-full z-20 mt-8 w-[32rem] max-w-[calc(100vw-3.2rem)] rounded-[1.2rem] border border-bg-warm-gray bg-neutral-white p-16 shadow-[0_0.8rem_2.4rem_rgb(16_36_42_/_0.24)]"
      {...rootProps}
    >
      <div className="flex items-center justify-between gap-8">
        <button type="button" aria-label="上個月" className={iconButton} onClick={onPrevMonth}>
          <ChevronDownIcon className="w-[1.4rem] rotate-90" />
        </button>
        <div className="typography-strong1 text-teal-700" {...titleProps}>
          {monthTitle(month)}
        </div>
        <button type="button" aria-label="下個月" className={iconButton} onClick={onNextMonth}>
          <ChevronDownIcon className="w-[1.4rem] -rotate-90" />
        </button>
      </div>

      <div className="mt-8" {...gridProps}>
        <div className="grid grid-cols-7" {...weekdayRowProps}>
          {WEEKDAYS.map((weekday) => (
            <div
              key={weekday}
              className="typography-body2 flex h-[3.2rem] items-center justify-center text-neutral-dark-gray"
            >
              {weekday}
            </div>
          ))}
        </div>
        {monthWeeks(month).map((week, i) => (
          <div key={i} className="grid grid-cols-7" {...rowProps}>
            {week.map((date, j) => (date ? renderDay(date) : <div key={j} {...emptyCellProps} />))}
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-end gap-8">
        <Button variant="small" theme="greenStroke" onClick={onCancel}>
          取消
        </Button>
        <Button variant="small" theme="dark" onClick={onConfirm}>
          確定
        </Button>
      </div>
    </div>
  )
}
