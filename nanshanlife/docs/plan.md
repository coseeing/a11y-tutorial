# 實作計畫

依據：[design.md](design.md)（含 4.2 節講師招募活動頁）。每個步驟完成後執行 `npm run build` 確認可以建置。

## 步驟 1：環境

1. `git init`。
2. 建置 `../coseeing-ui`：`npm run build:js && npm run build:types`，再把 `src/styles/` 的四個 CSS 檔複製到 `dist/`。
3. 安裝：`@coseeing/ui`（`file:../coseeing-ui`）、`tailwindcss`、`@tailwindcss/vite`。
4. `vite.config.js`：React、Tailwind 外掛；`base: './'`；`resolve.dedupe`；多頁入口（`index`、`a/*`、`b/*`、`notice`、`done`），新增 `a/instructors/index.html`、`b/instructors/index.html`。
5. 刪除 Vite 範本檔（`App.jsx`、`App.css`、`assets/`、`public/icons.svg`）。
6. `src/index.css`：`@import "tailwindcss"`、`@import "@coseeing/ui/theme.css"`。

## 步驟 2：共用外框 `src/site/`

- `mount.jsx`：載入 CSS，把頁面元件掛到 `#root`。
- `SiteLayout.jsx`：頁首（「好好學」與可選的頁首右側內容）、`<main>`、可選的頁尾。講師招募活動頁僅保留頁首網站名稱，並支援快速聯絡欄；B 版使用該頁專用外框或明確的版型選項，避免共用外框自動補上刻意缺少的 `<main>` 地標。
- `icons.jsx`：分享、下載、勾選圖示（比照 DS 圖示：`currentColor`、`aria-hidden`）。
- `styles.js`：從 DS `Button` 複製的 class 字串（給需要 `aria-*` 的原生 `<button>` 使用），以及圖示按鈕、連結樣式。

## 步驟 3：B 版仿製元件 `src/lookalikes/`

- `FakeTabs.jsx`：與 DS `Tabs` 同樣的 class，使用 `<div>` 與 onClick，沒有 role、狀態、tabindex。
- `FakeTable.jsx`：與 DS `Table` 同樣的外框與儲存格 class，使用 CSS grid 的 `<div>`。
- `FakeCheckbox.jsx`：模仿 Chrome 原生核取方塊外觀的 `<span>`，滑鼠點選會切換外觀。
- A、B 兩版的表格欄寬都指定為固定比例，讓 `<table>` 與 grid 的欄寬一致。

## 步驟 4：講師招募活動頁

`src/pages/instructors/`：`data.js`、`InstructorsParts.jsx`、`InstructorsA.jsx`、`InstructorsB.jsx`；建立對應的 `src/entries/` 入口與 HTML `a/instructors/index.html`、`b/instructors/index.html`

## 步驟 5：最新消息頁

`src/pages/news/`：`data.js`、`NewsA.jsx`、`NewsB.jsx`、入口 HTML `a/news/`、`b/news/`。

## 步驟 6：服務條款頁

`src/pages/terms/`：`data.js`、`TermsA.jsx`、`TermsB.jsx`、入口 HTML；產生 PDF 佔位檔到 `public/files/`。

## 步驟 7：課程場次頁

`src/pages/sessions/`：`data.js`、`SessionsA.jsx`、`SessionsB.jsx`、入口 HTML。

## 步驟 8：輔助頁

講師索引頁 `/`、主辦單位公告 `/notice/`、完成頁 `/done/`。索引頁新增講師招募活動頁 A／B 版的連結與用途，排在最新消息頁之前。

## 步驟 9：README

建置 `coseeing-ui` 的步驟、開發、部署。

## 步驟 10：驗證

1. `npm run build`、`npm run lint`。
2. 啟動 dev server，用 Chrome 逐頁讀取無障礙樹，對照設計文件第 4 節的差異表。
3. 鍵盤操作實測：Tab 順序、Tabs 方向鍵、展開按鈕、核取方塊、表單送出。
4. A、B 兩版截圖比對外觀；講師招募活動頁依 4.2 節允許的狀態文字、操作指示、跳到主要內容的連結，以及放大／窄視窗排版差異檢查。
5. 講師招募活動頁另逐項驗證四個地雷與 A 版的修正：
   - 灰階下，A 版仍可由文字辨識招募狀態，B 版僅剩無法區分的燈號；比較下載指示是否依賴位置、色彩與形狀。
   - 瀏覽器放大至 200%，確認 B 版資訊卡片實際發生裁切或重疊，A 版文字與功能完整；不能只憑固定高度判定已重現。
   - 視窗設為 320 CSS 像素寬，確認 B 版出現水平捲動且聯絡資訊消失，A 版單欄呈現並保留所有內容；下載按鈕移到指示文字下方。
   - 使用無障礙樹／元素檢查器比較標題層次與地標，並確認 A 版跳到主要內容的連結可操作。
6. 確認講師索引頁連結順序、兩版頁面標題與簡章下載正確，沒有加入四個地雷以外的無障礙問題。

## 步驟 11：Review

請 Fable 5.1 review 程式碼是否符合設計文件與教材附錄 A，修正確認的問題。
