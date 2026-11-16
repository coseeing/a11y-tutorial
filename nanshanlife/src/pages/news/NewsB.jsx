// ⚠️ 最新消息頁 B 版（有問題）。這裡的問題都是刻意埋設的，不要修好。
// 對照表見 docs/design.md 4.2。

import { Link } from '@coseeing/ui'
import { FakeCheckbox } from '../../lookalikes/FakeCheckbox.jsx'
import { FakeDateField } from '../../lookalikes/FakeDateField.jsx'
import { FakeDialog } from '../../lookalikes/FakeDialog.jsx'
import { FakeList } from '../../lookalikes/FakeList.jsx'
import { FakeTable } from '../../lookalikes/FakeTable.jsx'
import { FakeTabs } from '../../lookalikes/FakeTabs.jsx'
import { textLink } from '../../site/styles.js'
import { absoluteUrl, BROCHURE, SOURCE_PATH } from './data.jsx'
import { NewsPage } from './NewsParts.jsx'

export default function NewsB() {
  return (
    <NewsPage
      // 問題：只有圖示，沒有名稱 → NVDA 只念「按鈕」
      shareButtonProps={{}}
      // 問題：開啟後焦點留在分享按鈕；對話框沒有角色與名稱，位於頁面最後
      DialogComponent={FakeDialog}
      // 問題：只是可以點的文字，沒有索引標籤的角色與狀態
      TabsComponent={FakeTabs}
      // 問題：排版的格子，沒有表格語意
      TableComponent={FakeTable}
      links={{
        // 問題：沒有描述（檔案格式、大小）
        brochure: (
          <Link href={BROCHURE.href} download={BROCHURE.fileName} className={textLink}>
            活動簡章
          </Link>
        ),
        // 問題：連結文字是完整網址；開新分頁但沒有提示
        source: (
          <Link href={SOURCE_PATH} target="_blank" rel="noopener" className={`${textLink} break-all`}>
            {absoluteUrl(SOURCE_PATH)}
          </Link>
        ),
      }}
      // 問題：名稱是英文「read more」，不包含畫面上的「閱讀更多」，也沒有關聯標題；
      // 沒有展開／收合狀態
      readMoreProps={() => ({ 'aria-label': 'read more' })}
      // 問題：沒有角色、沒有核取狀態（Tab 到得了、空白鍵勾得了）
      // 問題：✓ 圖示沒有名稱 → 按鈕的名稱一直是「關注講者」，按下後沒有任何念出
      followIconProps={{ 'aria-hidden': true }}
      // 問題：沒有標籤與格式提示、日曆沒有告知、焦點沒移進日曆、不能用方向鍵…
      // （見 lookalikes/FakeDateField.jsx）
      DateFieldComponent={FakeDateField}
      CheckboxControl={FakeCheckbox}
      // 問題：頁尾 Email 的必填只用紅色星號
      exposeRequired={false}
      // 問題：Email 留空送出時只有紅框，沒有文字、沒有「無效的輸入」，焦點也不動
      exposeError={false}
      // 問題：toast 出現時沒有念出
      announceToast={false}
      // 問題：沒有「跳到主要內容」連結
      skipLink={false}
      // 問題：消息標題是層級 4，從層級 1 跳號
      newsTitleTag="h4"
      // 問題：公告是一行一行以「・」開頭的文字，沒有清單語意
      ListComponent={FakeList}
      // 問題：英文消息沒有標示語言
      markLanguage={false}
    />
  )
}
