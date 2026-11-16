# 工作坊 A（4）、B（1）～（3）範例頁設計文件

日期：2026-11-10（2026-11-16 新增工作坊 B（2）、B（3）：4.2 節的新增元件、4.6 至 4.8 節）
對應教材：`../04-鍵盤、焦點與螢幕閱讀器-規劃.md` 附錄 A（活動 4、活動 5 與 4-2、4-3 講解示範使用的範例頁）

## 1. 目標與範圍

依附錄 A 規格，製作虛構網站「好好學」線上課程平台的三個範例頁，每頁各有 A 版（良好）與 B 版（有問題），共六頁。學員在自己的電腦上用 NVDA 開啟操作。

- **範圍內**：最新消息頁、服務條款頁、課程場次頁的 A／B 版；講師索引頁；兩個輔助頁（主辦單位公告、完成頁）。
- **範圍外**：4-1（使用 Windows 11 內建行事曆，不需要網頁）；短網址與 QR code。部署網址已確定為 `https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/`，索引頁會顯示各頁的完整網址，可據此製作短網址與 QR code。

**原則**：A、B 兩版的外觀與文字相同，差別只在輔助科技讀到的資訊。例外有兩個：4.1 節「連結文字」，以及瀏覽器分頁上的頁面標題（見 2.3 節）。

## 2. 技術架構

### 2.1 專案

- Vite 8 + React 19（JavaScript），**多頁應用**：每個頁面有自己的 HTML 入口。
  - 理由：每頁都是真正的頁面載入，NVDA 會念出頁面標題並從頁首開始讀，行為與真實網站一致；放到任何靜態主機都能直接開，不需要路由設定。
- `base: '/a11y-tutorial/11512-nanshanlife/'`：部署在 `https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/`，開發伺服器也使用同一路徑。部署路徑改變時要一併修改。頁面之間的連結都用相對路徑（`../../done/`），不受 base 影響。
- 所有頁面 `<html lang="zh-Hant">`。

### 2.2 Coseeing UI design system

- 原始碼 clone 在 `../coseeing-ui`，本機 build，專案以 `"@coseeing/ui": "file:../coseeing-ui"` 引用。
  - 理由：套件發佈在 GitHub Packages，安裝需要 token；採本機 build 後上傳靜態檔，不需要 token。
- 開發環境直接在 Windows 上，不使用 Docker。
- **Windows build 問題**：`npm run build` 的最後一步 `build:css`（`scripts/build-css.mjs`）用 `execFileSync("npx", …)` 編譯 `dist/styles.css`，在 Windows 上會失敗。本專案採 Path B，用不到 `styles.css`，只需要四個原始 CSS 檔，所以不修改 repo，改為：
  1. `npm run build:js && npm run build:types`（在 Windows 上正常）。
  2. 把 `src/styles/` 的 `theme.css`、`tokens.css`、`base.css`、`typography.css` 複製到 `dist/`。

  README 會記錄這兩步。
- 樣式採 README 的 **Path B**（專案本身也用 Tailwind，相對於 Path A 引入預先編譯的 `styles.css`）：專案自己跑 Tailwind v4（`@tailwindcss/vite`），由專案的 Tailwind 一起編譯 design system 的 token 與元件 class。CSS 入口為：
  ```css
  @import "tailwindcss";
  @import "@coseeing/ui/theme.css";
  ```
  自製元件因此可直接使用同一套 token（`bg-teal-PRIMARY`、`typography-body1`、`px-16` 等）。
- Vite 設定 `resolve.dedupe: ['react', 'react-dom']`：`file:` 引用為 symlink，否則會載入兩份 React，讓 `Tabs` 等使用 hooks 的元件出錯。
- 字型：由 Google Fonts 載入 Noto Sans TC（design system 只指定字型名稱）。

### 2.3 網址與頁面標題

網址皆相對於部署路徑 `/a11y-tutorial/11512-nanshanlife/`。

