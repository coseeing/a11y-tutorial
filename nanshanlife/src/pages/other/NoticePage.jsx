// 主辦單位公告頁：最新消息頁「消息來源」連結的目的地（A、B 版共用）。

import { Card } from '@coseeing/ui'
import { PageTitle, SiteLayout } from '../../site/SiteLayout.jsx'

export default function NoticePage() {
  return (
    <SiteLayout>
      <PageTitle>主辦單位公告</PageTitle>
      <Card padded>
        <h2 className="typography-headline4 m-0 text-teal-700">2026 年終講座 活動公告</h2>
        <div className="mt-12 grid gap-8">
          <p className="typography-body1 m-0">
            2026 年終講座將於 12 月 6 日（六）下午 2 點在台北舉行，本次共開放 60 個名額，額滿為止。
          </p>
          <p className="typography-body1 m-0">
            活動當天請攜帶報名確認信報到。如因天候等因素需要延期，將於活動前一天另行公告。
          </p>
        </div>
      </Card>
    </SiteLayout>
  )
}
