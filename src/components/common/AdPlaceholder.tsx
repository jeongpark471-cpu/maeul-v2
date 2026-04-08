interface AdPlaceholderProps {
  type?: 'feed' | 'banner'
}

export default function AdPlaceholder({ type = 'feed' }: AdPlaceholderProps) {
  if (type === 'banner') {
    return (
      <div className="mx-4 my-3 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[rgba(200,170,100,0.3)] bg-[rgba(255,250,235,0.3)] px-4 py-6">
        <span className="mb-1 text-[10px] font-medium text-[#8A7D6B]">스폰서</span>
        <p className="text-xs text-[#8A7D6B]">이 자리에 우리 동네 광고가 들어갑니다</p>
      </div>
    )
  }

  return (
    <div className="ivory-card mx-4 mb-2.5 flex items-center gap-3 rounded-2xl p-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-dashed border-[rgba(200,170,100,0.3)] bg-[rgba(255,250,235,0.4)] text-2xl">
        📢
      </div>
      <div className="flex-1">
        <span className="mb-0.5 inline-block rounded bg-[rgba(200,170,100,0.2)] px-1 text-[9px] font-medium text-[#8A7D6B]">
          스폰서
        </span>
        <p className="text-sm text-[#5A5040]">우리 동네 가게를 홍보해보세요</p>
        <p className="text-xs text-[#8A7D6B]">광고 문의 →</p>
      </div>
    </div>
  )
}
