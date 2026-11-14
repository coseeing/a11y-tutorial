// 最新消息頁 A、B 兩版共用的區塊。兩版不同的部分由參數傳入。

import { Card } from '@coseeing/ui'
import { useId, useState } from 'react'
import { CheckboxForm } from '../../site/CheckboxForm.jsx'
import { DisclosureButton } from '../../site/DisclosureButton.jsx'
import { PageTitle, SiteLayout } from '../../site/SiteLayout.jsx'
import { ANNOUNCEMENTS, EVENT_COLUMNS, EVENT_NOTE, EVENT_ROWS, NEWS } from './data.jsx'

/**
 * 整個最新消息頁。
 * - shareButton：頁首的分享按鈕
 * - TabsComponent：({ items }) => JSX（A 版 DS Tabs，B 版 FakeTabs）
 * - TableComponent：({ columns, rows }) => JSX（A 版 DS Table，B 版 FakeTable）
 * - links：({ brochure, source }) 中的兩個連結元素
 * - readMoreProps：(ids) => 給「閱讀更多」按鈕的無障礙屬性
 * - CheckboxControl：訂閱電子報的核取方塊
 * - newsTitleTag：消息標題的元素（A 版 'h2'，B 版 'h4'；外觀相同）
 * - ListComponent：({ items }) => JSX，公告清單（A 版 BulletList，B 版 FakeList）
 * - markLanguage：英文消息是否標示 lang（A 版 true，B 版 false）
 */
export function NewsPage({
  shareButton,
  TabsComponent,
  TableComponent,
  links,
  readMoreProps,
  CheckboxControl,
  newsTitleTag,
  ListComponent,
  markLanguage,
}) {
  const items = [
    {
      label: '精選',
      content: (
        <div className="grid gap-20">
          {NEWS.map((item) => (
            <NewsCard
              key={item.key}
              item={item}
              links={links}
              readMoreProps={readMoreProps}
              TitleTag={newsTitleTag}
              lang={markLanguage ? item.lang : undefined}
            />
          ))}
        </div>
      ),
    },
    {
      label: '活動',
      content: (
        <div className="grid gap-16">
          <h2 className="typography-headline4 m-0 text-teal-700">近期活動一覽表</h2>
          <TableComponent columns={EVENT_COLUMNS} rows={EVENT_ROWS} />
          <p className="typography-body1 m-0">{EVENT_NOTE}</p>
        </div>
      ),
    },
    {
      label: '公告',
      content: (
        <Card padded>
          <ListComponent items={ANNOUNCEMENTS} />
        </Card>
      ),
    },
  ]

  return (
    <SiteLayout
      headerExtra={shareButton}
      footer={
        <CheckboxForm
          CheckboxControl={CheckboxControl}
          checkboxLabel="訂閱電子報"
          buttonLabel="訂閱"
          uncheckedMessage="請先勾選訂閱電子報。"
          onSubmit={() => '感謝訂閱！每月第一週會寄送電子報到你的信箱。'}
        />
      }
    >
      <PageTitle>最新消息</PageTitle>
      <TabsComponent items={items} />
    </SiteLayout>
  )
}

// lang 只加在標題、摘要、全文上：卡片裡的日期與「閱讀更多」按鈕仍是中文。
function NewsCard({ item, links, readMoreProps, TitleTag, lang }) {
  const [expanded, setExpanded] = useState(false)
  const id = useId()
  const ids = { buttonId: `${id}-button`, titleId: `${id}-title`, contentId: `${id}-content` }

  return (
    <Card padded>
      <TitleTag id={ids.titleId} lang={lang} className="typography-headline4 m-0 text-teal-700">
        {item.title}
      </TitleTag>
      <p className="typography-body2 m-0 mt-4 text-teal-300">{item.date}</p>
      <p lang={lang} className="typography-body1 m-0 mt-12">
        {item.summary(links)}
      </p>
      <div id={ids.contentId} lang={lang} hidden={!expanded} className="mt-12 grid gap-8">
        {item.full.map((text, i) => (
          <p key={i} className="typography-body1 m-0">
            {text}
          </p>
        ))}
      </div>
      <div className="mt-16">
        <DisclosureButton
          id={ids.buttonId}
          text="閱讀更多"
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          a11yProps={readMoreProps({ ...ids, expanded })}
        />
      </div>
    </Card>
  )
}
