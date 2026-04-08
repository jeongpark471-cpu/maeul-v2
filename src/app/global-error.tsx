'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="ko">
      <body className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-white px-4">
        <span className="text-6xl">💥</span>
        <h1 className="text-2xl font-black text-gray-900">심각한 오류가 발생했어요</h1>
        <p className="text-sm text-gray-500">페이지를 새로고침 해주세요</p>
        <button
          onClick={reset}
          className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
        >
          새로고침
        </button>
      </body>
    </html>
  )
}
