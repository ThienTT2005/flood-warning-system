export function imageSource(value) {
  if (typeof value !== 'string' || !value.trim()) return ''
  return value.startsWith('data:image') ? value : `data:image/jpeg;base64,${value}`
}
