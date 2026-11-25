import { Card, Accordion, Link } from "@coseeing/ui"
import { PreparationChecklist } from "./PreparationChecklist.jsx"
import { appPath } from "./paths.js"


export default function RemindersPracticePage() {
  return (
    <>
      <h1 className="typography-headline1 m-0 text-teal-700">週末修繕工作坊</h1>
      <Card title="行前提醒" padded>
        <img src={appPath("/wave-demo/celebration.svg")} alt="" width="180" height="48" className="mb-12 h-48 w-auto" />
        <p className="typography-body2 m-0 text-teal-700">
          請在活動開始前 15 分鐘報到。
        </p>
        <p className="typography-body1 mb-0 mt-12">現場備有工具，請自備要修理的小物。</p>
      </Card>
      <Card title="報到資訊" padded>
        <Accordion
          items={[
            { question: "在哪裡報到？", answer: "請到社區活動中心一樓服務台報到。" },
            { question: "衣物修補場要帶什麼？", answer: "請帶一件乾淨、需要修補的衣物。針線由主辦方提供。" },
          ]}
        />
      </Card>
      <Card title="報名資料" padded><PreparationChecklist /></Card>
      <Link href={appPath("/test-practice/1/")} className="typography-body1 self-start underline">回到活動導覽</Link>
    </>
  )
}
