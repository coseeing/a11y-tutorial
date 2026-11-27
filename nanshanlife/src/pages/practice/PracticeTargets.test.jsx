import { readFileSync } from 'node:fs'
import { render, screen } from '@testing-library/react'
import { computeAccessibleName } from 'dom-accessibility-api'
import { describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import NavigationPracticePage from './NavigationPracticePage.jsx'
import HeadingsPracticePage from './HeadingsPracticePage.jsx'
import RemindersPracticePage from './RemindersPracticePage.jsx'

describe('Freego practice targets', () => {
  it('provides named links and equivalent image text in version A', () => {
    const { container } = render(<NavigationPracticePage variant="a" />)
    expect(computeAccessibleName(container.querySelector('#practice-course-link'))).toBe('前往課程內容')
    expect(container.querySelector('#practice-course-link')).toHaveAttribute('href', expect.stringContaining('/a/test-practice/2/'))
    expect(container.querySelector('#practice-poster').getAttribute('alt')).toContain('09:30–15:30')
    expect(container.querySelector('#practice-news-decoration')).not.toHaveAttribute('title')
  })
  it('names the image button and embedded content in version A', () => {
    const { container } = render(<HeadingsPracticePage variant="a" />)
    expect(container.querySelector('#practice-summary-button')).toHaveAttribute('alt', '查看課程摘要')
    expect(container.querySelector('#practice-venue-frame')).toHaveAttribute('title', '活動中心位置示意')
  })
  it('labels the field and its group in version A', () => {
    const { container } = render(<RemindersPracticePage variant="a" />)
    expect(screen.getByRole('textbox', { name: '姓名' })).toBeInTheDocument()
    expect(container.querySelector('#practice-skills').firstElementChild.tagName).toBe('LEGEND')
    expect(screen.getByRole('link', { name: '回到活動導覽' })).toHaveAttribute('href', expect.stringContaining('/a/test-practice/1/'))
  })
  it('preserves the three distinct image and link failures on page 1', () => {
    const { container } = render(<NavigationPracticePage />)
    expect(computeAccessibleName(container.querySelector('#practice-course-link'))).toBe('')
    expect(screen.getByRole('link', { name: '前往交通資訊' })).toHaveAttribute('href', '#workshop-travel')
    expect(container.querySelector('#practice-poster')).not.toHaveAttribute('alt')
    expect(container.querySelector('#practice-news-decoration')).toHaveAttribute('alt', '')
    expect(container.querySelector('#practice-news-decoration')).toHaveAttribute('title')
  })
  it('keeps the empty document title, unnamed image input and unnamed iframe on page 2', () => {
    const html = readFileSync('test-practice/2/index.html', 'utf8')
    expect(html).toMatch(/<title>\s*<\/title>/)
    const { container } = render(<HeadingsPracticePage />)
    expect(container.querySelector('#practice-summary-button')).toHaveAttribute('type', 'image')
    expect(container.querySelector('#practice-summary-button')).not.toHaveAttribute('alt')
    expect(container.querySelector('#practice-venue-frame')).not.toHaveAttribute('title')
    expect(container.querySelectorAll('h4')).toHaveLength(0)
    for (const table of container.querySelectorAll('table')) expect(table.querySelectorAll('th[scope="col"]')).toHaveLength(3)
    expect(screen.getByRole('img', { name: 'Coseeing' })).toBeInTheDocument()
  })
  it('keeps missing page language, missing input label and missing fieldset legend on page 3', () => {
    const html = readFileSync('test-practice/3/index.html', 'utf8')
    expect(html.match(/<html\b[^>]*>/)[0]).not.toMatch(/\blang=/)
    const { container } = render(<RemindersPracticePage />)
    expect(computeAccessibleName(container.querySelector('#practice-name'))).toBe('')
    expect(container.querySelector('#practice-skills legend')).toBeNull()
    expect(container.querySelectorAll('#practice-skills input[type="checkbox"]')).toHaveLength(2)
    expect(screen.getByRole('textbox', { name: '電子信箱' })).toHaveAccessibleDescription('僅用於通知課程異動。')
  })
  it('keeps the summary, afternoon tabs and registration usable', async () => {
    const user = userEvent.setup()
    const classes = render(<HeadingsPracticePage />)
    await user.click(screen.getByRole('tab', { name: '下午場' }))
    expect(screen.getByRole('cell', { name: '衣物修補' })).toBeVisible()
    await user.click(document.getElementById('practice-summary-button'))
    expect(screen.getByRole('status')).toHaveTextContent('木製品修繕與衣物修補')
    classes.unmount()
    render(<RemindersPracticePage />)
    await user.type(document.getElementById('practice-name'), '練習學員')
    await user.type(screen.getByRole('textbox', { name: '電子信箱' }), 'student@example.com')
    await user.click(screen.getByRole('checkbox', { name: '我已確認報到資訊與要帶的物品' }))
    await user.click(screen.getByRole('button', { name: '送出模擬報名' }))
    expect(screen.getByRole('status')).toHaveTextContent('已完成模擬報名。')
  })
})
