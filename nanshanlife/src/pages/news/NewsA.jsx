// 最新消息頁 A 版（良好）。對照表見 docs/design.md 4.2。

import { Link, Table, Tabs } from '@coseeing/ui'
import { useId } from 'react'
import { ShareIcon } from '../../site/icons.jsx'
import { BulletList } from '../../site/BulletList.jsx'
import { RealCheckbox } from '../../site/RealCheckbox.jsx'
import { iconButton, textLink } from '../../site/styles.js'
import { BROCHURE, SOURCE_PATH } from './data.jsx'
import { NewsPage } from './NewsParts.jsx'

function BrochureLink() {
  const descId = useId()
  return (
    <>
      <Link href={BROCHURE.href} download={BROCHURE.fileName} aria-describedby={descId} className={textLink}>
        活動簡章
      </Link>
      {/* 描述：畫面不顯示，由 aria-describedby 提供給輔助科技。 */}
      <span id={descId} hidden>
        {BROCHURE.description}
      </span>
    </>
  )
}

function NewsTabs({ items }) {
  return <Tabs label="消息分類" items={items} />
}

export default function NewsA() {
  return (
    <NewsPage
      shareButton={
        <button type="button" aria-label="分享" className={iconButton}>
          <ShareIcon />
        </button>
      }
      TabsComponent={NewsTabs}
      TableComponent={Table}
      links={{
        brochure: <BrochureLink />,
        source: (
          <Link href={SOURCE_PATH} target="_blank" rel="noopener" title="開啟新分頁" className={textLink}>
            主辦單位公告
          </Link>
        ),
      }}
      readMoreProps={({ buttonId, titleId, contentId, expanded }) => ({
        // 名稱 = 按鈕本身的文字「閱讀更多」＋消息標題
        'aria-labelledby': `${buttonId} ${titleId}`,
        'aria-expanded': expanded,
        'aria-controls': contentId,
      })}
      CheckboxControl={RealCheckbox}
      newsTitleTag="h2"
      ListComponent={BulletList}
      markLanguage
    />
  )
}
