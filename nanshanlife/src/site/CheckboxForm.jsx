import { Button, ValidationMessage } from '@coseeing/ui'
import { useState } from 'react'

/**
 * 「核取方塊＋送出按鈕」的共用區塊（訂閱電子報、同意服務條款）。
 * A、B 兩版只差在傳進來的 CheckboxControl：A 版是 DS Checkbox，B 版是仿製品。
 *
 * - CheckboxControl：({ checked, onChange, label }) => JSX
 * - onSubmit：勾選後按下按鈕時執行；回傳要顯示的成功訊息（或不回傳）。
 */
export function CheckboxForm({
  CheckboxControl,
  checkboxLabel,
  buttonLabel,
  buttonVariant = 'small',
  buttonTheme = 'dark',
  uncheckedMessage,
  onSubmit,
}) {
  const [checked, setChecked] = useState(false)
  const [message, setMessage] = useState(null)

  const submit = () => {
    if (!checked) {
      setMessage({ variant: 'danger', text: uncheckedMessage })
      return
    }
    const success = onSubmit?.()
    setMessage(success ? { variant: 'success', text: success } : null)
  }

  return (
    <div className="grid gap-12">
      <div className="flex flex-wrap items-center gap-16">
        <CheckboxControl
          checked={checked}
          onChange={(value) => {
            setChecked(value)
            setMessage(null)
          }}
          label={checkboxLabel}
        />
        <Button variant={buttonVariant} theme={buttonTheme} onClick={submit}>
          {buttonLabel}
        </Button>
      </div>
      {/* 一直存在的 live region，訊息出現時螢幕閱讀器才念得出來（DS Field 的作法）。 */}
      <div aria-live="polite">
        {message ? (
          <ValidationMessage variant={message.variant} announce={false}>
            {message.text}
          </ValidationMessage>
        ) : null}
      </div>
    </div>
  )
}
