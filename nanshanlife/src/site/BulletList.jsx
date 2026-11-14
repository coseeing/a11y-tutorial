import { BULLET, bulletItem, bulletList } from './styles.js'

/**
 * A 版：真正的清單（<ul>＋<li>）。NVDA 進入時念「清單 有 N 項」，可以按 L 跳到、按「,」跳出。
 * 畫面上的「・」只是裝飾，用 aria-hidden 藏起來，清單語意已經告訴使用者這是一個項目。
 * 註：Chrome 在 list-style: none 時仍保留清單角色（Safari 不會），本工作坊使用 Chrome。
 */
export function BulletList({ items }) {
  return (
    <ul className={bulletList}>
      {items.map((item, i) => (
        <li key={i} className={bulletItem}>
          <span aria-hidden="true">{BULLET}</span>
          {item}
        </li>
      ))}
    </ul>
  )
}
