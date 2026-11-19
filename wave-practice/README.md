# 無障礙檢測練習

從 `coseeing/A11yTutorial` 元件展示專案搬入的三頁學員練習。使用原本 `components/` 的共用元件、樣式及圖片，保留所有刻意設置的檢測情境；請勿將這些問題當成產品缺陷修正。

| 路徑 | 內容 |
| --- | --- |
| `/test-practice/` | 活動入口 |
| `/test-practice/1/` | 活動導覽、連結名稱與相鄰連結 |
| `/test-practice/2/` | 課程標題、場次表格與圖片 |
| `/test-practice/3/` | 行前提醒、色彩對比與報名資料 |

三頁之間的連結、下午場頁籤、展開內容及模擬報名均可操作。表單僅在瀏覽器中模擬送出，不儲存個人資料。

## 開發與驗證

需要 Node.js 20.9 以上。此子專案不需要 GitHub Packages token。

```sh
cd wave-practice
npm ci
npm run dev
# http://localhost:3000/test-practice/1/
npm test
npm run typecheck
npm run build
```

## 靜態部署

與 `nanshanlife/` 分別建置，輸出至本子專案的 `out/`。部署到網站的 `/a11y-tutorial/` 目錄時：

```sh
NEXT_PUBLIC_BASE_PATH=/a11y-tutorial npm run build
```

將 `out/` 的內容部署到 `/a11y-tutorial/`，三頁的路徑為 `/a11y-tutorial/test-practice/1/`、`2/`、`3/`。保留同層既有的 `11512-nanshanlife/` 內容。此處提供建置設定，並未自動部署。

`NEXT_PUBLIC_BASE_PATH` 必須與實際部署位置相符，圖片與站內連結都使用 `lib/app-path.ts` 產生前綴。若掛在網域根層，直接使用 `npm run build`。

## 教學目標

保留的情境包括無名稱連結、相鄰同網址連結、跳級標題、沒有表頭語意的資料表、可疑的圖片替代文字、低對比文字、沒有關聯標籤的姓名欄位，以及指向不存在說明的 `aria-describedby`。

`app/test-practice/PracticeTargets.test.tsx` 與共用元件測試用來保護情境及互動。自動測試不等於實際執行 WAVE；授課前仍需在預定的 Chrome／WAVE 版本檢查三頁，並切到下午場後重新掃描。
