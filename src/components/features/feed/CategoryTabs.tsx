'use client'

const CATEGORIES = ['전체', '일상', '맛집', '육아', '질문', '나눔', '이슈', '부동산'] as const

interface CategoryTabsProps {
  active: string
  onChange: (cat: string) => void
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2.5 scrollbar-none">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            active === cat
              ? 'bg-gradient-to-r from-[#8B6010] to-[#C89020] text-white shadow-sm'
              : 'bg-[rgba(255,250,235,0.5)] text-[#5A5040] hover:bg-[rgba(255,250,235,0.8)]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
