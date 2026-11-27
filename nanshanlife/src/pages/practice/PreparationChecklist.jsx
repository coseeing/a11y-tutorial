import { Button, Checkbox, Field, Input } from "@coseeing/ui"
import { useState } from "react"

export function PreparationChecklist({ variant = "" }) {
  const NameLabel = variant === "a" ? "label" : "p"
  const [confirmed, setConfirmed] = useState(false)

  return (
    <form
      className="grid gap-12"
      onSubmit={(event) => {
        event.preventDefault()
        setConfirmed(true)
      }}
    >
      <p className="typography-body2 m-0 text-teal-700">練習時請使用虛構資料。</p>
      <div className="grid gap-8">
        {/* Freego HM1130104C: visible text intentionally has no label association. */}
        <NameLabel htmlFor={variant === "a" ? "practice-name" : undefined} className="typography-strong2 m-0 text-teal-700">姓名</NameLabel>
        <Input id="practice-name" name="name" autoComplete="off" />
      </div>
      <Field label="電子信箱" htmlFor="practice-email">
        <Input id="practice-email" name="email" type="email" autoComplete="off" aria-describedby="practice-contact-help" />
        <p id="practice-contact-help" className="typography-body2 m-0 text-teal-700">僅用於通知課程異動。</p>
      </Field>
      {/* Freego HM1130103C: first fieldset child intentionally is not a legend. */}
      <fieldset id="practice-skills" className="m-0 grid min-w-0 gap-8 rounded-8 border border-bg-warm-gray p-16">
        {variant === "a" && <legend className="sr-only">想學的技能（可複選）</legend>}
        <p aria-hidden={variant === "a" ? true : undefined} className="typography-strong2 m-0 text-teal-700">想學的技能（可複選）</p>
        <Checkbox name="skills" value="wood" label="木製品修繕" />
        <Checkbox name="skills" value="clothes" label="衣物修補" />
      </fieldset>
      <Checkbox
        required
        label="我已確認報到資訊與要帶的物品"
        onChange={() => setConfirmed(false)}
      />
      <div><Button type="submit" variant="small" theme="light">送出模擬報名</Button></div>
      <p role="status" className="typography-body1 m-0">
        {confirmed ? "已完成模擬報名。" : ""}
      </p>
    </form>
  )
}
