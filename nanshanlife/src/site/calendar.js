// 日期欄位與日曆共用的日期計算與文字。A 版（DateField）與 B 版（FakeDateField）都用這一份，
// 確保兩版的日期格式、月份標題完全一致。

export const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

export const DATE_PLACEHOLDER = 'YYYY/MM/DD'

/** 格式提示。A 版以 aria-describedby 念出；B 版只有 placeholder。 */
export const DATE_HINT = '格式：YYYY/MM/DD，例如 2026/11/24'

export function today() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

/** 解析「2026/11/24」（也接受 2026-11-24、2026/1/5）。不是有效日期時回傳 null。 */
export function parseDate(text) {
  const match = /^\s*(\d{4})[/-](\d{1,2})[/-](\d{1,2})\s*$/.exec(text ?? '')
  if (!match) return null
  const [year, month, day] = match.slice(1).map(Number)
  const date = new Date(year, month - 1, day)
  // new Date(2026, 1, 31) 會變成 3 月 3 日，要擋掉
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null
  return date
}

export function formatDate(date) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`
}

export function sameDay(a, b) {
  return Boolean(a && b) && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}

/** 加減月份；目標月份沒有這一天時（例如 1/31 加一個月），停在該月最後一天。 */
export function addMonths(date, months) {
  const first = new Date(date.getFullYear(), date.getMonth() + months, 1)
  const lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  return new Date(first.getFullYear(), first.getMonth(), Math.min(date.getDate(), lastDay))
}

/** 日曆上方的月份標題，例如「2026年11月」。 */
export function monthTitle(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`
}

/** A 版每個日期格的名稱，例如「24 星期二 2026年11月」。 */
export function dayLabel(date) {
  return `${date.getDate()} 星期${WEEKDAYS[date.getDay()]} ${monthTitle(date)}`
}

/** 某個月的各週（週日開始）；不屬於這個月的格子是 null。 */
export function monthWeeks(month) {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const days = new Date(year, monthIndex + 1, 0).getDate()
  const cells = Array(new Date(year, monthIndex, 1).getDay()).fill(null)
  for (let day = 1; day <= days; day++) cells.push(new Date(year, monthIndex, day))
  while (cells.length % 7 !== 0) cells.push(null)
  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}
