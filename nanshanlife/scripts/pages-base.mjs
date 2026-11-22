export function pagesBase(value = '/a11y-tutorial/11512-nanshanlife/') {
  const path = value.replace(/^\/+|\/+$/g, '')
  return path ? `/${path}/` : '/'
}
