'use client'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="glass-layer relative z-10 flex min-h-dvh flex-col items-center justify-center gap-4 px-4">
      <span className="text-6xl">😵</span>
      <h1 className="text-2xl font-black text-[#0D0B08]">문제가 발생했어요</h1>
      <p className="text-sm text-[#5A5040]">잠시 후 다시 시도해주세요</p>
      <button
        onClick={reset}
        className="rounded-xl bg-gradient-to-r from-[#8B6010] to-[#C89020] px-6 py-2.5 text-sm font-semibold text-white"
      >
        다시 시도
      </button>
    </div>
  )
}
