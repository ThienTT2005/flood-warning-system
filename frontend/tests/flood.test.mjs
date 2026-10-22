import { test } from 'node:test'
import assert from 'node:assert/strict'
import { analyzeFlood, checkBackend } from '../src/services/floodApi.js'
import { imageSource } from '../src/utils/image.js'
import { percent, videoTime, floodState } from '../src/utils/format.js'
import { readSession, saveSession } from '../src/utils/storage.js'

test('summary percentages and frame ratios use separate units; missing values stay unknown', () => {
  assert.equal(percent(92.4), '92,4%')
  assert.equal(percent(0.95, true), '95%')
  assert.equal(percent(null), '—')
  assert.equal(percent(undefined, true), '—')
  assert.equal(videoTime(61000), '01:01')
  assert.equal(videoTime(null), '—')
  assert.equal(floodState({}), 'neutral')
  assert.equal(floodState({ conclusion: 'CÓ DẤU HIỆU NGẬP' }), 'danger')
})
test('base64 images preserve existing data URLs and tolerate absent images', () => {
  assert.equal(imageSource('abc'), 'data:image/jpeg;base64,abc')
  assert.equal(imageSource('data:image/png;base64,abc'), 'data:image/png;base64,abc')
  assert.equal(imageSource(null), '')
})
test('real analysis sends multipart field file, preserves response and surfaces errors', async t => {
  const file = new File(['video'], 'test.mp4', { type: 'video/mp4' })
  const result = { status: 'Hoàn thành', evidence_frames: ['one', 'two'], frames_log: [] }
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.ok(url.endsWith('/api/analyze-flood'))
    assert.equal(options.method, 'POST')
    assert.equal(options.body.get('file').name, 'test.mp4')
    assert.equal(options.headers, undefined)
    return new Response(JSON.stringify(result))
  })
  assert.deepEqual(await analyzeFlood(file), result)
  globalThis.fetch = async () => new Response(JSON.stringify({ detail: 'Không thể đọc video.' }), { status: 500 })
  await assert.rejects(analyzeFlood(file), /Không thể đọc video/)
  globalThis.fetch = async () => new Response('not-json', { status: 502 })
  await assert.rejects(analyzeFlood(file), /HTTP 502/)
  globalThis.fetch = async () => new Response('null', { status: 500 })
  await assert.rejects(analyzeFlood(file), /HTTP 500/)
  globalThis.fetch = async () => { throw new TypeError('Failed to fetch') }
  await assert.rejects(analyzeFlood(file), /CORS/)
  globalThis.fetch = async () => { throw new DOMException('Aborted', 'AbortError') }
  await assert.rejects(analyzeFlood(file), { name: 'AbortError' })
})
test('backend check requires the analysis endpoint in OpenAPI', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ paths: { '/api/analyze-flood': { post: {} } } })))
  assert.equal(await checkBackend(), true)
  globalThis.fetch = async () => new Response('{}')
  assert.equal(await checkBackend(), false)
})
test('unavailable or full session storage never interrupts analysis or restores stale results', t => {
  let removed = ''
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage')
  Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, value: { getItem: () => '{broken', setItem: () => { throw new Error('Quota exceeded') }, removeItem: key => { removed = key } } })
  t.after(() => { if (descriptor) Object.defineProperty(globalThis, 'sessionStorage', descriptor); else delete globalThis.sessionStorage })
  assert.equal(readSession('flood-result', null), null)
  assert.equal(saveSession('flood-result', { status: 'Hoàn thành' }), false)
  assert.equal(removed, 'flood-result')
})
