import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="glass-layer relative z-10 flex min-h-dvh flex-col items-center justify-center gap-4 px-4">
      <span className="text-6xl">🏘️</span>
      <h1 className="text-2xl font-black text-[#0D0B08]">페이지를 찾을 수 없어요</h1>
      <p className="text-sm text-[#5A5040]">주소를 다시 확인해주세요</p>
      <Link
        href="/"
        className="rounded-xl bg-gradient-to-r from-[#8B6010] to-[#C89020] px-6 py-2.5 text-sm font-semibold text-white"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
