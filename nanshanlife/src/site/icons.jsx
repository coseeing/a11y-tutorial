// DS 沒有提供的圖示。比照 DS Icons 的作法：使用 currentColor、aria-hidden，
// 由使用的元件決定名稱。

export function ShareIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" {...props}>
      <circle cx="18" cy="5" r="2.75" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="2.75" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="2.75" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.4 10.7l7.2-4.2M8.4 13.3l7.2 4.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export function DownloadIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3.5v11m0 0l-4.5-4.5M12 14.5l4.5-4.5M4.5 16.5v2.25c0 .97.78 1.75 1.75 1.75h11.5c.97 0 1.75-.78 1.75-1.75V16.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** 仿製核取方塊用的勾勾。 */
export function CheckMarkIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 8.5l3.25 3.25L13 4.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
