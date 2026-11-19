# 工作坊 A（4）、B（1）～（3）：範例頁

教材各單元「規劃.md」附錄 A 的範例頁（工作坊 A（4）鍵盤與焦點、B（1）文件的語意、B（2）螢幕閱讀器的互動與回饋、B（3）表單的無障礙）。虛構網站「好好學」線上課程平台的五個頁面，各有 A 版（良好）與 B 版（有問題）：

| 頁面 | A 版 | B 版 | 用途 |
|---|---|---|---|
| 最新消息頁 | `/a/news/` | `/b/news/` | 活動 4 至活動 7 前後的講解與示範 |
| 服務條款頁 | `/a/terms/` | `/b/terms/` | 活動 4：閱讀服務條款（學習單 4） |
| 課程場次頁 | `/a/sessions/` | `/b/sessions/` | 活動 5：查詢課程場次（學習單 5） |
| 課程詳情頁 | `/a/course/` | `/b/course/` | 活動 6：收藏與報名課程（學習單 6） |
| 預約試聽頁 | `/a/trial/` | `/b/trial/` | 活動 7：預約試聽（學習單 7） |

另有講師索引頁 `/`、主辦單位公告 `/notice/`、註冊完成 `/done/`。

講師索引首頁另有「活動 8：無障礙檢測練習」，連到同一網站下的
`/a11y-tutorial/test-practice/1/`。這三頁由同儲存庫的 `wave-practice/`
子專案提供，需另外建置並部署至 `/a11y-tutorial/`；建置方式見
[`wave-practice/README.md`](../wave-practice/README.md)。

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
| 課程詳情頁 A 版 | https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/a/course/ |
| 課程詳情頁 B 版 | https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/b/course/ |
| 預約試聽頁 A 版 | https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/a/trial/ |
| 預約試聽頁 B 版 | https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/b/trial/ |

設計與每個元件的 A／B 差異見 [`docs/design.md`](docs/design.md)。

> ⚠️ B 版的問題都是刻意埋設的（`src/lookalikes/`、`src/pages/*/*B.jsx`），請不要「修好」它們。

## 環境需求

- Node.js 20 以上
- 可以讀取 GitHub Packages 的 GitHub token（`read:packages` 權限），用來安裝 `@coseeing/ui`

## 第一次安裝

### 1. 設定 GitHub Packages 認證

Coseeing design system（[`@coseeing/ui`](https://github.com/coseeing/ui)）目前發布在 GitHub Packages，安裝前需要認證。在本專案根目錄建立 `.npmrc`，或把同樣兩行寫進使用者層級的 `~/.npmrc`（就不需要在專案內放 token）：

```
@coseeing:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<具 read:packages 權限的 GitHub token>
```

專案內的 `.npmrc` 可能含 token，已列入 `.gitignore`，**不得提交**。`@coseeing/ui` 公開到 npm 後即可移除此設定。

### 2. 安裝本專案

```sh
npm install
```

`@coseeing/ui` 的版本寫在 `package.json`（`^1.0.0`）。要更新時執行 `npm update @coseeing/ui`。

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
- **日曆以開啟頁面當天為「今天」**：教材中的「下週二」「11/24」等日期，請依上課當天的日期調整。
- **toast 停留 6 秒**（`src/site/toast.jsx` 的 `TOAST_DURATION`），A、B 兩版相同。
- **B 版仿製核取方塊**是模仿 Chrome 原生核取方塊畫的，並排比較時，勾勾的形狀會有些微差異。

## 其他

- `public/files/` 的兩個 PDF 是佔位檔，由 `node scripts/make-placeholder-pdfs.mjs` 產生，大小接近頁面上描述的 200KB、100KB。
- 字型 Noto Sans TC 由 Google Fonts 載入，離線時會退回系統字型。
