import { Container } from '@coseeing/ui'

/**
 * 虛構網站「好好學」線上課程平台的共用外框。
 *
 * - headerExtra：頁首右側的內容（例如最新消息頁的分享按鈕）。
 * - footer：頁尾內容；沒有傳入就不顯示頁尾。
 */
export function SiteLayout({ headerExtra, footer, children }) {
  return (
    <>
      <header className="border-b border-bg-warm-gray bg-neutral-white">
        <Container className="flex h-64 items-center justify-between gap-16">
          <span className="typography-headline4 text-teal-PRIMARY">好好學</span>
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

/** 頁面主標題。 */
export function PageTitle({ children }) {
  return <h1 className="typography-headline2 m-0 mb-24 text-teal-PRIMARY">{children}</h1>
}
