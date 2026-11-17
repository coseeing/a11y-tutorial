import { InstructorsPage } from './InstructorsParts.jsx'

// 刻意埋設的四個地雷：1.4.1／1.3.3 色彩與知覺特徵、1.4.4 文字放大、
// 1.4.10 流動排版、1.3.1 標題與地標（輔以 2.4.1 跳過區塊）。
// 外框、狀態文字與標題由 accessible 控制；裁切與固定寬度見 InstructorsParts.jsx 的條件式 class。
// 不使用 SiteLayout，避免自動補上 <main> 而掩蓋練習中的結構問題。
export default function InstructorsB() {
  return <InstructorsPage accessible={false} />
}
