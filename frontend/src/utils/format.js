export const number = value => value != null && Number.isFinite(Number(value)) ? Number(value).toLocaleString('vi-VN', { maximumFractionDigits: 2 }) : '—'
// Summary fields are percentages; per-frame confidence and area fields are ratios.
export const percent = (value, ratio = false) => value != null && Number.isFinite(Number(value)) ? `${number(Number(value) * (ratio ? 100 : 1))}%` : '—'
export function videoTime(ms) {
  if (ms == null || !Number.isFinite(Number(ms))) return '—'
  const seconds = Math.max(0, Math.floor(Number(ms) / 1000))
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}
export const dateTime = value => value && !Number.isNaN(new Date(value).getTime()) ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Bangkok' }).format(new Date(value)) : '—'
export const floodState = result => result?.conclusion === 'CÓ DẤU HIỆU NGẬP' ? 'danger' : result?.conclusion === 'KHÔNG PHÁT HIỆN NGẬP' ? 'safe' : 'neutral'
