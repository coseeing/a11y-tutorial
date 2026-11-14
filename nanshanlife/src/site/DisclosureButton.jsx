import { ChevronDownIcon } from '@coseeing/ui'
import { smallGreenStrokeButton } from './styles.js'

/**
 * 展開／收合按鈕（「閱讀更多」「更多」）。畫面上是文字＋箭頭，A、B 兩版外觀相同。
 *
 * 兩版的差別完全由呼叫端傳入的 a11yProps 決定：
 * - A 版：aria-labelledby（名稱包含畫面文字與關聯標題）、aria-expanded、aria-controls
 * - B 版：aria-label 為英文（「read more」「more」），沒有 aria-expanded
 *
 * DS 的 Button 不接受 aria-* 屬性，所以這裡用原生 <button> 套 DS Button 的樣式。
 */
export function DisclosureButton({ id, text, expanded, onToggle, a11yProps }) {
  return (
    <button
      id={id}
      type="button"
      onClick={onToggle}
      className={`${smallGreenStrokeButton} gap-8`}
      {...a11yProps}
    >
      {text}
      <ChevronDownIcon
        className={`w-[1.4rem] shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
      />
    </button>
  )
}
