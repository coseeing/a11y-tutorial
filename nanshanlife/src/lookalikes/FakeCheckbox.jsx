// ⚠️ B 版專用：刻意做壞的「核取方塊」。不要修好它。
//
// 外觀模仿 DS Checkbox（原生 <input type="checkbox">，accent-color 為 teal）在 Chrome
// 上的樣子：方框圖示加文字。但它只是 <span>：
//   - 沒有 checkbox 角色 → NVDA 只念出文字，不知道可以勾選
//   - 沒有 aria-checked → 勾選後畫面打勾，NVDA 卻什麼都不念，不知道有沒有勾到
//
// 對應教材 4-2：重點 7、8「方框圖示加文字，沒有角色，也沒有核取狀態」。
//
// 刻意「修好一半」：加了 tabindex 與空白鍵處理，Tab 到得了、空白鍵勾得了。
// 4-2 活動時學員只會用 Tab，若 Tab 跳不到，發現的會變成「鍵盤到不了」，
// 而不是本段要教的角色與狀態。這也是真實網站常見的錯誤：補了鍵盤操作，忘了角色和狀態。
// （開著 NVDA 時，瀏覽模式下的空白鍵由 NVDA 轉成點擊，走的是 onClick。）

import { CheckMarkIcon } from '../site/icons.jsx'

export function FakeCheckbox({ checked, onChange, label, className = '' }) {
  return (
    <span
      tabIndex={0}
      onClick={() => onChange(!checked)}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault() // 不要捲動頁面
          onChange(!checked)
        }
      }}
      className={`typography-body1 group inline-flex cursor-default select-none items-center gap-8 text-teal-700 focus:outline-none ${className}`}
    >
      <span
        className={
          // 焦點樣式同 DS Checkbox：focus-visible 時方框外圍一圈橘色
          'inline-flex size-16 shrink-0 items-center justify-center rounded-[0.3rem] border group-focus-visible:ring-2 group-focus-visible:ring-orange-PRIMARY group-focus-visible:ring-offset-2 ' +
          (checked
            ? 'border-teal-PRIMARY bg-teal-PRIMARY text-neutral-white'
            : 'border-[#767676] bg-neutral-white')
        }
      >
        {checked ? <CheckMarkIcon className="size-[1.4rem]" /> : null}
      </span>
      {label}
    </span>
  )
}
