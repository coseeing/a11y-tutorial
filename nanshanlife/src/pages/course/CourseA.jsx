// 課程詳情頁 A 版（良好）。對照表見 docs/design.md 4.6。

import { Dialog } from '@coseeing/ui'
import { CoursePage } from './CourseParts.jsx'

export default function CourseA() {
  return (
    <CoursePage
      // 切換按鈕作法二：名稱固定是「收藏」，由狀態（已按下／未按下）說出現在的情況
      favoriteProps={(favorited) => ({ 'aria-pressed': favorited })}
      // 原生 <dialog>：開啟時焦點移進對話框，念出標題「確認報名」
      DialogComponent={Dialog}
      announceToast
    />
  )
}
