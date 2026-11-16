// 最新消息頁的文字內容。A、B 兩版讀同一份資料，確保文字完全一致。

export const BROCHURE = {
  href: '../../files/活動簡章.pdf',
  fileName: '活動簡章.pdf',
  // 描述（A 版才有）
  description: '活動簡章.pdf，200KB',
}

// 消息來源（主辦單位公告頁）。B 版的連結文字就是這個網址的完整絕對網址，
// 在執行時依實際部署位置產生，例如 https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/notice/?id=…
export const SOURCE_PATH = '../../notice/?id=2026-year-end-lecture&from=news&utm_source=haohaoxue&utm_medium=news'

export function absoluteUrl(path) {
  return new URL(path, window.location.href).href
}

/**
 * 三則消息。summary 是函式：A、B 兩版傳入各自的「活動簡章」與「消息來源」連結，
 * 其餘文字共用。
 */
export const NEWS = [
  {
    key: 'year-end',
    // 這則消息的標題旁有「關注講者」按鈕（工作坊 B2 示範）
    followable: true,
    title: '年終講座開放報名',
    date: '2026/11/10',
    summary: ({ brochure, source }) => (
      <>
        年度最受歡迎的年終講座 12 月 6 日在台北登場，名額有限，請先閱讀{brochure}再報名。詳細資訊請見{source}。
      </>
    ),
    full: [
      '今年的年終講座邀請三位在數位產業深耕多年的講者，分享這一年的觀察與明年的趨勢。講座結束後安排交流時間，歡迎帶著問題來和講者聊聊。',
      '時間：12 月 6 日（六）下午 2 點至 5 點。地點：台北市好好學教室。費用：學員免費，非學員 300 元。',
    ],
  },
  {
    key: 'guest-lecture',
    // 英文消息：A 版的標題、摘要、全文標示 lang="en"，B 版沒有標示。
    lang: 'en',
    title: 'Guest Lecture: Designing for Everyone',
    date: '2026/11/05',
    summary: () => (
      <>
        Our guest speaker shares practical ways to design products that everyone can use, including people who rely on
        screen readers. The lecture is in English with live Chinese captions.
      </>
    ),
    full: [
      'Date: Saturday, November 29, from 2 to 4 p.m. Location: online. The link will be emailed to you after you register.',
      'The lecture is free for all members. A recording will be available in My Courses one week after the event.',
    ],
  },
  {
    key: 'winter-courses',
    title: '冬季新課程上架',
    date: '2026/11/03',
    summary: () => <>冬季共有 12 門新課程上架，涵蓋設計、寫作與資料分析，即日起開放試看第一堂。</>,
    full: [
      '本季新課程包含「從零開始的介面設計」、「好讀的文章怎麼寫」、「用試算表做資料分析」等，每門課都有完整的字幕與文字稿。',
      '試看第一堂不需要登入，完整課程購買後可以無限次觀看。',
    ],
  },
  {
    key: 'app',
    title: '好好學 App 新版上線',
    date: '2026/10/30',
    summary: () => <>新版 App 支援離線下載課程與調整播放速度，通勤時也能輕鬆學習。</>,
    full: [
      '下載的課程可以在 App 內離線觀看 30 天，到期後連上網路即可自動續期。播放速度可以在 0.5 倍到 2 倍之間調整。',
      '請到 App Store 或 Google Play 更新到 5.0 版以上。',
    ],
  },
  {
    key: 'teachers',
    title: '2027 年講師招募開跑',
    date: '2026/10/20',
    summary: () => <>想把專業分享給更多人嗎？好好學正在招募 2027 年的新講師，歡迎各領域的專家報名。</>,
    full: [
      '我們會協助講師規劃課程大綱、拍攝與剪輯，並提供字幕與文字稿製作服務。',
      '報名截止日為 12 月 15 日，入選者將在 1 月收到通知。',
    ],
  },
]

export const EVENT_COLUMNS = [
  { key: 'date', label: '日期', width: '20%' },
  { key: 'name', label: '活動名稱', width: '35%' },
  { key: 'place', label: '地點', width: '20%' },
  { key: 'seats', label: '剩餘名額', width: '25%' },
]

// fullDate：「依日期查詢活動」比對用的完整日期（表格不顯示）。
export const EVENT_ROWS = [
  { date: '12/6', fullDate: '2026/12/06', name: '年終講座', place: '台北', seats: '3' },
  { date: '12/13', fullDate: '2026/12/13', name: '設計工作坊', place: '台中', seats: '10' },
  { date: '12/20', fullDate: '2026/12/20', name: '讀書會', place: '線上', seats: '25' },
  { date: '12/27', fullDate: '2026/12/27', name: '無障礙入門講座', place: '高雄', seats: '15' },
  { date: '1/10', fullDate: '2027/01/10', name: '寫作工作坊', place: '台北', seats: '8' },
  { date: '1/17', fullDate: '2027/01/17', name: '資料分析讀書會', place: '線上', seats: '30' },
]

export const EVENT_NOTE =
  '活動報名說明：每場活動每人限報名一次。報名後若無法出席，請在活動前三天取消，讓其他學員遞補。名額額滿時，可以登記候補。'

// 公告：A 版是真正的清單，B 版是一行一行以「・」開頭的文字。
export const ANNOUNCEMENTS = [
  '系統維護：11 月 20 日（四）凌晨 2 點至 4 點進行系統維護，期間暫停課程播放與購買服務。',
  '電子發票改版：自 12 月起，購課的電子發票改寄到會員信箱，也可以在「我的帳戶」查詢。',
  '客服時間調整：自 12 月起，客服專線的服務時間改為週一至週五上午 9 點至下午 6 點。',
  '隱私權政策更新：隱私權政策將於 12 月 1 日更新，主要調整個人資料的保存期間。',
]
