// ⚠️ 服務條款頁 B 版（有問題）。這裡的問題都是刻意埋設的，不要修好。
// 對照表見 docs/design.md 4.3。

import { Link } from '@coseeing/ui'
import { FakeCheckbox } from '../../lookalikes/FakeCheckbox.jsx'
import { textLink } from '../../site/styles.js'
import { CPA_URL, PDPA_URL } from './data.jsx'
import { TermsPage } from './TermsParts.jsx'

export default function TermsB() {
  return (
    <TermsPage
      // 問題：名稱是英文「more」，不包含畫面上的「更多」，也沒有關聯標題，
      // 每條都念「more」；沒有展開／收合狀態
      moreProps={() => ({ 'aria-label': 'more' })}
      // 問題：只有圖示，沒有名稱，也沒有描述 → NVDA 只念「按鈕」
      downloadProps={{}}
      // 問題：開新分頁但沒有提示（連結文字與 A 版相同）
      pdpaLink={
        <Link href={PDPA_URL} target="_blank" rel="noopener" className={textLink}>
          個人資料保護法全文
        </Link>
      }
      // 問題：連結文字是完整網址（同一分頁開啟，與 A 版相同）
      cpaLink={
        <Link href={CPA_URL} className={`${textLink} break-all`}>
          {CPA_URL}
        </Link>
      }
      // 問題：沒有角色、沒有核取狀態（Tab 到得了、空白鍵勾得了）
      CheckboxControl={FakeCheckbox}
    />
  )
}
