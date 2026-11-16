// 最新消息頁 A、B 兩版共用的區塊。兩版不同的部分由參數傳入。

import { Button, Card, ValidationMessage } from '@coseeing/ui'
import { useId, useState } from 'react'
import { flushSync } from 'react-dom'
import { parseDate, formatDate } from '../../site/calendar.js'
import { DisclosureButton } from '../../site/DisclosureButton.jsx'
import { TextField } from '../../site/FormField.jsx'
import { FollowedIcon, ShareIcon } from '../../site/icons.jsx'
import { PageTitle, SiteLayout } from '../../site/SiteLayout.jsx'
import { iconButton, smallGreenStrokeButton } from '../../site/styles.js'
import { ToastHost, useToast } from '../../site/toast.jsx'
import { DATE_ERROR, EMAIL_ERROR, isEmail } from '../../site/validation.js'
import { ANNOUNCEMENTS, EVENT_COLUMNS, EVENT_NOTE, EVENT_ROWS, NEWS } from './data.jsx'

// skip link 的目標：「最新消息」標題
const MAIN_TITLE_ID = 'main-title'

/**
 * 整個最新消息頁。
 * - shareButtonProps：頁首分享按鈕的無障礙屬性（A 版有名稱「分享」，B 版沒有）
 * - DialogComponent：分享對話框（A 版 DS Dialog，B 版 FakeDialog）
 * - TabsComponent：({ items }) => JSX（A 版 DS Tabs，B 版 FakeTabs）
 * - TableComponent：({ columns, rows }) => JSX（A 版 DS Table，B 版 FakeTable）
 * - links：({ brochure, source }) 中的兩個連結元素
 * - readMoreProps：(ids) => 給「閱讀更多」按鈕的無障礙屬性
 * - followIconProps：「關注講者」按下後出現的 ✓ 圖示的屬性（A 版名稱「已」，B 版沒有名稱）
 * - DateFieldComponent：「依日期查詢活動」的日期欄位＋日曆（A 版 DateField，B 版 FakeDateField）
 * - CheckboxControl：訂閱電子報的核取方塊
 * - exposeRequired、exposeError：頁尾 Email 欄位的必填、錯誤是否讓輔助科技知道（A 版 true，B 版 false）
 * - announceToast：toast 出現時要不要讓螢幕閱讀器念出（A 版 true，B 版 false）
 * - skipLink：頁面最前面要不要有「跳到主要內容」連結（A 版 true，B 版 false）
 * - newsTitleTag：消息標題的元素（A 版 'h2'，B 版 'h4'；外觀相同）
 * - ListComponent：({ items }) => JSX，公告清單（A 版 BulletList，B 版 FakeList）
 * - markLanguage：英文消息是否標示 lang（A 版 true，B 版 false）
 */
