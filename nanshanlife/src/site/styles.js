// 共用的 class 字串。
//
// DS 的 Button 只接受固定幾個 props，不能加 aria-expanded、aria-label 等屬性。
// 需要這些屬性的按鈕改用原生 <button>，並套用下面這些從
// coseeing-ui/src/components/Button/Button.tsx 複製來的 class，
// 外觀才會和 DS Button 一致。DS 更新樣式時，這裡要跟著更新。

const buttonBase =
  'typography-strong1 inline-flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'

/** DS Button：variant="small" theme="greenStroke" */
export const smallGreenStrokeButton = `${buttonBase} cursor-pointer rounded-8 px-16 py-8 bg-transparent text-teal-PRIMARY ring-1 ring-inset ring-teal-PRIMARY hover:bg-neutral-beige-gray focus-visible:bg-neutral-beige-gray focus-visible:ring-2 focus-visible:ring-orange-PRIMARY`

/** 只有圖示的按鈕（分享、下載）。DS 沒有這種按鈕，沿用 DS 的 token 自製。 */
export const iconButton =
  'inline-flex size-40 shrink-0 cursor-pointer items-center justify-center rounded-8 border-0 bg-transparent p-0 text-teal-PRIMARY transition-colors hover:bg-neutral-beige-gray focus-visible:bg-neutral-beige-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY'

/** 內文中的連結。DS 的 base.css 只設定顏色，preflight 會拿掉底線，這裡補回來。 */
export const textLink =
  'text-teal-PRIMARY underline underline-offset-4 hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY rounded-[0.2rem]'

/**
 * 以「・」開頭的條列（A 版真正的清單、B 版仿製清單共用，外觀才會一致）。
 * 懸掛縮排：第二行以後對齊第一行的文字。1.1em ＝「・」的寬度 1em ＋ typography 的字距 0.1em。
 */
export const bulletList = 'm-0 grid list-none gap-8 p-0'
export const bulletItem = 'typography-body1 m-0 pl-[1.1em] indent-[-1.1em]'
export const BULLET = '・'

/**
 * DS Input 出錯時的紅框（複製自 coseeing-ui/src/components/Input/Input.tsx 的 invalidStyles）。
 * B 版用：只要紅框的外觀，不要 DS Input 的 invalid 屬性附帶的 aria-invalid。
 */
export const inputInvalidLook = 'border-red-PRIMARY focus:border-red-PRIMARY focus-visible:ring-red-PRIMARY'
