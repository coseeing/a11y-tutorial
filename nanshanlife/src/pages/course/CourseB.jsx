// ⚠️ 課程詳情頁 B 版（有問題）。這裡的問題都是刻意埋設的，不要修好。
// 對照表見 docs/design.md 4.6。

import { FakeDialog } from '../../lookalikes/FakeDialog.jsx'
import { CoursePage } from './CourseParts.jsx'

export default function CourseB() {
  return (
    <CoursePage
      // 問題：名稱和狀態同時改。名稱從「收藏」改成「取消收藏」，又標示「已按下」，
      // 念成「取消收藏 已按下」，像雙重否定；名稱也和畫面上的文字「收藏」不一致
      favoriteProps={(favorited) => ({
        'aria-pressed': favorited,
        'aria-label': favorited ? '取消收藏' : '收藏',
      })}
      // 問題：焦點留在「我要報名」；對話框沒有角色與名稱，位於頁面最後
      DialogComponent={FakeDialog}
      // 問題：toast 出現時沒有念出
      announceToast={false}
    />
  )
}
