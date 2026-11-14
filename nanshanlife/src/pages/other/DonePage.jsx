// 完成頁：服務條款頁「同意並繼續」之後的頁面（A、B 版共用）。

import { Card } from '@coseeing/ui'
import { PageTitle, SiteLayout } from '../../site/SiteLayout.jsx'

export default function DonePage() {
  return (
    <SiteLayout>
      <PageTitle>註冊完成</PageTitle>
      <Card padded>
        <p className="typography-body1 m-0">你已同意服務條款，註冊完成。歡迎加入好好學！</p>
      </Card>
    </SiteLayout>
  )
}
