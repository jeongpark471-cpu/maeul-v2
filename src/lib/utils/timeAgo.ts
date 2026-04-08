export function timeAgo(dateStr: string): string {
  const now = Date.now()
  const diff = now - new Date(dateStr).getTime()
  const sec = Math.floor(diff / 1000)

  if (sec < 60) return '방금'
  if (sec < 3600) return `${Math.floor(sec / 60)}분 전`
  if (sec < 86400) return `${Math.floor(sec / 3600)}시간 전`
  if (sec < 604800) return `${Math.floor(sec / 86400)}일 전`
  return new Date(dateStr).toLocaleDateString('ko-KR')
}