| 網址 | 內容 | A 版 `<title>` | B 版 `<title>` |
|---|---|---|---|
| `/` | 講師索引頁 | 工作坊範例索引 | — |
| `/a/news/`、`/b/news/` | 最新消息頁 | 最新消息 - 好好學 | 好好學 |
| `/a/terms/`、`/b/terms/` | 服務條款頁 | 服務條款 - 好好學 | 好好學 |
| `/a/sessions/`、`/b/sessions/` | 課程場次頁 | 課程場次 - 好好學 | 好好學 |
| `/a/course/`、`/b/course/` | 課程詳情頁（B2 活動 6） | 無障礙設計入門 - 好好學 | 好好學 |
| `/a/trial/`、`/b/trial/` | 預約試聽頁（B3 活動 7） | 預約試聽 - 好好學 | 好好學 |
| `/notice/` | 主辦單位公告（A、B 共用） | 主辦單位公告 - 好好學 | — |
| `/done/` | 同意服務條款後的完成頁（A、B 共用） | 註冊完成 - 好好學 | — |

- B 版的頁面標題刻意只有網站名稱「好好學」（教材 4-3 重點 3：頁面標題），按 NVDA＋T 分不出是哪一頁。三個 B 版頁面都一樣，符合簡報「每頁都叫『好好學』」的說法。
- 畫面內容 A、B 兩版相同，學員只能從網址分辨版本。

### 2.4 程式碼組織

```
nanshanlife/
  index.html                 講師索引頁
  a/news/index.html  …       各頁 HTML 入口（a/、b/ 各三頁）
  notice/index.html
  done/index.html
  public/files/              兩個 PDF 佔位檔
  scripts/                   產生 PDF 佔位檔的腳本
  src/
    entries/                 每個 HTML 對應的入口（掛載頁面元件）
    site/                    共用外框（頁首「好好學」、頁尾）、自製圖示、共用按鈕與表單、A 版清單（BulletList）
    pages/
      news/                  NewsA.jsx、NewsB.jsx、NewsParts.jsx（兩版共用區塊）、data.jsx
      terms/                 TermsA.jsx、TermsB.jsx、TermsParts.jsx、data.jsx
      sessions/              SessionsA.jsx、SessionsB.jsx、SessionsParts.jsx、data.js
      course/                CourseA.jsx、CourseB.jsx、CourseParts.jsx、data.js
      trial/                 TrialA.jsx、TrialB.jsx、TrialParts.jsx
      other/                 講師索引頁、主辦單位公告、完成頁
    lookalikes/              B 版專用的仿製元件（分頁、表格、核取方塊、清單、對話框、日期欄位＋日曆、單選群組）
```

- `*Parts.jsx` 放兩版共用的版面與文字；`*A.jsx`、`*B.jsx` 只傳入兩版不同的元件與屬性，A、B 的差異集中在這兩個檔案。

- 文字內容放在各頁的 `data.js`，A、B 兩版讀同一份，確保文字一致。
- `lookalikes/` 的每個檔案開頭以註解說明刻意拿掉了什麼、對應教材哪個重點，避免日後被當成 bug 修掉。

## 3. Design system 的使用與限制

| DS 元件 | 用法 |
|---|---|
| `Container`、`Card` | 所有頁面的版面與消息卡片 |
| `Tabs` | A 版的消息分類、場次分頁（具備 APG 鍵盤操作、`aria-selected`） |
| `Table` | A 版的近期活動一覽表、場次表（`<th scope="col">`） |
| `Checkbox` | A 版的訂閱電子報、同意服務條款 |
| `Button` | 不需要 `aria-*` 的按鈕：「訂閱」「同意並繼續」 |
| `Link` | 一般連結（會把 props 傳給 `<a>`） |
| `ValidationMessage` | 未勾選同意時的提示 |
| `ChevronDownIcon` | 展開按鈕的箭頭、日曆的上個月／下個月 |
| `Dialog` | A 版的分享對話框、確認報名對話框（原生 `<dialog>`＋`showModal()`） |
| `Input` | 姓名、Email、日期欄位（會把 `aria-*`、`role` 傳給 `<input>`） |

**限制與因應**

- `Button` 的 props 是白名單，不接受 `aria-*` 屬性。需要 `aria-expanded`、`aria-label`、`aria-labelledby` 的按鈕，改用原生 `<button>`，並套用 `Button` 原本的 class，外觀完全一致。
- `Accordion` 不適用：它用 `<details>/<summary>`，整個標題列就是按鈕；教材的結構是「標題＋另一個『更多』按鈕」，B 版也無法拿掉它的狀態。展開按鈕改為自製。
- `Toast` 不使用：它把 `role="status"` 放在 toast 本身，連同 role 一起動態插入的 live region 不一定念得出來，也做不出拿掉語意的 B 版。改為自製 `ToastHost`（`src/site/toast.jsx`，外觀 class 複製自 DS Toast）：外層容器一直存在，A 版有 `role="status"`，B 版沒有。
- DS 沒有日期選擇器與單選按鈕：日曆自製（`src/site/CalendarShell.jsx` 為兩版共用的外觀），單選用原生 radio。
- DS 沒有分享、下載圖示，也沒有仿製核取方塊的方框。這些自製 SVG 圖示的風格比照 DS 圖示（`currentColor`、`aria-hidden`）。