export function NewsPage({
  shareButtonProps,
  DialogComponent,
  TabsComponent,
  TableComponent,
  links,
  readMoreProps,
  followIconProps,
  DateFieldComponent,
  CheckboxControl,
  exposeRequired,
  exposeError,
  announceToast,
  skipLink,
  newsTitleTag,
  ListComponent,
  markLanguage,
}) {
  const [shareOpen, setShareOpen] = useState(false)
  const [toast, showToast] = useToast()

  // 分享對話框裡的按鈕：先關閉對話框（焦點回到分享按鈕），再用 toast 告知結果
  const share = (message, action) => () => {
    action?.()
    setShareOpen(false)
    showToast(message)
  }

  const items = [
    {
      label: '精選',
      content: (
        <div className="grid gap-20">
          {NEWS.map((item) => (
            <NewsCard
              key={item.key}
              item={item}
              links={links}
              readMoreProps={readMoreProps}
              followIconProps={followIconProps}
              TitleTag={newsTitleTag}
              lang={markLanguage ? item.lang : undefined}
            />
          ))}
        </div>
      ),
    },
    {
      label: '活動',
      content: (
        <div className="grid gap-16">
          <EventQuery DateFieldComponent={DateFieldComponent} focusOnError={exposeError} />
          <h2 className="typography-headline4 m-0 text-teal-700">近期活動一覽表</h2>
          <TableComponent columns={EVENT_COLUMNS} rows={EVENT_ROWS} />
          <p className="typography-body1 m-0">{EVENT_NOTE}</p>
        </div>
      ),
    },
    {
      label: '公告',
      content: (
        <Card padded>
          <ListComponent items={ANNOUNCEMENTS} />
        </Card>
      ),
    },
  ]

  return (
    <>
      <SiteLayout
        skipLinkTarget={skipLink ? MAIN_TITLE_ID : undefined}
        headerExtra={
          <button type="button" className={iconButton} onClick={() => setShareOpen(true)} {...shareButtonProps}>
            <ShareIcon />
          </button>
        }
        footer={
          <SubscribeForm
            CheckboxControl={CheckboxControl}
            exposeRequired={exposeRequired}
            exposeError={exposeError}
            onSuccess={() => showToast('訂閱成功')}
          />
        }
      >
        <PageTitle id={MAIN_TITLE_ID}>最新消息</PageTitle>
        <TabsComponent items={items} />
      </SiteLayout>

      <DialogComponent open={shareOpen} onClose={() => setShareOpen(false)} title="分享">
        <div className="flex flex-wrap gap-12">
          <Button
            variant="small"
            theme="greenStroke"
            onClick={share('已複製連結', () => {
              navigator.clipboard?.writeText(window.location.href).catch(() => {})
            })}
          >
            複製連結
          </Button>
          {/* 範例網站不會真的分享出去，只用 toast 告知。 */}
          <Button variant="small" theme="greenStroke" onClick={share('已分享到 Facebook（範例，沒有真的送出）')}>
            Facebook
          </Button>
          <Button variant="small" theme="greenStroke" onClick={share('已分享到 LINE（範例，沒有真的送出）')}>
            LINE
          </Button>
        </div>
      </DialogComponent>

      <ToastHost toast={toast} announce={announceToast} />
    </>
  )
}

// lang 只加在標題、摘要、全文上：卡片裡的日期與按鈕仍是中文。
function NewsCard({ item, links, readMoreProps, followIconProps, TitleTag, lang }) {
  const [expanded, setExpanded] = useState(false)
  const id = useId()
  const ids = { buttonId: `${id}-button`, titleId: `${id}-title`, contentId: `${id}-content` }

  return (
    <Card padded>
      <div className="flex flex-wrap items-start justify-between gap-12">
        <div>
          <TitleTag id={ids.titleId} lang={lang} className="typography-headline4 m-0 text-teal-700">
            {item.title}
          </TitleTag>
          <p className="typography-body2 m-0 mt-4 text-teal-300">{item.date}</p>
        </div>
        {item.followable ? <FollowButton iconProps={followIconProps} /> : null}
      </div>
      <p lang={lang} className="typography-body1 m-0 mt-12">
        {item.summary(links)}
      </p>
      <div id={ids.contentId} lang={lang} hidden={!expanded} className="mt-12 grid gap-8">
        {item.full.map((text, i) => (
          <p key={i} className="typography-body1 m-0">
            {text}
          </p>
        ))}
      </div>
      <div className="mt-16">
        <DisclosureButton
          id={ids.buttonId}
          text="閱讀更多"
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          a11yProps={readMoreProps({ ...ids, expanded })}
        />
      </div>
    </Card>
  )
}

/**
 * 「關注講者」切換按鈕（切換按鈕作法一：名稱改變）。
 * 未關注時畫面是「關注講者」，按下後前面多一個 ✓ 圖示。按鈕沒有 aria-pressed：
 * - A 版：✓ 圖示的名稱是「已」，按鈕的名稱變成「已關注講者」，NVDA 當下念出
 * - B 版：✓ 圖示沒有名稱，按鈕的名稱一直是「關注講者」，按下後沒有任何念出
 */
function FollowButton({ iconProps }) {
  const [followed, setFollowed] = useState(false)
  return (
    <button
      type="button"
      className={`${smallGreenStrokeButton} shrink-0 gap-4`}
      onClick={() => setFollowed((v) => !v)}
    >
      {followed ? <FollowedIcon {...iconProps} /> : null}
      關注講者
    </button>
  )
}

