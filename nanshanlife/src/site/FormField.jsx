// 表單共用元件：文字欄位、單選群組、資訊列表。A、B 兩版外觀相同，
// 兩版的差別由呼叫端傳入的參數（exposeRequired、exposeError）或元件（RadioGroup／FakeRadioGroup）決定。

import { Input } from '@coseeing/ui'
import { FieldError, FieldLabel } from './CalendarShell.jsx'
import { inputInvalidLook } from './styles.js'

/**
 * 單行文字欄位（姓名、Email）。
 * - labelled：標籤是否和欄位關聯（預設 true；只有預約試聽頁 B 版的「姓名」是 false →
 *   畫面上有「姓名」，但 NVDA 只念「編輯區」）
 * - required：畫面上顯示紅色星號
 * - exposeRequired：必填是否讓輔助科技知道（A 版 true → 念出「必要的」；B 版 false → 只有紅色星號）
 * - error：錯誤訊息；沒有錯誤時為 null
 * - exposeError：錯誤是否讓輔助科技知道
 *   （A 版 true → 顯示錯誤文字，念出「無效的輸入」與錯誤說明；B 版 false → 只有紅框）
 */
export function TextField({
  id,
  label,
  type = 'text',
  labelled = true,
  autoComplete,
  required,
  exposeRequired,
  value,
  onChange,
  error,
  exposeError,
}) {
  const errorId = `${id}-error`
  const showErrorText = Boolean(error) && exposeError

  return (
    <div className="grid gap-8">
      <FieldLabel htmlFor={labelled ? id : undefined} required={required}>
        {label}
      </FieldLabel>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-required={(required && exposeRequired) || undefined}
        invalid={showErrorText}
        aria-describedby={showErrorText ? errorId : undefined}
        className={error && !exposeError ? inputInvalidLook : undefined}
      />
      {showErrorText ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  )
}

/** 群組標題與選項排列用的 class：RadioGroup（A 版）與 FakeRadioGroup（B 版）共用。 */
export const groupTitle = 'typography-strong2 m-0 mb-8 block p-0 text-teal-700'
export const groupOptions = 'flex flex-wrap gap-24'

/** A 版：真正的群組（<fieldset>＋<legend>）。進入群組時 NVDA 念出「時段 群組」。 */
export function RadioGroup({ legend, children }) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className={groupTitle}>{legend}</legend>
      <div className={groupOptions}>{children}</div>
    </fieldset>
  )
}

/** 單選按鈕（兩版相同：原生的 radio，標籤有關聯）。 */
export function RadioOption({ name, value, checked, onChange, children }) {
  return (
    <label className="typography-body1 inline-flex items-center gap-8 text-teal-700">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="m-0 size-16 shrink-0 rounded-full accent-teal-PRIMARY focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY focus-visible:ring-offset-2"
      />
      {children}
    </label>
  )
}

/** 「項目：內容」的列表（課程資訊、確認報名對話框）。 */
export function InfoList({ items }) {
  return (
    <dl className="m-0 grid gap-8">
      {items.map(([term, detail]) => (
        <div key={term} className="flex gap-12">
          <dt className="typography-strong2 w-[6rem] shrink-0 text-teal-300">{term}</dt>
          <dd className="typography-body1 m-0 text-teal-700">{detail}</dd>
        </div>
      ))}
    </dl>
  )
}
