# 活動 8：Freego 檢測練習

維持三個互相連結的頁面、一份學員版與一份助教版學習單。每頁三種預設問題，共九種；學習單保留任務與報告紀錄，移除思考題。其他 NVDA 教材不受影響。

- [學員版](https://docs.google.com/document/d/1vIyU9-a8tF-X5sRjB5XyGmZwi1n3kOLnt-WozMqS0qY)
- [助教版](https://docs.google.com/document/d/1gTPfW_bD1jHm8cPWogxY8_nUrQDqJxW6SEYIKK-Ge4Y)

## 九個機器檢測目標

下列碼號與訊息以 **Freego Dec 19 2025** 內建規則為準。不同年份規範頁面可能重編碼號，不要把其他版本的對照表當成本次報告的碼號。

| 頁面 | 位置 | 實際規則碼 | 刻意條件 | 修正方向 |
| --- | --- | --- | --- | --- |
| 1 | 前往課程內容箭頭 | HM1240401C | `a#practice-course-link` 沒有名稱 | 補上符合用途的連結名稱 |
| 1 | 活動海報 | HM1110100C | `img#practice-poster` 沒有 `alt` | 提供等值替代文字 |
| 1 | 課程快訊裝飾圖 | HM1110106C | 空 `alt` 同時有 `title` | 保留空 alt，移除 title |
| 2 | 瀏覽器分頁標題 | HM1240200C | HTML 的 `title` 為空 | 提供有意義的網頁標題 |
| 2 | 課程摘要圖片按鈕 | HM1110104C | `input[type=image]#practice-summary-button` 沒有 `alt` | 補上「查看課程摘要」等名稱 |
| 2 | 上課地點嵌入內容 | HM1410201C | `iframe#practice-venue-frame` 沒有 `title` | 命名嵌入內容 |
| 3 | 網頁預設語言 | HM1310100C | HTML 根元素沒有 `lang` | 設定符合主要語言的 zh-Hant |
| 3 | 姓名欄位 | HM1130104C | `input#practice-name` 沒有標籤關聯 | 建立 label 與欄位的關係 |
| 3 | 想學技能群組 | HM1130103C | `fieldset#practice-skills` 第一個子元素是 p，沒有 legend | 使用 legend 作群組標題 |

這九個目標均屬 A 級碼，AA 檢查也包含它們。不要為了讓錯誤「剛好九筆」而忽略實際報告中的其他項目；規則數與有問題的元素數不是同一件事。

原本的相鄰文字連結、跳級標題、全 td 表格、可疑替代文字、低對比與失效 ARIA 參照，已移出正式題目或修正為正常對照，避免要求學員在 Freego 找到另一個工具的提示。

## 執行與授課

1. 在 Freego 選單選「設定 → Javascript → 使用」，讓 Vite/React 的內容先載入。Mac 的選單位於螢幕最上方；不是 Chrome 的網站設定。若載入不完整，可在「設定 → 設定網頁等待時間」先設為 10 秒再掃描。
2. 逐頁使用單一網頁範圍、AA 等級掃描。
3. 選取該頁並開啟「單一網頁檢測報告」，記錄檢測碼、訊息及對應元素。
4. 不需要用開發者工具找答案；助教可用原始碼確認報告位置。
5. 不需要提供真實個人資料；圖片按鈕與報名只做本機模擬。

第 2 頁的空 title 和第 3 頁的缺少 lang 都在各自 HTML 入口中，不能只檢查 React 元件。第 2 頁的 iframe 使用本機 srcdoc，不依賴外部地圖服務。

## 驗證範圍

已使用本機安裝的 Freego Dec 19 2025 `freego.jar` 內的實際 `checker.code.CheckCode3`／`checker.v3` 規則，對無頭 Chrome 載入完成的三頁 DOM 驗證：每頁分別觸發上表三個 A 級碼，沒有將其他工具的結果冒充 Freego 結果。

開發驗證程式為 `scripts/FreegoPracticeCheck.java`。它會確認三頁的九個碼，並在暫存 DOM 修正這九個條件後重跑 A 級規則，避免只驗證有錯誤卻沒有驗證修正方向。程式不修改網站，也未附帶或重新發布 Freego 的二進位檔。

這是內建機器規則的直接驗證，不是 GUI 掃描及報告產製的全流程驗證，也沒有宣稱完成標章審核。授課前仍需以授課電腦及同版 Freego 產生實際報告；AA 的 CSS 檢查與網路環境結果亦須在現場確認。工作流程需等 GitHub Pages 權限開通、這版頁面部署後才可使用學習單的正式網址。

官方參考：[Freego 下載與版本說明](https://accessibility.moda.gov.tw/Download/Detail/2763?Category=70)、[圖片 alt 檢測碼](https://accessibility.moda.gov.tw/Download/Detail/1499?Category=63)、[iframe title 檢測碼](https://accessibility.moda.gov.tw/Download/Detail/1526?Category=63)、[標章申請作業](https://accessibility.moda.gov.tw/Ccessibility/Detail/109?Category=2)。
