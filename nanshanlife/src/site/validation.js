// 表單檢查。瀏覽器內建的格式檢查已用 <form noValidate> 關閉，
// 錯誤一律由頁面呈現，每位學員聽到的結果才會一致。A、B 兩版用同一套檢查與文字。

export const NAME_ERROR = '請輸入姓名'

export const EMAIL_ERROR = '請輸入 Email，例如 name@example.com'

export const DATE_ERROR = '請輸入日期，格式：YYYY/MM/DD，例如 2026/11/24'

export function isEmail(text) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())
}