## 4. 各頁元件規格

### 4.1 共通規則

- **描述**：用 `aria-describedby` 指向隱藏文字（畫面不顯示，兩版外觀相同）。「開啟新分頁」依教材使用 `title`（提示文字）。
- **連結文字（頁面內容中外觀不同的唯一例外）**：B 版的消息來源連結、消費者保護法連結，畫面上也顯示完整網址。這是真實網站常見的錯誤；所以頁面內容只有這兩處兩版看起來不同（另外瀏覽器分頁上的頁面標題也不同，見 2.3 節）。
- **B 版仿製元件**：只有 `onClick`，沒有 role、狀態，不在 Tab 順序中（仿製核取方塊例外，見下）。NVDA 在瀏覽模式下可能會念「可點擊」，按 Enter 也可能觸發點擊（NVDA 會對有 onClick 的元素送出點擊）。這與真實網站一致，不刻意擋掉，以實測為準。
- **仿製核取方塊**：盡量接近 Chrome 原生核取方塊的外觀（16px、圓角、teal 填色），不同瀏覽器可能有些微差異。滑鼠點選會切換打勾的外觀。
  - **刻意修好一半**：加了 `tabindex="0"` 與空白鍵處理，Tab 到得了、空白鍵勾得了，但仍沒有 role 與 `aria-checked`。4-2 活動時學員只會用 Tab，若 Tab 跳不到，發現的會變成「鍵盤到不了」，而不是角色與狀態的問題。焦點樣式同 DS Checkbox（方框外圍橘色 ring）。

### 4.2 最新消息頁（`/a/news/`、`/b/news/`）

結構：頁首（網站名稱、分享圖示）→ `<h1>` 最新消息 → 消息分類索引標籤（精選／活動／公告，預設「精選」）→ 頁尾（訂閱電子報）。

- 「精選」面板：五則消息卡片（年終講座開放報名、Guest Lecture: Designing for Everyone、冬季新課程上架、好好學 App 新版上線、2027 年講師招募開跑），各有標題、日期、摘要與「閱讀更多」按鈕（展開全文）。「年終講座開放報名」的摘要中有「活動簡章」下載連結與消息來源連結；「Guest Lecture」是英文消息，標題、摘要、全文都是英文。
- 「活動」面板：`<h2>` 近期活動一覽表（兩版相同）＋表格，下方接「活動報名說明」文字。
- 「公告」面板：一張卡片，內有四則以「・」開頭的公告。

| 元件 | A 版 | B 版 |
|---|---|---|
| 分享圖示 | `<button aria-label="分享">`＋自製分享圖示 | 同樣的 `<button>`，沒有名稱 → 念「按鈕」 |
| 消息分類 | DS `Tabs`（`label="消息分類"`） | 仿製分頁：外觀相同的 `<div>`，只有 onClick |
| 閱讀更多 | 套用 DS Button 樣式的 `<button>`；`aria-labelledby`＝按鈕本身＋消息標題 → 「閱讀更多 年終講座開放報名」；`aria-expanded` 隨展開切換 | `aria-label="read more"`，沒有 `aria-expanded` |
| 活動簡章 | DS `Link` 下載 PDF；描述「活動簡章.pdf，200KB」 | 沒有描述 |
| 消息來源 | 連結文字「主辦單位公告」；`target="_blank"`；`title="開啟新分頁"`；連到 `/notice/` | 連結文字為完整網址（見下）；開新分頁但沒有提示 |
| 近期活動一覽表 | DS `Table`，第一列為欄標題 | 仿製表格：CSS grid 的 `<div>`，套同樣的 class，沒有表格語意 |
| 訂閱電子報 | DS `Checkbox`＋DS `Button`「訂閱」 | 仿製核取方塊＋DS `Button`「訂閱」 |
| 消息標題 | `<h2>` | `<h4>`（從層級 1 跳號），class 相同所以外觀相同 |
| 公告列表 | `BulletList`：`<ul>`＋`<li>`，「・」以 `aria-hidden` 隱藏 → 「清單 有 4 項」 | `FakeList`：一行一行以「・」開頭的 `<p>`，沒有清單語意 |
| 英文消息 | 標題、摘要、全文標示 `lang="en"`（日期與「閱讀更多」仍為中文） | 沒有標示語言 |
| 頁面標題 | 「最新消息 - 好好學」 | 「好好學」 |

