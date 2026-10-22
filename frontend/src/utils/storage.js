export function readSession(key, fallback) {
  try { return JSON.parse(sessionStorage.getItem(key)) ?? fallback } catch { return fallback }
}
export function saveSession(key, value) {
  try { sessionStorage.setItem(key, JSON.stringify(value)); return true } catch {
    // Avoid restoring an older analysis when saving the newest one fails.
    try { sessionStorage.removeItem(key) } catch { /* Storage may be disabled. */ }
    return false
  }
}
