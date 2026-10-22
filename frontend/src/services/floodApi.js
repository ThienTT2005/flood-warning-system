export const API_BASE_URL = (import.meta.env?.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '')
export async function analyzeFlood(file, signal) {
  const body = new FormData()
  body.append('file', file)
  let response
  try { response = await fetch(`${API_BASE_URL}/api/analyze-flood`, { method: 'POST', body, signal }) }
  catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('Không thể kết nối máy chủ. Hãy kiểm tra backend tại cổng 8000, kết nối mạng và cấu hình CORS.', { cause: error })
  }
  const raw = await response.text()
  let data
  try { data = JSON.parse(raw) } catch { throw new Error(`Máy chủ trả về dữ liệu không hợp lệ (HTTP ${response.status}).`) }
  if (!response.ok) {
    const detail = typeof data?.detail === 'string' ? data.detail : Array.isArray(data?.detail) ? data.detail.map(item => item.msg).join('; ') : data?.message
    throw new Error(detail || `Phân tích thất bại (HTTP ${response.status}). Vui lòng thử lại.`)
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Kết quả phân tích không hợp lệ.')
  return data
}
// API reachability does not prove model health; backend has no health endpoint.
export async function checkBackend(signal) {
  const response = await fetch(`${API_BASE_URL}/openapi.json`, { signal })
  if (!response.ok) throw new Error('Không kết nối được API')
  const schema = await response.json()
  return Boolean(schema.paths?.['/api/analyze-flood']?.post)
}
