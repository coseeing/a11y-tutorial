# Coseeing 無障礙教學

南山內訓教材集中在 [`nanshanlife/`](nanshanlife/README.md)，包含 NVDA 教學的
A／B 範例，以及活動 8 的三頁無障礙檢測練習。全部由同一個 Vite 專案開發與建置。

學員的檢測頁面位於 `nanshanlife/src/pages/practice/`，使用既有的 `@coseeing/ui`
共用元件。活動 8 的入口放在南山教材首頁。

GitHub Pages 自動部署設定在 `.github/workflows/deploy-pages.yml`，推送到 `main`
或手動執行 workflow，即會測試、建置並部署。啟用 Pages 與共用套件讀取權限的
一次性設定見 [部署說明](nanshanlife/README.md#github-pages-自動部署)。
