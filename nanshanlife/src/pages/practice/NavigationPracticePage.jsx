import { Card, ArrowRightIcon, Link } from "@coseeing/ui"
import { PracticeDisclosure as Disclosure } from "./PracticeDisclosure.jsx"
import { appPath, practicePath } from "./paths.js"


const quickLinkClass = "inline-flex min-h-40 min-w-40 items-center justify-center rounded-8 bg-teal-700 text-neutral-white"

export default function NavigationPracticePage({ variant = "" }) {
  return (
    <>
      {variant === "a" ? (
        <h1 id="practice-page-heading" className="typography-headline1 m-0 text-teal-700">週末修繕工作坊</h1>
      ) : (
        <>
          {/* The template leaves an empty heading while visible text is a paragraph. */}
          <h1 id="practice-page-heading" className="sr-only" />
          <p className="typography-headline1 m-0 text-teal-700">週末修繕工作坊</p>
        </>
      )}
      <Card title="活動導覽" padded>
        <div className="flex flex-wrap gap-24">
          <div>
            <p className="typography-strong2 mb-8 mt-0">前往課程內容</p>
            {/* Intentionally unnamed link for the workshop exercise. */}
            <Link id="practice-course-link" aria-label={variant === "a" ? "前往課程內容" : undefined} href={practicePath(2, variant)} className={quickLinkClass}>
              <ArrowRightIcon className="size-20" />
            </Link>
          </div>
          <div>
            <p className="typography-strong2 mb-8 mt-0">前往交通資訊</p>
            <Link href="#workshop-travel" aria-label="前往交通資訊" className={quickLinkClass}>
              <ArrowRightIcon className="size-20" />
            </Link>
          </div>
        </div>
      </Card>
      <Card title="活動海報" padded>
        {/* Freego HM1110100C: information-bearing image intentionally lacks alt. */}
        <img id="practice-poster" alt={variant === "a" ? "週末修繕工作坊：木製品修繕與衣物修補，09:30–15:30，社區活動中心。" : undefined} src={appPath('/practice/workshop-poster.svg')} width="640" height="240" className="h-auto w-full max-w-[64rem]" />
      </Card>
      <Card title="課程快訊" padded>
        <img id="practice-news-decoration" src={appPath('/wave-demo/celebration.svg')} alt="" width="180" height="48" className="mb-12 h-48 w-auto" />
        <p className="typography-body1 mb-12 mt-0">各場次的時間與名額已更新，報名前請先確認。</p>
        <div className="typography-body1 flex flex-wrap gap-16">
          <Link href={practicePath(2, variant)} className="underline">瀏覽課程場次</Link>
        </div>
      </Card>
      <Card id="workshop-program" title="課程內容" padded>
        <p className="typography-body1 m-0">帶一件想修理的小物，一起練習延長它的使用壽命。</p>
        <Disclosure label="查看適合帶來的物品">
          建議攜帶衣物、背包或小型木製品。現場不受理電器。
        </Disclosure>
      </Card>
      <Card id="workshop-travel" title="交通資訊" padded>
        <p className="typography-body1 m-0">集合地點為社區活動中心一樓，請從正門進入。</p>
      </Card>
    </>
  )
}
