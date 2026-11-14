// ⚠️ B 版專用：刻意做壞的「清單」。不要修好它。
//
// 外觀與 A 版的 BulletList 完全相同，但只是一行一行以「・」開頭的 <p>：
//   - 沒有 list / listitem 角色 → NVDA 不會念「清單 有 N 項」，聽不出共有幾項
//   - 按 L 找不到清單，按「,」也跳不出去
//   - 「・」是真正的文字，NVDA 可能把它念成「點」或其他符號名稱
//
// 對應教材 4-3 重點 4：「用「・」符號一行一行排出來的文字」。

import { BULLET, bulletItem } from '../site/styles.js'

export function FakeList({ items }) {
  return (
    <div className="grid gap-8">
      {items.map((item, i) => (
        <p key={i} className={bulletItem}>
          {BULLET}
          {item}
        </p>
      ))}
    </div>
  )
}
