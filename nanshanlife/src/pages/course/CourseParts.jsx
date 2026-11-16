// 課程詳情頁 A、B 兩版共用的區塊。兩版不同的部分由參數傳入。

import { Button } from '@coseeing/ui'
import { useState } from 'react'
import { InfoList } from '../../site/FormField.jsx'
import { HeartIcon } from '../../site/icons.jsx'
import { PageTitle, SiteLayout } from '../../site/SiteLayout.jsx'
import { smallGreenStrokeButton } from '../../site/styles.js'
import { ToastHost, useToast } from '../../site/toast.jsx'
import { COURSE, ENROLL_SUMMARY, TOAST_ENROLLED, TOAST_FAVORITED, TOAST_UNFAVORITED } from './data.js'

/**
 * 整個課程詳情頁。
 * - favoriteProps：(favorited) => 給「收藏」按鈕的無障礙屬性
 * - DialogComponent：({ open, onClose, title, actions, children }) => JSX
 *   （A 版 DS Dialog，B 版 FakeDialog）
 * - announceToast：toast 出現時要不要讓螢幕閱讀器念出（A 版 true，B 版 false）
 */
export function CoursePage({ favoriteProps, DialogComponent, announceToast }) {
  const [favorited, setFavorited] = useState(false)
  const [enrollOpen, setEnrollOpen] = useState(false)
  const [toast, showToast] = useToast()

  const toggleFavorite = () => {
    showToast(favorited ? TOAST_UNFAVORITED : TOAST_FAVORITED)
    setFavorited(!favorited)
  }

  // 報名後按鈕刻意不變（不改成「已報名」）：報名成功只靠 toast 告知，
  // 這樣才聽得出 toast 有沒有念出來。
  const confirmEnroll = () => {
    setEnrollOpen(false)
    showToast(TOAST_ENROLLED)
  }

  return (
    <>
      <SiteLayout>
        <PageTitle>{COURSE.title}</PageTitle>
        <p className="typography-body1 m-0">{COURSE.intro}</p>

        <div className="mt-20">
          {/* 畫面上文字固定是「收藏」，按下後只有愛心變成實心的紅色。 */}
          <button
            type="button"
            className={`${smallGreenStrokeButton} gap-8`}
            onClick={toggleFavorite}
            {...favoriteProps(favorited)}
          >
            <HeartIcon filled={favorited} className={favorited ? 'text-red-PRIMARY' : undefined} />
            收藏
          </button>
        </div>

        <section className="mt-32 rounded-24 border border-bg-warm-gray bg-neutral-white px-20 py-20 tablet:px-24 tablet:py-24">
          <h2 className="typography-headline4 m-0 mb-12 text-teal-700">課程資訊</h2>
          <InfoList items={COURSE.info} />
        </section>

        <div className="mt-24">
          <Button variant="primary" theme="light" onClick={() => setEnrollOpen(true)}>
            我要報名
          </Button>
        </div>
      </SiteLayout>

      <DialogComponent
        open={enrollOpen}
        onClose={() => setEnrollOpen(false)}
        title="確認報名"
        actions={
          <>
            <Button variant="small" theme="greenStroke" onClick={() => setEnrollOpen(false)}>
              取消
            </Button>
            <Button variant="small" theme="dark" onClick={confirmEnroll}>
              確認報名
            </Button>
          </>
        }
      >
        <InfoList items={ENROLL_SUMMARY} />
      </DialogComponent>

      <ToastHost toast={toast} announce={announceToast} />
    </>
  )
}
