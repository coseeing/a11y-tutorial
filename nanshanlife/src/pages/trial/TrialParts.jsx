// 預約試聽頁 A、B 兩版共用的區塊。兩版不同的部分由參數傳入。

import { Button } from '@coseeing/ui'
import { useState } from 'react'
import { flushSync } from 'react-dom'
import { parseDate } from '../../site/calendar.js'
import { RadioOption, TextField } from '../../site/FormField.jsx'
import { PageTitle, SiteLayout } from '../../site/SiteLayout.jsx'
import { EMAIL_ERROR, isEmail, NAME_ERROR } from '../../site/validation.js'

const SLOTS = ['上午', '下午', '晚上']

// 欄位的 id，依畫面順序排列：送出有錯時，A 版把焦點移到第一個出錯的欄位。
const FIELD_IDS = { name: 'trial-name', email: 'trial-email', date: 'trial-date' }

function validate({ name, email, date }) {
  const errors = {}
  if (!name.trim()) errors.name = NAME_ERROR
  if (!isEmail(email)) errors.email = EMAIL_ERROR
  if (!parseDate(date)) errors.date = '請輸入試聽日期，格式：YYYY/MM/DD，例如 2026/11/24'
  return errors
}

/**
 * 整個預約試聽頁。
 * - nameLabelled：「姓名」的標籤是否和欄位關聯（A 版 true，B 版 false：只念「編輯區」）
 * - exposeRequired：必填是否讓輔助科技知道（A 版 true，B 版 false：只有紅色星號）
 * - exposeError：錯誤是否讓輔助科技知道（A 版 true：錯誤文字、「無效的輸入」、
 *   焦點移到第一個錯誤欄位；B 版 false：只有紅框，焦點不動）
 * - DateFieldComponent：試聽日期欄位＋日曆（A 版 DateField，B 版 FakeDateField）
 * - GroupComponent：時段的群組（A 版 RadioGroup，B 版 FakeRadioGroup）
 */
export function TrialPage({ nameLabelled, exposeRequired, exposeError, DateFieldComponent, GroupComponent }) {
  const [values, setValues] = useState({ name: '', email: '', date: '', slot: '' })
  const [errors, setErrors] = useState({})
  // 每次成功都重新插入訊息（key 不同），再次送出時螢幕閱讀器才會再念一次
  const [success, setSuccess] = useState({ shown: false, count: 0 })

  const set = (key) => (value) => setValues((v) => ({ ...v, [key]: value }))

  const submit = (e) => {
    e.preventDefault()
    const found = validate(values)
    const firstError = Object.keys(FIELD_IDS).find((key) => found[key])

    // 先讓錯誤顯示出來（A 版：aria-invalid、錯誤說明），再移動焦點，念到的才是最新的內容
    flushSync(() => {
      setErrors(found)
      setSuccess((s) => (firstError ? { ...s, shown: false } : { shown: true, count: s.count + 1 }))
    })
    if (firstError && exposeError) document.getElementById(FIELD_IDS[firstError])?.focus()
  }

  return (
    <SiteLayout>
      <PageTitle>預約試聽：無障礙設計入門</PageTitle>
      <p className="typography-body1 m-0">填寫下面的表單，預約一堂免費的試聽課程，我們會寄確認信給你。</p>

      {/* noValidate：關閉瀏覽器內建的檢查，錯誤一律由頁面呈現，每位學員聽到的結果才會一致。 */}
      <form
        noValidate
        onSubmit={submit}
        className="mt-24 grid max-w-[56rem] gap-20 rounded-24 border border-bg-warm-gray bg-neutral-white px-20 py-20 tablet:px-24 tablet:py-24"
      >
        <TextField
          id={FIELD_IDS.name}
          label="姓名"
          autoComplete="name"
          labelled={nameLabelled}
          required
          exposeRequired={exposeRequired}
          value={values.name}
          onChange={set('name')}
          error={errors.name}
          exposeError={exposeError}
        />
        <TextField
          id={FIELD_IDS.email}
          label="Email"
          type="email"
          autoComplete="email"
          required
          exposeRequired={exposeRequired}
          value={values.email}
          onChange={set('email')}
          error={errors.email}
          exposeError={exposeError}
        />
        <DateFieldComponent
          id={FIELD_IDS.date}
          label="試聽日期"
          required
          value={values.date}
          onChange={set('date')}
          error={errors.date}
        />
        <GroupComponent legend="時段">
          {SLOTS.map((slot) => (
            <RadioOption key={slot} name="slot" value={slot} checked={values.slot === slot} onChange={set('slot')}>
              {slot}
            </RadioOption>
          ))}
        </GroupComponent>
        <div>
          <Button type="submit" variant="primary" theme="light">
            送出預約
          </Button>
        </div>
        {/* 一直存在的 live region：兩版都會念出「預約成功」（教材：避免與 B2 的 toast 問題重複）。 */}
        <div role="status">
          {success.shown ? (
            <p key={success.count} className="typography-body1 m-0 text-green-800">
              預約成功！確認信已寄到你的信箱。
            </p>
          ) : null}
        </div>
      </form>
    </SiteLayout>
  )
}
