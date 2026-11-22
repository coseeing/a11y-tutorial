import assert from 'node:assert/strict'
import test from 'node:test'
import { pagesBase } from './pages-base.mjs'

test('preserves the existing teaching URL when no override is supplied', () => {
  assert.equal(pagesBase(), '/a11y-tutorial/11512-nanshanlife/')
})

test('uses the project path returned by GitHub Pages', () => {
  assert.equal(pagesBase('/a11y-tutorial'), '/a11y-tutorial/')
  assert.equal(pagesBase('/a11y-tutorial/'), '/a11y-tutorial/')
})

test('supports a custom domain served from its root', () => {
  assert.equal(pagesBase(''), '/')
  assert.equal(pagesBase('/'), '/')
})
