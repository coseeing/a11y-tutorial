import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const root = fileURLToPath(new URL('.', import.meta.url))

// 部署位置：https://accessibility.coseeing.org/a11y-tutorial/11512-nanshanlife/
// 開發伺服器也使用同一路徑：http://localhost:5173/a11y-tutorial/11512-nanshanlife/
const base = '/a11y-tutorial/11512-nanshanlife/'

// 多頁應用：每個範例頁都是獨立的 HTML，讓 NVDA 每次都經歷真正的頁面載入
// （念出頁面標題、從頁首開始讀），行為與真實網站一致。
const pages = {
  index: 'index.html',
  'a-news': 'a/news/index.html',
  'b-news': 'b/news/index.html',
  'a-terms': 'a/terms/index.html',
  'b-terms': 'b/terms/index.html',
  'a-sessions': 'a/sessions/index.html',
  'b-sessions': 'b/sessions/index.html',
  'a-course': 'a/course/index.html',
  'b-course': 'b/course/index.html',
  'a-trial': 'a/trial/index.html',
  'b-trial': 'b/trial/index.html',
  notice: 'notice/index.html',
  done: 'done/index.html',
}

// 開發伺服器：網址少了結尾斜線（例如 /a/terms）時，Vite 會退回根目錄的 index.html，
// 學員會落到講師索引頁。這裡改成轉址到 /a/terms/。正式部署的靜態主機通常會自動轉址。
// 此 middleware 在 Vite 去除 base 之前執行，所以比對的路徑要含 base。
const pageDirs = Object.values(pages)
  .filter((file) => file !== 'index.html')
  .map((file) => `${base}${file.replace(/\/index\.html$/, '')}`)

function trailingSlashRedirect() {
  return {
    name: 'trailing-slash-redirect',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const [path, query] = req.url.split('?')
        if (pageDirs.includes(path)) {
          res.statusCode = 301
          res.setHeader('Location', `${path}/${query ? `?${query}` : ''}`)
          res.end()
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  base,
  plugins: [trailingSlashRedirect(), react(), tailwindcss()],
  build: {
    rolldownOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map(([name, file]) => [name, resolve(root, file)]),
      ),
    },
  },
})
