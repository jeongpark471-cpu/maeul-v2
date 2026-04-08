import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4">
      <span className="text-6xl">🏘️</span>
      <h1 className="text-2xl font-black text-gray-900">페이지를 찾을 수 없어요</h1>
      <p className="text-sm text-gray-500">주소를 다시 확인해주세요</p>
      <Link
        href="/"
        className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
