// 課程場次頁的文字內容。A、B 兩版讀同一份資料，確保文字完全一致。

export const SESSION_COLUMNS = [
  { key: 'date', label: '日期', width: '20%' },
  { key: 'time', label: '時段', width: '20%' },
  { key: 'room', label: '地點', width: '30%' },
  { key: 'seats', label: '剩餘名額', width: '30%' },
]

export const SESSIONS = [
  {
    label: '台北場',
    rows: [
      { date: '11/15', time: '上午', room: '第一教室', seats: '8' },
      { date: '11/15', time: '下午', room: '第一教室', seats: '15' },
      { date: '11/29', time: '上午', room: '第二教室', seats: '0' },
      { date: '11/29', time: '下午', room: '第二教室', seats: '5' },
      { date: '12/13', time: '上午', room: '第一教室', seats: '20' },
      { date: '12/13', time: '下午', room: '第一教室', seats: '11' },
    ],
  },
  {
    label: '台中場',
    rows: [
      { date: '11/22', time: '上午', room: '第一教室', seats: '12' },
      { date: '11/22', time: '下午', room: '第二教室', seats: '3' },
      { date: '11/29', time: '上午', room: '第一教室', seats: '0' },
      { date: '11/29', time: '下午', room: '第一教室', seats: '7' },
      { date: '12/20', time: '上午', room: '第二教室', seats: '18' },
      { date: '12/20', time: '下午', room: '第二教室', seats: '9' },
    ],
  },
  {
    label: '高雄場',
    rows: [
      { date: '12/6', time: '上午', room: '大講堂', seats: '20' },
      { date: '12/6', time: '下午', room: '大講堂', seats: '6' },
      { date: '12/13', time: '上午', room: '第三教室', seats: '10' },
      { date: '12/13', time: '下午', room: '第三教室', seats: '4' },
      { date: '12/27', time: '上午', room: '大講堂', seats: '25' },
      { date: '12/27', time: '下午', room: '大講堂', seats: '0' },
    ],
  },
]

// 報名須知：A 版是真正的清單，B 版是一行一行以「・」開頭的文字。
export const NOTICE_TITLE = '報名須知'

export const NOTICE_ITEMS = [
  '每人限報一場。',
  '報名後三天內完成繳費。',
  '額滿後開放候補。',
  '開課前三天寄發上課通知。',
  '如需取消，請在開課前三天辦理，逾期恕不退費。',
  '上課當天請攜帶報名確認信報到。',
]

// 注意事項：一段中文、一段英文。A 版的英文段落標示 lang="en"，B 版沒有標示。
export const REMARKS_TITLE = '注意事項'

export const REMARKS_ZH = '課程以中文進行，現場提供英文講義。教室備有電源與無線網路，請自備筆電。'

export const REMARKS_EN =
  'All sessions are taught in Mandarin. English handouts are available on site. Power outlets and Wi-Fi are provided, so please bring your own laptop.'