- B 版消息來源的網址在執行時依部署位置產生，例如 `https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/notice/?id=2026-year-end-lecture&from=news&utm_source=haohaoxue&utm_medium=news`，長度足以體會「一長串網址被逐字念出」。

近期活動一覽表內容：

| 日期 | 活動名稱 | 地點 | 剩餘名額 |
|---|---|---|---|
| 12/6 | 年終講座 | 台北 | 3 |
| 12/13 | 設計工作坊 | 台中 | 10 |
| 12/20 | 讀書會 | 線上 | 25 |
| 12/27 | 無障礙入門講座 | 高雄 | 15 |
| 1/10 | 寫作工作坊 | 台北 | 8 |
| 1/17 | 資料分析讀書會 | 線上 | 30 |

**工作坊 B（2）、B（3）新增的元件**（對應 `B2/規劃.md`、`B3/規劃.md` 附錄 A）

結構變成：（A 版）skip link → 頁首（網站名稱、分享按鈕）→ `<h1>` → 索引標籤 → 頁尾（Email、訂閱電子報、訂閱）；頁面最後是分享對話框與 toast。「活動」面板最上方新增「依日期查詢活動」。

| 元件 | 單元／情境 | A 版 | B 版 |
|---|---|---|---|
| 關注講者（「年終講座開放報名」標題右側） | B2 情境 1 | 按下後多一個 ✓ 圖示，圖示 `role="img" aria-label="已"` → 名稱變成「已 關注講者」；沒有 `aria-pressed` | ✓ 圖示 `aria-hidden`，名稱一直是「關注講者」 |
| 分享按鈕 → 分享對話框 | B2 情境 3 | DS `Dialog`：焦點移進對話框，名稱「分享」；內有「關閉」（DS Dialog 右上角的 ✕）、「複製連結」「Facebook」「LINE」 | `FakeDialog`：焦點留在分享按鈕，沒有角色與名稱，位於 `<body>` 最後 |
| toast（已複製連結、訂閱成功…） | B2 情境 5 | 念出 | 沒有念出 |
| 依日期查詢活動：日期欄位＋日曆 | B3 情境 1 至 4 | `DateField`，同 4.8 節 A 版；標籤「查詢日期」 | `FakeDateField`，同 4.8 節 B 版 |
| 頁尾 Email 欄位 | B3 情境 6 | 留空或格式不對時送出：顯示錯誤文字、`aria-invalid`、焦點移到欄位；必填有 `aria-required` | 只有紅框，焦點不動；必填只有紅色星號 |
| 跳到主要內容 | B3 情境 8 | 頁面第一個連結；平常在畫面外，取得焦點時出現在左上角；按下後焦點移到 `<h1>`（`tabindex="-1"`） | 沒有 |

- 「複製連結」會把網址寫入剪貼簿；「Facebook」「LINE」不會真的分享，只顯示 toast「已分享到 Facebook（範例，沒有真的送出）」。三個按鈕都是先關閉對話框（焦點回到分享按鈕），再顯示 toast。
- 「依日期查詢活動」有「查詢」按鈕，結果（「2026/12/06 有 1 場活動：…」或「… 沒有活動。」）顯示在 `role="status"` 的區域，兩版都會念出。日期留空或格式不對時，A 版顯示錯誤文字並把焦點移回欄位，B 版只有紅框。「依日期查詢活動」這行字刻意不用標題元素，不改變這一頁的標題結構（B1 示範會用 H 鍵）。
- **頁尾訂閱的檢查順序**：Email（留空或格式不對 → 欄位錯誤）→ 核取方塊（沒勾 → 原本的提示文字）→ 成功（toast「訂閱成功」，取代原本顯示在頁尾的「感謝訂閱！…」文字）。也就是說，B2 示範二要先填 Email、勾選「訂閱電子報」再按「訂閱」，才會出現 toast；B3 示範二 Email 留空直接按「訂閱」即可。
- 頁首沒有導覽連結，所以 B 版按第一次 Tab 會到分享按鈕（教材寫「頁首的連結」）。
- 分享按鈕、「我要報名」沒有加 `aria-haspopup="dialog"`：工作坊 A（4）示範預期念「分享 按鈕」，維持不變。

