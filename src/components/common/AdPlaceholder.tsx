interface AdPlaceholderProps {
  type?: 'feed' | 'banner'
}

export default function AdPlaceholder({ type = 'feed' }: AdPlaceholderProps) {
  if (type === 'banner') {
    return (
      <div className="mx-4 my-3 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/80 px-4 py-6">
        <span className="mb-1 text-[10px] font-medium text-gray-400">스폰서</span>
        <p className="text-xs text-gray-400">이 자리에 우리 동네 광고가 들어갑니다</p>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 border-b border-gray-50 px-4 py-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-2xl">
        📢
      </div>
      <div className="flex-1">
        <span className="mb-0.5 inline-block rounded bg-gray-200 px-1 text-[9px] font-medium text-gray-500">
          스폰서
        </span>
        <p className="text-sm text-gray-500">우리 동네 가게를 홍보해보세요</p>
        <p className="text-xs text-gray-400">광고 문의 →</p>
      </div>
    </div>
  )
}
