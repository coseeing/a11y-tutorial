# 實作計畫

依據：`docs/design.md`。每個步驟完成後執行 `npm run build` 確認可以建置。

## 步驟 1：環境

1. `git init`。
2. 建置 `../coseeing-ui`：`npm run build:js && npm run build:types`，再把 `src/styles/` 的四個 CSS 檔複製到 `dist/`。
3. 安裝：`@coseeing/ui`（`file:../coseeing-ui`）、`tailwindcss`、`@tailwindcss/vite`。
4. `vite.config.js`：React、Tailwind 外掛；`base: './'`；`resolve.dedupe`；多頁入口（`index`、`a/*`、`b/*`、`notice`、`done`）。
5. 刪除 Vite 範本檔（`App.jsx`、`App.css`、`assets/`、`public/icons.svg`）。
6. `src/index.css`：`@import "tailwindcss"`、`@import "@coseeing/ui/theme.css"`。

## 步驟 2：共用外框 `src/site/`

- `mount.jsx`：載入 CSS，把頁面元件掛到 `#root`。
- `SiteLayout.jsx`：頁首（「好好學」與可選的頁首右側內容）、`<main>`、可選的頁尾。
- `icons.jsx`：分享、下載、勾選圖示（比照 DS 圖示：`currentColor`、`aria-hidden`）。
- `styles.js`：從 DS `Button` 複製的 class 字串（給需要 `aria-*` 的原生 `<button>` 使用），以及圖示按鈕、連結樣式。

## 步驟 3：B 版仿製元件 `src/lookalikes/`

- `FakeTabs.jsx`：與 DS `Tabs` 同樣的 class，使用 `<div>` 與 onClick，沒有 role、狀態、tabindex。
- `FakeTable.jsx`：與 DS `Table` 同樣的外框與儲存格 class，使用 CSS grid 的 `<div>`。
- `FakeCheckbox.jsx`：模仿 Chrome 原生核取方塊外觀的 `<span>`，滑鼠點選會切換外觀。
- A、B 兩版的表格欄寬都指定為固定比例，讓 `<table>` 與 grid 的欄寬一致。

## 步驟 4：最新消息頁

`src/pages/news/`：`data.js`、`NewsA.jsx`、`NewsB.jsx`、入口 HTML `a/news/`、`b/news/`。

## 步驟 5：服務條款頁

`src/pages/terms/`：`data.js`、`TermsA.jsx`、`TermsB.jsx`、入口 HTML；產生 PDF 佔位檔到 `public/files/`。

## 步驟 6：課程場次頁

`src/pages/sessions/`：`data.js`、`SessionsA.jsx`、`SessionsB.jsx`、入口 HTML。

## 步驟 7：輔助頁

講師索引頁 `/`、主辦單位公告 `/notice/`、完成頁 `/done/`。

## 步驟 8：README

建置 `coseeing-ui` 的步驟、開發、部署。

## 步驟 9：驗證

1. `npm run build`、`npm run lint`。
2. 啟動 dev server，用 Chrome 逐頁讀取無障礙樹，對照設計文件第 4 節的差異表。
3. 鍵盤操作實測：Tab 順序、Tabs 方向鍵、展開按鈕、核取方塊、表單送出。
4. A、B 兩版截圖比對外觀。

## 步驟 10：Review

請 Fable 5.1 review 程式碼是否符合設計文件與教材附錄 A，修正確認的問題。
