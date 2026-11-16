import { Container } from '@coseeing/ui'

/**
 * 虛構網站「好好學」線上課程平台的共用外框。
 *
 * - headerExtra：頁首右側的內容（例如最新消息頁的分享按鈕）。
 * - footer：頁尾內容；沒有傳入就不顯示頁尾。
 * - skipLinkTarget：有傳入時，頁面最前面加上「跳到主要內容」連結（skip link），
 *   按下後焦點移到這個 id 的元素（該元素要有 tabIndex={-1}）。只有最新消息頁 A 版使用。
 */
export function SiteLayout({ headerExtra, footer, skipLinkTarget, children }) {
  return (
    <>
      {skipLinkTarget ? (
        // 平常移到畫面外，取得焦點時出現在畫面左上角：主要給看得到畫面的鍵盤使用者。
        <a
          href={`#${skipLinkTarget}`}
          onClick={() => document.getElementById(skipLinkTarget)?.focus()}
          className="typography-strong1 fixed left-16 top-16 z-50 -translate-y-[20rem] rounded-8 bg-teal-PRIMARY px-16 py-8 text-neutral-white underline focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY focus-visible:ring-offset-2"
        >
          跳到主要內容
        </a>
      ) : null}
      <header className="border-b border-bg-warm-gray bg-neutral-white">
        <Container className="flex h-64 items-center justify-between gap-16">
          {/* data-page-top：B 版日曆關閉後「焦點跳回頁首」的落點（lookalikes/FakeDateField.jsx）。 */}
          <span data-page-top tabIndex={-1} className="typography-headline4 text-teal-PRIMARY focus:outline-none">
            好好學
          </span>
          {headerExtra}
        </Container>
      </header>

      <main>
        <Container className="pb-64 pt-40">{children}</Container>
      </main>

      {footer ? (
        <footer className="border-t border-bg-warm-gray bg-bg-light-beige">
          <Container className="py-32">{footer}</Container>
        </footer>
      ) : null}
    </>
  )
}

/** 頁面主標題。id：作為 skip link 的目標時傳入，標題會變成可以用程式移入焦點（tabIndex -1）。 */
export function PageTitle({ id, children }) {
  return (
    <h1
      id={id}
      tabIndex={id ? -1 : undefined}
      className="typography-headline2 m-0 mb-24 rounded-8 text-teal-PRIMARY focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
    >
      {children}
    </h1>
  )
}
