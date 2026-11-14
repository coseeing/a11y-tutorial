// ⚠️ 課程場次頁 B 版（有問題）。這裡的問題都是刻意埋設的，不要修好。
// 對照表見 docs/design.md 4.4。

import { FakeList } from '../../lookalikes/FakeList.jsx'
import { FakeTable } from '../../lookalikes/FakeTable.jsx'
import { FakeTabs } from '../../lookalikes/FakeTabs.jsx'
import { SessionsPage } from './SessionsParts.jsx'

export default function SessionsB() {
  return (
    <SessionsPage
      // 問題：只是可以點的文字，沒有索引標籤的角色與狀態
      TabsComponent={FakeTabs}
      // 問題：排版的格子，沒有表格語意
      TableComponent={FakeTable}
      // 問題：一行一行以「・」開頭的文字，沒有清單語意
      ListComponent={FakeList}
      // 問題：標題層級 4，從層級 1 跳號
      noticeTitleTag="h4"
      // 問題：放大加粗的文字，不是標題
      remarksTitleTag="p"
      // 問題：英文段落沒有標示語言
      englishLang={undefined}
    />
  )
}
