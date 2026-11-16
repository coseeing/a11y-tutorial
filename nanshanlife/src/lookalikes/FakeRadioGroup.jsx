// ⚠️ B 版專用：刻意做壞的「單選群組」。不要修好它。
//
// 外觀與 A 版的 RadioGroup 完全相同，但問題文字「時段」只是一行字，
// 沒有用群組把它和下面的選項綁在一起：
//   - Tab 到選項時只念「上午 選項按鈕 未選取」，不知道是在回答什麼問題
//
// 對應教材 B3 情境 7：「單選按鈕要有群組名稱」。選項本身（原生 radio、標籤）兩版相同。

import { groupOptions, groupTitle } from '../site/FormField.jsx'

export function FakeRadioGroup({ legend, children }) {
  return (
    <div>
      <p className={groupTitle}>{legend}</p>
      <div className={groupOptions}>{children}</div>
    </div>
  )
}