/** 「活動」面板的「依日期查詢活動」：日期欄位＋日曆按鈕＋查詢按鈕。查詢結果兩版都會念出。 */
function EventQuery({ DateFieldComponent, focusOnError }) {
  const fieldId = 'event-date'
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    const date = parseDate(value)
    if (!date) {
      flushSync(() => {
        setError(DATE_ERROR)
        setResult(null)
      })
      if (focusOnError) document.getElementById(fieldId)?.focus()
      return
    }
    const text = formatDate(date)
    const found = EVENT_ROWS.filter((row) => row.fullDate === text)
    setError(null)
    setResult(
      found.length > 0
        ? `${text} 有 ${found.length} 場活動：${found.map((row) => `${row.name}（${row.place}，剩餘名額 ${row.seats}）`).join('、')}。`
        : `${text} 沒有活動。`,
    )
  }

  return (
    <form
      noValidate
      onSubmit={submit}
      className="grid gap-12 rounded-24 border border-bg-warm-gray bg-neutral-white px-20 py-20 tablet:px-24"
    >
      {/* 刻意不用標題元素：不改變這一頁的標題結構（工作坊 B1 的示範會用 H 鍵瀏覽標題）。 */}
      <p className="typography-strong1 m-0 text-teal-700">依日期查詢活動</p>
      <div className="max-w-[36rem]">
        <DateFieldComponent id={fieldId} label="查詢日期" required value={value} onChange={setValue} error={error} />
      </div>
      <div>
        <Button type="submit" variant="small" theme="dark">
          查詢
        </Button>
      </div>
      <p role="status" className="typography-body1 m-0 empty:hidden">
        {result}
      </p>
    </form>
  )
}

/**
 * 頁尾的訂閱表單：Email 欄位＋「訂閱電子報」核取方塊＋「訂閱」按鈕。
 * 檢查順序：Email（留空或格式不對 → 欄位錯誤）→ 核取方塊（沒勾 → 提示文字）→ 成功（toast）。
 */
function SubscribeForm({ CheckboxControl, exposeRequired, exposeError, onSuccess }) {
  const emailId = 'subscribe-email'
  const [email, setEmail] = useState('')
  const [checked, setChecked] = useState(false)
  const [emailError, setEmailError] = useState(null)
  const [uncheckedMessage, setUncheckedMessage] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!isEmail(email)) {
      // 先讓錯誤顯示出來，再移動焦點（A 版），念到的才是最新的內容
      flushSync(() => {
        setEmailError(EMAIL_ERROR)
        setUncheckedMessage(false)
      })
      if (exposeError) document.getElementById(emailId)?.focus()
      return
    }
    setEmailError(null)
    if (!checked) {
      setUncheckedMessage(true)
      return
    }
    setUncheckedMessage(false)
    onSuccess()
  }

  return (
    <form noValidate onSubmit={submit} className="grid gap-12">
      <div className="max-w-[36rem]">
        <TextField
          id={emailId}
          label="Email"
          type="email"
          autoComplete="email"
          required
          exposeRequired={exposeRequired}
          value={email}
          onChange={setEmail}
          error={emailError}
          exposeError={exposeError}
        />
      </div>
      <div className="flex flex-wrap items-center gap-16">
        <CheckboxControl
          checked={checked}
          onChange={(value) => {
            setChecked(value)
            setUncheckedMessage(false)
          }}
          label="訂閱電子報"
        />
        <Button type="submit" variant="small" theme="dark">
          訂閱
        </Button>
      </div>
      {/* 一直存在的 live region，訊息出現時螢幕閱讀器才念得出來（DS Field 的作法）。兩版相同。 */}
      <div aria-live="polite">
        {uncheckedMessage ? (
          <ValidationMessage variant="danger" announce={false}>
            請先勾選訂閱電子報。
          </ValidationMessage>
        ) : null}
      </div>
    </form>
  )
}
