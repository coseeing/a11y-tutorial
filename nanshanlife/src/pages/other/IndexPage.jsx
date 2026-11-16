// 講師索引頁：列出各範例頁的連結與用途（對應各單元教材的附錄 A）。

import { Container, Link, Table } from '@coseeing/ui'
import { textLink } from '../../site/styles.js'

const PAGES = [
  { name: '最新消息頁', path: 'news', usage: '活動 4 至活動 7 前後的講解與示範' },
  { name: '服務條款頁', path: 'terms', usage: '活動 4：閱讀服務條款' },
  { name: '課程場次頁', path: 'sessions', usage: '活動 5：查詢課程場次' },
  { name: '課程詳情頁', path: 'course', usage: '活動 6：收藏與報名課程' },
  { name: '預約試聽頁', path: 'trial', usage: '活動 7：預約試聽' },
]

const COLUMNS = [
  { key: 'name', label: '頁面' },
  { key: 'a', label: 'A 版（良好）' },
  { key: 'b', label: 'B 版（有問題）' },
  { key: 'usage', label: '用途' },
]

// 顯示完整網址（依實際部署位置產生，例如 https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/a/news/），
// 講師可以直接複製給學員。
function PageLink({ href }) {
  return (
    <Link href={href} className={`${textLink} break-all`}>
      {new URL(href, window.location.href).href}
    </Link>
  )
}

const rows = PAGES.map((page) => ({
  name: page.name,
  a: <PageLink href={`./a/${page.path}/`} />,
  b: <PageLink href={`./b/${page.path}/`} />,
  usage: page.usage,
}))

export default function IndexPage() {
  return (
    <main>
      <Container className="grid gap-24 py-40">
        <h1 className="typography-headline2 m-0 text-teal-PRIMARY">工作坊範例索引</h1>
        <p className="typography-body1 m-0">
          所有範例頁都設定為虛構網站「好好學」線上課程平台。每個頁面都有 A 版（良好）與 B 版（有問題），兩版外觀與文字相同，差別只在輔助科技讀到的資訊。
        </p>
        <Table columns={COLUMNS} rows={rows} />
        <p className="typography-body2 m-0 text-teal-300">
          例外：B 版的消息來源連結與消費者保護法連結，畫面上也顯示完整網址；B 版的表單出錯時只有紅框，沒有錯誤文字。輔助頁：
          <Link href="./notice/" className={textLink}>
            主辦單位公告
          </Link>
          、
          <Link href="./done/" className={textLink}>
            註冊完成
          </Link>
          。
        </p>
      </Container>
    </main>
  )
}