### 4.3 服務條款頁（`/a/terms/`、`/b/terms/`）

結構：頁首 → `<h1>` 服務條款 → 第一條至第八條（`<h2>` 標題＋「更多」按鈕＋可展開內容）→ 同意區塊與「同意並繼續」。

| 元件 | A 版 | B 版 |
|---|---|---|
| 各條展開按鈕（畫面「更多」＋箭頭） | 自製按鈕（DS Button greenStroke 樣式＋`ChevronDownIcon`）；名稱「更多 第三條 個人資料保護」；`aria-expanded` | 每條都是 `aria-label="more"`，沒有狀態 |
| 下載條款全文（第一條內文，下載圖示） | 圖示 `<button>`，名稱「下載」，描述「服務條款全文.pdf，100KB」，按下後下載 PDF | 沒有名稱，也沒有描述 → 念「按鈕」 |
| 個資法連結（第三條內文，開新分頁） | 連結文字「個人資料保護法全文」，`target="_blank"`，`title="開啟新分頁"` | 連結文字相同，開新分頁但沒有提示 |
| 消保法連結（第五條內文，同一分頁） | 連結文字「消費者保護法全文」 | 連結文字為完整網址 |
| 我已閱讀並同意服務條款 | DS `Checkbox` | 仿製核取方塊 |
| 同意並繼續 | DS `Button` | 同 A 版（作為對照） |
| 頁面標題 | 「服務條款 - 好好學」 | 「好好學」（教材未指定，與其他 B 版頁面一致） |

- 下載條款全文用 `<button>`，因為教材預期 B 版念「按鈕」。
- 兩個連結都連到全國法規資料庫：個資法 `https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=I0050021`、消保法 `https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=J0170001`。
- 兩個連結刻意放在不相鄰的條文（第三條、第五條），加上第一條的下載按鈕，學員要逐條展開才找得到。一個連結只埋一種問題：個資法連結只缺「開新分頁」的描述，消保法連結只有網址當名稱的問題。
- 「同意並繼續」：未勾選時以 DS `ValidationMessage` 提示「請先勾選同意服務條款」；已勾選時前往 `/done/`。B 版用空白鍵或滑鼠勾選仿製核取方塊後同樣可以繼續。

### 4.4 課程場次頁（`/a/sessions/`、`/b/sessions/`）

結構：頁首 → `<h1>` 課程場次 → 台北場／台中場／高雄場索引標籤（預設「台北場」），每個面板一張場次表 → 報名須知（標題＋六項須知）→ 注意事項（標題＋一段中文、一段英文說明）。

| 元件 | A 版 | B 版 |
|---|---|---|
| 場次索引標籤 | DS `Tabs`（`label="場次"`） | 仿製分頁（與最新消息頁同一元件） |
| 場次表格 | DS `Table` | 仿製表格（與最新消息頁同一元件） |
| 報名須知（標題） | `<h2>` | `<h4>`（從層級 1 跳號） |
| 報名須知（六項） | `BulletList`（真正的清單）→ 「清單 有 6 項」 | `FakeList`（以「・」開頭的 `<p>`） |
| 注意事項（標題） | `<h2>` | `<p>`，套同樣的標題 class（放大加粗的文字，不是標題） |
| 注意事項（英文說明） | `<p lang="en">` | 沒有標示語言 |
| 頁面標題 | 「課程場次 - 好好學」 | 「好好學」 |

三個標題都套同一組 class（`typography-headline3`），不受元素預設樣式影響，兩版外觀相同。

報名須知、注意事項的文字與附錄 A 相同，見 `src/pages/sessions/data.js`。

場次資料依附錄 A（台北、台中、高雄各六列，欄位：日期、時段、地點、剩餘名額）。

### 4.5 輔助頁面

