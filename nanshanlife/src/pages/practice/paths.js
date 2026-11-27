// 與既有南山教材共用 Vite 部署前綴。
export function appPath(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function practicePath(page, variant = '') {
  return appPath(`/${variant ? `${variant}/` : ''}test-practice/${page}/`)
}
