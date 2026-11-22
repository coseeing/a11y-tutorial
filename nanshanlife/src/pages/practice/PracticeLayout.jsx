import { Container, Link } from '@coseeing/ui'
import { appPath } from './paths.js'

export function PracticeLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="typography-strong2 sr-only rounded-8 bg-teal-PRIMARY px-16 py-12 text-neutral-white focus:not-sr-only focus:absolute focus:left-16 focus:top-16 focus:z-[80]">
        跳到主要內容
      </a>
      <header className="bg-teal-PRIMARY py-24">
        <Container>
          <Link href={appPath('/')} className="inline-flex rounded-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY">
            <img src={appPath('/brand/coseeing-logo.svg')} alt="Coseeing 教學首頁" width="232" height="32" />
          </Link>
        </Container>
      </header>
      <main id="main" tabIndex={-1} className="flex-1">
        <Container className="flex flex-col gap-24 py-32 tablet:py-48">{children}</Container>
      </main>
      <footer className="bg-bg-light-beige py-24">
        <Container><p className="typography-body2 m-0">Coseeing 無障礙檢測練習</p></Container>
      </footer>
    </div>
  )
}
