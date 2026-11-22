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

講師索引首頁另有「活動 8：無障礙檢測練習」，連到本專案的
`./test-practice/1/`，再依頁面連結前往第二、三頁。這些頁面和既有教材使用
同一個 Vite 專案，不需要另外安裝、啟動或部署另一個專案。

| 活動 8 頁面 | 路徑 |
| --- | --- |
| 活動導覽 | `/test-practice/1/` |
| 課程內容 | `/test-practice/2/` |
| 行前提醒 | `/test-practice/3/` |

頁面原始碼在 `src/pages/practice/`，使用 `@coseeing/ui` 的 Card、Button、Link、
Table、Tabs、Accordion、Field、Input 等共用元件。下午場刻意沒有表頭的表格
位於 `src/lookalikes/PracticeLayoutTable.jsx`。圖片與其他資源都放在 `public/`。

保留的檢測情境包含：無名稱連結、相鄰同網址連結、跳級標題、沒有表頭的資料表、
可疑的圖片替代文字、低對比文字、姓名欄位缺少關聯標籤，以及失效的 ARIA 說明參照。
請勿修正這些教學目標。模擬報名不會送出或儲存個人資料。

執行 `npm test` 可驗證這些情境；授課前仍需使用 Chrome 的 WAVE 擴充套件檢查，
並切到下午場後重新掃描。

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
| 活動 8：檢測練習 | https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/test-practice/1/ |

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
npm test         # 部署前綴、檢測情境與互動測試
```

## 部署

```sh
npm run build
```

把產出的 `dist/` 內容整個上傳到 `https://accessibility.coseeing.org` 的 `/a11y-tutorial/11512-nanshanlife/` 路徑下，也就是 `https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/`。預設前綴仍為 `/a11y-tutorial/11512-nanshanlife/`；部署到其他路徑時可用 `VITE_BASE_PATH` 指定，不必修改原始碼。

開頭表格的網址都相對於這個路徑，例如 A 版最新消息頁是 `https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/a/news/`。

### GitHub Pages 自動部署

儲存庫根目錄的 `.github/workflows/deploy-pages.yml` 會在推送到 `main` 時，依序
安裝套件、執行測試與 lint、建置 `nanshanlife/dist/`，再部署到 GitHub Pages。
也可在 Actions 頁面手動執行。三頁練習與其他教材會一起部署。

第一次使用需要在 GitHub 設定：

1. 儲存庫 **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**。
2. `@coseeing/ui` 套件的 **Package settings → Manage Actions access → Add repository**
   加入 **coseeing/a11y-tutorial**，授予 **Read**。

workflow 使用 GitHub 自動提供的 `GITHUB_TOKEN` 與 `packages: read` 安裝共用套件，
不需要把個人的 token 放進儲存庫。如果套件讀取出現 401 或 403，先確認第二步的
跨儲存庫套件權限。這些 GitHub 網站設定無法只靠提交 workflow 檔案完成。

未設定自訂網域時，預期首頁為 `https://coseeing.github.io/a11y-tutorial/`，
活動 8 第一頁為 `https://coseeing.github.io/a11y-tutorial/test-practice/1/`。
實際網址以部署 job 的輸出為準。workflow 會依 Pages 回傳的 `base_path`
設定 `VITE_BASE_PATH`，也支援自訂網域的根路徑。

本機重現 GitHub Pages 的建置路徑：

```sh
VITE_BASE_PATH=/a11y-tutorial npm run build
```

官方參考：[Pages workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)、
[套件的 Actions 讀取權限](https://docs.github.com/en/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility#ensuring-workflow-access-to-your-package)。

## 注意事項

- **發給學員的網址請保留結尾斜線**（`/b/terms/`，不是 `/b/terms`）。頁面內的連結都是相對路徑（`../../done/`），少了斜線會解析到錯誤的層級。開發伺服器會自動轉址；部署到 `https://accessibility.coseeing.org` 後，請確認主機也會把少了斜線的網址轉到有斜線的網址。
- **B 版的仿製表格只保證在筆電寬度（約 800px 以上）和 A 版外觀一致**。手機寬度下，真正的 `<table>` 會依內容調整欄寬，CSS grid 不會，兩版換行的位置會不同。
- **日曆以開啟頁面當天為「今天」**：教材中的「下週二」「11/24」等日期，請依上課當天的日期調整。
- **toast 停留 6 秒**（`src/site/toast.jsx` 的 `TOAST_DURATION`），A、B 兩版相同。
- **B 版仿製核取方塊**是模仿 Chrome 原生核取方塊畫的，並排比較時，勾勾的形狀會有些微差異。

## 其他

- `public/files/` 的兩個 PDF 是佔位檔，由 `node scripts/make-placeholder-pdfs.mjs` 產生，大小接近頁面上描述的 200KB、100KB。
- 字型 Noto Sans TC 由 Google Fonts 載入，離線時會退回系統字型。
