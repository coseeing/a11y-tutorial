import PracticeLayout from "./test-practice/layout"
import PracticePage from "./test-practice/page"

export { metadata } from "./test-practice/page"

export default function HomePage() {
  return <PracticeLayout><PracticePage /></PracticeLayout>
}
