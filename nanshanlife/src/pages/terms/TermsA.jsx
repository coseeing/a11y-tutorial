// 服務條款頁 A 版（良好）。對照表見 docs/design.md 4.3。

import { Link } from '@coseeing/ui'
import { useId } from 'react'
import { RealCheckbox } from '../../site/RealCheckbox.jsx'
import { textLink } from '../../site/styles.js'
import { CPA_URL, PDPA_URL, TERMS_PDF } from './data.jsx'
import { TermsPage } from './TermsParts.jsx'

export default function TermsA() {
  const downloadDescId = useId()

  return (
    <>
      <TermsPage
        moreProps={({ buttonId, titleId, contentId, expanded }) => ({
          // 名稱 = 按鈕本身的文字「更多」＋該條標題，例如「更多 第三條 個人資料保護」
          'aria-labelledby': `${buttonId} ${titleId}`,
          'aria-expanded': expanded,
          'aria-controls': contentId,
        })}
        downloadProps={{ 'aria-label': '下載', 'aria-describedby': downloadDescId }}
        pdpaLink={
          <Link href={PDPA_URL} target="_blank" rel="noopener" title="開啟新分頁" className={textLink}>
            個人資料保護法全文
          </Link>
        }
        cpaLink={
          <Link href={CPA_URL} className={textLink}>
            消費者保護法全文
          </Link>
        }
        CheckboxControl={RealCheckbox}
      />
      {/* 下載按鈕的描述：畫面不顯示，由 aria-describedby 提供給輔助科技。 */}
      <span id={downloadDescId} hidden>
        {TERMS_PDF.description}
      </span>
    </>
  )
}