- **講師索引頁 `/`**：列出六個範例頁的連結與用途（對應附錄 A 的表格），以及兩個輔助頁。
- **主辦單位公告 `/notice/`**：一則簡短的年終講座主辦單位公告。
- **完成頁 `/done/`**：「已同意服務條款，註冊完成」的簡短訊息。
- **PDF 佔位檔**：`活動簡章.pdf`（約 200KB）、`服務條款全文.pdf`（約 100KB），放在 `public/files/`。

### 4.6 課程詳情頁（`/a/course/`、`/b/course/`，B2 活動 6）

結構：頁首 → `<h1>` 無障礙設計入門、課程簡介 →「收藏」按鈕 → 課程資訊（講師、日期、地點、費用）→「我要報名」按鈕；頁面最後是確認報名對話框與 toast。

| 元件 | 情境 | A 版 | B 版 |
|---|---|---|---|
| 收藏（愛心＋文字「收藏」，按下後愛心變實心紅色） | 2、4 | `<button aria-pressed>`，名稱固定「收藏」 | `aria-pressed` 之外，`aria-label` 還從「收藏」改成「取消收藏」→「取消收藏 已按下」 |
| 已加入收藏／已取消收藏 toast | 5 | 念出 | 沒有念出 |
| 我要報名 → 確認報名對話框 | 3 | DS `Dialog`：焦點移進對話框，名稱「確認報名」 | `FakeDialog`：焦點留在「我要報名」，沒有角色與名稱，位於 `<body>` 最後 |
| 報名成功 toast | 5 | 念出「報名成功，確認信已寄到你的信箱」 | 沒有念出 |
| 頁面標題 | — | 「無障礙設計入門 - 好好學」 | 「好好學」 |

- 對話框內容：課程、日期、地點，按鈕「取消」「確認報名」，另有 DS Dialog 右上角的「關閉」（✕）。A 版開啟時焦點落在第一個可聚焦的元件，也就是「關閉」。
- **`FakeDialog` 刻意做對的部分**（教材：對話框的鍵盤操作留到 B3 再談）：焦點進到對話框之後 Tab 只在裡面循環、Esc 可以關閉、關閉後焦點回到原本的按鈕。
- 報名後「我要報名」按鈕不變（不改成「已報名」）：報名成功只靠 toast 告知，才聽得出 toast 有沒有念出來；也因此可以重複報名（學習單 6 第 3 題）。
- **toast**：畫面下方置中，停留 6 秒，兩版相同；觸發後延遲 0.2 秒才顯示，讓它排在「焦點回到按鈕」的報讀之後。

### 4.7 預約試聽頁（`/a/trial/`、`/b/trial/`，B3 活動 7）

結構：頁首 → `<h1>` 預約試聽：無障礙設計入門、一句說明 → 表單（姓名、Email、試聽日期＋日曆按鈕、時段、送出預約）→「預約成功」訊息。

| 元件 | 情境 | A 版 | B 版 |
|---|---|---|---|
| 姓名 | 1、2 | `<label>` 有關聯；`aria-required` →「姓名 編輯區 必要的」 | `<label>` 沒有 `for`（`TextField` 的 `labelled={false}`），必填只有紅色星號（`aria-hidden`）→ 只念「編輯區」 |
| Email | 1 | `<label>` 有關聯；`aria-required` | `<label>` 有關聯；必填只有紅色星號（`aria-hidden`） |
| 試聽日期＋日曆 | 2 至 5 | `DateField`（4.8 節） | `FakeDateField`（4.8 節） |
| 錯誤訊息 | 6 | 欄位下方顯示錯誤文字（`aria-describedby`）、`aria-invalid`、焦點移到第一個錯誤欄位 | 只有紅框；沒有文字、沒有 `aria-invalid`，焦點不動 |
| 時段（上午／下午／晚上） | 7 | `<fieldset>`＋`<legend>` | `<div>`＋`<p>`，選項是同樣的原生 radio |
| 預約成功 | — | `role="status"` 區域，念出「預約成功！確認信已寄到你的信箱。」 | 與 A 版相同 |
| 頁面標題 | — | 「預約試聽 - 好好學」 | 「好好學」 |

- `<form noValidate>`：關閉瀏覽器內建的檢查，錯誤一律由頁面呈現。Email 欄位兩版都是 `type="email"`、`autocomplete="email"`。
- 必填用 `aria-required` 而不是 `required` 屬性，避免瀏覽器把還沒填的必填欄位當成無效。
- 檢查：姓名留空「請輸入姓名」；Email 留空或格式不對「請輸入 Email，例如 name@example.com」；日期留空或不是有效日期「請輸入試聽日期，格式：YYYY/MM/DD，例如 2026/11/24」。錯誤會留到下一次送出。
- **外觀不同的例外**：出錯時 A 版有錯誤文字，B 版只有紅框（教材規格）。

