import { Link } from "@coseeing/ui"
import { appPath } from "./paths.js"


export default function PracticePage() {
  return (
    <>
      <h1 className="typography-headline1 m-0 text-teal-700">週末修繕工作坊</h1>
      <ul className="typography-body1 m-0 grid list-disc gap-12 pl-24">
        <li><Link href={appPath("/test-practice/1/")} className="underline">活動導覽</Link></li>
        <li><Link href={appPath("/test-practice/2/")} className="underline">課程內容</Link></li>
        <li><Link href={appPath("/test-practice/3/")} className="underline">行前提醒</Link></li>
      </ul>
    </>
  )
}
