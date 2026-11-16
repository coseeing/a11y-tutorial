// 課程詳情頁的文字內容。A、B 兩版讀同一份資料，確保文字完全一致。

export const COURSE = {
  title: '無障礙設計入門',
  intro:
    '從使用者的操作方式出發，認識鍵盤、螢幕閱讀器使用者怎麼瀏覽網頁，學會在設計稿上標註名稱、角色與狀態。適合設計師、專案經理與檢測人員，不需要程式基礎。',
  info: [
    ['講師', '林小安'],
    ['日期', '12/13 下午 2 點至 5 點'],
    ['地點', '台北 第一教室'],
    ['費用', '1,200 元'],
  ],
}

/** 確認報名對話框的內容。 */
export const ENROLL_SUMMARY = [
  ['課程', COURSE.title],
  ['日期', '12/13 下午 2 點至 5 點'],
  ['地點', '台北 第一教室'],
]

export const TOAST_FAVORITED = '已加入收藏'
export const TOAST_UNFAVORITED = '已取消收藏'
export const TOAST_ENROLLED = '報名成功，確認信已寄到你的信箱'
