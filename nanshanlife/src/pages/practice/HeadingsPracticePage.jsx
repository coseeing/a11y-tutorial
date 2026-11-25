import { Card, Button, Table, Tabs } from "@coseeing/ui"
import { useState } from 'react'
import { appPath } from "./paths.js"


const columns = [
  { key: "className", label: "課程" },
  { key: "time", label: "時間" },
  { key: "seats", label: "剩餘名額" },
]

export default function HeadingsPracticePage() {
  const [summaryOpen, setSummaryOpen] = useState(false)
  return (
    <>
      <h1 className="typography-headline1 m-0 text-teal-700">週末修繕工作坊</h1>
      <Card title="課程內容" padded>
        <p className="typography-body1 mt-0">帶一件想修理的小物，一起練習延長它的使用壽命。</p>
        <h3 className="typography-headline4 mb-8">當天會做什麼</h3>
        <ul className="typography-body1 mb-0 list-disc pl-24">
          <li>辨識損壞的原因</li>
          <li>認識基本工具</li>
          <li>分組修理日常小物</li>
        </ul>
      </Card>
      <Card title="可報名場次" padded>
        <Tabs
          label="修繕場次"
          items={[
            {
              label: "上午場",
              content: <Table columns={columns} rows={[{ className: "木製品修繕", time: "09:30–11:00", seats: "已額滿" }]} />,
            },
            {
              label: "下午場",
              content: <Table columns={columns} rows={[{ className: "衣物修補", time: "14:00–15:30", seats: "3 位" }]} />,
            },
          ]}
        />
      </Card>
      <Card title="課程摘要" padded>
        <p className="typography-body1 mt-0">查看課程摘要</p>
        <form onSubmit={(event) => { event.preventDefault(); setSummaryOpen(true) }}>
          {/* Freego HM1110104C: this image input intentionally lacks alt. */}
          <input id="practice-summary-button" type="image" src={appPath('/practice/course-info.svg')} width="40" height="40" className="h-40 w-40 cursor-pointer rounded-8 bg-teal-700 p-8" />
        </form>
        <p role="status" className="typography-body1 mb-0">{summaryOpen ? '木製品修繕與衣物修補均提供現場示範及實作。' : ''}</p>
      </Card>
      <Card title="上課地點" padded>
        <p className="typography-body1 mt-0">社區活動中心一樓，從正門進入後直走即可到達服務台。</p>
        {/* Freego HM1410201C: embedded content intentionally lacks title. */}
        <iframe id="practice-venue-frame" srcDoc={'<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><title>活動中心位置示意</title></head><body style="font-family:sans-serif;background:#f6f7f1;color:#10242a;padding:1rem"><p>社區活動中心</p><p>正門 → 服務台 → 修繕教室</p></body></html>'} className="h-[16rem] w-full rounded-8 border border-bg-warm-gray" />
      </Card>
      <Card title="主辦單位" padded>
        <img
          src={appPath("/brand/coseeing-logo.svg")}
          alt="Coseeing"
          width="232"
          height="32"
          className="h-auto w-[23.2rem] max-w-full"
        />
      </Card>
      <div><Button href={appPath("/test-practice/3/")} variant="small" theme="light">查看行前提醒</Button></div>
    </>
  )
}
