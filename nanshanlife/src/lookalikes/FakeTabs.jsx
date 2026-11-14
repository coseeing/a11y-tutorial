// ⚠️ B 版專用：刻意做壞的「索引標籤」。不要修好它。
//
// 外觀與 DS Tabs 完全相同（class 複製自 coseeing-ui/src/components/Tabs/Tabs.tsx），
// 但只是「可以點的文字」：
//   - 沒有 tablist / tab / tabpanel 角色 → NVDA 不會切到焦點模式
//   - 沒有 aria-selected → 聽不出目前選了哪一個
//   - 不在 Tab 順序中、沒有方向鍵操作 → 只能用滑鼠點
//
// 對應教材 4-3：「看起來像分頁，但沒有索引標籤角色」。

import { useState } from 'react'

export function FakeTabs({ items, defaultIndex = 0 }) {
  const [active, setActive] = useState(defaultIndex)

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-8 border-b border-bg-warm-gray">
        {items.map((item, i) => {
          const selected = i === active
          return (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={
                '-mb-px cursor-pointer appearance-none border-x-0 border-b-[0.3rem] border-t-0 border-solid bg-transparent px-16 py-8 transition-colors ' +
                (selected
                  ? 'typography-strong1 border-orange-PRIMARY text-teal-PRIMARY'
                  : 'typography-emphasised1 border-transparent text-neutral-dark-gray hover:text-teal-PRIMARY')
              }
            >
              {item.label}
            </div>
          )
        })}
      </div>
      {items.map((item, i) => (
        <div key={i} hidden={i !== active} className="rounded-8 pt-16">
          {item.content}
        </div>
      ))}
    </div>
  )
}
