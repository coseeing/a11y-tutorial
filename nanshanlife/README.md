# 工作坊 A（4）鍵盤與焦點：範例頁

教材 `../04-鍵盤、焦點與螢幕閱讀器-規劃.md` 附錄 A 的範例頁。虛構網站「好好學」線上課程平台的三個頁面，各有 A 版（良好）與 B 版（有問題）：

| 頁面 | A 版 | B 版 | 用途 |
|---|---|---|---|
| 最新消息頁 | `/a/news/` | `/b/news/` | 活動 4、活動 5 前後的講解與示範 |
| 服務條款頁 | `/a/terms/` | `/b/terms/` | 活動 4：閱讀服務條款（學習單 4） |
| 課程場次頁 | `/a/sessions/` | `/b/sessions/` | 活動 5：查詢課程場次（學習單 5） |

另有講師索引頁 `/`、主辦單位公告 `/notice/`、註冊完成 `/done/`。

### 正式網址

部署在 `https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/`：

| 頁面 | 網址 |
|---|---|
| 講師索引頁 | https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/ |
| 最新消息頁 A 版 | https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/a/news/ |
| 最新消息頁 B 版 | https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/b/news/ |
| 服務條款頁 A 版 | https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/a/terms/ |
| 服務條款頁 B 版 | https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/b/terms/ |
| 課程場次頁 A 版 | https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/a/sessions/ |
| 課程場次頁 B 版 | https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/b/sessions/ |

設計與每個元件的 A／B 差異見 [`docs/design.md`](docs/design.md)。

> ⚠️ B 版的問題都是刻意埋設的（`src/lookalikes/`、`src/pages/*/*B.jsx`），請不要「修好」它們。

## 環境需求

- Node.js 20 以上
- 與本專案同層的 `../coseeing-ui`（Coseeing design system 原始碼）

## 第一次安裝

### 1. 建置 Coseeing UI

```sh
cd ..
git clone https://github.com/coseeing/ui coseeing-ui
cd coseeing-ui
npm install
npm run build:js
npm run build:types
cp src/styles/theme.css src/styles/tokens.css src/styles/base.css src/styles/typography.css dist/
```

不直接執行 `npm run build`，是因為它最後一步 `build:css` 在 Windows 上會失敗（`scripts/build-css.mjs` 用 `execFileSync("npx")`）。本專案採 README 的 Path B（自己跑 Tailwind），只需要上面複製的四個 CSS 檔，用不到那一步產生的 `styles.css`。

Coseeing UI 更新時，重新執行 `git pull` 和上面的建置步驟即可。

### 2. 安裝本專案

```sh
cd ../nanshanlife
npm install
```

## 開發

```sh
npm run dev      # 開發伺服器，開啟後先到講師索引頁 http://localhost:5173/a11y-tutorial/11512-nanshanlife/
npm run lint     # oxlint
```

## 部署

```sh
npm run build
```

把產出的 `dist/` 內容整個上傳到 `https://accessibility.coseeing.org` 的 `/a11y-tutorial/11512-nanshanlife/` 路徑下，也就是 `https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/`。`vite.config.js` 的 `base` 設為 `/a11y-tutorial/11512-nanshanlife/`，若部署路徑改變，請一併修改。

開頭表格的網址都相對於這個路徑，例如 A 版最新消息頁是 `https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/a/news/`。

## 注意事項

- **發給學員的網址請保留結尾斜線**（`/b/terms/`，不是 `/b/terms`）。頁面內的連結都是相對路徑（`../../done/`），少了斜線會解析到錯誤的層級。開發伺服器會自動轉址；部署到 `https://accessibility.coseeing.org` 後，請確認主機也會把少了斜線的網址轉到有斜線的網址。
- **B 版的仿製表格只保證在筆電寬度（約 800px 以上）和 A 版外觀一致**。手機寬度下，真正的 `<table>` 會依內容調整欄寬，CSS grid 不會，兩版換行的位置會不同。
- **B 版仿製核取方塊**是模仿 Chrome 原生核取方塊畫的，並排比較時，勾勾的形狀會有些微差異。

## 其他

- `public/files/` 的兩個 PDF 是佔位檔，由 `node scripts/make-placeholder-pdfs.mjs` 產生，大小接近頁面上描述的 200KB、100KB。
- 字型 Noto Sans TC 由 Google Fonts 載入，離線時會退回系統字型。
