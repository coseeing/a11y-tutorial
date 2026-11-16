// 最新消息頁 A 版（良好）。對照表見 docs/design.md 4.2。

import { Dialog, Link, Table, Tabs } from '@coseeing/ui'
import { useId } from 'react'
import { BulletList } from '../../site/BulletList.jsx'
import { DateField } from '../../site/DateField.jsx'
import { RealCheckbox } from '../../site/RealCheckbox.jsx'
import { textLink } from '../../site/styles.js'
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
      shareButtonProps={{ 'aria-label': '分享' }}
      // 原生 <dialog>：開啟時焦點移進對話框，念出標題「分享」
      DialogComponent={Dialog}
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
      // ✓ 圖示的名稱是「已」→ 按下後按鈕的名稱變成「已關注講者」
      followIconProps={{ role: 'img', 'aria-label': '已' }}
      DateFieldComponent={DateField}
      CheckboxControl={RealCheckbox}
      exposeRequired
      exposeError
      announceToast
      skipLink
      newsTitleTag="h2"
      ListComponent={BulletList}
      markLanguage
    />
  )
}
