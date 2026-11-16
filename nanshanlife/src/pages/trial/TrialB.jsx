// ⚠️ 預約試聽頁 B 版（有問題）。這裡的問題都是刻意埋設的，不要修好。
// 對照表見 docs/design.md 4.7。

import { FakeDateField } from '../../lookalikes/FakeDateField.jsx'
import { FakeRadioGroup } from '../../lookalikes/FakeRadioGroup.jsx'
import { TrialPage } from './TrialParts.jsx'

export default function TrialB() {
  return (
    <TrialPage
      // 問題：「姓名」的標籤沒有和欄位關聯 → 畫面上有「姓名」，NVDA 只念「編輯區」
      nameLabelled={false}
      // 問題：必填只用紅色星號，念不出「必要的」
      exposeRequired={false}
      // 問題：送出有錯時只有紅框，沒有文字、沒有「無效的輸入」，焦點也不動
      exposeError={false}
      // 問題：沒有標籤與格式提示、日曆沒有告知、焦點沒移進日曆、不能用方向鍵、
      // Tab 跑到背景、Esc 沒作用、關閉後焦點跳回頁首（見 lookalikes/FakeDateField.jsx）
      DateFieldComponent={FakeDateField}
      // 問題：「時段」沒有群組，選項念不出是在回答什麼問題
      GroupComponent={FakeRadioGroup}
    />
  )
}