### 4.8 日期欄位與日曆（最新消息頁、預約試聽頁共用）

A 版 `src/site/DateField.jsx`、B 版 `src/lookalikes/FakeDateField.jsx`，外觀共用 `src/site/CalendarShell.jsx`。A 版參考 APG 的 Date Picker Combobox、Date Picker Dialog 範例。

| 元件 | A 版 | B 版 |
|---|---|---|
| 標籤 | `<label for>` 關聯 | 畫面上的文字相同，但 `<label>` 沒有 `for` → 名稱只剩 placeholder |
| 欄位 | `role="combobox"`、`aria-haspopup="dialog"`、`aria-expanded`、`aria-required`；格式提示「格式：YYYY/MM/DD，例如 2026/11/24」以 `aria-describedby` 指向隱藏文字；按下鍵可以開啟日曆 | 只有 placeholder「YYYY/MM/DD」 |
| 日曆按鈕 | 名稱「選擇日期」、`aria-haspopup="dialog"` | 名稱「選擇日期」，沒有 `aria-haspopup` |
| 開啟 | `role="dialog"`、`aria-modal`、名稱「選擇日期」；焦點移到欄位已填的日期（沒有或無效時為今天） | 沒有角色與名稱；焦點留在按鈕（日曆在 DOM 中緊接在按鈕之後） |
| 日期格 | `role="grid"`／`row`／`gridcell`，只有一格在 Tab 順序中；方向鍵移動一天、一週，Home／End 到週日／週六，PageUp／PageDown 換月；名稱例如「24 星期二 2026年11月」；已選的日期 `aria-selected`、今天 `aria-current="date"`；Enter／空白鍵選定 | 每一格都是 `tabindex="0"` 的 `<div>`，只有數字；方向鍵沒有作用；Enter／空白鍵可以選（刻意修好一半） |
| Tab、Esc | Tab 只在「上個月」「下個月」、日曆、「取消」「確定」之間循環；Esc 關閉 | Tab 會跑到背景頁面；Esc 沒有作用 |
| 關閉後 | 焦點回到欄位（選定、「確定」、「取消」、Esc 都是） | 焦點跳到頁首的網站名稱「好好學」，頁面捲回最上方 |

- 格式提示用隱藏文字，是沿用 4.1 節「描述」的作法，讓兩版外觀相同；實務上格式提示應該顯示在畫面上。
- A 版的星期列（日一二…）對輔助科技隱藏（`aria-hidden`）：每個日期格的名稱已經包含星期，避免重複念。月份標題有 `aria-live="polite"`，按「上個月」「下個月」時念出新的月份。
- A 版「確定」填入目前所在的日期；B 版沒有「目前所在的日期」，「確定」只會關閉日曆。
- 日曆以開啟頁面當天為「今天」。用滑鼠點日曆以外的地方會關閉（兩版相同）。
- 欄位也可以直接打字，接受 `2026/11/24`、`2026-11-24`、`2026/1/5`。

## 5. 驗證

- 每頁完成後用 Chrome 開啟，讀取無障礙樹，逐項對照第 4 節的差異表：A 版的名稱、角色、狀態、描述正確；B 版確實缺少該缺的部分。
- 鍵盤操作實測：Tab 順序、Tabs 方向鍵切換、展開按鈕、核取方塊、表單送出。
- 不加 axe 自動測試（B 版本來就會故意不通過）。
- B2、B3 的頁面另外用 Playwright（本機 Chrome）實際按 Tab、方向鍵、Enter、Esc，檢查每一步焦點落在哪裡，以及名稱、狀態、live region 的內容。
- **NVDA 的實際念法須由講師實測**，教材中標示「待實測」之處仍需人工確認。

## 6. 交付

- `npm run build` 產出 `dist/`，把內容上傳到 `https://accessibility.coseeing.org` 的 `/a11y-tutorial/11512-nanshanlife/` 路徑下（`https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/`）。
- README：如何 build `coseeing-ui`（含 Windows 繞過步驟）、開發、部署。
