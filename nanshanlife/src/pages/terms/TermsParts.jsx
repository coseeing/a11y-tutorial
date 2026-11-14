// 服務條款頁 A、B 兩版共用的區塊。兩版不同的部分由參數傳入。

import { useId, useState } from 'react'
import { CheckboxForm } from '../../site/CheckboxForm.jsx'
import { DisclosureButton } from '../../site/DisclosureButton.jsx'
import { DownloadIcon } from '../../site/icons.jsx'
import { PageTitle, SiteLayout } from '../../site/SiteLayout.jsx'
import { iconButton } from '../../site/styles.js'
import { CLAUSES, TERMS_PDF } from './data.jsx'

/**
 * 整個服務條款頁。
 * - moreProps：(ids) => 給各條「更多」按鈕的無障礙屬性
 * - downloadProps：給「下載條款全文」圖示按鈕的無障礙屬性
 * - pdpaLink：第三條內文的個資法連結（開新分頁）
 * - cpaLink：第五條內文的消保法連結（同一分頁）
 * - CheckboxControl：「我已閱讀並同意服務條款」的核取方塊
 */
export function TermsPage({ moreProps, downloadProps, pdpaLink, cpaLink, CheckboxControl }) {
  const download = (
    <button type="button" className={iconButton} onClick={() => downloadFile(TERMS_PDF)} {...downloadProps}>
      <DownloadIcon />
    </button>
  )

  return (
    <SiteLayout>
      <PageTitle>服務條款</PageTitle>
      <div className="grid gap-12">
        {CLAUSES.map((clause) => (
          <Clause key={clause.key} clause={clause} parts={{ download, pdpaLink, cpaLink }} moreProps={moreProps} />
        ))}
      </div>
      <section className="mt-40 rounded-24 border border-bg-warm-gray bg-neutral-white px-20 py-20 tablet:px-24 tablet:py-24">
        <CheckboxForm
          CheckboxControl={CheckboxControl}
          checkboxLabel="我已閱讀並同意服務條款"
          buttonLabel="同意並繼續"
          buttonVariant="primary"
          buttonTheme="light"
          uncheckedMessage="請先勾選同意服務條款。"
          onSubmit={() => {
            window.location.href = '../../done/'
          }}
        />
      </section>
    </SiteLayout>
  )
}

function Clause({ clause, parts, moreProps }) {
  const [expanded, setExpanded] = useState(false)
  const id = useId()
  const ids = { buttonId: `${id}-button`, titleId: `${id}-title`, contentId: `${id}-content` }

  return (
    <div className="border-b border-bg-warm-gray pb-12">
      <div className="flex items-center justify-between gap-16 py-8">
        <h2 id={ids.titleId} className="typography-headline4 m-0 text-teal-700">
          {clause.title}
        </h2>
        <DisclosureButton
          id={ids.buttonId}
          text="更多"
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          a11yProps={moreProps({ ...ids, expanded })}
        />
      </div>
      <div id={ids.contentId} hidden={!expanded} className="grid gap-12 pb-8 pt-8">
        {clause.body(parts)}
      </div>
    </div>
  )
}

/** 用暫時的 <a download> 觸發下載。「下載」做成按鈕，是因為教材預期 B 版念「按鈕」。 */
function downloadFile({ href, fileName }) {
  const a = document.createElement('a')
  a.href = href
  a.download = fileName
  document.body.append(a)
  a.click()
  a.remove()
}
