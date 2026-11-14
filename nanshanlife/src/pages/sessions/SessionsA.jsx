// 課程場次頁 A 版（良好）。對照表見 docs/design.md 4.4。

import { Table, Tabs } from '@coseeing/ui'
import { BulletList } from '../../site/BulletList.jsx'
import { SessionsPage } from './SessionsParts.jsx'

function SessionTabs({ items }) {
  return <Tabs label="場次" items={items} />
}

export default function SessionsA() {
  return (
    <SessionsPage
      TabsComponent={SessionTabs}
      TableComponent={Table}
      ListComponent={BulletList}
      noticeTitleTag="h2"
      remarksTitleTag="h2"
      englishLang="en"
    />
  )
}
