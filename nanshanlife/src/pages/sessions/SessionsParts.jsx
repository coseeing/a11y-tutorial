// 課程場次頁 A、B 兩版共用的區塊。兩版不同的部分由參數傳入。

import { PageTitle, SiteLayout } from '../../site/SiteLayout.jsx'
import { NOTICE_ITEMS, NOTICE_TITLE, REMARKS_EN, REMARKS_TITLE, REMARKS_ZH, SESSION_COLUMNS, SESSIONS } from './data.js'

const sectionTitle = 'typography-headline3 m-0 text-teal-PRIMARY'

/**
 * 整個課程場次頁。
 * - TabsComponent：({ items }) => JSX（A 版 DS Tabs，B 版 FakeTabs）
 * - TableComponent：({ columns, rows }) => JSX（A 版 DS Table，B 版 FakeTable）
 * - ListComponent：({ items }) => JSX（A 版 BulletList，B 版 FakeList）
 * - noticeTitleTag：「報名須知」標題的元素（A 版 'h2'，B 版 'h4'）
 * - remarksTitleTag：「注意事項」標題的元素（A 版 'h2'，B 版 'p'）
 * - englishLang：英文段落的 lang（A 版 'en'，B 版不給）
 * 三個標題外觀相同：都套 sectionTitle，不受元素預設樣式影響。
 */
export function SessionsPage({
  TabsComponent,
  TableComponent,
  ListComponent,
  noticeTitleTag: NoticeTitle,
  remarksTitleTag: RemarksTitle,
  englishLang,
}) {
  const items = SESSIONS.map((session) => ({
    label: session.label,
    content: <TableComponent columns={SESSION_COLUMNS} rows={session.rows} />,
  }))

  return (
    <SiteLayout>
      <PageTitle>課程場次</PageTitle>
      <TabsComponent items={items} />
      <section className="mt-40 grid gap-12">
        <NoticeTitle className={sectionTitle}>{NOTICE_TITLE}</NoticeTitle>
        <ListComponent items={NOTICE_ITEMS} />
      </section>
      <section className="mt-40 grid gap-12">
        <RemarksTitle className={sectionTitle}>{REMARKS_TITLE}</RemarksTitle>
        <p className="typography-body1 m-0">{REMARKS_ZH}</p>
        <p lang={englishLang} className="typography-body1 m-0">
          {REMARKS_EN}
        </p>
      </section>
    </SiteLayout>
  )
}
