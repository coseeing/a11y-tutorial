import { InstructorsPage } from './InstructorsParts.jsx'

// 刻意埋設的五個地雷：1.4.1 色彩、1.3.3 知覺特徵、1.4.4 文字放大、
// 1.4.10 流動排版、1.3.1 標題層次。
// 狀態文字、操作指示、標題與排版由 accessible 控制；兩版均提供 main 與跳到主要內容連結。
export default function InstructorsB() {
  return <InstructorsPage accessible={false} />
}
