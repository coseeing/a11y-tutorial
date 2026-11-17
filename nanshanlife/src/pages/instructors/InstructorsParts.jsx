import { ACTIVITY, DOWNLOAD_NAME, DOWNLOAD_URL, HIGHLIGHTS, MILESTONES, SUPPORT } from './data.js'


const shell = 'mx-auto w-[min(960px,calc(100%_-_3.2rem))]'
const sectionTitle = 'm-0 mb-16 text-[2.2rem] font-bold leading-[1.5]'
const subsectionTitle = 'm-0 mb-8 text-[1.7rem] font-bold leading-[1.6]'
const paragraph = 'm-0 mb-12'
const panel = 'mb-24 min-w-0 scroll-mt-24 rounded-16 border border-bg-warm-gray bg-neutral-white p-24'
const focusRing = 'focus-visible:outline-3 focus-visible:outline-orange-PRIMARY focus-visible:outline-offset-4'
const dotColors = { green: 'bg-[#287549]', yellow: 'bg-[#a26c08]', red: 'bg-[#b23a32]' }

export function InstructorsPage({ accessible }) {
  const Main = accessible ? 'main' : 'div'
  const Heading = accessible ? 'h2' : 'h4'
  const Subheading = accessible ? 'h3' : 'h5'

  return (
    <div className="bg-bg-light-off-white font-noto text-[1.6rem] leading-[1.75] text-teal-700 [overflow-wrap:anywhere]">
      {accessible && (
        <a className={`fixed top-16 left-16 z-10 -translate-y-[200%] rounded-8 bg-neutral-white px-16 py-12 text-teal-PRIMARY underline underline-offset-[.2em] focus:translate-y-0 ${focusRing}`} href="#activity-title" onClick={() => document.getElementById('activity-title')?.focus()}>
          跳到主要內容
        </a>
      )}
      <header className="border-b border-bg-warm-gray bg-neutral-white">
        <div className={`${shell} flex flex-wrap items-center justify-between gap-16 py-20`}>
          <span className="typography-headline4 text-teal-PRIMARY">好好學</span>
        </div>
      </header>

      {/* B 版固定 960px，保留窄視窗的水平捲動問題（1.4.10）。 */}
      <Main className={`mx-auto pt-40 pb-0 ${accessible ? 'w-[min(960px,calc(100%_-_3.2rem))]' : 'w-[960px]'}`}>
        <div className="mb-32">
          <p className={`${paragraph} font-bold tracking-[.08em]`}>分享專業，讓學習走得更遠</p>
          <h1 className={`m-0 mb-16 text-[clamp(2.8rem,4vw,4rem)] font-bold leading-[1.4] text-teal-PRIMARY ${focusRing}`} id="activity-title" tabIndex={accessible ? -1 : undefined}>{ACTIVITY.title}</h1>
          <p className={`${paragraph} text-[1.4rem]`}>發布日期：<time dateTime="2026-10-20">{ACTIVITY.date}</time></p>
          <section id="overview" className="mt-24 scroll-mt-24">
            <Heading className={sectionTitle}>活動介紹</Heading>
            {ACTIVITY.intro.map((text) => <p className={paragraph} key={text}>{text}</p>)}
          </section>
        </div>

        <section className="mb-32 scroll-mt-24">
          <Heading className={sectionTitle}>招募重點</Heading>
          {/* B 版卡片跟隨視窗寬度、固定三欄並裁切，以呈現文字放大問題（1.4.4）。 */}
          <div className={`grid gap-12 ${accessible
            ? 'grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))]'
            : 'w-[min(100%,calc(100vw_-_3.2rem))] grid-cols-3'}`}>
            {HIGHLIGHTS.map((item) => (
              <div className={`min-w-0 rounded-16 border border-bg-warm-gray bg-neutral-white p-[1rem] ${accessible ? 'min-h-[12rem]' : 'h-[120px] min-h-0 overflow-hidden'}`} key={item.title}>
                <p className="m-0 text-[1.4rem] font-bold leading-[1.4]">{item.title}</p>
                <p className="mx-0 my-4 text-[2rem] font-bold leading-[1.4]">{item.value}</p>
                <p className={`m-0 text-[1.4rem] ${accessible ? 'leading-[1.45]' : 'leading-[20px]'}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className={`grid grid-cols-[minmax(0,1fr)_minmax(0,25.6rem)] items-start gap-24 ${accessible ? '[@media(max-width:768px)]:grid-cols-1' : ''}`}>
          <div>
            <section id="support" className={panel}>
              <Heading className={sectionTitle}>講師支援</Heading>
              {SUPPORT.map((item) => (
                <div className="[&+&]:mt-20" key={item.title}>
                  <Subheading className={subsectionTitle}>{item.title}</Subheading>
                  <p className={paragraph}>{item.description}</p>
                </div>
              ))}
            </section>
            <section id="milestones" className={panel}>
              <Heading className={sectionTitle}>招募時程</Heading>
              {!accessible && <p className={paragraph}>● 進度狀態請見燈號</p>}
              <ol className="m-0 list-none p-0">
                {MILESTONES.map((item) => (
                  <li className="mt-16 flex items-baseline gap-12" key={item.title}>
                    <span className={`inline-block size-[1.4rem] flex-[0_0_1.4rem] rounded-[50%] ${dotColors[item.color]}`} aria-hidden="true" />
                    <div>
                      <p className="m-0 font-bold">{item.title}</p>
                      <p className="m-0">{item.date}</p>
                      {/* B 版刻意只靠色彩，不以隱藏文字或可及名稱透露狀態（1.4.1）。 */}
                      {accessible && <p className="m-0 font-bold">{item.status}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
          {/* B 版刻意在窄視窗隱藏聯絡資訊，供學員找出資訊遺失問題（1.4.10）。 */}
          <aside id="contact" className={`${panel} ${accessible ? '' : '[@media(max-width:768px)]:hidden'}`}>
            <Heading className={sectionTitle}>聯絡我們</Heading>
            <Subheading className={`${subsectionTitle} mt-20`}>講師招募聯絡窗口</Subheading>
            <p className={paragraph}>好好學課程團隊</p>
            <p className={paragraph}>Email：<a className={`text-teal-PRIMARY underline underline-offset-[.2em] ${focusRing}`} href="mailto:teachers@haohaoxue.example">teachers@haohaoxue.example</a></p>
            <Subheading className={`${subsectionTitle} mt-20`}>報名準備事項</Subheading>
            <p className={paragraph}>請備妥講師介紹與課程構想；如需報名協助，請聯絡課程團隊。</p>
          </aside>
        </div>
      </Main>

      {/* 與固定寬度主容器分開，確保 B 版的知覺特徵指示也能在窄視窗下觀察。 */}
      <section className={`${shell} mt-8 mb-40 flex items-center justify-between gap-24 rounded-16 bg-bg-warm-gray p-24 [@media(max-width:768px)]:flex-col [@media(max-width:768px)]:items-start scroll-mt-24`} aria-label="講師招募簡章">
        <div className="min-w-0">
          <Heading className={sectionTitle}>把你的專業，變成下一堂好課</Heading>
          <p className={paragraph}>{accessible
            ? `請點擊『${DOWNLOAD_NAME}』按鈕以了解報名方式與課程製作支援`
            : '請點擊右側的綠色圓形按鈕下載簡章'}</p>
        </div>
        <button
          type="button"
          className={`flex h-[11.2rem] w-[11.2rem] flex-none cursor-pointer flex-col items-center justify-center rounded-[50%] border-0 bg-teal-PRIMARY p-8 text-[1.4rem] font-bold text-neutral-white hover:brightness-90 ${focusRing} ${accessible ? '' : '[@media(max-width:768px)]:w-full'}`}
          aria-label={DOWNLOAD_NAME}
          onClick={() => {
            const link = document.createElement('a')
            link.href = DOWNLOAD_URL
            link.download = '講師招募簡章.pdf'
            link.click()
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
          </svg>
          <span>下載簡章</span>
        </button>
      </section>
    </div>
  )
}
